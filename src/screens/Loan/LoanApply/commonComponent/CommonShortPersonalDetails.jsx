import React from 'react';
import { View, Text } from 'react-native';
import CommonInput from '../../../../components/common/Input/CommonInput.jsx';
import { theme } from '../../../../theme/index.js';

const CommonShortPersonalDetails = ({ formData, setFormData, errors, setErrors }) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Typing start karte hi us particular field ka error remove ho jayega
    if (errors?.[field]) {
      setErrors?.((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const inputContainerStyle = {
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
        Personal Details
      </Text>

      {/* ===== Full Name Field ===== */}
      <CommonInput
        label="Full Name"
        required
        placeholder="As per PAN card"
        value={formData?.fullName || ''}
        onChangeText={(val) => handleChange('fullName', val)}
        error={errors?.fullName}
        inputContainerStyle={inputContainerStyle}
      />

      {/* ===== Mobile Number Field ===== */}
      <CommonInput
        label="Mob. No."
        required
        placeholder="Enter Your Phone No."
        value={formData?.mobileNumber || ''}
        onChangeText={(val) => handleChange('mobileNumber', val)}
        keyboardType="phone-pad"
        maxLength={10}
        error={errors?.mobileNumber}
        inputContainerStyle={inputContainerStyle}
      />

      {/* ===== Email ID Field ===== */}
      <CommonInput
        label="Email ID"
        required
        placeholder="Enter Your Email Address"
        value={formData?.email || ''}
        onChangeText={(val) => handleChange('email', val)}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors?.email}
        inputContainerStyle={inputContainerStyle}
      />

      {/* ===== Aadhar Number Field ===== */}
      <CommonInput
        label="Aadhar Number"
        required
        placeholder="XXXX XXXX XXXX"
        value={formData?.aadharNumber || ''}
        onChangeText={(val) => handleChange('aadharNumber', val)}
        keyboardType="numeric"
        maxLength={12}
        error={errors?.aadharNumber}
        inputContainerStyle={inputContainerStyle}
      />
    </View>
  );
};

export default CommonShortPersonalDetails;