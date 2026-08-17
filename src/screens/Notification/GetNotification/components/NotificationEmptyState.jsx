import React from "react";
import { View, Text } from "react-native";
import { BellOff } from "lucide-react-native";
import { theme } from "../../../../theme/index.js";

const NotificationEmptyState = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingTop: theme.spacing.screen,
        paddingHorizontal: theme.spacing.xxxl,
      }}
    >
      <View
        style={{
          width: 84,
          height: 84,
          borderRadius: theme.radius.circle,
          backgroundColor: theme.colors.primary100,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: theme.spacing.xl,
        }}
      >
        <BellOff size={theme.iconSize.xl} color={theme.colors.primary700} />
      </View>
      <Text
        style={{
          fontSize: theme.typography.h3,
          fontFamily: theme.fonts.bold,
          color: theme.colors.gray900,
          marginBottom: theme.spacing.sm,
          textAlign: "center",
        }}
      >
        No Notifications
      </Text>
      <Text
        style={{
          fontSize: theme.typography.b2,
          fontFamily: theme.fonts.regular,
          color: theme.colors.gray500,
          textAlign: "center",
          lineHeight: theme.lineHeight.b2,
        }}
      >
        You're all caught up!{"\n"}We'll notify you when there's an update
      </Text>
    </View>
  );
};

export default NotificationEmptyState;