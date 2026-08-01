// src/components/common/verification/

// │── VerificationLayout.jsx      // Main Layout
// │── VerificationHeader.jsx      // Header
// │── VerificationHero.jsx        // Icon + Title + Subtitle
// │── VerificationInput.jsx       // Label + TextInput
// │── VerificationInfoCard.jsx    // Warning Card
// │── VerificationFooter.jsx      // Button



import React from "react";

import {
  View,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "../../../theme";

import VerificationHeader from "./VerificationHeader";
import VerificationHero from "./VerificationHero";
import VerificationInput from "./VerificationInput";
import VerificationInfoCard from "./VerificationInfoCard";
import VerificationFooter from "./VerificationFooter";

const VerificationLayout = ({
  // Header
  screenTitle = "Quick KYC",
  step = "Step 1 of 4",
  onBack,

  // Hero
  icon,
  title,
  subtitle,

  // Input
  inputLabel,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  maxLength,
  autoCapitalize = "none",

  // Info
  infoText,

  // Footer
  buttonText,
  loading,
  onSubmit,

  children,
}) => {
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

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: theme.spacing.xl,
            }}
          >
            <VerificationHeader
              title={screenTitle}
              step={step}
              onBack={onBack}
            />

            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: theme.spacing.screen,
        // backgroundColor: "red"
              }}
            >
              <VerificationHero
                icon={icon}
                title={title}
                subtitle={subtitle}
              />

              <VerificationInput
                label={inputLabel}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                maxLength={maxLength}
                autoCapitalize={autoCapitalize}
              />

              {!!infoText && (
                <VerificationInfoCard
                  text={infoText}
                />
              )}

              {children}
            </ScrollView>

            <VerificationFooter
              title={buttonText}
              loading={loading}
              onPress={onSubmit}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default VerificationLayout;