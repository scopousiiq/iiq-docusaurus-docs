import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/tags/tags-api",
    },
    {
      type: "category",
      label: "Retrieval",
      link: {
        type: "doc",
        id: "api/tags/tags-retrieval",
      },
      items: [
        {
          type: "doc",
          id: "api/tags/get-tag",
          label: "Get a tag by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/tags/get-tags-by-query",
          label: "Query tags (GET)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/tags/search-tags-by-query",
          label: "Search tags by query",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/tags/get-tags-by-ids",
          label: "Get tags by IDs",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/tags/get-tags-by-type",
          label: "Get tags by type (GET)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/tags/search-tags-by-type",
          label: "Search tags by type",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Managing",
      link: {
        type: "doc",
        id: "api/tags/tags-managing",
      },
      items: [
        {
          type: "doc",
          id: "api/tags/create-tag",
          label: "Create a tag",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/tags/create-tags",
          label: "Create multiple tags",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/tags/update-tag",
          label: "Update a tag",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/tags/update-tags-by-query",
          label: "Update tags by query",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/tags/update-tags-by-ids",
          label: "Update tags by IDs",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/tags/delete-tag",
          label: "Delete a tag",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/tags/delete-tags-by-query",
          label: "Delete tags by query",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/tags/delete-tags-by-ids",
          label: "Delete tags by IDs",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/tags/undelete-tag",
          label: "Restore a deleted tag",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      items: [
        {
          type: "doc",
          id: "api/tags/schemas/datafilter",
          label: "DataFilter",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/datafilteroperations",
          label: "DataFilterOperations",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/errorresponse",
          label: "ErrorResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/itemcreateresponse",
          label: "ItemCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/itemdeleteresponse",
          label: "ItemDeleteResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/itemgetresponse",
          label: "ItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/itemupdateresponse",
          label: "ItemUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/listcreateresponse",
          label: "ListCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/listdeleteresponse",
          label: "ListDeleteResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/listgetresponse",
          label: "ListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/listupdateresponse",
          label: "ListUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/softvalidationerror",
          label: "SoftValidationError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/tag",
          label: "Tag",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/tagbatchcreateresponse",
          label: "TagBatchCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/tagcreateresponse",
          label: "TagCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/tagitemresponse",
          label: "TagItemResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/taglistresponse",
          label: "TagListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/updatetagrequest",
          label: "UpdateTagRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/tags/schemas/updatetagsrequest",
          label: "UpdateTagsRequest",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
