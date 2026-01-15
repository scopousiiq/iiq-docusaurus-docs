The Invoicing API provides simplified vendor management for purchase and invoice tracking in IncidentIQ. Create basic vendor records to associate with purchases and financial transactions.

## Overview

The Invoicing API offers lightweight vendor management focused on purchase tracking. Vendors created here are linked to invoices, purchase orders, and asset cost records for financial reporting.

:::info
**What you can do with the Invoicing API**
:::

>
> - **Manage vendor records** with names and basic details
> - **Search vendors** by name for purchase attribution
> - **Create and update** vendor definitions for invoicing
> - **Link vendors to purchases** for cost tracking

## Invoicing Vendors vs. Organizations

:::warning
**Choosing the Right API**
:::

>
> IncidentIQ has two ways to track external companies:
>
> | Feature | Invoicing Vendors | Organizations |
> |---------|-------------------|---------------|
> | **Purpose** | Simple purchase attribution | Full vendor relationship management |
> | **Contacts** | No | Yes (via Organization Users) |
> | **Categorization** | No | Yes (via Organization Types) |
> | **Attachments** | No | Yes (contracts, agreements) |
> | **Best for** | Quick vendor lookup for invoices | Ongoing vendor relationships |
>
> **Use Invoicing Vendors** when you just need a vendor name for a purchase record.
>
> **Use [Organizations](#/Organizations)** when you need full vendor management with contacts, contracts, and categorization.

## Common Use Cases

### Invoice Entry
Quickly create or select a vendor when entering invoice information for asset purchases.

### Purchase Attribution
Associate purchases with vendors for financial reporting and cost analysis.

### Simple Vendor Directory
Maintain a basic list of vendors your organization purchases from.

### Cost Tracking
Link vendor purchases to assets for total cost of ownership calculations.

## API Sections

| Section | Description |
|---------|-------------|
| **Vendors** | Full CRUD operations for vendor records |

## Quick Start

### List All Vendors

**cURL
**

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/invoicing/vendors" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

**JavaScript
**

```javascript
const response = await fetch('https://your-site.incidentiq.com/api/v1.0/invoicing/vendors', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'SiteId': 'YOUR_SITE_ID',
    'Client': 'ApiClient'
  }
});

const data = await response.json();
console.log(data.Items);
```

**Python
**

```python
import requests

response = requests.get(
    'https://your-site.incidentiq.com/api/v1.0/invoicing/vendors',
    headers={
        'Authorization': 'Bearer YOUR_TOKEN',
        'SiteId': 'YOUR_SITE_ID',
        'Client': 'ApiClient'
    }
)

data = response.json()
print(data['Items'])
```


---

### Search Vendors

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/invoicing/vendors" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{
    "Paging": {"PageSize": 25, "PageIndex": 0}
  }'
```

### Get Vendor Details

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/invoicing/vendors/{VendorId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Create a Vendor

```json http
{
  "method": "POST",
  "url": "https://your-site.incidentiq.com/api/v1.0/invoicing/vendors/new",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN",
    "SiteId": "YOUR_SITE_ID",
    "Client": "ApiClient",
    "Content-Type": "application/json"
  },
  "body": {
    "Name": "ABC Technology Supply"
  }
}
```

## Key Concepts

### Vendor vs. Organization

**Invoicing Vendors** are simple name records for purchase attribution. They don't support contacts, categorization, or document attachments.

**Organizations** are full-featured external entity records with:
- Multiple contacts (Organization Users)
- Type categorization (Vendor, Supplier, Repair Provider)
- Document attachments (contracts, agreements)
- Richer metadata

If you're building a vendor management integration, use the [Organizations API](#/Organizations) instead.

### Linking Vendors to Purchases

When recording asset purchases or costs, reference the vendor by `VendorId`:

```json
{
  "AssetId": "ASSET_UUID",
  "VendorId": "VENDOR_UUID",
  "PurchasePrice": 599.99,
  "PurchaseDate": "2025-01-15"
}
```

## Related APIs

- [Organizations](#/Organizations) — Full-featured vendor/supplier management with contacts and attachments
- [Funding Sources](#/Funding%20Sources) — Track which budgets fund vendor purchases
- [Assets](#/Assets) — Link vendor purchases to asset cost records
- [Parts](#/Parts) — Associate parts with suppliers for procurement
