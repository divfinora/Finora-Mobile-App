import React from "react";
import {
  TouchableOpacity,
  Text,
} from "react-native";

import { theme } from "../../../theme";

const SquareChip = ({
  title,
  selected = false,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        {
          flex: 1,
          height: 56,

          justifyContent: "center",
          alignItems: "center",

          borderRadius: 16,

          borderWidth: 1,

          borderColor: selected
            ? "#F4A39D"
            : "transparent",

          backgroundColor: selected
            ? "#FDE2E0"
            : "#F4F5F8",
        },
        style,
      ]}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: theme.fonts.medium,

          color: selected
            ? "#111827"
            : "#6B7280",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SquareChip;