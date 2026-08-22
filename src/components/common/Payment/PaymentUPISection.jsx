// ============================================================
// src/screens/LoanDetails/components/PaymentUPISection.jsx
// ============================================================

import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";

import {
  ChevronRight,
  Globe,
} from "lucide-react-native";

import {
  theme,
} from "../../../theme";


// ============================================================
// COMPONENT
// ============================================================

const PaymentUPISection = ({
  upiLink,

  paymentAmount = 0,

  disabled = false,

  onPaymentOpen,
}) => {


  // ==========================================================
  // OPEN UPI PAYMENT
  // ==========================================================

  const openUPI = async () => {

    try {

      console.log(
        "================================"
      );

      console.log(
        "UPI PAYMENT"
      );

      console.log(
        "UPI LINK:",
        upiLink
      );

      console.log(
        "PAYMENT AMOUNT:",
        paymentAmount
      );

      console.log(
        "================================"
      );


      // ======================================================
      // UPI LINK NOT AVAILABLE
      // ======================================================

      if (!upiLink) {

        Alert.alert(
          "Payment Unavailable",
          "UPI payment link is currently unavailable. Please try again later."
        );

        return;
      }


      // ======================================================
      // DIRECTLY OPEN UPI
      // ======================================================
      //
      // Do NOT use canOpenURL() here.
      //
      // FinSarthi backend gives:
      //
      // upi://pay?pa=...
      //
      // Directly open it.
      //
      // ======================================================

      await Linking.openURL(
        upiLink
      );


      // ======================================================
      // CALLBACK
      // ======================================================

      onPaymentOpen?.();

    } catch (error) {

      console.log(
        "UPI OPEN ERROR:",
        error
      );


      // ======================================================
      // UPI APP NOT FOUND / OPEN FAILED
      // ======================================================

      Alert.alert(
        "No UPI App Found",
        "Please install Google Pay, PhonePe or Paytm and try again."
      );

    }

  };


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

        borderWidth:
          1,

        borderColor:
          "#E5E7EB",

        overflow:
          "hidden",

        ...theme?.shadows?.card,

      }}
    >


      {/* ====================================================
          PAYMENT AMOUNT
      ==================================================== */}

      <View
        style={{

          paddingHorizontal:
            16,

          paddingTop:
            16,

          paddingBottom:
            12,

        }}
      >

        <Text
          style={{

            fontSize:
              16,

            fontFamily:
              theme?.fonts?.bold ||
              "Manrope-Bold",

            color:
              "#172B3A",

          }}
        >
          Payable Amount
        </Text>


        <Text
          style={{

            fontSize:
              24,

            fontFamily:
              theme?.fonts?.bold ||
              "Manrope-Bold",

            color:
              "#172B3A",

            marginTop:
              4,

          }}
        >

          ₹
          {Number(
            paymentAmount || 0
          ).toLocaleString(
            "en-IN"
          )}

        </Text>

      </View>


      {/* ====================================================
          ONLINE PAYMENT
      ==================================================== */}

      <TouchableOpacity

        activeOpacity={
          0.75
        }

        disabled={
          disabled ||
          !upiLink
        }

        onPress={
          openUPI
        }

        style={{

          flexDirection:
            "row",

          alignItems:
            "center",

          justifyContent:
            "space-between",

          paddingHorizontal:
            16,

          paddingVertical:
            16,

          borderTopWidth:
            1,

          borderTopColor:
            "#F1F3F5",

          opacity:
            disabled ||
            !upiLink
              ? 0.5
              : 1,

        }}
      >


        {/* ==================================================
            LEFT
        ================================================== */}

        <View
          style={{

            flexDirection:
              "row",

            alignItems:
              "center",

          }}
        >


          {/* ==================================================
              ICON PLACEHOLDER
          ================================================== */}

          <View
            style={{

              width:
                50,

              height:
                32,

              borderRadius:
                6,

              marginRight:
                12,

              backgroundColor:
                "#EFF6FF",

              alignItems:
                "center",

              justifyContent:
                "center",

            }}
          >

            <Globe
              size={
                20
              }

              color={
                "#2563EB"
              }
            />

          </View>


          {/* ==================================================
              TEXT
          ================================================== */}

          <View>

            <Text
              style={{

                fontSize:
                  14,

                fontFamily:
                  theme?.fonts?.medium ||
                  "Manrope-Medium",

                color:
                  "#172B3A",

              }}
            >
              Online Payment
            </Text>


            <Text
              style={{

                fontSize:
                  11,

                fontFamily:
                  theme?.fonts?.regular ||
                  "Manrope-Regular",

                color:
                  "#91A1B4",

                marginTop:
                  2,

              }}
            >
              Pay securely using UPI

            </Text>

          </View>

        </View>


        {/* ==================================================
            RIGHT ARROW
        ================================================== */}

        <ChevronRight

          size={
            19
          }

          color={
            "#777777"
          }

        />

      </TouchableOpacity>

    </View>

  );

};


export default PaymentUPISection;