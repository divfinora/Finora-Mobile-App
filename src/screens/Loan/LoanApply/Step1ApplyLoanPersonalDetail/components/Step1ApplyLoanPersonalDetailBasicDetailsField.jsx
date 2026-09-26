import React from "react";

import {
    View,
    Text,
} from "react-native";

import { theme } from "../../../../../theme";

import CommonInput from "../../../../../components/common/Input/CommonInput";


const Step1ApplyLoanPersonalDetailBasicDetailsField = ({
    label,
    placeholder,
    value,
    onChangeText,

    error,

    required = true,

    editable = true,

    keyboardType = "default",

    autoCapitalize = "words",

    leftIcon,

    rightIcon,

    onRightIconPress,

    onBlur,


    // =====================================================
    // ONLY FOR ERROR SCROLL
    // =====================================================

    fieldName,

    registerFieldPosition,

    scrollViewRef,

}) => {

    return (
        <View
            style={{
                marginBottom: 16,
            }}
        >

            <CommonInput

                label={
                    label
                }

                placeholder={
                    placeholder
                }

                value={
                    value
                }

                onChangeText={
                    onChangeText
                }

                onBlur={
                    onBlur
                }

                required={
                    required
                }

                editable={
                    editable
                }

                keyboardType={
                    keyboardType
                }

                autoCapitalize={
                    autoCapitalize
                }


                // =================================================
                // LEFT ICON
                // =================================================

                leftIcon={
                    leftIcon
                }

                leftIconContainerStyle={{
                    marginLeft: 0,
                    marginRight: 8,
                }}


                // =================================================
                // RIGHT ICON
                // =================================================

                rightIcon={
                    rightIcon
                }

                rightIconContainerStyle={{
                    marginLeft: 8,
                    marginRight: 0,
                }}

                onRightIconPress={
                    onRightIconPress
                }


                // =================================================
                // ERROR
                // =================================================

                error={
                    null
                }


                // =================================================
                // ONLY FOR ERROR SCROLL
                // =====================================================

                fieldName={
                    fieldName
                }

                registerFieldPosition={
                    registerFieldPosition
                }

                scrollContentRef={
                    scrollViewRef
                }


                // =================================================
                // CONTAINER
                // =================================================

                containerStyle={{
                    marginBottom: 0,
                }}


                // =================================================
                // LABEL
                // =================================================

                labelStyle={{
                    marginBottom: 7,

                    fontSize: 14,

                    lineHeight: 18,

                    fontFamily:
                        theme.fonts
                            .medium,

                    color:
                        "#1F2937",
                }}


                // =================================================
                // INPUT CONTAINER
                // =================================================

                inputContainerStyle={{
                    minHeight: 45,

                    height: 45,

                    borderRadius: 12,

                    backgroundColor:
                        editable
                            ? "#FBFCFE"
                            : "#F3F4F6",

                    borderColor:
                        error
                            ? theme.colors.error
                            : "#D9E0EA",

                    borderWidth: 1,

                    paddingHorizontal: 13,

                    opacity:
                        editable
                            ? 1
                            : 0.95,
                }}


                // =================================================
                // INPUT
                // =================================================

                inputStyle={{
                    minHeight: 43,

                    height: 43,

                    fontSize: 12,

                    lineHeight: 17,

                    fontFamily:
                        theme.fonts
                            .regular,

                    color:
                        editable
                            ? "#4B5563"
                            : "#6B7280",

                    paddingVertical: 0,
                }}

            />


            {/* =================================================
                ERROR
            ================================================= */ }
 
            {!!error && (
                <Text
                    style={{
                        marginTop: 5,

                        marginLeft: 2,

                        fontSize: 11,

                        lineHeight: 15,

                        fontFamily:
                            theme.fonts
                                .medium,

                        color:
                            theme.colors
                                .error,
                    }}
                >
                    {error}
                </Text>
            )}

        </View>
    );
};


export default Step1ApplyLoanPersonalDetailBasicDetailsField;
