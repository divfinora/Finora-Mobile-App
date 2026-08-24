import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import {
  Bell,
  ChevronDown,
  Info,
} from "lucide-react-native";

import {
  theme,
} from "../../../theme";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";


const LoanHeader = () => {

  const insets =
    useSafeAreaInsets();


  return (

    <LinearGradient
      colors={[
        "#D1913C",
        "#FFD194",
      ]}

      start={{
        x: 0,
        y: 0,
      }}

      end={{
        x: 1,
        y: 0,
      }}

      style={{
        paddingBottom:theme.spacing.xl
        
        ,
        paddingTop:
          insets.top + theme.spacing.lg,
        // paddingTop:
        //   -7,

        paddingHorizontal:
          theme.spacing.xxl,

        borderBottomLeftRadius:
          44,

        borderBottomRightRadius:
          44,

        overflow: "hidden",
      }}
    >

      {/* ==========================================
          TOP BAR
      ========================================== */}

      <View
        style={{
          flexDirection: "row",

          alignItems: "center",

          justifyContent: "space-between",
        }}
      >

        {/* ========================================
            LEFT
        ======================================== */}

        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
          }}
        >

          {/* LOGO */}

          <View
            style={{
              width: 42,

              height: 42,

              borderRadius:
                theme.radius.md,

              backgroundColor:
                "rgba(255,255,255,0.18)",

              justifyContent: "center",

              alignItems: "center",
            }}
          >

            <View
              style={{
                width: 18,

                height: 18,

                borderWidth: 2,

                borderColor:
                  theme.colors.white,

                transform: [
                  {
                    rotate: "45deg",
                  },
                ],
              }}
            />

          </View>


          {/* APP NAME */}

          <Text
            style={{
              marginLeft:
                theme.spacing.md,

              color:
                theme.colors.white,

              fontSize:
                theme.typography.h4,

              lineHeight:
                theme.lineHeight.h4,

              fontFamily:
                theme.fonts.headingBold,

              fontWeight: "700",

              letterSpacing:
                theme.letterSpacing.xs,
            }}
          >
            Jamify
          </Text>

        </View>


        {/* ========================================
            RIGHT
        ======================================== */}

        <View
          style={{
            flexDirection: "row",

            alignItems: "center",
          }}
        >

          {/* CARD NUMBER */}

          <TouchableOpacity
            activeOpacity={0.8}

            style={{
              height: 36,

              paddingHorizontal:
                theme.spacing.md,

              borderRadius:
                theme.radius.pill,

              backgroundColor:
                "rgba(255,255,255,0.14)",

              flexDirection: "row",

              alignItems: "center",

              justifyContent: "center",
            }}
          >

            <Text
              style={{
                color:
                  theme.colors.white,

                fontSize:
                  theme.typography.b2,

                lineHeight:
                  theme.lineHeight.b2,

                fontFamily:
                  theme.fonts.bold,

                fontWeight: "700",
              }}
            >
              *2589
            </Text>


            <ChevronDown
              size={
                theme.iconSize.xs
              }

              color={
                theme.colors.white
              }

              strokeWidth={2}

              style={{
                marginLeft:
                  theme.spacing.xs,
              }}
            />

          </TouchableOpacity>


          {/* BELL */}

          <TouchableOpacity
            activeOpacity={0.8}

            style={{
              marginLeft:
                theme.spacing.md,

              width: 32,

              height: 36,

              justifyContent:
                "center",

              alignItems:
                "center",
            }}
          >

            <Bell
              size={
                theme.iconSize.md
              }

              color={
                theme.colors.white
              }

              strokeWidth={1.8}
            />


            {/* NOTIFICATION DOT */}

            <View
              style={{
                position: "absolute",

                right: 1,

                top: 2,

                width: 8,

                height: 8,

                borderRadius: 4,

                backgroundColor:
                  "#FF4C4C",

                borderWidth: 1.5,

                borderColor:
                  theme.colors.white,
              }}
            />

          </TouchableOpacity>

        </View>

      </View>


      {/* ==========================================
          CREDIT SCORE
      ========================================== */}

      <View
        style={{
          marginTop:
            theme.spacing.xl,
        }}
      >

        {/* LABEL */}

        <Text
          style={{
            color:
              "rgba(255,255,255,0.88)",

            fontSize:
              theme.typography.b2,

            lineHeight:
              theme.lineHeight.b2,

            fontFamily:
              theme.fonts.medium,

            fontWeight: "500",
          }}
        >
          Credit Score
        </Text>


        {/* ========================================
            SCORE
        ======================================== */}

        <View
          style={{
            flexDirection: "row",

            alignItems: "center",

            marginTop:
              theme.spacing.xs,
          }}
        >

          <Text
            style={{
              color:
                theme.colors.white,

              fontSize:
                theme.typography.displayLG,

              lineHeight:
                theme.lineHeight.displayLG,

              fontFamily:
                theme.fonts.headingBold,

              fontWeight: "700",

              letterSpacing:
                theme.letterSpacing.xs,
            }}
          >
            $ 2,987.56
          </Text>


          {/* INFO */}

          <TouchableOpacity
            activeOpacity={0.8}

            style={{
              marginLeft:
                theme.spacing.xs,

              marginTop:
                theme.spacing.sm,

              width: 20,

              height: 20,

              justifyContent:
                "center",

              alignItems:
                "center",
            }}
          >

            <Info
              size={
                theme.iconSize.xs
              }

              color={
                "rgba(255,255,255,0.90)"
              }

              strokeWidth={2}
            />

          </TouchableOpacity>

        </View>


        {/* ========================================
            UPDATED
        ======================================== */}

        <Text
          style={{
            marginTop:
              theme.spacing.xs,

            color:
              "rgba(255,255,255,0.72)",

            fontSize:
              theme.typography.b3,

            lineHeight:
              theme.lineHeight.b3,

            fontFamily:
              theme.fonts.medium,

            fontWeight: "500",
          }}
        >
          Updated 2 mins ago
        </Text>

      </View>

    </LinearGradient>

  );
};


export default LoanHeader;