#!/usr/bin/env node
/**
 * Generate Plugin Configuration
 *
 * Scans the api-specs/ directory and generates the configuration object
 * for docusaurus-plugin-openapi-docs.
 *
 * Usage:
 *   npm run gen-config
 *   node scripts/generate-plugin-config.js
 *
 * Output:
 *   Writes api-config.json to the project root
 */

const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
    specsDir: path.resolve(__dirname, '../api-specs'),
    outputFile: path.resolve(__dirname, '../api-config.json'),
};

/**
 * Convert a file name to a config ID
 * @param {string} fileName - e.g., "custom-fields.json"
 * @returns {string} - e.g., "custom_fields"
 */
function fileNameToId(fileName) {
    return path.basename(fileName, '.json')
        .replace(/-/g, '_');
}

/**
 * Convert a file name to a label
 * @param {string} fileName - e.g., "custom-fields.json"
 * @returns {string} - e.g., "Custom Fields"
 */
function fileNameToLabel(fileName) {
    return path.basename(fileName, '.json')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Generate the plugin configuration
 * @returns {Object} - Configuration object for docusaurus-plugin-openapi-docs
 */
function generateConfig() {
    // Check if specs directory exists
    if (!fs.existsSync(CONFIG.specsDir)) {
        console.error(`ERROR: Specs directory not found: ${CONFIG.specsDir}`);
        console.error('Run "npm run preprocess" first to generate spec files.');
        process.exit(1);
    }

    // Get all JSON files
    const files = fs.readdirSync(CONFIG.specsDir)
        .filter(f => f.endsWith('.json'))
        .sort();

    if (files.length === 0) {
        console.error('ERROR: No spec files found in api-specs/');
        console.error('Run "npm run preprocess" first to generate spec files.');
        process.exit(1);
    }

    console.log(`Found ${files.length} spec files`);

    // Generate config for each spec
    const config = {};

    files.forEach(file => {
        const id = fileNameToId(file);
        const label = fileNameToLabel(file);
        const dirName = path.basename(file, '.json');

        config[id] = {
            specPath: `api-specs/${file}`,
            outputDir: `docs/api/${dirName}`,
            sidebarOptions: {
                groupPathsBy: 'tag',
                categoryLinkSource: 'tag',
            },
            showSchemas: true,
            // Uncomment to customize the label
            // label: label,
        };

        console.log(`  ${id}: ${file} -> docs/api/${dirName}/`);
    });

    return config;
}

/**
 * Main function
 */
function main() {
    console.log('='.repeat(60));
    console.log('Generating Docusaurus OpenAPI Plugin Configuration');
    console.log('='.repeat(60));
    console.log();

    const config = generateConfig();

    console.log();
    console.log(`Writing configuration to: ${CONFIG.outputFile}`);

    fs.writeFileSync(
        CONFIG.outputFile,
        JSON.stringify(config, null, 2)
    );

    console.log();
    console.log('Configuration generated successfully!');
    console.log(`Total API specs configured: ${Object.keys(config).length}`);
    console.log('='.repeat(60));
}

// Run
main();
