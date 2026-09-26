import React from "react";

import {
    View,
    Text,
} from "react-native";

import Step1ApplyLoanPersonalDetailBasicDetailsFiel
    from "./Step1ApplyLoanPersonalDetailBasicDetailsField";

import { theme } from "../../../../../theme";

import MaterialIcons from "@react-native-vector-icons/material-icons";
import Octicons from "@react-native-vector-icons/octicons";
import Lucide from "@react-native-vector-icons/lucide";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
 
import Ionicons from "@react-native-vector-icons/ionicons";
import FontAwesome5 from "@react-native-vector-icons/fontawesome5";
 
 


const Step1ApplyLoanPersonalDetailPersonalDetailsSection = ({
    form,
    errors,
    onChange,
    onBlur,
    kycCompleted,
    lockedFields = {},

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

                backgroundColor:
                    "#FFFFFF",
            }}
        >

            {/* =========================================
                SECTION HEADER
            ========================================= */}

            <View
                style={{
                    flexDirection:
                        "row",

                    alignItems:
                        "center",

                    marginBottom: 18,
                }}
            >

                <View
                    style={{
                        width: 40,

                        height: 40,

                        borderRadius: 10,

                        backgroundColor:
                            "#FFF5EA",

                        alignItems:
                            "center",

                        justifyContent:
                            "center",
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

                            color:
                                "#1F2937",
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

                            color:
                                "#9CA3AF",
                        }}
                    >
                        Enter your details as per your
                        documents.
                    </Text>

                </View>

            </View>


            {/* =========================================
                FULL NAME
            ========================================= */}

            <Step1ApplyLoanPersonalDetailBasicDetailsFiel

                label="Full Name (as per Aadhaar)"

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

                editable={
                    true
                }

                autoCapitalize="words"

                leftIcon={
                    <Octicons
                        name="person"
                        size={19}
                        color="#A7B6C8"
                    />
                }

                fieldName="fullName"


                onBlur={

                    () =>

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


            {/* =========================================
                PAN
            ========================================= */}

            <Step1ApplyLoanPersonalDetailBasicDetailsFiel

                label="PAN Details"

                placeholder="Enter your PAN number"

                value={
                    form.panNumber
                }

                onChangeText={(value) =>
                    onChange(
                        "panNumber",
                        value.toUpperCase()
                    )
                }

                error={
                    errors.panNumber
                }

                editable={
                    !lockedFields.panNumber
                }

                autoCapitalize="characters"

                leftIcon={
                    <Lucide
                        name="credit-card"
                        size={19}
                        color="#A7B6C8"
                    />
                }

                rightIcon={
                    <Text
                        style={{
                            fontSize: 10,

                            color:
                                "#FFB08D",
                        }}
                    >
                        E.g. ABCDE1234F
                    </Text>
                }

                fieldName="panNumber"


                onBlur={

                    () =>

                        onBlur(

                            "panNumber"

                        )

                }

                registerFieldPosition={
                    registerFieldPosition
                }

                scrollViewRef={
                    scrollViewRef
                }

            />


            {/* =========================================
                BANK ACCOUNT
            ========================================= */}

            <Step1ApplyLoanPersonalDetailBasicDetailsFiel

                label="Bank Account"

                placeholder="Enter your bank account number"

                value={
                    form.accountNumber
                }

                onChangeText={(value) =>
                    onChange(
                        "accountNumber",
                        value
                    )
                }

                error={
                    errors.accountNumber
                }

                editable={
                    !lockedFields.accountNumber
                }

                keyboardType="number-pad"

                autoCapitalize="none"

                leftIcon={
                    <MaterialDesignIcons
                        name="bank-outline"
                        size={19}
                        color="#A7B6C8"
                    />
                }

                fieldName="accountNumber"


                onBlur={

                    () =>

                        onBlur(

                            "accountNumber"

                        )

                }

                registerFieldPosition={
                    registerFieldPosition
                }

                scrollViewRef={
                    scrollViewRef
                }

            />


            {/* =========================================
                AADHAAR
            ========================================= */}

            <Step1ApplyLoanPersonalDetailBasicDetailsFiel

                label="Aadhaar No."

                placeholder="Enter your 12 digit Aadhaar number"

                value={
                    form.aadhaarNumber
                }

                onChangeText={(value) =>
                    onChange(
                        "aadhaarNumber",
                        value
                    )
                }

                error={
                    errors.aadhaarNumber
                }

                editable={
                    !lockedFields.aadhaarNumber
                }

                keyboardType="number-pad"

                autoCapitalize="none"

                leftIcon={
                    <Ionicons
                        name="folder-open-outline"
                        size={19}
                        color="#A7B6C8"
                    />
                }

                rightIcon={
                    
                    <Lucide
                        name="scan-line"
                        size={19}
                        color={
                            theme.colors.primary400
                        }
                    />
                }

                fieldName="aadhaarNumber"


                onBlur={

                    () =>

                        onBlur(

                            "aadhaarNumber"

                        )

                }

                registerFieldPosition={
                    registerFieldPosition
                }

                scrollViewRef={
                    scrollViewRef
                }

            />


            {/* =========================================
                ADDRESS
            ========================================= */}

            <Step1ApplyLoanPersonalDetailBasicDetailsFiel

                label="Current Address"

                placeholder="Enter your complete address"

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

                editable={
                    true
                }

                autoCapitalize="sentences"

                leftIcon={
                    <Ionicons
                        name="location-outline"
                        size={19}
                        color="#A7B6C8"
                    />
                }

                fieldName="addressLine1"


                onBlur={

                    () =>

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


            {/* =========================================
                CITY + STATE
            ========================================= */}

            <View
                style={{
                    flexDirection:
                        "row",

                    gap: 12,
                }}
            >

                <View
                    style={{
                        flex: 1,
                    }}
                >

                    <Step1ApplyLoanPersonalDetailBasicDetailsFiel

                        label="City"

                        placeholder="Select city"

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

                        editable={
                            true
                        }

                        autoCapitalize="words"

                        leftIcon={
                            <MaterialDesignIcons
                                name="city"
                                size={18}
                                color="#A7B6C8"
                            />
                        }

                        fieldName="city"


                        onBlur={

                            () =>

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


                <View
                    style={{
                        flex: 1,
                    }}
                >

                    <Step1ApplyLoanPersonalDetailBasicDetailsFiel

                        label="State"

                        placeholder="Select state"

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

                        editable={
                            true
                        }

                        autoCapitalize="words"

                        leftIcon={
                            <MaterialIcons
                                name="map"
                                size={18}
                                color="#A7B6C8"
                            />
                        }

                        fieldName="state"


                        onBlur={

                            () =>

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


            {/* =========================================
                PINCODE
            ========================================= */}

            <Step1ApplyLoanPersonalDetailBasicDetailsFiel

                label="Pin Code"

                placeholder="Enter 6 digit pincode"

                value={
                    form.pincode
                }

                onChangeText={(value) =>
                    onChange(
                        "pincode",
                        value
                    )
                }

                error={
                    errors.pincode
                }

                editable={
                    true
                }

                keyboardType="number-pad"

                autoCapitalize="none"

                leftIcon={
                    <Octicons
                        name="mail"
                        size={19}
                        color="#A7B6C8"
                    />
                }

                fieldName="pincode"


                onBlur={

                    () =>

                        onBlur(

                            "pincode"

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
    );
};


export default Step1ApplyLoanPersonalDetailPersonalDetailsSection;