import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../../../../theme';
import DocumentUploadCard from '../../../../../components/common/Input/DocumentUploadCard'
// import DocumentUploadCard from '../../../../../component'
const UploadIncomeDocuments = ({ formData, setFormData, errors, onPickDocument }) => {
  const handleUpload = (field) => {
    if (onPickDocument) {
      onPickDocument(field);
    } else {
      // Dummy toggle/mock handler if onPickDocument isn't provided
      setFormData((prev) => ({
        ...prev,
        [field]: prev?.[field] ? null : { fileName: `${field}_doc.pdf` },
      }));
    }
  };

  return (
    <View style={{ paddingTop: theme.spacing.md }}>
      {/* ===== Title ===== */}
      <Text
        style={{
          fontSize: theme.typography.h3,
          fontFamily: theme.fonts.headingBold || theme.fonts.bold,
          color: theme.colors.text,
          marginBottom: theme.spacing.lg,
        }}
      >
        Upload Income Documents
      </Text>

      {/* ===== Aadhar Card ===== */}
      <DocumentUploadCard
        title="Aadhar Card"
        subtitle="upload both front & back side"
        uploadedFile={formData?.aadharCard}
        onUpload={() => handleUpload('aadharCard')}
        error={errors?.aadharCard}
      />

      {/* ===== Pan Card ===== */}
      <DocumentUploadCard
        title="Pan Card"
        subtitle="upload clear front side"
        uploadedFile={formData?.panCard}
        onUpload={() => handleUpload('panCard')}
        error={errors?.panCard}
      />

      {/* ===== Address Proof ===== */}
      <DocumentUploadCard
        title="Address Proof *"
        subtitle="utility bill, passport,or driving license"
        uploadedFile={formData?.addressProof}
        onUpload={() => handleUpload('addressProof')}
        error={errors?.addressProof}
      />

      {/* ===== Income Proof ===== */}
      <DocumentUploadCard
        title="Income Proof *"
        subtitle="Bank statements, salary slip,or ITR"
        uploadedFile={formData?.incomeProof}
        onUpload={() => handleUpload('incomeProof')}
        error={errors?.incomeProof}
      />

      {/* ===== Bank Statement ===== */}
      <DocumentUploadCard
        title="Bank Statement"
        subtitle="Last 6 Months"
        uploadedFile={formData?.bankStatement}
        onUpload={() => handleUpload('bankStatement')}
        error={errors?.bankStatement}
      />

      {/* ===== Document Guidelines Card ===== */}
      <View
        style={{
          backgroundColor: '#FFFBEB',
          borderWidth: 1,
          borderColor: '#FCD34D',
          borderRadius: 16,
          padding: theme.spacing.lg,
          marginTop: theme.spacing.xs,
          marginBottom: theme.spacing.xl,
        }}
      >
        <Text
          style={{
            fontSize: theme.typography.b1,
            fontFamily: theme.fonts.bold,
            color: '#B45309',
            marginBottom: theme.spacing.xs,
          }}
        >
          📄 Document Guidelines
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: theme.fonts.medium || theme.fonts.regular,
            color: '#92400E',
            lineHeight: 20,
          }}
        >
          Ensure documents are clear and readable :{'\n'}
          • All documents should be valid and not expired{'\n'}
          • File size should not exceed 5MB per document{'\n'}
          • Accepted formats: PDF, JPG, PNG
        </Text>
      </View>
    </View>
  );
};

export default UploadIncomeDocuments;