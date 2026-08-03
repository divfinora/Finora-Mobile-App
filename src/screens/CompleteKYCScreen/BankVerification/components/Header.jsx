import React from "react";

import {
  View,
} from "react-native";

import BackButton from "../../../../components/common/BackButton/BackButton";
import { theme } from "../../../../theme";

const Header = ({
  onBack,
}) => {
  return (
    <View
      style={{
        marginTop: theme.spacing.sm,
      }}
    >
      <BackButton
        onPress={onBack}
        title="Quick KYC"
        subtitle="Step 4 of 4"
      />
    </View>
  );
};

export default Header;