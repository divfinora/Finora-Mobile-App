import React from "react";
import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Clock3 } from "lucide-react-native";
import { theme } from "../../../theme";

const KYCHeroCard = () => {
  return (
// {/* <LinearGradient
//   colors={[
//     "#102128", // Bottom Left
//     "#1B4A4D", // Top Right
//   ]}
//   start={{ x: 0, y: 1 }}
//   end={{ x: 1, y: 0 }}
//   style={{
//     borderRadius: theme.radius.xl,
//     padding: theme.spacing.xxl,
//   }}
// > */}
<LinearGradient
     colors={[
    "#0F2027",
    "#0f2027",
    "#245055",
  ]}
  locations={[0, 0.5, 1]}
  start={{ x: 0, y: 1 }}
  end={{ x: 1, y: 0 }}
  style={{
    borderRadius: theme.radius.xl,
    padding: theme.spacing.xxl,
  }}
>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Clock3
          size={theme.iconSize.xs}
          color={theme.colors.primary400}
          strokeWidth={2}
        />

        <Text
          style={{
            marginLeft: theme.spacing.sm,
            color: theme.colors.primary400,
            fontSize: theme.typography.b3,
            fontFamily: theme.fonts.semiBold,
            letterSpacing: theme.letterSpacing.md,
          }}
        >
          TAKES ~1 MINUTES
        </Text>
      </View>

      <Text
        style={{
          marginTop: theme.spacing.xl,
          color: theme.colors.white,
          fontSize: theme.typography.h2,
          lineHeight: theme.lineHeight.h2,
          fontFamily: theme.fonts.headingBold,
        }}
      >
        Let's verify your identity
      </Text>

      <Text
        style={{
          marginTop: theme.spacing.md,
          color: "rgba(255,255,255,0.65)",
          fontSize: theme.typography.b2,
          lineHeight: 22,
          fontFamily: theme.fonts.regular,
          maxWidth: "92%",
        }}
      >
        RBI requires this for all financial accounts. We{"\n"}
        make it fast & paperless.
      </Text>
    </LinearGradient>
  );
};

export default KYCHeroCard;