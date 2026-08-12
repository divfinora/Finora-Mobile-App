// components/DocumentUploadDetails.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { FileText } from 'lucide-react-native';
import { theme } from '../../../../../theme';
 import DocumentUploadCard  from '../../../../../components/common/Input/DocumentUploadCard'

const DocumentUploadDetails = ({ formData = {}, setFormData, errors = {}, setErrors }) => {
  const documents = formData?.documents || {};

  const handleUpload = (docKey) => {
    // Demo upload action - replace with actual DocumentPicker logic
    const mockFile = { fileName: `${docKey}_uploaded.pdf` };

    setFormData?.((prev) => ({
      ...prev,
      documents: {
        ...(prev.documents || {}),
        [docKey]: mockFile,
      },
    }));

    if (errors?.[docKey] && setErrors) {
      setErrors((prev) => ({ ...prev, [docKey]: null }));
    }
  };

  return (
    <View style={{ marginTop: 12 }}>
      {/* 1. Aadhar Card */}
      <DocumentUploadCard
        title="Aadhar Card"
        subtitle="upload both front & back side"
        uploadedFile={documents.aadhar}
        onUpload={() => handleUpload('aadhar')}
        error={errors?.aadhar}
      />

      {/* 2. Pan Card */}
      <DocumentUploadCard
        title="Pan Card"
        subtitle="upload clear front side"
        uploadedFile={documents.pan}
        onUpload={() => handleUpload('pan')}
        error={errors?.pan}
      />

      {/* 3. Land Document */}
      <DocumentUploadCard
        title="Land Document *"
        subtitle="utility bill, passport,or driving license"
        uploadedFile={documents.landDoc}
        onUpload={() => handleUpload('landDoc')}
        error={errors?.landDoc}
      />

      {/* 4. Crop Proof */}
      <DocumentUploadCard
        title="Crop Proof *"
        subtitle="Upload all document Khasara,Khatauni"
        uploadedFile={documents.cropProof}
        onUpload={() => handleUpload('cropProof')}
        error={errors?.cropProof}
      />

      {/* 5. Bank Statement */}
      <DocumentUploadCard
        title="Bank Statement"
        subtitle="Last 6 Months"
        uploadedFile={documents.bankStatement}
        onUpload={() => handleUpload('bankStatement')}
        error={errors?.bankStatement}
      />

      {/* 6. Document Guidelines Box */}
      <View
        style={{
          backgroundColor: '#FFFBEB',
          borderColor: '#FCD34D',
          borderWidth: 1,
          borderRadius: 16,
          padding: 16,
          marginTop: 4,
          marginBottom: 24,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
          <FileText size={18} color="#B45309" style={{ marginRight: 8 }} />
          <Text
            style={{
              fontSize: 15,
              fontFamily: theme.fonts?.bold || 'Manrope-Bold',
              color: '#92400E',
            }}
          >
            Document Guidelines
          </Text>
        </View>

        <Text
          style={{
            fontSize: 13,
            fontFamily: theme.fonts?.medium || 'Manrope-Medium',
            color: '#B45309',
            marginBottom: 6,
          }}
        >
          Ensure documents are clear and readable :
        </Text>

        <View style={{ paddingLeft: 4, gap: 4 }}>
          <Text
            style={{
              fontSize: 12,
              color: '#B45309',
              fontFamily: theme.fonts?.regular || 'Manrope-Regular',
            }}
          >
            • All documents should be valid and not expired
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#B45309',
              fontFamily: theme.fonts?.regular || 'Manrope-Regular',
            }}
          >
            • File size should not exceed 5MB per document
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: '#B45309',
              fontFamily: theme.fonts?.regular || 'Manrope-Regular',
            }}
          >
            • Accepted formats: PDF, JPG, PNG
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DocumentUploadDetails;