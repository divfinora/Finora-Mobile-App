import React, {
  memo,
  useCallback,
} from "react";

import {
  View,
  Text,
  Image,
  Pressable,
} from "react-native";

import { theme } from "../../../theme";

const ReferBannerCard = ({
  onPress,
}) => {
  // =====================================================
  // REFER NOW
  // =====================================================

  const handleReferPress = useCallback(() => {
    if (onPress) {
      onPress();
    }
  }, [onPress]);

  return (
    <View
      style={{
        // =====================================================
        // MAIN SECTION
        // =====================================================

        width: "100%",

        backgroundColor:
          theme.colors.white,

        paddingHorizontal:
          theme.spacing.lg,

        paddingTop:
          theme.spacing.xxl,

        paddingBottom:
          theme.spacing.xxl,
      }}
    >
      {/* =================================================
          SECTION TITLE
      ================================================= */}

      <Text
        style={{
          color:
            theme.colors.text,

          fontSize:
            theme.typography.h6,

          lineHeight:
            theme.lineHeight.h6,

          fontFamily:
            theme.fonts.bold,

          marginBottom:
            theme.spacing.md,
        }}
      >
        SPREAD THE HAPPINESS!
      </Text>

      {/* =================================================
          REFER BANNER
      ================================================= */}

      <View
        style={{
          width: "100%",

          aspectRatio:
            396 / 460,

          borderRadius: 16,

          overflow: "hidden",

          backgroundColor:
            theme.colors.white,

          position: "relative",
        }}
      >
        {/* ================================================
            REFER BANNER IMAGE
        ================================================ */}

        <Image
          source={require(
            "../components/assets/refer-banner.png"
          )}
          resizeMode="stretch"
          style={{
            width: "100%",
            height: "100%",
          }}
        />

        {/* ================================================
            REFER NOW BUTTON
            Transparent clickable area
        ================================================ */}

        <Pressable
          onPress={
            handleReferPress
          }
          style={{
            position: "absolute",

            left: "4%",

            bottom: "7.5%",

            width: "49%",

            height: "10%",

            borderRadius: 30,
          }}
          android_ripple={{
            color:
              "rgba(255,255,255,0.15)",
          }}
        />
      </View>

      {/* =================================================
          FINANCIAL SUPER APP
      ================================================= */}

      <Text
        style={{
          marginTop:
            theme.spacing.xxl,

          color:
            theme.colors.text,

          fontSize: 36,

          lineHeight: 46,

          fontFamily:
            theme.fonts.bold,

          letterSpacing: -0.5,
        }}
      >
        India's Financial{"\n"}
        Super App
      </Text>
    </View>
  );
};

export default memo(
  ReferBannerCard
);