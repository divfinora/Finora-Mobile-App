import React, { memo } from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  BadgeCheck,
  Plus,
} from "lucide-react-native";
import { theme } from "../../../../theme";
import ShimmerPlaceholder from "../../../../components/common/Loader/ShimmerPlaceholder";



const KycDocumentCard = ({
  title,
  subtitle,
  icon,
  verified,
  loading,
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

        backgroundColor: verified
          ? theme.colors.gray100
          : theme.colors.white,

        borderRadius: theme.radius.lg,

        padding: theme.spacing.lg,

        marginBottom: theme.spacing.lg,

        borderWidth: verified ? 0 : 1,
        borderStyle: verified ? "solid" : "dashed",
        borderColor: verified
          ? "transparent"
          : theme.colors.border,
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
            color: verified
              ? theme.colors.gray900
              : theme.colors.gray700,

            fontSize: theme.typography.b2,

            fontFamily: theme.fonts.medium,
          }}
        >
          {title}
        </Text>

        {

          loading ? (

            <ShimmerPlaceholder
              width={110}
              height={12}
              borderRadius={6}
              style={{
                marginTop: 6,
              }}
            />

          ) : (

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

          )

        }

      </View>

      {/* ================= RIGHT SIDE ================= */}

      {

        loading ? (

          <ShimmerPlaceholder
            width={70}
            height={32}
            borderRadius={20}
          />

        ) : verified ? (

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

        ) : (

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={{
              width: 36,
              height: 36,

              borderRadius: 18,

              backgroundColor: "#FFF3E8",

              justifyContent: "center",
              alignItems: "center",

              shadowColor: "#F97316",
              shadowOffset: {
                width: 0,
                height: 4,
              },
              shadowOpacity: 0.12,
              shadowRadius: 8,

              elevation: 4,
            }}
          >

            <Plus
              size={20}
              color="#F97316"
              strokeWidth={2.5}
            />

          </TouchableOpacity>

        )

      }

    </TouchableOpacity>

  );

};

export default memo(KycDocumentCard);