// src/screens/LoanDetails/components/LoanDetailsSkeleton.jsx

import React from 'react';
import { View } from 'react-native';
import { theme } from '../../../../theme';

const LoanDetailsSkeleton = () => {
  return (
    <View style={{ paddingHorizontal: theme.screen.horizontalPadding, paddingTop: theme.spacing.md }}>
      {/* Main Loan Card Skeleton */}
      <View
        style={{
          height: 190,
          backgroundColor: theme.skeleton.background,
          borderRadius: theme.radius.xl,
          marginBottom: theme.spacing.xl,
        }}
      />

      {/* Disbursal Bank Card Skeleton */}
      <View
        style={{
          height: 60,
          backgroundColor: theme.skeleton.background,
          borderRadius: theme.radius.lg,
          marginBottom: theme.spacing.xxl,
        }}
      />

      {/* List Item Skeletons */}
      {[1, 2, 3, 4].map((item) => (
        <View
          key={item}
          style={{
            height: 64,
            backgroundColor: theme.skeleton.background,
            borderRadius: theme.radius.md,
            marginBottom: theme.spacing.sm,
          }}
        />
      ))}
    </View>
  );
};

export default LoanDetailsSkeleton;