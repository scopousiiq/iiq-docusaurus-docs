/**
 * Link Transformer - Converts documentation links to Docusaurus format
 *
 * Transforms markdown links from OpenAPI internal format to Docusaurus URLs:
 * - Source: [POST /api/v1.0/search](#/Users/searchUsers)
 * - Output: [POST /api/v1.0/search](/docs/api/users/search-users)
 */

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head'];

// Track transformation statistics
let transformStats = { transformed: 0, crossTag: 0, sameTag: 0, notFound: 0, tagLinks: 0 };

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

    // First pass: Transform operation-level links [display text](#/TagName/operationId)
    // Captures: (1) display text, (2) tag name (may be URL-encoded), (3) operationId
    const operationLinkPattern = /\[([^\]]+)\]\(#\/([^\/\)]+)\/([^)]+)\)/g;

    let result = description.replace(operationLinkPattern, (match, displayText, tagName, operationId) => {
        // Decode URL-encoded tag names (Custom%20Fields -> Custom Fields)
        const decodedTag = decodeURIComponent(tagName);

        // Look up the operation
        const opInfo = operationLookup.get(operationId);
        if (!opInfo) {
            // Operation not found - preserve original link
            transformStats.notFound++;
            return match;
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
            transformStats.notFound++;
            return match;
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
    transformStats = { transformed: 0, crossTag: 0, sameTag: 0, notFound: 0, tagLinks: 0 };
}

module.exports = {
    buildOperationLookup,
    transformLinks,
    transformDescription,
    operationIdToSlug,
    tagNameToSlug,
    getTransformStats,
    resetStats,
    HTTP_METHODS
};
