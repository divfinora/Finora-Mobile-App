import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  MapPin,
  ChevronRight,
} from "lucide-react-native";

import { theme } from "../../../../theme";

const VisitorProfileInfoAddressCard = ({
  profile,
  onPress,
}) => {
  const street = profile?.street || "";
  const city = profile?.city || "";
  const state = profile?.state || "";
  const country = profile?.country || "";
  const pincode = profile?.pincode || "";

  const addressParts = [
    street,
    city,
    state,
    country,
    pincode,
  ].filter(Boolean);

  const addressText = addressParts.join(", ");

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: theme.colors.gray100,

        borderRadius: theme.radius.xl,

        padding: theme.spacing.lg,

        marginBottom: theme.spacing.xl,
      }}
    >
      {/* HEADER */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* MAP ICON */}

        <View
          style={{
            width: theme.iconSize.lg,
            height: theme.iconSize.lg,

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapPin
            size={theme.iconSize.sm}
            color={theme.colors.primary500}
            strokeWidth={2}
          />
        </View>

        {/* TITLE */}

        <Text
          style={{
            flex: 1,

            marginLeft: theme.spacing.sm,

            fontSize: theme.typography.h4,
            lineHeight: theme.lineHeight.h4,

            color: theme.colors.gray900,
            fontFamily: theme.fonts.semiBold,
          }}
        >
          Residential Address
        </Text>

        {/* CHEVRON */}

        <ChevronRight
          size={theme.iconSize.sm}
          color={theme.colors.gray500}
          strokeWidth={2}
        />
      </View>

      {/* ADDRESS */}

      <Text
        style={{
          marginTop: theme.spacing.lg,

          fontSize: theme.typography.b1,
          lineHeight: 26,

          color: theme.colors.gray500,
          fontFamily: theme.fonts.regular,
        }}
      >
        {addressText || "Residential address not available"}
      </Text>
    </TouchableOpacity>
  );
};

export default VisitorProfileInfoAddressCard;