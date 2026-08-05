import React, { memo } from "react";

import {
  View,
  Text,
} from "react-native";

import {
  CircleCheckBig,
} from "lucide-react-native";
import { theme } from "../../../../theme";

 

const KycStatusCard = ({
  status = "Verified",
  lastUpdated = "Last updated: Oct 24, 2023",
  profileStatus = "Active Profile",
}) => {

  return (

    <View
      style={{
        backgroundColor: theme.colors.gray100,

        borderRadius: theme.radius.xl,

        alignItems: "center",

        paddingVertical: theme.spacing.huge,

        marginTop: theme.spacing.lg,

        marginBottom: theme.spacing.xxxl,
      }}
    >

      {/* ================= ICON ================= */}

      <View
        style={{
          width: 92,
          height: 92,

          borderRadius: 46,

          backgroundColor: "#FFE7CF",

          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <View
          style={{
            width: 76,
            height: 76,

            borderRadius: 38,

            backgroundColor: "# E2570E",

            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <View
            style={{
              width: 36,
              height: 36,

              borderRadius: 18,

              backgroundColor: theme.colors.white,

              justifyContent: "center",
              alignItems: "center",
            }}
          >

            <CircleCheckBig
              size={20}
              color="#F97316"
              strokeWidth={3}
            />

          </View>

        </View>

      </View>

      {/* ================= STATUS ================= */}

      <Text
        style={{
          marginTop: theme.spacing.xl,

          color: theme.colors.gray900,

          fontSize: theme.typography.h2,

          fontFamily: theme.fonts.semiBold,
        }}
      >
        KYC Status : {status}
      </Text>

      {/* ================= UPDATED ================= */}

      <Text
        style={{
          marginTop: theme.spacing.sm,

          color: theme.colors.textLight,

          fontSize: theme.typography.b3,

          fontFamily: theme.fonts.regular,
        }}
      >
        {lastUpdated}
      </Text>

      {/* ================= BADGE ================= */}

      <View
        style={{
          marginTop: theme.spacing.lg,

          backgroundColor: "#FFF1E5",

          borderWidth: 1,
          borderColor: "#FDBA74",

          borderRadius: 999,

          paddingHorizontal: theme.spacing.lg,
          paddingVertical: 6,
        }}
      >

        <Text
          style={{
            color: "#EA580C",

            fontSize: theme.typography.b3,

            fontFamily: theme.fonts.semiBold,
          }}
        >
          {profileStatus}
        </Text>

      </View>

    </View>

  );

};

export default memo(KycStatusCard);