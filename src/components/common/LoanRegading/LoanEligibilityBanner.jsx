import React, { memo } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { MaterialIcons } from "@react-native-vector-icons/material-icons";

import { theme } from "../../../theme";

// ==========================================
// LOAN ELIGIBILITY IMAGE
// ==========================================

import LoanEligibilityImage from "./assets/check-loan-eligibilty-icon.png";

const LoanEligibilityBanner = ({
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={{
        width: "100%",
        minHeight: 57,

        backgroundColor: "#FFFFFF",

        borderRadius: 16,

        borderWidth: 1,

        borderColor: "#E9E9E9",

        paddingHorizontal: 11,

        paddingVertical: 7,

        flexDirection: "row",

        alignItems: "center",

        marginBottom:
          theme.spacing.lg,
      }}
    >
      {/* ==========================================
          LEFT IMAGE
      ========================================== */}

      <View
        style={{
          width: 44,

          height: 44,

          justifyContent:
            "center",

          alignItems:
            "center",

          marginRight: 8,
        }}
      >
        <Image
          source={
            LoanEligibilityImage
          }
          resizeMode="contain"
          style={{
            width: 44,

            height: 44,
          }}
        />
      </View>

      {/* ==========================================
          TEXT
      ========================================== */}

      <View
        style={{
          flex: 1,

          justifyContent:
            "center",
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: "#292929",

            fontSize:
              theme.typography.b2,

            lineHeight:
              theme.lineHeight.b2,

            fontFamily:
              theme.fonts.bold,
          }}
        >
          Check Your loan Eligibility
        </Text>

        <Text
          numberOfLines={1}
          style={{
            marginTop: 1,

            color: "#9A9A9A",

            fontSize:
              theme.typography.b3,

            lineHeight:
              theme.lineHeight.b3,

            fontFamily:
              theme.fonts.medium,
          }}
        >
          Discover your loan eligibility in minutes.
        </Text>
      </View>

      {/* ==========================================
          RIGHT ARROW
      ========================================== */}

      <MaterialIcons
        name="chevron-right"
        size={22}
        color="#111111"
      />
    </TouchableOpacity>
  );
};

export default memo(
  LoanEligibilityBanner
);