import React, { useState } from "react";

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  RefreshControl,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import { theme } from "../../theme/index.js";

// Reusable Components
import BackButton from "../../components/common/BackButton/BackButton.jsx";

// Profile Components
import ProfileBanner from "./components/ProfileBanner";
import QuickActions from "./components/QuickActions";
import SettingsSection from "./components/SettingsSection";
import ReportsCard from "./components/ReportsCard";
import LogoutButton from "../LogOut/LogoutButton.jsx";

import useKYCVerificationDoneAndNotDone from "../../hooks/useKYCVerificationDoneAndNotDone.js";
import { syncProfile } from "../../utils/profileSync";
import { useGetSettingsQuery } from "../../redux/features/customer/customerApi";
const ProfileScreen = () => {

const {
  refetch: refetchSettings,
} = useGetSettingsQuery();
  const {
    verification,
    isLoading,
    isFetching,
    refetch,
    isError,
    error,
  } = useKYCVerificationDoneAndNotDone();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);

      await Promise.all([
        syncProfile(), // Profile API
        refetch(),     // KYC API
             refetchSettings(),  // Settings
      ]);

    } finally {
      setRefreshing(false);
    }
  };



  return (

    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
      }}
    >

      {/* ===================================== */}
      {/* STATUS BAR */}
      {/* ===================================== */}

      <StatusBar
        backgroundColor={theme.colors.white}
        barStyle={theme.statusBar.dark}
      />

      {/* ===================================== */}
      {/* KEYBOARD AVOIDING VIEW */}
      {/* ===================================== */}

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

        {/* ===================================== */}
        {/* FIXED HEADER */}
        {/* ===================================== */}

        <View
          style={{

            paddingHorizontal: theme.spacing.xxl,

          }}
        >

          <BackButton
            title="Settings"
          />



          {/* ===================================== */}
          {/* SCROLLABLE CONTENT */}
          {/* ===================================== */}

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[theme.colors.primary500]}
                tintColor={theme.colors.primary500}
              />
            }
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{


              paddingBottom: theme.spacing.massive,
            }}
          >

            {/* =============================== */}
            {/* PROFILE BANNER */}
            {/* =============================== */}

            <ProfileBanner
              verification={verification}
              loading={isLoading || isFetching}
              error ={error}
              refetch={refetch}
            />

            {/* =============================== */}
            {/* QUICK ACTIONS */}
            {/* =============================== */}

            <QuickActions />

            {/* =============================== */}
            {/* ACCOUNT */}
            {/* =============================== */}



            {/* =============================== */}
            {/* HELP & LEGAL */}
            {/* =============================== */}

            <SettingsSection

            />

            {/* =============================== */}
            {/* REPORTS */}
            {/* =============================== */}

            <ReportsCard />

            {/* =============================== */}
            {/* LOGOUT */}
            {/* =============================== */}

            <LogoutButton />

          </ScrollView>
        </View>
      </KeyboardAvoidingView>

    </SafeAreaView>

  );

};

export default ProfileScreen;