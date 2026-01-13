/**
 * Docusaurus Adapter - Transforms processed specs to plugin-compatible format
 *
 * Key adaptations:
 * - Converts x-iiq-docs sections to x-tagGroups for sidebar grouping
 * - Adds x-displayName for human-readable sidebar labels
 * - Preserves operationId for stable URL generation
 * - Injects overview content as tag description
 */

const { extractSections, HTTP_METHODS } = require('./tag-splitter');

/**
 * Transform a processed tag spec into Docusaurus-compatible format
 * @param {Object} options - Transformation options
 * @param {string} options.tagName - The tag name
 * @param {Object} options.tagDef - Tag definition from spec
 * @param {Object} options.paths - Sorted paths for this tag
 * @param {Object} options.schemas - Tree-shaken schemas
 * @param {string} options.overview - Overview markdown content
 * @param {Object} options.sourceSpec - Original source spec
 * @param {Object} options.stats - Tag statistics
 * @returns {Object} - Docusaurus-compatible OpenAPI spec
 */
function transformToDocusaurusFormat({ tagName, tagDef, paths, schemas, overview, sourceSpec, stats }) {
    const spec = {
        openapi: sourceSpec.openapi || '3.0.0',
        info: {
            title: `${tagName} API`,
            version: sourceSpec.info?.version || '1.0.0',
            description: overview || tagDef?.description || generateDescription(tagName, stats),
            contact: sourceSpec.info?.contact,
            license: sourceSpec.info?.license,
        },
        servers: sourceSpec.servers || [
            { url: 'https://your-site.incidentiq.com', description: 'IncidentIQ Instance' }
        ],
        tags: buildTagsWithSections(paths, tagName),
        paths: transformPaths(paths, tagName),
        components: {
            schemas,
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT token from Administration > Developer Tools',
                },
                siteId: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'SiteId',
                    description: 'Your site identifier (UUID)',
                },
                client: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'Client',
                    description: 'Must be "ApiClient"',
                },
            },
        },
        security: [
            { bearerAuth: [], siteId: [], client: [] }
        ],
    };

    // Add x-tagGroups for sidebar organization if there are sections
    const tagGroups = buildTagGroups(paths, tagName);
    if (tagGroups.length > 0) {
        spec['x-tagGroups'] = tagGroups;
    }

    return spec;
}

/**
 * Generate a default description for a tag
 * @param {string} tagName - Tag name
 * @param {Object} stats - Tag statistics
 * @returns {string} - Generated description
 */
function generateDescription(tagName, stats) {
    const parts = [
        `API endpoints for managing ${tagName.toLowerCase()} in IncidentIQ.`,
        '',
        `This section contains **${stats?.endpoints || 0} endpoints**.`
    ];

    if (stats?.sections > 0) {
        parts.push(`Operations are organized into **${stats.sections} categories**.`);
    }

    return parts.join('\n');
}

/**
 * Build tag definitions including section sub-tags
 * @param {Object} paths - Paths for a tag
 * @param {string} parentTag - Parent tag name
 * @returns {Object[]} - Array of tag definitions
 */
function buildTagsWithSections(paths, parentTag) {
    const sections = extractSections(paths);
    const tags = [];

    // Add main parent tag
    tags.push({
        name: parentTag,
        'x-displayName': parentTag,
        description: `${parentTag} API operations`
    });

    // Add section sub-tags
    sections.forEach(section => {
        const displayName = formatSectionName(section);

        tags.push({
            name: `${parentTag}:${section}`,
            'x-displayName': displayName,
            description: `${displayName} operations`
        });
    });

    return tags;
}

/**
 * Build x-tagGroups for sidebar organization
 * @param {Object} paths - Paths for a tag
 * @param {string} parentTag - Parent tag name
 * @returns {Object[]} - Array of tag group definitions
 */
function buildTagGroups(paths, parentTag) {
    const sections = extractSections(paths);

    if (sections.length === 0) {
        return [];
    }

    const groups = sections.map(section => {
        const displayName = formatSectionName(section);
        return {
            name: displayName,
            tags: [`${parentTag}:${section}`]
        };
    });

    return groups;
}

/**
 * Transform paths to use section-based tags
 * @param {Object} paths - Paths object
 * @param {string} parentTag - Parent tag name
 * @returns {Object} - Transformed paths
 */
function transformPaths(paths, parentTag) {
    const transformed = {};

    Object.entries(paths).forEach(([path, pathItem]) => {
        transformed[path] = {};

        // Copy path-level properties
        if (pathItem.parameters) {
            transformed[path].parameters = pathItem.parameters;
        }
        if (pathItem.servers) {
            transformed[path].servers = pathItem.servers;
        }
        if (pathItem.summary) {
            transformed[path].summary = pathItem.summary;
        }
        if (pathItem.description) {
            transformed[path].description = pathItem.description;
        }

        // Transform operations
        HTTP_METHODS.forEach(method => {
            if (!pathItem[method]) return;

            const op = JSON.parse(JSON.stringify(pathItem[method]));

            // Transform tags to include section
            const section = op['x-iiq-docs']?.section;
            if (section) {
                op.tags = [`${parentTag}:${section}`];
            } else {
                op.tags = [parentTag];
            }

            // Ensure operationId exists for stable URLs
            if (!op.operationId) {
                op.operationId = generateOperationId(path, method);
            }

            transformed[path][method] = op;
        });
    });

    return transformed;
}

/**
 * Format a section name for display
 * @param {string} section - Raw section name (e.g., "creating-tickets")
 * @returns {string} - Formatted name (e.g., "Creating Tickets")
 */
function formatSectionName(section) {
    return section
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Generate an operation ID from path and method
 * @param {string} path - API path
 * @param {string} method - HTTP method
 * @returns {string} - Generated operation ID
 */
function generateOperationId(path, method) {
    // Remove leading /api/v1.0/ prefix
    let cleanPath = path.replace(/^\/api\/v\d+\.\d+\//, '');

    // Convert path segments to camelCase
    const segments = cleanPath
        .split('/')
        .filter(s => s && !s.startsWith('{'))
        .map((s, i) => {
            const clean = s.replace(/[^a-zA-Z0-9]/g, '');
            return i === 0 ? clean.toLowerCase() : clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
        });

    // Combine method and path
    const methodPrefix = method.toLowerCase();
    return methodPrefix + segments.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('');
}

/**
 * Get file name for a tag
 * @param {string} tagName - Tag name
 * @returns {string} - File name (lowercase, hyphenated)
 */
function getFileName(tagName) {
    return tagName
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
}

module.exports = {
    transformToDocusaurusFormat,
    buildTagsWithSections,
    buildTagGroups,
    transformPaths,
    formatSectionName,
    generateOperationId,
    getFileName,
    generateDescription
};
