import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../../../../theme';
import CustomDropdown from '../../../../../components/common/Modal/CustomDropdown';
import CommonInput from '../../../../../components/common/Input/CommonInput';

const GOLD_TYPES = [
  'Jewellery / Ornaments',
  'Gold Coins',
  'Gold Bars',
];

const PURITY_OPTIONS = [
  '24 Carat (99.9%)',
  '22 Carat (91.6%)',
  '20 Carat (83.3%)',
  '18 Carat (75.0%)',
];

const GoldDetails = ({ formData, setFormData, errors, setErrors }) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Typing/Selecting par us field ka error clear ho jayega
    if (errors?.[field]) {
      setErrors?.((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
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
        Gold Details
      </Text>

      {/* ===== Gold Type Dropdown ===== */}
      <CustomDropdown
        label="Gold Type"
        required
        placeholder="Select Gold Type"
        options={GOLD_TYPES}
        selectedValue={formData?.goldType || ''}
        onSelect={(item) => handleChange('goldType', item)}
        error={errors?.goldType}
        inputContainerStyle={borderStyle}
      />

      {/* ===== Gold Weight Field ===== */}
      <CommonInput
        label="Gold Weight ( grams )"
        required
        placeholder="Enter weight in grams"
        value={formData?.goldWeight || ''}
        onChangeText={(val) => handleChange('goldWeight', val)}
        keyboardType="numeric"
        error={errors?.goldWeight}
        inputContainerStyle={borderStyle}
      />

      {/* ===== Purity Dropdown ===== */}
      <CustomDropdown
        label="Purity ( Carat )"
        required
        placeholder="Select purity"
        options={PURITY_OPTIONS}
        selectedValue={formData?.goldPurity || ''}
        onSelect={(item) => handleChange('goldPurity', item)}
        error={errors?.goldPurity}
        inputContainerStyle={borderStyle}
      />

      {/* ===== Ornament Description Field ===== */}
      <CommonInput
        label="Ornament Description"
        required
        placeholder="Describe the gold item ( e.g., 2 bangles , 1 necklece, 3 rings)"
        value={formData?.ornamentDescription || ''}
        onChangeText={(val) => handleChange('ornamentDescription', val)}
        multiline
        numberOfLines={3}
        error={errors?.ornamentDescription}
        inputContainerStyle={[
          borderStyle,
          { minHeight: 90, alignItems: 'flex-start', paddingTop: 12 },
        ]}
        inputStyle={{ minHeight: 70, textAlignVertical: 'top' }}
      />

      {/* ===== Important Notes Card ===== */}
      <View
        style={{
          backgroundColor: '#EFF6FF',
          borderWidth: 1,
          borderColor: '#BFDBFE',
          borderRadius: 16,
          padding: theme.spacing.lg,
          marginTop: theme.spacing.sm,
          marginBottom: theme.spacing.xl,
        }}
      >
        <Text
          style={{
            fontSize: theme.typography.b1,
            fontFamily: theme.fonts.bold,
            color: '#1E3A8A',
            marginBottom: theme.spacing.xs,
          }}
        >
          💡 Important Notes
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: theme.fonts.medium || theme.fonts.regular,
            color: '#1E40AF',
            lineHeight: 18,
          }}
        >
          • The gold will be evaluated by our certified appraiser. Final loan amount will be determined based on the actual purity and weight verification.
        </Text>
      </View>
    </View>
  );
};

export default GoldDetails;