import { store } from "../redux/store";
import { authApi } from "../redux/features/auth/authApi";

export const saveFcmTokenToBackend = async (
  fcmToken
) => {
  try {
    if (!fcmToken) {
      console.log(
        "❌ FCM Token is missing"
      );

      return null;
    }

    console.log(
      "📤 Sending FCM Token to backend..."
    );

    const result =
      await store.dispatch(
        authApi.endpoints.saveFcmToken.initiate({
          fcmToken,
        })
      );

    if (result?.error) {
      console.log(
        "❌ FCM Token API Error:",
        result.error
      );

      return null;
    }

    console.log(
      "✅ FCM Token saved successfully"
    );

    return result?.data;
  } catch (error) {
    console.log(
      "❌ Save FCM Token Error:",
      error
    );

    return null;
  }
};