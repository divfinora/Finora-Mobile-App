import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { User } from 'lucide-react-native';
import { theme } from '../../../../theme';
 

const LoanHeader = ({
  userName = 'Parth',
  activeTab = 'Loan',
  onTabChange,
  onProfilePress,
}) => {
  const tabs = ['Transaction', 'Loan'];

  return (
    <View style={{ backgroundColor: '#FAF5EE' }}>
      {/* Top Header Section with Warm Off-White BG */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: theme.screen?.horizontalPadding || 20,
          paddingTop: theme.spacing?.md || 12,
          paddingBottom: theme.spacing?.lg || 16,
        }}
      >
        {/* Left User Greeting Pill */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: 30,
            paddingVertical: 6,
            paddingHorizontal: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: '#0F172A',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 8,
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 12,
                fontFamily: theme.fonts?.bold || 'System',
                fontWeight: '700',
              }}
            >
              kk
            </Text>
          </View>

          <Text
            style={{
              fontSize: 15,
              fontFamily: theme.fonts?.headingBold || 'System',
              fontWeight: '700',
              color: '#0F172A',
            }}
          >
            Hi {userName}!
          </Text>
        </View>

        {/* Right Profile Icon Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onProfilePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          style={{
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: '#FFFFFF',
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.04,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <User size={22} color="#0F172A" />
        </TouchableOpacity>
      </View>

      {/* Tabs Container */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#FFFFFF',
          paddingHorizontal: theme.screen?.horizontalPadding || 24,
          borderBottomWidth: 1,
          borderBottomColor: '#F2F4F7',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.8}
              onPress={() => onTabChange?.(tab)}
              style={{
                marginRight: 40,
                paddingTop: 14,
                paddingBottom: 12,
                position: 'relative',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: isActive
                    ? theme.fonts?.headingBold || 'System'
                    : theme.fonts?.medium || 'System',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#DF6B45' : '#E88262',
                }}
              >
                {tab}
              </Text>

              {/* Active Tab Orange Bar Indicator */}
              {isActive && (
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    height: 3,
                    backgroundColor: '#DF6B45',
                    borderRadius: 2,
                  }}
                />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default memo(LoanHeader);