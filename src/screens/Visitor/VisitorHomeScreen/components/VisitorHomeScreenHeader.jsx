import React, {
  memo,
} from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  Bell,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";


const VisitorHomeScreenHeader = ({
  visitor,
  unreadCount = 0,
  onNotificationPress,
}) => {

  // =====================================================
  // PROFILE IMAGE
  // =====================================================

  const profileImage =
    visitor?.profileImage?.url ||
    "https://i.pravatar.cc/150?img=12";


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <View
      style={{
        paddingHorizontal: 24,
        paddingTop: 14,
        paddingBottom: 16,
      }}
    >

      {/* =================================================
          TOP ROW
      ================================================= */}

      <View
        style={{
          flexDirection: "row",

          alignItems: "center",

          justifyContent:
            "space-between",
        }}
      >

        {/* ===============================================
            TITLE
        =============================================== */}

        <Text
          style={{
            fontSize: 22,

            fontFamily:
              theme.fonts.headingSemiBold,

            color: "#181818",
          }}
        >
          Visit Officer
        </Text>


        {/* ===============================================
            RIGHT SECTION
        =============================================== */}

        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
          }}
        >

          {/* =============================================
              NOTIFICATION
          ============================================= */}

          <TouchableOpacity
            activeOpacity={0.8}

            onPress={
              onNotificationPress
            }

            style={{
              marginRight: 16,

              position: "relative",
            }}
          >

            <Bell
              size={25}
              color="#FF4E16"
              strokeWidth={2}
            />


            {/* =========================================
                UNREAD COUNT
            ========================================= */}

            {unreadCount > 0 && (

              <View
                style={{
                  position: "absolute",

                  right: -8,

                  top: -8,

                  minWidth: 19,

                  height: 19,

                  borderRadius: 10,

                  backgroundColor:
                    "#C91818",

                  alignItems: "center",

                  justifyContent: "center",

                  paddingHorizontal: 3,
                }}
              >

                <Text
                  style={{
                    color:
                      "#FFFFFF",

                    fontSize: 11,

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


          {/* =============================================
              PROFILE IMAGE
          ============================================= */}

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
                uri: profileImage,
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


      {/* =================================================
          GREETING
      ================================================= */}

      <View
        style={{
          marginTop: 28,
        }}
      >

        <Text
          style={{
            fontSize: 18,

            fontFamily:
              theme.fonts.headingSemiBold,

            color: "#202020",
          }}
        >

          Good Morning,{" "}

          {visitor?.fullName ||
            "Visitor"}

        </Text>


        <Text
          style={{
            marginTop: 5,

            fontSize: 14,

            fontFamily:
              theme.fonts.regular,

            color: "#77777D",
          }}
        >

          {visitor?.designation ||
            "Field Verification Officer"}

        </Text>

      </View>

    </View>

  );
};


export default memo(
  VisitorHomeScreenHeader
);