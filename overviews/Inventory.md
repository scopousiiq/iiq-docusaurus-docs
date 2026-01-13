# Inventory API

The Inventory API provides access to IncidentIQ's inventory management system. Track consumable items, parts, and supplies across locations with full support for stock actions, catalogs, and usage reporting.

## Overview

Inventory in IncidentIQ represents consumable items and supplies that your organization manages separately from fixed assets—items like replacement cables, printer cartridges, repair parts, and office supplies.

:::info
**What you can do with the Inventory API**
:::

>
> - **Manage inventory catalogs** of items available across your organization
> - **Track stock levels** at different locations and storage areas
> - **Record inventory actions** including additions, removals, transfers, and adjustments
> - **View usage timelines** and audit trails for inventory movements
> - **Generate summaries** by category and location for reporting

## Common Use Cases

### Parts Tracking for Repairs
Track repair parts inventory to ensure technicians have the components they need for device repairs.

### Supply Management
Monitor consumable supplies like printer toner, cables, and accessories across multiple locations.

### Warehouse Operations
Manage transfers between storage locations and track inventory movements over time.

### Budget Planning
Use category and location summaries to plan purchasing and allocate resources effectively.

## API Sections

| Section | Description |
|---------|-------------|
| **Searching** | Query inventory items with filters and pagination |
| **Details** | Retrieve individual inventory record information |
| **Managing** | Create, update, and delete inventory records |
| **Catalog** | Manage the catalog of inventory items |
| **Actions** | Record stock additions, removals, and transfers |
| **Timeline** | View history of inventory actions over time |
| **Summaries** | Get aggregated data by category or location |

## Quick Start

### Search Inventory

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/inventory/{InventoryId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{
    "Paging": {"PageSize": 25, "PageIndex": 0}
  }'
```

### Get Inventory Item Details

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/inventory/items/{InventoryItemId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Get Category Summary

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/inventory/category-summary" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

## Related APIs

- [Assets](#/Assets) - Track fixed assets separately from consumable inventory
- [Locations](#/Locations) - Reference storage locations for inventory
- [Categories](#/Categories) - Organize inventory items by category
