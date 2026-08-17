import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import BackButton from "../../../../components/common/BackButton/BackButton.jsx";
import { theme } from "../../../../theme/index.js";

const NotificationHeader = ({ unreadCount = 0, onMarkAllRead, isMarkingAll = false }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: theme.spacing.xxl,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.md,
      }}
    >
      <BackButton title="Notification" />

      {unreadCount > 0 && (
        <TouchableOpacity
          onPress={onMarkAllRead}
          disabled={isMarkingAll}
          activeOpacity={0.7}
        >
          {isMarkingAll ? (
            <ActivityIndicator size="small" color={theme.colors.primary700} />
          ) : (
            <Text
              style={{
                fontSize: theme.typography.b3,
                fontFamily: theme.fonts.semiBold,
                color: theme.colors.primary700,
              }}
            >
              Mark all as read
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default NotificationHeader;