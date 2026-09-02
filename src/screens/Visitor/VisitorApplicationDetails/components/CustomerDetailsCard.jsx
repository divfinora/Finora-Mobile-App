import React from "react";

import {
  View,
  Text,
} from "react-native";

import {
  UserRound,
} from "lucide-react-native";

import { theme } from "../../../../theme";


const CustomerDetailsCard = ({
  customer = {},
}) => {

  const customerName =
    customer?.fullName || "—";

  const mobile =
    customer?.mobile || "—";

  const email =
    customer?.email || "—";

  const occupation =
    customer?.occupation || "—";


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

      {/* HEADER */}

      <View
        style={{
          flexDirection: "row",

          alignItems: "center",

          marginBottom:
            theme.spacing.xl,
        }}
      >

        <UserRound
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
          Applicant Information
        </Text>

      </View>


      {/* CUSTOMER NAME */}

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
          Customer Name
        </Text>

        <Text
          style={{
            marginTop:
              2 ,

            fontSize:
              theme.typography.h4,

            fontFamily:
              theme.fonts.semiBold,

            color:
              theme.colors.text,
          }}
        >
          {customerName}
        </Text>

      </View>


      {/* MOBILE */}

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
          Mobile
        </Text>

        <Text
          style={{
            marginTop:
              2 ,

            fontSize:
              theme.typography.h4,

            fontFamily:
              theme.fonts.semiBold,

            color:
              theme.colors.primary500,
          }}
        >
          {mobile !== "—"
            ? `+91 ${mobile}`
            : "—"}
        </Text>

      </View>


      {/* EMAIL */}

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
          Email
        </Text>

        <Text
          style={{
            marginTop:
              2 ,

            fontSize:
              theme.typography.h4,

            fontFamily:
              theme.fonts.semiBold,

            color:
              theme.colors.text,
          }}
        >
          {email}
        </Text>

      </View>


      {/* OCCUPATION */}

      <View>

        <Text
          style={{
            fontSize:
              theme.typography.b3,

            fontFamily:
              theme.fonts.medium,

            color:
              theme.colors.textSecondary,

            textTransform:
              "uppercase",
          }}
        >
          Occupation
        </Text>

        <Text
          style={{
            marginTop:
              2,

            fontSize:
              theme.typography.h4,

            fontFamily:
              theme.fonts.semiBold,

            color:
              theme.colors.text,
          }}
        >
          {occupation}
        </Text>

      </View>

    </View>
  );
};


export default CustomerDetailsCard;