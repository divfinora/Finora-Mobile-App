import React from "react";

import {
  View,
} from "react-native";

import CommonButton from "../../../../components/common/Button/CommonButton";
import { theme } from "../../../../theme";

const Footer = ({
  title = "Continue",

  loading = false,

  disabled = false,

  onPress,
}) => {
  return (
    <View
      style={{
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
      }}
    >
      <CommonButton
        title={title}
        loading={loading}
        disabled={disabled || loading}
        onPress={onPress}
      />
    </View>
  );
};

export default Footer;