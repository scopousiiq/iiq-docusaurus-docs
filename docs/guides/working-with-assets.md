---
sidebar_position: 8
---

# Working with Assets

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Assets represent the hardware, software, and equipment tracked in Incident IQ. The API enables you to query inventory, manage ownership, and integrate with external asset management systems.

## Common Asset Operations

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| Query Assets | POST | `/assets?$s={size}&$p={page}` | Search and filter assets |
| Get Asset | GET | `/assets/{id}` | Retrieve a specific asset |
| Get Asset by Tag | GET | `/assets/assettag/{tag}` | Look up by asset tag |
| Update Asset | PUT | `/assets/{id}` | Modify asset properties |
| Transfer Ownership | POST | `/assets/checkouts/checkout-or-transfer` | Change asset owner |

## Querying Assets

Search for assets using pagination (query params) and filters (request body):

### Query with Filters

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/assets?$s=50&$p=0" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "ProductId: 88df910c-91aa-e711-80c2-0004ffa00010" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{
    "Filters": [
      {
        "Facet": "assettype",
        "Name": "Chromebook",
        "Selected": true
      },
      {
        "Facet": "status",
        "Name": "In Use",
        "Selected": true
      }
    ]
  }'
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const response = await fetch(
  'https://your-site.incidentiq.com/api/v1.0/assets?$s=50&$p=0',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'SiteId': 'YOUR_SITE_ID',
      'ProductId': '88df910c-91aa-e711-80c2-0004ffa00010',
      'Client': 'ApiClient',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      Filters: [
        { Facet: 'assettype', Name: 'Chromebook', Selected: true },
        { Facet: 'status', Name: 'In Use', Selected: true }
      ]
    })
  }
);

const data = await response.json();
console.log(`Found ${data.Paging.TotalRows} assets`);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

url = "https://your-site.incidentiq.com/api/v1.0/assets?$s=50&$p=0"
headers = {
    "Authorization": "Bearer YOUR_API_TOKEN",
    "SiteId": "YOUR_SITE_ID",
    "ProductId": "88df910c-91aa-e711-80c2-0004ffa00010",
    "Client": "ApiClient",
    "Content-Type": "application/json"
}
payload = {
    "Filters": [
        {"Facet": "assettype", "Name": "Chromebook", "Selected": True},
        {"Facet": "status", "Name": "In Use", "Selected": True}
    ]
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()
print(f"Found {data['Paging']['TotalRows']} assets")
```

</TabItem>
</Tabs>

## Looking Up an Asset

### By Asset Tag

```http
GET https://your-site.incidentiq.com/api/v1.0/assets/assettag/CHR-12345
```

### By Serial Number

Use a filter to find assets by serial number:

```json
{
    "Filters": [
        {
            "Facet": "serialnumber",
            "Value": "5CD1234XYZ",
            "Selected": true
        }
    ]
}
```

## Common Filter Facets

Use these facets when querying assets (see [Filtering with Facets](./filtering) for full syntax):

| Facet | Description |
|-------|-------------|
| `assettype` | Device category (Chromebook, Laptop, iPad) |
| `status` | Asset status (In Use, Available, Broken) |
| `model` | Device model |
| `owner` | Current owner |
| `location` | Current location |
| `assettag` | Asset tag number |
| `serialnumber` | Serial number |

## Asset Ownership

Assets can be assigned to users (students, staff) or locations (carts, rooms):

| Assignment Type | Description |
|----------------|-------------|
| **User Assignment** | Links asset to a specific person |
| **Location Assignment** | Places asset at a physical location |
| **Transfer** | Moves asset between owners with audit trail |

### Transfer Asset Ownership

```json
POST https://your-site.incidentiq.com/api/v1.0/assets/checkouts/checkout-or-transfer

{
    "AssetId": "ASSET_GUID_HERE",
    "ToOwnerId": "NEW_OWNER_GUID_HERE"
}
```

## Linking Assets to Tickets

When creating or updating tickets, associate the affected asset:

```json
{
    "Subject": "Broken screen",
    "AssetId": "asset-guid-here"
}
```

This creates a connection between the service request and the equipment.

## Common Use Cases

| Use Case | Description |
|----------|-------------|
| **Inventory Sync** | Keep external systems (MDM, CMDB) updated with asset data |
| **Check-in/Check-out** | Automate device distribution and collection workflows |
| **Audit Reports** | Extract asset assignments for compliance reporting |
| **Bulk Updates** | Batch modify asset properties or ownership |

## Next Steps

- See the [Assets API Reference](/docs/api/assets/assets-api) for complete endpoint documentation
- Review [Paging and Sorting](./pagination) and [Filtering with Facets](./filtering) for handling large inventories
- Explore [Working with Tickets](./working-with-tickets) to link assets to service requests

:::warning
This resource is designed for technical administrators. If you are looking for our Incident IQ help guides and announcements, you can find them at our [Help Center](https://help.incidentiq.com/hc/en-us)
:::
