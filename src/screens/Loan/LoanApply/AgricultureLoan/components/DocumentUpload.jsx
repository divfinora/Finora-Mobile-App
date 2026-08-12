// components/DocumentUpload.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { FileText } from 'lucide-react-native';
import DocumentUploadCard from '../../../../../components/common/Input/DocumentUploadCard';
import { theme } from '../../../../../theme';

// Theme & Common Card Import
 

const DocumentUpload = ({ formData = {}, setFormData, errors = {}, setErrors }) => {
  const documents = formData?.documents || {};

  const handleDocumentUpload = (key, defaultFileName) => {
    const isCurrentlyUploaded = !!documents[key];
    const updatedDocs = {
      ...documents,
      [key]: isCurrentlyUploaded
        ? null
        : { fileName: defaultFileName, uploadedAt: new Date().toISOString() },
    };

    setFormData?.((prev) => ({
      ...prev,
      documents: updatedDocs,
    }));

    if (errors?.[key] && setErrors) {
      setErrors((prev) => ({ ...prev, [key]: null }));
    }
  };

  const docConfig = [
    {
      key: 'aadharCard',
      title: 'Aadhar Card',
      subtitle: 'upload both front & back side',
      required: false,
      defaultFileName: 'aadhar_card.pdf',
    },
    {
      key: 'panCard',
      title: 'Pan Card',
      subtitle: 'upload front side clear copy',
      required: false,
      defaultFileName: 'pan_card.jpg',
    },
    {
      key: 'landDocument',
      title: 'Land Document',
      subtitle: 'utility bill, passport,or driving license',
      required: true,
      defaultFileName: 'land_registry_doc.pdf',
    },
    {
      key: 'cropProof',
      title: 'Crop Proof',
      subtitle: 'Upload all document Khasara,Khatauni',
      required: true,
      defaultFileName: 'khasra_khatauni.pdf',
    },
    {
      key: 'bankStatement',
      title: 'Bank Statement',
      subtitle: 'Last 6 Months',
      required: false,
      defaultFileName: 'bank_statement_6months.pdf',
    },
  ];

  return (
    <View style={{ marginTop: theme.spacing.md }}>
      {/* Upload Cards List using DocumentUploadCard */}
      {docConfig.map((doc) => (
        <DocumentUploadCard
          key={doc.key}
          title={doc.title + (doc.required ? ' *' : '')}
          subtitle={doc.subtitle}
          uploadedFile={documents[doc.key]}
          onUpload={() => handleDocumentUpload(doc.key, doc.defaultFileName)}
          error={errors?.[doc.key]}
        />
      ))}

      {/* Document Guidelines Callout Card */}
      <View
        style={{
          backgroundColor: '#FFFBEC',
          borderRadius: theme.radius.lg,
          borderWidth: theme.borderWidth.thin,
          borderColor: '#FFD8BE',
          padding: theme.spacing.xl,
          marginTop: theme.spacing.sm,
          marginBottom: theme.spacing.lg,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing.md,
          }}
        >
          <FileText size={22} color={theme.colors.primary900} />
          <Text
            style={{
              fontSize: theme.typography.b1,
              fontFamily: theme.fonts.bold,
              color: '#8A3200',
              marginLeft: theme.spacing.sm,
            }}
          >
            Document Guidelines
          </Text>
        </View>

        <Text
          style={{
            fontSize: theme.typography.b3,
            fontFamily: theme.fonts.medium,
            color: '#8A3200',
            marginBottom: theme.spacing.xs,
          }}
        >
          Ensure documents are clear and readable :
        </Text>

        {[
          'All documents should be valid and not expired',
          'File size should not exceed 5MB per document',
          'Accepted formats: PDF, JPG, PNG',
        ].map((bullet, index) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginTop: 4,
            }}
          >
            <Text
              style={{
                color: '#8A3200',
                marginRight: theme.spacing.xs,
                lineHeight: theme.lineHeight.b3,
              }}
            >
              •
            </Text>
            <Text
              style={{
                fontSize: theme.typography.b3,
                fontFamily: theme.fonts.regular,
                color: '#8A3200',
                lineHeight: theme.lineHeight.b3,
                flex: 1,
              }}
            >
              {bullet}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default DocumentUpload;