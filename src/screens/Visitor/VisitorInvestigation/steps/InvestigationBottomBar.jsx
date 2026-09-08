import React, { memo } from "react";

import {
  View,
} from "react-native";

import {
  ChevronRight,
  Check,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";

import CommonButton from "../../../../components/common/Button/CommonButton";


const InvestigationBottomBar = ({
  currentStep = 1,
  totalSteps = 6,

  onSaveDraft,
  onBack,
  onNext,

  loading = false,
}) => {

  const isFirstStep =
    currentStep === 1;

  const isLastStep =
    currentStep === totalSteps;

  const isInvestigationStep =
    currentStep === 2;


  // =====================================================
  // BUTTON TITLE
  // =====================================================

  const getButtonTitle = () => {

    if (isLastStep) {
      return "Submit Verification";
    }

    if (isInvestigationStep) {
      return "Save & Continue";
    }

    if (currentStep === 3) {
      return "Save & Continue";
    }

    return "Next";
  };


  // =====================================================
  // BUTTON ICON
  // =====================================================

  const getButtonIcon = () => {

    // Loading ke time icon nahi dikhega
    if (loading) {
      return null;
    }

    // Submit icon
    if (isLastStep) {

      return (
        <Check
          size={18}
          color={theme.colors.white}
          strokeWidth={2.3}
        />
      );

    }

    // Next icon
    return (
      <ChevronRight
        size={18}
        color={theme.colors.white}
        strokeWidth={2.2}
      />
    );

  };


  // =====================================================
  // BUTTON TEXT STYLE
  // =====================================================

  const buttonTextStyle = {

    fontFamily:
      theme.fonts.semiBold,

    fontWeight:
      "600",

    fontSize:
      14,

    lineHeight:
      20,

    letterSpacing:
      0.14,

    textAlign:
      "center",

  };


  // =====================================================
  // SUBMIT VERIFICATION
  // =====================================================

  // Step 6 par sirf Submit button
  if (isLastStep) {

    return (

      <View
        style={{

          backgroundColor:
            theme.colors.white,

          borderTopWidth:
            1,

          borderTopColor:
            "#EEEEEE",

          paddingHorizontal:
            theme.spacing.lg,

          paddingTop:
            theme.spacing.md,

          paddingBottom:
            theme.spacing.md,

        }}
      >

        <CommonButton

          title="Submit Verification"

          onPress={
            onNext
          }

          loading={
            loading
          }

          disabled={
            loading
          }

          textStyle={
            buttonTextStyle
          }

          containerStyle={{
            height: 50,
          }}

          icon={
            getButtonIcon()
          }

        />

      </View>

    );
  }


  // =====================================================
  // NORMAL STEPS
  // =====================================================

  return (

    <View
      style={{

        backgroundColor:
          theme.colors.white,

        borderTopWidth:
          1,

        borderTopColor:
          "#EEEEEE",

        paddingHorizontal:
          theme.spacing.lg,

        paddingTop:
          theme.spacing.md,

        paddingBottom:
          theme.spacing.md,

        flexDirection:
          "row",

        alignItems:
          "center",

        gap:
          theme.spacing.md,

      }}
    >

      {/* =================================================
          SAVE DRAFT
      ================================================= */}

      {!isFirstStep && (

        <View
          style={{
            flex: 1,
          }}
        >

          <CommonButton
            title="Save Draft"

            variant="outline"

            onPress={
              onSaveDraft
            }

            loading={
              loading
            }

            disabled={
              loading
            }

            textStyle={
              buttonTextStyle
            }

            containerStyle={{
              height: 50,

              borderColor:
                "#FF641F",

              backgroundColor:
                theme.colors.white,
            }}
          />

        </View>

      )}


      {/* =================================================
          NEXT / SAVE & CONTINUE
      ================================================= */}

      <View
        style={{
          flex:
            isFirstStep
              ? 1
              : 1.5,
        }}
      >

        <CommonButton

          title={
            getButtonTitle()
          }

          onPress={
            onNext
          }

          loading={
            loading
          }

          disabled={
            loading
          }

          textStyle={
            buttonTextStyle
          }

          containerStyle={{
            height: 50,
          }}

          icon={
            getButtonIcon()
          }

        />

      </View>

    </View>

  );
};


export default memo(
  InvestigationBottomBar
);