import React from "react";

import {
  View,
  Text,
} from "react-native";

import {
  FileText,
  Clock3,
} from "lucide-react-native";

import LinearGradient
  from "react-native-linear-gradient";

import {
  theme,
} from "../../../../theme";


const CommonInfoCard = ({
  step,
  title =
  "Get Ready Before You Apply",
  description =
  "Funds in your account within hours.",
}) => {

  return (

    <LinearGradient
      colors={[
        "#0F2027",
        "#203A43",
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
        borderRadius:
          20,

        padding:
          theme.spacing.xl,

        ...theme.shadows.card,
      }}
    >

      <View
        style={{
          flexDirection:
            "row",
        }}
      >

        <View
          style={{
            width: 40,
            height: 40,

            borderRadius: 12,

            backgroundColor:
              "rgba(255,255,255,0.15)",

            justifyContent:
              "center",

            alignItems:
              "center",

            marginRight:
              theme.spacing.lg,
          }}
        >

          <FileText
            size={24}
            color={
              theme.colors.white
            }
          />

        </View>


        <View
          style={{
            flex: 1,
          }}
        >

          <Text
            style={{
              color:
                theme.colors.white,

              fontSize:
                theme.typography.h4,

              fontFamily:
                theme.fonts.semiBold,
            }}
          >
            {step ? `${step}. ` : ""}
            {title}
          </Text>


          <Text
            style={{
              marginTop: 4,

              color:
                "rgba(255,255,255,0.82)",

              fontSize:
                theme.typography.b2,

              fontFamily:
                theme.fonts.medium,

            }}
          >
            {description}
          </Text>

        </View>

      </View>


      <View
        style={{
          height: 1,

          backgroundColor:
            "rgba(255,255,255,0.10)",

          marginVertical:
            theme.spacing.lg,
        }}
      />


      <View
        style={{
          flexDirection:
            "row",

          alignItems:
            "center",
        }}
      >

        <Clock3
          size={18}
          color=
          "rgba(255,255,255,0.85)"
        />

        <Text
          style={{
            marginLeft:
              theme.spacing.md,

            color:
              "rgba(255,255,255,0.85)",

            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.medium,
          }}
        >
          Takes about 5–10 minutes
        </Text>

      </View>

    </LinearGradient>
  );
};


export default CommonInfoCard;