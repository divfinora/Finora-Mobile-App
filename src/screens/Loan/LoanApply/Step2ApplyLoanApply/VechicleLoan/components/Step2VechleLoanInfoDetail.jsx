import React, {
    useState,
} from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";

import MaterialIcons from "@react-native-vector-icons/material-icons";

import { theme } from "../../../../../../theme";

import CommonInput from "../../../../../../components/common/Input/CommonInput";

import NewCustomBottomSheet from "../../../../../../components/common/Modal/NewCustomBottomSheet";


// =====================================================
// VEHICLE TYPE OPTIONS
// =====================================================

const VEHICLE_TYPE_OPTIONS = [
    {
        label: "Car",
        value: "CAR",
        icon: "directions-car",
    },
    {
        label: "Bike",
        value: "BIKE",
        icon: "two-wheeler",
    },
    {
        label: "Commercial Vehicle",
        value: "COMMERCIAL_VEHICLE",
        icon: "local-shipping",
    },
    {
        label: "Other",
        value: "OTHER",
        icon: "directions-car",
    },
];


// =====================================================
// VEHICLE CONDITION OPTIONS
// =====================================================

const VEHICLE_CONDITION_OPTIONS = [
    {
        label: "New Vehicle",
        value: "NEW",
        icon: "fiber-new",
    },
    {
        label: "Used Vehicle",
        value: "USED",
        icon: "directions-car",
    },
];


// =====================================================
// COMPONENT
// =====================================================

const Step2VechleLoanInfoDetail = ({
    form = {},

    errors = {},

    onChange = () => { },

    onBlur = () => { },

    registerFieldPosition,

    scrollViewRef,
}) => {

    const [
        vehicleTypeVisible,
        setVehicleTypeVisible,
    ] = useState(false);

    const [
        vehicleConditionVisible,
        setVehicleConditionVisible,
    ] = useState(false);


    // =====================================================
    // SELECTED VEHICLE TYPE
    // =====================================================

    const selectedVehicleType =
        VEHICLE_TYPE_OPTIONS.find(
            item =>
                item.value ===
                form?.vehicleType
        )?.label || "";


    // =====================================================
    // SELECTED VEHICLE CONDITION
    // =====================================================

    const selectedVehicleCondition =
        VEHICLE_CONDITION_OPTIONS.find(
            item =>
                item.value ===
                form?.vehicleCondition
        )?.label || "";


    // =====================================================
    // CLOSE VEHICLE TYPE SHEET
    // =====================================================

    const closeVehicleTypeSheet = () => {
        setVehicleTypeVisible(false);
    };


    // =====================================================
    // CLOSE VEHICLE CONDITION SHEET
    // =====================================================

    const closeVehicleConditionSheet = () => {
        setVehicleConditionVisible(false);
    };


    return (
        <View
            style={{
                marginHorizontal:
                    theme.spacing.lg,

                marginTop:
                    theme.spacing.lg,

                paddingBottom:
                    theme.spacing.xl,
            }}
        >
            {/* =================================================
    VEHICLE LOAN BANNER
================================================= */}

            <View
                style={{
                     marginBottom:
                     theme.spacing.lg,
                    minHeight: 96,

                    borderWidth:
                        theme.borderWidth.thin,

                    borderColor:
                        "#94A3B8",

                    borderRadius:
                        theme.radius.lg,

                    backgroundColor:
                        theme.colors.white,

                    paddingHorizontal:
                        theme.spacing.lg,

                    flexDirection:
                        "row",

                    alignItems:
                        "center",
                }}
            >

                {/* VEHICLE IMAGE */}

                <View
                    style={{
                        width: 76,

                        height: 76,

                        alignItems:
                            "center",

                        justifyContent:
                            "center",
                    }}
                >

                    <Image
                        source={
                            require(
                                "../assets/vehicleLoan.png"
                            )
                        }
                        style={{
                            width: 76,

                            height: 76,

                            resizeMode:
                                "contain",
                        }}
                    />

                </View>


                {/* CONTENT */}

                <View
                    style={{
                        flex: 1,

                        paddingLeft:
                            theme.spacing.sm,
                    }}
                >

                    <Text
                        style={{
                            fontSize:
                                theme.typography.b2,

                            lineHeight:
                                theme.lineHeight.b2,

                            fontFamily:
                                theme.fonts.semiBold,

                            color:
                                 '#111F44',
                        }}
                    >
                        Get Funds Against Your Vehicle
                    </Text>


                    <Text
                        style={{
                            marginTop:
                                theme.spacing.xs,

                            fontSize:
                                theme.typography.b3,

                            lineHeight:
                                theme.lineHeight.b3,

                            fontFamily:
                                theme.fonts.medium,

                            color:
                                "#8DA0B5",
                        }}
                    >
                        Apply for a loan against your eligible{"\n"}
                        vehicle.
                    </Text>

                </View>

            </View>

            {/* =================================================
                MAIN CARD
            ================================================= */}

            <View
                style={{
                    paddingHorizontal:
                        theme.spacing.lg,

                    paddingTop:
                        theme.spacing.lg,

                    paddingBottom:
                        theme.spacing.lg,

                    borderRadius: 16,

                    backgroundColor:
                        theme.colors.white,
                }}
            >

                {/* =================================================
                    1. VEHICLE TYPE
                ================================================= */}

                <View
                    onLayout={event => {

                        registerFieldPosition?.(
                            "vehicleType",
                            event.nativeEvent.layout.y
                        );

                    }}
                >

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                        }}
                    >

                        <View
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 50,

                                backgroundColor:
                                    theme.colors.primary50,

                                alignItems: "center",
                                justifyContent: "center",

                                marginRight:
                                    theme.spacing.md,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 13,

                                    fontFamily:
                                        theme.fonts.medium,

                                    color:
                                        theme.colors.primary500,
                                }}
                            >
                                1
                            </Text>

                        </View>


                        <View
                            style={{
                                flex: 1,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 14,

                                    lineHeight: 20,

                                    fontFamily:
                                        theme.fonts.semiBold,

                                    color:
                                        theme.colors.navy900,
                                }}
                            >
                                Vehicle Type
                            </Text>


                            <Text
                                style={{
                                    marginTop: 4,

                                    fontSize: 13,

                                    lineHeight: 18,

                                    fontFamily:
                                        theme.fonts.regular,

                                    color: "#8DA0B5",
                                }}
                            >
                                Select the type of Vehicle
                            </Text>

                        </View>

                    </View>


                    {/* VEHICLE TYPE */}

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                            setVehicleTypeVisible(true)
                        }
                        style={{
                            height: 45,

                            marginTop:
                                theme.spacing.lg,

                            paddingHorizontal: 13,

                            borderWidth: 1,

                            borderColor:
                                errors?.vehicleType
                                    ? theme.colors.error
                                    : "#D9E0EA",

                            borderRadius: 12,

                            backgroundColor:
                                "#FBFCFE",

                            flexDirection: "row",

                            alignItems: "center",
                        }}
                    >

                        <MaterialIcons
                            name="directions-car"
                            size={19}
                            color="#A7B6C8"
                        />


                        <Text
                            numberOfLines={1}
                            style={{
                                flex: 1,

                                marginLeft: 8,

                                fontSize: 12,

                                fontFamily:
                                    theme.fonts.regular,

                                color:
                                    selectedVehicleType
                                        ? "#4B5563"
                                        : "#9AAABD",
                            }}
                        >
                            {
                                selectedVehicleType ||
                                "Select vehicle type"
                            }
                        </Text>


                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={22}
                            color="#6B7280"
                        />

                    </TouchableOpacity>


                    {!!errors?.vehicleType && (

                        <Text
                            style={{
                                marginTop: 5,
                                marginLeft: 2,

                                fontSize: 11,
                                lineHeight: 15,

                                fontFamily:
                                    theme.fonts.medium,

                                color:
                                    theme.colors.error,
                            }}
                        >
                            {errors.vehicleType}
                        </Text>

                    )}

                </View>


                {/* =================================================
                    2. VEHICLE CONDITION
                ================================================= */}

                <View
                    style={{
                        marginTop:
                            theme.spacing.lg,
                    }}

                    onLayout={event => {

                        registerFieldPosition?.(
                            "vehicleCondition",
                            event.nativeEvent.layout.y
                        );

                    }}
                >

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                        }}
                    >

                        <View
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 50,

                                backgroundColor:
                                    theme.colors.primary50,

                                alignItems: "center",
                                justifyContent: "center",

                                marginRight:
                                    theme.spacing.md,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 13,

                                    fontFamily:
                                        theme.fonts.medium,

                                    color:
                                        theme.colors.primary500,
                                }}
                            >
                                2
                            </Text>

                        </View>


                        <View
                            style={{
                                flex: 1,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 14,

                                    lineHeight: 20,

                                    fontFamily:
                                        theme.fonts.semiBold,

                                    color:
                                        theme.colors.navy900,
                                }}
                            >
                                Vehicle Condition
                            </Text>


                            <Text
                                style={{
                                    marginTop: 4,

                                    fontSize: 13,

                                    lineHeight: 18,

                                    fontFamily:
                                        theme.fonts.regular,

                                    color: "#8DA0B5",
                                }}
                            >
                                Is it a new or used vehicle?
                            </Text>

                        </View>

                    </View>


                    {/* VEHICLE CONDITION */}

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() =>
                            setVehicleConditionVisible(
                                true
                            )
                        }
                        style={{
                            height: 45,

                            marginTop:
                                theme.spacing.lg,

                            paddingHorizontal: 13,

                            borderWidth: 1,

                            borderColor:
                                errors?.vehicleCondition
                                    ? theme.colors.error
                                    : "#D9E0EA",

                            borderRadius: 12,

                            backgroundColor:
                                "#FBFCFE",

                            flexDirection: "row",

                            alignItems: "center",
                        }}
                    >

                        <MaterialIcons
                            name="directions-car"
                            size={19}
                            color="#A7B6C8"
                        />


                        <Text
                            numberOfLines={1}
                            style={{
                                flex: 1,

                                marginLeft: 8,

                                fontSize: 12,

                                fontFamily:
                                    theme.fonts.regular,

                                color:
                                    selectedVehicleCondition
                                        ? "#4B5563"
                                        : "#9AAABD",
                            }}
                        >
                            {
                                selectedVehicleCondition ||
                                "Select condition"
                            }
                        </Text>


                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={22}
                            color="#6B7280"
                        />

                    </TouchableOpacity>


                    {!!errors?.vehicleCondition && (

                        <Text
                            style={{
                                marginTop: 5,
                                marginLeft: 2,

                                fontSize: 11,
                                lineHeight: 15,

                                fontFamily:
                                    theme.fonts.medium,

                                color:
                                    theme.colors.error,
                            }}
                        >
                            {errors.vehicleCondition}
                        </Text>

                    )}

                </View>


                {/* =================================================
                    3. VEHICLE / MODEL NAME
                ================================================= */}

                <View
                    style={{
                        marginTop:
                            theme.spacing.lg,
                    }}
                >

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                        }}
                    >

                        <View
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 50,

                                backgroundColor:
                                    theme.colors.primary50,

                                alignItems: "center",
                                justifyContent: "center",

                                marginRight:
                                    theme.spacing.md,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 13,

                                    fontFamily:
                                        theme.fonts.medium,

                                    color:
                                        theme.colors.primary500,
                                }}
                            >
                                3
                            </Text>

                        </View>


                        <View
                            style={{
                                flex: 1,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 14,

                                    lineHeight: 20,

                                    fontFamily:
                                        theme.fonts.semiBold,

                                    color:
                                        theme.colors.navy900,
                                }}
                            >
                                Vehicle / Model Name
                            </Text>


                            <Text
                                style={{
                                    marginTop: 4,

                                    fontSize: 13,

                                    lineHeight: 18,

                                    fontFamily:
                                        theme.fonts.regular,

                                    color: "#8DA0B5",
                                }}
                            >
                                Enter the brand and model name
                            </Text>

                        </View>

                    </View>


                    {/* DIRECT COMMON INPUT */}

                    <CommonInput
                        label=""
                        placeholder="Enter vehicle or model name"

                        value={
                            form?.vehicleModel || ""
                        }

                        onChangeText={value =>
                            onChange(
                                "vehicleModel",
                                value
                            )
                        }

                        onBlur={() =>
                            onBlur(
                                "vehicleModel"
                            )
                        }

                        required={true}
                        editable={true}

                        keyboardType="default"
                        autoCapitalize="words"

                        leftIcon={
                            <MaterialIcons
                                name="directions-car"
                                size={19}
                                color="#A7B6C8"
                            />
                        }

                        leftIconContainerStyle={{
                            marginLeft: 0,
                            marginRight: 8,
                        }}

                        error={null}

                        fieldName="vehicleModel"

                        registerFieldPosition={
                            registerFieldPosition
                        }

                        scrollContentRef={
                            scrollViewRef
                        }

                        containerStyle={{
                            marginBottom: 0,
                            marginTop:
                                theme.spacing.lg,
                        }}

                        labelStyle={{
                            marginBottom: 7,

                            fontSize: 14,

                            lineHeight: 18,

                            fontFamily:
                                theme.fonts.medium,

                            color: "#1F2937",
                        }}

                        inputContainerStyle={{
                            minHeight: 45,

                            height: 45,

                            borderRadius: 12,

                            backgroundColor:
                                "#FBFCFE",

                            borderColor:
                                errors?.vehicleModel
                                    ? theme.colors.error
                                    : "#D9E0EA",

                            borderWidth: 1,

                            paddingHorizontal: 13,
                        }}

                        inputStyle={{
                            minHeight: 43,

                            height: 43,

                            fontSize: 12,

                            lineHeight: 17,

                            fontFamily:
                                theme.fonts.regular,

                            color: "#4B5563",

                            paddingVertical: 0,
                        }}
                    />


                    {!!errors?.vehicleModel && (

                        <Text
                            style={{
                                marginTop: 5,
                                marginLeft: 2,

                                fontSize: 11,
                                lineHeight: 15,

                                fontFamily:
                                    theme.fonts.medium,

                                color:
                                    theme.colors.error,
                            }}
                        >
                            {errors.vehicleModel}
                        </Text>

                    )}

                </View>


                {/* =================================================
                    4. ON-ROAD VEHICLE PRICE
                ================================================= */}

                <View
                    style={{
                        marginTop:
                            theme.spacing.lg,
                    }}
                >

                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "flex-start",
                        }}
                    >

                        <View
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: 50,

                                backgroundColor:
                                    theme.colors.primary50,

                                alignItems: "center",
                                justifyContent: "center",

                                marginRight:
                                    theme.spacing.md,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 13,

                                    fontFamily:
                                        theme.fonts.medium,

                                    color:
                                        theme.colors.primary500,
                                }}
                            >
                                4
                            </Text>

                        </View>


                        <View
                            style={{
                                flex: 1,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 14,

                                    lineHeight: 20,

                                    fontFamily:
                                        theme.fonts.semiBold,

                                    color:
                                        theme.colors.navy900,
                                }}
                            >
                                On-Road Vehicle Price
                            </Text>


                            <Text
                                style={{
                                    marginTop: 4,

                                    fontSize: 13,

                                    lineHeight: 18,

                                    fontFamily:
                                        theme.fonts.regular,

                                    color: "#8DA0B5",
                                }}
                            >
                                Enter the total on-road price of the Vehicle
                            </Text>

                        </View>

                    </View>


                    {/* DIRECT COMMON INPUT */}

                    <CommonInput
                        label=""
                        placeholder="Enter vehicle Price"

                        value={
                            form?.onRoadPrice || ""
                        }

                        onChangeText={value =>
                            onChange(
                                "onRoadPrice",
                                value
                            )
                        }

                        onBlur={() =>
                            onBlur(
                                "onRoadPrice"
                            )
                        }

                        required={true}
                        editable={true}

                        keyboardType="number-pad"
                        autoCapitalize="none"

                        leftIcon={
                            <MaterialIcons
                                name="currency-rupee"
                                size={19}
                                color="#A7B6C8"
                            />
                        }

                        leftIconContainerStyle={{
                            marginLeft: 0,
                            marginRight: 8,
                        }}

                        error={null}

                        fieldName="onRoadPrice"

                        registerFieldPosition={
                            registerFieldPosition
                        }

                        scrollContentRef={
                            scrollViewRef
                        }

                        containerStyle={{
                            marginBottom: 0,
                            marginTop:
                                theme.spacing.lg,
                        }}

                        labelStyle={{
                            marginBottom: 7,

                            fontSize: 14,

                            lineHeight: 18,

                            fontFamily:
                                theme.fonts.medium,

                            color: "#1F2937",
                        }}

                        inputContainerStyle={{
                            minHeight: 45,

                            height: 45,

                            borderRadius: 12,

                            backgroundColor:
                                "#FBFCFE",

                            borderColor:
                                errors?.onRoadPrice
                                    ? theme.colors.error
                                    : "#D9E0EA",

                            borderWidth: 1,

                            paddingHorizontal: 13,
                        }}

                        inputStyle={{
                            minHeight: 43,

                            height: 43,

                            fontSize: 12,

                            lineHeight: 17,

                            fontFamily:
                                theme.fonts.regular,

                            color: "#4B5563",

                            paddingVertical: 0,
                        }}
                    />


                    {!!errors?.onRoadPrice && (

                        <Text
                            style={{
                                marginTop: 5,
                                marginLeft: 2,

                                fontSize: 11,
                                lineHeight: 15,

                                fontFamily:
                                    theme.fonts.medium,

                                color:
                                    theme.colors.error,
                            }}
                        >
                            {errors.onRoadPrice}
                        </Text>

                    )}

                </View>

            </View>


            {/* =================================================
                VEHICLE TYPE BOTTOM SHEET
            ================================================= */}

            <NewCustomBottomSheet
                dragOnlyAtContentBottom={true}

                visible={
                    vehicleTypeVisible
                }

                onClose={
                    closeVehicleTypeSheet
                }

                sheetheading="Select Vehicle Type"

                heightPercent={0.60}

                showHeader={true}
                showDragHandle={true}
                enableDrag={true}

                closeOnBackdrop={true}
                closeOnDragDown={true}

                sheetBg="#FFFFFF"

                contentStyle={{
                    paddingHorizontal: 4,
                    paddingTop: 8,
                }}
            >

                <Text
                    style={{
                        marginBottom:
                            theme.spacing.lg,

                        fontSize: 13,

                        fontFamily:
                            theme.fonts.regular,

                        color: "#7D8EA3",
                    }}
                >
                    Choose the type of vehicle
                </Text>


                {VEHICLE_TYPE_OPTIONS.map(
                    option => {

                        const selected =
                            form?.vehicleType ===
                            option.value;

                        return (

                            <TouchableOpacity
                                key={
                                    option.value
                                }

                                activeOpacity={0.8}

                                onPress={() => {

                                    onChange(
                                        "vehicleType",
                                        option.value
                                    );

                                    closeVehicleTypeSheet();

                                }}

                                style={{
                                    minHeight: 58,

                                    borderRadius: 14,

                                    borderWidth: 1,

                                    borderColor:
                                        selected
                                            ? theme.colors.primary500
                                            : "#E5E7EB",

                                    backgroundColor:
                                        selected
                                            ? theme.colors.primary50
                                            : "#FFFFFF",

                                    paddingHorizontal: 14,

                                    marginBottom: 10,

                                    flexDirection: "row",

                                    alignItems: "center",
                                }}
                            >

                                <View
                                    style={{
                                        width: 38,
                                        height: 38,

                                        borderRadius: 12,

                                        backgroundColor:
                                            selected
                                                ? "#FFF0E7"
                                                : "#F3F6F9",

                                        alignItems: "center",

                                        justifyContent:
                                            "center",

                                        marginRight: 12,
                                    }}
                                >

                                    <MaterialIcons
                                        name={
                                            option.icon
                                        }

                                        size={21}

                                        color={
                                            selected
                                                ? theme.colors.primary500
                                                : "#8FA0B2"
                                        }
                                    />

                                </View>


                                <Text
                                    style={{
                                        flex: 1,

                                        fontSize: 14,

                                        fontFamily:
                                            theme.fonts.semiBold,

                                        color:
                                            theme.colors.navy900,
                                    }}
                                >
                                    {
                                        option.label
                                    }
                                </Text>


                                {selected && (

                                    <MaterialIcons
                                        name="check-circle"
                                        size={22}

                                        color={
                                            theme.colors.primary500
                                        }
                                    />

                                )}

                            </TouchableOpacity>
                        );
                    }
                )}

            </NewCustomBottomSheet>


            {/* =================================================
                VEHICLE CONDITION BOTTOM SHEET
            ================================================= */}

            <NewCustomBottomSheet
                dragOnlyAtContentBottom={true}

                visible={
                    vehicleConditionVisible
                }

                onClose={
                    closeVehicleConditionSheet
                }

                sheetheading="Select Vehicle Condition"

                heightPercent={0.48}

                showHeader={true}
                showDragHandle={true}
                enableDrag={true}

                closeOnBackdrop={true}
                closeOnDragDown={true}

                sheetBg="#FFFFFF"

                contentStyle={{
                    paddingHorizontal: 4,
                    paddingTop: 8,
                }}
            >

                <Text
                    style={{
                        marginBottom:
                            theme.spacing.lg,

                        fontSize: 13,

                        fontFamily:
                            theme.fonts.regular,

                        color: "#7D8EA3",
                    }}
                >
                    Select vehicle condition
                </Text>


                {VEHICLE_CONDITION_OPTIONS.map(
                    option => {

                        const selected =
                            form?.vehicleCondition ===
                            option.value;

                        return (

                            <TouchableOpacity
                                key={
                                    option.value
                                }

                                activeOpacity={0.8}

                                onPress={() => {

                                    onChange(
                                        "vehicleCondition",
                                        option.value
                                    );

                                    closeVehicleConditionSheet();

                                }}

                                style={{
                                    minHeight: 58,

                                    borderRadius: 14,

                                    borderWidth: 1,

                                    borderColor:
                                        selected
                                            ? theme.colors.primary500
                                            : "#E5E7EB",

                                    backgroundColor:
                                        selected
                                            ? theme.colors.primary50
                                            : "#FFFFFF",

                                    paddingHorizontal: 14,

                                    marginBottom: 10,

                                    flexDirection: "row",

                                    alignItems: "center",
                                }}
                            >

                                <View
                                    style={{
                                        width: 38,
                                        height: 38,

                                        borderRadius: 12,

                                        backgroundColor:
                                            selected
                                                ? "#FFF0E7"
                                                : "#F3F6F9",

                                        alignItems: "center",

                                        justifyContent:
                                            "center",

                                        marginRight: 12,
                                    }}
                                >

                                    <MaterialIcons
                                        name={
                                            option.icon
                                        }

                                        size={21}

                                        color={
                                            selected
                                                ? theme.colors.primary500
                                                : "#8FA0B2"
                                        }
                                    />

                                </View>


                                <Text
                                    style={{
                                        flex: 1,

                                        fontSize: 14,

                                        fontFamily:
                                            theme.fonts.semiBold,

                                        color:
                                            theme.colors.navy900,
                                    }}
                                >
                                    {
                                        option.label
                                    }
                                </Text>


                                {selected && (

                                    <MaterialIcons
                                        name="check-circle"
                                        size={22}

                                        color={
                                            theme.colors.primary500
                                        }
                                    />

                                )}

                            </TouchableOpacity>
                        );
                    }
                )}

            </NewCustomBottomSheet>

        </View>
    );
};


export default Step2VechleLoanInfoDetail;