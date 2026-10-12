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
import HelpAndSupportCard from "./components/HelpAndSupportCard.jsx";
import LogoutButton from "../LogOut/LogoutButton.jsx";

import useKYCVerificationDoneAndNotDone from "../../hooks/useKYCVerificationDoneAndNotDone.js";
import { syncProfile } from "../../utils/profileSync";
import { useGetSettingsQuery } from "../../redux/features/customer/customerApi";

import { useBottomTabHeight } from '../../navigation/BottomTabHeightContext.jsx'
import NewFlowCommonHeader from "../../components/common/BackButton/NewFlowCommonHeader.jsx";
const ProfileScreen = () => {
  const { height: bottomTabHeight } =
    useBottomTabHeight();
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

  const handleBack = () => {

    if (currentStep > 1) {

      setErrors({});

      setCurrentStep(

        previous =>

          previous - 1

      );

      requestAnimationFrame(() => {

        scrollViewRef.current?.scrollTo({

          y: 0,

          animated: false,

        });

      });

      return;

    }

    navigation.goBack();

  };

  return (

    <SafeAreaView
      edges={['left', "right", 'bottom']}
      style={{
        flex: 1,
        backgroundColor: '#FCEDD6',
      }}
    >

      {/* ===================================== */}
      {/* STATUS BAR */}
      {/* ===================================== */}

      <StatusBar
        translucent={
          false
        }
        backgroundColor={
          "#FAF4E9"
        }
        barStyle="dark-content"
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
        <NewFlowCommonHeader

          title={
            'Settings'
          }

          onBack={
            handleBack
          }

          onNotificationPress={() => {

            navigation.navigate(
              "get-notification-screen"
            );

          }}

        />
        <View
          style={{

            paddingHorizontal: theme.spacing.xxl,

          }}
        >




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
              paddingTop: theme.spacing.lg,


              paddingBottom: bottomTabHeight + theme.spacing.massive,
            }}
          >

            {/* =============================== */}
            {/* PROFILE BANNER */}
            {/* =============================== */}

            <ProfileBanner
              verification={verification}
              loading={isLoading || isFetching}
              error={error}
              refetch={refetch}
            />

            {/* =============================== */}
            {/* QUICK ACTIONS */}
            {/* =============================== */}

          

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

            <HelpAndSupportCard/>

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

