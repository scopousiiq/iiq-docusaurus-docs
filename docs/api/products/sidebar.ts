import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/products/products-api",
    },
    {
      type: "category",
      label: "Listing",
      link: {
        type: "doc",
        id: "api/products/products-listing",
      },
      items: [
        {
          type: "doc",
          id: "api/products/list-products",
          label: "List all products",
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
          id: "api/products/schemas/listgetresponse",
          label: "ListGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/products/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/products/schemas/product",
          label: "Product",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/products/schemas/productlistresponse",
          label: "ProductListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/products/schemas/softvalidationerror",
          label: "SoftValidationError",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
