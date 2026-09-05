import React from "react";

import {
  View,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

import Onboarding1Img from "../assets/onboarding-1.webp";

const Onboarding1 = () => {
  const { width, height } = useWindowDimensions();

  const isTablet = width >= 768;

  // Device height breakpoints
  const isVerySmall = height < 650;
  const isSmall = height >= 650 && height < 750;
  const isLarge = height >= 850;

  // Responsive image size
  const imageSize = isTablet
    ? Math.min(width * 0.52, 420)
    : isVerySmall
    ? Math.min(width * 0.48, 190)
    : isSmall
    ? Math.min(width * 0.55, 230)
    : isLarge
    ? Math.min(width * 0.7, 330)
    : Math.min(width * 0.62, 280);

  // TITLE STYLE
  const titleStyle = {
    width: "100%",
    maxWidth: 560,

    marginTop: isVerySmall
      ? 6
      : isSmall
      ? 10
      : 20,

    fontSize: isTablet
      ? 28
      : isVerySmall
      ? 19
      : isSmall
      ? 21
      : 23,

    lineHeight: isTablet
      ? 36
      : isVerySmall
      ? 24
      : isSmall
      ? 27
      : 30,

    fontWeight: "700",

    textAlign: "center",

    flexShrink: 1,
  };

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        alignItems: "center",

        paddingHorizontal: isTablet
          ? 48
          : 22,

        paddingTop: isVerySmall
          ? 4
          : isSmall
          ? 8
          : isTablet
          ? 30
          : 18,
      }}
    >
      {/* ================= IMAGE ================= */}

      <Image
        source={Onboarding1Img}
        style={{
          width: imageSize,
          height: imageSize,
        }}
        resizeMode="contain"
      />

      {/* ================= GRADIENT TITLE ================= */}

      <MaskedView
        maskElement={
          <Text
            style={[
              titleStyle,
              {
                color: "#000000",
              },
            ]}
          >
            Find & Manage Loans Easily
          </Text>
        }
      >
        <LinearGradient
          colors={[
            "#FF8008",
            "#FFC837",
          ]}
          start={{
            x: 0,
            y: 0.5,
          }}
          end={{
            x: 1,
            y: 0.5,
          }}
        >
          <Text
            style={[
              titleStyle,
              {
                opacity: 0,
              },
            ]}
          >
            Find & Manage Loans Easily
          </Text>
        </LinearGradient>
      </MaskedView>

      {/* ================= DESCRIPTION ================= */}

      <Text
        style={{
          width: "100%",
          maxWidth: 520,

          marginTop: isVerySmall
            ? 5
            : isSmall
            ? 7
            : 12,

          fontSize: isTablet
            ? 17
            : isVerySmall
            ? 13
            : isSmall
            ? 14
            : 15,

          lineHeight: isTablet
            ? 26
            : isVerySmall
            ? 18
            : isSmall
            ? 20
            : 23,

          fontWeight: "400",

          color: "#64748B",

          textAlign: "center",

          flexShrink: 1,
        }}
      >
        Flexible loans, simple applications, smart financial
        choices—all in one place.
      </Text>
    </View>
  );
};

export default Onboarding1;