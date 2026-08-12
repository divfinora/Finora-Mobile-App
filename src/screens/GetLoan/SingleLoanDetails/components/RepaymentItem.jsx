// src/screens/LoanDetails/components/RepaymentItem.jsx

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { theme } from '../../../../theme';

const RepaymentItem = ({ item, isLast, onPress }) => {
  const { installmentNumber, dueDate, emiAmount } = item || {};

  // Convert number to ordinal (1 -> 1st, 2 -> 2nd, 3 -> 3rd)
  const getOrdinal = (n) => {
    if (!n) return '1st';
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  // Format ISO Date string "2026-07-12T00:00:00.000Z" to "12 Jul 2026"
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomColor: '#F3F4F6',
      }}
    >
      <View>
        <Text style={{ fontSize: theme?.typography?.b2 || 14, fontFamily: theme?.fonts?.bold || 'Manrope-Bold', color: '#172B3A' }}>
          {getOrdinal(installmentNumber)} Installment
        </Text>
        <Text style={{ fontSize: 12, fontFamily: theme?.fonts?.regular || 'Manrope-Regular', color: '#6D8295', marginTop: 2 }}>
          {formatDate(dueDate)}
        </Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={{ fontSize: theme?.typography?.b1 || 16, fontFamily: theme?.fonts?.bold || 'Manrope-Bold', color: '#172B3A' }}>
          ₹{(emiAmount || 0).toLocaleString('en-IN')}
        </Text>
        <ChevronRight size={18} color="#2563EB" />
      </View>
    </TouchableOpacity>
  );
};

export default RepaymentItem;