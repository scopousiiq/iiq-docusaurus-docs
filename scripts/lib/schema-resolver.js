/**
 * Schema Resolver - Tree-shakes schemas to include only those referenced by endpoints
 *
 * Walks through paths and recursively resolves all $ref dependencies,
 * returning only the schemas actually needed for a given set of endpoints.
 */

/**
 * Extract schema name from a $ref string
 * @param {string} ref - e.g., "#/components/schemas/TicketResponse"
 * @returns {string|null} - e.g., "TicketResponse"
 */
function extractSchemaName(ref) {
    if (!ref || typeof ref !== 'string') return null;
    const match = ref.match(/#\/components\/schemas\/(.+)$/);
    return match ? match[1] : null;
}

/**
 * Recursively walk an object and collect all $ref schema names
 * @param {any} obj - Object to walk
 * @param {Set<string>} refs - Set to collect schema names into
 */
function collectRefs(obj, refs) {
    if (!obj || typeof obj !== 'object') return;

    if (Array.isArray(obj)) {
        obj.forEach(item => collectRefs(item, refs));
        return;
    }

    // Check for $ref at this level
    if (obj.$ref) {
        const schemaName = extractSchemaName(obj.$ref);
        if (schemaName) refs.add(schemaName);
    }

    // Recurse into all properties
    Object.values(obj).forEach(value => collectRefs(value, refs));
}

/**
 * Resolve all schemas needed for a set of paths, including transitive dependencies
 * @param {Object} paths - OpenAPI paths object
 * @param {Object} allSchemas - All available schemas from components.schemas
 * @returns {Object} - Only the schemas needed for these paths
 */
function resolveSchemas(paths, allSchemas) {
    const needed = new Set();
    const resolved = new Set();

    // First pass: collect direct refs from paths
    collectRefs(paths, needed);

    // Iteratively resolve transitive dependencies
    let hasNew = true;
    while (hasNew) {
        hasNew = false;
        for (const schemaName of needed) {
            if (resolved.has(schemaName)) continue;
            resolved.add(schemaName);

            const schema = allSchemas[schemaName];
            if (schema) {
                const newRefs = new Set();
                collectRefs(schema, newRefs);
                for (const ref of newRefs) {
                    if (!needed.has(ref)) {
                        needed.add(ref);
                        hasNew = true;
                    }
                }
            }
        }
    }

    // Build result with only needed schemas
    const result = {};
    for (const schemaName of [...needed].sort()) {
        if (allSchemas[schemaName]) {
            result[schemaName] = allSchemas[schemaName];
        }
    }

    return result;
}

/**
 * Get statistics about schema resolution
 * @param {Object} allSchemas - All schemas
 * @param {Object} resolvedSchemas - Resolved subset
 * @returns {Object} - Stats object
 */
function getResolutionStats(allSchemas, resolvedSchemas) {
    const totalCount = Object.keys(allSchemas).length;
    const resolvedCount = Object.keys(resolvedSchemas).length;
    const reduction = totalCount > 0
        ? Math.round((1 - resolvedCount / totalCount) * 100)
        : 0;

    return {
        total: totalCount,
        resolved: resolvedCount,
        removed: totalCount - resolvedCount,
        reductionPercent: reduction
    };
}

module.exports = {
    extractSchemaName,
    collectRefs,
    resolveSchemas,
    getResolutionStats
};
