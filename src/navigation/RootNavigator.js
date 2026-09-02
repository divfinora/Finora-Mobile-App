// src/navigation/RootNavigator.jsx

import React, {
  useEffect,
  useState,
} from "react";

import {
  useSelector,
} from "react-redux";

import {
  NavigationContainer,
} from "@react-navigation/native";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

import {
  ActivityIndicator,
  View,
} from "react-native";

import {
  getTokens,
} from "../utils/keychain";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

import {
  initializeFirebaseMessaging,
  subscribeToFirebaseTokenRefresh,
} from "../utils/firebaseMessaging";

import {
  saveFcmTokenToBackend,
} from "../utils/fcmTokenService";


const Stack =
  createNativeStackNavigator();


const RootNavigator = () => {

  // ==========================================
  // AUTH USER
  // ==========================================

  const { user } =
    useSelector(
      (state) => state.auth
    );


  // ==========================================
  // AUTH STATES
  // ==========================================

  const [
    loading,
    setLoading,
  ] = useState(true);


  const [
    isAuthenticated,
    setIsAuthenticated,
  ] = useState(false);


  // ==========================================
  // CHECK AUTH
  // ==========================================

  useEffect(() => {

    checkAuth();

  }, [user]);


  // ==========================================
  // CHECK AUTH FUNCTION
  // ==========================================

  const checkAuth =
    async () => {

      try {

        const tokens =
          await getTokens();


        if (
          tokens?.accessToken &&
          tokens?.refreshToken &&
          user
        ) {

          setIsAuthenticated(
            true
          );

        } else {

          setIsAuthenticated(
            false
          );

        }

      } catch (error) {

        console.log(
          "Auth Check Error:",
          error
        );

        setIsAuthenticated(
          false
        );

      } finally {

        setLoading(
          false
        );

      }

    };


  // ==========================================
  // FIREBASE FCM SETUP
  // ==========================================
  //
  // FCM setup ONLY when user is authenticated
  //
  // ==========================================

  useEffect(() => {

    // ----------------------------------------
    // User login nahi hai
    // ----------------------------------------

    if (
      !user ||
      !isAuthenticated
    ) {

      console.log(
        "⚠️ FCM Setup skipped - User not authenticated"
      );

      return;
    }


    let unsubscribeTokenRefresh;


    const setupFirebaseMessaging =
      async () => {

        try {

          console.log(
            "========================================"
          );

          console.log(
            "🔥 Starting FCM Setup"
          );

          console.log(
            "========================================"
          );


          // ====================================
          // 1. GET FCM TOKEN
          // ====================================

          const token =
            await initializeFirebaseMessaging();


          // ====================================
          // 2. SAVE TOKEN TO BACKEND
          // ====================================

          if (token) {

            console.log(
              "📤 Saving FCM Token to Backend..."
            );

            await saveFcmTokenToBackend(
              token
            );

          } else {

            console.log(
              "⚠️ FCM Token not available"
            );

          }


          // ====================================
          // 3. TOKEN REFRESH LISTENER
          // ====================================

          unsubscribeTokenRefresh =
            subscribeToFirebaseTokenRefresh(
              async (newToken) => {

                console.log(
                  "========================================"
                );

                console.log(
                  "🔄 FCM TOKEN REFRESHED"
                );

                console.log(
                  "========================================"
                );


                if (!newToken) {

                  console.log(
                    "⚠️ New FCM Token is empty"
                  );

                  return;
                }


                // ==============================
                // SAVE NEW TOKEN
                // ==============================

                await saveFcmTokenToBackend(
                  newToken
                );

              }
            );

        } catch (error) {

          console.log(
            "❌ Firebase Messaging Setup Error:",
            error
          );

        }

      };


    setupFirebaseMessaging();


    // ========================================
    // CLEANUP
    // ========================================

    return () => {

      if (
        typeof unsubscribeTokenRefresh ===
        "function"
      ) {

        unsubscribeTokenRefresh();

        console.log(
          "🧹 FCM Token Refresh Listener Removed"
        );

      }

    };

  }, [
    user,
    isAuthenticated,
  ]);


  // ==========================================
  // INITIAL LOADING
  // ==========================================

  if (loading) {

    return (

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <ActivityIndicator
          size="large"
        />

      </View>

    );

  }


  // ==========================================
  // NAVIGATION
  // ==========================================

  return (

    <NavigationContainer>

      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

        {
          isAuthenticated ? (

            <Stack.Screen
              name="AppStack"
              component={AppStack}
            />

          ) : (

            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
            />

          )
        }

      </Stack.Navigator>

    </NavigationContainer>

  );

};


export default RootNavigator;