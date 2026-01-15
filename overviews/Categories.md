The Categories API provides access to IncidentIQ's classification system. Manage categories for tickets, assets, knowledge base articles, and other entities to keep your data organized.

## Overview

Categories in IncidentIQ help organize and classify items across the platform. They enable filtered views, targeted workflows, and structured reporting.

:::info
**What you can do with the Categories API**
:::

>
> - **Retrieve category hierarchies** for different entity types
> - **Create and manage categories** with parent-child relationships
> - **Search categories** by name or type
> - **Configure app links** for category-specific integrations
> - **Perform bulk operations** on category assignments

## Common Use Cases

### Ticket Routing
Use categories to automatically route tickets to the appropriate team or queue based on issue classification.

### Asset Organization
Organize assets by category (Laptops, Printers, Network Equipment) for easier inventory management.

### Reporting
Filter reports by category to analyze specific subsets of tickets or assets.

### Knowledge Base Structure
Organize help articles into categories for easier discovery by end users.

### Integration Mapping
Map external system categories to IncidentIQ categories during data sync.

## API Sections

| Section | Description |
|---------|-------------|
| **Retrieval** | Get categories and their hierarchies |
| **Listing** | List all categories with filtering |
| **Managing** | Create, update, and delete categories |
| **Searching** | Search categories by various criteria |
| **App Links** | Manage category-specific app integrations |
| **Suggestions** | Get category suggestions based on context |
| **Bulk** | Mass category operations |

## Quick Start

### List All Ticket Categories

**cURL
**

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/categories/ticket" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

**JavaScript
**

```javascript
const response = await fetch('https://your-site.incidentiq.com/api/v1.0/categories/ticket', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'SiteId': 'YOUR_SITE_ID',
    'Client': 'ApiClient'
  }
});

const data = await response.json();
// Returns hierarchical category tree
console.log(data.Items);
```

**Python
**

```python
import requests

response = requests.get(
    'https://your-site.incidentiq.com/api/v1.0/categories/ticket',
    headers={
        'Authorization': 'Bearer YOUR_TOKEN',
        'SiteId': 'YOUR_SITE_ID',
        'Client': 'ApiClient'
    }
)

data = response.json()
# Returns hierarchical category tree
print(data['Items'])
```


---

### Get Category Details

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/categories/{categoryId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Search Categories

**cURL
**

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/categories/search" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{
    "Query": "Hardware",
    "EntityType": "Ticket"
  }'
```

**JavaScript
**

```javascript
const response = await fetch('https://your-site.incidentiq.com/api/v1.0/categories/search', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'SiteId': 'YOUR_SITE_ID',
    'Client': 'ApiClient',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    Query: 'Hardware',
    EntityType: 'Ticket'
  })
});

const data = await response.json();
console.log(data.Items);
```

**Python
**

```python
import requests

response = requests.post(
    'https://your-site.incidentiq.com/api/v1.0/categories/search',
    headers={
        'Authorization': 'Bearer YOUR_TOKEN',
        'SiteId': 'YOUR_SITE_ID',
        'Client': 'ApiClient',
        'Content-Type': 'application/json'
    },
    json={
        'Query': 'Hardware',
        'EntityType': 'Ticket'
    }
)

data = response.json()
print(data['Items'])
```


---

## Key Concepts

:::info
**Category Types**
:::

>
> Categories exist for different entity types:
> - **Ticket Categories** - Classify help desk requests
> - **Asset Categories** - Organize device types
> - **Knowledge Base Categories** - Structure help articles
> - **Model Categories** - Group device models

### Hierarchies
Categories can have parent-child relationships, creating a tree structure. For example: Hardware > Laptops > Chromebooks.

:::warning
**Category vs. Issue Type**
:::

>
> Categories provide broad classification, while Issue Types define specific problems. A ticket might have category "Hardware" and issue type "Screen Cracked."

## Related APIs

- [Tickets](#/Tickets) - Assign categories to tickets
- [Assets](#/Assets) - Categorize assets
- [Issues](#/Issues) - Issue types within categories
