
import React from "react";

import {
  View,
  Text,
  Image,
} from "react-native";

import { useSelector } from "react-redux";

import {
  UserRoundX,
  BadgeCheck,
  CircleX,
  Camera,
} from "lucide-react-native";

import { theme } from "../../../theme";
import ProfileBannerSkeleton from "./ProfileBannerSkeleton.jsx";
import InlineRetry from "../../../components/common/RetryScreen/InlineRetry.jsx";

const ProfileBanner = ({
  verification,
  loading,
  refetch,
  error,
}) => {
  const user = useSelector((state) => state.auth.user);

  // ==========================
  // KYC VERIFICATION
  // ==========================
  const isVerified =   
    verification?.isVerification === true &&
    verification?.kycStatus === "VERIFIED";

  // ==========================
  // LOADING
  // ==========================
  if (loading) {
    return <ProfileBannerSkeleton />;
  }

  // ==========================
  // ERROR
  // ==========================
  if (error) {
    return (
      <View
        style={{
          padding: theme.spacing.lg,
          backgroundColor: "#FFF0EF",
          borderRadius: 16,
          borderWidth: 1,
          borderColor: "#FFD0CC",
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
  // PROFILE BANNER
  // ==========================
   return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 28,

        alignItems: "center",
        justifyContent: "center",

        borderRadius: 16,
        borderWidth: 1,

        backgroundColor: isVerified ? "#FCEDD6" : "#FFF0EF",
        borderColor: isVerified ? "#FFFFFF" : "#F04444",

        // iOS shadow (soft, Figma jaisa)
        shadowColor: "#101828",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isVerified ? 0.08 : 0,
        shadowRadius: isVerified ? 6 : 0,

        // Android shadow (kam rakho, warna square patti aati hai)
        elevation: isVerified ? 2 : 0,
      }}
    >
      {/* AVATAR */}
      <View
        style={{
          width: 90,
          height: 90,
          borderRadius: 45,
          borderWidth: 3,
          borderColor: isVerified ? "#FFA68C" : "#FFB0A9",
          backgroundColor: "#FFFFFF",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 84,
            height: 84,
            borderRadius: 42,
            overflow: "hidden",
            backgroundColor: isVerified ? "#131B2C" : "#BC2025",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isVerified && user?.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              resizeMode="cover"
              style={{ width: "100%", height: "100%" }}
            />
          ) : isVerified ? (
            <View
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#131B2C",
                alignItems: "center",
              }}
            >
              {/* Head */}
              <View
                style={{
                  position: "absolute",
                  top: 18,
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: "#010102",
                }}
              />
              {/* Shoulders */}
              <View
                style={{
                  position: "absolute",
                  bottom: 12,
                  width: 54,
                  height: 24,
                  borderTopLeftRadius: 28,
                  borderTopRightRadius: 28,
                  backgroundColor: "#2E3A50",
                }}
              />
            </View>
          ) : (
            <UserRoundX size={44} color="#FFFFFF" strokeWidth={1.7} />
          )}
        </View>

        {/* CAMERA BADGE – rounded square */}
        {isVerified && (
          <View
            style={{
              position: "absolute",
              right: -4,
              bottom: -4,

              width: 26,
              height: 26,
              borderRadius: 8,

              backgroundColor: "#F26B21",
              borderWidth: 2,
              borderColor: "#FFFFFF",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Camera size={13} color="#FFFFFF" strokeWidth={2.2} />
          </View>
        )}
      </View>

      {/* USER NAME */}
      <Text
        numberOfLines={2}
        ellipsizeMode="tail"
        style={{
          textAlign: "center",
          marginTop: 8,
          color: "#172033",
          fontSize: 18,
          lineHeight: 28,
          fontFamily: theme.fonts.bold,
          
        }}
      >
        {user?.fullName || "-"}
      </Text>

      {/* KYC STATUS */}
      {isVerified ? (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 4,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "#9BE6C0",
            backgroundColor: "#E5F8EE",
          }}
        >
          <BadgeCheck
            size={14}
            color="#008F55"
            fill="#008F55"
            stroke="#E5F8EE"
          />
          <Text
            style={{
              marginLeft: 5,
              color: "#008F55",
             fontSize: 14,
              lineHeight: 16,
              fontFamily: theme.fonts.semiBold,
            }}
          >
            KYC : Verified
          </Text>
        </View>
      ) : (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 4,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 30,
            borderWidth: 1,
            borderColor: "#FF8D8D",
            backgroundColor: "#FFF7F6",
          }}
        >
          <CircleX size={14} color="#C82025" strokeWidth={1.8} />
          <Text
            style={{
              marginLeft: 5,
              color: "#AF0505",
              fontSize: 14,
              lineHeight: 16,
              fontFamily: theme.fonts.semiBold,
            }}
          >
            KYC : Not Verified
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProfileBanner;
