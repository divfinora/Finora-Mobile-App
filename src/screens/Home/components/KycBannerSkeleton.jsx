import React, { memo } from "react";

import {
  View,
} from "react-native";

import { theme } from "../../../theme";

import ShimmerPlaceholder from "../../../components/common/Loader/ShimmerPlaceholder.jsx";

const KycBannerSkeleton = () => {
  return (
    <View
      style={{
        width: "100%",
        height: 145,

        borderRadius: theme.radius.lg,

        overflow: "hidden",

        backgroundColor: theme.colors.navy900,

        position: "relative",
        marginBottom: theme.spacing.lg,
      }}
    >

      {/* ==========================================
          LEFT CONTENT
      ========================================== */}

      <View
        style={{
          flex: 1,

          paddingLeft: theme.spacing.lg,
          paddingTop: 18,

          paddingRight: 20,
        }}
      >

        {/* Clock + Takes text */}
        <View
          style={{
            flexDirection: "row",

            alignItems: "center",

            gap: 12,
          }}
        >

          <ShimmerPlaceholder
            width={24}
            height={24}
            borderRadius={12}
            style={{
              backgroundColor: "#263D48",
            }}
          />

          <ShimmerPlaceholder
            width={105}
            height={12}
            borderRadius={6}
            style={{
              backgroundColor: "#263D48",
            }}
          />

        </View>

        {/* Title */}
        <ShimmerPlaceholder
          width="85%"
          height={20}
          borderRadius={6}
          style={{
            marginTop: 9,

            backgroundColor: "#263D48",
          }}
        />

        {/* Subtitle */}
        <ShimmerPlaceholder
          width="92%"
          height={11}
          borderRadius={6}
          style={{
            marginTop: 8,

            backgroundColor: "#263D48",
          }}
        />

        {/* Button */}
        <ShimmerPlaceholder
          width={126}
          height={36}
          borderRadius={8}
          style={{
            marginTop: 12,

            backgroundColor: "#263D48",
          }}
        />

      </View>

    </View>
  );
};

export default memo(KycBannerSkeleton);