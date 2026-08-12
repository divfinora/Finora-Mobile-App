// src/screens/LoanDetails/components/BottomActionButtons.jsx

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../../../theme';

const BottomActionButtons = ({ onMakePayment, onForeclose }) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor:   '#ffffff',
        paddingHorizontal: theme?.screen?.horizontalPadding || 20,
        paddingTop: 12,
        paddingBottom: 20,
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onMakePayment}
        style={{
          width: '100%',
          height: theme?.button?.height || 56,
          backgroundColor: theme?.colors?.primary500 || '#F47C2C',
          borderRadius: theme?.button?.borderRadius || 16,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontSize: theme?.button?.fontSize || 16,
            fontFamily: theme?.fonts?.bold || 'Manrope-Bold',
            color: '#FFFFFF',
          }}
        >
          Make Payment
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onForeclose}
        style={{ marginTop: 14, alignItems: 'center' }}
      >
        <Text
          style={{
            fontSize: theme?.typography?.b2 || 14,
            fontFamily: theme?.fonts?.bold || 'Manrope-Bold',
            color: theme?.colors?.primary500 || '#F47C2C',
          }}
        >
          Foreclose Loan
        </Text>
        <Text
          style={{
            fontSize: 11,
            fontFamily: theme?.fonts?.regular || 'Manrope-Regular',
            color: '#6D8295',
            marginTop: 2,
          }}
        >
          Foreclose charges applicable
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomActionButtons;