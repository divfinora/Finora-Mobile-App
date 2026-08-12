import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../../../../theme';
import CommonInput from '../../../../../components/common/Input/CommonInput';

const INTEREST_TYPES = [
  {
    id: 'fixed',
    title: 'Fixed Interest',
    description: 'Interest rate remains constant',
  },
  {
    id: 'reducing',
    title: 'Reducing Balance',
    description: 'Interest calculated on outstanding',
  },
];

const REPAYMENT_METHODS = [
  {
    id: 'monthly_emi',
    title: 'Monthly EMI',
    description: 'Regular monthly payments',
  },
  {
    id: 'bullet',
    title: 'Bullet Repayments',
    description: 'Pay principal at maturity with monthly interest',
  },
  {
    id: 'interest_only',
    title: 'Interest Only',
    description: 'Monthly interest + principal at end',
  },
];

const LoanRequirement = ({ formData, setFormData, errors, setErrors }) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Typing ya Selection karte hi us field ka error clear ho jayega
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
        Loan Requirements
      </Text>

      {/* ===== Loan Amount Field ===== */}
      <CommonInput
        label="Loan Amounts (₹)"
        required
        placeholder="Enter loan amount"
        value={formData?.loanAmount || ''}
        onChangeText={(val) => handleChange('loanAmount', val)}
        keyboardType="numeric"
        error={errors?.loanAmount}
        inputContainerStyle={borderStyle}
      />

      {/* ===== Interest Type Section ===== */}
      <View style={{ marginBottom: theme.spacing.lg }}>
        <Text
          style={{
            fontSize: theme.typography.b1,
            fontFamily: theme.fonts.medium,
            color: theme.colors.gray700,
            marginBottom: theme.spacing.sm,
          }}
        >
          Interest Type <Text style={{ color: theme.colors.error }}>*</Text>
        </Text>

        {INTEREST_TYPES.map((item) => {
          const isSelected = formData?.interestType === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => handleChange('interestType', item.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderWidth: isSelected ? 1.5 : 0.3,
                borderColor: isSelected ? theme.colors.primary500 : '#48484a58',
                borderRadius: 16,
                padding: 16,
                marginBottom: theme.spacing.sm,
              }}
            >
              {/* Checkbox Icon Box */}
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  borderWidth: isSelected ? 0 : 1.5,
                  borderColor: '#94A3B8',
                  backgroundColor: isSelected ? theme.colors.primary500 : 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 14,
                }}
              >
                {isSelected && (
                  <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>
                    ✓
                  </Text>
                )}
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: theme.fonts.bold,
                    color: theme.colors.text,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: theme.fonts.regular,
                    color: '#64748B',
                    marginTop: 2,
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        {errors?.interestType && (
          <Text style={{ color: theme.colors.error, fontSize: 12, marginTop: 4 }}>
            {errors.interestType}
          </Text>
        )}
      </View>

      {/* ===== Repayment Method Section ===== */}
      <View style={{ marginBottom: theme.spacing.lg }}>
        <Text
          style={{
            fontSize: theme.typography.b1,
            fontFamily: theme.fonts.medium,
            color: theme.colors.gray700,
            marginBottom: theme.spacing.sm,
          }}
        >
          Repayment Method <Text style={{ color: theme.colors.error }}>*</Text>
        </Text>

        {REPAYMENT_METHODS.map((item) => {
          const isSelected = formData?.repaymentMethod === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => handleChange('repaymentMethod', item.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
                borderWidth: isSelected ? 1.5 : 0.3,
                borderColor: isSelected ? theme.colors.primary500 : '#48484a58',
                borderRadius: 16,
                padding: 16,
                marginBottom: theme.spacing.sm,
              }}
            >
              {/* Checkbox Icon Box */}
              <View
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  borderWidth: isSelected ? 0 : 1.5,
                  borderColor: '#94A3B8',
                  backgroundColor: isSelected ? theme.colors.primary500 : 'transparent',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 14,
                }}
              >
                {isSelected && (
                  <Text style={{ color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' }}>
                    ✓
                  </Text>
                )}
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: theme.fonts.bold,
                    color: theme.colors.text,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    fontFamily: theme.fonts.regular,
                    color: '#64748B',
                    marginTop: 2,
                  }}
                >
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        {errors?.repaymentMethod && (
          <Text style={{ color: theme.colors.error, fontSize: 12, marginTop: 4 }}>
            {errors.repaymentMethod}
          </Text>
        )}
      </View>

      {/* ===== Interest Rate Card ===== */}
      <View
        style={{
          backgroundColor: '#EFF6FF',
          borderWidth: 1,
          borderColor: '#BFDBFE',
          borderRadius: 16,
          padding: theme.spacing.lg,
          marginTop: theme.spacing.xs,
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
          📈 Interest Rate
        </Text>
        <Text
          style={{
            fontSize: 13,
            fontFamily: theme.fonts.medium || theme.fonts.regular,
            color: '#1E40AF',
            lineHeight: 18,
          }}
        >
          • Our competitive interest rates start from 0.75% per month. Final rate depends on loan amount, tenure, and your profile.
        </Text>
      </View>
    </View>
  );
};

export default LoanRequirement;