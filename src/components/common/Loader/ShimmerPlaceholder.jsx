// ============================================
// components/ShimmerPlaceholder.jsx
// CUSTOM SHIMMER LOADER
// ============================================

import React,
{
  useEffect,
  useRef,
} from "react";

import {
  Animated,
  View,
} from "react-native";

const ShimmerPlaceholder = ({
  width = "100%",
  height = 20,
  borderRadius = 10,
  style = {},
}) => {

  const shimmerAnim =
    useRef(
      new Animated.Value(-1)
    ).current;

  useEffect(() => {

    Animated.loop(
      Animated.timing(
        shimmerAnim,
        {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }
      )
    ).start();

  }, []);

  const translateX =
    shimmerAnim.interpolate({
      inputRange: [-1, 1],
      outputRange: [-250, 250],
    });

  return (
    <View
      style={{
        width,
        height,
        overflow: "hidden",
        backgroundColor:
          "#E5E7EB",
        borderRadius,
        ...style,
      }}
    >
      <Animated.View
        style={{
          width: "40%",
          height: "100%",
          backgroundColor:
            "#F8FAFC",
          opacity: 0.5,
          transform: [
            {
              translateX,
            },
          ],
        }}
      />
    </View>
  );
};

export default
  ShimmerPlaceholder;