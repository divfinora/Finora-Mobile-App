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

 

// Common Components
import BackButton from "../../../components/common/BackButton/BackButton";
import CommonButton from "../../../components/common/Button/CommonButton";

// Components
import ProfileImageCard from "./components/ProfileImageCard";
import BasicInformationCard from "./components/BasicInformationCard";
import ContactDetailsCard from "./components/ContactDetailsCard";
import AddressCard from "./components/AddressCard";
import { theme } from "../../../theme";

const PersonalInfoScreen = () => {

  const navigation = useNavigation();

  // ===========================================
  // DUMMY DATA
  // ===========================================

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

  // ===========================================
  // RENDER ITEM
  // ===========================================

  const renderItem = ({ item }) => {

    switch (item.id) {

      case "profile":

        return (
          <ProfileImageCard />
        );

      case "basic":

        return (
          <BasicInformationCard />
        );

      case "contact":

        return (
          <ContactDetailsCard />
        );

      case "address":

        return (
          <AddressCard />
        );

      default:
        return null;

    }

  };

  // ===========================================
  // FOOTER
  // ===========================================

  const renderFooter = () => (

    <View
      style={{
        marginTop: 30,
        marginBottom: 40,
      }}
    >

      <CommonButton
        title="Save Changes"
        onPress={() => {

          console.log("Save");

        }}
      />

    </View>

  );

  return (

    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
      }}
    >

      {/* ================================= */}
      {/* STATUS BAR */}
      {/* ================================= */}

      <StatusBar
        translucent={false}
        backgroundColor={theme.colors.white}
        barStyle="dark-content"
      />

      {/* ================================= */}
      {/* KEYBOARD */}
      {/* ================================= */}

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

        {/* ================================= */}
        {/* FIXED HEADER */}
        {/* ================================= */}

        <View
          style={{
            paddingHorizontal: theme.spacing.xxl,
         
            backgroundColor: theme.colors.white,
          }}
        >

          <BackButton
            title="Personal Info"
            onPress={() => navigation.goBack()}
          />

        </View>

        {/* ================================= */}
        {/* BODY */}
        {/* ================================= */}

        <FlatList

          data={DATA}

          keyExtractor={(item) => item.id}

          renderItem={renderItem}

          ListFooterComponent={renderFooter}

          showsVerticalScrollIndicator={false}

          keyboardShouldPersistTaps="handled"

          contentContainerStyle={{

            paddingHorizontal: theme.spacing.xxl,

            paddingTop: 20,

            paddingBottom: 30,

          }}

        />

      </KeyboardAvoidingView>

    </SafeAreaView>

  );

};

export default PersonalInfoScreen;