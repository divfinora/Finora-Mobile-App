import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { theme } from "../../../theme";

const CommonInput = ({
  label,
  placeholder,
  value,
  onChangeText,

  error,

  required = false,

  editable = true,

  keyboardType = "default",

  autoCapitalize = "none",

  autoCorrect = false,

  secureTextEntry = false,

  multiline = false,

  numberOfLines = 1,

  maxLength,

  returnKeyType = "done",

  onSubmitEditing,

  onFocus,

  onBlur,

  leftIcon,

  rightIcon,

  onRightIconPress,

  containerStyle,

  labelStyle,

  inputContainerStyle,

  inputStyle,

  errorStyle,
}) => {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? theme.colors.error
    : focused
      ? theme.colors.primary500
      : "transparent";

  return (
    <View
      style={[
        {
          marginBottom: theme.spacing.xl,
        },
        containerStyle,
      ]}
    >
      {!!label && (
        <Text
          style={[
            {
              marginBottom: theme.spacing.sm,

              color: theme.colors.gray700,

              fontSize: 15,

              fontFamily: theme.fonts.medium,
            },
            labelStyle,
          ]}
        >
          {label}

          {required && (
            <Text
              style={{
                color: theme.colors.error,
              }}
            >
              {" "}*
            </Text>
          )}
        </Text>
      )}

      <View
        style={[
          {
            minHeight: 56,

            flexDirection: "row",

            alignItems: "center",

            backgroundColor: "#F5F5F7",

            borderRadius: 16,

           

            borderColor,

            paddingHorizontal: 16,
          },
          inputContainerStyle,
        ]}
      >
        {!!leftIcon && (
          <View
            style={{
              marginRight: 12,
            }}
          >
            {leftIcon}
          </View>
        )}

        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#8E8E93"
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          secureTextEntry={secureTextEntry}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          style={[
            {
              flex: 1,

              minHeight: 56,

              color: theme.colors.black,

              fontSize: 16,

              fontFamily: theme.fonts.medium,

              paddingVertical: 0,
            },
            inputStyle,
          ]}
        />

        {!!rightIcon && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onRightIconPress}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>

      {!!error && (
        <Text
          style={[
            {
              marginTop: theme.spacing.sm,

              color: theme.colors.error,

              fontSize: 12,

              fontFamily: theme.fonts.medium,
            },
            errorStyle,
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default CommonInput;