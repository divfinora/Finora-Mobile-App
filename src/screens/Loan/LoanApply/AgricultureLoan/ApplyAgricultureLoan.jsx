import React, {
  useCallback,
  useState,
} from "react";

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  BackHandler,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";

// ==========================================
// API
// ==========================================

import {
  useApplyLoanMutation,
} from "../../../../redux/features/customer/customerApi.js";

import useHandleMutation
  from "../../../../hooks/useHandleMutation.js";

// ==========================================
// NAVIGATION
// ==========================================

import {
  resetToTab,
} from "../../../../navigation/navigationReset.js";

// ==========================================
// COMMON COMPONENTS
// ==========================================

import CommonButton
  from "../../../../components/common/Button/CommonButton.jsx";

import LoanCommonHeader
  from "../commonComponent/LoanCommonHeader.jsx";

import CommonInfoCard
  from "../commonComponent/CommonInfoCard.jsx";

import StepProgress
  from "../commonComponent/StepProgress.jsx";

// ==========================================
// STEP COMPONENTS
// ==========================================

import ShortPersonalDetails
  from "../commonComponent/CommonShortPersonalDetails.jsx";

import FarmerDetails
  from "./components/FarmerDetails.jsx";

import LandDetails
  from "./components/LandDetails.jsx";

import CommonLoanRequirement
  from "../commonComponent/CommonLoanRequirement.jsx";

import DocumentUpload
  from "./components/DocumentUpload.jsx";

// ==========================================
// THEME
// ==========================================

import {
  theme,
} from "../../../../theme/index.js";


// =====================================================
// HELPER - NUMBER
// =====================================================

const toNumber = (value) => {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return 0;
  }

  const cleaned =
    String(value)
      .replace(/₹/g, "")
      .replace(/,/g, "")
      .replace(/months?/gi, "")
      .trim();

  const number =
    Number(cleaned);

  return Number.isNaN(number)
    ? 0
    : number;
};


// =====================================================
// STEP 1 - PERSONAL DETAILS
// =====================================================

const validateStep1 = (
  formData
) => {

  const errors = {};

  // ========================================
  // FULL NAME
  // ========================================

  const fullName =
    String(
      formData?.fullName || ""
    ).trim();

  if (!fullName) {

    errors.fullName =
      "Full Name is required";

  } else if (
    fullName.length < 3
  ) {

    errors.fullName =
      "Enter a valid full name";
  }


  // ========================================
  // MOBILE NUMBER
  // ========================================

  const mobileNumber =
    String(
      formData?.mobileNumber || ""
    ).trim();

  if (!mobileNumber) {

    errors.mobileNumber =
      "Mobile Number is required";

  } else if (
    !/^[6-9]\d{9}$/.test(
      mobileNumber
    )
  ) {

    errors.mobileNumber =
      "Enter a valid 10-digit mobile number";
  }


  // ========================================
  // EMAIL
  // ========================================

  const email =
    String(
      formData?.email || ""
    ).trim();

  if (!email) {

    errors.email =
      "Email Address is required";

  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email
    )
  ) {

    errors.email =
      "Enter a valid email address";
  }


  // ========================================
  // AADHAAR
  // ========================================

  const aadharNumber =
    String(
      formData?.aadharNumber || ""
    ).trim();

  if (!aadharNumber) {

    errors.aadharNumber =
      "Aadhaar Number is required";

  } else if (
    !/^\d{12}$/.test(
      aadharNumber
    )
  ) {

    errors.aadharNumber =
      "Enter valid 12-digit Aadhaar Number";
  }


  return errors;
};


// =====================================================
// STEP 2 - FARMER DETAILS
// =====================================================

const validateStep2 = (
  formData
) => {

  const errors = {};

  // ========================================
  // FARMER TYPE
  // ========================================

  if (!formData?.farmerType) {

    errors.farmerType =
      "Select farmer type";
  }


  // ========================================
  // ANNUAL INCOME
  // ========================================

  const annualIncomeValue =
    String(
      formData?.annualIncome || ""
    ).trim();

  const annualIncome =
    Number(
      formData?.annualIncome
    );

  if (!annualIncomeValue) {

    errors.annualIncome =
      "Annual income is required";

  } else if (
    Number.isNaN(annualIncome) ||
    annualIncome < 0
  ) {

    errors.annualIncome =
      "Enter a valid annual income";
  }


  // ========================================
  // FARMING EXPERIENCE
  // ========================================

  const farmingExperienceValue =
    String(
      formData?.farmingExperience || ""
    ).trim();

  const farmingExperience =
    Number(
      formData?.farmingExperience
    );

  if (!farmingExperienceValue) {

    errors.farmingExperience =
      "Farming experience is required";

  } else if (
    Number.isNaN(farmingExperience) ||
    farmingExperience < 0
  ) {

    errors.farmingExperience =
      "Enter valid farming experience";
  }


  // ========================================
  // EXISTING LOANS
  // ========================================

  // false is also a valid value
  if (
    formData?.hasExistingLoans ===
    undefined ||
    formData?.hasExistingLoans ===
    null
  ) {

    errors.hasExistingLoans =
      "Select whether you have existing loans";
  }


  return errors;
};


// =====================================================
// STEP 3 - LAND INFORMATION
// =====================================================

const validateStep3 = (
  formData
) => {

  const errors = {};

  // ========================================
  // LAND OWNERSHIP
  // ========================================

  const landOwnership =
    formData?.landOwnership ||
    formData?.ownershipType;

  if (!landOwnership) {

    errors.ownershipType =
      "Select land ownership";
  }


  // ========================================
  // CURRENT CROP
  // ========================================

  const currentCropType =
    String(
      formData?.currentCropType || ""
    ).trim();

  if (!currentCropType) {

    errors.currentCropType =
      "Enter current crop type";
  }


  // ========================================
  // LAND AREA
  // ========================================

  const landAreaValue =
    String(
      formData?.landArea || ""
    ).trim();

  const landArea =
    Number(
      formData?.landArea
    );

  if (!landAreaValue) {

    errors.landArea =
      "Enter land area";

  } else if (
    Number.isNaN(landArea) ||
    landArea <= 0
  ) {

    errors.landArea =
      "Enter valid land area";
  }


  // ========================================
  // IRRIGATION SOURCE
  // ========================================

  if (
    !formData?.irrigationSource
  ) {

    errors.irrigationSource =
      "Select irrigation source";
  }


  return errors;
};


// =====================================================
// STEP 4 - LOAN REQUIREMENT
// =====================================================

const validateStep4 = (
  formData
) => {

  const errors = {};

  // ========================================
  // LOAN AMOUNT
  // ========================================

  const loanAmountValue =
    String(
      formData?.loanAmount || ""
    )
      .replace(/[₹,]/g, "")
      .trim();

  const loanAmount =
    Number(
      loanAmountValue
    );

  if (!loanAmountValue) {

    errors.loanAmount =
      "Enter required loan amount";

  } else if (
    Number.isNaN(loanAmount)
  ) {

    errors.loanAmount =
      "Enter valid loan amount";

  } else if (
    loanAmount < 25000
  ) {

    errors.loanAmount =
      "Minimum loan amount is ₹25,000";

  } else if (
    loanAmount > 1000000
  ) {

    errors.loanAmount =
      "Maximum loan amount is ₹10,00,000";
  }


  // ========================================
  // LOAN TENURE
  // ========================================

  const allowedTenures = [
    "6 months",
    "12 months",
    "18 months",
    "24 months",
    "36 months",
    "48 months",

    6,
    12,
    18,
    24,
    36,
    48,
  ];

  const loanTenure =
    formData?.loanTenure;

  if (
    loanTenure === undefined ||
    loanTenure === null ||
    String(loanTenure).trim() === ""
  ) {

    errors.loanTenure =
      "Select loan tenure";

  } else if (
    !allowedTenures.includes(
      loanTenure
    )
  ) {

    errors.loanTenure =
      "Select a valid loan tenure";
  }


  // ========================================
  // LOAN PURPOSE
  // ========================================

  const loanPurpose =
    String(
      formData?.loanPurpose || ""
    ).trim();

  if (!loanPurpose) {

    errors.loanPurpose =
      "Enter loan purpose";
  }


  // ========================================
  // PREFERRED EMI
  // ========================================

  const preferredEmiValue =
    String(
      formData?.preferredEmi || ""
    )
      .replace(/[₹,]/g, "")
      .trim();

  const preferredEmi =
    Number(
      preferredEmiValue
    );

  if (!preferredEmiValue) {

    errors.preferredEmi =
      "Enter preferred EMI";

  } else if (
    Number.isNaN(preferredEmi) ||
    preferredEmi < 0
  ) {

    errors.preferredEmi =
      "Enter valid preferred EMI";
  }


  return errors;
};


// =====================================================
// STEP 5 - DOCUMENT VALIDATION
// =====================================================

const validateStep5 = (
  formData
) => {

  const errors = {};

  // ========================================
  // IMPORTANT
  // documents is ARRAY
  // ========================================

  const documents =
    Array.isArray(
      formData?.documents
    )
      ? formData.documents
      : [];


  // ========================================
  // REQUIRED AGRICULTURE DOCUMENTS
  // ========================================

  const requiredDocuments = [

    "aadharCard",

    "panCard",

    "landDocument",

    "cropProof",

    "bankStatement",

  ];


  // ========================================
  // CHECK DOCUMENT
  // ========================================

  requiredDocuments.forEach(
    (field) => {

      const document =
        documents.find(
          (item) =>
            item?.type === field
        );

      // IMPORTANT:
      // Document exists but files empty
      // should also be invalid.

      if (
        !document ||
        !Array.isArray(
          document?.files
        ) ||
        document.files.length === 0
      ) {

        errors[field] =
          "Please upload this document";
      }
    }
  );


  return errors;
};


// =====================================================
// STEP VALIDATORS
// =====================================================

const stepValidators = {

  1:
    validateStep1,

  2:
    validateStep2,

  3:
    validateStep3,

  4:
    validateStep4,

  5:
    validateStep5,

};


// =====================================================
// MAIN COMPONENT
// =====================================================

const ApplyAgricultureLoan = ({
  navigation,
}) => {

  // ==========================================
  // ROUTE
  // ==========================================

  const route =
    useRoute();


  // ==========================================
  // PRODUCT
  // ==========================================

  const product =
    route?.params?.product;

  const productId =
    route?.params?.productId ||
    product?._id;


  // ==========================================
  // STATE
  // ==========================================

  const [
    currentStep,
    setCurrentStep,
  ] = useState(1);

  const [
    formData,
    setFormData,
  ] = useState({});

  const [
    errors,
    setErrors,
  ] = useState({});


  const totalSteps = 5;


  // ==========================================
  // APPLY LOAN API
  // ==========================================

  const [
    applyLoan,
    {
      isLoading:
      isApplyingLoan,
    },
  ] =
    useApplyLoanMutation();


  // ==========================================
  // MUTATION HANDLER
  // ==========================================

  const {
    handleMutation,
  } =
    useHandleMutation();


  // =====================================================
  // HEADER TITLE
  // =====================================================

  const getHeaderTitle = () => {

    switch (
    currentStep
    ) {

      case 1:
        return "Personal Details";

      case 2:
        return "Farmer Details";

      case 3:
        return "Land Information";

      case 4:
        return "Loan Requirement";

      case 5:
        return "Document Upload";

      default:
        return "Agriculture Loan";
    }
  };


  // =====================================================
  // VALIDATE CURRENT STEP
  // =====================================================

  const validateCurrentStep = () => {

    const validator =
      stepValidators[
      currentStep
      ];

    if (!validator) {
      return true;
    }


    const currentStepErrors =
      validator(
        formData
      ) || {};


    setErrors(
      currentStepErrors
    );


    return (
      Object.keys(
        currentStepErrors
      ).length === 0
    );
  };


  // =====================================================
  // SUBMIT AGRICULTURE LOAN
  // =====================================================

  const submitApplication =
    async () => {

      // ================================================
      // DOCUMENT ID MAPPING
      // ================================================

      const documentIdMap = {

        aadharCard:
          "6a4b57ab1f72b0160191314d",

        panCard:
          "6a4b57ab1f72b0160191314c",

        landDocument:
          "6a4b57ab1f72b01601913152",

        bankStatement:
          "6a4b57ab1f72b0160191314f",

        cropProof:
          "6a7d63d8786d2ef14a19e8f0",

      };


      // ================================================
      // FRONTEND DOCUMENTS
      // ================================================

      const frontendDocuments =
        Array.isArray(
          formData?.documents
        )
          ? formData.documents
          : [];


      // ================================================
      // CONVERT DOCUMENTS
      //
      // Frontend:
      //
      // [
      //   {
      //     type: "aadharCard",
      //     files: [
      //       {
      //         url: "..."
      //       }
      //     ]
      //   }
      // ]
      //
      // Backend:
      //
      // [
      //   {
      //     document: "DOCUMENT_ID",
      //     file: "URL"
      //   }
      // ]
      // ================================================

      const documents =
        frontendDocuments.flatMap(
          (
            document
          ) => {

            const documentId =
              documentIdMap[
              document?.type
              ];


            if (!documentId) {
              return [];
            }


            return (
              document?.files || []
            )
              .filter(
                (file) =>
                  file?.url ||
                  file?.uri
              )
              .map(
                (file) => ({

                  document:
                    documentId,

                  file:
                    file?.url ||
                    file?.uri,

                })
              );
          }
        );


      // ================================================
      // LAND OWNERSHIP
      // ================================================

      const landOwnership =
        formData?.landOwnership ||
        formData?.ownershipType;


      // ================================================
      // EXISTING LOANS
      // ================================================

      const existingLoans =
        formData?.hasExistingLoans;


      // ================================================
      // FINAL PAYLOAD
      // ================================================

      const payload = {

        // ==========================================
        // LOAN TYPE
        // ==========================================

        loanType:
          "AGRICULTURE_LOAN",


        // ==========================================
        // PRODUCT
        // ==========================================

        productId:
          productId,


        // ==========================================
        // BASIC FORM DATA
        // ==========================================

        ...formData,


        // ==========================================
        // AADHAAR
        // ==========================================

        aadhaarNumber:
          formData?.aadharNumber,


        // ==========================================
        // FARMER DETAILS
        // ==========================================

        farmerType:
          formData?.farmerType,

        annualIncome:
          toNumber(
            formData?.annualIncome
          ),

        farmingExperience:
          toNumber(
            formData?.farmingExperience
          ),

        existingLoans:
          existingLoans,


        // ==========================================
        // LAND DETAILS
        // ==========================================

        landOwnership:
          landOwnership,

        currentCropType:
          formData?.currentCropType,

        landArea:
          toNumber(
            formData?.landArea
          ),

        irrigationSource:
          formData?.irrigationSource,


        // ==========================================
        // LOAN REQUIREMENT
        // ==========================================

        amount:
          toNumber(
            formData?.loanAmount
          ),

        tenure:
          toNumber(
            formData?.loanTenure
          ),

        loanPurpose:
          formData?.loanPurpose,

        preferredEmi:
          toNumber(
            formData?.preferredEmi
          ),


        // ==========================================
        // DOCUMENTS
        // ==========================================

        documents:
          documents,

      };


      // ================================================
      // DEBUG
      // ================================================

      console.log(
        "================================"
      );

      console.log(
        "AGRICULTURE LOAN PAYLOAD:",
        JSON.stringify(
          payload,
          null,
          2
        )
      );

      console.log(
        "================================"
      );


      // ================================================
      // API CALL
      // ================================================

      await handleMutation({

        apiFunc:
          applyLoan,

        params:
          payload,

        showSuccess:
          true,

        showError:
          true,

        customSuccessMsg:
          "Agriculture Loan application submitted successfully!",

        onSuccess:
          (response) => {

            console.log(
              "Agriculture Loan Response:",
              response
            );


            // ==================================
            // GO TO HISTORY
            // ==================================

            resetToTab(
              navigation,
              "History"
            );
          },
      });
    };


  // =====================================================
  // NEXT
  // =====================================================

  const handleNext = () => {

    const isValid =
      validateCurrentStep();


    if (!isValid) {
      return;
    }


    // ========================================
    // NEXT STEP
    // ========================================

    if (
      currentStep <
      totalSteps
    ) {

      setErrors({});

      setCurrentStep(
        (prev) =>
          prev + 1
      );

      return;
    }


    // ========================================
    // FINAL SUBMIT
    // ========================================

    submitApplication();
  };


  // =====================================================
  // BACK
  // =====================================================

  const handleBack =
    useCallback(
      () => {

        if (
          currentStep > 1
        ) {

          setCurrentStep(
            (prev) =>
              prev - 1
          );

          setErrors({});

          return true;
        }


        return false;
      },
      [
        currentStep,
      ]
    );


  // =====================================================
  // HARDWARE BACK
  // =====================================================

  useFocusEffect(
    useCallback(
      () => {

        const subscription =
          BackHandler.addEventListener(
            "hardwareBackPress",
            handleBack
          );


        return () =>
          subscription.remove();

      },
      [
        handleBack,
      ]
    )
  );


  // =====================================================
  // RENDER STEP
  // =====================================================

  const renderStep = () => {

    const commonProps = {

      formData,

      setFormData,

      errors,

      setErrors,

    };


    switch (
    currentStep
    ) {

      case 1:

        return (
          <ShortPersonalDetails
            {...commonProps}
          />
        );


      case 2:

        return (
          <FarmerDetails
            {...commonProps}
          />
        );


      case 3:

        return (
          <LandDetails
            {...commonProps}
          />
        );


      case 4:

        return (
          <CommonLoanRequirement
            {...commonProps}
          />
        );


      case 5:

        return (
          <DocumentUpload
            {...commonProps}
          />
        );


      default:
        return null;
    }
  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor:
          "#F6F8F7",
      }}
    >

      {/* ==========================================
          HEADER
      ========================================== */}

      <LoanCommonHeader
        title={
          getHeaderTitle()
        }

        onBackPress={
          handleBack
        }
      />


      {/* ==========================================
          KEYBOARD AVOIDING VIEW
      ========================================== */}

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

        {/* ========================================
            CONTENT
        ======================================== */}

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }

          keyboardShouldPersistTaps="handled"

          contentContainerStyle={{
            paddingBottom:
              theme.spacing?.xl ||
              24,
          }}
        >

          <View
            style={{
              paddingHorizontal:
                theme.spacing?.xxl ||
                20,
            }}
          >

            {/* INFO CARD */}

            <CommonInfoCard />


            {/* STEP PROGRESS */}

            <StepProgress
              currentStep={
                currentStep
              }

              totalSteps={
                totalSteps
              }
            />


            {/* CURRENT STEP */}

            {renderStep()}

          </View>

        </ScrollView>


        {/* ========================================
            BOTTOM BUTTON
        ======================================== */}

        <View
          style={{

            padding:
              theme.spacing?.lg ||
              16,

            backgroundColor:
              theme.colors?.white ||
              "#FFFFFF",

            borderTopWidth:
              theme.borderWidth?.thin ||
              1,

            borderTopColor:
              theme.colors?.divider ||
              "#E2E8F0",
          }}
        >

          <CommonButton

            title={
              currentStep ===
                totalSteps
                ? "Submit Application"
                : "Continue"
            }

            onPress={
              handleNext
            }

            loading={
              isApplyingLoan
            }

            disabled={
              isApplyingLoan
            }

          />

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};


export default ApplyAgricultureLoan;