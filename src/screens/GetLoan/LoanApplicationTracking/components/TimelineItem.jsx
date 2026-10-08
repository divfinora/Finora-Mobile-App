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


const TimelineDot = ({
    state,
}) => {

    const completed =
        state === "completed";

    const current =
        state === "current";

    const rejected =
        state === "rejected";


    let borderColor =
        theme.colors.gray300;

    let backgroundColor =
        "#FFF4E8";


    if (completed) {
        borderColor =
            "#009E75";

        backgroundColor =
            "#E9FFF7";
    }


    if (current) {
        borderColor =
            "#FF9A45";

        backgroundColor =
            "#FFF0DF";
    }


    if (rejected) {
        borderColor =
            theme.colors.error;

        backgroundColor =
            theme.colors.error;
    }


    return (
        <View
            style={{
                width: 28,

                height: 28,

                borderRadius: 999,

                borderWidth: 2,

                borderColor,

                backgroundColor,

                alignItems:
                    "center",

                justifyContent:
                    "center",
            }}
        >

            {completed && (
                <MaterialIcons
                    name="check"
                    size={18}
                    color="#009E75"
                />
            )}


            {current && (
                <View
                    style={{
                        width: 12,

                        height: 12,

                        borderRadius: 999,

                        backgroundColor:
                            "#FF9A45",
                    }}
                />
            )}


            {rejected && (
                <MaterialIcons
                    name="close"
                    size={17}
                    color={
                        theme.colors.white
                    }
                />
            )}

        </View>
    );
};


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


    const titleColor =
        completed ||
        state === "current" ||
        rejected
            ? theme.colors.black
            : "#62748C";


    const lineColor =
        rejected
            ? theme.colors.error
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

            {/* LEFT */}

            <View
                style={{
                    width: 32,

                    alignItems:
                        "center",
                }}
            >

                <TimelineDot
                    state={
                        state
                    }
                />


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
                        }}
                    />
                )}

            </View>


            {/* CONTENT */}

            <View
                style={{
                    flex: 1,

                    marginLeft:
                        theme.spacing.md,

                    paddingBottom:
                        theme.spacing.sm,
                }}
            >

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
                                        ? theme.colors.error
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