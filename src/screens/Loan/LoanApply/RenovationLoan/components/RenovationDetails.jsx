// components/RenovationDetails.jsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  ChefHat,
  Bath,
  Home,
  Lamp,
  Sun,
  PlusCircle,
  DollarSign,
  Info,
} from 'lucide-react-native';

import { theme } from '../../../../../theme';
import CommonInput from '../../../../../components/common/Input/CommonInput';
 

const RENOVATION_TYPES = [
  { id: 'Kitchen', label: 'Kitchen', Icon: ChefHat },
  { id: 'Bathroom', label: 'Bathroom', Icon: Bath },
  { id: 'Roofing', label: 'Roofing', Icon: Home },
  { id: 'Interior', label: 'Interior', Icon: Lamp },
  { id: 'Exterior', label: 'Exterior', Icon: Sun },
  { id: 'Other', label: 'Other', Icon: PlusCircle },
];

const TIMELINE_OPTIONS = [
  'Less than 3 months',
  '3 to 6 months',
  '6 to 12 months',
  'Over 1 year',
];

const borderStyle = {
  borderWidth: 0.3,
  borderColor: '#48484a58',
};

const RenovationDetails = ({ formData = {}, setFormData, errors = {}, setErrors }) => {
  const details = formData?.renovationDetails || {};

  const handleChange = (field, value) => {
    setFormData?.((prev) => ({
      ...prev,
      renovationDetails: {
        ...(prev.renovationDetails || {}),
        [field]: value,
      },
    }));

    if (errors?.[field] && setErrors) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const selectedType = details.renovationType || 'Bathroom';
  const selectedTimeline = details.timeline || '3 to 6 months';

  return (
    <View style={{ marginTop: 12, gap: 16 }}>
      {/* 1. Renovation Type Section */}
      <View
        style={[
          borderStyle,
          {
            backgroundColor: '#F8FAFC',
            borderRadius: 16,
            padding: 16,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 15,
            fontFamily: theme.fonts?.bold || 'Manrope-Bold',
            color: '#1E293B',
            marginBottom: 14,
          }}
        >
          Renovation Type
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: 12,
          }}
        >
          {RENOVATION_TYPES.map(({ id, label, Icon }) => {
            const isSelected = selectedType === id;
            return (
              <TouchableOpacity
                key={id}
                activeOpacity={0.8}
                onPress={() => handleChange('renovationType', id)}
                style={{
                  width: '48%',
                  height: 84,
                  borderRadius: 12,
                  borderWidth: 1.5,
                  borderColor: isSelected ? '#FF8C66' : '#E2E8F0',
                  backgroundColor: isSelected ? '#FCEDD6' : '#FFFFFF',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Icon size={22} color={isSelected ? '#FF7A45' : '#475569'} />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: isSelected
                      ? theme.fonts?.bold || 'Manrope-Bold'
                      : theme.fonts?.medium || 'Manrope-Medium',
                    color: '#1E293B',
                  }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {!!errors?.renovationType && (
          <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 6 }}>
            {errors.renovationType}
          </Text>
        )}
      </View>

      {/* 2. Estimated Cost Section */}
      <View
        style={[
          borderStyle,
          {
            backgroundColor: '#F8FAFC',
            borderRadius: 16,
            padding: 16,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 15,
            fontFamily: theme.fonts?.bold || 'Manrope-Bold',
            color: '#1E293B',
            marginBottom: 10,
          }}
        >
          Estimated Cost
        </Text>

        <CommonInput
          placeholder="0.00"
          keyboardType="numeric"
          value={details.estimatedCost || ''}
          onChangeText={(text) => handleChange('estimatedCost', text)}
          error={errors?.estimatedCost}
          leftIcon={<DollarSign size={18} color="#8E8E93" />}
          containerStyle={{ marginBottom: 0 }}
          inputContainerStyle={[
            borderStyle,
            {
              backgroundColor: '#FFFFFF',
              minHeight: 52,
              borderRadius: 12,
            },
          ]}
          inputStyle={{
            fontSize: 15,
          }}
        />

        <Text
          style={{
            fontSize: 13,
            fontFamily: theme.fonts?.regular || 'Manrope-Regular',
            color: '#94A3B8',
            marginTop: 10,
          }}
        >
          Recommended range for {selectedType}:{' '}
          <Text style={{ fontFamily: theme.fonts?.bold || 'Manrope-Bold', color: '#1E293B' }}>
            $15k - $35k
          </Text>
        </Text>
      </View>

      {/* 3. Contractor Details Section */}
      <View
        style={[
          borderStyle,
          {
            backgroundColor: '#F8FAFC',
            borderRadius: 16,
            padding: 16,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 15,
            fontFamily: theme.fonts?.bold || 'Manrope-Bold',
            color: '#1E293B',
            marginBottom: 10,
          }}
        >
          Contractor Details
        </Text>

        <CommonInput
          placeholder="Enter company name, license number, and primary contact information..."
          multiline
          value={details.contractorDetails || ''}
          onChangeText={(text) => handleChange('contractorDetails', text)}
          error={errors?.contractorDetails}
          containerStyle={{ marginBottom: 0 }}
          inputContainerStyle={[
            borderStyle,
            {
              backgroundColor: '#FFFFFF',
              minHeight: 90,
              borderRadius: 12,
              alignItems: 'flex-start',
              paddingVertical: 12,
            },
          ]}
          inputStyle={{
            textAlignVertical: 'top',
            fontSize: 14,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            gap: 6,
          }}
        >
          <Info size={14} color="#94A3B8" />
          <Text
            style={{
              fontSize: 12,
              fontFamily: theme.fonts?.regular || 'Manrope-Regular',
              color: '#94A3B8',
              flex: 1,
            }}
          >
            Include details for all subcontractors if applicable.
          </Text>
        </View>
      </View>

      {/* 4. Renovation Timeline Section */}
      <View
        style={[
          borderStyle,
          {
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 16,
          },
        ]}
      >
        <Text
          style={{
            fontSize: 15,
            fontFamily: theme.fonts?.bold || 'Manrope-Bold',
            color: '#1E293B',
            marginBottom: 12,
          }}
        >
          Renovation Timeline
        </Text>

        <View style={{ gap: 10 }}>
          {TIMELINE_OPTIONS.map((option) => {
            const isSelected = selectedTimeline === option;
            return (
              <TouchableOpacity
                key={option}
                activeOpacity={0.8}
                onPress={() => handleChange('timeline', option)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 14,
                  paddingHorizontal: 16,
                  borderRadius: 12,
                  borderWidth: isSelected ? 1.5 : 1,
                  borderColor: isSelected ? '#FF8C66' : '#E2E8F0',
                  backgroundColor: isSelected ? '#FCEDD6' : '#FFFFFF',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: isSelected
                      ? theme.fonts?.bold || 'Manrope-Bold'
                      : theme.fonts?.medium || 'Manrope-Medium',
                    color: '#1E293B',
                  }}
                >
                  {option}
                </Text>

                {/* Custom Radio Button Indicator */}
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    borderWidth: isSelected ? 6 : 2,
                    borderColor: isSelected ? '#FF7A45' : '#CBD5E1',
                    backgroundColor: '#FFFFFF',
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
        {!!errors?.timeline && (
          <Text style={{ color: '#EF4444', fontSize: 12, marginTop: 4 }}>
            {errors.timeline}
          </Text>
        )}
      </View>
    </View>
  );
};

export default RenovationDetails;