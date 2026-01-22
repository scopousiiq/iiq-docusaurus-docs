---
sidebar_position: 1
---

# API Reference

This section contains the complete API reference for IncidentIQ, organized by functional area.

## API Categories

### Core Operations

| Category | Description | Endpoints |
|----------|-------------|-----------|
| [Tickets](/docs/api/tickets/tickets-api) | Ticket management, status tracking, assignments | 149 |
| [Assets](/docs/api/assets/assets-api) | Asset management, checkout, inventory tracking | 121 |
| [Users](/docs/api/users/users-api) | User management and profiles | 88 |

### Organization

| Category | Description | Endpoints |
|----------|-------------|-----------|
| [Locations](/docs/api/locations/locations-api) | Physical location management | 55 |
| [Teams](/docs/api/teams/teams-api) | Team organization and membership | 18 |
| [Organizations](/docs/api/organizations/organizations-api) | Multi-organization support | 43 |

### Configuration

| Category | Description | Endpoints |
|----------|-------------|-----------|
| [Categories](/docs/api/categories/categories-api) | Asset and ticket categorization | 33 |
| [Custom Fields](/docs/api/custom-fields/custom-fields-api) | Custom data attributes | 52 |
| [Workflows](/docs/api/workflows/workflows-api) | Automation and approval workflows | 22 |

### Inventory & Parts

| Category | Description | Endpoints |
|----------|-------------|-----------|
| [Inventory](/docs/api/inventory/inventory-api) | Inventory operations | 46 |
| [Parts](/docs/api/parts/parts-api) | Parts management | 19 |
| [Manufacturers](/docs/api/manufacturers/manufacturers-api) | Manufacturer data | 11 |

## Authentication

All API requests require authentication. See the [Authentication Guide](/docs/guides/authentication) for details.

### Required Headers

```http
Authorization: Bearer YOUR_API_TOKEN
SiteId: YOUR_SITE_ID
Client: ApiClient
Content-Type: application/json
```

## Common Patterns

### Search Operations

Most list endpoints use POST requests with search criteria:

```json
POST /api/v1.0/tickets
{
  "OnlyShowDeleted": false,
  "Filters": [],
  "Facets": [],
  "Paging": {
    "PageIndex": 0,
    "PageSize": 25
  }
}
```

### Response Envelope

All responses follow a standard envelope format with status codes, execution time, and optional paging information.
