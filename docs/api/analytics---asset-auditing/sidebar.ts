import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/analytics---asset-auditing/analytics-asset-auditing-api",
    },
    {
      type: "category",
      label: "Coverage",
      link: {
        type: "doc",
        id: "api/analytics---asset-auditing/analytics-asset-auditing-coverage",
      },
      items: [
        {
          type: "doc",
          id: "api/analytics---asset-auditing/get-asset-counts-by-audit-policy-coverage",
          label: "Get asset counts by audit policy coverage",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/analytics---asset-auditing/get-asset-counts-by-audit-status",
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
        id: "api/analytics---asset-auditing/analytics-asset-auditing-schedules",
      },
      items: [
        {
          type: "doc",
          id: "api/analytics---asset-auditing/get-asset-audit-policy-periods-by-status",
          label: "Get audit policy period counts by status for a schedule",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/analytics---asset-auditing/get-asset-audit-policy-periods-by-status-for-asset",
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
        id: "api/analytics---asset-auditing/analytics-asset-auditing-verification",
      },
      items: [
        {
          type: "doc",
          id: "api/analytics---asset-auditing/get-asset-counts-by-audit-policy-verification-type",
          label: "Get asset counts by audit verification type for a policy",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/analytics---asset-auditing/get-asset-counts-by-audit-policy-verification-location",
          label: "Get asset counts by audit verification location for a policy",
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
          id: "api/analytics---asset-auditing/schemas/analyticsdatapoint",
          label: "AnalyticsDataPoint",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/analytics---asset-auditing/schemas/listgetresponse",
          label: "ListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/analytics---asset-auditing/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/analytics---asset-auditing/schemas/softvalidationerror",
          label: "SoftValidationError",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
