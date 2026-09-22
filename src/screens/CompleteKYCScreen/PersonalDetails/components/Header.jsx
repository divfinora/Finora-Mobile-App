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
  subtitle="Step 3 of 4"
  titleStyle={{
    fontFamily: theme.fonts.headingSemiBold,
    fontSize: 16,
    lineHeight: 18,
    letterSpacing: -0.45,
  }}
  subtitleStyle={{
    fontFamily: theme.fonts.semiBold,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: theme.letterSpacing.none,
  }}
/>
    </View>
  );
};

export default Header;