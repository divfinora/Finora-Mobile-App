import React from "react";

import {
  View,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";

import { theme } from "../../../theme";

import NewFlowCommonHeader from "../../../components/common/BackButton/NewFlowCommonHeader.jsx";
import CommonButton from "../../../components/common/Button/CommonButton";

import ProfileIdentityCard from "../components/ProfileIdentityCard.jsx";
import BasicInformationCard from "./components/BasicInformationCard";
import ContactDetailsCard from "./components/ContactDetailsCard";
import AddressCard from "./components/AddressCard";

const PersonalInfoScreen = () => {
  const navigation = useNavigation();

  const DATA = [
    { id: "profile" },
    { id: "basic" },
    { id: "contact" },
    { id: "address" },
  ];

  const renderItem = ({ item }) => {
    switch (item.id) {
      case "profile":
        return (
          <ProfileIdentityCard
            variant="profile"
          />
        );

      case "basic":
        return <BasicInformationCard />;

      case "contact":
        return <ContactDetailsCard />;

      case "address":
        return <AddressCard />;

      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      edges={["top", "left", "right", "bottom"]}
      style={{
        flex: 1,
        backgroundColor: "#FCEDD6",
      }}
    >
      <StatusBar
        translucent={false}
        backgroundColor="#FAF5EB"
        barStyle="dark-content"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        {/* HEADER */}
        <NewFlowCommonHeader
          title="Personal Information"
          showNotification={false}
          onBack={() => navigation.goBack()}
          containerStyle={{
            backgroundColor: "#FAF5EB",
          }}
        />

        {/* SCROLLABLE CONTENT */}
        <FlatList
          data={DATA}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          ItemSeparatorComponent={() => (
            <View style={{ height: 16 }} />
          )}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 12,
            paddingBottom: 24,
          }}
        />

        {/* FIXED BOTTOM BUTTON */}
     
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default PersonalInfoScreen;
