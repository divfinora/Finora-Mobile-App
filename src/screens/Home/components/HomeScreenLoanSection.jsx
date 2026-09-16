import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
} from "react";

import {
  View,
  FlatList,
  Alert,
} from "react-native";

import {
  useGetAllLoanQuery,
} from "../../../redux/features/customer/customerApi";

import {
  useNavigation,
} from "@react-navigation/native";

import LoanCard from "../../Loan/components/LoanSectionComponents/LoanCard";

import LoanCardSkeleton from "../../Loan/components/LoanSectionComponents/LoanCardSkeleton";

import InlineRetry from "../../../components/common/RetryScreen/InlineRetry";

import { theme } from "../../../theme";

const HomeScreenLoanSection = ({
  onRefetchReady,
}) => {
  const navigation = useNavigation();

  // ==========================================
  // FLATLIST REF
  // ==========================================

  const listRef = useRef(null);

  // ==========================================
  // INITIAL SCROLL CONTROL
  // ==========================================

  const hasInitialScrolled = useRef(false);

  // ==========================================
  // API
  // ==========================================

  const {
    data,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetAllLoanQuery();

  // ==========================================
  // LOADING
  // ==========================================

  const loading =
    isLoading ||
    isFetching;

  // ==========================================
  // GIVE REFETCH TO HOME COMPONENT
  // ==========================================

  useEffect(() => {
    if (onRefetchReady) {
      onRefetchReady(() => refetch());
    }
  }, [
    onRefetchReady,
    refetch,
  ]);

  // ==========================================
  // RESET TO FIRST CARD WHEN LOADING STARTS
  // ==========================================

  useEffect(() => {
    if (!loading) {
      return;
    }

    // Allow initial scroll again
    hasInitialScrolled.current = false;

    // ==========================================
    // LOADING / REFETCH
    // ALWAYS START FROM FIRST CARD
    // ==========================================

    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({
        offset: 0,
        animated: false,
      });
    });
  }, [loading]);

  // ==========================================
  // AFTER LOADING COMPLETE
  // GIVE USER SCROLL HINT
  // ==========================================

  useEffect(() => {
    if (loading) {
      return;
    }

    if (hasInitialScrolled.current) {
      return;
    }

    // Don't scroll if there is no data
    if (!loans?.length) {
      return;
    }

    hasInitialScrolled.current = true;

    // ==========================================
    // WAIT FOR FLATLIST TO RENDER
    // ==========================================

    requestAnimationFrame(() => {
      setTimeout(() => {
        listRef.current?.scrollToOffset({
          offset: 100,
          animated: false,
        });
      }, 50);
    });
  }, [
    loading,
  ]);

  // ==========================================
  // API LOANS
  // ==========================================

  const apiLoans =
    data?.data || [];

  const loans =
    apiLoans;

  // ==========================================
  // LOAN PRESS
  // ==========================================

  const handleLoanPress =
    useCallback(
      (item) => {

        console.log(
          "HOME LOAN API ITEM:",
          item
        );

        // ==========================================
        // 1. MULTIPLE LOANS
        // ==========================================

        const loanCount =
          item?.loanCount ??
          item?.types?.reduce(
            (total, type) =>
              total +
              (type?.loanCount || 0),
            0
          );

        if (loanCount > 1) {

          navigation.navigate(
            "loan-category-screen",
            {
              category:
                item?.category,

              categoryName:
                item?.name,
            }
          );

          return;
        }

        // ==========================================
        // 2. SINGLE LOAN
        // ==========================================

        const loan =
          item?.loan;

        if (!loan) {

          Alert.alert(
            "Loan Unavailable",
            "Loan details are not available."
          );

          return;
        }

        // ==========================================
        // 3. DYNAMIC DOCUMENTS
        // ==========================================

        const documents =
          Array.isArray(
            loan?.documents
          )
            ? loan.documents
            : [];

        console.log(
          "HOME LOAN DOCUMENTS:",
          documents
        );

        // ==========================================
        // 4. PROCESSING TYPE
        // ==========================================

        if (
          loan.processingType ===
          "INSTANT"
        ) {

          navigation.navigate(
            "apply-instant-loan",
            {
              product:
                loan,

              productId:
                loan?._id,

              documents:
                documents,
            }
          );

          return;
        }

        // ==========================================
        // 5. MANUAL LOAN
        // ==========================================

        const category =
          loan?.category;

        switch (category) {

          case "GOLD":

            navigation.navigate(
              "apply-gold-loan",
              {
                product:
                  loan,

                productId:
                  loan?._id,

                documents:
                  documents,
              }
            );

            break;

          case "PROPERTY":

            navigation.navigate(
              "apply-property-loan",
              {
                product:
                  loan,

                productId:
                  loan?._id,

                documents:
                  documents,
              }
            );

            break;

          case "VEHICLE":

            navigation.navigate(
              "apply-vechicle-loan",
              {
                product:
                  loan,

                productId:
                  loan?._id,

                documents:
                  documents,
              }
            );

            break;

          case "AGRICULTURE":

            navigation.navigate(
              "apply-agriculture-loan",
              {
                product:
                  loan,

                productId:
                  loan?._id,

                documents:
                  documents,
              }
            );

            break;

          case "RENOVATION":

            navigation.navigate(
              "apply-renovation-loan",
              {
                product:
                  loan,

                productId:
                  loan?._id,

                documents:
                  documents,
              }
            );

            break;

          case "COMMERCIAL":

            navigation.navigate(
              "apply-commercial-loan",
              {
                product:
                  loan,

                productId:
                  loan?._id,

                documents:
                  documents,
              }
            );

            break;

          case "PERSONAL":

            navigation.navigate(
              "apply-personal-loan",
              {
                product:
                  loan,

                productId:
                  loan?._id,

                documents:
                  documents,
              }
            );

            break;

          case "EDUCATION":

            navigation.navigate(
              "apply-education-loan",
              {
                product:
                  loan,

                productId:
                  loan?._id,

                documents:
                  documents,
              }
            );

            break;

          case "HOME":

            navigation.navigate(
              "apply-home-loan",
              {
                product:
                  loan,

                productId:
                  loan?._id,

                documents:
                  documents,
              }
            );

            break;

          default:

            Alert.alert(
              "Loan Unavailable",
              "This loan is currently not available."
            );
        }

      },
      [navigation]
    );

  // ==========================================
  // RENDER ITEM
  // ==========================================

  const renderItem =
    useCallback(
      ({ item }) => {

        // ==========================================
        // LOADING / SKELETON
        // ==========================================

        if (loading) {

          return (
            <View
              style={{
                width: 180,

                marginRight:
                  theme.spacing.md,
              }}
            >
              <LoanCardSkeleton
                horizontal={true}
              />
            </View>
          );
        }

        // ==========================================
        // ACTUAL LOAN CARD
        // ==========================================

        return (
          <View
            style={{
              width: 180,

              marginRight:
                theme.spacing.md,
            }}
          >
            <LoanCard
              horizontal={true}

              loan={item}

              onPress={() =>
                handleLoanPress(
                  item
                )
              }
            />
          </View>
        );

      },
      [
        loading,
        handleLoanPress,
      ]
    );

  // ==========================================
  // KEY
  // ==========================================

  const keyExtractor =
    useCallback(
      (item, index) =>
        item?._id ||
        index.toString(),
      []
    );

  // ==========================================
  // LOADING DATA
  // ==========================================

  const listData =
    loading
      ? Array.from({
          length: 4,
        })
      : loans;

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <View
      style={{
        marginBottom:
          theme.spacing.xl,
      }}
    >

      {/* =================================
          ERROR
      ================================= */}

      {error &&
      apiLoans.length === 0 ? (

        <InlineRetry
          title="Unable to load loans"
          description="Please try again."
          loading={
            isFetching
          }
          onRetry={
            refetch
          }
          containerStyle={{
            marginHorizontal:
              theme.spacing.xs,
          }}
        />

      ) : (

        <FlatList
          ref={listRef}

          horizontal

          data={
            listData
          }

          keyExtractor={
            keyExtractor
          }

          renderItem={
            renderItem
          }

          showsHorizontalScrollIndicator={
            false
          }

          contentContainerStyle={{
          }}
        />

      )}

    </View>
  );
};

export default memo(
  HomeScreenLoanSection
);