# Issues API

The Issues API provides access to issue and issue type management in IncidentIQ. Configure the problems that users can report when creating tickets, define issue type taxonomies, and manage issue visibility.

## Overview

Issues in IncidentIQ represent the specific problems users report: "Screen Cracked," "Won't Power On," "Software Installation Request," etc. Issue Types define the taxonomy and classification system for these issues.

:::info
**What you can do with the Issues API**
:::

>
> - **Manage issue definitions** and their configurations
> - **Define issue type taxonomies** and hierarchies
> - **Configure model-category associations** for issue types
> - **Organize issues** within categories and hierarchies

## Common Use Cases

### Issue Configuration
Set up the issues and issue types available for ticket creation.

### Dynamic Issue Lists
Retrieve issues available for specific asset types or categories.

### Issue Type Management
Define and organize the classification system for reportable problems.

### Self-Service Customization
Configure which issues appear in the end-user portal.

## API Sections

| Section | Description |
|---------|-------------|
| **Managing Issues** | Create, update, and delete issues |
| **Issue Type Definitions** | Manage issue type taxonomy |
| **Configuration & Settings** | Issue settings and properties |

## Quick Start

### List Issues

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/issues" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### List Issue Types

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/issues/types" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Get Issue Details

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/issues/{issueId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

## Related APIs

- [Tickets](#/Tickets) - Create tickets with specific issues
- [Model Issues](#/Model%20Issues) - Model-specific issue associations
- [Categories](#/Categories) - Issue categorization
