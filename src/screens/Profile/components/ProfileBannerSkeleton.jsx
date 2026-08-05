import React from "react";

import {
  View,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { theme } from "../../../theme";

import ShimmerPlaceholder from "../../../components/common/Loader/ShimmerPlaceholder";

const ProfileBannerSkeleton = () => {

  return (

    <LinearGradient
      colors={[
        "#16212D",
        "#07090C",
      ]}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 1,
        y: 1,
      }}
      style={{
        borderRadius: 24,
        paddingVertical: 30,
        alignItems: "center",
        overflow: "hidden",
      }}
    >

      {/* Avatar */}

      <View
        style={{
          width: 96,
          height: 96,
          borderRadius: 48,
          borderWidth: 4,
          borderColor: theme.colors.primary500,
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <ShimmerPlaceholder
          width={84}
          height={84}
          borderRadius={42}
        />

      </View>

      {/* Name */}

      <ShimmerPlaceholder
        width={170}
        height={22}
        borderRadius={theme.radius.pill}
        style={{
          marginTop: theme.spacing.xl,
        }}
      />

      {/* Citizen ID */}

      <ShimmerPlaceholder
        width={130}
        height={14}
        borderRadius={theme.radius.pill}
        style={{
          marginTop: theme.spacing.md,
        }}
      />

      {/* Verified Chip */}

      <ShimmerPlaceholder
        width={105}
        height={34}
        borderRadius={theme.radius.pill}
        style={{
          marginTop: theme.spacing.xl,
        }}
      />

    </LinearGradient>

  );

};

export default ProfileBannerSkeleton;