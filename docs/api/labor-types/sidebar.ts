import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/labor-types/labor-types-api",
    },
    {
      type: "category",
      label: "Details",
      link: {
        type: "doc",
        id: "api/labor-types/labor-types-details",
      },
      items: [
        {
          type: "doc",
          id: "api/labor-types/get-labor-type",
          label: "Get Labor Type by ID",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Managing",
      link: {
        type: "doc",
        id: "api/labor-types/labor-types-managing",
      },
      items: [
        {
          type: "doc",
          id: "api/labor-types/update-labor-type",
          label: "Update Labor Type",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/labor-types/delete-labor-type",
          label: "Delete Labor Type",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/labor-types/create-labor-type",
          label: "Create Labor Type",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Listing",
      link: {
        type: "doc",
        id: "api/labor-types/labor-types-listing",
      },
      items: [
        {
          type: "doc",
          id: "api/labor-types/list-labor-types",
          label: "List Labor Types",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/labor-types/query-labor-types",
          label: "Query Labor Types",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      items: [
        {
          type: "doc",
          id: "api/labor-types/schemas/getlabortypesrequest",
          label: "GetLaborTypesRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-types/schemas/itemcreateresponse",
          label: "ItemCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-types/schemas/itemdeleteresponse",
          label: "ItemDeleteResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-types/schemas/itemgetresponse",
          label: "ItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-types/schemas/itemupdateresponse",
          label: "ItemUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-types/schemas/labortype",
          label: "LaborType",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-types/schemas/listgetresponse",
          label: "ListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-types/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-types/schemas/scopes",
          label: "Scopes",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-types/schemas/softvalidationerror",
          label: "SoftValidationError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/labor-types/schemas/updatelabortyperequest",
          label: "UpdateLaborTypeRequest",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
