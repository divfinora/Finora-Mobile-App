// src/screens/LoanDetails/FeeDetailsScreen.jsx

import React from "react";

import {
  View,
  Text,
  StatusBar,
} from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  ChevronDown,
  ExternalLink,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";

// Common Components
import CommonButton from "../../../../components/common/Button/CommonButton";
import BackButton from "../../../../components/common/BackButton/BackButton";


// =====================================================
// FEE DETAILS SCREEN
// =====================================================

const SingleLoanDetailsFeeDetailsScreen = ({
  route,
  navigation,
}) => {

    const insets = useSafeAreaInsets();
  // ===================================================
  // ROUTE DATA
  // ===================================================

  const emi =
    route?.params?.emi || {};

  const loanDetails =
    route?.params?.loanDetails || {};


  // ===================================================
  // AMOUNTS
  // ===================================================

  const loanAmount =
    Number(
      loanDetails?.loanAmount ||
      loanDetails?.amount ||
      0
    );


  const emiAmount =
    Number(
      emi?.emiAmount || 0
    );


  const interestAmount =
    Number(
      emi?.interestAmount || 0
    );


  const principalAmount =
    Number(
      emi?.principalAmount || 0
    );


  const penaltyAmount =
    Number(
      emi?.penaltyAmount || 0
    );


  // ===================================================
  // TOTAL PAYABLE
  // ===================================================

  const totalPayable =
    Number(
      emi?.totalDueAmount ||
      emiAmount ||
      (
        principalAmount +
        interestAmount +
        penaltyAmount
      )
    );


  // ===================================================
  // PAY NOW
  // ===================================================
  //
  // IMPORTANT:
  //
  // Payment API yahan call nahi hogi.
  //
  // Sirf Complete EMI screen par navigate
  // karenge.
  //
  // createEMIPayment API -> CompleteEMIScreen
  //
  // ===================================================

  const handlePayNow = () => {

    navigation.navigate(
      "single-loan-detail-complete-emi-screen",
      {
        emi,
        loanDetails,
      }
    );

  };


  // ===================================================
  // UI
  // ===================================================

  return (

    <SafeAreaView

    edges={['bottom' ,'right' ,'left']}
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


      {/* =================================================
          HEADER
      ================================================= */}

      <View
        style={{
          paddingTop: insets.top+4,
          backgroundColor:
            "#FFFFFF",

          paddingHorizontal:
            20,
        }}
      >

        <BackButton
          title="Fee Details"
          onPress={() =>
            navigation.goBack()
          }
          containerStyle={{
            paddingTop:
              theme?.spacing?.sm || 8,

            paddingBottom:
              theme?.spacing?.sm || 8,
          }}
        />

      </View>


      {/* =================================================
          CONTENT
      ================================================= */}

      <View
        style={{
          flex: 1,

          padding:
            20,
        }}
      >

        <View
          style={{
            backgroundColor:
              "#FFFFFF",

            borderRadius:
              16,

            padding:
              20,
          }}
        >

          {/* =============================================
              LOAN AMOUNT
          ============================================== */}

          <View
            style={{
              flexDirection:
                "row",

              justifyContent:
                "space-between",

              alignItems:
                "center",

              marginBottom:
                16,
            }}
          >

            <Text
              style={{
                fontSize:
                  16,

                fontFamily:
                  theme?.fonts?.regular ||
                  "Manrope-Regular",

                color:
                  "#60758D",
              }}
            >
              Loan Amount
            </Text>


            <Text
              style={{
                fontSize:
                  18,

                fontFamily:
                  theme?.fonts?.bold ||
                  "Manrope-Bold",

                color:
                  "#172B3A",
              }}
            >
              ₹
              {loanAmount.toLocaleString(
                "en-IN"
              )}
            </Text>

          </View>


          {/* =============================================
              TOTAL FEES
          ============================================== */}

          <View
            style={{
              flexDirection:
                "row",

              justifyContent:
                "space-between",

              alignItems:
                "center",

              marginBottom:
                8,
            }}
          >

            <View
              style={{
                flexDirection:
                  "row",

                alignItems:
                  "center",

                gap:
                  6,
              }}
            >

              <Text
                style={{
                  fontSize:
                    16,

                  fontFamily:
                    theme?.fonts?.regular ||
                    "Manrope-Regular",

                  color:
                    "#60758D",
                }}
              >
                Total fees charges
              </Text>


              <ChevronDown
                size={
                  16
                }
                color={
                  "#8A9AAF"
                }
              />

            </View>


            <Text
              style={{
                fontSize:
                  17,

                fontFamily:
                  theme?.fonts?.bold ||
                  "Manrope-Bold",

                color:
                  "#172B3A",
              }}
            >
              ₹
              {interestAmount.toLocaleString(
                "en-IN"
              )}
            </Text>

          </View>


          {/* DESCRIPTION */}

          <Text
            style={{
              fontSize:
                13,

              fontFamily:
                theme?.fonts?.regular ||
                "Manrope-Regular",

              color:
                "#91A1B4",

              marginBottom:
                20,
            }}
          >
            Interest / applicable charges
          </Text>


          {/* DIVIDER */}

          <View
            style={{
              borderTopWidth:
                1,

              borderTopColor:
                "#D1D5DB",

              borderStyle:
                "dashed",

              marginBottom:
                20,
            }}
          />


          {/* =============================================
              EMI AMOUNT
          ============================================== */}

          <View
            style={{
              flexDirection:
                "row",

              justifyContent:
                "space-between",

              alignItems:
                "center",
            }}
          >

            <Text
              style={{
                fontSize:
                  16,

                fontFamily:
                  theme?.fonts?.medium ||
                  "Manrope-Medium",

                color:
                  "#42566D",
              }}
            >
              EMI Amount
            </Text>


            <Text
              style={{
                fontSize:
                  21,

                fontFamily:
                  theme?.fonts?.bold ||
                  "Manrope-Bold",

                color:
                  "#172B3A",
              }}
            >
              ₹
              {totalPayable.toLocaleString(
                "en-IN"
              )}
            </Text>

          </View>

        </View>

      </View>


      {/* =================================================
          PAY NOW
      ================================================= */}

      <View
        style={{
          padding:
            20,

          paddingBottom:
            24,

          backgroundColor:
            "#FFFFFF",

          borderTopWidth:
            1,

          borderTopColor:
            "#F1F3F5",
        }}
      >

        <CommonButton
          title="Pay Now"
          onPress={
            handlePayNow
          }
          rightIcon={
            <ExternalLink
              size={
                18
              }
              color={
                "#FFFFFF"
              }
            />
          }
          fullWidth
        />

      </View>

    </SafeAreaView>

  );

};


export default SingleLoanDetailsFeeDetailsScreen;