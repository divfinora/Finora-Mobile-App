import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { ArrowLeft } from "lucide-react-native";
import { theme } from "../../../../theme";

const NotificationHeader = ({
  unreadCount = 0,
  onMarkAllRead,
  isMarkingAll = false,
  onBackPress,
}) => {
  return (
    <LinearGradient
      colors={["#FFFFFF", "#FCEDD6"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{
        height: 140,
        paddingHorizontal: 24,
        paddingTop: 18,
      }}
    >
      <View
        style={{
          height: 58,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* BACK */}
        <TouchableOpacity
          onPress={onBackPress}
          activeOpacity={0.7}
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <ArrowLeft
            size={25}
            color="#111111"
            strokeWidth={2.2}
          />
        </TouchableOpacity>

        {/* TITLE */}
        <Text
          style={{
            position: "absolute",
            left: 0,
            right: 0,

            textAlign: "center",

            fontSize: 20,
            lineHeight: 25,

            fontFamily: theme.fonts.headingSemiBold,
            color: "#111111",
          }}
        >
          Notification
        </Text>

        {/* MARK ALL */}
        <TouchableOpacity
          disabled={unreadCount === 0 || isMarkingAll}
          onPress={onMarkAllRead}
          activeOpacity={0.7}
          style={{
            minWidth: 90,
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          {isMarkingAll ? (
            <ActivityIndicator
              size="small"
              color="#C85A17"
            />
          ) : (
            unreadCount > 0 && (
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 16,
                  fontFamily: theme.fonts.semiBold,
                  color: "#C85A17",
                }}
              >
                Mark all as read
              </Text>
            )
          )}
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default NotificationHeader;