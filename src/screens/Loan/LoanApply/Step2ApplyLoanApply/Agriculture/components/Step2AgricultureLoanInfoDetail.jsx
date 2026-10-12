 
import React from "react";
import { View, Text } from "react-native";

import MaterialIcons from "@react-native-vector-icons/material-icons";

import { theme } from "../../../../../../theme";
import CommonInput from "../../../../../../components/common/Input/CommonInput";

const ORANGE = "#FF5A1F";
const MUTED = "#8DA0B5";

// =====================================================
// SECTION HEADER
// =====================================================

const SectionHeader = ({ number, title, subtitle }) => (
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
                backgroundColor: "#FFF5EC",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 12,
            }}
        >
            <Text
                style={{
                    fontSize: 13,
                    fontFamily: theme.fonts.medium,
                    color: ORANGE,
                }}
            >
                {number}
            </Text>
        </View>

        <View style={{ flex: 1 }}>
            <Text
                style={{
                    fontSize: 14,
                    lineHeight: 20,
                    fontFamily: theme.fonts.medium,
                    color: "#172033",
                }}
            >
                {title}
            </Text>

            <Text
                style={{
                    marginTop: 4,
                    fontSize: 12,
                    lineHeight: 18,
                    fontFamily: theme.fonts.regular,
                    color: MUTED,
                }}
            >
                {subtitle}
            </Text>
        </View>
    </View>
);

// =====================================================
// AGRICULTURE INPUT FIELD
// =====================================================

const AgricultureInputField = ({
    placeholder,
    value,
    onChangeText,
    onBlur,
    error,
    keyboardType = "default",
    icon,
    fieldName,
    registerFieldPosition,
    scrollViewRef,
}) => {
const isLandArea =
    fieldName === "landArea" ||
    fieldName === "currentCropType";

    return (
        <View style={{ marginTop: 18 }}>
            <CommonInput
                value={String(value ?? "")}
                onChangeText={onChangeText}
                onBlur={onBlur}
                placeholder={placeholder}
                required={true}
                editable={true}
                keyboardType={keyboardType}
                autoCapitalize={
                    isLandArea ? "sentences" : "none"
                }
                multiline={isLandArea}
                leftIcon={
                    <MaterialIcons
                        name={icon}
                        size={19}
                        color="#A7B6C8"
                    />
                }

                // Keep the existing icon styling.
                leftIconContainerStyle={{
                    marginLeft: 0,
                    marginRight: 8,
                    alignSelf: isLandArea
                        ? "flex-start"
                        : "center",
                    marginTop: isLandArea ? 10 : 0,
                }}

                // Error is rendered below the input
                // to preserve the existing UI.
                error={null}

                // Scroll-position registration fix.
                fieldName={fieldName}
                registerFieldPosition={registerFieldPosition}
                scrollContentRef={scrollViewRef}

                containerStyle={{
                    marginBottom: 0,
                }}
                inputContainerStyle={{
                    minHeight: isLandArea ? 100 : 48,
                    height: isLandArea ? 100 : 48,
                    borderRadius: 12,
                    backgroundColor: "#FBFCFE",
                    borderColor: error ? "#EF4444" : "#DFE7F0",
                    borderWidth: 1,
                    paddingHorizontal: 13,
                    alignItems: isLandArea
                        ? "flex-start"
                        : "center",
                }}
                inputStyle={{
                    minHeight: isLandArea ? 94 : 46,
                    height: isLandArea ? 94 : 46,
                    textAlignVertical: isLandArea
                        ? "top"
                        : "center",
                    fontSize: 12,
                    lineHeight: 17,
                    fontFamily: theme.fonts.regular,
                    color: "#4B5563",
                    paddingVertical: isLandArea ? 10 : 0,
                }}
            />

            {!!error && (
                <Text
                    style={{
                        marginTop: 5,
                        marginLeft: 2,
                        fontSize: 11,
                        lineHeight: 15,
                        fontFamily: theme.fonts.medium,
                        color: "#EF4444",
                    }}
                >
                    {error}
                </Text>
            )}
        </View>
    );
};

// =====================================================
// STEP 2 - AGRICULTURE LOAN INFORMATION
// =====================================================

const Step2AgricultureLoanInfoDetail = ({
    form = {},
    errors = {},
    onChange = () => {},
    onBlur = () => {},
    registerFieldPosition,
    scrollViewRef,
}) => {
    return (
        <View
            style={{
                marginHorizontal: 16,
                marginTop: 16,
                paddingBottom: 20,
            }}
        >
            {/* =========================================
                AGRICULTURE BANNER
            ========================================= */}

            <View
                style={{
                    minHeight: 96,
                    marginBottom: 16,
                    borderWidth: 1,
                    borderColor: "#94A3B8",
                    borderRadius: 17,
                    backgroundColor: "#FFFFFF",
                    paddingHorizontal: 14,
                    paddingVertical: 12,
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        width: 76,
                        height: 62,
                        borderRadius: 15,
                        backgroundColor: "#FFF5E8",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <MaterialIcons
                        name="agriculture"
                        size={42}
                        color={ORANGE}
                    />

                    <View
                        style={{
                            position: "absolute",
                            right: 3,
                            bottom: 2,
                            backgroundColor: "#FFFFFF",
                            borderRadius: 12,
                        }}
                    >
                        <MaterialIcons
                            name="monetization-on"
                            size={21}
                            color="#E8A12B"
                        />
                    </View>
                </View>

                <View
                    style={{
                        flex: 1,
                        paddingLeft: 12,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            lineHeight: 20,
                            fontFamily: theme.fonts.semiBold,
                            color: "#111827",
                        }}
                    >
                        Grow Your Farming Dreams
                    </Text>

                    <Text
                        style={{
                            marginTop: 4,
                            fontSize: 12,
                            lineHeight: 18,
                            fontFamily: theme.fonts.regular,
                            color: MUTED,
                        }}
                    >
                        Apply for an Agriculture loan to support your Farming Needs.
                    </Text>
                </View>
            </View>

            {/* =========================================
                MAIN DETAILS CARD
            ========================================= */}

            <View
                style={{
                    paddingHorizontal: 16,
                    paddingTop: 28,
                    paddingBottom: 24,
                    borderRadius: 18,
                    backgroundColor: "#FFFFFF",
                }}
            >
                {/* =====================================
                    1. LAND DETAILS
                ===================================== */}

                <View>
                    <SectionHeader
                        number={1}
                        title="Land Details"
                        subtitle="Provide details of the agricultural land"
                    />

                    <AgricultureInputField
                        placeholder="Enter Agricultural land"
                        value={form?.landArea}
                        onChangeText={(value) =>
                            onChange(
                                "landArea",
                                value.replace(/[^0-9.]/g, "")
                            )
                        }
                        onBlur={() => onBlur("landArea")}
                        error={errors?.landArea}
                       
                        icon="layers"
                        fieldName="landArea"
                        registerFieldPosition={registerFieldPosition}
                        scrollViewRef={scrollViewRef}
                    />
                </View>

                {/* =====================================
                    2. CROP DETAILS
                ===================================== */}

                <View style={{ marginTop: 18 }}>
                    <SectionHeader
                        number={2}
                        title="Crop Details"
                        subtitle="Tell us about the crops you plan to grow"
                    />

                    <AgricultureInputField
                        placeholder="Enter Crops Specialization"
                        value={form?.currentCropType}
                        onChangeText={(value) =>
                            onChange("currentCropType", value)
                        }
                        onBlur={() => onBlur("currentCropType")}
                        error={errors?.currentCropType}
                        icon="menu-book"
                        fieldName="currentCropType"
                        registerFieldPosition={registerFieldPosition}
                        scrollViewRef={scrollViewRef}
                    />
                </View>

                {/* =====================================
                    3. ANNUAL FARMING INCOME
                ===================================== */}

                <View style={{ marginTop: 18 }}>
                    <SectionHeader
                        number={3}
                        title="Annual Farming Income"
                        subtitle="Enter your total annual farming income."
                    />

                    <AgricultureInputField
                        placeholder="Enter Your annual income"
                        value={form?.annualIncome}
                        onChangeText={(value) =>
                            onChange(
                                "annualIncome",
                                value.replace(/[^0-9]/g, "")
                            )
                        }
                        onBlur={() => onBlur("annualIncome")}
                        error={errors?.annualIncome}
                        keyboardType="number-pad"
                        icon="price-check"
                        fieldName="annualIncome"
                        registerFieldPosition={registerFieldPosition}
                        scrollViewRef={scrollViewRef}
                    />
                </View>
            </View>
        </View>
    );
};

export default Step2AgricultureLoanInfoDetail;
 