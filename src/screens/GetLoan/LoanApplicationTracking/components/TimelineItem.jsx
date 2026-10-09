// src/screens/GetLoan/LoanApplicationTracking/components/TimelineItem.jsx

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


// ============================================================
// TIMELINE DOT
// ============================================================

const TimelineDot = ({
    state,
}) => {

    const completed =
        state === "completed";

    const current =
        state === "current";

    const rejected =
        state === "rejected";


    // ----------------------------------------------------------
    // DEFAULT / PENDING
    // ----------------------------------------------------------

    let borderColor =
        "#E5E7EB";

    let backgroundColor =
        "#F3F4F6";


    // ----------------------------------------------------------
    // COMPLETED
    // ----------------------------------------------------------

    if (completed) {

        borderColor =
            "#00A078";

        backgroundColor =
            "#F0FFF9";
    }


    // ----------------------------------------------------------
    // CURRENT
    // ----------------------------------------------------------

    if (current) {

        borderColor =
            "#FF9847";

        backgroundColor =
            "#FFF1E3";
    }


    // ----------------------------------------------------------
    // REJECTED
    // ----------------------------------------------------------

    if (rejected) {

        borderColor =
            "#E91E4D";

        backgroundColor =
            "#E91E4D";
    }


    return (
        <View
            style={{
                width: 28,

                height: 28,

                borderRadius: 14,

                borderWidth:
                    current
                        ? 3
                        : 2,

                borderColor,

                backgroundColor,

                alignItems:
                    "center",

                justifyContent:
                    "center",

                zIndex: 2,
            }}
        >

            {/* =================================================
                COMPLETED
            ================================================= */}

            {completed && (
                <MaterialIcons
                    name="check"
                    size={16}
                    color="#00A078"
                />
            )}


            {/* =================================================
                CURRENT
            ================================================= */}

            {current && (
                <View
                    style={{
                        width: 14,

                        height: 14,

                        borderRadius: 7,

                        backgroundColor:
                            "#FF9847",
                    }}
                />
            )}


            {/* =================================================
                REJECTED
            ================================================= */}

            {rejected && (
                <MaterialIcons
                    name="close"
                    size={16}
                    color={
                        theme.colors.white
                    }
                />
            )}

        </View>
    );
};


// ============================================================
// TIMELINE ITEM
// ============================================================

const TimelineItem = ({
    title,
    description,
    rightText,
    state,
    last = false,
}) => {

    const completed =
        state === "completed";

    const rejected =
        state === "rejected";


    // ----------------------------------------------------------
    // TITLE COLOR
    // ----------------------------------------------------------

    const titleColor =
        completed ||
        state === "current" ||
        rejected
            ? theme.colors.black
            : "#62748C";


    // ----------------------------------------------------------
    // TIMELINE LINE COLOR
    // ----------------------------------------------------------

    const lineColor =
        rejected
            ? "#E91E4D"
            : completed
                ? "#00A078"
                : "#FFE0B5";


    return (
        <View
            style={{
                flexDirection:
                    "row",

                minHeight:
                    last
                        ? 74
                        : 82,
            }}
        >

            {/* =================================================
                LEFT TIMELINE
            ================================================= */}

            <View
                style={{
                    width: 32,

                    alignItems:
                        "center",

                    position:
                        "relative",
                }}
            >

                {/* DOT */}

                <TimelineDot
                    state={
                        state
                    }
                />


                {/* LINE */}

                {!last && (
                    <View
                        style={{
                            position:
                                "absolute",

                            top: 28,

                            bottom: 0,

                            width: 2,

                            backgroundColor:
                                lineColor,

                            zIndex: 1,
                        }}
                    />
                )}

            </View>


            {/* =================================================
                CONTENT
            ================================================= */}

            <View
                style={{
                    flex: 1,

                    marginLeft:
                        theme.spacing.md,

                    paddingBottom:
                        theme.spacing.sm,
                }}
            >

                {/* TITLE + RIGHT TEXT */}

                <View
                    style={{
                        flexDirection:
                            "row",

                        justifyContent:
                            "space-between",

                        alignItems:
                            "flex-start",
                    }}
                >

                    <Text
                        style={{
                            flex: 1,

                            fontSize: 15,

                            lineHeight: 21,

                            fontFamily:
                                state === "pending"
                                    ? theme.fonts.medium
                                    : theme.fonts.semiBold,

                            color:
                                titleColor,
                        }}
                    >
                        {title}
                    </Text>


                    {!!rightText && (
                        <Text
                            style={{
                                marginLeft:
                                    theme.spacing.sm,

                                fontSize: 10,

                                lineHeight: 15,

                                fontFamily:
                                    theme.fonts.bold,

                                color:
                                    rejected
                                        ? "#E91E4D"
                                        : state === "current" ||
                                          completed
                                            ? "#00A078"
                                            : "#53647A",

                                textAlign:
                                    "right",
                            }}
                        >
                            {rightText}
                        </Text>
                    )}

                </View>


                {/* DESCRIPTION */}

                {!!description && (
                    <Text
                        style={{
                            marginTop:
                                theme.spacing.sm,

                            fontSize: 13,

                            lineHeight: 19,

                            fontFamily:
                                theme.fonts.regular,

                            color:
                                "#91A1B5",
                        }}
                    >
                        {description}
                    </Text>
                )}

            </View>

        </View>
    );
};


export default memo(
    TimelineItem
);