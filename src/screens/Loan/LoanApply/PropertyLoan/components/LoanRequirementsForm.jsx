// components/LoanRequirementsForm.jsx
import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IndianRupee } from 'lucide-react-native';
import CommonInput from '../../../../../components/common/Input/CommonInput';
import CommonSwitch from '../../../../../components/common/Button/CommonSwitch';
import { theme } from '../../../../../theme';
 
 
 
 
 
 

const LoanRequirementsForm = ({ formData, setFormData, errors, setErrors, productDetails }) => {
  // Loan Amount Options - Dynamic from productDetails
  const amountOptions = useMemo(() => {
    const min = productDetails?.minAmount || 25000;
    const max = productDetails?.maxAmount || 1000000;
    const step = Math.round((max - min) / 5 / 10000) * 10000;
    return [min, min + step, min + step * 2, min + step * 3, min + step * 4, max];
  }, [productDetails]);

  // Loan Tenure Options - Dynamic from productDetails
  const tenureOptions = useMemo(() => {
    const min = productDetails?.minTenure || 6;
    const max = productDetails?.maxTenure || 48;
    const step = Math.round((max - min) / 5 / 6) * 6;
    return Array.from({ length: 6 }, (_, i) => min + (step * i));
  }, [productDetails]);

  return (
    <View style={{ 
      paddingVertical: theme.spacing.sm 
    }}>
      
      {/* ===== Loan Amount Required ===== */}
      <Text style={{
        fontSize: theme.typography.b1,
        fontFamily: theme.fonts.headingBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
      }}>
        Loan Amount Required <Text style={{ color: theme.colors.error }}>*</Text>
      </Text>

      {/* Amount Options */}
      <View style={{ 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
      }}>
        {amountOptions.map((amount) => (
          <TouchableOpacity
            key={amount}
            activeOpacity={0.7}
            onPress={() => {
              setFormData(prev => ({...prev, loanAmount: amount}));
              setErrors(prev => ({...prev, loanAmount: ''}));
            }}
            style={{
              width: '31%',
              height: 54,
              borderRadius: theme.radius.md,
              borderWidth: theme.borderWidth.thin,
              borderColor: formData.loanAmount === amount 
                ? theme.colors.primary500 
                : theme.colors.gray300,
              backgroundColor: formData.loanAmount === amount 
                ? theme.colors.primary50 
                : theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing.xs,
            }}
          >
            <Text style={{
              fontSize: theme.typography.b2,
              fontFamily: theme.fonts.medium,
              color: formData.loanAmount === amount 
                ? theme.colors.primary500 
                : theme.colors.gray700,
            }}>
              ₹{amount.toLocaleString()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Custom Amount Input */}
      <CommonInput
        placeholder="Enter custom amount"
        keyboardType="numeric"
        value={String(formData.loanAmount || '')}
        onChangeText={(text) => {
          setFormData(prev => ({...prev, loanAmount: text}));
          setErrors(prev => ({...prev, loanAmount: ''}));
        }}
        leftIcon={<IndianRupee size={18} color={theme.colors.gray500} />}
        error={errors.loanAmount}
        containerStyle={{ marginBottom: theme.spacing.lg }}
        inputContainerStyle={{ 
          borderWidth: 1, 
          borderColor: errors.loanAmount ? theme.colors.error : theme.colors.gray300 
        }}
      />

      {/* ===== Loan Tenure ===== */}
      <Text style={{
        fontSize: theme.typography.b1,
        fontFamily: theme.fonts.headingBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
        marginTop: theme.spacing.sm,
      }}>
        Loan Tenure <Text style={{ color: theme.colors.error }}>*</Text>
      </Text>

      {/* Tenure Options */}
      <View style={{ 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        gap: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
      }}>
        {tenureOptions.map((tenure) => (
          <TouchableOpacity
            key={tenure}
            activeOpacity={0.7}
            onPress={() => {
              setFormData(prev => ({...prev, loanTenure: tenure}));
              setErrors(prev => ({...prev, loanTenure: ''}));
            }}
            style={{
              width: '31%',
              height: 54,
              borderRadius: theme.radius.md,
              borderWidth: theme.borderWidth.thin,
              borderColor: formData.loanTenure === tenure 
                ? theme.colors.primary500 
                : theme.colors.gray300,
              backgroundColor: formData.loanTenure === tenure 
                ? theme.colors.primary50 
                : theme.colors.white,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: theme.spacing.xs,
            }}
          >
            <Text style={{
              fontSize: theme.typography.b2,
              fontFamily: theme.fonts.medium,
              color: formData.loanTenure === tenure 
                ? theme.colors.primary500 
                : theme.colors.gray700,
            }}>
              {tenure} months
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {errors.loanTenure && (
        <Text style={{
          color: theme.colors.error,
          fontSize: theme.typography.b3,
          marginBottom: theme.spacing.sm,
          fontFamily: theme.fonts.medium,
        }}>
          {errors.loanTenure}
        </Text>
      )}

      {/* ===== Loan Purpose ===== */}
      <CommonInput
        label="Loan Purpose"
        placeholder="Briefly describe why you need this loan"
        value={formData.loanPurpose}
        onChangeText={(text) => {
          setFormData(prev => ({...prev, loanPurpose: text}));
          setErrors(prev => ({...prev, loanPurpose: ''}));
        }}
        multiline
        numberOfLines={5}
        error={errors.loanPurpose}
        containerStyle={{ marginBottom: theme.spacing.lg }}
        inputContainerStyle={{
          minHeight: 120,
          alignItems: 'flex-start',
          paddingTop: 14,
          borderWidth: 1,
          borderColor: errors.loanPurpose ? theme.colors.error : theme.colors.gray300,
        }}
        inputStyle={{
          minHeight: 100,
          textAlignVertical: 'top',
          paddingVertical: 0,
        }}
      />

      {/* ===== Preferred EMI ===== */}
      <CommonInput
        label="Preferred EMI"
        placeholder="Enter custom amount"
        keyboardType="numeric"
        value={String(formData.preferredEMI || '')}
        onChangeText={(text) => {
          setFormData(prev => ({...prev, preferredEMI: text}));
        }}
        leftIcon={<IndianRupee size={18} color={theme.colors.gray500} />}
        containerStyle={{ marginBottom: theme.spacing.lg }}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: theme.colors.gray300,
        }}
      />

      {/* ===== Existing Loan Against Property ===== */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.md,
        borderTopWidth: 1,
        borderTopColor: theme.colors.gray200,
        marginTop: theme.spacing.sm,
        marginBottom: theme.spacing.sm,
      }}>
        <View style={{ flex: 1, marginRight: theme.spacing.md }}>
          <Text style={{
            fontSize: theme.typography.b1,
            fontFamily: theme.fonts.headingBold,
            color: theme.colors.text,
          }}>
            Existing Loan Against Property?
          </Text>
          <Text style={{
            fontSize: theme.typography.b3,
            fontFamily: theme.fonts.regular,
            color: theme.colors.gray500,
            marginTop: theme.spacing.xs,
          }}>
            Have you already secured a loan with collateral?
          </Text>
        </View>
        <CommonSwitch
          value={formData.existingLoan || false}
          onValueChange={(value) => {
            setFormData(prev => ({...prev, existingLoan: value}));
          }}
        />
      </View>

      {/* ===== Bottom Note ===== */}
      <View style={{
        padding: theme.spacing.md,
        backgroundColor: theme.colors.primary50,
        borderRadius: theme.radius.md,
        marginTop: theme.spacing.sm,
      }}>
        <Text style={{
          fontSize: theme.typography.b3,
          color: theme.colors.gray700,
          fontFamily: theme.fonts.regular,
        }}>
          Choosing a longer tenure can reduce your monthly EMIs but might increase the total interest payable.
        </Text>
      </View>
    </View>
  );
};

export default LoanRequirementsForm;