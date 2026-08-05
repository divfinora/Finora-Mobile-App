import React, { memo } from "react";
import {
  View,
  Text,
} from "react-native";

import {
  WifiOff,
  ServerCrash,
} from "lucide-react-native";

import { theme } from "../../../theme";
import CommonButton from "../../../components/common/Button/CommonButton";

const RetryScreen = ({
  onRetry,
  error,
  isRetrying = false,
}) => {

  const isOffline = error?.status === "FETCH_ERROR";

  const Icon = isOffline ? WifiOff : ServerCrash;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: theme.spacing.xxxl,
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          width: "100%",
          backgroundColor: theme.colors.white,
          borderRadius: theme.radius.xl,
          padding: theme.spacing.xxxl,
          alignItems: "center",

          ...theme.shadows.card,
        }}
      >

        {/* ICON */}

        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,

            backgroundColor: theme.colors.primary100,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon
            size={38}
            color={theme.colors.primary500}
            strokeWidth={2.2}
          />
        </View>

        {/* TITLE */}

        <Text
          style={{
            marginTop: theme.spacing.xl,

            fontSize: theme.typography.h3,

            fontFamily: theme.fonts.headingBold,

            color: theme.colors.text,
          }}
        >
          {isOffline
            ? "No Internet Connection"
            : "Something Went Wrong"}
        </Text>

        {/* DESCRIPTION */}

        <Text
          style={{
            marginTop: theme.spacing.md,

            textAlign: "center",

            color: theme.colors.textSecondary,

            fontSize: theme.typography.b2,

            fontFamily: theme.fonts.regular,

            lineHeight: 22,
          }}
        >
          {isOffline
            ? "Please check your internet connection and try again."
            : "We couldn't connect to our servers. Please try again after a few moments."}
        </Text>

        {/* BUTTON */}

        <View
          style={{
            width: "100%",
            marginTop: theme.spacing.xxxl,
          }}
        >
          <CommonButton
            title="Retry"
            loading={isRetrying}
            onPress={onRetry}
          />
        </View>

        {/* DEBUG */}

        {__DEV__ && error && (
          <Text
            style={{
              marginTop: theme.spacing.xl,

              fontSize: theme.typography.caption,

              color: theme.colors.gray500,

              textAlign: "center",
            }}
          >
            {JSON.stringify(error, null, 2)}
          </Text>
        )}

      </View>
    </View>
  );
};

export default memo(RetryScreen);