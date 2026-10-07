import React, { memo } from "react";

import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { theme } from "../../../theme";

// ==========================================
// LOAN PICKER IMAGE
// ==========================================

import LoanPickerImage from "./assets/LoanPicker.png";

const LoanPickerCard = () => {
  const navigation = useNavigation();

  const { width: screenWidth } =
    useWindowDimensions();

  // ==========================================
  // FIGMA SPACING
  // Left  = 8px
  // Right = 8px
  // ==========================================

  const horizontalPadding = 8;

  // ==========================================
  // AVAILABLE BANNER WIDTH
  // ==========================================

  const bannerWidth =
    screenWidth -
    horizontalPadding * 2;

  // ==========================================
  // FIGMA SIZE
  // 412 × 204
  // ==========================================

  const bannerHeight =
    bannerWidth * (204 / 412);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate(
          "emi-calculator"
        )
      }
      style={{
        // ==========================================
        // TOP SPACING
        // ==========================================

        marginTop:
          theme.spacing.md,

          marginTop:
          theme.spacing.md,
        // ==========================================
        // FULL WIDTH
        // ==========================================

        width: "100%",

        // ==========================================
        // LEFT / RIGHT SPACING
        // ==========================================

        paddingHorizontal:
          horizontalPadding,
      }}
    >
      <Image
        source={LoanPickerImage}
        resizeMode="stretch"
        style={{
          // ==========================================
          // RESPONSIVE WIDTH
          // ==========================================

          width: "100%",

          // ==========================================
          // RESPONSIVE HEIGHT
          // FIGMA RATIO: 412 × 204
          // ==========================================

          height:
            bannerHeight,

          // ==========================================
          // BORDER
          // ==========================================

          borderWidth: 1,
          borderColor: "#E5E5E5",

          // ==========================================
          // BORDER RADIUS
          // ==========================================

          borderRadius: 16,
        }}
      />
    </TouchableOpacity>
  );
};

export default memo(
  LoanPickerCard
);