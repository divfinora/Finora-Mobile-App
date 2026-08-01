import React, {
  useEffect,
} from "react";

import {
  ActivityIndicator,
  View,
} from "react-native";

import { useSelector } from "react-redux";

import { getTokens } from "../../utils/keychain";

const SplashScreen = ({
  navigation,
}) => {

  const {
    user,
  } = useSelector(
    state => state.auth
  );

  useEffect(() => {

    checkAuth();

  }, []);

  const checkAuth =
    async () => {

      const tokens =
        await getTokens();

      if (!tokens) {

        navigation.replace(
          "AuthStack"
        );

        return;

      }

      if (user) {

        navigation.replace(
          "AppStack"
        );

        return;

      }

      navigation.replace(
        "AuthStack"
      );

    };

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

};

export default SplashScreen;