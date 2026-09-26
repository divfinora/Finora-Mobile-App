import React from "react";

import {
    View,
    Text,
    Pressable,
} from "react-native";

import MaterialIcons from "@react-native-vector-icons/material-icons";
import { theme } from "../../../../../theme";




// =====================================================
// LOAN AMOUNT OPTIONS
// =====================================================

const LOAN_AMOUNT_OPTIONS = [
    {
        value: 25000,
        label: "₹25,000",
        iconColor: "#F45D22",
        iconBackground: "#FFF0E7",
    },

    {
        value: 50000,
        label: "₹50,000",
        iconColor: "#2196F3",
        iconBackground: "#E8F3FF",
    },

    {
        value: 100000,
        label: "₹1,00,000",
        iconColor: "#10B981",
        iconBackground: "#E7F8F1",
    },

    {
        value: 200000,
        label: "₹2,00,000",
        iconColor: "#EC4899",
        iconBackground: "#FDEAF3",
    },

    {
        value: 500000,
        label: "₹5,00,000",
        iconColor: "#8B5CF6",
        iconBackground: "#F0E9FF",
    },

    {
        value: 1000000,
        label: "₹10,00,000",
        iconColor: "#F59E0B",
        iconBackground: "#FFF2C9",
    },

    {
        value: 1500000,
        label: "₹15,00,000",
        iconColor: "#10B981",
        iconBackground: "#E7F8F1",
    },

    {
        value: 5000000,
        label: "₹50,00,000",
        iconColor: "#2196F3",
        iconBackground: "#E8F3FF",
    },

    {
        value: 8000000,
        label: "₹80,00,000",
        iconColor: "#CBD5E1",
        iconBackground: "#F1F5F9",
    },
];


// =====================================================
// COMPONENT
// =====================================================

const Step1ApplyLoanAmountSelection = ({
    selectedAmount = null,
    error = "",
    onSelectAmount,
    onGetHelp
}) => {


    return (

        <View
            style={{
                width: "100%",
            }}
        >

            {/* =================================================
                SELECT LOAN AMOUNT CARD
            ================================================= */}

            <View
                style={{
                    marginTop: 16,
                    marginHorizontal: 16,


                    paddingHorizontal: 16,
                    paddingTop: 18,
                    paddingBottom: 16,

                    borderRadius: 16,

                    backgroundColor: "#FFFFFF",

                    borderWidth: error ? 1 : 0,

                    borderColor:
                        error
                            ? theme.colors.error
                            : "transparent",
                }}
            >

                {/* =================================================
                    TITLE
                ================================================= */}

                <Text
                    style={{
                        fontSize: 18,
                        lineHeight: 23,

                        fontFamily:
                            theme.fonts.extraBold,

                        color: "#0D1526",

                        marginBottom: 16,
                    }}
                >
                    Select Loan Amount
                </Text>


                {/* =================================================
                    AMOUNT GRID
                ================================================= */}

                <View
                    style={{
                        flexDirection: "row",

                        flexWrap: "wrap",

                        justifyContent:
                            "space-between",

                        rowGap: 10,
                    }}
                >

                    {LOAN_AMOUNT_OPTIONS.map(
                        (item) => {

                            const isSelected =
                                selectedAmount ===
                                item.value;


                            return (

                                <Pressable
                                    key={
                                        item.value
                                    }

                                    onPress={() => {

                                        if (
                                            onSelectAmount
                                        ) {
                                            onSelectAmount(
                                                item.value
                                            );
                                        }

                                    }}

                                    style={{
                                        width: "31.7%",

                                        height: 96,

                                        borderRadius: 16,

                                        backgroundColor:
                                            isSelected
                                                ? "#FFF5EF"
                                                : "#FFFFFF",

                                        borderWidth:
                                            isSelected
                                                ? 2
                                                : 1,

                                        borderColor:
                                            isSelected
                                                ? "#FF6B35"
                                                : "#DCE3EC",

                                        alignItems:
                                            "center",

                                        justifyContent:
                                            "center",

                                        position:
                                            "relative",

                                        shadowColor:
                                            "#64748B",

                                        shadowOffset: {
                                            width: 0,
                                            height: 2,
                                        },

                                        shadowOpacity:
                                            isSelected
                                                ? 0.03
                                                : 0.06,

                                        shadowRadius:
                                            4,

                                        elevation:
                                            isSelected
                                                ? 0
                                                : 1,
                                    }}
                                >

                                    {/* =================================================
                                        SELECTED CHECK
                                    ================================================= */}

                                    {isSelected && (

                                        <View
                                            style={{
                                                position:
                                                    "absolute",

                                                top: 7,
                                                right: 7,

                                                width: 17,
                                                height: 17,

                                                borderRadius:
                                                    999,

                                                backgroundColor:
                                                    "#FF6B35",

                                                alignItems:
                                                    "center",

                                                justifyContent:
                                                    "center",
                                            }}
                                        >

                                            <MaterialIcons
                                                name="check"
                                                size={12}
                                                color="#FFFFFF"
                                            />

                                        </View>

                                    )}


                                    {/* =================================================
                                        RUPEE ICON
                                    ================================================= */}

                                    <View
                                        style={{
                                            width: 38,
                                            height: 38,

                                            borderRadius: 999,

                                            backgroundColor:
                                                item.iconBackground,

                                            alignItems:
                                                "center",

                                            justifyContent:
                                                "center",

                                            marginBottom: 8,
                                        }}
                                    >

                                        <MaterialIcons
                                            name="currency-rupee"
                                            size={18}
                                            color={
                                                item.iconColor
                                            }
                                        />

                                    </View>


                                    {/* =================================================
                                        AMOUNT
                                    ================================================= */}

                                    <Text
                                        style={{
                                            fontSize: 14,

                                            lineHeight: 18,

                                            fontFamily:
                                                theme.fonts.extraBold,

                                            color:
                                                "#0D1526",

                                            textAlign:
                                                "center",
                                        }}
                                        numberOfLines={1}
                                        adjustsFontSizeToFit
                                        minimumFontScale={0.85}
                                    >
                                        {
                                            item.label
                                        }
                                    </Text>

                                </Pressable>

                            );

                        }
                    )}

                </View>

            </View>

            {/* =================================================
                LOAN AMOUNT ERROR
            ================================================= */}

            {!!error && (

                <Text
                    style={{
                        marginTop: 6,
                        marginHorizontal: 18,
                        fontSize: 12,
                        lineHeight: 16,
                        fontFamily:
                            theme.fonts.medium,
                        color:
                            theme.colors.error,
                    }}
                >
                    {error}
                </Text>

            )}



            {/* =================================================
    LOAN ASSISTANCE CARD
================================================= */}

            <View
                style={{
                    marginHorizontal: 16,

                    marginTop: 16,

                    minHeight: 76,

                    borderRadius: 16,

                    paddingHorizontal: 14,
                    paddingVertical: 9,

                    backgroundColor: "#E5F7EE",

                    borderWidth: 1,
                    borderColor: "#C6EBDD",

                    flexDirection: "row",

                    alignItems: "center",

                    justifyContent: "space-between",
                }}
            >

                {/* =================================================
        HEADSET ICON
    ================================================= */}

                <View
                    style={{
                        width: 38,
                        height: 38,

                        alignItems: "center",
                        justifyContent: "center",

                        marginRight: 8,
                    }}
                >
                    <MaterialIcons
                        name="headset-mic"
                        size={27}
                        color="#075B40"
                    />
                </View>


                {/* =================================================
        TEXT
    ================================================= */}

                <View
                    style={{
                        flex: 1,

                        paddingRight: 8,
                    }}
                >

                    <Text
                        style={{
                            fontSize: 13,

                            lineHeight: 16,

                            fontFamily: theme.fonts.bold,

                            color: "#17212B",

                            marginBottom: 1,
                        }}
                    >
                        Loan Assistance
                    </Text>

                    <Text
                        style={{
                            fontSize: 12,

                            lineHeight: 15,

                            fontFamily: theme.fonts.regular,

                            color: "#52616B",
                        }}
                        numberOfLines={2}
                    >
                        Need help with your loan application?
                    </Text>

                </View>


                {/* =================================================
        GET HELP BUTTON
    ================================================= */}

                <Pressable
                    onPress={onGetHelp}
                    style={{
                        height: 34,

                        minWidth: 89,

                        paddingHorizontal: 11,

                        borderRadius: 999,

                        backgroundColor: "#075B40",

                        flexDirection: "row",

                        alignItems: "center",

                        justifyContent: "center",
                    }}
                >

                    <Text
                        style={{
                            fontSize: 12,

                            lineHeight: 16,

                            fontFamily: theme.fonts.medium,

                            color: "#FFFFFF",

                            marginRight: 4,
                        }}
                    >
                        Get Help
                    </Text>

                    <MaterialIcons
                        name="arrow-forward"
                        size={16}
                        color="#FFFFFF"
                    />

                </Pressable>

            </View>




        </View>
    );
};


export default Step1ApplyLoanAmountSelection;

