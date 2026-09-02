import React, {
  useState,
} from "react";

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

import {
  useSelector,
} from "react-redux";

import {
  theme,
} from "../../../theme/index.js";

import BackButton from "../../../components/common/BackButton/BackButton.jsx";

import VisitorProfileBanner from "./components/VisitorProfileBanner";

import VisitorSettingsSection from "./components/VisitorSettingsSection";

import LogoutButton from "../../LogOut/LogoutButton.jsx";

// ===============================================
// VISITOR PROFILE SYNC
// ===============================================

import {
  syncVisitorProfile,
} from "../../../utils/syncVisitorProfile.js";

const VisitorProfileScreen = () => {

  // =====================================================
  // VISITOR USER
  // =====================================================

  const user = useSelector(
    (state) =>
      state.auth?.user
  );


  // =====================================================
  // PROFILE LOADING
  // =====================================================

  const profileLoading =
    !user;


  // =====================================================
  // REFRESH STATE
  // =====================================================

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);


  // =====================================================
  // PULL TO REFRESH
  // =====================================================

  const onRefresh = async () => {

    try {

      setRefreshing(true);

      // =========================================
      // SYNC VISITOR PROFILE
      // GET /User/my-profile
      // =========================================

      await syncVisitorProfile();

    } catch (error) {

      console.log(
        "Visitor Profile Refresh Error:",
        error
      );

    } finally {

      setRefreshing(false);

    }

  };


  // =====================================================
  // SCREEN
  // =====================================================

  return (

    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          theme.colors.white,
      }}
    >

      {/* =================================================
          STATUS BAR
      ================================================= */}

      <StatusBar
        backgroundColor={
          theme.colors.white
        }

        barStyle={
          theme.statusBar.dark
        }
      />


      {/* =================================================
          KEYBOARD AVOIDING VIEW
      ================================================= */}

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

        {/* =================================================
            MAIN CONTAINER
        ================================================= */}

        <View
          style={{
            flex: 1,
          }}
        >

          {/* =================================================
              HEADER + CONTENT
          ================================================= */}

          <View
            style={{
              flex: 1,

              paddingHorizontal:
                theme.spacing.xxl,
            }}
          >

            {/* =================================================
                HEADER
            ================================================= */}

            <BackButton
              title="Settings"
            />


            {/* =================================================
                SCROLLABLE CONTENT
            ================================================= */}

            <ScrollView

              refreshControl={

                <RefreshControl

                  refreshing={
                    refreshing
                  }

                  onRefresh={
                    onRefresh
                  }

                  colors={[
                    theme.colors.primary500,
                  ]}

                  tintColor={
                    theme.colors.primary500
                  }

                />

              }

              showsVerticalScrollIndicator={
                false
              }

              keyboardShouldPersistTaps="handled"

              contentContainerStyle={{
                paddingBottom:
                  theme.spacing.massive,
              }}

            >

              {/* =================================================
                  PROFILE BANNER
              ================================================= */}

              <VisitorProfileBanner

                user={
                  user
                }

                loading={
                  profileLoading
                }

              />


              {/* =================================================
                  SETTINGS
              ================================================= */}

              <VisitorSettingsSection />


              {/* =================================================
                  LOGOUT
              ================================================= */}

              <LogoutButton />

            </ScrollView>

          </View>

        </View>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );

};


export default VisitorProfileScreen;