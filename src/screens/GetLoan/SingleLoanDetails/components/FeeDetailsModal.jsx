// src/screens/LoanDetails/components/FeeDetailsModal.jsx

import React, {
  memo,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  theme,
} from '../../../../theme';

import CustomBottomSheet
  from '../../../../components/common/Modal/CustomBottomSheet';


const FeeDetailsModal = ({
  visible,
  onClose,
  feeDetails,
}) => {

  // ==========================================
  // FEE DETAILS
  // ==========================================

  const {
    loanAmount = 0,
    processingFee = 0,
    totalFees = 0,
    disbursalAmount = 0,
  } = feeDetails || {};


  // ==========================================
  // FORMAT AMOUNT
  // ==========================================

  const formatAmount = (amount) => {
    return `₹${Number(amount || 0).toLocaleString('en-IN')}`;
  };


  return (
    <CustomBottomSheet
      visible={visible}
      onClose={onClose}
      heightPercent={0.60}
      sheetBg="#FFFFFF"
      showHeader={true}
      sheetheading="Fee & Charge Breakup"
    >

      {/* ========================================
          CONTENT
      ======================================== */}

      <View
        style={{
          paddingHorizontal: 12,
          paddingTop: 8,
        }}
      >

        {/* ======================================
            APPROVED LOAN AMOUNT
        ====================================== */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
          }}
        >

          <Text
            style={{
              fontSize: 14,

              color:
                theme?.colors?.textSecondary ||
                '#4B5563',

              fontFamily:
                theme?.fonts?.regular ||
                'Manrope-Regular',
            }}
          >
            Approved Loan Amount
          </Text>


          <Text
            style={{
              fontSize: 14,

              fontFamily:
                theme?.fonts?.semiBold ||
                'Manrope-SemiBold',

              color:
                theme?.colors?.navy900 ||
                '#172B3A',
            }}
          >
            {formatAmount(loanAmount)}
          </Text>

        </View>


        {/* ======================================
            PROCESSING FEE
        ====================================== */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 14,
          }}
        >

          <Text
            style={{
              fontSize: 14,

              color:
                theme?.colors?.textSecondary ||
                '#4B5563',

              fontFamily:
                theme?.fonts?.regular ||
                'Manrope-Regular',
            }}
          >
            Processing Fee
          </Text>


          <Text
            style={{
              fontSize: 14,

              fontFamily:
                theme?.fonts?.semiBold ||
                'Manrope-SemiBold',

              color:
                theme?.colors?.navy900 ||
                '#172B3A',
            }}
          >
            {formatAmount(processingFee)}
          </Text>

        </View>


        {/* ======================================
            DOTTED DIVIDER
        ====================================== */}

        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB',
            borderStyle: 'dashed',
            marginVertical: 8,
          }}
        />


        {/* ======================================
            TOTAL DEDUCTIONS
        ====================================== */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 8,
            marginBottom: 14,
          }}
        >

          <Text
            style={{
              fontSize: 15,

              fontFamily:
                theme?.fonts?.bold ||
                'Manrope-Bold',

              color:
                theme?.colors?.navy900 ||
                '#172B3A',
            }}
          >
            Total Deductions
          </Text>


          <Text
            style={{
              fontSize: 15,

              fontFamily:
                theme?.fonts?.bold ||
                'Manrope-Bold',

              color:
                theme?.colors?.error ||
                '#EF4444',
            }}
          >
            - {formatAmount(totalFees)}
          </Text>

        </View>


        {/* ======================================
            NET DISBURSED AMOUNT
        ====================================== */}

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 4,
          }}
        >

          <Text
            style={{
              fontSize: 15,

              fontFamily:
                theme?.fonts?.bold ||
                'Manrope-Bold',

              color:
                theme?.colors?.navy900 ||
                '#172B3A',
            }}
          >
            Net Disbursed Amount
          </Text>


          <Text
            style={{
              fontSize: 15,

              fontFamily:
                theme?.fonts?.bold ||
                'Manrope-Bold',

              color:
                theme?.colors?.success ||
                '#22C55E',
            }}
          >
            {formatAmount(disbursalAmount)}
          </Text>

        </View>


        {/* ======================================
            GOT IT BUTTON
        ====================================== */}

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onClose}
          style={{
            height: 52,

            backgroundColor:
              theme?.colors?.primary500 ||
              '#F47C2C',

            borderRadius:
              theme?.radius?.md ||
              12,

            justifyContent: 'center',
            alignItems: 'center',

            marginTop: 22,
          }}
        >

          <Text
            style={{
              fontSize: 16,

              fontFamily:
                theme?.fonts?.bold ||
                'Manrope-Bold',

              color:
                theme?.colors?.white ||
                '#FFFFFF',
            }}
          >
            Got It
          </Text>

        </TouchableOpacity>

      </View>

    </CustomBottomSheet>
  );
};


export default memo(FeeDetailsModal);