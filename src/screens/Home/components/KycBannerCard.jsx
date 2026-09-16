import React, { memo } from "react";

import {
  TouchableOpacity,
  Image,
} from "react-native";

import { theme } from "../../../theme";

const KycBannerCard = ({
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={{
       
        width: "100%",
        height: 145,

        borderRadius: theme.radius.lg,

        overflow: "hidden",

        backgroundColor: theme.colors.navy900,
      }}
    >
      <Image
        source={require("./assets/image.png")}
        resizeMode="contain"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </TouchableOpacity>
  );
};

export default memo(KycBannerCard);