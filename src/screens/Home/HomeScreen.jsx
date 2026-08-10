 

import React, { memo } from "react";

import {
  
  StatusBar,
} from "react-native";

 

import HomeComponent from "./HomeComponent";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme";

const HomeScreen = () => {

  return (

    <SafeAreaView
   
      style={{
        flex: 1,
         backgroundColor:'white',
      }}
    >

      <StatusBar
        translucent={false}
        backgroundColor={theme.screen.background}
        barStyle={theme.statusBar.dark}
      />

      <HomeComponent />

    </SafeAreaView>

  );

};

export default memo(HomeScreen);