import { baseApi } from "../../api/baseApi";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ==========================
       PERSONAL DETAILS & KYC
    ========================== */
    personalDetailsVerification: builder.mutation({
      query: (body) => ({
        url: "/ekyc/v1/kyc",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GetCustomerKYCdetails", "CustomerKYCVerificationDoneAndNotDone"],
    }),

    addBankAccount: builder.mutation({
      query: (body) => ({
        url: "/bank/v1/add-bank",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GetCustomerKYCdetails", "CustomerKYCVerificationDoneAndNotDone"],
    }),

    verifyAadhaar: builder.mutation({
      query: (body) => ({
        url: "/ekyc/v1/verify-aadhaar",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GetCustomerKYCdetails", "CustomerKYCVerificationDoneAndNotDone"],
    }),

    verifyPan: builder.mutation({
      query: (body) => ({
        url: "/ekyc/v1/verify-pan",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GetCustomerKYCdetails", "CustomerKYCVerificationDoneAndNotDone"],
    }),

    CustomerKYCVerificationDoneAndNotDone: builder.query({
      query: () => ({
        url: "/User/v1/get-verification",
        method: "GET",
      }),
      providesTags: ["CustomerKYCVerificationDoneAndNotDone"],
    }),

    GetCustomerKYCdetails: builder.query({
      query: () => ({
        url: "/User/v1/get-kyc",
        method: "GET",
      }),
      providesTags: ["GetCustomerKYCdetails"],
    }),

    getSettings: builder.query({
      query: () => ({
        url: "/system/bio-metric",
        method: "GET",
      }),
      providesTags: ["Settings"],
    }),

    getupdateSettings: builder.mutation({
      query: (body) => ({
        url: "/system/add-bio",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Settings"],
    }),

    /* ==========================
       LOAN APIs
    ========================== */
    GetAllLoan: builder.query({
      query: () => ({
        url: "/Get-Loan/get",
        method: "GET",
      }),
      providesTags: ["Get-Loan"],
    }),
    GetLoanProductsByCategory: builder.query({
      query: (category) => ({
        url: `/Get-Loan/get/${category}`,
        method: "GET",
      }),
      providesTags: (result, error, category) => [
        {
          type: "Get-Loan",
          id: category,
        },
      ],
    }),
    applyLoan: builder.mutation({
      query: (body) => ({
        url: "/applyloan/apply",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        "MyLoans",
        "LoanDetails",
        "Notifications",
        "UnreadNotificationCount",
      ],
    }),

    getMyLoans: builder.query({
      query: () => ({
        url: "/applyloan/my-loans",
        method: "GET",
      }),
      providesTags: ["MyLoans"],
    }),

    getLoanApplicationPrefill: builder.query({
      query: () => ({
        url: "/applyloan/application/prefill",
        method: "GET",
      }),
    }),

    getSingleLoanDetails: builder.query({
      query: (loanId) => ({
        url: `/applyloan/${loanId}/check`,
        method: "GET",
      }),
      providesTags: (result, error, loanId) => [{ type: "LoanDetails", id: loanId }],
    }),

    /* ==========================
       NOTIFICATION PREFERENCES (UPDATED)
    ========================== */
    getNotificationPreferences: builder.query({
      query: () => ({
        url: "/notification-permission/get",
        method: "GET",
      }),
      providesTags: ["NotificationPreferences"],
    }),

    updateNotificationPreferences: builder.mutation({
      query: (body) => ({
        url: "/notification-permission/enable",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["NotificationPreferences"],
    }),

    enableAllNotificationPreferences: builder.mutation({
      query: () => ({
        url: "/notification-permission/enable-all",
        method: "PATCH",
      }),
      invalidatesTags: ["NotificationPreferences"],
    }),

    disableAllNotificationPreferences: builder.mutation({
      query: () => ({
        url: "/notification-permission/disable-all",
        method: "PATCH",
      }),
      invalidatesTags: ["NotificationPreferences"],
    }),

    /* ==========================
       NOTIFICATIONS SYSTEM
    ========================== */
    getAllNotifications: builder.query({
      query: (params) => ({
        url: "/notification/get-all-notification",
        method: "GET",
        params,
      }),
      providesTags: ["Notifications"],
    }),

    getUnreadNotificationCount: builder.query({
      query: () => ({
        url: "/notification/unread-count",
        method: "GET",
      }),
      providesTags: ["UnreadNotificationCount"],
    }),

    markNotificationAsRead: builder.mutation({
      query: (id) => ({
        url: `/notification/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications", "UnreadNotificationCount"],
    }),

    markAllNotificationsAsRead: builder.mutation({
      query: () => ({
        url: "/notification/read-all",
        method: "PATCH",
      }),
      invalidatesTags: ["Notifications", "UnreadNotificationCount"],
    }),

    deleteNotification: builder.mutation({
      query: (id) => ({
        url: `/notification/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications", "UnreadNotificationCount"],
    }),

    deleteAllNotifications: builder.mutation({
      query: () => ({
        url: "/notification/",
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications", "UnreadNotificationCount"],
    }),
    /* ==========================
   LOAN DOCUMENT UPLOAD
========================== */
    uploadLoanDocuments: builder.mutation({
      query: (formData) => ({
        url: "/applyloan/upload-documents",
        method: "POST",
        body: formData,
      }),
    }),

    // =====================================================
    // PAYMENT / EMI
    // =====================================================

    createEMIPayment: builder.mutation({

      query: ({
        emiId,
      }) => ({

        url:
          '/payemt/create-payment',

        method:
          'POST',

        body: {
          emiId,
        },

      }),

    }),


    submitEMIUTR: builder.mutation({

      query: ({
        paymentId,
        utrNumber,
        customerRemark,
      }) => ({

        url:
          '/payemt/submit',

        method:
          'PUT',

        body: {

          paymentId,

          utrNumber,

          customerRemark:
            customerRemark ||
            'Payment made through UPI',

        },

      }),
      invalidatesTags: [
        "MyLoans",
        "LoanDetails",
      ],
    }),
    getMyRepayments: builder.query({

      query: () => ({

        url:
          '/payemt/my',

        method:
          'GET',

      }),

    }),
  }),
});

export const {
  useCustomerKYCVerificationDoneAndNotDoneQuery,
  useGetCustomerKYCdetailsQuery,
  usePersonalDetailsVerificationMutation,
  useAddBankAccountMutation,
  useVerifyAadhaarMutation,
  useVerifyPanMutation,
  useGetSettingsQuery,
  useGetAllLoanQuery,
  useGetupdateSettingsMutation,
  useApplyLoanMutation,
  useGetMyLoansQuery,
  useGetSingleLoanDetailsQuery,
  useGetLoanApplicationPrefillQuery,
  useGetLoanProductsByCategoryQuery,

  // Notification Preferences Hooks
  useGetNotificationPreferencesQuery,
  useUpdateNotificationPreferencesMutation,
  useEnableAllNotificationPreferencesMutation,
  useDisableAllNotificationPreferencesMutation,

  // In-App Notification Hooks
  useGetAllNotificationsQuery,
  useGetUnreadNotificationCountQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
  useDeleteNotificationMutation,
  useDeleteAllNotificationsMutation,
  useUploadLoanDocumentsMutation,

  useCreateEMIPaymentMutation,
  useSubmitEMIUTRMutation,
  useGetMyRepaymentsQuery,
} = customerApi;