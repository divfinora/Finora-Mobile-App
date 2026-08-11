import React from 'react';
import { View, Text } from 'react-native';
 
import { Check, CreditCard, Home, FileText } from 'lucide-react-native';
import { theme } from '../../../../theme';

// ===== Verification Document Component =====
const VerificationDocument = () => {
  // Static Data for Verification Document Categories
  const documentSections = [
    {
      id: 'identity',
      icon: <CreditCard size={22} color={theme.colors.primary500} />,
      title: 'Identity Verification',
      subtitle: 'Used to verify your identity.',
      acceptedDocs: ['Aadhaar Card', 'PAN Card', 'Passport', 'Voter ID'],
      requiredText: 'Required for everyone',
    },
    {
      id: 'address',
      icon: <Home size={22} color={theme.colors.primary500} />,
      title: 'Address Verification',
      subtitle: 'Used to verify your residential address.',
      acceptedDocs: ['Aadhaar Card', 'Utility Bill', 'Rental Agreement'],
      requiredText: 'Required for everyone',
    },
    {
      id: 'pan',
      icon: <FileText size={22} color={theme.colors.primary500} />,
      title: 'PAN Card',
      subtitle: 'Purpose Credit & Tax Verification',
      acceptedDocs: ['PAN Card'],
      requiredText: 'Required for everyone',
    },
  ];

  return (
    <View style={{ paddingVertical: theme.spacing.sm }}>
      {/* ===== Top Section Heading ===== */}
      <Text
        style={{
          fontSize: theme.typography.h3 || 18,
          fontFamily: theme.fonts.bold,
          color: theme.colors.text,
          marginBottom: theme.spacing.md,
        }}
      >
        Basic Required Documents
      </Text>

      {/* ===== Loop through each Document Requirement Card ===== */}
      {documentSections.map((section) => (
        <View
          key={section.id}
          style={[
            theme.card.default,
            {
              marginBottom: theme.spacing.lg,
              padding: theme.spacing.xl,
              borderRadius: theme.radius.xl,
              backgroundColor: theme.colors.white,
            },
          ]}
        >
          {/* ----- Card Header (Icon + Title + Subtitle) ----- */}
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: theme.spacing.md }}>
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: theme.radius.md,
                backgroundColor: theme.colors.gray100,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {section.icon}
            </View>

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: theme.typography.b1,
                  fontFamily: theme.fonts.bold,
                  color: theme.colors.text,
                }}
              >
                {section.title}
              </Text>

              <Text
                style={{
                  fontSize: theme.typography.b2,
                  fontFamily: theme.fonts.regular,
                  color: theme.colors.gray500,
                  marginTop: 2,
                }}
              >
                {section.subtitle}
              </Text>
            </View>
          </View>

          {/* ----- Accepted Documents Sub-section ----- */}
          <View style={{ marginTop: theme.spacing.lg }}>
            <Text
              style={{
                fontSize: theme.typography.b2,
                fontFamily: theme.fonts.bold,
                color: theme.colors.text,
                marginBottom: theme.spacing.sm,
              }}
            >
              Accepted Documents
            </Text>

            {/* List of Accepted Bullet Points */}
            <View style={{ gap: theme.spacing.xs }}>
              {section.acceptedDocs.map((doc, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: theme.spacing.xs,
                  }}
                >
                  {/* Bullet Dot */}
                  <View
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: theme.radius.circle,
                      backgroundColor: theme.colors.gray500,
                      marginRight: theme.spacing.xs,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: theme.typography.b2,
                      fontFamily: theme.fonts.medium,
                      color: theme.colors.gray700,
                    }}
                  >
                    {doc}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* ----- Card Footer Divider ----- */}
          <View
            style={{
              height: theme.borderWidth.thin,
              backgroundColor: theme.colors.divider,
              marginVertical: theme.spacing.lg,
            }}
          />

          {/* ----- Required Badge / Status ----- */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}>
            <Check size={16} color={'#246B2D'} strokeWidth={2.5} />
            <Text
              style={{
                fontSize: theme.typography.b2,
                fontFamily: theme.fonts.medium,
                color: '#246B2D',
              }}
            >
                
              {section.requiredText}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default VerificationDocument;