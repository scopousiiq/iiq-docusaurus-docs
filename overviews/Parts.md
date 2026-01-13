# Parts API

The Parts API provides access to parts management in IncidentIQ. Track parts inventory, manage suppliers, and handle purchase orders for repair and maintenance operations.

## Overview

Parts in IncidentIQ represent components and materials used for device repairs and maintenance—replacement screens, batteries, keyboards, cables, and other repair components.

:::info
**What you can do with the Parts API**
:::

>
> - **Manage parts catalog** with part numbers, descriptions, and pricing
> - **Track suppliers** and their part offerings with cost information
> - **Create purchase orders** for parts procurement
> - **Record parts usage** on repairs and tickets for cost tracking
> - **Import parts data** from spreadsheets and external sources

## Common Use Cases

### Repair Parts Management
Maintain a catalog of repair parts with supplier pricing for device repairs.

### Procurement Workflow
Create and track purchase orders to replenish parts inventory.

### Cost Tracking
Record which parts are used on repairs to calculate total repair costs.

### Supplier Management
Manage multiple suppliers per part with different pricing and availability.

### Bulk Import
Import parts catalogs from vendor spreadsheets or existing inventory systems.

## API Sections

| Section | Description |
|---------|-------------|
| **Searching** | Search the parts catalog |
| **Parts** | Create, retrieve, update, and delete part records |
| **Suppliers** | Manage supplier information and part-supplier relationships |
| **Purchase Orders** | Create and manage purchase orders |
| **Usage** | Record parts usage on tickets and repairs |
| **Importing** | Import parts from uploaded files |

## Quick Start

### Search Parts

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/parts/search" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{
    "Paging": {"PageSize": 25, "PageIndex": 0}
  }'
```

### Get Part Details

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/parts/{PartId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Get Purchase Order

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/purchaseorders/{PurchaseOrderId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Import Parts from File

:::warning
**Import Workflow**
:::

>
> First upload your import file using the Files API, then use the returned FileId to schedule the import job.

```json http
{
  "method": "POST",
  "url": "https://your-site.incidentiq.com/api/v1.0/parts/import/{FileId}",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN",
    "SiteId": "YOUR_SITE_ID",
    "Client": "ApiClient",
    "Content-Type": "application/json"
  },
  "body": {
    "ProductId": "PRODUCT_UUID",
    "Worksheet": 0,
    "Mappings": {
      "PartName": {"MapType": "column", "FieldIndex": 0},
      "StandardSupplierName": {"MapType": "column", "FieldIndex": 1},
      "StandardCost": {"MapType": "column", "FieldIndex": 2},
      "QuantityOnHand": {"MapType": "column", "FieldIndex": 3}
    }
  }
}
```

## Related APIs

- [Inventory](#/Inventory) - Track consumable supplies and stock levels
- [Tickets](#/Tickets) - Link parts usage to repair tickets
- [Assets](#/Assets) - Track repairs on assets
- [Files](#/Files) - Upload import files for parts data
