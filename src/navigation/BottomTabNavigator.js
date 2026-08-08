import React from "react";

import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

// Screens
import HomeScreen from "../screens/Home/HomeScreen.jsx";
import LoanScreen from "../screens/Loan/LoanScreen.jsx";
import HistoryScreen from "../screens/History/HistoryScreen.jsx";
import ProfileScreen from "../screens/Profile/ProfileScreen.jsx";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#9CA3AF",

        tabBarStyle: {
          height: 65,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
          paddingTop: 6,
          paddingBottom: 8,
        },

        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      {/* HOME */}
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      {/* SCANNER */}
      <Tab.Screen
        name="Loan"
        component={LoanScreen}
      />

      {/* HISTORY */}
      <Tab.Screen
        name="History"
        component={HistoryScreen}
      />

      {/* PROFILE */}
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;