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
    KeyboardAvoidingView,
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
const PIN_LENGTH = 4;

const CreatePinScreen = ({
    navigation,
    route,
}) => {

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
    const [name,
        setName] = useState("");

    const [email,
        setEmail] = useState("");

    const [pin, setPin] = useState(["", "", "", ""]);

    const nameRef =
        useRef(null);

    const emailRef =
        useRef(null);

    const pinRef =
        useRef(null);
    const pinRefs = useRef([]);

    useEffect(() => {

        const timer =
            setTimeout(() => {

                nameRef.current?.focus();

            }, 250);

        return () =>
            clearTimeout(timer);

    }, []);
    const isEmailValid = () => {

        if (!email)
            return true;

        return /\S+@\S+\.\S+/.test(email);

    };
    const isValid =

        name.trim().length >= 3 &&

        isEmailValid() &&

        pin.length === PIN_LENGTH;

    const handleContinue = async () => {

        if (!isValid)
            return;


        const payload = {
            fullName: name.trim(),
            mobile: phone,
            email: email.trim(),
            mpin: pin.join(""), // "1234"
        };

        console.log(payload, "Payload ======")

        await handleMutation({

            apiFunc: register,

            params: payload,

            showSuccess: true,

            onSuccess: async (response) => {
                await saveAuth(
                    dispatch,
                    response
                );

                console.log(
                    "Register Response =>",
                    response
                );

            },

        });

    };


    return (

        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: theme.colors.white,
            }}
        >

            <StatusBar
                barStyle={theme.statusBar.dark}
                backgroundColor={theme.colors.white}
            />

            <KeyboardAvoidingView
                style={{
                    flex: 1,
                }}
                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : "height"
                }
            >


                <View style={{ paddingHorizontal: theme.spacing.xl, flex: 1 }}>



                    <BackButton
                        onPress={() =>
                            navigation.goBack()
                        }
                        style={{
                            marginLeft: -8,

                        }}
                    />
                    <TouchableWithoutFeedback
                        onPress={Keyboard.dismiss}
                    >

                        <ScrollView
                            keyboardShouldPersistTaps="handled"
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                flexGrow: 1,
                                paddingBottom: theme.spacing.screen,
                            }}
                        >

                            <View
                                style={{
                                    width: "100%",
                                    maxWidth: 520,
                                    alignSelf: "center",

                                    paddingTop:
                                        isTablet
                                            ? 40
                                            : theme.spacing.lg,
                                }}
                            >

                                {/* BACK BUTTON */}



                                {/* LOCK */}

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

                                {/* TITLE */}

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

                                {/* FULL NAME */}

                                <Text
                                    style={{
                                        marginTop: theme.spacing.xxxl,
                                        marginBottom: theme.spacing.sm,
                                        fontSize: theme.typography.b2,
                                        fontFamily: theme.fonts.semiBold,
                                        color: theme.colors.textPrimary,
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
                                    placeholderTextColor={theme.colors.textLight}
                                    onSubmitEditing={() =>
                                        emailRef.current?.focus()
                                    }
                                    style={{
                                        height: 56,
                                        borderRadius: theme.radius.lg,
                                        borderWidth: theme.borderWidth.thin,
                                        borderColor: theme.colors.gray200,
                                        backgroundColor: theme.colors.white,
                                        paddingHorizontal: theme.spacing.lg,
                                        fontSize: theme.typography.b2,
                                        fontFamily: theme.fonts.medium,
                                        color: theme.colors.black,
                                    }}
                                />

                                {/* EMAIL */}

                                <Text
                                    style={{
                                        marginTop: theme.spacing.xl,
                                        marginBottom: theme.spacing.sm,
                                        fontSize: theme.typography.b2,
                                        fontFamily: theme.fonts.semiBold,
                                        color: theme.colors.textPrimary,
                                    }}
                                >
                                    Email (Optional)
                                </Text>

                                <TextInput
                                    ref={emailRef}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="done"
                                    placeholder="Enter your email"
                                    placeholderTextColor={theme.colors.textLight}
                                    onSubmitEditing={() =>
                                        pinRef.current?.focus()
                                    }
                                    style={{
                                        height: 56,
                                        borderRadius: theme.radius.lg,
                                        borderWidth: theme.borderWidth.thin,
                                        borderColor: theme.colors.gray200,
                                        backgroundColor: theme.colors.white,
                                        paddingHorizontal: theme.spacing.lg,
                                        fontSize: theme.typography.b2,
                                        fontFamily: theme.fonts.medium,
                                        color: theme.colors.black,
                                    }}
                                />

                                {/* CREATE PIN */}

                                <Text
                                    style={{
                                        marginTop: theme.spacing.xxl,
                                        marginBottom: theme.spacing.md,
                                        fontSize: theme.typography.b2,
                                        fontFamily: theme.fonts.semiBold,
                                        color: theme.colors.textPrimary,
                                    }}
                                >
                                    Create PIN
                                </Text>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginLeft: theme.spacing.sm,
                                        gap: theme.spacing.md,
                                    }}
                                >
                                    {pin.map((digit, index) => (
                                        <TextInput
                                            key={index}
                                            ref={(ref) => (pinRefs.current[index] = ref)}
                                            value={digit}
                                            keyboardType="number-pad"
                                            maxLength={1}
                                            textAlign="center"
                                            returnKeyType="next"
                                            style={{
                                                width: isTablet ? 68 : 60,
                                                height: isTablet ? 68 : 60,

                                                borderRadius: theme.radius.lg,
                                                borderWidth: theme.borderWidth.thin,

                                                borderColor: digit
                                                    ? theme.colors.primary500
                                                    : theme.colors.gray200,

                                                backgroundColor: theme.colors.gray100,

                                                fontSize: 24,
                                                fontFamily: theme.fonts.headingBold,
                                                color: theme.colors.black,
                                            }}
                                            onChangeText={(text) => {
                                                const value = text.replace(/[^0-9]/g, "");

                                                const newPin = [...pin];
                                                newPin[index] = value;
                                                setPin(newPin);

                                                if (value && index < PIN_LENGTH - 1) {
                                                    pinRefs.current[index + 1]?.focus();
                                                }
                                            }}
                                            onKeyPress={({ nativeEvent }) => {
                                                if (
                                                    nativeEvent.key === "Backspace" &&
                                                    !pin[index] &&
                                                    index > 0
                                                ) {
                                                    pinRefs.current[index - 1]?.focus();
                                                }
                                            }}
                                        />
                                    ))}
                                </View>


                                {/* ============================== */}
                                {/* SECURITY TIP CARD */}
                                {/* ============================== */}

                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",

                                        marginTop: theme.spacing.xxxl,

                                        padding: theme.spacing.lg,

                                        borderRadius: theme.radius.lg,

                                        borderWidth: 1,

                                        borderColor: "#FFD5BF",

                                        backgroundColor: "#FFF8F4",
                                    }}
                                >

                                    <ShieldAlert
                                        size={18}
                                        color={theme.colors.primary500}
                                    />

                                    <Text
                                        style={{
                                            flex: 1,

                                            marginLeft: theme.spacing.sm,

                                            fontSize: theme.typography.b3,

                                            fontFamily: theme.fonts.medium,

                                            color: theme.colors.textSecondary,

                                            lineHeight: 20,
                                        }}
                                    >
                                        Tip: Choose a PIN that's easy to remember but hard to guess
                                    </Text>

                                </View>

                                {/* ============================== */}
                                {/* CONTINUE BUTTON */}
                                {/* ============================== */}

                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    disabled={!isValid || isLoading}
                                    onPress={handleContinue}
                                    style={{
                                        width: "100%",

                                        height: theme.button.height,

                                        marginTop: theme.spacing.massive,

                                        marginBottom: theme.spacing.xxxl,

                                        borderRadius: theme.button.borderRadius,

                                        justifyContent: "center",

                                        alignItems: "center",

                                        backgroundColor:
                                            isValid
                                                ? theme.button.primary.backgroundColor
                                                : theme.button.disabled.backgroundColor,
                                    }}
                                >

                                    {
                                        isLoading ? (

                                            <ActivityIndicator
                                                color={theme.button.primary.textColor}
                                            />

                                        ) : (

                                            <Text
                                                style={{
                                                    fontSize: theme.button.fontSize,

                                                    fontFamily: theme.fonts.semiBold,

                                                    color: theme.button.primary.textColor,
                                                }}
                                            >
                                                Continue
                                            </Text>

                                        )
                                    }

                                </TouchableOpacity>

                            </View>

                        </ScrollView>

                    </TouchableWithoutFeedback>
                </View>
            </KeyboardAvoidingView>

        </SafeAreaView>

    );
}
export default CreatePinScreen