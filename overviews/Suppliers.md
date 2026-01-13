# Suppliers API

The Suppliers API provides access to vendor and supplier management in IncidentIQ. Manage the external companies from which assets and parts are procured.

## Overview

Suppliers in IncidentIQ represent external vendors and companies that provide assets, parts, and equipment. Suppliers are linked to purchase orders and inventory items for procurement tracking and vendor management.

:::info
**What you can do with the Suppliers API**

- **List and search suppliers** in your vendor catalog
- **Create new suppliers** with contact and address information
- **Update supplier details** including contact info and vendor numbers
- **Delete suppliers** when no longer needed
- **Link suppliers to purchase orders** for procurement workflows
:::

## Common Use Cases

### Vendor Catalog Management
Maintain a catalog of approved vendors for asset and parts procurement.

### Procurement Workflows
Reference suppliers when creating purchase orders to track where equipment is sourced.

### Contact Management
Store vendor contact information including primary and secondary contacts, phone numbers, and email addresses.

### Supplier Categorization
Organize suppliers by type using supplier categories for reporting and filtering.

## API Sections

| Section | Description |
|---------|-------------|
| **Suppliers** | List, create, update, and delete supplier records |

## Quick Start

### Get a Supplier

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/suppliers/{supplierId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Create a Supplier

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/suppliers" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{
    "Name": "Tech Equipment Co.",
    "Phone": "555-123-4567",
    "ContactName": "Jane Smith",
    "ContactEmail": "jane@techequipment.com",
    "SupplierUrl": "https://www.techequipment.com"
  }'
```

### Update a Supplier

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/suppliers/{supplierId}/update" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{
    "Phone": "555-987-6543",
    "ContactEmail": "support@techequipment.com"
  }'
```

### Delete a Supplier

```bash
curl -X DELETE "https://your-site.incidentiq.com/api/v1.0/suppliers/{supplierId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

## Related APIs

- [Parts](#/Parts) - Parts can be linked to suppliers for procurement tracking
- [Inventory](#/Inventory) - Track inventory sourced from suppliers
