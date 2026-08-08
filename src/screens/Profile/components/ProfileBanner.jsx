

import React from "react";

import {
  View,
  Text,
  Image,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";


import { theme } from "../../../theme";

import ProfileBannerSkeleton from "./ProfileBannerSkeleton.jsx";
import InlineRetry from  '../../../components/common/RetryScreen/InlineRetry.jsx'
import { useSelector } from "react-redux";

const ProfileBanner = ({
  verification,
  loading,
  refetch  ,
  error ,
}) => {

  const isVerified =
    verification?.isVerification &&
    verification?.kycStatus === "VERIFIED";

  // ==========================
  // LOADING
  // ==========================
  const user = useSelector((state) => state.auth.user);
  if (loading) {
    return <ProfileBannerSkeleton />;
  }
 
 if (error) {
  return (
   <View
      style={{
        padding: theme.spacing.lg,
        backgroundColor: "#FDF2F2",
        borderRadius: 24,
        paddingVertical: theme.spacing.xxxl,
      }}
    >
      <InlineRetry
        title="Unable to load profile"
        description="Tap below to refresh your profile."
        loading={loading}
        onRetry={refetch}
        containerStyle={{
          backgroundColor: "transparent",
          borderWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          paddingHorizontal: 0,
          paddingVertical: 0,
        }}
      />
    </View>
  );
}

  // ==========================
  // VERIFIED
  // ==========================

  if (isVerified) {

    return (

      <LinearGradient

        colors={[
          "#16212D",
          "#07090C",
        ]}

        start={{
          x: 0,
          y: 0,
        }}

        end={{
          x: 1,
          y: 1,
        }}

        style={{
          padding: theme.spacing.lg,
          borderRadius: 24,

          paddingVertical: 28,

          alignItems: "center",

        }}

      >

        {/* ============================ */}
        {/* PROFILE IMAGE */}
        {/* ============================ */}

        <View

          style={{

            width: 92,

            height: 92,

            borderRadius: 46,

            borderWidth: 4,

            borderColor: theme.colors.primary500,

            justifyContent: "center",

            alignItems: "center",

          }}

        >

          <Image

            source={{
              uri:
                user?.profileImage ||
                "https://i.pravatar.cc/300",
            }}

            style={{

              width: 82,

              height: 82,

              borderRadius: 41,

            }}

          />

          {/* VERIFIED BADGE */}

          <View

            style={{

              position: "absolute",

              bottom: -2,

              right: -2,

              width: 24,

              height: 24,

              borderRadius: 12,

              backgroundColor: theme.colors.primary500,

              borderWidth: 2,

              borderColor: "#FFD25A",

              justifyContent: "center",

              alignItems: "center",

            }}

          >

            <Text

              style={{

                color: theme.colors.white,

                fontSize: 12,

              }}

            >

              ✓

            </Text>

          </View>

        </View>

        {/* ============================ */}
        {/* NAME */}
        {/* ============================ */}

        <Text
          numberOfLines={2}
          ellipsizeMode="tail"

          style={{
            textAlign: "center",
            marginTop: theme.spacing.lg,

            color: theme.colors.white,

            fontSize: theme.typography.h2,

            fontFamily: theme.fonts.headingSemiBold,

          }}

        >

          {user.fullName || "-"}

        </Text>

        {/* ============================ */}
        {/* CITIZEN ID */}
        {/* ============================ */}

        <Text

          style={{
            textAlign: 'center',
            marginTop: 6,

            color: "#AEB7C6",

            fontSize: theme.typography.b2,

            fontFamily: theme.fonts.medium,

          }}

        >

          Citizen ID: {user?.customerId || "-"}

        </Text>

        {/* ============================ */}
        {/* VERIFIED CHIP */}
        {/* ============================ */}

        <View

          style={{

            marginTop: 16,

            backgroundColor: "#FFF2E7",

            paddingHorizontal: 16,

            paddingVertical: 6,

            borderRadius: 50,

          }}

        >

          <Text

            style={{

              color: theme.colors.primary500,

              fontSize: 11,

              letterSpacing: 1,

              fontFamily: theme.fonts.bold,

            }}

          >

            VERIFIED

          </Text>

        </View>

      </LinearGradient>

    );

  }

  // ==========================
  // NOT VERIFIED
  // ==========================

  // ==========================
  // NOT VERIFIED
  // ==========================

  return (

    <View
      style={{
        padding: theme.spacing.lg,
        backgroundColor: "#FDF2F2",
        borderRadius: 24,
        paddingVertical: theme.spacing.xxxl,
        alignItems: "center",
      }}
    >

      {/* Avatar */}

      <View
        style={{
          width: 92,
          height: 92,
          borderRadius: 46,
          backgroundColor: theme.colors.gray200,
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <Image
          source={{
            uri:
              user?.profileImage ||
              "https://i.pravatar.cc/300",
          }}
          resizeMode="contain"
          style={{
            width: 82,
            height: 82,
            borderRadius: 41,
          }}
        />

      </View>

      {/* Name */}

      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{
          textAlign: 'center',
          marginTop: theme.spacing.lg,
          color: theme.colors.error,
          fontSize: theme.typography.h2,
          fontFamily: theme.fonts.headingSemiBold,

        }}
      >
        {user?.fullName || "-"}
      </Text>

      {/* Phone */}

      <Text
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{
          textAlign: 'center',
          marginTop: theme.spacing.xs,
          color: theme.colors.black,
          fontSize: theme.typography.b2,
          fontFamily: theme.fonts.medium,
        }}
      >
        +91 {user?.mobile || ""}
      </Text>

      {/* Status */}

      <View
        style={{
          marginTop: theme.spacing.sm,
          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.xs,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: theme.colors.error,
          backgroundColor: theme.colors.white,
        }}
      >

        <Text
          style={{
            color: theme.colors.error,
            fontSize: theme.typography.b3,
            fontFamily: theme.fonts.extraBold,
            letterSpacing: 0.8,
          }}
        >
          KYC : NOT VERIFIED
        </Text>

      </View>

    </View>

  );

};

export default ProfileBanner;