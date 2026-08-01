import React from "react";

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import { theme } from "../../../theme";

import OTPHeader from "./components/OTPHeader";
import OTPIllustration from "./components/OTPIllustration";
import OTPInfo from "./components/OTPInfo";
import OTPInput from "./components/OTPInput";
import OTPError from "./components/OTPError";
import OTPResend from "./components/OTPResend";
import OTPFooter from "./components/OTPFooter";

const EnterOtpScreen = ({
  title,

  subtitle,

  phone,

  image,

  otp,

  otpLength = 4,

  error,

  loading = false,

  buttonTitle = "Verify",

  seconds = 0,

  onOtpChange,

  onVerify,

  onResend,

  onBack,
}) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
      }}
    >
      <StatusBar
        backgroundColor={theme.colors.white}
        barStyle={theme.statusBar.dark}
      />

      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: theme.spacing.xl,
            paddingBottom: theme.spacing.xxxl,
          }}
        >
          <OTPHeader
            title={title}
            onBack={onBack}
          />

          <OTPIllustration
            source={image}
          />

          <OTPInfo
            title="Enter OTP"
            subtitle={subtitle}
            phone={phone}
          />

          <OTPInput
            value={otp}
            length={otpLength}
            onChange={onOtpChange}
            error={!!error}
          />

          {!!error && (
            <OTPError
              message={error}
            />
          )}

          <OTPFooter
            title={buttonTitle}
            loading={loading}
            disabled={
              otp.join("").length !== otpLength
            }
            onPress={onVerify}
          />

          <OTPResend
            seconds={seconds}
            onPress={onResend}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EnterOtpScreen;