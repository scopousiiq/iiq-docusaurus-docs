# Sites API

The Sites API provides access to site configuration and settings in IncidentIQ. Retrieve site information, roles, configuration settings, and system status.

## Overview

Sites in IncidentIQ represent your organization's IncidentIQ instance configuration—settings, roles, themes, and system information. The Sites API is primarily read-only, providing access to configuration data needed for integrations.

:::info
**What you can do with the Sites API**
:::

>
> - **Retrieve site configuration** including settings and preferences
> - **List and query roles** defined in your site
> - **Access role permissions** and policy assignments
> - **Check system health** with health check endpoints
> - **Get site theme** CSS for branding consistency
> - **View deployment history** and file type configurations

## Common Use Cases

### Integration Configuration
Retrieve site settings to configure external integrations properly.

### Role-Based Access
Query roles and permissions to understand access levels for API operations.

### Health Monitoring
Use health check endpoints for uptime monitoring and alerting.

### Multi-Site Queries
Retrieve settings for specific sites in multi-site deployments.

## API Sections

| Section | Description |
|---------|-------------|
| **Details** | Retrieve site configuration, settings, and theme |
| **Roles** | List and query roles with permissions |
| **Configuration** | Access status types, file types, and deployment history |
| **Utilities** | Health check endpoints for monitoring |

## Quick Start

### Get Current Site Settings

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/sites/my/settings" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Get Site by URL

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/sites/{siteUrl}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### List Roles

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/sites/roles" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### List Roles with Permissions

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/sites/roles/with-permission-policies" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Health Check

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/sites/isalive" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

:::info
**Health Check Usage**
:::

>
> The `/sites/isalive` endpoint is useful for monitoring systems. Use the HEAD method for lightweight checks that don't need response body parsing.

## Related APIs

- [Users](#/Users) - Users are assigned roles defined in the site

Role permissions and site settings are managed through this API's Roles and Configuration endpoints.
