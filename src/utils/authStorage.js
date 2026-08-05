import { clearTokens } from "./keychain";

import { logout } from "../redux/slices/authSlice";

import { baseApi } from "../redux/api/baseApi";

export const logoutUser = async (dispatch) => {

  try {

    // ============================
    // REMOVE TOKENS
    // ============================

    await clearTokens();

    // ============================
    // CLEAR USER
    // ============================

    dispatch(logout());

    // ============================
    // CLEAR RTK QUERY CACHE
    // ============================

    dispatch(baseApi.util.resetApiState());

    return true;

  } catch (error) {

    console.log(error);

    return false;

  }

};