The Labor Rates API manages hourly billing rates assigned to users in IncidentIQ. Create, update, and query labor rates, set rates in bulk, and retrieve labor activity data associated with tickets.

## Overview

Labor rates define the cost per hour for user work on tickets, enabling organizations to track and report on labor costs. Rates are associated with specific labor types (e.g., standard, overtime) and can be scoped per product module. The API also provides activity tracking to query the actual labor effort and costs recorded against tickets.

:::info
**What you can do with the Labor Rates API**

- **Manage user labor rates** with full create, read, update, and delete operations
- **Set rates in bulk** for multiple users at once
- **Query labor activity** by ticket to see time and cost breakdowns
- **View activity by user** to analyze labor effort across ticket assignments
- **Retrieve rate details** for individual users or specific rate records
:::

## Common Use Cases

### Rate Administration
Set up and maintain labor rates for your workforce, ensuring each technician or agent has the correct billing rate for their labor type.

### Bulk Rate Updates
When rates change across a team or department, use the bulk endpoint to update multiple user rates in a single operation rather than modifying them individually.

### Labor Cost Reporting
Pull labor activity data for tickets to build custom cost reports, track budget utilization, or feed data into external accounting systems.

### Work Order Costing
Retrieve labor activity grouped by user to understand who worked on which tickets and at what cost, supporting project costing and billing workflows.

## API Sections

| Section | Description |
|---------|-------------|
| **Retrieving** | Get labor rates by ID or by user |
| **Managing** | Create, update, and delete individual labor rates |
| **Bulk** | Set labor rates for multiple users in a single request |
| **Activity** | Query labor effort and costs by ticket or by user |

## Quick Start

### Get Labor Rates for a User

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/labor-rates/user/{userId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Create a Labor Rate

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/labor-rates" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{
    "UserId": "USER_UUID",
    "LaborTypeId": "LABOR_TYPE_UUID",
    "Rate": 45.00
  }'
```

## Related APIs

- [Labor Types](#/Labor%20Types) - Define the labor type categories that rates are associated with
- [Tickets](#/Tickets) - View tickets where labor activity is tracked
- [Users](#/Users) - Look up users when assigning labor rates
