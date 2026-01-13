import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/slas/slas-api",
    },
    {
      type: "category",
      label: "Definitions",
      link: {
        type: "doc",
        id: "api/slas/sl-as-definitions",
      },
      items: [
        {
          type: "doc",
          id: "api/slas/list-slas",
          label: "Get SLAs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/slas/create-sla",
          label: "Create New SLA",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/slas/delete-sla-by-id",
          label: "Delete SLA",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/slas/activate-sla",
          label: "Activate SLA",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/slas/deactivate-sla",
          label: "Deactivate SLA",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/slas/add-sla-days-to-date",
          label: "Add SLA days to date",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Metrics",
      link: {
        type: "doc",
        id: "api/slas/sl-as-metrics",
      },
      items: [
        {
          type: "doc",
          id: "api/slas/list-metrics",
          label: "Get Metric Types",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/slas/get-metric-by-id",
          label: "Get Metric Type",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/slas/list-metric-metrics",
          label: "Get Metrics",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/slas/create-metric",
          label: "Create New Custom Metric",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/slas/create-metric-by-id",
          label: "Update Metrics for SLA",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/slas/delete-metric-metrics",
          label: "Delete Custom Metric",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      items: [
        {
          type: "doc",
          id: "api/slas/schemas/actionresponse",
          label: "ActionResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/slas/schemas/forbiddenerror",
          label: "ForbiddenError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/slas/schemas/genericobject",
          label: "GenericObject",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/slas/schemas/internalservererror",
          label: "InternalServerError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/slas/schemas/itemgetresponse",
          label: "ItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/slas/schemas/notfounderror",
          label: "NotFoundError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/slas/schemas/ratelimiterror",
          label: "RateLimitError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/slas/schemas/softvalidationerror",
          label: "SoftValidationError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/slas/schemas/unauthorizederror",
          label: "UnauthorizedError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/slas/schemas/validationerror",
          label: "ValidationError",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
