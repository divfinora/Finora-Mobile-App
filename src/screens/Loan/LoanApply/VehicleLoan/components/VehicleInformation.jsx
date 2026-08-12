import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { Car } from 'lucide-react-native';

// Common Components
import CommonInput from '../../../../../components/common/Input/CommonInput';
import SquareChip from '../../../../../components/common/Input/SquareChip';
import { theme } from '../../../../../theme';

const borderStyle = {
  borderWidth: 0.3,
  borderColor: '#48484a58',
};

const VehicleInformation = ({ formData = {}, setFormData, errors = {}, setErrors }) => {
  const [showBrandModal, setShowBrandModal] = useState(false);

  // Dummy data for Brand & Model
  const brandModels = [
    'Hyundai Creta 1.5 SX',
    'Hyundai i20 Asta',
    'Maruti Suzuki Swift VXI',
    'Toyota Fortuner 4x4',
    'Honda City ZX',
    'Tata Nexon XZ+',
    'Mahindra Scorpio N',
    'Kia Seltos GTX',
    'Volkswagen Taigun',
    'Skoda Kushaq',
  ];

  // Form values with fallback matching screenshot state
  const vehicleType = formData?.vehicleType || 'Car';
  const vehicleCondition = formData?.vehicleCondition || 'New';
  const brandModel = formData?.brandModel || '';
  const onRoadPrice = formData?.onRoadPrice || '';

  // Update field function
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors?.[field] && setErrors) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  return (
    <View
      style={{
        marginTop: theme.spacing?.md || 16,
        marginBottom: theme.spacing?.xl || 24,
      }}
    >
      {/* Vehicle Type */}
      <View style={{ marginBottom: theme.spacing?.lg || 20 }}>
        <Text
          style={{
            fontSize: theme.typography?.b2 || 14,
            fontFamily: theme.fonts?.medium || 'Manrope-Medium',
            color: theme.colors?.gray700 || '#334155',
            marginBottom: theme.spacing?.sm || 8,
          }}
        >
          Vehicle Type*
        </Text>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          {['Car', 'Commercial', 'Bike'].map((type) => (
            <SquareChip
              key={type}
              title={type}
              selected={vehicleType === type}
              onPress={() => updateField('vehicleType', type)}
              height={48}
              borderRadius={12}
              borderWidth={1}
              selectedBackgroundColor="#FFF0E6"
              selectedBorderColor={theme.colors?.primary500 || '#F47C2C'}
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
              fontSize: theme.typography?.b3 || 12,
              color: theme.colors?.error || '#EF4444',
              fontFamily: theme.fonts?.medium || 'Manrope-Medium',
            }}
          >
            {errors.vehicleType}
          </Text>
        )}
      </View>

      {/* Vehicle Condition */}
      <View style={{ marginBottom: theme.spacing?.lg || 20 }}>
        <Text
          style={{
            fontSize: theme.typography?.b2 || 14,
            fontFamily: theme.fonts?.medium || 'Manrope-Medium',
            color: theme.colors?.gray700 || '#334155',
            marginBottom: theme.spacing?.sm || 8,
          }}
        >
          Vehicle Condition*
        </Text>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          {['New', 'Used'].map((condition) => (
            <SquareChip
              key={condition}
              title={condition}
              selected={vehicleCondition === condition}
              onPress={() => updateField('vehicleCondition', condition)}
              height={48}
              borderRadius={12}
              borderWidth={1}
              style={{ flex: 0.33 }}
              selectedBackgroundColor="#FFF0E6"
              selectedBorderColor={theme.colors?.primary500 || '#F47C2C'}
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
              fontSize: theme.typography?.b3 || 12,
              color: theme.colors?.error || '#EF4444',
              fontFamily: theme.fonts?.medium || 'Manrope-Medium',
            }}
          >
            {errors.vehicleCondition}
          </Text>
        )}
      </View>

      {/* Brand & Model - Custom Dropdown */}
      <View style={{ marginBottom: theme.spacing?.lg || 20 }}>
        <Text
          style={{
            fontSize: theme.typography?.b2 || 14,
            fontFamily: theme.fonts?.medium || 'Manrope-Medium',
            color: theme.colors?.gray700 || '#334155',
            marginBottom: theme.spacing?.sm || 8,
          }}
        >
          Brand & Model*
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 16,
            paddingHorizontal: theme.spacing?.md || 16,
            minHeight: 56,
            backgroundColor: '#F4F5F8',
            ...borderStyle,
          }}
          onPress={() => setShowBrandModal(true)}
        >
          <Car
            size={20}
            color={theme.colors?.gray400 || '#9CA3AF'}
            style={{ marginRight: 12 }}
          />
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontFamily: theme.fonts?.medium || 'Manrope-Medium',
              color: brandModel
                ? (theme.colors?.black || '#111827')
                : (theme.colors?.gray400 || '#9CA3AF'),
            }}
          >
            {brandModel || 'Hyundai Creta 1.5 SX'}
          </Text>
        </TouchableOpacity>

        {errors?.brandModel && (
          <Text
            style={{
              marginTop: 4,
              fontSize: 12,
              color: theme.colors?.error || '#EF4444',
              fontFamily: theme.fonts?.medium || 'Manrope-Medium',
            }}
          >
            {errors.brandModel}
          </Text>
        )}
      </View>

      {/* On-Road Price - Using CommonInput */}
      <CommonInput
        label="On-Road Price*"
        placeholder="75,000"
        value={onRoadPrice}
        onChangeText={(text) => updateField('onRoadPrice', text)}
        keyboardType="numeric"
        error={errors?.onRoadPrice}
        required={true}
        leftIcon={
          <Text
            style={{
              fontSize: 18,
              fontFamily: theme.fonts?.medium || 'Manrope-Medium',
              color: theme.colors?.gray400 || '#9CA3AF',
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

      {/* Brand & Model Selection Modal */}
      <Modal
        visible={showBrandModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBrandModal(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors?.white || '#FFFFFF',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: theme.spacing?.xl || 20,
              maxHeight: '60%',
            }}
          >
            <Text
              style={{
                fontSize: theme.typography?.h4 || 18,
                fontFamily: theme.fonts?.bold || 'Manrope-Bold',
                color: theme.colors?.gray900 || '#1F2937',
                marginBottom: theme.spacing?.md || 12,
                textAlign: 'center',
              }}
            >
              Select Brand & Model
            </Text>

            <FlatList
              data={brandModels}
              keyExtractor={(item) => item}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    paddingVertical: theme.spacing?.sm || 12,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors?.gray200 || '#E5E7EB',
                  }}
                  onPress={() => {
                    updateField('brandModel', item);
                    setShowBrandModal(false);
                  }}
                >
                  <Text
                    style={{
                      fontSize: theme.typography?.b2 || 14,
                      fontFamily: theme.fonts?.medium || 'Manrope-Medium',
                      color: theme.colors?.gray700 || '#4B5563',
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={{
                marginTop: theme.spacing?.md || 12,
                alignItems: 'center',
                paddingVertical: theme.spacing?.sm || 12,
                backgroundColor: theme.colors?.gray100 || '#F3F4F6',
                borderRadius: 16,
              }}
              onPress={() => setShowBrandModal(false)}
            >
              <Text
                style={{
                  fontSize: theme.typography?.b2 || 14,
                  fontFamily: theme.fonts?.medium || 'Manrope-Medium',
                  color: theme.colors?.gray700 || '#4B5563',
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default VehicleInformation;