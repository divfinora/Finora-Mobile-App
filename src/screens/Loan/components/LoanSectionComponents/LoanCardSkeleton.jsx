import React from "react";

import {
  View,
} from "react-native";

import { theme } from "../../../../theme";

import ShimmerPlaceholder from "../../../../components/common/Loader/ShimmerPlaceholder";

const LoanCardSkeleton = ({
  horizontal = false,
}) => {
  return (
    <View
      style={{
        width:
          horizontal
            ? 180
            : "48%",

        minHeight: 138,

        backgroundColor:
          theme.colors.white,

        borderRadius: 24,

        borderWidth: 1,

        borderColor:
          "#FCEDD6",

        paddingHorizontal: 16,

        paddingVertical: 20,

        justifyContent:
          "space-between",

        ...theme.shadows.card,
      }}
    >
      {/* ======================================
          TOP
      ====================================== */}

      <View
        style={{
          flexDirection: "row",

          justifyContent:
            "space-between",

          alignItems:
            "flex-start",
        }}
      >
        {/* ====================================
            LOAN NAME
        ==================================== */}

        <View
          style={{
            flex: 1,

            marginRight:
              theme.spacing.sm,

            minWidth: 0,
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
              marginTop:
                theme.spacing.xs,
            }}
          />
        </View>

        {/* ====================================
            ICON
        ==================================== */}

        <ShimmerPlaceholder
          width={32}
          height={32}
          borderRadius={12}
        />
      </View>

      {/* ======================================
          BOTTOM
      ====================================== */}

      <View
        style={{
          flexDirection: "row",

          justifyContent:
            "space-between",

          alignItems:
            "flex-end",
        }}
      >
        {/* ====================================
            AMOUNT
        ==================================== */}

        <View
          style={{
            flex: 1,
          }}
        >
          <ShimmerPlaceholder
            width="40%"
            height={14}
            borderRadius={6}
          />

          <ShimmerPlaceholder
            width="60%"
            height={18}
            borderRadius={6}
            style={{
              marginTop:
                theme.spacing.xs,
            }}
          />
        </View>

        {/* ====================================
            ARROW
        ==================================== */}

        <ShimmerPlaceholder
          width={24}
          height={24}
          borderRadius={12}
        />
      </View>
    </View>
  );
};

export default React.memo(
  LoanCardSkeleton
);