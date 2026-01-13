# Locations API

The Locations API provides access to IncidentIQ's location hierarchy. Manage districts, schools, buildings, and rooms to organize users, assets, and tickets geographically.

## Overview

Locations in IncidentIQ represent the physical places in your organization: districts, schools, buildings, wings, and rooms.

:::info
**What you can do with the Locations API**
:::

>
> - **Search the location hierarchy** to find buildings and rooms
> - **Retrieve location details** including addresses and metadata
> - **Manage location records** for organizational changes
> - **Support ticket and asset assignment** by location

## Common Use Cases

### Site-Based Routing
Route tickets to technicians based on the location where the issue was reported.

### Inventory by Location
Track which assets are deployed at each school or building.

### Multi-Site Management
Manage multiple schools or campuses from a single IncidentIQ instance.

### Room-Level Tracking
Track assets and issues down to specific classrooms or offices.

### Location Sync
Keep location data synchronized with facilities management or SIS systems.

## API Sections

| Section | Description |
|---------|-------------|
| **Details** | Retrieve comprehensive location information |
| **Searching** | Query locations with filters and hierarchy traversal |
| **Managing** | Create, update, and organize locations |

## Quick Start

### List All Locations

**cURL
**

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/locations" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{
    "Paging": {"PageSize": 100, "PageIndex": 0}
  }'
```

**JavaScript
**

```javascript
const response = await fetch('https://your-site.incidentiq.com/api/v1.0/locations', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'SiteId': 'YOUR_SITE_ID',
    'Client': 'ApiClient',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    Paging: { PageSize: 100, PageIndex: 0 }
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
    'https://your-site.incidentiq.com/api/v1.0/locations',
    headers={
        'Authorization': 'Bearer YOUR_TOKEN',
        'SiteId': 'YOUR_SITE_ID',
        'Client': 'ApiClient',
        'Content-Type': 'application/json'
    },
    json={
        'Paging': {'PageSize': 100, 'PageIndex': 0}
    }
)

data = response.json()
print(data['Items'])
```


---

### Get Location Details

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/locations/{locationId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Search Locations by Name

**cURL
**

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/locations/search" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{"Query": "High School"}'
```

**JavaScript
**

```javascript
const response = await fetch('https://your-site.incidentiq.com/api/v1.0/locations/search', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'SiteId': 'YOUR_SITE_ID',
    'Client': 'ApiClient',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    Query: 'High School'
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
    'https://your-site.incidentiq.com/api/v1.0/locations/search',
    headers={
        'Authorization': 'Bearer YOUR_TOKEN',
        'SiteId': 'YOUR_SITE_ID',
        'Client': 'ApiClient',
        'Content-Type': 'application/json'
    },
    json={
        'Query': 'High School'
    }
)

data = response.json()
print(data['Items'])
```


---

### Get Child Locations

Retrieve all locations under a parent (e.g., all rooms in a building):

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/locations/{parentLocationId}/children" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

## Key Concepts

:::info
**Location Hierarchy**
:::

>
> Locations form a tree structure:
> - **District** (top level)
>   - **School/Building**
>     - **Wing/Floor**
>       - **Room**

### Location Types
Different location types have different properties and uses. Schools have addresses and staff counts; rooms have capacity and equipment lists.

### Primary Location
Users and assets have a primary location that determines default visibility and routing.

## Related APIs

- [Tickets](#/Tickets) - Location-based ticket creation and routing
- [Assets](#/Assets) - Asset location assignment
- [Users](#/Users) - User primary location
