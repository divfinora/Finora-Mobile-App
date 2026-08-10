import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../../../../theme';
import { 
  Home, 
  User, 
  Car, 
  Briefcase, 
  Coins, 
  MoreHorizontal, 
  ShieldCheck, 
  Check 
} from 'lucide-react-native';

const ExistingLoanForm = ({ formData, setFormData, errors, setErrors }) => {
  // Existing loan toggle options
  const loanOptions = [
    { id: 'yes', label: 'Yes, I have existing loans' },
    { id: 'no', label: 'No existing loans' },
  ];

  // Available loan categories
  const loanTypes = [
    { id: 'home', title: 'Home Loan', icon: Home },
    { id: 'personal', title: 'Personal Loan', icon: User },
    { id: 'vehicle', title: 'Vehicle Loan', icon: Car },
    { id: 'business', title: 'Business Loan', icon: Briefcase },
    { id: 'gold', title: 'Gold Loan', icon: Coins },
    { id: 'other', title: 'Other', icon: MoreHorizontal },
  ];

  // Handle Radio Selection
  const handleSelectOption = (optionId) => {
    setFormData((prev) => ({
      ...prev,
      hasExistingLoan: optionId,
      // Clear selected types if user selects "No"
      selectedLoanTypes: optionId === 'no' ? [] : prev?.selectedLoanTypes || [],
    }));
    if (setErrors) {
      setErrors((prev) => ({ ...prev, hasExistingLoan: '' }));
    }
  };

  // Handle Multi-selection for Loan Types
  const toggleLoanType = (typeId) => {
    const currentTypes = formData?.selectedLoanTypes || [];
    const isSelected = currentTypes.includes(typeId);

    const updatedTypes = isSelected
      ? currentTypes.filter((id) => id !== typeId)
      : [...currentTypes, typeId];

    setFormData((prev) => ({ ...prev, selectedLoanTypes: updatedTypes }));
    if (setErrors) {
      setErrors((prev) => ({ ...prev, selectedLoanTypes: '' }));
    }
  };

  return (
    <View style={{ paddingVertical: theme.spacing.sm }}>
      
      {/* ===== SECTION 1: Has Existing Loans (Radio Cards) ===== */}
      <View style={{ marginBottom: theme.spacing.xl }}>
        <Text
          style={{
            fontSize: theme.typography.b1,
            fontFamily: theme.fonts.bold,
            color: theme.colors.text,
            marginBottom: theme.spacing.md,
          }}
        >
          Do you have any existing loans?
        </Text>

        <View style={{ gap: theme.spacing.md }}>
          {loanOptions.map((option) => {
            const isSelected = formData?.hasExistingLoan === option.id;
            return (
              <TouchableOpacity
                key={option.id}
                activeOpacity={0.8}
                onPress={() => handleSelectOption(option.id)}
                style={{
                  height: 56,
                  borderRadius: theme.radius.md,
                  borderWidth: theme.borderWidth.thin,
                  borderColor: isSelected ? theme.colors.primary500 : theme.colors.transparent,
                  backgroundColor: isSelected ? theme.colors.card : theme.colors.gray100,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: theme.spacing.lg,
                }}
              >
                {/* Custom Radio Icon */}
                <View
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    borderWidth: 2,
                    borderColor: isSelected ? theme.colors.primary500 : theme.colors.gray500,
                    backgroundColor: isSelected ? theme.colors.primary500 : theme.colors.transparent,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: theme.spacing.md,
                  }}
                >
                  {isSelected && <Check size={14} color={theme.colors.white} strokeWidth={3} />}
                </View>

                <Text
                  style={{
                    fontSize: theme.typography.b1,
                    fontFamily: theme.fonts.medium,
                    color: theme.colors.text,
                  }}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {!!errors?.hasExistingLoan && (
          <Text
            style={{
              color: theme.colors.error,
              fontSize: theme.typography.b3,
              marginTop: theme.spacing.xs,
              fontFamily: theme.fonts.medium,
            }}
          >
            {errors.hasExistingLoan}
          </Text>
        )}
      </View>

      {/* ===== SECTION 2: Select Loan Types (Shown when Yes or Default) ===== */}
      {formData?.hasExistingLoan !== 'no' && (
        <View style={{ marginBottom: theme.spacing.xxl }}>
          <Text
            style={{
              fontSize: theme.typography.b1,
              fontFamily: theme.fonts.bold,
              color: theme.colors.text,
              marginBottom: theme.spacing.md,
            }}
          >
            Select Loan Types
          </Text>

          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: theme.spacing.md,
            }}
          >
            {loanTypes.map((type) => {
              const IconComponent = type.icon;
              const isSelected = (formData?.selectedLoanTypes || []).includes(type.id);

              return (
                <TouchableOpacity
                  key={type.id}
                  activeOpacity={0.8}
                  onPress={() => toggleLoanType(type.id)}
                  style={{
                    width: '47.5%',
                    height: 84,
                    borderRadius: theme.radius.lg,
                    borderWidth: theme.borderWidth.thin,
                    borderColor: isSelected ? theme.colors.primary500 : theme.colors.gray300,
                    backgroundColor: isSelected ? theme.colors.card : theme.colors.white,
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: theme.spacing.xs,
                  }}
                >
                  <IconComponent
                    size={24}
                    color={isSelected ? theme.colors.primary500 : theme.colors.primary500}
                  />
                  <Text
                    style={{
                      fontSize: theme.typography.b2,
                      fontFamily: theme.fonts.medium,
                      color: theme.colors.text,
                      textAlign: 'center',
                    }}
                  >
                    {type.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {!!errors?.selectedLoanTypes && (
            <Text
              style={{
                color: theme.colors.error,
                fontSize: theme.typography.b3,
                marginTop: theme.spacing.xs,
                fontFamily: theme.fonts.medium,
              }}
            >
              {errors.selectedLoanTypes}
            </Text>
          )}
        </View>
      )}

      {/* ===== SECTION 3: Security & Encryption Banner ===== */}
      <View
        style={{
          backgroundColor: theme.colors.card,
          borderRadius: theme.radius.xl,
          padding: theme.spacing.xl,
          alignItems: 'center',
          marginTop: theme.spacing.md,
        }}
      >
        <ShieldCheck size={36} color={theme.colors.navy300} style={{ marginBottom: theme.spacing.sm }} />
        <Text
          style={{
            fontSize: theme.typography.b2,
            fontFamily: theme.fonts.regular,
            color: theme.colors.gray500,
            textAlign: 'center',
            lineHeight: theme.lineHeight.b2,
            paddingHorizontal: theme.spacing.md,
          }}
        >
          Your financial data is encrypted and used only for credit assessment purposes.
        </Text>
      </View>

    </View>
  );
};

export default ExistingLoanForm;