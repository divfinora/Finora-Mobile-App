// src/screens/GetLoan/LoanApplicationTracking/components/RejectedLoanCard.jsx

import React, {
    memo,
} from "react";

import {
    Text,
    View,
} from "react-native";

import MaterialIcons from
    "@react-native-vector-icons/material-icons";

import {
    theme,
} from "../../../../theme";

import {
    formatAmount,
    getLoanName,
} from "../utils/loanTrackingHelpers";


const RejectedLoanCard = ({
    loan,
}) => {

    const loanName =
        getLoanName(
            loan
        );


    const amount =
        loan?.loanAmount ??
        loan?.amount ??
        20000;


    return (
        <View
            style={{
                backgroundColor:
                    "#FFF9FA",

                borderRadius: 16,

                padding:
                    theme.spacing.lg,

                marginBottom:
                    theme.spacing.lg,
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

                <View
                    style={{
                        width: 56,

                        height: 56,

                        borderRadius: 12,

                        backgroundColor:
                            "#FFE5D8",

                        alignItems:
                            "center",

                        justifyContent:
                            "center",
                    }}
                >

                    <MaterialIcons
                        name="account-balance-wallet"
                        size={28}
                        color={
                            theme.colors.primary500
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
                            fontSize: 16,

                            fontFamily:
                                theme.fonts.semiBold,

                            color:
                                theme.colors.navy900,
                        }}
                    >
                        {loanName}
                    </Text>


                    <Text
                        style={{
                            marginTop: 2,

                            fontSize: 17,

                            fontFamily:
                                theme.fonts.semiBold,

                            color:
                                theme.colors.navy900,
                        }}
                    >
                        {formatAmount(
                            amount
                        )}
                    </Text>

                </View>


                <View
                    style={{
                        flexDirection:
                            "row",

                        alignItems:
                            "center",

                        paddingHorizontal:
                            10,

                        paddingVertical:
                            6,

                        borderRadius: 7,

                        backgroundColor:
                            "#FFF0F2",

                        borderWidth: 1,

                        borderColor:
                            "#FFB8C2",
                    }}
                >

                    <MaterialIcons
                        name="cancel"
                        size={14}
                        color={
                            theme.colors.error
                        }
                    />

                    <Text
                        style={{
                            marginLeft: 4,

                            fontSize: 11,

                            fontFamily:
                                theme.fonts.semiBold,

                            color:
                                theme.colors.error,
                        }}
                    >
                        Rejected
                    </Text>

                </View>

            </View>


            <View
                style={{
                    marginTop:
                        theme.spacing.lg,

                    flexDirection:
                        "row",
                }}
            >

                <View
                    style={{
                        flex: 1,
                    }}
                >

                    <Text
                        style={{
                            fontSize: 14,

                            lineHeight: 21,

                            fontFamily:
                                theme.fonts.semiBold,

                            color:
                                "#E11D48",
                        }}
                    >
                        Unfortunately, your{" "}
                        {loanName}{" "}
                        application could not
                        be approved.
                    </Text>


                    <Text
                        style={{
                            marginTop:
                                theme.spacing.sm,

                            fontSize: 13,

                            lineHeight: 19,

                            fontFamily:
                                theme.fonts.regular,

                            color:
                                "#9AA8B9",
                        }}
                    >
                        Your application did not
                        meet our current approval
                        criteria.
                    </Text>

                </View>


                <View
                    style={{
                        width: 90,

                        height: 90,

                        marginLeft:
                            theme.spacing.md,

                        borderWidth: 2,

                        borderColor:
                            "#FFD0D8",

                        borderRadius: 14,

                        alignItems:
                            "center",

                        justifyContent:
                            "center",
                    }}
                >

                    <MaterialIcons
                        name="description"
                        size={42}
                        color="#FFD0D8"
                    />


                    <View
                        style={{
                            position:
                                "absolute",

                            right: -9,

                            bottom: -9,

                            width: 38,

                            height: 38,

                            borderRadius: 999,

                            backgroundColor:
                                "#E91E4D",

                            alignItems:
                                "center",

                            justifyContent:
                                "center",

                            borderWidth: 3,

                            borderColor:
                                theme.colors.white,
                        }}
                    >

                        <MaterialIcons
                            name="close"
                            size={20}
                            color={
                                theme.colors.white
                            }
                        />

                    </View>

                </View>

            </View>

        </View>
    );
};


export default memo(
    RejectedLoanCard
);