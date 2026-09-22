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
  ArrowLeft,
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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
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

const NotificationPreferencesScreen = ({ navigation }) => {
  const [loadingKey, setLoadingKey] = useState("");
  const [filterTab, setFilterTab] = useState("all");

  const debounceRef = useRef({});
  const insets = useSafeAreaInsets();
  const {
    data: apiResponse,
    error: preferencesError,
    isLoading: preferencesLoading,
    isFetching: preferencesFetching,
    refetch,
  } = useGetNotificationPreferencesQuery();

  const [updatePreferences] =
    useUpdateNotificationPreferencesMutation();

  const { handleMutation } = useHandleMutation();

  const [preferences, setPreferences] =
    useState(DEFAULT_PREFERENCES);

  useEffect(() => {
    if (preferencesError) {
      setPreferences(DEFAULT_PREFERENCES);
      return;
    }

    const prefData = apiResponse?.data;

    if (!prefData) return;

    if (
      loadingKey ||
      preferencesLoading ||
      preferencesFetching
    ) {
      return;
    }

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

  useEffect(() => {
    return () => {
      Object.values(debounceRef.current).forEach(clearTimeout);
    };
  }, []);

  const handleSettingToggle = (key, value) => {
    if (loadingKey) return;

    if (debounceRef.current[key]) {
      clearTimeout(debounceRef.current[key]);
    }

    debounceRef.current[key] = setTimeout(async () => {
      setLoadingKey(key);

      const response = await handleMutation({
        apiFunc: updatePreferences,
        params: {
          [key]: value,
        },
        timeoutMs: 10000,
        showError: true,
        showSuccess: false,
      });

      if (response) {
        await refetch();
      }

      setLoadingKey("");
    }, 400);
  };

  const shouldShowItem = (key) => {
    if (filterTab === "enabled") {
      return Boolean(preferences[key]);
    }

    if (filterTab === "disabled") {
      return !preferences[key];
    }

    return true;
  };

  const filteredNotificationTypes =
    NOTIFICATION_TYPES.filter((item) =>
      shouldShowItem(item.key)
    );

  const filteredSummaryReports =
    SUMMARY_REPORTS.filter((item) =>
      shouldShowItem(item.key)
    );

  const showPushEnabled =
    shouldShowItem("pushEnabled");

  const isListEmpty =
    !showPushEnabled &&
    filteredNotificationTypes.length === 0 &&
    filteredSummaryReports.length === 0;

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await refetch();
    } catch (error) {
      console.log("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView
      edges={['bottom', 'left', 'right']}
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,

      }}
    >
      <StatusBar
        backgroundColor="#FFF8F2"
        barStyle="dark-content"
      />



      {/* HEADER */}

      {/* HEADER */}

      <LinearGradient
        colors={["#FFFFFF", "#FCEDD6"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          paddingHorizontal: theme.spacing.xxl,
          paddingTop: insets.top + theme.spacing.xxxl,
          paddingBottom: insets.top + theme.spacing.xxl,
          position: "relative",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: 'flex-start',

          
          }}
        >
          {/* BACK */}

          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
            activeOpacity={0.7}
            style={{
              width: 32,
              height: 40,
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <ArrowLeft
              size={24}
              color={theme.colors.gray900}
              strokeWidth={2}
            />
          </TouchableOpacity>

          {/* TITLE */}

          <View style={{ flex: 1, flexDirection: "row", justifyContent: 'center' }}>
            <View
              style={{



              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily:
                    theme.fonts.semiBold,
                  color:
                    theme.colors.gray900,
                  lineHeight: 24,
                }}
              >
                Notification Preferences
              </Text>

              <Text
                style={{
                  fontSize:
                    theme.typography.b3,
                  fontFamily:
                    theme.fonts.medium,
                  color:
                    theme.colors.gray500,
                  marginTop: 3,
                  lineHeight: 16,
                }}
              >
                Manage your alerts and notifications
              </Text>
            </View>
          </View>
        </View>

        {/* FILTER */}

        <View
          style={{
            position: "absolute",

            left: theme.spacing.xxl,
            right: theme.spacing.xxl,

            bottom: -36,

            height: 56,

            backgroundColor:
              theme.colors.white,

            borderRadius:
              theme.radius.pill,

            borderWidth: 1,

            borderColor: "#A8660B",

            padding: 4,

            flexDirection: "row",

            zIndex: 10,
          }}
        >
          {[
            {
              id: "all",
              label: "All",
            },
            {
              id: "enabled",
              label: "Enabled",
            },
            {
              id: "disabled",
              label: "Disabled",
            },
          ].map((tab) => {
            const isActive =
              filterTab === tab.id;

            return (
              <TouchableOpacity
                key={tab.id}
                onPress={() =>
                  setFilterTab(tab.id)
                }
                activeOpacity={0.8}
                style={{
                  flex: 1,

                  borderRadius:
                    theme.radius.pill,

                  backgroundColor:
                    isActive
                      ? "#A8660B"
                      : "transparent",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",
                }}
              >
                <Text
                  style={{
                    color: isActive
                      ? theme.colors.white
                      : theme.colors.gray700,

                    fontFamily:
                      theme.fonts.semiBold,

                    fontSize:
                      theme.typography.b3,
                  }}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#8C5814"]}
            tintColor="#8C5814"
          />
        }
        contentContainerStyle={{
          paddingHorizontal: theme.spacing.xxl,
          paddingTop: 60,
          paddingBottom: theme.spacing.massive,
        }}
      >
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
              You don't have any preferences in the{" "}
              {filterTab} status.
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
                    loading={
                      loadingKey === "pushEnabled"
                    }
                    disabled={
                      !!loadingKey ||
                      preferencesLoading ||
                      preferencesFetching
                    }
                    onToggle={(val) =>
                      handleSettingToggle(
                        "pushEnabled",
                        val
                      )
                    }
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
                  {filteredNotificationTypes.map(
                    (item, index) => (
                      <SettingItem
                        key={item.key}
                        title={item.title}
                        subtitle={item.subtitle}
                        icon={item.icon}
                        type="toggle"
                        value={preferences[item.key]}
                        loading={
                          loadingKey === item.key
                        }
                        disabled={
                          !!loadingKey ||
                          preferencesLoading ||
                          preferencesFetching
                        }
                        onToggle={(val) =>
                          handleSettingToggle(
                            item.key,
                            val
                          )
                        }
                        isLast={
                          index ===
                          filteredNotificationTypes.length -
                          1
                        }
                      />
                    )
                  )}
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
                  {filteredSummaryReports.map(
                    (item, index) => (
                      <SettingItem
                        key={item.key}
                        title={item.title}
                        subtitle={item.subtitle}
                        icon={item.icon}
                        type="toggle"
                        value={preferences[item.key]}
                        loading={
                          loadingKey === item.key
                        }
                        disabled={
                          !!loadingKey ||
                          preferencesLoading ||
                          preferencesFetching
                        }
                        onToggle={(val) =>
                          handleSettingToggle(
                            item.key,
                            val
                          )
                        }
                        isLast={
                          index ===
                          filteredSummaryReports.length -
                          1
                        }
                      />
                    )
                  )}
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
                style={{
                  marginRight: theme.spacing.sm,
                }}
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
                Note: Security alerts cannot be
                disabled and will always be sent for
                your account safety.
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationPreferencesScreen;