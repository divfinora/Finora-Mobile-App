import React from "react";
import {
  View,
  Text,
  Image,
} from "react-native";

import { theme } from "../../../../theme";

const WitnessVerificationHero = ({
  imageUri,
  title = "Verify witness identity carefully",
}) => {
  return (
    <View
      style={{
        
        width: "100%",
        height: 215,
        borderRadius: 14,
        overflow: "hidden",
        marginBottom: theme.spacing.sm,
        backgroundColor: theme.colors.gray200,
      }}
    >
      <Image
        source={{
          uri: imageUri,
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        resizeMode="cover"
      />

      {/* Image Overlay */}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.18)",
        }}
      />

      {/* Bottom Text */}
      <View
        style={{
          position: "absolute",
          left: theme.spacing.lg,
          right: theme.spacing.lg,
          bottom: theme.spacing.md,
        }}
      >
        <Text
          style={{
            color: theme.colors.white,
            fontSize: theme.typography.b2,
            fontFamily: theme.fonts.medium,
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

export default WitnessVerificationHero;