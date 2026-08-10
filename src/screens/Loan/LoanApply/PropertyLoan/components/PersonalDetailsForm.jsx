// components/PersonalDetailsForm.jsx
import React from 'react';
import { View, Text } from 'react-native';
 
import { theme } from '../../../../../theme';
import CommonInput from '../../../../../components/common/Input/CommonInput';
import RoundedChip from '../../../../../components/common/Input/RoundedChip';
import SquareChip from '../../../../../components/common/Input/SquareChip';

const PersonalDetailsForm = ({ formData, setFormData, errors, setErrors }) => {
  // Gender options
  const genderOptions = ['Male', 'Female', 'Other'];
  
  // Employment Type options
  const employmentTypes = ['Salaried', 'Self-Employed', 'Business', 'Professional', 'Student', 'Retired', 'Others'];
  
  // Marital Status options
  const maritalStatusOptions = ['Single', 'Married', 'Divorced', 'Widowed', 'Separated'];

  return (
    <View style={{ 
      paddingVertical: theme.spacing.sm 
    }}>
      
      {/* ===== INFO BOX (UPAR) ===== */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: theme.colors.primary50, 
        padding: theme.spacing.md, 
        borderRadius: theme.radius.md,
        marginBottom: theme.spacing.xl
      }}>
        <Text style={{ 
          fontSize: theme.typography.b1, 
          marginRight: theme.spacing.sm,
          color: theme.colors.primary500 
        }}>ℹ️</Text>
        <Text style={{ 
          flex: 1, 
          fontSize: theme.typography.b3, 
          color: theme.colors.gray700,
          fontFamily: theme.fonts.regular,
          lineHeight: theme.lineHeight.b3
        }}>
          We use secure encryption to protect your personal details. Providing accurate information as per your official documents ensures a higher chance of loan approval.
        </Text>
      </View>

      {/* ===== Full Name ===== */}
      <CommonInput
        label="Full Name (as per Pan)"
        placeholder="As per PAN card"
        value={formData.fullName}
        onChangeText={(text) => {
          setFormData(prev => ({...prev, fullName: text}));
          setErrors(prev => ({...prev, fullName: ''}));
        }}
        error={errors.fullName}
        required
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />
      
      {/* ===== Email ID ===== */}
      <CommonInput
        label="Email ID"
        placeholder="Enter Your Email Address"
        value={formData.email}
        onChangeText={(text) => {
          setFormData(prev => ({...prev, email: text}));
          setErrors(prev => ({...prev, email: ''}));
        }}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errors.email}
        required
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />
      
      {/* ===== Mobile No. ===== */}
      <CommonInput
        label="Mob. No."
        placeholder="Enter Your Phone No."
        value={formData.mobile}
        onChangeText={(text) => {
          setFormData(prev => ({...prev, mobile: text}));
          setErrors(prev => ({...prev, mobile: ''}));
        }}
        keyboardType="phone-pad"
        maxLength={10}
        error={errors.mobile}
        required
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />
      
      {/* ===== Date of Birth ===== */}
      <CommonInput
        label="Date of Birth"
        placeholder="DD/MM/YYYY"
        value={formData.dob}
        onChangeText={(text) => {
          setFormData(prev => ({...prev, dob: text}));
          setErrors(prev => ({...prev, dob: ''}));
        }}
        error={errors.dob}
        required
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />
      
      {/* ===== Gender - SquareChip ===== */}
      <View style={{ marginBottom: theme.spacing.lg }}>
        <Text style={{ 
          color: theme.colors.gray700,
          fontSize: theme.typography.b2,
          fontFamily: theme.fonts.medium,
          marginBottom: theme.spacing.sm
        }}>
          Gender <Text style={{ color: theme.colors.error }}>*</Text>
        </Text>
        <View style={{ 
          flexDirection: 'row', 
          gap: theme.spacing.sm 
        }}>
          {genderOptions.map((gender) => (
            <SquareChip
              key={gender}
              title={gender}
              selected={formData.gender === gender}
              onPress={() => {
                setFormData(prev => ({...prev, gender}));
                setErrors(prev => ({...prev, gender: ''}));
              }}
              style={{ flex: 1 }}
            />
          ))}
        </View>
        {errors.gender && (
          <Text style={{ 
            color: theme.colors.error, 
            fontSize: theme.typography.b3, 
            marginTop: theme.spacing.xs,
            fontFamily: theme.fonts.medium
          }}>
            {errors.gender}
          </Text>
        )}
      </View>
      
      {/* ===== Father's/Spouse's Name ===== */}
      <CommonInput
        label="Father's/Spouse's Name"
        placeholder="Enter Father's / Spouses's name"
        value={formData.fatherName}
        onChangeText={(text) => {
          setFormData(prev => ({...prev, fatherName: text}));
          setErrors(prev => ({...prev, fatherName: ''}));
        }}
        error={errors.fatherName}
        required
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />
      
      {/* ===== PAN Number ===== */}
      <CommonInput
        label="PAN Number"
        placeholder="Enter PAN Number"
        value={formData.panNumber}
        onChangeText={(text) => {
          setFormData(prev => ({...prev, panNumber: text.toUpperCase()}));
          setErrors(prev => ({...prev, panNumber: ''}));
        }}
        autoCapitalize="characters"
        maxLength={10}
        error={errors.panNumber}
        required
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />
      
      {/* ===== Aadhaar Number ===== */}
      <CommonInput
        label="Aadhaar Number"
        placeholder="Enter Aadhaar Number"
        value={formData.aadhaarNumber}
        onChangeText={(text) => {
          setFormData(prev => ({...prev, aadhaarNumber: text}));
          setErrors(prev => ({...prev, aadhaarNumber: ''}));
        }}
        keyboardType="numeric"
        maxLength={12}
        error={errors.aadhaarNumber}
        required
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />
      
      {/* ===== Annual Income ===== */}
      <CommonInput
        label="Annual Income (₹)"
        placeholder="e.g. 65,889"
        value={formData.annualIncome}
        onChangeText={(text) => {
          setFormData(prev => ({...prev, annualIncome: text}));
          setErrors(prev => ({...prev, annualIncome: ''}));
        }}
        keyboardType="numeric"
        error={errors.annualIncome}
        required
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />
      
      {/* ===== Occupation ===== */}
      <CommonInput
        label="Occupation"
        placeholder="Enter your Occupation"
        value={formData.occupation}
        onChangeText={(text) => {
          setFormData(prev => ({...prev, occupation: text}));
          setErrors(prev => ({...prev, occupation: ''}));
        }}
        error={errors.occupation}
        required
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />
      
      {/* ===== Employment Type - RoundedChip ===== */}
      <View style={{ marginBottom: theme.spacing.lg }}>
        <Text style={{ 
          color: theme.colors.gray700,
          fontSize: theme.typography.b2,
          fontFamily: theme.fonts.medium,
          marginBottom: theme.spacing.sm
        }}>
          Employment Type <Text style={{ color: theme.colors.error }}>*</Text>
        </Text>
        <View style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap',
        }}>
          {employmentTypes.map((type) => (
            <RoundedChip
              key={type}
              title={type}
              selected={formData.employmentType === type}
              onPress={() => {
                setFormData(prev => ({...prev, employmentType: type}));
                setErrors(prev => ({...prev, employmentType: ''}));
              }}
            />
          ))}
        </View>
        {errors.employmentType && (
          <Text style={{ 
            color: theme.colors.error, 
            fontSize: theme.typography.b3, 
            marginTop: theme.spacing.xs,
            fontFamily: theme.fonts.medium
          }}>
            {errors.employmentType}
          </Text>
        )}
      </View>
      
      {/* ===== Marital Status - RoundedChip (Optional) ===== */}
      <View style={{ marginBottom: theme.spacing.lg }}>
        <Text style={{ 
          color: theme.colors.gray700,
          fontSize: theme.typography.b2,
          fontFamily: theme.fonts.medium,
          marginBottom: theme.spacing.sm
        }}>
          Marital Status (Optional)
        </Text>
        <View style={{ 
          flexDirection: 'row', 
          flexWrap: 'wrap',
        }}>
          {maritalStatusOptions.map((status) => (
            <RoundedChip
              key={status}
              title={status}
              selected={formData.maritalStatus === status}
              onPress={() => {
                setFormData(prev => ({...prev, maritalStatus: status}));
                setErrors(prev => ({...prev, maritalStatus: ''}));
              }}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default PersonalDetailsForm;