import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import { theme } from '../../../../../theme';
import { FileUp, CheckSquare, Square, CheckCircle2 } from 'lucide-react-native';

const RequiredDocument = ({ formData, setFormData, errors, setErrors }) => {
  // Required Document Configuration
  const documentList = [
    {
      id: 'identityProof',
      title: 'Identity Proof',
      subtitle: 'Aadhaar / PAN / Passport / Voter ID',
    },
    {
      id: 'addressProof',
      title: 'Address Proof',
      subtitle: 'Aadhaar / Utility Bill / Rental Agreement',
    },
    {
      id: 'panCard',
      title: 'PAN Card',
      subtitle: 'Required for Tax Verification',
    },
  ];

  // Image / Document Picker Handler
  const handleUpload = (docId) => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel || response.errorCode) return;

        if (response.assets && response.assets.length > 0) {
          const file = response.assets[0];
          setFormData((prev) => ({
            ...prev,
            requiredDocs: {
              ...prev?.requiredDocs,
              [docId]: file,
            },
          }));

          if (setErrors) {
            setErrors((prev) => ({
              ...prev,
              [docId]: '',
            }));
          }
        }
      }
    );
  };

  return (
    <View style={{ paddingVertical: theme?.spacing?.sm || 8 }}>
      {/* ===== Section Title ===== */}
      <Text
        style={{
          fontSize: theme?.typography?.h3 || 18,
          fontFamily: theme?.fonts?.bold || 'System',
          color: theme?.colors?.text || '#0F172A',
          marginBottom: theme?.spacing?.md || 12,
        }}
      >
        Upload Basic Documents
      </Text>

      {/* ===== Document Cards Loop ===== */}
      {documentList.map((doc) => {
        const uploadedFile = formData?.requiredDocs?.[doc.id];
        const isUploaded = !!uploadedFile;

        return (
          <View key={doc.id} style={{ marginBottom: theme?.spacing?.xl || 20 }}>
            {/* ----- Header Row (Checkbox + Title + Subtitle) ----- */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                marginBottom: theme?.spacing?.sm || 8,
              }}
            >
              {/* Green Checkbox when uploaded, Gray outline square when pending */}
              {isUploaded ? (
                <View
                  style={{
                    backgroundColor: '#16A34A',
                    borderRadius: 4,
                    padding: 2,
                    marginRight: 8,
                    marginTop: 2,
                  }}
                >
                  <CheckSquare size={16} color="#FFFFFF" />
                </View>
              ) : (
                <Square
                  size={20}
                  color={theme?.colors?.gray300 || '#CBD5E1'}
                  style={{ marginRight: 8, marginTop: 2 }}
                />
              )}

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: theme?.typography?.b1 || 16,
                    fontFamily: theme?.fonts?.bold || 'System',
                    color: theme?.colors?.text || '#0F172A',
                  }}
                >
                  {doc.title}
                </Text>

                <Text
                  style={{
                    fontSize: theme?.typography?.b2 || 13,
                    fontFamily: theme?.fonts?.regular || 'System',
                    color: theme?.colors?.gray500 || '#64748B',
                    marginTop: 2,
                  }}
                >
                  {doc.subtitle}
                </Text>
              </View>
            </View>

            {/* ----- Dashed Upload Box Container ----- */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleUpload(doc.id)}
              style={{
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: isUploaded
                  ? theme?.colors?.primary500 || '#2563EB'
                  : '#CBD5E1',
                borderRadius: theme?.radius?.xl || 16,
                backgroundColor: isUploaded ? '#F0F6FF' : '#F8FAFC',
                paddingVertical: 20,
                paddingHorizontal: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Document Icon inside dashed box */}
              {isUploaded ? (
                <CheckCircle2
                  size={32}
                  color="#16A34A"
                  style={{ marginBottom: 8 }}
                />
              ) : (
                <View
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: 8,
                    backgroundColor: '#E2E8F0',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 8,
                  }}
                >
                  <FileUp size={22} color="#64748B" />
                </View>
              )}

              {/* Title inside dashed box */}
              <Text
                style={{
                  fontSize: theme?.typography?.b1 || 15,
                  fontFamily: theme?.fonts?.bold || 'System',
                  color: theme?.colors?.text || '#0F172A',
                  marginBottom: 2,
                }}
              >
                {doc.title}
              </Text>

              {/* Subtitle inside dashed box */}
              <Text
                style={{
                  fontSize: theme?.typography?.b3 || 12,
                  fontFamily: theme?.fonts?.regular || 'System',
                  color: theme?.colors?.gray500 || '#64748B',
                  marginBottom: 14,
                  textAlign: 'center',
                }}
              >
                {isUploaded && uploadedFile?.fileName
                  ? uploadedFile.fileName
                  : doc.subtitle}
              </Text>

              {/* Upload File Pill Button with Theme Shadow */}
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  paddingVertical: 8,
                  paddingHorizontal: 22,
                  borderRadius: theme?.radius?.md || 8,
                  borderWidth: 1,
                  borderColor: isUploaded ? '#16A34A' : '#E2E8F0',
            ...theme.shadows.card
                }}
              >
                <Text
                  style={{
                    fontSize: theme?.typography?.b2 || 14,
                    fontFamily: theme?.fonts?.bold || 'System',
                    color: isUploaded ? '#16A34A' : '#0F172A',
                  }}
                >
                  {isUploaded ? 'Change File' : 'Upload File'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Error Message Display */}
            {!!errors?.[doc.id] && (
              <Text
                style={{
                  color: theme?.colors?.error || '#EF4444',
                  fontSize: theme?.typography?.b3 || 12,
                  marginTop: 4,
                  fontFamily: theme?.fonts?.medium || 'System',
                }}
              >
                {errors[doc.id]}
              </Text>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default RequiredDocument;