import React from "react";
import {
  View,
  Text,
} from "react-native";
import { BellOff } from "lucide-react-native";

import { theme } from "../../../../theme";

const NotificationEmptyState = ({
  isUnread = false,
}) => {
  return (
    <View
      style={{
        flex: 1,

        alignItems: "center",
        justifyContent: "center",

        paddingHorizontal: 30,

        paddingBottom: 80,
      }}
    >
      {/* =========================================
          ICON
      ========================================= */}

      <View
        style={{
          width: 80,
          height: 80,

          borderRadius: 40,

          alignItems: "center",
          justifyContent: "center",

          backgroundColor: "#FFF0E4",
        }}
      >
        <BellOff
          size={38}
          color="#FF671D"
          strokeWidth={1.8}
        />
      </View>

      {/* =========================================
          TITLE
      ========================================= */}

      <Text
        style={{
          marginTop: 34,

          fontSize: 20,
          lineHeight: 26,

          fontFamily:
            theme.fonts.headingSemiBold,

          color: "#252B3A",

          textAlign: "center",
        }}
      >
        {isUnread
          ? "No Unread Notifications"
          : "No Notifications"}
      </Text>

      {/* =========================================
          DESCRIPTION
      ========================================= */}

      {isUnread ? (
        <Text
          style={{
            marginTop: 12,

            fontSize: 14,
            lineHeight: 22,

            fontFamily:
              theme.fonts.regular,

            color: "#7A8194",

            textAlign: "center",
          }}
        >
          You're all caught up!
        </Text>
      ) : (
        <View
          style={{
            marginTop: 12,

            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              lineHeight: 22,

              fontFamily:
                theme.fonts.regular,

              color: "#7A8194",

              textAlign: "center",
            }}
          >
            You're all caught up!
          </Text>

          <Text
            style={{
              fontSize: 14,
              lineHeight: 22,

              fontFamily:
                theme.fonts.regular,

              color: "#7A8194",

              textAlign: "center",
            }}
          >
            We'll notify you when there's an update
          </Text>
        </View>
      )}
    </View>
  );
};

export default NotificationEmptyState;