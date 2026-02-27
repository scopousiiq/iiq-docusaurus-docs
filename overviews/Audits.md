The Audits API provides full management of asset audit policies in IncidentIQ. Define audit rules, configure schedules, execute compliance scans, and track verification workflows to ensure assets are regularly accounted for.

## Overview

Asset auditing helps organizations maintain accurate inventory records by requiring periodic physical verification of assets. Audit policies define which assets need to be checked, how often, and by whom. The Audits API gives you programmatic control over this entire lifecycle.

:::info
**What you can do with the Audits API**

- **Create and manage audit policies** that define verification rules and scope
- **Configure schedules** for recurring audit cycles
- **Execute compliance scans** at various levels (system-wide, by site, by schedule, or per asset)
- **Track policy assets** to see which assets are covered by each policy
- **Monitor schedule status** for assets within audit periods
- **Manage alert notifications** for audit policy events
:::

## Common Use Cases

### Automated Compliance Scanning
Trigger compliance scans programmatically on a schedule or in response to events, ensuring your audit data stays current without manual intervention.

### Policy Lifecycle Management
Create audit policies during onboarding, update them as organizational needs change, and deactivate them when no longer needed -- all through the API.

### Bulk Asset Auditing
Use site-wide or date-range scans to process large numbers of assets efficiently, rather than scanning assets one at a time.

### Integration with External Systems
Connect audit workflows to external asset management or compliance platforms, triggering scans and retrieving results through the API.

## API Sections

| Section | Description |
|---------|-------------|
| **Policies** | Create, read, update, and delete audit policies and their configurations |
| **Schedules** | View audit schedule instances, check status, and calculate next check dates |
| **Compliance** | Execute compliance scans at various scope levels and manage scan data |
| **Types** | List available audit policy types |

## Quick Start

### List Audit Policies

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/asset-audit-policies" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Get a Specific Policy

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/asset-audit-policies/{policyId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

### Start a Compliance Scan

```bash
curl -X POST "https://your-site.incidentiq.com/api/v1.0/asset-audit-policies/{policyId}/compliance-scan" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

## Related APIs

- [Assets](#/Assets) - Look up and manage the assets covered by audit policies
- [Locations](#/Locations) - Reference location data used in audit scope
- [Teams](#/Teams) - Assign teams to audit policies
