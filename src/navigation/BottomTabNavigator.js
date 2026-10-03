import React from "react";
import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import {
  useNavigation,
} from "@react-navigation/native";

import HomeScreen from "../screens/Home/HomeScreen.jsx";
import LoanScreen from "../screens/Loan/LoanScreen.jsx";
import MyLoanScreen from "../screens/GetLoan/MyLoan/MyLoanScreen.jsx";
import ProfileScreen from "../screens/Profile/ProfileScreen.jsx";

import VisitorHomeScreen from "../screens/Visitor/VisitorHomeScreen/VisitorHomeScreen.jsx";
import MyApplicationsScreen from "../screens/Visitor/MyApplications/MyApplicationsScreen.jsx";
import VisitorProfileScreen from "../screens/Visitor/Profile/VisitorProfileScreen.jsx";

import useUserRole from "../hooks/useUserRole.js";

import FinsaarthiCustomTabBar from "./FinsaarthiCustomTabBar.jsx";

import {
  BottomTabHeightProvider,
} from "./BottomTabHeightContext.jsx";

const Tab = createBottomTabNavigator();

const FAKE_LOAN_APPLICATIONS = [
  {
    id: "loan-001",
    title: "Personal Loan",
    amount: 50000,
    status: "Loan Application Submitted",
    submittedAt: "2026-09-18T23:30:00.000Z",
  },
  {
    id: "loan-002",
    title: "Gold Loan",
    amount: 75000,
    status: "Loan Application Submitted",
    submittedAt: "2026-09-19T18:45:00.000Z",
  },
  {
    id: "loan-003",
    title: "Home Loan",
    amount: 250000,
    status: "Loan Application Submitted",
    submittedAt: "2026-09-20T12:15:00.000Z",
  },
];

const BottomTabNavigator = ({
  loanApplications,
  onLoanApplicationPress,
}) => {
  const navigation = useNavigation();

  const { isVisitor } = useUserRole();

  const applications =
    loanApplications?.length
      ? loanApplications
      : FAKE_LOAN_APPLICATIONS;

  return (
    <BottomTabHeightProvider>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarHideOnKeyboard
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,

          tabBarStyle: {
            backgroundColor: "transparent",
            borderTopWidth: 0,
            elevation: 0,
            shadowOpacity: 0,
            shadowColor: "transparent",
          },

          tabBarBackground: () => null,
        }}
        tabBar={props => (
          <FinsaarthiCustomTabBar
            {...props}
            loanApplications={applications}
            onLoanApplicationPress={
              onLoanApplicationPress ||
              (item => {
                    if(item?.title === "Personal Loan") {
                      navigation.navigate(
                        "step-2-apply-personal-loan"
                      );
                    } else if(item?.title === "Gold Loan") {
                      navigation.navigate(
                        "step-2-apply-gold-loan"
                      );
                    } 
                // navigation.navigate(
                //   "step-2-apply-personal-loan"
                // );
              })
            }
          />
        )}
      >
        {/* =================================================
            HOME
        ================================================= */}

        <Tab.Screen
          name="Home"
          component={
            isVisitor
              ? VisitorHomeScreen
              : HomeScreen
          }
        />

        {/* =================================================
            LOAN
        ================================================= */}

        {!isVisitor && (
          <Tab.Screen
            name="Loan"
            component={LoanScreen}
          />
        )}

        {/* =================================================
            HISTORY
        ================================================= */}

        <Tab.Screen
          name="History"
          component={
            isVisitor
              ? MyApplicationsScreen
              : MyLoanScreen
          }
        />

        {/* =================================================
            PROFILE
        ================================================= */}

        <Tab.Screen
          name="Profile"
          component={
            isVisitor
              ? VisitorProfileScreen
              : ProfileScreen
          }
        />
      </Tab.Navigator>
    </BottomTabHeightProvider>
  );
};

export default BottomTabNavigator;