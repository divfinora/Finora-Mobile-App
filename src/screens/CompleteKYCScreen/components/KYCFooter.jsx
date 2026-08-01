import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { theme } from "../../../theme/index";

const KYCFooter = ({
  onContinue,
  onSkip,
}) => {
  return (
    <View
      style={{
   
         
        paddingTop: theme.spacing.md,
          // paddingBottom: theme.spacing.md,
      
      }}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onContinue}
        style={{
          height: theme.button.height,

          borderRadius:
            theme.button.borderRadius,

          backgroundColor:
            theme.button.primary.backgroundColor,

          justifyContent: "center",

          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: theme.button.primary.textColor,

            fontFamily:
              theme.fonts.semiBold,

            fontSize:
              theme.button.fontSize,
          }}
        >
          Start KYC Process
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onSkip}
        style={{
          alignItems: "center",
          marginTop: theme.spacing.lg,
        }}
      >
        <Text
          style={{
            color: theme.colors.textSecondary,

            fontFamily:
              theme.fonts.medium,

            fontSize:
              theme.typography.b2,
          }}
        >
          I'll do this later
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default KYCFooter;