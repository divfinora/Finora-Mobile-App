 
import React from 'react';
import { View, Text, Switch } from 'react-native';
import CommonInput from '../../../../../components/common/Input/CommonInput';
import { theme } from '../../../../../theme';

const AddressForm = ({ formData, setFormData, errors, setErrors }) => {
  return (
    <View style={{ 
      paddingVertical: theme.spacing.sm 
    }}>
      
      {/* ===== Current Address ===== */}
      <Text style={{
        fontSize: theme.typography.b1,
        fontFamily: theme.fonts.headingBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
      }}>Current Address</Text>

      <CommonInput
        label="Address Line 1"
        placeholder="House/Flat No., Building Name"
        value={formData?.currentAddress?.line1}
        onChangeText={(text) => {
          setFormData(prev => ({
            ...prev,
            currentAddress: { ...prev.currentAddress, line1: text }
          }));
          setErrors(prev => ({ ...prev, currentAddressLine1: '' }));
        }}
        error={errors.currentAddressLine1}
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />

      <CommonInput
        label="Address Line 2"
        placeholder="Street, Area, Locality"
        value={formData?.currentAddress?.line2}
        onChangeText={(text) => {
          setFormData(prev => ({
            ...prev,
            currentAddress: { ...prev.currentAddress, line2: text }
          }));
        }}
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />

      <CommonInput
        label="City"
        placeholder="Enter City"
        value={formData?.currentAddress?.city}
        onChangeText={(text) => {
          setFormData(prev => ({
            ...prev,
            currentAddress: { ...prev.currentAddress, city: text }
          }));
          setErrors(prev => ({ ...prev, currentAddressCity: '' }));
        }}
        error={errors.currentAddressCity}
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />

      <CommonInput
        label="PIN Code"
        placeholder="6-digit code"
        value={formData?.currentAddress?.pincode}
        onChangeText={(text) => {
          setFormData(prev => ({
            ...prev,
            currentAddress: { ...prev.currentAddress, pincode: text }
          }));
          setErrors(prev => ({ ...prev, currentAddressPincode: '' }));
        }}
        keyboardType="numeric"
        maxLength={6}
        error={errors.currentAddressPincode}
        containerStyle={{ marginBottom: theme.spacing.lg }}
      />

      <CommonInput
        label="State"
        placeholder="Select State"
        value={formData?.currentAddress?.state}
        onChangeText={(text) => {
          setFormData(prev => ({
            ...prev,
            currentAddress: { ...prev.currentAddress, state: text }
          }));
          setErrors(prev => ({ ...prev, currentAddressState: '' }));
        }}
        error={errors.currentAddressState}
        containerStyle={{ marginBottom: theme.spacing.xl }}
      />

      {/* ===== Permanent Address Toggle ===== */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.xl,
      }}>
        <Switch
          value={formData.sameAsCurrent}
          onValueChange={(value) => {
            setFormData(prev => ({ ...prev, sameAsCurrent: value }));
            if (value) {
              setFormData(prev => ({
                ...prev,
                permanentAddress: { ...prev.currentAddress }
              }));
            }
          }}
          trackColor={{ 
            false: theme.colors.gray300, 
            true: theme.colors.primary500 
          }}
          thumbColor={theme.colors.white}
        />
        <Text style={{
          marginLeft: theme.spacing.sm,
          fontSize: theme.typography.b2,
          fontFamily: theme.fonts.medium,
          color: theme.colors.gray700,
        }}>Same as Current Address</Text>
      </View>

      {/* ===== Permanent Address ===== */}
      {!formData.sameAsCurrent && (
        <>
          <Text style={{
            fontSize: theme.typography.b1,
            fontFamily: theme.fonts.headingBold,
            color: theme.colors.text,
            marginBottom: theme.spacing.md,
          }}>Permanent Address</Text>

          <CommonInput
            label="Address Line 1"
            placeholder="House/Flat No., Building Name"
            value={formData?.permanentAddress?.line1}
            onChangeText={(text) => {
              setFormData(prev => ({
                ...prev,
                permanentAddress: { ...prev.permanentAddress, line1: text }
              }));
            }}
            containerStyle={{ marginBottom: theme.spacing.lg }}
          />

          <CommonInput
            label="Address Line 2"
            placeholder="Street, Area, Locality"
            value={formData?.permanentAddress?.line2}
            onChangeText={(text) => {
              setFormData(prev => ({
                ...prev,
                permanentAddress: { ...prev.permanentAddress, line2: text }
              }));
            }}
            containerStyle={{ marginBottom: theme.spacing.lg }}
          />

          <CommonInput
            label="City"
            placeholder="Enter City"
            value={formData?.permanentAddress?.city}
            onChangeText={(text) => {
              setFormData(prev => ({
                ...prev,
                permanentAddress: { ...prev.permanentAddress, city: text }
              }));
            }}
            containerStyle={{ marginBottom: theme.spacing.lg }}
          />

          <CommonInput
            label="PIN Code"
            placeholder="6-digit code"
            value={formData?.permanentAddress?.pincode}
            onChangeText={(text) => {
              setFormData(prev => ({
                ...prev,
                permanentAddress: { ...prev.permanentAddress, pincode: text }
              }));
            }}
            keyboardType="numeric"
            maxLength={6}
            containerStyle={{ marginBottom: theme.spacing.lg }}
          />

          <CommonInput
            label="State"
            placeholder="Select State"
            value={formData?.permanentAddress?.state}
            onChangeText={(text) => {
              setFormData(prev => ({
                ...prev,
                permanentAddress: { ...prev.permanentAddress, state: text }
              }));
            }}
            containerStyle={{ marginBottom: theme.spacing.lg }}
          />
        </>
      )}

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
          Ensure your address matches your official identity documents.
        </Text>
      </View>
    </View>
  );
};

export default AddressForm;