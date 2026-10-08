// src/screens/GetLoan/LoanApplicationTracking/components/EligibleLoanCard.jsx

import React, {
    memo,
} from "react";

import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import {
    theme,
} from "../../../../theme";


const EligibleLoanCard = ({
    onContinue,
}) => {

    return (
        <View
            style={{
                marginTop:
                    theme.spacing.sm,

                padding:
                    theme.spacing.md,

                borderRadius: 14,

                backgroundColor:
                    "#F5F6FF",
            }}
        >

            <View
                style={{
                    flexDirection:
                        "row",

                    alignItems:
                        "center",
                }}
            >

                <Text
                    style={{
                        flex: 1,

                        fontSize: 13,

                        lineHeight: 19,

                        fontFamily:
                            theme.fonts.regular,

                        color:
                            theme.colors.black,
                    }}
                >
                    You're{" "}

                    <Text
                        style={{
                            fontFamily:
                                theme.fonts.bold,

                            color:
                                "#00A078",
                        }}
                    >
                        eligible
                    </Text>

                    {" "}for this loan.
                    Tap Continue to proceed
                    with your application.
                </Text>


                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={
                        onContinue
                    }
                    style={{
                        minWidth: 78,

                        height: 34,

                        borderRadius: 8,

                        paddingHorizontal:
                            theme.spacing.sm,

                        alignItems:
                            "center",

                        justifyContent:
                            "center",

                        backgroundColor:
                            "#59D7A9",
                    }}
                >

                    <Text
                        style={{
                            fontSize: 11,

                            fontFamily:
                                theme.fonts.bold,

                            color:
                                theme.colors.white,
                        }}
                    >
                        Continue →
                    </Text>

                </TouchableOpacity>

            </View>

        </View>
    );
};


export default memo(
    EligibleLoanCard
);