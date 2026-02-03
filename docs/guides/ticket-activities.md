---
sidebar_position: 7
---

# Working with Ticket Activities

Ticket activities represent the communication history and work log for a ticket. Every comment, resolution action, and file attachment is recorded as an activity, creating an audit trail of all interactions.

## What Are Activities?

Activities are the individual entries in a ticket's timeline. When an agent adds a comment, logs work performed, or attaches a file, the system creates an activity record. Each activity includes:

- **Who** created it (the owner)
- **When** it was created and last modified
- **What** type of activity it is
- **Visibility** - whether the ticket requester can see it

Activities are grouped by type using `TicketActivityTypeId`:

| Type ID | Name | Use Case |
|---------|------|----------|
| 6 | Comment | Public messages to requesters or internal notes between agents |
| 8 | Resolution Action | Work performed, with optional labor time tracking |
| 7 | Attachment | Files, images, or documents added to the ticket |

## The Activity Feed

Every ticket has an activity feed accessible via `GET /tickets/{ticketId}/activities`. This returns a paginated list of all activities in chronological order.

Each activity contains an `ActivityItems` array with the actual content. The items use a polymorphic `$type` discriminator field that indicates how to interpret the data:

- `Spark.Shared.Models.TicketActivityComment` - Comment content
- `Spark.Shared.Models.TicketActivityAction` - Resolution action details
- `Spark.Shared.Models.TicketActivityAttachment` - File metadata

:::tip
For a complete audit trail including system-generated events like workflow transitions and rule executions, use the timeline endpoint: `GET /tickets/{ticketId}/timeline`.
:::

## Adding Comments

Comments are the primary communication mechanism on tickets. The key decision when creating a comment is **visibility**:

- **Public comments** (`IsPublic: true`) - Visible to the ticket requester. Use for customer-facing communication.
- **Internal notes** (`IsPublic: false`) - Only visible to agents. Use for internal coordination, vendor notes, or sensitive information.

To add a comment, POST to `/tickets/{ticketId}/activities` with an `ActivityItems` array containing a comment object. Required fields:

| Field | Description |
|-------|-------------|
| `$type` | Must be `Spark.Shared.Models.TicketActivityComment, Spark.Shared` |
| `TicketActivityTypeId` | Must be `6` |
| `ByUserId` | UUID of the user authoring the comment |
| `Comments` | HTML-formatted comment body |

The `IsPublic` field can be set at both the activity level and the individual item level.

:::warning HTML Content
The `Comments` field accepts HTML. If accepting user input, sanitize content before submission to prevent XSS vulnerabilities.
:::

## Comment Syncing for Integrations

A common integration pattern is **two-way comment syncing** between Incident IQ and external systems such as vendor portals, MDM platforms, or third-party ticketing systems. This allows technicians to communicate with external parties directly from the IIQ interface.

### How It Works

1. **Outbound sync**: Poll the activity feed for new comments, filter by `TicketActivityTypeId: 6` and `CreatedDate`, then push to the external system.

2. **Inbound sync**: When comments arrive from the external system, create them in IIQ via the activities endpoint.

### Key Fields for Syncing

| Field | Purpose |
|-------|---------|
| `CreatedDate` | Timestamp for detecting new comments since last sync |
| `ModifiedDate` | Timestamp for detecting edited comments |
| `TicketActivityTypeId` | Filter to only process comments (type 6) |
| `ExternalId` | Optional field to store your external system's comment ID for deduplication |
| `IsDeleted` | Check this when syncing to detect removed comments |
| `IsPublic` | Respect visibility when deciding what to sync externally |

### Best Practices

- **Use `ExternalId`** when creating comments from external systems to prevent duplicates on retry
- **Store the `TicketActivityId`** returned by IIQ alongside your external ID for update/delete operations
- **Poll at reasonable intervals** (60+ seconds) to avoid rate limiting
- **Filter by type first** - only process `TicketActivityTypeId: 6` for comment sync workflows

## Resolution Actions

Resolution actions document the work performed on a ticket. Unlike comments, they're designed for structured work logging and can include labor time for reporting and billing.

### Looking Up Available Actions

Before logging a resolution action, retrieve the available actions for your site via `GET /resolutions/actions`. This returns a list of configured actions with their `ResolutionActionId`, name, and category.

Actions are typically organized by category (e.g., "Hardware Repairs", "Software Support") and configured by site administrators.

### Logging Work

To log a resolution action, POST to `/tickets/{ticketId}/activities` with a resolution action item. Key fields:

| Field | Description |
|-------|-------------|
| `$type` | Must be `Spark.Shared.Models.TicketActivityAction, Spark.Shared` |
| `TicketActivityTypeId` | Must be `8` |
| `ByUserId` | UUID of the technician performing the work |
| `ResolutionActionId` | UUID of the action (from the resolution actions lookup) |
| `Comments` | Optional notes about the work performed |
| `Minutes` | Optional labor time in minutes |

Resolution actions appear in the ticket timeline and contribute to labor tracking reports.

## Adding Attachments

Attachments allow you to add images, documents, and other files to tickets. This is a **two-step process**:

### Step 1: Upload the File

Use the Files API to upload your file:

- `POST /files` - Multipart form upload
- `POST /files/base64/save` - Base64-encoded upload (useful for JSON-only clients)

Both endpoints return a `FileId` that you'll use in the next step.

### Step 2: Associate with the Ticket

Link the uploaded file to the ticket using:

```
POST /files/{fileId}/entity/{entityTypeId}/{ticketId}
```

The `entityTypeId` identifies the target entity type. Retrieve the mapping of entity names to UUIDs from the Sites API via `GET /sites/me` or `GET /sites/{siteId}` - the response includes an `EntityTypes` object that maps names like "Ticket", "Asset", and "User" to their corresponding UUIDs.

### Alternative: Inline Attachments

When updating a ticket via `PUT /tickets/{ticketId}`, you can include attachments directly in the request body with Base64-encoded content. Set `UpdateAttachments: true` to persist the changes.

This approach is simpler for single-file attachments but less efficient for large files.

## Managing Activities

### Editing Activities

Update an existing activity via `POST /tickets/{ticketId}/activities/{activityId}`. This is commonly used to correct typos in comments or update resolution action notes.

### Deleting and Restoring

Activities support soft-delete:

- `DELETE /tickets/activities/{activityId}` - Marks the activity as deleted
- `PUT /tickets/activities/{activityId}/undelete` - Restores a deleted activity

Soft-deleted activities are retained in the database and can be restored. Check the `IsDeleted` field when processing activities.

### Changing Visibility

Toggle an activity between public and private:

```
POST /tickets/{ticketId}/activities/{activityId}/visibility
```

Pass `true` for public (visible to requester) or `false` for private (agents only).

This is useful when an internal note needs to be shared with the requester, or when a public comment was posted by mistake.

## API Reference

For complete endpoint documentation with request/response schemas and code samples:

- [Tickets API Reference](/docs/api/tickets/tickets-api) - Activity endpoints under "Communication" section
- [Files API Reference](/docs/api/files/files-api) - File upload and management

## Next Steps

- Review [Working with Tickets](./working-with-tickets) for ticket creation and querying
- Explore [Working with Assets](./working-with-assets) to link assets to tickets
- See [Paging and Sorting](./pagination) for handling large activity feeds

:::warning
This resource is designed for technical administrators. If you are looking for our Incident IQ help guides and announcements, you can find them at our [Help Center](https://help.incidentiq.com/hc/en-us)
:::
