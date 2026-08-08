import React from "react";

import {
  View,
} from "react-native";

import { theme } from "../../../../theme";

import ShimmerPlaceholder from "../../../../components/common/Loader/ShimmerPlaceholder";

const LoanCardSkeleton = () => {

  return (

    <View
      style={{
        width: "48%",
        backgroundColor: theme.colors.white,
        borderRadius: theme.radius.xl,
        padding: theme.spacing.lg,
        minHeight: 155,
        justifyContent: "space-between",
        ...theme.shadows.card,
      }}
    >

      {/* Top */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >

        <View
          style={{
            flex: 1,
          }}
        >

          <ShimmerPlaceholder
            width="70%"
            height={20}
            borderRadius={6}
          />

          <ShimmerPlaceholder
            width="50%"
            height={20}
            borderRadius={6}
            style={{
              marginTop: theme.spacing.xs,
            }}
          />

        </View>

        <ShimmerPlaceholder
          width={42}
          height={42}
          borderRadius={12}
        />

      </View>

      {/* Bottom */}

      <View>

        <ShimmerPlaceholder
          width="40%"
          height={12}
          borderRadius={6}
        />

        <ShimmerPlaceholder
          width="60%"
          height={18}
          borderRadius={6}
          style={{
            marginTop: theme.spacing.sm,
          }}
        />

      </View>

    </View>

  );

};

export default LoanCardSkeleton;