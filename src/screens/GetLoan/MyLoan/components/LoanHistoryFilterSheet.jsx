// ============================================================
// LoanHistoryFilterSheet.jsx
// ============================================================

import React, {
    memo,
    useEffect,
    useState,
} from "react";

import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import MaterialIcons from
    "@react-native-vector-icons/material-icons";

import NewCustomBottomSheet
    from "../../../../components/common/Modal/NewCustomBottomSheet";

import { theme } from "../../../../theme";


// ============================================================
// OPTIONS
// ============================================================

const LOAN_TYPES = [
    {
        label: "Personal Loan",
        value: "PERSONAL",
    },
    {
        label: "Gold Loan",
        value: "GOLD",
    },
    {
        label: "Vehicle Loan",
        value: "VEHICLE",
    },
    {
        label: "Education Loan",
        value: "EDUCATION",
    },
    {
        label: "Instant Loan",
        value: "INSTANT",
    },
    {
        label: "Agriculture Loan",
        value: "AGRICULTURE",
    },
];


const STATUS_OPTIONS = [
    {
        label: "Under Review",
        value: "PENDING",
    },
    {
        label: "Amount Disbursed",
        value: "DISBURSED",
    },
    {
        label: "Approved",
        value: "APPROVED",
    },
    {
        label: "Rejected",
        value: "REJECTED",
    },
];


const DATE_OPTIONS = [
    {
        label: "Last 30 days",
        value: "LAST_30_DAYS",
    },
    {
        label: "Last 3 weeks",
        value: "LAST_3_WEEKS",
    },
    {
        label: "Custom Date",
        value: "CUSTOM",
    },
];


const VIEW_OPTIONS = [
    {
        label: "Active loans",
        value: "ACTIVE",
    },
    {
        label: "Payments",
        value: "PAYMENTS",
    },
    {
        label: "Closed loans",
        value: "CLOSED",
    },
];


const DEFAULT_FILTERS = {
    loanTypes: [],
    statuses: [],
    dateRange: "LAST_30_DAYS",
    loanView: "ACTIVE",
};


// ============================================================
// COMMON FILTER TYPOGRAPHY
// ============================================================

const filterTextStyles = {

    sectionTitle: {
        fontSize: 16,

        lineHeight: 21,

        fontFamily:
            theme.fonts.bold,

        color:
            '#1E293B',
    },

    optionLabel: {
        fontSize: 14,

        lineHeight: 20,

        fontFamily:
            theme.fonts.regular,

        color:
             '#334155',
    },

};


// ============================================================
// COMPONENT
// ============================================================

const LoanHistoryFilterSheet = ({
    visible = false,

    filters = DEFAULT_FILTERS,

    onClose,

    onApply,

    onReset,
}) => {

    const [
        localFilters,
        setLocalFilters,
    ] = useState(
        filters
    );


    // ========================================================
    // SYNC FILTERS
    // ========================================================

    useEffect(() => {

        if (!visible) {
            return;
        }

        setLocalFilters(
            filters || DEFAULT_FILTERS
        );

    }, [
        visible,
        filters,
    ]);


    // ========================================================
    // TOGGLE CHECKBOX VALUE
    // ========================================================

    const toggleArrayValue = (
        field,
        value
    ) => {

        setLocalFilters(
            previous => {

                const current =
                    previous?.[field] || [];


                const exists =
                    current.includes(
                        value
                    );


                return {
                    ...previous,

                    [field]: exists
                        ? current.filter(
                            item =>
                                item !== value
                        )
                        : [
                            ...current,
                            value,
                        ],
                };

            }
        );

    };


    // ========================================================
    // CHECKBOX
    // ========================================================

    const Checkbox = ({
        selected,
    }) => {

        return (

            <View
                style={{
                    width: 20,
                    height: 20,

                    borderRadius: 6,

                    borderWidth:
                        selected
                            ? 0
                            : 1.4,

                    borderColor:
                        theme.colors.gray500,

                    backgroundColor:
                        selected
                            ? theme.colors.primary500
                            : theme.colors.white,

                    alignItems: "center",

                    justifyContent: "center",
                }}
            >

                {selected && (

                    <MaterialIcons
                        name="check"

                        size={15}

                        color={
                            theme.colors.white
                        }
                    />

                )}

            </View>

        );

    };


    // ========================================================
    // RADIO
    // ========================================================

    const Radio = ({
        selected,
    }) => {

        return (

            <View
                style={{
                    width: 20,
                    height: 20,

                    borderRadius: 10,

                    borderWidth: 1.5,

                    borderColor:
                        selected
                            ? theme.colors.primary500
                            : theme.colors.gray500,

                    alignItems: "center",

                    justifyContent: "center",
                }}
            >

                {selected && (

                    <View
                        style={{
                            width: 10,
                            height: 10,

                            borderRadius: 5,

                            backgroundColor:
                                theme.colors.primary500,
                        }}
                    />

                )}

            </View>

        );

    };


    // ========================================================
    // RESET
    // ========================================================

    const handleReset = () => {

        const reset = {
            ...DEFAULT_FILTERS,
        };

        setLocalFilters(reset);

        onReset?.(reset);

    };


    // ========================================================
    // APPLY
    // ========================================================

    const handleApply = () => {

        onApply?.(
            localFilters
        );

    };


    // ========================================================
    // RENDER
    // ========================================================

    return (

        <NewCustomBottomSheet

            visible={
                visible
            }

            onClose={
                onClose
            }

            sheetheading="History Filter"

            showHeader

             heightPercent={
                0.95
            }

            sheetBg={
                theme.colors.white
            }

            enableDrag

            showDragHandle={
                false
            }

            closeOnBackdrop

            closeOnDragDown


            // ==================================================
            // SHEET
            // ==================================================

            sheetStyle={{
                borderTopLeftRadius: 34,

                borderTopRightRadius: 34,

                overflow: "visible",
            }}


            // ==================================================
            // HEADER
            // ==================================================

            headerStyle={{
                height: 60,

                paddingTop: 10,

                paddingBottom: 4,
            }}


            headingContainerStyle={{
                flex: 1,

                alignItems: "center",

                justifyContent: "center",

                paddingHorizontal: 20,
            }}


            headingStyle={{
                
                fontSize: 18,

                lineHeight: 24,

                fontFamily:
                    theme.fonts.bold,

                color:
                     '#0F172A',

                textAlign: "center",
            }}


            // ==================================================
            // CENTER CLOSE BUTTON
            // ==================================================

            closeButtonStyle={{

                position: "absolute",

                top: -58,

                left: "50%",

                marginLeft: -22,

                width: 44,

                height: 44,

                borderRadius: 22,

                backgroundColor:
                    theme.colors.black ||
                    "#000000",

                borderWidth: 1,

                borderColor:
                    theme.colors.white,

                alignItems: "center",

                justifyContent: "center",

                zIndex: 999,

                elevation: 10,
            }}

            closeIconColor={
                theme.colors.white
            }

            closeIconSize={20}


            // ==================================================
            // CONTENT
            // ==================================================

            contentStyle={{
                paddingHorizontal: 12,

                paddingTop: 0,

                paddingBottom: 16,
            }}

        >

            {/* ==================================================
                HEADER DIVIDER
            ================================================== */}

            <View
                style={{
                    height: 1,

                    backgroundColor:
                        theme.colors.gray200,

                    marginHorizontal: 12,

                    marginBottom: 8,
                }}
            />


            {/* ==================================================
                LOAN TYPE
            ================================================== */}

            <Text
                style={[
                    filterTextStyles.sectionTitle,
                    {
                        marginHorizontal: 12,

                        marginTop: 0,
                    },
                ]}
            >
                Loan Type
            </Text>


            <View
                style={{
                    marginTop: 3,

                    marginHorizontal: 12,

                    flexDirection: "row",

                    flexWrap: "wrap",
                }}
            >

                {LOAN_TYPES.map(
                    item => {

                        const selected =
                            (
                                localFilters
                                    ?.loanTypes ||
                                []
                            ).includes(
                                item.value
                            );


                        return (

                            <TouchableOpacity

                                key={
                                    item.value
                                }

                                activeOpacity={0.8}

                                onPress={() =>
                                    toggleArrayValue(
                                        "loanTypes",

                                        item.value
                                    )
                                }

                                style={{
                                    width: "50%",

                                    height: 32,

                                    flexDirection:
                                        "row",

                                    alignItems:
                                        "center",
                                }}
                            >

                                <Checkbox
                                    selected={
                                        selected
                                    }
                                />

                                <Text
                                    style={[
                                        filterTextStyles.optionLabel,
                                        {
                                            marginLeft: 8,
                                        },
                                    ]}
                                >
                                    {
                                        item.label
                                    }
                                </Text>

                            </TouchableOpacity>

                        );

                    }
                )}

            </View>


            {/* ==================================================
                STATUS
            ================================================== */}

            <Text
                style={[
                    filterTextStyles.sectionTitle,
                    {
                        marginHorizontal: 12,

                        marginTop: 7,
                    },
                ]}
            >
                Status
            </Text>


            <View
                style={{
                    marginTop: 3,

                    marginHorizontal: 12,

                    flexDirection: "row",

                    flexWrap: "wrap",
                }}
            >

                {STATUS_OPTIONS.map(
                    item => {

                        const selected =
                            (
                                localFilters
                                    ?.statuses ||
                                []
                            ).includes(
                                item.value
                            );


                        return (

                            <TouchableOpacity

                                key={
                                    item.value
                                }

                                activeOpacity={0.8}

                                onPress={() =>
                                    toggleArrayValue(
                                        "statuses",

                                        item.value
                                    )
                                }

                                style={{
                                    width: "50%",

                                    height: 32,

                                    flexDirection:
                                        "row",

                                    alignItems:
                                        "center",
                                }}
                            >

                                <Checkbox
                                    selected={
                                        selected
                                    }
                                />

                                <Text
                                    style={[
                                        filterTextStyles.optionLabel,
                                        {
                                            marginLeft: 8,
                                        },
                                    ]}
                                >
                                    {
                                        item.label
                                    }
                                </Text>

                            </TouchableOpacity>

                        );

                    }
                )}

            </View>


            {/* ==================================================
                DATE RANGE
            ================================================== */}

            <Text
                style={[
                    filterTextStyles.sectionTitle,
                    {
                        marginHorizontal: 12,

                        marginTop: 7,
                    },
                ]}
            >
                Date Range
            </Text>


            <View
                style={{
                    marginTop: 6,

                    marginHorizontal: 12,
                }}
            >

                {DATE_OPTIONS.map(
                    item => {

                        const selected =
                            localFilters
                                ?.dateRange ===
                            item.value;


                        return (

                            <TouchableOpacity

                                key={
                                    item.value
                                }

                                activeOpacity={0.8}

                                onPress={() =>
                                    setLocalFilters(
                                        previous => ({
                                            ...previous,

                                            dateRange:
                                                item.value,
                                        })
                                    )
                                }

                                style={{
                                    height: 34,

                                    flexDirection:
                                        "row",

                                    alignItems:
                                        "center",
                                }}
                            >

                                <Radio
                                    selected={
                                        selected
                                    }
                                />


                                <Text
                                    style={[
                                        filterTextStyles.optionLabel,
                                        {
                                            marginLeft: 8,
                                        },
                                    ]}
                                >
                                    {
                                        item.label
                                    }
                                </Text>


                                {item.value ===
                                    "CUSTOM" && (

                                    <MaterialIcons
                                        name="event"

                                        size={21}

                                        color={
                                            "#8EA2BD"
                                        }

                                        style={{
                                            marginLeft:
                                                "auto",
                                        }}
                                    />

                                )}

                            </TouchableOpacity>

                        );

                    }
                )}

            </View>


            {/* ==================================================
                CHOOSE WHAT YOU WANT
            ================================================== */}

            <Text
                style={[
                    filterTextStyles.sectionTitle,
                    {
                        marginHorizontal: 12,

                        marginTop: 7,
                    },
                ]}
            >
                Choose What you want
            </Text>


            <View
                style={{
                    marginTop: 6,

                    marginHorizontal: 12,
                }}
            >

                {VIEW_OPTIONS.map(
                    item => {

                        const selected =
                            localFilters
                                ?.loanView ===
                            item.value;


                        return (

                            <TouchableOpacity

                                key={
                                    item.value
                                }

                                activeOpacity={0.8}

                                onPress={() =>
                                    setLocalFilters(
                                        previous => ({
                                            ...previous,

                                            loanView:
                                                item.value,
                                        })
                                    )
                                }

                                style={{
                                    height: 34,

                                    flexDirection:
                                        "row",

                                    alignItems:
                                        "center",
                                }}
                            >

                                <Radio
                                    selected={
                                        selected
                                    }
                                />


                                <Text
                                    style={[
                                        filterTextStyles.optionLabel,
                                        {
                                            marginLeft: 8,
                                        },
                                    ]}
                                >
                                    {
                                        item.label
                                    }
                                </Text>

                            </TouchableOpacity>

                        );

                    }
                )}

            </View>


            {/* ==================================================
                BOTTOM ACTIONS
            ================================================== */}

            <View
                style={{
                    marginTop: 4,

                    marginHorizontal: 12,

                    paddingTop: 10,

                    borderTopWidth: 1,

                    borderTopColor:
                        theme.colors.gray200,

                    flexDirection: "row",
                }}
            >

                {/* RESET */}

                <TouchableOpacity

                    activeOpacity={0.8}

                    onPress={
                        handleReset
                    }

                    style={{
                        flex: 1,

                        height: 44,

                        borderRadius: 12,

                        borderWidth: 1,

                        borderColor:
                            "#CBD5E1",

                        alignItems: "center",

                        justifyContent: "center",

                        marginRight: 6,
                    }}
                >

                    <Text
                        style={{
                            fontSize: 16,

                            lineHeight: 20,

                            fontFamily:
                                theme.fonts.medium,

                            color:
                                theme.colors.navy700,
                        }}
                    >
                        Reset
                    </Text>

                </TouchableOpacity>


                {/* APPLY FILTERS */}

                <TouchableOpacity

                    activeOpacity={0.8}

                    onPress={
                        handleApply
                    }

                    style={{
                        flex: 1,

                        height: 44,

                        borderRadius: 12,

                        backgroundColor:
                             '#E56927' ,

                        alignItems: "center",

                        justifyContent: "center",

                        marginLeft: 6,
                    }}
                >

                    <Text
                        style={{
                            fontSize: 16,

                            lineHeight: 20,

                            fontFamily:
                                theme.fonts.medium,

                            color:
                                theme.colors.white,
                        }}
                    >
                        Apply Filters
                    </Text>

                </TouchableOpacity>

            </View>

        </NewCustomBottomSheet>

    );

};


export default memo(
    LoanHistoryFilterSheet
);