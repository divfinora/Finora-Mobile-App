import React from "react";

import {
  View,
} from "react-native";

import CommonButton from "../../../../components/common/Button/CommonButton";
import { theme } from "../../../../theme";

const Footer = ({
  loading = false,
  onPress,
}) => {
  return (
    <View
      style={{
        marginTop: theme.spacing.xxxl,
        marginBottom: theme.spacing.xl,
      }}
    >
      <CommonButton
        title="Save & Continue"
        onPress={onPress}
        loading={loading}
      />
    </View>
  );
};

export default Footer;