import React, {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  RefreshControl,
  FlatList,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  theme,
} from "../../../theme";

import {
  useGetVisitorDashboardQuery,
} from "../../../redux/features/visitor/visitorApi";

import VisitorHomeScreenHeader from "./components/VisitorHomeScreenHeader";

import VisitorHomeScreenStats from "./components/VisitorHomeScreenStats";

import JobTabs from "./components/VisitorHomeScreenJobTabs";

import VisitorHomeScreenJobCard from "./components/VisitorHomeScreenJobCard";

import VisitorHomeScreenSkeleton from "./components/VisitorHomeScreenSkeleton";

import DashboardEmpty from "./components/VisitorHomeScreenEmpty";

import DashboardRetry from "./components/VisitorHomeScreenRetry";


const VisitorDashboardScreen = () => {

  const navigation =
    useNavigation();


  // =====================================================
  // ACTIVE TAB
  // =====================================================

  const [
    activeTab,
    setActiveTab,
  ] =  useState("today");


  // =====================================================
  // DASHBOARD API
  // =====================================================

  const {
    data:
      dashboardResponse,

    isLoading:
      isLoadingDashboard,

    isFetching:
      isFetchingDashboard,

    isError:
      dashboardError,

    refetch:
      refetchDashboard,

  } =
    useGetVisitorDashboardQuery();


  // =====================================================
  // COMMON LOADING
  //
  // Initial API loading +
  // Pull to refresh / refetch
  // =====================================================

  const loading =
    isLoadingDashboard ||
    isFetchingDashboard;


  // =====================================================
  // REFRESHING
  // =====================================================

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);


  const handleRefresh =
    useCallback(
      async () => {

        setRefreshing(true);

        try {

          await refetchDashboard();

        } finally {

          setRefreshing(false);

        }

      },
      [
        refetchDashboard,
      ]
    );


  // =====================================================
  // DASHBOARD RESPONSE
  // =====================================================

  const dashboard =
    dashboardResponse?.data ||
    dashboardResponse ||
    {};


  // =====================================================
  // VISITOR
  // =====================================================

  const visitor =
    dashboard?.visitor ||
    {};


  // =====================================================
  // SUMMARY
  // =====================================================

  const summary =
    dashboard?.summary ||
    {};


  // =====================================================
  // NOTIFICATION COUNT
  // =====================================================

  const unreadCount =
    dashboard?.notifications
      ?.unread || 0;


  // =====================================================
  // current-job JOBS
  //
  // IMPORTANT:
  //
  // Backend currently sends today's jobs.
  //
  // UI will show these as
  // "Current Jobs".
  //
  // Later backend can send the
  // current/in-progress job inside
  // this same todayJobs array.
  // =====================================================

  const todayJobs =
    Array.isArray(
      dashboard?.todayJobs
    )
      ?dashboard.todayJobs
      : [];


  // =====================================================
  // UPCOMING TASKS
  // =====================================================

  const upcomingTasks =
    Array.isArray(
      dashboard?.upcomingTasks
    )
      ? dashboard.upcomingTasks
      : [];


  // =====================================================
  // LIST DATA
  // =====================================================

  const listData =
    useMemo(() => {

      if (
        activeTab === "today"
      ) {

        return todayJobs;

      }

      return upcomingTasks;

    }, [
      activeTab,
      todayJobs,
      upcomingTasks,
    ]);


  // =====================================================
  // ERROR
  // =====================================================

  const hasError =
    !!dashboardError;


  // =====================================================
  // FETCHING
  // =====================================================

  const fetching =
    isFetchingDashboard;


  // =====================================================
  // JOB PRESS
  // =====================================================

  const handleJobPress =
    useCallback(
      (item) => {

        const loanId =
          item?.loanId ||
          item?.id;


        if (!loanId) {

          return;

        }


        

      navigation.navigate(
      "visitor-investingation-screen",
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
  // RETRY
  // =====================================================

  const handleRetry =
    useCallback(
      async () => {

        await refetchDashboard();

      },
      [
        refetchDashboard,
      ]
    );


  // =====================================================
  // EMPTY TITLE
  // =====================================================

  const emptyTitle =
    activeTab === "today"

      ? "No current jobs"

      : "No upcoming tasks";


  // =====================================================
  // EMPTY DESCRIPTION
  // =====================================================

  const emptyDescription =
    activeTab === "today"

      ? "You don't have any current verification jobs assigned."

      : "You don't have any upcoming verification tasks.";


  // =====================================================
  // SECTION TITLE
  // =====================================================

  


  // =====================================================
  // SCREEN
  // =====================================================

  return (

    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor:
          "#F7F8F8",
      }}

      edges={[
        "right",
        "left",
      ]}
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <VisitorHomeScreenHeader

        visitor={
          visitor
        }

        unreadCount={
          unreadCount
        }

        onNotificationPress={() => {

          navigation.navigate(
            "visitor-get-notification-screen"
          );

        }}

      />


      {/* =================================================
          MAIN LIST
      ================================================= */}

      <FlatList

        data={

          hasError ||
          loading

            ? []

            : listData

        }


        // =================================================
        // KEY
        // =================================================

        keyExtractor={(
          item,
          index
        ) => (

          String(

            item?.jobId ||

            item?.verificationId ||

            item?.loanId ||

            item?.applicationId ||

            item?._id ||

            item?.id ||

            index

          )

        )}


        // =================================================
        // JOB CARD
        // =================================================

        renderItem={({
          item,
        }) => (

          <VisitorHomeScreenJobCard

            item={
              item
            }

            onPress={
              handleJobPress
            }

          />

        )}


        // =================================================
        // HEADER
        // =================================================

        ListHeaderComponent={

          <View>

            {/* ===========================================
                STATS
            =========================================== */}

            <VisitorHomeScreenStats

              summary={
                summary
              }

              loading={
                loading
              }

            />


            {/* ===========================================
                TABS
            =========================================== */}

            <View
              style={{
                marginTop: 8,

                marginBottom: 2,
              }}
            >

              <JobTabs

                activeTab={
                  activeTab
                }

                onChange={
                  setActiveTab
                }

              />

            </View>


            {/* ===========================================
                JOB SKELETON
            =========================================== */}

            {loading && (

              <View
                style={{
                  marginTop: 4,
                }}
              >

                <VisitorHomeScreenSkeleton />

                <VisitorHomeScreenSkeleton />

                <VisitorHomeScreenSkeleton />

              </View>

            )}


            {/* ===========================================
                RETRY
            =========================================== */}

            {!loading &&
              hasError && (

                <DashboardRetry

                  onRetry={
                    handleRetry
                  }

                  loading={
                    fetching
                  }

                />

              )}


            {/* ===========================================
                SECTION TITLE
            =========================================== */}

        

          </View>

        }


        // =================================================
        // NOT FOUND / EMPTY
        //
        // IMPORTANT:
        //
        // Loading ke time NULL.
        //
        // Error ke time NULL.
        //
        // Sirf API response ke baad
        // empty data hone par show hoga.
        // =================================================

        ListEmptyComponent={

          !loading &&
          !hasError ? (

            <DashboardEmpty

              title={
                emptyTitle
              }

              description={
                emptyDescription
              }

            />

          ) : null

        }


        // =================================================
        // FOOTER
        // =================================================

        ListFooterComponent={

          !loading &&
          fetching ? (

            <View
              style={{
                paddingVertical: 20,

                alignItems:
                  "center",
              }}
            >

              <Text
                style={{
                  fontSize: 12,

                  color:
                    "#888888",

                  fontFamily:
                    theme.fonts
                      .regular,
                }}
              >
                Updating...
              </Text>

            </View>

          ) : (

            <View
              style={{
                height: 25,
              }}
            />

          )

        }


        // =================================================
        // PULL TO REFRESH
        // =================================================

        refreshControl={

          <RefreshControl

            refreshing={
              refreshing ||
              isFetchingDashboard
            }

            onRefresh={
              handleRefresh
            }

            tintColor={
              theme.colors
                .primary500
            }

          />

        }


        showsVerticalScrollIndicator={
          false
        }


        contentContainerStyle={{
          paddingBottom: 20,
        }}

      />

    </SafeAreaView>

  );

};


export default VisitorDashboardScreen;