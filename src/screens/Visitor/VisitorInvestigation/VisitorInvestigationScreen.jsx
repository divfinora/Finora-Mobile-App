import React, {
  useEffect,
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

import {
  useGetVisitorVerificationSummaryQuery,
  useSaveVisitorInvestigationMutation,
  useSaveVisitorWitnessMutation,
  useSubmitVisitorVerificationMutation,
} from "../../../redux/features/visitor/visitorApi.js";

import showToast from "../../../utils/toast.js";

import {
  resetToTab,
} from "../../../navigation/navigationReset.js";


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
  // ROUTE PARAMS
  // =====================================================

  const loanId =
    route?.params?.loanId ||
    route?.params?.job?.loanId;


  const job =
    route?.params?.job || {};


  const routeStep =
    Number(
      route?.params?.step
    ) || 1;


  // =====================================================
  // CURRENT STEP
  // =====================================================

  const [
    currentStep,
    setCurrentStep,
  ] = useState(
    routeStep
  );


  // =====================================================
  // SYNC CURRENT STEP WITH ROUTE PARAM
  // =====================================================

  useEffect(() => {

    const nextStep =
      Number(
        route?.params?.step
      ) || 1;

    setCurrentStep(
      nextStep
    );

  }, [
    route?.params?.step,
  ]);


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
  // VERIFICATION SUMMARY
  // =====================================================

  const {
    data: verificationSummary,
    isLoading: isSummaryLoading,
    isFetching: isSummaryFetching,
    isError: isSummaryError,
    refetch: refetchSummary,
  } =
    useGetVisitorVerificationSummaryQuery(
      loanId,
      {
        skip: !loanId,
      }
    );


  //  ====================================
  // Section Wise Pre fill Data  

  useEffect(() => {
    const investigation =
      verificationSummary?.data?.investigationDetails;

    if (!investigation) {
      return;
    }

    const location =
      investigation?.location || {};

    setInvestigationData((previous) => ({
      ...previous,

      investigation: {
        ...previous?.investigation,

        // INPUT FIELDS ONLY
        description:
          investigation?.description || "",

        latitude:
          location?.latitude ?? null,

        longitude:
          location?.longitude ?? null,

        address:
          location?.address || "",

        recommendation:
          investigation?.recommendation || "",

        remarks:
          investigation?.remarks || "",
      },
    }));
  }, [verificationSummary]);
  //  ===================================
  // =====================================================
  // SAFE AREA
  // =====================================================

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

  const progress =
    useMemo(() => {

      return Math.round(
        (currentStep / TOTAL_STEPS) * 100
      );

    }, [
      currentStep,
    ]);


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


  // =====================================================
  // API CALL - INVESTIGATION
  // =====================================================

  const [
    saveVisitorInvestigation,
    {
      isLoading:
      isSavingInvestigation,
    },
  ] =
    useSaveVisitorInvestigationMutation();


  const {
    handleMutation,
  } =
    useHandleMutation();


  // =====================================================
  // API CALL - WITNESS
  // =====================================================

  const [
    saveVisitorWitness,
    {
      isLoading:
      isSavingWitness,
    },
  ] =
    useSaveVisitorWitnessMutation();


  // =====================================================
  // API CALL - FINAL SUBMIT
  // =====================================================

  const [
    submitVisitorVerification,
    {
      isLoading:
      isSubmittingVerification,
    },
  ] =
    useSubmitVisitorVerificationMutation();


  // =====================================================
  // NEXT STEP
  // =====================================================

  const handleNext = async () => {

    // ===================================================
    // STEP 2 - SAVE INVESTIGATION
    // ===================================================

    if (currentStep === 2) {

      const description =
        investigation?.description?.trim();
      const investigation =
        investigationData?.investigation || {};


      const latitude =
        investigation?.latitude;


      const longitude =
        investigation?.longitude;


      const address =
        investigation?.address?.trim();
 

      const recommendation =
        investigation?.recommendation?.trim();


      const remarks =
        investigation?.remarks?.trim();


      const payload = {

        loanId:
          loanId,

        location: {

          latitude,

          longitude,

        },

        address,

        recommendation:"APPROVED",

        remarks,
        description

      };


      console.log(
        "Investigation API Payload:",
        JSON.stringify(
          payload,
          null,
          2
        )
      );


      await handleMutation({

        apiFunc:
          saveVisitorInvestigation,

        params:
          payload,

        showSuccess:
          false,

        onSuccess: () => {

          setCurrentStep(
            previous =>
              previous + 1
          );

        },

      });


      return;
    }


    // =====================================================
    // STEP 4 - SAVE WITNESS
    // =====================================================

    if (currentStep === 4) {

      const witness =
        investigationData?.witness || {};


      // ===================================================
      // BASIC VALUES
      // ===================================================

      const fullName =
        witness?.witnessName?.trim();


      const mobile =
        witness?.mobileNumber?.trim();


      const relation =
        witness?.relation?.trim();


      const agreed =
        witness?.witnessConfirmed === true;


      // ===================================================
      // VALIDATION
      // ===================================================

      if (!fullName) {

        showToast.error(
          "Please enter witness name."
        );

        return;
      }


      if (!mobile) {

        showToast.error(
          "Please enter mobile number."
        );

        return;
      }


      if (
        !/^[6-9]\d{9}$/.test(
          mobile
        )
      ) {

        showToast.error(
          "Please enter a valid 10-digit mobile number."
        );

        return;
      }


      if (!relation) {

        showToast.error(
          "Please select relation to applicant."
        );

        return;
      }


      if (!agreed) {

        showToast.error(
          "Please confirm witness information."
        );

        return;
      }


      // ===================================================
      // FILES
      // ===================================================

      const signatures =
        Array.isArray(
          witness?.signatures
        )
          ? witness.signatures
          : [];


      const photos =
        Array.isArray(
          witness?.photos
        )
          ? witness.photos
          : [];


      const documents =
        Array.isArray(
          witness?.documents
        )
          ? witness.documents
          : [];


      // ===================================================
      // FILE VALIDATION
      // ===================================================

      if (
        signatures.length > 2
      ) {

        showToast.error(
          "Maximum 2 signatures are allowed."
        );

        return;
      }


      if (
        photos.length > 2
      ) {

        showToast.error(
          "Maximum 2 witness photos are allowed."
        );

        return;
      }


      if (
        documents.length > 10
      ) {

        showToast.error(
          "Maximum 10 documents are allowed."
        );

        return;
      }


      // ===================================================
      // WITNESS PAYLOAD
      // ===================================================

      const payload = {

        fullName,

        mobile,

        relation,

        agreed,


        signatures:
          signatures.map(
            (item) => ({

              name:
                item?.name ||
                item?.fileName ||
                "signature.jpg",

              imageUrl:
                item?.imageUrl ||
                item?.url ||
                item?.uri ||
                "",

              publicId:
                item?.publicId ||
                "",

            })
          ),


        photos:
          photos.map(
            (item) => ({

              name:
                item?.name ||
                item?.fileName ||
                "witness-photo.jpg",

              imageUrl:
                item?.imageUrl ||
                item?.url ||
                item?.uri ||
                "",

              publicId:
                item?.publicId ||
                "",

            })
          ),


        documents:
          documents.map(
            (item) => ({

              docTypeName:
                item?.docTypeName ||
                "Identity Document",

              docTypeId:
                item?.docTypeId ||
                "OTHER",

              docUrl:
                item?.docUrl ||
                item?.imageUrl ||
                item?.url ||
                item?.uri ||
                "",

              publicId:
                item?.publicId ||
                "",

            })
          ),

      };


      console.log(
        "SAVE WITNESS API PAYLOAD:",
        JSON.stringify(
          payload,
          null,
          2
        )
      );


      // ===================================================
      // SAVE WITNESS API
      // ===================================================

      await handleMutation({

        apiFunc:
          saveVisitorWitness,

        params: {

          loanId:
            loanId,

          body:
            payload,

        },

        showSuccess:
          false,

        onSuccess: () => {

          setCurrentStep(
            previous =>
              previous + 1
          );

        },

      });


      return;
    }


    // =====================================================
    // STEP 6 - FINAL SUBMIT VERIFICATION
    // =====================================================

    if (currentStep === 6) {

      const declaration =
        investigationData?.declaration || {};


      // ===================================================
      // DECLARATION VALUES
      // ===================================================

      const informationCorrect =
        declaration?.informationCorrect === true;


      const photosGenuine =
        declaration?.photosGenuine === true;


      const investigationCompleted =
        declaration?.investigationCompleted === true;


      // ===================================================
      // VALIDATION
      // ===================================================

      if (!informationCorrect) {

        showToast.error(
          "Please confirm that the information is correct."
        );

        return;
      }


      if (!photosGenuine) {

        showToast.error(
          "Please confirm that the photos are genuine."
        );

        return;
      }


      if (!investigationCompleted) {

        showToast.error(
          "Please confirm that the investigation is completed."
        );

        return;
      }


      // ===================================================
      // FINAL SUBMIT PAYLOAD
      // ===================================================

      const payload = {

        informationCorrect,

        photosGenuine,

        investigationCompleted,

      };


      console.log(
        "========================================"
      );


      console.log(
        "FINAL SUBMIT VERIFICATION PAYLOAD:"
      );


      console.log(
        JSON.stringify(
          payload,
          null,
          2
        )
      );


      console.log(
        "========================================"
      );


      // ===================================================
      // FINAL SUBMIT API
      // ===================================================

      await handleMutation({

        apiFunc:
          submitVisitorVerification,

        params: {

          loanId:
            loanId,

          body:
            payload,

        },

        showSuccess:
          true,

        customSuccessMsg:
          "Verification submitted successfully.",

        onSuccess: () => {

          resetToTab(
            navigation,
            "History"
          );

        },

      });


      return;
    }


    // =====================================================
    // OTHER STEPS
    // =====================================================

    if (
      currentStep < TOTAL_STEPS
    ) {

      setCurrentStep(
        previous =>
          previous + 1
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
        previous =>
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

            onRefetchReady={
              setRefetchVerification
            }

            job={
              job
            }

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

            job={
              job
            }

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

            job={
              job
            }

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

            job={
              job
            }

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

            job={
              job
            }

            data={
              investigationData
            }

            onEditStep={
              setCurrentStep
            }

          />
        );


      // =================================================
      // STEP 6
      // =================================================

      case 6:

        return (
          <SubmitVerification

            job={
              job
            }

            data={
              investigationData
            }

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
  // REFRESH
  // =====================================================

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);


  const [
    refetchVerification,
    setRefetchVerification,
  ] = useState(null);


  const handleRefresh = async () => {

    if (
      typeof refetchVerification !==
      "function"
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


  console.log(
    verificationSummary,
    "verificationSummary---------------------"
  );


  // =====================================================
  // AUTO FILL STATE
  // =====================================================

  useEffect(() => {
    const investigation =
      verificationSummary?.data?.investigationDetails;

    if (!investigation) {
      return;
    }

    const location =
      investigation?.location || {};

    setInvestigationData((previous) => ({
      ...previous,
      investigation: {
        ...previous?.investigation,
        description: investigation?.description || "",
        latitude: location?.latitude ?? null,
        longitude: location?.longitude ?? null,
        address: location?.address || "",
        recommendation: investigation?.recommendation || "",
        remarks: investigation?.remarks || "",
      },
    }));
  }, [verificationSummary]);


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <SafeAreaView
      edges={[
        "bottom",
        "left",
        "right",
      ]}
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
                paddingTop:
                  insets.top,

                paddingHorizontal:
                  theme.spacing.xxl,
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

                refreshing={
                  refreshing
                }

                onRefresh={
                  handleRefresh
                }

                colors={[
                  "#FF641F",
                ]}

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

            {
              renderCurrentStep()
            }

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

            loading={
              isSavingInvestigation ||
              isSavingWitness
            }

          />

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );

};


export default VisitorInvestigationScreen;