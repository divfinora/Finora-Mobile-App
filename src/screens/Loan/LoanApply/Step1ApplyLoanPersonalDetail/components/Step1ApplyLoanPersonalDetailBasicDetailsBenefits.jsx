import React from "react";

import {
    View,
    Text,
} from "react-native";
import { theme } from "../../../../../theme";


const Step1ApplyLoanPersonalDetailBasicDetailsBenefits = ({items}) => {

    return (
        <View
            style={{
                marginHorizontal: 16,

                marginTop: 17,

                minHeight: 62,

                borderRadius: 13,

                backgroundColor: "#FFFFFF",

                flexDirection: "row",

                alignItems: "center",

                paddingHorizontal: 8,

                overflow: "hidden",
            }}
        >

            {items.map((item, index) => (

                <React.Fragment
                    key={item.title}
                >

                    {/* =================================
                        BENEFIT ITEM
                    ================================= */}

                    <View
                        style={{
                            flex: 1,

                            flexDirection: "row",

                            alignItems: "center",

                            justifyContent: "center",

                            minWidth: 0,

                            paddingHorizontal: 6,
                        }}
                    >

                        {/* =================================
                            VECTOR ICON
                        ================================= */}

                        <View
                            style={{
                                width: 30,

                                height: 30,

                                borderRadius: 999,

                                backgroundColor: "#FFF0D9",

                                alignItems: "center",

                                justifyContent: "center",

                                flexShrink: 0,
                            }}
                        >

                            {item.icon}

                        </View>


                        {/* =================================
                            TEXT
                        ================================= */}

                        <View
                            style={{
                                marginLeft: 7,

                                flexShrink: 1,

                                justifyContent: "center",

                                minWidth: 0,
                            }}
                        >

                            <Text
                                numberOfLines={2}
                                ellipsizeMode="tail"
                                style={{
                                    fontSize: 12,

                                    lineHeight: 15,

                                    fontFamily: theme.fonts.bold,
                                         

                                    color: "#1F2937",
                                }}
                            >
                                {item.title}
                            </Text>


                            {/* <Text
                                numberOfLines={1}
                                ellipsizeMode="tail"
                                style={{
                                    fontSize: 12,

                                    lineHeight: 15,

                                    fontFamily:
                                        "Manrope-SemiBold",

                                    color: "#1F2937",
                                }}
                            >
                                {item.subtitle}
                            </Text> */}

                        </View>

                    </View>


                    {/* =================================
                        DIVIDER
                    ================================= */}

                    {index <
                        items.length - 1 && (
                        <View
                            style={{
                                width: 1,

                                height: 28,

                                backgroundColor:
                                    "#E5E7EB",

                                flexShrink: 0,

                                marginHorizontal: 2,
                            }}
                        />
                    )}

                </React.Fragment>
            ))}

        </View>
    );
};


export default Step1ApplyLoanPersonalDetailBasicDetailsBenefits;