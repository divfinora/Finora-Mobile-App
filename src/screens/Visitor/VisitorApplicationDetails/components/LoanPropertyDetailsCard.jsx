import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  Building2,
  Copy,
  MapPin,
} from "lucide-react-native";

import { theme } from "../../../../theme";


const LoanPropertyDetailsCard = ({
  loan = {},
  onCopyAddress,
}) => {

  const loanType =
    loan?.productSnapshot?.displayName ||
    loan?.productSnapshot?.loanType ||
    loan?.loanType ||
    "Home Loan";


  const amount =
    loan?.amount ||
    loan?.loanAmount ||
    0;


  const propertyAddress =
    loan?.propertyAddress ||
    loan?.address ||
    loan?.customerAddress ||
    "—";


  const assignedDate =
    loan?.assignedDate ||
    loan?.createdAt ||
    loan?.applicationDate;


  const mapImage =
    loan?.mapImage ||
    loan?.locationImage ||
    loan?.propertyMapImage;


  const formatAmount = (value) => {

    if (!value) {
      return "₹0";
    }

    return `₹${Number(value).toLocaleString(
      "en-IN"
    )}`;
  };


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
      }}
    >

      {/* TITLE */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",

          marginBottom:
            theme.spacing.xl,
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
              theme.typography.h5,

            fontFamily:
              theme.fonts.headingBold,

            color:
              theme.colors.textPrimary,
          }}
        >
          Loan & Property Details
        </Text>

      </View>


      {/* LOAN TYPE */}

      <View
        style={{
          marginBottom:
            theme.spacing.md,
        }}
      >

        <Text
          style={{
            fontSize:
              theme.typography.b4,

            fontFamily:
              theme.fonts.medium,

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
            marginTop:
              theme.spacing.xs,

            fontSize:
              theme.typography.h5,

            fontFamily:
              theme.fonts.medium,

            color:
              theme.colors.textPrimary,
          }}
        >
          {loanType}
        </Text>

      </View>


      {/* LOAN AMOUNT */}

      <View
        style={{
          marginBottom:
            theme.spacing.md,
        }}
      >

        <Text
          style={{
            fontSize:
              theme.typography.b4,

            fontFamily:
              theme.fonts.medium,

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
            marginTop:
              theme.spacing.xs,

            fontSize:
              theme.typography.h5,

            fontFamily:
              theme.fonts.headingBold,

            color:
              theme.colors.textPrimary,
          }}
        >
          {formatAmount(amount)}
        </Text>

      </View>


      {/* PROPERTY ADDRESS */}

      <View>

        <Text
          style={{
            fontSize:
              theme.typography.b4,

            fontFamily:
              theme.fonts.medium,

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
            alignItems: "flex-start",

            marginTop:
              theme.spacing.xs,
          }}
        >

          <Text
            style={{
              flex: 1,

              fontSize:
                theme.typography.h5,

              fontFamily:
                theme.fonts.medium,

              color:
                theme.colors.textPrimary,

              lineHeight: 24,
            }}
          >
            {propertyAddress}
          </Text>


          <TouchableOpacity
            activeOpacity={0.7}
            onPress={
              onCopyAddress
            }
            style={{
              padding:
                theme.spacing.xs,

              marginLeft:
                theme.spacing.sm,
            }}
          >

            <Copy
              size={20}
              color={
                theme.colors.primary500
              }
              strokeWidth={2}
            />

          </TouchableOpacity>

        </View>

      </View>


      {/* ASSIGNED DATE */}

      <View
        style={{
          marginTop:
            theme.spacing.lg,
        }}
      >

        <Text
          style={{
            fontSize:
              theme.typography.b4,

            fontFamily:
              theme.fonts.medium,

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
            marginTop:
              theme.spacing.xs,

            fontSize:
              theme.typography.h5,

            fontFamily:
              theme.fonts.medium,

            color:
              theme.colors.textPrimary,
          }}
        >
          {formatDate(assignedDate)}
        </Text>

      </View>


      {/* MAP */}

      {mapImage ? (

        <View
          style={{
            marginTop:
              theme.spacing.lg,

            height: 170,

            borderRadius:
              theme.radius.lg,

            overflow: "hidden",
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


          <View
            style={{
              position: "absolute",

              right: 15,
              bottom: 15,

              width: 42,
              height: 42,

              borderRadius: 21,

              backgroundColor:
                theme.colors.white,

              alignItems: "center",
              justifyContent: "center",

              ...theme.shadow.md,
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
            />

          </View>

        </View>

      ) : null}

    </View>
  );
};


export default LoanPropertyDetailsCard;