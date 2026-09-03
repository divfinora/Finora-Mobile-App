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
} from "../../../theme";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";


const LinearGradientCommonHeader = ({
  title,
  onBackPress,
  rightText,
  onRightPress,

  // ================= STYLE PROPS =================

  style,
  containerStyle,
  leftContainerStyle,
  backButtonStyle,
  centerContainerStyle,
  titleStyle,
  rightContainerStyle,
  rightButtonStyle,
  rightTextStyle,
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
      style={[
        {
          height: 140,

          paddingHorizontal:
            theme.spacing.xxl,

          paddingTop:
            insets.top +5
        },

        containerStyle,
        style,
      ]}
    >

      {/* ================================================= */}
      {/* HEADER ROW */}
      {/* ================================================= */}

      <View
        style={[
          {
            height: 58,

            flexDirection: "row",

            alignItems: "center",
            
          },

          // Header row custom style
          style,
        ]}
      >

        {/* ================================================= */}
        {/* LEFT */}
        {/* ================================================= */}

        <View
          style={[
            {
              flex: 1,

              alignItems: "flex-start",

              justifyContent: "center",
            },

            leftContainerStyle,
          ]}
        >

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBackPress}
            style={[
              {
                width: 40,
                height: 40,

                alignItems: "flex-start",

                justifyContent: "center",
              },

              backButtonStyle,
            ]}
          >

            <ArrowLeft
              size={
                theme.iconSize.md
              }
              color={
                theme.colors.black
              }
              strokeWidth={2.2}
            />

          </TouchableOpacity>

        </View>


        {/* ================================================= */}
        {/* CENTER */}
        {/* ================================================= */}

        <View
          style={[
            {
              flex: 2,

              alignItems: "center",

              justifyContent: "center",
            },

            centerContainerStyle,
          ]}
        >

          <Text
            numberOfLines={1}
            style={[
              {
                fontSize:
                  theme.typography.h3,

                lineHeight:
                  theme.lineHeight.h3,

                fontFamily:
                  theme.fonts.headingSemiBold,

                color:
                  theme.colors.black,

                textAlign: "center",

                includeFontPadding:
                  false,
              },

              titleStyle,
            ]}
          >
            {title}
          </Text>

        </View>


        {/* ================================================= */}
        {/* RIGHT */}
        {/* ================================================= */}

        <View
          style={[
            {
              flex: 1,

              alignItems: "flex-end",

              justifyContent: "center",
            },

            rightContainerStyle,
          ]}
        >

          {rightText ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onRightPress}
              style={[
                {
                  justifyContent:
                    "center",
              },

                rightButtonStyle,
              ]}
            >

              <Text
                numberOfLines={1}
                style={[
                  {
                    fontSize: 12,

                    lineHeight: 16,

                    fontFamily:
                      theme.fonts.medium,

                    color:
                      theme.colors.primary700,

                    textAlign: "right",
                  },

                  rightTextStyle,
                ]}
              >
                {rightText}
              </Text>

            </TouchableOpacity>
          ) : null}

        </View>

      </View>

    </LinearGradient>
  );
};


export default LinearGradientCommonHeader;