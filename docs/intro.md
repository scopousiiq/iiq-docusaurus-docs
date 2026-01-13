---
sidebar_position: 1
slug: /
---

# IncidentIQ API Documentation

Welcome to the IncidentIQ API documentation. This guide will help you integrate with IncidentIQ's comprehensive IT service management platform.

## Overview

The IncidentIQ API provides programmatic access to:

- **Tickets** - Create, update, and manage support tickets
- **Assets** - Track and manage IT assets across your organization
- **Users** - Manage user accounts and profiles
- **Locations** - Organize resources by physical locations
- **Custom Fields** - Extend data models with custom attributes
- **Workflows** - Automate processes and approvals
- And much more...

## Quick Start

### 1. Get Your API Credentials

API credentials are available in the IncidentIQ Administration console:

1. Navigate to **Administration > Developer Tools**
2. Generate a new API token
3. Note your **Site ID** (visible in the URL or settings)

### 2. Make Your First Request

All API requests require the following headers:

```bash
Authorization: Bearer YOUR_API_TOKEN
SiteId: YOUR_SITE_ID
Client: ApiClient
Content-Type: application/json
```

### 3. Example: List Tickets

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/tickets" \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

## API Base URL

Replace `your-site` with your IncidentIQ instance subdomain:

```
https://your-site.incidentiq.com/api/v1.0/
```

## Response Format

All API responses follow a consistent format:

```json
{
  "Item": { },           // Single object (for GET by ID)
  "Items": [ ],          // Array of objects (for list/search)
  "Paging": {            // Pagination info (for list/search)
    "PageIndex": 0,
    "PageSize": 25,
    "TotalCount": 100
  },
  "StatusCode": 200,
  "ExecutionTime": 45
}
```

## Next Steps

- [Authentication Guide](/docs/guides/authentication) - Detailed auth setup
- [Pagination & Filtering](/docs/guides/pagination) - Handle large result sets
- [API Reference](/docs/api) - Complete endpoint documentation

## Need Help?

- Visit [IncidentIQ Support](https://support.incidentiq.com)
- Contact your account representative
