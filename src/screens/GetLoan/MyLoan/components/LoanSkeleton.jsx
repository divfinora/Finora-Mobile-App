import React, { memo } from 'react';
import { View } from 'react-native';
 
import ShimmerPlaceholder from '../../../../components/common/Loader/ShimmerPlaceholder.jsx';
import { theme } from '../../../../theme/index.js';
 

const LoanSkeleton = () => {
  return (
    <View
      style={{
        paddingHorizontal: theme.screen.horizontalPadding,
        paddingTop: theme.spacing.lg,
      }}
    >
      {[1, 2, 3, 4].map((key) => (
        <View
          key={key}
          style={{
            ...theme.card.loan,
            marginBottom: theme.spacing.md,
          }}
        >
          {/* Top Row: Avatar + Title & Status Badge */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* Circular Avatar Skeleton */}
              <ShimmerPlaceholder
                width={theme.avatar.sm}
                height={theme.avatar.sm}
                borderRadius={theme.avatar.sm / 2}
                style={{ marginRight: theme.spacing.sm }}
              />
              {/* Product Title Skeleton */}
              <ShimmerPlaceholder
                width={130}
                height={18}
                borderRadius={theme.radius.sm}
              />
            </View>

            {/* Active Status Badge Skeleton */}
            <ShimmerPlaceholder
              width={64}
              height={24}
              borderRadius={theme.radius.sm}
            />
          </View>

          {/* Bottom Row: Amount & See More Action */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginTop: theme.spacing.lg,
            }}
          >
            {/* Amount Text Skeleton */}
            <ShimmerPlaceholder
              width={110}
              height={30}
              borderRadius={theme.radius.sm}
            />
            {/* See More Link Skeleton */}
            <ShimmerPlaceholder
              width={75}
              height={18}
              borderRadius={theme.radius.sm}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default memo(LoanSkeleton);