import React, {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import {
  Bell,
} from "lucide-react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  theme,
} from "../../../theme";

import {
  useGetVisitorApplicationsQuery,
} from "../../../redux/features/visitor/visitorApi.js";

import BackButtonLinerGradint from "../../../components/common/BackButton/BackButtonLinerGradint.jsx";

import InlineRetry from "../../../components/common/RetryScreen/InlineRetry.jsx";

import LoanSearchBar from "./components/LoanSearchBar.jsx";

import LoanFilterTabs from "./components/LoanFilterTabs.jsx";

import LoanCard from "./components/LoanCard.jsx";

import LoanCardSkeleton from "./components/LoanCardSkeleton.jsx";

import LoanNotFound from "./components/LoanNotFound.jsx";


// =====================================================
// SCREEN
// =====================================================

const MyApplicationsScreen = () => {

  const insets =
    useSafeAreaInsets();

  const navigation =
    useNavigation();


  // =====================================================
  // SEARCH
  // =====================================================

  const [
    searchQuery,
    setSearchQuery,
  ] = useState("");


  // =====================================================
  // FILTER
  // =====================================================

  const [
    activeFilter,
    setActiveFilter,
  ] = useState("ALL");


  // =====================================================
  // PULL TO REFRESH
  // =====================================================

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);


  // =====================================================
  // API
  // =====================================================

  const {
    data: applicationsResponse,

    isLoading,

    isFetching,

    isError,

    refetch,
  } =
    useGetVisitorApplicationsQuery();


  // =====================================================
  // IMPORTANT
  // isLoading OR isFetching
  // BOTH SHOW SKELETON
  // =====================================================

  const isApplicationsLoading =
    isLoading ||
    isFetching;


  // =====================================================
  // API DATA
  // =====================================================

  const applications =
    Array.isArray(
      applicationsResponse?.data
    )
      ? applicationsResponse.data
      : [];


  // =====================================================
  // FILTER + SEARCH
  // =====================================================

 // =====================================================
// FILTER + SEARCH
// =====================================================

const filteredApplications =
  useMemo(() => {

    const query =
      searchQuery
        ?.trim()
        ?.toLowerCase() ||
      "";


    return applications.filter(
      (item) => {

        // =============================================
        // APPLICATION STATUS
        // =============================================

       const rawStatus =
  String(
    item?.verificationStatus ||
    item?.status ||
    ""
  )
    .trim()
    .toUpperCase();


        // =============================================
        // NORMALIZE STATUS
        // =============================================

        const normalizedStatus =
          rawStatus
            .replace(
              /^VISITOR_/,
              ""
            );


        let matchesFilter =
          true;


        // =============================================
        // ALL
        // =============================================

        if (
          activeFilter ===
          "ALL"
        ) {

          matchesFilter = true;

        }


        // =============================================
        // ASSIGNED
        // =============================================

        else if (
          activeFilter ===
          "ASSIGNED"
        ) {

          matchesFilter =
            normalizedStatus ===
            "ASSIGNED";

        }


        // =============================================
        // IN PROGRESS
        // =============================================

        else if (
          activeFilter ===
          "IN_PROGRESS"
        ) {

          matchesFilter =
            normalizedStatus ===
              "IN_PROGRESS";

        }


        // =============================================
        // COMPLETED
        // =============================================

        else if (
          activeFilter ===
          "COMPLETED"
        ) {

          matchesFilter =
            normalizedStatus ===
              "COMPLETED" ||

            normalizedStatus ===
              "SUBMITTED";

        }


        // =============================================
        // REJECTED
        // =============================================

        else if (
          activeFilter ===
          "REJECTED"
        ) {

          matchesFilter =
            normalizedStatus ===
            "REJECTED";

        }


        // =============================================
        // STATUS NOT MATCHED
        // =============================================

        if (
          !matchesFilter
        ) {

          return false;

        }


        // =============================================
        // SEARCH
        // =============================================

        if (
          !query
        ) {

          return true;

        }


        // =============================================
        // LOAN ID
        // =============================================

        const loanId =
          String(
            item?.loanId ||
            ""
          )
            .toLowerCase();


        // =============================================
        // APPLICATION ID
        // =============================================

        const applicationId =
          String(
            item?.applicationId ||
            ""
          )
            .toLowerCase();


        // =============================================
        // CUSTOMER NAME
        // =============================================

        const customerName =
          String(
            item?.customer?.fullName ||
            item?.customerName ||
            ""
          )
            .toLowerCase();


        // =============================================
        // MOBILE
        // =============================================

        const customerMobile =
          String(
            item?.customer?.mobile ||
            item?.mobile ||
            ""
          )
            .toLowerCase();


        // =============================================
        // PRODUCT
        // =============================================

        const productName =
          String(
            item?.product?.displayName ||
            item?.product?.name ||
            item?.productName ||
            ""
          )
            .toLowerCase();


        // =============================================
        // SEARCH MATCH
        // =============================================

        return (

          loanId.includes(
            query
          ) ||

          applicationId.includes(
            query
          ) ||

          customerName.includes(
            query
          ) ||

          customerMobile.includes(
            query
          ) ||

          productName.includes(
            query
          )

        );

      }
    );

  }, [
    applications,
    activeFilter,
    searchQuery,
  ]);


  // =====================================================
  // REFRESH
  // =====================================================

  const handleRefresh =
    useCallback(
      async () => {

        setRefreshing(
          true
        );


        try {

          await refetch();

        } catch (
          error
        ) {

          console.log(
            "My Applications refresh error:",
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


  // =====================================================
  // VIEW DETAILS
  // =====================================================

  const handleViewDetails =
    useCallback(
      (item) => {

        navigation.navigate(
          "visitor-application-details-screen",
          {
            job: item,
          }
        );

      },
      [
        navigation,
      ]
    );


  // =====================================================
  // REPORT
  // =====================================================

  const handleReport =
    useCallback(
      (item) => {

        console.log(
          "Report clicked:",
          item
        );

        // Add report modal / navigation here.

      },
      []
    );


  // =====================================================
  // HEADER
  // =====================================================

  const renderHeader =
    () => {

      return (

        <BackButtonLinerGradint

          title="Loan Verifier"

          onPress={() =>
            navigation.goBack()
          }

          containerStyle={{
            paddingTop:
              insets.top,

            paddingHorizontal:
              theme.spacing.xxl,
          }}

          rightComponent={

            <View
              style={{
                width: 38,

                height: 38,

                borderRadius: 12,

                backgroundColor:
                  "#FFF0D8",

                alignItems:
                  "center",

                justifyContent:
                  "center",
              }}
            >

              <Bell
                size={22}

                color={
                  theme.colors.primary500
                }

                strokeWidth={2.2}
              />

            </View>

          }

        />

      );
    };


  // =====================================================
  // LOADING
  // =====================================================

  const renderLoading =
    () => {

      return (

        <>

          <LoanCardSkeleton />

          <LoanCardSkeleton />

          <LoanCardSkeleton />

        </>

      );
    };


  // =====================================================
  // ERROR
  // =====================================================

  const renderError =
    () => {

      return (

        <InlineRetry

          title="Unable to load applications"

          description="Something went wrong while loading your verification applications."

          buttonText="Retry"

          loading={
            isApplicationsLoading
          }

          onRetry={
            refetch
          }

          containerStyle={{
            marginTop:
              theme.spacing.xl,
          }}

        />

      );
    };


  // =====================================================
  // APPLICATION LIST
  // =====================================================

  const renderApplications =
    () => {

      if (
        filteredApplications.length ===
        0
      ) {

        return (

          <LoanNotFound

            searchQuery={
              searchQuery
            }

            filter={
              activeFilter
            }

          />

        );
      }


      return (

        <>

          {filteredApplications.map(
            (
              item,
              index
            ) => (

              <LoanCard

                key={
                  item?.loanId ||
                  item?.applicationId ||
                  String(index)
                }

                item={
                  item
                }

                onPress={
                  handleViewDetails
                }

                onReport={
                  handleReport
                }

              />

            )
          )}

        </>

      );
    };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <SafeAreaView

      edges={[
       
        "left",
        "right",
      ]}

      style={{
        flex: 1,

        backgroundColor:
          theme.colors.background,
      }}

    >

      <KeyboardAvoidingView

        style={{
          flex: 1,
        }}

        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }

      >

        {/* =================================================
            HEADER
        ================================================= */}

        {renderHeader()}


        {/* =================================================
            CONTENT
        ================================================= */}

        <ScrollView

          showsVerticalScrollIndicator={
            false
          }

          keyboardShouldPersistTaps="handled"

          refreshControl={

            <RefreshControl

              refreshing={
                refreshing
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

          contentContainerStyle={{

            paddingHorizontal:
              theme.spacing.xxl,

            paddingTop:
              theme.spacing.md,

            paddingBottom:
              theme.spacing.xxxl,

          }}

        >

          {/* =================================================
              SEARCH
          ================================================= */}

          <LoanSearchBar

            value={
              searchQuery
            }

            onChangeText={
              setSearchQuery
            }

            onClear={() =>
              setSearchQuery("")
            }

          />


          {/* =================================================
              FILTER
          ================================================= */}

          <View
            style={{

              marginTop:
                theme.spacing.lg,

              marginBottom:
                theme.spacing.lg,

            }}
          >

            <LoanFilterTabs

              activeFilter={
                activeFilter
              }

              onChange={
                setActiveFilter
              }

            />

          </View>


          {/* =================================================
              ERROR
          ================================================= */}

          {isError &&
          !applicationsResponse ? (

            renderError()

          ) : isApplicationsLoading ? (

            // ===============================================
            // BOTH isLoading + isFetching
            // SHOW SKELETON
            // ===============================================

            renderLoading()

          ) : (

            renderApplications()

          )}

        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );
};


export default MyApplicationsScreen;