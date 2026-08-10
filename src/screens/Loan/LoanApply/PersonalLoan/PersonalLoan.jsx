import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
 

// Common Components
import CommonButton from '../../../../components/common/Button/CommonButton';
import LoanCommonHeader from '../commonComponent/LoanCommonHeader';
import CommonInfoCard from '../commonComponent/CommonInfoCard';
import StepProgress from '../commonComponent/StepProgress.jsx';

// Step Components
import VerificationDocument from './components/VerificationDocument.jsx';
import RequiredDocument from './components/RequiredDocument.jsx';
import IncomeDetails from './components/IncomeDetails.jsx';
import IncomeDocument from './components/IncomeDocument.jsx';
import ReviewDocument from './components/ReviewDocument.jsx';
import AlmostDoneScreen from './components/AlmostDoneScreen.jsx';
import { theme } from '../../../../theme/index.js';

const PersonalLoan = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const totalSteps = 6;

  // Header Title Dynamic Update Based on Current Step
  const getHeaderTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Verification Document';
      case 2:
        return 'Required Document';
      case 3:
        return 'Income Details';
      case 4:
        return 'Income Document';
      case 5:
        return 'Review Application';
      case 6:
        return 'Almost Done';
      default:
        return 'Personal Loan';
    }
  };

  // Next Step / Submit Logic
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      submitApplication();
    }
  };

  // Back Navigation Handling
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigation?.goBack();
    }
  };

  const submitApplication = () => {
    console.log('Personal Loan Submitted:', formData);
  };

  // Render Current Active Step Component
  const renderStep = () => {
    const commonProps = { formData, setFormData, errors, setErrors };

    switch (currentStep) {
      case 1:
        return <VerificationDocument {...commonProps} />;
      case 2:
        return <RequiredDocument {...commonProps} />;
      case 3:
        return <IncomeDetails {...commonProps} />;
      case 4:
        return <IncomeDocument {...commonProps} />;
      case 5:
        return <ReviewDocument {...commonProps} />;
      case 6:
        return <AlmostDoneScreen {...commonProps} />;
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

        {/* Bottom Continue / Submit Action Button */}
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

export default PersonalLoan;