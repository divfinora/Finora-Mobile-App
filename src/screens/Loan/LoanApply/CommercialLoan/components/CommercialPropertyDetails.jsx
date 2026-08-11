import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
 

 
import { Ruler, KeyRound } from 'lucide-react-native';
import CommonInput from '../../../../../components/common/Input/CommonInput.jsx';
import CustomDropdown from '../../../../../components/common/Modal/CustomDropdown.jsx';
import { theme } from '../../../../../theme/index.js';

const PROPERTY_TYPES = [
  'Commercial Office',
  'Retail Shop',
  'Warehouse',
  'Industrial Building',
  'Plot / Land',
];

const OWNERSHIP_TYPES = [
  'Sole Owner',
  'Jointly Owned',
  'Leasehold',
  'Freehold',
];

const OCCUPANCY_OPTIONS = [
  {
    id: 'self_occupied',
    title: 'Self Occupied',
    subtitle: 'Property is used by owner',
  },
  {
    id: 'tenant_occupied',
    title: 'Tenant Occupied',
    subtitle: 'Property is currently leased',
  },
  {
    id: 'vacant',
    title: 'Vacant',
    subtitle: 'Currently unoccupied',
  },
];

const CommercialPropertyDetails = ({ formData, setFormData, errors, setErrors }) => {
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (setErrors) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const inputContainerStyle = {
    backgroundColor: theme.colors?.gray100 || '#F3F4F6',
    borderRadius: theme.radius?.md || 12,
    borderWidth: 0.3,
    borderColor: '#48484a58',
  };

  return (
    <View style={{ paddingVertical: theme.spacing?.sm || 8 }}>
      {/* Property Type */}
      <CustomDropdown
        label="Property Type"
        placeholder="Select Property type"
        options={PROPERTY_TYPES}
        selectedValue={formData?.propertyType || ''}
        onSelect={(item) => handleChange('propertyType', item)}
        error={errors?.propertyType}
        inputContainerStyle={inputContainerStyle}
      />

      {/* Property Ownership */}
      <CustomDropdown
        label="Property Ownership"
        placeholder="Select Ownership type"
        options={OWNERSHIP_TYPES}
        selectedValue={formData?.propertyOwnership || ''}
        onSelect={(item) => handleChange('propertyOwnership', item)}
        error={errors?.propertyOwnership}
        inputContainerStyle={inputContainerStyle}
      />

      {/* Property Address */}
      <CommonInput
        label="Property Address"
        placeholder="Enter complete building details,street, and landmark..."
        value={formData?.propertyAddress || ''}
        onChangeText={(text) => handleChange('propertyAddress', text)}
        multiline
        numberOfLines={3}
        error={errors?.propertyAddress}
        inputContainerStyle={[
          inputContainerStyle,
          { height: 'auto', minHeight: 80, paddingVertical: 8 },
        ]}
      />

      {/* City */}
      <CommonInput
        label="City"
        placeholder="e.g. Mumbai"
        value={formData?.city || ''}
        onChangeText={(text) => handleChange('city', text)}
        error={errors?.city}
        inputContainerStyle={inputContainerStyle}
      />

      {/* State & PIN Code */}
      <View style={{ flexDirection: 'row', gap: theme.spacing?.md || 12 }}>
        <View style={{ flex: 1 }}>
          <CommonInput
            label="State"
            placeholder="State"
            value={formData?.state || ''}
            onChangeText={(text) => handleChange('state', text)}
            error={errors?.state}
            inputContainerStyle={inputContainerStyle}
          />
        </View>
        <View style={{ flex: 1 }}>
          <CommonInput
            label="PIN Code"
            placeholder="400001"
            value={formData?.pincode || ''}
            onChangeText={(text) => handleChange('pincode', text)}
            keyboardType="numeric"
            error={errors?.pincode}
            inputContainerStyle={inputContainerStyle}
          />
        </View>
      </View>

      {/* SECTION 1: Property Specs */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: theme.spacing?.md || 16,
          marginBottom: theme.spacing?.md || 16,
        }}
      >
        <Ruler
          size={20}
          color={theme.colors?.primary500 || '#2563EB'}
          style={{ marginRight: 8 }}
        />
        <Text
          style={{
            fontSize: theme.typography?.h4 || 16,
            fontFamily: theme.fonts?.bold,
            fontWeight: '700',
            color: theme.colors?.text || '#1E293B',
          }}
        >
          Property Specs
        </Text>
      </View>

      {/* Built-up Area */}
      <CommonInput
        label="Built-up Area (Sq.ft.)"
        placeholder="0.00"
        value={formData?.builtUpArea || ''}
        onChangeText={(text) => handleChange('builtUpArea', text)}
        keyboardType="numeric"
        error={errors?.builtUpArea}
        inputContainerStyle={inputContainerStyle}
      />

      {/* Carpet Area */}
      <CommonInput
        label="Carpet Area (Sq.ft.)"
        placeholder="0.00"
        value={formData?.carpetArea || ''}
        onChangeText={(text) => handleChange('carpetArea', text)}
        keyboardType="numeric"
        error={errors?.carpetArea}
        inputContainerStyle={inputContainerStyle}
      />

      {/* Property Age */}
      <CommonInput
        label="Property Age (Years)"
        placeholder="e.g. 5"
        value={formData?.propertyAge || ''}
        onChangeText={(text) => handleChange('propertyAge', text)}
        keyboardType="numeric"
        error={errors?.propertyAge}
        inputContainerStyle={inputContainerStyle}
      />

      {/* Market Value */}
      <CommonInput
        label="Market Value"
        placeholder="$  0.00"
        value={formData?.marketValue || ''}
        onChangeText={(text) => handleChange('marketValue', text)}
        keyboardType="numeric"
        error={errors?.marketValue}
        inputContainerStyle={inputContainerStyle}
      />

      {/* Loan Required Against Property */}
      <CommonInput
        label="Loan Required Against Property"
        placeholder="$  0.00"
        value={formData?.loanRequiredAgainstProperty || ''}
        onChangeText={(text) => handleChange('loanRequiredAgainstProperty', text)}
        keyboardType="numeric"
        error={errors?.loanRequiredAgainstProperty}
        inputContainerStyle={inputContainerStyle}
      />

      {/* SECTION 2: Occupancy Status */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: theme.spacing?.md || 16,
          marginBottom: theme.spacing?.md || 16,
        }}
      >
        <KeyRound
          size={20}
          color={theme.colors?.primary500 || '#2563EB'}
          style={{ marginRight: 8 }}
        />
        <Text
          style={{
            fontSize: theme.typography?.h4 || 16,
            fontFamily: theme.fonts?.bold,
            fontWeight: '700',
            color: theme.colors?.text || '#1E293B',
          }}
        >
          Occupancy Status
        </Text>
      </View>

      {/* Occupancy Radio Cards */}
      {OCCUPANCY_OPTIONS.map((item) => {
        const isSelected = formData?.occupancyStatus === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={() => handleChange('occupancyStatus', item.id)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: theme.colors?.white || '#FFFFFF',
              borderRadius: theme.radius?.lg || 16,
              borderWidth: 1,
              borderColor: isSelected
                ? theme.colors?.primary500 || '#3B82F6'
                : '#E2E8F0',
              padding: theme.spacing?.md || 16,
              marginBottom: theme.spacing?.md || 12,
            }}
          >
            {/* Radio Circle */}
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 11,
                borderWidth: 2,
                borderColor: isSelected
                  ? theme.colors?.primary500 || '#3B82F6'
                  : '#CBD5E1',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 14,
              }}
            >
              {isSelected && (
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: theme.colors?.primary500 || '#3B82F6',
                  }}
                />
              )}
            </View>

            {/* Title & Subtitle */}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: theme.typography?.b2 || 15,
                  fontFamily: theme.fonts?.bold || theme.fonts?.medium,
                  fontWeight: '600',
                  color: theme.colors?.text || '#1E293B',
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  fontSize: theme.typography?.caption || 12,
                  fontFamily: theme.fonts?.regular,
                  color: theme.colors?.textSecondary || '#64748B',
                  marginTop: 2,
                }}
              >
                {item.subtitle}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CommercialPropertyDetails;