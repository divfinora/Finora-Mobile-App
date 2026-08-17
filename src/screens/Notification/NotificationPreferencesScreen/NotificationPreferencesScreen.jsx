import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  RefreshControl,
} from "react-native";
import {
  Fingerprint,
  Lightbulb,
  MailCheck,
  Bell,
  ShieldCheck,
  PiggyBank,
  TrendingUp,
  Receipt,
  FileText,
  Clock,
  Calendar,
  BarChart2,
} from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "../../../theme/index.js";
import BackButton from "../../../components/common/BackButton/BackButton.jsx";
import SettingItem from "../../Profile/components/SettingItem.jsx";
import InlineRetry from "../../../components/common/RetryScreen/InlineRetry.jsx";
import useHandleMutation from "../../../hooks/useHandleMutation.js";


import {
  useGetNotificationPreferencesQuery,
  useUpdateNotificationPreferencesMutation,
} from "../../../redux/features/customer/customerApi.js";

const DEFAULT_PREFERENCES = {
  emiReminders: false,
  paymentAlerts: false,
  accountUpdates: false,
  savingGoalUpdates: false,
  loanUpdates: false,
  creditScoreUpdates: false,
  transactionAlerts: false,
  promotionalOffers: false,
  dailySummary: false,
  weeklySummary: false,
  monthlySummary: false,
  pushEnabled: false,
};

const NOTIFICATION_TYPES = [
  {
    key: "emiReminders",
    title: "EMI Reminders",
    subtitle: "Get notified before EMI due dates",
    icon: Fingerprint,
  },
  {
    key: "paymentAlerts",
    title: "Payments Alerts",
    subtitle: "Receive alerts for all payment transactions",
    icon: Receipt,
  },
  {
    key: "accountUpdates",
    title: "Account Updates",
    subtitle: "Important updates about your account",
    icon: ShieldCheck,
  },
  {
    key: "savingGoalUpdates",
    title: "Saving Goal Updates",
    subtitle: "Track your active saving targets",
    icon: PiggyBank,
  },
  {
    key: "loanUpdates",
    title: "Loan Updates",
    subtitle: "Status changes on loan applications",
    icon: FileText,
  },
  {
    key: "creditScoreUpdates",
    title: "Credit Score Updates",
    subtitle: "Monthly credit score changes",
    icon: TrendingUp,
  },
  {
    key: "transactionAlerts",
    title: "Transaction Alerts",
    subtitle: "Instant notification on account activity",
    icon: Receipt,
  },
  {
    key: "promotionalOffers",
    title: "Promotional Offers",
    subtitle: "Special offers and loan discounts",
    icon: MailCheck,
  },
];

const SUMMARY_REPORTS = [
  {
    key: "dailySummary",
    title: "Daily Summary",
    subtitle: "Daily financial activity summary",
    icon: Clock,
  },
  {
    key: "weeklySummary",
    title: "Weekly Summary",
    subtitle: "Weekly spending and savings report",
    icon: Calendar,
  },
  {
    key: "monthlySummary",
    title: "Monthly Summary",
    subtitle: "Complete monthly financial overview",
    icon: BarChart2,
  },
];

const NotificationPreferencesScreen = () => {
  const [loadingKey, setLoadingKey] = useState("");
  const [filterTab, setFilterTab] = useState("all"); // 'all' | 'enabled' | 'disabled'
  const debounceRef = useRef({});

  // API Hooks
  const {
    data: apiResponse,
    error: preferencesError,
    isLoading: preferencesLoading,
    isFetching: preferencesFetching,
    refetch,
  } = useGetNotificationPreferencesQuery();

  const [updatePreferences] = useUpdateNotificationPreferencesMutation();
  const { handleMutation } = useHandleMutation();

  const [preferences, setPreferences] = useState(DEFAULT_PREFERENCES);

  // Sync state with API response
  useEffect(() => {
    if (preferencesError) {
      setPreferences(DEFAULT_PREFERENCES);
      return;
    }

    const prefData = apiResponse?.data;
    if (!prefData) return;
    if (loadingKey || preferencesLoading || preferencesFetching) return;

    setPreferences({
      ...DEFAULT_PREFERENCES,
      ...prefData,
    });
  }, [
    apiResponse,
    preferencesError,
    loadingKey,
    preferencesLoading,
    preferencesFetching,
  ]);

  // Clean debounces on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceRef.current).forEach(clearTimeout);
    };
  }, []);

  // Single Item Toggle
  const handleSettingToggle = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));

    if (debounceRef.current[key]) {
      clearTimeout(debounceRef.current[key]);
    }

    debounceRef.current[key] = setTimeout(async () => {
      setLoadingKey(key);

      const response = await handleMutation({
        apiFunc: updatePreferences,
        params: { [key]: value },
        timeoutMs: 10000,
        showError: true,
        showSuccess: false,
      });

      if (!response) {
        setPreferences((prev) => ({ ...prev, [key]: !value }));
      }

      setLoadingKey("");
    }, 400);
  };

  // Filter Helper
  const shouldShowItem = (key) => {
    if (filterTab === "enabled") return Boolean(preferences[key]);
    if (filterTab === "disabled") return !preferences[key];
    return true;
  };

  const filteredNotificationTypes = NOTIFICATION_TYPES.filter((item) =>
    shouldShowItem(item.key)
  );

  const filteredSummaryReports = SUMMARY_REPORTS.filter((item) =>
    shouldShowItem(item.key)
  );

  const showPushEnabled = shouldShowItem("pushEnabled");

  const isListEmpty =
    !showPushEnabled &&
    filteredNotificationTypes.length === 0 &&
    filteredSummaryReports.length === 0;



    // pull to refress 

    const [refreshing, setRefreshing] = useState(false);

const onRefresh = async () => {
  setRefreshing(true);
  await refetch();
  setRefreshing(false);
};

  return (
    <SafeAreaView style={{ flex: 1,    backgroundColor: theme.colors.white,}}>
      <StatusBar backgroundColor="#FFF8F2" barStyle="dark-content" />

      {/* HEADER */}
      <View
        style={{
          backgroundColor:"red",
          paddingHorizontal: theme.spacing.xxl,
          paddingTop: theme.spacing.md,
          paddingBottom: theme.spacing.sm,
        }}
      >
        <BackButton title="Notification Preferences" />
        <Text
          style={{
            fontSize: theme.typography.b3,
            fontFamily: theme.fonts.medium,
            color: theme.colors.gray500,
            marginTop: 2,
            marginLeft: 36,
          }}
        >
          Manage your alerts and notifications
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
    <RefreshControl
      refreshing={refreshing || preferencesFetching}
      onRefresh={onRefresh}
      colors={["#8C5814"]} // Android loader color
      tintColor="#8C5814"   // iOS loader color
    />
  }
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.xxl,
          paddingTop: theme.spacing.lg,
          paddingBottom: theme.spacing.massive,
        }}

      >
        {/* FILTER TAB BAR (ALL / ENABLED / DISABLED) */}
        <View
          style={{
            flexDirection: "row",
            backgroundColor: theme.colors.white,
            borderRadius: theme.radius.pill,
            padding: 4,
            borderWidth: theme.borderWidth.thin,
            borderColor: theme.colors.gray200,
            marginBottom: theme.spacing.xl,
          }}
        >
          {[
            { id: "all", label: "All" },
            { id: "enabled", label: "Enabled" },
            { id: "disabled", label: "Disabled" },
          ].map((tab) => {
            const isActive = filterTab === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() => setFilterTab(tab.id)}
                activeOpacity={0.8}
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  borderRadius: 25,
                  backgroundColor: isActive ? "#8C5814" : theme.colors.transparent,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: isActive ? theme.colors.white : theme.colors.gray700,
                    fontFamily: theme.fonts.semiBold,
                    fontSize: theme.typography.b2,
                  }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ERROR STATE / RETRY */}
        {preferencesError ? (
          <InlineRetry
            title="Unable to load preferences"
            description="Please try again."
            loading={preferencesLoading}
            onRetry={refetch}
            containerStyle={{
              marginVertical: theme.spacing.md,
              borderRadius: theme.radius.lg,
              minHeight: 110,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        ) : isListEmpty ? (
          /* EMPTY FILTER STATE */
          <View
            style={{
              paddingVertical: theme.spacing.massive,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontSize: theme.typography.b1,
                fontFamily: theme.fonts.semiBold,
                color: theme.colors.gray700,
                marginBottom: theme.spacing.xs,
              }}
            >
              No {filterTab} preferences
            </Text>
            <Text
              style={{
                fontSize: theme.typography.b3,
                fontFamily: theme.fonts.regular,
                color: theme.colors.gray500,
                textAlign: "center",
              }}
            >
              You don't have any preferences in the {filterTab} status.
            </Text>
          </View>
        ) : (
          <>
            {/* GLOBAL PREFERENCES */}
            {showPushEnabled && (
              <>
                <Text
                  style={{
                    marginBottom: theme.spacing.sm,
                    fontSize: theme.typography.b2,
                    color: "#5F7395",
                    fontFamily: theme.fonts.semiBold,
                  }}
                >
                  Global Preferences
                </Text>

                <View
                  style={{
                    backgroundColor: "#F6F6F7",
                    borderRadius: theme.radius.xl,
                    overflow: "hidden",
                    marginBottom: theme.spacing.xxl,
                  }}
                >
                  <SettingItem
                    title="Push Notifications"
                    subtitle="Master control for device push notifications"
                    icon={Bell}
                    type="toggle"
                    value={preferences.pushEnabled}
                    loading={loadingKey === "pushEnabled"}
                    disabled={!!loadingKey || preferencesLoading ||preferencesFetching}
                    onToggle={(val) => handleSettingToggle("pushEnabled", val)}
                    isLast
                  />
                </View>
              </>
            )}

            {/* NOTIFICATION TYPES */}
            {filteredNotificationTypes.length > 0 && (
              <>
                <Text
                  style={{
                    marginBottom: theme.spacing.sm,
                    fontSize: theme.typography.b2,
                    color: "#5F7395",
                    fontFamily: theme.fonts.semiBold,
                  }}
                >
                  Notification Types
                </Text>

                <View
                  style={{
                    backgroundColor: "#F6F6F7",
                    borderRadius: theme.radius.xl,
                    overflow: "hidden",
                    marginBottom: theme.spacing.xxl,
                  }}
                >
                  {filteredNotificationTypes.map((item, index) => (
                    <SettingItem
                      key={item.key}
                      title={item.title}
                      subtitle={item.subtitle}
                      icon={item.icon}
                      type="toggle"
                      value={preferences[item.key]}
                      loading={loadingKey === item.key}
                      disabled={!!loadingKey || preferencesLoading || preferencesFetching}
                      onToggle={(val) => handleSettingToggle(item.key, val)}
                      isLast={index === filteredNotificationTypes.length - 1}
                    />
                  ))}
                </View>
              </>
            )}

            {/* SUMMARY REPORTS */}
            {filteredSummaryReports.length > 0 && (
              <>
                <Text
                  style={{
                    marginBottom: theme.spacing.sm,
                    fontSize: theme.typography.b2,
                    color: "#5F7395",
                    fontFamily: theme.fonts.semiBold,
                  }}
                >
                  Summary Reports
                </Text>

                <View
                  style={{
                    backgroundColor: "#F6F6F7",
                    borderRadius: theme.radius.xl,
                    overflow: "hidden",
                    marginBottom: theme.spacing.xl,
                  }}
                >
                  {filteredSummaryReports.map((item, index) => (
                    <SettingItem
                      key={item.key}
                      title={item.title}
                      subtitle={item.subtitle}
                      icon={item.icon}
                      type="toggle"
                      value={preferences[item.key]}
                      loading={loadingKey === item.key}
                      disabled={!!loadingKey || preferencesLoading || preferencesFetching}
                      onToggle={(val) => handleSettingToggle(item.key, val)}
                      isLast={index === filteredSummaryReports.length - 1}
                    />
                  ))}
                </View>
              </>
            )}

            {/* SECURITY BANNER */}
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "#EFF6FF",
                padding: theme.spacing.md,
                borderRadius: theme.radius.md,
                alignItems: "center",
                borderWidth: theme.borderWidth.thin,
                borderColor: "#DBEAFE",
              }}
            >
              <Lightbulb
                size={theme.iconSize.sm}
                color="#2563EB"
                style={{ marginRight: theme.spacing.sm }}
              />
              <Text
                style={{
                  flex: 1,
                  fontSize: theme.typography.b3,
                  fontFamily: theme.fonts.regular,
                  color: "#1E40AF",
                  lineHeight: theme.lineHeight.b3,
                }}
              >
                Note: Security alerts cannot be disabled and will always be sent for your account safety.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationPreferencesScreen;