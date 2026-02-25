The Labor Types API manages labor type definitions used to categorize time entries on work orders. Define types such as standard, overtime, or emergency labor, each with configurable rate multipliers.

## Overview

Labor types are foundational configuration data in IncidentIQ's labor tracking system. They classify the kind of work being performed and determine how labor costs are calculated through rate multipliers (e.g., 1.5x for overtime). Labor types should be set up before creating labor rates for users.

:::info
**What you can do with the Labor Types API**

- **List and query labor types** available in your instance
- **Create new labor types** with custom names and rate multipliers
- **Update existing types** to modify multipliers or other properties
- **Delete labor types** that are no longer needed
- **Scope types** globally or per site/product
:::

## Common Use Cases

### Initial Configuration
Set up the labor type categories your organization needs during onboarding -- standard time, overtime, after-hours, emergency, etc.

### Rate Multiplier Management
Adjust overtime or premium multipliers as labor policies change, automatically affecting how future labor costs are calculated.

### Multi-Site Configuration
Create site-specific labor types for locations with different labor classifications or billing structures.

### Integration Setup
Query available labor types when building integrations that need to create or assign labor rates, populating dropdowns or mapping to external labor categories.

## API Sections

| Section | Description |
|---------|-------------|
| **Listing** | List all labor types or query with filters |
| **Details** | Get a specific labor type by ID |
| **Managing** | Create, update, and delete labor types |

## Quick Start

### List All Labor Types

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/labor-types" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Create a Labor Type

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/labor-types" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient" \
  -H "Content-Type: application/json" \
  -d '{
    "Name": "Overtime",
    "OvertimeMultiplier": 1.5
  }'
```

## Related APIs

- [Labor Rates](#/Labor%20Rates) - Assign hourly rates to users for each labor type
- [Tickets](#/Tickets) - Track labor time entries on tickets
