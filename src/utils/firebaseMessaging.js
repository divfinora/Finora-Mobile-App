import {
  getMessaging,
  getToken,
  onTokenRefresh,
} from "@react-native-firebase/messaging";

import {
  Platform,
  PermissionsAndroid,
} from "react-native";


// =====================================================
// NOTIFICATION PERMISSION
// =====================================================

export const requestNotificationPermission =
  async () => {
    try {
      if (Platform.OS === "ios") {
        return true;
      }

      if (Platform.OS === "android") {
        if (Platform.Version >= 33) {
          const result =
            await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS
                .POST_NOTIFICATIONS
            );

          return (
            result ===
            PermissionsAndroid.RESULTS.GRANTED
          );
        }

        return true;
      }

      return false;
    } catch (error) {
      console.log(
        "❌ Notification Permission Error:",
        error
      );

      return false;
    }
  };


// =====================================================
// GET FIREBASE TOKEN
// =====================================================

export const getFirebaseToken =
  async () => {
    try {
      const messagingInstance =
        getMessaging();

      const token =
        await getToken(
          messagingInstance
        );

      console.log(
        "🔥 FCM TOKEN:",
        token
      );

      return token;
    } catch (error) {
      console.log(
        "❌ FCM Token Error:",
        error
      );

      return null;
    }
  };


// =====================================================
// INITIALIZE FCM
// =====================================================

export const initializeFirebaseMessaging =
  async () => {
    try {
      const permissionGranted =
        await requestNotificationPermission();

      console.log(
        "🔔 Permission:",
        permissionGranted
      );

      const token =
        await getFirebaseToken();

      return token;
    } catch (error) {
      console.log(
        "❌ Firebase Init Error:",
        error
      );

      return null;
    }
  };


// =====================================================
// TOKEN REFRESH
// =====================================================

export const subscribeToFirebaseTokenRefresh =
  (callback) => {
    try {
      const messagingInstance =
        getMessaging();

      const unsubscribe =
        onTokenRefresh(
          messagingInstance,
          async (newToken) => {
            console.log(
              "🔥 NEW FCM TOKEN:",
              newToken
            );

            if (
              typeof callback ===
              "function"
            ) {
              await callback(
                newToken
              );
            }
          }
        );

      return unsubscribe;
    } catch (error) {
      console.log(
        "❌ Token Refresh Error:",
        error
      );

      return () => {};
    }
  };