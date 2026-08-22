// ============================================================
// src/screens/LoanDetails/UTRSubmissionSection.jsx
// ============================================================

import React, {
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
} from "react-native";

import {
  CheckCircle2,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";


// ============================================================
// API
// ============================================================

import {
  useSubmitEMIUTRMutation,
} from "../../../../redux/features/customer/customerApi.js";


// ============================================================
// COMMON MUTATION HANDLER
// ============================================================

import useHandleMutation
  from "../../../../hooks/useHandleMutation.js";


// ============================================================
// COMMON BUTTON
// ============================================================

import CommonButton
  from "../../../../components/common/Button/CommonButton";
import { goBackToSingleLoanDetail } from "../../../../navigation/ResetAndRedirectStaticRoutes.js";
import {useNavigation}  from  '@react-navigation/native'

 
// ============================================================
// COMPONENT
// ============================================================

const UTRSubmissionSection = ({
  paymentId,

  paymentAmount = 0,

  disabled = false,

  onSubmitted,
}) => {


  // ==========================================================
  // RTK QUERY MUTATION
  // ==========================================================
 const navigation = useNavigation()
  const [
    submitEMIUTR,
    {
      isLoading:
        isSubmitting,

      isError:
        isUTRError,

      error:
        utrError,
    },
  ] =
    useSubmitEMIUTRMutation();


  // ==========================================================
  // COMMON MUTATION HANDLER
  // ==========================================================

  const {
    handleMutation,
  } =
    useHandleMutation();


  // ==========================================================
  // UTR STATE
  // ==========================================================

  const [
    utrNumber,
    setUtrNumber,
  ] = useState("");


  // ==========================================================
  // VALIDATION ERROR
  // ==========================================================

  const [
    utrErrorMessage,
    setUtrErrorMessage,
  ] = useState("");


  // ==========================================================
  // HANDLE UTR CHANGE
  // ==========================================================

  const handleUTRChange = (value) => {

  // Sirf digits allow karo
  const numericValue =
    value
      .replace(/\D/g, "")
      .slice(0, 12);

  setUtrNumber(
    numericValue
  );


  // ==========================================
  // USER TYPE KARTE TIME LIVE VALIDATION
  // ==========================================

  if (!numericValue) {

    setUtrErrorMessage(
      "Please enter the UTR number."
    );

    return;
  }


  // 12 digits complete nahi hue
  if (
    numericValue.length < 12
  ) {

    setUtrErrorMessage(
      "UTR number must be 12 digits."
    );

    return;
  }


  // 12 digits complete hain
  if (
    numericValue.length === 12
  ) {

    setUtrErrorMessage(
      ""
    );

  }

};


  // ==========================================================
  // VALIDATE UTR
  // ==========================================================

 const validateUTR = () => {

  const utr = utrNumber.trim();

  // Payment check
  if (!paymentId) {

    setUtrErrorMessage(
      "Please complete the payment first."
    );

    return false;
  }

  // Empty check
  if (!utr) {

    setUtrErrorMessage(
      "Please enter the UTR number."
    );

    return false;
  }

  // Only numbers
  if (!/^\d+$/.test(utr)) {

    setUtrErrorMessage(
      "UTR number must contain only digits."
    );

    return false;
  }

  // Exactly 12 digits
  if (utr.length !== 12) {

    setUtrErrorMessage(
      "UTR number must be exactly 12 digits."
    );

    return false;
  }

  // Valid
  setUtrErrorMessage("");

  return true;
};;


  // ==========================================================
  // SUBMIT UTR
  // ==========================================================

  const handleSubmitUTR =
    async () => {

      // ------------------------------------------------------
      // PREVENT DUPLICATE REQUEST
      // ------------------------------------------------------

      if (
        isSubmitting
      ) {

        return;

      }


      // ------------------------------------------------------
      // VALIDATION
      // ------------------------------------------------------

      const isValid =
        validateUTR();


      if (
        !isValid
      ) {

        return;

      }


      // ------------------------------------------------------
      // CLEAN UTR
      // ------------------------------------------------------

      const utr =
        utrNumber.trim();


      // ======================================================
      // API
      // ======================================================

      const response =
        await handleMutation({

          // --------------------------------------------------
          // API FUNCTION
          // --------------------------------------------------

          apiFunc:
            submitEMIUTR,


          // --------------------------------------------------
          // PARAMS
          // --------------------------------------------------

          params: {

            paymentId:
              paymentId,

            utrNumber:
              utr,

            customerRemark:
              "Payment made through UPI",

          },


          // --------------------------------------------------
          // TIMEOUT
          // --------------------------------------------------

        

          // --------------------------------------------------
          // COMMON TOAST
          // --------------------------------------------------

          /*
           * Success toast:
           * useHandleMutation handle karega
           * only agar showSuccess true ho.
           *
           * Tumne bola hai common hook success toast
           * handle karega, isliye true.
           */

          showSuccess:
            true,


          /*
           * Error toast bhi common hook handle karega.
           */

          showError:
            true,


          /*
           * API ka custom error message available
           * ho to common hook use karega.
           */

          customErrorMsg:
            null,


          // ==================================================
          // SUCCESS
          // ==================================================

          onSuccess:
            (response) => {

               

            
 
 

              // ----------------------------------------------
              // CLEAR UTR
              // ----------------------------------------------

              setUtrNumber(
                ""
              );


              setUtrErrorMessage(
                ""
              );
     goBackToSingleLoanDetail(
      navigation
    );


              // ----------------------------------------------
              // PARENT
              // ----------------------------------------------

              

            },


          // ==================================================
          // ERROR
          // ==================================================

          onError:
            (error) => {

              console.log(
                "================================"
              );

              console.log(
                "SUBMIT EMI UTR FAILED"
              );

              console.log(
                error
              );

              console.log(
                "================================"
              );

              /*
               * Yahan toast nahi.
               *
               * useHandleMutation already
               * error toast show karega.
               */

            },

        });


      // ======================================================
      // RESULT
      // ======================================================

      console.log(
        "SUBMIT UTR RESULT:",
        response
      );

    };


  // ==========================================================
  // BUTTON DISABLED
  // ==========================================================

  const isSubmitDisabled =
    !paymentId ||
    disabled ||
    isSubmitting;


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <View
      style={{

        marginHorizontal:
          20,

        marginBottom:
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
          HEADER
      ==================================================== */}

      <Text
        style={{

          fontSize:
            16,

          fontFamily:
            theme?.fonts?.bold ||
            "Manrope-Bold",

          color:
            "#172B3A",

          marginBottom:
            6,

        }}
      >
        Transaction (UTR) Number
      </Text>


      {/* ====================================================
          DESCRIPTION
      ==================================================== */}

      <Text
        style={{

          fontSize:
            13,

          fontFamily:
            theme?.fonts?.regular ||
            "Manrope-Regular",

          color:
            "#6D8295",

          lineHeight:
            19,

          marginBottom:
            14,

        }}
      >
        Complete the payment first, then enter the UTR number
        received from your UPI transaction.
      </Text>


      {/* ====================================================
          PAYMENT STATUS
      ==================================================== */}

      {paymentId ? (

        <View
          style={{

            flexDirection:
              "row",

            alignItems:
              "center",

            backgroundColor:
              "#F0FDF4",

            borderWidth:
              1,

            borderColor:
              "#BBF7D0",

            borderRadius:
              12,

            padding:
              12,

            marginBottom:
              14,

          }}
        >

          <CheckCircle2
            size={
              18
            }

            color={
              "#16A34A"
            }
          />


          <View
            style={{

              flex:
                1,

              marginLeft:
                8,

            }}
          >

            <Text
              style={{

                fontSize:
                  12,

                fontFamily:
                  theme?.fonts?.bold ||
                  "Manrope-Bold",

                color:
                  "#15803D",

              }}
            >
              Payment Created
            </Text>


            <Text
              style={{

                fontSize:
                  11,

                fontFamily:
                  theme?.fonts?.regular ||
                  "Manrope-Regular",

                color:
                  "#4D7C5B",

                marginTop:
                  2,

              }}

              numberOfLines={
                1
              }
            >
              Payment ID: {paymentId}
            </Text>

          </View>

        </View>

      ) : (

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
              14,

          }}
        >

          <Text
            style={{

              fontSize:
                12,

              fontFamily:
                theme?.fonts?.medium ||
                "Manrope-Medium",

              color:
                "#C2410C",

            }}
          >
            Complete the payment first to enter UTR.
          </Text>

        </View>

      )}


      {/* ====================================================
          UTR LABEL
      ==================================================== */}

      <Text
        style={{

          fontSize:
            13,

          fontFamily:
            theme?.fonts?.medium ||
            "Manrope-Medium",

          color:
            "#42566D",

          marginBottom:
            7,

        }}
      >
        UTR Number
      </Text>


      {/* ====================================================
          UTR INPUT
      ==================================================== */}

  <TextInput
  value={utrNumber}

  onChangeText={
    handleUTRChange
  }

  placeholder="Enter 12-digit UTR Number"

  placeholderTextColor="#B8C4D1"

  keyboardType="number-pad"

  maxLength={12}

  autoCorrect={false}

  editable={
    !!paymentId &&
    !disabled &&
    !isSubmitting
  }

  style={{
    height: 56,

    borderWidth: 1,

    borderColor:
      utrErrorMessage
        ? "#EF4444"
        : paymentId
          ? "#E1E6EB"
          : "#E8ECF0",

    borderRadius: 14,

    paddingHorizontal: 16,

    fontSize: 15,

    fontFamily:
      theme?.fonts?.regular ||
      "Manrope-Regular",

    color: "#172B3A",

    backgroundColor:
      paymentId
        ? "#FFFFFF"
        : "#F8FAFC",
  }}
/>


      {/* ====================================================
          VALIDATION ERROR
      ==================================================== */}

      {!!utrErrorMessage && (

        <Text
          style={{

            fontSize:
              12,

            fontFamily:
              theme?.fonts?.regular ||
              "Manrope-Regular",

            color:
              "#EF4444",

            marginTop:
              6,

            marginLeft:
              2,

          }}
        >
          {utrErrorMessage}
        </Text>

      )}


      {/* ====================================================
          SUBMIT BUTTON
      ==================================================== */}

      <CommonButton

        title={
          isSubmitting
            ? "Submitting UTR..."
            : "Submit UTR"
        }

        onPress={
          handleSubmitUTR
        }

        loading={
          isSubmitting
        }

        disabled={
          isSubmitDisabled
        }

        containerStyle={{

          marginTop:
            14,

        }}

      />


      {/* ====================================================
          INFO
      ==================================================== */}

      <Text
        style={{

          fontSize:
            12,

          fontFamily:
            theme?.fonts?.regular ||
            "Manrope-Regular",

          color:
            "#91A1B4",

          textAlign:
            "center",

          lineHeight:
            18,

          marginTop:
            12,

        }}
      >
        Please enter the UTR exactly as shown in your
        UPI transaction history.
      </Text>


    </View>

  );

};


export default UTRSubmissionSection;