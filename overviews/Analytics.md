# Analytics API

The Analytics API provides access to IncidentIQ's reporting and analytics data. Retrieve metrics, audit information, and aggregated statistics for dashboards and reporting.

## Overview

The Analytics API surfaces aggregated data for reporting and business intelligence.

:::info
**What you can do with the Analytics API**

- **Retrieve asset analytics** including verification status and audit compliance
- **Access audit policy data** for compliance tracking
- **Build custom dashboards** with real-time metrics
:::

## Common Use Cases

### Executive Dashboards
Pull high-level metrics for leadership visibility into IT operations.

### Compliance Reporting
Generate audit reports for E-Rate, insurance, or internal compliance requirements.

### Asset Verification Tracking
Monitor progress on annual device inventory verification.

### Trend Analysis
Track metrics over time to identify patterns and plan resources.

## API Sections

| Section | Description |
|---------|-------------|
| **Assets** | Asset-related analytics and metrics |
| **Audits** | Audit policy status and compliance data |
| **Reporting** | General reporting data access |

## Quick Start

### Get Asset Verification Analytics

```bash
curl -X GET "https://your-site.incidentiq.com/api/v1.0/analytics/assets/verification" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "SiteId: YOUR_SITE_ID" \
  -H "Client: ApiClient"
```

## Related APIs

- [Assets](#/Assets) - Detailed asset data
- [Tickets](#/Tickets) - Ticket metrics and counts
