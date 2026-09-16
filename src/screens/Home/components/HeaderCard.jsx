import React, { memo } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { Bell } from "lucide-react-native";
import LinearGradient from "react-native-linear-gradient";

import { theme } from "../../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HeaderCard = ({
  userName = "Parth Sarthi Singh",
  profileImage =
    "https://api.dicebear.com/9.x/adventurer/png?seed=Parth",
  onNotificationPress = () => {},
}) => {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[
        "#FFFFFF",
        "#FCEDD6",
      ]}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 0,
        y: 1,
      }}
      style={{
        // ==========================================
        // FULL WIDTH HEADER
        // ==========================================

        marginHorizontal:
          -theme.screen.horizontalPadding,

        paddingHorizontal:
          theme.screen.horizontalPadding,

        // ==========================================
        // SAFE AREA
        // ==========================================

        paddingTop:
          theme.spacing.md +
          insets.top,

        // ==========================================
        // SPACE FOR FLOATING KYC BANNER
        // ==========================================

      paddingBottom: 90,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* ==========================================
            LEFT SECTION
        ========================================== */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
          }}
        >
          {/* ========================================
              PROFILE IMAGE
          ======================================== */}

          <Image
            source={{
              uri: profileImage,
            }}
            style={{
              width:
       52,

              height:
                  52 ,

              borderRadius:
                theme.avatar.lg / 2,

              backgroundColor:
                theme.colors.primary100,
            }}
          />

          {/* ========================================
              USER DETAILS
          ======================================== */}

          <View
            style={{
              marginLeft:
                theme.spacing.md,

              flex: 1,
            }}
          >
            {/* Welcome */}

            <Text
              style={{
                color:
                  theme.colors.textLight,

                fontSize:
                  theme.typography.b2,

                lineHeight:
                  theme.lineHeight.b1,

                fontFamily:
                  theme.fonts.regular,
              }}
            >
              Welcome back
            </Text>

            {/* User Name */}

            <Text
              numberOfLines={1}
              style={{
                marginTop: 2,

                color:
                  theme.colors.text,

                fontSize:
                  theme.typography.b1,

                lineHeight:
                  theme.lineHeight.b1,

                fontFamily:
                  theme.fonts.bold,
              }}
            >
              {userName}
            </Text>
          </View>
        </View>

        {/* ==========================================
            NOTIFICATION
        ========================================== */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={
            onNotificationPress
          }
          style={{
            width: 34,
            height: 34,

            borderRadius:
              theme.radius.md,

            backgroundColor:
               '#FCEDD6',

            justifyContent:
              "center",

            alignItems:
              "center",

            ...theme.shadows.card,
          }}
        >
          <Bell
            size={
              theme.iconSize.sm
            }
            color={
              '#E2570E'
            }
            fill={
             '#E2570E'
            }
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default memo(
  HeaderCard
);