import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/suppliers/suppliers-api",
    },
    {
      type: "category",
      label: "Suppliers",
      link: {
        type: "doc",
        id: "api/suppliers/suppliers-suppliers",
      },
      items: [
        {
          type: "doc",
          id: "api/suppliers/get-supplier-by-id",
          label: "Get supplier by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/suppliers/get-supplier-by-id-post",
          label: "Get supplier by ID (POST)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/suppliers/delete-supplier",
          label: "Delete supplier",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/suppliers/create-supplier",
          label: "Create supplier",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/suppliers/update-supplier",
          label: "Update supplier",
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
          id: "api/suppliers/schemas/address",
          label: "Address",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/suppliers/schemas/itemdeleteresponse",
          label: "ItemDeleteResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/suppliers/schemas/supplierfull",
          label: "SupplierFull",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/suppliers/schemas/supplieritemcreateresponse",
          label: "SupplierItemCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/suppliers/schemas/supplieritemgetresponse",
          label: "SupplierItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/suppliers/schemas/supplieritemupdateresponse",
          label: "SupplierItemUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/suppliers/schemas/suppliertype",
          label: "SupplierType",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/suppliers/schemas/updatesupplierrequest",
          label: "UpdateSupplierRequest",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
