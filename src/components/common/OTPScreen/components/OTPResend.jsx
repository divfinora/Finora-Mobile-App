import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { theme } from "../../../../theme";

const OTPResend = ({
  timer = 0,

  onResend,

  disabled,

  resendText = "Resend OTP",

  timerPrefix = "OTP expires in",

  containerStyle,

  textStyle,

  timerStyle,
}) => {

  const isDisabled =
    disabled ?? timer > 0;

  const minutes = String(
    Math.floor(timer / 60)
  ).padStart(2, "0");

  const seconds = String(
    timer % 60
  ).padStart(2, "0");

  return (

    <View
      style={[
        {
          alignItems: "center",

          marginTop: theme.spacing.xxxl,
        },
        containerStyle,
      ]}
    >

      {isDisabled && (

        <>
          <Text
            style={[
              {
                fontSize: theme.typography.b3,

                fontFamily: theme.fonts.medium,

                color: theme.colors.textLight,
              },
              textStyle,
            ]}
          >
            {timerPrefix}
          </Text>

          <Text
            style={[
              {
                marginTop: 4,

                fontSize: theme.typography.b1,

                fontFamily: theme.fonts.bold,

                color: theme.colors.primary500,
              },
              timerStyle,
            ]}
          >
            {minutes}:{seconds}
          </Text>
        </>

      )}

      <TouchableOpacity
        activeOpacity={0.8}
        disabled={isDisabled}
        onPress={onResend}
        style={{
          marginTop: theme.spacing.xxl,
        }}
      >
        <Text
          style={{
            fontSize: theme.typography.b1,

            fontFamily: theme.fonts.medium,

            color: isDisabled
              ? theme.colors.black
              : theme.colors.primary500,
          }}
        >
          {resendText}
        </Text>
      </TouchableOpacity>

    </View>

  );

};

export default OTPResend;