import React from "react";

import {
    View,
    Text,
} from "react-native";


const Step1ApplyLoanPersonalDetailBasicDetailsBenefits = () => {

    const items = [
        {
            icon: "⏱",
            title: "Quick",
            subtitle: "Approval",
        },

        {
            icon: "🛡",
            title: "100%",
            subtitle: "Secure",
        },

        {
            icon: "📄",
            title: "Minimal",
            subtitle: "Documents",
        },
    ];


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
                        }}
                    >

                        {/* =================================
                            EMOJI ICON
                        ================================= */}

                        <View
                            style={{
                                width: 38,

                                height: 38,

                                borderRadius: 999,

                                backgroundColor: "#FFF0D9",

                                alignItems: "center",

                                justifyContent: "center",

                                flexShrink: 0,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 20,

                                    includeFontPadding: false,
                                }}
                            >
                                {item.icon}
                            </Text>

                        </View>


                        {/* =================================
                            TEXT
                        ================================= */}

                        <View
                            style={{
                                marginLeft: 7,

                                flexShrink: 1,

                                justifyContent: "center",
                            }}
                        >

                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 12,

                                    lineHeight: 15,

                                    fontFamily:
                                        "Manrope-SemiBold",

                                    color: "#1F2937",
                                }}
                            >
                                {item.title}
                            </Text>


                            <Text
                                numberOfLines={1}
                                style={{
                                    fontSize: 12,

                                    lineHeight: 15,

                                    fontFamily:
                                        "Manrope-SemiBold",

                                    color: "#1F2937",
                                }}
                            >
                                {item.subtitle}
                            </Text>

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
                            }}
                        />
                    )}

                </React.Fragment>
            ))}

        </View>
    );
};


export default Step1ApplyLoanPersonalDetailBasicDetailsBenefits;