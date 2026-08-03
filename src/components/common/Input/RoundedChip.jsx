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
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        {
            alignSelf: "flex-start", // ⭐ Important
          height: 40,

          minWidth: 72,
         
          

          paddingHorizontal: 18,

          justifyContent: "center",
          alignItems: "center",

          borderRadius: 999,

          borderWidth: 1,

          borderColor: selected
            ? "#F4A39D"
            : "transparent",

          backgroundColor: selected
            ? "#FDE2E0"
            : "#F4F5F8",
  marginRight: 10,
          marginBottom: 10,
        },
        style,
      ]}
    >
      <Text
        style={[
          {
            fontSize: 14,

            fontFamily: theme.fonts.medium,

            color: selected
              ? "#111827"
              : "#6B7280",
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