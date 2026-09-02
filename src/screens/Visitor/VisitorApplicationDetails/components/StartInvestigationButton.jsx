import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  PlayCircle,
} from "lucide-react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import { theme } from "../../../../theme";


const StartInvestigationButton = ({
  loanId,
  loan = {},
  customer = {},
}) => {

  const navigation =
    useNavigation();


  // =====================================================
  // LOAN STATUS
  // =====================================================

  const loanStatus =
    String(
      loan?.status || ""
    ).toUpperCase();


  // =====================================================
  // SHOW BUTTON
  // VISITOR_ASSIGNED / IN_PROGRESS
  // =====================================================

  const shouldShow =
    loanStatus === "VISITOR_ASSIGNED" ||
    loanStatus === "IN_PROGRESS";


  // =====================================================
  // TARGET STATUS
  // =====================================================

  const targetStatus =
    loanStatus === "VISITOR_ASSIGNED"
      ? "IN_PROGRESS"
      : loanStatus;


  // =====================================================
  // HIDE BUTTON
  // =====================================================

  if (!shouldShow) {
    return null;
  }


  // =====================================================
  // START INVESTIGATION
  // =====================================================

  const handleStartInvestigation = () => {

    navigation.navigate(
      "visitor-investingation-screen",
      {
        // ===============================================
        // SAME LOAN ID
        // ===============================================

        loanId,


        // ===============================================
        // START FROM STEP 2
        // ===============================================

        step: 2,


        // ===============================================
        // COMPLETE JOB OBJECT
        // ===============================================

        job: {
          ...loan,

          loanId,

          customer,
        },
      }
    );

  };


  // =====================================================
  // UI
  // =====================================================

  return (
    <View
      style={{
        backgroundColor:
          theme.colors.white,

        paddingHorizontal:
          theme.spacing.xl,

        paddingTop:
          theme.spacing.md,

        paddingBottom:
          theme.spacing.md,

        borderTopWidth:
          1,

        borderTopColor:
          theme.colors.gray200,
      }}
    >

      {/* =================================================
          START BUTTON
      ================================================= */}

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={
          handleStartInvestigation
        }
        style={{
          height: 56,

          borderRadius:
            theme.button.borderRadius,

          backgroundColor:
            theme.button.primary
              .backgroundColor,

          flexDirection: "row",

          alignItems: "center",

          justifyContent: "center",
        }}
      >

        <PlayCircle
          size={21}
          color={
            theme.colors.white
          }
          strokeWidth={2.2}
        />


        <Text
          style={{
            marginLeft:
              theme.spacing.sm,

            fontSize:
              theme.typography.button,

            fontFamily:
              theme.fonts.bold,

            color:
              theme.colors.white,
          }}
        >
          Start Investigation
        </Text>

      </TouchableOpacity>


      {/* =================================================
          INFO
      ================================================= */}

      <Text
        style={{
          textAlign: "center",

          marginTop:
            theme.spacing.sm,

          fontSize:
            theme.typography.caption,

          fontFamily:
            theme.fonts.medium,

          color:
            theme.colors.textSecondary,
        }}
      >
        ⓘ Starts timer and updates status to{" "}

        <Text
          style={{
            color:
              theme.colors.primary500,

            fontFamily:
              theme.fonts.semiBold,
          }}
        >
          {targetStatus}
        </Text>

      </Text>

    </View>
  );
};


export default StartInvestigationButton;