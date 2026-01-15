The Workflows API provides access to IncidentIQ's workflow engine. Configure ticket lifecycles, define status transitions, and automate your service management processes.

## Overview

Workflows in IncidentIQ define how tickets move through their lifecycle—from creation to resolution. They control which statuses are available, what transitions are allowed, and what actions occur at each step.

:::info
**What you can do with the Workflows API**
:::

>
> - **Retrieve workflow definitions** and their configurations
> - **Access workflow steps** and transition rules
> - **Configure workflow behavior** for different ticket types
> - **Understand status transitions** available for tickets

## Common Use Cases

### Workflow Visualization
Build custom interfaces that show workflow progress and available next steps.

### Integration Triggers
Use workflow step changes as triggers for external system integrations.

### Custom Approval Flows
Understand approval requirements at different workflow stages.

### Reporting on Workflow Metrics
Track time spent in each workflow step for SLA and efficiency analysis.

### Dynamic Forms
Show different fields or options based on the current workflow step.

## API Sections

| Section | Description |
|---------|-------------|
| **Definitions** | Retrieve workflow definitions and configurations |
| **Configuration** | Access workflow settings and rules |
| **Steps** | Get workflow step details and properties |
| **Transitions** | Understand available status transitions |

## Quick Start

### List Workflows

**cURL
**

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/workflows" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

**JavaScript
**

```javascript
const response = await fetch('https://your-site.incidentiq.com/api/v1.0/workflows', {
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
    'https://your-site.incidentiq.com/api/v1.0/workflows',
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

### Get Workflow Details

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/workflows/{workflowId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Get Workflow Steps

**cURL
**

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/workflows/{workflowId}/steps" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

**JavaScript
**

```javascript
const response = await fetch('https://your-site.incidentiq.com/api/v1.0/workflows/{workflowId}/steps', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'SiteId': 'YOUR_SITE_ID',
    'Client': 'ApiClient'
  }
});

const data = await response.json();
// Each step includes: StepId, Name, StatusType, AllowedTransitions
console.log(data.Items);
```

**Python
**

```python
import requests

response = requests.get(
    'https://your-site.incidentiq.com/api/v1.0/workflows/{workflowId}/steps',
    headers={
        'Authorization': 'Bearer YOUR_TOKEN',
        'SiteId': 'YOUR_SITE_ID',
        'Client': 'ApiClient'
    }
)

data = response.json()
# Each step includes: StepId, Name, StatusType, AllowedTransitions
print(data['Items'])
```


---

## Key Concepts

:::info
**Understanding Workflow Terminology**
:::

>
> - **Workflow** — A complete process definition (e.g., "Standard Help Desk Workflow")
> - **Step** — A stage within a workflow (e.g., "In Progress", "Waiting for Parts")
> - **Status Type** — The category of a step: Open, Closed, or Waiting
> - **Transition** — A valid move from one step to another

### Workflow Steps

Each workflow contains steps that represent ticket statuses. Steps have a **Status Type** that affects SLA timers and reporting:

| Status Type | Description | SLA Timer |
|-------------|-------------|-----------|
| **Open** | Active work states (New, Assigned, In Progress) | Running |
| **Waiting** | Paused states (Waiting for Parts, Waiting for User) | Paused |
| **Closed** | Completed states (Resolved, Closed) | Stopped |

### Transitions

Transitions define which steps can follow which. Not every step can transition to every other step—workflows enforce valid paths. For example:

- "New" → "Assigned" ✓
- "Assigned" → "In Progress" ✓
- "Assigned" → "Waiting for Parts" ✓
- "New" → "Closed" ✗ (typically not allowed)

### Workflow Assignment

Different ticket types or categories can use different workflows:

- **Standard Help Desk** — General IT requests
- **Hardware Repair** — Device repair with parts ordering steps
- **Software Request** — Approval-based software provisioning
- **Facilities** — Building maintenance workflow

:::warning
**Resolved vs. Closed**
:::

>
> Most workflows distinguish between these final states:
> - **Resolved** — Work complete, awaiting user confirmation
> - **Closed** — Fully completed and archived
>
> Tickets in "Resolved" may reopen if the user reports the issue persists. "Closed" tickets are final.

### Transitioning Tickets via API

To move a ticket through workflow steps, use the Tickets API workflow endpoints:

```bash
# Start work on a ticket (transitions to "In Progress")
curl -X POST "https://your-site.incidentiq.com/api/v1.0/tickets/{ticketId}/start" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"

# Resolve a ticket
curl -X POST "https://your-site.incidentiq.com/api/v1.0/tickets/{ticketId}/resolve" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

## Related APIs

- [Tickets](#/Tickets) — Move tickets through workflow steps using `/start`, `/stop`, `/resolve`, `/close` endpoints
- [SLAs](#/SLAs) — SLA timers are tied to workflow step status types
- [Categories](#/Categories) — Categories determine which workflow applies to a ticket
