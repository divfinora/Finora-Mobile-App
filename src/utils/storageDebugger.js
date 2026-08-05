import { store } from "../redux/store";
import { storage } from "./mmkvStorage";
import { getTokens } from "./keychain";

export const debugStorage = async () => {

  console.clear();

  console.log("");
  console.log("========================================");
  console.log("🚀 STORAGE DEBUG");
  console.log("========================================");

  // ==========================================
  // REDUX
  // ==========================================

  const reduxState = store.getState();

  console.log("");
  console.log("📦 REDUX STATE");
  console.log(reduxState);

  console.log("");
  console.log("👤 REDUX USER");
  console.log(reduxState.auth?.user);

  // ==========================================
  // MMKV
  // ==========================================

  console.log("");
  console.log("========================================");
  console.log("📦 MMKV STORAGE");
  console.log("========================================");

  try {

    const keys = storage.getAllKeys();

    if (!keys.length) {

      console.log("❌ MMKV Empty");

    } else {

      console.log("Keys :", keys);

      keys.forEach((key) => {

        console.log("");
        console.log(`🔑 ${key}`);

        const value = storage.getString(key);

        try {

          console.log(JSON.parse(value));

        } catch {

          console.log(value);

        }

      });

    }

  } catch (error) {

    console.log("MMKV Error :", error);

  }

  // ==========================================
  // KEYCHAIN
  // ==========================================

  console.log("");
  console.log("========================================");
  console.log("🔐 KEYCHAIN");
  console.log("========================================");

  try {

    const tokens = await getTokens();

    if (!tokens) {

      console.log("❌ No Tokens Found");

    } else {

      console.log("");
      console.log("Access Token");
      console.log(tokens.accessToken);

      console.log("");
      console.log("Refresh Token");
      console.log(tokens.refreshToken);

    }

  } catch (error) {

    console.log("Keychain Error :", error);

  }

  console.log("");
  console.log("========================================");
  console.log("✅ STORAGE DEBUG END");
  console.log("========================================");
};