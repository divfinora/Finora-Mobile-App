import React from 'react';
import { View, Text } from 'react-native';
 ;
import CommonInput from '../../../../components/common/Input/CommonInput';
import CustomDropdown from '../../../../components/common/Modal/CustomDropdown'; // Adjust import path if needed
import { theme } from '../../../../theme';

const EMPLOYMENT_TYPES = [
  'Salaried',
  'Self-Employed / Business',
  'Professional',
  'Student',
  'Retired / Other',
];

const CommonEmploymentAndIncome = ({ formData, setFormData, errors }) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const borderStyle = {
    borderWidth: 0.3,
    borderColor: '#48484a58',
  };

  return (
    <View style={{ paddingTop: theme.spacing.md }}>
      {/* ===== Title ===== */}
      <Text
        style={{
          fontSize: theme.typography.h3,
          fontFamily: theme.fonts.headingBold || theme.fonts.bold,
          color: theme.colors.text,
          marginBottom: theme.spacing.lg,
        }}
      >
        Employment & Income
      </Text>

      {/* ===== Employment Type Dropdown Field ===== */}
      <CustomDropdown
        label="Employment Type"
        required
        placeholder="Select emplyment Type"
        options={EMPLOYMENT_TYPES}
        selectedValue={formData?.employmentType || ''}
        onSelect={(item) => handleChange('employmentType', item)}
        error={errors?.employmentType}
        inputContainerStyle={borderStyle}
      />

      {/* ===== Monthly Income Field ===== */}
      <CommonInput
        label="Monthly Income (₹)"
        placeholder="Enter monthly Income"
        value={formData?.monthlyIncome || ''}
        onChangeText={(val) => handleChange('monthlyIncome', val)}
        keyboardType="numeric"
        error={errors?.monthlyIncome}
        inputContainerStyle={borderStyle}
      />

      {/* ===== Existing EMI Field ===== */}
      <CommonInput
        label="Existing EMI"
        required
        placeholder="Enter Existing EMI ammount"
        value={formData?.existingEmi || ''}
        onChangeText={(val) => handleChange('existingEmi', val)}
        keyboardType="numeric"
        error={errors?.existingEmi}
        inputContainerStyle={borderStyle}
      />

      {/* ===== Occupation Details Field ===== */}
      <CommonInput
        label="Occupation Details"
        required
        placeholder="e.g., Software engineer, Shop-owner"
        value={formData?.occupationDetails || ''}
        onChangeText={(val) => handleChange('occupationDetails', val)}
        error={errors?.occupationDetails}
        inputContainerStyle={borderStyle}
      />
    </View>
  );
};

export default CommonEmploymentAndIncome;

 

 