import React from "react";

import {
  View,
  Text,
  Image,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { theme } from "../../../theme";

const ProfileBanner = () => {

  return (

    <LinearGradient

      colors={[
        "#16212D",
        "#07090C",
      ]}

      start={{
        x: 0,
        y: 0,
      }}

      end={{
        x: 1,
        y: 1,
      }}

      style={{

        borderRadius: 24,

        paddingVertical: 28,

        alignItems: "center",

      }}

    >

      {/* ============================ */}
      {/* PROFILE IMAGE */}
      {/* ============================ */}

      <View

        style={{

          width: 92,

          height: 92,

          borderRadius: 46,

          borderWidth: 4,

          borderColor: theme.colors.primary500,

          justifyContent: "center",

          alignItems: "center",

        }}

      >

        <Image

          source={{
            uri: "https://i.pravatar.cc/300",
          }}

          style={{

            width: 82,

            height: 82,

            borderRadius: 41,

          }}

        />

        {/* VERIFIED BADGE */}

        <View

          style={{

            position: "absolute",

            bottom: -2,

            right: -2,

            width: 24,

            height: 24,

            borderRadius: 12,

            backgroundColor: theme.colors.primary500,

            borderWidth: 2,

            borderColor: "#FFD25A",

            justifyContent: "center",

            alignItems: "center",

          }}

        >

          <Text

            style={{

              color: theme.colors.white,

              fontSize: 12,

            }}

          >

            ✓

          </Text>

        </View>

      </View>

      {/* ============================ */}
      {/* NAME */}
      {/* ============================ */}

      <Text

        style={{

          marginTop: 18,

          color: theme.colors.white,

          fontSize: theme.typography.h2,

          fontFamily: theme.fonts.headingSemiBold,

        }}

      >

        Parth Sarthi

      </Text>

      {/* ============================ */}
      {/* CITIZEN ID */}
      {/* ============================ */}

      <Text

        style={{

          marginTop: 6,

          color: "#AEB7C6",

          fontSize: theme.typography.b2,

          fontFamily: theme.fonts.medium,

        }}

      >

        Citizen ID: GP-8829-X01

      </Text>

      {/* ============================ */}
      {/* VERIFIED CHIP */}
      {/* ============================ */}

      <View

        style={{

          marginTop: 16,

          backgroundColor: "#FFF2E7",

          paddingHorizontal: 16,

          paddingVertical: 6,

          borderRadius: 50,

        }}

      >

        <Text

          style={{

            color: theme.colors.primary500,

            fontSize: 11,

            letterSpacing: 1,

            fontFamily: theme.fonts.bold,

          }}

        >

          VERIFIED

        </Text>

      </View>

    </LinearGradient>

  );

};

export default ProfileBanner;