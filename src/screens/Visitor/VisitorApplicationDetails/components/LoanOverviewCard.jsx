import React from "react";

import {
  View,
  Text,
} from "react-native";

import { theme } from "../../../../theme";


const LoanOverviewCard = ({
  loan = {},
}) => {

  // =====================================================
  // ACTUAL API FIELDS
  // =====================================================

  const applicationId =
    loan?.applicationId || "—";


  const status =
    loan?.status || "—";


  // =====================================================
  // STATUS LABEL
  // =====================================================

  const getStatusLabel = () => {

    switch (status) {

      case "VISITOR_ASSIGNED":
        return "Assigned";

      case "IN_PROGRESS":
        return "In Progress";

      case "COMPLETED":
        return "Completed";

      case "PENDING":
        return "Pending";

      default:
        return status
          ?.replaceAll("_", " ")
          ?.toLowerCase()
          ?.replace(/\b\w/g, (char) =>
            char.toUpperCase()
          ) || "—";
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
          TOP ROW
      ================================================= */}

      <View
        style={{
          flexDirection: "row",

          justifyContent:
            "space-between",

          alignItems:
            "flex-start",
        }}
      >

        {/* =================================================
            LOAN ID
        ================================================= */}

        <View
          style={{
            flex: 1,
          }}
        >

          <Text
            style={{
              fontSize:
                theme.typography.b1,

              fontFamily:
                theme.fonts.bold,

              color:
                
              '#76777D',

              textTransform:
                "uppercase",

              letterSpacing:
                0.6,
            }}
          >
            Loan ID
          </Text>


          <Text
            style={{
              marginTop:
                2,

              fontSize:
                theme.typography.h3,

              fontFamily:
                theme.fonts.bold,

              color:
                theme.colors.black,

             
            }}
          >
            {applicationId}
          </Text>

        </View>


        {/* =================================================
            STATUS
        ================================================= */}

        <View
          style={{
            flexDirection:
              "row",

            alignItems:
              "center",

            backgroundColor:
              "#FFF4C7",

            paddingHorizontal:
              theme.spacing.md,

            paddingVertical:
              theme.spacing.sm,

            borderRadius:
              theme.radius.md,
          }}
        >

          {/* STATUS DOT */}

          <View
            style={{
              width: 9,

              height: 9,

              borderRadius: 9,

              backgroundColor:
                "#E9A900",

              marginRight:
                theme.spacing.xs,
            }}
          />


          {/* STATUS TEXT */}

          <Text
            style={{
              fontSize:
                theme.typography.b3,

              fontFamily:
                theme.fonts.bold,

              color:
                "#8A5A00",
            }}
          >
            {getStatusLabel()}
          </Text>

        </View>

      </View>

    </View>
  );
};


export default LoanOverviewCard;