---
sidebar_position: 5
---

# Advanced Filtering

Deep dive into the IncidentIQ API filtering system using facets.

## Filter Basics

Filters narrow down search results based on field values. The API uses a facet-based filtering system that's both powerful and flexible.

## Filter Syntax

```json
{
  "Filters": [
    {
      "Facet": "FieldName",
      "Values": ["value1", "value2"]
    }
  ]
}
```

- **Facet**: The field name to filter on
- **Values**: Array of acceptable values (OR logic within a filter)
- Multiple filters use AND logic between them

## Common Facets by Entity

### Tickets

| Facet | Type | Description |
|-------|------|-------------|
| `StatusId` | UUID | Ticket status |
| `OwnerId` | UUID | Assigned owner |
| `TeamId` | UUID | Assigned team |
| `CategoryId` | UUID | Ticket category |
| `PriorityId` | UUID | Priority level |
| `LocationId` | UUID | Associated location |
| `CreatedDate` | Date Range | Creation timestamp |
| `ModifiedDate` | Date Range | Last modification |

### Assets

| Facet | Type | Description |
|-------|------|-------------|
| `StatusId` | UUID | Asset status |
| `LocationId` | UUID | Current location |
| `CategoryId` | UUID | Asset category |
| `ModelId` | UUID | Asset model |
| `ManufacturerId` | UUID | Manufacturer |
| `OwnerId` | UUID | Assigned owner |
| `PurchaseDate` | Date Range | Purchase date |

### Users

| Facet | Type | Description |
|-------|------|-------------|
| `RoleId` | UUID | User role |
| `LocationId` | UUID | Primary location |
| `TeamId` | UUID | Team membership |
| `IsActive` | Boolean | Active status |

## Filter Examples

### Single Value Filter

Find all open tickets:

```json
{
  "Filters": [
    {
      "Facet": "StatusId",
      "Values": ["open-status-uuid"]
    }
  ]
}
```

### Multiple Values (OR)

Find tickets that are open OR in progress:

```json
{
  "Filters": [
    {
      "Facet": "StatusId",
      "Values": ["open-status-uuid", "in-progress-status-uuid"]
    }
  ]
}
```

### Multiple Facets (AND)

Find open tickets in the Hardware category:

```json
{
  "Filters": [
    {
      "Facet": "StatusId",
      "Values": ["open-status-uuid"]
    },
    {
      "Facet": "CategoryId",
      "Values": ["hardware-category-uuid"]
    }
  ]
}
```

### Date Range Filters

Find tickets created in the last 30 days:

```json
{
  "Filters": [
    {
      "Facet": "CreatedDate",
      "DateRange": {
        "From": "2024-01-01T00:00:00Z",
        "To": "2024-01-31T23:59:59Z"
      }
    }
  ]
}
```

## Using Facets for Discovery

Request facet data to discover available filter options:

```json
{
  "Facets": ["StatusId", "CategoryId", "OwnerId"]
}
```

Response includes counts for each facet value:

```json
{
  "Facets": {
    "StatusId": [
      { "Value": "uuid-1", "Label": "Open", "Count": 45 },
      { "Value": "uuid-2", "Label": "In Progress", "Count": 23 },
      { "Value": "uuid-3", "Label": "Closed", "Count": 180 }
    ],
    "CategoryId": [
      { "Value": "uuid-a", "Label": "Hardware", "Count": 89 },
      { "Value": "uuid-b", "Label": "Software", "Count": 134 }
    ]
  }
}
```

## Building Dynamic Filters

### Step 1: Get Available Facets

```json
POST /api/v1.0/tickets
{
  "Facets": ["StatusId", "CategoryId", "PriorityId"],
  "Paging": { "PageIndex": 0, "PageSize": 1 }
}
```

### Step 2: Display Options to User

Use the facet response to build filter dropdowns or checkboxes.

### Step 3: Apply User Selections

```json
POST /api/v1.0/tickets
{
  "Filters": [
    { "Facet": "StatusId", "Values": ["user-selected-status"] },
    { "Facet": "CategoryId", "Values": ["user-selected-category"] }
  ],
  "Paging": { "PageIndex": 0, "PageSize": 25 }
}
```

## Performance Considerations

1. **Limit facet requests** - Only request facets you need
2. **Cache facet data** - Values don't change frequently
3. **Use indexed fields** - Status, Category, Owner are optimized
4. **Combine with pagination** - Don't load all results at once
