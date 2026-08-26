import React, { memo } from "react";

import {
  View,
} from "react-native";

import {
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react-native";

import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  theme,
} from "../../../../theme";

import CommonButton from "../../../../components/common/Button/CommonButton";


// =====================================================
// COMPONENT
// =====================================================

const InvestigationBottomBar = ({
  currentStep = 1,
  totalSteps = 6,

  onBack,
  onNext,

  loading = false,
}) => {

  const insets = useSafeAreaInsets();

  const isFirstStep =
    currentStep === 1;

  const isLastStep =
    currentStep === totalSteps;

  const isSiteDetailsStep =
    currentStep === 3;


  // =====================================================
  // BUTTON TITLE
  // =====================================================

  const getNextButtonTitle = () => {

    if (isLastStep) {
      return "Submit Verification";
    }

    if (isSiteDetailsStep) {
      return "Continue to Verification";
    }

    return "Next";
  };


  // =====================================================
  // BUTTON ICON
  // =====================================================

  const getNextButtonIcon = () => {

    if (isLastStep) {
      return (
        <Check
          size={18}
          color={theme.colors.white}
          strokeWidth={2.3}
        />
      );
    }

    return (
      <ChevronRight
        size={18}
        color={theme.colors.white}
        strokeWidth={2.2}
      />
    );
  };


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <View
      style={{
        backgroundColor: theme.colors.white,

        borderTopWidth: 1,
        borderTopColor: "#EEEEEE",

        paddingHorizontal: theme.spacing.lg,

        paddingTop: theme.spacing.md,

        paddingBottom: Math.max(
          insets.bottom,
          theme.spacing.md
        ),

        flexDirection: "row",

        alignItems: "center",

        gap: theme.spacing.md,
      }}
    >

      {/* =================================================
          BACK BUTTON
      ================================================= */}

      {!isFirstStep && (
        <View
          style={{
            flex: 1,
          }}
        >
          <CommonButton
            title="Back"

            variant="outline"

            onPress={onBack}

            loading={false}

            disabled={loading}

            leftIcon={
              <ChevronLeft
                size={18}
                color={
                  theme.colors.primary500
                }
                strokeWidth={2.2}
              />
            }

            containerStyle={{
              height: 50,

              borderColor: "#FFD0B8",

              backgroundColor:
                theme.colors.white,
            }}
          />
        </View>
      )}


      {/* =================================================
          NEXT / SUBMIT BUTTON
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
          title={getNextButtonTitle()}

          onPress={onNext}

          loading={loading}

          disabled={loading}

          rightIcon={
            !loading
              ? getNextButtonIcon()
              : null
          }

          containerStyle={{
            height: 50,
          }}
        />
      </View>

    </View>
  );
};


export default memo(
  InvestigationBottomBar
);