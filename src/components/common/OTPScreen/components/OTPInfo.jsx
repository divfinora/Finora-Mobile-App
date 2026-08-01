import React from "react";

import {
  View,
  Text,
} from "react-native";

import { theme } from "../../../../theme";

const OTPInfo = ({
  title = "Enter OTP",

  subtitle = "A verification code has been sent to",

  phone,

  countryCode = "+91",

  containerStyle,

  titleStyle,

  subtitleStyle,

  phoneStyle,
}) => {
  return (
    <View
      style={[
        {
          alignItems: "center",

          marginBottom: theme.spacing.xxxl,
        },
        containerStyle,
      ]}
    >
      {/* Title */}

      {!!title && (
        <Text
          style={[
            {
              color: theme.colors.black,

              fontSize: theme.typography.displayMD,

              lineHeight: theme.lineHeight.displayMD,

              fontFamily: theme.fonts.headingBold,

              textAlign: "center",
            },
            titleStyle,
          ]}
        >
          {title}
        </Text>
      )}

      {/* Subtitle */}

      {!!subtitle && (
        <Text
          style={[
            {
              marginTop: theme.spacing.sm,

              color: theme.colors.textSecondary,

              fontSize: theme.typography.b1,

              lineHeight: theme.lineHeight.b1,

              fontFamily: theme.fonts.medium,

              textAlign: "center",

              paddingHorizontal: theme.spacing.md,
            },
            subtitleStyle,
          ]}
        >
          {subtitle}
        </Text>
      )}

      {/* Phone */}

      {!!phone && (
        <Text
          style={[
            {
              marginTop: theme.spacing.xs,

              color: theme.colors.black,

              fontSize: theme.typography.b1,

              lineHeight: theme.lineHeight.b1,

              fontFamily: theme.fonts.bold,

              textAlign: "center",
            },
            phoneStyle,
          ]}
        >
          {countryCode} {phone}
        </Text>
      )}
    </View>
  );
};

export default OTPInfo;