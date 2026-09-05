import React, {
    useRef,
    useState,
} from "react";

import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    useWindowDimensions,
    StatusBar,
    ActivityIndicator,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import { theme } from "../../../theme/index";

import LoginImg from "../assets/login.webp";

import {
    useLoginMutation,
} from "../../../redux/features/auth/authApi";

import useHandleMutation from "../../../hooks/useHandleMutation";

import KeyboardAvoidingBottomView from "../../../components/common/KeyBoard/KeyboardAvoidingBottomView";


const LoginScreen = ({
    navigation,
}) => {

    const {
        width,
        height,
    } = useWindowDimensions();


    const [
        phone,
        setPhone,
    ] = useState("");


    /*
     * ScrollView reference
     */
    const scrollViewRef =
        useRef(null);


    const isTablet =
        width >= 768;


    const isSmall =
        height < 700;


    /*
     * Login API
     */
    const [
        login,
        {
            isLoading,
            isSuccess,
            isError,
            error,
            data,
            reset,
        },
    ] = useLoginMutation();


    const {
        handleMutation,
    } = useHandleMutation();


    /*
     * Responsive content width
     */
    const contentWidth =
        isTablet
            ? Math.min(
                width * 0.65,
                520
            )
            : width -
            theme.spacing.massive;


    /*
     * Responsive image
     */
    const imageSize =
        isTablet
            ? 330
            : isSmall
                ? 200
                : Math.min(
                    width * 0.58,
                    260
                );


    /*
     * Request OTP
     */
    const handleRequestOtp =
        async () => {

            if (
                phone.length !== 10
            ) {
                return;
            }


            const response =
                await handleMutation({

                    apiFunc: login,

                    params: {
                        mobile: phone,
                    },

                    showSuccess: true,

                    customSuccessMsg:
                        "OTP Sent Successfully",


                    onSuccess: (data) => {

                        const optData =
                            data?.data;


                        /*
                         * Close keyboard
                         */
                        Keyboard.dismiss();


                        /*
                         * Navigate to OTP
                         */
                        navigation.navigate(
                            "enter-otp-register-user",
                            {
                                phone,
                                otp: optData?.otp,
                            }
                        );

                    },

                });


            if (!response) {
                return;
            }

        };


    return (
        <SafeAreaView
            style={{
                flex: 1,

                backgroundColor:
                    theme.colors.white,
            }}
        >

            {/* ================= STATUS BAR ================= */}

            <StatusBar
                barStyle={
                    theme.statusBar.dark
                }
                backgroundColor={
                    theme.colors.white
                }
            />


            {/* ================= KEYBOARD WRAPPER ================= */}

            <KeyboardAvoidingBottomView
                scrollViewRef={
                    scrollViewRef
                }
                keyboardSpacing={20}
            >

                <TouchableWithoutFeedback
                    onPress={
                        Keyboard.dismiss
                    }
                    accessible={false}
                >

                    {/* ================= SCROLL VIEW ================= */}

                    <ScrollView
                        ref={
                            scrollViewRef
                        }

                        showsVerticalScrollIndicator={
                            false
                        }

                        keyboardShouldPersistTaps={
                            "handled"
                        }

                        keyboardDismissMode={
                            "on-drag"
                        }

                        contentContainerStyle={{
                            flexGrow: 1,

                            alignItems:
                                "center",

                            paddingBottom:
                                theme.spacing.screen,
                        }}
                    >

                        {/* ================= CONTENT ================= */}

                        <View
                            style={{
                                width:
                                    contentWidth,

                                maxWidth: 520,

                                paddingTop:
                                    isTablet
                                        ? 50
                                        : isSmall
                                            ? theme.spacing.xl
                                            : theme.spacing.xxxl,
                            }}
                        >

                            {/* ================= HEADER ================= */}

                            <Text
                                style={{
                                    fontSize:
                                        isTablet
                                            ? theme.typography.h2
                                            : theme.typography.h3,

                                    lineHeight:
                                        isTablet
                                            ? theme.lineHeight.h2
                                            : theme.lineHeight.h3,

                                    fontFamily:
                                        theme.fonts.headingBold,

                                    color:
                                        theme.colors.black,
                                }}
                            >
                                Login Account
                            </Text>


                            <Text
                                style={{
                                    marginTop:
                                        theme.spacing.xs,

                                    fontSize:
                                        theme.typography.b2,

                                    lineHeight:
                                        theme.lineHeight.b1,

                                    fontFamily:
                                        theme.fonts.medium,

                                    color:
                                        theme.colors.textSecondary,
                                }}
                            >
                                Hello, welcome back to our account
                            </Text>


                            {/* ================= IMAGE ================= */}

                            <View
                                style={{
                                    width: "100%",

                                    alignItems:
                                        "center",

                                    marginTop:
                                        isSmall
                                            ? theme.spacing.lg
                                            : theme.spacing.xxl,
                                }}
                            >

                                <Image
                                    source={
                                        LoginImg
                                    }

                                    resizeMode="contain"

                                    style={{
                                        width:
                                            imageSize,

                                        height:
                                            imageSize,
                                    }}
                                />

                            </View>


                            {/* ================= LOGIN TITLE ================= */}

                            <Text
                                style={{
                                    marginTop:
                                        isSmall
                                            ? theme.spacing.lg
                                            : theme.spacing.xxxl,

                                    fontSize:
                                        isTablet
                                            ? theme.typography.displayMD
                                            : theme.typography.h1,

                                    lineHeight:
                                        isTablet
                                            ? theme.lineHeight.displayMD
                                            : theme.lineHeight.h2,

                                    fontFamily:
                                        theme.fonts.headingBold,

                                    color:
                                        theme.colors.navy900,
                                }}
                            >

                                <Text
                                    style={{
                                        fontFamily:
                                            theme.fonts.headingBold,

                                        color:
                                            theme.colors.primary500,
                                    }}
                                >
                                    Login
                                </Text>

                                {" "}with your number

                            </Text>


                            {/* ================= DESCRIPTION ================= */}

                            <Text
                                style={{
                                    marginTop:
                                        theme.spacing.sm,

                                    fontSize:
                                        theme.typography.b2,

                                    lineHeight:
                                        theme.lineHeight.b1,

                                    fontFamily:
                                        theme.fonts.regular,

                                    color:
                                        theme.colors.textLight,
                                }}
                            >
                                We'll send you an OTP to verify your number
                            </Text>


                            {/* ================= PHONE INPUT ================= */}

                            <View
                                style={{
                                    height:
                                        theme.input.height,

                                    width: "100%",

                                    marginTop:
                                        isSmall
                                            ? theme.spacing.xl
                                            : theme.spacing.xxxl,

                                    borderWidth:
                                        theme.input.borderWidth,

                                    borderColor:
                                        theme.input.default.borderColor,

                                    borderRadius:
                                        theme.input.borderRadius,

                                    flexDirection:
                                        "row",

                                    alignItems:
                                        "center",

                                    backgroundColor:
                                        theme.colors.white,

                                    ...theme.shadows.card,
                                }}
                            >

                                {/* COUNTRY */}

                                <View
                                    style={{
                                        height: "60%",

                                        paddingHorizontal:
                                            theme.spacing.lg + 2,

                                        flexDirection:
                                            "row",

                                        alignItems:
                                            "center",

                                        borderRightWidth:
                                            theme.borderWidth.thin,

                                        borderRightColor:
                                            theme.colors.divider,
                                    }}
                                >

                                    <Text
                                        style={{
                                            fontSize:
                                                theme.iconSize.sm,
                                        }}
                                    >
                                        🇮🇳
                                    </Text>


                                    <Text
                                        style={{
                                            marginLeft:
                                                theme.spacing.sm,

                                            fontSize:
                                                theme.typography.b2,

                                            fontFamily:
                                                theme.fonts.semiBold,

                                            color:
                                                theme.colors.navy900,
                                        }}
                                    >
                                        +91
                                    </Text>

                                </View>


                                {/* MOBILE INPUT */}

                                <TextInput
                                    value={
                                        phone
                                    }

                                    onChangeText={(
                                        text
                                    ) => {

                                        const value =
                                            text.replace(
                                                /[^0-9]/g,
                                                ""
                                            );


                                        setPhone(
                                            value.slice(
                                                0,
                                                10
                                            )
                                        );

                                    }}

                                    placeholder="Mobile number"

                                    placeholderTextColor={
                                        theme.colors.placeholder
                                    }

                                    keyboardType="number-pad"

                                    maxLength={10}

                                    returnKeyType="done"

                                    /*
                                     * IMPORTANT
                                     *
                                     * Keyboard open hote hi
                                     * ScrollView bottom par jayega.
                                     */
                                    onFocus={() => {

                                        setTimeout(
                                            () => {

                                                scrollViewRef.current?.scrollToEnd({
                                                    animated: true,
                                                });

                                            },
                                            150
                                        );

                                    }}

                                    style={{
                                        flex: 1,

                                        height: "100%",

                                        paddingHorizontal:
                                            theme.input.paddingHorizontal,

                                        fontSize:
                                            theme.input.fontSize,

                                        fontFamily:
                                            theme.fonts.medium,

                                        color:
                                            theme.colors.black,
                                    }}
                                />

                            </View>


                            {/* ================= REQUEST OTP ================= */}

                            <TouchableOpacity
                                activeOpacity={0.9}

                                disabled={
                                    isLoading ||
                                    phone.length !== 10
                                }

                                onPress={
                                    handleRequestOtp
                                }

                                style={{
                                    width: "100%",

                                    height:
                                        theme.button.height,

                                    marginTop:
                                        theme.spacing.lg,

                                    borderRadius:
                                        theme.button.borderRadius,

                                    backgroundColor:
                                        phone.length === 10
                                            ? theme.button.primary.backgroundColor
                                            : theme.button.disabled.backgroundColor,

                                    justifyContent:
                                        "center",

                                    alignItems:
                                        "center",

                                    opacity:
                                        isLoading
                                            ? 0.7
                                            : 1,
                                }}
                            >

                                {isLoading ? (

                                    <ActivityIndicator
                                        size="small"

                                        color={
                                            theme.button.primary.textColor
                                        }
                                    />

                                ) : (

                                    <Text
                                        style={{
                                            fontSize:
                                                theme.button.fontSize,

                                            fontFamily:
                                                theme.fonts.semiBold,

                                            color:
                                                phone.length === 10
                                                    ? theme.button.primary.textColor
                                                    : theme.button.disabled.textColor,
                                        }}
                                    >
                                        Request OTP
                                    </Text>

                                )}

                            </TouchableOpacity>


                            {/* ================= REGISTER ================= */}

                            <View
                                style={{
                                    marginTop:
                                        theme.spacing.lg,

                                    flexDirection:
                                        "row",

                                    justifyContent:
                                        "center",

                                    alignItems:
                                        "center",
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize:
                                            theme.typography.b3,

                                        fontFamily:
                                            theme.fonts.medium,

                                        color:
                                            theme.colors.textLight,
                                    }}
                                >
                                    Not Registered yet?{" "}
                                </Text>


                                <TouchableOpacity
                                    activeOpacity={0.8}

                                    onPress={() => {

                                        Keyboard.dismiss();

                                        navigation.navigate(
                                            "Register"
                                        );

                                    }}
                                >

                                    <Text
                                        style={{
                                            fontSize:
                                                theme.typography.b3,

                                            fontFamily:
                                                theme.fonts.semiBold,

                                            color:
                                                theme.colors.primary500,
                                        }}
                                    >
                                        Create an Account
                                    </Text>

                                </TouchableOpacity>

                            </View>

                        </View>

                    </ScrollView>

                </TouchableWithoutFeedback>

            </KeyboardAvoidingBottomView>

        </SafeAreaView>
    );
};


export default LoginScreen;



import React, {
    useEffect,
    useState,
} from "react";

import {
    View,
    Keyboard,
    Platform,
} from "react-native";

import {
    useSafeAreaInsets,
} from "react-native-safe-area-context";


const KeyboardAvoidingBottomView = ({
    children,
    style,
    keyboardSpacing = 0,

    // AUTO SCROLL
    scrollViewRef,
}) => {

    const insets =
        useSafeAreaInsets();


    const [
        keyboardHeight,
        setKeyboardHeight,
    ] = useState(0);


    useEffect(() => {

        const showEvent =
            Platform.OS === "ios"
                ? "keyboardWillShow"
                : "keyboardDidShow";


        const hideEvent =
            Platform.OS === "ios"
                ? "keyboardWillHide"
                : "keyboardDidHide";


        const keyboardShowListener =
            Keyboard.addListener(
                showEvent,
                (event) => {

                    const height =
                        event?.endCoordinates?.height || 0;


                    setKeyboardHeight(
                        height
                    );


                    // =========================
                    // AUTO SLIDE
                    // =========================

                    setTimeout(() => {

                        if (
                            scrollViewRef?.current
                        ) {

                            scrollViewRef.current.scrollToEnd({
                                animated: true,
                            });

                        }

                    }, 150);

                }
            );


        const keyboardHideListener =
            Keyboard.addListener(
                hideEvent,
                () => {

                    setKeyboardHeight(
                        0
                    );

                }
            );


        return () => {

            keyboardShowListener.remove();

            keyboardHideListener.remove();

        };

    }, [
        scrollViewRef,
    ]);


    const isKeyboardVisible =
        keyboardHeight > 0;


    const bottomSpace =
        isKeyboardVisible
            ? keyboardHeight + keyboardSpacing
            : 10;


    return (

        <View
            style={[
                {
                    flex: 1,

                    paddingBottom:
                        bottomSpace,
                },

                style,
            ]}
        >

            {children}

        </View>

    );

};


export default KeyboardAvoidingBottomView;