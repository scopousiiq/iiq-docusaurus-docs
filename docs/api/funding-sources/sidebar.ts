import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/funding-sources/funding-sources-api",
    },
    {
      type: "category",
      label: "Bulk",
      link: {
        type: "doc",
        id: "api/funding-sources/funding-sources-bulk",
      },
      items: [
        {
          type: "doc",
          id: "api/funding-sources/update-funding-sources-by-query",
          label: "Bulk update funding sources",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Deleting",
      link: {
        type: "doc",
        id: "api/funding-sources/funding-sources-deleting",
      },
      items: [
        {
          type: "doc",
          id: "api/funding-sources/delete-funding-source",
          label: "Delete a funding source",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/funding-sources/delete-funding-sources-by-query",
          label: "Delete funding sources by query",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/funding-sources/delete-funding-sources-by-ids",
          label: "Delete funding sources by IDs",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Searching",
      link: {
        type: "doc",
        id: "api/funding-sources/funding-sources-searching",
      },
      items: [
        {
          type: "doc",
          id: "api/funding-sources/get-funding-sources-legacy",
          label: "List funding sources (legacy)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/funding-sources/search-funding-sources",
          label: "Search funding sources",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Details",
      link: {
        type: "doc",
        id: "api/funding-sources/funding-sources-details",
      },
      items: [
        {
          type: "doc",
          id: "api/funding-sources/get-funding-sources-by-ids",
          label: "Get funding sources by IDs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/funding-sources/get-funding-source-by-id",
          label: "Get funding source by ID",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Managing",
      link: {
        type: "doc",
        id: "api/funding-sources/funding-sources-managing",
      },
      items: [
        {
          type: "doc",
          id: "api/funding-sources/create-funding-sources",
          label: "Create multiple funding sources",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/funding-sources/create-funding-source",
          label: "Create a funding source",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/funding-sources/update-funding-source",
          label: "Update a funding source",
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
          id: "api/funding-sources/schemas/datafilter",
          label: "DataFilter",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/funding-sources/schemas/datafilteroperations",
          label: "DataFilterOperations",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/funding-sources/schemas/errorresponse",
          label: "ErrorResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/funding-sources/schemas/fundingsource",
          label: "FundingSource",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/funding-sources/schemas/itemcreateresponse",
          label: "ItemCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/funding-sources/schemas/itemdeleteresponse",
          label: "ItemDeleteResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/funding-sources/schemas/itemgetresponse",
          label: "ItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/funding-sources/schemas/itemupdateresponse",
          label: "ItemUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/funding-sources/schemas/listcreateresponse",
          label: "ListCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/funding-sources/schemas/listdeleteresponse",
          label: "ListDeleteResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/funding-sources/schemas/listgetresponse",
          label: "ListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/funding-sources/schemas/listupdateresponse",
          label: "ListUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/funding-sources/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/funding-sources/schemas/softvalidationerror",
          label: "SoftValidationError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/funding-sources/schemas/updatefundingsourcerequest",
          label: "UpdateFundingSourceRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/funding-sources/schemas/updatefundingsourcesrequest",
          label: "UpdateFundingSourcesRequest",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
