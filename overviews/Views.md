# Views API

The Views API provides access to saved view configurations in IncidentIQ.

## Overview

Views define how data is displayed, including column selections, sorting, and layout preferences.

:::info
**What you can do with the Views API**
:::

>
> - **Retrieve view configurations** for different entity types
> - **Access personal and shared views**
> - **Understand display preferences** for UI integration

## Quick Start

### List Views

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/views" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

## Related APIs

- [Filters](#/Filters) - Saved search criteria
- [Tickets](#/Tickets) - Ticket list views
- [Assets](#/Assets) - Asset list views
