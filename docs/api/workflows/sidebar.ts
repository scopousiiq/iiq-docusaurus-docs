import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/workflows/workflows-api",
    },
    {
      type: "category",
      label: "Configuration",
      link: {
        type: "doc",
        id: "api/workflows/workflows-configuration",
      },
      items: [
        {
          type: "doc",
          id: "api/workflows/get-workflow-approval-types",
          label: "List approval types",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/workflows/get-workflow-action-types",
          label: "List action types",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/workflows/get-workflow-linked-issues",
          label: "List issues linked to workflow",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/workflows/get-workflow-custom-fields",
          label: "List custom fields for workflow",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Definitions",
      link: {
        type: "doc",
        id: "api/workflows/workflows-definitions",
      },
      items: [
        {
          type: "doc",
          id: "api/workflows/list-workflows",
          label: "List workflows",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/workflows/list-workflows-all-products",
          label: "List workflows across all products",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/workflows/list-site-product-workflows",
          label: "List site workflows across all products",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/workflows/list-workflows-by-site-and-product",
          label: "List workflows by site and product",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/workflows/get-workflow",
          label: "Get workflow by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/workflows/update-workflow",
          label: "Update workflow",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/workflows/delete-workflow",
          label: "Delete workflow",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/workflows/create-workflow",
          label: "Create workflow",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/workflows/copy-workflow",
          label: "Copy workflow",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Steps",
      link: {
        type: "doc",
        id: "api/workflows/workflows-steps",
      },
      items: [
        {
          type: "doc",
          id: "api/workflows/get-workflow-steps-by-workflow",
          label: "List steps for a workflow",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/workflows/get-workflow-steps",
          label: "List all workflow steps",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/workflows/create-workflow-step",
          label: "Create workflow step",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/workflows/get-workflow-step",
          label: "Get workflow step by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/workflows/update-workflow-step",
          label: "Update workflow step",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/workflows/delete-workflow-step",
          label: "Delete workflow step",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/workflows/get-workflow-actions",
          label: "List actions for a step",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Transitions",
      link: {
        type: "doc",
        id: "api/workflows/workflows-transitions",
      },
      items: [
        {
          type: "doc",
          id: "api/workflows/get-workflow-next-steps",
          label: "List next-step mappings",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/workflows/get-workflow-next-steps-as-steps",
          label: "List next steps as full step objects",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      items: [
        {
          type: "doc",
          id: "api/workflows/schemas/appmodelissue",
          label: "AppModelIssue",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/customfield",
          label: "CustomField",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/errorresponse",
          label: "ErrorResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/issue",
          label: "Issue",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/modelissue",
          label: "ModelIssue",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/siteproductworkflowsummary",
          label: "SiteProductWorkflowSummary",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/siteproductworkflowsresponse",
          label: "SiteProductWorkflowsResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflow",
          label: "Workflow",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowactiontype",
          label: "WorkflowActionType",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowactiontypelistresponse",
          label: "WorkflowActionTypeListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowapprovaltype",
          label: "WorkflowApprovalType",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowapprovaltypelistresponse",
          label: "WorkflowApprovalTypeListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowcreateresponse",
          label: "WorkflowCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowcustomfieldlistresponse",
          label: "WorkflowCustomFieldListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowdeleteresponse",
          label: "WorkflowDeleteResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowissuelistresponse",
          label: "WorkflowIssueListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowitemresponse",
          label: "WorkflowItemResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowlistresponse",
          label: "WorkflowListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflownextstep",
          label: "WorkflowNextStep",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflownextsteplistresponse",
          label: "WorkflowNextStepListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowstepaction",
          label: "WorkflowStepAction",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowstepactionlistresponse",
          label: "WorkflowStepActionListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowstepcreateresponse",
          label: "WorkflowStepCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowstepdeleteresponse",
          label: "WorkflowStepDeleteResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowstepfull",
          label: "WorkflowStepFull",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowstepitemresponse",
          label: "WorkflowStepItemResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowsteplistresponse",
          label: "WorkflowStepListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowstepsummary",
          label: "WorkflowStepSummary",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowstepupdateresponse",
          label: "WorkflowStepUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowstepsresponse",
          label: "WorkflowStepsResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/workflows/schemas/workflowupdateresponse",
          label: "WorkflowUpdateResponse",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
