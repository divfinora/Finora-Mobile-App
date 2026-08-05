import React, { memo } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { Clock3, ArrowRight } from "lucide-react-native";

import { theme } from "../../../theme";

const KycBannerCard = ({
  onPress,
}) => {

  return (

    <View
      style={{
        backgroundColor: theme.colors.navy900,

        borderRadius: theme.radius.xl,

        paddingVertical: theme.spacing.lg,

        paddingHorizontal: theme.spacing.lg,

        marginBottom: theme.spacing.xl,

        flexDirection: "row",

        overflow: "hidden",
      }}
    >

      {/* Left */}

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          paddingRight: theme.spacing.md,
        }}
      >

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >

          <Clock3
            size={18}
            color={theme.colors.primary300}
          />

          <Text
            style={{
              marginLeft: theme.spacing.sm,

              color: theme.colors.primary300,

              fontSize: theme.typography.b3,

              fontFamily: theme.fonts.bold,

              letterSpacing: 1,
            }}
          >
            TAKES ~1 MINUTES
          </Text>

        </View>

        <Text
          style={{
            marginTop: theme.spacing.sm,

            color: theme.colors.white,

            fontSize: theme.typography.h3,

            lineHeight: theme.lineHeight.h2,

            fontFamily: theme.fonts.headingBold,
          }}
        >
          Let's Complete your KYC
        </Text>

        <Text
          style={{
            marginTop: theme.spacing.sm,

            color: "#C9D1D9",

            fontSize: theme.typography.b2,

            lineHeight: theme.lineHeight.b2,

            fontFamily: theme.fonts.regular,
          }}
        >
          Verify Your Identity to unlock all Features
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPress}
          style={{
            marginTop: theme.spacing.lg,

            alignSelf: "flex-start",

            flexDirection: "row",

            alignItems: "center",

            backgroundColor: "#FCEDD6",

            paddingHorizontal: 18,

            paddingVertical: 10,

            borderRadius: theme.radius.md,
          }}
        >

          <Text
            style={{
              color: theme.colors.primary700,

              fontSize: theme.typography.button,

              fontFamily: theme.fonts.semiBold,
            }}
          >
            Start KYC
          </Text>

          <ArrowRight
            size={18}
            color={theme.colors.primary500}
            style={{
              marginLeft: 6,
            }}
          />

        </TouchableOpacity>

      </View>

      {/* Right Illustration */}

      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/4202/4202841.png",
        }}
        resizeMode="contain"
        style={{
          width: 105,
          height: 105,

          alignSelf: "flex-end",
        }}
      />

    </View>

  );

};

export default memo(KycBannerCard);