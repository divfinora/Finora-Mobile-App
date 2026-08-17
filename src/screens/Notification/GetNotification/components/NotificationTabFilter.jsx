import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { theme } from "../../../../theme";

const NotificationTabFilter = ({
  activeTab,
  onSelectTab,
  unreadCount = 0,
}) => {
  const isAll = activeTab === "all";
  const isUnread = activeTab === "unread";

  return (
    <View
      style={{
        marginTop: -28,
        marginHorizontal: 34,

        height: 52,

        backgroundColor: "#FFFFFF",

        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,

        paddingHorizontal: 5,
        paddingTop: 5,

        zIndex: 20,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* ALL */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelectTab("all")}
          style={{
            flex: 1,
            height: 38,

            borderRadius: 22,

            alignItems: "center",
            justifyContent: "center",

            backgroundColor: isAll
              ? "#995C0C"
              : "transparent",
          }}
        >
          <Text
            style={{
              fontSize: 13,
              lineHeight: 17,

              fontFamily: theme.fonts.medium,

              color: isAll
                ? "#FFFFFF"
                : "#8991A2",
            }}
          >
            All
          </Text>
        </TouchableOpacity>

        {/* UNREAD */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onSelectTab("unread")}
          style={{
            flex: 1,
            height: 38,

            borderRadius: 22,

            alignItems: "center",
            justifyContent: "center",

            backgroundColor: isUnread
              ? "#995C0C"
              : "transparent",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 7,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                lineHeight: 17,

                fontFamily: theme.fonts.medium,

                color: isUnread
                  ? "#FFFFFF"
                  : "#8991A2",
              }}
            >
              Unread
            </Text>

            {unreadCount > 0 && (
              <View
                style={{
                  width: 19,
                  height: 19,

                  borderRadius: 10,

                  alignItems: "center",
                  justifyContent: "center",

                  backgroundColor: "#FCECD7",
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    lineHeight: 14,

                    fontFamily: theme.fonts.bold,

                    color: "#995C0C",
                  }}
                >
                  {unreadCount}
                </Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NotificationTabFilter;