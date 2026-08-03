import React from "react";

import {
  View,
  Text,
} from "react-native";

import {
  Landmark,
} from "lucide-react-native";

import { theme } from "../../../../theme";

const HeroSection = () => {
  return (
    <View
      style={{
        alignItems: "center",

        marginTop: theme.spacing.lg,

        marginBottom: theme.spacing.xxxl,
      }}
    >
      {/* Icon */}

      <View
        style={{
          width: 92,
          height: 92,

          borderRadius: 46,

          justifyContent: "center",
          alignItems: "center",

          backgroundColor: theme.colors.primary100,
        }}
      >
        <Landmark
          size={42}
          color={theme.colors.primary700}
          strokeWidth={2}
        />
      </View>

      {/* Title */}

      <Text
        style={{
          marginTop: theme.spacing.xxl,

          color: theme.colors.black,

          fontSize: theme.typography.h2,

          lineHeight: theme.lineHeight.h3,

          fontFamily: theme.fonts.headingBold,

          textAlign: "center",
        }}
      >
        Link Bank Account
      </Text>

      {/* Subtitle */}

      <Text
        style={{
          marginTop: theme.spacing.sm,

          color: theme.colors.textSecondary,

          fontSize: theme.typography.b1,

          lineHeight: 22,

          fontFamily: theme.fonts.regular,

          textAlign: "center",

          paddingHorizontal: theme.spacing.md,
        }}
      >
        Link your account for smooth and secure payments
      </Text>
    </View>
  );
};

export default HeroSection;