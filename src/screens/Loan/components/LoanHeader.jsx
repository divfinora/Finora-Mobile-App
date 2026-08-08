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

import { theme } from "../../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const LoanHeader = () => {
 const insets = useSafeAreaInsets();
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
 paddingTop: insets.top + theme.spacing.lg,
        // height: 235,

        borderBottomRightRadius: 44,
 borderBottomLeftRadius: 44,
        paddingHorizontal:
          theme.spacing.xxl,

        // paddingTop:
        //   theme.spacing.xxl,

      }}

    >

      {/* ====================================== */}
      {/* TOP BAR */}
      {/* ====================================== */}

      <View

        style={{

          flexDirection: "row",

          justifyContent: "space-between",

          alignItems: "center",

        }}

      >

        {/* LEFT */}

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

          <Text

            style={{

              marginLeft:
                theme.spacing.md,

              color:
                theme.colors.white,

              fontSize:
                theme.typography.h4,

              fontFamily:
                theme.fonts.headingSemiBold,

            }}

          >

            Jamify

          </Text>

        </View>

        {/* RIGHT */}

        <View

          style={{

            flexDirection: "row",

            alignItems: "center",

          }}

        >

          {/* CARD */}

          <TouchableOpacity

            activeOpacity={0.8}

            style={{

              height: 36,

              borderRadius:
                theme.radius.pill,

              paddingHorizontal:
                theme.spacing.lg,

              backgroundColor:
                "rgba(255,255,255,0.18)",

              flexDirection: "row",

              alignItems: "center",

            }}

          >

            <Text

              style={{

                color:
                  theme.colors.white,

                fontSize:
                  theme.typography.b2,

                fontFamily:
                  theme.fonts.bold,

              }}

            >

              *2589

            </Text>

            <ChevronDown

              color={
                theme.colors.white
              }

              size={
                theme.iconSize.xs
              }

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
                theme.spacing.lg,

            }}

          >

            <Bell

              color={
                theme.colors.white
              }

              size={
                theme.iconSize.md
              }

            />

            <View

              style={{

                position: "absolute",

                right: -1,

                top: -1,

                width: 9,

                height: 9,

                borderRadius: 5,

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

      {/* ====================================== */}
      {/* CREDIT SCORE */}
      {/* ====================================== */}

      <View

        style={{

          marginTop:
            theme.spacing.huge,

        }}

      >

        <Text

          style={{

            color:
              "rgba(255,255,255,.85)",

            fontSize:
              theme.typography.b1,

            fontFamily:
              theme.fonts.medium,

          }}

        >

          Credit Score

        </Text>
                <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: theme.spacing.sm,
          }}
        >
          <Text
            style={{
              color: theme.colors.white,
              fontSize: theme.typography.displayXL,
              lineHeight: theme.lineHeight.displayXL,
              fontFamily: theme.fonts.headingBold,
            }}
          >
            ₹ 2,987.56
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              marginLeft: theme.spacing.sm,
              marginTop: theme.spacing.sm,
            }}
          >
            <Info
              size={theme.iconSize.sm}
              color="rgba(255,255,255,0.95)"
            />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            marginTop: theme.spacing.sm,
            color: "rgba(255,255,255,0.75)",
            fontSize: theme.typography.b3,
            lineHeight: theme.lineHeight.b3,
            fontFamily: theme.fonts.medium,
          }}
        >
          Updated 2 mins ago
        </Text>

      </View>

      {/* ====================================== */}
      {/* BOTTOM SPACER */}
      {/* ====================================== */}

      <View
        style={{
          flex: 1,
        }}
      />

    </LinearGradient>

  );

};

export default LoanHeader;