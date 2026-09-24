import React from "react";

import {
    View,
    Image,
    useWindowDimensions,
} from "react-native";

const Step1ApplyLoanPersonalDetailBasicDetailsBanner = ({
    bannerSource,
}) => {
    const { width } = useWindowDimensions();

    const horizontalMargin = 16;

    const bannerWidth =
        width - horizontalMargin * 2;

    const bannerHeight =
        bannerWidth * (146.2513 / 396);

    return (
        <View
            style={{
                marginHorizontal: horizontalMargin,
                marginTop: 17,

                width: bannerWidth,
                height: bannerHeight,

                borderRadius: 16,

                overflow: "hidden",

                backgroundColor: "#063E4A",
            }}
        >
            <Image
                source={bannerSource}
                resizeMode="contain"
                style={{
                    width: "100%",
                    height: "100%",
                }}
            />
        </View>
    );
};

export default Step1ApplyLoanPersonalDetailBasicDetailsBanner;