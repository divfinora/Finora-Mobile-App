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


const BackButtonLinerGradint = ({
  onPress,

  showBack = true,

  title,

  subtitle,

  rightComponent,

  containerStyle,

  titleStyle,

  subtitleStyle,
}) => {

  return (

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
      }}
    >

      <View
        style={[
          {
               
            flexDirection: "row",

            alignItems: "center",

            justifyContent:
              "space-between",

            paddingHorizontal: 24,

            paddingTop:
              theme.spacing.md,

            paddingBottom:
              theme.spacing.md,
          },

          containerStyle,
        ]}
      >

        {/* ==========================================
            LEFT
        ========================================== */}

        <View
          style={{
            width: 42,
            alignItems: "flex-start",
          }}
        >

          {showBack && (

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onPress}
              style={{
                width: 42,
                height: 42,

                justifyContent:
                  "center",
              }}
            >

              <ArrowLeft
                size={24}
                strokeWidth={2.2}
                color={
                  theme.colors.black
                }
              />

            </TouchableOpacity>

          )}

        </View>


        {/* ==========================================
            CENTER
        ========================================== */}

        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >

          {!!title && (

            <Text
              style={[
                {
                  color:
                    theme.colors.black,

                  fontSize:
                    theme.typography.b1,

                  lineHeight:
                    theme.lineHeight.h3,

                  fontFamily:
                    theme.fonts.headingBold,
                },

                titleStyle,
              ]}
            >
              {title}
            </Text>

          )}


          {!!subtitle && (

            <Text
              style={[
                {
                  marginTop: 2,

                  color:
                    theme.colors.textSecondary,

                  fontSize:
                    theme.typography.b3,

                  lineHeight:
                    theme.lineHeight.b3,

                  fontFamily:
                    theme.fonts.regular,
                },

                subtitleStyle,
              ]}
            >
              {subtitle}
            </Text>

          )}

        </View>


        {/* ==========================================
            RIGHT
        ========================================== */}

        <View
          style={{
            width: 42,

            alignItems:
              "flex-end",
          }}
        >

          {rightComponent}

        </View>

      </View>

    </LinearGradient>

  );

};


export default BackButtonLinerGradint;