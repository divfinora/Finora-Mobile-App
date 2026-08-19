import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  ChevronRight,
  Percent,
  CalendarDays,
  Check,
} from "lucide-react-native";

import { theme } from "../../../../theme";


const LoanOfferCard = ({
  loan,
  onPress,
}) => {

  // ==========================================
  // API DATA
  // ==========================================

  const minAmount =
    loan?.amount?.min ??
    loan?.minAmount ??
    0;

  const maxAmount =
    loan?.amount?.max ??
    loan?.maxAmount ??
    0;


  const minTenure =
    loan?.tenure?.min ??
    loan?.minTenure ??
    0;

  const maxTenure =
    loan?.tenure?.max ??
    loan?.maxTenure ??
    0;


  const interestRate =
    loan?.interest?.rate ??
    loan?.interestRate ??
    0;

  const interestType =
    loan?.interest?.type ??
    loan?.interestType ??
    "";


  const processingFee =
    loan?.charges?.processingFee ??
    loan?.processingFee ??
    0;

  const processingFeeType =
    loan?.charges?.processingFeeType ??
    loan?.processingFeeType ??
    "";


  const processingType =
    loan?.processingTypeName ||
    loan?.processingType ||
    "Loan";


  // ==========================================
  // FORMAT AMOUNT
  // ==========================================

  const formatAmount = (value) => {

    if (!value) {
      return "₹0";
    }


    if (value >= 10000000) {

      return `₹${(
        value / 10000000
      ).toFixed(1)} Cr`;

    }


    if (value >= 100000) {

      return `₹${(
        value / 100000
      ).toFixed(1)} L`;

    }


    if (value >= 1000) {

      return `₹${(
        value / 1000
      ).toFixed(0)}K`;

    }


    return `₹${Number(
      value
    ).toLocaleString("en-IN")}`;
  };


  // ==========================================
  // AMOUNT RANGE
  // ==========================================

  const formatAmountRange = () => {

    if (
      minAmount === maxAmount
    ) {

      return formatAmount(
        maxAmount
      );

    }


    return `${formatAmount(
      minAmount
    )} - ${formatAmount(
      maxAmount
    )}`;
  };


  // ==========================================
  // TENURE
  // ==========================================

  const formatTenure = () => {

    if (
      minTenure === maxTenure
    ) {

      return `${maxTenure} Months`;

    }


    return `${minTenure} to ${maxTenure} Months`;
  };


  // ==========================================
  // INTEREST TEXT
  // ==========================================

  const formatInterest = () => {

    if (!interestRate) {
      return "N/A";
    }


    if (
      interestType === "REDUCING"
    ) {

      return `${interestRate}% onwards`;

    }


    if (
      interestType === "FLAT"
    ) {

      return `${interestRate}% Flat`;

    }


    return `${interestRate}%`;
  };


  // ==========================================
  // PROCESSING FEE
  // ==========================================

  const formatProcessingFee = () => {

    if (!processingFee) {
      return "N/A";
    }


    if (
      processingFeeType === "PERCENTAGE"
    ) {

      return `${processingFee}%`;

    }


    return `₹${Number(
      processingFee
    ).toLocaleString("en-IN")}`;
  };


  // ==========================================
  // CARD
  // ==========================================

  return (

    <TouchableOpacity
      activeOpacity={0.92}

      onPress={() =>
        onPress?.(loan)
      }

      style={{
        marginHorizontal:
          theme.spacing.xl,

        marginBottom:
          theme.spacing.lg,

        backgroundColor:
          theme.colors.white,

        borderRadius:
          theme.radius.xl,

        borderWidth: 1,

        borderColor:
          "#F4DFC5",

        overflow: "hidden",

        ...theme.shadows.card,
      }}
    >

      <View
        style={{
          padding:
            theme.spacing.lg,
        }}
      >

        {/* ================================= */}
        {/* TOP */}
        {/* ================================= */}

        <View
          style={{
            flexDirection: "row",

            alignItems: "center",

            justifyContent:
              "space-between",
          }}
        >

          <View
            style={{
              flex: 1,

              marginRight:
                theme.spacing.md,
            }}
          >

            {/* LOAN NAME */}

            <Text
              numberOfLines={2}
              style={{
                color:
                  theme.colors.navy900,

                fontSize:
                  theme.typography.h4,

                lineHeight:
                  theme.lineHeight.h4,

                fontFamily:
                  theme.fonts.headingBold,
              }}
            >
              {loan?.name ||
                "Loan Offer"}
            </Text>


            {/* PROCESSING TYPE */}

            <Text
              numberOfLines={1}
              style={{
                marginTop: 4,

                color:
                  theme.colors.gray500,

                fontSize:
                  theme.typography.b3,

                fontFamily:
                  theme.fonts.medium,
              }}
            >
              {processingType}
            </Text>

          </View>


          {/* APPLY BUTTON */}

          <TouchableOpacity
            activeOpacity={0.8}

            onPress={() =>
              onPress?.(loan)
            }

            style={{
              minWidth: 88,

              height: 40,

              borderRadius: 12,

              backgroundColor:
                theme.colors.primary500,

              alignItems:
                "center",

              justifyContent:
                "center",

              paddingHorizontal: 12,
            }}
          >

            <Text
              style={{
                color:
                  theme.colors.white,

                fontSize:
                  theme.typography.b3,

                fontFamily:
                  theme.fonts.bold,
              }}
            >
              Apply Now
            </Text>

          </TouchableOpacity>

        </View>


        {/* ================================= */}
        {/* LOAN AMOUNT */}
        {/* ================================= */}

        <View
          style={{
            marginTop:
              theme.spacing.lg,
          }}
        >

          <Text
            style={{
              color:
                theme.colors.gray500,

              fontSize:
                theme.typography.b3,

              fontFamily:
                theme.fonts.medium,
            }}
          >
            Loan Amount
          </Text>


          <Text
            style={{
              marginTop: 3,

              color:
                theme.colors.black,

              fontSize: 24,

              fontFamily:
                theme.fonts.headingBold,
            }}
          >
            {formatAmountRange()}
          </Text>

        </View>


        {/* ================================= */}
        {/* DETAILS */}
        {/* ================================= */}

        <View
          style={{
            flexDirection: "row",

            marginTop:
              theme.spacing.lg,

            paddingTop:
              theme.spacing.md,

            borderTopWidth: 1,

            borderTopColor:
              theme.colors.gray100,
          }}
        >

          {/* =============================== */}
          {/* INTEREST */}
          {/* =============================== */}

          <View
            style={{
              flex: 1,
            }}
          >

            <View
              style={{
                flexDirection: "row",

                alignItems:
                  "center",
              }}
            >

              <Percent
                size={14}
                color={
                  theme.colors.primary500
                }
              />

              <Text
                style={{
                  marginLeft: 5,

                  color:
                    theme.colors.gray500,

                  fontSize:
                    theme.typography.b3,

                  fontFamily:
                    theme.fonts.medium,
                }}
              >
                Interest
              </Text>

            </View>


            <Text
              style={{
                marginTop: 5,

                color:
                  theme.colors.navy900,

                fontSize:
                  theme.typography.b2,

                fontFamily:
                  theme.fonts.bold,
              }}
            >
              {formatInterest()}
            </Text>

          </View>


          {/* =============================== */}
          {/* TENURE */}
          {/* =============================== */}

          <View
            style={{
              flex: 1,
            }}
          >

            <View
              style={{
                flexDirection: "row",

                alignItems:
                  "center",
              }}
            >

              <CalendarDays
                size={14}
                color={
                  theme.colors.primary500
                }
              />

              <Text
                style={{
                  marginLeft: 5,

                  color:
                    theme.colors.gray500,

                  fontSize:
                    theme.typography.b3,

                  fontFamily:
                    theme.fonts.medium,
                }}
              >
                Tenure
              </Text>

            </View>


            <Text
              style={{
                marginTop: 5,

                color:
                  theme.colors.navy900,

                fontSize:
                  theme.typography.b2,

                fontFamily:
                  theme.fonts.bold,
              }}
            >
              {formatTenure()}
            </Text>

          </View>

        </View>


        {/* ================================= */}
        {/* PROCESSING FEE */}
        {/* ================================= */}

        <View
          style={{
            marginTop:
              theme.spacing.lg,

            flexDirection: "row",

            alignItems:
              "center",
          }}
        >

          <View
            style={{
              width: 22,

              height: 22,

              borderRadius: 11,

              backgroundColor:
                theme.colors.primary100,

              alignItems:
                "center",

              justifyContent:
                "center",
            }}
          >

            <Check
              size={13}
              color={
                theme.colors.primary700
              }
            />

          </View>


          <Text
            style={{
              marginLeft: 7,

              color:
                theme.colors.gray700,

              fontSize:
                theme.typography.b3,

              fontFamily:
                theme.fonts.medium,
            }}
          >
            Processing Fee:{" "}
            {formatProcessingFee()}
          </Text>

        </View>


        {/* ================================= */}
        {/* VIEW DETAILS */}
        {/* ================================= */}

        {/* <View
          style={{
            marginTop:
              theme.spacing.md,

            flexDirection: "row",

            alignItems:
              "center",

            justifyContent:
              "flex-end",
          }}
        >

          <Text
            style={{
              color:
                theme.colors.primary700,

              fontSize:
                theme.typography.b3,

              fontFamily:
                theme.fonts.semiBold,
            }}
          >
            View loan details
          </Text>


          <ChevronRight
            size={18}
            color={
              theme.colors.primary700
            }
          />

        </View> */}

      </View>

    </TouchableOpacity>
  );
};


export default LoanOfferCard;