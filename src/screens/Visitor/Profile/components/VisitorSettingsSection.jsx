import React from "react";

import {
  View,
  Text,
} from "react-native";

import {
  User,
  Bell,
  CircleHelp,
  FileText,
  Shield,
  KeyRound,
} from "lucide-react-native";

import {
  useNavigation,
} from "@react-navigation/native";

import VisitorSettingItem from "./VisitorSettingItem";

import {
  theme,
} from "../../../theme";


const VisitorSettingsSection = () => {

  const navigation =
    useNavigation();


  return (

    <>

      {/* =================================================
          ACCOUNT
      ================================================= */}

      <Text
        style={{
          marginBottom: 12,

          marginTop: 10,

          fontSize: 14,

          color: "#5F7395",

          fontWeight: "600",
        }}
      >
        ACCOUNT
      </Text>


      <View
        style={{
          backgroundColor:
            "#F6F6F7",

          borderRadius:
            20,

          overflow:
            "hidden",
        }}
      >

        <VisitorSettingItem
          title="Personal Info"
          icon={User}
          onPress={() =>
            navigation.navigate(
              "visitor-personal-info-screen"
            )
          }
        />


        <VisitorSettingItem
          title="Notification Settings"
          icon={Bell}
          onPress={() =>
            navigation.navigate(
              "notification-preferences-screen"
            )
          }

          isLast
        />

      </View>


      {/* =================================================
          SECURITY
      ================================================= */}

      


 


      {/* =================================================
          HELP & LEGAL
      ================================================= */}

      <Text
        style={{
          marginBottom: 12,

          marginTop: 28,

          fontSize: 14,

          color: "#5F7395",

          fontWeight: "600",
        }}
      >
        HELP & LEGAL
      </Text>


      <View
        style={{
          backgroundColor:
            "#F6F6F7",

          borderRadius:
            20,

          overflow:
            "hidden",
        }}
      >

        <VisitorSettingItem
          title="Help Center"
          icon={CircleHelp}

          onPress={() =>
            navigation.navigate(
              "visitor-help-center-screen"
            )
          }
        />


        <VisitorSettingItem
          title="Terms of Services & Policy"
          icon={FileText}

          onPress={() =>
            navigation.navigate(
              "visitor-terms-policy-screen"
            )
          }

          isLast
        />

      </View>

    </>

  );

};


export default VisitorSettingsSection;