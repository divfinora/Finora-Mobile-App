import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Bell } from "lucide-react-native";
import { theme } from "../../../../theme";

const getFormattedTime = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diffMinutes = Math.floor((now - date) / (1000 * 60));

  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes} mins ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours} hrs ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "Yesterday";
  return `${diffDays} days ago`;
};

const NotificationCard = ({ notification, onItemPress }) => {
  const isUnread = !notification?.isRead && !notification?.read;

   console.log(notification ,"notificaton===")

  return (
    <TouchableOpacity
      style={{
        borderRadius: theme.radius.lg,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.md,
        backgroundColor: isUnread ? theme.colors.white : theme.colors.gray100,
        borderWidth: isUnread ? 1 : 0,
        borderColor: isUnread ? theme.colors.primary300 : theme.colors.transparent,
      }}
      onPress={() => onItemPress(notification)}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: theme.radius.circle,
            alignItems: "center",
            justifyContent: "center",
            marginRight: theme.spacing.md,
            backgroundColor: isUnread ? theme.colors.navy900 : theme.colors.primary100,
          }}
        >
          <Bell
            size={theme.iconSize.md}
            color={isUnread ? theme.colors.white : theme.colors.primary500}
            strokeWidth={2}
          />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: theme.typography.b1,
              fontFamily: theme.fonts.bold,
              color: theme.colors.black,
              marginBottom: theme.spacing.xs,
            }}
          >
            {notification?.title || "Notification"}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.b3,
              fontFamily: theme.fonts.regular,
              color: theme.colors.gray700,
              lineHeight: theme.lineHeight.b3,
              marginBottom: theme.spacing.sm,
            }}
            // numberOfLines={2}
          >
            {notification?.message || ""}
          </Text>
          <Text
            style={{
              fontSize: theme.typography.caption,
              fontFamily: theme.fonts.medium,
              color: theme.colors.gray500,
              alignSelf: "flex-end",
            }}
          >
            {getFormattedTime(notification?.createdAt)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;