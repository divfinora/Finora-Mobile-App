import React, {
  useCallback,
  useRef,
  useState,
} from "react";

import {
  View,
  ScrollView,
  BackHandler,
  Text,
  StatusBar,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";

import {
  useApplyLoanMutation,
} from "../../../../redux/features/customer/customerApi.js";

import useHandleMutation
  from "../../../../hooks/useHandleMutation.js";

import CommonButton
  from "../../../../components/common/Button/CommonButton";

import KeyboardAvoidingBottomView
  from "../../../../components/common/KeyBoard/KeyboardAvoidingBottomView";

import LoanCommonHeader
  from "../commonComponent/LoanCommonHeader";

import CommonInfoCard
  from "../commonComponent/CommonInfoCard";

import StepProgress
  from "../commonComponent/StepProgress";

import PersonalDetails
  from "./components/EducationPersonalDetails.jsx";

import AcademicInfo
  from "./components/AcademicInfo";

import LoanAmount
  from "./components/LoanAmount";

import ParentGuardianInfo
  from "./components/ParentGuardianInfo";

import FinancialInfo
  from "./components/FinancialInfo";

import EducationLoanDocumentUpload
  from "./components/EducationLoanDocumentUpload.jsx";



import {
  theme,
} from "../../../../theme";

import {
  toNumber,
  buildEducationDocuments,
  validatePersonalDetails,
  validateAcademicInfo,
  validateLoanAmount,
  validateGuardianInfo,
  validateFinancialInfo,
  validateDocuments,
  
} from "./utils/educationLoanHelpers";


// =====================================================
// STEP CONFIG
// =====================================================

const STEP_CONFIG = {
  1: {
    header: "Personal Details",
    infoTitle: "Share your personal info",
    infoDescription:
      "Provide your basic information to get Started with your loan application.",
  },

  2: {
    header: "Academic Info.",
    infoTitle: "Share Your Academic Details",
    infoDescription:
      "Provide your academic information for a quick and accurate loan assessment.",
  },

  3: {
    header: "Loan amt. Application",
    infoTitle: "Share Your Loan Amount info.",
    infoDescription:
      "Enter your required loan amount to find a suitable financing option.",
  },

  4: {
    header: "Parents & Guardian info.",
    infoTitle: "Add Parent & Guardian Details",
    infoDescription:
      "Provide your parent or guardian information for application verification.",
  },

  5: {
    header: "Financial Info.",
    infoTitle: "Share Your Financial Details",
    infoDescription:
      "Provide your financial information for a quick and accurate loan assessment.",
  },

  6: {
    header: "Document Upload",
    infoTitle: "Income Documents Required",
    infoDescription:
      "Upload the required KYC and income Documents",
  },

};


// =====================================================
// VALIDATORS
// =====================================================

const validators = {
  1: validatePersonalDetails,
  2: validateAcademicInfo,
  3: validateLoanAmount,
  4: validateGuardianInfo,
  5: validateFinancialInfo,
  6: validateDocuments,
};


// =====================================================
// SCREEN
// =====================================================

const EducationLoan = ({
  navigation,
}) => {
  const route = useRoute();

  const product =
    route?.params?.product;

  const productId =
    route?.params?.productId ||
    product?._id;


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
  ] = useState({
    // -------------------------------------------------
    // PERSONAL DETAILS
    // -------------------------------------------------
    fullName: "Rahul Sharma",
    dateOfBirth: "15/08/2000",
    mobileNumber: "9876543210",
    email: "rahul.sharma@example.com",
    aadhaarNumber: "123456789012",
    panNumber: "ABCDE1234F",
    pincode: "110001",

    // -------------------------------------------------
    // ACADEMIC / ADMISSION DETAILS
    // -------------------------------------------------
    course: "Bachelor of Technology",
    specialization: "Computer Science and Engineering",
    durationYears: "4",
    collegeUniversity: "Delhi Technological University",
    country: "India",
    state: "Delhi",
    city: "New Delhi",
    admissionStatus: "ADMISSION_CONFIRMED",

    // -------------------------------------------------
    // LOAN DETAILS
    // -------------------------------------------------
    loanAmount: "500000",
    totalCourseCost: "650000",
    hostelExpenses: "100000",
    otherExpenses: "50000",

    // -------------------------------------------------
    // PARENT / GUARDIAN DETAILS
    // -------------------------------------------------
    parentGuardianName: "Rajesh Sharma",
    guardianRelationship: "Father",
    guardianMobileNumber: "9876543211",
    guardianOccupation: "Business",
    guardianEmployerName: "Sharma Enterprises",
    guardianMonthlyIncome: "75000",
    guardianAnnualIncome: "900000",
    guardianPanNumber: "FGHIJ5678K",

    // -------------------------------------------------
    // FINANCIAL DETAILS
    // -------------------------------------------------
    existingLoan: "200000",
    currentEmi: "5000",
    bankName: "HDFC Bank",
    accountNumber: "123456789012",
    ifscCode: "HDFC0001234",

    // -------------------------------------------------
    // REMAINING STEPS EMPTY
    // -------------------------------------------------
    documents: {},
  });
  const [
    errors,
    setErrors,
  ] = useState({});


  // ===================================================
  // SCROLL REFS
  // ===================================================

  const scrollViewRef =
    useRef(null);

  const scrollContentRef =
    useRef(null);


  // ===================================================
  // FIELD POSITIONS
  // ===================================================

  const fieldPositions =
    useRef({});


  // ===================================================
  // API
  // ===================================================

  const [
    applyLoan,
    {
      isLoading:
      isApplyingLoan,
    },
  ] =
    useApplyLoanMutation();

  const {
    handleMutation,
  } =
    useHandleMutation();


  // ===================================================
  // CONSTANTS
  // ===================================================

  const totalSteps = 6;


  // ===================================================
  // STEP DATA
  // ===================================================

  const step =
    STEP_CONFIG[currentStep];

  const progress =
    Math.round(
      (currentStep /
        totalSteps) *
      100
    );


  // ===================================================
  // UPDATE FORM DATA
  // ===================================================

  const updateFormData = (
    key,
    value
  ) => {
    setFormData(
      previous => ({
        ...previous,
        [key]: value,
      })
    );

    // Clear field error when
    // user changes the value.
    setErrors(
      previous => {
        if (!previous?.[key]) {
          return previous;
        }

        const next = {
          ...previous,
        };

        delete next[key];

        return next;
      }
    );
  };


  // ===================================================
  // CLEAR SINGLE FIELD ERROR
  // ===================================================

  const clearFieldError =
    useCallback(
      (field) => {
        setErrors(
          previous => {
            if (!previous?.[field]) {
              return previous;
            }

            const next = {
              ...previous,
            };

            delete next[field];

            return next;
          }
        );
      },
      []
    );


  // ===================================================
  // REGISTER FIELD POSITION
  // ===================================================

  const registerFieldPosition =
    useCallback(
      (
        field,
        y
      ) => {
        if (
          !field ||
          typeof y !== "number"
        ) {
          return;
        }

        fieldPositions.current[field] =
          y;
      },
      []
    );


  // ===================================================
  // RESET FIELD POSITIONS
  // ===================================================

  const resetFieldPositions =
    useCallback(
      () => {
        fieldPositions.current = {};
      },
      []
    );


  // ===================================================
  // SCROLL TO FIRST ERROR
  // ===================================================

  const scrollToFirstError = useCallback(
    (validationErrors) => {
      const errorFields = Object.keys(
        validationErrors || {}
      );

      if (!errorFields.length) {
        console.log(
          "SCROLL DEBUG: No validation errors"
        );
        return;
      }

      const firstErrorField = errorFields[0];

      console.log(
        "================ SCROLL DEBUG ================"
      );

      console.log(
        "ALL ERROR FIELDS:",
        errorFields
      );

      console.log(
        "FIRST ERROR FIELD:",
        firstErrorField
      );

      console.log(
        "REGISTERED FIELD POSITIONS:",
        fieldPositions.current
      );

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            const y =
              fieldPositions.current[
              firstErrorField
              ];

            console.log(
              "TARGET FIELD:",
              firstErrorField
            );

            console.log(
              "TARGET Y:",
              y
            );

            if (typeof y !== "number") {
              console.log(
                "SCROLL FAILED: Field Y position not found for:",
                firstErrorField
              );

              console.log(
                "Available positions:",
                fieldPositions.current
              );

              return;
            }

            const scrollY = Math.max(
              0,
              y - 80
            );

            console.log(
              "SCROLLING TO Y:",
              scrollY
            );

            console.log(
              "================================================"
            );

            scrollViewRef.current?.scrollTo({
              y: scrollY,
              animated: true,
            });
          }, 100);
        });
      });
    },
    []
  );


  // ===================================================
  // VALIDATE CURRENT STEP
  // ===================================================

  const validateCurrentStep =
    useCallback(
      () => {
        const validator =
          validators[
          currentStep
          ];

        if (!validator) {
          return true;
        }

        const stepErrors =
          validator(
            formData
          ) || {};

        setErrors(
          stepErrors
        );

        if (
          Object.keys(
            stepErrors
          ).length > 0
        ) {
          scrollToFirstError(
            stepErrors
          );

          return false;
        }

        return true;
      },
      [
        currentStep,
        formData,
        scrollToFirstError,
      ]
    );


  // ===================================================
  // SUBMIT APPLICATION
  // ===================================================

  const submitApplication =
    async () => {
      try {
        const documents =
          buildEducationDocuments(
            formData,
            product
          );

        const payload = {
          loanType:
            "EDUCATION_LOAN",

          productId:
            productId,

          ...formData,

          // -------------------------------------------
          // NUMBER FIELDS
          // -------------------------------------------

          amount:
            toNumber(
              formData?.loanAmount
            ),

          tenure:
            toNumber(
              formData?.loanTenure
            ),

          durationYears:
            toNumber(
              formData?.durationYears
            ),

          totalCourseCost:
            toNumber(
              formData?.totalCourseCost
            ),

          hostelExpenses:
            toNumber(
              formData?.hostelExpenses
            ),

          otherExpenses:
            toNumber(
              formData?.otherExpenses
            ),

          currentEmi:
            toNumber(
              formData?.currentEmi
            ),

          guardianMonthlyIncome:
            toNumber(
              formData?.guardianMonthlyIncome
            ),

          guardianAnnualIncome:
            toNumber(
              formData?.guardianAnnualIncome
            ),

          // -------------------------------------------
          // DOCUMENTS
          // -------------------------------------------

          documents:
            documents,
        };


        console.log(
          "========== EDUCATION LOAN PAYLOAD =========="
        );

        console.log(
          JSON.stringify(
            payload,
            null,
            2
          )
        );


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
            "Education Loan application submitted successfully!",

          onSuccess:
            () => {
              navigation.navigate(
                "History"
              );
            },
        });

      } catch (error) {
        console.error(
          "Education Loan Submit Error:",
          error
        );
      }
    };


  // ===================================================
  // NEXT
  // ===================================================

  const handleNext =
    () => {
      const valid =
        validateCurrentStep();

      if (!valid) {
        return;
      }

      // -----------------------------------------------
      // MOVE TO NEXT STEP
      // -----------------------------------------------

      if (
        currentStep <
        totalSteps
      ) {
        resetFieldPositions();

        setErrors({});

        setCurrentStep(
          previous =>
            previous + 1
        );

        setTimeout(() => {
          scrollViewRef.current?.scrollTo({
            y: 0,
            animated: false,
          });
        }, 100);

        return;
      }

      // -----------------------------------------------
      // FINAL SUBMIT
      // -----------------------------------------------

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
          resetFieldPositions();

          setCurrentStep(
            previous =>
              previous - 1
          );

          setErrors({});

          setTimeout(() => {
            scrollViewRef.current?.scrollTo({
              y: 0,
              animated: false,
            });
          }, 50);

          return true;
        }

        return false;
      },
      [
        currentStep,
        resetFieldPositions,
      ]
    );


  // ===================================================
  // ANDROID BACK
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
      const props = {
        formData,
        setFormData,
        errors,
        setErrors,
        updateFormData,
        clearFieldError,
        registerFieldPosition,
        scrollContentRef,
        product,
      };

      switch (
      currentStep
      ) {
        // ---------------------------------------------
        // STEP 1
        // ---------------------------------------------

        case 1:
          return (
            <PersonalDetails
              {...props}
            />
          );


        // ---------------------------------------------
        // STEP 2
        // ---------------------------------------------

        case 2:
          return (
            <AcademicInfo
              {...props}
            />
          );


        // ---------------------------------------------
        // STEP 3
        // ---------------------------------------------

        case 3:
          return (
            <LoanAmount
              {...props}
            />
          );


        // ---------------------------------------------
        // STEP 4
        // ---------------------------------------------

        case 4:
          return (
            <ParentGuardianInfo
              {...props}
            />
          );


        // ---------------------------------------------
        // STEP 5
        // ---------------------------------------------

        case 5:
          return (
            <FinancialInfo
              {...props}
            />
          );


        // ---------------------------------------------
        // STEP 6
        // ---------------------------------------------

        case 6:
          return (
            <EducationLoanDocumentUpload
              {...props}
            />
          );


        // ---------------------------------------------
        // STEP 7
        // ---------------------------------------------



        default:
          return null;
      }
    };


  // ===================================================
  // UI
  // ===================================================

  return (
    <SafeAreaView
      edges={[
        "bottom",
        "right",
        "left",
      ]}
      style={{
        flex: 1,
        backgroundColor:
          theme.colors.background,
      }}
    >

      {/* =================================================
          STATUS BAR
      ================================================= */}

      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />


      {/* =================================================
          HEADER
      ================================================= */}

      <LoanCommonHeader
        title={
          step?.header
        }
        onBackPress={
          handleBack
        }
      />


      {/* =================================================
          KEYBOARD WRAPPER
      ================================================= */}

      <KeyboardAvoidingBottomView>

        {/* =================================================
            SCROLL VIEW
        ================================================= */}

        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={
            false
          }
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom:
              theme.spacing.xl,
          }}
        >

          {/* =================================================
              SCROLL CONTENT
          ================================================= */}

          <View
            ref={scrollContentRef}
            collapsable={false}
            style={{
              paddingHorizontal:
                theme.spacing.xxl,
            }}
          >

            {/* =================================================
                INFO CARD
            ================================================= */}

            <CommonInfoCard
              step={
                currentStep
              }
              title={
                step?.infoTitle
              }
              description={
                step?.infoDescription
              }
            />


            {/* =================================================
                STEP PROGRESS
            ================================================= */}

            <StepProgress
              currentStep={
                currentStep
              }
              totalSteps={
                totalSteps
              }
              progress={
                progress
              }
              heading={
                currentStep === 1
                  ? "Personal Details"
                  : currentStep === 2
                    ? "Academic Information"
                    : currentStep === 3
                      ? "Loan Information Amt."
                      : currentStep === 4
                        ? "Parents & Guardian Details"
                        : currentStep === 5
                          ? "Financial Information"
                          : "Upload Documents"
              }
            />


            {/* =================================================
                CURRENT STEP
            ================================================= */}

            {renderStep()}

          </View>

        </ScrollView>


        {/* =================================================
            FIXED BOTTOM BUTTON
        ================================================= */}

        <View
          style={{
            padding:
              theme.spacing.lg,

            backgroundColor:
              theme.colors.white,

            borderTopWidth:
              theme.borderWidth?.thin ||
              1,

            borderTopColor:
              theme.colors.divider ||
              "#E2E8F0",
          }}
        >

          <CommonButton
            title={
              currentStep ===
                totalSteps
                ? "Submit"
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

            rightIcon={
              !isApplyingLoan ? (
                <Text
                  style={{
                    color:
                      theme.button
                        .primary
                        .textColor,

                    fontSize: 22,

                    lineHeight: 22,
                  }}
                >
                  →
                </Text>
              ) : null
            }
          />

        </View>

      </KeyboardAvoidingBottomView>

    </SafeAreaView>
  );
};


export default EducationLoan;