// src/screens/LoanDetails/components/RepaymentItem.jsx

import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  ChevronRight,
} from 'lucide-react-native';

import {
  theme,
} from '../../../../theme';


// =====================================================
// REPAYMENT ITEM
// =====================================================

const RepaymentItem = ({
  item,
  isLast,
  onPress,
}) => {

  console.log(
    'Repayment Item:',
    item
  );


  // ===================================================
  // DATA
  // ===================================================

  const {
    installmentNumber,
    dueDate,
    emiAmount,
    status,
    paymentStatus,
    isClosed,
  } = item || {};


  // ===================================================
  // ORDINAL
  // ===================================================

  const getOrdinal = (
    n
  ) => {

    if (!n) {
      return '1st';
    }

    const suffixes = [
      'th',
      'st',
      'nd',
      'rd',
    ];

    const value =
      n % 100;

    return (
      n +
      (
        suffixes[
          (value - 20) % 10
        ] ||
        suffixes[value] ||
        suffixes[0]
      )
    );

  };


  // ===================================================
  // DATE FORMAT
  // ===================================================

  const formatDate = (
    dateStr
  ) => {

    if (!dateStr) {
      return 'N/A';
    }

    const date =
      new Date(
        dateStr
      );

    if (
      isNaN(
        date.getTime()
      )
    ) {

      return dateStr;

    }

    return date.toLocaleDateString(
      'en-GB',
      {
        day:
          '2-digit',

        month:
          'short',

        year:
          'numeric',
      }
    );

  };


  // ===================================================
  // EMI STATUS CONFIG
  //
  // UI MEIN SIRF:
  // DUE
  // OVERDUE
  //
  // SHOW HOGA
  // ===================================================

  const getStatusConfig = () => {

    switch (
      status
    ) {

      // ---------------------------------------------
      // DUE
      // ---------------------------------------------

      case 'DUE':

        return {

          label:
            'Due',

          backgroundColor:
            '#FFF7ED',

          textColor:
            '#EA580C',

        };


      // ---------------------------------------------
      // OVERDUE
      // ---------------------------------------------

      case 'OVERDUE':

        return {

          label:
            'Overdue',

          backgroundColor:
            '#FEE2E2',

          textColor:
            '#DC2626',

        };


      // ---------------------------------------------
      // OTHER
      // ---------------------------------------------

      default:

        return null;

    }

  };


  const statusConfig =
    getStatusConfig();


  // ===================================================
  // PAYMENT STATUS CONFIG
  //
  // UI MEIN SIRF:
  //
  // UNDER_VERIFICATION
  // SUCCESS
  // REJECTED
  //
  // SHOW HOGA
  // ===================================================

  const getPaymentStatusConfig = () => {

    switch (
      paymentStatus
    ) {

      // ---------------------------------------------
      // UNDER VERIFICATION
      // ---------------------------------------------

      case 'UNDER_VERIFICATION':

        return {

          label:
            'Under Verification',

          backgroundColor:
            '#FEF3C7',

          textColor:
            '#B45309',

        };


      // ---------------------------------------------
      // SUCCESS
      // ---------------------------------------------

      case 'SUCCESS':

        return {

          label:
            'Success',

          backgroundColor:
            '#DCFCE7',

          textColor:
            '#15803D',

        };


      // ---------------------------------------------
      // REJECTED
      // ---------------------------------------------

      case 'REJECTED':

        return {

          label:
            'Rejected',

          backgroundColor:
            '#FEE2E2',

          textColor:
            '#DC2626',

        };


      // ---------------------------------------------
      // OTHER PAYMENT STATUS
      // ---------------------------------------------

      default:

        return null;

    }

  };


  const paymentStatusConfig =
    getPaymentStatusConfig();


  // ===================================================
  // CAN MAKE PAYMENT
  //
  // PAYMENT ALLOWED:
  //
  // DUE + NOT_PAID
  // DUE + REJECTED
  //
  // OVERDUE + NOT_PAID
  // OVERDUE + REJECTED
  //
  // PAYMENT BLOCKED:
  //
  // UNDER_VERIFICATION
  // SUCCESS
  // ===================================================

  const canMakePayment =
    (
      status === 'DUE' ||
      status === 'OVERDUE'
    ) &&
    paymentStatus !==
      'UNDER_VERIFICATION' &&
    paymentStatus !==
      'SUCCESS';


  // ===================================================
  // HANDLE PRESS
  // ===================================================

  const handlePress = () => {

    if (
      !canMakePayment
    ) {

      return;

    }

    onPress?.();

  };


  // ===================================================
  // UI
  // ===================================================

  return (

    <TouchableOpacity

      activeOpacity={
        canMakePayment
          ? 0.7
          : 1
      }

      onPress={
        handlePress
      }

      disabled={
        !canMakePayment
      }

      style={{

        flexDirection:
          'row',

        alignItems:
          'center',

        justifyContent:
          'space-between',

        paddingHorizontal:
          16,

        paddingVertical:
          16,

        borderBottomWidth:
          isLast
            ? 0
            : 1,

        borderBottomColor:
          '#F3F4F6',

      }}

    >

      {/* =============================================
          LEFT SIDE
      ============================================== */}

      <View
        style={{
          flex: 1,
        }}
      >

        {/* =========================================
            INSTALLMENT
        ========================================== */}

        <Text
          style={{

            fontSize:
              theme?.typography?.b2 ||
              14,

            fontFamily:
              theme?.fonts?.bold ||
              'Manrope-Bold',

            color:
              '#172B3A',

          }}
        >

          {getOrdinal(
            installmentNumber
          )}

          {' '}

          Installment

        </Text>


        {/* =========================================
            DATE
        ========================================== */}

        <Text
          style={{

            fontSize:
              12,

            fontFamily:
              theme?.fonts?.regular ||
              'Manrope-Regular',

            color:
              '#6D8295',

            marginTop:
              2,

          }}
        >

          {formatDate(
            dueDate
          )}

        </Text>


        {/* =========================================
            STATUS BADGES
        ========================================== */}

        <View
          style={{

            flexDirection:
              'row',

            alignItems:
              'center',

            gap:
              8,

            marginTop:
              8,

            flexWrap:
              'wrap',

          }}
        >

          {/* =======================================
              EMI STATUS
          ======================================== */}

          {statusConfig && (

            <View
              style={{

                backgroundColor:
                  statusConfig.backgroundColor,

                paddingHorizontal:
                  10,

                paddingVertical:
                  4,

                borderRadius:
                  999,

              }}
            >

              <Text
                style={{

                  fontSize:
                    11,

                  fontFamily:
                    theme?.fonts?.bold ||
                    'Manrope-Bold',

                  color:
                    statusConfig.textColor,

                }}
              >

                EMI: {
                  statusConfig.label
                }

              </Text>

            </View>

          )}


          {/* =======================================
              PAYMENT STATUS
          ======================================== */}

          {paymentStatusConfig && (

            <View
              style={{

                backgroundColor:
                  paymentStatusConfig.backgroundColor,

                paddingHorizontal:
                  10,

                paddingVertical:
                  4,

                borderRadius:
                  999,

              }}
            >

              <Text
                style={{

                  fontSize:
                    11,

                  fontFamily:
                    theme?.fonts?.bold ||
                    'Manrope-Bold',

                  color:
                    paymentStatusConfig.textColor,

                }}
              >

                Payment: {
                  paymentStatusConfig.label
                }

              </Text>

            </View>

          )}

        </View>

      </View>


      {/* =============================================
          RIGHT SIDE
      ============================================== */}

      <View
        style={{

          flexDirection:
            'row',

          alignItems:
            'center',

          gap:
            8,

        }}
      >

        {/* =========================================
            EMI AMOUNT
        ========================================== */}

        <Text
          style={{

            fontSize:
              theme?.typography?.b1 ||
              16,

            fontFamily:
              theme?.fonts?.bold ||
              'Manrope-Bold',

            color:
              '#172B3A',

          }}
        >

          ₹
          {(
            Number(
              emiAmount
            ) || 0
          ).toLocaleString(
            'en-IN'
          )}

        </Text>


        {/* =========================================
            PAYMENT ARROW
        ========================================== */}

        {canMakePayment && (

          <ChevronRight
            size={
              18
            }

            color={
              '#2563EB'
            }
          />

        )}

      </View>

    </TouchableOpacity>

  );

};


export default RepaymentItem;