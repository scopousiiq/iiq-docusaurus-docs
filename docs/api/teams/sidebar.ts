import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/teams/teams-api",
    },
    {
      type: "category",
      label: "Definitions",
      link: {
        type: "doc",
        id: "api/teams/teams-definitions",
      },
      items: [
        {
          type: "doc",
          id: "api/teams/list-teams",
          label: "List teams",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/teams/list-all-teams",
          label: "List all teams",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/teams/list-my-teams",
          label: "List my teams",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/teams/create-team",
          label: "Create team",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/teams/get-team",
          label: "Get team",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/teams/update-team",
          label: "Update team",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/teams/delete-team",
          label: "Delete team",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/teams/undelete-team",
          label: "Undelete team",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "Membership",
      link: {
        type: "doc",
        id: "api/teams/teams-membership",
      },
      items: [
        {
          type: "doc",
          id: "api/teams/list-team-members",
          label: "List team members",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/teams/add-team-members",
          label: "Add members to teams",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/teams/update-team-members",
          label: "Update team members",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/teams/delete-team-members",
          label: "Remove members from teams",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/teams/list-paged-team-members",
          label: "List team members (paged)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/teams/add-team-member",
          label: "Add team member",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/teams/remove-team-member",
          label: "Remove team member",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/teams/clear-team-members",
          label: "Clear team members",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Products",
      link: {
        type: "doc",
        id: "api/teams/teams-products",
      },
      items: [
        {
          type: "doc",
          id: "api/teams/list-team-products",
          label: "List team products",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/teams/list-team-product-ids",
          label: "List team product IDs",
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
          id: "api/teams/schemas/actionresponse",
          label: "ActionResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/teams/schemas/itemgetresponse",
          label: "ItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/teams/schemas/listgetresponse",
          label: "ListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/teams/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/teams/schemas/softvalidationerror",
          label: "SoftValidationError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/teams/schemas/team",
          label: "Team",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/teams/schemas/teamdetailresponse",
          label: "TeamDetailResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/teams/schemas/teamlistresponse",
          label: "TeamListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/teams/schemas/teammember",
          label: "TeamMember",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/teams/schemas/teammemberlistrequest",
          label: "TeamMemberListRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/teams/schemas/teammembersresponse",
          label: "TeamMembersResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/teams/schemas/teamproductlistresponse",
          label: "TeamProductListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/teams/schemas/teamrequest",
          label: "TeamRequest",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
