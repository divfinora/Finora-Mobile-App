import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Camera, FileText } from 'lucide-react-native';
import { theme } from '../../../../../theme';
import DocumentUploadCard from '../../../../../components/common/Input/DocumentUploadCard';
 
 
const CommercialDocumentUpload = ({ formData = {}, setFormData, errors = {}, setErrors }) => {
  const handleUpload = (docKey) => {
    // Demo mock file upload trigger
    const updatedDocs = {
      ...(formData?.documents || {}),
      [docKey]: { fileName: `${docKey}_uploaded.pdf` },
    };
    setFormData((prev) => ({ ...prev, documents: updatedDocs }));
    if (setErrors) {
      setErrors((prev) => ({ ...prev, [docKey]: '' }));
    }
  };

  const renderSectionHeader = (title) => (
    <Text
      style={{
        fontSize: theme.typography?.h4 || 16,
        fontFamily: theme.fonts?.bold,
        fontWeight: '700',
        color: theme.colors?.text || '#1E293B',
        marginTop: theme.spacing?.md || 16,
        marginBottom: theme.spacing?.sm || 12,
      }}
    >
      {title} <Text style={{ color: theme.colors?.error || '#EF4444' }}>*</Text>
    </Text>
  );

  return (
    <View style={{ paddingVertical: theme.spacing?.sm || 8 }}>
      {/* SECTION 1: Identity Proof */}
      {renderSectionHeader('Identity Proof')}

      <DocumentUploadCard
        title="Aadhar Card"
        subtitle="Upload both front & back side"
        uploadedFile={formData?.documents?.aadharCard}
        onUpload={() => handleUpload('aadharCard')}
        error={errors?.aadharCard}
      />

      <DocumentUploadCard
        title="Pan Card"
        uploadedFile={formData?.documents?.panCard}
        onUpload={() => handleUpload('panCard')}
        error={errors?.panCard}
      />

      {/* SECTION 2: Address Proof */}
      {renderSectionHeader('Address Proof')}

      <DocumentUploadCard
        title="Utility Bill (Electricity / Water)"
        subtitle="Utility bill paid or on owner registered"
        uploadedFile={formData?.documents?.utilityBill}
        onUpload={() => handleUpload('utilityBill')}
        error={errors?.utilityBill}
      />

      {/* SECTION 3: Property Document */}
      {renderSectionHeader('Property Document')}

      <DocumentUploadCard
        title="Property Tax Receipt"
        uploadedFile={formData?.documents?.propertyTaxReceipt}
        onUpload={() => handleUpload('propertyTaxReceipt')}
        error={errors?.propertyTaxReceipt}
      />

      <DocumentUploadCard
        title="Sale Deed"
        uploadedFile={formData?.documents?.saleDeed}
        onUpload={() => handleUpload('saleDeed')}
        error={errors?.saleDeed}
      />

      <DocumentUploadCard
        title="Encumbrance Certificate"
        uploadedFile={formData?.documents?.encumbranceCertificate}
        onUpload={() => handleUpload('encumbranceCertificate')}
        error={errors?.encumbranceCertificate}
      />

      <DocumentUploadCard
        title="Approved Plan"
        uploadedFile={formData?.documents?.approvedPlan}
        onUpload={() => handleUpload('approvedPlan')}
        error={errors?.approvedPlan}
      />

      <DocumentUploadCard
        title="Occupancy Certificate"
        subtitle="Last 3 months"
        uploadedFile={formData?.documents?.occupancyCertificate}
        onUpload={() => handleUpload('occupancyCertificate')}
        error={errors?.occupancyCertificate}
      />

      <DocumentUploadCard
        title="ITR (Form 16)"
        subtitle="Form 16 / ITR 2"
        uploadedFile={formData?.documents?.itrForm16}
        onUpload={() => handleUpload('itrForm16')}
        error={errors?.itrForm16}
      />

      <DocumentUploadCard
        title="Bank Statement"
        subtitle="Last 6 months bank statement"
        uploadedFile={formData?.documents?.bankStatement}
        onUpload={() => handleUpload('bankStatement')}
        error={errors?.bankStatement}
      />

      {/* SPECIAL BLUE CARD: Property Photos */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleUpload('propertyPhotos')}
        style={{
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: theme.colors?.primary500 || '#3B82F6',
          borderRadius: theme.radius?.xl || 16,
          backgroundColor: '#EBF3FF',
          paddingVertical: theme.spacing?.xl || 24,
          paddingHorizontal: theme.spacing?.lg || 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: theme.spacing?.xl || 24,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            backgroundColor: theme.colors?.primary500 || '#2563EB',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: theme.spacing?.sm || 10,
          }}
        >
          <Camera size={22} color="#FFFFFF" />
        </View>

        <Text
          style={{
            fontSize: theme.typography?.b1 || 16,
            fontFamily: theme.fonts?.bold,
            fontWeight: '700',
            color: theme.colors?.text || '#1E293B',
            marginBottom: 4,
          }}
        >
          Latest Property Photos
        </Text>

        <Text
          style={{
            fontSize: theme.typography?.b3 || 13,
            fontFamily: theme.fonts?.regular,
            color: theme.colors?.gray600 || '#64748B',
            textAlign: 'center',
            paddingHorizontal: 20,
          }}
        >
          Upload at least 4 photos (Front, Interior, Side, Entrance)
        </Text>
      </TouchableOpacity>

      {/* BOTTOM BOX: Document Guidelines */}
      <View
        style={{
          backgroundColor: '#FFF8F0',
          borderWidth: 1,
          borderColor: '#FDBA74',
          borderRadius: theme.radius?.lg || 16,
          padding: theme.spacing?.lg || 16,
          marginBottom: theme.spacing?.xl || 24,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing?.sm || 10,
          }}
        >
          <FileText size={18} color="#D97706" style={{ marginRight: 8 }} />
          <Text
            style={{
              fontSize: theme.typography?.b2 || 15,
              fontFamily: theme.fonts?.bold,
              fontWeight: '700',
              color: '#B45309',
            }}
          >
            Document Guidelines
          </Text>
        </View>

        {[
          'Ensure documents are clear and readable',
          'All documents should be valid and not expired',
          'File size should not exceed 5MB per document',
          'Accepted formats: PDF, JPG, PNG',
        ].map((item, idx) => (
          <View
            key={idx}
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              marginTop: 4,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: '#D97706',
                marginRight: 6,
                lineHeight: 18,
              }}
            >
              •
            </Text>
            <Text
              style={{
                fontSize: theme.typography?.caption || 13,
                fontFamily: theme.fonts?.regular,
                color: '#78350F',
                lineHeight: 18,
                flex: 1,
              }}
            >
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default CommercialDocumentUpload;