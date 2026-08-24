// src/navigation/AuthStack.js

import React from "react";

import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

// Screens
import OnboardingScreen from "../screens/Onboarding/OnboardingScreen";
import LoginScreen from "../screens/Auth/Regester/LoginScreen";

import EnterOtpScreen from "../screens/Auth/Regester/EnterOtpScreen.jsx";
import CreatePinScreen from "../screens/Auth/Regester/CreatePinScreen.jsx";
import LoginWithPin from "../screens/Auth/Login/LoginWithPin.jsx";
import VisitorLoginScreen from "../screens/Auth/Visitor/VisitorLoginScreen.jsx";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"


      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
      />

      <Stack.Screen
        name="enter-phone-register-user"
        component={LoginScreen}
      />

      <Stack.Screen
        name="enter-otp-register-user"
        component={EnterOtpScreen}
      />

      <Stack.Screen
        name="create-pin-register-user"
        component={CreatePinScreen}
      />

      <Stack.Screen
        name="enter-mpin-login-user"
        component={LoginWithPin}
      />
      <Stack.Screen
        name="visitor-login-pannel"
        component={VisitorLoginScreen}
      />


    </Stack.Navigator>
  );
};

export default AuthStack;