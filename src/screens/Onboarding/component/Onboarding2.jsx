import React from "react";

import {
  View,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";

import Onboarding2Img from "../assets/onboarding-2.webp";

const Onboarding2 = () => {
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
      {/* IMAGE */}

      <Image
        source={Onboarding2Img}
        style={{
          width: imageSize,
          height: imageSize,
        }}
        resizeMode="contain"
      />

      {/* TITLE */}

      <Text
        style={{
           background: "linear-gradient(90deg, #FF8008, #FFC837)",
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
          color: "#FF8200",
          textAlign: "center",

          flexShrink: 1,
        }}
      >
       Find & Manage Loans Easily
      </Text>

      {/* DESCRIPTION */}

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
     Check eligibility, understand the process, and track your EMIs effortlessly.
      </Text>
    </View>
  );
};

export default Onboarding2;