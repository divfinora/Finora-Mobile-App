import React, { useState } from "react";

import {
  View,
  Text,
} from "react-native";

import {
  User,
  Landmark,
  BadgeCheck,
  Fingerprint,
  Mail,
  KeyRound,
  CircleHelp,
  FileText,
  Shield,
} from "lucide-react-native";

import SettingItem from "./SettingItem";
import { useNavigation } from "@react-navigation/native";

const SettingsSection = () => {
const navigation = useNavigation();
  const [biometric, setBiometric] = useState(false);

  const [emailNotification, setEmailNotification] = useState(true);

  return (

    <>

      {/* ACCOUNT */}

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
          backgroundColor: "#F6F6F7",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >

        <SettingItem
          title="Personal Info"
          icon={User}
           onPress={() => navigation.navigate("profile-screen-personal-info-screen")}
        />

        <SettingItem
          title="Link Bank Accounts"
          icon={Landmark}
          onPress={() => navigation.navigate("profile-screen-bank-accounts-screen")}
        />

        <SettingItem
          title="KYC Details"
          icon={BadgeCheck}
          onPress={() => navigation.navigate("profile-screen-kyc-details")}
          isLast
        />

      </View>

      {/* SECURITY */}

      <Text
        style={{
          marginBottom: 12,
          marginTop: 28,
          fontSize: 14,
          color: "#5F7395",
          fontWeight: "600",
        }}
      >
        SECURITY
      </Text>

      <View
        style={{
          backgroundColor: "#F6F6F7",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >

        <SettingItem
          title="Biometric Login"
          icon={Fingerprint}
          type="toggle"
          value={biometric}
          onToggle={setBiometric}
        />

        <SettingItem
          title="Email Notification"
          icon={Mail}
          type="toggle"
          value={emailNotification}
          onToggle={setEmailNotification}
        />

        <SettingItem
          title="Change Pin"
          icon={KeyRound}
          type="button"
          isLast
        />

      </View>

      {/* HELP & LEGAL */}

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
          backgroundColor: "#F6F6F7",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >

        <SettingItem
          title="FAQ"
          icon={CircleHelp}
        />

        <SettingItem
          title="Terms of Services"
          icon={FileText}
        />

        <SettingItem
          title="User Policy"
          icon={Shield}
          isLast
        />

      </View>

    </>

  );

};

export default SettingsSection;