import React from "react";

import {
  View,
  Image,
  useWindowDimensions,
} from "react-native";

import { theme } from "../../../../theme";

const OTPIllustration = ({
  source,
  containerStyle,
  imageStyle,
  resizeMode = "contain",
}) => {

  const {
    width,
    height,
  } = useWindowDimensions();

  const isTablet =
    width >= 768;

  const isSmall =
    height < 700;

  const imageSize =
    isTablet
      ? 300
      : isSmall
      ? 200
      : Math.min(width * 0.60, 250);

  if (!source) return null;

  return (
    <View
      style={[
        {
          alignItems: "center",

          justifyContent: "center",

          marginBottom: theme.spacing.xxxl,
        },
        containerStyle,
      ]}
    >
      <Image
        source={source}
        resizeMode={resizeMode}
        style={[
          {
            width: imageSize,

            height: imageSize,
          },
          imageStyle,
        ]}
      />
    </View>
  );
};

export default OTPIllustration;