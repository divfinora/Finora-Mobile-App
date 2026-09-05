import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    StatusBar,
    useWindowDimensions,
    ActivityIndicator,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    LockKeyhole,
    ShieldAlert,
} from "lucide-react-native";

import {
    theme,
} from "../../../theme";

import {
    useRegisterMutation,
} from "../../../redux/features/auth/authApi";

import useHandleMutation
    from "../../../hooks/useHandleMutation";

import BackButton
    from "../../../components/common/BackButton/BackButton";

import { useDispatch } from "react-redux";

import { saveAuth } from "../../../utils/saveAuth";

import { syncProfile } from "../../../utils/profileSync";

import KeyboardAvoidingBottomView
    from "../../../components/common/KeyBoard/KeyboardAvoidingBottomView";

import SuccessModal
    from "../../../components/common/Modal/SuccessModal";


const PIN_LENGTH = 4;


const CreatePinScreen = ({
    navigation,
    route,
}) => {

    const [showSuccessModal, setShowSuccessModal] =
        useState(false);

    const [emailError, setEmailError] =
        useState("");

    const [pinError, setPinError] =
        useState("");

    const dispatch = useDispatch();


    const {
        handleMutation,
    } = useHandleMutation();


    const phone =
        route?.params?.phone;


    const [
        register,
        {
            isLoading,
        },
    ] = useRegisterMutation();


    const {
        width,
        height,
    } = useWindowDimensions();


    const isTablet =
        width >= 768;


    const isSmall =
        height < 700;


    const contentWidth =
        isTablet
            ? Math.min(width * .65, 520)
            : width - theme.spacing.massive;


    const [
        name,
        setName,
    ] = useState("");


    const [
        email,
        setEmail,
    ] = useState("");


    const [
        pin,
        setPin,
    ] = useState([
        "",
        "",
        "",
        "",
    ]);


    const nameRef =
        useRef(null);


    const emailRef =
        useRef(null);


    const pinRef =
        useRef(null);


    const pinRefs =
        useRef([]);


    useEffect(() => {

        const timer =
            setTimeout(() => {

                nameRef.current?.focus();

            }, 250);


        return () =>
            clearTimeout(timer);

    }, []);


    const isEmailValid = () => {

        if (!email.trim()) {
            return true;
        }


        const value =
            email.trim();


        const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;


        return emailRegex.test(value);

    };


    const isValid =
        name.trim().length >= 3 &&
        isEmailValid() &&
        pin.join("").length === PIN_LENGTH;


    const handleEmailChange = (text) => {

        setEmail(text);


        if (!text.trim()) {

            setEmailError("");

            return;
        }


        const emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;


        if (!emailRegex.test(text.trim())) {

            setEmailError(
                "Please enter a valid email address"
            );

        } else {

            setEmailError("");

        }

    };


    const handleContinue = async () => {

        if (email.trim() && !isEmailValid()) {

            setEmailError(
                "Please enter a valid email address"
            );

            return;
        }


        if (pin.join("").length !== PIN_LENGTH) {

            setPinError(
                "Please enter a 4-digit PIN"
            );

            return;
        }


        setEmailError("");

        setPinError("");


        if (!isValid) {
            return;
        }


        const payload = {

            fullName:
                name.trim(),

            mobile:
                phone,

            email:
                email.trim(),

            mpin:
                pin.join(""),

        };


        await handleMutation({

            apiFunc:
                register,

            params:
                payload,

            showSuccess:
                true,

            onSuccess:
                async (response) => {

                    Keyboard.dismiss();

                    setShowSuccessModal(true);


                    await saveAuth(
                        dispatch,
                        response
                    );


                    syncProfile();

                },

        });

    };


    return (

        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor:
                    theme.colors.white,
            }}
        >

            <StatusBar
                barStyle={
                    theme.statusBar.dark
                }
                backgroundColor={
                    theme.colors.white
                }
            />


            <KeyboardAvoidingBottomView
                style={{
                    flex: 1,
                }}
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : "height"
                }
            >

                <View
                    style={{
                        paddingHorizontal:
                            theme.spacing.xl,
                        flex: 1,
                    }}
                >

                    <BackButton
                        onPress={() =>
                            navigation.goBack()
                        }
                    />


                    <TouchableWithoutFeedback
                        onPress={
                            Keyboard.dismiss
                        }
                    >

                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={
                                false
                            }
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingBottom:
                                    theme.spacing.screen,
                            }}
                        >

                            <View
                                style={{
                                    width: "100%",
                                    maxWidth: 520,
                                    alignSelf: "center",
                                }}
                            >

                                <View
                                    style={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 32,
                                        backgroundColor:
                                            theme.colors.primary100,
                                        justifyContent:
                                            "center",
                                        alignItems:
                                            "center",
                                        marginBottom:
                                            theme.spacing.xl,
                                    }}
                                >

                                    <LockKeyhole
                                        size={26}
                                        color={
                                            theme.colors.primary500
                                        }
                                    />

                                </View>


                                <Text
                                    style={{
                                        fontSize:
                                            theme.typography.displayMD,
                                        fontFamily:
                                            theme.fonts.headingBold,
                                        color:
                                            theme.colors.black,
                                    }}
                                >
                                    Create PIN
                                </Text>


                                <Text
                                    style={{
                                        marginTop:
                                            theme.spacing.sm,
                                        fontSize:
                                            theme.typography.b1,
                                        lineHeight:
                                            theme.lineHeight.b1,
                                        fontFamily:
                                            theme.fonts.medium,
                                        color:
                                            theme.colors.textSecondary,
                                    }}
                                >
                                    Create a 4-digit PIN to secure your account
                                </Text>


                                <Text
                                    style={{
                                        marginTop:
                                            theme.spacing.xxxl,
                                        marginBottom:
                                            theme.spacing.sm,
                                        fontSize:
                                            theme.typography.b2,
                                        fontFamily:
                                            theme.fonts.semiBold,
                                        color:
                                            theme.colors.textPrimary,
                                    }}
                                >
                                    Full Name
                                </Text>


                                <TextInput
                                    ref={nameRef}
                                    value={name}
                                    onChangeText={setName}
                                    returnKeyType="next"
                                    placeholder="Enter your full name"
                                    placeholderTextColor={
                                        theme.colors.textLight
                                    }
                                    onSubmitEditing={() =>
                                        emailRef.current?.focus()
                                    }
                                    style={{
                                        height: 56,
                                        borderRadius:
                                            theme.radius.lg,
                                        borderWidth:
                                            theme.borderWidth.thin,
                                        borderColor:
                                            theme.colors.gray200,
                                        backgroundColor:
                                            theme.colors.white,
                                        paddingHorizontal:
                                            theme.spacing.lg,
                                        fontSize:
                                            theme.typography.b2,
                                        fontFamily:
                                            theme.fonts.medium,
                                        color:
                                            theme.colors.black,
                                    }}
                                />


                                <Text
                                    style={{
                                        marginTop:
                                            theme.spacing.xl,
                                        marginBottom:
                                            theme.spacing.sm,
                                        fontSize:
                                            theme.typography.b2,
                                        fontFamily:
                                            theme.fonts.semiBold,
                                        color:
                                            theme.colors.textPrimary,
                                    }}
                                >
                                    Email (Optional)
                                </Text>


                                <TextInput
                                    ref={emailRef}
                                    value={email}
                                    onChangeText={
                                        handleEmailChange
                                    }
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="done"
                                    placeholder="Enter your email"
                                    placeholderTextColor={
                                        theme.colors.textLight
                                    }
                                    onSubmitEditing={() =>
                                        pinRefs.current[0]?.focus()
                                    }
                                    style={{
                                        height: 56,
                                        borderRadius:
                                            theme.radius.lg,
                                        borderWidth:
                                            theme.borderWidth.thin,
                                        borderColor:
                                            emailError
                                                ? theme.colors.error
                                                : theme.colors.gray200,
                                        backgroundColor:
                                            theme.colors.white,
                                        paddingHorizontal:
                                            theme.spacing.lg,
                                        fontSize:
                                            theme.typography.b2,
                                        fontFamily:
                                            theme.fonts.medium,
                                        color:
                                            theme.colors.black,
                                    }}
                                />


                                {emailError ? (

                                    <Text
                                        style={{
                                            marginTop:
                                                theme.spacing.sm,
                                            fontSize:
                                                theme.typography.b3,
                                            fontFamily:
                                                theme.fonts.medium,
                                            color:
                                                theme.colors.error,
                                        }}
                                    >
                                        {emailError}
                                    </Text>

                                ) : null}


                                <Text
                                    style={{
                                        marginTop:
                                            theme.spacing.xxl,
                                        marginBottom:
                                            theme.spacing.md,
                                        fontSize:
                                            theme.typography.b2,
                                        fontFamily:
                                            theme.fonts.semiBold,
                                        color:
                                            theme.colors.textPrimary,
                                    }}
                                >
                                    Create PIN{" "}

                                    <Text
                                        style={{
                                            color:
                                                theme.colors.error,
                                        }}
                                    >
                                        *
                                    </Text>
                                </Text>


                                <View
                                    style={{
                                        flexDirection:
                                            "row",
                                        marginLeft:
                                            theme.spacing.sm,
                                        gap:
                                            theme.spacing.md,
                                    }}
                                >

                                    {pin.map(
                                        (
                                            digit,
                                            index
                                        ) => (

                                            <TextInput
                                                key={index}
                                                ref={(ref) =>
                                                    (
                                                        pinRefs.current[index]
                                                    ) = ref
                                                }
                                                value={digit}
                                                keyboardType="number-pad"
                                                maxLength={1}
                                                textAlign="center"
                                                returnKeyType="next"
                                                secureTextEntry={true}
                                                style={{
                                                    width:
                                                        isTablet
                                                            ? 68
                                                            : 60,

                                                    height:
                                                        isTablet
                                                            ? 68
                                                            : 60,

                                                    borderRadius:
                                                        theme.radius.lg,

                                                    borderWidth:
                                                        theme.borderWidth.thin,

                                                    borderColor:
                                                        pinError
                                                            ? theme.colors.error
                                                            : digit
                                                                ? theme.colors.primary500
                                                                : theme.colors.gray200,

                                                    backgroundColor:
                                                        theme.colors.gray100,

                                                    fontSize:
                                                        24,

                                                    fontFamily:
                                                        theme.fonts.headingBold,

                                                    color:
                                                        theme.colors.black,
                                                }}

                                                onChangeText={
                                                    (text) => {

                                                        const value =
                                                            text.replace(
                                                                /[^0-9]/g,
                                                                ""
                                                            );


                                                        const newPin =
                                                            [...pin];


                                                        newPin[index] =
                                                            value;


                                                        setPin(
                                                            newPin
                                                        );


                                                        if (
                                                            value
                                                        ) {

                                                            setPinError(
                                                                ""
                                                            );

                                                        }


                                                        if (
                                                            value &&
                                                            index <
                                                                PIN_LENGTH - 1
                                                        ) {

                                                            pinRefs
                                                                .current[
                                                                    index + 1
                                                                ]
                                                                ?.focus();

                                                        }

                                                    }
                                                }

                                                onKeyPress={
                                                    ({
                                                        nativeEvent,
                                                    }) => {

                                                        if (
                                                            nativeEvent.key ===
                                                                "Backspace" &&
                                                            !pin[index] &&
                                                            index >
                                                                0
                                                        ) {

                                                            pinRefs
                                                                .current[
                                                                    index - 1
                                                                ]
                                                                ?.focus();

                                                        }

                                                    }
                                                }
                                            />

                                        )
                                    )}

                                </View>


                                {pinError ? (

                                    <Text
                                        style={{
                                            marginTop:
                                                theme.spacing.sm,
                                            fontSize:
                                                theme.typography.b3,
                                            fontFamily:
                                                theme.fonts.medium,
                                            color:
                                                theme.colors.error,
                                        }}
                                    >
                                        {pinError}
                                    </Text>

                                ) : null}


                                <View
                                    style={{
                                        flexDirection:
                                            "row",
                                        alignItems:
                                            "center",
                                        marginTop:
                                            theme.spacing.xxxl,
                                        padding:
                                            theme.spacing.lg,
                                        borderRadius:
                                            theme.radius.lg,
                                        borderWidth: 1,
                                        borderColor:
                                            "#FFD5BF",
                                        backgroundColor:
                                            "#FFF8F4",
                                    }}
                                >

                                    <ShieldAlert
                                        size={18}
                                        color={
                                            theme.colors.primary500
                                        }
                                    />


                                    <Text
                                        style={{
                                            flex: 1,
                                            marginLeft:
                                                theme.spacing.sm,
                                            fontSize:
                                                theme.typography.b3,
                                            fontFamily:
                                                theme.fonts.medium,
                                            color:
                                                theme.colors.textSecondary,
                                            lineHeight:
                                                20,
                                        }}
                                    >
                                        Tip: Choose a PIN that's easy to remember but hard to guess
                                    </Text>

                                </View>

                            </View>

                        </ScrollView>

                    </TouchableWithoutFeedback>


                    <TouchableOpacity
                        activeOpacity={0.9}
                        disabled={isLoading}
                        onPress={handleContinue}
                        style={{
                            width: "100%",
                            height:
                                theme.button.height,
                            marginTop:
                                theme.spacing.sm,
                            marginBottom:
                                10,
                            borderRadius:
                                theme.button.borderRadius,
                            justifyContent:
                                "center",
                            alignItems:
                                "center",
                            backgroundColor:
                                isValid
                                    ? theme.button.primary.backgroundColor
                                    : theme.button.disabled.backgroundColor,
                        }}
                    >

                        {
                            isLoading ? (

                                <ActivityIndicator
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
                                            theme.button.primary.textColor,
                                    }}
                                >
                                    Continue
                                </Text>

                            )
                        }

                    </TouchableOpacity>

                </View>

            </KeyboardAvoidingBottomView>


            <SuccessModal
                visible={
                    showSuccessModal
                }
                onClose={() => {
                    setShowSuccessModal(
                        false
                    );
                }}
                title="PIN Set Successfully"
                description={
                    "Your account is now secure and\nready to use."
                }
            />

        </SafeAreaView>

    );

};


export default CreatePinScreen;