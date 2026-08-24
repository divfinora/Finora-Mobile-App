import React, { memo } from "react";

import {
  View,
  Text,
} from "react-native";

import {
  CircleHelp,
  Handshake,
  LockKeyhole,
} from "lucide-react-native";

import { theme } from "../../../theme";


const HOW_IT_WORKS = [
  {
    id: "questions",

    title: "Quick\nQuestions",

    icon: CircleHelp,

    iconColor: "#00A9E8",

    backgroundColor: "#EAFBFF",
  },

  {
    id: "matched",

    title: "Get Matched\nInstantly",

    icon: Handshake,

    iconColor: "#F04444",

    backgroundColor: "#FFF1F1",
  },

  {
    id: "credit",

    title: "No Credit\nImpact",

    icon: LockKeyhole,

    iconColor: "#FFB000",

    backgroundColor: "#FFF8E7",
  },
];


const HowItWorks = () => {

  return (

    <View
      style={{
        marginHorizontal:
          theme.spacing.xl,

        marginTop:
          theme.spacing.lg,

        paddingVertical:
          theme.spacing.xxl,

        paddingHorizontal:
          theme.spacing.lg,

        backgroundColor:
          theme.colors.white,

        borderRadius:
          theme.radius.xl,

        ...theme.shadows.card,
      }}
    >

      {/* ==========================================
          TITLE
      ========================================== */}

      <Text
        style={{
          textAlign: "center",

          color:
            theme.colors.navy900,

          fontSize:
            theme.typography.h3,

          lineHeight:
            theme.lineHeight.h3,

          fontFamily:
            theme.fonts.headingBold,
        }}
      >
        How it works
      </Text>


      {/* ==========================================
          ITEMS
      ========================================== */}

      <View
        style={{
          flexDirection: "row",

          justifyContent: "space-between",

          alignItems: "flex-start",

          marginTop:
            theme.spacing.xxl,
        }}
      >

        {HOW_IT_WORKS.map((item) => {

          const Icon = item.icon;

          return (

            <View
              key={item.id}
              style={{
                flex: 1,

                alignItems: "center",
              }}
            >

              {/* ICON CIRCLE */}

              <View
                style={{
                  width: 64,
                  height: 64,

                  borderRadius: 32,

                  alignItems: "center",
                  justifyContent: "center",

                  backgroundColor:
                    item.backgroundColor,
                }}
              >

                <Icon
                  size={27}
                  color={item.iconColor}
                  strokeWidth={2.3}
                />

              </View>


              {/* TITLE */}

              <Text
                style={{
                  marginTop:
                    theme.spacing.md,

                  color:
                    theme.colors.navy700,

                  fontSize:
                    theme.typography.b3,

                  lineHeight: 17,

                  fontFamily:
                    theme.fonts.headingSemiBold,

                  textAlign: "center",
                }}
              >
                {item.title}
              </Text>

            </View>

          );

        })}

      </View>

    </View>

  );

};


export default memo(HowItWorks);