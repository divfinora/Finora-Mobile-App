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
// ==========================================
// API
// ==========================================

import {
  useApplyLoanMutation,
} from "../../../../redux/features/customer/customerApi.js";

import useHandleMutation from "../../../../hooks/useHandleMutation.js";


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

import CommonEmploymentAndIncome
  from "../commonComponent/CommonEmploymentAndIncome.jsx";

import VehicleInformation
  from "./components/VehicleInformation.jsx";

import DocumentUpload
  from "./components/DocumentUpload.jsx";

import CommonLoanRequirement
  from "../commonComponent/CommonLoanRequirement.jsx";


// ==========================================
// THEME
// ==========================================

import {
  theme,
} from "../../../../theme/index.js";


// ==========================================
// NAVIGATION
// ==========================================

 


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
// STEP 3 - VEHICLE INFORMATION
// =====================================================

const validateStep3 = (
  formData
) => {

  const errors = {};


  // Vehicle Type
  if (
    !formData?.vehicleType
  ) {

    errors.vehicleType =
      "Select vehicle type";

  }


  // Vehicle Condition
  if (
    !formData?.vehicleCondition
  ) {

    errors.vehicleCondition =
      "Select vehicle condition";

  }


  // Brand & Model
  if (
    !formData?.brandModel?.trim()
  ) {

    errors.brandModel =
      "Select brand & model";

  }


  // On Road Price
  if (
    !String(
      formData?.onRoadPrice || ""
    ).trim()
  ) {

    errors.onRoadPrice =
      "Enter on-road price";

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


  // Loan Amount
  if (
    !String(
      formData?.loanAmount || ""
    ).trim()
  ) {

    errors.loanAmount =
      "Enter required loan amount";

  }


  // Loan Tenure
  if (
    !String(
      formData?.loanTenure || ""
    ).trim()
  ) {

    errors.loanTenure =
      "Select loan tenure";

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
// STEP 5 - DOCUMENTS
// =====================================================

const validateStep5 = (
  formData
) => {

  const errors = {};


  // ==========================================
  // REQUIRED VEHICLE LOAN DOCUMENTS
  // ==========================================

  const requiredDocuments = [

    "aadharCard",

    "panCard",

    "salarySlips",

    "drivingLicense",

    "bankStatement",

  ];


  // ==========================================
  // DOCUMENTS FROM FORM DATA
  // ==========================================

  const documents =
    formData?.documents || [];


  // ==========================================
  // CHECK EACH DOCUMENT
  // ==========================================

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

};


// =====================================================
// MAIN COMPONENT
// =====================================================

const ApplyVehicleLoan = ({
  navigation,
}) => {


  // ==========================================
  // ROUTE
  // ==========================================

  const route =
    useRoute();


  const product =
    route?.params?.product;


  const productId =
    route?.params?.productId;




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


  // ==========================================
  // DEBUG
  // ==========================================

  // console.log(
  //   "VEHICLE FORM DATA:",
  //   formData
  // );


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
        return "Employment & Income";

      case 3:
        return "Vehicle Information";

      case 4:
        return "Loan Requirement";

      case 5:
        return "Document Upload";

      default:
        return "Vehicle Loan";

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


    // No validator
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
  // SUBMIT VEHICLE LOAN
  // =====================================================

  const submitApplication =
    async () => {


      // ================================================
      // DOCUMENT ID MAPPING
      // ================================================

      const documentIdMap = {

        // Aadhaar
        aadharCard:
          "6a4b57ab1f72b0160191314d",

        // PAN
        panCard:
          "6a4b57ab1f72b0160191314c",

        // Salary Slip
        salarySlips:
          "6a4b57ab1f72b0160191314e",

        // Bank Statement
        bankStatement:
          "6a4b57ab1f72b0160191314f",

        // Driving License
        drivingLicense:
          "6a7d63d8786d2ef14a19e8f1",

      };


      // ================================================
      // FRONTEND DOCUMENTS
      // ================================================

      const frontendDocuments =
        formData?.documents || [];


      // ================================================
      // CONVERT DOCUMENT FORMAT
      //
      // Frontend:
      //
      // {
      //   type: "aadharCard",
      //   files: [
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
      //   file: "URL"
      // }
      // ================================================

      const documents =
        frontendDocuments.flatMap(
          (document) => {


            const documentId =
              documentIdMap[
              document?.type
              ];


            // ==========================================
            // INVALID DOCUMENT TYPE
            // ==========================================

            if (
              !documentId
            ) {

              return [];

            }


            // ==========================================
            // EACH FILE = ONE OBJECT
            // ==========================================

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
      // NUMERIC HELPERS
      // =================================================

      const toNumber =
        (value) => {

          if (
            value ===
            null ||
            value ===
            undefined
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


      // =================================================
      // VEHICLE TYPE NORMALIZATION
      // =================================================

      const vehicleTypeMap = {

        Car:
          "CAR",

        CAR:
          "CAR",

        Commercial:
          "COMMERCIAL",

        COMMERCIAL:
          "COMMERCIAL",

        Bike:
          "BIKE",

        BIKE:
          "BIKE",

      };


      // =================================================
      // VEHICLE CONDITION NORMALIZATION
      // =================================================

      const vehicleConditionMap = {

        New:
          "NEW",

        NEW:
          "NEW",

        Used:
          "USED",

        USED:
          "USED",

      };


      // =================================================
      // FINAL PAYLOAD
      // =================================================
//  console.log(productId ,",productIdproductIdproductIdproductIdproductIdproductIdproductIdproductIdproductIdproductIdproductIdproductIdproductIdproductIdproductIdproductIdproductIdproductIdproductIdproductId")
//  console.log(productId ,",productId")
      const payload = {

        // ==========================================
        // LOAN TYPE
        // ==========================================

        loanType:
          "VEHICLE_LOAN",


        // ==========================================
        // PRODUCT ID
        // ==========================================

        productId:
          productId,
        


        // ==========================================
        // FORM DATA
        // ==========================================

        ...formData,


        // ==========================================
        // NORMALIZED VEHICLE TYPE
        // ==========================================

        vehicleType:
          vehicleTypeMap[
          formData?.vehicleType
          ] ||
          formData?.vehicleType,


        // ==========================================
        // NORMALIZED CONDITION
        // ==========================================

        vehicleCondition:
          vehicleConditionMap[
          formData?.vehicleCondition
          ] ||
          formData?.vehicleCondition,


        // ==========================================
        // LOAN AMOUNT
        // ==========================================

        amount:
          toNumber(
            formData?.loanAmount
          ),


        // ==========================================
        // TENURE
        // ==========================================

        tenure:
          toNumber(
            formData?.loanTenure
          ),


        // ==========================================
        // MONTHLY INCOME
        // ==========================================

        monthlyIncome:
          toNumber(
            formData?.monthlyIncome
          ),


        // ==========================================
        // EXISTING EMI
        // ==========================================

        existingEmi:
          toNumber(
            formData?.existingEmi
          ),


        // ==========================================
        // ON ROAD PRICE
        // ==========================================

        onRoadPrice:
          toNumber(
            formData?.onRoadPrice
          ),


        // ==========================================
        // PREFERRED EMI
        // ==========================================

        preferredEmi:
          toNumber(
            formData?.preferredEmi
          ),


        // ==========================================
        // BACKEND DOCUMENT FORMAT
        // ==========================================

        documents:

          documents,

      };


      // =================================================
      // LOG PAYLOAD
      // =================================================

      // console.log(
      //   "================================"
      // );

      // console.log(
      //   "VEHICLE LOAN PAYLOAD"
      // );

      // console.log(
      //   JSON.stringify(
      //     payload,
      //     null,
      //     2
      //   )
      // );

      // console.log(
      //   "================================"
      // );


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
          "Vehicle Loan application submitted successfully!",

        showError:
          true,

        onSuccess:
          (response) => {


            // ==========================================
            // RESPONSE LOG
            // ==========================================

            console.log(
              "Vehicle Loan Response:",
              response
            );


            // ==========================================
            // GO TO MY LOANS
            // ==========================================

            resetToTab(
              navigation,
              "History"
            );

          },

      });

    };


  // =====================================================
  // NEXT BUTTON
  // =====================================================

  const handleNext = () => {


    // ==========================================
    // VALIDATE CURRENT STEP
    // ==========================================

    const isValid =
      validateCurrentStep();


    if (!isValid) {

      return;

    }


    // ==========================================
    // NEXT STEP
    // ==========================================

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


    // ==========================================
    // FINAL STEP
    // ==========================================

    submitApplication();

  };


  // =====================================================
  // BACK BUTTON
  // =====================================================

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
            <VehicleInformation
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


export default ApplyVehicleLoan;