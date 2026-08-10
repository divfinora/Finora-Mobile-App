import React from 'react';
import { View, Text } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
 
 import  DocumentUploadCard from '../../commonComponent/DocumentUploadCard'
import { theme } from '../../../../../theme';

const IncomeDocument = ({ formData, setFormData, errors, setErrors }) => {
  // Income Documents Configuration List
  const incomeDocsList = [
    { id: 'salarySlip', title: 'Salary Slip', subtitle: 'Last 3 Months' },
    { id: 'form16', title: 'Form 16', subtitle: '' },
    { id: 'companyId', title: 'Company ID', subtitle: '' },
    { id: 'offerLetter', title: 'Offer Letter', subtitle: '' },
    { id: 'bankStatement', title: 'Bank Statement', subtitle: 'Last 6 Months' },
  ];

  // Document Upload Handler
  const handleUpload = (docId) => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', quality: 0.8 },
      (response) => {
        if (response.didCancel || response.errorCode) return;

        if (response.assets && response.assets.length > 0) {
          const file = response.assets[0];
          setFormData((prev) => ({
            ...prev,
            incomeDocs: {
              ...prev?.incomeDocs,
              [docId]: file,
            },
          }));

          if (setErrors) {
            setErrors((prev) => ({ ...prev, [docId]: '' }));
          }
        }
      }
    );
  };

  return (
    <View style={{ paddingVertical: theme.spacing.sm }}>
      {/* ===== Section Title ===== */}
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

      {/* ===== Map Document List to Reusable Component ===== */}
      {incomeDocsList.map((doc) => (
        <DocumentUploadCard
          key={doc.id}
          title={doc.title}
          subtitle={doc.subtitle}
          uploadedFile={formData?.incomeDocs?.[doc.id]}
          onUpload={() => handleUpload(doc.id)}
          error={errors?.[doc.id]}
        />
      ))}
    </View>
  );
};

export default IncomeDocument;