import React, { useState } from 'react';

import {
  View,
  StatusBar,
  FlatList,
  RefreshControl,
  Text,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';


// =====================================================
// LOCAL COMPONENTS
// =====================================================

import HeaderBar
  from './components/HeaderBar.jsx';

import LoanHeaderDetails
  from './components/LoanHeaderDetails.jsx';

import RepaymentItem
  from './components/RepaymentItem.jsx';

import TotalPaidFooter
  from './components/TotalPaidFooter.jsx';

import FeeDetailsModal
  from './components/FeeDetailsModal.jsx';

import LoanDetailsSkeleton
  from './components/LoanDetailsSkeleton.jsx';


// =====================================================
// REDUX / COMMON COMPONENTS
// =====================================================

import {
  useGetSingleLoanDetailsQuery,
} from '../../../redux/features/customer/customerApi.js';

import RetryScreen
  from '../../../components/common/RetryScreen/RetryScreen';


// =====================================================
// THEME
// =====================================================

import {
  theme,
} from '../../../theme/index.js';


// =====================================================
// SINGLE LOAN DETAILS SCREEN
// =====================================================

const SingleLoanDetailsScreen = ({
  route,
  navigation,
}) => {


  // ===================================================
  // LOAN ID
  // ===================================================

  const loanId =
    route?.params?.loanId;


  // ===================================================
  // FEE MODAL STATE
  // ===================================================

  const [
    feeModalVisible,
    setFeeModalVisible,
  ] = useState(false);


  // ===================================================
  // GET SINGLE LOAN DETAILS
  // ===================================================

  const {
    data:
    responseData,

    isLoading,

    isFetching,

    isError,

    error,

    refetch,

  } =
    useGetSingleLoanDetailsQuery(
      loanId
    );


  // ===================================================
  // RESPONSE DATA
  // ===================================================

  const data =
    responseData?.data;


  const {
    loanDetails,

    feeDetails,

    bankDetails,

    repaymentSchedule = [],

  } =
    data || {};


  // ===================================================
  // TOTAL PAID AMOUNT
  // ===================================================

  const totalPaidAmount =
    (
      repaymentSchedule || []
    ).reduce(
      (
        acc,
        item
      ) => {

        if (
          item?.status === 'PAID'
        ) {

          return (
            acc +
            (
              Number(
                item?.emiAmount
              ) || 0
            )
          );

        }


        return acc;

      },
      0
    );


  // ===================================================
  // MAIN CONTENT
  // ===================================================

  const renderMainContent =
    () => {


      // ================================================
      // LOADING
      // ================================================

      if (
        isLoading ||
        isFetching
      ) {

        return (
          <LoanDetailsSkeleton />
        );

      }


      // ================================================
      // ERROR
      // ================================================

      if (
        isError
      ) {

        const errorMessage =
          error?.data?.message ||
          'Unable to fetch loan details.';


        return (
          <RetryScreen
            message={
              errorMessage
            }
            onRetry={
              refetch
            }
          />
        );

      }


      // ================================================
      // SUCCESS
      // ================================================

      return (

        <View
          style={{

            flex: 1,

            // ==========================================
            // COMMON HORIZONTAL CONTAINER
            // ==========================================



          }}
        >


          {/* =================================================
              REPAYMENT SCHEDULE
          ================================================= */}

          <FlatList

            data={
              repaymentSchedule
            }


            // ==============================================
            // KEY EXTRACTOR
            // ==============================================

            keyExtractor={
              (
                item,
                index
              ) =>
                item?.emiId ||
                String(
                  item?.installmentNumber ??
                  index
                )
            }


            // ==============================================
            // PULL TO REFRESH
            // ==============================================

            refreshControl={

              <RefreshControl

                refreshing={
                  isFetching
                }

                onRefresh={
                  refetch
                }

                tintColor={
                  theme?.colors?.primary500 ||
                  '#F47C2C'
                }

                colors={[
                  theme?.colors?.primary500 ||
                  '#F47C2C',
                ]}

              />

            }


            // ==============================================
            // HEADER
            // ==============================================

            ListHeaderComponent={

              <LoanHeaderDetails

                loanDetails={
                  loanDetails
                }

                bankDetails={
                  bankDetails
                }

                onOpenFeeModal={
                  () =>
                    setFeeModalVisible(
                      true
                    )
                }

              />

            }


            // ==============================================
            // EMPTY STATE
            // ==============================================

            ListEmptyComponent={

              <View
                style={{

                  paddingVertical:
                    32,



                  alignItems:
                    'center',

                  justifyContent:
                    'center',

                  backgroundColor:
                    theme?.colors?.white ||
                    '#FFFFFF',

                  borderRadius:
                    theme?.radius?.lg ||
                    16,

                  marginTop:
                    8,

                }}
              >

                <Text
                  style={{

                    fontSize:
                      theme?.typography?.b2 ||
                      14,

                    fontFamily:
                      theme?.fonts?.medium ||
                      'Manrope-Medium',

                    color:
                      '#6D8295',

                    textAlign:
                      'center',

                  }}
                >

                  No repayment schedule available.

                </Text>

              </View>

            }


            // ==============================================
            // REPAYMENT ITEM
            // ==============================================

            renderItem={({ item, index }) => {
              const isFirst =
                index === 0;

              const isLast =
                index === repaymentSchedule.length - 1;

              return (
                <View
                  style={{
                    backgroundColor:
                      theme?.colors?.white ||
                      '#FFFFFF',

                    // First card
                    borderTopLeftRadius:
                      isFirst
                        ? theme?.radius?.lg || 16
                        : 0,

                    borderTopRightRadius:
                      isFirst
                        ? theme?.radius?.lg || 16
                        : 0,

                    // Last card
                    borderBottomLeftRadius:
                      isLast
                        ? theme?.radius?.lg || 16
                        : 0,

                    borderBottomRightRadius:
                      isLast
                        ? theme?.radius?.lg || 16
                        : 0,

                    // Optional: prevent inner content
                    // from visually overflowing corners
                    overflow: 'hidden',
                  }}
                >
                  <RepaymentItem
                    item={item}

                    isLast={
                      isLast
                    }

                    onPress={() => {

                      const emiStatus =
                        item?.status;

                      const paymentStatus =
                        item?.paymentStatus;


                      // ==================================================
                      // PAYMENT UNDER VERIFICATION
                      // ==================================================

                      if (
                        paymentStatus ===
                        "UNDER_VERIFICATION"
                      ) {

                        return;

                      }


                      // ==================================================
                      // PAYMENT ALREADY SUCCESSFUL
                      // ==================================================

                      if (
                        paymentStatus ===
                        "SUCCESS"
                      ) {

                        return;

                      }


                      // ==================================================
                      // ONLY DUE / OVERDUE CAN MAKE PAYMENT
                      // ==================================================

                      const canPay =
                        emiStatus === "DUE" ||
                        emiStatus === "OVERDUE";


                      if (
                        !canPay
                      ) {

                        return;

                      }


                      // ==================================================
                      // OPEN PAYMENT FLOW
                      // ==================================================

                      navigation.navigate(
                        "single-loan-detail-fee-details-screen",
                        {

                          emi:
                            item,

                          loanDetails:
                            loanDetails,

                        }
                      );

                    }}
                  />

                </View>
              );
            }}


            // ==============================================
            // CONTENT CONTAINER
            // ==============================================

            contentContainerStyle={{

              // ==========================================
              // IMPORTANT
              //
              // Horizontal padding nahi hai.
              // Parent View already handle kar raha hai.
              // ==========================================

              paddingBottom:
                150,

            }}


            showsVerticalScrollIndicator={
              false
            }

          />


          {/* =================================================
              FIXED TOTAL PAID FOOTER
          ================================================= */}

          <View
            style={{

              position:
                'absolute',

              left:
                0,

              right:
                0,

              bottom:
                0,


              // ==========================================
              // FOOTER BACKGROUND
              // ==========================================

              backgroundColor:
                theme?.colors?.background ||
                '#F6F8F7',


              // ==========================================
              // TOP SPACING
              // ==========================================

              paddingTop:
                theme?.spacing?.sm ||
                8,


              // ==========================================
              // BOTTOM SAFE SPACE
              // ==========================================

              paddingBottom:
                theme?.spacing?.md ||
                16,


              // ==========================================
              // SAME HORIZONTAL SPACING
              //
              // Parent se alag absolute hone ki wajah se
              // yahan horizontal spacing required hai.
              // ==========================================




            }}
          >

            <TotalPaidFooter

              totalPaidAmount={
                totalPaidAmount
              }

              status={
                loanDetails?.status ||
                'Active'
              }

            />

          </View>


          {/* =================================================
              FEE DETAILS MODAL
          ================================================= */}

          <FeeDetailsModal

            visible={
              feeModalVisible
            }

            onClose={
              () =>
                setFeeModalVisible(
                  false
                )
            }

            feeDetails={
              feeDetails
            }

          />

        </View>

      );

    };


  // ===================================================
  // SCREEN
  // ===================================================

  return (

    <SafeAreaView
      style={{

        flex: 1,

        backgroundColor:
          theme?.colors?.background ||
          '#F6F8F7',

      }}
    >


      {/* =================================================
          STATUS BAR
      ================================================= */}

      <StatusBar

        barStyle={
          theme?.statusBar?.dark
        }

        backgroundColor={
          theme?.colors?.background ||
          '#F6F8F7'
        }

      />


      {/* =================================================
          HEADER
      ================================================= */}

      <HeaderBar

        title="Loan Details"

        onBackPress={
          () =>
            navigation?.goBack()
        }

        onNotificationPress={
          () => { }
        }

      />


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <View
        style={{

          flex: 1,
          paddingHorizontal:
            theme?.screen?.horizontalPadding

        }}
      >

        {
          renderMainContent()
        }

      </View>


    </SafeAreaView>

  );

};


export default SingleLoanDetailsScreen;