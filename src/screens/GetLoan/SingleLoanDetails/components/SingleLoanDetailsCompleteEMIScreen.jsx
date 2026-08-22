// ============================================================
// src/screens/LoanDetails/CompleteEMIScreen.jsx
// ============================================================

import React, {
  useState,
} from "react";

import {
  View,
  Text,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  theme,
} from "../../../../theme";


// ============================================================
// COMMON
// ============================================================

import BackButton
  from "../../../../components/common/BackButton/BackButton.jsx";


// ============================================================
// PAYMENT COMPONENTS
// ============================================================

import EMIPaymentSection
  from "./EMIPaymentSection.jsx";

import UTRSubmissionSection
  from "./UTRSubmissionSection.jsx";


// ============================================================
// SCREEN
// ============================================================

const CompleteEMIScreen = ({
  route,
  navigation,
}) => {

  // ==========================================================
  // ROUTE DATA
  // ==========================================================

  const emi =
    route?.params?.emi ||
    {};

  const loanDetails =
    route?.params?.loanDetails ||
    {};


  // ==========================================================
  // EMI OBJECT ID
  // ==========================================================

  const emiObjectId =
    route?.params?.emiObjectId ||
    emi?.emiObjectId;


  // ==========================================================
  // PAYMENT DATA
  // ==========================================================

  const [
    paymentData,
    setPaymentData,
  ] = useState(null);


  // ==========================================================
  // PAYMENT CREATED
  // ==========================================================

  const handlePaymentCreated =
    (response) => {

      console.log(
        "================================"
      );

      console.log(
        "PAYMENT CREATED SUCCESS"
      );

      console.log(
        JSON.stringify(
          response,
          null,
          2
        )
      );

      console.log(
        "================================"
      );


      /*
       * Expected response:
       *
       * {
       *   paymentId,
       *   upiLink,
       *   amount
       * }
       */

      setPaymentData(
        response
      );

    };


  // ==========================================================
  // PAYMENT ERROR
  // ==========================================================

  const handlePaymentError =
    (error) => {

      console.log(
        "================================"
      );

      console.log(
        "PAYMENT CREATION FAILED"
      );

      console.log(
        error
      );

      console.log(
        "================================"
      );


      /*
       * Payment create nahi hua.
       *
       * Payment data clear rahega.
       *
       * UTR disabled rahega.
       */

      setPaymentData(
        null
      );

    };


  // ==========================================================
  // UTR SUBMITTED
  // ==========================================================

  const handleUTRSubmitted =
    (response) => {

      console.log(
        "================================"
      );

      console.log(
        "UTR SUBMITTED SUCCESS"
      );

      console.log(
        JSON.stringify(
          response,
          null,
          2
        )
      );

      console.log(
        "================================"
      );


      /*
       * Abhi success screen nahi dikhani.
       *
       * Future mein yahan:
       *
       * - navigation
       * - status refresh
       * - success modal
       *
       * add kar sakte hain.
       */

    };


  // ==========================================================
  // MAIN SCREEN
  // ==========================================================

  return (

    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor:
          theme?.colors?.background ||
          "#F6F8F7",
      }}
    >

      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />


      {/* ====================================================
          HEADER
      ==================================================== */}

      <View
        style={{
          backgroundColor:
            "#FFFFFF",

          paddingHorizontal:
            20,
        }}
      >

        <BackButton
          title="Complete EMI"

          onPress={() =>
            navigation.goBack()
          }
        />

      </View>


      {/* ====================================================
          KEYBOARD
      ==================================================== */}

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

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }

          keyboardShouldPersistTaps="handled"

          contentContainerStyle={{
            paddingTop:
              8,

            paddingBottom:
              40,
          }}
        >

          {/* ==================================================
              STEP 1
              CREATE PAYMENT + PAY NOW
          ================================================== */}

          <EMIPaymentSection

            emiObjectId={
              emiObjectId
            }

            emiAmount={
              emi?.emiAmount
            }

            onPaymentCreated={
              handlePaymentCreated
            }

            onPaymentError={
              handlePaymentError
            }

          />


          {/* ==================================================
              STEP 2
              UTR SUBMISSION
          ================================================== */}


          <UTRSubmissionSection

            paymentId={
              paymentData?.paymentId
            }

            paymentAmount={
              paymentData?.amount ||
              emi?.emiAmount ||
              0
            }

            disabled={
              !paymentData?.paymentId
            }

            onSubmitted={
              handleUTRSubmitted
            }

          />

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );

};


export default CompleteEMIScreen;