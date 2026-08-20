// screens/ApplyRenovationLoan.jsx

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

import {
  resetToTab,
} from "../../../../navigation/navigationReset.js";

// =====================================================
// API
// =====================================================

import {
  useApplyLoanMutation,
} from "../../../../redux/features/customer/customerApi.js";

import useHandleMutation
  from "../../../../hooks/useHandleMutation.js";

// =====================================================
// COMMON COMPONENTS
// =====================================================

import CommonButton
  from "../../../../components/common/Button/CommonButton.jsx";

import LoanCommonHeader
  from "../commonComponent/LoanCommonHeader.jsx";

import CommonInfoCard
  from "../commonComponent/CommonInfoCard.jsx";

import StepProgress
  from "../commonComponent/StepProgress.jsx";

// =====================================================
// STEP COMPONENTS
// =====================================================

import ShortPersonalDetails
  from "../commonComponent/CommonShortPersonalDetails.jsx";

import CommonEmploymentAndIncome
  from "../commonComponent/CommonEmploymentAndIncome.jsx";

import PropertyDetails
  from "./components/PropertyDetails.jsx";

import RenovationDetails
  from "./components/RenovationDetails.jsx";

import CommonLoanRequirement
  from "../commonComponent/CommonLoanRequirement.jsx";

import DocumentUpload
  from "./components/DocumentUpload.jsx";

// =====================================================
// THEME
// =====================================================

import {
  theme,
} from "../../../../theme/index.js";


// =====================================================
// STEP 1 - PERSONAL DETAILS
// =====================================================

const validateStep1 = (
  formData
) => {

  const errors = {};


  // Full Name
  if (
    !formData?.fullName?.trim()
  ) {

    errors.fullName =
      "Full Name is required";

  }


  // Mobile Number
  if (
    !formData?.mobileNumber?.trim()
  ) {

    errors.mobileNumber =
      "Mobile Number is required";

  } else if (
    !/^[6-9]\d{9}$/.test(
      formData.mobileNumber.trim()
    )
  ) {

    errors.mobileNumber =
      "Enter a valid 10-digit mobile number";

  }


  // Email
  if (
    !formData?.email?.trim()
  ) {

    errors.email =
      "Email Address is required";

  } else if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      formData.email.trim()
    )
  ) {

    errors.email =
      "Enter a valid email address";

  }


  // Aadhaar
  if (
    !formData?.aadharNumber?.trim()
  ) {

    errors.aadharNumber =
      "Aadhaar Number is required";

  } else if (
    !/^\d{12}$/.test(
      formData.aadharNumber.trim()
    )
  ) {

    errors.aadharNumber =
      "Enter valid 12-digit Aadhaar Number";

  }


  return errors;
};


// =====================================================
// STEP 2 - EMPLOYMENT & INCOME
// =====================================================

const validateStep2 = (
  formData
) => {

  const errors = {};


  // Employment Type
  if (
    !formData?.employmentType
  ) {

    errors.employmentType =
      "Select employment type";

  }


  // Monthly Income
  if (
    !String(
      formData?.monthlyIncome || ""
    ).trim()
  ) {

    errors.monthlyIncome =
      "Monthly income is required";

  }


  // Existing EMI
  if (
    !String(
      formData?.existingEmi || ""
    ).trim()
  ) {

    errors.existingEmi =
      "Existing EMI amount is required";

  }


  // Occupation
  if (
    !formData?.occupationDetails?.trim()
  ) {

    errors.occupationDetails =
      "Occupation details are required";

  }


  return errors;
};


// =====================================================
// STEP 3 - PROPERTY DETAILS
// =====================================================

const validateStep3 = (
  formData
) => {

  const errors = {};

  const details =
    formData?.propertyDetails || {};


  // Property Type
  if (
    !details?.propertyType
  ) {

    errors.propertyType =
      "Select property type";

  }


  // Property Address
  if (
    !details?.propertyAddress?.trim()
  ) {

    errors.propertyAddress =
      "Property address is required";

  }


  // Estimated Property Value
  if (
    !String(
      details?.estimatedPropertyValue || ""
    ).trim()
  ) {

    errors.estimatedPropertyValue =
      "Estimated property value is required";

  }


  // Ownership
  if (
    !details?.ownershipStatus
  ) {

    errors.ownershipStatus =
      "Select ownership status";

  }


  return errors;
};


// =====================================================
// STEP 4 - RENOVATION DETAILS
// =====================================================

const validateStep4 = (
  formData
) => {

  const errors = {};

  const details =
    formData?.renovationDetails || {};


  // Renovation Type
  if (
    !details?.renovationType
  ) {

    errors.renovationType =
      "Select renovation type";

  }


  // Estimated Cost
  if (
    !String(
      details?.estimatedCost || ""
    ).trim()
  ) {

    errors.estimatedCost =
      "Estimated renovation cost is required";

  }


  // Contractor Details
  if (
    !details?.contractorDetails?.trim()
  ) {

    errors.contractorDetails =
      "Contractor details are required";

  }


  // Timeline
  if (
    !details?.timeline
  ) {

    errors.timeline =
      "Select renovation timeline";

  }


  return errors;
};


// =====================================================
// STEP 5 - LOAN REQUIREMENT
// =====================================================

const validateStep5 = (
  formData
) => {

  const errors = {};


  // Loan Amount
  const amount =
    Number(
      String(
        formData?.loanAmount || ""
      )
        .replace(/[₹,]/g, "")
    );


  if (
    !String(
      formData?.loanAmount || ""
    ).trim()
  ) {

    errors.loanAmount =
      "Enter required loan amount";

  } else if (
    amount < 25000 ||
    amount > 1000000
  ) {

    errors.loanAmount =
      "Loan amount must be between ₹25,000 and ₹10,00,000";

  }


  // Loan Tenure
  const tenure =
    Number(
      String(
        formData?.loanTenure || ""
      )
        .replace(
          /months?/gi,
          ""
        )
        .trim()
    );


  if (
    !String(
      formData?.loanTenure || ""
    ).trim()
  ) {

    errors.loanTenure =
      "Select loan tenure";

  } else if (
    tenure < 6 ||
    tenure > 60
  ) {

    errors.loanTenure =
      "Loan tenure must be between 6 and 60 months";

  }


  // Loan Purpose
  if (
    !formData?.loanPurpose?.trim()
  ) {

    errors.loanPurpose =
      "Enter loan purpose";

  }


  // Preferred EMI
  if (
    !String(
      formData?.preferredEmi || ""
    ).trim()
  ) {

    errors.preferredEmi =
      "Enter preferred EMI";

  }


  return errors;
};


// =====================================================
// STEP 6 - DOCUMENTS
// =====================================================

const validateStep6 = (
  formData
) => {

  const errors = {};


  // Renovation Loan backend documents
  const requiredDocuments = [

    "aadharCard",

    "panCard",

    "propertyPaper",

    "bankStatement",

    "salarySlip",

  ];


  const documents =
    formData?.documents || [];


  requiredDocuments.forEach(
    (field) => {

      const document =
        documents.find(
          (item) =>
            item?.type === field
        );


      if (
        !document?.files?.length
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

  6:
    validateStep6,

};


// =====================================================
// MAIN COMPONENT
// =====================================================

const ApplyRenovationLoan = ({
  navigation,
}) => {


  // ===================================================
  // ROUTE
  // ===================================================

  const route =
    useRoute();


  const product =
    route?.params?.product;


  const productId =
    route?.params?.productId;


  // ===================================================
  // STATE
  // ===================================================

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


  const totalSteps = 6;


  // ===================================================
  // APPLY LOAN API
  // ===================================================

  const [
    applyLoan,
    {
      isLoading:
        isApplyingLoan,
    },
  ] =
    useApplyLoanMutation();


  // ===================================================
  // MUTATION HANDLER
  // ===================================================

  const {
    handleMutation,
  } =
    useHandleMutation();


  // ===================================================
  // HEADER TITLE
  // ===================================================

  const getHeaderTitle = () => {

    switch (
      currentStep
    ) {

      case 1:
        return "Personal Details";

      case 2:
        return "Employment & Income";

      case 3:
        return "Property Details";

      case 4:
        return "Renovation Details";

      case 5:
        return "Loan Requirement";

      case 6:
        return "Document Upload";

      default:
        return "Renovation Loan";

    }

  };


  // ===================================================
  // VALIDATE CURRENT STEP
  // ===================================================

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


  // ===================================================
  // DOCUMENT ID MAPPING
  // ===================================================

  const documentIdMap = {

    // Aadhaar
    aadharCard:
      "6a4b57ab1f72b0160191314d",

    // PAN
    panCard:
      "6a4b57ab1f72b0160191314c",

    // Property Paper
    propertyPaper:
      "6a4b57ab1f72b01601913152",

    // Bank Statement
    bankStatement:
      "6a4b57ab1f72b0160191314f",

    // Salary Slip
    salarySlip:
      "6a4b57ab1f72b0160191314e",

  };


  // ===================================================
  // NUMBER HELPER
  // ===================================================

  const toNumber = (
    value
  ) => {

    if (
      value === null ||
      value === undefined
    ) {

      return 0;

    }


    const cleaned =
      String(value)
        .replace(
          /₹/g,
          ""
        )
        .replace(
          /,/g,
          ""
        )
        .replace(
          /months?/gi,
          ""
        )
        .trim();


    const number =
      Number(
        cleaned
      );


    return Number.isNaN(
      number
    )
      ? 0
      : number;

  };


  // ===================================================
  // SUBMIT RENOVATION LOAN
  // ===================================================

  const submitApplication =
    async () => {


      // =================================================
      // FRONTEND DOCUMENTS
      // =================================================

      const frontendDocuments =
        formData?.documents || [];


      // =================================================
      // CONVERT DOCUMENTS
      // =================================================
      //
      // Frontend:
      //
      // {
      //   type: "aadharCard",
      //   files: [
      //     {
      //       url: "..."
      //     },
      //     {
      //       url: "..."
      //     }
      //   ]
      // }
      //
      //
      // Backend:
      //
      // {
      //   document: "DOCUMENT_ID",
      //   file: "CLOUDINARY_URL"
      // }
      //
      // =================================================

      const documents =
        frontendDocuments.flatMap(
          (document) => {

            const documentId =
              documentIdMap[
                document?.type
              ];


            // Unknown document
            if (!documentId) {

              return [];

            }


            // Every uploaded file
            // becomes one backend object

            return (
              document?.files || []
            )
              .filter(
                (file) =>
                  file?.url
              )
              .map(
                (file) => ({

                  document:
                    documentId,

                  file:
                    file.url,

                })
              );

          }
        );


      // =================================================
      // PROPERTY DETAILS
      // =================================================

      const propertyDetails =
        formData?.propertyDetails || {};


      // =================================================
      // RENOVATION DETAILS
      // =================================================

      const renovationDetails =
        formData?.renovationDetails || {};


      // =================================================
      // FINAL PAYLOAD
      // =================================================

      const payload = {

        // ===============================================
        // LOAN TYPE
        // ===============================================

        loanType:
          "RENOVATION_LOAN",


        // ===============================================
        // PRODUCT ID
        // ===============================================

        productId:
          productId,


        // ===============================================
        // FORM DATA
        // ===============================================

        ...formData,


        // ===============================================
        // PROPERTY FIELDS
        // Backend expects flat fields
        // ===============================================

        propertyType:
          propertyDetails?.propertyType,

        propertyOwnership:
          propertyDetails?.ownershipStatus,

        propertyAddress:
          propertyDetails?.propertyAddress,

        marketValue:
          toNumber(
            propertyDetails?.estimatedPropertyValue
          ),


        // ===============================================
        // RENOVATION FIELDS
        // ===============================================

        renovationType:
          renovationDetails?.renovationType,

        estimatedCost:
          toNumber(
            renovationDetails?.estimatedCost
          ),


        // ===============================================
        // LOAN AMOUNT
        // ===============================================

        amount:
          toNumber(
            formData?.loanAmount
          ),


        // ===============================================
        // TENURE
        // ===============================================

        tenure:
          toNumber(
            formData?.loanTenure
          ),


        // ===============================================
        // MONTHLY INCOME
        // ===============================================

        monthlyIncome:
          toNumber(
            formData?.monthlyIncome
          ),


        // ===============================================
        // EXISTING EMI
        // ===============================================

        existingEmi:
          toNumber(
            formData?.existingEmi
          ),


        // ===============================================
        // PREFERRED EMI
        // ===============================================

        preferredEmi:
          toNumber(
            formData?.preferredEmi
          ),


        // ===============================================
        // BACKEND DOCUMENT FORMAT
        // ===============================================

        documents:
          documents,

      };


      // =================================================
      // LOG
      // =================================================

      console.log(
        "RENOVATION LOAN PAYLOAD:",
        JSON.stringify(
          payload,
          null,
          2
        )
      );


      // =================================================
      // API CALL
      // =================================================

      await handleMutation({

        apiFunc:
          applyLoan,

        params:
          payload,

        showSuccess:
          true,

        customSuccessMsg:
          "Renovation Loan application submitted successfully!",

        showError:
          true,

        onSuccess:
          (response) => {

            console.log(
              "Renovation Loan Response:",
              response
            );


            resetToTab(
              navigation,
              "History"
            );

          },

      });

    };


  // ===================================================
  // NEXT BUTTON
  // ===================================================

  const handleNext = () => {


    // ================================================
    // VALIDATE CURRENT STEP
    // ================================================

    const isValid =
      validateCurrentStep();


    if (!isValid) {

      return;

    }


    // ================================================
    // NEXT STEP
    // ================================================

    if (
      currentStep <
      totalSteps
    ) {

      setCurrentStep(
        (prev) =>
          prev + 1
      );

      setErrors({});

      return;

    }


    // ================================================
    // FINAL STEP
    // ================================================

    submitApplication();

  };


  // ===================================================
  // BACK BUTTON
  // ===================================================

  const handleBack =
    useCallback(
      () => {

        if (
          currentStep >
          1
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


  // ===================================================
  // HARDWARE BACK
  // ===================================================

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


  // ===================================================
  // RENDER STEP
  // ===================================================

  const renderStep =
    () => {

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
            <CommonEmploymentAndIncome
              {...commonProps}
            />
          );


        case 3:

          return (
            <PropertyDetails
              {...commonProps}
            />
          );


        case 4:

          return (
            <RenovationDetails
              {...commonProps}
            />
          );


        case 5:

          return (
            <CommonLoanRequirement
              {...commonProps}
            />
          );


        case 6:

          return (
            <DocumentUpload
              {...commonProps}
            />
          );


        default:

          return null;

      }

    };


  // ===================================================
  // UI
  // ===================================================

  return (

    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          "#F6F8F7",
      }}
    >

      {/* HEADER */}

      <LoanCommonHeader
        title={
          getHeaderTitle()
        }
        onBackPress={
          handleBack
        }
      />


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

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
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


        {/* BOTTOM BUTTON */}

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


export default ApplyRenovationLoan;