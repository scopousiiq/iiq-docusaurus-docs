import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/files/files-api",
    },
    {
      type: "category",
      label: "Processing",
      link: {
        type: "doc",
        id: "api/files/files-processing",
      },
      items: [
        {
          type: "doc",
          id: "api/files/parse-barcode",
          label: "Parse barcode from image",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/files/convert-to-excel",
          label: "Convert data to Excel file",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/files/parse-file-as-excel",
          label: "Parse Excel file content",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/files/parse-excel-column-unique-values",
          label: "Get unique values from Excel column",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Upload",
      link: {
        type: "doc",
        id: "api/files/files-upload",
      },
      items: [
        {
          type: "doc",
          id: "api/files/upload-file",
          label: "Upload a file",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/files/upload-file-base-64",
          label: "Upload a file as Base64",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/files/upload-file-return-url",
          label: "Upload file and return public URL",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/files/get-file-attachment-content-types",
          label: "Get allowed file content types",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Download",
      link: {
        type: "doc",
        id: "api/files/files-download",
      },
      items: [
        {
          type: "doc",
          id: "api/files/get-file-details",
          label: "Get file details",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/files/download-file",
          label: "Download a file",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/files/get-file-inline",
          label: "View file inline",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/files/get-excel-file",
          label: "Download temporary Excel file",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/files/get-file-base-64",
          label: "Get file content as Base64",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/files/get-files-for-entity",
          label: "Get files for an entity",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Managing",
      link: {
        type: "doc",
        id: "api/files/files-managing",
      },
      items: [
        {
          type: "doc",
          id: "api/files/delete-file",
          label: "Delete a file",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/files/add-file-to-entity",
          label: "Link file to entity",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/files/remove-file-from-entity",
          label: "Unlink file from entity",
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
          id: "api/files/schemas/actionresponse",
          label: "ActionResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/barcodeformats",
          label: "BarcodeFormats",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/barcoderesult",
          label: "BarcodeResult",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/barcoderesultresponse",
          label: "BarcodeResultResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/base-64-file",
          label: "Base64File",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/base-64-fileresponse",
          label: "Base64FileResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/base-64-fileuploadrequest",
          label: "Base64FileUploadRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/downloadfilefilesbyfileidresponse-200-applicationoctetstream",
          label: "DownloadFileFilesByFileIdResponse200ApplicationOctetStream",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/errorresponse",
          label: "ErrorResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/excelcolumnvaluesresponse",
          label: "ExcelColumnValuesResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/excelconversionrequest",
          label: "ExcelConversionRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/excelconversionrequestcolumn",
          label: "ExcelConversionRequestColumn",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/excelconversionrequestrow",
          label: "ExcelConversionRequestRow",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/excelconversionurlresponse",
          label: "ExcelConversionUrlResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/excelfile",
          label: "ExcelFile",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/excelfileresponse",
          label: "ExcelFileResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/excelsheet",
          label: "ExcelSheet",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/file",
          label: "File",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/filecontenttype",
          label: "FileContentType",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/filecontenttypelistresponse",
          label: "FileContentTypeListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/filegetresponse",
          label: "FileGetResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/filelistresponse",
          label: "FileListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/filetype",
          label: "FileType",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/fileuploadresponse",
          label: "FileUploadResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/forbiddenerror",
          label: "ForbiddenError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/importcolumnlegacy",
          label: "ImportColumnLegacy",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/importfile",
          label: "ImportFile",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/itemdeleteresponse",
          label: "ItemDeleteResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/notfounderror",
          label: "NotFoundError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/softvalidationerror",
          label: "SoftValidationError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/unauthorizederror",
          label: "UnauthorizedError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/uploadfilefilesrequestmultipartformdata",
          label: "UploadFileFilesRequestMultipartFormData",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/files/schemas/validationerror",
          label: "ValidationError",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
