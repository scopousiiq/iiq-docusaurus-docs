/**
 * Tag Splitter - Groups endpoints by tag and orders by x-iiq-docs metadata
 *
 * Handles the new tag structure where endpoints have:
 * - tags: ["Tickets"]
 * - x-iiq-docs: { section: "viewing", order: 130 }
 */

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];

/**
 * Extract all unique tags from the spec
 * @param {Object} spec - Full OpenAPI spec
 * @returns {Map<string, Object>} - Map of tag name to tag definition
 */
function extractTags(spec) {
    const tagMap = new Map();

    // Get defined tags from spec.tags
    if (spec.tags && Array.isArray(spec.tags)) {
        spec.tags.forEach(tag => {
            tagMap.set(tag.name, {
                name: tag.name,
                description: tag.description || '',
                externalDocs: tag.externalDocs || null,
                'x-displayName': tag['x-displayName'] || tag.name
            });
        });
    }

    // Also scan paths for any tags not in spec.tags
    if (spec.paths) {
        Object.values(spec.paths).forEach(pathItem => {
            HTTP_METHODS.forEach(method => {
                const operation = pathItem[method];
                if (operation?.tags) {
                    operation.tags.forEach(tagName => {
                        if (!tagMap.has(tagName)) {
                            tagMap.set(tagName, {
                                name: tagName,
                                description: '',
                                'x-displayName': tagName
                            });
                        }
                    });
                }
            });
        });
    }

    return tagMap;
}

/**
 * Get all sections used within a tag
 * @param {Object} paths - Paths for a specific tag
 * @returns {string[]} - Ordered list of section names
 */
function extractSections(paths) {
    const sectionSet = new Map(); // section -> min order

    Object.values(paths).forEach(pathItem => {
        HTTP_METHODS.forEach(method => {
            const operation = pathItem[method];
            if (operation?.['x-iiq-docs']?.section) {
                const section = operation['x-iiq-docs'].section;
                const order = operation['x-iiq-docs'].order || 9999;
                if (!sectionSet.has(section) || sectionSet.get(section) > order) {
                    sectionSet.set(section, order);
                }
            }
        });
    });

    // Sort sections by their minimum order
    return [...sectionSet.entries()]
        .sort((a, b) => a[1] - b[1])
        .map(([section]) => section);
}

/**
 * Split paths by tag
 * @param {Object} spec - Full OpenAPI spec
 * @returns {Map<string, Object>} - Map of tag name to paths object
 */
function splitPathsByTag(spec) {
    const tagPaths = new Map();

    if (!spec.paths) return tagPaths;

    Object.entries(spec.paths).forEach(([path, pathItem]) => {
        HTTP_METHODS.forEach(method => {
            const operation = pathItem[method];
            if (!operation) return;

            const tags = operation.tags || ['Untagged'];
            tags.forEach(tagName => {
                if (!tagPaths.has(tagName)) {
                    tagPaths.set(tagName, {});
                }

                const targetPaths = tagPaths.get(tagName);
                if (!targetPaths[path]) {
                    // Clone path-level properties (parameters, servers, etc.)
                    targetPaths[path] = {};
                    if (pathItem.parameters) {
                        targetPaths[path].parameters = pathItem.parameters;
                    }
                    if (pathItem.servers) {
                        targetPaths[path].servers = pathItem.servers;
                    }
                    if (pathItem.summary) {
                        targetPaths[path].summary = pathItem.summary;
                    }
                    if (pathItem.description) {
                        targetPaths[path].description = pathItem.description;
                    }
                }

                targetPaths[path][method] = operation;
            });
        });
    });

    return tagPaths;
}

/**
 * Sort paths within a tag by x-iiq-docs order
 * @param {Object} paths - Paths object for a tag
 * @returns {Object} - Sorted paths object
 */
function sortPathsByOrder(paths) {
    // Build array of [path, method, operation, order]
    const operations = [];

    Object.entries(paths).forEach(([path, pathItem]) => {
        HTTP_METHODS.forEach(method => {
            const operation = pathItem[method];
            if (operation) {
                const order = operation['x-iiq-docs']?.order || 9999;
                const section = operation['x-iiq-docs']?.section || 'zzz';
                operations.push({ path, method, operation, order, section });
            }
        });
    });

    // Sort by section (alphabetically), then by order
    operations.sort((a, b) => {
        if (a.section !== b.section) {
            return a.section.localeCompare(b.section);
        }
        return a.order - b.order;
    });

    // Rebuild paths object in sorted order
    const sortedPaths = {};
    const seenPaths = new Set();

    operations.forEach(({ path, method }) => {
        if (!seenPaths.has(path)) {
            seenPaths.add(path);
            sortedPaths[path] = paths[path];
        }
    });

    return sortedPaths;
}

/**
 * Create section tags for Stoplight sidebar grouping
 * @param {Object} paths - Paths for a tag
 * @param {string} tagName - The parent tag name
 * @returns {Object[]} - Array of tag definitions including section sub-tags
 */
function createSectionTags(paths, tagName) {
    const sections = extractSections(paths);
    const tags = [];

    // Add main tag
    tags.push({
        name: tagName,
        'x-displayName': tagName
    });

    // Add section sub-tags
    sections.forEach(section => {
        const displayName = section
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        tags.push({
            name: `${tagName} > ${displayName}`,
            'x-displayName': displayName,
            'x-parent': tagName
        });
    });

    return tags;
}

/**
 * Update operation tags to use section-based sub-tags
 * @param {Object} paths - Paths object
 * @param {string} tagName - Parent tag name
 * @returns {Object} - Updated paths with section tags
 */
function applySubTags(paths, tagName) {
    const updatedPaths = JSON.parse(JSON.stringify(paths));

    Object.values(updatedPaths).forEach(pathItem => {
        HTTP_METHODS.forEach(method => {
            const operation = pathItem[method];
            if (!operation) return;

            const section = operation['x-iiq-docs']?.section;
            if (section) {
                const displayName = section
                    .split('-')
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ');
                operation.tags = [`${tagName} > ${displayName}`];
            } else {
                operation.tags = [tagName];
            }
        });
    });

    return updatedPaths;
}

/**
 * Get statistics for a tag
 * @param {Object} paths - Paths for a tag
 * @returns {Object} - Stats
 */
function getTagStats(paths) {
    let endpoints = 0;
    const methods = { get: 0, post: 0, put: 0, patch: 0, delete: 0 };
    const sections = new Set();

    Object.values(paths).forEach(pathItem => {
        HTTP_METHODS.forEach(method => {
            if (pathItem[method]) {
                endpoints++;
                if (methods[method] !== undefined) methods[method]++;
                if (pathItem[method]['x-iiq-docs']?.section) {
                    sections.add(pathItem[method]['x-iiq-docs'].section);
                }
            }
        });
    });

    return {
        endpoints,
        paths: Object.keys(paths).length,
        methods,
        sections: sections.size
    };
}

module.exports = {
    extractTags,
    extractSections,
    splitPathsByTag,
    sortPathsByOrder,
    createSectionTags,
    applySubTags,
    getTagStats,
    HTTP_METHODS
};
