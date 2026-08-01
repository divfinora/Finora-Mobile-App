import * as Keychain from "react-native-keychain";

const SERVICE = "finsaarthi-auth";

/* ===================================== */
/* SAVE TOKENS */
/* ===================================== */

export const saveTokens = async (
  accessToken,
  refreshToken
) => {

  try {

    await Keychain.setGenericPassword(

      "token",

      JSON.stringify({

        accessToken,

        refreshToken,

      }),

      {

        service: SERVICE,

      }

    );

    return true;

  } catch (error) {

    console.log(
      "Save Tokens Error:",
      error
    );

    return false;

  }

};

/* ===================================== */
/* GET TOKENS */
/* ===================================== */

export const getTokens = async () => {

  try {

    const credentials =
      await Keychain.getGenericPassword({

        service: SERVICE,

      });

    if (!credentials) {

      return null;

    }

    return JSON.parse(
      credentials.password
    );

  } catch (error) {

    console.log(
      "Get Tokens Error:",
      error
    );

    return null;

  }

};

/* ===================================== */
/* UPDATE TOKENS */
/* ===================================== */

export const updateTokens = async (
  accessToken,
  refreshToken
) => {

  return saveTokens(
    accessToken,
    refreshToken
  );

};

/* ===================================== */
/* CLEAR TOKENS */
/* ===================================== */

export const clearTokens = async () => {

  try {

    await Keychain.resetGenericPassword({

      service: SERVICE,

    });

    return true;

  } catch (error) {

    console.log(
      "Clear Tokens Error:",
      error
    );

    return false;

  }

};