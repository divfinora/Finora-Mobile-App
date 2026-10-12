import React from "react";
import {
  View,
  Text,
  Image,
} from "react-native";

import {
  Camera,
  BadgeCheck,
  CircleCheck,
  UserRound,
} from "lucide-react-native";

import { useSelector } from "react-redux";
import { theme } from "../../../theme";

const ProfileIdentityCard = ({
  variant = "kyc",
  verification = {},
  loading = false,
}) => {
  const user = useSelector((state) => state.auth.user);

  const isKycVerified =
    verification?.isVerification === true &&
    verification?.kycStatus === "VERIFIED";

  const isProfileComplete =
    variant === "profile";

  const isSuccess = isProfileComplete || isKycVerified;

  const statusText = isProfileComplete
    ? "Profile completed"
    : isKycVerified
      ? "KYC : Verified"
      : "KYC : Not Verified";

  const statusColor = isSuccess ? "#FF6338" : "#AF0505";
  const statusBg = isSuccess ? "#FFF0DD" : "#FFF0EF";
  const statusBorder = isSuccess ? "#FFDDBB" : "#FFB0A9";

  return (
    <View
      style={{
        width: "100%",
        minHeight: 220,
        paddingHorizontal: 16,
        paddingVertical: 24,

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#FCEDD6",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#FFFFFF",

        ...theme.shadows.card,
      }}
    >
      {/* AVATAR */}
      <View
        style={{
          width: 96,
          height: 96,
          borderRadius: 48,
          borderWidth: 3,
          borderColor: "#FFA68C",
          backgroundColor: "#FFFFFF",

          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: 86,
            height: 86,
            borderRadius: 43,
            overflow: "hidden",
            backgroundColor: "#131B2C",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {user?.profileImage ? (
            <Image
              source={{ uri: user.profileImage }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          ) : (
            <View
              style={{
                width: "100%",
                height: "100%",
                alignItems: "center",
                backgroundColor: "#131B2C",
              }}
            >
              <View
                style={{
                  position: "absolute",
                  top: 15,
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: "#354359",
                }}
              />

              <View
                style={{
                  position: "absolute",
                  bottom: 10,
                  width: 54,
                  height: 25,
                  borderTopLeftRadius: 28,
                  borderTopRightRadius: 28,
                  backgroundColor: "#354359",
                }}
              />
            </View>
          )}
        </View>

        {/* CAMERA BADGE */}
        <View
          style={{
            position: "absolute",
            right: -3,
            bottom: -2,

            width: 28,
            height: 28,
            borderRadius: 14,

            backgroundColor: "#FF6338",
            borderWidth: 2,
            borderColor: "#FFFFFF",

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Camera
            size={14}
            color="#FFFFFF"
            strokeWidth={2}
          />
        </View>
      </View>

      {/* NAME */}
      <Text
        numberOfLines={2}
        style={{
          marginTop: 14,
          textAlign: "center",

          color: "#172033",
          fontSize: 16,
          lineHeight: 23,
          fontFamily: theme.fonts.bold,
        }}
      >
        {user?.fullName || "-"}
      </Text>

      {/* STATUS BADGE */}
      {!loading && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",

            marginTop: 6,
            paddingHorizontal: 10,
            paddingVertical: 5,

            borderRadius: 30,
            borderWidth: 1,
            borderColor: statusBorder,
            backgroundColor: statusBg,
          }}
        >
          {isSuccess ? (
            isProfileComplete ? (
              <CircleCheck
                size={13}
                color={statusColor}
                fill={statusColor}
                stroke="#FFFFFF"
              />
            ) : (
              <BadgeCheck
                size={14}
                color="#008F55"
                fill="#008F55"
                stroke="#E5F8EE"
              />
            )
          ) : (
            <UserRound
              size={13}
              color={statusColor}
            />
          )}

          <Text
            style={{
              marginLeft: 6,
              color: isProfileComplete
                ? "#FF6338"
                : isKycVerified
                  ? "#008F55"
                  : statusColor,

              fontSize: 12,
              lineHeight: 16,
              fontFamily: theme.fonts.medium,
            }}
          >
            {statusText}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProfileIdentityCard;
 