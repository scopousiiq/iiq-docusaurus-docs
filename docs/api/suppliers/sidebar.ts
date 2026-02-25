import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/suppliers/suppliers-api",
    },
    {
      type: "category",
      label: "Searching",
      link: {
        type: "doc",
        id: "api/suppliers/suppliers-searching",
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
      ],
    },
    {
      type: "category",
      label: "Managing",
      link: {
        type: "doc",
        id: "api/suppliers/suppliers-managing",
      },
      items: [
        {
          type: "doc",
          id: "api/suppliers/create-supplier",
          label: "Create supplier",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/suppliers/create-suppliers-batch",
          label: "Create suppliers (batch)",
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
      label: "Deleting",
      link: {
        type: "doc",
        id: "api/suppliers/suppliers-deleting",
      },
      items: [
        {
          type: "doc",
          id: "api/suppliers/delete-supplier",
          label: "Delete supplier",
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
          id: "api/suppliers/schemas/listcreateresponse",
          label: "ListCreateResponse",
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
          id: "api/suppliers/schemas/supplierlistcreateresponse",
          label: "SupplierListCreateResponse",
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
