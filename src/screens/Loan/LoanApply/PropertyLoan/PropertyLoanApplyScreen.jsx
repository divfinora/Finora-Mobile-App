// PropertyLoanApplyScreen.jsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
 
import PersonalDetailsForm from './components/PersonalDetailsForm';
import AddressForm from './components/AddressForm';
import LoanRequirementsForm from './components/LoanRequirementsForm';
import PropertyDetailsForm from './components/PropertyDetailsForm';
import EmploymentForm from './components/EmploymentForm';
import ExistingLoanForm from './components/ExistingLoanForm';
import DocumentUploadForm from './components/DocumentUploadForm';
import CommonButton from '../../../../components/common/Button/CommonButton';
import BackButton from '../../../../components/common/BackButton/BackButton';
import LoanCommonHeader from '../commonComponent/LoanCommonHeader';
import CommonInfoCard from '../commonComponent/CommonInfoCard';
import { theme } from '../../../../theme';

const PropertyLoanApplyScreen = ({ route }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [productDetails, setProductDetails] = useState(null);

  const totalSteps = 7;

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <PersonalDetailsForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
      case 2: return <AddressForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
      case 3: return <LoanRequirementsForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} productDetails={productDetails} />;
      case 4: return <PropertyDetailsForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
      case 5: return <EmploymentForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
      case 6: return <ExistingLoanForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} />;
      case 7: return <DocumentUploadForm formData={formData} setFormData={setFormData} errors={errors} setErrors={setErrors} productDetails={productDetails} />;
      default: return null;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F8F7' }}>

      {/* <View style={{paddingHorizontal: theme.spacing.xl, flex:1,}}>   */}

      <LoanCommonHeader title='Personal Detail' />
      <KeyboardAvoidingView style={{ flex: 1 }}

        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >

        <ScrollView contentContainerStyle={{

        }}>




          <View style={{ paddingHorizontal: theme.spacing.xxl, }}>
            <CommonInfoCard />
            <StepProgress currentStep={currentStep} totalSteps={totalSteps} />
            {renderStep()}
          </View>

        </ScrollView>
        <View style={{ padding: 16, backgroundColor: '#fff' }}>
          <CommonButton
            title={currentStep === totalSteps ? "Submit" : "Continue"}
            onPress={() => currentStep === totalSteps ? submitApplication() : setCurrentStep(prev => prev + 1)}
          />
        </View>
      </KeyboardAvoidingView>
      {/* </View> */}
    </SafeAreaView>
  );
};

export default PropertyLoanApplyScreen;