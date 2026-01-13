# IncidentIQ API Documentation Project

This document provides context and guidance for AI assistants working on this project.

## Project Overview

This is a Docusaurus-based API documentation site for the IncidentIQ API. It generates comprehensive API documentation from an OpenAPI specification using a hybrid approach:

1. **Preprocessing scripts** split and optimize the master OpenAPI spec
2. **docusaurus-plugin-openapi-docs** generates MDX documentation from the processed specs

## AI Assistant Instructions

- **Never start the dev server automatically** - The user will run `npm run start` manually when needed
- **Never kill processes on ports** - Let the user manage running processes

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Approach | Hybrid (preprocessing + plugin) | Leverages existing battle-tested scripts while getting plugin's MDX generation |
| "Try It" Panel | Disabled | Read-only documentation requested; configured via `hideSendButton: true` in config |
| Deployment | Self-hosted | Customer requirement |
| Scripts Origin | Adapted from `iiq-api-docs` | Existing Stoplight scripts at `/Users/stevecopous/dev/iiq-api-docs/scripts` were adapted |

## Related Projects

- **Source scripts**: `/Users/stevecopous/dev/iiq-api-docs/scripts` - Original Stoplight generation scripts
- **Overview content**: `/Users/stevecopous/dev/iiq-api-docs/overviews` - Source of overview markdown files

## Current State

- **Working**: Full build pipeline, 27 API categories, 2,478 MDX files generated
- **Overviews**: All 27 tags have overview content
- **Warnings**: Deprecated `onBrokenMarkdownLinks` config (non-blocking, can be migrated later)

## Architecture

```
openapi-spec.json (Master - 721 endpoints, 1019 schemas)
        ↓
scripts/preprocess-specs.js
        ↓
api-specs/*.json (Per-tag, tree-shaken specs)
        ↓
docusaurus-plugin-openapi-docs
        ↓
docs/api/**/*.mdx (Generated documentation)
```

## Key Directories

| Directory | Purpose |
|-----------|---------|
| `scripts/` | Build automation and preprocessing |
| `scripts/lib/` | Utility modules for spec processing |
| `api-specs/` | Generated per-tag OpenAPI specs (gitignored) |
| `overviews/` | Markdown content for API category pages |
| `docs/` | Static documentation content |
| `docs/api/` | Generated API documentation (gitignored) |
| `src/` | Custom React components and CSS |

## Key Files

| File | Purpose |
|------|---------|
| `openapi-spec.json` | Master OpenAPI specification |
| `docusaurus.config.ts` | Docusaurus configuration |
| `sidebars.ts` | Navigation structure |
| `api-config.json` | Plugin configuration (generated) |

## Build Commands

```bash
# Full build pipeline
npm run build

# Individual steps
npm run preprocess      # Split and optimize specs
npm run gen-config      # Generate plugin configuration
npm run gen-api-docs    # Generate MDX from specs
npm run start           # Development server

# Utilities
npm run clean           # Remove generated files
npm run rebuild         # Clean and rebuild
```

## Preprocessing Pipeline

The `scripts/preprocess-specs.js` script:

1. Loads the master `openapi-spec.json`
2. Splits paths by tag (28 tags total)
3. Tree-shakes schemas to include only those needed per tag (30-70% reduction)
4. Orders endpoints by `x-iiq-docs.order` metadata
5. Groups endpoints by `x-iiq-docs.section` metadata
6. Injects overview markdown content from `overviews/`
7. Outputs optimized specs to `api-specs/`

## x-iiq-docs Metadata

The OpenAPI spec uses custom `x-iiq-docs` extensions for organization:

```json
{
  "x-iiq-docs": {
    "section": "viewing",    // Groups endpoint in sidebar
    "order": 130             // Sort order within section
  }
}
```

## Adding New Content

### Adding an Overview

Create a markdown file in `overviews/` matching the tag name:

```markdown
# Tickets

Overview of the Tickets API...

## Common Use Cases

- Creating tickets
- Searching tickets
- ...
```

### Adding a Guide

Create a markdown file in `docs/guides/`:

```markdown
---
sidebar_position: 10
---

# My New Guide

Content...
```

Update `sidebars.ts` to include the new guide.

## Coding Conventions

### JavaScript (scripts/)

- Use CommonJS (`require`/`module.exports`)
- Include JSDoc comments for functions
- Use descriptive variable names
- Log progress to console for visibility

### TypeScript (src/, config)

- Use TypeScript for all configuration files
- Import types from Docusaurus packages
- Use `satisfies` for type narrowing

### Documentation (docs/)

- Use frontmatter for sidebar position
- Include code examples for API operations
- Use admonitions for important notes

## Common Tasks

### Updating the OpenAPI Spec

1. Replace `openapi-spec.json` with the new version
2. Run `npm run rebuild` to regenerate all documentation
3. Review the generated output for any issues

### Adding a New Tag/Category

The preprocessing script automatically handles new tags. To add overview content:

1. Create `overviews/NewTagName.md`
2. Run `npm run rebuild`

### Customizing Generated Documentation

To modify how the plugin generates documentation:

1. Swizzle the component: `npm run swizzle docusaurus-theme-openapi-docs`
2. Edit the ejected component in `src/theme/`

## Troubleshooting

### "api-config.json not found"

Run `npm run build:prepare` to generate the configuration.

### Empty API docs

1. Check that `openapi-spec.json` exists
2. Run `npm run preprocess` to generate specs
3. Run `npm run gen-api-docs` to generate MDX

### Sidebar not showing sections

Ensure endpoints have `x-iiq-docs.section` metadata in the OpenAPI spec.

## Script Library Details

| Script | Purpose | Key Functions |
|--------|---------|---------------|
| `lib/schema-resolver.js` | Tree-shakes schemas | `resolveSchemas()`, `collectRefs()` - recursively finds schema dependencies |
| `lib/tag-splitter.js` | Groups endpoints by tag | `splitPathsByTag()`, `extractSections()`, `sortPathsByOrder()` |
| `lib/overview-merger.js` | Injects markdown | `loadOverviews()`, `findOverview()`, `mergeOverview()` |
| `lib/docusaurus-adapter.js` | Plugin format bridge | `transformToDocusaurusFormat()`, `buildTagsWithSections()` |

## Sidebar Structure

The `sidebars.ts` imports generated sidebars from each API category:

```typescript
// Example: imports the generated tickets sidebar
items: require('./docs/api/tickets/sidebar.ts').default
```

Each generated sidebar (e.g., `docs/api/tickets/sidebar.ts`) contains the full navigation for that category, organized by sections from `x-iiq-docs.section` metadata.

## Dependencies

Key packages:

- `@docusaurus/core@3.8.1` - Docusaurus framework
- `docusaurus-plugin-openapi-docs@4.4.0` - OpenAPI MDX generation
- `docusaurus-theme-openapi-docs@4.4.0` - API documentation theme
- `lodash@4.17.21` - Utility functions

## Performance Notes

- The master spec is 4MB with 721 endpoints
- Tree-shaking reduces individual specs by 30-70%
- Full build takes approximately 2-5 minutes
- Development server hot-reloads documentation changes

## Replicating/Resetting State

To regenerate all documentation from scratch:

```bash
npm run clean           # Remove all generated files
npm run rebuild         # Full regeneration
```

To update after OpenAPI spec changes:

```bash
# Replace openapi-spec.json with new version, then:
npm run rebuild
```

To sync overview content from the original project:

```bash
cp /Users/stevecopous/dev/iiq-api-docs/overviews/*.md ./overviews/
npm run rebuild
```

## File Generation Summary

| Source | Generated | Count |
|--------|-----------|-------|
| `openapi-spec.json` | `api-specs/*.json` | 27 files |
| `api-specs/*.json` | `docs/api/**/*.mdx` | 2,478 files |
| `api-specs/*.json` | `docs/api/*/sidebar.ts` | 27 files |
| Script | `api-config.json` | 1 file |

## Links

- [Docusaurus Documentation](https://docusaurus.io/docs)
- [docusaurus-openapi-docs](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs)
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html)
