The Teams API provides access to team management in IncidentIQ. Create teams, manage membership, and configure team-based ticket routing and assignment for efficient workload distribution.

## Overview

Teams in IncidentIQ group agents together for collaborative work and ticket routing. Instead of assigning tickets to individuals, you can assign to teams—enabling workload balancing, coverage during absences, and specialized support groups.

:::info
**What you can do with the Teams API**
:::

>
> - **Retrieve team definitions** and configurations
> - **Manage team membership** including adding and removing members
> - **Configure product access** per team for multi-product environments
> - **Support team-based routing** for tickets and queues
> - **Query team workload** for capacity planning

## Common Use Cases

### Team-Based Routing
Route tickets to teams rather than individuals. Any team member can pick up the ticket, enabling workload distribution and coverage when individuals are unavailable.

### Skill-Based Assignment
Create teams based on expertise areas:
- **Hardware Team** — Device repairs and physical issues
- **Software Team** — Application support and installations
- **Network Team** — Connectivity and infrastructure issues
- **AV Team** — Projectors, displays, and classroom technology

### Location-Based Teams
Organize teams by school or building for localized, on-site support. Tickets automatically route to the team responsible for that location.

### Tiered Support
Create teams for different support tiers:
- **Tier 1** — Initial triage and common issues
- **Tier 2** — Escalated technical issues
- **Tier 3** — Advanced troubleshooting and specialists

### Membership Sync
Keep team membership synchronized with external HR systems or organizational changes via automated imports.

## API Sections

| Section | Description |
|---------|-------------|
| **Definitions** | Retrieve team configurations and settings |
| **Products** | Manage product access per team |
| **Membership** | Add, remove, and list team members |

## Quick Start

### List Teams

**cURL
**

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/teams" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

**JavaScript
**

```javascript
const response = await fetch('https://your-site.incidentiq.com/api/v1.0/teams', {
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
    'https://your-site.incidentiq.com/api/v1.0/teams',
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

### Get Team Members

**cURL
**

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/teams/{teamId}/members" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

**JavaScript
**

```javascript
const response = await fetch('https://your-site.incidentiq.com/api/v1.0/teams/{teamId}/members', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'SiteId': 'YOUR_SITE_ID',
    'Client': 'ApiClient'
  }
});

const data = await response.json();
// Returns array of team member user objects
console.log(data.Items);
```

**Python
**

```python
import requests

response = requests.get(
    'https://your-site.incidentiq.com/api/v1.0/teams/{teamId}/members',
    headers={
        'Authorization': 'Bearer YOUR_TOKEN',
        'SiteId': 'YOUR_SITE_ID',
        'Client': 'ApiClient'
    }
)

data = response.json()
# Returns array of team member user objects
print(data['Items'])
```


---

## Key Concepts

:::info
**Team Assignment vs. Individual Assignment**
:::

>
> - **Team Assignment** — Ticket goes to a team queue; any member can claim it
> - **Individual Assignment** — Ticket assigned to a specific agent
>
> Team assignment provides flexibility and coverage. Individual assignment provides accountability and continuity.

### Team Queues

When a ticket is assigned to a team, it enters that team's **queue**. Team members see queued tickets in their dashboard and can claim tickets to work on them. This enables:

- **Workload balancing** — Agents pick up tickets as capacity allows
- **Coverage** — No single point of failure when an agent is unavailable
- **Visibility** — Managers can see queue depth for staffing decisions

### Team Membership

Users can belong to multiple teams. A technician might be on both the "Hardware Team" and the "Elementary Schools Team," receiving tickets from both queues.

### Products and Teams

In multi-product environments (Help Desk + Asset Management + Facilities), teams can have different product access. A facilities team might only see Facilities tickets, while the IT team sees Help Desk and Asset Management.

### Assigning Tickets to Teams

When creating or updating tickets via the API, use the `TeamId` field to assign to a team:

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/tickets/{ticketId}/assign" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{
    "TeamId": "TEAM_UUID"
  }'
```

## Related APIs

- [Users](#/Users) — User profiles for team members
- [Tickets](#/Tickets) — Team-based ticket assignment using `TeamId`
- [Locations](#/Locations) — Location-based team routing
