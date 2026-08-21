import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../../../../theme';
import { CheckCircle2 } from 'lucide-react-native';

const IncomeDetails = ({ formData, setFormData, errors, setErrors }) => {
  // Current selected employment type (defaults to 'salaried')
  const selectedType = formData?.incomeDetails?.employmentType || '';

  // Income type options data mapping
  const employmentOptions = [
    {
      id: 'salaried',
      title: 'Salaried',
      subtitles: ['Monthly Salary', 'Company Employee'],
      emoji: '👨‍💼',
      bgColor: '#FFEEDD', // Light peach circle background for avatar
    },
    {
      id: 'self_employed',
      title: 'Self Employed',
      subtitles: ['Business Owner', 'Freelancer / Professional'],
      emoji: '🏢',
      bgColor: '#EBF3FF', // Light blue box background for icon
    },
  ];

  // Selection Handler
  const handleSelect = (id) => {
    setFormData((prev) => ({
      ...prev,
      incomeDetails: {
        ...prev?.incomeDetails,
        employmentType: id,
      },
    }));

    if (errors?.employmentType && setErrors) {
      setErrors((prev) => ({ ...prev, employmentType: '' }));
    }
  };

  return (
    <View style={{ paddingVertical: theme.spacing.sm }}>
      {/* ===== Question Title ===== */}
      <Text
        style={{
          fontSize: theme.typography.h4,
          fontFamily: theme.fonts.headingBold || theme.fonts.bold,
          color: theme.colors.text,
          marginBottom: theme.spacing.lg,
        }}
      >
        What best describes you?
      </Text>

      {/* ===== Employment Option Cards Loop ===== */}
      {employmentOptions.map((option) => {
        const isSelected = selectedType === option.id;

        return (
          <TouchableOpacity
            key={option.id}
            activeOpacity={0.9}
            onPress={() => handleSelect(option.id)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: isSelected ? theme.colors.primary50 : theme.colors.white,
              borderWidth: isSelected ? 2 : 1,
              borderColor: isSelected ? theme.colors.primary500 : theme.colors.gray200,
              borderRadius: theme.radius.xl,
              padding: theme.spacing.xl,
              marginBottom: theme.spacing.lg,
              ...(isSelected ? {} : theme.shadows.card),
            }}
          >
            {/* ----- Left Icon / Avatar Container ----- */}
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: option.id === 'salaried' ? 28 : theme.radius.md,
                backgroundColor: option.bgColor,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: theme.spacing.lg,
              }}
            >
              <Text style={{ fontSize: 26 }}>{option.emoji}</Text>
            </View>

            {/* ----- Middle Text Information ----- */}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: theme.typography.h4,
                  fontFamily: theme.fonts.headingBold || theme.fonts.bold,
                  color: theme.colors.text,
                  marginBottom: 2,
                }}
              >
                {option.title}
              </Text>

              {option.subtitles.map((sub, idx) => (
                <Text
                  key={idx}
                  style={{
                    fontSize: theme.typography.b2,
                    fontFamily: theme.fonts.regular,
                    color: theme.colors.gray500,
                    lineHeight: 18,
                  }}
                >
                  {sub}
                </Text>
              ))}
            </View>

            {/* ----- Right Selection Checkmark Badge ----- */}
            {isSelected && (
              <View style={{ marginLeft: theme.spacing.sm }}>
                <CheckCircle2
                  size={24}
                  color={theme.colors.primary500}
                  fill={theme.colors.primary500}
                  // White checkmark interior styling
                  stroke={theme.colors.white}
                  strokeWidth={2.5}
                />
              </View>
            )}
          </TouchableOpacity>
        );
      })}

      {/* ===== Validation Error Message ===== */}
      {!!errors?.employmentType && (
        <Text
          style={{
            color: theme.colors.error,
            fontSize: theme.typography.b3,
            marginTop: theme.spacing.xs,
            fontFamily: theme.fonts.medium,
          }}
        >
          {errors.employmentType}
        </Text>
      )}
    </View>
  );
};

export default IncomeDetails;