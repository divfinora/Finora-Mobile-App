import React from "react";

import {
  View,
  Text,
} from "react-native";

import { theme } from "../../../theme/index";

import BackButton from "../../../components/common/BackButton/BackButton";

const KYCHeader = ({
  title,
  onBack,
}) => {
  return (
    <View
      style={{
        paddingTop: theme.spacing.sm,
        marginBottom: theme.spacing.xxl,
      }}
    >
      <BackButton
        onPress={onBack}
        style={{
          // marginLeft: -8,
          marginBottom: theme.spacing.lg,
          alignSelf: "flex-start",
        }}
      />

      <Text
        style={{
          fontSize: theme.typography.h2,
          fontFamily: theme.fonts.headingBold,
          color: theme.colors.black,
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default KYCHeader;