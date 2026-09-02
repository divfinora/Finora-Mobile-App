import React, {
  useCallback,
  useState,
} from "react";

import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  RefreshControl,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useNavigation,
} from "@react-navigation/native";

import {
  useSelector,
} from "react-redux";

import BackButton from "../../../components/common/BackButton/BackButton";

import VisitorProfileInfoProfileImageCard from "./components/VisitorProfileInfoProfileImageCard";
import VisitorProfileInfoBasicInformationCard from "./components/VisitorProfileInfoBasicInformationCard";
import VisitorProfileInfoContactDetailsCard from "./components/VisitorProfileInfoContactDetailsCard";
import VisitorProfileInfoAddressCard from "./components/VisitorProfileInfoAddressCard";

import VisitorProfileInfoProfileSkeleton from "./components/VisitorProfileInfoProfileSkeleton";
import VisitorProfileInfoProfileError from "./components/VisitorProfileInfoProfileError";

import {
  syncVisitorProfile,
} from "../../../utils/syncVisitorProfile";

import {
  theme,
} from "../../../theme";

const VisitorPersonalInfoScreen = () => {

  const navigation = useNavigation();

  // =====================================================
  // USER FROM REDUX
  // =====================================================

  const user = useSelector(
    (state) => state.auth?.user
  );

  // =====================================================
  // REFRESHING
  // =====================================================

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  // =====================================================
  // LOADING
  // =====================================================

  const profileLoading = !user;


   console.log(user ,"user====")
  // =====================================================
  // REFRESH
  // =====================================================

  const handleRefresh = useCallback(
    async () => {

      try {

        setRefreshing(true);

        console.log(
          "🔄 Syncing Visitor Profile..."
        );

        await syncVisitorProfile();

        console.log(
          "✅ Visitor Profile Refresh Completed"
        );

      } catch (error) {

        console.log(
          "❌ Visitor Profile Refresh Error:",
          error
        );

      } finally {

        setRefreshing(false);

      }

    },
    []
  );

  // =====================================================
  // RETRY
  // =====================================================

  const handleRetry = useCallback(
    async () => {

      await handleRefresh();

    },
    [handleRefresh]
  );

  // =====================================================
  // ADDRESS PRESS
  // =====================================================

  const handleAddressPress = useCallback(
    () => {

      console.log(
        "Residential Address pressed"
      );

      // Later:
      // navigation.navigate(
      //   "VisitorEditPersonalInfo",
      //   {
      //     section: "address",
      //   }
      // );

    },
    []
  );

  // =====================================================
  // LIST DATA
  // =====================================================

  const DATA = [
    {
      id: "profile",
    },
    {
      id: "basic",
    },
    {
      id: "contact",
    },
    {
      id: "address",
    },
  ];

  // =====================================================
  // RENDER ITEM
  // =====================================================

  const renderItem = ({
    item,
  }) => {

    switch (item.id) {

      // ===============================================
      // PROFILE
      // ===============================================

      case "profile":

        return (
          <VisitorProfileInfoProfileImageCard
            profile={user}
          />
        );

      // ===============================================
      // BASIC INFORMATION
      // ===============================================

      case "basic":

        return (
          <VisitorProfileInfoBasicInformationCard
            profile={
              user?.basicInformation
            }
          />
        );

      // ===============================================
      // CONTACT DETAILS
      // ===============================================

      case "contact":

        return (
          <VisitorProfileInfoContactDetailsCard
            profile={
              user?.contactDetails
            }
          />
        );

      // ===============================================
      // RESIDENTIAL ADDRESS
      // ===============================================

      case "address":

        return (
          <VisitorProfileInfoAddressCard
            profile={
              user?.residentialAddress
            }
            onPress={
              handleAddressPress
            }
          />
        );

      default:
        return null;
    }
  };

  // =====================================================
  // FOOTER
  // =====================================================

  const renderFooter = () => {

    return (
      <View
        style={{
          height: 30,
        }}
      />
    );

  };

  // =====================================================
  // MAIN SCREEN
  // =====================================================

  return (

    <SafeAreaView
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
        translucent={false}
        backgroundColor={
          theme.colors.white
        }
        barStyle="dark-content"
      />

      {/* ================================================= */}
      {/* KEYBOARD AVOIDING */}
      {/* ================================================= */}

      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <View
          style={{
            paddingHorizontal:
              theme.spacing.xxl,

            backgroundColor:
              theme.colors.white,
          }}
        >

          <BackButton
            title="Personal Info"

            onPress={() =>
              navigation.goBack()
            }

            titleStyle={{
              fontSize: 21,

              lineHeight: 21,

              fontFamily:
                theme.fonts.semiBold,

              color:
                theme.colors.black,
            }}
          />

        </View>

        {/* ================================================= */}
        {/* BODY */}
        {/* ================================================= */}

        {profileLoading ? (

          // ===============================================
          // SKELETON
          // ===============================================

          <FlatList
            data={[
              {
                id: "skeleton",
              },
            ]}

            keyExtractor={(item) =>
              item.id
            }

            renderItem={() => (
              <VisitorProfileInfoProfileSkeleton />
            )}

            showsVerticalScrollIndicator={
              false
            }

            contentContainerStyle={{
              paddingHorizontal:
                theme.spacing.xxl,

              paddingTop: 20,

              paddingBottom: 30,
            }}
          />

        ) : (

          // ===============================================
          // PROFILE DATA
          // ===============================================

          <FlatList
            data={DATA}

            keyExtractor={(item) =>
              item.id
            }

            renderItem={
              renderItem
            }

            ListFooterComponent={
              renderFooter
            }

            showsVerticalScrollIndicator={
              false
            }

            keyboardShouldPersistTaps="handled"

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
              />
            }

            contentContainerStyle={{
              paddingHorizontal:
                theme.spacing.xxl,

              paddingBottom: 30,
            }}
          />

        )}

        {/* ================================================= */}
        {/* ERROR */}
        {/* ================================================= */}

        {!user && refreshing === false && (
          <VisitorProfileInfoProfileError
            onRetry={handleRetry}
          />
        )}

      </KeyboardAvoidingView>

    </SafeAreaView>
  );
};

export default VisitorPersonalInfoScreen;