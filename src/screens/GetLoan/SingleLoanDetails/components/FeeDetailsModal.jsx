// src/screens/LoanDetails/components/FeeDetailsModal.jsx

import React from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { X, Info } from 'lucide-react-native';
import { theme } from '../../../../theme';

const FeeDetailsModal = ({ visible, onClose, feeDetails }) => {
  const {
    loanAmount = 0,
    processingFee = 0,
    totalFees = 0,
    disbursalAmount = 0,
  } = feeDetails || {};

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(17,24,39,0.45)',
            justifyContent: 'flex-end',
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                padding: 24,
              }}
            >
              {/* Header */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Info size={20} color={theme?.colors?.primary500 || '#F47C2C'} />
                  <Text style={{ fontSize: 18, fontFamily: theme?.fonts?.bold || 'Manrope-Bold', color: '#172B3A' }}>
                    Fee & Charge Breakup
                  </Text>
                </View>

                <TouchableOpacity activeOpacity={0.7} onPress={onClose} style={{ padding: 4 }}>
                  <X size={22} color="#4B5563" />
                </TouchableOpacity>
              </View>

              {/* Rows */}
              <View style={{ gap: 12 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 14, color: '#4B5563', fontFamily: theme?.fonts?.regular || 'Manrope-Regular' }}>
                    Approved Loan Amount
                  </Text>
                  <Text style={{ fontSize: 14, fontFamily: theme?.fonts?.semiBold || 'Manrope-SemiBold', color: '#172B3A' }}>
                    ₹{loanAmount.toLocaleString('en-IN')}
                  </Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={{ fontSize: 14, color: '#4B5563', fontFamily: theme?.fonts?.regular || 'Manrope-Regular' }}>
                    Processing Fee
                  </Text>
                  <Text style={{ fontSize: 14, fontFamily: theme?.fonts?.semiBold || 'Manrope-SemiBold', color: '#172B3A' }}>
                    ₹{processingFee.toLocaleString('en-IN')}
                  </Text>
                </View>

                {/* Total Deducted */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 8,
                    paddingTop: 12,
                    borderTopWidth: 1,
                    borderTopColor: '#E5E7EB',
                  }}
                >
                  <Text style={{ fontSize: 15, fontFamily: theme?.fonts?.bold || 'Manrope-Bold', color: '#172B3A' }}>
                    Total Deductions
                  </Text>
                  <Text style={{ fontSize: 15, fontFamily: theme?.fonts?.bold || 'Manrope-Bold', color: '#EF4444' }}>
                    - ₹{totalFees.toLocaleString('en-IN')}
                  </Text>
                </View>

                {/* Disbursed Amount */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingTop: 8,
                  }}
                >
                  <Text style={{ fontSize: 15, fontFamily: theme?.fonts?.bold || 'Manrope-Bold', color: '#172B3A' }}>
                    Net Disbursed Amount
                  </Text>
                  <Text style={{ fontSize: 15, fontFamily: theme?.fonts?.bold || 'Manrope-Bold', color: '#22C55E' }}>
                    ₹{disbursalAmount.toLocaleString('en-IN')}
                  </Text>
                </View>
              </View>

              {/* Close Button */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onClose}
                style={{
                  height: 52,
                  backgroundColor: theme?.colors?.primary500 || '#F47C2C',
                  borderRadius: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 24,
                }}
              >
                <Text style={{ fontSize: 16, fontFamily: theme?.fonts?.bold || 'Manrope-Bold', color: '#FFFFFF' }}>
                  Got It
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default FeeDetailsModal;