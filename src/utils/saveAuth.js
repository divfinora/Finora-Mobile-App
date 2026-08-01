import { saveTokens } from "./keychain";
import { setUser } from "../redux/slices/authSlice";

export const saveAuth = async (
  dispatch,
  response
) => {

  try {

    await saveTokens(
      response.accessToken,
      response.refreshToken
    );

    dispatch(
      setUser(response.data)
    );

    return true;

  } catch (error) {

    console.log(
      "Save Auth Error:",
      error
    );

    return false;

  }

};