import React, {
  useState,
} from "react";

import {
  View,
  StatusBar,
  ScrollView,
  RefreshControl,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "../../theme";

// Components
import KYCHeroCard from "./components/KYCHeroCard.jsx";
import KYCSecurityCard from "./components/KYCSecurityCard";
import KYCStepList from "./components/KYCStepList.jsx";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/common/BackButton/BackButton.jsx";

import {
  useGetCustomerKYCdetailsQuery,
} from "../../redux/features/customer/customerApi.js";


const kycSteps = [
  {
    id: 1,
    type: "aadhaar",
    title: "Aadhaar Verification",
    subtitle: "Verify your Aadhaar",
    screen:
      "aadhaar-verification-enter-mobile-number-screen",
  },
  {
    id: 2,
    type: "pan",
    title: "PAN Verification",
    subtitle: "Verify your PAN",
    screen:
      "pan-verification-enter-mobile-number-screen",
  },
  {
    id: 3,
    type: "address",
    title: "Address Verification",
    subtitle: "Verify your Address",
    screen:
      "personal-details-verification-screen",
  },
  {
    id: 4,
    type: "bank",
    title: "Bank Verification",
    subtitle: "Verify your Bank",
    screen:
      "bank-verification-screen",
  },
];


const CompleteKYCScreen = () => {

  const navigation = useNavigation();


  // =========================================================
  // KYC API
  // =========================================================

  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useGetCustomerKYCdetailsQuery();


  const kyc = data?.data;


  // =========================================================
  // PULL TO REFRESH
  // =========================================================

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);


  const onRefresh = async () => {

    try {

      setRefreshing(true);

      await refetch();

    } catch (error) {

      console.log(
        "Complete KYC refresh error:",
        error
      );

    } finally {

      setRefreshing(false);

    }
  };


  // =========================================================
  // KYC STATUS
  // =========================================================

  const getStepVerificationStatus = (
    type
  ) => {

    switch (type) {

      case "aadhaar":
        return (
          kyc?.aadhaarVerified === true
        );

      case "pan":
        return (
          kyc?.panVerified === true
        );

      case "address":
        return (
          kyc?.personalDetailsCompleted === true
        );

      case "bank":
        return (
          kyc?.bankStatus === "VERIFIED"
        );

      default:
        return false;
    }
  };


  // =========================================================
  // STEP PRESS
  // =========================================================

  const onStepPress = (item) => {

    const isVerified =
      getStepVerificationStatus(
        item.type
      );


    // Already verified
    // Don't open verification screen
    if (isVerified) {
      return;
    }


    navigation.navigate(
      item.screen
    );
  };


  return (

    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          theme.colors.white,
      }}
    >

      <StatusBar
        barStyle={
          theme.statusBar.dark
        }
        backgroundColor={
          theme.colors.white
        }
      />


      <View
        style={{
          flex: 1,
          paddingHorizontal:
            theme.spacing.xl,
        }}
      >

        <BackButton
          title="Complete KYC"
          onPress={() =>
            navigation.goBack()
          }
        />


        <ScrollView
          showsVerticalScrollIndicator={
            false
          }

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

          contentContainerStyle={{
            paddingTop:
              theme.spacing.md,

            paddingBottom:
              theme.spacing.xxl,
          }}
        >

          <KYCHeroCard />


          <KYCSecurityCard />


          <KYCStepList
            data={
              kycSteps
            }

            loading={
              isLoading ||
              isFetching
            }

            getStepVerificationStatus={
              getStepVerificationStatus
            }

            onPress={
              onStepPress
            }
          />

        </ScrollView>

      </View>

    </SafeAreaView>
  );
};


export default CompleteKYCScreen;