// ============================================================
// src/screens/Loan/GetLoanScreen.jsx
// ============================================================

import React, {
  useState,
  useCallback,
  useMemo,
} from 'react';

import {
  View,
  FlatList,
  RefreshControl,
  Text,
  StatusBar,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';


// ============================================================
// API
// ============================================================

import {
  useGetMyLoansQuery,
} from '../../../redux/features/customer/customerApi';


// ============================================================
// COMPONENTS
// ============================================================

import LoanHeader
  from './components/LoanHeader.jsx';

import MYLoanCard
  from './components/MYLoanCard.jsx';

import LoanSkeleton
  from './components/LoanSkeleton.jsx';


// ============================================================
// THEME
// ============================================================

import {
  theme,
} from '../../../theme/index.js';
import { useSelector } from 'react-redux';
import InlineRetry from '../../../components/common/RetryScreen/InlineRetry.jsx';


// ============================================================
// CONSTANTS
// ============================================================

const HEADER_BG =
  '#FAF5EE';

const SCREEN_BG =
  theme?.screen?.background ||
  '#F8F9FA';


// ============================================================
// CURRENT LOAN STATUSES
// ============================================================
//
// Current ka matlab:
// Loan abhi processing / active journey
// mein hai.
//
// Rejected / Completed / Closed / Settled
// Current mein nahi aayenge.
//

const CURRENT_LOAN_STATUSES = [

  'PENDING',

  'APPROVED',

  'ACTIVE',

  'DISBURSED',

  'PROCESSING',

];


// ============================================================
// REJECTED LOAN STATUSES
// ============================================================

const REJECTED_LOAN_STATUSES = [

  'REJECTED',

];


// ============================================================
// COMPLETED LOAN STATUSES
// ============================================================

const COMPLETED_LOAN_STATUSES = [

  'COMPLETED',

  'CLOSED',

  'SETTLED',

];


// ============================================================
// SCREEN
// ============================================================

const GetLoanScreen = ({
  navigation,
}) => {


  // ==========================================================
  // MAIN TAB
  // ==========================================================

  const [
    activeTab,
    setActiveTab,
  ] = useState(
    'Loan'
  );


  // ==========================================================
  // LOAN FILTER
  // ==========================================================

  const [
    activeLoanFilter,
    setActiveLoanFilter,
  ] = useState(
    'Current'
  );


  // ==========================================================
  // REFRESHING
  // ==========================================================

  const [
    refreshing,
    setRefreshing,
  ] = useState(
    false
  );


  // ==========================================================
  // GET MY LOANS
  // ==========================================================

  const {
    data:
    loansResponse,

    isLoading,

    isFetching,

    isError,

    refetch,

  } = useGetMyLoansQuery();

  const user = useSelector((state) => state.auth.user);
  const handleRetry = useCallback(() => {
    refetch();
  }, [refetch]);
  // ==========================================================
  // REFRESH
  // ==========================================================

  const onRefresh =
    useCallback(
      async () => {

        try {

          setRefreshing(
            true
          );

          await refetch();

        } catch (
        error
        ) {

          console.log(
            'Loan refresh error:',
            error
          );

        } finally {

          setRefreshing(
            false
          );

        }

      },
      [
        refetch,
      ]
    );


  // ==========================================================
  // SKELETON
  // ==========================================================

  const showSkeleton =
    isLoading ||
    isFetching;


  // ==========================================================
  // ALL LOANS FROM API
  // ==========================================================

  const loansList =
    useMemo(
      () => {

        if (
          !Array.isArray(
            loansResponse?.data
          )
        ) {

          return [];

        }

        return (
          loansResponse?.data ||
          []
        );

      },
      [
        loansResponse,
      ]
    );


  // ==========================================================
  // FILTER LOANS
  // ==========================================================

  const filteredLoans =
    useMemo(
      () => {

        // ====================================================
        // SAFETY
        // ====================================================

        if (
          !Array.isArray(
            loansList
          )
        ) {

          return [];

        }


        // ====================================================
        // ALL
        // ====================================================

        if (
          activeLoanFilter ===
          'All'
        ) {

          return loansList;

        }


        // ====================================================
        // CURRENT
        // ====================================================

        if (
          activeLoanFilter ===
          'Current'
        ) {

          return loansList.filter(
            (
              loan
            ) => {

              const status =
                String(
                  loan?.status ||
                  ''
                )
                  .trim()
                  .toUpperCase();


              return CURRENT_LOAN_STATUSES.includes(
                status
              );

            }
          );

        }


        // ====================================================
        // REJECTED
        // ====================================================

        if (
          activeLoanFilter ===
          'Rejected'
        ) {

          return loansList.filter(
            (
              loan
            ) => {

              const status =
                String(
                  loan?.status ||
                  ''
                )
                  .trim()
                  .toUpperCase();


              return REJECTED_LOAN_STATUSES.includes(
                status
              );

            }
          );

        }


        // ====================================================
        // COMPLETED
        // ====================================================

        if (
          activeLoanFilter ===
          'Completed'
        ) {

          return loansList.filter(
            (
              loan
            ) => {

              const status =
                String(
                  loan?.status ||
                  ''
                )
                  .trim()
                  .toUpperCase();


              return COMPLETED_LOAN_STATUSES.includes(
                status
              );

            }
          );

        }


        // ====================================================
        // FALLBACK
        // ====================================================

        return loansList;

      },
      [
        loansList,
        activeLoanFilter,
      ]
    );


  // ==========================================================
  // SEE MORE
  // ==========================================================

  const handleSeeMore =
    useCallback(
      (
        loan
      ) => {

        const loanId =
          loan?.loanId;


        if (
          !loanId
        ) {

          console.warn(
            'Loan ID missing'
          );

          return;

        }


        navigation?.navigate(
          'get-single-loan-detail',
          {
            loanId:
              loanId,
          }
        );

      },
      [
        navigation,
      ]
    );


  // ==========================================================
  // RENDER ITEM
  // ==========================================================

  const renderItem =
    useCallback(
      ({
        item,
      }) => {

        return (

          <MYLoanCard

            item={
              item
            }

            onPressSeeMore={
              handleSeeMore
            }

          />

        );

      },
      [
        handleSeeMore,
      ]
    );


  // ==========================================================
  // KEY EXTRACTOR
  // ==========================================================

  const keyExtractor =
    useCallback(
      (
        item,
        index
      ) => {

        return (

          item?.loanId
            ?.toString() ||

          index.toString()

        );

      },
      []
    );


  // ==========================================================
  // EMPTY MESSAGE
  // ==========================================================

  const emptyMessage =
    useMemo(
      () => {

        switch (
        activeLoanFilter
        ) {

          case 'Current':

            return (
              'No current loans found'
            );


          case 'Rejected':

            return (
              'No rejected loans found'
            );


          case 'Completed':

            return (
              'No completed loans found'
            );


          case 'All':

            return (
              'No loans found'
            );


          default:

            return (
              'No loans found'
            );

        }

      },
      [
        activeLoanFilter,
      ]
    );


  // ==========================================================
  // ERROR MESSAGE
  // ==========================================================

  if (
    isError &&
    !isLoading
  ) {

    console.log(
      'Get My Loans API Error'
    );

  }


  // ==========================================================
  // UI
  // ==========================================================

  return (

    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor:
          HEADER_BG,
      }}

      edges={[
        'top',
        'left',
        'right',
      ]}
    >

      {/* ====================================================
          STATUS BAR
      ==================================================== */}

      <StatusBar
        backgroundColor={
          HEADER_BG
        }

        barStyle={
          'dark-content'
        }
      />


      {/* ====================================================
          HEADER
      ==================================================== */}

      <LoanHeader

        userName={
          '-'
        }

        activeTab={
          activeTab
        }

        onTabChange={
          setActiveTab
        }

        activeLoanFilter={
          activeLoanFilter
        }

        onLoanFilterChange={
          setActiveLoanFilter
        }

        onProfilePress={() =>
          navigation?.navigate(
            'Profile'
          )
        }

      />


      {/* ====================================================
          BODY
      ==================================================== */}

      <View
        style={{
          flex: 1,

          backgroundColor:
            SCREEN_BG,
        }}
      >

        {/* ==================================================
            SKELETON
        ================================================== */}

        {showSkeleton ? (

          <LoanSkeleton />

        ) : isError && loansList.length === 0 ?
          <View
            style={{
              flex: 1,
              paddingHorizontal:
                theme.screen?.horizontalPadding || 20,
            }}
          >
            <InlineRetry
              title="Failed to load loan history"
              description="Please check your connection and try again."
              buttonText="Retry"
              loading={isFetching}
              onRetry={handleRetry}
              containerStyle={{
                marginTop: 40,
              }}
            />
          </View> : (

            <FlatList

              data={

                activeTab ===
                  'Loan'

                  ? filteredLoans

                  : []

              }


              keyExtractor={
                keyExtractor
              }


              renderItem={
                renderItem
              }


              contentContainerStyle={{
                paddingHorizontal:
                  theme.screen
                    ?.horizontalPadding ||
                  20,

                paddingTop:
                  theme.spacing
                    ?.lg ||
                  16,

                paddingBottom:
                  theme.spacing
                    ?.xxl ||
                  32,

                flexGrow:
                  1,
              }}


              showsVerticalScrollIndicator={
                false
              }


              // ==================================================
              // EMPTY
              // ==================================================

              ListEmptyComponent={

                <View
                  style={{
                    flex: 1,

                    alignItems:
                      'center',

                    justifyContent:
                      'center',

                    paddingVertical:
                      40,
                  }}
                >

                  <Text
                    style={{
                      fontSize:
                        theme.typography
                          ?.b2 ||
                        14,

                      fontFamily:
                        theme.fonts
                          ?.medium ||
                        'System',

                      color:
                        theme.colors
                          ?.textSecondary ||
                        '#667085',

                      textAlign:
                        'center',
                    }}
                  >

                    {emptyMessage}

                  </Text>

                </View>

              }


              // ==================================================
              // PULL TO REFRESH
              // ==================================================

              refreshControl={

                <RefreshControl

                  refreshing={
                    refreshing
                  }

                  onRefresh={
                    onRefresh
                  }

                  tintColor={
                    theme.colors
                      ?.primary500 ||
                    '#DF6B45'
                  }

                  colors={[
                    theme.colors
                      ?.primary500 ||
                    '#DF6B45',
                  ]}

                />

              }

            />

          )}

      </View>

    </SafeAreaView>

  );

};


// ============================================================
// EXPORT
// ============================================================

export default GetLoanScreen;