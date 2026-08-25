import React, {
  memo,
} from "react";

import {
  View,
} from "react-native";

import ShimmerPlaceholder from "../../../../components/common/Loader/ShimmerPlaceholder";
import { renderElement } from "react-native/types_generated/Libraries/ReactNative/RendererImplementation";


const VisitorHomeScreenSkeleton = () => {

  return (

    <View
      style={{
        flex: 1,
        paddingTop: 20,
      }}
    >

      {/* ==========================================
          HEADER
      ========================================== */}

      <View
        style={{
          paddingHorizontal: 24,
        }}
      >

        <View
          style={{
            flexDirection: "row",
            justifyContent:
              "space-between",
          }}
        >

          <ShimmerPlaceholder
            width={130}
            height={25}
            borderRadius={8}
          />

          <ShimmerPlaceholder
            width={80}
            height={36}
            borderRadius={18}
          />

        </View>


        <ShimmerPlaceholder
          width={210}
          height={22}
          borderRadius={7}
          style={{
            marginTop: 28,
          }}
        />


        <ShimmerPlaceholder
          width={170}
          height={16}
          borderRadius={6}
          style={{
            marginTop: 8,
          }}
        />

      </View>


      {/* ==========================================
          STATS
      ========================================== */}

      <View
        style={{
          paddingHorizontal: 24,

          marginTop: 25,

          flexDirection: "row",

          flexWrap: "wrap",

          justifyContent:
            "space-between",
        }}
      >

        {[1, 2, 3, 4].map(
          (item) => (

            <View
              key={item}
              style={{
                width: "48%",

                height: 140,

                borderRadius: 16,

                backgroundColor:
                  "#FFFFFF",

                padding: 18,

                marginBottom: 14,

                borderWidth: 1,

                borderColor:
                  "#EEEEEE",
              }}
            >

              <ShimmerPlaceholder
                width={24}
                height={24}
                borderRadius={12}
              />

              <ShimmerPlaceholder
                width={70}
                height={14}
                borderRadius={5}
                style={{
                  marginTop: 20,
                }}
              />

              <ShimmerPlaceholder
                width={45}
                height={28}
                borderRadius={7}
                style={{
                  marginTop: 7,
                }}
              />

            </View>

          )
        )}

      </View>


      {/* ==========================================
          TABS
      ========================================== */}

      <ShimmerPlaceholder
        width="calc(100% - 48px)"
        height={55}
        borderRadius={11}
        style={{
          marginHorizontal: 24,
          marginTop: 10,
        }}
      />


      {/* ==========================================
          JOB CARDS
      ========================================== */}

      {[1, 2].map(
        (item) => (

          <View
            key={item}
            style={{
              marginHorizontal: 24,

              marginTop: 16,

              padding: 16,

              borderRadius: 16,

              backgroundColor:
                "#FFFFFF",

              borderWidth: 1,

              borderColor:
                "#EEEEEE",
            }}
          >

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >

              <ShimmerPlaceholder
                width={44}
                height={44}
                borderRadius={22}
              />

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
                    marginTop: 6,
                  }}
                />

              </View>

              <ShimmerPlaceholder
                width={80}
                height={27}
                borderRadius={15}
              />

            </View>


            <ShimmerPlaceholder
              width="90%"
              height={14}
              borderRadius={5}
              style={{
                marginTop: 22,
              }}
            />

            <ShimmerPlaceholder
              width="80%"
              height={14}
              borderRadius={5}
              style={{
                marginTop: 12,
              }}
            />


            <ShimmerPlaceholder
              width="100%"
              height={46}
              borderRadius={9}
              style={{
                marginTop: 20,
              }}
            />

          </View>

        )
      )}

    </View>

  );
};

export default memo(
  VisitorHomeScreenSkeleton
);

 