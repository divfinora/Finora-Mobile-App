import React, {
  useEffect,
  useState,
} from "react";

import EnterOtpScreen from "../../../components/common/OTPScreen/EnterOtpScreen";

import PanOtpImage from "../../../assets/images/otp/pan.webp";

const PanOtpVerificationScreen = ({ navigation, route }) => {

  const phone =
    route?.params?.phone || "9995380399";

  const [otp, setOtp] = useState(
    Array(6).fill("")
  );

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [seconds, setSeconds] =
    useState(30);

  /* ===============================
      Timer
  =============================== */

  useEffect(() => {

    if (seconds <= 0) return;

    const timer = setInterval(() => {

      setSeconds(prev => prev - 1);

    }, 1000);

    return () => clearInterval(timer);

  }, [seconds]);

  /* ===============================
      OTP Change
  =============================== */

  const handleOtpChange = value => {

    setOtp(value);

    if (error) {
      setError("");
    }

  };

  /* ===============================
      Verify OTP
  =============================== */

  const handleVerify = async () => {

    const enteredOtp =
      otp.join("");

    if (enteredOtp.length !== 6) {

      setError("Please enter a valid OTP.");

      return;
    }

    try {

      setLoading(true);

      /**
       * ---------------------------------
       * TODO:
       * Verify PAN OTP API
       * ---------------------------------
       */

      console.log("PAN OTP :", enteredOtp);

      // navigation.navigate("NextScreen");

    } catch (e) {

      setError(
        "Invalid OTP. Please try again."
      );

    } finally {

      setLoading(false);

    }

  };

  /* ===============================
      Resend OTP
  =============================== */

  const handleResend = async () => {

    if (seconds > 0) return;

    try {

      /**
       * ---------------------------------
       * TODO:
       * Resend PAN OTP API
       * ---------------------------------
       */

      console.log("Resend PAN OTP");

      setSeconds(30);

      setOtp(Array(6).fill(""));

      setError("");

    } catch (e) {

      console.log(e);

    }

  };

  return (

    <EnterOtpScreen

      title="PAN OTP Verification"

      subtitle="A 6 digit code has been sent to"

      phone={phone}

      image={PanOtpImage}

      otp={otp}

      otpLength={6}

      error={error}

      loading={loading}

      buttonTitle="Verify"

      seconds={seconds}

      onOtpChange={handleOtpChange}

      onVerify={handleVerify}

      onResend={handleResend}

      onBack={() => navigation.goBack()}

    />

  );

};

export default PanOtpVerificationScreen;