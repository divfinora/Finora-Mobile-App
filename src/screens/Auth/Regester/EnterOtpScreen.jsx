import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  Image,
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
  ArrowLeft,
} from "lucide-react-native";

import {
  theme,
} from "../../../theme";

import OtpIllustration
  from "../assets/login.webp";

import useHandleMutation
  from "../../../hooks/useHandleMutation";

import {
  useVerifyOtpMutation,
} from "../../../redux/features/auth/authApi";

import KeyboardAvoidingBottomView from "../../../components/common/KeyBoard/KeyboardAvoidingBottomView";


const OTP_LENGTH = 6;

const OTP_VALIDITY = 300;


const EnterOtpScreen = ({
  navigation,
  route,
}) => {


  const {
    width,
    height,
  } = useWindowDimensions();


  const isTablet =
    width >= 768;


  const isSmall =
    height < 700;


  const otpBoxSize =
    isTablet
      ? 68
      : Math.min(
        60,
        (width - theme.spacing.massive - 30) / OTP_LENGTH
      );


  const [
    verifyOtp,
    {
      isLoading,
    },
  ] = useVerifyOtpMutation();


  const {
    handleMutation,
  } = useHandleMutation();


  const phone =
    route?.params?.phone ??
    "84848XXXX84";

  const LoginOtp =
    route?.params?.otp ??
    "123456";


  const [
    otp,
    setOtp,
  ] = useState(
    Array(OTP_LENGTH).fill("")
  );


  useEffect(() => {
    if (LoginOtp) {
      const otpValue = String(LoginOtp)
        .replace(/\D/g, "")
        .slice(0, OTP_LENGTH);

      setOtp(
        otpValue
          .split("")
          .concat(
            Array(OTP_LENGTH - otpValue.length).fill("")
          )
      );
    }
  }, [LoginOtp]);


  const [
    seconds,
    setSeconds,
  ] = useState(
    OTP_VALIDITY
  );


  const inputs =
    useRef([]);

  const scrollViewRef =
    useRef(null);


  useEffect(() => {

    const timer =
      setTimeout(() => {

        inputs.current[0]?.focus();

      }, 300);


    return () =>
      clearTimeout(timer);

  }, []);


  useEffect(() => {

    if (seconds <= 0)
      return;


    const interval =
      setInterval(() => {

        setSeconds(prev =>
          prev - 1
        );

      }, 1000);


    return () =>
      clearInterval(interval);


  }, [seconds]);


  const handleOtpChange = (
    text,
    index
  ) => {


    const value =
      text.replace(/\D/g, "");


    if (value.length > 1) {

      const newOtp =
        [...otp];

      value
        .slice(0, OTP_LENGTH)
        .split("")
        .forEach(
          (digit, i) => {

            if (
              index + i < OTP_LENGTH
            ) {

              newOtp[index + i] =
                digit;

            }

          }
        );


      setOtp(newOtp);


      const nextIndex =
        Math.min(
          index + value.length,
          OTP_LENGTH - 1
        );


      inputs.current[nextIndex]
        ?.focus();


      return;

    }


    const newOtp =
      [...otp];


    newOtp[index] =
      value;


    setOtp(newOtp);


    if (
      value &&
      index < OTP_LENGTH - 1
    ) {

      inputs.current[index + 1]
        ?.focus();

    }


  };


  const handleBackspace = (
    e,
    index
  ) => {


    if (
      e.nativeEvent.key !==
      "Backspace"
    )
      return;


    const newOtp =
      [...otp];


    if (otp[index]) {

      newOtp[index] = "";

      setOtp(newOtp);

      return;

    }


    if (index > 0) {

      newOtp[index - 1] = "";

      setOtp(newOtp);


      inputs.current[index - 1]
        ?.focus();

    }


  };


  const handleVerify = async () => {


    const code =
      otp.join("");


    if (
      code.length !== OTP_LENGTH
    )
      return;


    await handleMutation({

      apiFunc: verifyOtp,

      params: {

        mobile: phone,

        otp: code,

      },


      showSuccess: true,


      onSuccess: (response) => {


        if (
          response?.data?.isRegistered
        ) {

          Keyboard.dismiss();

          navigation.replace(
            "enter-mpin-login-user",
            {
              phone,
            }
          );


        }
        else {

          navigation.replace(
            "create-pin-register-user",
            {
              phone,
            }
          );

        }


      },


    });


  };


  const handleResend = () => {


    setOtp(
      Array(
        OTP_LENGTH
      ).fill("")
    );


    setSeconds(
      OTP_VALIDITY
    );


    setTimeout(() => {

      inputs.current[0]
        ?.focus();

    }, 200);


  };


  const isOtpComplete =
    otp.every(Boolean);


  const minutes =
    String(
      Math.floor(
        seconds / 60
      )
    ).padStart(2, "0");


  const remainingSeconds =
    String(
      seconds % 60
    ).padStart(2, "0");


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
            flex: 1,
            paddingHorizontal:
              theme.spacing.xl,
          }}
        >


          <TouchableWithoutFeedback
            onPress={
              Keyboard.dismiss
            }
          >


            <ScrollView
              ref={scrollViewRef}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom:40
               
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


                <TouchableOpacity
                  onPress={() =>
                    navigation.goBack()
                  }
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius:
                      theme.radius.circle,
                    justifyContent: "center",
                    alignItems: "center",
                    marginLeft: -8,
                    marginBottom:
                      theme.spacing.lg,
                  }}
                >

                  <ArrowLeft
                    size={22}
                    color={
                      theme.colors.black
                    }
                    strokeWidth={2.2}
                  />

                </TouchableOpacity>


                <View
                  style={{
                    alignItems: "center",
                    marginBottom:
                      theme.spacing.xxxl,
                  }}
                >

                  <Image
                    source={
                      OtpIllustration
                    }
                    resizeMode="contain"
                    style={{
                      width:
                        isTablet
                          ? 300
                          : isSmall
                            ? 200
                            : Math.min(
                              width * .60,
                              250
                            ),

                      height:
                        isTablet
                          ? 300
                          : isSmall
                            ? 200
                            : Math.min(
                              width * .60,
                              250
                            ),
                    }}
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
                  Enter OTP
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
                  A 6 digit code has been sent to
                </Text>


                <Text
                  style={{
                    marginTop: 4,

                    fontSize:
                      theme.typography.b1,

                    fontFamily:
                      theme.fonts.bold,

                    color:
                      theme.colors.black,
                  }}
                >
                  +91 {phone}
                </Text>


                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    marginTop:
                      theme.spacing.xxl,
                  }}
                >

                  {
                    otp.map(
                      (
                        value,
                        index
                      ) => (

                        <TextInput
                          key={index}

                          ref={(ref) => {
                            inputs.current[index]
                              = ref;
                          }}

                          value={value}

                          onFocus={() => {
                            setTimeout(() => {
                              scrollViewRef.current?.scrollToEnd({
                                animated: true,
                              });
                            }, 150);
                          }}

                          onChangeText={(text) =>
                            handleOtpChange(
                              text,
                              index
                            )
                          }

                          onKeyPress={(e) =>
                            handleBackspace(
                              e,
                              index
                            )
                          }

                          keyboardType="number-pad"

                          textContentType="oneTimeCode"

                          autoComplete="sms-otp"

                          importantForAutofill="yes"

                          autoCorrect={false}

                          contextMenuHidden={false}

                          selectTextOnFocus

                          maxLength={
                            Platform.OS === "ios"
                              ? OTP_LENGTH
                              : 20
                          }

                          style={{
                            width:
                              otpBoxSize,

                            height:
                              otpBoxSize,

                            borderRadius:
                              theme.radius.lg,

                            borderWidth:
                              theme.borderWidth.thin,

                            borderColor:
                              value
                                ? theme.colors.primary500
                                : theme.colors.gray200,

                            backgroundColor:
                              theme.colors.gray100,

                            textAlign: "center",

                            fontSize:
                              otpBoxSize * .4,

                            fontFamily:
                              theme.fonts.bold,

                            color:
                              theme.colors.black,
                          }}

                        />

                      )
                    )
                  }

                </View>


                <TouchableOpacity
                  activeOpacity={0.9}
                  disabled={
                    !isOtpComplete ||
                    isLoading
                  }
                  onPress={
                    handleVerify
                  }
                  style={{
                    width: "100%",

                    height:
                      theme.button.height,

                    marginTop:
                      theme.spacing.massive,

                    borderRadius:
                      theme.button.borderRadius,

                    justifyContent: "center",

                    alignItems: "center",

                    backgroundColor:
                      (!isOtpComplete || isLoading)
                        ? theme.button.disabled.backgroundColor
                        : theme.button.primary.backgroundColor,
                  }}
                >

                  {
                    isLoading
                      ?
                      (
                        <ActivityIndicator
                          size="small"
                          color={
                            theme.button.primary.textColor
                          }
                        />
                      )
                      :
                      (
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
                          Verify
                        </Text>
                      )
                  }

                </TouchableOpacity>


                <View
                  style={{
                    alignItems: "center",
                    marginTop:
                      theme.spacing.xxxl,
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
                    OTP expires in
                  </Text>


                  <Text
                    style={{
                      marginTop: 4,

                      fontSize:
                        theme.typography.b1,

                      fontFamily:
                        theme.fonts.bold,

                      color:
                        theme.colors.primary500,
                    }}
                  >
                    {minutes}:{remainingSeconds}
                  </Text>

                </View>


                <TouchableOpacity
                  activeOpacity={0.8}
                  disabled={
                    seconds > 0
                  }
                  onPress={
                    handleResend
                  }
                  style={{
                    alignItems: "center",
                    marginTop:
                      theme.spacing.xxxl,
                  }}
                >

                  <Text
                    style={{
                      fontSize:
                        theme.typography.b1,

                      fontFamily:
                        theme.fonts.medium,

                      color:
                        seconds > 0
                          ? theme.colors.black
                          : theme.colors.primary500,
                    }}
                  >
                    Resend OTP
                  </Text>

                </TouchableOpacity>


              </View>


            </ScrollView>


          </TouchableWithoutFeedback>


        </View>


      </KeyboardAvoidingBottomView>


    </SafeAreaView>

  );


};


export default EnterOtpScreen;