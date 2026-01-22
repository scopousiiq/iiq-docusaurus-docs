/**
 * Link Transformer - Converts documentation links to Docusaurus format
 *
 * Transforms markdown links from OpenAPI internal format to Docusaurus URLs:
 * - Operations: [POST /api/v1.0/search](#/Users/searchUsers) -> [POST /api/v1.0/search](/docs/api/users/search-users)
 * - Schemas: [TicketSortField](#/components/schemas/TicketSortField) -> [TicketSortField](/docs/api/tickets/schemas/ticketsortfield)
 * - Tags: [Users API](#/Users) -> [Users API](/docs/api/users/users-api)
 *
 * When a linked operation, schema, or tag doesn't exist in the spec, the link is
 * converted to plain text (display text only) to avoid broken anchors.
 */

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];

// Track transformation statistics
let transformStats = { transformed: 0, crossTag: 0, sameTag: 0, notFound: 0, tagLinks: 0, schemaLinks: 0 };

// Track broken links for reporting
let brokenLinks = [];

// Schema lookup: maps schema name to the tag that contains it
let schemaLookup = new Map();

/**
 * Convert operationId from camelCase to kebab-case
 * Matches the slug generation used by docusaurus-plugin-openapi-docs
 * @param {string} operationId - e.g., "searchUsers", "getAllSiteLocationsV2"
 * @returns {string} - e.g., "search-users", "get-all-site-locations-v-2"
 */
function operationIdToSlug(operationId) {
    return operationId
        // Insert hyphen before uppercase letters following lowercase
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        // Handle consecutive uppercase followed by lowercase (e.g., "HTTPStatus" -> "HTTP-Status")
        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
        // Handle uppercase followed by digit (e.g., "V2" -> "V-2")
        .replace(/([A-Z])(\d)/g, '$1-$2')
        // Handle lowercase followed by digit (e.g., "user2" -> "user-2")
        .replace(/([a-z])(\d)/g, '$1-$2')
        .toLowerCase();
}

/**
 * Convert tag name to URL slug
 * @param {string} tagName - e.g., "Custom Fields" or "Users"
 * @returns {string} - e.g., "custom-fields" or "users"
 */
function tagNameToSlug(tagName) {
    return tagName
        .toLowerCase()
        .replace(/\s+/g, '-');
}

/**
 * Convert schema name to URL slug
 * Matches the slug generation used by docusaurus-plugin-openapi-docs for schemas
 * @param {string} schemaName - e.g., "TicketSortField", "UserDetail"
 * @returns {string} - e.g., "ticketsortfield", "userdetail"
 */
function schemaNameToSlug(schemaName) {
    // Schema slugs are just lowercase, no hyphens
    return schemaName.toLowerCase();
}

/**
 * Build a lookup map of operationId -> { path, method, tag }
 * @param {Object} sourceSpec - Full OpenAPI source spec
 * @returns {Map<string, {path: string, method: string, tag: string}>}
 */
function buildOperationLookup(sourceSpec) {
    const lookup = new Map();
    const paths = sourceSpec.paths || {};

    for (const [path, pathItem] of Object.entries(paths)) {
        for (const method of HTTP_METHODS) {
            const operation = pathItem[method];
            if (operation?.operationId) {
                const tag = operation.tags?.[0] || 'Untagged';
                lookup.set(operation.operationId, {
                    path,
                    method,
                    tag
                });
            }
        }
    }

    return lookup;
}

/**
 * Build a lookup map of schema name -> tag name
 * Maps each schema to the first tag that references it (for linking purposes)
 * @param {Object} sourceSpec - Full OpenAPI source spec
 * @returns {Map<string, string>} - schema name -> tag name
 */
function buildSchemaLookup(sourceSpec) {
    const lookup = new Map();
    const paths = sourceSpec.paths || {};
    const allSchemas = new Set(Object.keys(sourceSpec.components?.schemas || {}));

    // For each path/operation, find which schemas it references and map them to its tag
    for (const [, pathItem] of Object.entries(paths)) {
        for (const method of HTTP_METHODS) {
            const operation = pathItem[method];
            if (!operation) continue;

            const tag = operation.tags?.[0] || 'Untagged';
            const operationStr = JSON.stringify(operation);

            // Find all schema references in this operation
            const refPattern = /"#\/components\/schemas\/([^"]+)"/g;
            let match;
            while ((match = refPattern.exec(operationStr)) !== null) {
                const schemaName = match[1];
                // Only set if not already mapped (first tag wins)
                if (allSchemas.has(schemaName) && !lookup.has(schemaName)) {
                    lookup.set(schemaName, tag);
                }
            }
        }
    }

    // For any schemas not yet mapped, assign to a default based on naming convention
    for (const schemaName of allSchemas) {
        if (!lookup.has(schemaName)) {
            // Try to infer tag from schema name prefix
            if (schemaName.startsWith('Ticket')) lookup.set(schemaName, 'Tickets');
            else if (schemaName.startsWith('Asset')) lookup.set(schemaName, 'Assets');
            else if (schemaName.startsWith('User')) lookup.set(schemaName, 'Users');
            else if (schemaName.startsWith('Location')) lookup.set(schemaName, 'Locations');
            else if (schemaName.startsWith('Event')) lookup.set(schemaName, 'Events');
            else if (schemaName.startsWith('Inventory')) lookup.set(schemaName, 'Inventory');
            // Default fallback - won't be linked but won't break
        }
    }

    return lookup;
}

/**
 * Set the schema lookup map (called from preprocess-specs.js)
 * @param {Map<string, string>} lookup - schema name -> tag name
 */
function setSchemaLookup(lookup) {
    schemaLookup = lookup;
}

/**
 * Transform all documentation links in a description string
 * @param {string} description - Description text with markdown links
 * @param {string} currentTag - Tag name of current controller
 * @param {Map} operationLookup - operationId lookup map
 * @param {Set} validTags - Set of valid tag names for tag-level links
 * @returns {string} - Description with transformed links
 */
function transformDescription(description, currentTag, operationLookup, validTags = null) {
    if (!description || typeof description !== 'string') {
        return description;
    }

    // First pass: Transform schema links [display text](#/components/schemas/SchemaName)
    // Must be processed before operation links since they have more path segments
    const schemaLinkPattern = /\[([^\]]+)\]\(#\/components\/schemas\/([^)]+)\)/g;

    let result = description.replace(schemaLinkPattern, (match, displayText, schemaName) => {
        // Look up which tag contains this schema
        const tag = schemaLookup.get(schemaName);
        if (!tag) {
            // Schema not found in any tag - convert to plain text
            transformStats.notFound++;
            brokenLinks.push({
                type: 'schema',
                tag: currentTag,
                targetTag: 'components',
                schemaName,
                operationId: null,
                originalLink: match,
                displayText
            });
            return displayText;
        }

        transformStats.schemaLinks++;
        transformStats.transformed++;

        // Build Docusaurus URL for schema
        const tagSlug = tagNameToSlug(tag);
        const schemaSlug = schemaNameToSlug(schemaName);
        const docusaurusUrl = `/docs/api/${tagSlug}/schemas/${schemaSlug}`;

        return `[${displayText}](${docusaurusUrl})`;
    });

    // Second pass: Transform operation-level links [display text](#/TagName/operationId)
    // Captures: (1) display text, (2) tag name (may be URL-encoded), (3) operationId
    const operationLinkPattern = /\[([^\]]+)\]\(#\/([^\/\)]+)\/([^)]+)\)/g;

    result = result.replace(operationLinkPattern, (match, displayText, tagName, operationId) => {
        // Decode URL-encoded tag names (Custom%20Fields -> Custom Fields)
        const decodedTag = decodeURIComponent(tagName);

        // Look up the operation
        const opInfo = operationLookup.get(operationId);
        if (!opInfo) {
            // Operation not found - convert to plain text (remove broken link)
            transformStats.notFound++;
            brokenLinks.push({
                type: 'operation',
                tag: currentTag,
                targetTag: decodedTag,
                operationId,
                originalLink: match,
                displayText
            });
            return displayText;
        }

        transformStats.transformed++;

        // Build Docusaurus URL
        const tagSlug = tagNameToSlug(opInfo.tag);
        const operationSlug = operationIdToSlug(operationId);
        const docusaurusUrl = `/docs/api/${tagSlug}/${operationSlug}`;

        // Track same vs cross-tag links for stats
        if (decodedTag === currentTag) {
            transformStats.sameTag++;
        } else {
            transformStats.crossTag++;
        }

        return `[${displayText}](${docusaurusUrl})`;
    });

    // Second pass: Transform tag-level links [display text](#/TagName)
    // These link to the tag overview, not a specific operation
    // Captures: (1) display text, (2) tag name (may be URL-encoded)
    const tagLinkPattern = /\[([^\]]+)\]\(#\/([^\/\)]+)\)/g;

    result = result.replace(tagLinkPattern, (match, displayText, tagName) => {
        // Decode URL-encoded tag names (Custom%20Fields -> Custom Fields)
        const decodedTag = decodeURIComponent(tagName);

        // If we have a validTags set, validate the tag exists
        if (validTags && !validTags.has(decodedTag)) {
            // Tag not found - convert to plain text (remove broken link)
            transformStats.notFound++;
            brokenLinks.push({
                type: 'tag',
                tag: currentTag,
                targetTag: decodedTag,
                operationId: null,
                originalLink: match,
                displayText
            });
            return displayText;
        }

        transformStats.tagLinks++;

        // Build Docusaurus URL for tag overview (points to the info page)
        const tagSlug = tagNameToSlug(decodedTag);
        const docusaurusUrl = `/docs/api/${tagSlug}/${tagSlug}-api`;

        return `[${displayText}](${docusaurusUrl})`;
    });

    return result;
}

/**
 * Recursively transform all description fields in an object
 * @param {any} obj - Object to transform (mutates in place)
 * @param {string} currentTag - Current controller's tag name
 * @param {Map} operationLookup - operationId lookup map
 * @param {Set} validTags - Set of valid tag names for tag-level links
 * @returns {any} - The transformed object
 */
function transformLinksInObject(obj, currentTag, operationLookup, validTags) {
    if (!obj || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        obj.forEach(item => transformLinksInObject(item, currentTag, operationLookup, validTags));
        return obj;
    }

    // Transform description field if present
    if (obj.description && typeof obj.description === 'string') {
        obj.description = transformDescription(obj.description, currentTag, operationLookup, validTags);
    }

    // Recurse into all properties
    for (const value of Object.values(obj)) {
        transformLinksInObject(value, currentTag, operationLookup, validTags);
    }

    return obj;
}

/**
 * Transform all documentation links in a controller spec
 * @param {Object} spec - Controller OpenAPI spec
 * @param {string} currentTag - Tag name for this controller
 * @param {Map} operationLookup - operationId lookup map from source spec
 * @param {Set} validTags - Set of valid tag names for tag-level links
 * @returns {Object} - Spec with transformed links
 */
function transformLinks(spec, currentTag, operationLookup, validTags = null) {
    // Reset stats for this controller
    transformStats = { transformed: 0, crossTag: 0, sameTag: 0, notFound: 0, tagLinks: 0 };

    // Transform info.description
    if (spec.info?.description) {
        spec.info.description = transformDescription(
            spec.info.description,
            currentTag,
            operationLookup,
            validTags
        );
    }

    // Transform paths (operations, parameters)
    transformLinksInObject(spec.paths, currentTag, operationLookup, validTags);

    // Transform component schemas
    transformLinksInObject(spec.components?.schemas, currentTag, operationLookup, validTags);

    // Transform tags descriptions
    if (spec.tags && Array.isArray(spec.tags)) {
        spec.tags.forEach(tag => {
            if (tag.description) {
                tag.description = transformDescription(tag.description, currentTag, operationLookup, validTags);
            }
        });
    }

    return spec;
}

/**
 * Get transformation statistics for the last transformLinks call
 * @returns {Object} - { transformed, crossTag, sameTag, notFound, tagLinks }
 */
function getTransformStats() {
    return { ...transformStats };
}

/**
 * Reset transformation statistics
 */
function resetStats() {
    transformStats = { transformed: 0, crossTag: 0, sameTag: 0, notFound: 0, tagLinks: 0, schemaLinks: 0 };
}

/**
 * Get all broken links found during transformation
 * @returns {Array<{type: string, tag: string, targetTag: string, operationId: string|null, originalLink: string, displayText: string}>}
 */
function getBrokenLinks() {
    return [...brokenLinks];
}

/**
 * Reset broken links array
 */
function resetBrokenLinks() {
    brokenLinks = [];
}

/**
 * Log broken links to console in a readable format
 */
function logBrokenLinks() {
    if (brokenLinks.length === 0) {
        console.log('  No broken links found');
        return;
    }

    console.log(`\n  Found ${brokenLinks.length} broken link(s):`);

    // Group by source tag for readability
    const byTag = {};
    for (const link of brokenLinks) {
        if (!byTag[link.tag]) {
            byTag[link.tag] = [];
        }
        byTag[link.tag].push(link);
    }

    for (const [tag, links] of Object.entries(byTag)) {
        console.log(`\n  In "${tag}":`);
        for (const link of links) {
            if (link.type === 'operation') {
                console.log(`    - Missing operation: ${link.targetTag}/${link.operationId}`);
                console.log(`      Link: ${link.originalLink}`);
            } else if (link.type === 'schema') {
                console.log(`    - Missing schema: ${link.schemaName}`);
                console.log(`      Link: ${link.originalLink}`);
            } else {
                console.log(`    - Missing tag: ${link.targetTag}`);
                console.log(`      Link: ${link.originalLink}`);
            }
        }
    }
}

module.exports = {
    buildOperationLookup,
    buildSchemaLookup,
    setSchemaLookup,
    transformLinks,
    transformDescription,
    operationIdToSlug,
    tagNameToSlug,
    schemaNameToSlug,
    getTransformStats,
    resetStats,
    getBrokenLinks,
    resetBrokenLinks,
    logBrokenLinks,
    HTTP_METHODS
};
