
import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from "react-native";

import Step1ApplyLoanPersonalDetailBasicDetailsField
    from "./Step1ApplyLoanPersonalDetailBasicDetailsField";

import { theme } from "../../../../../theme";

import MaterialIcons from "@react-native-vector-icons/material-icons";
import Octicons from "@react-native-vector-icons/octicons";
import Lucide from "@react-native-vector-icons/lucide";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import Ionicons from "@react-native-vector-icons/ionicons";

import KycFieldStatus from './KycFieldStatus'

import BankAccountSection from "./BankAccountSection";

const Step1ApplyLoanPersonalDetailPersonalDetailsSection = ({
    form,
    errors,
    onChange,
    onBlur,
    kycCompleted,
    isKycSyncing = false,
    lockedFields = {},
    registerFieldPosition,
    scrollViewRef,
}) => {


    const handleVerify = (field, value, isValid) => {
        if (isKycSyncing || kycCompleted || !isValid) {
            return;
        }

        Alert.alert(
            "Verification Coming Soon",
            `${field} verification will be available soon.`
        );
    };

    const panValid = /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
        (form.panNumber || "").trim()
    );

    const aadhaarValid = /^[0-9]{12}$/.test(
        (form.aadhaarNumber || "").trim()
    );



    // Use API verification status, not merely field presence.
    const panStatus = isKycSyncing
        ? "syncing"
        : lockedFields.panNumber
            ? "verified"
            : "pending";

    const aadhaarStatus = isKycSyncing
        ? "syncing"
        : lockedFields.aadhaarNumber
            ? "verified"
            : "pending";

    const handlePanVerification = () => {
        Alert.alert(
            "PAN Verification",
            "PAN verification will be available soon."
        );
    };

    const handleAadhaarVerification = () => {
        Alert.alert(
            "Aadhaar Verification",
            "Aadhaar verification will be available soon."
        );
    };

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
            {/* SECTION HEADER */}

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
                        color={theme.colors.primary500}
                    />
                </View>

                <View style={{ marginLeft: 12 }}>
                    <Text
                        style={{
                            fontSize: 18,
                            lineHeight: 23,
                            fontFamily: theme.fonts.headingSemiBold,
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
                            fontFamily: theme.fonts.regular,
                            color: "#9CA3AF",
                        }}
                    >
                        Enter your details as per your documents.
                    </Text>
                </View>
            </View>

            {/* FULL NAME */}

            <Step1ApplyLoanPersonalDetailBasicDetailsField
                label="Full Name (as per Aadhaar)"
                placeholder="Enter your full name"
                value={form.fullName}
                onChangeText={(value) =>
                    onChange("fullName", value)
                }
                error={errors.fullName}
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
                onBlur={() => onBlur("fullName")}
                registerFieldPosition={registerFieldPosition}
                scrollViewRef={scrollViewRef}
            />

            {/* PAN */}

            <Step1ApplyLoanPersonalDetailBasicDetailsField
                label="PAN Details"
                placeholder="Enter your PAN number"
                value={form.panNumber}
                onChangeText={(value) =>
                    onChange("panNumber", value.toUpperCase())
                }
                error={errors.panNumber}
                editable={
                    !isKycSyncing &&
                    !lockedFields.panNumber
                }
                verificationStatus={panStatus}
                autoCapitalize="characters"
                maxLength={10}
                leftIcon={
                    <Lucide
                        name="credit-card"
                        size={19}
                        color="#A7B6C8"
                    />
                }
                rightIcon={
                    <KycFieldStatus
                        status={panStatus}
                        onVerify={handlePanVerification}
                        isEnabled={
                            panValid &&
                            !isKycSyncing &&
                            panStatus !== "verified"
                        }
                    />
                }
                fieldName="panNumber"
                onBlur={() => onBlur("panNumber")}
                registerFieldPosition={registerFieldPosition}
                scrollViewRef={scrollViewRef}
            />

            {/* BANK ACCOUNT */}

            <BankAccountSection
               dragOnlyAtContentBottom={true}
                value={form.accountNumber}
                onChange={onChange}
                error={errors.accountNumber}
            />

            {/* AADHAAR */}

            <Step1ApplyLoanPersonalDetailBasicDetailsField
                label="Aadhaar No."
                placeholder="Enter your 12 digit Aadhaar number"
                value={form.aadhaarNumber}
                onChangeText={(value) =>
                    onChange(
                        "aadhaarNumber",
                        value.replace(/[^0-9]/g, "").slice(0, 12)
                    )
                }
                error={errors.aadhaarNumber}
                editable={
                    !isKycSyncing &&
                    !lockedFields.aadhaarNumber
                }
                verificationStatus={aadhaarStatus}
                keyboardType="number-pad"
                autoCapitalize="none"
                maxLength={12}
                leftIcon={
                    <Lucide
                        name="fingerprint"
                        size={19}
                        color="#A7B6C8"
                    />
                }
                rightIcon={
                    <KycFieldStatus
                        status={aadhaarStatus}
                        onVerify={handleAadhaarVerification}
                        isEnabled={
                            aadhaarValid &&
                            !isKycSyncing &&
                            aadhaarStatus !== "verified"
                        }
                    />
                }













                fieldName="aadhaarNumber"
                onBlur={() => onBlur("aadhaarNumber")}
                registerFieldPosition={registerFieldPosition}
                scrollViewRef={scrollViewRef}
            />

            {/* CURRENT ADDRESS */}

            <Step1ApplyLoanPersonalDetailBasicDetailsField
                label="Current Address"
                placeholder="Enter your complete address"
                value={form.addressLine1}
                onChangeText={(value) =>
                    onChange("addressLine1", value)
                }
                error={errors.addressLine1}
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
                onBlur={() => onBlur("addressLine1")}
                registerFieldPosition={registerFieldPosition}
                scrollViewRef={scrollViewRef}
            />

            {/* CITY + STATE */}

            <View
                style={{
                    flexDirection: "row",
                    gap: 12,
                }}
            >
                <View style={{ flex: 1 }}>
                    <Step1ApplyLoanPersonalDetailBasicDetailsField
                        label="City"
                        placeholder="Select city"
                        value={form.city}
                        onChangeText={(value) =>
                            onChange("city", value)
                        }
                        error={errors.city}
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
                        onBlur={() => onBlur("city")}
                        registerFieldPosition={registerFieldPosition}
                        scrollViewRef={scrollViewRef}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <Step1ApplyLoanPersonalDetailBasicDetailsField
                        label="State"
                        placeholder="Select state"
                        value={form.state}
                        onChangeText={(value) =>
                            onChange("state", value)
                        }
                        error={errors.state}
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
                        onBlur={() => onBlur("state")}
                        registerFieldPosition={registerFieldPosition}
                        scrollViewRef={scrollViewRef}
                    />
                </View>
            </View>

            {/* PIN CODE */}

            <Step1ApplyLoanPersonalDetailBasicDetailsField
                label="Pin Code"
                placeholder="Enter 6 digit pincode"
                value={form.pincode}
                onChangeText={(value) =>
                    onChange(
                        "pincode",
                        value.replace(/[^0-9]/g, "").slice(0, 6)
                    )
                }
                error={errors.pincode}
                editable={true}
                keyboardType="number-pad"
                autoCapitalize="none"
                maxLength={6}
                leftIcon={
                    <Octicons
                        name="mail"
                        size={19}
                        color="#A7B6C8"
                    />
                }
                fieldName="pincode"
                onBlur={() => onBlur("pincode")}
                registerFieldPosition={registerFieldPosition}
                scrollViewRef={scrollViewRef}
            />
        </View>
    );
};

export default Step1ApplyLoanPersonalDetailPersonalDetailsSection;
