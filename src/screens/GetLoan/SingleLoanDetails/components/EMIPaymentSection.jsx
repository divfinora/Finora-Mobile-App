// ============================================================
// src/screens/LoanDetails/EMIPaymentSection.jsx
// ============================================================

import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  Alert,
  Linking,
} from "react-native";

import {
  ExternalLink,
  RefreshCw,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";

import {
  useCreateEMIPaymentMutation,
} from "../../../../redux/features/customer/customerApi.js";

import useHandleMutation
  from "../../../../hooks/useHandleMutation.js";

import CommonButton
  from "../../../../components/common/Button/CommonButton";
import { isCameraPresent } from "react-native-device-info";


const EMIPaymentSection = ({
  emiObjectId,

  emiAmount = 0,

  onPaymentCreated,

  onPaymentError,

  disabled = false,

  hidePaymentButton = false,
}) => {


  // ==========================================================
  // RTK QUERY MUTATION
  // ==========================================================

  const [
    createEMIPayment,

    {
      isLoading:
        isCreatingPayment,

      isError:
        isPaymentError,

      error:
        paymentError,
    },

  ] =
    useCreateEMIPaymentMutation();

    console.log(isCameraPresent ,"issCreating payment")
  // ==========================================================
  // COMMON MUTATION HANDLER
  // ==========================================================

  const {
    handleMutation,
  } =
    useHandleMutation();


  // ==========================================================
  // PAYMENT DATA
  // ==========================================================

  const [
    paymentData,
    setPaymentData,
  ] = useState(null);


  // ==========================================================
  // LOCAL PAYMENT ERROR
  // ==========================================================

  const [
    paymentErrorState,
    setPaymentErrorState,
  ] = useState(false);


  // ==========================================================
  // CREATE PAYMENT
  // ==========================================================

  const createPayment =
    async () => {

      // ------------------------------------------------------
      // PREVENT DUPLICATE REQUEST
      // ------------------------------------------------------

      if (
        isCreatingPayment
      ) {
        return;
      }


      // ------------------------------------------------------
      // EMI ID CHECK
      // ------------------------------------------------------

      if (
        !emiObjectId
      ) {

        Alert.alert(
          "Payment Error",
          "EMI ID is missing. Please try again."
        );

        return;
      }


      // ------------------------------------------------------
      // RESET OLD PAYMENT
      // ------------------------------------------------------

      setPaymentData(
        null
      );

      setPaymentErrorState(
        false
      );


      // ------------------------------------------------------
      // API CALL
      // ------------------------------------------------------

      const response =
        await handleMutation({

          apiFunc:
            createEMIPayment,

          params: {

            emiId:
              emiObjectId,

          },

         

          /*
           * Common hook toast
           */

          showSuccess:
            true,

          showError:
            true,


          // ====================================================
          // SUCCESS
          // ====================================================

       onSuccess:
  (response) => {

    console.log(
      "========================================"
    );

    console.log(
      "CREATE EMI PAYMENT SUCCESS"
    );

    console.log(
      JSON.stringify(
        response,
        null,
        2
      )
    );

    console.log(
      "========================================"
    );


    // =================================================
    // RESPONSE DATA
    // =================================================

    const data =
      response?.data ||
      response ||
      {};


    // =================================================
    // PAYMENT ID
    // =================================================

    const newPaymentId =
      data?.paymentId ||
      response?.paymentId ||
      "";


    // =================================================
    // UPI LINK
    // =================================================

    const newUpiLink =
      data?.upiLink ||
      response?.upiLink ||
      "";


    // =================================================
    // AMOUNT
    // =================================================

    const newAmount =
      Number(
        data?.amount ||
        response?.amount ||
        emiAmount ||
        0
      );


    // =================================================
    // DEBUG
    // =================================================

    console.log(
      "PAYMENT ID:",
      newPaymentId
    );

    console.log(
      "UPI LINK:",
      newUpiLink
    );

    console.log(
      "PAYMENT AMOUNT:",
      newAmount
    );


    // =================================================
    // INVALID RESPONSE
    // =================================================

    if (
      !newPaymentId ||
      !newUpiLink
    ) {

      console.log(
        "PAYMENT RESPONSE INCOMPLETE"
      );


      // -----------------------------------------------
      // Payment technically API se success hua,
      // lekin usable payment data nahi mila.
      // -----------------------------------------------

      setPaymentData(
        null
      );


      setPaymentErrorState(
        true
      );


      onPaymentError?.(
        {
          message:
            "Payment information is incomplete.",
        }
      );


      return;
    }


    // =================================================
    // SAVE PAYMENT DATA
    // =================================================

    const payment =
      {
        paymentId:
          newPaymentId,

        upiLink:
          newUpiLink,

        amount:
          newAmount,
      };


    setPaymentData(
      payment
    );


    // =================================================
    // SEND PAYMENT DATA TO PARENT
    // =================================================

    onPaymentCreated?.(
      payment
    );

  },


          // ====================================================
          // ERROR
          // ====================================================

          onError:
            (error) => {

              console.log(
                "========================================"
              );

              console.log(
                "CREATE EMI PAYMENT FAILED"
              );

              console.log(
                error
              );

              console.log(
                "========================================"
              );


              setPaymentData(
                null
              );


              setPaymentErrorState(
                true
              );


              onPaymentError?.(
                error
              );

            },

        });


      console.log(
        "CREATE PAYMENT RESULT:",
        response
      );

    };


  // ==========================================================
  // CREATE PAYMENT ON SCREEN LOAD
  // ==========================================================

  useEffect(() => {

    if (
      disabled ||
      hidePaymentButton
    ) {
      return;
    }


    if (
      !emiObjectId
    ) {
      return;
    }


    createPayment();

  }, [
    emiObjectId,
  ]);


  // ==========================================================
  // PAY NOW
  // ==========================================================

  const handlePayNow =
    async () => {

      const upiLink =
        paymentData?.upiLink;


      // ------------------------------------------------------
      // UPI LINK CHECK
      // ------------------------------------------------------

      if (
        !upiLink
      ) {

        Alert.alert(
          "Payment Unavailable",
          "UPI payment link is not available. Please try again."
        );

        return;
      }


      // ------------------------------------------------------
      // DEBUG
      // ------------------------------------------------------

      console.log(
        "========================================"
      );

      console.log(
        "OPEN UPI PAYMENT"
      );

      console.log(
        "UPI LINK:",
        upiLink
      );

      console.log(
        "========================================"
      );


      try {

        /*
         * IMPORTANT:
         *
         * canOpenURL() nahi use karna.
         *
         * Direct UPI intent open karo.
         */

        await Linking.openURL(
          upiLink
        );

      } catch (
        error
      ) {

        console.log(
          "UPI OPEN ERROR:",
          error
        );


        Alert.alert(
          "Unable to Open UPI",
          "Please install Google Pay, PhonePe or Paytm and try again."
        );

      }

    };


  // ==========================================================
  // PAYMENT ERROR
  // ==========================================================

  const hasPaymentError =
    paymentErrorState ||
    isPaymentError;


  // ==========================================================
  // PAYMENT CREATED
  // ==========================================================

  const paymentCreated =
    Boolean(
      paymentData?.paymentId &&
      paymentData?.upiLink
    );


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <View
      style={{

        margin:
          20,

        backgroundColor:
          "#FFFFFF",

        borderRadius:
          20,

        padding:
          20,

        ...theme?.shadows?.card,

      }}
    >


      {/* ====================================================
          TITLE
      ==================================================== */}

      <Text
        style={{

          fontSize:
            13,

          fontFamily:
            theme?.fonts?.medium ||
            "Manrope-Medium",

          color:
            "#6D8295",

          marginBottom:
            8,

        }}
      >
        EMI Amount
      </Text>


      {/* ====================================================
          AMOUNT
      ==================================================== */}

      <Text
        style={{

          fontSize:
            28,

          fontFamily:
            theme?.fonts?.bold ||
            "Manrope-Bold",

          color:
            "#172B3A",

          marginBottom:
            20,

        }}
      >

        ₹
        {Number(
          paymentData?.amount ||
          emiAmount ||
          0
        ).toLocaleString(
          "en-IN"
        )}

      </Text>


      {/* ====================================================
          PAYMENT ERROR
      ==================================================== */}

      {hasPaymentError ? (

        <View>

          {/* ==================================================
              ERROR MESSAGE
          ================================================== */}

          <View
            style={{

              backgroundColor:
                "#FFF7ED",

              borderWidth:
                1,

              borderColor:
                "#FED7AA",

              borderRadius:
                12,

              padding:
                12,

              marginBottom:
                12,

            }}
          >

            <Text
              style={{

                fontSize:
                  13,

                fontFamily:
                  theme?.fonts?.medium ||
                  "Manrope-Medium",

                color:
                  "#C2410C",

                textAlign:
                  "center",

              }}
            >
              Unable to create payment
            </Text>


            <Text
              style={{

                fontSize:
                  12,

                fontFamily:
                  theme?.fonts?.regular ||
                  "Manrope-Regular",

                color:
                  "#9A3412",

                textAlign:
                  "center",

                marginTop:
                  4,

              }}
            >
              Please try again to continue.
            </Text>

          </View>


          {/* ==================================================
              RETRY BUTTON
          ================================================== */}

          <CommonButton

            title={
              isCreatingPayment
                ? "Retrying..."
                : "Retry Payment"
            }

            onPress={
              createPayment
            }

            loading={
              isCreatingPayment
            }

            disabled={
              isCreatingPayment ||
              disabled
            }

            rightIcon={

              !isCreatingPayment ? (

                <RefreshCw
                  size={
                    18
                  }

                  color={
                    "#FFFFFF"
                  }
                />

              ) : null

            }

          />

        </View>

      ) : (

        // ====================================================
        // PAYMENT SUCCESS / CREATE STATE
        // ====================================================

        !hidePaymentButton && (

          <CommonButton

            title={
              isCreatingPayment

                ? "Creating Payment..."

                : paymentCreated

                  ? "Pay Now"

                  : "Creating Payment..."
            }

            onPress={
              handlePayNow
            }

            loading={
              isCreatingPayment
            }

            disabled={

              isCreatingPayment ||

              !paymentCreated ||

              disabled

            }

            rightIcon={

              !isCreatingPayment &&
              paymentCreated ? (

                <ExternalLink
                  size={
                    19
                  }

                  color={
                    "#FFFFFF"
                  }
                />

              ) : null

            }

          />

        )

      )}


      {/* ====================================================
          INFO TEXT
      ==================================================== */}

      {!hasPaymentError &&
        !hidePaymentButton &&
        !isCreatingPayment &&
        paymentCreated && (

          <Text
            style={{

              fontSize:
                13,

              fontFamily:
                theme?.fonts?.regular ||
                "Manrope-Regular",

              color:
                "#91A1B4",

              textAlign:
                "center",

              marginTop:
                12,

            }}
          >
            Pay using Google Pay, PhonePe or Paytm
          </Text>

        )}


      {/* ====================================================
          PAYMENT ID
      ==================================================== */}

      {paymentData?.paymentId ? (

        <View
          style={{

            marginTop:
              16,

            padding:
              12,

            backgroundColor:
              "#F8FAFC",

            borderRadius:
              12,

          }}
        >

          <Text
            style={{

              fontSize:
                11,

              fontFamily:
                theme?.fonts?.medium ||
                "Manrope-Medium",

              color:
                "#91A1B4",

              marginBottom:
                4,

            }}
          >
            Payment ID
          </Text>


          <Text
            style={{

              fontSize:
                13,

              fontFamily:
                theme?.fonts?.medium ||
                "Manrope-Medium",

              color:
                "#172B3A",

            }}
          >
            {paymentData.paymentId}
          </Text>

        </View>

      ) : null}


    </View>

  );

};


export default EMIPaymentSection;