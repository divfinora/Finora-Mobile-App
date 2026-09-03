import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  FileWarning,
  Megaphone,
  XCircle,
  Trophy,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";

const getNotificationConfig = (
  notification
) => {
  const type =
    notification?.type ||
    "";

  const title =
    notification?.title ||
    "";

  const combined =
    `${type} ${title}`
      .toUpperCase();

  // ==========================================
  // ASSIGNMENT
  // ==========================================

  if (
    type === "LOAN" ||
    type === "KYC" ||
    combined.includes(
      "ASSIGN"
    )
  ) {
    return {
      icon: ClipboardList,
      iconColor: theme.colors.info,
      iconBackground:
        "#DCE8FF",
      borderColor:
        theme.colors.info,
      label: "ASSIGNMENT",
    };
  }

  // ==========================================
  // REMINDER
  // ==========================================

  if (
    type === "EMI_REMINDER" ||
    type === "PROMISE_REMINDER" ||
    type === "FOLLOWUP_REMINDER"
  ) {
    return {
      icon: Clock3,
      iconColor:
        theme.colors.warning,
      iconBackground:
        "#FFE2B5",
      borderColor:
        "#FFDDA8",
      label: "REMINDER",
    };
  }

  // ==========================================
  // LEGAL
  // ==========================================

  if (
    type === "LEGAL_NOTICE"
  ) {
    return {
      icon: FileWarning,
      iconColor:
        theme.colors.error,
      iconBackground:
        "#FFD8D8",
      borderColor:
        theme.colors.error,
      label: "LEGAL",
    };
  }

  // ==========================================
  // DEFAULT
  // ==========================================

  return {
    icon: Megaphone,
    iconColor:
      theme.colors.primary500,
    iconBackground:
      theme.colors.primary100,
    borderColor:
      theme.colors.primary300,
    label: "NOTIFICATION",
  };
};


// =====================================================
// TIME FORMAT
// =====================================================

const getFormattedTime = (
  dateString
) => {
  if (!dateString) {
    return "";
  }

  const date =
    new Date(dateString);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "";
  }

  const now =
    new Date();

  const diffMs =
    now.getTime() -
    date.getTime();

  const diffMinutes =
    Math.floor(
      diffMs /
        (1000 * 60)
    );

  if (diffMinutes < 1) {
    return "Just now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  const diffHours =
    Math.floor(
      diffMinutes / 60
    );

  if (diffHours < 24) {
    return `${diffHours} hour${
      diffHours > 1
        ? "s"
        : ""
    } ago`;
  }

  const diffDays =
    Math.floor(
      diffHours / 24
    );

  if (diffDays === 1) {
    return "Yesterday";
  }

  if (diffDays < 7) {
    return `${diffDays} days ago`;
  }

  return date.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "numeric",
    }
  );
};


// =====================================================
// CARD
// =====================================================

const VisitorNotificationCard = ({
  notification,
  onPress,
}) => {
  const config =
    getNotificationConfig(
      notification
    );

  const Icon =
    config.icon;

  return (
    <TouchableOpacity
      activeOpacity={0.82}
      onPress={() =>
        onPress?.(
          notification
        )
      }
      style={{
        borderRadius:
          theme.radius.lg,

        marginBottom:
          theme.spacing.md,

        backgroundColor:
          theme.colors.gray100,

        borderLeftWidth: 4,

        borderLeftColor:
          config.borderColor,

        padding:
          theme.spacing.lg,
      }}
    >
      <View
        style={{
          flexDirection:
            "row",

          alignItems:
            "flex-start",
        }}
      >
        {/* ICON */}

        <View
          style={{
            width: 48,
            height: 48,

            borderRadius:
              theme.radius.circle,

            alignItems:
              "center",

            justifyContent:
              "center",

            marginRight:
              theme.spacing.md,

            backgroundColor:
              config.iconBackground,
          }}
        >
          <Icon
            size={
              theme.iconSize.md
            }
            color={
              config.iconColor
            }
            strokeWidth={2}
          />
        </View>

        {/* CONTENT */}

        <View
          style={{
            flex: 1,
          }}
        >
          <View
            style={{
              flexDirection:
                "row",

              alignItems:
                "flex-start",
            }}
          >
            <Text
              style={{
                flex: 1,

                fontSize:
                  theme.typography.b2,

                lineHeight:
                  theme.lineHeight.b2,

                fontFamily:
                  theme.fonts.semiBold,

                color:
                  theme.colors.black,

                paddingRight:
                  theme.spacing.sm,
              }}
            >
              {notification?.title ||
                "Notification"}
            </Text>

            <Text
              style={{
                fontSize:
                  theme.typography.b3,

                lineHeight:
                  theme.lineHeight.b3,

                fontFamily:
                  theme.fonts.medium,

                color:
                  theme.colors.gray500,

                textAlign:
                  "right",
              }}
            >
              {getFormattedTime(
                notification?.createdAt
              )}
            </Text>
          </View>

          {/* MESSAGE */}

          <Text
            style={{
              marginTop:
                theme.spacing.xs,

              fontSize:
                theme.typography.b1,

              lineHeight:
                24,

              fontFamily:
                theme.fonts.regular,

              color:
                theme.colors.gray700,
            }}
          >
            {notification?.message ||
              ""}
          </Text>

          {/* TYPE */}

          <View
            style={{
              alignSelf:
                "flex-start",

              marginTop:
                theme.spacing.sm,

              paddingHorizontal:
                theme.spacing.sm,

              paddingVertical:
                theme.spacing.xs,

              borderRadius:
                theme.radius.pill,

              backgroundColor:
                theme.colors.gray200,
            }}
          >
            <Text
              style={{
                fontSize:
                  theme.typography.caption,

                lineHeight:
                  theme.lineHeight.caption,

                fontFamily:
                  theme.fonts.semiBold,

                color:
                  theme.colors.gray700,
              }}
            >
              {config.label}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default VisitorNotificationCard;