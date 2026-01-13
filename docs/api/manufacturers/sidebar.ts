import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/manufacturers/manufacturers-api",
    },
    {
      type: "category",
      label: "Bulk",
      link: {
        type: "doc",
        id: "api/manufacturers/manufacturers-bulk",
      },
      items: [
        {
          type: "doc",
          id: "api/manufacturers/bulk-delete-manufacturers",
          label: "Bulk delete manufacturers",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Details",
      link: {
        type: "doc",
        id: "api/manufacturers/manufacturers-details",
      },
      items: [
        {
          type: "doc",
          id: "api/manufacturers/get-manufacturer-by-id",
          label: "Get manufacturer by ID",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Managing",
      link: {
        type: "doc",
        id: "api/manufacturers/manufacturers-managing",
      },
      items: [
        {
          type: "doc",
          id: "api/manufacturers/update-manufacturer",
          label: "Update manufacturer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/manufacturers/delete-manufacturer",
          label: "Delete manufacturer",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/manufacturers/create-manufacturer",
          label: "Create manufacturer",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Listing",
      link: {
        type: "doc",
        id: "api/manufacturers/manufacturers-listing",
      },
      items: [
        {
          type: "doc",
          id: "api/manufacturers/get-manufacturers",
          label: "List manufacturers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manufacturers/search-manufacturers",
          label: "Search manufacturers",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/manufacturers/get-global-manufacturers",
          label: "List global manufacturers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/manufacturers/search-global-manufacturers",
          label: "Search global manufacturers",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Site Visibility",
      link: {
        type: "doc",
        id: "api/manufacturers/manufacturers-site-visibility",
      },
      items: [
        {
          type: "doc",
          id: "api/manufacturers/add-manufacturer-to-site",
          label: "Add manufacturer to site",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/manufacturers/remove-manufacturer-from-site",
          label: "Remove manufacturer from site",
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
          id: "api/manufacturers/schemas/actionresponse",
          label: "ActionResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/manufacturers/schemas/bulkdeletemanufacturersrequest",
          label: "BulkDeleteManufacturersRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/manufacturers/schemas/filtermatch",
          label: "FilterMatch",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/manufacturers/schemas/itemcreateresponse",
          label: "ItemCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/manufacturers/schemas/itemdeleteresponse",
          label: "ItemDeleteResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/manufacturers/schemas/itemgetresponse",
          label: "ItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/manufacturers/schemas/itemupdateresponse",
          label: "ItemUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/manufacturers/schemas/listgetresponse",
          label: "ListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/manufacturers/schemas/manufacturer",
          label: "Manufacturer",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/manufacturers/schemas/manufacturerscope",
          label: "ManufacturerScope",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/manufacturers/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/manufacturers/schemas/softvalidationerror",
          label: "SoftValidationError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/manufacturers/schemas/updatemanufacturerrequest",
          label: "UpdateManufacturerRequest",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
