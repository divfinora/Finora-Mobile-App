// ============================================================
// src/screens/GetLoan/MyLoan/components/LoanHistoryHeader.jsx
// ============================================================

import React, {
    memo,
} from "react";

import {
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import MaterialIcons from "@react-native-vector-icons/material-icons";

import {
    theme,
} from "../../../../theme";


// ============================================================
// COMPONENT
// ============================================================

const LoanHistoryHeader = ({
    searchText,
    onSearchChange,
    onFilterPress,
    onBackPress,
}) => {

    return (

        <View
            style={{
                backgroundColor:
                    "#FAF4E9",

                paddingHorizontal:
                    theme.spacing.lg,

                paddingTop:
                    theme.spacing.sm,

                paddingBottom:
                    theme.spacing.lg,
            }}
        >

            {/* =================================================
                TOP HEADER
            ================================================= */}

            <View
                style={{
                    height: 58,

                    flexDirection: "row",

                    alignItems: "center",

                    justifyContent:
                        "space-between",
                }}
            >

                {/* BACK */}

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onBackPress}
                    style={{
                        width: 48,

                        height: 48,

                        borderRadius:
                            theme.radius.md,

                        backgroundColor:
                            theme.colors.white,

                        alignItems: "center",

                        justifyContent: "center",
                    }}
                >

                    <MaterialIcons
                        name="arrow-back"
                        size={25}
                        color={
                            theme.colors.black
                        }
                    />

                </TouchableOpacity>


                {/* TITLE */}

                <Text
                    style={{
                        fontSize:
                            theme.typography.h3,

                        fontFamily:
                            theme.fonts.headingSemiBold,

                        color:
                            theme.colors.black,
                    }}
                >
                    Loan History
                </Text>


                {/* NOTIFICATION */}

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={{
                        width: 48,

                        height: 48,

                        borderRadius:
                            theme.radius.md,

                        backgroundColor:
                            theme.colors.white,

                        alignItems: "center",

                        justifyContent: "center",
                    }}
                >

                    <MaterialIcons
                        name="notifications"
                        size={23}
                        color={
                            theme.colors.primary500
                        }
                    />

                </TouchableOpacity>

            </View>


            {/* =================================================
                SEARCH
            ================================================= */}

            <View
                style={{
                    flexDirection: "row",

                    alignItems: "center",

                    marginTop:
                        theme.spacing.md,
                }}
            >

                {/* SEARCH BOX */}

                <View
                    style={{
                        flex: 1,

                        height: 52,

                        borderRadius:
                            theme.radius.md,

                        backgroundColor:
                            theme.colors.white,

                        flexDirection: "row",

                        alignItems: "center",

                        paddingHorizontal:
                            theme.spacing.md,
                    }}
                >

                    <MaterialIcons
                        name="search"
                        size={21}
                        color="#91A1B4"
                    />

                    <TextInput
                        value={searchText}
                        onChangeText={
                            onSearchChange
                        }
                        placeholder="Search Reference ID, Loan ID..."
                        placeholderTextColor="#91A1B4"
                        style={{
                            flex: 1,

                            marginLeft:
                                theme.spacing.sm,

                            paddingVertical: 0,

                            fontSize:
                                theme.typography.b3,

                            fontFamily:
                                theme.fonts.regular,

                            color:
                                theme.colors.navy900,
                        }}
                    />

                </View>


                {/* FILTER */}

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onFilterPress}
                    style={{
                        width: 52,

                        height: 52,

                        marginLeft:
                            theme.spacing.sm,

                        borderRadius:
                            theme.radius.md,

                        backgroundColor:
                            theme.colors.white,

                        alignItems: "center",

                        justifyContent: "center",
                    }}
                >

                    <MaterialIcons
                        name="tune"
                        size={23}
                        color="#91A1B4"
                    />

                </TouchableOpacity>

            </View>

        </View>
    );
};


export default memo(
    LoanHistoryHeader
);