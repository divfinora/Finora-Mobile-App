import React, {
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  Bell,
} from "lucide-react-native";

import {
  theme,
} from "../../../theme";

import BackButtonLinerGradint from "../../../components/common/BackButton/BackButtonLinerGradint.jsx";

import CommonInfoCard from "../../../screens/Loan/LoanApply/commonComponent/CommonInfoCard";

import StepProgress from "../../../screens/Loan/LoanApply/commonComponent/StepProgress";

import InvestigationBottomBar from "./steps/InvestigationBottomBar.jsx";

import VerificationDetails from "./steps/VerificationDetails";

import InvestigationDetails from "./steps/InvestigationDetails";

import SiteDetails from "./steps/SiteDetails";

import WitnessDetails from "./steps/WitnessDetails";

import ReviewInformation from "./steps/ReviewInformation";

import SubmitVerification from "./steps/submitVerification.jsx";
import useHandleMutation from "../../../hooks/useHandleMutation.js";
import { useSaveVisitorInvestigationMutation } from "../../../redux/features/visitor/visitorApi.js";

// =====================================================
// CONSTANTS
// =====================================================

const TOTAL_STEPS = 6;


// =====================================================
// SCREEN
// =====================================================

const VisitorInvestigationScreen = ({
  route,
  navigation,
}) => {

  // =====================================================
  // CURRENT STEP
  // =====================================================

  const [
    currentStep,
    setCurrentStep,
  ] = useState(1);


  // =====================================================
  // INVESTIGATION DATA
  // =====================================================

  const [
    investigationData,
    setInvestigationData,
  ] = useState({
    verification: {},
    investigation: {},
    site: {},
    witness: {},
    review: {},
    declaration: {},
  });


  // =====================================================
  // JOB DATA
  // =====================================================

  const job =
    route?.params?.job || null;

  const insets =
    useSafeAreaInsets();
  // =====================================================
  // STEP TITLE
  // =====================================================

  const stepTitle =
    currentStep === 1
      ? "Verification Details"
      : currentStep === 2
        ? "Investigation Details"
        : currentStep === 3
          ? "Site Details"
          : currentStep === 4
            ? "Witness Details"
            : currentStep === 5
              ? "Review Information"
              : "Submit Verification";


  // =====================================================
  // PROGRESS
  // =====================================================

  const progress = useMemo(() => {

    return Math.round(
      (currentStep / TOTAL_STEPS) * 100
    );

  }, [currentStep]);


  // =====================================================
  // UPDATE INVESTIGATION DATA
  // =====================================================

  const updateInvestigationData = (
    section,
    data
  ) => {

    setInvestigationData(
      (previous) => ({
        ...previous,

        [section]: {
          ...previous?.[section],
          ...data,
        },
      })
    );

  };


  //  Api Call  ---- start
  const [
    saveVisitorInvestigation,
    {
      isLoading: isSavingInvestigation,
    },
  ] = useSaveVisitorInvestigationMutation();
  const {
    handleMutation,
  } = useHandleMutation();

  //  Api Call  ---- end


  // =====================================================
  // NEXT STEP
  // =====================================================

  const handleNext = async () => {

    // ==========================================
    // STEP 2 - SAVE INVESTIGATION
    // ==========================================

    if (currentStep === 2) {

      const payload = {
        loanId: job?.loanId,



        location: {
          latitude:
            investigationData?.investigation
              ?.latitude ?? 0,

          longitude:
            investigationData?.investigation
              ?.longitude ?? 0,
        },

        recommendation:
          investigationData?.investigation
            ?.recommendation || "",

        remarks:
          investigationData?.investigation
            ?.remarks || "",
      };


      console.log(payload, "paylod")

      // ==========================================
      // PAYLOAD CONSOLE
      // ==========================================

      console.log(
        "Investigation API Payload:",
        JSON.stringify(
          payload,
          null,
          2
        )
      );


      const response =
        await handleMutation({

          apiFunc:
            saveVisitorInvestigation,

          params:
            payload,

          showSuccess:
            true,

          customSuccessMsg:
            "Investigation saved successfully",

          onSuccess: () => {

            setCurrentStep(
              previous =>
                previous + 1
            );

          },

        });

      return;
    }

    // ==========================================
    // OTHER STEPS
    // ==========================================

    if (
      currentStep < TOTAL_STEPS
    ) {

      setCurrentStep(
        previous => previous + 1
      );

    }

  };


  // =====================================================
  // BACK
  // =====================================================

  const handleBack = () => {

    if (
      currentStep > 1
    ) {

      setCurrentStep(
        (previous) =>
          previous - 1
      );

      return;
    }

    navigation?.goBack?.();

  };


  // =====================================================
  // NOTIFICATION
  // =====================================================

  const handleNotificationPress = () => {

    // Notification navigation
    // will be added later

  };


  // =====================================================
  // RENDER CURRENT STEP
  // =====================================================

  const renderCurrentStep = () => {

    switch (currentStep) {

      // =================================================
      // STEP 1
      // =================================================

      case 1:

        return (
          <VerificationDetails
            onRefetchReady={setRefetchVerification}

            job={job}
            data={
              investigationData.verification
            }
            onChange={(data) =>
              updateInvestigationData(
                "verification",
                data
              )
            }
          />
        );


      // =================================================
      // STEP 2
      // =================================================

      case 2:

        return (
          <InvestigationDetails
            job={job}
            data={
              investigationData.investigation
            }
            onChange={(data) =>
              updateInvestigationData(
                "investigation",
                data
              )
            }
          />
        );


      // =================================================
      // STEP 3
      // =================================================

      case 3:

        return (
          <SiteDetails
            job={job}
            data={
              investigationData.site
            }
            onChange={(data) =>
              updateInvestigationData(
                "site",
                data
              )
            }
          />
        );


      // =================================================
      // STEP 4
      // =================================================

      case 4:

        return (
          <WitnessDetails
            job={job}
            data={
              investigationData.witness
            }
            onChange={(data) =>
              updateInvestigationData(
                "witness",
                data
              )
            }
          />
        );


      // =================================================
      // STEP 5
      // =================================================

      case 5:

        return (
          <ReviewInformation
            job={job}
            data={investigationData}
            onEditStep={setCurrentStep}
          />
        );


      // =================================================
      // STEP 6
      // =================================================

      case 6:

        return (
          <SubmitVerification
            job={job}
            data={investigationData}
            onChange={(data) =>
              updateInvestigationData(
                "declaration",
                data
              )
            }
          />
        );


      default:
        return null;

    }

  };


  // =====================================================
  // RENDER
  // =====================================================
  const [refreshing, setRefreshing] =
    useState(false);

  const [refetchVerification, setRefetchVerification] =
    useState(null);



  const handleRefresh = async () => {
    if (
      typeof refetchVerification !== "function"
    ) {
      return;
    }

    setRefreshing(true);

    try {
      await refetchVerification();
    } catch (error) {
      console.log(
        "Verification refresh error:",
        error
      );
    } finally {
      setRefreshing(false);
    }
  };

  const [
    verificationRefreshKey,
    setVerificationRefreshKey,
  ] = useState(0);
  return (

    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={{
        flex: 1,

        backgroundColor:
          "#F6F8F7",
      }}
    >

      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
      >

        <View
          style={{
            flex: 1,
          }}
        >

          {/* =================================================
              HEADER
          ================================================= */}

          <View>

            <BackButtonLinerGradint

              title={
                stepTitle
              }

              onPress={
                handleBack
              }

              containerStyle={{
                paddingTop: insets.top,
                paddingHorizontal: theme.spacing.xxl,
              }}

              rightComponent={

                <TouchableOpacity
                  activeOpacity={0.8}

                  onPress={
                    handleNotificationPress
                  }

                  style={{
                    width: 38,

                    height: 38,

                    borderRadius: 12,

                    backgroundColor:
                      "#FFF0D8",

                    alignItems:
                      "center",

                    justifyContent:
                      "center",
                  }}
                >

                  <Bell
                    size={23}
                    color="#FF641F"
                    strokeWidth={2.2}
                  />

                </TouchableOpacity>

              }

            />

          </View>


          {/* =================================================
              CONTENT
          ================================================= */}

          <ScrollView

            showsVerticalScrollIndicator={
              false
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={["#FF641F"]}
                tintColor="#FF641F"
              />
            }
            keyboardShouldPersistTaps="handled"

            contentContainerStyle={{
              paddingHorizontal:
                theme.spacing.xxl,

              paddingTop:
                theme.spacing.md,

              paddingBottom:
                120,
            }}

          >

            {/* =================================================
                COMMON INFO
            ================================================= */}

            <CommonInfoCard />


            {/* =================================================
                STEP PROGRESS
            ================================================= */}

            <StepProgress

              currentStep={
                currentStep
              }

              totalSteps={
                TOTAL_STEPS
              }

              progress={
                progress
              }

            />


            {/* =================================================
                CURRENT STEP
            ================================================= */}

            {renderCurrentStep()}

          </ScrollView>


          {/* =================================================
              BOTTOM BAR
          ================================================= */}

          <InvestigationBottomBar

            currentStep={
              currentStep
            }

            totalSteps={
              TOTAL_STEPS
            }

            onBack={
              handleBack
            }

            onNext={
              handleNext
            }
            loading={isSavingInvestigation}
          />

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );

};


export default VisitorInvestigationScreen;