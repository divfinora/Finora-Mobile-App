import React, { useEffect, useRef, useState } from "react";

import {
  View,
  TextInput,
} from "react-native";

import { theme } from "../../../../theme";

const OTPInput = ({
  length = 4,
  value = [],
  onChange,
  error = false,
}) => {
  const inputRefs = useRef([]);

  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    if (value.length !== length) {
      onChange(Array(length).fill(""));
    }
  }, []);

  const handleChange = (text, index) => {
    // Paste Support
    if (text.length > 1) {
      const pasted = text
        .slice(0, length)
        .split("");

      const otp = [...Array(length)].map(
        (_, i) => pasted[i] || ""
      );

      onChange(otp);

      const next =
        pasted.length >= length
          ? length - 1
          : pasted.length;

      inputRefs.current[next]?.focus();

      return;
    }

    const otp = [...value];

    otp[index] = text;

    onChange(otp);

    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = ({
    nativeEvent,
  }, index) => {
    if (
      nativeEvent.key === "Backspace" &&
      !value[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: theme.spacing.xxl,
      }}
    >
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) =>
            (inputRefs.current[index] = ref)
          }
          value={value[index]}
          keyboardType="number-pad"
          maxLength={length}
          textAlign="center"
          autoFocus={index === 0}
          onFocus={() =>
            setFocusedIndex(index)
          }
          onBlur={() =>
            setFocusedIndex(-1)
          }
          onChangeText={(text) =>
            handleChange(text, index)
          }
          onKeyPress={(e) =>
            handleBackspace(e, index)
          }
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          importantForAutofill="yes"
          style={{
            width: 58,
            height: 58,

            borderRadius: theme.radius.lg,

            borderWidth: 1.5,

            borderColor: error
              ? theme.colors.error
              : focusedIndex === index
              ? theme.colors.primary
              : theme.colors.border,

            backgroundColor:
              theme.colors.inputBackground,

            color: theme.colors.black,

            fontSize: theme.typography.h3,

            fontFamily: theme.fonts.headingBold,
          }}
        />
      ))}
    </View>
  );
};

export default OTPInput;