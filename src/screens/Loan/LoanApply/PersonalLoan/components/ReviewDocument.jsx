import React from 'react';
import { View, Text } from 'react-native';
 
import { Check, FileText } from 'lucide-react-native';
import { theme } from '../../../../../theme';

const ReviewDocument = ({ formData }) => {
  // Document list reading dynamic names from formData with default fallbacks
  const documents = [
    {
      id: 'identity',
      title: 'Identity Proof',
      fileName: formData?.identityProof?.name || formData?.verificationDoc?.name || 'Aadhaar Card.pdf',
    },
    {
      id: 'address',
      title: 'Address Proof',
      fileName: formData?.addressProof?.name || 'Rental Agreement.pdf',
    },
    {
      id: 'pan',
      title: 'PAN Card',
      fileName: formData?.panCard?.name || 'PAN Card.pdf',
    },
    {
      id: 'salary',
      title: 'Salary Slip',
      fileName: formData?.salarySlip?.name || formData?.incomeDocs?.salarySlip?.name || 'Salary Slip.pdf',
    },
    {
      id: 'bank',
      title: 'Bank Statement',
      fileName: formData?.bankStatement?.name || formData?.incomeDocs?.bankStatement?.name || 'Bank Statement.pdf',
    },
  ];

  const uploadedCount = documents.filter((doc) => !!doc.fileName).length;

  return (
    <View style={{ paddingTop: theme.spacing.md, paddingBottom: theme.spacing.lg }}>
      {/* ===== Title ===== */}
      <Text
        style={{
          fontSize: theme.typography.h3,
          fontFamily: theme.fonts.headingBold || theme.fonts.bold,
          color: theme.colors.text,
          marginBottom: theme.spacing.lg,
        }}
      >
        Review Documents
      </Text>

      {/* ===== Uploaded Document List ===== */}
      {documents.map((doc) => (
        <View
          key={doc.id}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.white,
            borderRadius: theme.radius.xl,
            padding: theme.spacing.lg,
            marginBottom: theme.spacing.md,
            borderWidth: 1,
            borderColor: '#F1F5F9',
            ...theme.shadows.card,
          }}
        >
          {/* Green Circle Check Icon */}
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: theme.radius.circle,
              backgroundColor: '#DCFCE7',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: theme.spacing.md,
            }}
          >
            <Check size={18} color="#16A34A" strokeWidth={3} />
          </View>

          {/* Titles & File Name */}
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: theme.typography.b1,
                fontFamily: theme.fonts.bold,
                color: theme.colors.text,
              }}
            >
              {doc.title}
            </Text>
            <Text
              style={{
                fontSize: theme.typography.b2,
                fontFamily: theme.fonts.regular,
                color: '#94A3B8',
                marginTop: 2,
              }}
            >
              {doc.fileName}
            </Text>
          </View>

          {/* File Icon */}
          <FileText size={20} color="#CBD5E1" />
        </View>
      ))}

      {/* ===== All Documents Ready Box ===== */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F0FDF4',
          borderWidth: 1,
          borderColor: '#BBF7D0',
          borderRadius: theme.radius.xl,
          padding: theme.spacing.lg,
          marginTop: theme.spacing.sm,
          marginBottom: theme.spacing.lg,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: theme.radius.circle,
            backgroundColor: theme.colors.white,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: theme.spacing.md,
            elevation: 1,
          }}
        >
          <Check size={22} color="#16A34A" strokeWidth={3} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: theme.typography.b1, fontFamily: theme.fonts.bold, color: '#15803D' }}>
            All documents ready
          </Text>
          <Text style={{ fontSize: theme.typography.b2, fontFamily: theme.fonts.regular, color: '#16A34A', marginTop: 2 }}>
            {uploadedCount} documents uploaded successfully
          </Text>
        </View>
      </View>

      {/* ===== Status Text above Submit Button ===== */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: theme.spacing.xs }}>
        <Check size={16} color="#16A34A" strokeWidth={3} />
        <Text
          style={{
            fontSize: 12,
            fontFamily: theme.fonts.bold,
            color: '#16A34A',
            letterSpacing: 0.6,
          }}
        >
          ALL REQUIRED DOCUMENTS UPLOADED
        </Text>
      </View>
    </View>
  );
};

export default ReviewDocument;