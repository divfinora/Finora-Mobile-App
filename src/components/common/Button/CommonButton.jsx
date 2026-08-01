import React from "react";

import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
} from "react-native";

import { theme } from "../../../theme";

const CommonButton = ({
  title,

  onPress,

  loading = false,

  disabled = false,

  variant = "primary",

  leftIcon,

  rightIcon,

  fullWidth = true,

  activeOpacity = 0.9,

  containerStyle,

  textStyle,

  loaderColor,

}) => {

  const isDisabled = disabled || loading;

  const getButtonStyle = () => {

    switch (variant) {

      case "secondary":
        return {
          backgroundColor: theme.button.secondary.backgroundColor,
          borderColor: theme.button.secondary.borderColor,
          borderWidth: 1,
        };

      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: theme.colors.primary500,
          borderWidth: 1,
        };

      case "text":
        return {
          backgroundColor: "transparent",
          borderWidth: 0,
        };

      default:
        return {
          backgroundColor: isDisabled
            ? theme.button.disabled.backgroundColor
            : theme.button.primary.backgroundColor,

          borderColor: isDisabled
            ? theme.button.disabled.borderColor
            : theme.button.primary.borderColor,

          borderWidth: 0,
        };
    }

  };

  const getTextColor = () => {

    switch (variant) {

      case "secondary":
        return theme.button.secondary.textColor;

      case "outline":
        return theme.colors.primary500;

      case "text":
        return theme.colors.primary500;

      default:
        return isDisabled
          ? theme.button.disabled.textColor
          : theme.button.primary.textColor;
    }

  };

  return (

    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={isDisabled}
      onPress={onPress}
      style={[
        {
          height: theme.button.height,

          width: fullWidth
            ? "100%"
            : undefined,

          borderRadius: theme.button.borderRadius,

          justifyContent: "center",

          alignItems: "center",

          flexDirection: "row",

          ...getButtonStyle(),
        },
        containerStyle,
      ]}
    >

      {loading ? (

        <>
          <ActivityIndicator
            size={theme.button.loaderSize}
            color={
              loaderColor ||
              getTextColor()
            }
          />

          <Text
            style={{
              marginLeft: 10,

              fontSize: theme.button.fontSize,

              fontFamily: theme.fonts.semiBold,

              color: getTextColor(),
            }}
          >
            {title || "Loading..."}
          </Text>
        </>

      ) : (

        <>
          {!!leftIcon && (
            <View
              style={{
                marginRight: 8,
              }}
            >
              {leftIcon}
            </View>
          )}

          <Text
            style={[
              {
                fontSize: theme.button.fontSize,

                fontFamily: theme.fonts.semiBold,

                color: getTextColor(),
              },
              textStyle,
            ]}
          >
            {title}
          </Text>

          {!!rightIcon && (
            <View
              style={{
                marginLeft: 8,
              }}
            >
              {rightIcon}
            </View>
          )}
        </>

      )}

    </TouchableOpacity>

  );

};

export default CommonButton;