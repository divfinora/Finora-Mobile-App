import React from "react";

import {
  View,
  Text,
} from "react-native";

import {
  BellOff,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";

const VisitorNotificationEmptyState = ({
  activeFilter,
}) => {

  const title =
    activeFilter ===
    "ASSIGNMENT"
      ? "No Assignments"
      : activeFilter ===
        "REMINDER"
        ? "No Reminders"
        : "No Notifications";

  const description =
    activeFilter ===
    "ASSIGNMENT"
      ? "You don't have any assignment notifications yet."
      : activeFilter ===
        "REMINDER"
        ? "You don't have any reminder notifications yet."
        : "We'll notify you when there's an update.";

  return (
    <View
      style={{
        flex: 1,

        alignItems:
          "center",

        justifyContent:
          "center",

        paddingHorizontal:
          theme.spacing.xxxl,

        paddingBottom:
          theme.spacing.massive,
      }}
    >
      <View
        style={{
          width: 80,
          height: 80,

          borderRadius:
            theme.radius.circle,

          alignItems:
            "center",

          justifyContent:
            "center",

          backgroundColor:
            theme.colors.primary100,
        }}
      >
        <BellOff
          size={
            theme.iconSize.xxl
          }
          color={
            theme.colors.primary500
          }
          strokeWidth={1.8}
        />
      </View>

      <Text
        style={{
          marginTop:
            theme.spacing.xxl,

          fontSize:
            theme.typography.h3,

          lineHeight:
            theme.lineHeight.h3,

          fontFamily:
            theme.fonts.headingSemiBold,

          color:
            theme.colors.gray900,

          textAlign:
            "center",
        }}
      >
        {title}
      </Text>

      <Text
        style={{
          marginTop:
            theme.spacing.sm,

          fontSize:
            theme.typography.b2,

          lineHeight:
            22,

          fontFamily:
            theme.fonts.regular,

          color:
            theme.colors.gray500,

          textAlign:
            "center",
        }}
      >
        {description}
      </Text>
    </View>
  );
};

export default VisitorNotificationEmptyState;