import React, {
  memo,
  useEffect,
  useRef,
} from "react";

import {
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

const CommonSwitch = ({

  value = false,

  onValueChange,

  disabled = false,

  loading = false,

}) => {

  const translateX =
    useRef(

      new Animated.Value(
        value
          ? 24
          : 0
      )

    ).current;

  const scale =
    useRef(
      new Animated.Value(1)
    ).current;

  useEffect(() => {

    Animated.spring(

      translateX,

      {

        toValue:
          value
            ? 24
            : 0,

        damping: 16,

        stiffness: 180,

        mass: 0.8,

        useNativeDriver: true,

      }

    ).start();

  }, [
    value,
    translateX,
  ]);

  useEffect(() => {

    let animation;

    if (loading) {

      animation =
        Animated.loop(

          Animated.sequence([

            Animated.timing(
              scale,
              {

                toValue: 0.92,

                duration: 450,

                easing: Easing.linear,

                useNativeDriver: true,

              }

            ),

            Animated.timing(
              scale,
              {

                toValue: 1,

                duration: 450,

                easing: Easing.linear,

                useNativeDriver: true,

              }

            ),

          ])

        );

      animation.start();

    } else {

      scale.stopAnimation();

      scale.setValue(1);

    }

    return () => {

      animation?.stop();

    };

  }, [
    loading,
    scale,
  ]);

  return (

    <TouchableOpacity

      activeOpacity={0.9}

      disabled={
        disabled ||
        loading
      }

      onPress={() =>
        onValueChange?.(
          !value
        )
      }

    >

      <Animated.View

        style={{

          width: 48,

          height: 24,

          borderRadius: 999,

          overflow: "hidden",

          transform: [

            {
              scale,
            },

          ],

          opacity:
            disabled
              ? 0.6
              : 1,

        }}

      >

        <LinearGradient

          colors={
            value

              ? [
                  "#76B852",
                  "#8DC26F",
                ]

              : [
                  "#757F9A",
                  "#D7DDE8",
                ]
          }

          start={{
            x: 0,
            y: 0.5,
          }}

          end={{
            x: 1,
            y: 0.5,
          }}

          style={{

            flex: 1,

            justifyContent: "center",

            paddingHorizontal: 4,

          }}

        >

          <Animated.View

            style={{

              width: 16,

              height: 16,

              borderRadius: 8,

              backgroundColor: "#FFFFFF",

              transform: [

                {
                  translateX,
                },

              ],

              shadowColor: "#000",

              shadowOpacity: 0.18,

              shadowRadius: 4,

              shadowOffset: {

                width: 0,

                height: 2,

              },

              elevation: 4,

            }}

          />

        </LinearGradient>

      </Animated.View>

    </TouchableOpacity>

  );

};

export default memo(CommonSwitch);