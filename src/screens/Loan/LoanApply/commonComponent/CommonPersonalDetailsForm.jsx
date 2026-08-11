import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../../../theme';
import CommonInput from '../../../../components/common/Input/CommonInput';
import RoundedChip from '../../../../components/common/Input/RoundedChip';
import SquareChip from '../../../../components/common/Input/SquareChip';
import { Calendar } from 'lucide-react-native';

const CommonPersonalDetailsForm = ({ formData, setFormData, errors, setErrors }) => {
  const genderOptions = ['Male', 'Female', 'Other'];
  const employmentTypes = [
    'Salaried',
    'Self-Employed',
    'Business',
    'Professional',
    'Student',
    'Retired',
    'Others',
  ];
  const maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'];

  // Input & Unselected Chip Border Styling
  const commonBorderStyle = {
    borderWidth: 0.3,
    borderColor: '#48484a58',
  };

  const orangeActiveColor = theme.colors?.primary500 || '#FF6B00';
  const orangeActiveBg = theme.colors?.primary50 || '#FFF0E6';

  return (
    <View style={{ paddingVertical: theme.spacing?.sm || 8 }}>
      {/* ===== Section Title ===== */}
      <Text
        style={{
          fontSize: theme.typography?.h3 || 18,
          fontFamily: theme.fonts?.bold,
          color: theme.colors?.text || '#1E293B',
          marginBottom: theme.spacing?.lg || 16,
        }}
      >
        Personal Details
      </Text>

      {/* ===== Full Name ===== */}
      <CommonInput
        label="Full Name ( as per Pan)"
        placeholder="As per PAN card"
        value={formData?.fullName || ''}
        onChangeText={(text) => {
          setFormData((prev) => ({ ...prev, fullName: text }));
          setErrors?.((prev) => ({ ...prev, fullName: '' }));
        }}
        error={errors?.fullName}
        required
        inputContainerStyle={commonBorderStyle}
      />

      {/* ===== Email ID ===== */}
      <CommonInput
        label="Email ID"
        placeholder="Enter Your Email Address"
        value={formData?.email || ''}
        onChangeText={(text) => {
          setFormData((prev) => ({ ...prev, email: text }));
          setErrors?.((prev) => ({ ...prev, email: '' }));
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors?.email}
        required
        inputContainerStyle={commonBorderStyle}
      />

      {/* ===== Mobile No. ===== */}
      <CommonInput
        label="Mob. No."
        placeholder="Enter Your Phone No."
        value={formData?.mobile || ''}
        onChangeText={(text) => {
          setFormData((prev) => ({ ...prev, mobile: text }));
          setErrors?.((prev) => ({ ...prev, mobile: '' }));
        }}
        keyboardType="phone-pad"
        maxLength={10}
        error={errors?.mobile}
        required
        inputContainerStyle={commonBorderStyle}
      />

      {/* ===== Date of Birth ===== */}
      <CommonInput
        label="Date of Birth"
        placeholder="DD/MM/YYYY"
        value={formData?.dob || ''}
        onChangeText={(text) => {
          setFormData((prev) => ({ ...prev, dob: text }));
          setErrors?.((prev) => ({ ...prev, dob: '' }));
        }}
        error={errors?.dob}
        required
        rightIcon={
          <Calendar
            size={theme.iconSize?.sm || 18}
            color={theme.colors?.gray500 || '#64748B'}
          />
        }
        inputContainerStyle={commonBorderStyle}
      />

      {/* ===== Gender (SquareChip) ===== */}
      <View style={{ marginBottom: theme.spacing?.lg || 16 }}>
        <Text
          style={{
            color: theme.colors?.gray700 || '#334155',
            fontSize: theme.typography?.b2 || 14,
            fontFamily: theme.fonts?.medium,
            marginBottom: theme.spacing?.xs || 6,
          }}
        >
          Gender <Text style={{ color: theme.colors?.error || '#EF4444' }}>*</Text>
        </Text>
        <View style={{ flexDirection: 'row', gap: theme.spacing?.sm || 8 }}>
          {genderOptions.map((gender) => {
            const isSelected = formData?.gender === gender;
            return (
              <SquareChip
                key={gender}
                title={gender}
                selected={isSelected}
                activeColor={orangeActiveColor}
                activeBackgroundColor={orangeActiveBg}
                onPress={() => {
                  setFormData((prev) => ({ ...prev, gender }));
                  setErrors?.((prev) => ({ ...prev, gender: '' }));
                }}
                style={[
                  { flex: 1 },
                  !isSelected && commonBorderStyle,
                ]}
              />
            );
          })}
        </View>
        {errors?.gender && (
          <Text
            style={{
              color: theme.colors?.error || '#EF4444',
              fontSize: theme.typography?.b3 || 12,
              marginTop: theme.spacing?.xs || 4,
              fontFamily: theme.fonts?.medium,
            }}
          >
            {errors.gender}
          </Text>
        )}
      </View>

      {/* ===== Father's/Spouse's Name ===== */}
      <CommonInput
        label="Father's/Spouse's Name"
        placeholder="Enter Father's / Spouses's name"
        value={formData?.fatherName || ''}
        onChangeText={(text) => {
          setFormData((prev) => ({ ...prev, fatherName: text }));
          setErrors?.((prev) => ({ ...prev, fatherName: '' }));
        }}
        error={errors?.fatherName}
        required
        inputContainerStyle={commonBorderStyle}
      />

      {/* ===== PAN Number ===== */}
      <CommonInput
        label="PAN Number"
        placeholder="Enter PAN Number"
        value={formData?.panNumber || ''}
        onChangeText={(text) => {
          setFormData((prev) => ({ ...prev, panNumber: text.toUpperCase() }));
          setErrors?.((prev) => ({ ...prev, panNumber: '' }));
        }}
        autoCapitalize="characters"
        maxLength={10}
        error={errors?.panNumber}
        required
        inputContainerStyle={commonBorderStyle}
      />

      {/* ===== Aadhaar Number ===== */}
      <CommonInput
        label="Aadhaar Number"
        placeholder="Enter Aadhaar Number"
        value={formData?.aadhaarNumber || ''}
        onChangeText={(text) => {
          setFormData((prev) => ({ ...prev, aadhaarNumber: text }));
          setErrors?.((prev) => ({ ...prev, aadhaarNumber: '' }));
        }}
        keyboardType="numeric"
        maxLength={12}
        error={errors?.aadhaarNumber}
        required
        inputContainerStyle={commonBorderStyle}
      />

      {/* ===== Annual Income ===== */}
      <CommonInput
        label="Annual Income (₹)"
        placeholder="e.g. 65,889"
        value={formData?.annualIncome || ''}
        onChangeText={(text) => {
          setFormData((prev) => ({ ...prev, annualIncome: text }));
          setErrors?.((prev) => ({ ...prev, annualIncome: '' }));
        }}
        keyboardType="numeric"
        error={errors?.annualIncome}
        required
        inputContainerStyle={commonBorderStyle}
      />

      {/* ===== Occupation ===== */}
      <CommonInput
        label="Occupation"
        placeholder="Enter your Occupation"
        value={formData?.occupation || ''}
        onChangeText={(text) => {
          setFormData((prev) => ({ ...prev, occupation: text }));
          setErrors?.((prev) => ({ ...prev, occupation: '' }));
        }}
        error={errors?.occupation}
        required
        inputContainerStyle={commonBorderStyle}
      />

      {/* ===== Employment Type (RoundedChip) ===== */}
      <View style={{ marginBottom: theme.spacing?.lg || 16 }}>
        <Text
          style={{
            color: theme.colors?.gray700 || '#334155',
            fontSize: theme.typography?.b2 || 14,
            fontFamily: theme.fonts?.medium,
            marginBottom: theme.spacing?.xs || 6,
          }}
        >
          Employment Type <Text style={{ color: theme.colors?.error || '#EF4444' }}>*</Text>
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing?.xs || 6 }}>
          {employmentTypes.map((type) => {
            const isSelected = formData?.employmentType === type;
            return (
              <RoundedChip
                key={type}
                title={type}
                selected={isSelected}
                activeColor={orangeActiveColor}
                activeBackgroundColor={orangeActiveBg}
                onPress={() => {
                  setFormData((prev) => ({ ...prev, employmentType: type }));
                  setErrors?.((prev) => ({ ...prev, employmentType: '' }));
                }}
                style={!isSelected ? commonBorderStyle : null}
              />
            );
          })}
        </View>
        {errors?.employmentType && (
          <Text
            style={{
              color: theme.colors?.error || '#EF4444',
              fontSize: theme.typography?.b3 || 12,
              marginTop: theme.spacing?.xs || 4,
              fontFamily: theme.fonts?.medium,
            }}
          >
            {errors.employmentType}
          </Text>
        )}
      </View>

      {/* ===== Marital Status (RoundedChip) ===== */}
      <View style={{ marginBottom: theme.spacing?.lg || 16 }}>
        <Text
          style={{
            color: theme.colors?.gray700 || '#334155',
            fontSize: theme.typography?.b2 || 14,
            fontFamily: theme.fonts?.medium,
            marginBottom: theme.spacing?.xs || 6,
          }}
        >
          Marital Status (Optional)
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: theme.spacing?.xs || 6 }}>
          {maritalStatusOptions.map((status) => {
            const isSelected = formData?.maritalStatus === status;
            return (
              <RoundedChip
                key={status}
                title={status}
                selected={isSelected}
                activeColor={orangeActiveColor}
                activeBackgroundColor={orangeActiveBg}
                onPress={() => {
                  setFormData((prev) => ({ ...prev, maritalStatus: status }));
                  setErrors?.((prev) => ({ ...prev, maritalStatus: '' }));
                }}
                style={!isSelected ? commonBorderStyle : null}
              />
            );
          })}
        </View>
      </View>

      {/* ===== Info Box (Bottom Light Blue Box) ===== */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          backgroundColor: '#EFF6FF',
          borderWidth: 1,
          borderColor: '#BFDBFE',
          padding: theme.spacing?.md || 12,
          borderRadius: theme.radius?.lg || 16,
          marginTop: theme.spacing?.sm || 8,
          marginBottom: theme.spacing?.xl || 24,
        }}
      >
        <Text style={{ fontSize: 16, marginRight: 8, color: '#2563EB' }}>
          ℹ️
        </Text>
        <Text
          style={{
            flex: 1,
            fontSize: 12,
            color: '#1E40AF',
            fontFamily: theme.fonts?.regular,
            lineHeight: 18,
          }}
        >
          We use secure encryption to protect your personal details. Providing accurate information as per your official documents ensures a higher chance of loan approval.
        </Text>
      </View>
    </View>
  );
};

export default CommonPersonalDetailsForm;