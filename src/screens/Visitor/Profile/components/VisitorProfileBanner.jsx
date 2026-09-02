import React from "react";

import {
  View,
  Text,
  Image,
} from "react-native";

import {
  useSelector,
} from "react-redux";

import {
  theme,
} from "../../../../theme/index.js";

import VisitorProfileBannerSkeleton from "./VisitorProfileBannerSkeleton";


const VisitorProfileBanner = ({
  loading = false,
}) => {

  // =====================================================
  // VISITOR USER
  // =====================================================

  const user =
    useSelector(
      (state) =>
        state.auth?.user
    );


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (
      <VisitorProfileBannerSkeleton />
    );

  }


  // =====================================================
  // PROFILE IMAGE
  // =====================================================

  const profileImage =
    typeof user?.profileImage?.url === "string" &&
    user?.profileImage?.url.trim()
      ? user.profileImage.url
      : "https://i.pravatar.cc/300?img=12";


  // =====================================================
  // USER DATA
  // =====================================================

  const fullName =
    user?.fullName ||
    "—";


  const designation =
    user?.designation ||
    "—";


  const employeeId =
    user?.employeeId ||
    "—";


  return (

    <View
      style={{
        backgroundColor:
          theme.colors.white,

        borderRadius:
          24,

        padding:
          theme.spacing.xl,

        paddingVertical:
          28,

        alignItems:
          "center",

        marginBottom:
          theme.spacing.xl,

        borderWidth:
          0.1,

        borderColor:
          "#2f2e2e",

        ...theme.shadows.card,
      }}
    >

      {/* =================================================
          PROFILE IMAGE
      ================================================= */}

      <View
        style={{
          width: 92,

          height: 92,

          borderRadius: 46,

          borderWidth: 4,

          borderColor:
            theme.colors.primary500,

          justifyContent:
            "center",

          alignItems:
            "center",
        }}
      >

        <Image
          source={{
            uri:
              profileImage,
          }}

          style={{
            width: 82,

            height: 82,

            borderRadius: 41,
          }}

          resizeMode="cover"
        />

      </View>


      {/* =================================================
          NAME
      ================================================= */}

      <Text
        numberOfLines={2}

        ellipsizeMode="tail"

        style={{
          textAlign:
            "center",

          marginTop:
            theme.spacing.lg,

          color:
            theme.colors.text,

          fontSize:
            theme.typography.h2,

          fontFamily:
            theme.fonts.bold,
        }}
      >
        {fullName}
      </Text>


      {/* =================================================
          ACTIVE STATUS
      ================================================= */}

      <View
        style={{
          marginTop:
            theme.spacing.sm,

          backgroundColor:
            theme.colors.primary500,

          paddingHorizontal:
            16,

          paddingVertical:
            6,

          borderRadius:
            50,
        }}
      >

        <Text
          style={{
            color:
              theme.colors.white,

            fontSize:
              theme.typography.b3,

            fontFamily:
              theme.fonts.bold,
          }}
        >
          Active
        </Text>

      </View>


      {/* =================================================
          DESIGNATION
      ================================================= */}

      <Text
        numberOfLines={1}

        ellipsizeMode="tail"

        style={{
          textAlign:
            "center",

          marginTop:
            theme.spacing.md,

          color:
            theme.colors.textSecondary,

          fontSize:
            theme.typography.b1,

          fontFamily:
            theme.fonts.semiBold,
        }}
      >
        {designation}
      </Text>


      {/* =================================================
          EMPLOYEE ID
      ================================================= */}

      <Text
        numberOfLines={1}

        ellipsizeMode="tail"

        style={{
          textAlign:
            "center",

          marginTop:
            theme.spacing.xs,

          color:
            theme.colors.textSecondary,

          fontSize:
            theme.typography.b3,

          fontFamily:
            theme.fonts.semiBold,
        }}
      >
        Employee ID: {employeeId}
      </Text>

    </View>

  );

};


export default VisitorProfileBanner;