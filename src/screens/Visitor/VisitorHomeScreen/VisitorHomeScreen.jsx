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
  theme,
} from "../../../theme";

import {
  useGetVisitorDashboardQuery,
  useGetVisitorApplicationsQuery,
} from "../../../redux/features/visitor/visitorApi";

import DashboardHeader from "./components/VisitorHomeScreenHeader";

import DashboardStats from "./components/VisitorHomeScreenStats";

import JobTabs from "./components/VisitorHomeScreenJobTabs";

import JobCard from "./components/VisitorHomeScreenJobCard";

import CurrentJobCard from "./components/VisitorHomeScreenCurrentJobCard";

import DashboardSkeleton from "./components/VisitorHomeScreenSkeleton";

import DashboardEmpty from "./components/VisitorHomeScreenEmpty";

import DashboardRetry from "./components/VisitorHomeScreenRetry";
import { SafeAreaView } from "react-native-safe-area-context";


const VisitorDashboardScreen = () => {

  const navigation =
    useNavigation();


  // =====================================================
  // TAB
  // =====================================================

  const [
    activeTab,
    setActiveTab,
  ] = useState("today");


  // =====================================================
  // DASHBOARD API
  // =====================================================

  const {

    data:
      dashboardResponse,

    isLoading:
      dashboardLoading,

    isFetching:
      dashboardFetching,

    isError:
      dashboardError,

    refetch:
      refetchDashboard,

  } =
    useGetVisitorDashboardQuery();


  // =====================================================
  // APPLICATIONS API
  // =====================================================

  const {

    data:
      applicationsResponse,

    isLoading:
      applicationsLoading,

    isFetching:
      applicationsFetching,

    isError:
      applicationsError,

    refetch:
      refetchApplications,

  } =
    useGetVisitorApplicationsQuery();


    //  console.log(applicationsResponse ,"applicationsResponse")

      // console.log(dashboardResponse ,"dashboardResponse")

 
  // =====================================================
  // REFRESH
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

          await Promise.all([

            refetchDashboard(),

            refetchApplications(),

          ]);

        } finally {

          setRefreshing(false);

        }

      },
      [
        refetchDashboard,
        refetchApplications,
      ]
    );


  // =====================================================
  // RESPONSE DATA
  // =====================================================

  const dashboard =
    dashboardResponse?.data ||
    dashboardResponse;


  const applications =
    applicationsResponse?.data ||
    applicationsResponse ||
    [];


  const visitor =
    dashboard?.visitor ||
    {};


  const summary =
    dashboard?.summary ||
    {};


  const todayJobs =
    Array.isArray(
      dashboard?.todayJobs
    )
      ? dashboard.todayJobs
      : [];


  const upcomingTasks =
    Array.isArray(
      dashboard?.upcomingTasks
    )
      ? dashboard.upcomingTasks
      : [];


  // =====================================================
  // CURRENT JOB
  // =====================================================

  const currentJob =
    useMemo(() => {

      if (
        !Array.isArray(
          applications
        )
      ) {
        return null;
      }


      return (
        applications.find(
          (item) =>
            item?.verificationStatus ===
              "IN_PROGRESS" ||
            item?.status ===
              "VISITOR_IN_PROGRESS"
        ) ||
        null
      );

    }, [
      applications,
    ]);


  // =====================================================
  // LIST DATA
  // =====================================================

  const listData =
    useMemo(() => {

      const source =
        activeTab === "today"
          ? todayJobs
          : upcomingTasks;


      if (
        source.length
      ) {

        return source;

      }


      // If dashboard todayJobs is empty,
      // use applications as current jobs.

      if (
        activeTab === "today" &&
        Array.isArray(
          applications
        )
      ) {

        return applications;

      }


      return [];

    }, [
      activeTab,
      todayJobs,
      upcomingTasks,
      applications,
    ]);


  // =====================================================
  // ERROR
  // =====================================================

  const hasError =
    dashboardError ||
    applicationsError;


  // =====================================================
  // LOADING
  // =====================================================

  const initialLoading =
    dashboardLoading ||
    applicationsLoading;


  // =====================================================
  // FETCHING
  // =====================================================

  const fetching =
    dashboardFetching ||
    applicationsFetching;


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
          "VisitorApplicationDetails",
          {
            loanId,
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

        await handleRefresh();

      },
      [
        handleRefresh,
      ]
    );


  // =====================================================
  // INITIAL LOADING
  // =====================================================

  if (
    initialLoading &&
    !dashboardResponse &&
    !applicationsResponse
  ) {

    return (

      <SafeAreaView
        style={{
          flex: 1,

          backgroundColor:
            "#F7F8F8",
        }}
      >

        <FlatList

          data={[]}

          renderItem={
            null
          }

          ListHeaderComponent={
            
            <DashboardSkeleton />
          }

          showsVerticalScrollIndicator={
            false
          }

        />

      </SafeAreaView>

    );

  }


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

    >

      <FlatList

        data={
          hasError
            ? []
            : listData
        }

        keyExtractor={(
          item,
          index
        ) => (

          String(
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
       

          <JobCard

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

            {/* HEADER */}

            <DashboardHeader

              visitor={
                visitor
              }

              unreadCount={
                dashboard
                  ?.notifications
                  ?.unread || 0
              }

              onNotificationPress={() => {

                navigation.navigate(
                  "VisitorNotifications"
                );

              }}

            />


            {/* STATS */}

            <DashboardStats

              summary={
                summary
              }

            />


            {/* CURRENT JOB */}

            {currentJob && (

              <View
                style={{
                  marginTop: 2,
                }}
              >

                <CurrentJobCard

                  job={
                    currentJob
                  }

                />

              </View>

            )}


            {/* TABS */}

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


            {/* =========================================
                RETRY
            ========================================= */}

            {hasError && (
           

              <DashboardRetry

                onRetry={
                  handleRetry
                }

                loading={
                  fetching
                }

              />

            )}


            {/* =========================================
                SECTION TITLE
            ========================================= */}

            {!hasError &&
              listData.length > 0 && (

                <Text
                  style={{
                    marginHorizontal: 24,

                    marginTop: 20,

                    marginBottom: 4,

                    fontSize: 17,

                    color: "#202020",

                    fontFamily:
                      theme.fonts.headingSemiBold,
                  }}
                >
                  {activeTab === "today"
                    ? "Today's Jobs"
                    : "Upcoming Tasks"}
                </Text>

              )}

          </View>

        }


        // =================================================
        // EMPTY
        // =================================================

        ListEmptyComponent={

          !hasError ? (

            <DashboardEmpty

              title={
                activeTab === "today"
                  ? "No jobs for today"
                  : "No upcoming tasks"
              }

              description={
                activeTab === "today"
                  ? "You don't have any verification jobs assigned for today."
                  : "You don't have any upcoming verification tasks."
              }

            />

          

          ) : null

        }


        // =================================================
        // FOOTER
        // =================================================

        ListFooterComponent={

          fetching &&
          !initialLoading ? (

            <View
              style={{
                paddingVertical: 20,
                alignItems: "center",
              }}
            >

              <Text
                style={{
                  fontSize: 12,

                  color: "#888888",

                  fontFamily:
                    theme.fonts.regular,
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
        // REFRESH
        // =================================================

        refreshControl={

          <RefreshControl

            refreshing={
              refreshing
            }

            onRefresh={
              handleRefresh
            }

            tintColor={
              theme.colors.primary500
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