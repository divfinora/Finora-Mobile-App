import { baseApi } from "../../api/baseApi";

export const visitorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // =====================================================
    // VISITOR EMPLOYEE LOGIN
    // POST /auth/v1/employee/login
    // =====================================================
    visitorLogin: builder.mutation({
      query: (body) => ({
        url: "/auth/v1/employee/login",
        method: "POST",
        body,
      }),
    }),

    // =====================================================
    // VISITOR DASHBOARD
    // GET /applyloan/dashboard
    // =====================================================
    getVisitorDashboard: builder.query({
      query: () => ({
        url: "/applyloan/dashboard",
        method: "GET",
      }),
      providesTags: ["VisitorDashboard"],
    }),

    // =====================================================
    // MY APPLICATIONS
    // GET /applyloan/my-applications
    // =====================================================
    getVisitorApplications: builder.query({
      query: () => ({
        url: "/applyloan/my-applications",
        method: "GET",
      }),
      providesTags: ["VisitorApplications"],
    }),

    // =====================================================
    // APPLICATION DETAILS / RESUME
    // GET /applyloan/my-applications/:loanId
    // =====================================================
    getVisitorApplicationDetails: builder.query({
      query: (loanId) => ({
        url: `/applyloan/my-applications/${loanId}`,
        method: "GET",
      }),
      providesTags: (result, error, loanId) => [
        {
          type: "VisitorApplicationDetails",
          id: loanId,
        },
      ],
    }),

    // =====================================================
    // LOCATION
    // PATCH /applyloan/:loanId/location
    // =====================================================
    saveVisitorLocation: builder.mutation({
      query: ({ loanId, latitude, longitude }) => ({
        url: `/applyloan/${loanId}/location`,
        method: "PATCH",
        body: {
          latitude,
          longitude,
        },
      }),
    }),

    // =====================================================
    // INVESTIGATION
    // PATCH /applyloan/:loanId/investigation
    // =====================================================
    saveVisitorInvestigation: builder.mutation({
      query: ({ loanId, ...body }) => ({
        url: `/applyloan/${loanId}/investigation`,
        method: "PATCH",
        body,
      }),
    }),

    // =====================================================
    // PHOTO UPLOAD
    // POST /applyloan/:loanId/upload-photo
    // =====================================================
    uploadVisitorPhoto: builder.mutation({
      query: ({ loanId, formData }) => ({
        url: `/applyloan/${loanId}/upload-photo`,
        method: "POST",
        body: formData,
      }),
    }),

    // =====================================================
    // DOCUMENT UPLOAD
    // POST /applyloan/:loanId/upload-document
    // =====================================================
    uploadVisitorDocument: builder.mutation({
      query: ({ loanId, formData }) => ({
        url: `/applyloan/${loanId}/upload-document`,
        method: "POST",
        body: formData,
      }),
    }),

    // =====================================================
    // WITNESS
    // PATCH /applyloan/:loanId/witness
    // =====================================================
    saveVisitorWitness: builder.mutation({
      query: ({ loanId, formData }) => ({
        url: `/applyloan/${loanId}/witness`,
        method: "PATCH",
        body: formData,
      }),
    }),

    // =====================================================
    // CUSTOMER CONSENT
    // PATCH /applyloan/:loanId/customer-consent
    // =====================================================
    saveVisitorCustomerConsent: builder.mutation({
      query: ({ loanId, body }) => ({
        url: `/applyloan/${loanId}/customer-consent`,
        method: "PATCH",
        body,
      }),
    }),

    // =====================================================
    // FINAL DECLARATION
    // PATCH /applyloan/:loanId/final-declaration
    // =====================================================
    saveVisitorFinalDeclaration: builder.mutation({
      query: ({ loanId, body }) => ({
        url: `/applyloan/${loanId}/final-declaration`,
        method: "PATCH",
        body,
      }),
    }),

    // =====================================================
    // REVIEW
    // GET /applyloan/applications/:loanId/review
    // =====================================================
    getVisitorReview: builder.query({
      query: (loanId) => ({
        url: `/applyloan/applications/${loanId}/review`,
        method: "GET",
      }),
    }),

    // =====================================================
    // SUBMIT SUMMARY
    // GET /applyloan/:loanId/submit-summary
    // =====================================================
    getVisitorSubmitSummary: builder.query({
      query: (loanId) => ({
        url: `/applyloan/${loanId}/submit-summary`,
        method: "GET",
      }),
    }),

    // =====================================================
    // FINAL SUBMIT
    // PATCH /applyloan/:loanId/submit-verification
    // =====================================================
    submitVisitorVerification: builder.mutation({
      query: ({ loanId, body }) => ({
        url: `/applyloan/${loanId}/submit-verification`,
        method: "PATCH",
        body,
      }),
    }),

  }),
});

export const {
  useVisitorLoginMutation,

  useGetVisitorDashboardQuery,
  useGetVisitorApplicationsQuery,
  useGetVisitorApplicationDetailsQuery,

  useSaveVisitorLocationMutation,
  useSaveVisitorInvestigationMutation,

  useUploadVisitorPhotoMutation,
  useUploadVisitorDocumentMutation,

  useSaveVisitorWitnessMutation,
  useSaveVisitorCustomerConsentMutation,
  useSaveVisitorFinalDeclarationMutation,

  useGetVisitorReviewQuery,
  useGetVisitorSubmitSummaryQuery,

  useSubmitVisitorVerificationMutation,

} = visitorApi;