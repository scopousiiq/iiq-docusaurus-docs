---
sidebar_position: 3
---

# Paging and Sorting

Most Incident IQ API endpoints that return lists support pagination. Select endpoints also support sorting via a dedicated query parameter. Understanding these parameters is essential for efficiently querying data.

## Pagination Parameters

Pagination is controlled via **query parameters** on the URL:

| Parameter | Type | Description |
|-----------|------|-------------|
| `$s` | integer | Page size - number of records per page |
| `$p` | integer | Page index - zero-based page number |
| `$o` | string | Sort expression (select endpoints only) - see [Sorting](#sorting-with-the-o-parameter) |

### URL Structure

```
POST /api/v1.0/tickets?$s=25&$p=0
```

### Pagination Examples

**First page (25 records):**
```
?$s=25&$p=0
```

**Second page:**
```
?$s=25&$p=1
```

**Third page:**
```
?$s=25&$p=2
```

:::info
Page index (`$p`) is zero-based. Page 0 is the first page, page 1 is the second page, and so on.
:::

## Response Structure

Paginated responses include a `Paging` object with metadata:

```json
{
    "Paging": {
        "TotalRows": 1250,
        "PageCount": 50,
        "PageSize": 25,
        "PageIndex": 0
    },
    "Items": [...]
}
```

| Field | Description |
|-------|-------------|
| `TotalRows` | Total number of records matching the query |
| `PageCount` | Total number of pages available |
| `PageSize` | Number of records per page (from `$s`) |
| `PageIndex` | Current page index (from `$p`) |

## Complete Pagination Example

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="curl" label="cURL">

```bash
# First page of 25 tickets
curl -X POST "https://your-site.incidentiq.com/api/v1.0/tickets?$s=25&$p=0" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "ProductId: 88df910c-91aa-e711-80c2-0004ffa00010" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{}'
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// Paginate through all tickets
async function getAllTickets(pageSize = 25) {
  const allTickets = [];
  let pageIndex = 0;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(
      `https://your-site.incidentiq.com/api/v1.0/tickets?$s=${pageSize}&$p=${pageIndex}`,
      {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_API_TOKEN',
          'SiteId': 'YOUR_SITE_ID',
          'ProductId': '88df910c-91aa-e711-80c2-0004ffa00010',
          'Client': 'ApiClient',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      }
    );

    const data = await response.json();
    allTickets.push(...data.Items);

    // Check if there are more pages
    hasMore = pageIndex < data.Paging.PageCount - 1;
    pageIndex++;
  }

  return allTickets;
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

def get_all_tickets(page_size=25):
    """Paginate through all tickets."""
    all_tickets = []
    page_index = 0

    headers = {
        "Authorization": "Bearer YOUR_API_TOKEN",
        "SiteId": "YOUR_SITE_ID",
        "ProductId": "88df910c-91aa-e711-80c2-0004ffa00010",
        "Client": "ApiClient",
        "Content-Type": "application/json"
    }

    while True:
        url = f"https://your-site.incidentiq.com/api/v1.0/tickets?$s={page_size}&$p={page_index}"
        response = requests.post(url, headers=headers, json={})
        data = response.json()

        all_tickets.extend(data["Items"])

        # Check if there are more pages
        if page_index >= data["Paging"]["PageCount"] - 1:
            break
        page_index += 1

    return all_tickets
```

</TabItem>
</Tabs>

## Pagination Best Practices

:::tip Tips for efficient pagination
- Use a reasonable page size (25-50 records)
- Check `PageCount` to know when you've retrieved all data
- Combine with filters to reduce result sets before paginating
- Cache `TotalRows` if you need to display total count in UI
:::

---

## Sorting with the `$o` Parameter

Select endpoints support sorting via the `$o` query parameter. This parameter accepts a sort expression consisting of a field name followed by an optional direction.

### Sort Expression Syntax

```
$o=<FieldName> <direction>
```

| Component | Description |
|-----------|-------------|
| `FieldName` | A valid field name from the endpoint's sort schema (see tables below) |
| `direction` | Optional. Either `asc` or `desc`. Defaults to `asc` |

### Examples

```
?$s=25&$p=0&$o=TicketCreatedDate desc     # Newest tickets first
?$s=50&$p=0&$o=AssetTag asc               # Assets alphabetically by tag
?$s=100&$p=0&$o=ModifiedDate              # Default ascending order
```

:::warning
The `$o` parameter is only available on specific endpoints. Using it on unsupported endpoints will have no effect. See the tables below for supported endpoints and their valid sort fields.
:::

## Endpoints Supporting `$o` Sorting

### Ticket Endpoints

The following ticket endpoints support the `$o` parameter with `TicketSortField` values:

- `POST /api/v1.0/tickets` - Search tickets
- `POST /api/v1.0/tickets/sla` - List ticket SLAs

**Valid TicketSortField Values:**

| Field | Description |
|-------|-------------|
| `TicketNumber` | Ticket number (string sort) |
| `TicketNumberSort` | Ticket number (numeric sort) |
| `TicketCreatedDate` | Date ticket was created |
| `TicketModifiedDate` | Date ticket was last modified |
| `TicketStartedDate` | Date work started on ticket |
| `TicketClosedDate` | Date ticket was closed |
| `TicketDueDate` | Ticket due date |
| `TicketSubject` | Ticket subject line |
| `TicketPriority` | Priority level |
| `TicketIsUrgent` | Urgent flag |
| `TicketStatusName` | Status name |
| `WorkflowStepName` | Current workflow step |
| `IssueCategoryName` | Issue category |
| `IssueTypeName` | Issue type |
| `LocationName` | Location name |
| `AssignedTeamName` | Assigned team |
| `ForName` | Requestor name |
| `OverallSurveyRating` | Survey rating |

### Asset Endpoints

The following asset endpoints support the `$o` parameter with `AssetSortField` values:

- `GET /api/v1.0/assets` - List all assets
- `POST /api/v1.0/assets` - Search assets
- `GET /api/v1.0/assets/user/{UserId}` - Get assets for a user
- `GET /api/v1.0/assets/location/{LocationId}` - Get assets at a location
- `GET /api/v1.0/assets/room/{RoomId}` - Get assets in a room

**Valid AssetSortField Values:**

| Field | Description |
|-------|-------------|
| `AssetTag` | Asset tag identifier |
| `AssetName` | Asset name |
| `SerialNumber` | Serial number |
| `ModelName` | Model name |
| `ManufacturerName` | Manufacturer name |
| `CategoryName` | Category name |
| `LocationName` | Location name |
| `AssetTypeName` | Asset type |
| `AssetStatusTypeName` | Status type |
| `OwnerLastName` | Owner's last name |
| `AssetCreatedDate` | Date asset was created |
| `AssetModifiedDate` | Date asset was last modified |
| `ModifiedDate` | Alias for AssetModifiedDate |
| `PurchasedDate` | Purchase date |
| `DeployedDate` | Deployment date |
| `RetiredDate` | Retirement date |
| `PurchasePrice` | Purchase price |
| `WarrantyExpirationDate` | Warranty expiration |
| `LastInventoryDate` | Last inventory date |

### Survey Endpoints

The following survey endpoints support the `$o` parameter:

**`GET /api/v1.0/surveys` - List surveys** (uses `SurveySortField`)

| Field | Description |
|-------|-------------|
| `Name` | Survey name |
| `CreatedDate` | Date survey was created |
| `ModifiedDate` | Date survey was last modified |
| `IsActive` | Active status |

**`GET /api/v1.0/surveys/responses/{SurveyId}` - Get survey responses** (uses `SurveyResponseSortField`)

| Field | Description |
|-------|-------------|
| `CreatedDate` | Date response was submitted |
| `ModifiedDate` | Date response was modified |
| `OverallSatisfaction` | Satisfaction rating |
| `TicketId` | Associated ticket ID |

## Complete Sorting Example

<Tabs>
<TabItem value="curl" label="cURL">

```bash
# Get newest tickets first, 25 per page
curl -X POST "https://your-site.incidentiq.com/api/v1.0/tickets?$s=25&$p=0&$o=TicketCreatedDate%20desc" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "ProductId: 88df910c-91aa-e711-80c2-0004ffa00010" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{}'
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
// Fetch tickets sorted by creation date (newest first)
const response = await fetch(
  `https://your-site.incidentiq.com/api/v1.0/tickets?$s=25&$p=0&$o=${encodeURIComponent('TicketCreatedDate desc')}`,
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_TOKEN',
      'SiteId': 'YOUR_SITE_ID',
      'ProductId': '88df910c-91aa-e711-80c2-0004ffa00010',
      'Client': 'ApiClient',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }
);

const data = await response.json();
console.log(`Found ${data.Paging.TotalRows} tickets`);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests
from urllib.parse import quote

headers = {
    "Authorization": "Bearer YOUR_API_TOKEN",
    "SiteId": "YOUR_SITE_ID",
    "ProductId": "88df910c-91aa-e711-80c2-0004ffa00010",
    "Client": "ApiClient",
    "Content-Type": "application/json"
}

# Sort by creation date, newest first
sort_expr = quote("TicketCreatedDate desc")
url = f"https://your-site.incidentiq.com/api/v1.0/tickets?$s=25&$p=0&$o={sort_expr}"

response = requests.post(url, headers=headers, json={})
data = response.json()

print(f"Found {data['Paging']['TotalRows']} tickets")
```

</TabItem>
</Tabs>

## Next Steps

- Learn about [Filtering with Facets](./filtering) to narrow down your search results
- Explore the [Tickets API](/docs/api/tickets/tickets-api) for ticket-specific queries
- See the [Assets API](/docs/api/assets/assets-api) for asset inventory queries

:::warning
This resource is designed for technical administrators. If you are looking for our Incident IQ help guides and announcements, you can find them at our [Help Center](https://help.incidentiq.com/hc/en-us)
:::
