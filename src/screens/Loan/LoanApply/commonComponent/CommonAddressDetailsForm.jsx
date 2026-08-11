import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../../../theme/index.js';

 
 
 
import { MapPin } from 'lucide-react-native';
import CommonInput from '../../../../components/common/Input/CommonInput.jsx';
import CustomDropdown from '../../../../components/common/Modal/CustomDropdown';
import CommonSwitch from '../../../../components/common/Button/CommonSwitch';

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Delhi',
  'Gujarat',
  'Karnataka',
  'Maharashtra',
  'Punjab',
  'Rajasthan',
  'Tamil Nadu',
  'Telangana',
  'Uttar Pradesh',
  'West Bengal',
];

const CommonAddressDetailsForm = ({ formData, setFormData, errors, setErrors }) => {
  const [isSameAsCurrent, setIsSameAsCurrent] = useState(
    formData?.isSameAsCurrent || false
  );

  // Sync Current Address to Permanent Address when Switch is turned ON
  const handleSameAddressToggle = (value) => {
    setIsSameAsCurrent(value);
    setFormData((prev) => {
      const updated = { ...prev, isSameAsCurrent: value };
      if (value) {
        updated.permAddressLine1 = prev.currAddressLine1 || '';
        updated.permAddressLine2 = prev.currAddressLine2 || '';
        updated.permCity = prev.currCity || '';
        updated.permPincode = prev.currPincode || '';
        updated.permState = prev.currState || '';
      }
      return updated;
    });
  };

  // Live typing sync when toggle is ON
  const handleCurrentAddressChange = (field, text) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: text };
      if (isSameAsCurrent) {
        if (field === 'currAddressLine1') updated.permAddressLine1 = text;
        if (field === 'currAddressLine2') updated.permAddressLine2 = text;
        if (field === 'currCity') updated.permCity = text;
        if (field === 'currPincode') updated.permPincode = text;
        if (field === 'currState') updated.permState = text;
      }
      return updated;
    });
    if (setErrors) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  // Reusable Theme Styles
  const cardStyle = {
    backgroundColor: theme.colors.white,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.card,
  };

  const inputContainerStyle = {
    backgroundColor: theme.colors.gray100 || '#F3F4F6',
    borderRadius: theme.radius.md,
    borderWidth: 0,
  };

  return (
    <View style={{ paddingVertical: theme.spacing.sm }}>
      {/* ===== CARD 1: Current Address ===== */}
      <View style={cardStyle}>
        {/* Card Header Indicator */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing.lg,
          }}
        >
          <View
            style={{
              width: 4,
              height: 18,
              backgroundColor: theme.colors.primary500,
              borderRadius: theme.radius.sm,
              marginRight: theme.spacing.sm,
            }}
          />
          <Text
            style={{
              fontSize: theme.typography.h4,
              fontFamily: theme.fonts.bold,
              color: theme.colors.text,
            }}
          >
            Current Address
          </Text>
        </View>

        <CommonInput
          label="Address Line 1"
          placeholder="House/Flat No., Building Name"
          value={formData?.currAddressLine1 || ''}
          onChangeText={(text) => handleCurrentAddressChange('currAddressLine1', text)}
          error={errors?.currAddressLine1}
          inputContainerStyle={inputContainerStyle}
        />

        <CommonInput
          label="Address Line 2"
          placeholder="Street, Area, Locality"
          value={formData?.currAddressLine2 || ''}
          onChangeText={(text) => handleCurrentAddressChange('currAddressLine2', text)}
          error={errors?.currAddressLine2}
          inputContainerStyle={inputContainerStyle}
        />

        <CommonInput
          label="City"
          placeholder="Enter City"
          value={formData?.currCity || ''}
          onChangeText={(text) => handleCurrentAddressChange('currCity', text)}
          error={errors?.currCity}
          inputContainerStyle={inputContainerStyle}
        />

        <CommonInput
          label="PIN Code"
          placeholder="6-digit code"
          value={formData?.currPincode || ''}
          onChangeText={(text) => handleCurrentAddressChange('currPincode', text)}
          keyboardType="numeric"
          maxLength={6}
          error={errors?.currPincode}
          inputContainerStyle={inputContainerStyle}
        />

        <CustomDropdown
          label="State"
          placeholder="Select State"
          options={INDIAN_STATES}
          selectedValue={formData?.currState || ''}
          onSelect={(item) => handleCurrentAddressChange('currState', item)}
          error={errors?.currState}
          inputContainerStyle={inputContainerStyle}
        />
      </View>

      {/* ===== CARD 2: Permanent Address ===== */}
      <View style={cardStyle}>
        {/* Card Header Indicator */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: theme.spacing.md,
          }}
        >
          <View
            style={{
              width: 4,
              height: 18,
              backgroundColor: theme.colors.primary500,
              borderRadius: theme.radius.sm,
              marginRight: theme.spacing.sm,
            }}
          />
          <Text
            style={{
              fontSize: theme.typography.h4,
              fontFamily: theme.fonts.bold,
              color: theme.colors.text,
            }}
          >
            Permanent Address
          </Text>
        </View>

        {/* Soft Blue Switch Banner */}
 <View
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F8FF',
    borderWidth: theme.borderWidth.thin || 1,
    borderColor: '#D0E2FF',
    borderRadius: theme.radius.lg || 16,
    paddingVertical: theme.spacing.md || 12,
    paddingHorizontal: theme.spacing.lg || 16,
    marginBottom: theme.spacing.lg || 20,
    gap: theme.spacing.md || 12,
  }}
>
  <CommonSwitch
    value={isSameAsCurrent}
    onValueChange={handleSameAddressToggle}
  />
  <Text
    style={{
      fontSize: theme.typography.b3 || 14,
      fontFamily: theme.fonts.medium,
      color: '#8EBAE5',
      flex: 1,
    }}
  >
    Same as Current Address
  </Text>
</View>

        <CommonInput
          label="Address Line 1"
          placeholder="House/Flat No., Building Name"
          value={formData?.permAddressLine1 || ''}
          editable={!isSameAsCurrent}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, permAddressLine1: text }));
            if (setErrors) setErrors((prev) => ({ ...prev, permAddressLine1: '' }));
          }}
          error={errors?.permAddressLine1}
          inputContainerStyle={inputContainerStyle}
        />

        <CommonInput
          label="Address Line 2"
          placeholder="Street, Area, Locality"
          value={formData?.permAddressLine2 || ''}
          editable={!isSameAsCurrent}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, permAddressLine2: text }));
            if (setErrors) setErrors((prev) => ({ ...prev, permAddressLine2: '' }));
          }}
          error={errors?.permAddressLine2}
          inputContainerStyle={inputContainerStyle}
        />

        <CommonInput
          label="City"
          placeholder="Enter City"
          value={formData?.permCity || ''}
          editable={!isSameAsCurrent}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, permCity: text }));
            if (setErrors) setErrors((prev) => ({ ...prev, permCity: '' }));
          }}
          error={errors?.permCity}
          inputContainerStyle={inputContainerStyle}
        />

        <CommonInput
          label="PIN Code"
          placeholder="6-digit code"
          value={formData?.permPincode || ''}
          editable={!isSameAsCurrent}
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, permPincode: text }));
            if (setErrors) setErrors((prev) => ({ ...prev, permPincode: '' }));
          }}
          keyboardType="numeric"
          maxLength={6}
          error={errors?.permPincode}
          inputContainerStyle={inputContainerStyle}
        />

        <CustomDropdown
          label="State"
          placeholder="Select State"
          options={INDIAN_STATES}
          selectedValue={formData?.permState || ''}
          disabled={isSameAsCurrent}
          onSelect={(item) => {
            setFormData((prev) => ({ ...prev, permState: item }));
            if (setErrors) setErrors((prev) => ({ ...prev, permState: '' }));
          }}
          error={errors?.permState}
          inputContainerStyle={inputContainerStyle}
        />
      </View>

      {/* ===== BOTTOM LOCATION PIN ICON & TEXT ===== */}
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: theme.spacing.md,
          marginBottom: theme.spacing.xl,
          paddingHorizontal: theme.spacing.xl,
        }}
      >
        <View
          style={{
            width: 90,
            height: 90,
            borderRadius: theme.radius.circle,
            backgroundColor: theme.colors.primary100 || '#FAF5EF',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: theme.spacing.md,
          }}
        >
          <MapPin
            size={theme.iconSize.xl || 38}
            color={theme.colors.primary500}
            strokeWidth={1.8}
          />
        </View>

        <Text
          style={{
            fontSize: theme.typography.b3,
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.regular,
            textAlign: 'center',
            lineHeight: theme.lineHeight?.b3 || 18,
          }}
        >
          Ensure your address matches your official identity documents.
        </Text>
      </View>
    </View>
  );
};

export default CommonAddressDetailsForm;