import React, { memo } from "react";

import {
  StatusBar,
} from "react-native";

import HomeComponent from "./HomeComponent";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView
      edges={[
      
        "left",
        "right",
      ]}
      style={{
        flex: 1,
        backgroundColor: "#F6F8F7",
      }}
    >
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <HomeComponent />
    </SafeAreaView>
  );
};

export default memo(HomeScreen);