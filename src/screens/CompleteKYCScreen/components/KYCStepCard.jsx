import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { theme } from "../../../theme";

const KYCStepCard = ({
  icon,
  title,
  subtitle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: "#FFFCF9",

        borderRadius: 16,

        height: 72,

        paddingHorizontal: 18,

        marginBottom: 16,
      }}
    >
      <View
        style={{
          width: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </View>

      <View
        style={{
          marginLeft: 14,
          flex: 1,
        }}
      >
        <Text
          style={{
            color: "#1E1E1E",

            fontFamily: theme.fonts.medium,

            fontSize: 15,

            lineHeight: 22,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            marginTop: 2,

            color: "#9BA2B0",

            fontFamily: theme.fonts.regular,

            fontSize: 12,

            lineHeight: 18,
          }}
        >
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default KYCStepCard;