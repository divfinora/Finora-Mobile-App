import React from "react";

import {
  View,
  Text,
} from "react-native";

import {
  Info,
} from "lucide-react-native";

import { theme } from "../../../theme";

const VerificationInfoCard = ({
  text,
}) => {
  if (!text) return null;

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",

        backgroundColor: "#FEEFE6",

        borderWidth: 1,
        borderColor: "#FED7AA",

        borderRadius: theme.radius.lg,

        padding: theme.spacing.lg,

        marginBottom: theme.spacing.xxxl,
      }}
    >
      {/* Icon */}

      <Info
        size={18}
        color={theme.colors.primary500}
        strokeWidth={2}
      />

      {/* Text */}

      <Text
        style={{
          flex: 1,

          marginLeft: theme.spacing.md,

          color: theme.colors.gray700,

          fontSize: theme.typography.b3,

          lineHeight: 20,

          fontFamily: theme.fonts.regular,
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default VerificationInfoCard;