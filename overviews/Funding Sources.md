The Funding Sources API provides access to funding source management in IncidentIQ. Track budget allocations, grant funds, and financial sources used for purchasing assets, parts, and services.

## Overview

Funding sources in IncidentIQ represent the budgets, grants, and financial accounts used to fund purchases and expenditures—Title I funds, E-Rate allocations, general operating budgets, and other financial sources.

:::info
**What you can do with the Funding Sources API**
:::

>
> - **Manage funding source records** with names, codes, and descriptions
> - **Search and filter** funding sources by various criteria
> - **Create and update** funding source definitions
> - **Bulk update** funding sources across multiple records
> - **Delete funding sources** individually or by query

## Common Use Cases

### Budget Tracking
Define funding sources to track which budget or grant pays for assets and services.

### Grant Management
Create funding sources for federal grants (Title I, E-Rate, ESSER) to ensure proper allocation tracking.

### Purchase Attribution
Associate purchases and assets with specific funding sources for financial reporting.

### Bulk Updates
Update multiple funding source records when budgets are reorganized or renamed.

## API Sections

| Section | Description |
|---------|-------------|
| **Searching** | Search and filter funding sources |
| **Details** | Retrieve individual funding source information |
| **Managing** | Create and update funding source records |
| **Deleting** | Remove funding sources individually or in bulk |
| **Bulk** | Bulk update funding sources by query |

## Quick Start

### Search Funding Sources

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/funding-sources/query" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{
    "Paging": {"PageSize": 25, "PageIndex": 0}
  }'
```

### Get Funding Source Details

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/funding-sources/{FundingSourceId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Create a Funding Source

```json http
{
  "method": "POST",
  "url": "https://your-site.incidentiq.com/api/v1.0/funding-sources/new",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN",
    "SiteId": "YOUR_SITE_ID",
    "Client": "ApiClient",
    "Content-Type": "application/json"
  },
  "body": {
    "Name": "Title I - FY2024",
    "Code": "T1-2024"
  }
}
```

## Related APIs

- [Assets](#/Assets) - Link assets to funding sources for purchase tracking
- [Parts](#/Parts) - Track funding sources for parts procurement
- [Invoicing](#/Invoicing) - Associate invoices with funding sources
