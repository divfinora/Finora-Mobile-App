import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../../config/api";
import {
  getTokens,
  updateTokens,
} from "../../utils/keychain";
import { logoutUser } from "../../utils/authStorage";
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,

  prepareHeaders: async (headers) => {

    // ===============================
    // GET ACCESS TOKEN FROM KEYCHAIN
    // ===============================

    const tokens = await getTokens();

    // ===============================
    // ATTACH ACCESS TOKEN
    // ===============================

    if (tokens?.accessToken) {
      headers.set(
        "Authorization",
        `Bearer ${tokens.accessToken}`
      );
    }

    headers.set(
      "Content-Type",
      "application/json"
    );

    return headers;
  },
});

/* ====================================== */
/* BASE QUERY WITH AUTO REFRESH */
/* ====================================== */

const baseQueryWithReauth = async (
  args,
  api,
  extraOptions
) => {

  // ===============================
  // ORIGINAL API CALL
  // ===============================

  let result = await baseQuery(
    args,
    api,
    extraOptions
  );

  // ===============================
  // ACCESS TOKEN EXPIRED
  // ===============================

  if (result?.error?.status === 401) {

    console.log("Access Token Expired");

    // ===============================
    // GET REFRESH TOKEN
    // ===============================

    const tokens = await getTokens();

    // ===============================
    // IF REFRESH TOKEN EXISTS
    // ===============================

    if (tokens?.refreshToken) {

      // ===============================
      // CALL REFRESH TOKEN API
      // ===============================

      const refreshResult = await baseQuery(
        {
          url: "/auth/v1/refresh",
          method: "POST",
          body: {
            refreshToken: tokens.refreshToken,
          },
        },
        api,
        extraOptions
      );

      console.log("Refresh Result =>", refreshResult);

      // ===============================
      // REFRESH SUCCESS
      // ===============================

      if (refreshResult?.data?.success) {

        // SAVE NEW TOKENS

        await updateTokens(
          refreshResult.data.accessToken,
          refreshResult.data.refreshToken
        );

        // RETRY ORIGINAL API

        result = await baseQuery(
          args,
          api,
          extraOptions
        );

      }

      // ===============================
      // REFRESH FAILED
      // ===============================

      else {
        await logoutUser(api.dispatch);
        console.log("Refresh Token Expired");

        // NEXT STEP:
        // clearTokens()
        // dispatch(logout())
        // Navigate Login

      }

    } else{
        console.log("Refresh Token Not Found");

  await logoutUser(api.dispatch);
    }

  }

  return result;
};

export const baseApi = createApi({

  reducerPath: "api",

  baseQuery: baseQueryWithReauth,

  tagTypes: [],

  endpoints: () => ({}),

});