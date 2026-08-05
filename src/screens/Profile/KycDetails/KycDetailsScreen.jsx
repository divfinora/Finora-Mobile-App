import React, {
  memo,
  useMemo,
} from "react";

import {
 
  View,
  FlatList,
} from "react-native";

import {
  IdCard,
  CreditCard,
  UserRound,
  Landmark,
  Vote,
} from "lucide-react-native";

import { theme } from "../../../theme/index.js";

 
 

import KycStatusCard from "./components/KycStatusCard.jsx";
import SectionHeader from "./components/SectionHeader.jsx";
import KycDocumentCard from "./components/KycDocumentCard.jsx";
import AddDocumentCard from "./components/AddDocumentCard.jsx";
import SecurityNotice from "./components/SecurityNotice.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../../components/common/BackButton/BackButton.jsx";
import CommonButton from "../../../components/common/Button/CommonButton.jsx";

const KycDetailsScreen = () => {

  const documents = useMemo(() => ([
    {
      id: "1",
      title: "Aadhaar Card",
      subtitle: "XXXX XXXX 8829",
      icon: IdCard,
      verified: true,
    },
    {
      id: "2",
      title: "PAN Card",
      subtitle: "XXXXX442P",
      icon: CreditCard,
      verified: true,
    },
    {
      id: "3",
      title: "Personal Details",
      subtitle: "XXXXX442P",
      icon: UserRound,
      verified: true,
    },
    {
      id: "4",
      title: "Bank Link Account",
      subtitle: "XXXXX442P",
      icon: Landmark,
      verified: true,
    },
    {
      id: "5",
      title: "Voter ID",
      subtitle: "Not Linked",
      icon: Vote,
      verified: false,
    },
  ]), []);

  const renderItem = ({ item }) => {

    if (item.verified) {

      return (
        <KycDocumentCard
          title={item.title}
          subtitle={item.subtitle}
          icon={item.icon}
        />
      );

    }

    return (
      <AddDocumentCard
        title={item.title}
        subtitle={item.subtitle}
        icon={item.icon}
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

    <View style={{flex: 1, paddingHorizontal: theme.spacing.xxl}}> 
      <BackButton
        title="KYC Details"
      />

      <FlatList
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
              status="Verified"
              lastUpdated="Last updated: Oct 24, 2023"
              profileStatus="Active Profile"
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
                onPress={() => {}}
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