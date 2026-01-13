import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/model-issues/model-issues-api",
    },
    {
      type: "category",
      label: "Associations",
      link: {
        type: "doc",
        id: "api/model-issues/model-issues-associations",
      },
      items: [
        {
          type: "doc",
          id: "api/model-issues/search-model-issues",
          label: "Search model issues",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/model-issues/add-issue-to-models",
          label: "Add issues to models",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/model-issues/remove-issue-from-model",
          label: "Remove issue from model",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/model-issues/remove-issues-from-models",
          label: "Remove issues from models (bulk)",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Inheritance",
      link: {
        type: "doc",
        id: "api/model-issues/model-issues-inheritance",
      },
      items: [
        {
          type: "doc",
          id: "api/model-issues/update-model-issues-to-match-category",
          label: "Update model to match category issues",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/model-issues/bulk-update-model-issues-to-match-category",
          label: "Bulk update models to match category issues",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Integrations",
      link: {
        type: "doc",
        id: "api/model-issues/model-issues-integrations",
      },
      items: [
        {
          type: "doc",
          id: "api/model-issues/link-model-issue-to-app",
          label: "Link model issue to app",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/model-issues/unlink-model-issue-from-app",
          label: "Unlink model issue from app",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/model-issues/set-app-model-issue-name-override",
          label: "Set app model issue name override",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Searching",
      link: {
        type: "doc",
        id: "api/model-issues/model-issues-searching",
      },
      items: [
        {
          type: "doc",
          id: "api/model-issues/get-issues-for-model",
          label: "Get issues for model",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/model-issues/get-issues-for-models",
          label: "Get issues for models",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/model-issues/get-issues-for-model-category",
          label: "Get issues for model category",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/model-issues/get-issues-for-model-categories",
          label: "Get issues for model categories",
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
          id: "api/model-issues/schemas/actionresponse",
          label: "ActionResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/model-issues/schemas/appmodelissue",
          label: "AppModelIssue",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/model-issues/schemas/getmodelissuesrequest",
          label: "GetModelIssuesRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/model-issues/schemas/issue",
          label: "Issue",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/model-issues/schemas/issuelistresponse",
          label: "IssueListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/model-issues/schemas/itemdeleteresponse",
          label: "ItemDeleteResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/model-issues/schemas/listgetresponse",
          label: "ListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/model-issues/schemas/modelissue",
          label: "ModelIssue",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/model-issues/schemas/modelissuearrayrequest",
          label: "ModelIssueArrayRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/model-issues/schemas/modelissuelistresponse",
          label: "ModelIssueListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/model-issues/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/model-issues/schemas/setappmodelissuenamerequest",
          label: "SetAppModelIssueNameRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/model-issues/schemas/softvalidationerror",
          label: "SoftValidationError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/model-issues/schemas/uuidlist",
          label: "UuidList",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
