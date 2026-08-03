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

  }),
});

export const {

  useLoginMutation,

  useVerifyOtpMutation,

  useRegisterMutation,

  useLoginWithMpinMutation,

  useRefreshTokenMutation,

} = authApi;