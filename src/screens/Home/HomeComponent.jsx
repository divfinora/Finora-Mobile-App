import React, {
  memo,
  useMemo,
  useState,
  useCallback,
} from "react";

import {
  View,
  FlatList,
} from "react-native";

import HeaderCard from "./components/HomeScreenHeaderCard.jsx";
import NotKycBannerCard from "./components/NotKycBannerCard";
import HomeScreenLoanSection from "./components/HomeScreenLoanSection";
import NoticeCard from "./components/NoticeCard";
import CategorySection from "./components/CategorySection";
import LoanBannerCard from "./components/LoanBannerCard";
import LoanPickerCard from "./components/LoanPickerCard";
import ReferBannerCard from "./components/ReferBannerCard";
import BottomBanner from "./components/BottomBanner";
import FinanceSection from "./components/FinanceSection";

import { theme } from "../../theme";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  useSelector,
} from "react-redux";
import useKYCVerificationDoneAndNotDone from "../../hooks/useKYCVerificationDoneAndNotDone";

import {
  useBottomTabHeight,
} from "../../navigation/BottomTabHeightContext.jsx";

import LoanEligibilityBanner from "../../components/common/LoanRegading/LoanEligibilityBanner.jsx";
const HomeComponent = () => {
  const { height: bottomTabHeight } = useBottomTabHeight();



  // =====================================================
  // NAVIGATION
  // =====================================================

  const navigation =
    useNavigation();
  const {
    refetch: refetchVerification,
  } =
    useKYCVerificationDoneAndNotDone();
  // =====================================================
  // USER
  // =====================================================

  const user = useSelector(
    (state) =>
      state.auth.user
  );

  // =====================================================
  // REFRESH
  // =====================================================

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    refreshLoans,
    setRefreshLoans,
  ] = useState(null);

  // =====================================================
  // HOME SECTIONS
  // =====================================================

  const sections = useMemo(
    () => [
      {
        id: "loan-banner",
      },
      {
        id: "finance",
      },
      {
        id: "offers",
      },
      {
        id: "loan-picker",
      },
      {
        id: "refer-banner",
      },
      {
        id: "bottom-banner",
      },
    ],
    []
  );

  // =====================================================
  // LOAN REFRESH CALLBACK
  // =====================================================

  const handleLoanRefetchReady =
    useCallback(
      (refetchFunction) => {

        setRefreshLoans(
          () => refetchFunction
        );

      },
      []
    );

  // =====================================================
  // REFRESH HOME
  // =====================================================

  const handleRefresh =
    useCallback(
      async () => {

        try {

          setRefreshing(true);

          await Promise.all([
            refreshLoans
              ? refreshLoans()
              : Promise.resolve(),

            refetchVerification(),
          ]);

        } catch (error) {

          console.log(
            "Home refresh error:",
            error
          );

        } finally {

          setRefreshing(false);

        }

      },
      [
        refreshLoans,
        refetchVerification,
      ]
    );

  // =====================================================
  // RENDER LIST ITEM
  // =====================================================

  const renderItem =
    useCallback(
      ({ item }) => {

        switch (item.id) {

          // ---------------------------------------------
          // LOAN BANNER
          // ---------------------------------------------

          case "loan-banner":

            return (
              <LoanBannerCard />
            );

          // ---------------------------------------------
          // FINANCE
          // ---------------------------------------------


          // ---------------------------------------------
          // OFFERS
          // ---------------------------------------------


          // ---------------------------------------------
          // LOAN PICKER
          // ---------------------------------------------

          case "loan-picker":

            return (
              <LoanPickerCard />
            );

          // ---------------------------------------------
          // REFER
          // ---------------------------------------------
          case "refer-banner":
            return (
              <View
                style={{
                  flex: 1,
                  // paddingHorizontal:
                  //   theme.spacing.lg,

                }}
              >
                <ReferBannerCard
                  onPress={() => {
                    navigation.navigate(
                      "refer-and-earn"
                    );
                  }}
                />
              </View>
            );


          // ---------------------------------------------
          // BOTTOM
          // ---------------------------------------------



          default:

            return null;
        }

      },
      []
    );

  // =====================================================
  // HEADER
  // =====================================================

  const listHeader =
    useMemo(
      () => (

        <>

          {/* =================================================
              HEADER AREA
          ================================================= */}

          <View style={{
            flex: 1,
            paddingHorizontal: theme.spacing.lg

          }}>






            {/* =================================================
                FLOATING KYC CARD
            ================================================= */}


            <View style={{ flex: 1, paddingTop: 8 }}>


              <NotKycBannerCard
                onPress={(path) => {
                  navigation.navigate(
                    path
                  );

                }}
              />
            </View>
            <LoanEligibilityBanner
              onPress={() => {
                // navigation later
              }}
            />




            {/* =================================================
              SPACE RESERVED FOR FLOATING KYC
          ================================================= */}

            {/* <View
                style={{
                  height: 88,

                }}
              /> */}

            {/* =================================================
              LOANS
          ================================================= */}

            <HomeScreenLoanSection
              onRefetchReady={
                handleLoanRefetchReady
              }
            />






          </View>


        </>

      ),
      [
        user?.fullName,
        navigation,
        handleLoanRefetchReady,
      ]
    );

  // =====================================================
  // RETURN
  // =====================================================

  return (

    <>
      <HeaderCard
        userName={
          user?.fullName ||
          "Parth Sarthi Singh"
        }
        onNotificationPress={() => {

          navigation.navigate(
            "get-notification-screen"
          );

        }}
      />
      <FlatList
        data={sections}

        keyExtractor={(item) =>
          item.id
        }

        renderItem={
          renderItem
        }

        ListHeaderComponent={
          listHeader
        }

        showsVerticalScrollIndicator={
          false
        }

        // ===================================================
        // REFRESH
        // ===================================================

        refreshing={
          refreshing
        }

        onRefresh={
          handleRefresh
        }

        // ===================================================
        // SCREEN BACKGROUND
        // ===================================================

        style={{
          flex: 1,
          backgroundColor:
            "#FFF9F0",
          borderwidth: 1,
        }}

        // ===================================================
        // CONTENT
        // ===================================================

        contentContainerStyle={{



          paddingBottom: bottomTabHeight + theme.spacing.massive,
          borderwidth: 1,
          backgroundColor:
            "#FCEDD6",
          // backgroundColor:'red'
        }}

        // ===================================================
        // PERFORMANCE
        // ===================================================

        removeClippedSubviews={
          true
        }

        initialNumToRender={6}

        maxToRenderPerBatch={6}

        windowSize={7}

      />

    </>


  );
};

export default memo(
  HomeComponent
);