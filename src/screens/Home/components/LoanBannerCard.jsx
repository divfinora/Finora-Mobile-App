import React, { memo } from "react";
import { View, Image } from "react-native";

import LinearGradient from "react-native-linear-gradient";

import ImageCarousel from "../../../components/common/ImageCarousel/ImageCarousel";
import { theme } from "../../../theme";

import Banner1 from "./assets/banner1.png";
import Banner2 from "./assets/banner2.png";
import Banner3 from "./assets/banner3.png";
import Banner4 from "./assets/banner4.png";
import Banner5 from "./assets/banner5.png";

const banners = [
  {
    id: "1",
    bannerImage: Banner1,
  },
  {
    id: "2",
    bannerImage: Banner2,
  },
  {
    id: "3",
    bannerImage: Banner3,
  },
  {
    id: "4",
    bannerImage: Banner4,
  },
  {
    id: "5",
    bannerImage: Banner5,
  },
];

const LoanBannerCard = ({
  MarginTop,
  ContainerPaddingHorizontal = theme.spacing.lg,
  ContainerPaddingVertical = theme.spacing.lg,
}) => {
  const bannerWidth =
    Image.resolveAssetSource(Banner1).width;

  const bannerHeight =
    Image.resolveAssetSource(Banner1).height;

  const aspectRatio =
    bannerWidth / bannerHeight;

  return (
    <View
    style={{
      marginTop: MarginTop,
      width: "100%",
    }}
  >
    <ImageCarousel
      data={banners}
      height={undefined}
      autoScrollTime={3000}
      resizeMode="contain"
      onPressItem={(item) => {
        console.log(
          "Loan banner pressed:",
          item.id
        );
      }}
    />
  </View>
  );
};

export default memo(
  LoanBannerCard
);