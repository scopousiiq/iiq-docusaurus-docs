The Analytics - Asset Auditing API provides reporting and metrics for asset audit policies. Use these endpoints to retrieve aggregated statistics on audit coverage, verification activity, and schedule compliance across your organization.

## Overview

Asset auditing in IncidentIQ ensures that physical assets are regularly verified and accounted for. This analytics API surfaces the data you need to understand how well your audit policies are performing.

:::info
**What you can do with the Analytics - Asset Auditing API**

- **Track audit coverage** to see which assets are covered by audit policies
- **Monitor compliance status** with counts of assets by audit status
- **Analyze verification methods** to understand how assets are being verified (barcode, manual, NFC)
- **Review verification locations** to see where audits are taking place
- **Check schedule progress** to track completion rates for audit periods
:::

## Common Use Cases

### Compliance Dashboards
Build executive dashboards that show audit coverage and compliance rates across locations, giving administrators a real-time view of organizational audit health.

### Verification Trend Analysis
Track how assets are being verified over time to ensure field technicians are following expected procedures and using the correct verification methods.

### Schedule Monitoring
Monitor audit schedule completion rates to identify locations or policies that are falling behind, enabling proactive intervention before deadlines are missed.

## API Sections

| Section | Description |
|---------|-------------|
| **Coverage** | Asset counts by audit policy coverage and compliance status |
| **Schedules** | Audit period completion metrics by schedule and asset |
| **Verification** | Breakdown of verification methods and locations used |

## Quick Start

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/asset-audit-analytics/coverage/{policyId}" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

## Related APIs

- [Audits](#/Audits) - Manage audit policies, schedules, and compliance scans
- [Assets](#/Assets) - Look up asset details referenced in audit data
- [Analytics](#/Analytics) - General asset and user analytics
