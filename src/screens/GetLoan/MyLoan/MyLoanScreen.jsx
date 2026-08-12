import React, { useState, useCallback, useMemo } from 'react';
import { View, FlatList, RefreshControl, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useGetMyLoansQuery } from '../../../redux/features/customer/customerApi';
import LoanHeader from './components/LoanHeader.jsx';
import MYLoanCard from './components/MYLoanCard.jsx';
import LoanSkeleton from './components/LoanSkeleton.jsx';
import { theme } from '../../../theme/index.js';

const HEADER_BG = '#FAF5EE';
const SCREEN_BG = theme?.screen?.background || '#F8F9FA';

const MOCK_LOANS_DATA = [
  {
    loanId: '6a62fcf16d5d38d97d87b5cd',
    applicationId: 'APP-1784872177270',
    loanNumber: 'LOAN-99000C0B0V16CVX0',
    productName: 'Personal Loan',
    approvedAmount: 20000,
    disbursedAmount: 20000,
    outstandingAmount: 20000,
    status: 'ACTIVE',
  },
  {
    loanId: '6a62fcf16d5d38d97d87b5ce',
    applicationId: 'APP-1784872177271',
    loanNumber: 'LOAN-99000C0B0V16CVX1',
    productName: 'Education Loan',
    approvedAmount: 20000,
    disbursedAmount: 20000,
    outstandingAmount: 20000,
    status: 'ACTIVE',
  },
  {
    loanId: '6a62fcf16d5d38d97d87b5cf',
    applicationId: 'APP-1784872177272',
    loanNumber: 'LOAN-99000C0B0V16CVX2',
    productName: 'Home Loan',
    approvedAmount: 20000,
    disbursedAmount: 20000,
    outstandingAmount: 20000,
    status: 'ACTIVE',
  },
  {
    loanId: '6a62fcf16d5d38d97d87b5cg',
    applicationId: 'APP-1784872177273',
    loanNumber: 'LOAN-99000C0B0V16CVX3',
    productName: 'Agriculture Loan',
    approvedAmount: 20000,
    disbursedAmount: 20000,
    outstandingAmount: 20000,
    status: 'ACTIVE',
  },
];


const GetLoanScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Loan');
  
  // Pull to Refresh State
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: loansResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetMyLoansQuery();

  // Pull to Refresh Handler
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  // Pull-to-refresh ke alawa, initial load ya manual fetching dono par skeleton loading dikhayega
  const showSkeleton = (isLoading || isFetching)  ;

const loansList = useMemo(() => {
  return loansResponse?.data || [];
}, [loansResponse]);

  const handleSeeMore = useCallback(
    (loan) => {
      navigation?.navigate('get-single-loan-detail', { loanId: loan.loanId });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item }) => <MYLoanCard item={item} onPressSeeMore={handleSeeMore} />,
    [handleSeeMore]
  );

  const keyExtractor = useCallback((item, index) => item?.loanId?.toString() || index.toString(), []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: HEADER_BG }} edges={['top', 'left', 'right']}>
      <StatusBar backgroundColor={HEADER_BG} barStyle="dark-content" />

      {/* Header Section */}
      <LoanHeader
        userName="Parth"
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onProfilePress={() => navigation?.navigate('Profile')}
      />

      {/* Body Content Section */}
      <View style={{ flex: 1, backgroundColor: SCREEN_BG }}>
        {showSkeleton ? (
          <LoanSkeleton />
        ) : (
          <FlatList
            data={loansList}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingHorizontal: theme.screen?.horizontalPadding || 20,
              paddingTop: theme.spacing?.lg || 16,
              paddingBottom: theme.spacing?.xxl || 32,
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 40 }}>
                <Text
                  style={{
                    fontSize: theme.typography?.b2 || 14,
                    fontFamily: theme.fonts?.medium || 'System',
                    color: theme.colors?.textSecondary || '#667085',
                  }}
                >
                  No loans found
                </Text>
              </View>
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={theme.colors?.primary500 || '#DF6B45'}
                colors={[theme.colors?.primary500 || '#DF6B45']}
              />
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default GetLoanScreen;