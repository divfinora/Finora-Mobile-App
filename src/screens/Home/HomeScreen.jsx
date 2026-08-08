// import { View, Text } from 'react-native'
// import React from 'react'
// import CompleteKYCScreen from '../CompleteKYCScreen/CompleteKYCScreen'
// const HomeScreen = () => {
//   return (
//    <>
//     <CompleteKYCScreen/>
//    </>
//   )
// }

// export default HomeScreen

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