import React from "react";

import {
  View,
  StatusBar,
  ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "../../theme";

// Components
import KYCHeader from "./components/KYCHeader";
import KYCHeroCard from "./components/KYCHeroCard.jsx";
import KYCSecurityCard from "./components/KYCSecurityCard"
import KYCStepList from "./components/KYCStepList.jsx";
import KYCFooter from "./components/KYCFooter.jsx";
import { useNavigation } from "@react-navigation/native";

const kycSteps = [
  {
    id: 1,
    type: "aadhaar",
    title: "Aadhaar Verification",
    subtitle: "Verify your Aadhaar",
    screen: "aadhaar-verification-enter-mobile-number-screen",
  },
  {
    id: 2,
    type: "pan",
    title: "PAN Verification",
    subtitle: "Verify your PAN",
    screen: "pan-verification-enter-mobile-number-screen",
  },
  {
    id: 3,
    type: "address",
    title: "Address Verification",
    subtitle: "Verify your Address",
    screen: "address-verification-screen",
  },
  {
    id: 4,
    type: "bank",
    title: "Bank Verification",
    subtitle: "Verify your Bank",
    screen: "bank-verification-screen",
  },
];

const CompleteKYCScreen = ({   }) => {
  const navigation = useNavigation();

  const onStepPress = (item) => {
    console.log(item.title);

    switch (item.type) {
      case "aadhaar":
        // navigation.navigate("AadhaarVerification");
        break;

      case "pan":
        // navigation.navigate("PanVerification");
        break;

      case "address":
        // navigation.navigate("PersonalDetails");
        break;

      case "bank":
        // navigation.navigate("BankAccount");
        break;

      default:
        break;
    }
  };

  const onStart = () => {
    onStepPress(steps[0]);
  };

  const onSkip = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
      }}
    >
      <StatusBar
        barStyle={theme.statusBar.dark}
        backgroundColor={theme.colors.white}
      />

      <View
        style={{
          flex: 1,
          paddingHorizontal: theme.spacing.xl,
        }}
      >
        <KYCHeader
          title="Complete KYC"
          onBack={() => navigation.goBack()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: theme.spacing.md,
            paddingBottom: theme.spacing.xxl,
          }}
        >
          <KYCHeroCard />

          <KYCSecurityCard />

          <KYCStepList
            data={kycSteps}
         onPress={(item) => {

    switch (item.type) {

      case "aadhaar":
        navigation.navigate("aadhaar-verification-enter-mobile-number-screen");
        break;

      case "pan":
        navigation.navigate("pan-verification-enter-mobile-number-screen");
        break;

      case "address":
        navigation.navigate("address-verification-screen");
        break;

      case "bank":
        navigation.navigate("bank-verification-screen");
        break;

      default:
        break;
    }

  }}
          />
        </ScrollView>

        <KYCFooter
          onContinue={onStart}
          onSkip={onSkip}
        />
      </View>
    </SafeAreaView>
  );
};

export default CompleteKYCScreen;