import React, {
  memo,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { theme } from "../../../../theme";

import ReferEarnCoinImage from "../../../../assets/images/refer-earn-coin.png";

const ReferEarnCoinCard = ({
  onPress = () => {},
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
        marginHorizontal:
          theme.spacing.lg,

        marginTop:
          theme.spacing.lg,

        height: 118,

        backgroundColor:
          theme.colors.white,

        borderRadius: 16,

        borderWidth: 1,

        borderColor:
          "#F3E7D7",

        paddingHorizontal: 22,

        flexDirection: "row",

        alignItems: "center",

        justifyContent:
          "space-between",

        ...theme.shadows.card,
      }}
    >
      <View
        style={{
          flex: 1,

          paddingRight:
            theme.spacing.md,
        }}
      >
        <Text
          style={{
            color:
              theme.colors.navy900,

            fontSize: 14,

            lineHeight: 14,

            fontFamily:
              theme.fonts.headingBold,
          }}
        >
          Refer & Earn Coin
        </Text>

        <Text
          style={{
            marginTop: 7,

            color:
              theme.colors.gray500,

            fontSize: 12,

            lineHeight: 18,

            fontFamily:
              theme.fonts.semiBold,
          }}
        >
          Invite friends, earn real coin
        </Text>

        <Text
          style={{
            marginTop: 4,

            color:
              theme.colors.primary500,

            fontSize: 13,

            lineHeight: 18,

            fontFamily:
              theme.fonts.bold,
          }}
        >
          Invite Now  ›
        </Text>
      </View>

      <View
        style={{
          width: 72,

          height: 72,

          borderRadius: 16,

          backgroundColor:
            "#FAFAFA",

          alignItems:
            "center",

          justifyContent:
            "center",
        }}
      >
        <Image
          source={
            ReferEarnCoinImage
          }
          resizeMode="contain"
          style={{
            width: 62,

            height: 62,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default memo(
  ReferEarnCoinCard
);