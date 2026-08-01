import React from "react";

import { View } from "react-native";

import { theme } from "../../../theme";

import CommonButton from "../../common/Button/CommonButton";

const VerificationFooter = ({
  title = "Continue",
  onPress,
  loading = false,
  disabled = false,
}) => {
  return (
    <View
      style={{
        paddingVertical: theme.spacing.lg,
        backgroundColor: theme.colors.white,
      }}
    >
      <CommonButton
        title={loading ? "Verifying..." : title}
        onPress={onPress}
        loading={loading}
        disabled={disabled}
      />
    </View>
  );
};

export default VerificationFooter;