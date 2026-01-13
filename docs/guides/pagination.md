---
sidebar_position: 3
---

# Pagination & Filtering

Learn how to efficiently retrieve and filter large datasets from the IncidentIQ API.

## Pagination

Most list and search endpoints support pagination to handle large result sets efficiently.

### Request Format

Include a `Paging` object in your request body:

```json
{
  "Paging": {
    "PageIndex": 0,
    "PageSize": 25
  }
}
```

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| `PageIndex` | integer | Zero-based page number | 0 |
| `PageSize` | integer | Items per page (max 100) | 25 |

### Response Format

The response includes pagination metadata:

```json
{
  "Items": [...],
  "Paging": {
    "PageIndex": 0,
    "PageSize": 25,
    "TotalCount": 1250
  }
}
```

### Iterating Through Pages

```javascript
async function getAllTickets() {
  const allTickets = [];
  let pageIndex = 0;
  const pageSize = 100;
  let totalCount = 0;

  do {
    const response = await apiRequest('/tickets', {
      method: 'POST',
      body: JSON.stringify({
        Paging: { PageIndex: pageIndex, PageSize: pageSize }
      })
    });

    allTickets.push(...response.Items);
    totalCount = response.Paging.TotalCount;
    pageIndex++;

  } while (allTickets.length < totalCount);

  return allTickets;
}
```

## Filtering

Use the `Filters` array to narrow down results based on field values.

### Filter Structure

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

### Common Filter Fields

| Entity | Common Filters |
|--------|----------------|
| Tickets | `StatusId`, `OwnerId`, `CategoryId`, `CreatedDate` |
| Assets | `StatusId`, `LocationId`, `CategoryId`, `ModelId` |
| Users | `RoleId`, `LocationId`, `IsActive` |

### Example: Filter Tickets by Status

```json
POST /api/v1.0/tickets
{
  "Filters": [
    {
      "Facet": "StatusId",
      "Values": ["open-status-id", "in-progress-status-id"]
    }
  ],
  "Paging": {
    "PageIndex": 0,
    "PageSize": 25
  }
}
```

## Sorting

Use the `Sort` object to order results:

```json
{
  "Sort": {
    "Field": "CreatedDate",
    "Direction": "Descending"
  }
}
```

| Direction | Description |
|-----------|-------------|
| `Ascending` | A-Z, oldest first, lowest first |
| `Descending` | Z-A, newest first, highest first |

## Facets

Facets provide aggregated counts for filtering options. Request facets to build dynamic filter UIs:

```json
{
  "Facets": ["StatusId", "CategoryId", "OwnerId"]
}
```

### Facet Response

```json
{
  "Items": [...],
  "Facets": {
    "StatusId": [
      { "Value": "open-id", "Count": 45, "Label": "Open" },
      { "Value": "closed-id", "Count": 120, "Label": "Closed" }
    ]
  }
}
```

## Search Example

Complete search request with pagination, filtering, and sorting:

```json
POST /api/v1.0/tickets
{
  "OnlyShowDeleted": false,
  "Filters": [
    {
      "Facet": "StatusId",
      "Values": ["open-status-id"]
    },
    {
      "Facet": "CategoryId",
      "Values": ["hardware-category-id"]
    }
  ],
  "Facets": ["StatusId", "OwnerId"],
  "Sort": {
    "Field": "CreatedDate",
    "Direction": "Descending"
  },
  "Paging": {
    "PageIndex": 0,
    "PageSize": 50
  }
}
```

## Performance Tips

1. **Request only needed pages** - Don't fetch all pages if you only need the first few
2. **Use filters** - Reduce result set size server-side
3. **Limit page size** - Smaller pages = faster responses
4. **Cache facet data** - Facet counts don't change frequently
5. **Use specific endpoints** - Some entities have optimized search endpoints
