import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../../../theme/index.js';
import CommonInput from '../../../../components/common/Input/CommonInput.jsx';
import SquareChip from '../../../../components/common/Input/SquareChip.jsx';
 

 

const AMOUNT_ROWS = [
  ['₹25,000', '₹50,000', '₹1,00,000'],
  ['₹2,00,000', '₹5,00,000', '₹10,00,000'],
];

const TENURE_ROWS = [
  ['6 months', '12 months', '18 months'],
  ['24 months', '36 months', '48 months'],
];

const CommonLoanRequirement = ({ formData, setFormData, errors, setErrors }) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (setErrors) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleAmountSelect = (amount) => {
    handleChange('loanAmount', amount);
    handleChange('customLoanAmount', '');
  };

  const inputContainerStyle = {
    backgroundColor: theme.colors?.gray100 || '#F3F4F6',
    borderRadius: theme.radius?.md || 12,
    borderWidth: 0.3,
    borderColor: '#48484a58',
  };

  const labelStyle = {
    fontSize: theme.typography.b2,
fontFamily: theme.fonts.semiBold,
  color: theme.colors.gray700,
    marginBottom: theme.spacing?.sm || 8,
  };
        
   

  const requiredAsterisk = {
    color: theme.colors?.error || '#EF4444',
  };

  return (
    <View style={{ paddingVertical: theme.spacing?.sm || 8 }}>
      {/* ===== LOAN AMOUNT SECTION ===== */}
      <View style={{ marginBottom: theme.spacing?.lg || 20 }}>
        <Text style={labelStyle}>
          Loan Amount Required <Text style={requiredAsterisk}>*</Text>
        </Text>

        {AMOUNT_ROWS.map((row, rowIndex) => (
          <View
            key={`amount-row-${rowIndex}`}
            style={{
              flexDirection: 'row',
              gap: 10,
              marginBottom: 10,
            }}
          >
            {row.map((amount) => {
              const isSelected = formData?.loanAmount === amount;
              return (
                <SquareChip
                  key={amount}
                  title={amount}
                  selected={isSelected}
                  onPress={() => handleAmountSelect(amount)}
                  style={{
                    height: 48,
                    borderRadius: theme.radius?.md || 12,
                    backgroundColor: isSelected
                      ? theme.colors?.primary50 || '#EFF6FF'
                      : theme.colors?.gray50 || '#F8FAFC',
                    borderColor: isSelected
                      ? theme.colors?.primary500 || '#3B82F6'
                      : '#E2E8F0',
                  }}
                />
              );
            })}
          </View>
        ))}

        <CommonInput
          placeholder="₹  Enter custom amount"
          value={formData?.customLoanAmount || ''}
          onChangeText={(text) => {
            handleChange('customLoanAmount', text);
            handleChange('loanAmount', '');
          }}
          keyboardType="numeric"
          error={errors?.loanAmount || errors?.customLoanAmount}
          inputContainerStyle={inputContainerStyle}
        />
      </View>

      {/* ===== LOAN TENURE SECTION ===== */}
      <View style={{ marginBottom: theme.spacing?.lg || 20 }}>
        <Text style={labelStyle}>
          Loan Tenure <Text style={requiredAsterisk}>*</Text>
        </Text>

        {TENURE_ROWS.map((row, rowIndex) => (
          <View
            key={`tenure-row-${rowIndex}`}
            style={{
              flexDirection: 'row',
              gap: 10,
              marginBottom: 10,
            }}
          >
            {row.map((tenure) => {
              const isSelected = formData?.loanTenure === tenure;
              return (
                <SquareChip
                  key={tenure}
                  title={tenure}
                  selected={isSelected}
                  onPress={() => handleChange('loanTenure', tenure)}
                  style={{
                    height: 48,
                    borderRadius: theme.radius?.md || 12,
                    backgroundColor: isSelected
                      ? theme.colors?.primary50 || '#EFF6FF'
                      : theme.colors?.gray50 || '#F8FAFC',
                    borderColor: isSelected
                      ? theme.colors?.primary500 || '#3B82F6'
                      : '#E2E8F0',
                  }}
                />
              );
            })}
          </View>
        ))}
        {errors?.loanTenure && (
          <Text
            style={{
              color: theme.colors?.error || '#EF4444',
              fontSize: 12,
              marginTop: 4,
            }}
          >
            {errors.loanTenure}
          </Text>
        )}
      </View>

      {/* ===== LOAN PURPOSE ===== */}
      <CommonInput
        label="Loan Purpose *"
        placeholder="Enter Loan Purpose"
        value={formData?.loanPurpose || ''}
        onChangeText={(text) => handleChange('loanPurpose', text)}
        error={errors?.loanPurpose}
        inputContainerStyle={inputContainerStyle}
      />

      {/* ===== PREFERRED EMI ===== */}
      <CommonInput
        label="Preferred EMI *"
        placeholder="₹  Enter custom amount"
        value={formData?.preferredEmi || ''}
        onChangeText={(text) => handleChange('preferredEmi', text)}
        keyboardType="numeric"
        error={errors?.preferredEmi}
        inputContainerStyle={inputContainerStyle}
      />
    </View>
  );
};

export default CommonLoanRequirement;

 