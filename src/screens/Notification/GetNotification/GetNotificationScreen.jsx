import React, {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  View,
  FlatList,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useFocusEffect,
  useNavigation,
} from "@react-navigation/native";

import NotificationHeader from "./components/NotificationHeader.jsx";
import NotificationTabFilter from "./components/NotificationTabFilter.jsx";
import NotificationCard from "./components/NotificationCard.jsx";
import NotificationSkeleton from "./components/NotificationSkeleton.jsx";
import NotificationEmptyState from "./components/NotificationEmptyState.jsx";
import InlineRetry from "../../components/common/RetryScreen/InlineRetry.jsx";

import {
  useGetAllNotificationsQuery,
  useGetUnreadNotificationCountQuery,
  useMarkNotificationAsReadMutation,
  useMarkAllNotificationsAsReadMutation,
} from "../../../redux/features/customer/customerApi.js";

import { theme } from "../../../theme/index.js";

const LIMIT = 20;

const GetNotifiCationScreen = () => {
  const navigation = useNavigation();

  // ============================================
  // TAB
  // ============================================

  const [activeTab, setActiveTab] = useState("all");

  // ============================================
  // NOTIFICATION LIST STATE
  // ============================================

  const [notifications, setNotifications] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  // ============================================
  // LOADING STATES
  // ============================================

  const [loadingMore, setLoadingMore] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  // ============================================
  // GET NOTIFICATIONS
  // ============================================

  const {
    data: notificationsData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAllNotificationsQuery(
    {
      page,
      limit: LIMIT,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  // ============================================
  // GET UNREAD COUNT
  // ============================================

  const {
    data: unreadData,
    refetch: refetchUnreadCount,
  } = useGetUnreadNotificationCountQuery();

  // ============================================
  // MARK SINGLE AS READ
  // ============================================

  const [
    markAsRead,
    {
      isLoading: isMarkingRead,
    },
  ] = useMarkNotificationAsReadMutation();

  // ============================================
  // MARK ALL AS READ
  // ============================================

  const [
    markAllAsRead,
    {
      isLoading: isMarkingAll,
    },
  ] = useMarkAllNotificationsAsReadMutation();

  // ============================================
  // NORMALIZE API RESPONSE
  // ============================================

  useEffect(() => {
    if (!notificationsData) {
      return;
    }

    const apiList =
      notificationsData?.data ??
      notificationsData?.notifications ??
      [];

    const pagination =
      notificationsData?.pagination ?? {};

    const currentPage =
      pagination?.page ?? page;

    const pages =
      pagination?.totalPages ?? 1;

    // Update total pages
    setTotalPages(pages);

    // ============================================
    // PAGE 1
    // Replace old list
    // ============================================

    if (currentPage === 1) {
      setNotifications(apiList);
      setLoadingMore(false);

      return;
    }

    // ============================================
    // PAGE 2+
    // Append new data
    // ============================================

    setNotifications((previous) => {
      const existingIds = new Set(
        previous.map(
          (item) =>
            item?._id ||
            item?.id
        )
      );

      const newItems = apiList.filter(
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
    });

    setLoadingMore(false);
  }, [
    notificationsData,
    page,
  ]);

  // ============================================
  // STOP LOAD MORE ON ERROR
  // ============================================

  useEffect(() => {
    if (isError) {
      setLoadingMore(false);
    }
  }, [isError]);

  // ============================================
  // UNREAD COUNT
  // ============================================

  const unreadCount =
    unreadData?.unreadCount ??
    unreadData?.count ??
    0;

  // ============================================
  // VISIBLE NOTIFICATIONS
  // ============================================

  /*
   * IMPORTANT:
   * Backend notification object uses `read`
   * not `isRead`.
   */

  const visibleNotifications =
    activeTab === "unread"
      ? notifications.filter(
          (item) =>
            item?.read === false
        )
      : notifications;

  // ============================================
  // RETRY
  // ============================================

  const handleRetry = useCallback(() => {
    setPage(1);

    setNotifications([]);

    setTotalPages(1);

    setLoadingMore(false);

    refetch();

    refetchUnreadCount();
  }, [
    refetch,
    refetchUnreadCount,
  ]);

  // ============================================
  // TAB CHANGE
  // ============================================

  const handleTabChange = useCallback(
    (tab) => {
      setActiveTab(tab);
    },
    []
  );

  // ============================================
  // PULL TO REFRESH
  // ============================================

  const handleRefresh = useCallback(
    async () => {
      if (refreshing) {
        return;
      }

      setRefreshing(true);

      try {
        /*
         * Reset pagination
         */

        setPage(1);

        setLoadingMore(false);

        /*
         * Refetch page 1
         */

        const result =
          await refetch();

        const apiList =
          result?.data?.data ??
          result?.data?.notifications ??
          [];

        const pagination =
          result?.data?.pagination ??
          {};

        /*
         * Replace complete list
         */

        setNotifications(apiList);

        /*
         * Update pagination
         */

        setTotalPages(
          pagination?.totalPages ?? 1
        );

        /*
         * Refresh unread count
         */

        await refetchUnreadCount();
      } catch (error) {
        console.log(
          "NOTIFICATION REFRESH ERROR:",
          error
        );
      } finally {
        setRefreshing(false);
      }
    },
    [
      refreshing,
      refetch,
      refetchUnreadCount,
    ]
  );

  // ============================================
  // LOAD NEXT PAGE
  // ============================================

  const handleLoadMore = useCallback(() => {
    /*
     * Initial API loading
     */

    if (isLoading) {
      return;
    }

    /*
     * Any API request already running
     */

    if (isFetching) {
      return;
    }

    /*
     * Already loading next page
     */

    if (loadingMore) {
      return;
    }

    /*
     * No more pages
     */

    if (page >= totalPages) {
      return;
    }

    /*
     * Start footer loader
     */

    setLoadingMore(true);

    /*
     * Request next page
     */

    setPage(
      (previousPage) =>
        previousPage + 1
    );
  }, [
    isLoading,
    isFetching,
    loadingMore,
    page,
    totalPages,
  ]);

  // ============================================
  // MARK SINGLE NOTIFICATION AS READ
  // ============================================

  const handleItemPress =
    useCallback(
      async (notification) => {
        const id =
          notification?._id ||
          notification?.id;

        if (!id) {
          return;
        }

        /*
         * Already read
         */

        if (
          notification?.read === true
        ) {
          return;
        }

        /*
         * ========================================
         * OPTIMISTIC UPDATE
         * ========================================
         */

        setNotifications(
          (previous) =>
            previous.map(
              (item) => {
                const itemId =
                  item?._id ||
                  item?.id;

                if (
                  itemId === id
                ) {
                  return {
                    ...item,
                    read: true,
                  };
                }

                return item;
              }
            )
        );

        try {
          /*
           * API
           */

          await markAsRead(
            id
          ).unwrap();

          /*
           * Refresh unread count
           */

          await refetchUnreadCount();
        } catch (error) {
          console.log(
            "MARK NOTIFICATION READ ERROR:",
            error
          );

          /*
           * ========================================
           * REVERT IF API FAILED
           * ========================================
           */

          setNotifications(
            (previous) =>
              previous.map(
                (item) => {
                  const itemId =
                    item?._id ||
                    item?.id;

                  if (
                    itemId === id
                  ) {
                    return {
                      ...item,
                      read: false,
                    };
                  }

                  return item;
                }
              )
          );
        }
      },
      [
        markAsRead,
        refetchUnreadCount,
      ]
    );

  // ============================================
  // MARK ALL NOTIFICATIONS AS READ
  // ============================================

  const handleMarkAllRead =
    useCallback(
      async () => {
        if (
          unreadCount <= 0
        ) {
          return;
        }

        try {
          /*
           * API
           */

          await markAllAsRead()
            .unwrap();

          /*
           * ========================================
           * UPDATE LOCAL LIST
           * ========================================
           */

          setNotifications(
            (previous) =>
              previous.map(
                (item) => ({
                  ...item,
                  read: true,
                })
              )
          );

          /*
           * Refresh unread count
           */

          await refetchUnreadCount();
        } catch (error) {
          console.log(
            "MARK ALL READ ERROR:",
            error
          );
        }
      },
      [
        unreadCount,
        markAllAsRead,
        refetchUnreadCount,
      ]
    );

  // ============================================
  // SCREEN FOCUS
  // ============================================

  useFocusEffect(
    useCallback(() => {
      /*
       * Only refresh unread badge.
       *
       * Don't refetch the complete list
       * every time screen gets focused.
       */

      refetchUnreadCount();
    }, [
      refetchUnreadCount,
    ])
  );

  // ============================================
  // RENDER NOTIFICATION CARD
  // ============================================

  const renderItem =
    useCallback(
      ({ item }) => {
        return (
          <NotificationCard
            notification={item}
            onItemPress={
              handleItemPress
            }
          />
        );
      },
      [
        handleItemPress,
      ]
    );

  // ============================================
  // KEY EXTRACTOR
  // ============================================

  const keyExtractor =
    useCallback(
      (item, index) => {
        return String(
          item?._id ||
            item?.id ||
            `notification-${index}`
        );
      },
      []
    );

  // ============================================
  // PAGINATION FOOTER
  // ============================================

  const renderFooter =
    useCallback(() => {
      /*
       * No page loading
       */

      if (!loadingMore) {
        return null;
      }

      return (
        <View
          style={{
            paddingVertical: 20,

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator
            size="small"
            color={
              theme.colors
                .primary500
            }
          />
        </View>
      );
    }, [
      loadingMore,
    ]);

  // ============================================
  // EMPTY STATE
  // ============================================

  const renderEmpty =
    useCallback(() => {
      /*
       * Don't show empty while
       * initial page is loading.
       */

      if (
        isLoading &&
        page === 1
      ) {
        return null;
      }

      /*
       * Don't show empty on error.
       */

      if (
        isError &&
        notifications.length === 0
      ) {
        return null;
      }

      return (
        <NotificationEmptyState
          isUnread={
            activeTab ===
            "unread"
          }
        />
      );
    }, [
      isLoading,
      page,
      isError,
      notifications.length,
      activeTab,
    ]);

  // ============================================
  // SCREEN
  // ============================================

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          "#FFFFFF",
      }}
    >
      <StatusBar
        backgroundColor="#FFF8F2"
        barStyle="dark-content"
      />

      {/* ==========================================
          HEADER
      ========================================== */}

      <NotificationHeader
        unreadCount={
          unreadCount
        }
        onMarkAllRead={
          handleMarkAllRead
        }
        isMarkingAll={
          isMarkingAll
        }
        onBackPress={() =>
          navigation.goBack()
        }
      />

      {/* ==========================================
          TABS
      ========================================== */}

      <NotificationTabFilter
        activeTab={
          activeTab
        }
        onSelectTab={
          handleTabChange
        }
        unreadCount={
          unreadCount
        }
      />

      {/* ==========================================
          PAGE 1 INITIAL LOADING
          
          IMPORTANT:
          ONLY page 1 shows full skeleton.
          
          Page 2+ will NOT show skeleton.
      ========================================== */}

      {(isLoading || isFetching)  &&
      page === 1 ? (
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
          }}
        >
          <NotificationSkeleton />
        </View>
      ) : isError &&
        notifications.length ===
          0 ? (
        /* ========================================
           ERROR STATE
        ======================================== */

        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
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
              marginTop: 40,

              borderRadius: 16,

              alignItems:
                "center",

              justifyContent:
                "center",
            }}
          />
        </View>
      ) : (
        /* ========================================
           NOTIFICATION LIST
        ======================================== */

        <FlatList
          data={
            visibleNotifications
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

          contentContainerStyle={{
            paddingHorizontal: 24,

            paddingTop: 8,

            paddingBottom: 60,

            /*
             * Empty state ko center/expand
             */

            flexGrow:
              visibleNotifications.length ===
              0
                ? 1
                : 0,
          }}

          /* ========================================
             PULL TO REFRESH
          ======================================== */

          refreshControl={
            <RefreshControl
              refreshing={
                refreshing
              }
              onRefresh={
                handleRefresh
              }
              colors={[
                theme.colors
                  .primary500,
              ]}
              tintColor={
                theme.colors
                  .primary500
              }
            />
          }

          /* ========================================
             INFINITE PAGINATION
          ======================================== */

          onEndReached={
            handleLoadMore
          }

          onEndReachedThreshold={
            0.4
          }

          /* ========================================
             PAGE 2+ FOOTER LOADER
          ======================================== */

          ListFooterComponent={
            renderFooter
          }

          /* ========================================
             EMPTY STATE
          ======================================== */

          ListEmptyComponent={
            renderEmpty
          }

          /* ========================================
             PERFORMANCE
          ======================================== */

          removeClippedSubviews

          initialNumToRender={
            8
          }

          maxToRenderPerBatch={
            8
          }

          windowSize={7}
        />
      )}
    </SafeAreaView>
  );
};

export default GetNotifiCationScreen;