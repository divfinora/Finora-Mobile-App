import React, {
  useEffect,
  useRef,
} from "react";

import {
  View,
  Animated,
  Easing,
} from "react-native";

import {
  theme,
} from "../../../../theme/index.js";


const VisitorProfileBannerSkeleton = () => {

  // =====================================================
  // SHIMMER ANIMATION
  // =====================================================

  const shimmerAnim =
    useRef(
      new Animated.Value(0)
    ).current;


  useEffect(() => {

    const animation =
      Animated.loop(

        Animated.sequence([

          Animated.timing(
            shimmerAnim,
            {
              toValue: 1,

              duration: 900,

              easing:
                Easing.linear,

              useNativeDriver:
                true,
            }
          ),

          Animated.timing(
            shimmerAnim,
            {
              toValue: 0,

              duration: 900,

              easing:
                Easing.linear,

              useNativeDriver:
                true,
            }
          ),

        ])

      );


    animation.start();


    return () => {

      animation.stop();

    };

  }, [
    shimmerAnim,
  ]);


  // =====================================================
  // OPACITY
  // =====================================================

  const opacity =
    shimmerAnim.interpolate({

      inputRange: [
        0,
        0.5,
        1,
      ],

      outputRange: [
        0.45,
        0.8,
        0.45,
      ],

    });


  // =====================================================
  // SKELETON BOX
  // =====================================================

  const SkeletonBox = ({
    width,
    height,
    borderRadius = 8,
    style = {},
  }) => (

    <Animated.View
      style={[
        {
          width,
          height,

          borderRadius,

          backgroundColor:
            theme.colors.gray200,

          opacity,
        },

        style,
      ]}
    />

  );


  return (

    <View
      style={{
        backgroundColor:
          theme.colors.white,

        borderRadius:
          24,

        padding:
          theme.spacing.xl,

        paddingVertical:
          28,

        alignItems:
          "center",

        marginBottom:
          theme.spacing.xl,

        borderWidth:
          0.4,

        borderColor:
          "#E5E5E5",

        ...theme.shadows.card,
      }}
    >

      {/* =================================================
          PROFILE IMAGE SKELETON
      ================================================= */}

      <SkeletonBox
        width={92}
        height={92}
        borderRadius={46}
      />


      {/* =================================================
          NAME SKELETON
      ================================================= */}

      <SkeletonBox
        width={150}
        height={25}
        borderRadius={8}

        style={{
          marginTop:
            theme.spacing.lg,
        }}
      />


      {/* =================================================
          STATUS SKELETON
      ================================================= */}

      <SkeletonBox
        width={65}
        height={27}
        borderRadius={50}

        style={{
          marginTop:
            theme.spacing.sm,
        }}
      />


      {/* =================================================
          DESIGNATION / OCCUPATION SKELETON
      ================================================= */}

      <SkeletonBox
        width={190}
        height={18}
        borderRadius={7}

        style={{
          marginTop:
            theme.spacing.md,
        }}
      />


      {/* =================================================
          EMPLOYEE ID SKELETON
      ================================================= */}

      <SkeletonBox
        width={125}
        height={15}
        borderRadius={6}

        style={{
          marginTop:
            theme.spacing.xs,
        }}
      />

    </View>

  );

};


export default VisitorProfileBannerSkeleton;