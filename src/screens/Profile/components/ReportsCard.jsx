import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  ChartColumn,
  ArrowRight,
} from "lucide-react-native";

import { theme } from "../../../theme";

const ReportsCard = ({ onPress }) => {

  return (

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        marginTop: theme.spacing.xxxl,

        backgroundColor: theme.colors.gray100,

        borderRadius: theme.radius.xl,

        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.lg,

        flexDirection: "row",
        alignItems: "center",
      }}
    >

      {/* ====================== */}
      {/* ICON */}
      {/* ====================== */}

      <View
        style={{
          width: 40,
          height: 40,

          borderRadius: theme.radius.md,

          backgroundColor: theme.colors.navy900,

          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <ChartColumn
          size={theme.iconSize.md}
          color={theme.colors.white}
        />

      </View>

      {/* ====================== */}
      {/* TEXT */}
      {/* ====================== */}

      <View
        style={{
          flex: 1,
          marginLeft: theme.spacing.lg,
        }}
      >

        <Text
          style={{
            color: theme.colors.gray700,

            fontSize: theme.typography.b1,

            fontFamily: theme.fonts.regular,
          }}
        >
          Reports & Analytics
        </Text>

        <Text
          style={{
            marginTop: theme.spacing.xs,

            color: theme.colors.textLight,

            fontSize: theme.typography.b3,

            lineHeight: theme.lineHeight.b3,

            fontFamily: theme.fonts.regular,
          }}
        >
          View your activity summary
        </Text>

      </View>

      {/* ====================== */}
      {/* RIGHT ARROW */}
      {/* ====================== */}

      <ArrowRight
        size={theme.iconSize.lg}
        color={theme.colors.textLight}
      />

    </TouchableOpacity>

  );

};

export default ReportsCard;