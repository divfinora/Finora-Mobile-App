import React from 'react';
import { View, ScrollView } from 'react-native';

// Common Components
import DocumentUploadCard from '../../../../../components/common/Input/DocumentUploadCard';
import { theme } from '../../../../../theme';

const DocumentUpload = ({ formData = {}, setFormData, errors = {}, setErrors }) => {
  // Handle file upload
  const handleUpload = (documentType) => {
    console.log(`Uploading ${documentType}`);
    
    // Simulate file upload placeholder
    const dummyFile = {
      fileName: `${documentType}_${Date.now()}.pdf`,
      fileSize: '2.4 MB',
      uri: 'file://dummy/path',
    };
    
    setFormData?.((prev) => ({
      ...prev,
      [documentType]: dummyFile,
    }));
    
    // Clear error if present
    if (errors?.[documentType] && setErrors) {
      setErrors((prev) => ({ ...prev, [documentType]: null }));
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: theme.spacing?.massive || 48,
      }}
    >
      <View
        style={{
          marginTop: theme.spacing?.md || 16,
        }}
      >
        {/* Aadhar Card */}
        <DocumentUploadCard
          title="Aadhar Card"
          subtitle="Upload both front & back side"
          uploadedFile={formData?.aadharCard}
          onUpload={() => handleUpload('aadharCard')}
          error={errors?.aadharCard}
        />

        {/* Pan Card */}
        <DocumentUploadCard
          title="Pan Card"
          subtitle="Upload front side clear photo"
          uploadedFile={formData?.panCard}
          onUpload={() => handleUpload('panCard')}
          error={errors?.panCard}
        />

        {/* Salary Slips */}
        <DocumentUploadCard
          title="Salary Slips *"
          subtitle="Upload last 3 months salary slips"
          uploadedFile={formData?.salarySlips}
          onUpload={() => handleUpload('salarySlips')}
          error={errors?.salarySlips}
        />

        {/* Driving License */}
        <DocumentUploadCard
          title="Driving License *"
          subtitle="Upload front & back side of driving license"
          uploadedFile={formData?.drivingLicense}
          onUpload={() => handleUpload('drivingLicense')}
          error={errors?.drivingLicense}
        />

        {/* Bank Statement */}
        <DocumentUploadCard
          title="Bank Statement"
          subtitle="Upload last 6 months bank statement"
          uploadedFile={formData?.bankStatement}
          onUpload={() => handleUpload('bankStatement')}
          error={errors?.bankStatement}
        />
      </View>
    </ScrollView>
  );
};

export default DocumentUpload;