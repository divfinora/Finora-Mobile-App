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
import ProfilePersonalInfoScreen from "../screens/Profile/PersonalInfoScreen/PersonalInfoScreen";
import KycDetailsScreen from "../screens/Profile/KycDetails/KycDetailsScreen";
import CompleteKYCScreen from '../screens/CompleteKYCScreen/CompleteKYCScreen'
import InstantLoanApplyScreen from '../screens/Loan/LoanApply/InstantLoanApply/InstantLoanApplyScreen'
import PropertyLoanApplyScreen from '../../src/screens/Loan/LoanApply/PropertyLoan/PropertyLoanApplyScreen'
import PersonalLoanScreen from '../../src/screens/Loan/LoanApply/PersonalLoan/PersonalLoan'
import ApplyGoldLoan from '../screens/Loan/LoanApply/GoldLoan/ApplyGoldLoan.jsx'
import ApplyCommercialLoan from '../screens/Loan/LoanApply/CommercialLoan/ApplyCommercialLoan.jsx'
import ApplyVehicleLoan from '../screens/Loan/LoanApply/VehicleLoan/ApplyVehicleLoan.jsx'
import ApplyAgricultureLoan from '../screens/Loan/LoanApply/AgricultureLoan/ApplyAgricultureLoan.jsx'
import ApplyRenovationLoan from '../screens/Loan/LoanApply/RenovationLoan/ApplyRenovationLoan.jsx'
import SingleLoanDetailsScreen from '../screens/GetLoan/SingleLoanDetails/SingleLoanDetailsScreen.jsx'
import NotificationPreferencesScreen from '../screens/Notification/NotificationPreferencesScreen/NotificationPreferencesScreen.jsx'
import GetNotificationScreen from '../screens/Notification/GetNotification/GetNotificationScreen.jsx';
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
      {/* Profile  SCREENS  Route */}
      {/* ========================= */}
      <Stack.Screen
        name="profile-screen-personal-info-screen"
        component={ProfilePersonalInfoScreen

        }
      />
      <Stack.Screen
        name="profile-screen-kyc-details"
        component={KycDetailsScreen

        }
      />
      <Stack.Screen
        name="complete-kyc-screen"
        component={CompleteKYCScreen

        }
      />

      <Stack.Screen
        name="apply-instant-loan"
        component={InstantLoanApplyScreen

        }
      />
      <Stack.Screen
        name="apply-property-loan"
        component={PropertyLoanApplyScreen
        }
      />
      <Stack.Screen
        name="apply-personal-loan"
        component={PersonalLoanScreen
        }
      />
      <Stack.Screen
        name="apply-gold-loan"
        component={ApplyGoldLoan}
      />
      <Stack.Screen
        name="apply-commercial-loan"
        component={ApplyCommercialLoan}
      />
      <Stack.Screen
        name="apply-vechicle-loan"
        component={ApplyVehicleLoan}
      />
      <Stack.Screen
        name="apply-agriculture-loan"
        component={ApplyAgricultureLoan}
      />

      <Stack.Screen
        name="apply-renovation-loan"
        component={ApplyRenovationLoan}
      />
      <Stack.Screen
        name="get-single-loan-detail"
        component={SingleLoanDetailsScreen}
      />
      <Stack.Screen
        name="notification-preferences-screen"
        component={NotificationPreferencesScreen}
      />

      <Stack.Screen
        name="get-notification-screen"
        component={GetNotificationScreen}
      />

    </Stack.Navigator>
  );
};

export default AppStack;