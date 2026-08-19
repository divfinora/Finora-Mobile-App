// components/FarmerDetails.jsx
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Tractor, CheckCircle2, Circle, ShieldCheck } from 'lucide-react-native';

// Common Components & Theme
import CommonInput from '../../../../../components/common/Input/CommonInput';
import { theme } from '../../../../../theme/index.js';

const FarmerDetails = ({ formData = {}, setFormData, errors = {}, setErrors }) => {
  
    useEffect(() => {
    if (
      formData?.hasExistingLoans === undefined ||
      formData?.hasExistingLoans === null
    ) {
      setFormData?.((prev) => ({
        ...prev,
        hasExistingLoans: false,
      }));
    }
  }, []);
  
  // Form values with fallbacks
  const farmerType = formData?.farmerType || '';
  const annualIncome = formData?.annualIncome || '';
  const farmingExperience = formData?.farmingExperience || '';
  const hasExistingLoans = formData?.hasExistingLoans ?? false;

  const updateField = (field, value) => {
    setFormData?.((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field] && setErrors) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const farmerTypeOptions = [
    {
      id: 'Small Farmer',
      title: 'Small Farmer',
      subtitle: 'Land size less than 2 hectares',
    },
    {
      id: 'Marginal Farmer',
      title: 'Marginal Farmer',
      subtitle: 'Land size up to 1 hectares',
    },
    {
      id: 'Commercial Farmer',
      title: 'Commercial Farmer',
      subtitle: 'Land size less than 2 hectares',
    },
  ];

  return (
    <View style={{ marginTop: theme.spacing.md, marginBottom: theme.spacing.xl }}>
      {/* Farmer Type Options */}
      <View style={{ marginBottom: theme.spacing.lg }}>
        <Text
          style={{
            fontSize: theme.typography.b2,
            fontFamily: theme.fonts.medium,
            color: theme.colors.gray700,
            marginBottom: theme.spacing.sm,
          }}
        >
          Farmer Type
        </Text>

        {farmerTypeOptions.map((option) => {
          const isSelected = farmerType === option.id;
          return (
            <TouchableOpacity
              key={option.id}
              activeOpacity={0.8}
              onPress={() => updateField('farmerType', option.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: theme.spacing.lg,
                borderRadius: theme.radius.lg,
                borderWidth: isSelected ? theme.borderWidth.thin : theme.borderWidth.thin,
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
                <Tractor size={theme.iconSize.sm} color={theme.colors.gray500} />
              </View>

              {/* Text Group */}
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

              {/* Radio Indicator */}
              {isSelected ? (
                <CheckCircle2 size={22} color={theme.colors.primary500} />
              ) : (
                <Circle size={22} color={theme.colors.gray300} />
              )}
            </TouchableOpacity>
          );
        })}

        {errors?.farmerType && (
          <Text
            style={{
              marginTop: theme.spacing.xs,
              fontSize: theme.typography.b3,
              color: theme.colors.error,
              fontFamily: theme.fonts.regular,
            }}
          >
            {errors.farmerType}
          </Text>
        )}
      </View>

      {/* Annual Income */}
      <View style={{ marginBottom: theme.spacing.lg }}>
        <CommonInput
          label="Annual Income*"
          placeholder="75,000"
          value={annualIncome}
          onChangeText={(text) => updateField('annualIncome', text)}
          keyboardType="numeric"
          error={errors?.annualIncome}
          required={true}
          leftIcon={
            <Text
              style={{
                fontSize: theme.typography.h4,
                fontFamily: theme.fonts.medium,
                color: theme.colors.gray500,
                marginRight: theme.spacing.xs,
              }}
            >
              ₹
            </Text>
          }
          containerStyle={{ marginBottom: 4 }}
          inputContainerStyle={{
            backgroundColor: theme.colors.gray100,
            borderWidth: theme.borderWidth.thin,
            borderColor: theme.colors.gray300,
            borderRadius: theme.radius.lg,
          }}
        />
        <Text
          style={{
            fontSize: theme.typography.caption,
            fontFamily: theme.fonts.medium,
            color: theme.colors.gray500,
            marginTop: 4,
            marginLeft: 2,
          }}
        >
          Enter your gross annual earnings
        </Text>
      </View>

      {/* Farming Experience */}
      <View style={{ marginBottom: theme.spacing.lg }}>
        <CommonInput
          label="Farming Experience ( Years )*"
          placeholder="e.g. - 5 years"
          value={farmingExperience}
          onChangeText={(text) => updateField('farmingExperience', text)}
          keyboardType="numeric"
          error={errors?.farmingExperience}
          required={true}
          containerStyle={{ marginBottom: 0 }}
          inputContainerStyle={{
            backgroundColor: theme.colors.gray100,
            borderWidth: theme.borderWidth.thin,
            borderColor: theme.colors.gray300,
            borderRadius: theme.radius.lg,
          }}
        />
      </View>

      {/* Existing Loans Segment Switch */}
      <View style={{ marginBottom: theme.spacing.lg }}>
        <Text
          style={{
            fontSize: theme.typography.b2,
            fontFamily: theme.fonts.medium,
            color: theme.colors.gray700,
            marginBottom: theme.spacing.sm,
          }}
        >
          Do you have any existing loans?
        </Text>

        <View
          style={{
            flexDirection: 'row',
            backgroundColor: theme.colors.gray200,
            borderRadius: theme.radius.lg,
            padding: 4,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => updateField('hasExistingLoans', false)}
            style={{
              flex: 1,
              paddingVertical: theme.spacing.md,
              alignItems: 'center',
              borderRadius: theme.radius.md,
              backgroundColor: !hasExistingLoans ? theme.colors.white : theme.colors.transparent,
              ...( !hasExistingLoans && theme.shadows.sm ),
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.b2,
                fontFamily: theme.fonts.medium,
                color: !hasExistingLoans ? theme.colors.black : theme.colors.gray500,
              }}
            >
              No, I don't
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => updateField('hasExistingLoans', true)}
            style={{
              flex: 1,
              paddingVertical: theme.spacing.md,
              alignItems: 'center',
              borderRadius: theme.radius.md,
              backgroundColor: hasExistingLoans ? theme.colors.white : theme.colors.transparent,
              ...( hasExistingLoans && theme.shadows.sm ),
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.b2,
                fontFamily: theme.fonts.medium,
                color: hasExistingLoans ? theme.colors.black : theme.colors.gray500,
              }}
            >
              Yes, I do
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Accurate Information Banner */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#FFF8F1',
          borderWidth: theme.borderWidth.thin,
          borderColor: '#FFFBEC',
          borderRadius: theme.radius.lg,
          padding: theme.spacing.lg,
          marginTop: theme.spacing.sm,
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

export default FarmerDetails;