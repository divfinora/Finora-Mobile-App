  // // ===============================
  // // ERP BASE API
  // // AUTO LOGOUT ON 401 / 403
  // // ===============================

  // import {
  //   createApi,
  //   fetchBaseQuery,
  // } from "@reduxjs/toolkit/query/react";

  // // import { getAuth, removeAuth } from "../../utils/authStorage";
  // import {BASE_URL} from '../../config/api.js'
  
  // // ======================================
  // // BASE QUERY
  // // ======================================

  // const baseQuery = fetchBaseQuery({
  //   baseUrl: BASE_URL,

  //   prepareHeaders: async (headers) => {

  //     // 🔥 get token
  //     const { token } = await getAuth();
  //     console.log(token ,"token ====")

  //     // 🔥 attach token
  //     if (token) {
  //       headers.set(
  //         "authorization",
  //         `Bearer ${token}`
  //       );
  //     }

  //     headers.set(
  //       "Content-Type",
  //       "application/json"
  //     );

  //     return headers;
  //   },
  // });

  // // ======================================
  // // AUTO LOGOUT HANDLER
  // // ======================================

  // const baseQueryWithReauth = async (
  //   args,
  //   api,
  //   extraOptions
  // ) => {

  //   // 🔥 original api call
  //   const result = await baseQuery(
  //     args,
  //     api,
  //     extraOptions
  //   );

  //   console.log(
  //     result?.error,
  //     "ERP API ERROR"
  //   );

  //   // ======================================
  //   // TOKEN EXPIRED / INVALID
  //   // ======================================

  //   if (
  //     result?.error?.status === 401 ||
  //     result?.error?.status === 403
  //   ) {

  //     console.log(
  //       "🚨 ERP TOKEN EXPIRED → LOGOUT"
  //     );

  //     // 🔥 clear auth
  //     // await removeAuth();

  //     /**
  //      * OPTIONAL
  //      * If using redux auth slice
  //      * dispatch(logout())
  //      */

  //     // api.dispatch(logout());
  //   }

  //   return result;
  // };

  // // ======================================
  // // CREATE API
  // // ======================================

  // export const baseApi = createApi({
  //   reducerPath: "api",

  //   baseQuery: baseQueryWithReauth,

  // tagTypes: [


 

       
  //   ],

  //   endpoints: () => ({}),
  // });

  // ===============================
// ERP BASE API
// ===============================

import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../config/api";

// ======================================
// CREATE API
// ======================================

export const baseApi = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,

    prepareHeaders: (headers) => {
      headers.set(
        "Content-Type",
        "application/json"
      );

      return headers;
    },
  }),

  tagTypes: [],

  endpoints: () => ({}),
});