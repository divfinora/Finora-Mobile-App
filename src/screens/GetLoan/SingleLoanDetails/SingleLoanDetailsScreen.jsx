import React, { useState } from 'react';
import { View, StatusBar, FlatList, RefreshControl, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Local Sub-components
import HeaderBar from './components/HeaderBar.jsx';
import LoanHeaderDetails from './components/LoanHeaderDetails.jsx';
import RepaymentItem from './components/RepaymentItem.jsx';
import TotalPaidFooter from './components/TotalPaidFooter.jsx';
import BottomActionButtons from './components/BottomActionButtons.jsx';
import FeeDetailsModal from './components/FeeDetailsModal.jsx';
import LoanDetailsSkeleton from './components/LoanDetailsSkeleton.jsx';

// Redux & Common Components
import { useGetSingleLoanDetailsQuery } from '../../../redux/features/customer/customerApi.js';
import RetryScreen from '../../../components/common/RetryScreen/RetryScreen';
import { theme } from '../../../theme/index.js';

const SingleLoanDetailsScreen = ({ route, navigation }) => {
  const loanId = route?.params?.loanId;
  const [feeModalVisible, setFeeModalVisible] = useState(false);

  // RTK Query hook
  const {
    data: responseData,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetSingleLoanDetailsQuery(loanId);

  // Data Extract
  const data = responseData?.data;
  const { loanDetails, feeDetails, bankDetails, repaymentSchedule = [] } = data || {};

  // Calculate total paid amount
  const totalPaidAmount = (repaymentSchedule || []).reduce((acc, item) => {
    return item.status === 'PAID' ? acc + (item.emiAmount || 0) : acc;
  }, 0);

  // Content Renderer function
  const renderMainContent = () => {
    // 1. Loading State (Sirf pehli baar load hone par Skeleton dikhayega)
    if (isLoading || isFetching) {
      return <LoanDetailsSkeleton />;
    }

    // 2. Error State
    if (isError) {
      const errorMessage = error?.data?.message || 'Unable to fetch loan details.';
      return <RetryScreen message={errorMessage} onRetry={refetch} />;
    }

    // 3. Success State (Main Content)
    return (
      <>
        {/* Main Schedule List */}
        <FlatList
          data={repaymentSchedule}
          keyExtractor={(item) => item.emiId || String(item.installmentNumber)}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={refetch}
              tintColor={theme?.colors?.primary500 || '#F47C2C'}
              colors={[theme?.colors?.primary500 || '#F47C2C']}
            />
          }
          ListHeaderComponent={
            <LoanHeaderDetails
              loanDetails={loanDetails}
              bankDetails={bankDetails}
              onOpenFeeModal={() => setFeeModalVisible(true)}
            />
          }
          /* Empty Data View - Agar repaymentSchedule khali/empty ho */
          ListEmptyComponent={
            <View
              style={{
                paddingVertical: 32,
                paddingHorizontal: 16,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: theme.colors.white,
                borderRadius: theme.radius.lg,
                marginTop: 8,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: theme?.fonts?.medium || 'Manrope-Medium',
                  color: '#6D8295',
                  textAlign: 'center',
                }}
              >
                No repayment schedule available.
              </Text>
            </View>
          }
          ListFooterComponent={
            <TotalPaidFooter
              totalPaidAmount={totalPaidAmount}
              status={loanDetails?.status || 'Active'}
            />
          }
          renderItem={({ item, index }) => (
            <View style={{ backgroundColor: theme.colors.white, borderRadius: theme.radius.lg }}>
              <RepaymentItem
                item={item}
                isLast={index === repaymentSchedule.length - 1}
              />
            </View>
          )}
          contentContainerStyle={{
            paddingHorizontal: theme.screen.horizontalPadding,
            paddingBottom: 170, // Sticky bottom buttons space
          }}
          showsVerticalScrollIndicator={false}
        />

        {/* Sticky Bottom Actions */}
        <BottomActionButtons
          onMakePayment={() => {}}
          onForeclose={() => {}}
        />

        {/* Fee Breakdown Modal */}
        <FeeDetailsModal
          visible={feeModalVisible}
          onClose={() => setFeeModalVisible(false)}
          feeDetails={feeDetails}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar barStyle={theme.statusBar.dark} backgroundColor={theme.colors.background} />

      {/* Common Header Bar */}
      <HeaderBar
        title="Loan Details"
        onBackPress={() => navigation?.goBack()}
        onNotificationPress={() => {}}
      />

      {/* Dynamic Content */}
      <View style={{ flex: 1 }}>
        {renderMainContent()}
      </View>
    </SafeAreaView>
  );
};

export default SingleLoanDetailsScreen;