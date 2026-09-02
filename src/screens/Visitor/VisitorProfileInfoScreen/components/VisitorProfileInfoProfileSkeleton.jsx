import React from "react";

import {
  View,
} from "react-native";

const SkeletonBox = ({
  width = "100%",
  height = 16,
  borderRadius = 8,
  style = {},
}) => {

  return (
    <View
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "#E8E8E8",
        ...style,
      }}
    />
  );

};

const VisitorProfileInfoProfileSkeleton = () => {

  return (
    <View
      style={{
        paddingTop: 10,
      }}
    >

      {/* ================================= */}
      {/* PROFILE */}
      {/* ================================= */}

      <View
        style={{
          alignItems: "center",
          marginBottom: 30,
        }}
      >

        <SkeletonBox
          width={120}
          height={120}
          borderRadius={60}
        />

        <SkeletonBox
          width={160}
          height={24}
          style={{
            marginTop: 18,
          }}
        />

        <SkeletonBox
          width={190}
          height={15}
          style={{
            marginTop: 8,
          }}
        />

      </View>

      {/* ================================= */}
      {/* BASIC INFORMATION */}
      {/* ================================= */}

      <View
        style={{
          backgroundColor: "#F6F6F7",
          borderRadius: 22,
          padding: 18,
          marginBottom: 22,
        }}
      >

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >

          <SkeletonBox
            width={170}
            height={22}
          />

          <SkeletonBox
            width={65}
            height={30}
            borderRadius={20}
          />

        </View>

        <SkeletonBox
          width="55%"
          height={14}
          style={{
            marginTop: 28,
          }}
        />

        <SkeletonBox
          width="75%"
          height={18}
          style={{
            marginTop: 8,
          }}
        />

        <SkeletonBox
          width="50%"
          height={14}
          style={{
            marginTop: 22,
          }}
        />

        <SkeletonBox
          width="65%"
          height={18}
          style={{
            marginTop: 8,
          }}
        />

        <SkeletonBox
          width="40%"
          height={14}
          style={{
            marginTop: 22,
          }}
        />

        <SkeletonBox
          width="50%"
          height={18}
          style={{
            marginTop: 8,
          }}
        />

      </View>

      {/* ================================= */}
      {/* CONTACT */}
      {/* ================================= */}

      <View
        style={{
          backgroundColor: "#FFE0D0",
          borderRadius: 22,
          padding: 18,
          marginBottom: 22,
        }}
      >

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >

          <SkeletonBox
            width={160}
            height={22}
          />

          <SkeletonBox
            width={65}
            height={30}
            borderRadius={20}
          />

        </View>

        <SkeletonBox
          width="55%"
          height={14}
          style={{
            marginTop: 28,
          }}
        />

        <SkeletonBox
          width="80%"
          height={18}
          style={{
            marginTop: 8,
          }}
        />

        <SkeletonBox
          width="45%"
          height={14}
          style={{
            marginTop: 22,
          }}
        />

        <SkeletonBox
          width="60%"
          height={18}
          style={{
            marginTop: 8,
          }}
        />

      </View>

      {/* ================================= */}
      {/* ADDRESS */}
      {/* ================================= */}

      <View
        style={{
          backgroundColor: "#F6F6F7",
          borderRadius: 22,
          padding: 18,
        }}
      >

        <SkeletonBox
          width="65%"
          height={22}
        />

        <SkeletonBox
          width="90%"
          height={18}
          style={{
            marginTop: 25,
          }}
        />

        <SkeletonBox
          width="70%"
          height={18}
          style={{
            marginTop: 8,
          }}
        />

        <SkeletonBox
          width="100%"
          height={125}
          borderRadius={14}
          style={{
            marginTop: 18,
          }}
        />

      </View>

    </View>
  );

};

export default VisitorProfileInfoProfileSkeleton;


 