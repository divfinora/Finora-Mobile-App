// screens/ApplyRenovationLoan.jsx
import React, { useState } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Theme Import
import { theme } from '../../../../theme/index.js';

// Common Components
import CommonButton from '../../../../components/common/Button/CommonButton.jsx';
import LoanCommonHeader from '../commonComponent/LoanCommonHeader.jsx';
import CommonInfoCard from '../commonComponent/CommonInfoCard.jsx';
import StepProgress from '../commonComponent/StepProgress.jsx';

// Common Shared Step Components
import ShortPersonalDetails from '../commonComponent/CommonShortPersonalDetails.jsx';
import CommonEmploymentAndIncome from '../commonComponent/CommonEmploymentAndIncome.jsx';
import CommonLoanRequirement from '../commonComponent/CommonLoanRequirement.jsx';

// Renovation Specific Step Components
import RenovationDetails from './components/RenovationDetails.jsx';
import DocumentUpload from './components/DocumentUpload.jsx';
import PropertyDetails from './components/PropertyDetails.jsx';

const ApplyRenovationLoan = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const totalSteps = 6;

  // Dynamic Header Title per Step
  const getHeaderTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Personal Details';
      case 2:
        return 'Employment & Income';
      case 3:
        return 'Renovation Details';
      case 4:
        return 'Loan Requirement';
      case 5:
        return 'Document Upload';
      default:
        return 'Renovation Loan';
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
    console.log('Renovation Loan Application Submitted:', formData);
  };

  // Render Dynamic Step Component
  const renderStep = () => {
    const commonProps = { formData, setFormData, errors, setErrors };

    switch (currentStep) {
      case 1:
        return <ShortPersonalDetails {...commonProps} />;
      case 2:
        return <CommonEmploymentAndIncome {...commonProps} />;
      case 3:
        return <PropertyDetails {...commonProps} />;
      case 4:
        return <RenovationDetails {...commonProps} />;
      case 5:
        return <CommonLoanRequirement {...commonProps} />;
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
          contentContainerStyle={{ paddingBottom: theme.spacing?.xl || 24 }}
        >
          <View style={{ paddingHorizontal: theme.spacing?.xxl || 20 }}>
            <CommonInfoCard />
            <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
            {renderStep()}
          </View>
        </ScrollView>

        {/* Bottom Navigation Button */}
        <View
          style={{
            padding: theme.spacing?.lg || 16,
            backgroundColor: theme.colors?.white || '#FFFFFF',
            borderTopWidth: theme.borderWidth?.thin || 1,
            borderTopColor: theme.colors?.divider || '#E2E8F0',
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

export default ApplyRenovationLoan;