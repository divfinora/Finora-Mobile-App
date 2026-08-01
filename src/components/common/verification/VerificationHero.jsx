import React from "react";

import {
  View,
  Text,
} from "react-native";

import { theme } from "../../../theme";

const VerificationHero = ({
  icon,
  title,
  subtitle,
}) => {
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
          width: 84,

          height: 84,

          borderRadius: 42,

          backgroundColor: theme.colors.primary100,

          justifyContent: "center",

          alignItems: "center",

          marginBottom: theme.spacing.xl,
        }}
      >
        {icon}
      </View>

      {/* Title */}

      <Text
        style={{
          color: theme.colors.black,

          fontSize: theme.typography.h2,

          lineHeight: theme.lineHeight.h3,

          fontFamily: theme.fonts.headingBold,

          textAlign: "center",
        }}
      >
        {title}
      </Text>

      {/* Subtitle */}

      <Text
        style={{
           
          marginTop: theme.spacing.sm,

          color: theme.colors.textSecondary,

          fontSize: theme.typography.b2,

          lineHeight: 22,

          fontFamily: theme.fonts.regular,

          textAlign: "center",

          paddingHorizontal: theme.spacing.md,
        }}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default VerificationHero;