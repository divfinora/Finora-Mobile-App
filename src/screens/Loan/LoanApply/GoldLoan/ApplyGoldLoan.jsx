import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Common Components
import CommonButton from '../../../../components/common/Button/CommonButton.jsx';
import LoanCommonHeader from '../commonComponent/LoanCommonHeader.jsx';
import CommonInfoCard from '../commonComponent/CommonInfoCard.jsx';
import StepProgress from '../commonComponent/StepProgress.jsx';

// Step Components for Gold Loan
import VerificationDocument from '../commonComponent/VerificationDocument.jsx'; // Shared Common Step
import GoldLoanPersonalDetails from './components/GoldLoanPersonalDetails.jsx';
import EmploymentAndIncome from './components/EmploymentAndIncome.jsx';
import GoldDetails from './components/GoldDetails.jsx';
import LoanRequirement from './components/LoanRequirement.jsx';
import DocumentUpload from './components/DocumentUpload.jsx';

import { theme } from '../../../../theme/index.js';

const ApplyGoldLoan = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const totalSteps = 6;

  // Dynamic Header Title per Step
  const getHeaderTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Verification Document';
      case 2:
        return 'Personal Details';
      case 3:
        return 'Employment & Income';
      case 4:
        return 'Gold Details';
      case 5:
        return 'Loan Requirement';
      case 6:
        return 'Document Upload';
      default:
        return 'Gold Loan';
    }
  };

  // Navigation Logic
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      submitApplication();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigation?.goBack();
    }
  };

  const submitApplication = () => {
    console.log('Gold Loan Application Submitted:', formData);
  };

  // Render Dynamic Step Component
  const renderStep = () => {
    const commonProps = { formData, setFormData, errors, setErrors };

    switch (currentStep) {
      case 1:
        return <VerificationDocument {...commonProps} />;
      case 2:
        return <GoldLoanPersonalDetails {...commonProps} />;
      case 3:
        return <EmploymentAndIncome {...commonProps} />;
      case 4:
        return <GoldDetails {...commonProps} />;
      case 5:
        return <LoanRequirement {...commonProps} />;
      case 6:
        return <DocumentUpload {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F8F7' }}>
      {/* Dynamic Header */}
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

        {/* Bottom Navigation Button */}
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
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ApplyGoldLoan;

 