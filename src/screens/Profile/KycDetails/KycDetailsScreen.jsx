import React, {
  memo,
  useMemo,
  useState,
} from "react";

import {

  View,
  FlatList,
  RefreshControl,
} from "react-native";

import {
  IdCard,
  CreditCard,
  UserRound,
  Landmark,
  Vote,
} from "lucide-react-native";

import { theme } from "../../../theme/index.js";

import dayjs from "dayjs";


import KycStatusCard from "./components/KycStatusCard.jsx";
import SectionHeader from "./components/SectionHeader.jsx";
import KycDocumentCard from "./components/KycDocumentCard.jsx";
import AddDocumentCard from "./components/AddDocumentCard.jsx";
import SecurityNotice from "./components/SecurityNotice.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../../components/common/BackButton/BackButton.jsx";
import CommonButton from "../../../components/common/Button/CommonButton.jsx";
import { useGetCustomerKYCdetailsQuery } from "../../../redux/features/customer/customerApi.js";
import { useNavigation } from "@react-navigation/native";

const KycDetailsScreen = () => {
  const {
    data,
    isLoading,
    isFetching,
    refetch,
  } = useGetCustomerKYCdetailsQuery();

  const navigation = useNavigation();
  const kyc = data?.data;

  const documents = useMemo(() => [
    {
      id: "1",
      title: "Aadhaar Card",
      subtitle: kyc?.aadhaarNumber || "Not Linked",
      icon: IdCard,
      verified: kyc?.aadhaarVerified,
      screen: "aadhaar-verification-enter-mobile-number-screen",
    },
    {
      id: "2",
      title: "PAN Card",
      subtitle: kyc?.panNumber || "Not Linked",
      icon: CreditCard,
      verified: kyc?.panVerified,
      screen: "pan-verification-enter-mobile-number-screen",
    },
    {
      id: "3",
      title: "Personal Details",
      subtitle: kyc?.personalDetailsCompleted
        ? "Completed"
        : "Not Completed",
      icon: UserRound,
      verified: kyc?.personalDetailsCompleted,
      screen: "personal-details-verification-screen",
    },
    {
      id: "4",
      title: "Bank Link Account",
      subtitle: kyc?.bankDetails?.accountNumber || "Not Linked",
      icon: Landmark,
      verified: kyc?.bankVerified,
      screen: "bank-verification-screen",
    },
  ], [kyc]);



  //  Pull to Refress 

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {

    setRefreshing(true);

    await refetch();

    setRefreshing(false);

  };
  //  Pull to Refress 

  const renderItem = ({ item }) => {

    const handlePress = () => {

      if (!item.verified) {
        navigation.navigate(item.screen);
      }

    };

    return (
      <KycDocumentCard
        loading={isLoading || isFetching}
        verified={item.verified}
        title={item.title}
        subtitle={item.subtitle}
        icon={item.icon}
        onPress={handlePress}
      />
    );
  };

  return (

    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
      }}
    >

      <View style={{ flex: 1, paddingHorizontal: theme.spacing.xxl }}>
        <BackButton
          title="KYC Details"
        />

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[theme.colors.primary500]}
              tintColor={theme.colors.primary500}
            />
          }
          data={documents}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            // paddingHorizontal: theme.spacing.lg,
            paddingBottom: 120,
          }}
          ListHeaderComponent={
            <>
              <KycStatusCard
                loading={isLoading || isFetching}
                status={kyc?.kycStatus}
                lastUpdated={`Last updated: ${dayjs(kyc?.updatedAt).format("DD MMM YYYY")}`}
                profileStatus={
                  kyc?.kycStatus === "VERIFIED"
                    ? "Active Profile"
                    : "KYC Pending"
                }
                
              />
           

              <SectionHeader
                title="IDENTITY DOCUMENTS"
                rightText="2/3 COMPLETED"
              />
            </>
          }
          ListFooterComponent={
            <>
              <SecurityNotice />

              <View
                style={{
                  marginTop: theme.spacing.xxxl,
                }}
              >
                <CommonButton
                  title="Save Changes"
                  onPress={() => { }}
                />
              </View>
            </>
          }
        />
      </View>

    </SafeAreaView>

  );

};

export default memo(KycDetailsScreen);