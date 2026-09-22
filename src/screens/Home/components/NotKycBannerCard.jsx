import React, { memo } from "react";

import {
  TouchableOpacity,
  Image,
} from "react-native";

import { theme } from "../../../theme";

import useKYCVerificationDoneAndNotDone
  from "../../../hooks/useKYCVerificationDoneAndNotDone.js";

import KycBannerSkeleton
  from "./KycBannerSkeleton.jsx";

import InlineRetry
  from "../../../components/common/RetryScreen/InlineRetry";

const NotKycBannerCard = ({
  onPress,
}) => {

  const {
    verification,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useKYCVerificationDoneAndNotDone();

  // ==========================================
  // LOADING / FETCHING
  // ==========================================

  if (isLoading || isFetching) {
    return (
      <KycBannerSkeleton />
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (isError) {
    return (
      <InlineRetry
        title="Unable to load KYC status"
        description="Please try again."
        loading={isFetching}
        onRetry={refetch}
        containerStyle={{
          marginVertical:
            theme.spacing.md,
        }}
      />
    );
  }

  // ==========================================
  // VERIFIED
  // ==========================================

  const isVerified =
    verification?.isVerification === true &&
    verification?.kycStatus === "VERIFIED";

  // ==========================================
  // BANNER
  // ==========================================

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      // onPress={
      //   isVerified
      //     ? undefined
      //     : onPress
      // }
      onPress={
        onPress
      }
      style={{
        width: "100%",

        height: 145,

        borderRadius:
          theme.radius.lg,

        overflow: "hidden",

        backgroundColor:
          theme.colors.navy900,
      }}
    >
      <Image
        source={
          isVerified
            ? require(
                "./assets/image.png"
              )
            : require(
                "./assets/image.png"
              )
        }
        resizeMode="contain"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </TouchableOpacity>
  );
};

export default memo(
  NotKycBannerCard
);