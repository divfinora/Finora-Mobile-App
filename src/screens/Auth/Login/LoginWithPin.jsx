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
} from "lucide-react-native";

import {
    theme,
} from "../../../theme";

import BackButton from "../../../components/common/BackButton/BackButton";
import DeviceInfo from "react-native-device-info";

import {
    useLoginWithMpinMutation,
} from "../../../redux/features/auth/authApi";

import useHandleMutation
    from "../../../hooks/useHandleMutation";
import { useDispatch } from "react-redux";
import { saveAuth } from "../../../utils/saveAuth"
const PIN_LENGTH = 4;

const LoginWithPin = ({
    navigation,
}) => {
 const dispatch = useDispatch()
    //  Api CAlll 

    const {
        handleMutation,
    } = useHandleMutation();

    const [
        loginWithMpin,
        {
            isLoading,
        },
    ] = useLoginWithMpinMutation();
    //  Api Call  


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

    /* ========================================= */
    /* STATE */
    /* ========================================= */

    const [
        phone,
        setPhone,
    ] = useState("");

    const [
        pin,
        setPin,
    ] = useState(["", "", "", ""]);



    /* ========================================= */
    /* REFS */
    /* ========================================= */

    const phoneRef =
        useRef(null);

    const pinRefs =
        useRef([]);

    /* ========================================= */
    /* AUTO FOCUS */
    /* ========================================= */

    useEffect(() => {

        const timer =
            setTimeout(() => {

                phoneRef.current?.focus();

            }, 250);

        return () =>
            clearTimeout(timer);

    }, []);

    /* ========================================= */
    /* VALIDATION */
    /* ========================================= */

    const isValid =
        phone.length === 10 &&
        pin.join("").length === PIN_LENGTH;

    /* ========================================= */
    /* LOGIN */
    /* ========================================= */

    const handleLogin = async () => {

        if (!isValid) return;

        await handleMutation({

            apiFunc: loginWithMpin,

            params: {

                mobile: phone,

                mpin: pin.join(""),

                deviceId: await DeviceInfo.getUniqueId(),

                deviceType: Platform.OS.toUpperCase(),

                fcmToken: "",

            },

            showSuccess: true,

            onSuccess: async (response) => {

                await saveAuth(
                    dispatch,
                    response
                );

                // saveAuth(response);

                // navigation.replace("Home");

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

                <View
                    style={{
                        flex: 1,
                        paddingHorizontal: theme.spacing.xl,
                    }}
                >

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
                                    maxWidth: contentWidth,
                                    alignSelf: "center",

                                    paddingTop:
                                        isTablet
                                            ? 40
                                            : theme.spacing.lg,
                                }}
                            >

                                {/* LOCK ICON */}

                                <View
                                    style={{
                                        width: 64,
                                        height: 64,
                                        borderRadius: 32,

                                        justifyContent: "center",
                                        alignItems: "center",

                                        backgroundColor:
                                            theme.colors.primary100,

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

                                    Login with PIN

                                </Text>

                                {/* SUBTITLE */}

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

                                    Enter your mobile number and
                                    4-digit PIN to continue.

                                </Text>
                                {/* ===================================== */}
                                {/* MOBILE NUMBER */}
                                {/* ===================================== */}

                                <Text
                                    style={{
                                        marginTop: theme.spacing.xxxl,
                                        marginBottom: theme.spacing.sm,

                                        fontSize: theme.typography.b2,
                                        fontFamily: theme.fonts.semiBold,

                                        color: theme.colors.black,
                                    }}
                                >
                                    Mobile Number
                                </Text>

                                <TextInput
                                    ref={phoneRef}
                                    value={phone}
                                    onChangeText={(text) => {

                                        const value =
                                            text.replace(/[^0-9]/g, "");

                                        setPhone(value);

                                    }}
                                    keyboardType="number-pad"
                                    returnKeyType="next"
                                    maxLength={10}

                                    placeholder="Enter mobile number"

                                    placeholderTextColor={
                                        theme.colors.textLight
                                    }

                                    onSubmitEditing={() =>
                                        pinRefs.current[0]?.focus()
                                    }

                                    style={{
                                        height: theme.input.height,

                                        borderRadius:
                                            theme.input.borderRadius,

                                        borderWidth:
                                            theme.input.borderWidth,

                                        borderColor:
                                            theme.colors.gray200,

                                        backgroundColor:
                                            theme.colors.white,

                                        paddingHorizontal:
                                            theme.spacing.lg,

                                        fontSize:
                                            theme.typography.b1,

                                        fontFamily:
                                            theme.fonts.medium,

                                        color:
                                            theme.colors.black,
                                    }}
                                />

                                {/* ===================================== */}
                                {/* PIN */}
                                {/* ===================================== */}

                                <Text
                                    style={{
                                        marginTop: theme.spacing.xxl,
                                        marginBottom: theme.spacing.md,

                                        fontSize: theme.typography.b2,

                                        fontFamily:
                                            theme.fonts.semiBold,

                                        color:
                                            theme.colors.black,
                                    }}
                                >
                                    Enter PIN
                                </Text>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: theme.spacing.md,
                                    }}
                                >

                                    {
                                        pin.map((digit, index) => (

                                            <TextInput
                                                key={index}

                                                ref={(ref) =>
                                                    pinRefs.current[index] = ref
                                                }

                                                value={digit}

                                                keyboardType="number-pad"

                                                maxLength={1}


                                                textAlign="center"

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
                                                        digit
                                                            ? theme.colors.primary500
                                                            : theme.colors.gray200,

                                                    backgroundColor:
                                                        theme.colors.gray100,

                                                    fontSize: 24,

                                                    fontFamily:
                                                        theme.fonts.headingBold,

                                                    color:
                                                        theme.colors.black,
                                                }}

                                                onChangeText={(text) => {

                                                    const value =
                                                        text.replace(/[^0-9]/g, "");

                                                    const newPin =
                                                        [...pin];

                                                    newPin[index] =
                                                        value;

                                                    setPin(newPin);

                                                    if (
                                                        value &&
                                                        index < PIN_LENGTH - 1
                                                    ) {

                                                        pinRefs.current[
                                                            index + 1
                                                        ]?.focus();

                                                    }

                                                }}

                                                onKeyPress={({ nativeEvent }) => {

                                                    if (
                                                        nativeEvent.key === "Backspace" &&
                                                        !pin[index] &&
                                                        index > 0
                                                    ) {

                                                        pinRefs.current[
                                                            index - 1
                                                        ]?.focus();

                                                    }

                                                }}

                                            />

                                        ))
                                    }

                                </View>

                                {/* ===================================== */}
                                {/* TIP CARD */}
                                {/* ===================================== */}

                                <View
                                    style={{
                                        flexDirection: "row",


                                        marginTop:
                                            theme.spacing.xxxl,

                                        padding:
                                            theme.spacing.lg,

                                        borderRadius:
                                            theme.radius.lg,

                                        borderWidth: 1,

                                        borderColor: "#FFD5BF",

                                        backgroundColor: "#FFF8F4",
                                    }}
                                >

                                    <LockKeyhole
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

                                            lineHeight: 20,

                                            fontFamily:
                                                theme.fonts.medium,

                                            color:
                                                theme.colors.textSecondary,
                                        }}
                                    >

                                        Enter your 4-digit PIN to securely access your account.

                                    </Text>

                                </View>
                                {/* ===================================== */}
                                {/* CONTINUE BUTTON */}
                                {/* ===================================== */}

                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    disabled={!isValid || isLoading}
                                    onPress={handleLogin}
                                    style={{
                                        width: "100%",

                                        height: theme.button.height,

                                        marginTop: theme.spacing.massive,

                                        marginBottom: theme.spacing.xxxl,

                                        borderRadius:
                                            theme.button.borderRadius,

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

                        </ScrollView>

                    </TouchableWithoutFeedback>

                </View>

            </KeyboardAvoidingView>

        </SafeAreaView>

    );

};

export default LoginWithPin;