import React, { memo } from "react";
import {
  View,
  Text,
} from "react-native";

import {
  WifiOff,
  ServerCrash,
} from "lucide-react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "../../../theme";
import CommonButton from "../../../components/common/Button/CommonButton";

const RetryScreen = ({
  error,
  onRetry,
  isRetrying = false,

  // Layout
  fullScreen = true,

  // Styles
  safeAreaStyle = {},
  wrapperStyle = {},
  cardStyle = {},
  iconContainerStyle = {},
  titleStyle = {},
  descriptionStyle = {},
  buttonContainerStyle = {},
}) => {

  const isOffline = error?.status === "FETCH_ERROR";

  const Icon = isOffline
    ? WifiOff
    : ServerCrash;

  const content = (

    <View
      style={[
        {
          flex: fullScreen ? 1 : 0,

          justifyContent: "center",

          alignItems: "center",

          paddingHorizontal: theme.spacing.xxxl,
        },

        wrapperStyle,

      ]}
    >

      <View
        style={[
          {
            width: "100%",

            backgroundColor: theme.colors.white,

            borderRadius: theme.radius.xl,

            paddingVertical: theme.spacing.massive,

            paddingHorizontal: theme.spacing.xxxl,

            alignItems: "center",

            ...theme.shadows.card,
          },

          cardStyle,

        ]}
      >

        {/* ICON */}

        <View
          style={[
            {
              width: 88,
              height: 88,

              borderRadius: 44,

              justifyContent: "center",
              alignItems: "center",

              backgroundColor: theme.colors.primary100,
            },

            iconContainerStyle,

          ]}
        >

          <Icon
            size={42}
            color={theme.colors.primary500}
            strokeWidth={2.2}
          />

        </View>

        {/* TITLE */}

        <Text
          style={[
            {
              marginTop: theme.spacing.xxl,

              color: theme.colors.text,

              fontSize: theme.typography.h2,

              fontFamily: theme.fonts.headingBold,

              textAlign: "center",
            },

            titleStyle,

          ]}
        >

          {
            isOffline
              ? "No Internet Connection"
              : "Something Went Wrong"
          }

        </Text>

        {/* DESCRIPTION */}

        <Text
          style={[
            {
              marginTop: theme.spacing.md,

              color: theme.colors.textSecondary,

              textAlign: "center",

              fontSize: theme.typography.b2,

              fontFamily: theme.fonts.regular,

              lineHeight: 22,
            },

            descriptionStyle,

          ]}
        >

          {
            isOffline
              ? "Please check your internet connection and try again."
              : "We're unable to connect to our servers right now. Please try again after a few moments."
          }

        </Text>

        {/* BUTTON */}

        <View
          style={[
            {
              width: "100%",
              marginTop: theme.spacing.massive,
            },

            buttonContainerStyle,

          ]}
        >

          <CommonButton
            title="Retry"
            loading={isRetrying}
            onPress={onRetry}
          />

        </View>

      </View>

      {

        __DEV__ && error && (

          <Text
            style={{
              marginTop: theme.spacing.xxl,

              color: theme.colors.gray500,

              fontSize: theme.typography.caption,

              textAlign: "center",
            }}
          >

            {JSON.stringify(error, null, 2)}

          </Text>

        )

      }

    </View>

  );

  if (!fullScreen) {
    return content;
  }

  return (

    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: theme.colors.background,
        },

        safeAreaStyle,

      ]}
    >

      {content}

    </SafeAreaView>

  );

};

export default memo(RetryScreen);