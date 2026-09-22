import React, { memo } from "react";
import { View, Image } from "react-native";

import ImageCarousel from "../../../components/common/ImageCarousel/ImageCarousel";
import { theme } from "../../../theme";

import Banner1 from "./assets/Banner1.png";

const banners = [
  {
    id: "1",
    bannerImage: Banner1,
  },
  {
    id: "2",
    bannerImage: Banner1,
  },
  {
    id: "3",
    bannerImage: Banner1,
  },
  {
    id: "4",
    bannerImage: Banner1,
  },
  {
    id: "5",
    bannerImage: Banner1,
  },
];

const LoanBannerCard = ({
  MarginTop ,
   ContainerPaddingHorizontal =  theme.spacing.lg ,
   ContainerPaddingVertical = theme.spacing.lg
  
}) => {
  const bannerWidth = Image.resolveAssetSource(Banner1).width;
  const bannerHeight = Image.resolveAssetSource(Banner1).height;

  const aspectRatio = bannerWidth / bannerHeight;

  return (
    <View
      style={{
        marginTop:MarginTop,
        backgroundColor: theme.colors.white,
        paddingHorizontal:ContainerPaddingHorizontal ,
        paddingVertical:ContainerPaddingVertical ,
        width: "100%",
       
        
      }}
    >
      <ImageCarousel
        data={banners}
        height={undefined}
        autoScrollTime={3000}
        resizeMode="contain"
        onPressItem={(item) => {
          console.log("Loan banner pressed:", item.id);
        }}
      />
    </View>
  );
};

export default memo(LoanBannerCard);