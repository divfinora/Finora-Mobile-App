import React, {
  memo,
} from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import {
  Bell,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";


const VisitorHomeScreenHeader = ({
  visitor,
  unreadCount = 0,
  onNotificationPress,
}) => {

  const insets =
    useSafeAreaInsets();


  // =====================================================
  // PROFILE IMAGE
  // =====================================================

  const profileImage =
    visitor?.profileImage?.url ||
    "https://i.pravatar.cc/150?img=12";


  return (

    <>
      {/* =================================================
          STATUS BAR
      ================================================= */}

      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={true}
      />


      {/* =================================================
          HEADER
      ================================================= */}

      <LinearGradient
        colors={[
          "#FFFFFF",
          "#FFF9F1",
          "#F7F8F7",
        ]}
        locations={[
          0,
          0.55,
          1,
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
          width: "100%",

          // Status bar area
          paddingTop:
            insets.top + 8,

          paddingHorizontal: 24,

          paddingBottom: theme.spacing.sm,
        }}
      >

        {/* =================================================
            HEADER ROW
        ================================================= */}

        <View
          style={{
            height: 48,

            flexDirection: "row",

            alignItems: "center",

            justifyContent:
              "space-between",
          }}
        >

          {/* =================================================
              TITLE
          ================================================= */}

          <Text
            style={{
              fontSize: 21,

              lineHeight: 28,

              fontFamily:
                theme.fonts.headingSemiBold,

              color: "#181818",
            }}
          >
            Visit Officer
          </Text>


          {/* =================================================
              RIGHT SECTION
          ================================================= */}

          <View
            style={{
              flexDirection: "row",

              alignItems: "center",
            }}
          >

            {/* ===============================================
                NOTIFICATION
            =============================================== */}

            <TouchableOpacity
              activeOpacity={0.8}

              onPress={
                onNotificationPress
              }

              style={{
                width: 34,

                height: 38,

                alignItems:
                  "center",

                justifyContent:
                  "center",

                marginRight: 16,

                position:
                  "relative",
              }}
            >

              <Bell
                size={25}
                color="#FF4E16"
                strokeWidth={2}
              />


              {/* =========================================
                  UNREAD BADGE
              ========================================= */}

              {unreadCount > 0 && (

                <View
                  style={{
                    position:
                      "absolute",

                    right: -2,

                    top: -2,

                    minWidth: 19,

                    height: 19,

                    borderRadius: 10,

                    backgroundColor:
                      "#C91818",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",

                    paddingHorizontal: 3,
                  }}
                >

                  <Text
                    style={{
                      color:
                        "#FFFFFF",

                      fontSize: 11,

                      lineHeight: 14,

                      fontFamily:
                        theme.fonts.bold,
                    }}
                  >
                    {unreadCount > 99
                      ? "99+"
                      : unreadCount}
                  </Text>

                </View>

              )}

            </TouchableOpacity>


            {/* ===============================================
                PROFILE
            =============================================== */}

            <View
              style={{
                width: 36,

                height: 36,

                borderRadius: 18,

                overflow: "hidden",

                borderWidth: 2,

                borderColor:
                  "#FF6B2C",

                backgroundColor:
                  "#E5E7EB",
              }}
            >

              <Image
                source={{
                  uri:
                    profileImage,
                }}
                style={{
                  width: "100%",

                  height: "100%",
                }}
                resizeMode="cover"
              />

            </View>

          </View>

        </View>

      </LinearGradient>

    </>
  );
};


export default memo(
  VisitorHomeScreenHeader
);