import React from "react";
import {
  View,
  Text,
} from "react-native";

import {
  Lock,
  CircleCheck,
  TriangleAlert,
  CircleX,
} from "lucide-react-native";

import { theme } from "../../../theme";

const variants = {
  info: {
    backgroundColor: "#FEEFE6",
    borderColor: "#F4D7C3",
    iconColor: theme.colors.primary500,
    textColor: "#6B4E3D",
    Icon: Lock,
  },

  success: {
    backgroundColor: "#ECFDF3",
    borderColor: "#ABEFC6",
    iconColor: "#16A34A",
    textColor: theme.colors.textSecondary,
    Icon: CircleCheck,
  },

  warning: {
    backgroundColor: "#FFF7ED",
    borderColor: "#FED7AA",
    iconColor: "#EA580C",
    textColor: theme.colors.textSecondary,
    Icon: TriangleAlert,
  },

  error: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
    iconColor: "#DC2626",
    textColor: theme.colors.textSecondary,
    Icon: CircleX,
  },
};

const MessageBox = ({
  message,
  variant = "info",
  style,
  textStyle,
  icon,
}) => {

  const config = variants[variant] || variants.info;

  const IconComponent =
    typeof icon === "function"
      ? icon
      : config.Icon;

  return (
    <View
      style={[
        {
          flexDirection: "row",
         

          paddingVertical: 14,
          paddingHorizontal: 16,

          marginTop: theme.spacing.lg,

          borderRadius: theme.radius.md,
          borderWidth: 1,

          backgroundColor: config.backgroundColor,
          borderColor: config.borderColor,
        },
        style,
      ]}
    >
      <IconComponent
        size={18}
        color={config.iconColor}
        strokeWidth={2}
      />

      <Text
        style={[
          {
            flex: 1,

            marginLeft: 12,

            color: config.textColor,

            fontSize: theme.typography.b2,

            lineHeight: 20,

            fontFamily: theme.fonts.medium,
          },
          textStyle,
        ]}
      >
        {message}
      </Text>
    </View>
  );
};

export default MessageBox;