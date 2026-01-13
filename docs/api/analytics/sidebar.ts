import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/analytics/analytics-api",
    },
    {
      type: "category",
      label: "Users",
      link: {
        type: "doc",
        id: "api/analytics/analytics-users",
      },
      items: [
        {
          type: "doc",
          id: "api/analytics/get-requestor-summary-stats",
          label: "Get requestor summary statistics",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Assets",
      link: {
        type: "doc",
        id: "api/analytics/analytics-assets",
      },
      items: [
        {
          type: "doc",
          id: "api/analytics/get-asset-verification-counts-by-location",
          label: "Get verified asset counts by location",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/analytics/get-asset-summary-stats",
          label: "Get asset summary statistics",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/analytics/get-asset-counts-by-status-type",
          label: "Get asset counts by status type",
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
          id: "api/analytics/schemas/aggregatesummarystats",
          label: "AggregateSummaryStats",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/analytics/schemas/aggregatesummarystatsresponse",
          label: "AggregateSummaryStatsResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/analytics/schemas/analyticsassetstatuslistresponse",
          label: "AnalyticsAssetStatusListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/analytics/schemas/analyticsdatapoint",
          label: "AnalyticsDataPoint",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/analytics/schemas/analyticsverificationlocationdatapoint",
          label: "AnalyticsVerificationLocationDataPoint",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/analytics/schemas/analyticsverificationlocationlistresponse",
          label: "AnalyticsVerificationLocationListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/analytics/schemas/forbiddenerror",
          label: "ForbiddenError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/analytics/schemas/internalservererror",
          label: "InternalServerError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/analytics/schemas/notfounderror",
          label: "NotFoundError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/analytics/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/analytics/schemas/ratelimiterror",
          label: "RateLimitError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/analytics/schemas/unauthorizederror",
          label: "UnauthorizedError",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
