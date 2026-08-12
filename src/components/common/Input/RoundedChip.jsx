import React from "react";
import {
  TouchableOpacity,
  Text,
} from "react-native";

import { theme } from "../../../theme";

const RoundedChip = ({
  title,
  selected = false,
  onPress,
  style,
  textStyle,
  // Optional new props (defaults match old behavior)
  height,
  minWidth,
  paddingHorizontal,
  borderRadius = 999,
  borderWidth = 1,
  marginRight = 10,
  marginBottom = 10,
  alignSelf = "flex-start",
  selectedBackgroundColor,
  unselectedBackgroundColor,
  selectedBorderColor,
  unselectedBorderColor,
  selectedTextColor,
  unselectedTextColor,
  disabled = false,
  activeOpacity = 0.8,
}) => {
  // Default colors (OLD behavior - same as before)
  const defaultSelectedBg = selectedBackgroundColor || "#FDE2E0";
  const defaultUnselectedBg = unselectedBackgroundColor || "#F4F5F8";
  const defaultSelectedBorder = selectedBorderColor || "#F4A39D";
  const defaultUnselectedBorder = unselectedBorderColor || "transparent";
  const defaultSelectedText = selectedTextColor || "#111827";
  const defaultUnselectedText = unselectedTextColor || "#6B7280";

  // Border style (only for unselected state)
  const borderStyle = {
    borderWidth: 0.3,
    borderColor: '#48484a58',
  };

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          alignSelf: alignSelf,
          height: height || 40,
          minWidth: minWidth || 72,
          paddingHorizontal: paddingHorizontal || 18,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: borderRadius,
          borderWidth: borderWidth,
          borderColor: selected ? defaultSelectedBorder : defaultUnselectedBorder,
          backgroundColor: selected ? defaultSelectedBg : defaultUnselectedBg,
          marginRight: marginRight,
          marginBottom: marginBottom,
          // Apply borderStyle only when unselected
          ...(selected ? {} : borderStyle),
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            fontSize: 14,
            fontFamily: theme.fonts?.medium || 'Manrope-Medium',
            color: selected ? defaultSelectedText : defaultUnselectedText,
          },
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default RoundedChip;