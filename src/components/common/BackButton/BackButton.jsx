import React from "react";
import { TouchableOpacity } from "react-native";
import { ArrowLeft } from "lucide-react-native";

import { theme } from "../../../theme";

const BackButton = ({
  onPress,
  size = 22,
  color = theme.colors.black,
  style = {},
}) => {

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        {
             
          width: 42,
          height: 42,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      <ArrowLeft
        size={size}
        color={color}
        strokeWidth={2.2}
      />
    </TouchableOpacity>
  );

};

export default BackButton;