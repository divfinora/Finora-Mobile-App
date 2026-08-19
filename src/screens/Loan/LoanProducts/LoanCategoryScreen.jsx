import React, { useCallback } from "react";

import {
  View,
  Text,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

import { Bell } from "lucide-react-native";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
  useGetLoanProductsByCategoryQuery,
} from "../../../redux/features/customer/customerApi";

import { theme } from "../../../theme";

import BackButton from "../../../components/common/BackButton/BackButton.jsx";

import LoanOfferCard from "./components/LoanOfferCard";
import LoanOfferSkeleton from "./components/LoanOfferSkeleton";
import LoanEmptyState from "./components/LoanEmptyState";

import InlineRetry from "../../../components/common/RetryScreen/InlineRetry";


const LoanCategoryScreen = () => {

  const navigation = useNavigation();
  const route = useRoute();


  // ==========================================
  // CATEGORY
  // ==========================================

  const category =
    route?.params?.category || "GOLD";

  const categoryName =
    route?.params?.categoryName || "Gold";


  // ==========================================
  // API
  // ==========================================

  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetLoanProductsByCategoryQuery(
    category
  );


  // ==========================================
  // LOANS
  // ==========================================

  const loans =
    Array.isArray(data?.data)
      ? data.data
      : [];


  // ==========================================
  // REFRESH
  // ==========================================

  const handleRefresh = useCallback(() => {

    refetch();

  }, [refetch]);


  // ==========================================
  // LOAN PRESS
  // GOLD + PERSONAL ONLY
  // ==========================================

  const handleLoanPress = useCallback(
  (loan) => {

    console.log(
      loan,
      "Loan====="
    );

    const loanCategory =
      loan?.category || category;


    // ========================================
    // GOLD LOAN
    // ========================================

    if (loanCategory === "GOLD") {

      navigation.navigate(
        "apply-gold-loan",
        {
          product: loan,

          // PRODUCT ID
          productId: loan?._id,
        }
      );

      return;
    }


    // ========================================
    // PERSONAL LOAN
    // ========================================

    if (loanCategory === "PERSONAL") {

      navigation.navigate(
        "apply-personal-loan",
        {
          product: loan,

          // PRODUCT ID
          productId: loan?._id,
        }
      );

      return;
    }

  },
  [
    category,
    navigation,
  ]
);

  // ==========================================
  // LOAN CARD
  // ==========================================

  const renderItem = useCallback(
    ({ item }) => {

      return (
        <LoanOfferCard
          loan={item}
          onPress={handleLoanPress}
        />
      );

    },
    [handleLoanPress]
  );


  // ==========================================
  // KEY EXTRACTOR
  // ==========================================

  const keyExtractor = useCallback(
    (item, index) => {

      return (
        item?._id ||
        item?.code ||
        `${category}-${index}`
      );

    },
    [category]
  );


  // ==========================================
  // FIXED HEADER
  // ==========================================

  const renderHeader = () => {

    return (
      <View
        style={{
          paddingHorizontal:
            theme.spacing.xl,

        
        }}
      >

        <BackButton
          title={`${categoryName} Loan`}

          onPress={() =>
            navigation.goBack()
          }

          rightComponent={

            <TouchableOpacity
              activeOpacity={0.8}

              onPress={() =>
                navigation.navigate(
                  "get-notification-screen"
                )
              }

              style={{
                width: 42,
                height: 42,

                borderRadius: 21,

                backgroundColor:
                  theme.colors.primary100,

                alignItems:
                  "center",

                justifyContent:
                  "center",
              }}
            >

              <Bell
                size={21}
                color={
                  theme.colors.primary700
                }
              />

            </TouchableOpacity>

          }
        />

      </View>
    );
  };


  // ==========================================
  // LIST HEADER
  // ==========================================

  const renderListHeader = () => {

    // Error ke time heading hide
    if (error) {
      return null;
    }


    return (
      <View
        style={{
          paddingHorizontal:
            theme.spacing.xl,

          paddingTop:
            theme.spacing.lg,

          paddingBottom:
            theme.spacing.lg,
        }}
      >

        <Text
          style={{
            color:
              theme.colors.navy900,

            fontSize:
              theme.typography.h3,

            fontFamily:
              theme.fonts.headingBold,
          }}
        >
          Choose Your Loan
        </Text>


        <Text
          style={{
            marginTop: 5,

            color:
              theme.colors.gray500,

            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.medium,
          }}
        >
          Select the loan that suits
          your requirements.
        </Text>

      </View>
    );
  };


  // ==========================================
  // EMPTY / LOADING / ERROR
  // ==========================================

  const renderEmptyComponent = () => {

    // ========================================
    // LOADING
    // INITIAL + FETCHING
    // ========================================

    if (isLoading || isFetching) {

      return (
        <View
          style={{
  
          }}
        >

          <LoanOfferSkeleton />

          <LoanOfferSkeleton />

          <LoanOfferSkeleton />

        </View>
      );
    }


    // ========================================
    // ERROR
    // ========================================

    if (error) {

      return (
        <View
          style={{
            flex: 1,

            minHeight: 400,

            justifyContent:
              "center",

            paddingHorizontal:
              theme.spacing.xl,
          }}
        >

          <InlineRetry
            title="Unable to load loans"

            description={
              `We couldn't load ${categoryName.toLowerCase()} loans. Please try again.`
            }

            loading={isFetching}

            onRetry={refetch}
          />

        </View>
      );
    }


    // ========================================
    // EMPTY
    // ========================================

    return (
      <LoanEmptyState
        categoryName={
          categoryName
        }

        onRetry={
          refetch
        }
      />
    );
  };


  // ==========================================
  // SCREEN
  // ==========================================

  return (
    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor:
          theme.colors.background,
      }}
    >

      {/* ===================================== */}
      {/* FIXED HEADER */}
      {/* ===================================== */}

      {renderHeader()}


      {/* ===================================== */}
      {/* ONE FLATLIST */}
      {/* ===================================== */}

      <FlatList

        data={
          isLoading || isFetching
            ? []
            : loans
        }


        renderItem={
          renderItem
        }


        keyExtractor={
          keyExtractor
        }


        // =====================================
        // HEADER
        // =====================================

        ListHeaderComponent={
          renderListHeader
        }


        // =====================================
        // LOADING / ERROR / EMPTY
        // =====================================

        ListEmptyComponent={
          renderEmptyComponent
        }


        // =====================================
        // PULL TO REFRESH
        // =====================================

        refreshControl={

          <RefreshControl
            refreshing={
              isFetching
            }

            onRefresh={
              handleRefresh
            }

            colors={[
              theme.colors.primary500,
            ]}

            tintColor={
              theme.colors.primary500
            }
          />

        }


        // =====================================
        // FLATLIST SETTINGS
        // =====================================

        showsVerticalScrollIndicator={
          false
        }

        keyboardShouldPersistTaps="handled"

        contentContainerStyle={{
          paddingBottom:
            theme.spacing.massive,

          flexGrow:
            loans.length === 0
              ? 1
              : 0,
        }}

      />

    </SafeAreaView>
  );
};


export default LoanCategoryScreen;