import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../../../../theme/index.js';

import CommonButton from '../../../../components/common/Button/CommonButton.jsx';
import LoanCommonHeader from '../commonComponent/LoanCommonHeader.jsx';
import CommonInfoCard from '../commonComponent/CommonInfoCard.jsx';
import StepProgress from '../commonComponent/StepProgress.jsx';

 
import CommercialAddressDetails from './components/CommercialAddressDetails.jsx';
import CommonAddressDetailsForm from '../commonComponent/CommonAddressDetailsForm.jsx';
import CommercialBusinessDetails from './components/CommercialBusinessDetails.jsx';
import CommonLoanRequirement from '../commonComponent/CommonLoanRequirement.jsx';
import CommercialPropertyDetails from './components/CommercialPropertyDetails.jsx';
import CommercialFinancialDetails from './components/CommercialFinancialDetails.jsx';
import CommonPersonalDetailsForm from '../commonComponent/CommonPersonalDetailsForm.jsx';

const ApplyCommercialLoan = ({ navigation }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const totalSteps = 6;

  const getHeaderTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Personal Details';
      case 2:
        return 'Address Details';
      case 3:
        return 'Business Details';
      case 4:
        return 'Loan Requirement';
      case 5:
        return 'Property Details';
      case 6:
        return 'Financial Details';
      default:
        return 'Commercial Loan';
    }
  };

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
    console.log('Commercial Loan Application Submitted:', formData);
  };

  const renderStep = () => {
    const commonProps = { formData, setFormData, errors, setErrors };
    switch (currentStep) {
      case 1:
        return <CommonPersonalDetailsForm {...commonProps} />;
      case 2:
        return <CommonAddressDetailsForm {...commonProps} />;
      case 3:
        return <CommercialBusinessDetails {...commonProps} />;
      case 4:
        return <CommonLoanRequirement {...commonProps} />;
      case 5:
        return <CommercialPropertyDetails {...commonProps} />;
      case 6:
        return <CommercialFinancialDetails {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F8F7' }}>
      <LoanCommonHeader title={getHeaderTitle()} onBack={handleBack} />

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
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ApplyCommercialLoan;