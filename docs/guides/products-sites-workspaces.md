---
sidebar_position: 3
---

# Products, Sites & Workspaces

Incident IQ is a multi-product platform that serves K-12 school districts. Understanding the relationship between products, sites, and workspaces helps when working with the API.

## Sites

A **Site** represents your Incident IQ instance—typically a school district or organization.

- Each site has a unique `SiteId` (GUID)
- The `SiteId` header is required on all API requests
- Your API token is scoped to a specific site

```
SiteId: bb6cece8-e4f4-e511-a789-005056bb000e
```

## Products and the ProductId Header

Incident IQ offers multiple products. The `ProductId` header can be used to provide product context for API requests.

### Available Products

| Product | Product Id | Product Key | Description |
|---------|------------|-------------|-------------|
| **Ticketing (Help Desk)** | `88df910c-91aa-e711-80c2-0004ffa00010` | `iiqtickets` | IT service desk tickets |
| **Facilities** | `88df910c-91aa-e711-80c2-0004ffa00020` | `iiqfacilities` | Maintenance work orders |
| **Change Management** | `88df910c-91aa-e711-80c2-0004ffa00040` | `iiqapprovals` | Approval workflows |
| **Assets** | `88df910c-91aa-e711-80c2-0004ffa00050` | `iiqassets` | Device & inventory tracking |
| **Human Resources** | `88df910c-91aa-e711-80c2-0004ffa00060` | `iiqhumanresources` | HR requests |

:::info
Not all products may be enabled for your site. The Developer Tools page will only show products included in your subscription.
:::

### Example Request with ProductId

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/tickets?$s=10&$p=0" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "ProductId: 88df910c-91aa-e711-80c2-0004ffa00010" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Locations Hierarchy

Locations are shared across products and typically follow a hierarchy:

```
District
├── High School
│   ├── Building A
│   │   ├── Room 101
│   │   └── Room 102
│   └── Building B
├── Middle School
└── Elementary School
```

When querying or creating records, you can specify locations at any level of the hierarchy.

## Users and Roles

Users are shared across products but may have different roles in each:

- A staff member might be a **Help Desk Agent** and a **Facilities Requester**
- Students typically have limited roles (ticket requesters, asset assignees)
- Administrators may have elevated permissions across multiple products

## API Best Practices

When working with the API:

1. **Always include `SiteId`** in your request headers
2. **Check product availability** - not all sites have all products enabled (see Admin > Developer Tools)

:::warning
This resource is designed for technical administrators. If you are looking for our Incident IQ help guides and announcements, you can find them at our [Help Center](https://help.incidentiq.com/hc/en-us)
:::
