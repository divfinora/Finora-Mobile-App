import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../../../theme/index.js';

// Common Components
import CommonButton from '../../../../components/common/Button/CommonButton.jsx';
import LoanCommonHeader from '../commonComponent/LoanCommonHeader.jsx';
import CommonInfoCard from '../commonComponent/CommonInfoCard.jsx';
import StepProgress from '../commonComponent/StepProgress.jsx';

// Step Components for Vehicle Loan
import ShortPersonalDetails from '../commonComponent/CommonShortPersonalDetails.jsx';
import CommonEmploymentAndIncome from '../commonComponent/CommonEmploymentAndIncome.jsx';
import VehicleInformation from './components/VehicleInformation.jsx';
import DocumentUpload from './components/DocumentUpload.jsx';
import CommonLoanRequirement from '../commonComponent/CommonLoanRequirement.jsx';

const ApplyVehicleLoan = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const totalSteps = 5;

  // Dynamic Header Title per Step
  const getHeaderTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Personal Details';
      case 2:
        return 'Employment & Income';
      case 3:
        return 'Vehicle Information';
      case 4:
        return 'Loan Requirement';
      case 5:
        return 'Document Upload';
      default:
        return 'Vehicle Loan';
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
    console.log('Vehicle Loan Application Submitted:', formData);
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
        return <VehicleInformation {...commonProps} />;
      case 4:
        return <CommonLoanRequirement {...commonProps} />;
      case 5:
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

export default ApplyVehicleLoan;