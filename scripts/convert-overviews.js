#!/usr/bin/env node
/**
 * Convert Stoplight-style markdown to Docusaurus-compatible format
 *
 * Conversions:
 * - <!-- theme: info --> + blockquote -> :::info admonition
 * - <!-- theme: warning --> + blockquote -> :::warning admonition
 * - <!-- theme: danger --> + blockquote -> :::danger admonition
 * - <!-- theme: success --> + blockquote -> :::tip admonition
 * - Remove duplicate H1 title that matches the tag name
 * - Convert tab syntax to simple code blocks with language labels
 */

const fs = require('fs');
const path = require('path');

const OVERVIEWS_DIR = path.resolve(__dirname, '../overviews');

/**
 * Convert a single overview file
 */
function convertOverview(filePath) {
    let content = fs.readFileSync(filePath, 'utf-8');
    const originalContent = content;
    let conversions = 0;

    // Convert theme comments + blockquotes to admonitions
    // Pattern: <!-- theme: TYPE -->\n> content
    const themePatterns = [
        { pattern: /<!--\s*theme:\s*info\s*-->\s*\n((?:>.*\n?)+)/gi, replacement: ':::info\n$1:::\n', type: 'info' },
        { pattern: /<!--\s*theme:\s*warning\s*-->\s*\n((?:>.*\n?)+)/gi, replacement: ':::warning\n$1:::\n', type: 'warning' },
        { pattern: /<!--\s*theme:\s*danger\s*-->\s*\n((?:>.*\n?)+)/gi, replacement: ':::danger\n$1:::\n', type: 'danger' },
        { pattern: /<!--\s*theme:\s*success\s*-->\s*\n((?:>.*\n?)+)/gi, replacement: ':::tip\n$1:::\n', type: 'success' },
    ];

    for (const { pattern, replacement, type } of themePatterns) {
        const matches = content.match(pattern);
        if (matches) {
            content = content.replace(pattern, (match, blockquote) => {
                conversions++;
                // Remove the > prefix from each line and clean up
                const cleanedContent = blockquote
                    .split('\n')
                    .map(line => line.replace(/^>\s?/, ''))
                    .join('\n')
                    .trim();
                return `:::${type}\n${cleanedContent}\n:::\n`;
            });
        }
    }

    // Remove Stoplight tab syntax (convert to labeled code blocks)
    // Pattern: <!-- type: tab\ntitle: TITLE -->
    content = content.replace(/<!--\s*type:\s*tab\s*\n\s*title:\s*([^>]+)\s*-->\s*\n/gi, '**$1**\n\n');

    // Remove tab-end comments
    content = content.replace(/<!--\s*type:\s*tab-end\s*-->\s*\n?/gi, '\n---\n\n');

    // Remove standalone title comments
    content = content.replace(/<!--\s*title:\s*"[^"]*"\s*-->\s*\n/gi, '');

    // Clean up multiple consecutive newlines
    content = content.replace(/\n{4,}/g, '\n\n\n');

    // Only write if changes were made
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        return { converted: true, conversions };
    }
    return { converted: false, conversions: 0 };
}

/**
 * Main function
 */
function main() {
    console.log('Converting Stoplight syntax to Docusaurus format...\n');

    const files = fs.readdirSync(OVERVIEWS_DIR).filter(f => f.endsWith('.md'));
    let totalConverted = 0;
    let totalConversions = 0;

    for (const file of files) {
        const filePath = path.join(OVERVIEWS_DIR, file);
        const { converted, conversions } = convertOverview(filePath);

        if (converted) {
            console.log(`  ✓ ${file} (${conversions} conversions)`);
            totalConverted++;
            totalConversions += conversions;
        } else {
            console.log(`  - ${file} (no changes)`);
        }
    }

    console.log(`\nDone! Converted ${totalConverted} files with ${totalConversions} total changes.`);
}

main();
