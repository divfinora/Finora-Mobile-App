import React, { useEffect, useState } from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Keyboard,
    Dimensions,
    Platform,
} from "react-native";

import { theme } from "../../../../../theme";

import NewCustomBottomSheet from "../../../../../components/common/Modal/NewCustomBottomSheet";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const SHEET_HEIGHT = Math.round(SCREEN_HEIGHT * 0.56);
const HEADER_HEIGHT = 64;
const CONTENT_HEIGHT = SHEET_HEIGHT - HEADER_HEIGHT;

const AddBankAccountBottomSheet = ({
    visible = false,
    onClose,
    onSubmit,
}) => {
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [confirmAccountNumber, setConfirmAccountNumber] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (visible) {
            setBankName("");
            setAccountNumber("");
            setConfirmAccountNumber("");
            setIfscCode("");
            setErrors({});
        }
    }, [visible]);

    const updateField = (field, value) => {
        let updatedValue = value;

        if (field === "bankName") {
            updatedValue = value;
        }

        if (
            field === "accountNumber" ||
            field === "confirmAccountNumber"
        ) {
            updatedValue = value.replace(/[^0-9]/g, "");
        }

        if (field === "ifscCode") {
            updatedValue = value
                .toUpperCase()
                .replace(/[^A-Z0-9]/g, "");
        }

        const setters = {
            bankName: setBankName,
            accountNumber: setAccountNumber,
            confirmAccountNumber: setConfirmAccountNumber,
            ifscCode: setIfscCode,
        };

        setters[field](updatedValue);

        setErrors(previous => ({
            ...previous,
            [field]: "",
        }));
    };

    const validateForm = () => {
        const nextErrors = {};

        if (!bankName.trim()) {
            nextErrors.bankName = "Please enter bank name";
        }

        if (!/^[0-9]{9,18}$/.test(accountNumber)) {
            nextErrors.accountNumber =
                "Enter a valid account number";
        }

        if (!confirmAccountNumber) {
            nextErrors.confirmAccountNumber =
                "Please confirm account number";
        } else if (accountNumber !== confirmAccountNumber) {
            nextErrors.confirmAccountNumber =
                "Account numbers do not match";
        }

        if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
            nextErrors.ifscCode = "Enter a valid IFSC code";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = () => {
        Keyboard.dismiss();

        if (!validateForm()) {
            return;
        }

        onSubmit?.({
            id: `${Date.now()}`,
            bankName: bankName.trim(),
            accountNumber,
            ifscCode,
        });
    };

    const renderInput = ({
        label,
        value,
        field,
        placeholder,
        keyboardType = "default",
        maxLength,
        autoCapitalize = "none",
    }) => (
        <View style={{ marginBottom: 15 }}>
            <Text
                style={{
                    marginBottom: 9,
                    fontSize: 13,
                    lineHeight: 18,
                    fontFamily: theme.fonts.regular,
                    color: "#374151",
                }}
            >
                {label}
                <Text style={{ color: "#111827" }}>*</Text>
            </Text>

            <TextInput
                value={value}
                onChangeText={text => updateField(field, text)}
                placeholder={placeholder}
                placeholderTextColor="#FFFFFF"
                keyboardType={keyboardType}
                maxLength={maxLength}
                autoCapitalize={autoCapitalize}
                autoCorrect={false}
                selectionColor={theme.colors.primary500}
                style={{
                    height: 48,
                    borderWidth: 1,
                    borderColor: errors[field]
                        ? theme.colors.error
                        : "#D1DCE6",
                    borderRadius: 10,
                    paddingHorizontal: 13,
                    paddingVertical: Platform.OS === "ios" ? 12 : 8,
                    backgroundColor: "#FFFFFF",
                    fontSize: 14,
                    fontFamily: theme.fonts.regular,
                    color: "#1F2937",
                }}
            />

            {!!errors[field] && (
                <Text
                    style={{
                        marginTop: 5,
                        fontSize: 11,
                        fontFamily: theme.fonts.regular,
                        color: theme.colors.error,
                    }}
                >
                    {errors[field]}
                </Text>
            )}
        </View>
    );

    return (
        <NewCustomBottomSheet
            visible={visible}
    onClose={onClose}
    sheetheading="Link Bank Account"
    showHeader
    heightPercent={0.66}
    sheetBg="#FFFFFF"
    enableDrag
    dragOnlyAtContentBottom={true}
    showDragHandle={false}
    closeOnBackdrop
    closeOnDragDown
            sheetStyle={{
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
                overflow: "visible",
            }}
            headerStyle={{
                height: HEADER_HEIGHT,
                minHeight: HEADER_HEIGHT,
                paddingTop: 18,
                paddingBottom: 5,
                justifyContent: "center",
                overflow: "visible",
            }}
            headingContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 24,
            }}
            headingStyle={{
                fontSize: 16,
                lineHeight: 22,
                fontFamily: theme.fonts.semiBold,
                color: "#080808",
                textAlign: "center",
            }}
            closeButtonStyle={{
                position: "absolute",
                top: -60,
                left: "50%",
                marginLeft: -22,
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: "#000000",
                borderWidth: 1,
                borderColor: "#FFFFFF",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 999,
                elevation: 10,
            }}
            closeIconColor="#FFFFFF"
            closeIconSize={20}
            contentStyle={{
                paddingHorizontal: 0,
                paddingTop: 0,
                paddingBottom: 0,
                flexGrow: 0,
            }}
        >
            <View
                style={{
                    height: CONTENT_HEIGHT,
                    backgroundColor: "#FFFFFF",
                    paddingHorizontal: 16,
                    paddingTop: 8,
                    paddingBottom: 15,
                }}
            >
                {/* SCROLLABLE FORM FIELDS */}
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        paddingBottom: 8,
                    }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    nestedScrollEnabled
                >
                    {renderInput({
                        label: "Bank Name",
                        value: bankName,
                        field: "bankName",
                        placeholder: "",
                        autoCapitalize: "words",
                    })}

                    {renderInput({
                        label: "Account Number",
                        value: accountNumber,
                        field: "accountNumber",
                        placeholder: "",
                        keyboardType: "number-pad",
                        maxLength: 18,
                    })}

                    {renderInput({
                        label: "Confirm Account Number",
                        value: confirmAccountNumber,
                        field: "confirmAccountNumber",
                        placeholder: "",
                        keyboardType: "number-pad",
                        maxLength: 18,
                    })}

                    {renderInput({
                        label: "IFSC Code",
                        value: ifscCode,
                        field: "ifscCode",
                        placeholder: "",
                        maxLength: 11,
                        autoCapitalize: "characters",
                    })}
                </ScrollView>

                {/* FIXED BOTTOM BUTTON */}
                <View
                    style={{
                        paddingTop: 12,
                        paddingBottom: Platform.OS === "ios" ? 0 : 1,
                        backgroundColor: "#FFFFFF",
                    }}
                >
                    <TouchableOpacity
                        activeOpacity={0.85}
                        onPress={handleSubmit}
                        style={{
                            height: 55,
                            borderRadius: 13,
                            backgroundColor: theme.colors.primary500,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 15,
                                fontFamily: theme.fonts.semiBold,
                                color: "#FFFFFF",
                            }}
                        >
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </NewCustomBottomSheet>
    );
};

export default AddBankAccountBottomSheet;
 