import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/labor-rates/labor-rates-api",
    },
    {
      type: "category",
      label: "Activity",
      link: {
        type: "doc",
        id: "api/labor-rates/labor-rates-activity",
      },
      items: [
        {
          type: "doc",
          id: "api/labor-rates/get-users-labor-ticket-activity-actions",
          label: "Get labor ticket activity actions by user IDs",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/labor-rates/get-labor-activity-by-tickets",
          label: "Get labor rate activity by ticket IDs",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/labor-rates/get-labor-activity-by-tickets-grouped-by-user",
          label: "Get labor rate activity by ticket IDs grouped by user",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Bulk",
      link: {
        type: "doc",
        id: "api/labor-rates/labor-rates-bulk",
      },
      items: [
        {
          type: "doc",
          id: "api/labor-rates/bulk-set-labor-rates",
          label: "Bulk set labor rates for multiple users",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Managing",
      link: {
        type: "doc",
        id: "api/labor-rates/labor-rates-managing",
      },
      items: [
        {
          type: "doc",
          id: "api/labor-rates/create-labor-rate",
          label: "Create a new labor rate",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/labor-rates/update-labor-rate",
          label: "Update an existing labor rate",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/labor-rates/delete-labor-rate",
          label: "Delete a labor rate",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Retrieving",
      link: {
        type: "doc",
        id: "api/labor-rates/labor-rates-retrieving",
      },
      items: [
        {
          type: "doc",
          id: "api/labor-rates/get-labor-rate",
          label: "Get a labor rate by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/labor-rates/get-user-labor-rates",
          label: "Get labor rates for a user",
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
          id: "api/labor-rates/schemas/bulkchangelaborraterequest",
          label: "BulkChangeLaborRateRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-rates/schemas/itemcreateresponse",
          label: "ItemCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-rates/schemas/itemdeleteresponse",
          label: "ItemDeleteResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-rates/schemas/itemgetresponse",
          label: "ItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-rates/schemas/itemupdateresponse",
          label: "ItemUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-rates/schemas/laborrate",
          label: "LaborRate",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-rates/schemas/laborrateactivity",
          label: "LaborRateActivity",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-rates/schemas/listgetresponse",
          label: "ListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-rates/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-rates/schemas/softvalidationerror",
          label: "SoftValidationError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-rates/schemas/updatelaborraterequest",
          label: "UpdateLaborRateRequest",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
