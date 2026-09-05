import React from "react";

import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Pressable,
} from "react-native";

import {
    Check,
} from "lucide-react-native";

import { theme } from "../../../theme";

const SuccessModal = ({
    visible,
    onClose,

    // ================= CONTENT =================

    title = "Success!",
    description = "",
    amount = "",

    // ================= ICON =================

    Icon = Check,

    iconSize = 24,
    iconColor = theme.colors.primary500,

    // ================= BUTTON =================

    showButton = false,
    buttonText = "",
    onButtonPress,

    // ================= STYLE OVERRIDES =================

    overlayStyle,
    modalStyle,

    iconOuterStyle,
    iconInnerStyle,
    iconStyle,

    titleStyle,
    amountStyle,
    descriptionStyle,

    buttonContainerStyle,
    buttonStyle,
    buttonTextStyle,
}) => {

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
            onRequestClose={onClose}
        >

            {/* ================= OVERLAY ================= */}

            <Pressable
                style={[
                    {
                        flex: 1,

                        backgroundColor:
                            theme.colors.overlay,

                        justifyContent:
                            "center",

                        alignItems:
                            "center",

                        paddingHorizontal:
                            theme.spacing.xl,
                    },

                    overlayStyle,
                ]}
                onPress={onClose}
            >

                {/* ================= MODAL ================= */}

                <Pressable
                    style={[
                        {
                            width: "100%",

                            maxWidth: 370,

                            backgroundColor:
                                theme.colors.white,

                            borderRadius:
                                theme.modal.borderRadius,

                            paddingTop: 40,

                            paddingBottom:
                                showButton
                                    ? 28
                                    : 40,

                            paddingHorizontal:
                                theme.spacing.xxl,

                            alignItems:
                                "center",

                            ...theme.shadows.lg,
                        },

                        modalStyle,
                    ]}
                    onPress={(event) =>
                        event.stopPropagation()
                    }
                >

                    {/* ================= SUCCESS ICON ================= */}

                    <View
                        style={[
                            {
                                width: 100,
                                height: 100,

                                borderRadius: 50,

                                backgroundColor:
                                    "#FFF0D9",

                                justifyContent:
                                    "center",

                                alignItems:
                                    "center",
                            },

                            iconOuterStyle,
                        ]}
                    >

                        {/* ================= ORANGE CIRCLE ================= */}

                        <View
                            style={[
                                {
                                    width: 68,
                                    height: 68,

                                    borderRadius: 34,

                                    backgroundColor:
                                        theme.colors.primary500,

                                    justifyContent:
                                        "center",

                                    alignItems:
                                        "center",

                                    ...theme.shadows.md,
                                },

                                iconInnerStyle,
                            ]}
                        >

                            {/* ================= WHITE CIRCLE ================= */}

                            <View
                                style={{
                                    width: 40,
                                    height: 40,

                                    borderRadius: 20,

                                    backgroundColor:
                                        theme.colors.white,

                                    justifyContent:
                                        "center",

                                    alignItems:
                                        "center",
                                }}
                            >

                                {/* ================= ORANGE TICK ================= */}

                                <Icon
                                    size={iconSize}
                                    color={iconColor}
                                    strokeWidth={3.5}
                                    style={iconStyle}
                                />

                            </View>

                        </View>

                    </View>


                    {/* ================= TITLE ================= */}

                    <Text
                        style={[
                            {
                                marginTop: 22,

                                textAlign: "center",

                                color:
                                    theme.colors.navy900,

                                fontSize: 24,

                                lineHeight: 30,

                                fontFamily:
                                    theme.fonts.bold,
                            },

                            titleStyle,
                        ]}
                    >
                        {title}
                    </Text>


                    {/* ================= AMOUNT ================= */}

                    {amount ? (
                        <Text
                            style={[
                                {
                                    marginTop: 4,

                                    textAlign: "center",

                                    color:
                                        theme.colors.gray500,

                                    fontSize: 20,

                                    lineHeight: 28,

                                    fontFamily:
                                        theme.fonts.medium,
                                },

                                amountStyle,
                            ]}
                        >
                            {amount}
                        </Text>
                    ) : null}


                    {/* ================= DESCRIPTION ================= */}

                    {description ? (
                        <Text
                            style={[
                                {
                                    marginTop:
                                        amount
                                            ? 14
                                            : 8,

                                    textAlign: "center",

                                    color:
                                        "#8A8A8F",

                                    fontSize: 18,

                                    lineHeight: 23,

                                    fontFamily:
                                        theme.fonts.medium,
                                },

                                descriptionStyle,
                            ]}
                        >
                            {description}
                        </Text>
                    ) : null}


                    {/* ================= BUTTON ================= */}

                    {showButton ? (
                        <View
                            style={[
                                {
                                    width: "100%",

                                    marginTop: 28,
                                },

                                buttonContainerStyle,
                            ]}
                        >

                            <TouchableOpacity
                                activeOpacity={0.85}
                                onPress={
                                    onButtonPress ||
                                    onClose
                                }
                                style={[
                                    {
                                        width: "100%",

                                        height: 48,

                                        borderRadius:
                                            theme.radius.sm,

                                        backgroundColor:
                                            theme.colors.primary500,

                                        justifyContent:
                                            "center",

                                        alignItems:
                                            "center",
                                    },

                                    buttonStyle,
                                ]}
                            >

                                <Text
                                    style={[
                                        {
                                            fontSize:
                                                theme.typography.b2,

                                            fontFamily:
                                                theme.fonts.semiBold,

                                            color:
                                                theme.colors.white,
                                        },

                                        buttonTextStyle,
                                    ]}
                                >
                                    {buttonText}
                                </Text>

                            </TouchableOpacity>

                        </View>
                    ) : null}

                </Pressable>

            </Pressable>

        </Modal>
    );
};

export default SuccessModal;