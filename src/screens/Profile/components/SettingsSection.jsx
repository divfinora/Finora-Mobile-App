import React, { useEffect, useRef, useState } from "react";

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
import {

  Bell,

} from "lucide-react-native";
import SettingItem from "./SettingItem";
import { useNavigation } from "@react-navigation/native";
import { useGetSettingsQuery, useGetupdateSettingsMutation } from "../../../redux/features/customer/customerApi";
import useHandleMutation from "../../../hooks/useHandleMutation";
import InlineRetry from "../../../components/common/RetryScreen/InlineRetry";
import { theme } from "../../../theme";

const SettingsSection = () => {
  const navigation = useNavigation();
  const [

    loadingKey,

    setLoadingKey,

  ] = useState("");


  const debounceRef = useRef({});

  // Setting Api Call STart
  const {

    //  isFetching,
    data,
    error: settingsError,
    isLoading: settingsLoading,
    isFetching: settingsisFetching,
    refetch,

  } = useGetSettingsQuery();

  const settings =
    data?.settings;
  // console.log(settings, "setting")

  const [

    updateSettings,

    {

      isLoading,

      isSuccess,

      isError,

      error,

    },

  ] = useGetupdateSettingsMutation();

  const {

    handleMutation,

  } = useHandleMutation();


  const [

    biometric,

    setBiometric,

  ] = useState(false);

  const [

    emailNotification,

    setEmailNotification,

  ] = useState(false);

  const [

    pushNotification,

    setPushNotification,

  ] = useState(false);


  useEffect(() => {



    if (!settings) return;

    if (loadingKey || settingsLoading ||
      settingsisFetching) return;


    console.log(settings, "settings ---------")

    setBiometric(
      settings.biometricEnabled
    );

    setEmailNotification(
      settings.emailNotification
    );

    setPushNotification(
      settings.pushNotification
    );

  }, [

     settings,

  loadingKey,

  settingsLoading,

  settingsisFetching,

  ]);

  useEffect(() => {

    return () => {

      Object.values(
        debounceRef.current
      ).forEach(clearTimeout);

    };

  }, []);
  const handleSettingToggle = (

    key,

    value,

    setter,

  ) => {

    // Optimistic UI
    setter(value);

    // Previous debounce clear
    if (debounceRef.current[key]) {

      clearTimeout(
        debounceRef.current[key]
      );

    }

    debounceRef.current[key] =
      setTimeout(async () => {

        setLoadingKey(key);

        const response =
          await handleMutation({

            apiFunc: updateSettings,

            params: {

              [key]: value,

            },

            timeoutMs: 10000,

            showError: true,

            showSuccess: false,

          });

        // API Fail -> Rollback UI
        if (!response) {

          setter(!value);

        }

        // Unlock Switch
        setLoadingKey("");

      }, 500);

  };
  //  Setting Api Call End 
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
        {settingsError ?
          <InlineRetry
            title="Unable to load settings"
            description="Please try again."
            loading={settingsLoading}
            onRetry={refetch}
            containerStyle={{
              margin: theme.spacing.md,
              width: 'auto',
              paddingVertical: theme.spacing.md,
              paddingHorizontal: theme.spacing.md,

              borderRadius: theme.radius.lg,

              minHeight: 110,

              alignItems: "center",
              justifyContent: "center",
            }}
          />
          :

          <>


            <SettingItem
              title="Biometric Login"
              icon={Fingerprint}
              type="toggle"
              value={biometric}
              loading={loadingKey === "biometricEnabled"}
              disabled={loadingKey?true :false  || settingsLoading || settingsisFetching}
              onToggle={(value) =>
                handleSettingToggle(
                  "biometricEnabled",
                  value,
                  setBiometric
                )
              }
            />
            <SettingItem
              title="Email Notification"
              icon={Mail}
              type="toggle"
              value={emailNotification}
              loading={loadingKey === "emailNotification"}
              disabled={loadingKey?true :false   || settingsLoading || settingsisFetching}
              onToggle={(value) =>
                handleSettingToggle(
                  "emailNotification",
                  value,
                  setEmailNotification
                )
              }
            />
            <SettingItem
              title="Push Notification"
              icon={Bell}
              type="toggle"
              value={pushNotification}
              loading={loadingKey === "pushNotification"}
              disabled={loadingKey?true :false  || settingsLoading || settingsisFetching}
              onToggle={(value) =>
                handleSettingToggle(
                  "pushNotification",
                  value,
                  setPushNotification
                )
              }
            />



          </>}
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