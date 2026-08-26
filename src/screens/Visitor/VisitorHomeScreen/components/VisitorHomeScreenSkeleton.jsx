import React, {
  memo,
} from "react";

import {
  View,
} from "react-native";

import ShimmerPlaceholder from "../../../../components/common/Loader/ShimmerPlaceholder";


const VisitorHomeScreenSkeleton  = () => {

  return (

    <View
      style={{
        marginHorizontal: 24,

       

        marginBottom: 2,

        padding: 16,

        backgroundColor:
          "#FFFFFF",

        borderRadius: 16,

        borderWidth: 1,

        borderColor:
          "#EEEEEE",
      }}
    >

      {/* =================================================
          TOP ROW
      ================================================= */}

      <View
        style={{
          flexDirection: "row",

          alignItems: "center",
        }}
      >

        {/* Avatar */}

        <ShimmerPlaceholder
          width={44}
          height={44}
          borderRadius={22}
        />


        {/* Customer Info */}

        <View
          style={{
            flex: 1,

            marginLeft: 12,
          }}
        >

          <ShimmerPlaceholder
            width={130}
            height={18}
            borderRadius={6}
          />

          <ShimmerPlaceholder
            width={100}
            height={13}
            borderRadius={5}
            style={{
              marginTop: 7,
            }}
          />

        </View>


        {/* Status */}

        <ShimmerPlaceholder
          width={78}
          height={26}
          borderRadius={14}
        />

      </View>


      {/* =================================================
          DETAILS ROW 1
      ================================================= */}

      <View
        style={{
          flexDirection: "row",

          justifyContent:
            "space-between",

          marginTop: 22,
        }}
      >

        <ShimmerPlaceholder
          width="43%"
          height={14}
          borderRadius={5}
        />

        <ShimmerPlaceholder
          width="38%"
          height={14}
          borderRadius={5}
        />

      </View>


      {/* =================================================
          DETAILS ROW 2
      ================================================= */}

      <View
        style={{
          flexDirection: "row",

          justifyContent:
            "space-between",

          marginTop: 14,
        }}
      >

        <ShimmerPlaceholder
          width="43%"
          height={14}
          borderRadius={5}
        />

        <ShimmerPlaceholder
          width="38%"
          height={14}
          borderRadius={5}
        />

      </View>


      {/* =================================================
          VIEW MORE BUTTON
      ================================================= */}

      <ShimmerPlaceholder
        width="100%"
        height={46}
        borderRadius={9}
        style={{
          marginTop: 20,
        }}
      />

    </View>

  );

};


export default memo(
  VisitorHomeScreenSkeleton
);

 