import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { theme } from '../../../../../theme';
import { 
  UploadCloud, 
  CheckCircle2, 
  Camera, 
  FileText, 
  CheckSquare, 
  Square 
} from 'lucide-react-native';

// ===== Individual Dashed Upload Card =====
const UploadCard = ({ 
  label, 
  subtitle, 
  required = false, 
  isUploaded = false, 
  fileName, 
  onUpload 
}) => {
  return (
    <View style={{ marginBottom: theme.spacing.xl }}>
      {/* Label with Checkbox Indicator */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm }}>
        {isUploaded ? (
          <CheckSquare size={18} color={theme.colors.primary500} style={{ marginRight: theme.spacing.xs }} />
        ) : (
          <Square size={18} color={theme.colors.gray300} style={{ marginRight: theme.spacing.xs }} />
        )}
        <Text
          style={{
            fontSize: theme.typography.b1,
            fontFamily: theme.fonts.bold,
            color: theme.colors.text,
          }}
        >
          {label} {required && <Text style={{ color: theme.colors.error }}>*</Text>}
        </Text>
      </View>

      {/* Dashed Upload Box */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onUpload}
        style={{
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: isUploaded ? theme.colors.primary500 : theme.colors.gray300,
          borderRadius: theme.radius.lg,
          backgroundColor: isUploaded ? theme.colors.primary50 : '#F8FAFC',
          paddingVertical: theme.spacing.xl,
          paddingHorizontal: theme.spacing.lg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isUploaded ? (
          <CheckCircle2 size={32} color={theme.colors.success} style={{ marginBottom: theme.spacing.xs }} />
        ) : (
          <UploadCloud size={32} color={theme.colors.navy300} style={{ marginBottom: theme.spacing.xs }} />
        )}

        <Text
          style={{
            fontSize: theme.typography.b2,
            fontFamily: theme.fonts.medium,
            color: isUploaded ? theme.colors.success : theme.colors.text,
            marginBottom: 2,
          }}
        >
          {isUploaded ? 'Document Uploaded' : 'Click to upload'}
        </Text>

        {!!subtitle && !isUploaded && (
          <Text
            style={{
              fontSize: theme.typography.b3,
              fontFamily: theme.fonts.regular,
              color: theme.colors.gray500,
              marginBottom: theme.spacing.md,
              textAlign: 'center',
            }}
          >
            {subtitle}
          </Text>
        )}

        {isUploaded && !!fileName && (
          <Text
            style={{
              fontSize: theme.typography.b3,
              fontFamily: theme.fonts.regular,
              color: theme.colors.gray700,
              marginBottom: theme.spacing.md,
            }}
            numberOfLines={1}
          >
            {fileName}
          </Text>
        )}

        {/* Upload Button Pill */}
        <View
          style={{
            backgroundColor: isUploaded ? theme.colors.primary100 : theme.colors.white,
            paddingVertical: theme.spacing.xs,
            paddingHorizontal: theme.spacing.xl,
            borderRadius: theme.radius.pill,
            borderWidth: theme.borderWidth.thin,
            borderColor: isUploaded ? theme.colors.primary300 : theme.colors.gray300,
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.b3,
              fontFamily: theme.fonts.medium,
              color: isUploaded ? theme.colors.primary700 : theme.colors.text,
            }}
          >
            {isUploaded ? 'Change File' : 'Upload File'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// ===== Section Category Header =====
const CategoryHeader = ({ title }) => (
  <Text
    style={{
      fontSize: theme.typography.b1,
      fontFamily: theme.fonts.bold,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      marginTop: theme.spacing.sm,
    }}
  >
    {title} :
  </Text>
);

// ===== Main Component =====
const DocumentUploadForm = ({ formData, setFormData, errors, setErrors, productDetails }) => {

  const handleUpload = (docKey) => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.didCancel || response.errorCode) return;

      if (response.assets && response.assets.length > 0) {
        const file = response.assets[0];
        setFormData((prev) => ({
          ...prev,
          documents: {
            ...prev?.documents,
            [docKey]: file,
          },
        }));

        if (setErrors) {
          setErrors((prev) => ({
            ...prev,
            [docKey]: '',
          }));
        }
      }
    });
  };

  const getDoc = (key) => formData?.documents?.[key];

  return (
    <View style={{ paddingVertical: theme.spacing.sm }}>

      {/* ===== SECTION 1: Identity Proof ===== */}
      <CategoryHeader title="Identity Proof" />

      <UploadCard
        label="Aadhar Card"
        subtitle="Upload both front & back side"
        isUploaded={!!getDoc('aadhar')}
        fileName={getDoc('aadhar')?.fileName}
        onUpload={() => handleUpload('aadhar')}
      />

      <UploadCard
        label="Pan Card"
        subtitle="Form 16"
        isUploaded={!!getDoc('pan')}
        fileName={getDoc('pan')?.fileName}
        onUpload={() => handleUpload('pan')}
      />

      {/* ===== SECTION 2: Address Proof ===== */}
      <CategoryHeader title="Address Proof" />

      <UploadCard
        label="Utility Bill (Electricity / Water )"
        subtitle="Utility bill should be on name registered"
        required
        isUploaded={!!getDoc('utilityBill')}
        fileName={getDoc('utilityBill')?.fileName}
        onUpload={() => handleUpload('utilityBill')}
      />

      {/* ===== SECTION 3: Property Document ===== */}
      <CategoryHeader title="Property Document" />

      <UploadCard
        label="Property Tax Receipt"
        required
        isUploaded={!!getDoc('propertyTax')}
        fileName={getDoc('propertyTax')?.fileName}
        onUpload={() => handleUpload('propertyTax')}
      />

      <UploadCard
        label="Sale Deed"
        required
        isUploaded={!!getDoc('saleDeed')}
        fileName={getDoc('saleDeed')?.fileName}
        onUpload={() => handleUpload('saleDeed')}
      />

      <UploadCard
        label="Encumbrance Certificate"
        required
        isUploaded={!!getDoc('encumbranceCert')}
        fileName={getDoc('encumbranceCert')?.fileName}
        onUpload={() => handleUpload('encumbranceCert')}
      />

      <UploadCard
        label="Approved Plan"
        required
        isUploaded={!!getDoc('approvedPlan')}
        fileName={getDoc('approvedPlan')?.fileName}
        onUpload={() => handleUpload('approvedPlan')}
      />

      <UploadCard
        label="Salary Slip"
        subtitle="Last 3 months"
        required
        isUploaded={!!getDoc('salarySlip')}
        fileName={getDoc('salarySlip')?.fileName}
        onUpload={() => handleUpload('salarySlip')}
      />

      <UploadCard
        label="ITR ( Form 16 )"
        subtitle="From 16 for 2 Yrs/ No 2"
        required
        isUploaded={!!getDoc('itr')}
        fileName={getDoc('itr')?.fileName}
        onUpload={() => handleUpload('itr')}
      />

      <UploadCard
        label="Bank Statement"
        subtitle="Last 6 month's bank statement"
        required
        isUploaded={!!getDoc('bankStatement')}
        fileName={getDoc('bankStatement')?.fileName}
        onUpload={() => handleUpload('bankStatement')}
      />

      {/* ===== Special Blue Card: Latest Property Photos ===== */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleUpload('propertyPhotos')}
        style={{
          backgroundColor: '#EBF3FF',
          borderRadius: theme.radius.xl,
          padding: theme.spacing.xl,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: theme.spacing.xl,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: '#2563EB',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: theme.spacing.sm,
          }}
        >
          <Camera size={24} color={theme.colors.white} />
        </View>

        <Text
          style={{
            fontSize: theme.typography.b1,
            fontFamily: theme.fonts.bold,
            color: theme.colors.text,
            marginBottom: theme.spacing.xs,
          }}
        >
          Latest Property Photos
        </Text>

        <Text
          style={{
            fontSize: theme.typography.b2,
            fontFamily: theme.fonts.regular,
            color: theme.colors.gray700,
            textAlign: 'center',
            lineHeight: theme.lineHeight.b2,
          }}
        >
          Upload at least 4 photos (Front, Interior, Side, Entrance)
        </Text>
      </TouchableOpacity>

      {/* ===== Yellow Card: Document Guidelines ===== */}
      <View
        style={{
          backgroundColor: '#FFFBEB',
          borderColor: '#FCD34D',
          borderWidth: 1,
          borderRadius: theme.radius.lg,
          padding: theme.spacing.lg,
          marginBottom: theme.spacing.lg,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: theme.spacing.sm }}>
          <FileText size={20} color="#D97706" style={{ marginRight: theme.spacing.xs }} />
          <Text
            style={{
              fontSize: theme.typography.b1,
              fontFamily: theme.fonts.bold,
              color: '#92400E',
            }}
          >
            Document Guidelines
          </Text>
        </View>

        <View style={{ gap: 4, paddingLeft: 4 }}>
          <Text style={{ fontSize: theme.typography.b3, fontFamily: theme.fonts.regular, color: '#B45309' }}>
            • Ensure documents are clear and readable
          </Text>
          <Text style={{ fontSize: theme.typography.b3, fontFamily: theme.fonts.regular, color: '#B45309' }}>
            • All documents should be valid and not expired
          </Text>
          <Text style={{ fontSize: theme.typography.b3, fontFamily: theme.fonts.regular, color: '#B45309' }}>
            • File size should not exceed 5MB per document
          </Text>
          <Text style={{ fontSize: theme.typography.b3, fontFamily: theme.fonts.regular, color: '#B45309' }}>
            • Accepted formats: PDF, JPG, PNG
          </Text>
        </View>
      </View>

    </View>
  );
};

export default DocumentUploadForm;