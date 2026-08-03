// src/navigation/AppStack.jsx

import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

// Bottom Tab Navigation
import BottomTabNavigator from "./BottomTabNavigator";
import AadhaarVerificationScreen from "../screens/CompleteKYCScreen/AddharVerification/AadhaarVerificationScreen";
import AadhaarOtpVerificationScreen from "../screens/CompleteKYCScreen/AddharVerification/AadhaarOtpVerificationScreen";
import PanOtpVerificationScreen from "../screens/CompleteKYCScreen/PanVerification/PanOtpVerificationScreen";
import PersonalVerificationScreen from "../screens/CompleteKYCScreen/PersonalDetails/PersonalDetailsVerificationScreen";
import BankVerificationScreen from "../screens/CompleteKYCScreen/BankVerification/BankVerificationScreen";

import PanVerificationScreen from "../screens/CompleteKYCScreen/PanVerification/PanVerificationScreen";

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

      <Stack.Screen
        name="aadhaar-verification-enter-mobile-number-screen"
        component={AadhaarVerificationScreen

        }
      />
      <Stack.Screen
        name="pan-verification-enter-mobile-number-screen"
        component={PanVerificationScreen

        }
      />
      <Stack.Screen
        name="aadhaar-verification-enter-otp-screen"
        component={AadhaarOtpVerificationScreen

        }
      />

      <Stack.Screen
        name="pan-verification-enter-otp-screen"
        component={PanOtpVerificationScreen

        }
      />
      <Stack.Screen
        name="personal-details-verification-screen"
        component={PersonalVerificationScreen

        }
      />
      <Stack.Screen
        name="bank-verification-screen"
        component={BankVerificationScreen

        }
      />

      {/* ========================= */}
      {/* FUTURE SCREENS */}
      {/* ========================= */}

      {/*
      
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
      */}
    </Stack.Navigator>
  );
};

export default AppStack;