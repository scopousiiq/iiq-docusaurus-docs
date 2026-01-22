#!/usr/bin/env node
/**
 * Preprocess OpenAPI Specs for Docusaurus
 *
 * This script transforms the master OpenAPI specification into optimized
 * per-tag specs suitable for the docusaurus-plugin-openapi-docs plugin.
 *
 * Features:
 * - Splits the master spec by tag
 * - Tree-shakes schemas to include only those needed per tag
 * - Orders endpoints by x-iiq-docs metadata
 * - Injects overview markdown content
 * - Transforms to Docusaurus-compatible format
 *
 * Usage:
 *   npm run preprocess
 *   node scripts/preprocess-specs.js
 *   node scripts/preprocess-specs.js --verbose
 */

const fs = require('fs');
const path = require('path');

// Import utilities
const { resolveSchemas, getResolutionStats } = require('./lib/schema-resolver');
const { extractTags, splitPathsByTag, sortPathsByOrder, getTagStats } = require('./lib/tag-splitter');
const { loadOverviews, findOverview } = require('./lib/overview-merger');
const { transformToDocusaurusFormat, getFileName } = require('./lib/docusaurus-adapter');
const { buildOperationLookup, buildSchemaLookup, setSchemaLookup, transformLinks, getTransformStats, getBrokenLinks, logBrokenLinks } = require('./lib/link-transformer');

// Configuration
const CONFIG = {
    sourceSpec: path.resolve(__dirname, '../openapi-spec.json'),
    outputDir: path.resolve(__dirname, '../api-specs'),
    overviewsDir: path.resolve(__dirname, '../overviews'),
    verbose: process.argv.includes('--verbose') || process.argv.includes('-v'),
};

/**
 * Main preprocessing function
 */
async function main() {
    console.log('='.repeat(60));
    console.log('Preprocessing OpenAPI Spec for Docusaurus');
    console.log('='.repeat(60));
    console.log();

    // Check if source spec exists
    if (!fs.existsSync(CONFIG.sourceSpec)) {
        console.error(`ERROR: Source spec not found: ${CONFIG.sourceSpec}`);
        process.exit(1);
    }

    // Load source spec
    console.log('Loading source specification...');
    const sourceSpec = JSON.parse(fs.readFileSync(CONFIG.sourceSpec, 'utf-8'));
    const pathCount = Object.keys(sourceSpec.paths || {}).length;
    const schemaCount = Object.keys(sourceSpec.components?.schemas || {}).length;
    console.log(`  Loaded: ${pathCount} paths, ${schemaCount} schemas`);
    console.log();

    // Load overview markdown files
    console.log('Loading overview files...');
    const overviews = loadOverviews(CONFIG.overviewsDir);
    console.log(`  Found: ${overviews.size / 2} overview files`);
    console.log();

    // Extract tags and split paths
    console.log('Analyzing tags and endpoints...');
    const tags = extractTags(sourceSpec);
    const pathsByTag = splitPathsByTag(sourceSpec);
    console.log(`  Found: ${pathsByTag.size} tags with endpoints`);
    console.log();

    // Build operation lookup for link transformation
    console.log('Building operation lookup for link transformation...');
    const operationLookup = buildOperationLookup(sourceSpec);
    const validTags = new Set(pathsByTag.keys());
    console.log(`  Indexed: ${operationLookup.size} operations`);

    // Build schema lookup for schema link transformation
    console.log('Building schema lookup for link transformation...');
    const schemaLookupMap = buildSchemaLookup(sourceSpec);
    setSchemaLookup(schemaLookupMap);
    console.log(`  Indexed: ${schemaLookupMap.size} schemas`);
    console.log();

    // Ensure output directory exists
    if (!fs.existsSync(CONFIG.outputDir)) {
        fs.mkdirSync(CONFIG.outputDir, { recursive: true });
        console.log(`Created output directory: ${CONFIG.outputDir}`);
    } else {
        // Clean existing specs
        const existingFiles = fs.readdirSync(CONFIG.outputDir).filter(f => f.endsWith('.json'));
        if (existingFiles.length > 0) {
            console.log(`Cleaning ${existingFiles.length} existing spec files...`);
            existingFiles.forEach(f => fs.unlinkSync(path.join(CONFIG.outputDir, f)));
        }
    }
    console.log();

    // Process each tag
    console.log('Generating per-tag specifications:');
    console.log('-'.repeat(60));

    let totalEndpoints = 0;
    let totalSchemas = 0;
    const results = [];

    for (const [tagName, paths] of pathsByTag) {
        const tagDef = tags.get(tagName);
        const sortedPaths = sortPathsByOrder(paths);
        const stats = getTagStats(sortedPaths);

        // Tree-shake schemas
        const allSchemas = sourceSpec.components?.schemas || {};
        const resolvedSchemas = resolveSchemas(sortedPaths, allSchemas);
        const schemaStats = getResolutionStats(allSchemas, resolvedSchemas);

        // Get overview content
        const overview = findOverview(tagName, overviews);

        // Transform to Docusaurus format
        const spec = transformToDocusaurusFormat({
            tagName,
            tagDef,
            paths: sortedPaths,
            schemas: resolvedSchemas,
            overview,
            sourceSpec,
            stats,
        });

        // Transform internal documentation links to Docusaurus URLs
        transformLinks(spec, tagName, operationLookup, validTags);
        const linkStats = getTransformStats();

        // Write output file
        const fileName = getFileName(tagName) + '.json';
        const filePath = path.join(CONFIG.outputDir, fileName);
        fs.writeFileSync(filePath, JSON.stringify(spec, null, 2));

        // Log progress
        const hasOverview = overview ? 'Yes' : 'No';
        console.log(`  ${tagName.padEnd(20)} | ${stats.endpoints.toString().padStart(3)} endpoints | ${schemaStats.resolved.toString().padStart(3)} schemas (${schemaStats.reductionPercent}% reduction) | Overview: ${hasOverview}`);

        if (CONFIG.verbose) {
            console.log(`    -> ${fileName}`);
            console.log(`    Methods: GET=${stats.methods.get}, POST=${stats.methods.post}, PUT=${stats.methods.put}, DELETE=${stats.methods.delete}`);
            console.log(`    Sections: ${stats.sections}`);
            if (linkStats.transformed > 0) {
                console.log(`    Links transformed: ${linkStats.transformed} (${linkStats.sameTag} same-tag, ${linkStats.crossTag} cross-tag)`);
            }
        }

        totalEndpoints += stats.endpoints;
        totalSchemas += schemaStats.resolved;
        results.push({
            tag: tagName,
            fileName,
            endpoints: stats.endpoints,
            schemas: schemaStats.resolved,
            reduction: schemaStats.reductionPercent,
            hasOverview: !!overview,
        });
    }

    console.log('-'.repeat(60));
    console.log();

    // Summary
    console.log('Summary:');
    console.log(`  Total specs generated: ${results.length}`);
    console.log(`  Total endpoints: ${totalEndpoints}`);
    console.log(`  Average schemas per spec: ${Math.round(totalSchemas / results.length)}`);
    console.log(`  Specs with overviews: ${results.filter(r => r.hasOverview).length}/${results.length}`);
    console.log();

    // Top tags by endpoint count
    const topTags = results
        .sort((a, b) => b.endpoints - a.endpoints)
        .slice(0, 5);

    console.log('Top 5 tags by endpoint count:');
    topTags.forEach((r, i) => {
        console.log(`  ${i + 1}. ${r.tag}: ${r.endpoints} endpoints`);
    });
    console.log();

    // Missing overviews
    const missingOverviews = results.filter(r => !r.hasOverview);
    if (missingOverviews.length > 0) {
        console.log(`Tags missing overviews (${missingOverviews.length}):`);
        missingOverviews.forEach(r => {
            console.log(`  - ${r.tag}`);
        });
        console.log();
    }

    // Broken links report
    const brokenLinks = getBrokenLinks();
    if (brokenLinks.length > 0) {
        console.log('Broken Links Report:');
        console.log('-'.repeat(60));
        logBrokenLinks();
        console.log();
    }

    console.log('='.repeat(60));
    console.log('Preprocessing complete!');
    console.log(`Output directory: ${CONFIG.outputDir}`);
    console.log('='.repeat(60));
}

// Run
main().catch(err => {
    console.error('Preprocessing failed:', err);
    process.exit(1);
});
