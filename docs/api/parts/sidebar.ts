import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/parts/parts-api",
    },
    {
      type: "category",
      label: "Importing",
      link: {
        type: "doc",
        id: "api/parts/parts-importing",
      },
      items: [
        {
          type: "doc",
          id: "api/parts/schedule-part-import",
          label: "Schedule part import",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Parts",
      link: {
        type: "doc",
        id: "api/parts/parts-parts",
      },
      items: [
        {
          type: "doc",
          id: "api/parts/get-part-by-id",
          label: "Get part by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/parts/update-part",
          label: "Update part",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/parts/delete-part",
          label: "Delete part",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/parts/list-parts",
          label: "List parts",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/parts/list-facilities-parts",
          label: "List facilities parts",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/parts/create-part",
          label: "Create part",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Purchase Orders",
      link: {
        type: "doc",
        id: "api/parts/parts-purchase-orders",
      },
      items: [
        {
          type: "doc",
          id: "api/parts/get-purchase-order-by-id",
          label: "Get purchase order by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/parts/update-purchase-order",
          label: "Update purchase order",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/parts/delete-purchase-order",
          label: "Delete purchase order",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/parts/list-purchase-orders",
          label: "List purchase orders",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/parts/create-purchase-order",
          label: "Create purchase order",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Searching",
      link: {
        type: "doc",
        id: "api/parts/parts-searching",
      },
      items: [
        {
          type: "doc",
          id: "api/parts/search-parts",
          label: "Search parts",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Suppliers",
      link: {
        type: "doc",
        id: "api/parts/parts-suppliers",
      },
      items: [
        {
          type: "doc",
          id: "api/parts/get-part-supplier-by-id",
          label: "Get part supplier by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/parts/update-part-supplier",
          label: "Update part supplier",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/parts/delete-part-supplier",
          label: "Delete part supplier",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/parts/list-part-suppliers",
          label: "List part suppliers",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/parts/create-part-supplier",
          label: "Create part supplier",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Usage",
      link: {
        type: "doc",
        id: "api/parts/parts-usage",
      },
      items: [
        {
          type: "doc",
          id: "api/parts/get-parts-usage",
          label: "Get parts usage",
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
          id: "api/parts/schemas/address",
          label: "Address",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/fundingsource",
          label: "FundingSource",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/getticketsrequest",
          label: "GetTicketsRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/itemdeleteresponse",
          label: "ItemDeleteResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/pagingresponse",
          label: "PagingResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/part",
          label: "Part",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/partimportconfiguration",
          label: "PartImportConfiguration",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/partimportfieldmap",
          label: "PartImportFieldMap",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/partimportjobresponse",
          label: "PartImportJobResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/partimportmappings",
          label: "PartImportMappings",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/partimportvaluemap",
          label: "PartImportValueMap",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/partitemcreateresponse",
          label: "PartItemCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/partitemgetresponse",
          label: "PartItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/partitemupdateresponse",
          label: "PartItemUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/partlistgetresponse",
          label: "PartListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/partsupplier",
          label: "PartSupplier",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/partsupplieritemcreateresponse",
          label: "PartSupplierItemCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/partsupplieritemgetresponse",
          label: "PartSupplierItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/partsupplieritemupdateresponse",
          label: "PartSupplierItemUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/partsupplierlistgetresponse",
          label: "PartSupplierListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/partusage",
          label: "PartUsage",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/partusagelistgetresponse",
          label: "PartUsageListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/purchaseorder",
          label: "PurchaseOrder",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/purchaseorderitemcreateresponse",
          label: "PurchaseOrderItemCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/purchaseorderitemgetresponse",
          label: "PurchaseOrderItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/purchaseorderitemupdateresponse",
          label: "PurchaseOrderItemUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/purchaseorderlistgetresponse",
          label: "PurchaseOrderListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/purchaseorderstatustype",
          label: "PurchaseOrderStatusType",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/purchaseordertype",
          label: "PurchaseOrderType",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/searchpartsrequest",
          label: "SearchPartsRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/simpleuser",
          label: "SimpleUser",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/supplier",
          label: "Supplier",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/ticketsearchfacetkey",
          label: "TicketSearchFacetKey",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/ticketsearchfilter",
          label: "TicketSearchFilter",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/parts/schemas/ticketsearchrequest",
          label: "TicketSearchRequest",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
