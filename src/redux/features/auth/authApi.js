import { baseApi } from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    // ==========================
    // SEND OTP
    // ==========================
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/v1/send-otp",
        method: "POST",
        body,
      }),
    }),

    // ==========================
    // VERIFY OTP
    // ==========================
    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/v1/verify-otp",
        method: "POST",
        body,
      }),
    }),

    // ==========================
    // REGISTER
    // ==========================
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/v1/register",
        method: "POST",
        body,
      }),
    }),

    // ==========================
    // LOGIN WITH MPIN
    // ==========================
    loginWithMpin: builder.mutation({
      query: (body) => ({
        url: "/auth/v1/login",
        method: "POST",
        body,
      }),
    }),

    // ==========================
    // REFRESH TOKEN
    // ==========================
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/auth/v1/refresh",
        method: "POST",
        body: {
          refreshToken,
        },
      }),
    }),

    // ==========================
    // CUSTOMER PROFILE
    // GET /User/v1/profile
    // ==========================
    getProfile: builder.query({
      query: () => ({
        url: "/User/v1/profile",
        method: "GET",
      }),
    }),

    saveFcmToken: builder.mutation({
      query: ({ fcmToken }) => ({
        url: "/User/fcm-token",
        method: "PATCH",
        body: {
          fcmToken,
        },
      }),
    }),

    // ==========================
    // VISITOR / EMPLOYEE PROFILE
    // GET /User/my-profile
    // ==========================
    getVisitorProfile: builder.query({
      query: () => ({
        url: "/User/my-profile",
        method: "GET",
      }),
    }),

  }),
});

export const {

  useLoginMutation,

  useVerifyOtpMutation,

  useRegisterMutation,

  useLoginWithMpinMutation,

  useRefreshTokenMutation,

  useGetProfileQuery,

  useGetVisitorProfileQuery,
    useSaveFcmTokenMutation,

} = authApi;