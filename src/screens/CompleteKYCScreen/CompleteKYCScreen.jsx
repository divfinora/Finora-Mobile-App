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

const steps = [
  {
    id: 1,
    type: "aadhaar",
    title: "Aadhaar Verification",
    subtitle: "Verify with OTP, no card needed",
  },
  {
    id: 2,
    type: "pan",
    title: "PAN Card",
    subtitle: "Just enter your number",
  },
  {
    id: 3,
    type: "address",
    title: "Personal & Address Details",
    subtitle: "Auto-filled from Aadhaar",
  },
  {
    id: 4,
    type: "bank",
    title: "Link your Bank Account",
    subtitle: "Choose any bank",
  },
];

const CompleteKYCScreen = ({ navigation }) => {
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
            data={steps}
            onPress={onStepPress}
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