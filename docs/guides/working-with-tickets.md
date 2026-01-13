---
sidebar_position: 6
---

# Working with Tickets

Complete guide to ticket operations in the IncidentIQ API.

## Overview

Tickets are the core of IncidentIQ's service management. This guide covers common ticket operations.

## Listing Tickets

### Basic Search

```json
POST /api/v1.0/tickets
{
  "Paging": {
    "PageIndex": 0,
    "PageSize": 25
  }
}
```

### With Filters

```json
POST /api/v1.0/tickets
{
  "Filters": [
    { "Facet": "StatusId", "Values": ["open-status-id"] }
  ],
  "Sort": {
    "Field": "CreatedDate",
    "Direction": "Descending"
  },
  "Paging": { "PageIndex": 0, "PageSize": 25 }
}
```

## Getting a Single Ticket

```http
GET /api/v1.0/tickets/{ticketId}
```

Response:
```json
{
  "Item": {
    "TicketId": "uuid",
    "TicketNumber": 12345,
    "Subject": "Laptop not booting",
    "Description": "...",
    "StatusId": "uuid",
    "StatusName": "Open",
    "OwnerId": "uuid",
    "OwnerName": "John Smith",
    "CategoryId": "uuid",
    "CategoryName": "Hardware",
    "CreatedDate": "2024-01-15T10:30:00Z"
  }
}
```

## Creating a Ticket

```json
POST /api/v1.0/tickets/create
{
  "Subject": "New laptop request",
  "Description": "Need a new laptop for new hire starting Monday",
  "CategoryId": "hardware-category-uuid",
  "PriorityId": "medium-priority-uuid",
  "ForId": "requesting-user-uuid",
  "LocationId": "location-uuid"
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `Subject` | string | Brief ticket summary |
| `CategoryId` | UUID | Ticket category |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `Description` | string | Detailed description |
| `PriorityId` | UUID | Priority level |
| `ForId` | UUID | User the ticket is for |
| `LocationId` | UUID | Associated location |
| `TeamId` | UUID | Assigned team |
| `OwnerId` | UUID | Assigned owner |
| `DueDate` | datetime | Expected resolution date |
| `CustomFields` | object | Custom field values |

## Updating a Ticket

```json
PUT /api/v1.0/tickets/{ticketId}
{
  "Subject": "Updated subject",
  "Description": "Updated description",
  "PriorityId": "high-priority-uuid"
}
```

## Changing Ticket Status

```json
POST /api/v1.0/tickets/{ticketId}/status
{
  "StatusId": "closed-status-uuid",
  "Resolution": "Replaced laptop with new device"
}
```

## Assigning Tickets

### Assign to User

```json
POST /api/v1.0/tickets/{ticketId}/assign
{
  "OwnerId": "user-uuid"
}
```

### Assign to Team

```json
POST /api/v1.0/tickets/{ticketId}/assign
{
  "TeamId": "team-uuid"
}
```

## Ticket Activities

### List Activities

```http
GET /api/v1.0/tickets/{ticketId}/activities
```

### Add a Comment

```json
POST /api/v1.0/tickets/{ticketId}/activities
{
  "ActivityType": "Comment",
  "Body": "Waiting for parts to arrive",
  "IsPublic": true
}
```

### Activity Types

| Type | Description |
|------|-------------|
| `Comment` | Text comment |
| `StatusChange` | Status transition |
| `Assignment` | Owner/team change |
| `Attachment` | File added |

## Attaching Assets

### Link Asset to Ticket

```json
POST /api/v1.0/tickets/{ticketId}/assets
{
  "AssetIds": ["asset-uuid-1", "asset-uuid-2"]
}
```

### List Ticket Assets

```http
GET /api/v1.0/tickets/{ticketId}/assets
```

## Workflow Example

### Complete Ticket Lifecycle

```javascript
// 1. Create ticket
const ticket = await createTicket({
  Subject: "Printer not working",
  CategoryId: "hardware-category-id",
  Description: "Office printer showing error code E-101"
});

// 2. Assign to tech team
await assignTicket(ticket.TicketId, {
  TeamId: "tech-support-team-id"
});

// 3. Add diagnostic comment
await addComment(ticket.TicketId, {
  Body: "Diagnosed as paper jam. Clearing now.",
  IsPublic: false
});

// 4. Resolve and close
await updateStatus(ticket.TicketId, {
  StatusId: "closed-status-id",
  Resolution: "Cleared paper jam and tested printing"
});
```
