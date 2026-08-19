import React from "react";

import {
  View,
} from "react-native";

import ShimmerPlaceholder from "../../../../components/common/Loader/ShimmerPlaceholder";

import { theme } from "../../../../theme";

const LoanOfferSkeleton = () => {

  return (
    <View
      style={{
        marginHorizontal:
          theme.spacing.xl,

        marginBottom:
          theme.spacing.lg,

        backgroundColor:
          theme.colors.white,

        borderRadius:
          theme.radius.xl,

        padding:
          theme.spacing.lg,

        borderWidth: 1,

        borderColor:
          theme.colors.gray200,

        ...theme.shadows.card,
      }}
    >

      {/* TOP */}

      <View
        style={{
          flexDirection: "row",

          justifyContent:
            "space-between",

          alignItems: "center",
        }}
      >

        <View
          style={{
            flex: 1,

            marginRight:
              theme.spacing.md,
          }}
        >

          <ShimmerPlaceholder
            width="65%"
            height={20}
            borderRadius={7}
          />

          <ShimmerPlaceholder
            width="35%"
            height={12}
            borderRadius={6}
            style={{
              marginTop: 8,
            }}
          />

        </View>

        <ShimmerPlaceholder
          width={88}
          height={40}
          borderRadius={12}
        />

      </View>

      {/* AMOUNT */}

      <View
        style={{
          marginTop:
            theme.spacing.lg,
        }}
      >

        <ShimmerPlaceholder
          width={80}
          height={12}
          borderRadius={6}
        />

        <ShimmerPlaceholder
          width={170}
          height={28}
          borderRadius={8}
          style={{
            marginTop: 7,
          }}
        />

      </View>

      {/* DETAILS */}

      <View
        style={{
          flexDirection: "row",

          marginTop:
            theme.spacing.lg,

          paddingTop:
            theme.spacing.md,

          borderTopWidth: 1,

          borderTopColor:
            theme.colors.gray100,
        }}
      >

        <View
          style={{
            flex: 1,
          }}
        >

          <ShimmerPlaceholder
            width={70}
            height={12}
            borderRadius={6}
          />

          <ShimmerPlaceholder
            width={80}
            height={16}
            borderRadius={6}
            style={{
              marginTop: 6,
            }}
          />

        </View>

        <View
          style={{
            flex: 1,
          }}
        >

          <ShimmerPlaceholder
            width={60}
            height={12}
            borderRadius={6}
          />

          <ShimmerPlaceholder
            width={110}
            height={16}
            borderRadius={6}
            style={{
              marginTop: 6,
            }}
          />

        </View>

      </View>

      {/* FOOTER */}

      <ShimmerPlaceholder
        width="50%"
        height={14}
        borderRadius={7}
        style={{
          marginTop:
            theme.spacing.lg,
        }}
      />

    </View>
  );
};

export default LoanOfferSkeleton;