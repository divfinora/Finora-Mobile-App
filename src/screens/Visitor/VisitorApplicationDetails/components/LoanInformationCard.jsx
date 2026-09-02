import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  Building2,
  Copy,
  MapPin,
} from "lucide-react-native";

import { theme } from "../../../../theme";


const LoanInformationCard = ({
  loan = {},
  onCopyAddress,
}) => {

  // =====================================================
  // ACTUAL API FIELDS
  // =====================================================

  const loanType =
    loan?.productSnapshot?.displayName || "—";

  const loanAmount =
    loan?.amount ?? null;

  const assignedDate =
    loan?.visitorAssignedAt || null;


  // =====================================================
  // PROPERTY DATA
  // Backend me field aane par use hoga
  // =====================================================

  const propertyAddress =
    loan?.propertyAddress || null;

  const mapImage =
    loan?.mapImage || null;


  // =====================================================
  // FORMAT CURRENCY
  // =====================================================

  const formatCurrency = (value) => {

    if (
      value === null ||
      value === undefined
    ) {
      return "—";
    }

    const amount =
      Number(value);

    if (Number.isNaN(amount)) {
      return "—";
    }

    return `₹${amount.toLocaleString(
      "en-IN"
    )}`;
  };


  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (value) => {

    if (!value) {
      return "—";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "—";
    }

    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  // =====================================================
  // COPY ADDRESS
  // =====================================================

  const handleCopyAddress = () => {

    if (
      !propertyAddress
    ) {
      return;
    }

    if (
      typeof onCopyAddress ===
      "function"
    ) {
      onCopyAddress(
        propertyAddress
      );
    }

  };


  return (
    <View
      style={{
        backgroundColor:
          theme.colors.white,

        borderRadius:
          theme.radius.xl,

        padding:
          theme.spacing.xl,

        marginBottom:
          theme.spacing.lg,
           borderColor:
                    theme.colors.gray200,
           borderWidth: 0.4,
           ...theme.shadows.card
      }}
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <View
        style={{
          flexDirection: "row",

          alignItems: "center",

          marginBottom:
            theme.spacing.lg,
            
        }}
        
      >

        <Building2
          size={21}
          color={
            theme.colors.primary500
          }
          strokeWidth={2.2}
        />

        <Text
          style={{
            marginLeft:
              theme.spacing.sm,

            fontSize:
              theme.typography.h4,

            fontFamily:
              theme.fonts.semiBold,

            color:
              theme.colors.text,
          }}
        >
          Loan & Property Details
        </Text>

      </View>


      {/* =================================================
          LOAN TYPE
      ================================================= */}

      <View
        style={{
          marginBottom:
            theme.spacing.md,
        }}
      >

        <Text
          style={{
            fontSize:
              theme.typography.b3,

            fontFamily:
              theme.fonts.semiBold,

            color:
              theme.colors.textSecondary,

            textTransform:
              "uppercase",
          }}
        >
          Loan Type
        </Text>


        <Text
          style={{
            marginTop: 2,

            fontSize:
              theme.typography.h4,

            fontFamily:
              theme.fonts.semiBold,

            color:
              theme.colors.text,
          }}
        >
          {loanType}
        </Text>

      </View>


      {/* =================================================
          LOAN AMOUNT
      ================================================= */}

      <View
        style={{
          marginBottom:
            theme.spacing.md,
        }}
      >

        <Text
          style={{
            fontSize:
              theme.typography.b3,

            fontFamily:
              theme.fonts.semiBold,

            color:
              theme.colors.textSecondary,

            textTransform:
              "uppercase",
          }}
        >
          Loan Amount
        </Text>


        <Text
          style={{
            marginTop: 2,

            fontSize:
              theme.typography.h4,

            fontFamily:
              theme.fonts.semiBold,

            color:
              theme.colors.text,
          }}
        >
          {formatCurrency(
            loanAmount
          )}
        </Text>

      </View>


      {/* =================================================
          PROPERTY ADDRESS
      ================================================= */}

      {propertyAddress && (
        <View
          style={{
            marginBottom:
              theme.spacing.md,
          }}
        >

          <Text
            style={{
              fontSize:
                theme.typography.b3,

              fontFamily:
                theme.fonts.semiBold,

              color:
                theme.colors.textSecondary,

              textTransform:
                "uppercase",
            }}
          >
            Property Address
          </Text>


          <View
            style={{
              flexDirection: "row",

              alignItems:
                "flex-start",

              marginTop: 2,
            }}
          >

            <Text
              style={{
                flex: 1,

                fontSize:
                  theme.typography.h4,

                fontFamily:
                  theme.fonts.semiBold,

                color:
                  theme.colors.text,

                lineHeight: 25,
              }}
            >
              {propertyAddress}
            </Text>


            <TouchableOpacity
              activeOpacity={0.7}
              onPress={
                handleCopyAddress
              }
              style={{
                marginLeft:
                  theme.spacing.sm,

                padding:
                  2,
              }}
            >

              <Copy
                size={21}
                color={
                  theme.colors.primary500
                }
                strokeWidth={2}
              />

            </TouchableOpacity>

          </View>

        </View>
      )}


      {/* =================================================
          ASSIGNED DATE
      ================================================= */}

      <View
        style={{
          marginBottom:
            mapImage
              ? theme.spacing.lg
              : 0,
        }}
      >

        <Text
          style={{
            fontSize:
              theme.typography.b3,

            fontFamily:
              theme.fonts.semiBold,

            color:
              theme.colors.textSecondary,

            textTransform:
              "uppercase",
          }}
        >
          Assigned Date
        </Text>


        <Text
          style={{
            marginTop: 2,

            fontSize:
              theme.typography.h4,

            fontFamily:
              theme.fonts.semiBold,

            color:
              theme.colors.text,
          }}
        >
          {formatDate(
            assignedDate
          )}
        </Text>

      </View>


      {/* =================================================
          MAP
      ================================================= */}

      {mapImage && (
        <View
          style={{
            height: 170,

            marginTop:
              theme.spacing.sm,

            borderRadius:
              theme.radius.lg,

            overflow: "hidden",

            position: "relative",
          }}
        >

          <Image
            source={{
              uri: mapImage,
            }}
            style={{
              width: "100%",

              height: "100%",
            }}
            resizeMode="cover"
          />


          {/* LOCATION BUTTON */}

          <View
            style={{
              position: "absolute",

              right: 16,

              bottom: 16,

              width: 42,

              height: 42,

              borderRadius: 21,

              backgroundColor:
                theme.colors.white,

              alignItems: "center",

              justifyContent:
                "center",
            }}
          >

            <MapPin
              size={21}
              color={
                theme.colors.primary500
              }
              fill={
                theme.colors.primary500
              }
              strokeWidth={2}
            />

          </View>

        </View>
      )}

    </View>
  );
};


export default LoanInformationCard;