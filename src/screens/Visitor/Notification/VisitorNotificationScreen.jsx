import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  FlatList,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  useGetEmployeeNotificationsQuery,
} from "../../../redux/features/visitor/visitorApi";

import {
  theme,
} from "../../../theme";

import InlineRetry from "../../../components/common/RetryScreen/InlineRetry";

import VisitorNotificationHeader from "./components/VisitorNotificationHeader";
import VisitorNotificationTabFilter from "./components/VisitorNotificationTabFilter";
import VisitorNotificationCard from "./components/VisitorNotificationCard";
import VisitorNotificationSkeleton from "./components/VisitorNotificationSkeleton";
import VisitorNotificationEmptyState from "./components/VisitorNotificationEmptyState";

import LinearGradientCommonHeader from "../../../components/common/BackButton/LinearGradientCommonHeader";  
// =====================================================
// CONSTANTS
// =====================================================

const LIMIT = 20;


// =====================================================
// DATE GROUP
// =====================================================

const getDateGroup = (
  dateString
) => {

  if (!dateString) {
    return "THIS WEEK";
  }


  const date =
    new Date(dateString);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "THIS WEEK";
  }


  const now =
    new Date();


  const todayStart =
    new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );


  const dateStart =
    new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );


  const diffDays =
    Math.floor(
      (
        todayStart.getTime() -
        dateStart.getTime()
      ) /
        (1000 * 60 * 60 * 24)
    );


  if (
    diffDays === 0
  ) {
    return "TODAY";
  }


  if (
    diffDays === 1
  ) {
    return "YESTERDAY";
  }


  if (
    diffDays < 7
  ) {
    return "THIS WEEK";
  }


  return "OLDER";
};


// =====================================================
// SCREEN
// =====================================================

const VisitorNotificationScreen = () => {

  const navigation =
    useNavigation();


  // ===================================================
  // ACTIVE FILTER
  // ===================================================

  const [
    activeFilter,
    setActiveFilter,
  ] = useState("ALL");


  // ===================================================
  // PAGE
  // ===================================================

  const [
    page,
    setPage,
  ] = useState(1);


  // ===================================================
  // TOTAL PAGES
  // ===================================================

  const [
    totalPages,
    setTotalPages,
  ] = useState(1);


  // ===================================================
  // NOTIFICATIONS
  // ===================================================

  const [
    notifications,
    setNotifications,
  ] = useState([]);


  // ===================================================
  // PULL TO REFRESH
  // ===================================================

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);


  // ===================================================
  // LOAD MORE
  // ===================================================

  const [
    loadingMore,
    setLoadingMore,
  ] = useState(false);


  // ===================================================
  // API
  // ===================================================

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } =
    useGetEmployeeNotificationsQuery(
      {
        page,
        limit: LIMIT,
        filter: activeFilter,
      },
      {
        refetchOnMountOrArgChange:
          true,
      }
    );


  // ===================================================
  // API RESPONSE
  // ===================================================

  useEffect(() => {

    if (!data) {
      return;
    }


    const apiList =
      Array.isArray(
        data?.data
      )
        ? data.data
        : [];


    const pagination =
      data?.pagination ||
      {};


    const currentPage =
      pagination?.page ??
      page;


    const pages =
      pagination?.totalPages ??
      1;


    setTotalPages(
      pages
    );


    // =================================================
    // FIRST PAGE
    // =================================================

    if (
      currentPage === 1
    ) {

      setNotifications(
        apiList
      );

      setLoadingMore(
        false
      );

      return;
    }


    // =================================================
    // NEXT PAGE
    // =================================================

    setNotifications(
      (previous) => {

        const existingIds =
          new Set(
            previous.map(
              (item) =>
                item?._id ||
                item?.id
            )
          );


        const newItems =
          apiList.filter(
            (item) =>
              !existingIds.has(
                item?._id ||
                item?.id
              )
          );


        return [
          ...previous,
          ...newItems,
        ];
      }
    );


    setLoadingMore(
      false
    );

  }, [
    data,
    page,
  ]);


  // ===================================================
  // FILTER CHANGE
  // ===================================================

  const handleFilterChange =
    useCallback(
      (filter) => {

        if (
          filter ===
          activeFilter
        ) {
          return;
        }


        console.log(
          "🔎 Notification Filter:",
          filter
        );


        setActiveFilter(
          filter
        );


        setPage(
          1
        );


        setNotifications(
          []
        );


        setTotalPages(
          1
        );


        setLoadingMore(
          false
        );

      },
      [
        activeFilter,
      ]
    );


  // ===================================================
  // PULL TO REFRESH
  // ===================================================

  const handleRefresh =
    useCallback(
      async () => {

        if (
          refreshing
        ) {
          return;
        }


        try {

          setRefreshing(
            true
          );


          console.log(
            "🔄 Refreshing Visitor Notifications..."
          );


          // Reset page
          setPage(
            1
          );


          setLoadingMore(
            false
          );


          // Refetch current API
          const result =
            await refetch();


          const apiList =
            Array.isArray(
              result?.data?.data
            )
              ? result.data.data
              : [];


          const pagination =
            result?.data
              ?.pagination ||
            {};


          setNotifications(
            apiList
          );


          setTotalPages(
            pagination?.totalPages ??
            1
          );


          console.log(
            "✅ Visitor Notifications Refreshed"
          );

        } catch (error) {

          console.log(
            "❌ Notification Refresh Error:",
            error
          );

        } finally {

          setRefreshing(
            false
          );

        }

      },
      [
        refreshing,
        refetch,
      ]
    );


  // ===================================================
  // RETRY
  // ===================================================

  const handleRetry =
    useCallback(
      async () => {

        try {

          console.log(
            "🔁 Retrying Visitor Notifications..."
          );


          setPage(
            1
          );


          setNotifications(
            []
          );


          setTotalPages(
            1
          );


          setLoadingMore(
            false
          );


          await refetch();

        } catch (error) {

          console.log(
            "❌ Notification Retry Error:",
            error
          );

        }

      },
      [
        refetch,
      ]
    );


  // ===================================================
  // LOAD MORE
  // ===================================================

  const handleLoadMore =
    useCallback(
      () => {

        // ---------------------------------------------
        // Already fetching
        // ---------------------------------------------

        if (
          isLoading ||
          isFetching ||
          loadingMore
        ) {
          return;
        }


        // ---------------------------------------------
        // No more pages
        // ---------------------------------------------

        if (
          page >=
          totalPages
        ) {
          return;
        }


        console.log(
          "📄 Loading Notification Page:",
          page + 1
        );


        setLoadingMore(
          true
        );


        setPage(
          (previousPage) =>
            previousPage + 1
        );

      },
      [
        isLoading,
        isFetching,
        loadingMore,
        page,
        totalPages,
      ]
    );


  // ===================================================
  // NOTIFICATION PRESS
  // ===================================================

  const handleNotificationPress =
    useCallback(
      (notification) => {

        console.log(
          "🔔 Visitor Notification Pressed:",
          notification
        );


        /*
        Future:

        navigation.navigate(
          "NotificationDetails",
          {
            notificationId:
              notification?._id,
          }
        );
        */

      },
      []
    );


  // ===================================================
  // GROUP NOTIFICATIONS
  // ===================================================

  const groupedNotifications =
    useMemo(() => {

      const result = [];

      let currentGroup =
        null;


      notifications.forEach(
        (notification) => {

          const group =
            getDateGroup(
              notification?.createdAt
            );


          // -------------------------------------------
          // GROUP HEADER
          // -------------------------------------------

          if (
            group !==
            currentGroup
          ) {

            currentGroup =
              group;


            result.push({
              id:
                `group-${group}`,

              itemType:
                "GROUP",

              title:
                group,
            });

          }


          // -------------------------------------------
          // NOTIFICATION
          // -------------------------------------------

          result.push({
            ...notification,

            itemType:
              "NOTIFICATION",
          });

        }
      );


      return result;

    }, [
      notifications,
    ]);


  // ===================================================
  // RENDER ITEM
  // ===================================================

  const renderItem =
    useCallback(
      ({
        item,
      }) => {

        // =============================================
        // GROUP
        // =============================================

        if (
          item?.itemType ===
          "GROUP"
        ) {

          return (
            <Text
              style={{
                marginTop:
                  theme.spacing.md,

                marginBottom:
                  theme.spacing.md,

                fontSize:
                  theme.typography.b3,

                lineHeight:
                  theme.lineHeight.b3,

                fontFamily:
                  theme.fonts.semiBold,

                color:
                  theme.colors.gray500,
              }}
            >
              {item.title}
            </Text>
          );

        }


        // =============================================
        // NOTIFICATION CARD
        // =============================================

        return (
          <VisitorNotificationCard
            notification={
              item
            }
            onPress={
              handleNotificationPress
            }
          />
        );

      },
      [
        handleNotificationPress,
      ]
    );


  // ===================================================
  // KEY EXTRACTOR
  // ===================================================

  const keyExtractor =
    useCallback(
      (
        item,
        index
      ) => {

        return String(
          item?._id ||
          item?.id ||
          `notification-${index}`
        );

      },
      []
    );


  // ===================================================
  // FOOTER
  // ===================================================

  const renderFooter =
    useCallback(
      () => {

        if (
          !loadingMore
        ) {
          return null;
        }


        return (
          <View
            style={{
              paddingVertical:
                theme.spacing.xl,

              alignItems:
                "center",

              justifyContent:
                "center",
            }}
          >

            <ActivityIndicator
              size="small"
              color={
                theme.colors.primary500
              }
            />

          </View>
        );

      },
      [
        loadingMore,
      ]
    );


  // ===================================================
  // EMPTY STATE
  // ===================================================

  const renderEmpty =
    useCallback(
      () => {

        // ---------------------------------------------
        // Loading handled outside
        // ---------------------------------------------

        if (
          isLoading ||
          isFetching
        ) {
          return null;
        }


        // ---------------------------------------------
        // Error handled outside
        // ---------------------------------------------

        if (
          isError
        ) {
          return null;
        }


        return (
          <VisitorNotificationEmptyState
            activeFilter={
              activeFilter
            }
          />
        );

      },
      [
        isLoading,
        isFetching,
        isError,
        activeFilter,
      ]
    );


  // ===================================================
  // SKELETON
  // ===================================================
  //
  // IMPORTANT:
  // isLoading OR isFetching
  // dono par same skeleton show hoga.
  //
  // ===================================================

 
  const showSkeleton =
    isLoading ||
    isFetching;


  // ===================================================
  // ERROR
  // ===================================================

  const showError =
    isError &&
    !isLoading &&
    !isFetching &&
    notifications.length === 0;


  // ===================================================
  // MAIN UI
  // ===================================================

  return (
    <SafeAreaView
    edges={[    'left' ,'right' ,'bottom']}
      style={{
     
        flex: 1,

        backgroundColor:
          theme.colors.white,
      }}
    >

      {/* ================================================= */}
      {/* STATUS BAR */}
      {/* ================================================= */}
<StatusBar
  translucent={true}
  backgroundColor="transparent"
  barStyle="dark-content"
/>


      {/* ================================================= */}
      {/* MAIN CONTAINER */}
      {/* ================================================= */}

      <View
        style={{
          flex: 1,

          backgroundColor:
            theme.colors.white,
        }}
      >

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

      
<LinearGradientCommonHeader
  title="Notification"
  onBackPress={() =>
    navigation.goBack()
  }
  // rightText="Mark all as read" 
  onRightPress={() => {
    console.log(
      "Mark all as read"
    );
  }}
/>

        {/* ================================================= */}
        {/* FILTER */}
        {/* ================================================= */}

        <VisitorNotificationTabFilter
          activeFilter={
            activeFilter
          }
          onSelectFilter={
            handleFilterChange
          }
        />


        {/* ================================================= */}
        {/* SKELETON */}
        {/* ================================================= */}

        {showSkeleton ? (

          <View
            style={{
              flex: 1,

              paddingHorizontal:
                theme.spacing.xxl,
            }}
          >

            <VisitorNotificationSkeleton />

          </View>

        ) : showError ? (

          /* ================================================= */
          /* ERROR / RETRY */
          /* ================================================= */

          <View
            style={{
              flex: 1,

              paddingHorizontal:
                theme.spacing.xxl,

              justifyContent:
                "center",
            }}
          >

            <InlineRetry
              title="Failed to load notifications"

              description="Please check your connection and try again."

              loading={
                isFetching
              }

              onRetry={
                handleRetry
              }

              containerStyle={{
                borderRadius:
                  theme.radius.lg,

                alignItems:
                  "center",

                justifyContent:
                  "center",
              }}
            />

          </View>

        ) : (

          /* ================================================= */
          /* NOTIFICATION LIST */
          /* ================================================= */

          <FlatList
            data={
              groupedNotifications
            }

            keyExtractor={
              keyExtractor
            }

            renderItem={
              renderItem
            }

            showsVerticalScrollIndicator={
              false
            }

            keyboardShouldPersistTaps="handled"


            // =================================================
            // PULL TO REFRESH
            // =================================================

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

                progressBackgroundColor={
                  theme.colors.white
                }
              />
            }


            // =================================================
            // PAGINATION
            // =================================================

            onEndReached={
              handleLoadMore
            }

            onEndReachedThreshold={
              0.4
            }


            // =================================================
            // FOOTER
            // =================================================

            ListFooterComponent={
              renderFooter
            }


            // =================================================
            // EMPTY STATE
            // =================================================

            ListEmptyComponent={
              renderEmpty
            }


            // =================================================
            // CONTENT
            // =================================================

            contentContainerStyle={{
              paddingHorizontal:
                theme.spacing.xxl,

              paddingTop:
                theme.spacing.sm,

              paddingBottom:
                theme.spacing.massive,

              flexGrow:
                groupedNotifications.length ===
                0
                  ? 1
                  : 0,
            }}


            // =================================================
            // PERFORMANCE
            // =================================================

            initialNumToRender={
              8
            }

            maxToRenderPerBatch={
              8
            }

            windowSize={
              7
            }

            removeClippedSubviews
          />

        )}

      </View>

    </SafeAreaView>
  );
};


export default VisitorNotificationScreen;