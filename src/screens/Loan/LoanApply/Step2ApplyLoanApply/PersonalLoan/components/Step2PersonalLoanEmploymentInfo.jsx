import React, {useEffect, useRef, useState} from "react";

import {
    View,
    Text,
    TouchableOpacity,
 
    Animated,
    Easing,
    StyleSheet,
} from "react-native";

import MaterialIcons from "@react-native-vector-icons/material-icons";
import Octicons from "@react-native-vector-icons/octicons";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";

import Step1ApplyLoanPersonalDetailBasicDetailsField from "../../../Step1ApplyLoanPersonalDetail/components/Step1ApplyLoanPersonalDetailBasicDetailsField";
import NewCustomBottomSheet from "../../../../../../components/common/Modal/NewCustomBottomSheet";
// import NewCustomBottomSheet from "../../../../../components/common/";
import NewUploadBottomSheet
    from "../../../../../../components/common/Modal/NewUploadBottomSheet";
// =====================================================
// OPTIONS
// =====================================================

const EMPLOYMENT_OPTIONS = [
    {
        label: "Self Employed",
        value: "Self Employed",
        icon: "business-center",
    },
    {
        label: "Salaried Person",
        value: "Salaried Person",
        icon: "badge",
    },
];

const BUSINESS_TYPE_OPTIONS = [
    "Proprietorship",
    "Partnership",
    "Private Limited",
    "Public Limited",
    "LLP",
    "Other",
];

const EXPERIENCE_OPTIONS = [
    "Less than 1 Year",
    "1 - 3 Years",
    "3 - 5 Years",
    "5 - 10 Years",
    "10+ Years",
];

// =====================================================
// FIELD WRAPPER
// =====================================================

const SelectField = ({
    label,
    placeholder,
    value,
    error,
    leftIcon,
    onPress,
    fieldName,
    onBlur,
    registerFieldPosition,
    scrollViewRef,
}) => {
    return (
        <TouchableOpacity
            activeOpacity={0.95}
            onPress={onPress}
        >
            <Step1ApplyLoanPersonalDetailBasicDetailsField
                label={label}
                placeholder={placeholder}
                value={value}
                onChangeText={() => {}}
                error={error}
                editable={false}
                autoCapitalize="words"
                leftIcon={leftIcon}
                rightIcon={
                    <MaterialIcons
                        name="keyboard-arrow-down"
                        size={21}
                        color="#6B7280"
                    />
                }
                fieldName={fieldName}
                onBlur={() => onBlur(fieldName)}
                registerFieldPosition={registerFieldPosition}
                scrollViewRef={scrollViewRef}
            />
        </TouchableOpacity>
    );
};

// =====================================================
// COMPONENT
// =====================================================

const Step2PersonalLoanEmploymentInfo = ({
    form,
    errors,
    onChange,
    onBlur,
    registerFieldPosition,
    scrollViewRef,
}) => {
    const [sheetVisible, setSheetVisible] = useState(false);
    const [sheetType, setSheetType] = useState("employmentType");

    const isSelfEmployed =
        form?.employmentType === "Self Employed";

    const openSheet = type => {
        setSheetType(type);
        setSheetVisible(true);
    };

    const closeSheet = () => {
        setSheetVisible(false);
    };

    const getSheetConfig = () => {
        if (sheetType === "employmentType") {
            return {
                title: "Select Employment Type",
                options: EMPLOYMENT_OPTIONS,
                selectedValue: form?.employmentType,
                fieldName: "employmentType",
            };
        }

        if (sheetType === "businessType") {
            return {
                title: "Select Business Type",
                options: BUSINESS_TYPE_OPTIONS.map(item => ({
                    label: item,
                    value: item,
                    icon: "business",
                })),
                selectedValue: form?.businessType,
                fieldName: "businessType",
            };
        }

        return {
            title: isSelfEmployed
                ? "Select Business Experience"
                : "Select Experience",
            options: EXPERIENCE_OPTIONS.map(item => ({
                label: item,
                value: item,
                icon: "event-available",
            })),
            selectedValue: isSelfEmployed
                ? form?.businessExperience
                : form?.experience,
            fieldName: isSelfEmployed
                ? "businessExperience"
                : "experience",
        };
    };

    const sheetConfig = getSheetConfig();

    return (
        <>
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
                    EMPLOYMENT TYPE
                ================================================= */}

                <SelectField
                    label="Employment Type"
                    placeholder="Select your Employment Type"
                    value={form.employmentType}
                    error={errors.employmentType}
                    fieldName="employmentType"
                    onPress={() => openSheet("employmentType")}
                    onBlur={onBlur}
                    registerFieldPosition={registerFieldPosition}
                    scrollViewRef={scrollViewRef}
                    leftIcon={
                        <MaterialIcons
                            name="badge"
                            size={19}
                            color="#A7B6C8"
                        />
                    }
                />

                {/* =================================================
                    SELF EMPLOYED
                ================================================= */}

                {isSelfEmployed ? (
                    <>
                        <Step1ApplyLoanPersonalDetailBasicDetailsField
                            label="Business / Organization Name"
                            placeholder="Enter your Business Name"
                            value={form.businessName}
                            onChangeText={value =>
                                onChange("businessName", value)
                            }
                            error={errors.businessName}
                            editable
                            autoCapitalize="words"
                            leftIcon={
                                <MaterialDesignIcons
                                    name="office-building"
                                    size={19}
                                    color="#A7B6C8"
                                />
                            }
                            fieldName="businessName"
                            onBlur={() => onBlur("businessName")}
                            registerFieldPosition={registerFieldPosition}
                            scrollViewRef={scrollViewRef}
                        />

                        <SelectField
                            label="Business Type"
                            placeholder="Select Business Type"
                            value={form.businessType}
                            error={errors.businessType}
                            fieldName="businessType"
                            onPress={() => openSheet("businessType")}
                            onBlur={onBlur}
                            registerFieldPosition={registerFieldPosition}
                            scrollViewRef={scrollViewRef}
                            leftIcon={
                                <MaterialIcons
                                    name="business"
                                    size={19}
                                    color="#A7B6C8"
                                />
                            }
                        />

                        {/* Nature of Business intentionally NOT included. */}

                        <Step1ApplyLoanPersonalDetailBasicDetailsField
                            label="Monthly Income"
                            placeholder="Enter your Monthly Income"
                            value={form.monthlyIncome}
                            onChangeText={value =>
                                onChange("monthlyIncome", value)
                            }
                            error={errors.monthlyIncome}
                            editable
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            leftIcon={
                                <MaterialIcons
                                    name="currency-rupee"
                                    size={19}
                                    color="#A7B6C8"
                                />
                            }
                            fieldName="monthlyIncome"
                            onBlur={() => onBlur("monthlyIncome")}
                            registerFieldPosition={registerFieldPosition}
                            scrollViewRef={scrollViewRef}
                        />

                        <SelectField
                            label="Business Experience"
                            placeholder="Select Business Experience"
                            value={form.businessExperience}
                            error={errors.businessExperience}
                            fieldName="businessExperience"
                            onPress={() => openSheet("experience")}
                            onBlur={onBlur}
                            registerFieldPosition={registerFieldPosition}
                            scrollViewRef={scrollViewRef}
                            leftIcon={
                                <MaterialIcons
                                    name="event-available"
                                    size={19}
                                    color="#A7B6C8"
                                />
                            }
                        />
                    </>
                ) : (
                    <>
                        {/* =================================================
                            SALARIED
                        ================================================= */}

                        <Step1ApplyLoanPersonalDetailBasicDetailsField
                            label="Company Name"
                            placeholder="Enter your Organization"
                            value={form.companyName}
                            onChangeText={value =>
                                onChange("companyName", value)
                            }
                            error={errors.companyName}
                            editable
                            autoCapitalize="words"
                            leftIcon={
                                <MaterialDesignIcons
                                    name="briefcase-outline"
                                    size={19}
                                    color="#A7B6C8"
                                />
                            }
                            fieldName="companyName"
                            onBlur={() => onBlur("companyName")}
                            registerFieldPosition={registerFieldPosition}
                            scrollViewRef={scrollViewRef}
                        />

                        <Step1ApplyLoanPersonalDetailBasicDetailsField
                            label="Designation"
                            placeholder="Enter Designation"
                            value={form.designation}
                            onChangeText={value =>
                                onChange("designation", value)
                            }
                            error={errors.designation}
                            editable
                            autoCapitalize="words"
                            leftIcon={
                                <MaterialIcons
                                    name="edit"
                                    size={19}
                                    color="#A7B6C8"
                                />
                            }
                            fieldName="designation"
                            onBlur={() => onBlur("designation")}
                            registerFieldPosition={registerFieldPosition}
                            scrollViewRef={scrollViewRef}
                        />

                        <Step1ApplyLoanPersonalDetailBasicDetailsField
                            label="Monthly Income"
                            placeholder="Enter your Monthly Income"
                            value={form.monthlyIncome}
                            onChangeText={value =>
                                onChange("monthlyIncome", value)
                            }
                            error={errors.monthlyIncome}
                            editable
                            keyboardType="number-pad"
                            autoCapitalize="none"
                            leftIcon={
                                <MaterialIcons
                                    name="currency-rupee"
                                    size={19}
                                    color="#A7B6C8"
                                />
                            }
                            fieldName="monthlyIncome"
                            onBlur={() => onBlur("monthlyIncome")}
                            registerFieldPosition={registerFieldPosition}
                            scrollViewRef={scrollViewRef}
                        />

                        <SelectField
                            label="Experience"
                            placeholder="Select Experience"
                            value={form.experience}
                            error={errors.experience}
                            fieldName="experience"
                            onPress={() => openSheet("experience")}
                            onBlur={onBlur}
                            registerFieldPosition={registerFieldPosition}
                            scrollViewRef={scrollViewRef}
                            leftIcon={
                                <MaterialIcons
                                    name="event-available"
                                    size={19}
                                    color="#A7B6C8"
                                />
                            }
                        />
                    </>
                )}

                {/* =================================================
                    PIN CODE
                ================================================= */}

                <Step1ApplyLoanPersonalDetailBasicDetailsField
                    label="Pin Code"
                    placeholder="Enter 6 digit pincode"
                    value={form.employmentPincode}
                    onChangeText={value =>
                        onChange("employmentPincode", value)
                    }
                    error={errors.employmentPincode}
                    editable
                    keyboardType="number-pad"
                    maxLength={6}
                    autoCapitalize="none"
                    leftIcon={
                        <Octicons
                            name="location"
                            size={19}
                            color="#A7B6C8"
                        />
                    }
                    fieldName="employmentPincode"
                    onBlur={() => onBlur("employmentPincode")}
                    registerFieldPosition={registerFieldPosition}
                    scrollViewRef={scrollViewRef}
                />
            </View>

            <NewCustomBottomSheet
              dragOnlyAtContentBottom={true}
                visible={sheetVisible}
                onClose={closeSheet}
                sheetheading={sheetConfig.title}
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
                {sheetConfig.options.map((option, index) => {
                    const selected =
                        sheetConfig.selectedValue === option.value;

                    return (
                        <TouchableOpacity
                            key={`${option.value}-${index}`}
                            activeOpacity={0.8}
                            onPress={() => {
                                onChange(
                                    sheetConfig.fieldName,
                                    option.value,
                                );
                                closeSheet();
                            }}
                            style={{
                                minHeight: 58,
                                borderRadius: 14,
                                borderWidth: 1,
                                borderColor: selected
                                    ? "#FF6B2C"
                                    : "#E5E7EB",
                                backgroundColor: selected
                                    ? "#FFF7F2"
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
                                    backgroundColor: selected
                                        ? "#FFF0E7"
                                        : "#F3F6F9",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: 12,
                                }}
                            >
                                <MaterialIcons
                                    name={
                                        option.icon ||
                                        "radio-button-checked"
                                    }
                                    size={19}
                                    color={
                                        selected
                                            ? "#FF6B2C"
                                            : "#64748B"
                                    }
                                />
                            </View>

                            <Text
                                style={{
                                    flex: 1,
                                    fontSize: 15,
                                    fontWeight: selected
                                        ? "600"
                                        : "500",
                                    color: "#111827",
                                }}
                            >
                                {option.label}
                            </Text>

                            {selected && (
                                <MaterialIcons
                                    name="check-circle"
                                    size={21}
                                    color="#FF6B2C"
                                />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </NewCustomBottomSheet>
        </>
    );
};

export default Step2PersonalLoanEmploymentInfo;
