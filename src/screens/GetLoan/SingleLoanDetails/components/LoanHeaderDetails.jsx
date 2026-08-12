// src/screens/LoanDetails/components/LoanHeaderDetails.jsx

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../../../../theme';

const LoanHeaderDetails = ({ loanDetails, bankDetails, onOpenFeeModal }) => {
  return (
    <View style={{ marginBottom: theme?.spacing?.xl || 20, paddingTop: theme?.spacing?.sm || 8 }}>
      {/* Loan Ref No */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <Text style={{ fontSize: theme?.typography?.b2 || 14, fontFamily: theme?.fonts?.medium || 'Manrope-Medium', color: '#6D8295' }}>
          Loan Ref no.
        </Text>
        <Text style={{ fontSize: theme?.typography?.b2 || 14, fontFamily: theme?.fonts?.bold || 'Manrope-Bold', color: '#172B3A' }}>
          {loanDetails?.loanRefNo || loanDetails?.loanNumber || 'N/A'}
        </Text>
      </View>

      {/* Approved Amount */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <Text style={{ fontSize: theme?.typography?.b2 || 14, fontFamily: theme?.fonts?.medium || 'Manrope-Medium', color: '#6D8295' }}>
          Approved Amount
        </Text>
        <Text style={{ fontSize: 20, fontFamily: theme?.fonts?.bold || 'Manrope-Bold', color: '#172B3A' }}>
          ₹{(loanDetails?.approvedAmount || 0).toLocaleString('en-IN')}
        </Text>
      </View>

      {/* Disbursement Amount */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <Text style={{ fontSize: theme?.typography?.b2 || 14, fontFamily: theme?.fonts?.medium || 'Manrope-Medium', color: '#6D8295' }}>
          Disbursement Amount
        </Text>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 20, fontFamily: theme?.fonts?.bold || 'Manrope-Bold', color: '#172B3A' }}>
            ₹{(loanDetails?.disbursementAmount || 0).toLocaleString('en-IN')}
          </Text>
          {bankDetails?.accountHolderName && (
            <Text style={{ fontSize: 11, fontFamily: theme?.fonts?.regular || 'Manrope-Regular', color: '#6D8295', textAlign: 'right', marginTop: 2 }}>
              Transfer to {bankDetails?.accountHolderName}
            </Text>
          )}
          <Text style={{ fontSize: 11, fontFamily: theme?.fonts?.regular || 'Manrope-Regular', color: '#6D8295', textAlign: 'right' }}>
            A/c {bankDetails?.accountNumber || 'N/A'}
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={onOpenFeeModal} style={{ marginTop: 4 }}>
            <Text style={{ fontSize: 12, fontFamily: theme?.fonts?.semiBold || 'Manrope-SemiBold', color: '#2563EB' }}>
              View Fee Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Interest Rate */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <View>
          <Text style={{ fontSize: theme?.typography?.b2 || 14, fontFamily: theme?.fonts?.medium || 'Manrope-Medium', color: '#6D8295' }}>
            Interest Rate
          </Text>
          <Text style={{ fontSize: 11, fontFamily: theme?.fonts?.regular || 'Manrope-Regular', color: '#6D8295' }}>
            Annualised Interest Rate
          </Text>
        </View>
        <Text style={{ fontSize: theme?.typography?.b1 || 16, fontFamily: theme?.fonts?.bold || 'Manrope-Bold', color: '#172B3A' }}>
          {loanDetails?.interestRate ? `${loanDetails.interestRate}.00%` : '0.00%'}
        </Text>
      </View>

      {/* Tenure */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <Text style={{ fontSize: theme?.typography?.b2 || 14, fontFamily: theme?.fonts?.medium || 'Manrope-Medium', color: '#6D8295' }}>
          Tenure*
        </Text>
        <Text style={{ fontSize: theme?.typography?.b1 || 16, fontFamily: theme?.fonts?.bold || 'Manrope-Bold', color: '#172B3A' }}>
          {loanDetails?.tenure ? `${loanDetails.tenure} Months` : 'N/A'}
        </Text>
      </View>

      {/* Repayment Schedule Title */}
      <Text
        style={{
          fontSize: theme?.typography?.b1 || 16,
          fontFamily: theme?.fonts?.bold || 'Sora-Bold',
          color: '#172B3A',
          letterSpacing: 0.5,
        }}
      >
        REPAYMENT SCHEDULE
      </Text>
    </View>
  );
};

export default LoanHeaderDetails;