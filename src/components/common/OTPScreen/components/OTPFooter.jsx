import React from "react";

import {
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

import { theme } from "../../../../theme/index";

import OTPResend from "./OTPResend";

const OTPFooter = ({
  buttonText = "Verify OTP",

  loading = false,

  disabled = false,

  onPress,

  timer = 30,

  onResend,
}) => {

  const isDisabled = loading || disabled;

  return (

    <View
      style={{
        backgroundColor: theme.colors.white,

        paddingTop: theme.spacing.lg,

        paddingBottom: theme.spacing.xl,
      }}
    >

      <TouchableOpacity
        activeOpacity={0.8}
        disabled={isDisabled}
        onPress={onPress}
        style={{
          height: theme.button?.large?.height,

          borderRadius: theme.button?.large?.radius,

          justifyContent: "center",

          alignItems: "center",

          backgroundColor: isDisabled
            ? theme.colors.gray300
            : theme.colors.primary500,
        }}
      >

        {loading ? (

          <ActivityIndicator
            color={theme.colors.white}
          />

        ) : (

          <Text
            style={{
              color: theme.colors.white,

              fontSize: theme.typography.button,

              lineHeight: theme.lineHeight.button,

              fontFamily: theme.fonts.semiBold,
            }}
          >
            {buttonText}
          </Text>

        )}

      </TouchableOpacity>

      <OTPResend
        timer={timer}
        disabled={timer > 0}
        onResend={onResend}
      />

    </View>

  );

};

export default OTPFooter;