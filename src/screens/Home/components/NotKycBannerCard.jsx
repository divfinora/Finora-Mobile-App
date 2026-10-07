import React, { memo } from "react";

import {
  TouchableOpacity,
  Image,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

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
  const navigation =
    useNavigation();

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
  // HANDLE BANNER PRESS
  // ==========================================

  const handleBannerPress = () => {
    // ========================================
    // VERIFIED
    // ========================================

    if (isVerified) {
      navigation.navigate("Loan");
      return;
    }

    // ========================================
    // NOT VERIFIED
    // ========================================

    navigation.navigate(
      "complete-kyc-screen"
    );
  };

  // ==========================================
  // BANNER SOURCE
  // ==========================================

  const bannerSource = isVerified
    ? require(
        "./assets/complete-kyc.png"
      )
    : require(
        "../../Loan/LoanApply/Step1ApplyLoanPersonalDetail/components/assets/kyc-not-complete-banner.png"
      );

  // ==========================================
  // BANNER DIMENSIONS
  // ==========================================

  const bannerDimensions =
    Image.resolveAssetSource(
      bannerSource
    );

  const bannerAspectRatio =
    bannerDimensions?.width &&
    bannerDimensions?.height
      ? bannerDimensions.width /
        bannerDimensions.height
      : 16 / 5;

  // ==========================================
  // BANNER
  // ==========================================

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={
        handleBannerPress
      }
      style={{
        width: "100%",

        aspectRatio:
          bannerAspectRatio,

        marginBottom:
          theme.spacing.lg,

        borderRadius:
          theme.radius.lg,

        overflow: "hidden",
        
      }}
    >
      <Image
        source={bannerSource}
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