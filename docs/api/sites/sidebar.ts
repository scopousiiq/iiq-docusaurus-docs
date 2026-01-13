import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/sites/sites-api",
    },
    {
      type: "category",
      label: "Configuration",
      link: {
        type: "doc",
        id: "api/sites/sites-configuration",
      },
      items: [
        {
          type: "doc",
          id: "api/sites/list-site-status-types",
          label: "Types",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/sites/get-site-status-type-by-id",
          label: "Get site status type by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/sites/list-file-types",
          label: "List file types",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/sites/list-deployments",
          label: "List deployment history",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/sites/health-check",
          label: "Health check",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Details",
      link: {
        type: "doc",
        id: "api/sites/sites-details",
      },
      items: [
        {
          type: "doc",
          id: "api/sites/get-site-by-url",
          label: "Get site configuration",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/sites/get-my-site-settings",
          label: "Get current site settings",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/sites/get-site-settings-by-id",
          label: "Get site settings by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/sites/get-site-theme",
          label: "Get site theme CSS",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Roles",
      link: {
        type: "doc",
        id: "api/sites/sites-roles",
      },
      items: [
        {
          type: "doc",
          id: "api/sites/list-roles",
          label: "List roles",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/sites/list-roles-filtered",
          label: "List roles with filters",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/sites/list-roles-with-permission-policies",
          label: "List roles with permission policies",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/sites/get-role-by-id",
          label: "Get role by ID",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Utilities",
      link: {
        type: "doc",
        id: "api/sites/sites-utilities",
      },
      items: [
        {
          type: "doc",
          id: "api/sites/health-check-head",
          label: "Health check (HEAD)",
          className: "api-method head",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      items: [
        {
          type: "doc",
          id: "api/sites/schemas/actionresponse",
          label: "ActionResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/datafilter",
          label: "DataFilter",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/datafilteroperations",
          label: "DataFilterOperations",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/errorresponse",
          label: "ErrorResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/genericobject",
          label: "GenericObject",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/getsitethemesitesthemeresponse-200-textcss",
          label: "GetSiteThemeSitesThemeResponse200TextCss",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/internalservererror",
          label: "InternalServerError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/itemgetresponse",
          label: "ItemGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/listgetresponse",
          label: "ListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/notfounderror",
          label: "NotFoundError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/pagingoptions",
          label: "PagingOptions",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/ratelimiterror",
          label: "RateLimitError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/requestoptions",
          label: "RequestOptions",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/siteapphook",
          label: "SiteAppHook",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/siteappsconfiguration",
          label: "SiteAppsConfiguration",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/siteconfigurationsetting",
          label: "SiteConfigurationSetting",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/sitedetails",
          label: "SiteDetails",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/sitedetailsresponse",
          label: "SiteDetailsResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/siteinstalledapp",
          label: "SiteInstalledApp",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/sitelicensedproduct",
          label: "SiteLicensedProduct",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/sitesettings",
          label: "SiteSettings",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/sitestatus",
          label: "SiteStatus",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/softvalidationerror",
          label: "SoftValidationError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/sortoptions",
          label: "SortOptions",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/ticketprioritylevel",
          label: "TicketPriorityLevel",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/sites/schemas/unauthorizederror",
          label: "UnauthorizedError",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
