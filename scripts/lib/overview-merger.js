/**
 * Overview Merger - Injects markdown content from overviews/ into controller specs
 *
 * Looks for markdown files matching tag names and merges them into
 * the info.description field of the generated controller specs.
 */

const fs = require('fs');
const path = require('path');

/**
 * Load all available overview markdown files
 * @param {string} overviewsPath - Path to overviews directory
 * @returns {Map<string, string>} - Map of tag name to markdown content
 */
function loadOverviews(overviewsPath) {
    const overviews = new Map();

    if (!fs.existsSync(overviewsPath)) {
        console.warn(`  Overviews directory not found: ${overviewsPath}`);
        return overviews;
    }

    const files = fs.readdirSync(overviewsPath);

    files.forEach(file => {
        if (!file.endsWith('.md')) return;

        const tagName = file.replace('.md', '');
        const filePath = path.join(overviewsPath, file);

        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            overviews.set(tagName, content);
            overviews.set(tagName.toLowerCase(), content); // Also store lowercase variant
        } catch (err) {
            console.warn(`  Could not read overview: ${file}`);
        }
    });

    return overviews;
}

/**
 * Find matching overview for a tag
 * @param {string} tagName - Tag name to find overview for
 * @param {Map<string, string>} overviews - Loaded overviews
 * @returns {string|null} - Markdown content or null
 */
function findOverview(tagName, overviews) {
    // Try exact match first
    if (overviews.has(tagName)) {
        return overviews.get(tagName);
    }

    // Try lowercase
    if (overviews.has(tagName.toLowerCase())) {
        return overviews.get(tagName.toLowerCase());
    }

    // Try with spaces replaced by common variants
    const variants = [
        tagName.replace(/ /g, '-'),
        tagName.replace(/ /g, '_'),
        tagName.replace(/ /g, ''),
    ];

    for (const variant of variants) {
        if (overviews.has(variant)) {
            return overviews.get(variant);
        }
        if (overviews.has(variant.toLowerCase())) {
            return overviews.get(variant.toLowerCase());
        }
    }

    return null;
}

/**
 * Generate a default description for a tag
 * @param {string} tagName - Tag name
 * @param {Object} tagDef - Tag definition from spec
 * @param {Object} stats - Tag statistics
 * @returns {string} - Generated description
 */
function generateDefaultDescription(tagName, tagDef, stats) {
    const baseDesc = tagDef?.description || '';

    const parts = [
        baseDesc,
        '',
        `This section contains **${stats.endpoints} endpoints** for ${tagName.toLowerCase()} operations.`
    ];

    if (stats.sections > 0) {
        parts.push(`Operations are organized into **${stats.sections} categories** for easier navigation.`);
    }

    // Add method breakdown if interesting
    const methodParts = [];
    if (stats.methods.get > 0) methodParts.push(`${stats.methods.get} GET`);
    if (stats.methods.post > 0) methodParts.push(`${stats.methods.post} POST`);
    if (stats.methods.put > 0) methodParts.push(`${stats.methods.put} PUT`);
    if (stats.methods.patch > 0) methodParts.push(`${stats.methods.patch} PATCH`);
    if (stats.methods.delete > 0) methodParts.push(`${stats.methods.delete} DELETE`);

    if (methodParts.length > 1) {
        parts.push('', `**Available operations:** ${methodParts.join(', ')}`);
    }

    return parts.join('\n');
}

/**
 * Merge overview content into a controller spec
 * @param {Object} spec - Controller OpenAPI spec
 * @param {string} tagName - Tag name
 * @param {Map<string, string>} overviews - Loaded overviews
 * @param {Object} tagDef - Original tag definition
 * @param {Object} stats - Tag statistics
 * @returns {Object} - Spec with merged description
 */
function mergeOverview(spec, tagName, overviews, tagDef, stats) {
    const overview = findOverview(tagName, overviews);

    if (overview) {
        spec.info.description = overview;
    } else {
        // Generate a useful default description
        spec.info.description = generateDefaultDescription(tagName, tagDef, stats);
    }

    return spec;
}

/**
 * Create a template for a new overview file
 * @param {string} tagName - Tag name
 * @param {Object} tagDef - Tag definition
 * @param {Object} stats - Tag statistics
 * @returns {string} - Markdown template
 */
function createOverviewTemplate(tagName, tagDef, stats) {
    const sections = [];

    sections.push(`# ${tagName}`);
    sections.push('');

    if (tagDef?.description) {
        sections.push(tagDef.description);
        sections.push('');
    }

    sections.push('## Overview');
    sections.push('');
    sections.push(`The ${tagName} API provides endpoints for managing ${tagName.toLowerCase()} within IncidentIQ.`);
    sections.push('');

    sections.push('## Common Use Cases');
    sections.push('');
    sections.push('- TODO: Add common use cases');
    sections.push('- TODO: Add workflow examples');
    sections.push('');

    sections.push('## Authentication');
    sections.push('');
    sections.push('All endpoints in this section require authentication via:');
    sections.push('- **Authorization**: Bearer token');
    sections.push('- **SiteId**: Your site identifier');
    sections.push('- **Client**: Set to "ApiClient"');
    sections.push('');

    if (stats.sections > 0) {
        sections.push('## Sections');
        sections.push('');
        sections.push(`This API is organized into ${stats.sections} sections:`);
        sections.push('');
        sections.push('<!-- Sections will be auto-populated -->');
        sections.push('');
    }

    sections.push('## Quick Start');
    sections.push('');
    sections.push('```bash');
    sections.push('# Example API call');
    sections.push('curl -X GET "https://your-site.incidentiq.com/api/v1.0/..." \\');
    sections.push('  -H "Authorization: Bearer YOUR_TOKEN" \\');
    sections.push('  -H "SiteId: YOUR_SITE_ID" \\');
    sections.push('  -H "Client: ApiClient"');
    sections.push('```');
    sections.push('');

    return sections.join('\n');
}

/**
 * List tags that are missing overview files
 * @param {string[]} tagNames - All tag names
 * @param {Map<string, string>} overviews - Loaded overviews
 * @returns {string[]} - Tags without overviews
 */
function getMissingOverviews(tagNames, overviews) {
    return tagNames.filter(tag => !findOverview(tag, overviews));
}

module.exports = {
    loadOverviews,
    findOverview,
    generateDefaultDescription,
    mergeOverview,
    createOverviewTemplate,
    getMissingOverviews
};
