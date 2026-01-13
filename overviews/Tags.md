# Tags API

The Tags API provides access to tag management in IncidentIQ. Create and manage tags for categorizing and organizing tickets, assets, and other entities.

## Overview

Tags in IncidentIQ provide flexible labeling for organizing and filtering items across the platform. Tags can be applied to tickets, assets, and other entities for custom categorization beyond standard fields.

:::info
**What you can do with the Tags API**
:::

>
> - **Create and manage tags** for custom categorization
> - **Query existing tags** to find available labels
> - **Apply tags** to tickets, assets, and other entities
> - **Organize content** with flexible, user-defined labels

## Common Use Cases

### Custom Categorization
Add tags to tickets or assets for categorization that goes beyond standard fields.

### Project Tracking
Tag items related to specific projects or initiatives for easy filtering.

### Priority Flagging
Create tags to flag items needing special attention or handling.

### Reporting Groups
Use tags to group items for custom reporting and analytics.

## API Sections

| Section | Description |
|---------|-------------|
| **Retrieval** | Query and retrieve existing tags |
| **Managing** | Create, update, and delete tags |

## Quick Start

### Query Tags

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/tags/query" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{
    "Paging": {"PageSize": 50, "PageIndex": 0}
  }'
```

### Get Tag Details

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/tags/{TagId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId": "YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Create a New Tag

```json http
{
  "method": "POST",
  "url": "https://your-site.incidentiq.com/api/v1.0/tags",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN",
    "SiteId": "YOUR_SITE_ID",
    "Client": "ApiClient",
    "Content-Type": "application/json"
  },
  "body": {
    "Name": "High Priority",
    "Color": "#FF0000"
  }
}
```

## Related APIs

- [Tickets](#/Tickets) - Apply tags to tickets
- [Assets](#/Assets) - Apply tags to assets
