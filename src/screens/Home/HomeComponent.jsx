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

import HeaderCard from "./components/HeaderCard";
import KycBannerCard from "./components/KycBannerCard";
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

const HomeComponent = () => {

  // =====================================================
  // NAVIGATION
  // =====================================================

  const navigation =
    useNavigation();

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

          if (refreshLoans) {
            await refreshLoans();
          }

        } catch (error) {

          console.log(
            "Home refresh error:",
            error
          );

        } finally {

          setRefreshing(false);

        }

      },
      [refreshLoans]
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


            <View
              style={{
                position: "relative",
                zIndex: 20,
              }}
            >

              {/* HEADER */}

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

              {/* =================================================
                FLOATING KYC CARD
            ================================================= */}

              <View
                style={{
                  position: "absolute",

                  left: 0,
                  right: 0,

                  bottom: -72,

                  zIndex: 100,

                  elevation: 15,
                }}
              >

                <KycBannerCard
                  onPress={() => {

                    navigation.navigate(
                      "complete-kyc-screen"
                    );

                  }}
                />

              </View>

            </View>

            {/* =================================================
              SPACE RESERVED FOR FLOATING KYC
          ================================================= */}

            <View
              style={{
                height: 88,

              }}
            />

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
      }}

      // ===================================================
      // CONTENT
      // ===================================================

      contentContainerStyle={{


        paddingBottom:
          theme.spacing.massive,

        backgroundColor:
          "#FFF9F0",
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
  );
};

export default memo(
  HomeComponent
);