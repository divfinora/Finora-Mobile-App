// src/screens/GetLoan/LoanApplicationTracking/components/LoanSupportCard.jsx

import React, {
    memo,
} from "react";

import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import MaterialIcons from
    "@react-native-vector-icons/material-icons";

import {
    theme,
} from "../../../../theme";


const LoanSupportCard = ({
    onPress,
}) => {

    return (
        <View
            style={{
                marginTop:
                    theme.spacing.lg,

                padding:
                    theme.spacing.lg,

                borderRadius: 16,

                backgroundColor:
                    theme.colors.white,

                flexDirection:
                    "row",

                alignItems:
                    "center",
            }}
        >

            <View
                style={{
                    width: 44,

                    height: 44,

                    borderRadius: 999,

                    backgroundColor:
                        "#F1F5F9",

                    alignItems:
                        "center",

                    justifyContent:
                        "center",
                }}
            >

                <MaterialIcons
                    name="headset-mic"
                    size={24}
                    color={
                        theme.colors.navy900
                    }
                />

            </View>


            <View
                style={{
                    flex: 1,

                    marginLeft:
                        theme.spacing.md,
                }}
            >

                <Text
                    style={{
                        fontSize: 14,

                        fontFamily:
                            theme.fonts.bold,

                        color:
                            theme.colors.navy900,
                    }}
                >
                    Need Help?
                </Text>


                <Text
                    style={{
                        marginTop: 2,

                        fontSize: 12,

                        lineHeight: 17,

                        fontFamily:
                            theme.fonts.regular,

                        color:
                            theme.colors.gray500,
                    }}
                >
                    You can explore other loan
                    options or contact our
                    support team for assistance.
                </Text>

            </View>


            <TouchableOpacity
                activeOpacity={0.8}
                onPress={
                    onPress
                }
                style={{
                    borderWidth: 1,

                    borderColor:
                        "#FFB27D",

                    borderRadius: 10,

                    paddingHorizontal:
                        theme.spacing.md,

                    height: 38,

                    alignItems:
                        "center",

                    justifyContent:
                        "center",
                }}
            >

                <Text
                    style={{
                        fontSize: 12,

                        fontFamily:
                            theme.fonts.semiBold,

                        color:
                            theme.colors.primary700,
                    }}
                >
                    Contact Support
                </Text>

            </TouchableOpacity>

        </View>
    );
};


export default memo(
    LoanSupportCard
);