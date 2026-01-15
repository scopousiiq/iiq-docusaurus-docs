The Filters API provides access to saved filter management in IncidentIQ.

## Overview

Filters in IncidentIQ save search criteria for quick access to commonly-needed data views.

:::info
**What you can do with the Filters API**
:::

>
> - **List saved filters** for tickets, assets, and other entities
> - **Retrieve filter details** including their criteria
> - **Manage personal and shared filters**

## Common Use Cases

### Quick Access Views
Create and retrieve filters for frequently-used searches.

### Shared Team Filters
Access filters shared across teams for consistent views.

### Integration Filtering
Apply saved filters programmatically in integrations.

## API Sections

| Section | Description |
|---------|-------------|
| **Listing** | List available filters |
| **Details** | Retrieve filter configurations |
| **Managing** | Create and update filters |

## Quick Start

### List Saved Filters

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/filters" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

## Related APIs

- [Tickets](#/Tickets) - Apply filters to ticket searches
- [Assets](#/Assets) - Apply filters to asset searches
- [Views](#/Views) - Saved view configurations
