---
sidebar_position: 1
slug: /
---

# Welcome to the Incident IQ API

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

![Intro](https://iiqstorage.blob.core.windows.net/public/apidocs/iiq-intro.gif)

Incident IQ is the unified K-12 operations platform trusted by 2,000+ school districts across all 50 states. Our API gives you programmatic access to the same powerful capabilities that help districts streamline technology support, asset management, facilities maintenance, and more.

Whether you're building custom integrations, automating workflows, or connecting Incident IQ with your existing systems, this documentation will help you get started quickly and build with confidence.

---

## What You Can Do

<Tabs>
<TabItem value="query" label="Query Data">

**Search and retrieve information in real-time**

- Search tickets by status, assignee, or custom criteria
- Query asset inventory and device details
- Look up users, locations, and organizational structure
- Export data for reporting and analysis

</TabItem>
<TabItem value="create" label="Create Records">

**Programmatically create new entries**

- Submit help desk tickets from external systems
- Add assets and inventory items
- Create and provision user accounts
- Generate work orders and service requests

</TabItem>
<TabItem value="update" label="Update & Manage">

**Modify and manage existing data**

- Update ticket status and assignments
- Transfer asset ownership between users
- Bulk update records efficiently
- Manage lifecycle workflows

</TabItem>
<TabItem value="integrate" label="Integrate">

**Connect with your ecosystem**

- Receive real-time event notifications via web hooks
- Sync data with SIS, MDM, and finance systems
- Build custom dashboards and reports
- Automate routine administrative tasks

</TabItem>
</Tabs>

---

## Quick Start

Get up and running in four steps:

| Step | Guide | Description |
|:----:|-------|-------------|
| 1 | [Access and API Keys](./guides/authentication) | Get your API token and learn required headers |
| 2 | [Popular APIs](./guides/popular-apis) | Explore commonly used endpoints |
| 3 | [Paging and Sorting](./guides/pagination) | Learn to paginate through results |
| 4 | [Filtering with Facets](./guides/filtering) | Search and filter data with facets |

:::tip Ready to dive in?
Most developers can make their first successful API call within minutes. Start with [Access and API Keys](./guides/authentication) to get your credentials.
:::

---

## Your First API Call

Here's a quick example to get a list of tickets:

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/tickets/search" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{"$paging": {"$pageSize": 10}}'
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const response = await fetch('https://your-site.incidentiq.com/api/v1.0/tickets/search', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN',
    'SiteId': 'YOUR_SITE_ID',
    'Client': 'ApiClient',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ $paging: { $pageSize: 10 } })
});

const data = await response.json();
console.log(data.Items);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

response = requests.post(
    'https://your-site.incidentiq.com/api/v1.0/tickets/search',
    headers={
        'Authorization': 'Bearer YOUR_API_TOKEN',
        'SiteId': 'YOUR_SITE_ID',
        'Client': 'ApiClient',
        'Content-Type': 'application/json'
    },
    json={'$paging': {'$pageSize': 10}}
)

data = response.json()
print(data['Items'])
```

</TabItem>
</Tabs>

---

## Documentation Guide

### Fundamentals

| Guide | Description |
|-------|-------------|
| [Access and API Keys](./guides/authentication) | Authentication, headers, and making your first request |
| [Products, Sites & Workspaces](./guides/products-sites-workspaces) | Understanding the platform architecture |
| [Paging and Sorting](./guides/pagination) | Pagination, sorting, and query basics |

### Domain Guides

| Guide | Description |
|-------|-------------|
| [Filtering with Facets](./guides/filtering) | Advanced search and filtering syntax |
| [Working with Tickets](./guides/working-with-tickets) | Create, query, and manage help desk tickets |
| [Working with Ticket Activities](./guides/ticket-activities) | Add comments, log work, and attach files |
| [Working with Assets](./guides/working-with-assets) | Query inventory and manage asset ownership |

### Integration

| Guide | Description |
|-------|-------------|
| [Web Hooks](./guides/webhooks) | Real-time event notifications |
| [Support & Resources](./guides/support) | Get help and troubleshooting tips |

---

## API Reference

Browse the complete API reference by domain:

| API | Description |
|-----|-------------|
| [Tickets](/docs/api/tickets/tickets-api) | Help desk ticket operations |
| [Assets](/docs/api/assets/assets-api) | Asset and inventory management |
| [Users](/docs/api/users/users-api) | User lookup and management |
| [Locations](/docs/api/locations/locations-api) | Location hierarchy |

:::info Explore the Sidebar
Use the navigation sidebar to browse all available API endpoints organized by category. Each endpoint includes request/response schemas, parameter details, and code examples.
:::

---

## Need Help?

:::warning Technical Documentation
This resource is designed for developers and technical administrators. If you're looking for general product help guides and announcements, visit our [Help Center](https://help.incidentiq.com/hc/en-us).
:::

Having trouble or have questions about the API? Check out our [Support & Resources](./guides/support) guide for troubleshooting tips and contact information.
