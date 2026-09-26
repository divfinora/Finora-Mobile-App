import React from "react";

import {
    View,
    Text,
} from "react-native";

import Step1ApplyLoanPersonalDetailBasicDetailsFiel
    from "./Step1ApplyLoanPersonalDetailBasicDetailsField";

import { theme } from "../../../../../theme";

import MaterialIcons
    from "@react-native-vector-icons/material-icons";

import Octicons
    from "@react-native-vector-icons/octicons";

import Ionicons
    from "@react-native-vector-icons/ionicons";

import MaterialDesignIcons
    from "@react-native-vector-icons/material-design-icons";


// =====================================================
// COMPONENT
// =====================================================

const Step1ApplyLoanPersonalDetailBasicPersonalDetailsSectionWithoutKycAndLogin = ({
    form,
    errors,
    onChange,
    onBlur,

    // ONLY FOR ERROR SCROLL
    registerFieldPosition,
    scrollViewRef,

}) => {

    return (

        <View
            style={{
                marginHorizontal: 16,

                marginTop: 16,

                paddingHorizontal: 20,

                paddingTop: 19,

                paddingBottom: 20,

                borderRadius: 16,

                backgroundColor: "#FFFFFF",
            }}
        >

            {/* =================================================
                SECTION HEADER
            ================================================= */}

            <View
                style={{
                    flexDirection: "row",

                    alignItems: "center",

                    marginBottom: 18,
                }}
            >

                <View
                    style={{
                        width: 40,

                        height: 40,

                        borderRadius: 10,

                        backgroundColor: "#FFF5EA",

                        alignItems: "center",

                        justifyContent: "center",
                    }}
                >

                    <MaterialIcons
                        name="person"
                        size={21}
                        color={
                            theme.colors.primary500
                        }
                    />

                </View>


                <View
                    style={{
                        marginLeft: 12,
                    }}
                >

                    <Text
                        style={{
                            fontSize: 18,

                            lineHeight: 23,

                            fontFamily:
                                theme.fonts.headingSemiBold,

                            color: "#1F2937",
                        }}
                    >
                        Personal Details
                    </Text>


                    <Text
                        style={{
                            marginTop: 1,

                            fontSize: 12,

                            lineHeight: 16,

                            fontFamily:
                                theme.fonts.regular,

                            color: "#9CA3AF",
                        }}
                    >
                        Enter your basic details.
                    </Text>

                </View>

            </View>


            {/* =================================================
                FULL NAME
                OPTIONAL
            ================================================= */}

            <Step1ApplyLoanPersonalDetailBasicDetailsFiel

                label="Full Name"

                placeholder="Enter your full name"

                value={
                    form.fullName
                }

                onChangeText={(value) =>
                    onChange(
                        "fullName",
                        value
                    )
                }

                error={
                    errors.fullName
                }

                required={false}

                editable={true}

                autoCapitalize="words"

                leftIcon={

                    <Octicons
                        name="person"
                        size={19}
                        color="#A7B6C8"
                    />

                }

                fieldName="fullName"

                onBlur={() =>
                    onBlur(
                        "fullName"
                    )
                }

                registerFieldPosition={
                    registerFieldPosition
                }

                scrollViewRef={
                    scrollViewRef
                }

            />


            {/* =================================================
                CONTACT NUMBER
                REQUIRED
            ================================================= */}

            <Step1ApplyLoanPersonalDetailBasicDetailsFiel

                label="Contact Number"

                required={true}

                placeholder="Enter your contact number"

                value={
                    form.contactNumber
                }

                onChangeText={(value) =>
                    onChange(
                        "contactNumber",
                        value
                    )
                }

                error={
                    errors.contactNumber
                }

                editable={true}

                keyboardType="phone-pad"

                autoCapitalize="none"

                leftIcon={

                    <Ionicons
                        name="call-outline"
                        size={19}
                        color="#A7B6C8"
                    />

                }

                fieldName="contactNumber"

                onBlur={() =>
                    onBlur(
                        "contactNumber"
                    )
                }

                registerFieldPosition={
                    registerFieldPosition
                }

                scrollViewRef={
                    scrollViewRef
                }

            />


            {/* =================================================
                CURRENT ADDRESS
                OPTIONAL
            ================================================= */}

            <Step1ApplyLoanPersonalDetailBasicDetailsFiel

                label="Current Address"

                required={false}

                placeholder="Enter your current address"

                value={
                    form.addressLine1
                }

                onChangeText={(value) =>
                    onChange(
                        "addressLine1",
                        value
                    )
                }

                error={
                    errors.addressLine1
                }

                editable={true}

                autoCapitalize="sentences"

                leftIcon={

                    <Ionicons
                        name="location-outline"
                        size={19}
                        color="#A7B6C8"
                    />

                }

                fieldName="addressLine1"

                onBlur={() =>
                    onBlur(
                        "addressLine1"
                    )
                }

                registerFieldPosition={
                    registerFieldPosition
                }

                scrollViewRef={
                    scrollViewRef
                }

            />


            {/* =================================================
                CITY + STATE
            ================================================= */}

            <View
                style={{
                    flexDirection: "row",

                    gap: 12,
                }}
            >

                {/* =================================================
                    CITY
                ================================================= */}

                <View
                    style={{
                        flex: 1,
                    }}
                >

                    <Step1ApplyLoanPersonalDetailBasicDetailsFiel

                        label="City"

                        required={false}

                        placeholder="Enter city"

                        value={
                            form.city
                        }

                        onChangeText={(value) =>
                            onChange(
                                "city",
                                value
                            )
                        }

                        error={
                            errors.city
                        }

                        editable={true}

                        autoCapitalize="words"

                        leftIcon={

                            <MaterialDesignIcons
                                name="city"
                                size={18}
                                color="#A7B6C8"
                            />

                        }

                        fieldName="city"

                        onBlur={() =>
                            onBlur(
                                "city"
                            )
                        }

                        registerFieldPosition={
                            registerFieldPosition
                        }

                        scrollViewRef={
                            scrollViewRef
                        }

                    />

                </View>


                {/* =================================================
                    STATE
                ================================================= */}

                <View
                    style={{
                        flex: 1,
                    }}
                >

                    <Step1ApplyLoanPersonalDetailBasicDetailsFiel

                        label="State"

                        required={false}

                        placeholder="Enter state"

                        value={
                            form.state
                        }

                        onChangeText={(value) =>
                            onChange(
                                "state",
                                value
                            )
                        }

                        error={
                            errors.state
                        }

                        editable={true}

                        autoCapitalize="words"

                        leftIcon={

                            <MaterialIcons
                                name="map"
                                size={18}
                                color="#A7B6C8"
                            />

                        }

                        fieldName="state"

                        onBlur={() =>
                            onBlur(
                                "state"
                            )
                        }

                        registerFieldPosition={
                            registerFieldPosition
                        }

                        scrollViewRef={
                            scrollViewRef
                        }

                    />

                </View>

            </View>

        </View>

    );

};


export default Step1ApplyLoanPersonalDetailBasicPersonalDetailsSectionWithoutKycAndLogin;