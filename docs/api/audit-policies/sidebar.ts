import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/audit-policies/audit-policies-api",
    },
    {
      type: "category",
      label: "Compliance",
      link: {
        type: "doc",
        id: "api/audit-policies/audit-policies-compliance",
      },
      items: [
        {
          type: "doc",
          id: "api/audit-policies/get-asset-counts-by-audit-policy-status",
          label: "Get asset counts by audit policy status",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/audit-policies/get-asset-counts-by-audit-policy-schedule-status",
          label: "Get asset counts by audit policy schedule status",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Coverage",
      link: {
        type: "doc",
        id: "api/audit-policies/audit-policies-coverage",
      },
      items: [
        {
          type: "doc",
          id: "api/audit-policies/get-asset-counts-by-audit-policy-coverage",
          label: "Get asset counts by audit policy coverage",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/audit-policies/get-asset-counts-by-audit-status",
          label: "Get asset counts by audit status",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Schedules",
      link: {
        type: "doc",
        id: "api/audit-policies/audit-policies-schedules",
      },
      items: [
        {
          type: "doc",
          id: "api/audit-policies/get-asset-audit-policy-periods-by-status",
          label: "Get audit policy period counts by status for a schedule",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/audit-policies/get-asset-audit-policy-periods-by-status-for-asset",
          label: "Get audit policy period counts by status for a schedule and specific asset",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Verification",
      link: {
        type: "doc",
        id: "api/audit-policies/audit-policies-verification",
      },
      items: [
        {
          type: "doc",
          id: "api/audit-policies/get-asset-counts-by-audit-policy-verification-type",
          label: "Get asset counts by audit verification type for a policy",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/audit-policies/get-asset-counts-by-audit-policy-verification-location",
          label: "Get asset counts by audit verification location for a policy",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/audit-policies/get-asset-verification-counts-by-location",
          label: "Get verified asset counts by location",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/audit-policies/get-asset-verification-counts-by-type",
          label: "Get verified asset counts by verification type",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      items: [
        {
          type: "doc",
          id: "api/audit-policies/schemas/analyticsauditpolicyschedulestatusdatapoint",
          label: "AnalyticsAuditPolicyScheduleStatusDataPoint",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/audit-policies/schemas/analyticsauditpolicyschedulestatuslistresponse",
          label: "AnalyticsAuditPolicyScheduleStatusListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/audit-policies/schemas/analyticsauditpolicystatusdatapoint",
          label: "AnalyticsAuditPolicyStatusDataPoint",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/audit-policies/schemas/analyticsauditpolicystatuslistresponse",
          label: "AnalyticsAuditPolicyStatusListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/audit-policies/schemas/analyticsdatapoint",
          label: "AnalyticsDataPoint",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/audit-policies/schemas/analyticsverificationlocationdatapoint",
          label: "AnalyticsVerificationLocationDataPoint",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/audit-policies/schemas/analyticsverificationlocationlistresponse",
          label: "AnalyticsVerificationLocationListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/audit-policies/schemas/analyticsverificationtypedatapoint",
          label: "AnalyticsVerificationTypeDataPoint",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/audit-policies/schemas/analyticsverificationtypelistresponse",
          label: "AnalyticsVerificationTypeListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/audit-policies/schemas/forbiddenerror",
          label: "ForbiddenError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/audit-policies/schemas/internalservererror",
          label: "InternalServerError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/audit-policies/schemas/listgetresponse",
          label: "ListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/audit-policies/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/audit-policies/schemas/ratelimiterror",
          label: "RateLimitError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/audit-policies/schemas/softvalidationerror",
          label: "SoftValidationError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/audit-policies/schemas/unauthorizederror",
          label: "UnauthorizedError",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
