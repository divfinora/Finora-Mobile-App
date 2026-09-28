import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Home/HomeScreen.jsx";
import LoanScreen from "../screens/Loan/LoanScreen.jsx";
import MyLoanScreen from "../screens/GetLoan/MyLoan/MyLoanScreen.jsx";
import ProfileScreen from "../screens/Profile/ProfileScreen.jsx";

import VisitorHomeScreen from "../screens/Visitor/VisitorHomeScreen/VisitorHomeScreen.jsx";
import MyApplicationsScreen from "../screens/Visitor/MyApplications/MyApplicationsScreen.jsx";
import VisitorProfileScreen from "../screens/Visitor/Profile/VisitorProfileScreen.jsx";

import useUserRole from "../hooks/useUserRole.js";
import FinsaarthiCustomTabBar from "./FinsaarthiCustomTabBar.jsx";

const Tab = createBottomTabNavigator();

/**
 * loanApplications shape expected by FloatingLoanApplicationCarousel:
 * [
 *   {
 *     id: "loan-123",
 *     title: "Personal Loan",
 *     amount: 50000,
 *     status: "Loan Application Submitted",
 *     submittedAt: "2026-09-18T23:30:00.000Z",
 *   },
 * ]
 *
 * Keep the array connected to your real Finsaarthi loan/application API.
 */
const BottomTabNavigator = ({ loanApplications = [], onLoanApplicationPress }) => {
  const { isVisitor } = useUserRole();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarHideOnKeyboard
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={props => (
        <FinsaarthiCustomTabBar
          {...props}
          loanApplications={loanApplications}
          onLoanApplicationPress={onLoanApplicationPress}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={isVisitor ? VisitorHomeScreen : HomeScreen}
      />

      {!isVisitor && (
        <Tab.Screen
          name="Loan"
          component={LoanScreen}
        />
      )}

      <Tab.Screen
        name="History"
        component={isVisitor ? MyApplicationsScreen : MyLoanScreen}
      />

      <Tab.Screen
        name="Profile"
        component={isVisitor ? VisitorProfileScreen : ProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
