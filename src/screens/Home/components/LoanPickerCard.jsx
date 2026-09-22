import React, { memo } from "react";
import {
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { theme } from "../../../theme";

import LoanPickerImage from "./assets/LoanPicker.png";

const LoanPickerCard = () => {
  const navigation = useNavigation();

  const { width: screenWidth } =
    useWindowDimensions();

  // Left + Right spacing
  const horizontalPadding =
    theme.spacing.lg * 2;

  // Available banner width
  const bannerWidth =
    screenWidth - horizontalPadding;

  // Figma ratio: 396 × 317
  const bannerHeight =
    bannerWidth * (317 / 396);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("emi-calculator")
      }
      style={{
        marginTop:theme.spacing.xxl,
        width: "100%",
        paddingHorizontal:
          theme.spacing.lg,
      }}
    >
      <Image
        source={LoanPickerImage}
        resizeMode="stretch"
        style={{
          width: "100%",
          height: bannerHeight,
          borderRadius: 16,
        }}
      />
    </TouchableOpacity>
  );
};

export default memo(LoanPickerCard);