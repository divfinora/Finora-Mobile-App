// components/PropertyDetails.jsx
import React from 'react';
import { View, Text } from 'react-native';
import { Building2, IndianRupee } from 'lucide-react-native';

import { theme } from '../../../../../theme';
import SquareChip from '../../../../../components/common/Input/SquareChip';
import CommonInput from '../../../../../components/common/Input/CommonInput';

const PROPERTY_TYPES = ['House', 'Apartment', 'Townhouse', 'Others'];
const OWNERSHIP_STATUSES = ['Self-Owned', 'Jointly Owned', 'Ancestral Property'];

const borderStyle = {
  borderWidth: 0.3,
  borderColor: '#48484a58',
};

const PropertyDetails = ({ formData = {}, setFormData, errors = {}, setErrors }) => {
  const details = formData?.propertyDetails || {};

  const handleChange = (field, value) => {
    setFormData?.((prev) => ({
      ...prev,
      propertyDetails: {
        ...(prev.propertyDetails || {}),
        [field]: value,
      },
    }));

    if (errors?.[field] && setErrors) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <View style={{ marginTop: 12 }}>
      {/* Property Type Selection */}
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: theme.fonts?.medium || 'Manrope-Medium',
            color: '#1E293B',
            marginBottom: 10,
          }}
        >
          Property Type<Text style={{ color: '#EF4444' }}>*</Text>
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: 10,
          }}
        >
          {PROPERTY_TYPES.map((type) => (
            <View key={type} style={{ width: '31%' }}>
              <SquareChip
                title={type}
                selected={details.propertyType === type}
                onPress={() => handleChange('propertyType', type)}
                height={48}
                borderRadius={12}
                selectedBackgroundColor="#FCEDD6"
                selectedBorderColor="#FF8C66"
                selectedTextColor="#111827"
                unselectedBackgroundColor="#F4F5F8"
                unselectedBorderColor="transparent"
                unselectedTextColor="#6B7280"
                textStyle={{ fontSize: 14 }}
              />
            </View>
          ))}
        </View>
        {!!errors?.propertyType && (
          <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>
            {errors.propertyType}
          </Text>
        )}
      </View>

      {/* Property Address Input using CommonInput */}
      <CommonInput
        label="Property Address"
        required
        placeholder="Enter the full legal address of the property..."
        value={details.propertyAddress || ''}
        onChangeText={(text) => handleChange('propertyAddress', text)}
        error={errors?.propertyAddress}
        multiline
        leftIcon={<Building2 size={18} color="#8E8E93" style={{ marginTop: 2 }} />}
        containerStyle={{ marginBottom: 20 }}
        inputContainerStyle={[
          borderStyle,
          {
            minHeight: 110,
            alignItems: 'flex-start',
            paddingVertical: 14,
            backgroundColor: '#F4F5F8',
          },
        ]}
        inputStyle={{
          textAlignVertical: 'top',
          fontSize: 15,
        }}
      />

      {/* Estimated Property Value Input using CommonInput */}
      <CommonInput
        label="Estimated Property Value"
        required
        placeholder="75,000"
        keyboardType="numeric"
        value={details.estimatedPropertyValue || ''}
        onChangeText={(text) => handleChange('estimatedPropertyValue', text)}
        error={errors?.estimatedPropertyValue}
        leftIcon={<IndianRupee size={18} color="#8E8E93" />}
        containerStyle={{ marginBottom: 20 }}
        inputContainerStyle={[
          borderStyle,
          {
            minHeight: 56,
            backgroundColor: '#F4F5F8',
          },
        ]}
        inputStyle={{
          fontSize: 15,
        }}
      />

      {/* Ownership Status Selection */}
      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 15,
            fontFamily: theme.fonts?.medium || 'Manrope-Medium',
            color: '#1E293B',
            marginBottom: 10,
          }}
        >
          Ownership Status<Text style={{ color: '#EF4444' }}>*</Text>
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
          }}
        >
          {OWNERSHIP_STATUSES.map((status) => (
            <View key={status} style={{ width: '48%' }}>
              <SquareChip
                title={status}
                selected={details.ownershipStatus === status}
                onPress={() => handleChange('ownershipStatus', status)}
                height={48}
                borderRadius={12}
                selectedBackgroundColor="#FCEDD6"
                selectedBorderColor="#FF8C66"
                selectedTextColor="#111827"
                unselectedBackgroundColor="#F4F5F8"
                unselectedBorderColor="transparent"
                unselectedTextColor="#6B7280"
                textStyle={{ fontSize: 14 }}
              />
            </View>
          ))}
        </View>
        {!!errors?.ownershipStatus && (
          <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>
            {errors.ownershipStatus}
          </Text>
        )}
      </View>
    </View>
  );
};

export default PropertyDetails;