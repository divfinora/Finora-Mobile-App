import React, { useState } from "react";
import { View, ScrollView, StatusBar, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

 
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
import useHandleMutation from "../../../hooks/useHandleMutation.js";
import { theme } from "../../../theme/index.js";

const GetNotifiCationScreen = () => {
  const [activeTab, setActiveTab] = useState("all");

  // API Integration
  const {
    data: notificationsData,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetAllNotificationsQuery({ page: 1, limit: 20 });

  const { data: unreadData } = useGetUnreadNotificationCountQuery();
  const [markAsRead] = useMarkNotificationAsReadMutation();
  const [markAllAsRead, { isLoading: isMarkingAll }] = useMarkAllNotificationsAsReadMutation();
  const { handleMutation } = useHandleMutation();

  const notifications = notificationsData?.notifications || [];
  const unreadCount = unreadData?.count ?? notifications.filter((n) => !n.isRead).length;

  const filteredNotifications =
    activeTab === "unread"
      ? notifications.filter((item) => !item.isRead)
      : notifications;

  const handleItemPress = async (notification) => {
    if (notification.isRead) return;

    await handleMutation({
      apiFunc: markAsRead,
      params: notification.id || notification._id,
      showError: false,
      showSuccess: false,
    });
  };

  const handleMarkAllRead = async () => {
    if (unreadCount === 0) return;

    await handleMutation({
      apiFunc: markAllAsRead,
      showError: true,
      showSuccess: true,
      customSuccessMsg: "All notifications marked as read",
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFF8F2" }}>
      <StatusBar backgroundColor="#FFF8F2" barStyle={theme.statusBar.dark} />

      {/* HEADER */}
      <NotificationHeader
        unreadCount={unreadCount}
        onMarkAllRead={handleMarkAllRead}
        isMarkingAll={isMarkingAll}
      />

      {/* TABS */}
      <NotificationTabFilter
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        unreadCount={unreadCount}
      />

      {/* CONTENT LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.xxl,
          paddingBottom: theme.spacing.massive,
          flexGrow: 1,
        }}
        refreshControl={
          <RefreshControl
            refreshing={isFetching && !isLoading}
            onRefresh={refetch}
            colors={[theme.colors.primary500]}
            tintColor={theme.colors.primary500}
          />
        }
      >
        {isLoading ? (
          <NotificationSkeleton />
        ) : isError ? (
          <InlineRetry
            title="Failed to load notifications"
            description="Please check your connection and try again."
            loading={isFetching}
            onRetry={refetch}
            containerStyle={{
              marginTop: theme.spacing.xxxl,
              borderRadius: theme.radius.lg,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        ) : filteredNotifications.length === 0 ? (
          <NotificationEmptyState />
        ) : (
          filteredNotifications.map((item) => (
            <NotificationCard
              key={item.id || item._id}
              notification={item}
              onItemPress={handleItemPress}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GetNotifiCationScreen;

 