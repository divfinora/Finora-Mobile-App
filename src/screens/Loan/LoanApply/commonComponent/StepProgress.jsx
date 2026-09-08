// components/StepProgress.jsx

import React from "react";
import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { theme } from "../../../../theme";

const StepProgress = ({
  currentStep,
  totalSteps,
  progress,
  heading,
}) => {
  return (
    <View
      style={{
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.lg,
      }}
    >
      {/* Optional Heading */}
      {heading ? (
        <Text
          style={{
            fontSize: theme.typography.h4,
            fontFamily: theme.fonts.headingBold,
            color: theme.colors.navy900,
            marginBottom: theme.spacing.sm,
          }}
        >
          {heading}
        </Text>
      ) : null}

      {/* Step + Percentage */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: theme.spacing,
        }}
      >
        <Text
          style={{
            fontSize: theme.typography.b2,
            fontFamily: theme.fonts.medium,
            color: theme.colors.gray700,
            letterSpacing: 0.3,
            marginBottom:8
          }}
        >
          Step {currentStep} of {totalSteps}
        </Text>

        <Text
          style={{
            fontSize: theme.typography.b2,
            fontFamily: theme.fonts.semiBold,
            color: "#0F172A",
            letterSpacing: 0.3,
          }}
        >
          {progress}%
        </Text>
      </View>

      {/* Progress Bar */}
      <View
        style={{
          height: 6,
          backgroundColor: theme.colors.gray200,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <LinearGradient
          colors={["#FBA250", "#26B35B"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            width: `${progress}%`,
            height: 6,
            borderRadius: 3,
          }}
        />
      </View>
    </View>
  );
};

export default StepProgress;