import React from "react";

import {
  View,
  Text,
  Image,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import {
  theme,
} from "../../../../theme";

const VisitorProfileInfoProfileImageCard = ({
  profile,
}) => {

  // =====================================================
  // PROFILE IMAGE
  // =====================================================

  const profileImage =
    profile?.profile?.profileImage?.url ||
    profile?.profileImage?.url ||
    "https://i.pravatar.cc/300?img=12";

  // =====================================================
  // FULL NAME
  // =====================================================

  const fullName =
    profile?.fullName ||
    profile?.basicInformation?.fullName ||
    "Rahul Sharma";

  // =====================================================
  // EMPLOYEE ID
  // =====================================================

  const employeeId =
    profile?.employeeId ||
    profile?.basicInformation?.employeeId ||
    "FVI001";

  // =====================================================
  // DESIGNATION
  // =====================================================

  const designation =
    profile?.designation ||
    profile?.employmentInformation?.designation ||
    "Field Verification Officer";

  // =====================================================
  // PROFILE RING GRADIENT
  // =====================================================

  const profileRingGradient =
    theme?.gradients?.profileRing || [
      "#FF8008",
      "#FFC837",
    ];

  return (
    <View
      style={{
        alignItems: "center",

        backgroundColor:
          theme.colors.white,

        marginBottom:
          theme.spacing.xl,
      }}
    >

      {/* ================================================= */}
      {/* PROFILE IMAGE */}
      {/* ================================================= */}

      <LinearGradient
        colors={profileRingGradient}
        start={{
          x: 0,
          y: 0,
        }}
        end={{
          x: 1,
          y: 1,
        }}
        style={{
          width: 96,

          height: 96,

          borderRadius:
            theme.radius.circle,

          padding: 4,

          alignItems: "center",

          justifyContent: "center",

          marginBottom:
            theme.spacing.md,
        }}
      >

        <Image
          source={{
            uri: profileImage,
          }}
          style={{
            width: 88,

            height: 88,

            borderRadius:
              theme.radius.circle,

            backgroundColor:
              theme.colors.gray100,
          }}
          resizeMode="cover"
        />

      </LinearGradient>

      {/* ================================================= */}
      {/* NAME */}
      {/* ================================================= */}

      <Text
        style={{
          fontSize:
            theme.typography.h2,

         

          fontFamily:
            theme.fonts.semiBold,

          color:
            theme.colors.black,

          textAlign: "center",

          marginBottom:
            theme.spacing.xs,
        }}
      >
        {fullName}
      </Text>

      {/* ================================================= */}
      {/* EMPLOYEE ID + DESIGNATION */}
      {/* ================================================= */}

      <Text
        style={{
          fontSize:
            theme.typography.b2,

          lineHeight:
            theme.lineHeight.b2,

          fontFamily:
            theme.fonts.semiBold,

          color:
            '#45464D',

          textAlign: "center",

          textTransform: "uppercase",
        }}
      >
        {employeeId} • {designation}
      </Text>

    </View>
  );
};

export default VisitorProfileInfoProfileImageCard;