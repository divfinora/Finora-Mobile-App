import React, { memo } from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  BadgeCheck,
} from "lucide-react-native";
import { theme } from "../../../../theme";

 

const KycDocumentCard = ({
  title,
  subtitle,
  icon,
  onPress,
}) => {

  const Icon = icon;

  return (

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",

        backgroundColor: theme.colors.gray100,

        borderRadius: theme.radius.lg,

        padding: theme.spacing.lg,

        marginBottom: theme.spacing.lg,
      }}
    >

      {/* ================= ICON ================= */}

      <View
        style={{
          width: 40,
          height: 40,

          borderRadius: theme.radius.md,

          backgroundColor: theme.colors.navy900,

          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <Icon
          size={theme.iconSize.md}
          color={theme.colors.white}
        />

      </View>

      {/* ================= TEXT ================= */}

      <View
        style={{
          flex: 1,
          marginLeft: theme.spacing.lg,
        }}
      >

        <Text
          numberOfLines={1}
          style={{
            color: theme.colors.gray900,

            fontSize: theme.typography.b2,

            fontFamily: theme.fonts.medium,
          }}
        >
          {title}
        </Text>

        <Text
          numberOfLines={1}
          style={{
            marginTop: 2,

            color: theme.colors.textLight,

            fontSize: theme.typography.b3,

            fontFamily: theme.fonts.regular,
          }}
        >
          {subtitle}
        </Text>

      </View>

      {/* ================= VERIFIED BADGE ================= */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          backgroundColor: "#FFF4EA",

          borderWidth: 1,
          borderColor: "#FDBA74",

          borderRadius: 999,

          paddingHorizontal: 12,
          paddingVertical: 6,
        }}
      >

        <BadgeCheck
          size={14}
          color="#EA580C"
          fill="#EA580C"
        />

        <Text
          style={{
            marginLeft: 4,

            color: "#EA580C",

            fontSize: theme.typography.b3,

            fontFamily: theme.fonts.semiBold,
          }}
        >
          Verified
        </Text>

      </View>

    </TouchableOpacity>

  );

};

export default memo(KycDocumentCard);