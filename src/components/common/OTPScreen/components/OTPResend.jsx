import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { theme } from "../../../../theme/index";

const OTPResend = ({
  timer = 30,
  onResend,
  disabled = true,
}) => {

  return (
    <View
      style={{
        alignItems: "center",
        marginTop: theme.spacing.xl,
      }}
    >
      {disabled ? (

        <Text
          style={{
            color: theme.colors.textSecondary,
            fontSize: theme.typography.b2,
            fontFamily: theme.fonts.regular,
          }}
        >
          Resend OTP in{" "}
          <Text
            style={{
              color: theme.colors.primary500,
              fontFamily: theme.fonts.semiBold,
            }}
          >
            {timer}s
          </Text>
        </Text>

      ) : (

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onResend}
        >
          <Text
            style={{
              color: theme.colors.primary500,
              fontSize: theme.typography.b2,
              fontFamily: theme.fonts.semiBold,
            }}
          >
            Resend OTP
          </Text>
        </TouchableOpacity>

      )}
    </View>
  );

};

export default OTPResend;