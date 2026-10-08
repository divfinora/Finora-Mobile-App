import React, {
  memo,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  User,
} from 'lucide-react-native';

import {
  theme,
} from '../../../../theme';
import { useSelector } from 'react-redux';


const LoanHeader = ({
 

  activeTab = 'Loan',

  onTabChange,

  onProfilePress,

  // ==========================================
  // LOAN FILTER
  // ==========================================

  activeLoanFilter = 'Current',

  onLoanFilterChange,
}) => {
 const user = useSelector((state) => state.auth.user);
const userName = user?.fullName || '';

const userInitials = userName
  .trim()
  .split(/\s+/)
  .filter(Boolean)
  .map((name) => name.charAt(0))
  .slice(0, 2)
  .join('')
  .toUpperCase();
  // ==========================================
  // MAIN TABS
  // ==========================================

  const tabs = [
    'Transaction',
    'Loan',
  ];


  // ==========================================
  // LOAN FILTERS
  // ==========================================

  const loanFilters = [
    'All',
    'Current',
    'Rejected',
    'Completed',
  ];


  return (

    <View
      style={{
        backgroundColor:
          '#FAF5EE',
      }}
    >

      {/* ======================================
          TOP HEADER
      ====================================== */}

      <View
        style={{
          flexDirection:
            'row',

          alignItems:
            'center',

          justifyContent:
            'space-between',

          paddingHorizontal:
            theme.screen?.horizontalPadding ||
            20,

          paddingTop:
            theme.spacing?.md ||
            12,

          paddingBottom:
            theme.spacing?.lg ||
            16,
        }}
      >

        {/* ====================================
            USER GREETING
        ==================================== */}

        <View
          style={{
            flexDirection:
              'row',

            alignItems:
              'center',

            backgroundColor:
              '#FFFFFF',

            borderRadius:
              30,

            paddingVertical:
              6,

            paddingHorizontal:
              12,

            shadowColor:
              '#000',

            shadowOffset:
              {
                width: 0,
                height: 2,
              },

            shadowOpacity:
              0.04,

            shadowRadius:
              4,

            elevation:
              2,
          }}
        >

          <View
            style={{
              width:
                32,

              height:
                32,

              borderRadius:
                16,

              backgroundColor:
                '#0F172A',

              justifyContent:
                'center',

              alignItems:
                'center',

              marginRight:
                8,
            }}
          >

            <Text
              style={{
                color:
                  '#FFFFFF',

                fontSize:
                  12,

                fontFamily:
                  theme.fonts?.bold ||
                  'System',

                fontWeight:
                  '700',
              }}
            >
               {userInitials || ''}
            </Text>

          </View>


          <Text
            style={{
              fontSize:
                15,

              fontFamily:
                theme.fonts?.headingBold ||
                'System',

              fontWeight:
                '700',

              color:
                '#0F172A',
            }}
          >
        Hi {userName}!
          </Text>

        </View>


        {/* ====================================
            PROFILE
        ==================================== */}

        <TouchableOpacity
          activeOpacity={
            0.8
          }

          onPress={
            onProfilePress
          }

          hitSlop={{
            top: 10,
            bottom: 10,
            left: 10,
            right: 10,
          }}

          style={{
            width:
              44,

            height:
              44,

            borderRadius:
              22,

            backgroundColor:
              '#FFFFFF',

            justifyContent:
              'center',

            alignItems:
              'center',

            shadowColor:
              '#000',

            shadowOffset:
              {
                width: 0,
                height: 2,
              },

            shadowOpacity:
              0.04,

            shadowRadius:
              4,

            elevation:
              2,
          }}
        >

          <User
            size={
              22
            }

            color={
              '#0F172A'
            }
          />

        </TouchableOpacity>

      </View>


      {/* ======================================
          MAIN TABS
      ====================================== */}

      <View
        style={{
          flexDirection:
            'row',

          backgroundColor:
            '#FFFFFF',

          paddingHorizontal:
            theme.screen?.horizontalPadding ||
            24,

          borderBottomWidth:
            1,

          borderBottomColor:
            '#F2F4F7',
        }}
      >

        {tabs.map(
          (tab) => {

            const isActive =
              activeTab ===
              tab;

            return (

              <TouchableOpacity
                key={
                  tab
                }

                activeOpacity={
                  0.8
                }

                onPress={() =>
                  onTabChange?.(
                    tab
                  )
                }

                style={{
                  marginRight:
                    40,

                  paddingTop:
                    14,

                  paddingBottom:
                    12,

                  position:
                    'relative',

                  alignItems:
                    'center',
                }}
              >

                <Text
                  style={{
                    fontSize:
                      16,

                    fontFamily:
                      isActive
                        ? theme.fonts?.headingBold ||
                          'System'
                        : theme.fonts?.medium ||
                          'System',

                    fontWeight:
                      isActive
                        ? '700'
                        : '500',

                    color:
                      isActive
                        ? '#DF6B45'
                        : '#E88262',
                  }}
                >
                  {tab}
                </Text>


                {/* ACTIVE INDICATOR */}

                {isActive && (

                  <View
                    style={{
                      position:
                        'absolute',

                      bottom:
                        0,

                      width:
                        '100%',

                      height:
                        3,

                      backgroundColor:
                        '#DF6B45',

                      borderRadius:
                        2,
                    }}
                  />

                )}

              </TouchableOpacity>

            );

          }
        )}

      </View>


      {/* ======================================
          LOAN FILTERS

          ONLY LOAN TAB
      ====================================== */}

      {/* ======================================
    LOAN FILTERS
    HORIZONTAL SCROLL
====================================== */}

{activeTab === 'Loan' && (

  <View
    style={{
      backgroundColor:
        '#FFFFFF',

      borderBottomWidth:
        1,

      borderBottomColor:
        '#F2F4F7',

      paddingVertical:
        10,
    }}
  >

    <ScrollView

      horizontal

      showsHorizontalScrollIndicator={
        false
      }

      contentContainerStyle={{
        paddingHorizontal:
          theme.screen?.horizontalPadding ||
          24,

        alignItems:
          'center',
      }}

    >

      {loanFilters.map(
        (filter) => {

          const isActive =
            activeLoanFilter ===
            filter;

          return (

            <TouchableOpacity

              key={
                filter
              }

              activeOpacity={
                0.8
              }

              onPress={() =>
                onLoanFilterChange?.(
                  filter
                )
              }

              style={{

                marginRight:
                  10,

                paddingHorizontal:
                  16,

                paddingVertical:
                  8,

                borderRadius:
                  20,

                backgroundColor:
                  isActive
                    ? '#DF6B45'
                    : '#F8F8F8',

                borderWidth:
                  1,

                borderColor:
                  isActive
                    ? '#DF6B45'
                    : '#E5E7EB',
              }}

            >

              <Text
                style={{

                  fontSize:
                    13,

                  fontFamily:
                    isActive

                      ? theme.fonts?.bold ||
                        'System'

                      : theme.fonts?.medium ||
                        'System',

                  fontWeight:
                    isActive
                      ? '700'
                      : '500',

                  color:
                    isActive
                      ? '#FFFFFF'
                      : '#64748B',
                }}
              >

                {filter}

              </Text>

            </TouchableOpacity>

          );

        }
      )}

    </ScrollView>

  </View>

)}

    </View>

  );

};


export default memo(
  LoanHeader
);