// src/screens/LoanDetails/components/TotalPaidFooter.jsx

import React from 'react';
import { View, Text } from 'react-native';
import { theme } from '../../../../theme';

const TotalPaidFooter = ({ totalPaidAmount = 0, status = 'Active' }) => {
  return (
    <View
      style={{
        marginTop: theme?.spacing?.xl || 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: '#D1D5DB',
        borderStyle: 'dashed',
        padding: 16,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <Text style={{ fontSize: theme?.typography?.b1 || 16, fontFamily: theme?.fonts?.medium || 'Manrope-Medium', color: '#25384D' }}>
          Total Amount Paid
        </Text>
        <Text style={{ fontSize: 24, fontFamily: theme?.fonts?.bold || 'Manrope-Bold', color: '#172B3A' }}>
          ₹{totalPaidAmount.toLocaleString('en-IN')}
        </Text>
      </View>

      <View
        style={{
          alignSelf: 'flex-start',
          backgroundColor: '#FFEED5',
          paddingHorizontal: 16,
          paddingVertical: 6,
          borderRadius: 999,
        }}
      >
        <Text style={{ fontSize: 12, fontFamily: theme?.fonts?.bold || 'Manrope-Bold', color: '#C85A14' }}>
          {status}
        </Text>
      </View>
    </View>
  );
};

export default TotalPaidFooter;