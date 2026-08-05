import React, { memo } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { theme } from "../../../theme";

const LoanCard = ({
  title,
  subtitle,
  image,
  backgroundColor = theme.colors.primary500,
  buttonTitle = "Apply Now",
  onPress,
}) => {

  return (

    <View
      style={{
        width: 260,

        backgroundColor,

        borderRadius: theme.radius.xl,

        padding: theme.spacing.lg,

        marginRight: theme.spacing.md,

        overflow: "hidden",
      }}
    >

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >

        <View
          style={{
            flex: 1,
            paddingRight: theme.spacing.md,
          }}
        >

          <Text
            style={{
              color: theme.colors.white,

              fontSize: theme.typography.h3,

              fontFamily: theme.fonts.headingBold,
            }}
          >
            {title}
          </Text>

          <Text
            style={{
              color: "rgba(255,255,255,0.9)",

              fontSize: theme.typography.b3,

              fontFamily: theme.fonts.regular,

              marginTop: theme.spacing.sm,

              lineHeight: 20,
            }}
          >
            {subtitle}
          </Text>

        </View>

        <Image
          source={image}
          resizeMode="contain"
          style={{
            width: 70,
            height: 70,
          }}
        />

      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          alignSelf: "flex-start",

          marginTop: theme.spacing.lg,

          backgroundColor: theme.colors.white,

          paddingHorizontal: theme.spacing.lg,

          paddingVertical: theme.spacing.sm,

          borderRadius: theme.radius.lg,
        }}
      >

        <Text
          style={{
            color: backgroundColor,

            fontSize: theme.typography.button,

            fontFamily: theme.fonts.semiBold,
          }}
        >
          {buttonTitle}
        </Text>

      </TouchableOpacity>

    </View>

  );

};

export default memo(LoanCard);