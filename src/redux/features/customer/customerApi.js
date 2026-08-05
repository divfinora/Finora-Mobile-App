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
    }),

    CustomerKYCVerificationDoneAndNotDone: builder.query({
      query: (body) => ({
        url: "/User/v1/get-verification",
        method: "POST",
        body,
      }),
    }),

  }),
});

export const {
  useCustomerKYCVerificationDoneAndNotDoneQuery,
  usePersonalDetailsVerificationMutation,
  useAddBankAccountMutation,
  useVerifyAadhaarMutation,
  useVerifyPanMutation,
} = customerApi;