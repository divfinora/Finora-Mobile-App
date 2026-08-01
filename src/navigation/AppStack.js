// src/navigation/AppStack.jsx

import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

// Bottom Tab Navigation
import BottomTabNavigator from "./BottomTabNavigator";

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      
      {/* ========================= */}
      {/* MAIN BOTTOM TABS */}
      {/* ========================= */}

      <Stack.Screen
        name="MainTabs"
        component={BottomTabNavigator}
      />

      {/* ========================= */}
      {/* FUTURE SCREENS */}
      {/* ========================= */}

      {/*
      <Stack.Screen
        name="DeviceDetail"
        component={DeviceDetailScreen}
      />

      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
      */}
    </Stack.Navigator>
  );
};

export default AppStack;