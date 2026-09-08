import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,

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
  useSaveVisitorSiteDetailsMutation,
  useSaveVisitorWitnessMutation,
  useSubmitVisitorVerificationMutation,
} from "../../../redux/features/visitor/visitorApi.js";

import showToast from "../../../utils/toast.js";

import {
  resetToTab,
} from "../../../navigation/navigationReset.js";
import KeyboardAvoidingBottomView from "../../../components/common/KeyBoard/KeyboardAvoidingBottomView.jsx";

import WitnessVerificationHero from './components/WitnessVerificationHero.jsx'
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
  const [
    isEditingStep,
    setIsEditingStep,
  ] = useState(false);


  console.log(isEditingStep, "isEditingStep")
  console.log(currentStep, "currentStep currentStepcurrentStepcurrentStep")
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
  const handleEditStep = (step) => {
    setIsEditingStep(true);
    setCurrentStep(step);
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
  // SAVE INVESTIGATION
  // =====================================================

  const saveInvestigation = async (mode = "continue") => {

    const investigation =
      investigationData?.investigation || {};

    const description =
      investigation?.description?.trim();

    const latitude =
      investigation?.latitude;

    const longitude =
      investigation?.longitude;

    const address =
      investigation?.address?.trim();

    const remarks =
      investigation?.remarks?.trim();


    const payload = {

      loanId,

      location: {

        latitude,

        longitude,

      },

      address,

      remarks,

      description,

    };


    console.log(
      `${mode === "draft"
        ? "SAVE DRAFT"
        : "SAVE & CONTINUE"
      } - Investigation API Payload:`,
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

      onSuccess: async () => {

        // ==========================================
        // SAVE DRAFT
        // ==========================================

        if (mode === "draft") {

          resetToTab(
            navigation,
            "Home"
          );

          return;
        }


        // ==========================================
        // EDIT MODE
        // REVIEW PAR RETURN
        // ==========================================

        if (isEditingStep) {
          setIsEditingStep(false);
          refetchSummary();
          setCurrentStep(5);
          return;
        }

        // ==========================================
        // SAVE & CONTINUE
        // ==========================================

        setCurrentStep(
          previous =>
            previous + 1
        );
      },

    });
  };

  // =========================================
  // Hanle Mutation saveVisitorSiteDetails 
  const [
    saveVisitorSiteDetails,
    { isLoading: isSavingSiteDetails },
  ] = useSaveVisitorSiteDetailsMutation();

  // =====================================================
  // SAVE SITE DETAILS
  // =====================================================
  const saveSiteDetails = async (mode = "continue") => {
    const site = investigationData?.site || {};

    const uploadedDocuments = Array.isArray(
      site?.uploadedDocuments
    )
      ? site.uploadedDocuments
      : [];


    console.log(uploadedDocuments, "uploadedDocuments")
    // ==========================================
    // NO NEW DOCUMENTS
    // API CALL SKIP
    // ==========================================
    if (uploadedDocuments.length === 0) {
      // Draft mode
      if (mode === "draft") {
        resetToTab(navigation, "Home");
        return;
      }

      // Edit mode
      if (isEditingStep) {
        setIsEditingStep(false);
        refetchSummary();
        setCurrentStep(5);
        return;
      }

      // Normal flow
      setCurrentStep(previous => previous + 1);
      return;
    }

    const photos = uploadedDocuments
      .filter(item => item?.url)
      .map(item => ({
        name:
          item?.name ||
          item?.fileName ||
          "site-photo.jpg",

        url: item.url,

        ...(item?.publicId
          ? {
            publicId: item.publicId,
          }
          : {}),

        ...(item?.uploadedAt
          ? {
            uploadedAt: item.uploadedAt,
          }
          : {}),
      }));

    const payload = {
      photos,
    };

    await handleMutation({
      apiFunc: saveVisitorSiteDetails,

      params: {
        loanId,
        body: payload,
      },

      showSuccess: false,

      onSuccess: async () => {

        setInvestigationData((previous) => ({
          ...previous,

          site: {
            ...previous?.site,
            uploadedDocuments: [],
          },
        }));

        // ==========================================
        // SAVE DRAFT
        // ==========================================

        if (mode === "draft") {
          resetToTab(navigation, "Home");
          return;
        }

        // ==========================================
        // EDIT MODE
        // REVIEW PAR RETURN
        // ==========================================

        if (isEditingStep) {
          setIsEditingStep(false);
          refetchSummary();
          setCurrentStep(5);
          return;
        }

        // ==========================================
        // NORMAL FLOW
        // ==========================================

        setCurrentStep(
          previous => previous + 1
        );
      },
    });
  };

  // =====================================================
  // SAVE WITNESS
  // mode = "draft" | "continue"
  // =====================================================
  const saveWitness = async (mode = "continue") => {
    const witness =
      investigationData?.witness || {};

    // ===================================================
    // BASIC VALUES
    // ===================================================

    const fullName =
      witness?.witnessName?.trim() || "";

    const mobile =
      witness?.mobileNumber?.trim() || "";

    const relation =
      witness?.relation?.trim() || "";

    const agreed =
      witness?.witnessConfirmed === true;

    // ===================================================
    // FILES
    // ===================================================

    const signatures =
      Array.isArray(witness?.signatures)
        ? witness.signatures
        : [];

    const photos =
      Array.isArray(witness?.photos)
        ? witness.photos
        : [];

    const documents =
      Array.isArray(witness?.documents)
        ? witness.documents
        : [];

    // ===================================================
    // CONTINUE VALIDATION
    // Draft me required validation nahi hogi
    // ===================================================

    if (mode === "continue") {

      // -----------------------------------------------
      // WITNESS NAME
      // -----------------------------------------------

      if (!fullName) {
        showToast.error(
          "Please enter witness name."
        );
        return;
      }

      // -----------------------------------------------
      // MOBILE
      // -----------------------------------------------

      if (!mobile) {
        showToast.error(
          "Please enter mobile number."
        );
        return;
      }

      if (!/^[6-9]\d{9}$/.test(mobile)) {
        showToast.error(
          "Please enter a valid 10-digit mobile number."
        );
        return;
      }

      // -----------------------------------------------
      // RELATION
      // -----------------------------------------------

      if (!relation) {
        showToast.error(
          "Please select relation to applicant."
        );
        return;
      }

      // -----------------------------------------------
      // CONFIRMATION
      // -----------------------------------------------

      if (!agreed) {
        showToast.error(
          "Please confirm witness information."
        );
        return;
      }

      // -----------------------------------------------
      // REQUIRED SELFIE
      // -----------------------------------------------

      if (photos.length !== 1) {
        showToast.error(
          "Please upload witness selfie."
        );
        return;
      }

      // -----------------------------------------------
      // REQUIRED SIGNATURE
      // -----------------------------------------------

      if (signatures.length !== 1) {
        showToast.error(
          "Please upload witness signature."
        );
        return;
      }

      // -----------------------------------------------
      // REQUIRED DOCUMENT
      // -----------------------------------------------

      if (documents.length < 1) {
        showToast.error(
          "Please upload at least one witness document."
        );
        return;
      }
    }

    // ===================================================
    // FILE LIMIT SAFETY
    // ===================================================

    if (photos.length > 1) {
      showToast.error(
        "Only 1 witness selfie is allowed."
      );
      return;
    }

    if (signatures.length > 1) {
      showToast.error(
        "Only 1 witness signature is allowed."
      );
      return;
    }

    if (documents.length > 10) {
      showToast.error(
        "Maximum 10 witness documents are allowed."
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

      // -----------------------------------------------
      // SIGNATURE
      // -----------------------------------------------

      signatures: signatures.map((item) => ({
        name:
          item?.name,

        imageUrl:
          item?.imageUrl,

        publicId:
          item?.publicId,
      })),

      // -----------------------------------------------
      // WITNESS SELFIE
      // -----------------------------------------------

      photos: photos.map((item) => ({
        name:
          item?.name,

        imageUrl:
          item?.imageUrl,

        publicId:
          item?.publicId,
      })),

      // -----------------------------------------------
      // ID DOCUMENT
      // -----------------------------------------------

      documents: documents.map((item) => ({
        docTypeName:
          item?.docTypeName,

        docTypeId:
          item?.docTypeId,

        docUrl:
          item?.docUrl,

        publicId:
          item?.publicId,
      })),
    };

    // ===================================================
    // DEBUG
    // ===================================================

    console.log(
      mode === "draft"
        ? "SAVE WITNESS DRAFT API PAYLOAD:"
        : "SAVE WITNESS API PAYLOAD:",
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
        loanId,

        body: payload,
      },

      showSuccess:
        mode === "draft",

      customSuccessMsg:
        mode === "draft"
          ? "Witness details saved as draft."
          : "Witness details saved successfully.",

      onSuccess: async () => {

        // -----------------------------------------------
        // REFRESH LATEST DATA
        // -----------------------------------------------

        await refetchSummary();

        // -----------------------------------------------
        // DRAFT
        // -----------------------------------------------

        if (mode === "draft") {
          resetToTab(
            navigation,
            "Home"
          );

          return;
        }

        // -----------------------------------------------
        // EDIT MODE
        // Review -> Witness -> Save & Continue
        // -----------------------------------------------

        if (isEditingStep) {
          setIsEditingStep(false);
          setCurrentStep(5);

          return;
        }

        // -----------------------------------------------
        // NORMAL FLOW
        // -----------------------------------------------

        setCurrentStep(
          previous =>
            previous + 1
        );
      },
    });
  };


  // =====================================================
  // NEXT STEP
  // =====================================================

  const handleNext = async () => {

    // ===================================================
    // STEP 2 - SAVE INVESTIGATION
    // ===================================================

    if (currentStep === 2) {

      await saveInvestigation(
        "continue"
      );

      return;
    }


    // ===================================================
    // STEP 3 - SAVE SITE DETAILS
    // ===================================================

    if (currentStep === 3) {

      await saveSiteDetails(
        "continue"
      );

      return;
    }


    // =====================================================
    // STEP 4 - SAVE WITNESS
    // =====================================================

    if (currentStep === 4) {

      await saveWitness(
        "continue"
      );

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
  // Back button
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



  // ===================================
  // on Draft 
  //=======================
  const handleSaveDraft = async () => {

    // ==========================================
    // STEP 2 - INVESTIGATION DRAFT
    // ==========================================

    if (currentStep === 2) {

      await saveInvestigation(
        "draft"
      );

      return;
    }


    // ==========================================
    // STEP 3 - SITE DETAILS DRAFT
    // ==========================================

    if (currentStep === 3) {

      await saveSiteDetails(
        "draft"
      );

      return;
    }


    // ==========================================
    // STEP 4 - WITNESS DRAFT
    // ==========================================

    if (currentStep === 4) {

      await saveWitness(
        "draft"
      );

      return;
    }

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
            job={job}
            data={investigationData}
            verificationSummary={verificationSummary}
            onEditStep={handleEditStep}
            isLoading={isSummaryLoading}
            isFetching={isSummaryFetching}
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
    setRefreshing(true);

    try {
      await refetchSummary();
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





  // =====================================================
  // AUTO FILL STATE
  // =====================================================

  useEffect(() => {
    console.log(
      verificationSummary,
      "verificationSummary"
    );

    const investigation =
      verificationSummary?.data?.investigationDetails;

    const siteDetails =
      verificationSummary?.data?.siteDetails;

    const witnessDetails =
      verificationSummary?.data?.witnessDetails;

    if (
      !investigation &&
      !siteDetails &&
      !witnessDetails
    ) {
      return;
    }

    // =====================================================
    // INVESTIGATION LOCATION
    // =====================================================

    const location =
      investigation?.location || {};

    // =====================================================
    // WITNESS PHOTOS
    // Backend:
    // {
    //   name,
    //   imageUrl,
    //   publicId,
    //   _id
    // }
    // =====================================================

    const witnessPhotos =
      Array.isArray(witnessDetails?.photos)
        ? witnessDetails.photos.map(
          (photo, index) => ({
            id:
              photo?._id ||
              photo?.publicId ||
              `${photo?.imageUrl}-${index}`,

            name:
              photo?.name ||
              "Witness Photo",

            fileName:
              photo?.name ||
              "Witness Photo",

            uri:
              photo?.imageUrl ||
              "",

            url:
              photo?.imageUrl ||
              "",

            imageUrl:
              photo?.imageUrl ||
              "",

            publicId:
              photo?.publicId ||
              null,

            uploaded:
              true,

            uploadedAt:
              photo?.uploadedAt ||
              null,

            type:
              "image/jpeg",
          })
        )
        : [];

    // =====================================================
    // WITNESS SIGNATURES
    // Backend:
    // {
    //   name,
    //   imageUrl,
    //   publicId,
    //   _id
    // }
    // =====================================================

    const witnessSignatures =
      Array.isArray(
        witnessDetails?.signatures
      )
        ? witnessDetails.signatures.map(
          (signature, index) => ({
            id:
              signature?._id ||
              signature?.publicId ||
              `${signature?.imageUrl}-${index}`,

            name:
              signature?.name ||
              "Witness Signature",

            fileName:
              signature?.name ||
              "Witness Signature",

            uri:
              signature?.imageUrl ||
              "",

            url:
              signature?.imageUrl ||
              "",

            imageUrl:
              signature?.imageUrl ||
              "",

            publicId:
              signature?.publicId ||
              null,

            uploaded:
              true,

            uploadedAt:
              signature?.uploadedAt ||
              null,

            type:
              "image/jpeg",
          })
        )
        : [];

    // =====================================================
    // WITNESS DOCUMENTS
    // Backend:
    // {
    //   docTypeId,
    //   docTypeName,
    //   docUrl,
    //   publicId,
    //   _id
    // }
    // =====================================================

    const witnessDocuments =
      Array.isArray(
        witnessDetails?.documents
      )
        ? witnessDetails.documents.map(
          (document, index) => ({
            id:
              document?._id ||
              document?.publicId ||
              `${document?.docUrl}-${index}`,

            name:
              document?.docTypeName ||
              "Witness Document",

            title:
              document?.docTypeName ||
              "Witness Document",

            fileName:
              document?.docTypeName ||
              "Witness Document",

            uri:
              document?.docUrl ||
              "",

            url:
              document?.docUrl ||
              "",

            imageUrl:
              document?.docUrl ||
              "",

            publicId:
              document?.publicId ||
              null,

            uploaded:
              true,

            uploadedAt:
              document?.uploadedAt ||
              null,

            type:
              "image/jpeg",

            docTypeId:
              document?.docTypeId ||
              "",

            docTypeName:
              document?.docTypeName ||
              "",

            docUrl:
              document?.docUrl ||
              "",

            docNumber:
              document?.docNumber ||
              "",
          })
        )
        : [];

    // =====================================================
    // SET INVESTIGATION DATA
    // =====================================================

    setInvestigationData((previous) => ({
      ...previous,

      // ===================================================
      // INVESTIGATION
      // ===================================================

      investigation: {
        ...previous?.investigation,

        description:
          investigation?.description ||
          "",

        lastLatitude:
          location?.latitude ??
          null,

        lastLongitude:
          location?.longitude ??
          null,

        address:
          location?.address ||
          "",

        remarks:
          investigation?.remarks ||
          "",

        lastAddress:
          location?.address ||
          "",
      },

      // ===================================================
      // SITE
      // ===================================================

      site: {
        ...previous?.site,

        uploadedOldDocuments:
          Array.isArray(
            siteDetails?.photos
          )
            ? siteDetails.photos.map(
              (photo, index) => ({
                id:
                  photo?.publicId ||
                  `${photo?.url}-${index}`,

                name:
                  photo?.name ||
                  "Site Photo",

                title:
                  photo?.name ||
                  "Site Photo",

                url:
                  photo?.url ||
                  "",

                publicId:
                  photo?.publicId ||
                  null,

                uploadedAt:
                  photo?.uploadedAt ||
                  null,

                uploaded:
                  true,

                type:
                  "image/jpeg",
              })
            )
            : [],
      },

      // ===================================================
      // WITNESS
      // ===================================================

      witness: {
        ...previous?.witness,

        witnessName:
          witnessDetails?.fullName ||
          "",

        mobileNumber:
          witnessDetails?.mobile ||
          "",

        relation:
          witnessDetails?.relation ||
          "",

        photos:
          witnessPhotos,

        signatures:
          witnessSignatures,

        documents:
          witnessDocuments,

        witnessConfirmed:
          witnessDetails?.agreed === true,

        idType:
          witnessDocuments?.[0]?.docTypeId ||
          "",

        idNumber:
          witnessDocuments?.[0]?.docNumber ||
          "",
      },
    }));
  }, [verificationSummary]);


  // =====================================================
  // RENDER
  // =====================================================


  const STEP_PROGRESS_HEADINGS = {
    1: "Verification Progress",
    2: "Investigation Progress",
    3: "Site Verification",
    4: "Investigation Progress",
    5: null,
    6: null,
  };

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

      <KeyboardAvoidingBottomView
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

            {currentStep <= 3 && <CommonInfoCard />}

            {/* =================================================
    WITNESS HERO IMAGE
================================================= */}

            {currentStep === 4 && (
              <WitnessVerificationHero
                imageUri="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80"
              />
            )}

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
              heading={STEP_PROGRESS_HEADINGS[currentStep]}
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

            onSaveDraft={
              handleSaveDraft
            }

            loading={
              isSavingInvestigation ||
              isSavingSiteDetails ||
              isSavingWitness ||
              isSubmittingVerification
            }

          />

        </View>

      </KeyboardAvoidingBottomView>

    </SafeAreaView>

  );

};


export default VisitorInvestigationScreen;
