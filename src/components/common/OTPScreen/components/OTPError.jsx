import React from "react";

import {
  View,
  Text,
} from "react-native";

import { theme } from "../../../../theme";

const OTPError = ({
  message,
  style,
}) => {
  if (!message) return null;

  return (
    <View
      style={[
        {
          alignItems: "center",
          marginTop: theme.spacing.md,
          marginBottom: theme.spacing.lg,
        },
        style,
      ]}
    >
      <Text
        style={{
          color: theme.colors.error,

          fontSize: theme.typography.b2,

          lineHeight: theme.lineHeight.b2,

          fontFamily: theme.fonts.medium,

          textAlign: "center",
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default OTPError;