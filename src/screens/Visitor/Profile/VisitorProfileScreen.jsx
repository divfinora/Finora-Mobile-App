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


const VisitorProfileScreen = () => {

  // =====================================================
  // VISITOR USER
  // =====================================================

  const user =
    useSelector(
      (state) =>
        state.auth?.user
    );


  // =====================================================
  // PROFILE LOADING
  // =====================================================

  const profileLoading =
    !user;


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
                CONTENT
            ================================================= */}

            <ScrollView

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