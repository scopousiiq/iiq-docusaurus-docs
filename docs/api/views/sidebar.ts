import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/views/views-api",
    },
    {
      type: "category",
      label: "Views",
      link: {
        type: "doc",
        id: "api/views/views",
      },
      items: [
        {
          type: "doc",
          id: "api/views/get-user-view",
          label: "Get a specific user view",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/views/delete-user-by-id",
          label: "Delete a user view",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Filters",
      link: {
        type: "doc",
        id: "api/views/views-filters",
      },
      items: [
        {
          type: "doc",
          id: "api/views/get-view-filters",
          label: "Get view filters",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Listing",
      link: {
        type: "doc",
        id: "api/views/views-listing",
      },
      items: [
        {
          type: "doc",
          id: "api/views/list-site-views",
          label: "List site views",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/views/get-view-definition",
          label: "Get saved view definition",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/views/get-site-view",
          label: "Get site view",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/views/list-views-all-products",
          label: "List views across all products",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Managing",
      link: {
        type: "doc",
        id: "api/views/views-managing",
      },
      items: [
        {
          type: "doc",
          id: "api/views/update-site-view",
          label: "Update site view",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/views/delete-site-view",
          label: "Delete site view",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/views/create-site-view",
          label: "Create site view",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/views/create-view",
          label: "Create view",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Schedules",
      link: {
        type: "doc",
        id: "api/views/views-schedules",
      },
      items: [
        {
          type: "doc",
          id: "api/views/update-view-schedules",
          label: "Update view schedules",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Sharing",
      link: {
        type: "doc",
        id: "api/views/views-sharing",
      },
      items: [
        {
          type: "doc",
          id: "api/views/list-view-users",
          label: "List view users",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/views/get-view-user",
          label: "Get view user share",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/views/update-view-user",
          label: "Update view user share",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/views/delete-view-user",
          label: "Delete view user share",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/views/create-view-user",
          label: "Create view user share",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/views/update-view-user-response",
          label: "Update view user response",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/views/list-view-teams",
          label: "List view teams",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/views/get-view-team",
          label: "Get view team share",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/views/update-view-team",
          label: "Update view team share",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/views/delete-view-team",
          label: "Delete view team share",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/views/create-view-team",
          label: "Create view team share",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/views/update-view-team-response",
          label: "Update view team response",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Sorting",
      link: {
        type: "doc",
        id: "api/views/views-sorting",
      },
      items: [
        {
          type: "doc",
          id: "api/views/update-site-view-sort",
          label: "Update site view sort",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/views/update-view-sort",
          label: "Update view sort",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Utilities",
      link: {
        type: "doc",
        id: "api/views/views-utilities",
      },
      items: [
        {
          type: "doc",
          id: "api/views/update-view-counts",
          label: "Update view counts",
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
          id: "api/views/schemas/actionresponse",
          label: "ActionResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/filtermatch",
          label: "FilterMatch",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/forbiddenerror",
          label: "ForbiddenError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/internalservererror",
          label: "InternalServerError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/itemcreateresponse",
          label: "ItemCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/itemdeleteresponse",
          label: "ItemDeleteResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/itemgetresponse",
          label: "ItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/itemupdateresponse",
          label: "ItemUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/listgetresponse",
          label: "ListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/notfounderror",
          label: "NotFoundError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/ratelimiterror",
          label: "RateLimitError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/softvalidationerror",
          label: "SoftValidationError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/tickettemplaterecurringschedule",
          label: "TicketTemplateRecurringSchedule",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/unauthorizederror",
          label: "UnauthorizedError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/userview",
          label: "UserView",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewcolumn",
          label: "ViewColumn",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewcolumnoption",
          label: "ViewColumnOption",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewdefinition",
          label: "ViewDefinition",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewdefinitionresponse",
          label: "ViewDefinitionResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewfiltermatchresponse",
          label: "ViewFilterMatchResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewfiltervalue",
          label: "ViewFilterValue",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewitemcreateresponse",
          label: "ViewItemCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewitemgetresponse",
          label: "ViewItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewitemupdateresponse",
          label: "ViewItemUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewlistresponse",
          label: "ViewListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewschedule",
          label: "ViewSchedule",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewshare",
          label: "ViewShare",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewshareitemcreateresponse",
          label: "ViewShareItemCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewshareitemgetresponse",
          label: "ViewShareItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewshareitemupdateresponse",
          label: "ViewShareItemUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewsharelistresponse",
          label: "ViewShareListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewsharesummary",
          label: "ViewShareSummary",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewsort",
          label: "ViewSort",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/views/schemas/viewtab",
          label: "ViewTab",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
