import React, { useState } from "react";



import {

    View,

    Text,

    TouchableOpacity,

    TextInput,

    Image,

} from "react-native";



import MaterialIcons from "@react-native-vector-icons/material-icons";

import NewCustomBottomSheet from "../../../../../../components/common/Modal/NewCustomBottomSheet";



import { theme } from "../../../../../../theme";





// =====================================================

// GOLD TYPE OPTIONS

// =====================================================



const GOLD_TYPE_OPTIONS = [

    {

        label: "Gold Jewellery",

        value: "GOLD_JEWELLERY",

        icon: "diamond",

    },

    {

        label: "Gold Coins",

        value: "GOLD_COINS",

        icon: "monetization-on",

    },

    {

        label: "Gold Bars",

        value: "GOLD_BARS",

        icon: "account-balance",

    },

];





// =====================================================

// PURITY OPTIONS

// =====================================================



const PURITY_OPTIONS = [

    {

        value: "18K",

        subtitle: "75% Pure",

    },

    {

        value: "22K",

        subtitle: "91.6% Pure",

    },

    {

        value: "24K",

        subtitle: "99.9% Pure",

    },

];



const GOLD_OWNERSHIP_OPTIONS = [
    {
        label: "Yes",
        value: "YES",
        description: "I own this gold",
    },
    {
        label: "No",
        value: "NO",
        description: "This gold is not mine",
    },
];

// =====================================================

// COMPONENT

// =====================================================



const Step2GoldLoanInfoDetail = ({

    form = {},

    errors = {},

    onChange = () => { },

    onBlur = () => { },
    registerFieldPosition,

}) => {



    const [

        goldTypeVisible,

        setGoldTypeVisible,

    ] = useState(false);





    const selectedGoldType =

        GOLD_TYPE_OPTIONS.find(

            item =>

                item.value === form?.goldType

        )?.label || "";





    // =====================================================

    // COMMON STEP STYLES

    // =====================================================



    const stepNumberStyle = {

        width: 28,

        height: 28,

        borderRadius: theme.radius.circle,

        backgroundColor: theme.colors.primary50,

        alignItems: "center",

        justifyContent: "center",

        marginRight: theme.spacing.md,

    };





    const stepNumberTextStyle = {

        fontSize: theme.typography.b3,

        fontFamily: theme.fonts.medium,

        color: theme.colors.primary500,

    };





    const stepHeadingStyle = {

        flex: 1,

    };





    const stepLabelStyle = {

        fontSize: theme.typography.b2,

        lineHeight: theme.lineHeight.b2,

        fontFamily: theme.fonts.semiBold,

        color: theme.colors.navy900,

    };





    const stepDescriptionStyle = {

        marginTop: theme.spacing.xs,

        fontSize: theme.typography.b3,

        lineHeight: theme.lineHeight.b3,

        fontFamily: theme.fonts.regular,

        color: "#8DA0B5",

    };





    const stepHeaderStyle = {

        flexDirection: "row",

        alignItems: "flex-start",

    };





    const errorTextStyle = {

        marginTop: theme.spacing.xs,

        marginLeft: theme.spacing.xs,

        fontSize: theme.typography.caption,

        fontFamily: theme.fonts.medium,

        color: theme.colors.error,

    };





    return (

        <View

            style={{

                marginHorizontal: theme.spacing.lg,

                marginTop: theme.spacing.lg,

                paddingBottom: theme.spacing.xl,

            }}

        >



            {/* =================================================

                GOLD INFORMATION BANNER

            ================================================= */}



            <View

                style={{

                    minHeight: 96,

                    borderWidth: theme.borderWidth.thin,

                    borderColor: "#91A8BC",

                    borderRadius: theme.radius.lg,

                    backgroundColor: theme.colors.white,

                    paddingHorizontal: theme.spacing.lg,

                    flexDirection: "row",

                    alignItems: "center",

                }}

            >



                {/* GOLD IMAGE */}



                <View

                    style={{

                        width: 76,

                        height: 76,

                        alignItems: "center",

                        justifyContent: "center",

                    }}

                >



                    <Image

                        source={require("../assets/goldBars.png")}

                        style={{

                            width: 76,

                            height: 76,

                            resizeMode: "contain",

                        }}

                    />



                </View>





                {/* CONTENT */}



                <View

                    style={{

                        flex: 1,

                        paddingLeft: theme.spacing.sm,

                    }}

                >



                    <Text

                        style={{

                            fontSize: theme.typography.b2,

                            lineHeight: theme.lineHeight.b2,

                            fontFamily: theme.fonts.medium,

                            color: theme.colors.navy900,

                        }}

                    >

                        Get a Loan Against your gold

                    </Text>





                    <Text

                        style={{

                            marginTop: theme.spacing.xs,

                            fontSize: theme.typography.b3,

                            lineHeight: theme.lineHeight.b3,

                            fontFamily: theme.fonts.regular,

                            color: "#8DA0B5",

                        }}

                    >

                        Safe, transparent and quick process{"\n"}

                        with your valuables.

                    </Text>



                </View>



            </View>





            {/* =================================================

                MAIN GOLD INFORMATION CARD

            ================================================= */}



            <View

                style={{

                    marginTop: theme.spacing.lg,

                    paddingHorizontal: theme.spacing.lg,

                    paddingTop: theme.spacing.lg,

                    paddingBottom: theme.spacing.md,

                    borderRadius: theme.radius.lg,

                    backgroundColor: theme.colors.white,

                }}

            >



                {/* =================================================

                    1\. GOLD TYPE

                ================================================= */}



                <View

                    onLayout={event => {

                        registerFieldPosition?.(

                            "goldType",

                            event.nativeEvent.layout.y

                        );

                    }}

                    style={{

                        marginBottom: theme.spacing.lg,

                    }}

                >



                    {/* HEADER */}



                    <View style={stepHeaderStyle}>



                        {/* NUMBER */}



                        <View style={stepNumberStyle}>



                            <Text

                                style={stepNumberTextStyle}

                            >

                                1

                            </Text>



                        </View>





                        {/* LABEL + DESCRIPTION */}



                        <View style={stepHeadingStyle}>



                            <Text

                                style={stepLabelStyle}

                            >

                                Gold Type

                            </Text>





                            <Text

                                style={stepDescriptionStyle}

                            >

                                Select the type of gold you want to pledge

                            </Text>



                        </View>



                    </View>





                    {/* DROPDOWN */}



                    <TouchableOpacity

                        activeOpacity={0.8}

                        onPress={() =>

                            setGoldTypeVisible(true)

                        }

                        style={{

                            height: theme.dropdown.height,

                            marginTop: theme.spacing.lg,

                            paddingHorizontal: theme.spacing.lg,

                            borderWidth: theme.borderWidth.thin,

                            borderColor:

                                errors?.goldType

                                    ? theme.colors.error

                                    : "#DCE4EC",

                            borderRadius:

                                theme.dropdown.borderRadius,

                            backgroundColor: "#FBFCFD",

                            flexDirection: "row",

                            alignItems: "center",

                        }}

                    >



                        <MaterialIcons

                            name="shopping-bag"

                            size={20}

                            color={theme.colors.navy300}

                        />





                        <Text

                            numberOfLines={1}

                            style={{

                                flex: 1,

                                marginLeft: theme.spacing.md,

                                marginRight: theme.spacing.sm,

                                fontSize: theme.typography.b3,

                                fontFamily: theme.fonts.regular,

                                color: selectedGoldType

                                    ? theme.colors.navy900

                                    : "#9AAABD",

                            }}

                        >

                            {selectedGoldType ||

                                "Select gold type"}

                        </Text>





                        <MaterialIcons

                            name="keyboard-arrow-down"

                            size={24}

                            color={theme.colors.navy500}

                        />



                    </TouchableOpacity>





                    {!!errors?.goldType && (

                        <Text style={errorTextStyle}>

                            {errors.goldType}

                        </Text>

                    )}



                </View>





                {/* =================================================

                    2\. PURITY

                ================================================= */}



                <View

                    onLayout={event => {

                        registerFieldPosition?.(

                            "purity",

                            event.nativeEvent.layout.y

                        );

                    }}

                    style={{

                        marginBottom: theme.spacing.lg,

                    }}

                >



                    {/* HEADER */}



                    <View style={stepHeaderStyle}>



                        <View style={stepNumberStyle}>



                            <Text

                                style={stepNumberTextStyle}

                            >

                                2

                            </Text>



                        </View>





                        <View style={stepHeadingStyle}>



                            <Text

                                style={stepLabelStyle}

                            >

                                Purity

                            </Text>





                            <Text

                                style={stepDescriptionStyle}

                            >

                                Select the purity of your gold

                            </Text>



                        </View>



                    </View>





                    {/* PURITY OPTIONS */}



                    <View

                        style={{

                            flexDirection: "row",

                            marginTop: theme.spacing.lg,

                            gap: theme.spacing.sm,

                        }}

                    >



                        {PURITY_OPTIONS.map(item => {



                            const isSelected =

                                form?.purity ===

                                item.value;





                            return (

                                <TouchableOpacity

                                    key={item.value}

                                    activeOpacity={0.8}

                                    onPress={() =>

                                        onChange(

                                            "purity",

                                            item.value

                                        )

                                    }

                                    style={{

                                        flex: 1,

                                        minHeight: 80,

                                        borderRadius:

                                            theme.radius.md,

                                        backgroundColor:

                                            isSelected

                                                ? "#FFF9F5"

                                                : "#F6F8FA",

                                        borderWidth:

                                            isSelected

                                                ? theme.borderWidth.medium

                                                : theme.borderWidth.thin,

                                        borderColor:

                                            isSelected

                                                ? theme.colors.primary500

                                                : "transparent",

                                        alignItems: "center",

                                        justifyContent: "center",

                                        position: "relative",

                                    }}

                                >



                                    {isSelected && (

                                        <View

                                            style={{

                                                position: "absolute",

                                                top: -10,

                                                right: -7,

                                                width: 24,

                                                height: 24,

                                                borderRadius:

                                                    theme.radius.circle,

                                                backgroundColor:

                                                    theme.colors.primary500,

                                                alignItems:

                                                    "center",

                                                justifyContent:

                                                    "center",

                                            }}

                                        >



                                            <MaterialIcons

                                                name="check"

                                                size={15}

                                                color={

                                                    theme.colors.white

                                                }

                                            />



                                        </View>

                                    )}





                                    <Text

                                        style={{

                                            fontSize:

                                                theme.typography.b2,

                                            fontFamily:

                                                theme.fonts.semiBold,

                                            color:

                                                theme.colors.navy900,

                                        }}

                                    >

                                        {item.value}

                                    </Text>





                                    <Text

                                        style={{

                                            marginTop:

                                                theme.spacing.xs,

                                            fontSize:

                                                theme.typography.b3,

                                            fontFamily:

                                                theme.fonts.regular,

                                            color:

                                                theme.colors.gray500,

                                        }}

                                    >

                                        {item.subtitle}

                                    </Text>



                                </TouchableOpacity>

                            );

                        })}



                    </View>





                    {!!errors?.purity && (

                        <Text style={errorTextStyle}>

                            {errors.purity}

                        </Text>

                    )}



                </View>





                {/* =================================================

                    3\. APPROXIMATE WEIGHT

                ================================================= */}



                <View

                    onLayout={event => {

                        registerFieldPosition?.(

                            "approximateWeight",

                            event.nativeEvent.layout.y

                        );

                    }}

                    style={{

                        marginBottom: theme.spacing.lg,

                    }}

                >



                    {/* HEADER */}



                    <View style={stepHeaderStyle}>



                        <View style={stepNumberStyle}>



                            <Text

                                style={stepNumberTextStyle}

                            >

                                3

                            </Text>



                        </View>





                        <View style={stepHeadingStyle}>



                            <Text

                                style={stepLabelStyle}

                            >

                                Approximate Weight

                            </Text>





                            <Text

                                style={stepDescriptionStyle}

                            >

                                Enter total weight of the gold you want to pledge

                            </Text>



                        </View>



                    </View>





                    {/* WEIGHT INPUT */}



                    <View

                        style={{

                            height: theme.input.height,

                            marginTop: theme.spacing.lg,

                            borderWidth: theme.borderWidth.thin,

                            borderColor:

                                errors?.approximateWeight

                                    ? theme.colors.error

                                    : "#DCE4EC",

                            borderRadius:

                                theme.input.borderRadius,

                            backgroundColor: "#FBFCFD",

                            paddingLeft: theme.spacing.lg,

                            flexDirection: "row",

                            alignItems: "center",

                            overflow: "hidden",

                        }}

                    >



                        <MaterialIcons

                            name="balance"

                            size={21}

                            color={theme.colors.navy300}

                        />





                        <TextInput

                            value={

                                form?.approximateWeight ||

                                ""

                            }

                            onChangeText={value => {



                                const cleanedValue =

                                    value.replace(

                                        /[^0-9.]/g,

                                        ""

                                    );



                                onChange(

                                    "approximateWeight",

                                    cleanedValue

                                );

                            }}

                            onBlur={() =>

                                onBlur(

                                    "approximateWeight"

                                )

                            }

                            keyboardType="decimal-pad"

                            placeholder="Enter Weight"

                            placeholderTextColor="#9AAABD"

                            style={{

                                flex: 1,

                                height: "100%",

                                paddingHorizontal:

                                    theme.spacing.md,

                                fontSize:

                                    theme.typography.b3,

                                fontFamily:

                                    theme.fonts.regular,

                                color:

                                    theme.colors.navy900,

                            }}

                        />





                        <View

                            style={{

                                width: 74,

                                height: "100%",

                                borderLeftWidth:

                                    theme.borderWidth.thin,

                                borderLeftColor:

                                    "#E2E8EF",

                                backgroundColor:

                                    "#F6F8FA",

                                alignItems: "center",

                                justifyContent: "center",

                            }}

                        >



                            <Text

                                style={{

                                    fontSize:

                                        theme.typography.b3,

                                    fontFamily:

                                        theme.fonts.regular,

                                    color: "#8DA0B5",

                                }}

                            >

                                Grams

                            </Text>



                        </View>



                    </View>





                    {!!errors?.approximateWeight && (

                        <Text style={errorTextStyle}>

                            {errors.approximateWeight}

                        </Text>

                    )}



                </View>





                {/* =================================================

                    4\. GOLD OWNERSHIP

                ================================================= */}



                <View

                    onLayout={event => {

                        registerFieldPosition?.(

                            "ownsGold",

                            event.nativeEvent.layout.y

                        );

                    }}>




                    {/* HEADER */}



                    <View style={stepHeaderStyle}>



                        <View style={stepNumberStyle}>



                            <Text

                                style={stepNumberTextStyle}

                            >

                                4

                            </Text>



                        </View>





                        <View style={stepHeadingStyle}>



                            <Text

                                style={stepLabelStyle}

                            >

                                Do you own this gold?

                            </Text>





                            <Text

                                style={stepDescriptionStyle}

                            >

                                Confirm ownership of the gold

                            </Text>



                        </View>



                    </View>





                    {/* YES / NO */}



               {/* YES / NO */}

<View
    style={{
        flexDirection: "row",
        gap: theme.spacing.md,
        marginTop: theme.spacing.lg,
    }}
>
    {[
        {
            label: "Yes",
            value: "YES",
            description: "I own this gold",
        },
        {
            label: "No",
            value: "NO",
            description: "This gold is not mine",
        },
    ].map((option) => {
        const isSelected = form?.ownsGold === option.value;

        return (
            <TouchableOpacity
                key={option.value}
                activeOpacity={0.8}
                onPress={() =>
                    onChange("ownsGold", option.value)
                }
                style={{
                    flex: 1,
                    minHeight: 80,
                    paddingHorizontal: theme.spacing.md,
                    borderWidth: theme.borderWidth.thin,
                    borderColor: errors?.ownsGold
                        ? theme.colors.error
                        : isSelected
                            ? theme.colors.primary500
                            : "#DCE4EC",
                    borderRadius: theme.radius.md,
                    backgroundColor: isSelected
                        ? "#FFF9F5"
                        : theme.colors.white,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                {/* Radio */}

                <View
                    style={{
                        width: theme.radio.size,
                        height: theme.radio.size,
                        borderRadius: theme.radius.circle,
                        borderWidth: theme.radio.borderWidth,
                        borderColor: isSelected
                            ? theme.colors.primary500
                            : theme.radio.inactiveColor,
                        backgroundColor: isSelected
                            ? theme.colors.primary500
                            : theme.colors.white,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {isSelected && (
                        <MaterialIcons
                            name="check"
                            size={15}
                            color={theme.colors.white}
                        />
                    )}
                </View>

                {/* Content */}

                <View
                    style={{
                        flex: 1,
                        marginLeft: theme.spacing.sm,
                    }}
                >
                    <Text
                        style={{
                            fontSize: theme.typography.b3,
                            fontFamily: theme.fonts.semiBold,
                            color: theme.colors.navy900,
                        }}
                    >
                        {option.label}
                    </Text>

                    <Text
                        numberOfLines={2}
                        style={{
                            marginTop: 2,
                            fontSize: theme.typography.caption,
                            fontFamily: theme.fonts.regular,
                            color: theme.colors.gray700,
                        }}
                    >
                        {option.description}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    })}
</View>





                    {!!errors?.ownsGold && (

                        <Text style={errorTextStyle}>

                            {errors.ownsGold}

                        </Text>

                    )}



                </View>



            </View>





            {/* =================================================
                GOLD TYPE BOTTOM SHEET
            ================================================= */}

            <NewCustomBottomSheet
                dragOnlyAtContentBottom={true}
                visible={goldTypeVisible}
                onClose={() => setGoldTypeVisible(false)}
                sheetheading="Select Gold Type"
                heightPercent={0.68}
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
                        marginBottom: theme.spacing.lg,
                        fontSize: theme.typography.b3,
                        fontFamily: theme.fonts.regular,
                        color: theme.colors.gray500,
                    }}
                >
                    Choose the type of gold you want to pledge
                </Text>

                {GOLD_TYPE_OPTIONS.map(option => {
                    const isSelected =
                        form?.goldType === option.value;

                    return (
                        <TouchableOpacity
                            key={option.value}
                            activeOpacity={0.8}
                            onPress={() => {
                                onChange(
                                    "goldType",
                                    option.value
                                );
                                setGoldTypeVisible(false);
                            }}
                            style={{
                                minHeight: 60,
                                marginBottom: theme.spacing.sm,
                                paddingHorizontal: theme.spacing.md,
                                borderWidth: theme.borderWidth.thin,
                                borderColor: isSelected
                                    ? theme.colors.primary500
                                    : theme.colors.gray200,
                                borderRadius: theme.radius.md,
                                backgroundColor: isSelected
                                    ? theme.colors.primary50
                                    : theme.colors.white,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: theme.radius.md,
                                        backgroundColor:
                                            theme.colors.gray100,
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <MaterialIcons
                                        name={option.icon}
                                        size={20}
                                        color={
                                            isSelected
                                                ? theme.colors.primary500
                                                : theme.colors.navy300
                                        }
                                    />
                                </View>

                                <Text
                                    style={{
                                        marginLeft: theme.spacing.md,
                                        fontSize: theme.typography.b2,
                                        fontFamily: theme.fonts.medium,
                                        color: theme.colors.navy900,
                                    }}
                                >
                                    {option.label}
                                </Text>
                            </View>

                            <View
                                style={{
                                    width: theme.radio.size,
                                    height: theme.radio.size,
                                    borderRadius: theme.radius.circle,
                                    borderWidth: theme.radio.borderWidth,
                                    borderColor: isSelected
                                        ? theme.colors.primary500
                                        : theme.radio.inactiveColor,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {isSelected && (
                                    <View
                                        style={{
                                            width: theme.radio.innerSize,
                                            height: theme.radio.innerSize,
                                            borderRadius: theme.radius.circle,
                                            backgroundColor:
                                                theme.colors.primary500,
                                        }}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </NewCustomBottomSheet>



        </View>

    );

};





export default Step2GoldLoanInfoDetail;