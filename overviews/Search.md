The Search API provides advanced cross-entity search capabilities with faceting support in IncidentIQ.

## Overview

The Search API enables powerful searches across multiple entity types simultaneously. It supports full-text search, faceted filtering, and relevance ranking.

:::info
**What you can do with the Search API**
:::

>
> - **Search across entities** including tickets, assets, users, and knowledge articles
> - **Use faceted search** for refined filtering
> - **Get unified search results** from a single endpoint

## Common Use Cases

### Universal Search
Build search interfaces that find results across all entity types.

### User Lookup
Quickly find users by name, email, or other attributes.

### Knowledge Search
Search help articles and documentation.

## Quick Start

### Search Across Entities

```json http
{
  "method": "POST",
  "url": "https://your-site.incidentiq.com/api/v1.0/search",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN",
    "SiteId": "YOUR_SITE_ID",
    "Client": "ApiClient",
    "Content-Type": "application/json"
  },
  "body": {
    "Query": "chromebook screen",
    "Types": ["Ticket", "Asset", "KnowledgeArticle"]
  }
}
```

:::info
**Search Types**
:::

>
> The `Types` parameter accepts: `Ticket`, `Asset`, `User`, `KnowledgeArticle`, `Location`, and more. Omit to search all types.

## Related APIs

- [Tickets](#/Tickets) - Ticket-specific search
- [Assets](#/Assets) - Asset-specific search
- [Users](#/Users) - User-specific search
