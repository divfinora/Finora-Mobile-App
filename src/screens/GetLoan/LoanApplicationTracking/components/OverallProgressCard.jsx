// src/screens/GetLoan/LoanApplicationTracking/components/OverallProgressCard.jsx

import React, {
    memo,
} from "react";

import {
    Text,
    View,
} from "react-native";

import {
    theme,
} from "../../../../theme";


const OverallProgressCard = ({
    progress = 0,
    rejected = false,
}) => {

    const percentage =
        Math.min(
            Math.max(
                Number(progress) || 0,
                0
            ),
            100
        );


    const progressColor =
        rejected
            ? theme.colors.error
            : "#009E75";


    return (
        <View
            style={{
                backgroundColor:
                    theme.colors.white,

                borderWidth: 1,

                borderColor:
                    "#9A928C",

                borderRadius: 16,

                padding:
                    theme.spacing.lg,
            }}
        >

            <View
                style={{
                    flexDirection:
                        "row",

                    justifyContent:
                        "space-between",

                    alignItems:
                        "center",
                }}
            >

                <Text
                    style={{
                        fontSize: 12,

                        letterSpacing: 1,

                        fontFamily:
                            theme.fonts.medium,

                        color:
                            theme.colors.gray700,
                    }}
                >
                    OVERALL PROGRESS
                </Text>


                <Text
                    style={{
                        fontSize: 16,

                        fontFamily:
                            theme.fonts.bold,

                        color:
                            progressColor,
                    }}
                >
                    {percentage}%
                </Text>

            </View>


            <View
                style={{
                    height:
                        10,

                    borderRadius:
                        999,

                    backgroundColor:
                        theme.colors.gray200,

                    overflow:
                        "hidden",

                    marginTop:
                        theme.spacing.lg,
                }}
            >

                <View
                    style={{
                        width:
                            `${percentage}%`,

                        height:
                            "100%",

                        borderRadius:
                            999,

                        backgroundColor:
                            progressColor,
                    }}
                />

            </View>


            <View
                style={{
                    flexDirection:
                        "row",

                    justifyContent:
                        "space-between",

                    marginTop:
                        theme.spacing.sm,
                }}
            >

                <Text
                    style={{
                        fontSize: 11,

                        fontFamily:
                            theme.fonts.medium,

                        color:
                            "#8A97A8",
                    }}
                >
                    Submitted
                </Text>


                <Text
                    style={{
                        fontSize: 11,

                        fontFamily:
                            theme.fonts.medium,

                        color:
                            "#8A97A8",
                    }}
                >
                    Disbursed
                </Text>

            </View>

        </View>
    );
};


export default memo(
    OverallProgressCard
);