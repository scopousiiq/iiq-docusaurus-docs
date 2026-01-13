import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/surveys/surveys-api",
    },
    {
      type: "category",
      label: "Lifecycle",
      link: {
        type: "doc",
        id: "api/surveys/surveys-lifecycle",
      },
      items: [
        {
          type: "doc",
          id: "api/surveys/activate-survey",
          label: "Activate a survey",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/surveys/deactivate-survey",
          label: "Deactivate a survey",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Management",
      link: {
        type: "doc",
        id: "api/surveys/surveys-management",
      },
      items: [
        {
          type: "doc",
          id: "api/surveys/get-surveys",
          label: "List all surveys",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/surveys/get-survey",
          label: "Get survey details",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/surveys/update-survey",
          label: "Update a survey",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/surveys/delete-survey",
          label: "Delete a survey",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/surveys/create-survey",
          label: "Create a new survey",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/surveys/get-survey-rules",
          label: "Get rules linked to a survey",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Responses",
      link: {
        type: "doc",
        id: "api/surveys/surveys-responses",
      },
      items: [
        {
          type: "doc",
          id: "api/surveys/get-survey-responses",
          label: "Get responses for a survey",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/surveys/get-survey-response-for-ticket",
          label: "Get survey response for a ticket",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/surveys/save-survey-response-for-ticket",
          label: "Save survey response for a ticket",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/surveys/dismiss-survey-for-ticket",
          label: "Dismiss survey for a ticket",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/surveys/get-pending-surveys",
          label: "Get pending surveys for user",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/surveys/get-my-pending-surveys",
          label: "Get my pending surveys",
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
          id: "api/surveys/schemas/actionresponse",
          label: "ActionResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/surveys/schemas/pagingmetadata",
          label: "PagingMetadata",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/surveys/schemas/softvalidationerror",
          label: "SoftValidationError",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/surveys/schemas/survey",
          label: "Survey",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/surveys/schemas/surveycreateresponse",
          label: "SurveyCreateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/surveys/schemas/surveyitemresponse",
          label: "SurveyItemResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/surveys/schemas/surveylistresponse",
          label: "SurveyListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/surveys/schemas/surveyquestion",
          label: "SurveyQuestion",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/surveys/schemas/surveyresponse",
          label: "SurveyResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/surveys/schemas/surveyresponseitemresponse",
          label: "SurveyResponseItemResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/surveys/schemas/surveyresponselistresponse",
          label: "SurveyResponseListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/surveys/schemas/surveyresponseupdateresponse",
          label: "SurveyResponseUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/surveys/schemas/surveyrule",
          label: "SurveyRule",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/surveys/schemas/surveyruleslistresponse",
          label: "SurveyRulesListResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/surveys/schemas/surveyupdateresponse",
          label: "SurveyUpdateResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/surveys/schemas/ticketsurvey",
          label: "TicketSurvey",
          className: "schema",
        },
        {
          type: "doc",
          id: "api/surveys/schemas/ticketsurveylistresponse",
          label: "TicketSurveyListResponse",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
