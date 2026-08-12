import { baseApi } from "../../api/baseApi";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /* ==========================
       PERSONAL DETAILS
    ========================== */

    personalDetailsVerification: builder.mutation({
      query: (body) => ({
        url: "/ekyc/v1/kyc",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GetCustomerKYCdetails", 'CustomerKYCVerificationDoneAndNotDone'],

    }),

    /* ==========================
       ADD BANK ACCOUNT
    ========================== */

    addBankAccount: builder.mutation({
      query: (body) => ({
        url: "/bank/v1/add-bank",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GetCustomerKYCdetails", 'CustomerKYCVerificationDoneAndNotDone'],
    }),

    /* ==========================
       VERIFY AADHAAR
    ========================== */

    verifyAadhaar: builder.mutation({
      query: (body) => ({
        url: "/ekyc/v1/verify-aadhaar",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GetCustomerKYCdetails", 'CustomerKYCVerificationDoneAndNotDone'],
    }),

    /* ==========================
       VERIFY PAN
    ========================== */

    verifyPan: builder.mutation({
      query: (body) => ({
        url: "/ekyc/v1/verify-pan",
        method: "POST",
        body,
      }),
      invalidatesTags: ["GetCustomerKYCdetails", 'CustomerKYCVerificationDoneAndNotDone'],
    }),

    CustomerKYCVerificationDoneAndNotDone: builder.query({
      query: (body) => ({
        url: "/User/v1/get-verification",
        method: "GET",
        body,
      }),
      providesTags: ["CustomerKYCVerificationDoneAndNotDone"],
    }),
    GetCustomerKYCdetails: builder.query({
      query: (body) => ({
        url: "/User/v1/get-kyc",
        method: "GET",
        body,
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



    // Apply Loan ----- Start  Api

    GetAllLoan: builder.query({

      query: () => ({
        url: "/Get-Loan/get",
        method: "GET",
      }),

      providesTags: ["Get-Loan"],

    }),

    applyLoan: builder.mutation({

      query: (body) => ({

        url: "/applyloan/apply",

        method: "POST",

        body,

      }),

    }),
    // App Loan --- End Api


    getMyLoans: builder.query({
      query: () => ({
        url: "/applyloan/my-loans",  
        method: "GET", //[cite: 3]
      }),
      providesTags: ["MyLoans"],
    }),
    getSingleLoanDetails: builder.query({
      query: (loanId) => ({
        url: `/applyloan/${loanId}/check`,
        method: "GET",
      }),
      providesTags: (result, error, loanId) => [{ type: "LoanDetails", id: loanId }],
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
  useGetMyLoansQuery ,
  useGetSingleLoanDetailsQuery,
  
} = customerApi;