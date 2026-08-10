import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CommonInput from '../../../../../components/common/Input/CommonInput';
import { theme } from '../../../../../theme';
import { Info } from 'lucide-react-native';

const EmploymentForm = ({ formData, setFormData, errors, setErrors }) => {
  const employerTypes = ['Private', 'Government', 'MNC', 'Public Sector'];

  const handleSelectEmployerType = (type) => {
    setFormData((prev) => ({ ...prev, employerType: type }));
    if (setErrors) {
      setErrors((prev) => ({ ...prev, employerType: '' }));
    }
  };

  return (
    <View style={{ paddingVertical: theme.spacing.sm }}>
      {/* ===== Company Name ===== */}
      <CommonInput
        label="Company Name"
        placeholder="e.g. Global Tech Solutions"
        value={formData?.companyName}
        onChangeText={(text) => {
          setFormData((prev) => ({ ...prev, companyName: text }));
          if (setErrors) setErrors((prev) => ({ ...prev, companyName: '' }));
        }}
        error={errors?.companyName}
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />

      {/* ===== Designation ===== */}
      <CommonInput
        label="Designation"
        placeholder="e.g. Senior Manager"
        value={formData?.designation}
        onChangeText={(text) => {
          setFormData((prev) => ({ ...prev, designation: text }));
          if (setErrors) setErrors((prev) => ({ ...prev, designation: '' }));
        }}
        error={errors?.designation}
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />

      {/* ===== Monthly Salary ===== */}
      <CommonInput
        label="Monthly Salary ( Net )"
        placeholder="e.g. 50,000"
        value={formData?.monthlySalary}
        onChangeText={(text) => {
          setFormData((prev) => ({ ...prev, monthlySalary: text }));
          if (setErrors) setErrors((prev) => ({ ...prev, monthlySalary: '' }));
        }}
        keyboardType="numeric"
        error={errors?.monthlySalary}
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />

      {/* ===== Years of Experience ===== */}
      <CommonInput
        label="Years of Experience"
        placeholder="Enter years"
        value={formData?.yearsExperience}
        onChangeText={(text) => {
          setFormData((prev) => ({ ...prev, yearsExperience: text }));
          if (setErrors) setErrors((prev) => ({ ...prev, yearsExperience: '' }));
        }}
        keyboardType="numeric"
        error={errors?.yearsExperience}
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />

      {/* ===== Employer Type Section ===== */}
      <View style={{ marginBottom: theme.spacing.xl }}>
        <Text
          style={{
            fontSize: theme.typography.b1,
            fontFamily: theme.fonts.medium,
            color: theme.colors.gray700,
            marginBottom: theme.spacing.sm,
          }}
        >
          Employer Type<Text style={{ color: theme.colors.error }}>*</Text>
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: theme.spacing.sm,
          }}
        >
          {employerTypes.map((type) => {
            const isSelected = formData?.employerType === type;
            return (
              <TouchableOpacity
                key={type}
                activeOpacity={0.8}
                onPress={() => handleSelectEmployerType(type)}
                style={{
                  height: 48,
                  paddingHorizontal: theme.spacing.xl,
                  borderRadius: theme.radius.md,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: theme.borderWidth.thin,
                  borderColor: isSelected ? theme.colors.primary500 : theme.colors.transparent,
                  backgroundColor: isSelected ? theme.colors.card : theme.colors.gray100,
                }}
              >
                <Text
                  style={{
                    fontSize: theme.typography.b2,
                    fontFamily: isSelected ? theme.fonts.bold : theme.fonts.medium,
                    color: isSelected ? theme.colors.text : theme.colors.gray700,
                  }}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {!!errors?.employerType && (
          <Text
            style={{
              color: theme.colors.error,
              fontSize: theme.typography.b3,
              marginTop: theme.spacing.xs,
              fontFamily: theme.fonts.medium,
            }}
          >
            {errors.employerType}
          </Text>
        )}
      </View>

      {/* ===== Info Banner Card ===== */}
      <View
        style={{
          backgroundColor: '#EFF6FF',
          borderRadius: theme.radius.lg,
          padding: theme.spacing.lg,
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: theme.spacing.md,
        }}
      >
        <Info size={22} color={theme.colors.info} style={{ marginTop: 2 }} />
        <Text
          style={{
            flex: 1,
            fontSize: theme.typography.b2,
            fontFamily: theme.fonts.regular,
            color: theme.colors.navy700,
            lineHeight: theme.lineHeight.b2,
          }}
        >
          Note: You will be required to upload proof of income (Salary slips/ITR) in the next step based on the selection above.
        </Text>
      </View>
    </View>
  );
};

export default EmploymentForm;