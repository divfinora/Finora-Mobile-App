import React from "react";

import {
    View,
    ScrollView,
} from "react-native";

import {
    ArrowRight,
} from "lucide-react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    useNavigation,
} from "@react-navigation/native";

import NewFlowCommonHeader
    from "../../../../../components/common/BackButton/NewFlowCommonHeader";

import KeyboardAvoidingBottomView
    from "../../../../../components/common/KeyBoard/KeyboardAvoidingBottomView";

import CommonButton
    from "../../../../../components/common/Button/CommonButton";

import Step1ApplyLoanPersonalDetailBasicDetailsBenefits
    from "../../Step1ApplyLoanPersonalDetail/components/Step1ApplyLoanPersonalDetailBasicDetailsBenefits";

import MaterialIcons
    from "@react-native-vector-icons/material-icons";

import {
    theme,
} from "../../../../../theme";


// =====================================================
// COMPONENT
// =====================================================

const Step2PersonalLoanApply = () => {

    const navigation =
        useNavigation();


    // =====================================================
    // BENEFITS
    // =====================================================

    const BasicDetailItems = [
        {
            icon: (
                <MaterialIcons
                    name="bolt"
                    size={20}
                    color="#F97316"
                />
            ),

            title: "Quick Process",
        },

        {
            icon: (
                <MaterialIcons
                    name="verified-user"
                    size={20}
                    color="#F97316"
                />
            ),

            title: "100% Secure",
        },

        {
            icon: (
                <MaterialIcons
                    name="lock"
                    size={20}
                    color="#F97316"
                />
            ),

            title: "Minimal Documents",
        },
    ];


    // =====================================================
    // HEADER BACK
    // =====================================================

    const handleBack = () => {

        navigation.goBack();

    };


    // =====================================================
    // SCREEN
    // =====================================================

    return (

        <SafeAreaView
            edges={[
                "left",
                "right",
                "bottom",
            ]}
            style={{
                flex: 1,
            }}
        >

            <KeyboardAvoidingBottomView
                style={{
                    flex: 1,

                    backgroundColor:
                        "#F9EBD5",
                }}
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <NewFlowCommonHeader
                    title="Basic Details"
                    onBack={handleBack}
                    onNotificationPress={() => {

                        navigation.navigate(
                            "get-notification-screen"
                        );

                    }}
                />


                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 24,
                    }}
                >

                    {/* =================================================
                        BENEFITS
                    ================================================= */}

                    <Step1ApplyLoanPersonalDetailBasicDetailsBenefits
                        items={
                            BasicDetailItems
                        }
                    />


                    {/* =================================================
                        CONTENT
                    ================================================= */}

                    <View
                        style={{
                            marginTop: 16,
                        }}
                    >

                        {/* 
                            Yahan se Personal Loan
                            Basic Details ka actual
                            form add karenge.
                        */}

                    </View>

                </ScrollView>


                {/* =================================================
                    BOTTOM BUTTON
                ================================================= */}

                <View
                    style={{
                        width: "100%",

                        backgroundColor:
                            "#FFFDF9",

                        paddingHorizontal: 16,

                        paddingTop: 16,

                        paddingBottom: 16,
                    }}
                >

                    <CommonButton

                        title="Continue"

                        onPress={() => {
                            // Next step logic
                        }}

                        rightIcon={
                            <ArrowRight
                                size={22}
                                color="#FFFFFF"
                                strokeWidth={2}
                            />
                        }

                        containerStyle={{
                            height: 56,

                            borderRadius: 12,

                            backgroundColor:
                                theme.colors.primary400,
                        }}

                        textStyle={{
                            fontSize: 16,

                            fontFamily:
                                theme.fonts.semiBold,

                            color: "#FFFFFF",
                        }}

                    />

                </View>

            </KeyboardAvoidingBottomView>

        </SafeAreaView>

    );
};


export default Step2PersonalLoanApply;