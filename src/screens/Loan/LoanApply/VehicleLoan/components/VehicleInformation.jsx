import React from 'react';

import {
  View,
  Text,
} from 'react-native';

// Common Components
import CommonInput from '../../../../../components/common/Input/CommonInput';
import SquareChip from '../../../../../components/common/Input/SquareChip';

import { theme } from '../../../../../theme';

const borderStyle = {
  borderWidth: 0.3,
  borderColor: '#48484a58',
};

const VehicleInformation = ({
  formData = {},
  setFormData,
  errors = {},
  setErrors,
}) => {
  // Form values
  const vehicleType = formData?.vehicleType || '';
  const vehicleCondition = formData?.vehicleCondition || '';
  const brandModel = formData?.brandModel || '';
  const onRoadPrice = formData?.onRoadPrice || '';

  // Update field
  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors?.[field] && setErrors) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  return (
    <View
      style={{
        marginTop: theme.spacing?.md || 16,
        marginBottom: theme.spacing?.xl || 24,
      }}
    >
      {/* ========================================= */}
      {/* Vehicle Type */}
      {/* ========================================= */}

      <View
        style={{
          marginBottom: theme.spacing?.lg || 20,
        }}
      >
        <Text
          style={{
            fontSize: theme.typography?.b2 || 14,
            fontFamily:
              theme.fonts?.medium || 'Manrope-Medium',
            color:
              theme.colors?.gray700 || '#334155',
            marginBottom: theme.spacing?.sm || 8,
          }}
        >
          Vehicle Type*
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}
        >
          {['Car', 'Commercial', 'Bike'].map((type) => (
            <SquareChip
              key={type}
              title={type}
              selected={vehicleType === type}
              onPress={() =>
                updateField('vehicleType', type)
              }
              height={48}
              borderRadius={12}
              borderWidth={1}
              selectedBackgroundColor="#FFF0E6"
              selectedBorderColor={
                theme.colors?.primary500 || '#F47C2C'
              }
              selectedTextColor="#111827"
              unselectedBackgroundColor="#F4F5F8"
              unselectedTextColor="#6B7280"
              unselectedBorderColor="transparent"
            />
          ))}
        </View>

        {errors?.vehicleType && (
          <Text
            style={{
              marginTop: 4,
              fontSize:
                theme.typography?.b3 || 12,
              color:
                theme.colors?.error || '#EF4444',
              fontFamily:
                theme.fonts?.medium ||
                'Manrope-Medium',
            }}
          >
            {errors.vehicleType}
          </Text>
        )}
      </View>

      {/* ========================================= */}
      {/* Vehicle Condition */}
      {/* ========================================= */}

      <View
        style={{
          marginBottom: theme.spacing?.lg || 20,
        }}
      >
        <Text
          style={{
            fontSize: theme.typography?.b2 || 14,
            fontFamily:
              theme.fonts?.medium || 'Manrope-Medium',
            color:
              theme.colors?.gray700 || '#334155',
            marginBottom: theme.spacing?.sm || 8,
          }}
        >
          Vehicle Condition*
        </Text>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
          }}
        >
          {['New', 'Used'].map((condition) => (
            <SquareChip
              key={condition}
              title={condition}
              selected={
                vehicleCondition === condition
              }
              onPress={() =>
                updateField(
                  'vehicleCondition',
                  condition,
                )
              }
              height={48}
              borderRadius={12}
              borderWidth={1}
              style={{
                flex: 0.33,
              }}
              selectedBackgroundColor="#FFF0E6"
              selectedBorderColor={
                theme.colors?.primary500 || '#F47C2C'
              }
              selectedTextColor="#111827"
              unselectedBackgroundColor="#F4F5F8"
              unselectedTextColor="#6B7280"
              unselectedBorderColor="transparent"
            />
          ))}
        </View>

        {errors?.vehicleCondition && (
          <Text
            style={{
              marginTop: 4,
              fontSize:
                theme.typography?.b3 || 12,
              color:
                theme.colors?.error || '#EF4444',
              fontFamily:
                theme.fonts?.medium ||
                'Manrope-Medium',
            }}
          >
            {errors.vehicleCondition}
          </Text>
        )}
      </View>

      {/* ========================================= */}
      {/* Brand & Model - Manual Input */}
      {/* ========================================= */}

      <View
        style={{
          marginBottom: theme.spacing?.lg || 20,
        }}
      >
        <CommonInput
          label="Brand & Model"
          placeholder="Enter brand & model"
          value={brandModel}
          onChangeText={(text) =>
            updateField('brandModel', text)
          }
          error={errors?.brandModel}
          required={true}
          containerStyle={{
            marginBottom: 0,
          }}
          inputContainerStyle={{
            backgroundColor: '#F4F5F8',
            ...borderStyle,
          }}
        />
      </View>

      {/* ========================================= */}
      {/* On-Road Price */}
      {/* ========================================= */}

      <CommonInput
        label="On-Road Price"
        placeholder="75,000"
        value={onRoadPrice}
        onChangeText={(text) =>
          updateField('onRoadPrice', text)
        }
        keyboardType="numeric"
        error={errors?.onRoadPrice}
        required={true}
        leftIcon={
          <Text
            style={{
              fontSize: 18,
              fontFamily:
                theme.fonts?.medium ||
                'Manrope-Medium',
              color:
                theme.colors?.gray400 || '#9CA3AF',
              marginRight: 6,
            }}
          >
            ₹
          </Text>
        }
        containerStyle={{
          marginBottom: 0,
        }}
        inputContainerStyle={{
          backgroundColor: '#F4F5F8',
          ...borderStyle,
        }}
      />
    </View>
  );
};

export default VehicleInformation;