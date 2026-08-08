import React, { memo } from "react";
import {
  View,
  Text,
} from "react-native";

import { RotateCw } from "lucide-react-native";

import { theme } from "../../../theme";
import CommonButton from "../../../components/common/Button/CommonButton";

const InlineRetry = ({
  title = "Unable to load data",
  description = "Something went wrong. Please try again.",
  buttonText = "Retry",

  loading = false,
  onRetry,

  // Container
  containerStyle = {},

  // Icon
  showIcon = true,
  icon = RotateCw,
  iconSize = 22,
  iconColor = theme.colors.primary500,
  iconContainerStyle = {},

  // Title
  titleStyle = {},

  // Description
  descriptionStyle = {},

  // Button
  buttonContainerStyle = {},

}) => {

  const Icon = icon;

  return (

    <View
      style={[
        {
          width: "100%",

          backgroundColor: theme.colors.white,

          borderRadius: theme.radius.lg,

          borderWidth: 1,
          borderColor: theme.colors.gray200,

          paddingVertical: theme.spacing.xxl,
          paddingHorizontal: theme.spacing.xl,

          alignItems: "center",

          ...theme.shadows.card,
        },

        containerStyle,

      ]}
    >

      {/* ICON */}

      {
        showIcon && (

          <View
            style={[
              {
                width: 48,
                height: 48,

                borderRadius: 24,

                justifyContent: "center",
                alignItems: "center",

                backgroundColor: theme.colors.primary100,
              },

              iconContainerStyle,

            ]}
          >

            <Icon
              size={iconSize}
              color={iconColor}
              strokeWidth={2.2}
            />

          </View>

        )
      }

      {/* TITLE */}

      <Text
        style={[
          {
            marginTop: theme.spacing.lg,

            color: theme.colors.text,

            fontSize: theme.typography.h4,

            fontFamily: theme.fonts.headingSemiBold,

            textAlign: "center",
          },

          titleStyle,

        ]}
      >
        {title}
      </Text>

      {/* DESCRIPTION */}

      <Text
        style={[
          {
            marginTop: theme.spacing.sm,

            color: theme.colors.textSecondary,

            fontSize: theme.typography.b3,

            fontFamily: theme.fonts.regular,

            textAlign: "center",

            lineHeight: 18,
          },

          descriptionStyle,

        ]}
      >
        {description}
      </Text>

      {/* BUTTON */}

      <View
        style={[
          {
            width: 150,
            marginTop: theme.spacing.xl,
          },

          buttonContainerStyle,

        ]}
      >

        <CommonButton
          title={buttonText}
          loading={loading}
          onPress={onRetry}
        />

      </View>

    </View>

  );

};

export default memo(InlineRetry);