import React, {
  useEffect,
  useRef,
} from "react";

import {
  View,
  TextInput,
  Platform,
  useWindowDimensions,
} from "react-native";

import { theme } from "../../../../theme";

const OTPInput = ({
  length = 6,
  value = [],
  onChange,
  error = false,
  autoFocus = true,
}) => {

  const inputRefs = useRef([]);

  const {
    width,
  } = useWindowDimensions();

  const otpBoxSize = Math.min(
    60,
    (width - theme.spacing.massive - 30) / length
  );

  useEffect(() => {

    if (value.length !== length) {
      onChange(Array(length).fill(""));
    }

  }, []);

  useEffect(() => {

    if (!autoFocus) return;

    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 300);

    return () => clearTimeout(timer);

  }, []);

  const handleOtpChange = (
    text,
    index,
  ) => {

    const input = text.replace(/\D/g, "");

    // Paste Support
    if (input.length > 1) {

      const newOtp = [...value];

      input
        .slice(0, length)
        .split("")
        .forEach((digit, i) => {

          if (index + i < length) {
            newOtp[index + i] = digit;
          }

        });

      onChange(newOtp);

      const nextIndex = Math.min(
        index + input.length,
        length - 1,
      );

      inputRefs.current[nextIndex]?.focus();

      return;
    }

    const newOtp = [...value];

    newOtp[index] = input;

    onChange(newOtp);

    if (
      input &&
      index < length - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }

  };

  const handleBackspace = (
    e,
    index,
  ) => {

    if (
      e.nativeEvent.key !== "Backspace"
    )
      return;

    const newOtp = [...value];

    if (value[index]) {

      newOtp[index] = "";

      onChange(newOtp);

      return;
    }

    if (index > 0) {

      newOtp[index - 1] = "";

      onChange(newOtp);

      inputRefs.current[index - 1]?.focus();

    }

  };

  return (

    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        width: "100%",

        marginTop: theme.spacing.xxl,

        marginBottom: theme.spacing.xxl,
      }}
    >

      {value.map(
        (
          digit,
          index,
        ) => (

          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            value={digit}
            onChangeText={(text) =>
              handleOtpChange(
                text,
                index,
              )
            }
            onKeyPress={(e) =>
              handleBackspace(
                e,
                index,
              )
            }
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            autoComplete="sms-otp"
            importantForAutofill="yes"
            autoCorrect={false}
            contextMenuHidden={false}
            selectTextOnFocus
            maxLength={
              Platform.OS === "ios"
                ? length
                : 20
            }
            textAlign="center"
            style={{
              width: otpBoxSize,

              height: otpBoxSize,

              borderRadius:
                theme.radius.lg,

              borderWidth:
                theme.borderWidth?.thin ??
                1,

              borderColor:
                digit
                  ? theme.colors.primary500
                  : error
                  ? theme.colors.error
                  : theme.colors.gray200,

              backgroundColor:
                theme.colors.gray100,

              color:
                theme.colors.black,

              fontSize:
                otpBoxSize * 0.4,

              fontFamily:
                theme.fonts.bold,
            }}
          />

        )
      )}

    </View>

  );

};

export default OTPInput;