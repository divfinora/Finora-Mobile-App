// components/LandDetails.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  Home,
  FileText,
  Users,
  CheckCircle2,
  Circle,
  Tractor,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react-native';

// Common Components & Theme
import CommonInput from '../../../../../components/common/Input/CommonInput';
import { theme } from '../../../../../theme/index.js';

const LandDetails = ({ formData = {}, setFormData, errors = {}, setErrors }) => {
  // Form values with fallbacks
  const ownershipType = formData?.ownershipType || 'Leased land';
  const currentCropType = formData?.currentCropType || '';
  const landArea = formData?.landArea || '';
  const irrigationSource = formData?.irrigationSource || '';

  const updateField = (field, value) => {
    setFormData?.((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field] && setErrors) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const ownershipOptions = [
    {
      id: 'Owned',
      title: 'Owned',
      subtitle: 'Full legal ownership',
      Icon: Home,
    },
    {
      id: 'Leased land',
      title: 'Leased land',
      subtitle: 'Rented for cultivation',
      Icon: FileText,
    },
    {
      id: 'Shared',
      title: 'Shared',
      subtitle: 'Joint Family/group land',
      Icon: Users,
    },
  ];

  return (
    <View style={{ marginTop: theme.spacing.md, marginBottom: theme.spacing.xl }}>
      {/* Land Ownership Options */}
      <View style={{ marginBottom: theme.spacing.lg }}>
        <Text
          style={{
            fontSize: theme.typography.b2,
            fontFamily: theme.fonts.medium,
            color: theme.colors.gray700,
            marginBottom: theme.spacing.sm,
          }}
        >
          Land Ownership
        </Text>

        {ownershipOptions.map((option) => {
          const isSelected = ownershipType === option.id;
          const OptionIcon = option.Icon;

          return (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.8}
              onPress={() => updateField('ownershipType', option.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: theme.spacing.lg,
                borderRadius: theme.radius.lg,
                borderWidth: theme.borderWidth.thin,
                borderColor: isSelected
                  ? theme.colors.primary500
                  : theme.colors.gray300,
                backgroundColor: isSelected
                  ? theme.colors.primary50
                  : theme.colors.white,
                marginBottom: theme.spacing.sm,
              }}
            >
              {/* Icon Container */}
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: theme.radius.circle,
                  backgroundColor: theme.colors.gray100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: theme.spacing.md,
                }}
              >
                <OptionIcon size={theme.iconSize.sm} color={theme.colors.black} />
              </View>

              {/* Text Details */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: theme.typography.b1,
                    fontFamily: theme.fonts.bold,
                    color: theme.colors.text,
                  }}
                >
                  {option.title}
                </Text>
                <Text
                  style={{
                    fontSize: theme.typography.b3,
                    fontFamily: theme.fonts.medium,
                    color: theme.colors.gray500,
                    marginTop: 2,
                  }}
                >
                  {option.subtitle}
                </Text>
              </View>

              {/* Selected / Unselected Icon */}
              {isSelected ? (
                <CheckCircle2 size={22} color={theme.colors.primary500} />
              ) : (
                <Circle size={22} color={theme.colors.gray300} />
              )}
            </TouchableOpacity>
          );
        })}

        {errors?.ownershipType && (
          <Text
            style={{
              marginTop: theme.spacing.xs,
              fontSize: theme.typography.b3,
              color: theme.colors.error,
              fontFamily: theme.fonts.regular,
            }}
          >
            {errors.ownershipType}
          </Text>
        )}
      </View>

      {/* Inputs Wrapper Container */}
      <View
        style={{
          backgroundColor: theme.colors.gray100,
          borderRadius: theme.radius.xl,
          padding: theme.spacing.lg,
          marginBottom: theme.spacing.lg,
        }}
      >
        {/* Current Crop Type */}
        <CommonInput
          label="Current Crop Type"
          placeholder="e.g., Wheat, Rice, Cotton"
          value={currentCropType}
          onChangeText={(text) => updateField('currentCropType', text)}
          error={errors?.currentCropType}
          rightIcon={<Tractor size={theme.iconSize.sm} color={theme.colors.gray500} />}
          containerStyle={{ marginBottom: theme.spacing.lg }}
          inputContainerStyle={{
            backgroundColor: theme.colors.white,
            borderRadius: theme.radius.lg,
            borderWidth: theme.borderWidth.thin,
            borderColor: theme.colors.gray200,
          }}
        />

        {/* Land Area ( Acres ) */}
        <CommonInput
          label="Land Area ( Acres )"
          placeholder="0.00"
          value={landArea}
          onChangeText={(text) => updateField('landArea', text)}
          keyboardType="decimal-pad"
          error={errors?.landArea}
          rightIcon={
            <View
              style={{
                backgroundColor: theme.colors.gray200,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
                borderRadius: theme.radius.sm,
              }}
            >
              <Text
                style={{
                  fontSize: theme.typography.caption,
                  fontFamily: theme.fonts.bold,
                  color: theme.colors.gray500,
                  letterSpacing: theme.letterSpacing.md,
                }}
              >
                ACRES
              </Text>
            </View>
          }
          containerStyle={{ marginBottom: theme.spacing.lg }}
          inputContainerStyle={{
            backgroundColor: theme.colors.white,
            borderRadius: theme.radius.lg,
            borderWidth: theme.borderWidth.thin,
            borderColor: theme.colors.gray200,
          }}
        />

        {/* Irrigation Source */}
        <CommonInput
          label="Irrigation Source"
          placeholder="Select irrigation type"
          value={irrigationSource}
          onChangeText={(text) => updateField('irrigationSource', text)}
          editable={false}
          onPress={() => {
            /* Open Irrigation Modal / Dropdown */
          }}
          error={errors?.irrigationSource}
          rightIcon={<ChevronDown size={theme.iconSize.sm} color={theme.colors.gray500} />}
          containerStyle={{ marginBottom: 0 }}
          inputContainerStyle={{
            backgroundColor: theme.colors.white,
            borderRadius: theme.radius.lg,
            borderWidth: theme.borderWidth.thin,
            borderColor: theme.colors.gray200,
          }}
        />
      </View>

      {/* Accurate Information Banner */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#FFFBEC',
          borderWidth: theme.borderWidth.thin,
          borderColor: '#FDBA74',
          borderRadius: theme.radius.lg,
          padding: theme.spacing.lg,
        }}
      >
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: theme.radius.sm,
            backgroundColor: theme.colors.primary900,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: theme.spacing.md,
          }}
        >
          <ShieldCheck size={theme.iconSize.sm} color={theme.colors.white} />
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: theme.typography.b1,
              fontFamily: theme.fonts.bold,
              color: '#652B07',
            }}
          >
            Accurate Information
          </Text>
          <Text
            style={{
              fontSize: theme.typography.b3,
              fontFamily: theme.fonts.medium,
              color: '#8A4315',
              marginTop: 4,
              lineHeight: theme.lineHeight.b2,
            }}
          >
            Providing precise details helps us calculate the best interest rates for your specific farming needs.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default LandDetails;