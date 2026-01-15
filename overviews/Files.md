The Files API provides file upload, download, and management capabilities for IncidentIQ.

## Overview

Files in IncidentIQ can be attached to tickets, assets, and other entities.

:::info
**What you can do with the Files API**
:::

>
> - **Upload files** as attachments to various entities
> - **Download files** including images, documents, and receipts
> - **Manage file metadata** and associations

## Common Use Cases

### Ticket Attachments
Upload screenshots, logs, or documents to support ticket resolution.

### Asset Documentation
Attach receipts, warranty documents, or configuration files to assets.

### Bulk File Operations
Programmatically manage attachments during data migration.

## API Sections

| Section | Description |
|---------|-------------|
| **Upload** | Upload files to IncidentIQ |
| **Download** | Retrieve file contents |
| **Managing** | File metadata and associations |

## Quick Start

### Download a File

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/files/{fileId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

:::warning
**File Size Limits**
:::

>
> File uploads are subject to size limits. Check your site configuration for maximum allowed file sizes.

## Related APIs

- [Tickets](#/Tickets) - Ticket attachments
- [Assets](#/Assets) - Asset file attachments
