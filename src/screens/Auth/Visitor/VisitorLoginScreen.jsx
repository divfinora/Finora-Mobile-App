import React, {
    useState,
} from "react";

import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
    StatusBar,
    useWindowDimensions,
    ImageBackground,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import Svg, {
    Path,
} from "react-native-svg";

import {
    Eye,
    EyeOff,
    UserRound,
    ArrowRight,
} from "lucide-react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import {
    useDispatch,
} from "react-redux";

import {
    theme,
} from "../../../theme";

import CommonInput from "../../../components/common/Input/CommonInput";

import CommonButton from "../../../components/common/Button/CommonButton";

import {
    useVisitorLoginMutation,
} from "../../../redux/features/visitor/visitorApi.js";

import useHandleMutation from "../../../hooks/useHandleMutation";

import {
    saveAuth,
} from "../../../utils/saveAuth";

import {
    setUser,
} from "../../../redux/slices/authSlice";

import VisitorPattern from "./assets/visitor-pattern.webp";


const VisitorLoginScreen = () => {

    const dispatch = useDispatch();

    const {
        width,
        height,
    } = useWindowDimensions();


    // =====================================================
    // MUTATION HANDLER
    // =====================================================

    const {
        handleMutation,
    } = useHandleMutation();


    // =====================================================
    // FORM STATE
    // =====================================================

    const [
        employeeId,
        setEmployeeId,
    ] = useState("");


    const [
        password,
        setPassword,
    ] = useState("");


    const [
        showPassword,
        setShowPassword,
    ] = useState(false);


    // =====================================================
    // ERRORS
    // =====================================================

    const [
        employeeIdError,
        setEmployeeIdError,
    ] = useState("");


    const [
        passwordError,
        setPasswordError,
    ] = useState("");


    // =====================================================
    // VISITOR LOGIN API
    // =====================================================

    const [
        visitorLogin,
        {
            isLoading,
        },
    ] = useVisitorLoginMutation();


    // =====================================================
    // RESPONSIVE
    // =====================================================

    const isSmall =
        height < 700;


    const isTablet =
        width >= 768;


    // =====================================================
    // TOP HEADER HEIGHT
    // =====================================================

    const topHeight =
        isSmall
            ? 380
            : 380;


    // =====================================================
    // VALIDATION
    // =====================================================

    const validate = () => {

        let valid = true;


        // Clear previous errors

        setEmployeeIdError("");

        setPasswordError("");


        // =================================================
        // EMPLOYEE ID
        // =================================================

        if (
            !employeeId.trim()
        ) {

            setEmployeeIdError(
                "Employee ID is required"
            );

            valid = false;

        }


        // =================================================
        // PASSWORD
        // =================================================

        if (
            !password.trim()
        ) {

            setPasswordError(
                "Password is required"
            );

            valid = false;

        }


        return valid;

    };


    // =====================================================
    // LOGIN
    // =====================================================

    const handleLogin = async () => {

        if (!validate()) {
            return;
        }


        const response =
            await handleMutation({

                // =========================================
                // API FUNCTION
                // =========================================

                apiFunc:
                    visitorLogin,


                // =========================================
                // REQUEST BODY
                // =========================================

                params: {

                    employeeId:
                        employeeId.trim(),

                    password:
                        password,

                },


                // =========================================
                // TIMEOUT
                // =========================================

                timeoutMs:
                    15000,


                // =========================================
                // SUCCESS TOAST
                // =========================================

                showSuccess:
                    true,

                customSuccessMsg:
                    "Login successful",


                // =========================================
                // SUCCESS
                // =========================================

                onSuccess:
                    async (response) => {

                        console.log(
                            "VISITOR LOGIN RESPONSE:",
                            response
                        );


                        // =================================
                        // EMPLOYEE DATA
                        // =================================

                        const employee =
                            response?.data;


                        // =================================
                        // VISITOR ROLE CHECK
                        // =================================

                        if (
                            employee?.role &&
                            employee.role !== "VISITOR"
                        ) {

                            setPasswordError(
                                "This account is not a Visitor account."
                            );

                            return;

                        }


                        // =================================
                        // SAVE AUTH
                        // =================================

                        await saveAuth(
                            dispatch,
                            response
                        );


                        // =================================
                        // SAVE USER
                        // =================================

                        dispatch(
                            setUser({

                                ...employee,

                                accessToken:
                                    response?.accessToken,

                                refreshToken:
                                    response?.refreshToken,

                            })
                        );

                    },

            });


        // ================================================
        // NO RESPONSE
        // ================================================

        if (!response) {
            return;
        }

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

                backgroundColor:
                    "#FFFDFD",
            }}

        >

            {/* =================================================
                STATUS BAR
            ================================================= */}

            <StatusBar

                translucent={true}

                backgroundColor="transparent"

                barStyle={
                    theme.statusBar.dark
                }

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

                <TouchableWithoutFeedback

                    onPress={
                        Keyboard.dismiss
                    }

                >

                    <ScrollView

                        showsVerticalScrollIndicator={
                            false
                        }

                        keyboardShouldPersistTaps={
                            "handled"
                        }

                        contentContainerStyle={{

                            flexGrow: 1,

                            backgroundColor:
                                "#FFFDFD",

                        }}

                    >


                        {/* =================================================
                            TOP ORANGE + GRADIENT + PATTERN
                        ================================================= */}

                        <LinearGradient

                            colors={[

                                "rgba(255, 98, 31, 0.8)",

                                "#FF9B63",

                            ]}

                            locations={[
                                0,
                                1,
                            ]}

                            start={{
                                x: 0.5,
                                y: 0,
                            }}

                            end={{
                                x: 0.5,
                                y: 1,
                            }}

                            style={{

                                height:
                                    topHeight,

                                width:
                                    "100%",

                                position:
                                    "relative",

                                overflow:
                                    "hidden",

                            }}

                        >

                            {/* =================================================
                                TOPOGRAPHIC PATTERN
                            ================================================= */}

                            <ImageBackground

                                source={
                                    VisitorPattern
                                }

                                resizeMode="cover"

                                style={{

                                    position:
                                        "absolute",

                                    top: 0,

                                    left: 0,

                                    right: 0,

                                    bottom: 0,

                                    width:
                                        "100%",

                                    height:
                                        "100%",

                                }}

                                imageStyle={{

                                    width:
                                        "100%",

                                    height:
                                        "100%",

                                    opacity:
                                        0.20,

                                }}

                            />


                            {/* =================================================
                                WHITE BOTTOM WAVE
                            ================================================= */}

                            <Svg

                                width={
                                    width
                                }

                                height={
                                    125
                                }

                                viewBox={
                                    `0 0 ${width} 125`
                                }

                                style={{

                                    position:
                                        "absolute",

                                    bottom:
                                        -1,

                                    left:
                                        0,

                                }}

                            >

                                <Path

                                    d={`

                                        M 0 63

                                        C ${width * 0.08} 53,
                                          ${width * 0.16} 43,
                                          ${width * 0.25} 43

                                        C ${width * 0.35} 43,
                                          ${width * 0.42} 62,
                                          ${width * 0.50} 78

                                        C ${width * 0.58} 95,
                                          ${width * 0.67} 106,
                                          ${width * 0.77} 105

                                        C ${width * 0.86} 105,
                                          ${width * 0.94} 98,
                                          ${width} 83

                                        L ${width} 125

                                        L 0 125

                                        Z

                                    `}

                                    fill="#FFFDFD"

                                />

                            </Svg>


                        </LinearGradient>


                        {/* =================================================
                            WHITE FORM SECTION
                        ================================================= */}

                        <View

                            style={{

                                flex: 1,

                                backgroundColor:
                                    "#FFFDFD",

                                paddingHorizontal:
                                    24,

                                paddingBottom:
                                    20,

                                marginTop:
                                    -1,

                            }}

                        >


                            {/* =================================================
                                TITLE
                            ================================================= */}

                            <View

                                style={{

                                    marginTop:
                                        isSmall
                                            ? -7
                                            : -35,

                                    marginBottom:
                                        36,

                                }}

                            >

                                <Text

                                    style={{

                                        fontSize:
                                            isTablet
                                                ? 26
                                                : 24,

                                        lineHeight:
                                            30,

                                        fontFamily:
                                            theme.fonts.headingBold,

                                        color:
                                            "#454545",

                                        fontWeight:
                                            "700",

                                    }}

                                >

                                    Visitor Login

                                </Text>


                                {/* ===============================================
                                    ORANGE UNDERLINE
                                =============================================== */}

                                <View

                                    style={{

                                        width:
                                            76,

                                        height:
                                            3,

                                        backgroundColor:
                                            theme.colors.primary500,

                                        borderRadius:
                                            3,

                                        marginTop:
                                            7,

                                    }}

                                />

                            </View>


                            {/* =================================================
                                EMPLOYEE ID
                            ================================================= */}

                            <CommonInput

                                label="Employee ID"

                                placeholder="VS1054578"

                                value={
                                    employeeId
                                }

                                onChangeText={(
                                    text
                                ) => {

                                    setEmployeeIdError(
                                        ""
                                    );

                                    setEmployeeId(
                                        text
                                    );

                                }}

                                error={
                                    employeeIdError
                                }

                                autoCapitalize="characters"

                                autoCorrect={false}

                                returnKeyType="next"


                                // =============================================
                                // LEFT ICON
                                // =============================================

                                leftIcon={

                                    <UserRound

                                        size={
                                            17
                                        }

                                        color={
                                            "#BDBDBF"
                                        }

                                    />

                                }


                                // =============================================
                                // CONTAINER
                                // =============================================

                                containerStyle={{

                                    marginBottom:
                                        20,

                                }}


                                // =============================================
                                // LABEL
                                // =============================================

                                labelStyle={{

                                    marginBottom:
                                        8,

                                    color:
                                        "#5B5B5F",

                                    fontSize:
                                        16,

                                    fontFamily:
                                        theme.fonts.medium,

                                }}


                                // =============================================
                                // INPUT CONTAINER
                                // =============================================

                                inputContainerStyle={{

                                    minHeight:
                                        48,

                                    height:
                                        48,

                                    backgroundColor:
                                        "transparent",

                                    borderRadius:
                                        0,

                                    borderWidth:
                                        0,

                                    borderBottomWidth:
                                        1,

                                    borderBottomColor:

                                        employeeIdError

                                            ? theme.colors.error

                                            : theme.colors.primary500,

                                    paddingHorizontal:
                                        0,

                                }}


                                // =============================================
                                // INPUT
                                // =============================================

                                inputStyle={{

                                    minHeight:
                                        48,

                                    height:
                                        48,

                                    paddingHorizontal:
                                        4,

                                    fontSize:
                                        15,

                                    color:
                                        "#B8B8BC",

                                    fontFamily:
                                        theme.fonts.medium,

                                }}

                            />


                            {/* =================================================
                                PASSWORD
                            ================================================= */}

                            <CommonInput

                                label="Password"

                                placeholder="Enter your password"

                                value={
                                    password
                                }

                                onChangeText={(
                                    text
                                ) => {

                                    setPasswordError(
                                        ""
                                    );

                                    setPassword(
                                        text
                                    );

                                }}

                                error={
                                    passwordError
                                }

                                secureTextEntry={
                                    !showPassword
                                }

                                autoCapitalize="none"

                                autoCorrect={false}

                                returnKeyType="done"

                                onSubmitEditing={
                                    handleLogin
                                }


                                // =============================================
                                // LEFT ICON
                                // =============================================

                                leftIcon={

                                    <Text

                                        style={{

                                            color:
                                                "#BDBDBF",

                                            fontSize:
                                                13,

                                            fontFamily:
                                                theme.fonts.medium,

                                        }}

                                    >

                                        **

                                    </Text>

                                }


                                // =============================================
                                // RIGHT ICON
                                // =============================================

                                rightIcon={

                                    showPassword

                                        ? (

                                            <EyeOff

                                                size={
                                                    17
                                                }

                                                color={
                                                    "#BDBDBF"
                                                }

                                            />

                                        )

                                        : (

                                            <Eye

                                                size={
                                                    17
                                                }

                                                color={
                                                    "#BDBDBF"
                                                }

                                            />

                                        )

                                }


                                onRightIconPress={() => {

                                    setShowPassword(
                                        previous =>
                                            !previous
                                    );

                                }}


                                // =============================================
                                // CONTAINER
                                // =============================================

                                containerStyle={{

                                    marginBottom:
                                        0,

                                }}


                                // =============================================
                                // LABEL
                                // =============================================

                                labelStyle={{

                                    marginBottom:
                                        8,

                                    color:
                                        "#5B5B5F",

                                    fontSize:
                                        16,

                                    fontFamily:
                                        theme.fonts.medium,

                                }}


                                // =============================================
                                // INPUT CONTAINER
                                // =============================================

                                inputContainerStyle={{

                                    minHeight:
                                        48,

                                    height:
                                        48,

                                    backgroundColor:
                                        "transparent",

                                    borderRadius:
                                        0,

                                    borderWidth:
                                        0,

                                    borderBottomWidth:
                                        1,

                                    borderBottomColor:

                                        passwordError

                                            ? theme.colors.error

                                            : "#D0D0D0",

                                    paddingHorizontal:
                                        0,

                                }}


                                // =============================================
                                // INPUT
                                // =============================================

                                inputStyle={{

                                    minHeight:
                                        48,

                                    height:
                                        48,

                                    paddingHorizontal:
                                        4,

                                    fontSize:
                                        15,

                                    color:
                                        "#B8B8BC",

                                    fontFamily:
                                        theme.fonts.medium,

                                }}

                            />


                            {/* =================================================
                                LOGIN BUTTON
                            ================================================= */}

                            <CommonButton

                                title="Login"

                                loading={
                                    isLoading
                                }

                                disabled={

                                    !employeeId.trim() ||

                                    !password.trim()

                                }

                                onPress={
                                    handleLogin
                                }


                                // =============================================
                                // ARROW
                                // =============================================

                                rightIcon={

                                    !isLoading

                                        ? (

                                            <ArrowRight

                                                size={
                                                    22
                                                }

                                                color={
                                                    theme.colors.white
                                                }

                                            />

                                        )

                                        : null

                                }


                                // =============================================
                                // BUTTON STYLE
                                // =============================================

                                containerStyle={{

                                    width:
                                        "100%",

                                    height:
                                        58,

                                    marginTop:

                                        isSmall

                                            ? 90

                                            : 100,

                                    borderRadius:
                                        17,

                                    backgroundColor:
                                        theme.colors.primary500,

                                }}


                                textStyle={{

                                    fontSize:
                                        16,

                                    fontFamily:
                                        theme.fonts.bold,

                                }}

                            />


                            {/* =================================================
                                NEED HELP
                            ================================================= */}

                            <TouchableOpacity

                                activeOpacity={
                                    0.8
                                }

                                onPress={() => {

                                    // TODO:
                                    // Visitor Help Flow

                                }}

                                style={{

                                    alignItems:
                                        "center",

                                    justifyContent:
                                        "center",

                                    paddingVertical:
                                        10,

                                    marginTop:
                                        2,

                                }}

                            >

                                <Text

                                    style={{

                                        fontSize:
                                            14,

                                        fontFamily:
                                            theme.fonts.medium,

                                        color:
                                            "#999999",

                                    }}

                                >

                                    Need Help ?

                                </Text>

                            </TouchableOpacity>


                        </View>


                    </ScrollView>


                </TouchableWithoutFeedback>


            </KeyboardAvoidingView>


        </SafeAreaView>

    );

};


export default VisitorLoginScreen;