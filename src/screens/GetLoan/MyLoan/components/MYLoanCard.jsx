import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import { theme } from '../../../../theme';
 

const MYLoanCard = ({ item, onPressSeeMore }) => {
   console.log(item ,"item====")
  // Amount Formatting
  const rawAmount = item?.approvedAmount || item?.disbursedAmount || item?.outstandingAmount || 20000;
  const formattedAmount = `₹${Number(rawAmount).toLocaleString('en-IN')}`;

  // Title & Status text
  const productName = item?.productName || 'Personal Loan';
  const statusRaw = item?.status || 'Active';
  const status = statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1).toLowerCase();

  return (
    <View
      style={{
        ...theme.card.loan,
        marginBottom: theme.spacing.md,
      }}
    >
      {/* Top Header Row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Avatar & Product Title */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            marginRight: theme.spacing.sm,
          }}
        >
          {/* Circular Avatar */}
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

          {/* Title */}
          <Text
            numberOfLines={1}
            style={{
              fontSize: theme.typography.b1,
              fontFamily: theme.fonts.headingBold,
              color: theme.colors.text,
              flex: 1,
            }}
          >
            {productName}
          </Text>
        </View>

        {/* Right: Status Badge */}
        <View
          style={{
            backgroundColor:  '#FCEDD6',
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

      {/* Bottom Amount & Action Row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginTop: theme.spacing.lg,
        }}
      >
        {/* Amount */}
        <Text
          style={{
            fontSize: 26,
            fontFamily: theme.fonts.bold,
            color: theme.colors.text,
            letterSpacing: theme.letterSpacing.xs,
          }}
        >
          {formattedAmount}
        </Text>

        {/* See More Link */}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => onPressSeeMore?.(item)}
          hitSlop={
            typeof theme.hitSlop.sm === 'number'
              ? {
                  top: theme.hitSlop.sm,
                  bottom: theme.hitSlop.sm,
                  left: theme.hitSlop.sm,
                  right: theme.hitSlop.sm,
                }
              : theme.hitSlop.sm
          }
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
            See More
          </Text>
          <ChevronDown
            size={theme.iconSize.xs}
            color={'#2563EB'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default memo(MYLoanCard);
 