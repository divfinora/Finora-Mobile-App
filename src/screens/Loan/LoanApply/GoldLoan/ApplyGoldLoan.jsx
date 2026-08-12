import React, { useState, useCallback } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

// API Hooks & Custom Mutation Hook
import { useApplyLoanMutation } from '../../../../redux/features/customer/customerApi.js'; // path match kar lein
import useHandleMutation from '../../../../hooks/useHandleMutation.js'; // path match kar lein

// Common Components
import CommonButton from '../../../../components/common/Button/CommonButton.jsx';
import LoanCommonHeader from '../commonComponent/LoanCommonHeader.jsx';
import CommonInfoCard from '../commonComponent/CommonInfoCard.jsx';
import StepProgress from '../commonComponent/StepProgress.jsx';

// Step Components for Gold Loan
import VerificationDocument from '../commonComponent/VerificationDocument.jsx';
import ShortPersonalDetails from '../commonComponent/CommonShortPersonalDetails.jsx';
import CommonEmploymentAndIncome from '../commonComponent/CommonEmploymentAndIncome.jsx';
import GoldDetails from './components/GoldDetails.jsx';
import LoanRequirement from './components/LoanRequirement.jsx';
import DocumentUpload from './components/DocumentUpload.jsx';

import { theme } from '../../../../theme/index.js';

// ==========================================
// INDIVIDUAL STEP VALIDATION FUNCTIONS
// ==========================================

const validateStep1 = () => ({});

const validateStep2 = (formData) => {
  const errors = {};
  if (!formData?.fullName?.trim()) errors.fullName = 'Full Name is required';
  if (!formData?.mobileNumber?.trim()) {
    errors.mobileNumber = 'Mobile Number is required';
  } else if (!/^[6-9]\d{9}$/.test(formData.mobileNumber.trim())) {
    errors.mobileNumber = 'Enter a valid 10-digit mobile number';
  }
  if (!formData?.email?.trim()) {
    errors.email = 'Email Address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
    errors.email = 'Enter a valid email address';
  }
  if (!formData?.aadharNumber?.trim()) {
    errors.aadharNumber = 'Aadhaar Number is required';
  } else if (!/^\d{12}$/.test(formData.aadharNumber.trim())) {
    errors.aadharNumber = 'Enter valid 12-digit Aadhaar Number';
  }
  return errors;
};

const validateStep3 = (formData) => {
  const errors = {};
  if (!formData?.employmentType) errors.employmentType = 'Select employment type';
  if (!String(formData?.monthlyIncome || '').trim()) errors.monthlyIncome = 'Monthly income is required';
  if (!String(formData?.existingEmi || '').trim()) errors.existingEmi = 'Existing EMI amount is required';
  if (!formData?.occupationDetails?.trim()) errors.occupationDetails = 'Occupation details are required';
  return errors;
};

const validateStep4 = (formData) => {
  const errors = {};
  if (!formData?.goldType) errors.goldType = 'Select gold type';
  if (!String(formData?.goldWeight || '').trim()) errors.goldWeight = 'Enter total gold weight in grams';
  if (!formData?.goldPurity) errors.goldPurity = 'Select gold purity (Karat)';
  if (!formData?.ornamentDescription?.trim()) errors.ornamentDescription = 'Please describe the gold item(s)';
  return errors;
};

const validateStep5 = (formData) => {
  const errors = {};
  if (!String(formData?.loanAmount || '').trim()) errors.loanAmount = 'Enter required loan amount';
  if (!formData?.interestType) errors.interestType = 'Select interest type';
  if (!formData?.repaymentMethod) errors.repaymentMethod = 'Select repayment method';
  return errors;
};

const validateStep6 = (formData) => {
  const errors = {};
  if (!formData?.documentUploaded) errors.documentUploaded = 'Please upload all required documents';
  return {};
};

const stepValidators = {
  1: validateStep1,
  2: validateStep2,
  3: validateStep3,
  4: validateStep4,
  5: validateStep5,
  6: validateStep6,
};

// ==========================================
// MAIN COMPONENT
// ==========================================

const ApplyGoldLoan = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const totalSteps = 6;

  // RTK Query & Mutation Helper
  const [applyLoan, { isLoading }] = useApplyLoanMutation();
  const { handleMutation } = useHandleMutation();

  // Back Button Logic
  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      setErrors({});
      return true;
    }
    return false;
  }, [currentStep]);

  useFocusEffect(
    useCallback(() => {
      const subscription = BackHandler.addEventListener('hardwareBackPress', handleBack);
      return () => subscription.remove();
    }, [handleBack])
  );

  const getHeaderTitle = () => {
    switch (currentStep) {
      case 1: return 'Verification Document';
      case 2: return 'Personal Details';
      case 3: return 'Employment & Income';
      case 4: return 'Gold Details';
      case 5: return 'Loan Requirement';
      case 6: return 'Document Upload';
      default: return 'Gold Loan';
    }
  };

  const validateCurrentStep = () => {
    const validator = stepValidators[currentStep];
    if (!validator) return true;

    const currentStepErrors = validator(formData) || {};
    setErrors(currentStepErrors);

    return Object.keys(currentStepErrors).length === 0;
  };

  // Submit Application API Call
  const submitApplication = async () => {
    const payload = {
      loanType: 'GOLD_LOAN',
      ...formData,
    };

    await handleMutation({
      apiFunc: applyLoan,
      params: payload,
      showSuccess: true,
      customSuccessMsg: 'Gold Loan application submitted successfully!',
      showError: true,
      onSuccess: (res) => {
        // Application submit hone ke baad redirect karein
        navigation.navigate('MyLoans'); 
      },
    });
  };

  // Handle Next / Submit Action
  const handleNext = () => {
    const isValid = validateCurrentStep();
    if (!isValid) return;

    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      setErrors({});
    } else {
      submitApplication();
    }
  };

  const renderStep = () => {
    const commonProps = { formData, setFormData, errors, setErrors };

    switch (currentStep) {
      case 1: return <VerificationDocument {...commonProps} />;
      case 2: return <ShortPersonalDetails {...commonProps} />;
      case 3: return <CommonEmploymentAndIncome {...commonProps} />;
      case 4: return <GoldDetails {...commonProps} />;
      case 5: return <LoanRequirement {...commonProps} />;
      case 6: return <DocumentUpload {...commonProps} />;
      default: return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F8F7' }}>
      <LoanCommonHeader title={getHeaderTitle()} onBackPress={handleBack} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.spacing.xl }}
        >
          <View style={{ paddingHorizontal: theme.spacing.xxl }}>
            <CommonInfoCard />
            <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
            {renderStep()}
          </View>
        </ScrollView>

        <View
          style={{
            padding: theme.spacing.lg,
            backgroundColor: theme.colors.white,
            borderTopWidth: theme.borderWidth.thin,
            borderTopColor: theme.colors.divider,
          }}
        >
          <CommonButton
            title={currentStep === totalSteps ? 'Submit Application' : 'Continue'}
            onPress={handleNext}
            loading={isLoading}
            disabled={isLoading}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ApplyGoldLoan;