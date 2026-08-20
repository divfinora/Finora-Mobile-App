// PropertyLoanApplyScreen.jsx

import React, {
  useCallback,
  useState,
} from 'react';

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  BackHandler,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  useFocusEffect,
} from '@react-navigation/native';


// ======================================================
// FORMS
// ======================================================

import CommonPersonalDetailsForm
  from '../commonComponent/CommonPersonalDetailsForm';

import AddressForm
  from './components/AddressForm';

import LoanRequirementsForm
  from './components/LoanRequirementsForm';

import PropertyDetailsForm
  from './components/PropertyDetailsForm';

import EmploymentForm
  from './components/EmploymentForm';

import ExistingLoanForm
  from './components/ExistingLoanForm';

import DocumentUploadForm
  from './components/DocumentUploadForm';


// ======================================================
// COMMON COMPONENTS
// ======================================================

import CommonButton
  from '../../../../components/common/Button/CommonButton';

import LoanCommonHeader
  from '../commonComponent/LoanCommonHeader';

import CommonInfoCard
  from '../commonComponent/CommonInfoCard';

import StepProgress
  from '../commonComponent/StepProgress';


// ======================================================
// THEME
// ======================================================

import {
  theme,
} from '../../../../theme';


// ======================================================
// API
// ======================================================

import {
  useApplyLoanMutation,
} from '../../../../redux/features/customer/customerApi';

import useHandleMutation
  from '../../../../hooks/useHandleMutation';

import {
  resetToTab,
} from '../../../../navigation/navigationReset';


// ======================================================
// STEP TITLES
// ======================================================

const STEP_TITLES = [
  'Personal Details',
  'Address',
  'Loan Requirements',
  'Property Details',
  'Employment Details',
  'Existing Loans',
  'Documents',
];


// ======================================================
// PROPERTY LOAN DOCUMENT IDS
// ======================================================

const documentIdMap = {

  panCard:
    '6a4b57ab1f72b0160191314c',

  aadharCard:
    '6a4b57ab1f72b0160191314d',

  addressProof:
    '6a7c13541a8edbe134a0b670',

  incomeProof:
    '6a7c13541a8edbe134a0b671',

  propertyTaxReceipt:
    '6a4b57ab1f72b01601913152',

  saleDeed:
    '6a4b57ab1f72b01601913152',

  encumbranceCertificate:
    '6a4b57ab1f72b01601913152',

  approvedPropertyPlan:
    '6a4b57ab1f72b01601913152',

  salarySlips:
    '6a4b57ab1f72b0160191314e',

  bankStatement:
    '6a4b57ab1f72b0160191314f',

};


// ======================================================
// REQUIRED DOCUMENT TYPES
// ======================================================

const REQUIRED_DOCUMENTS = [

  'panCard',

  'aadharCard',

  'addressProof',

  'incomeProof',

  'salarySlips',

  'bankStatement',

];


// ======================================================
// HELPER
// ======================================================

const toNumber = (
  value
) => {

  if (
    value === undefined ||
    value === null ||
    value === ''
  ) {

    return 0;

  }

  const number =
    Number(
      String(value)
        .replace(
          /[₹,\s]/g,
          ''
        )
    );

  return Number.isFinite(number)
    ? number
    : 0;
};


// ======================================================
// MAIN SCREEN
// ======================================================

const PropertyLoanApplyScreen = ({
  route,
  navigation,
}) => {

  // ====================================================
  // STATE
  // ====================================================

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


  const [
    productDetails,
  ] = useState(
    route?.params?.productDetails || null
  );


  const totalSteps = 7;


  // ====================================================
  // API
  // ====================================================

  const [
    applyLoan,
    {
      isLoading: isSubmitting,
    },
  ] = useApplyLoanMutation();


  // ====================================================
  // HANDLE MUTATION
  // ====================================================

  const {
    handleMutation,
  } = useHandleMutation();


  // ====================================================
  // VALIDATE DOCUMENTS
  // ====================================================

  const validateDocuments = () => {

    const documentErrors = {};

    const documents =
      formData?.documents || [];


    // -----------------------------------------------
    // Helper
    // -----------------------------------------------

    const getDocumentFiles = (
      documentType
    ) => {

      const document =
        documents.find(
          (item) =>
            item?.type === documentType
        );

      return document?.files || [];

    };


    // -----------------------------------------------
    // AADHAAR
    // -----------------------------------------------

    const aadharFiles =
      getDocumentFiles(
        'aadharCard'
      );

    if (
      aadharFiles.length === 0
    ) {

      documentErrors.aadharCard =
        'Please upload Aadhar Card';

    }


    // -----------------------------------------------
    // PAN
    // -----------------------------------------------

    const panFiles =
      getDocumentFiles(
        'panCard'
      );

    if (
      panFiles.length === 0
    ) {

      documentErrors.panCard =
        'Please upload PAN Card';

    }


    // -----------------------------------------------
    // ADDRESS PROOF
    // -----------------------------------------------

    const addressProofFiles =
      getDocumentFiles(
        'addressProof'
      );

    if (
      addressProofFiles.length === 0
    ) {

      documentErrors.addressProof =
        'Please upload Address Proof';

    }


    // -----------------------------------------------
    // PROPERTY TAX RECEIPT
    // -----------------------------------------------

    const propertyTaxFiles =
      getDocumentFiles(
        'propertyTaxReceipt'
      );

    if (
      propertyTaxFiles.length === 0
    ) {

      documentErrors.propertyTaxReceipt =
        'Please upload Property Tax Receipt';

    }


    // -----------------------------------------------
    // SALE DEED
    // -----------------------------------------------

    const saleDeedFiles =
      getDocumentFiles(
        'saleDeed'
      );

    if (
      saleDeedFiles.length === 0
    ) {

      documentErrors.saleDeed =
        'Please upload Sale Deed';

    }


    // -----------------------------------------------
    // ENCUMBRANCE CERTIFICATE
    // -----------------------------------------------

    const encumbranceFiles =
      getDocumentFiles(
        'encumbranceCertificate'
      );

    if (
      encumbranceFiles.length === 0
    ) {

      documentErrors.encumbranceCertificate =
        'Please upload Encumbrance Certificate';

    }


    // -----------------------------------------------
    // APPROVED PROPERTY PLAN
    // -----------------------------------------------

    const approvedPlanFiles =
      getDocumentFiles(
        'approvedPropertyPlan'
      );

    if (
      approvedPlanFiles.length === 0
    ) {

      documentErrors.approvedPropertyPlan =
        'Please upload Approved Property Plan';

    }


    // -----------------------------------------------
    // INCOME PROOF
    // -----------------------------------------------

    const incomeProofFiles =
      getDocumentFiles(
        'incomeProof'
      );

    if (
      incomeProofFiles.length === 0
    ) {

      documentErrors.incomeProof =
        'Please upload Income Proof';

    }


    // -----------------------------------------------
    // ITR / FORM 16
    // -----------------------------------------------

    const itrFiles =
      getDocumentFiles(
        'itr'
      );

    if (
      itrFiles.length === 0
    ) {

      documentErrors.itr =
        'Please upload ITR / Form 16';

    }


    // -----------------------------------------------
    // BANK STATEMENT
    // -----------------------------------------------

    const bankFiles =
      getDocumentFiles(
        'bankStatement'
      );

    if (
      bankFiles.length === 0
    ) {

      documentErrors.bankStatement =
        'Please upload Bank Statement';

    }


    // -----------------------------------------------
    // PROPERTY PHOTOS
    // -----------------------------------------------

    const propertyPhotoFiles =
      getDocumentFiles(
        'propertyPhotos'
      );

    if (
      propertyPhotoFiles.length === 0
    ) {

      documentErrors.propertyPhotos =
        'Please upload Property Photos';

    }


    // -----------------------------------------------
    // BACKEND REQUIRED DOCUMENTS
    // -----------------------------------------------

    REQUIRED_DOCUMENTS.forEach(
      (documentType) => {

        const document =
          documents.find(
            (item) =>
              item?.type === documentType
          );

        const files =
          document?.files || [];


        if (
          files.length === 0 &&
          !documentErrors[documentType]
        ) {

          documentErrors[documentType] =
            'Please upload this document';

        }

      }
    );


    return documentErrors;

  };


  // ====================================================
  // VALIDATE CURRENT STEP
  // ====================================================

  const validateCurrentStep = () => {

    const stepErrors = {};


    // ==================================================
    // STEP 1 - PERSONAL DETAILS
    // ==================================================

    if (
      currentStep === 1
    ) {

      // -----------------------------------------------
      // Full Name
      // -----------------------------------------------

      if (
        !formData?.fullName?.trim()
      ) {

        stepErrors.fullName =
          'Full name is required';

      }


      // -----------------------------------------------
      // Email
      // -----------------------------------------------

      if (
        !formData?.email?.trim()
      ) {

        stepErrors.email =
          'Email is required';

      } else {

        const emailRegex =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (
          !emailRegex.test(
            formData.email.trim()
          )
        ) {

          stepErrors.email =
            'Enter a valid email address';

        }

      }


      // -----------------------------------------------
      // Mobile
      // -----------------------------------------------

      if (
        !formData?.mobile?.trim()
      ) {

        stepErrors.mobile =
          'Mobile number is required';

      } else if (
        !/^[6-9]\d{9}$/.test(
          formData.mobile.trim()
        )
      ) {

        stepErrors.mobile =
          'Enter a valid 10-digit mobile number';

      }


      // -----------------------------------------------
      // Date of Birth
      // -----------------------------------------------

      if (
        !formData?.dob?.trim()
      ) {

        stepErrors.dob =
          'Date of birth is required';

      }


      // -----------------------------------------------
      // Gender
      // -----------------------------------------------

      if (
        !formData?.gender
      ) {

        stepErrors.gender =
          'Please select gender';

      }


      // -----------------------------------------------
      // Father / Spouse
      // -----------------------------------------------

      if (
        !formData?.fatherName?.trim()
      ) {

        stepErrors.fatherName =
          "Father's / Spouse's name is required";

      }


      // -----------------------------------------------
      // PAN
      // -----------------------------------------------

      if (
        !formData?.panNumber?.trim()
      ) {

        stepErrors.panNumber =
          'PAN number is required';

      } else {

        const panRegex =
          /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

        if (
          !panRegex.test(
            formData.panNumber
              .trim()
              .toUpperCase()
          )
        ) {

          stepErrors.panNumber =
            'Enter a valid PAN number';

        }

      }


      // -----------------------------------------------
      // Aadhaar
      // -----------------------------------------------

      if (
        !formData?.aadhaarNumber?.trim()
      ) {

        stepErrors.aadhaarNumber =
          'Aadhaar number is required';

      } else if (
        !/^\d{12}$/.test(
          formData.aadhaarNumber.trim()
        )
      ) {

        stepErrors.aadhaarNumber =
          'Enter a valid 12-digit Aadhaar number';

      }


      // -----------------------------------------------
      // Annual Income
      // -----------------------------------------------

      if (
        !formData?.annualIncome ||
        toNumber(
          formData.annualIncome
        ) <= 0
      ) {

        stepErrors.annualIncome =
          'Annual income is required';

      }


      // -----------------------------------------------
      // Occupation
      // -----------------------------------------------

      if (
        !formData?.occupation?.trim()
      ) {

        stepErrors.occupation =
          'Occupation is required';

      }


      // -----------------------------------------------
      // Employment Type
      // -----------------------------------------------

      if (
        !formData?.employmentType
      ) {

        stepErrors.employmentType =
          'Please select employment type';

      }

      // Marital Status optional

    }


    // ==================================================
    // STEP 2 - ADDRESS
    // ==================================================

    if (
      currentStep === 2
    ) {

      const currentAddress =
        formData?.currentAddress || {};


      // -----------------------------------------------
      // Current Address Line 1
      // -----------------------------------------------

      if (
        !currentAddress?.line1?.trim()
      ) {

        stepErrors.currentAddressLine1 =
          'Address Line 1 is required';

      }


      // -----------------------------------------------
      // Current City
      // -----------------------------------------------

      if (
        !currentAddress?.city?.trim()
      ) {

        stepErrors.currentAddressCity =
          'City is required';

      }


      // -----------------------------------------------
      // Current PIN
      // -----------------------------------------------

      if (
        !currentAddress?.pincode ||
        !/^\d{6}$/.test(
          String(
            currentAddress.pincode
          ).trim()
        )
      ) {

        stepErrors.currentAddressPincode =
          'Enter a valid 6-digit PIN code';

      }


      // -----------------------------------------------
      // Current State
      // -----------------------------------------------

      if (
        !currentAddress?.state?.trim()
      ) {

        stepErrors.currentAddressState =
          'State is required';

      }


      // -----------------------------------------------
      // Permanent Address
      // -----------------------------------------------

      if (
        !formData?.sameAsCurrent
      ) {

        const permanentAddress =
          formData?.permanentAddress || {};


        // ---------------------------------------------
        // Line 1
        // ---------------------------------------------

        if (
          !permanentAddress?.line1?.trim()
        ) {

          stepErrors.permanentAddressLine1 =
            'Address Line 1 is required';

        }


        // ---------------------------------------------
        // City
        // ---------------------------------------------

        if (
          !permanentAddress?.city?.trim()
        ) {

          stepErrors.permanentAddressCity =
            'City is required';

        }


        // ---------------------------------------------
        // PIN
        // ---------------------------------------------

        if (
          !permanentAddress?.pincode ||
          !/^\d{6}$/.test(
            String(
              permanentAddress.pincode
            ).trim()
          )
        ) {

          stepErrors.permanentAddressPincode =
            'Enter a valid 6-digit PIN code';

        }


        // ---------------------------------------------
        // State
        // ---------------------------------------------

        if (
          !permanentAddress?.state?.trim()
        ) {

          stepErrors.permanentAddressState =
            'State is required';

        }

      }

    }


    // ==================================================
    // STEP 3 - LOAN REQUIREMENTS
    // ==================================================

    if (
      currentStep === 3
    ) {

      const minAmount =
        Number(
          productDetails?.minAmount || 500000
        );

      const maxAmount =
        Number(
          productDetails?.maxAmount || 20000000
        );

      const minTenure =
        Number(
          productDetails?.minTenure || 12
        );

      const maxTenure =
        Number(
          productDetails?.maxTenure || 360
        );


      const amount =
        toNumber(
          formData?.loanAmount
        );


      const tenure =
        toNumber(
          formData?.loanTenure
        );


      // -----------------------------------------------
      // Loan Amount
      // -----------------------------------------------

      if (
        !formData?.loanAmount ||
        amount <= 0
      ) {

        stepErrors.loanAmount =
          'Loan amount is required';

      } else if (
        amount < minAmount ||
        amount > maxAmount
      ) {

        stepErrors.loanAmount =
          `Loan amount must be between ₹${minAmount.toLocaleString()} and ₹${maxAmount.toLocaleString()}`;

      }


      // -----------------------------------------------
      // Loan Tenure
      // -----------------------------------------------

      if (
        !formData?.loanTenure ||
        tenure <= 0
      ) {

        stepErrors.loanTenure =
          'Please select loan tenure';

      } else if (
        tenure < minTenure ||
        tenure > maxTenure
      ) {

        stepErrors.loanTenure =
          `Tenure must be between ${minTenure} and ${maxTenure} months`;

      }


      // -----------------------------------------------
      // Loan Purpose
      // -----------------------------------------------

      if (
        !formData?.loanPurpose?.trim()
      ) {

        stepErrors.loanPurpose =
          'Loan purpose is required';

      }


      // -----------------------------------------------
      // Preferred EMI
      // -----------------------------------------------

      const preferredEMI =
        formData?.preferredEMI ||
        formData?.preferredEmi;


      if (
        !preferredEMI ||
        toNumber(
          preferredEMI
        ) <= 0
      ) {

        stepErrors.preferredEMI =
          'Preferred EMI is required';

      }

    }


    // ==================================================
    // STEP 4 - PROPERTY DETAILS
    // ==================================================

    if (
      currentStep === 4
    ) {

      // -----------------------------------------------
      // Property Type
      // -----------------------------------------------

      if (
        !formData?.propertyType
      ) {

        stepErrors.propertyType =
          'Please select property type';

      }


      // -----------------------------------------------
      // Property Ownership
      // -----------------------------------------------

      if (
        !formData?.propertyOwnership
      ) {

        stepErrors.propertyOwnership =
          'Please select property ownership';

      }


      // -----------------------------------------------
      // Market Value
      // -----------------------------------------------

      if (
        !formData?.marketValue ||
        toNumber(
          formData.marketValue
        ) <= 0
      ) {

        stepErrors.marketValue =
          'Market value is required';

      }


      // -----------------------------------------------
      // Property Age
      // -----------------------------------------------

      if (
        formData?.propertyAge === undefined ||
        formData?.propertyAge === null ||
        formData?.propertyAge === ''
      ) {

        stepErrors.propertyAge =
          'Property age is required';

      } else if (
        toNumber(
          formData.propertyAge
        ) < 0
      ) {

        stepErrors.propertyAge =
          'Enter a valid property age';

      }


      // -----------------------------------------------
      // Built Up Area
      // -----------------------------------------------

      if (
        !formData?.builtUpArea ||
        toNumber(
          formData.builtUpArea
        ) <= 0
      ) {

        stepErrors.builtUpArea =
          'Property area is required';

      }


      // -----------------------------------------------
      // Construction Status
      // -----------------------------------------------

      if (
        !formData?.constructionStatus
      ) {

        stepErrors.constructionStatus =
          'Please select construction status';

      }


      // -----------------------------------------------
      // Occupied By
      // -----------------------------------------------

      if (
        !formData?.occupiedBy
      ) {

        stepErrors.occupiedBy =
          'Please select occupied by';

      }

    }


    // ==================================================
    // STEP 5 - EMPLOYMENT
    // ==================================================

    if (
      currentStep === 5
    ) {

      // -----------------------------------------------
      // Company Name
      // -----------------------------------------------

      if (
        !formData?.companyName?.trim()
      ) {

        stepErrors.companyName =
          'Company name is required';

      }


      // -----------------------------------------------
      // Designation
      // -----------------------------------------------

      if (
        !formData?.designation?.trim()
      ) {

        stepErrors.designation =
          'Designation is required';

      }


      // -----------------------------------------------
      // Monthly Salary
      // -----------------------------------------------

      if (
        !formData?.monthlySalary ||
        toNumber(
          formData.monthlySalary
        ) <= 0
      ) {

        stepErrors.monthlySalary =
          'Monthly salary is required';

      }


      // -----------------------------------------------
      // Years Experience
      // -----------------------------------------------

      if (
        formData?.yearsExperience === undefined ||
        formData?.yearsExperience === null ||
        formData?.yearsExperience === ''
      ) {

        stepErrors.yearsExperience =
          'Years of experience is required';

      } else if (
        toNumber(
          formData.yearsExperience
        ) < 0
      ) {

        stepErrors.yearsExperience =
          'Enter a valid years of experience';

      }


      // -----------------------------------------------
      // Employer Type
      // -----------------------------------------------

      if (
        !formData?.employerType
      ) {

        stepErrors.employerType =
          'Please select employer type';

      }

    }


    // ==================================================
    // STEP 6 - EXISTING LOANS
    // ==================================================

    if (
      currentStep === 6
    ) {

      // -----------------------------------------------
      // Existing Loan
      // -----------------------------------------------

      if (
        !formData?.hasExistingLoan
      ) {

        stepErrors.hasExistingLoan =
          'Please select an option';

      }


      // -----------------------------------------------
      // Loan Types
      // -----------------------------------------------

      if (
        formData?.hasExistingLoan === 'yes' &&
        (
          !Array.isArray(
            formData?.selectedLoanTypes
          ) ||
          formData.selectedLoanTypes.length === 0
        )
      ) {

        stepErrors.selectedLoanTypes =
          'Please select at least one loan type';

      }

    }


    // ==================================================
    // STEP 7 - DOCUMENTS
    // ==================================================

    if (
      currentStep === 7
    ) {

      const documentErrors =
        validateDocuments();


      Object.assign(
        stepErrors,
        documentErrors
      );

    }


    // ==================================================
    // SAVE ERRORS
    // ==================================================

    setErrors(
      stepErrors
    );


    // ==================================================
    // VALIDATION RESULT
    // ==================================================

    if (
      Object.keys(stepErrors).length > 0
    ) {

      console.log(
        '❌ PROPERTY LOAN VALIDATION ERROR:',
        stepErrors
      );

      console.log(
        '❌ BLOCKING STEP:',
        currentStep
      );

      console.log(
        '❌ BLOCKING FIELDS:',
        Object.keys(stepErrors)
      );

      return false;

    }


    console.log(
      '✅ PROPERTY LOAN STEP VALIDATION PASSED:',
      currentStep
    );


    return true;

  };


  // ====================================================
  // BUILD DOCUMENT PAYLOAD
  // ====================================================

  const buildDocumentsPayload = () => {

    const documents =
      formData?.documents || [];


    const payloadDocuments =
      documents.flatMap(
        (document) => {

          const documentId =
            documentIdMap[
              document?.type
            ];


          if (
            !documentId
          ) {

            return [];

          }


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


    console.log(
      'PROPERTY LOAN DOCUMENT PAYLOAD:',
      payloadDocuments
    );


    return payloadDocuments;

  };


  // ====================================================
  // SUBMIT APPLICATION
  // ====================================================

  const submitApplication = async () => {

    console.log(
      'PROPERTY LOAN FORM DATA:',
      formData
    );


    // ---------------------------------------------
    // Final validation
    // ---------------------------------------------

    const valid =
      validateCurrentStep();


    if (
      !valid
    ) {

      return;

    }


    try {

      // ==============================================
      // DOCUMENTS
      // ==============================================

      const documents =
        buildDocumentsPayload();


      // ==============================================
      // DOCUMENT SAFETY
      // ==============================================

      if (
        documents.length === 0
      ) {

        Alert.alert(
          'Documents Required',
          'Please upload the required documents.'
        );

        return;

      }


      // ==============================================
      // NEW API PAYLOAD
      // ==============================================

      const payload = {

        loanType:
          'PROPERTY_LOAN',


        productId:
          productDetails?._id ||
          route?.params?.productId,


        // ============================================
        // PERSONAL DETAILS
        // ============================================

        fullName:
          formData?.fullName,

        email:
          formData?.email,

        mobile:
          formData?.mobile,

        dob:
          formData?.dob,

        gender:
          formData?.gender,

        fatherName:
          formData?.fatherName,

        panNumber:
          formData?.panNumber
            ?.toUpperCase(),

        aadhaarNumber:
          formData?.aadhaarNumber,

        annualIncome:
          toNumber(
            formData?.annualIncome
          ),

        occupation:
          formData?.occupation,

        maritalStatus:
          formData?.maritalStatus,


        // ============================================
        // ADDRESS
        // ============================================

        currentAddress:
          formData?.currentAddress,

        permanentAddress:
          formData?.sameAsCurrent
            ? formData?.currentAddress
            : formData?.permanentAddress,

        sameAsCurrent:
          !!formData?.sameAsCurrent,


        // ============================================
        // LOAN
        // ============================================

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

        preferredEMI:
          toNumber(
            formData?.preferredEMI
          ),

        existingLoan:
          !!formData?.existingLoan,


        // ============================================
        // PROPERTY
        // ============================================

        propertyType:
          formData?.propertyType,

        propertyOwnership:
          formData?.propertyOwnership,

        marketValue:
          toNumber(
            formData?.marketValue
          ),

        propertyAge:
          toNumber(
            formData?.propertyAge
          ),

        builtUpArea:
          toNumber(
            formData?.builtUpArea
          ),

        constructionStatus:
          formData?.constructionStatus,

        occupiedBy:
          formData?.occupiedBy,


        // ============================================
        // EMPLOYMENT
        // ============================================

        companyName:
          formData?.companyName,

        designation:
          formData?.designation,

        monthlySalary:
          toNumber(
            formData?.monthlySalary
          ),

        yearsExperience:
          toNumber(
            formData?.yearsExperience
          ),

        employerType:
          formData?.employerType,

        employmentType:
          formData?.employmentType,


        // ============================================
        // EXISTING LOANS
        // ============================================

        hasExistingLoan:
          formData?.hasExistingLoan,

        selectedLoanTypes:
          formData?.selectedLoanTypes || [],


        // ============================================
        // DOCUMENTS
        // ============================================

        documents:
          documents,

      };


      // ==============================================
      // DEBUG
      // ==============================================

      console.log(
        '========================================'
      );

      console.log(
        '🚀 PROPERTY LOAN FINAL PAYLOAD'
      );

      console.log(
        JSON.stringify(
          payload,
          null,
          2
        )
      );

      console.log(
        '========================================'
      );


      // ==============================================
      // NEW API CALL
      // ==============================================

      const response =
        await handleMutation({

          apiFunc:
            applyLoan,

          params:
            payload,

          showSuccess:
            true,

          showError:
            true,

          onSuccess:
            (result) => {

              console.log(
                'PROPERTY LOAN APPLY SUCCESS:',
                result
              );

              resetToTab(
                navigation,
                'History'
              );

            },

        });


      // ==============================================
      // MUTATION FAILED
      // ==============================================

      if (
        !response
      ) {

        return;

      }


      console.log(
        'PROPERTY LOAN APPLY SUCCESS:',
        response
      );


    } catch (
      error
    ) {

      console.log(
        '❌ PROPERTY LOAN APPLY ERROR:',
        error
      );

      console.log(
        '❌ PROPERTY LOAN APPLY ERROR DATA:',
        error?.data
      );

      console.log(
        '❌ PROPERTY LOAN APPLY ERROR MESSAGE:',
        error?.message
      );

    }

  };


  // ====================================================
  // HANDLE CONTINUE
  // ====================================================

  const handleContinue = () => {

    console.log(
      '➡️ PROPERTY LOAN CONTINUE:',
      currentStep
    );


    // ---------------------------------------------
    // Validate
    // ---------------------------------------------

    const isValid =
      validateCurrentStep();


    // ---------------------------------------------
    // Block
    // ---------------------------------------------

    if (
      !isValid
    ) {

      console.log(
        '❌ PROPERTY LOAN BLOCKED ON STEP:',
        currentStep
      );

      return;

    }


    // ---------------------------------------------
    // Clear errors
    // ---------------------------------------------

    setErrors({});


    // ---------------------------------------------
    // Next Step
    // ---------------------------------------------

    if (
      currentStep < totalSteps
    ) {

      console.log(
        '➡️ MOVING:',
        currentStep,
        '→',
        currentStep + 1
      );


      setCurrentStep(
        (prev) =>
          prev + 1
      );


      return;

    }


    // ---------------------------------------------
    // Final Submit
    // ---------------------------------------------

    console.log(
      '🚀 FINAL PROPERTY LOAN SUBMIT'
    );


    submitApplication();

  };


  // ====================================================
  // BACK
  // ====================================================

  const handleBack = useCallback(
    () => {

      console.log(
        '⬅️ PROPERTY LOAN BACK:',
        currentStep
      );


      // ---------------------------------------------
      // Previous Step
      // ---------------------------------------------

      if (
        currentStep > 1
      ) {

        console.log(
          '⬅️ GOING TO STEP:',
          currentStep - 1
        );


        setCurrentStep(
          (prev) =>
            prev - 1
        );


        setErrors({});


        return true;

      }


      // ---------------------------------------------
      // Exit screen
      // ---------------------------------------------

      console.log(
        '⬅️ EXITING PROPERTY LOAN SCREEN'
      );


      return false;

    },
    [
      currentStep,
    ]
  );


  // ====================================================
  // HARDWARE BACK
  // ====================================================

  useFocusEffect(
    useCallback(
      () => {

        const subscription =
          BackHandler.addEventListener(
            'hardwareBackPress',
            handleBack
          );


        return () => {

          subscription.remove();

        };

      },
      [
        handleBack,
      ]
    )
  );


  // ====================================================
  // RENDER STEP
  // ====================================================

  const renderStep = () => {

    switch (
      currentStep
    ) {

      // ==============================================
      // STEP 1
      // ==============================================

      case 1:

        return (
          <CommonPersonalDetailsForm
            formData={
              formData
            }

            setFormData={
              setFormData
            }

            errors={
              errors
            }

            setErrors={
              setErrors
            }
          />
        );


      // ==============================================
      // STEP 2
      // ==============================================

      case 2:

        return (
          <AddressForm
            formData={
              formData
            }

            setFormData={
              setFormData
            }

            errors={
              errors
            }

            setErrors={
              setErrors
            }
          />
        );


      // ==============================================
      // STEP 3
      // ==============================================

      case 3:

        return (
          <LoanRequirementsForm
            formData={
              formData
            }

            setFormData={
              setFormData
            }

            errors={
              errors
            }

            setErrors={
              setErrors
            }

            productDetails={
              productDetails
            }
          />
        );


      // ==============================================
      // STEP 4
      // ==============================================

      case 4:

        return (
          <PropertyDetailsForm
            formData={
              formData
            }

            setFormData={
              setFormData
            }

            errors={
              errors
            }

            setErrors={
              setErrors
            }
          />
        );


      // ==============================================
      // STEP 5
      // ==============================================

      case 5:

        return (
          <EmploymentForm
            formData={
              formData
            }

            setFormData={
              setFormData
            }

            errors={
              errors
            }

            setErrors={
              setErrors
            }
          />
        );


      // ==============================================
      // STEP 6
      // ==============================================

      case 6:

        return (
          <ExistingLoanForm
            formData={
              formData
            }

            setFormData={
              setFormData
            }

            errors={
              errors
            }

            setErrors={
              setErrors
            }
          />
        );


      // ==============================================
      // STEP 7
      // ==============================================

      case 7:

        return (
          <DocumentUploadForm
            formData={
              formData
            }

            setFormData={
              setFormData
            }

            errors={
              errors
            }

            setErrors={
              setErrors
            }

            productDetails={
              productDetails
            }
          />
        );


      default:

        return null;

    }

  };


  // ====================================================
  // UI
  // ====================================================

  return (

    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor:
          '#F6F8F7',
      }}
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <LoanCommonHeader
        title="Property Loan"

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
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
      >

        {/* =================================================
            CONTENT
        ================================================= */}

        <ScrollView
          keyboardShouldPersistTaps="handled"

          showsVerticalScrollIndicator={
            false
          }

          contentContainerStyle={{
            paddingBottom:
              24,
          }}
        >

          <View
            style={{
              paddingHorizontal:
                theme.spacing.xxl,
            }}
          >

            {/* ============================================
                INFO CARD
            ============================================ */}

            <CommonInfoCard />


            {/* ============================================
                STEP PROGRESS
            ============================================ */}

            <StepProgress
              currentStep={
                currentStep
              }

              totalSteps={
                totalSteps
              }
            />


            {/* ============================================
                CURRENT FORM
            ============================================ */}

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
              16,

            backgroundColor:
              '#fff',
          }}
        >

          <CommonButton
            title={
              currentStep === totalSteps
                ? 'Submit'
                : 'Continue'
            }

            loading={
              isSubmitting
            }

            disabled={
              isSubmitting
            }

            onPress={
              handleContinue
            }
          />

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );

};


export default PropertyLoanApplyScreen;