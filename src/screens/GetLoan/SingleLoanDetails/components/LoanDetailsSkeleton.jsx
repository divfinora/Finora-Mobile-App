// src/screens/LoanDetails/components/LoanDetailsSkeleton.jsx

import React from 'react';
import { View, ScrollView } from 'react-native';
 
import { theme } from '../../../../theme';
import ShimmerPlaceholder from '../../../../components/common/Loader/ShimmerPlaceholder';
 

const LoanDetailsSkeleton = () => {
  return (
    <View style={{ flex: 1, backgroundColor: theme?.colors?.background || '#F6F8F7' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
           
          paddingTop: 16,
          paddingBottom: 170,
        }}
      >
        {/* ==================== 1. TOP HEADER DETAILS SKELETON ==================== */}
        <View style={{ marginBottom: 24 }}>
          {/* Loan Ref no */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <ShimmerPlaceholder width={100} height={16} borderRadius={6} />
            <ShimmerPlaceholder width={160} height={16} borderRadius={6} />
          </View>

          {/* Approved Amount */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <ShimmerPlaceholder width={120} height={16} borderRadius={6} />
            <ShimmerPlaceholder width={90} height={22} borderRadius={6} />
          </View>

          {/* Disbursement Amount */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <ShimmerPlaceholder width={140} height={16} borderRadius={6} />
            <View style={{ alignItems: 'flex-end', gap: 6 }}>
              <ShimmerPlaceholder width={80} height={22} borderRadius={6} />
              <ShimmerPlaceholder width={150} height={12} borderRadius={4} />
              <ShimmerPlaceholder width={110} height={12} borderRadius={4} />
              <ShimmerPlaceholder width={90} height={14} borderRadius={4} />
            </View>
          </View>

          {/* Interest Rate */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
            <View style={{ gap: 4 }}>
              <ShimmerPlaceholder width={90} height={16} borderRadius={6} />
              <ShimmerPlaceholder width={130} height={12} borderRadius={4} />
            </View>
            <ShimmerPlaceholder width={60} height={18} borderRadius={6} />
          </View>

          {/* Tenure */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <ShimmerPlaceholder width={60} height={16} borderRadius={6} />
            <ShimmerPlaceholder width={80} height={18} borderRadius={6} />
          </View>

          {/* Schedule Section Heading */}
          <ShimmerPlaceholder width={180} height={18} borderRadius={6} style={{ marginTop: 8 }} />
        </View>

        {/* ==================== 2. REPAYMENT SCHEDULE ITEMS SKELETON ==================== */}
        <View
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#F3F4F6',
          }}
        >
          {[1, 2, 3, 4, ].map((item, index) => (
            <View
              key={item}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 16,
                borderBottomWidth: index === 5 ? 0 : 1,
                borderBottomColor: '#F3F4F6',
              }}
            >
              {/* Left Column (Title & Date) */}
              <View style={{ gap: 6 }}>
                <ShimmerPlaceholder width={110} height={16} borderRadius={6} />
                <ShimmerPlaceholder width={80} height={12} borderRadius={4} />
              </View>

              {/* Right Column (Amount) */}
              <ShimmerPlaceholder width={70} height={18} borderRadius={6} />
            </View>
          ))}
        </View>

        {/* ==================== 3. TOTAL PAID FOOTER CARD SKELETON ==================== */}
        <View
          style={{
            marginTop: 20,
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            borderWidth: 1.5,
            borderColor: '#E5E7EB',
            borderStyle: 'dashed',
            padding: 16,
            gap: 12,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <ShimmerPlaceholder width={130} height={16} borderRadius={6} />
            <ShimmerPlaceholder width={60} height={24} borderRadius={6} />
          </View>
          <ShimmerPlaceholder width={70} height={24} borderRadius={12} />
        </View>
      </ScrollView>

      {/* ==================== 4. STICKY BOTTOM BUTTONS SKELETON ==================== */}
    
    </View>
  );
};

export default LoanDetailsSkeleton;