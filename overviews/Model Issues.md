# Model Issues API

The Model Issues API manages the association between device models and the issues that can be reported for them.

## Overview

Model Issues define which problems can be reported for specific device models. A Chromebook might have "Screen Cracked" and "Keyboard Missing Keys" while a printer has "Paper Jam" and "Toner Low."

:::info
**What you can do with the Model Issues API**
:::

>
> - **Search model-issue associations** by model or issue
> - **Configure which issues apply** to specific device models
> - **Handle inheritance** from parent models or categories
> - **Manage integration-specific** issue mappings

## API Sections

| Section | Description |
|---------|-------------|
| **Searching** | Find model-issue associations |
| **Associations** | Create and manage model-issue links |
| **Inheritance** | Configure issue inheritance rules |
| **Integrations** | Integration-specific issue mappings |

## Quick Start

### Get Issues for a Model

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/model-issues/{modelId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

## Related APIs

- [Issues](#/Issues) - Issue definitions
- [Assets](#/Assets) - Asset models and types
