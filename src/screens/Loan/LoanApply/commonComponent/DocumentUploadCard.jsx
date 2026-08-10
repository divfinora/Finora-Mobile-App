import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
 
import { Upload, CheckSquare, Square, CheckCircle2 } from 'lucide-react-native';
import { theme } from '../../../../theme';

// ===== Reusable Document Upload Card =====
const DocumentUploadCard = ({ title, subtitle, uploadedFile, onUpload, error }) => {
  const isUploaded = !!uploadedFile;

  return (
    <View style={{ marginBottom: theme.spacing.xl }}>
      {/* ----- Header Row (Checkbox + Document Title & Subtitle) ----- */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginBottom: theme.spacing.sm,
        }}
      >
        {isUploaded ? (
          <View
            style={{
              backgroundColor: theme.colors.success,
              borderRadius: 4,
              padding: 2,
              marginRight: theme.spacing.sm,
              marginTop: 2,
            }}
          >
            <CheckSquare size={16} color={theme.colors.white} />
          </View>
        ) : (
          <Square
            size={20}
            color={theme.colors.gray300}
            style={{ marginRight: theme.spacing.sm, marginTop: 2 }}
          />
        )}

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: theme.typography.b1,
              fontFamily: theme.fonts.bold,
              color: theme.colors.text,
            }}
          >
            {title}
          </Text>

          {!!subtitle && (
            <Text
              style={{
                fontSize: theme.typography.b2,
                fontFamily: theme.fonts.regular,
                color: theme.colors.gray500,
                marginTop: 2,
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>
      </View>

      {/* ----- Dashed Upload Dropzone Container ----- */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onUpload}
        style={{
          borderWidth: 1,
          borderStyle: 'dashed',
          borderColor: isUploaded ? theme.colors.primary500 : theme.colors.gray300,
          borderRadius: theme.radius.xl,
          backgroundColor: isUploaded ? theme.colors.primary50 : '#F8FAFC',
          paddingVertical: theme.spacing.xl,
          paddingHorizontal: theme.spacing.lg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Upload Icon inside Circle Background */}
        {isUploaded ? (
          <CheckCircle2 size={36} color={theme.colors.success} style={{ marginBottom: theme.spacing.sm }} />
        ) : (
          <View
            style={{
              width: 48,
              height: 48,
              borderRadius: theme.radius.circle,
              backgroundColor: theme.colors.gray100,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing.sm,
            }}
          >
            <Upload size={22} color={theme.colors.navy500} />
          </View>
        )}

        {/* Title Inside Box */}
        <Text
          style={{
            fontSize: theme.typography.b1,
            fontFamily: theme.fonts.bold,
            color: theme.colors.text,
            marginBottom: 2,
          }}
        >
          {title}
        </Text>

        {/* Subtitle / File Name Inside Box */}
        {!!subtitle && (
          <Text
            style={{
              fontSize: theme.typography.b3,
              fontFamily: theme.fonts.regular,
              color: theme.colors.gray500,
              marginBottom: theme.spacing.md,
              textAlign: 'center',
            }}
          >
            {isUploaded && uploadedFile?.fileName ? uploadedFile.fileName : subtitle}
          </Text>
        )}

        {/* Action Button Pill */}
        <View
          style={{
            backgroundColor: theme.colors.white,
            paddingVertical: theme.spacing.sm,
            paddingHorizontal: theme.spacing.xxl,
            borderRadius: theme.radius.md,
            borderWidth: 1,
            borderColor: isUploaded ? theme.colors.success : theme.colors.gray200,
            ...theme.shadows.card,
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.b2,
              fontFamily: theme.fonts.bold,
              color: isUploaded ? theme.colors.success : theme.colors.text,
            }}
          >
            {isUploaded ? 'Change File' : 'Upload File'}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Error Message */}
      {!!error && (
        <Text
          style={{
            color: theme.colors.error,
            fontSize: theme.typography.b3,
            marginTop: 4,
            fontFamily: theme.fonts.medium,
          }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default DocumentUploadCard;