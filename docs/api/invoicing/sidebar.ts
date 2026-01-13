import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/invoicing/invoicing-api",
    },
    {
      type: "category",
      label: "Vendors",
      link: {
        type: "doc",
        id: "api/invoicing/invoicing-vendors",
      },
      items: [
        {
          type: "doc",
          id: "api/invoicing/get-all-vendors",
          label: "Get all vendors",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/invoicing/search-vendors",
          label: "Search vendors",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/invoicing/create-vendor",
          label: "Create a new vendor",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/invoicing/get-vendor-by-id",
          label: "Get vendor by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/invoicing/update-vendor",
          label: "Update a vendor",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/invoicing/delete-vendor",
          label: "Delete a vendor",
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
          id: "api/invoicing/schemas/filtermatch",
          label: "FilterMatch",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/invoicing/schemas/getallvendorsrequest",
          label: "GetAllVendorsRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/invoicing/schemas/itemdeleteresponse",
          label: "ItemDeleteResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/invoicing/schemas/pagingoptions",
          label: "PagingOptions",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/invoicing/schemas/scopes",
          label: "Scopes",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/invoicing/schemas/sortoptions",
          label: "SortOptions",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/invoicing/schemas/vendor",
          label: "Vendor",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/invoicing/schemas/vendoraddress",
          label: "VendorAddress",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/invoicing/schemas/vendoritemcreateresponse",
          label: "VendorItemCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/invoicing/schemas/vendoritemgetresponse",
          label: "VendorItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/invoicing/schemas/vendoritemupdateresponse",
          label: "VendorItemUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/invoicing/schemas/vendorlistgetresponse",
          label: "VendorListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/invoicing/schemas/vendorutilitytype",
          label: "VendorUtilityType",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
