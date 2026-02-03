---
sidebar_position: 6
---

# Working with Tickets

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Tickets are the core of the Incident IQ help desk system. The API provides comprehensive access to create, query, update, and manage tickets programmatically.

## Common Ticket Operations

| Operation | Method | Endpoint | Description |
|-----------|--------|----------|-------------|
| Create Ticket | POST | `/tickets/new` | Submit a new ticket |
| Query Tickets | POST | `/tickets?$s={size}&$p={page}` | Search and filter tickets |
| Get Ticket | GET | `/tickets/{id}` | Retrieve a specific ticket |
| Update Ticket | PUT | `/tickets/{id}` | Modify ticket properties |

## Querying Tickets

Search for tickets using pagination (query params) and filters (request body):

### Query with Filters

<Tabs>
<TabItem value="curl" label="cURL">

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/tickets?$s=25&$p=0" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "ProductId: 88df910c-91aa-e711-80c2-0004ffa00010" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{
    "Filters": [
      {
        "Facet": "status",
        "Name": "Open",
        "Selected": true
      }
    ]
  }'
```

</TabItem>
<TabItem value="javascript" label="JavaScript">

```javascript
const response = await fetch(
  'https://your-site.incidentiq.com/api/v1.0/tickets?$s=25&$p=0',
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
        { Facet: 'status', Name: 'Open', Selected: true }
      ]
    })
  }
);

const data = await response.json();
console.log(`Found ${data.Paging.TotalRows} tickets`);
```

</TabItem>
<TabItem value="python" label="Python">

```python
import requests

url = "https://your-site.incidentiq.com/api/v1.0/tickets?$s=25&$p=0"
headers = {
    "Authorization": "Bearer YOUR_API_TOKEN",
    "SiteId": "YOUR_SITE_ID",
    "ProductId": "88df910c-91aa-e711-80c2-0004ffa00010",
    "Client": "ApiClient",
    "Content-Type": "application/json"
}
payload = {
    "Filters": [
        {"Facet": "status", "Name": "Open", "Selected": True}
    ]
}

response = requests.post(url, json=payload, headers=headers)
data = response.json()
print(f"Found {data['Paging']['TotalRows']} tickets")
```

</TabItem>
</Tabs>

## Creating a Ticket

### Minimum Required Fields

```json
{
    "Subject": "Laptop screen is cracked",
    "IssueDescription": "Student dropped laptop, screen no longer displays.",
    "ForId": "user-guid-here",
    "LocationId": "location-guid-here",
    "IssueTypeId": "issue-type-guid-here"
}
```

:::tip
Use the [Users API](/docs/api/users/users-api) to look up `ForId` and the [Locations API](/docs/api/locations/locations-api) to look up `LocationId`.
:::

## Ticket Lifecycle

Tickets move through various statuses as they're worked:

| Status | Description |
|--------|-------------|
| **Open** | New ticket awaiting assignment |
| **In Progress** | Actively being worked by an agent |
| **Waiting** | On hold pending external action |
| **Resolved** | Work completed, pending closure |
| **Closed** | Ticket finalized |

## Common Filter Facets

Use these facets when querying tickets (see [Filtering with Facets](./filtering) for full syntax):

| Facet | Description |
|-------|-------------|
| `status` | Ticket status (Open, In Progress, Closed, etc.) |
| `priority` | Urgency level |
| `assignedto` | Assigned agent |
| `for` | Ticket requester |
| `location` | Associated location |
| `duedate` | Due date range |
| `createddate` | Creation date range |
| `keyword` | Text search across fields |

## Related Operations

- **Assign Ticket**: Route tickets to agents or teams
- **Add Comment**: Append notes or customer communications
- **Link Asset**: Associate hardware/software with the ticket
- **Attach Files**: Upload supporting documentation

## Next Steps

- See the [Tickets API Reference](/docs/api/tickets/tickets-api) for complete endpoint documentation
- Learn about [Working with Ticket Activities](./ticket-activities) for comments, attachments, and resolution actions
- Review [Paging and Sorting](./pagination) and [Filtering with Facets](./filtering) for handling large result sets
- Explore [Working with Assets](./working-with-assets) to link assets to tickets

:::warning
This resource is designed for technical administrators. If you are looking for our Incident IQ help guides and announcements, you can find them at our [Help Center](https://help.incidentiq.com/hc/en-us)
:::
