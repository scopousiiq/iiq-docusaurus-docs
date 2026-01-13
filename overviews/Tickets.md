# Tickets API

The Tickets API provides comprehensive access to IncidentIQ's ticketing system. Create, search, update, and manage help desk tickets programmatically, including workflow transitions, assignments, comments, and attachments.

## Overview

Tickets are the core of IncidentIQ's service management platform. Each ticket represents a request for help, an incident, or a task that needs to be tracked and resolved.

:::info
**What you can do with the Tickets API**

- **Search and filter** tickets by status, assignee, location, category, or custom criteria
- **Create tickets** programmatically from external systems, forms, or automation rules
- **Update ticket details** including status, priority, custom fields, and assignments
- **Manage workflow transitions** to move tickets through your defined processes
- **Handle communications** via comments, notes, and notifications
- **Work with subtasks** to break down complex tickets into manageable pieces
:::

## Common Use Cases

### Help Desk Integration
Sync tickets bidirectionally with external ITSM platforms, ensuring your team works in their preferred tools while maintaining a single source of truth.

### Automated Ticket Creation
Create tickets automatically from monitoring systems, email parsers, or IoT device alerts without manual intervention.

### Custom Reporting
Build dashboards that pull ticket data in real-time, enabling custom KPI tracking beyond built-in reports.

### Workflow Automation
Trigger external actions when tickets reach specific workflow steps, such as notifying facilities, ordering parts, or updating asset records.

## API Sections

| Section | Description |
|---------|-------------|
| **Searching** | Query tickets with filters, pagination, and sorting |
| **Viewing** | Retrieve individual ticket details and metadata |
| **Submitting** | Create new tickets with full field support |
| **Updating** | Modify ticket properties, custom fields, and relationships |
| **Assigning** | Assign tickets to agents, teams, or queues |
| **Workflow** | Start, stop, confirm, resolve, and transition tickets |
| **Communication** | Add comments, notes, and manage followers |
| **Subtasks** | Create and manage subtasks within tickets |
| **Bulk** | Perform operations on multiple tickets at once |
| **Metadata** | Access ticket sources, priorities, and field definitions |

## Quick Start

**cURL
**

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/tickets" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{
    "Filters": [
      {"Facet": "StatusTypeName", "Values": ["Open"]}
    ],
    "Paging": {"PageSize": 25, "PageIndex": 0}
  }'
```

**JavaScript
**

```javascript
const response = await fetch('https://your-site.incidentiq.com/api/v1.0/tickets', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'SiteId': 'YOUR_SITE_ID',
    'Client': 'ApiClient',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    Filters: [
      { Facet: 'StatusTypeName', Values: ['Open'] }
    ],
    Paging: { PageSize: 25, PageIndex: 0 }
  })
});

const data = await response.json();
console.log(data.Items);
```

**Python
**

```python
import requests

response = requests.post(
    'https://your-site.incidentiq.com/api/v1.0/tickets',
    headers={
        'Authorization': 'Bearer YOUR_TOKEN',
        'SiteId': 'YOUR_SITE_ID',
        'Client': 'ApiClient',
        'Content-Type': 'application/json'
    },
    json={
        'Filters': [
            {'Facet': 'StatusTypeName', 'Values': ['Open']}
        ],
        'Paging': {'PageSize': 25, 'PageIndex': 0}
    }
)

data = response.json()
print(data['Items'])
```


---

### Get Ticket Details

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/tickets/{ticketId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Create a New Ticket

:::warning
**Required Fields**

When creating a ticket, you must provide `ForId` (the user the ticket is for), `IssueId`, and `LocationId`. Use the Users and Locations APIs to obtain valid IDs.
:::

```json http
{
  "method": "POST",
  "url": "https://your-site.incidentiq.com/api/v1.0/tickets/create",
  "headers": {
    "Authorization": "Bearer YOUR_TOKEN",
    "SiteId": "YOUR_SITE_ID",
    "Client": "ApiClient",
    "Content-Type": "application/json"
  },
  "body": {
    "ForId": "USER_UUID",
    "IssueId": "ISSUE_UUID",
    "LocationId": "LOCATION_UUID",
    "Subject": "Laptop screen cracked",
    "IssueDescription": "Student dropped laptop, screen is not displaying."
  }
}
```

## Related APIs

- [Assets](#/Assets) - Link assets to tickets, track repairs
- [Users](#/Users) - Look up users for ticket assignment and "For" fields
- [Workflows](#/Workflows) - Configure workflow steps and transitions
- [Custom Fields](#/Custom%20Fields) - Manage custom field values on tickets
- [Locations](#/Locations) - Reference location data for ticket context
