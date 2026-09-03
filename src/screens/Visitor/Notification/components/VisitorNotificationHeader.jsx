import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import {
  ArrowLeft,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";


const VisitorNotificationHeader = ({
  onBackPress,
  onMarkAllRead,
}) => {

  const insets =
    useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[
        "#f8f4ee",
        "#FCEDD6",
      ]}
      start={{
        x: 0.5,
        y: 0,
      }}
      end={{
        x: 0.5,
        y: 1,
      }}
      style={{
        height: 140,

        paddingHorizontal:
          theme.spacing.xxl,

        paddingTop:
          insets.top,
      }}
    >

      <View
        style={{
          height: 58,

          flexDirection: "row",

          alignItems: "center",
        }}
      >

        {/* ================= LEFT ================= */}

        <View
          style={{
            flex: 1,

            alignItems: "flex-start",

            justifyContent: "center",
          }}
        >

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBackPress}
            style={{
              width: 40,
              height: 40,

              alignItems: "flex-start",

              justifyContent: "center",
            }}
          >

            <ArrowLeft
              size={theme.iconSize.md}
              color={theme.colors.black}
              strokeWidth={2.2}
            />

          </TouchableOpacity>

        </View>


        {/* ================= CENTER ================= */}

        <View
          style={{
            flex: 2,

            alignItems: "center",

            justifyContent: "center",
          }}
        >

          <Text
            style={{
              fontSize:
                theme.typography.h3,

              lineHeight:
                theme.lineHeight.h3,

              fontFamily:
                theme.fonts.headingSemiBold,

              color:
                theme.colors.black,

              textAlign: "center",
            }}
          >
            Notification
          </Text>

        </View>


        {/* ================= RIGHT ================= */}

        <View
          style={{
            flex: 1,

            alignItems: "flex-end",

            justifyContent: "center",
          }}
        >

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onMarkAllRead}
            style={{
              justifyContent: "center",
            }}
          >

            <Text
              style={{
                fontSize: 12,

                lineHeight: 16,

                fontFamily:
                  theme.fonts.medium,

                color:
                  theme.colors.primary700,

                textAlign: "right",
              }}
            >
              Mark all as read
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </LinearGradient>
  );
};


export default VisitorNotificationHeader;