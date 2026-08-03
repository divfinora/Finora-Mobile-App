import React, { useState } from "react";

import {
  CreditCard,
} from "lucide-react-native";

import VerificationLayout from "../../../components/common/verification/VerificationLayout";

import { theme } from "../../../theme/index";

const PanVerificationScreen = ({
  navigation,
}) => {

  const [pan, setPan] = useState("");

  const handleVerifyPAN = () => {

    if (pan.length !== 10) {
      return;
    }

    navigation.navigate("pan-verification-enter-otp-screen");
  };

  const handleChangePAN = (text) => {

    const formatted = text
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");

    setPan(formatted);
  };

  return (

    <VerificationLayout

      screenTitle="Quick KYC"

      step="Step 2 of 4"

      onBack={() => navigation.goBack()}

      icon={
        <CreditCard
          size={42}
          color={theme.colors.primary500}
        />
      }

      title="PAN Verification"

      subtitle="Enter your 10-digit PAN number"

      inputLabel="PAN Number"

      placeholder="ABCDE1234F"

      value={pan}

      onChangeText={handleChangePAN}

      autoCapitalize="characters"

      maxLength={10}

      infoText="Mandatory under PMLA for opening financial accounts and processing loans."

      buttonText="Continue"

      disabled={pan.length !== 10}

      onSubmit={handleVerifyPAN}

    />

  );
};

export default PanVerificationScreen;