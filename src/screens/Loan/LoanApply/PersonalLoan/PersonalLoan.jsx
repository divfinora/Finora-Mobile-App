// =====================================================
// PersonalLoan.jsx
// =====================================================

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


// =====================================================
// API
// =====================================================

import {
  useApplyLoanMutation,
} from "../../../../redux/features/customer/customerApi.js";

import useHandleMutation
  from "../../../../hooks/useHandleMutation.js";


// =====================================================
// NAVIGATION
// =====================================================

import {
  resetToTab,
} from "../../../../navigation/navigationReset.js";


// =====================================================
// COMMON COMPONENTS
// =====================================================

import CommonButton
  from "../../../../components/common/Button/CommonButton";

import LoanCommonHeader
  from "../commonComponent/LoanCommonHeader";

import CommonInfoCard
  from "../commonComponent/CommonInfoCard";

import StepProgress
  from "../commonComponent/StepProgress.jsx";


// =====================================================
// STEP COMPONENTS
// =====================================================

import VerificationDocument
  from "../commonComponent/VerificationDocument.jsx";

import CommonLoanRequirement
  from "../commonComponent/CommonLoanRequirement.jsx";

import RequiredDocument
  from "./components/RequiredDocument.jsx";

import IncomeDetails
  from "./components/IncomeDetails.jsx";

import IncomeDocument
  from "./components/IncomeDocument.jsx";

import ReviewDocument
  from "./components/ReviewDocument.jsx";


// =====================================================
// THEME
// =====================================================

import {
  theme,
} from "../../../../theme/index.js";


// =====================================================
// NUMBER HELPER
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
// FILE URL HELPER
// =====================================================

const getFileUrl = (file) => {

  if (!file) {
    return null;
  }

  return (
    file?.url ||
    file?.file ||
    file?.uri ||
    null
  );
};


// =====================================================
// STEP 1 VALIDATION
// VERIFICATION DOCUMENT
// =====================================================

const validateStep1 = (formData) => {

  const errors = {};

  console.log(
    "\n========== PERSONAL LOAN STEP 1 =========="
  );

  console.log(
    "FORM DATA:",
    JSON.stringify(formData, null, 2)
  );

  /*
   * VerificationDocument ka exact data structure
   * agar tumhare component mein different hai,
   * to yahan corresponding field add kar dena.
   *
   * Currently required document validation
   * Step 3 mein ho rahi hai.
   */

  console.log(
    "STEP 1 ERRORS:",
    JSON.stringify(errors, null, 2)
  );

  return errors;
};


// =====================================================
// STEP 2 VALIDATION
// LOAN REQUIREMENT
// =====================================================

const validateStep2 = (formData) => {

  const errors = {};


  // ===================================================
  // LOAN AMOUNT
  // ===================================================

  const loanAmount =
    String(
      formData?.loanAmount || ""
    )
      .replace(/[₹,]/g, "")
      .trim();

  if (!loanAmount) {

    errors.loanAmount =
      "Enter required loan amount";

  } else if (
    Number(loanAmount) <= 0
  ) {

    errors.loanAmount =
      "Enter a valid loan amount";

  }


  // ===================================================
  // LOAN TENURE
  // ===================================================

  if (
    !String(
      formData?.loanTenure || ""
    ).trim()
  ) {

    errors.loanTenure =
      "Select loan tenure";

  }


  // ===================================================
  // LOAN PURPOSE
  // ===================================================

  if (
    !String(
      formData?.loanPurpose || ""
    ).trim()
  ) {

    errors.loanPurpose =
      "Enter loan purpose";

  }


  // ===================================================
  // PREFERRED EMI
  // ===================================================

  const preferredEmi =
    String(
      formData?.preferredEmi || ""
    )
      .replace(/[₹,]/g, "")
      .trim();

  if (!preferredEmi) {

    errors.preferredEmi =
      "Enter preferred EMI";

  } else if (
    Number(preferredEmi) <= 0
  ) {

    errors.preferredEmi =
      "Enter a valid EMI amount";

  }


  console.log(
    "\n========== PERSONAL LOAN STEP 2 =========="
  );

  console.log(
    "FORM DATA:",
    JSON.stringify(formData, null, 2)
  );

  console.log(
    "ERRORS:",
    JSON.stringify(errors, null, 2)
  );

  return errors;
};


// =====================================================
// STEP 3 VALIDATION
// REQUIRED DOCUMENTS
// =====================================================

const validateStep3 = (formData) => {

  const errors = {};

  const requiredDocs =
    Array.isArray(
      formData?.requiredDocs
    )
      ? formData.requiredDocs
      : [];


  // ===================================================
  // IDENTITY PROOF
  // ===================================================

  const identityProof =
    requiredDocs.find(
      (item) =>
        item?.type === "identityProof"
    );

  if (
    !identityProof?.files?.length
  ) {

    errors.identityProof =
      "Please upload Identity Proof";

  }


  // ===================================================
  // ADDRESS PROOF
  // ===================================================

  const addressProof =
    requiredDocs.find(
      (item) =>
        item?.type === "addressProof"
    );

  if (
    !addressProof?.files?.length
  ) {

    errors.addressProof =
      "Please upload Address Proof";

  }


  // ===================================================
  // PAN CARD
  // ===================================================

  const panCard =
    requiredDocs.find(
      (item) =>
        item?.type === "panCard"
    );

  if (
    !panCard?.files?.length
  ) {

    errors.panCard =
      "Please upload PAN Card";

  }


  console.log(
    "\n========== PERSONAL LOAN STEP 3 =========="
  );

  console.log(
    "REQUIRED DOCUMENTS:",
    JSON.stringify(
      requiredDocs,
      null,
      2
    )
  );

  console.log(
    "ERRORS:",
    JSON.stringify(
      errors,
      null,
      2
    )
  );

  return errors;
};


// =====================================================
// STEP 4 VALIDATION
// EMPLOYMENT TYPE
// =====================================================

const validateStep4 = (formData) => {

  const errors = {};

  const employmentType =
    formData
      ?.incomeDetails
      ?.employmentType;


  if (!employmentType) {

    errors.employmentType =
      "Please select employment type";

  }


  console.log(
    "\n========== PERSONAL LOAN STEP 4 =========="
  );

  console.log(
    "EMPLOYMENT TYPE:",
    employmentType
  );

  console.log(
    "ERRORS:",
    JSON.stringify(
      errors,
      null,
      2
    )
  );

  return errors;
};


// =====================================================
// STEP 5 VALIDATION
// INCOME DOCUMENTS
//
// SALARIED:
// salarySlip
//
// SELF EMPLOYED:
// form16
// companyId
// offerLetter
// bankStatement
// =====================================================

const validateStep5 = (formData) => {

  const errors = {};

  const employmentType =
    formData
      ?.incomeDetails
      ?.employmentType;

  const incomeDocs =
    Array.isArray(
      formData?.incomeDocs
    )
      ? formData.incomeDocs
      : [];


  // ===================================================
  // SALARIED
  // ===================================================

  if (
  employmentType === "salaried"
) {

  // ===============================================
  // SALARY SLIP
  // ===============================================

  const salarySlip =
    incomeDocs.find(
      (item) =>
        item?.type === "salarySlip"
    );

  if (
    !salarySlip?.files?.length
  ) {

    errors.salarySlip =
      "Please upload Salary Slip";

  }


  // ===============================================
  // BANK STATEMENT
  // ===============================================

  const bankStatement =
    incomeDocs.find(
      (item) =>
        item?.type === "bankStatement"
    );

  if (
    !bankStatement?.files?.length
  ) {

    errors.bankStatement =
      "Please upload Bank Statement";

  }

}


  // ===================================================
  // SELF EMPLOYED
  // ===================================================

  if (
    employmentType === "self_employed"
  ) {

    // -----------------------------------------------
    // FORM 16
    // -----------------------------------------------

    const form16 =
      incomeDocs.find(
        (item) =>
          item?.type === "form16"
      );

    if (
      !form16?.files?.length
    ) {

      errors.form16 =
        "Please upload Form 16";

    }


    // -----------------------------------------------
    // COMPANY ID
    // -----------------------------------------------

    const companyId =
      incomeDocs.find(
        (item) =>
          item?.type === "companyId"
      );

    if (
      !companyId?.files?.length
    ) {

      errors.companyId =
        "Please upload Company ID";

    }


    // -----------------------------------------------
    // OFFER LETTER
    // -----------------------------------------------

    const offerLetter =
      incomeDocs.find(
        (item) =>
          item?.type === "offerLetter"
      );

    if (
      !offerLetter?.files?.length
    ) {

      errors.offerLetter =
        "Please upload Offer Letter";

    }


    // -----------------------------------------------
    // BANK STATEMENT
    // -----------------------------------------------

    const bankStatement =
      incomeDocs.find(
        (item) =>
          item?.type === "bankStatement"
      );

    if (
      !bankStatement?.files?.length
    ) {

      errors.bankStatement =
        "Please upload Bank Statement";

    }

  }


  console.log(
    "\n========== PERSONAL LOAN STEP 5 =========="
  );

  console.log(
    "EMPLOYMENT TYPE:",
    employmentType
  );

  console.log(
    "INCOME DOCUMENTS:",
    JSON.stringify(
      incomeDocs,
      null,
      2
    )
  );

  console.log(
    "ERRORS:",
    JSON.stringify(
      errors,
      null,
      2
    )
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
// STATIC PERSONAL LOAN DOCUMENT IDS
//
// IMPORTANT:
// Replace these values with your actual backend IDs.
//
// Same architecture as Vehicle Loan:
// type -> static backend document ID
// =====================================================

 const documentIdMap = {

  // -----------------------------------------------
  // REQUIRED DOCUMENTS
  // -----------------------------------------------

  identityProof:
    "6a4b57ab1f72b0160191314d", // Aadhaar

  addressProof:
    "6a7c13541a8edbe134a0b670", // TODO: actual Address Proof ID

  panCard:
    "6a4b57ab1f72b0160191314c", // PAN


  // -----------------------------------------------
  // SALARIED
  // -----------------------------------------------

  salarySlip:
    "6a4b57ab1f72b0160191314e", // Salary Slip

  bankStatement:
    "6a4b57ab1f72b0160191314f", // Bank Statement


  // -----------------------------------------------
  // SELF EMPLOYED
  // -----------------------------------------------

  form16:
    "6a86d14f24eccd63ba65dc62",

  companyId:
    "6a86d14f24eccd63ba65dc63",

  offerLetter:
    "6a86d14f24eccd63ba65dc64",

};


// =====================================================
// BUILD REQUIRED DOCUMENTS
//
// FRONTEND:
//
// requiredDocs: [
//   {
//     type: "identityProof",
//     files: [
//       {
//         url: "..."
//       }
//     ]
//   }
// ]
//
// BACKEND:
//
// documents: [
//   {
//     document: "STATIC_DOCUMENT_ID",
//     file: "URL"
//   }
// ]
// =====================================================

const buildRequiredDocuments = (
  formData
) => {

  const requiredDocs =
    Array.isArray(
      formData?.requiredDocs
    )
      ? formData.requiredDocs
      : [];


  const requiredTypes = [

    "identityProof",

    "addressProof",

    "panCard",

  ];


  return requiredDocs
    .filter(
      (document) =>
        requiredTypes.includes(
          document?.type
        )
    )
    .flatMap(
      (document) => {

        const documentId =
          documentIdMap[
            document?.type
          ];


        if (!documentId) {

          console.warn(
            "Missing static document ID:",
            document?.type
          );

          return [];

        }


        const files =
          Array.isArray(
            document?.files
          )
            ? document.files
            : [];


        return files
          .map(
            (file) => {

              const fileUrl =
                getFileUrl(file);


              if (!fileUrl) {

                return null;

              }


              return {

                document:
                  documentId,

                file:
                  fileUrl,

              };

            }
          )
          .filter(Boolean);

      }
    );

};


// =====================================================
// BUILD INCOME DOCUMENTS
//
// IMPORTANT:
//
// Salaried -> ONLY salarySlip
//
// Self Employed ->
// form16
// companyId
// offerLetter
// bankStatement
//
// Old/non-applicable documents can remain
// in frontend preview, but are NOT sent.
// =====================================================

const buildIncomeDocuments = (
  formData
) => {

  const incomeDocs =
    Array.isArray(
      formData?.incomeDocs
    )
      ? formData.incomeDocs
      : [];


  const employmentType =
    formData
      ?.incomeDetails
      ?.employmentType;


  // ===================================================
  // SALARIED
  // Salary Slip + Bank Statement
  // ===================================================

  if (
    employmentType === "salaried"
  ) {

    const allowedTypes = [

      "salarySlip",

      "bankStatement",

    ];


    return incomeDocs

      .filter(
        (document) =>
          allowedTypes.includes(
            document?.type
          )
      )

      .flatMap(
        (document) => {

          const documentId =
            documentIdMap[
              document?.type
            ];


          if (!documentId) {

            console.warn(
              "Missing income document ID:",
              document?.type
            );

            return [];

          }


          const files =
            Array.isArray(
              document?.files
            )
              ? document.files
              : [];


          return files

            .map(
              (file) => {

                const fileUrl =
                  getFileUrl(file);


                if (!fileUrl) {

                  return null;

                }


                return {

                  document:
                    documentId,

                  file:
                    fileUrl,

                };

              }
            )

            .filter(Boolean);

        }
      );

  }


  // ===================================================
  // SELF EMPLOYED
  // Form 16 + Company ID + Offer Letter + Bank Statement
  // ===================================================

  if (
    employmentType ===
    "self_employed"
  ) {

    const allowedTypes = [

      "form16",

      "companyId",

      "offerLetter",

      "bankStatement",

    ];


    return incomeDocs

      .filter(
        (document) =>
          allowedTypes.includes(
            document?.type
          )
      )

      .flatMap(
        (document) => {

          const documentId =
            documentIdMap[
              document?.type
            ];


          if (!documentId) {

            console.warn(
              "Missing income document ID:",
              document?.type
            );

            return [];

          }


          const files =
            Array.isArray(
              document?.files
            )
              ? document.files
              : [];


          return files

            .map(
              (file) => {

                const fileUrl =
                  getFileUrl(file);


                if (!fileUrl) {

                  return null;

                }


                return {

                  document:
                    documentId,

                  file:
                    fileUrl,

                };

              }
            )

            .filter(Boolean);

        }
      );

  }


  return [];

};


// =====================================================
// PERSONAL LOAN
// =====================================================

const PersonalLoan = ({
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


  // ===================================================
  // TOTAL STEPS
  // ===================================================

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
  // HEADER
  // ===================================================

  const getHeaderTitle = () => {

    switch (
      currentStep
    ) {

      case 1:
        return "Verification Document";

      case 2:
        return "Loan Requirement";

      case 3:
        return "Required Document";

      case 4:
        return "Income Details";

      case 5:
        return "Income Document";

      case 6:
        return "Review Application";

      default:
        return "Personal Loan";

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

      setErrors({});

      return true;

    }


    const currentStepErrors =
      validator(
        formData
      ) || {};


    setErrors(
      currentStepErrors
    );


    const isValid =
      Object.keys(
        currentStepErrors
      ).length === 0;


    console.log(
      "\n========================================"
    );

    console.log(
      "CURRENT STEP:",
      currentStep
    );

    console.log(
      "FORM DATA:"
    );

    console.log(
      JSON.stringify(
        formData,
        null,
        2
      )
    );

    console.log(
      "VALIDATION ERRORS:"
    );

    console.log(
      JSON.stringify(
        currentStepErrors,
        null,
        2
      )
    );

    console.log(
      "IS VALID:",
      isValid
    );

    console.log(
      "========================================"
    );


    return isValid;

  };


  // ===================================================
  // SUBMIT APPLICATION
  // ===================================================

  const submitApplication =
    async () => {

      try {

        // ===========================================
        // FORM DATA LOG
        // ===========================================

        console.log(
          "\n\n========================================"
        );

        console.log(
          "FINAL FORM DATA"
        );

        console.log(
          JSON.stringify(
            formData,
            null,
            2
          )
        );

        console.log(
          "========================================"
        );


        // ===========================================
        // REQUIRED DOCUMENTS
        // ===========================================

        const requiredDocuments =
          buildRequiredDocuments(
            formData
          );


        // ===========================================
        // INCOME DOCUMENTS
        // ===========================================

        const incomeDocuments =
          buildIncomeDocuments(
            formData
          );


        // ===========================================
        // FINAL DOCUMENT ARRAY
        // ===========================================

        const documents = [

          ...requiredDocuments,

          ...incomeDocuments,

        ];


        // ===========================================
        // EMPLOYMENT TYPE
        // ===========================================

        const employmentType =
          formData
            ?.incomeDetails
            ?.employmentType;


        // ===========================================
        // FINAL PAYLOAD
        // ===========================================

        const payload = {

          // -----------------------------------------
          // LOAN TYPE
          // -----------------------------------------

          loanType:
            "PERSONAL_LOAN",


          // -----------------------------------------
          // PRODUCT ID
          // -----------------------------------------

          productId:
            productId,


          // -----------------------------------------
          // FORM DATA
          // -----------------------------------------

          ...formData,


          // -----------------------------------------
          // NORMALIZED AMOUNT
          // -----------------------------------------

          amount:
            toNumber(
              formData?.loanAmount
            ),


          // -----------------------------------------
          // NORMALIZED TENURE
          // -----------------------------------------

          tenure:
            toNumber(
              formData?.loanTenure
            ),


          // -----------------------------------------
          // MONTHLY INCOME
          // -----------------------------------------

          monthlyIncome:
            toNumber(
              formData?.monthlyIncome
            ),


          // -----------------------------------------
          // EXISTING EMI
          // -----------------------------------------

          existingEmi:
            toNumber(
              formData?.existingEmi
            ),


          // -----------------------------------------
          // PREFERRED EMI
          // -----------------------------------------

          preferredEmi:
            toNumber(
              formData?.preferredEmi
            ),


          // -----------------------------------------
          // EMPLOYMENT TYPE
          // -----------------------------------------

          employmentType:
            employmentType,


          // -----------------------------------------
          // FINAL BACKEND DOCUMENTS
          // -----------------------------------------

          documents:
            documents,

        };


        // ===========================================
        // FINAL PAYLOAD LOG
        // ===========================================

        console.log(
          "\n\n========================================"
        );

        console.log(
          "FINAL PERSONAL LOAN PAYLOAD"
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


        // ===========================================
        // API
        // ===========================================

        await handleMutation({

          apiFunc:
            applyLoan,

          params:
            payload,

          showSuccess:
            true,

          customSuccessMsg:
            "Personal Loan application submitted successfully!",

          showError:
            true,

          onSuccess:
            (response) => {

              console.log(
                "\n========================================"
              );

              console.log(
                "PERSONAL LOAN API RESPONSE"
              );

              console.log(
                JSON.stringify(
                  response,
                  null,
                  2
                )
              );

              console.log(
                "========================================"
              );


              // ====================================
              // HISTORY
              // ====================================

              resetToTab(
                navigation,
                "History"
              );

            },

        });

      } catch (error) {

        console.log(
          "PERSONAL LOAN SUBMIT ERROR:",
          error
        );

      }

    };


  // ===================================================
  // NEXT
  // ===================================================

  const handleNext = () => {

    console.log(
      "\n========================================"
    );

    console.log(
      "CONTINUE CLICKED"
    );

    console.log(
      "CURRENT STEP:",
      currentStep
    );

    console.log(
      "========================================"
    );


    // ===========================================
    // VALIDATION
    // ===========================================

    const isValid =
      validateCurrentStep();


    if (!isValid) {

      console.log(
        "❌ VALIDATION FAILED"
      );

      return;

    }


    console.log(
      "✅ VALIDATION PASSED"
    );


    // ===========================================
    // NEXT STEP
    // ===========================================

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


    // ===========================================
    // SUBMIT
    // ===========================================

    submitApplication();

  };


  // ===================================================
  // BACK
  // ===================================================

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


  // ===================================================
  // ANDROID HARDWARE BACK
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

      // =============================================
      // STEP 1
      // =============================================

      case 1:

        return (
          <VerificationDocument
            {...commonProps}
          />
        );


      // =============================================
      // STEP 2
      // =============================================

      case 2:

        return (
          <CommonLoanRequirement
            {...commonProps}
          />
        );


      // =============================================
      // STEP 3
      // =============================================

      case 3:

        return (
          <RequiredDocument
            {...commonProps}
          />
        );


      // =============================================
      // STEP 4
      // =============================================

      case 4:

        return (
          <IncomeDetails
            {...commonProps}
          />
        );


      // =============================================
      // STEP 5
      // =============================================

      case 5:

        return (
          <IncomeDocument
            {...commonProps}
          />
        );


      // =============================================
      // STEP 6
      // =============================================

      case 6:

        return (
          <ReviewDocument
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
        backgroundColor: "#F6F8F7",
      }}
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <LoanCommonHeader
        title={
          getHeaderTitle()
        }

        onBackPress={
          handleBack
        }
      />


      {/* =================================================
          KEYBOARD
      ================================================= */}

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

        {/* ===============================================
            CONTENT
        =============================================== */}

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

            {/* ==========================================
                INFO CARD
            ========================================== */}

            <CommonInfoCard />


            {/* ==========================================
                STEP PROGRESS
            ========================================== */}

            <StepProgress
              currentStep={
                currentStep
              }

              totalSteps={
                totalSteps
              }
            />


            {/* ==========================================
                CURRENT STEP
            ========================================== */}

            {
              renderStep()
            }

          </View>

        </ScrollView>


        {/* =================================================
            BOTTOM BUTTON
        ================================================= */}

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


// =====================================================
// EXPORT
// =====================================================

export default PersonalLoan;