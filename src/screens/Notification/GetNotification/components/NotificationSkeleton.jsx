import React from "react";
import { View } from "react-native";

 
import { theme } from "../../../../theme";
import ShimmerPlaceholder from "../../../../components/common/Loader/ShimmerPlaceholder";

const NotificationSkeleton = () => {
  const SkeletonCard = () => (
    <View
      style={{
        height: 116,

        marginBottom: 14,

        paddingHorizontal: 16,
        paddingVertical: 16,

        borderRadius: 16,

        backgroundColor: "#FFFFFF",

        borderWidth: 1,
        borderColor: "#F7D7BE",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        {/* ICON */}
        <ShimmerPlaceholder
          width={48}
          height={48}
          borderRadius={24}
        />

        {/* CONTENT */}
        <View
          style={{
            flex: 1,
            marginLeft: 16,
          }}
        >
          <ShimmerPlaceholder
            width="65%"
            height={16}
            borderRadius={6}
          />

          <View style={{ height: 9 }} />

          <ShimmerPlaceholder
            width="90%"
            height={12}
            borderRadius={6}
          />

          <View style={{ height: 6 }} />

          <ShimmerPlaceholder
            width="70%"
            height={12}
            borderRadius={6}
          />
        </View>
      </View>

      {/* TIME */}
      <View
        style={{
          position: "absolute",
          right: 16,
          bottom: 12,
        }}
      >
        <ShimmerPlaceholder
          width={58}
          height={10}
          borderRadius={5}
        />
      </View>
    </View>
  );

  return (
    <View
      style={{
        paddingTop: 8,
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

export default NotificationSkeleton;