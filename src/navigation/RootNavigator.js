// src/navigation/RootNavigator.jsx

import React, {
  useEffect,
  useState,
} from "react";

import { useSelector } from "react-redux";

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

import { getTokens } from "../utils/keychain";

import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {

  const { user } = useSelector(
    (state) => state.auth
  );

  const [loading, setLoading] = useState(true);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

    checkAuth();

  }, [user]);

  const checkAuth = async () => {

    try {

      const tokens = await getTokens();

      if (
        tokens?.accessToken &&
        tokens?.refreshToken &&
        user
      ) {

        setIsAuthenticated(true);

      } else {

        setIsAuthenticated(false);

      }

    } catch (error) {

      setIsAuthenticated(false);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <ActivityIndicator size="large" />

      </View>

    );

  }

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