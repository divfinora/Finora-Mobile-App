import React from "react";

import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
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

const ProfileScreen = () => {

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
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{


              paddingBottom: theme.spacing.massive,
            }}
          >

            {/* =============================== */}
            {/* PROFILE BANNER */}
            {/* =============================== */}

            <ProfileBanner />

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