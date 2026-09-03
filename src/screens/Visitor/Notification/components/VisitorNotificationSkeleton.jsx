import React from "react";

import {
  View,
} from "react-native";

import ShimmerPlaceholder from "../../../../components/common/Loader/ShimmerPlaceholder";

import {
  theme,
} from "../../../../theme";

const VisitorNotificationSkeleton = () => {

  const SkeletonCard = () => (
    <View
      style={{
        minHeight: 125,

        marginBottom:
          theme.spacing.md,

        padding:
          theme.spacing.lg,

        borderRadius:
          theme.radius.lg,

        backgroundColor:
          theme.colors.gray100,
      }}
    >
      <View
        style={{
          flexDirection:
            "row",

          alignItems:
            "flex-start",
        }}
      >
        {/* ICON */}

        <ShimmerPlaceholder
          width={48}
          height={48}
          borderRadius={
            theme.radius.circle
          }
        />

        {/* CONTENT */}

        <View
          style={{
            flex: 1,

            marginLeft:
              theme.spacing.md,
          }}
        >
          <ShimmerPlaceholder
            width="65%"
            height={16}
            borderRadius={
              theme.radius.sm
            }
          />

          <View
            style={{
              height:
                theme.spacing.sm,
            }}
          />

          <ShimmerPlaceholder
            width="92%"
            height={13}
            borderRadius={
              theme.radius.sm
            }
          />

          <View
            style={{
              height:
                theme.spacing.xs,
            }}
          />

          <ShimmerPlaceholder
            width="72%"
            height={13}
            borderRadius={
              theme.radius.sm
            }
          />

          <View
            style={{
              height:
                theme.spacing.sm,
            }}
          />

          <ShimmerPlaceholder
            width={80}
            height={20}
            borderRadius={
              theme.radius.pill
            }
          />
        </View>
      </View>
    </View>
  );

  return (
    <View
      style={{
        paddingTop:
          theme.spacing.lg,
      }}
    >
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </View>
  );
};

export default VisitorNotificationSkeleton;