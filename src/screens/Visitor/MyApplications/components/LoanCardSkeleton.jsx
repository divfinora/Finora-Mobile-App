import React, {
  memo,
} from "react";

import {
  View,
} from "react-native";

import {
  theme,
} from "../../../../theme";

import ShimmerPlaceholder from "../../../../components/common/Loader/ShimmerPlaceholder.jsx";


// =====================================================
// SKELETON
// =====================================================

const LoanCardSkeleton = () => {

  return (
    <View
      style={{
        backgroundColor:
          theme.colors.white,

        borderRadius: 16,

        borderWidth: 1,

        borderColor:
          "#E3E7EA",

        padding: 24,

        marginBottom:
          theme.spacing.lg,

        ...theme.shadows.card,
      }}
    >

      {/* TOP */}

      <View
        style={{
          flexDirection: "row",

          justifyContent:
            "space-between",
        }}
      >

        <View
          style={{
            flex: 1,
          }}
        >

          <ShimmerPlaceholder
            width={70}
            height={13}
            borderRadius={6}
          />

          <ShimmerPlaceholder
            width={145}
            height={17}
            borderRadius={7}
            style={{
              marginTop: 7,
            }}
          />

        </View>


        <ShimmerPlaceholder
          width={85}
          height={28}
          borderRadius={7}
        />

      </View>


      {/* DIVIDER */}

      <ShimmerPlaceholder
        width="100%"
        height={1}
        borderRadius={1}
        style={{
          marginTop: 20,

          marginBottom: 20,
        }}
      />


      {/* ROW */}

      <View
        style={{
          flexDirection: "row",

          gap: 16,

          marginBottom: 18,
        }}
      >

        <View
          style={{
            flex: 1,
          }}
        >

          <ShimmerPlaceholder
            width={65}
            height={13}
            borderRadius={6}
          />

          <ShimmerPlaceholder
            width={125}
            height={18}
            borderRadius={7}
            style={{
              marginTop: 7,
            }}
          />

        </View>


        <View
          style={{
            flex: 1,
          }}
        >

          <ShimmerPlaceholder
            width={45}
            height={13}
            borderRadius={6}
          />

          <ShimmerPlaceholder
            width={110}
            height={18}
            borderRadius={7}
            style={{
              marginTop: 7,
            }}
          />

        </View>

      </View>


      {/* AMOUNT / DATE */}

      <View
        style={{
          flexDirection: "row",

          gap: 16,

          marginBottom: 18,
        }}
      >

        <View
          style={{
            flex: 1,
          }}
        >

          <ShimmerPlaceholder
            width={55}
            height={13}
            borderRadius={6}
          />

          <ShimmerPlaceholder
            width={100}
            height={19}
            borderRadius={7}
            style={{
              marginTop: 7,
            }}
          />

        </View>


        <View
          style={{
            flex: 1,
          }}
        >

          <ShimmerPlaceholder
            width={75}
            height={13}
            borderRadius={6}
          />

          <ShimmerPlaceholder
            width={95}
            height={18}
            borderRadius={7}
            style={{
              marginTop: 7,
            }}
          />

        </View>

      </View>


      {/* LOCATION */}

      <ShimmerPlaceholder
        width="65%"
        height={14}
        borderRadius={7}
        style={{
          marginBottom: 18,
        }}
      />


      {/* RECOMMENDATION */}

      <ShimmerPlaceholder
        width="100%"
        height={40}
        borderRadius={9}
        style={{
          marginBottom: 18,
        }}
      />


      {/* BUTTONS */}

      <View
        style={{
          flexDirection: "row",

          gap: 12,
        }}
      >

        <ShimmerPlaceholder
          width="48%"
          height={46}
          borderRadius={9}
        />

        <ShimmerPlaceholder
          width="48%"
          height={46}
          borderRadius={9}
        />

      </View>

    </View>
  );
};


export default memo(
  LoanCardSkeleton
);