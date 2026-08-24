import React, { memo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  ChevronDown,
  ChevronUp,
} from 'lucide-react-native';

import { theme } from '../../../../theme';


const MYLoanCard = ({
  item,
  onPressSeeMore,
}) => {
  const [expanded, setExpanded] = useState(false);

  // ============================================
  // DATA
  // ============================================

  const approvedAmount =
    item?.approvedAmount ??
    item?.disbursedAmount ??
    item?.outstandingAmount ??
    0;

  const emiAmount =
    item?.emiAmount ??
    item?.nextEMI?.emiAmount ??
    0;

  const productName =
    item?.productName || 'Personal Loan';

  const statusRaw =
    item?.status || 'ACTIVE';

  const status =
    statusRaw.charAt(0).toUpperCase() +
    statusRaw.slice(1).toLowerCase();


  // ============================================
  // FORMAT AMOUNT
  // ============================================

  const formatAmount = (amount) => {
    return `₹${Number(amount || 0).toLocaleString('en-IN')}`;
  };


  // ============================================
  // TOGGLE EXPANDED
  // ============================================

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  };


  // ============================================
  // VIEW DETAILS
  // ============================================

  const handleViewDetails = () => {
    onPressSeeMore?.(item);
  };


  return (
    <View
      style={{
        ...theme.card.loan,
        marginBottom: theme.spacing.md,
      }}
    >

      {/* ========================================
          TOP ROW
      ======================================== */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >

        {/* LEFT SIDE */}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginRight: theme.spacing.sm,
          }}
        >

          {/* AVATAR */}

          <View
            style={{
              width: theme.avatar.sm,
              height: theme.avatar.sm,
              borderRadius: theme.avatar.sm / 2,
              backgroundColor: theme.colors.navy900,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: theme.spacing.sm,
            }}
          >
            <Text
              style={{
                color: theme.colors.white,
                fontSize: theme.typography.b3,
                fontFamily: theme.fonts.bold,
              }}
            >
              kk
            </Text>
          </View>


          {/* LOAN NAME */}

          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: theme.typography.b1,
              fontFamily: theme.fonts.headingBold,
              color: theme.colors.text,
            }}
          >
            {productName} 
          </Text>

        </View>


        {/* STATUS */}

        <View
          style={{
            backgroundColor: '#FCEDD6',
            paddingVertical: theme.spacing.xs,
            paddingHorizontal: theme.spacing.md,
            borderRadius: theme.radius.sm,
          }}
        >
          <Text
            style={{
              fontSize: theme.typography.b3,
              fontFamily: theme.fonts.medium,
              color: theme.colors.primary500,
            }}
          >
            {status}
          </Text>
        </View>

      </View>


      {/* ========================================
          AMOUNT + SEE MORE
      ======================================== */}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginTop: theme.spacing.lg,
        }}
      >

        {/* AMOUNT */}

        <Text
          style={{
            fontSize: 26,
            fontFamily: theme.fonts.bold,
            color: theme.colors.text,
            letterSpacing: theme.letterSpacing.xs,
          }}
        >
          {formatAmount(approvedAmount)}
        </Text>


        {/* SEE MORE / SHOW LESS */}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleToggle}
          hitSlop={{
            top: theme.hitSlop.sm,
            bottom: theme.hitSlop.sm,
            left: theme.hitSlop.sm,
            right: theme.hitSlop.sm,
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 2,
          }}
        >

          <Text
            style={{
              fontSize: theme.typography.b2,
              fontFamily: theme.fonts.bold,
              color: '#2563EB',
              marginRight: theme.spacing.xs,
            }}
          >
            {expanded ? 'Show Less' : 'See More'}
          </Text>


          {expanded ? (
            <ChevronUp
              size={theme.iconSize.xs}
              color="#2563EB"
              strokeWidth={2}
            />
          ) : (
            <ChevronDown
              size={theme.iconSize.xs}
              color="#2563EB"
              strokeWidth={2}
            />
          )}

        </TouchableOpacity>

      </View>


      {/* ========================================
          EXPANDED CONTENT
      ======================================== */}

      {expanded && (
        <View
          style={{
            marginTop: theme.spacing.lg,
          }}
        >

          {/* DIVIDER */}

          <View
            style={{
           borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderStyle: 'dashed',
    marginBottom: theme.spacing.lg,
            }}
          />


          {/* EMI ROW */}

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: theme.spacing.lg,
            }}
          >

            {/* EMI LABEL */}

            <Text
              style={{
                fontSize: theme.typography.b2,
                fontFamily: theme.fonts.medium,
                color: '#667085',
                letterSpacing: 0.3,
              }}
            >
              EMI AMOUNT
            </Text>


            {/* EMI VALUE */}

            <Text
              style={{
                fontSize: theme.typography.b1,
                fontFamily: theme.fonts.bold,
                color: theme.colors.text,
              }}
            >
              {formatAmount(emiAmount)}   
            </Text>

          </View>


          {/* VIEW DETAILS BUTTON */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleViewDetails}
            style={{
              height: 48,
              borderWidth: 1,
              borderColor: theme.colors.primary500,
              borderRadius: theme.radius.md,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >

            <Text
              style={{
                fontSize: theme.typography.b2,
                fontFamily: theme.fonts.semiBold,
                color: theme.colors.primary500,
              }}
            >
              View Details
            </Text>

          </TouchableOpacity>

        </View>
      )}

    </View>
  );
};


export default memo(MYLoanCard);