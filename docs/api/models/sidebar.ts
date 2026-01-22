import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/models/models-api",
    },
    {
      type: "category",
      label: "App Integration",
      link: {
        type: "doc",
        id: "api/models/models-app-integration",
      },
      items: [
        {
          type: "doc",
          id: "api/models/get-models-for-app-get",
          label: "Get models for app",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/models/get-models-for-app",
          label: "Search models for app",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/models/link-model-to-app",
          label: "Link model to app",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/models/unlink-model-from-app",
          label: "Unlink model from app",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/models/get-app-model-details",
          label: "Get app model details",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/models/update-app-model-details",
          label: "Update app model details",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Bulk",
      link: {
        type: "doc",
        id: "api/models/models-bulk",
      },
      items: [
        {
          type: "doc",
          id: "api/models/bulk-delete-models",
          label: "Bulk delete models",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Category Access",
      link: {
        type: "doc",
        id: "api/models/models-category-access",
      },
      items: [
        {
          type: "doc",
          id: "api/models/get-models-by-category-get",
          label: "Get models by category",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/models/get-models-by-category",
          label: "Search models by category",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/models/get-models-by-category-for-my-role-get",
          label: "Get models by category for current user's role",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/models/get-models-by-category-for-my-role",
          label: "Search models by category for current user's role",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/models/get-models-by-category-for-role-get",
          label: "Get models by category for specific role",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/models/get-models-by-category-for-role",
          label: "Search models by category for specific role",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Details",
      link: {
        type: "doc",
        id: "api/models/models-details",
      },
      items: [
        {
          type: "doc",
          id: "api/models/get-model-by-id",
          label: "Get model by ID",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Managing",
      link: {
        type: "doc",
        id: "api/models/models-managing",
      },
      items: [
        {
          type: "doc",
          id: "api/models/update-model",
          label: "Update model",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/models/delete-model",
          label: "Delete model",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/models/create-model",
          label: "Create model",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Manufacturer Access",
      link: {
        type: "doc",
        id: "api/models/models-manufacturer-access",
      },
      items: [
        {
          type: "doc",
          id: "api/models/get-models-by-manufacturer-get",
          label: "Get models by manufacturer",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/models/get-models-by-manufacturer",
          label: "Search models by manufacturer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/models/get-global-models-by-manufacturer-get",
          label: "Get global models by manufacturer",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/models/get-global-models-by-manufacturer",
          label: "Search global models by manufacturer",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Role Access",
      link: {
        type: "doc",
        id: "api/models/models-role-access",
      },
      items: [
        {
          type: "doc",
          id: "api/models/get-models-for-my-role-get",
          label: "Get models for current user's role",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/models/get-models-for-my-role",
          label: "Search models for current user's role",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/models/get-models-for-role-get",
          label: "Get models for specific role",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/models/get-models-for-role",
          label: "Search models for specific role",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Searching",
      link: {
        type: "doc",
        id: "api/models/models-searching",
      },
      items: [
        {
          type: "doc",
          id: "api/models/list-models",
          label: "List models",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/models/search-models",
          label: "Search models",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Site Linking",
      link: {
        type: "doc",
        id: "api/models/models-site-linking",
      },
      items: [
        {
          type: "doc",
          id: "api/models/update-model-site-linking",
          label: "Update model-to-site linking (bulk)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/models/set-model-site-visibility",
          label: "Set model site visibility",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/models/remove-model-from-site",
          label: "Remove model from site",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/models/bulk-add-models-to-site",
          label: "Bulk add models to site",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/models/get-models-available-to-site",
          label: "Get models available to site",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/models/get-models-available-to-site-v-2",
          label: "Get models available to site (V2)",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Statistics",
      link: {
        type: "doc",
        id: "api/models/models-statistics",
      },
      items: [
        {
          type: "doc",
          id: "api/models/get-model-counts-by-category-get",
          label: "Get model counts by category",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/models/get-model-counts-by-category",
          label: "Get model counts by category with filters",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/models/get-model-counts",
          label: "Get model counts",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/models/get-popular-models",
          label: "Get popular models",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Utilities",
      link: {
        type: "doc",
        id: "api/models/models-utilities",
      },
      items: [
        {
          type: "doc",
          id: "api/models/get-model-mappings",
          label: "Get model mappings",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Visibility",
      link: {
        type: "doc",
        id: "api/models/models-visibility",
      },
      items: [
        {
          type: "doc",
          id: "api/models/list-all-models-get",
          label: "List all models (no visibility filter)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/models/list-all-models",
          label: "Search all models (no visibility filter)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/models/list-all-global-models-get",
          label: "List all global-scoped models",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/models/list-all-global-models",
          label: "Search all global-scoped models",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/models/list-all-site-models-get",
          label: "List all site-scoped models",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/models/list-all-site-models",
          label: "Search all site-scoped models",
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
          id: "api/models/schemas/actionresponse",
          label: "ActionResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/appmodel",
          label: "AppModel",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/appmodelitemresponse",
          label: "AppModelItemResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/bulkdeletemodelsrequest",
          label: "BulkDeleteModelsRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/category",
          label: "Category",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/customfieldeditortypeid",
          label: "CustomFieldEditorTypeId",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/customfieldtypedetail",
          label: "CustomFieldTypeDetail",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/entitysiteoption",
          label: "EntitySiteOption",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/getavailablemodelsrequest",
          label: "GetAvailableModelsRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/getmodelcountrequest",
          label: "GetModelCountRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/guiditemresponse",
          label: "GuidItemResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/guidupdateresponse",
          label: "GuidUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/itemcreateresponse",
          label: "ItemCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/itemdeleteresponse",
          label: "ItemDeleteResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/itemgetresponse",
          label: "ItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/itemupdateresponse",
          label: "ItemUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/listgetresponse",
          label: "ListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/manufacturer",
          label: "Manufacturer",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/manufacturerscope",
          label: "ManufacturerScope",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/model",
          label: "Model",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/modelcount",
          label: "ModelCount",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/modelcountlistresponse",
          label: "ModelCountListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/modelcreateresponse",
          label: "ModelCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/modelitemresponse",
          label: "ModelItemResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/modellistresponse",
          label: "ModelListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/modelmapping",
          label: "ModelMapping",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/modelmappinglistresponse",
          label: "ModelMappingListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/modelroles",
          label: "ModelRoles",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/modelroleslistresponse",
          label: "ModelRolesListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/modelsearchfilter",
          label: "ModelSearchFilter",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/modelsearchrequest",
          label: "ModelSearchRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/popularmodel",
          label: "PopularModel",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/popularmodellistresponse",
          label: "PopularModelListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/softvalidationerror",
          label: "SoftValidationError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/models/schemas/updatemodelrequest",
          label: "UpdateModelRequest",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
