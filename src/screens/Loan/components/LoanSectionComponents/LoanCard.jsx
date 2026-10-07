import React, { memo } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  ChevronRight,
} from "lucide-react-native";

import { theme } from "../../../../theme";

// =====================================================
// OFFLINE LOAN IMAGES
// =====================================================

import PersonalLoanImage from "../../../../assets/images/personal-loan.png";
import InstantLoanImage from "../../../../assets/images/Instant-loan.png";
import GoldLoanImage from "../../../../assets/images/gold-loan.png";
import EducationLoanImage from "../../../../assets/images/education-loan.png";
import AgricultureLoanImage from "../../../../assets/images/agriculture-loan.png";
import VehicleLoanImage from "../../../../assets/images/vehicle-loan.png";

// =====================================================
// LOAN CARD CONFIG
// =====================================================
//
// YAHI SE TITLE / SUBTITLE / IMAGE CHANGE KAR SAKTE HO
//
// =====================================================

const LOAN_CARD_CONFIG = {
  PERSONAL: {
    title: "Personal Loan",
    subtitle: "Quick Funds,\nEasy Access",
    image: PersonalLoanImage,
  },

  INSTANT: {
    title: "Instant Loan",
    subtitle: "Quick Funds,\nEasy Access",
    image: InstantLoanImage,
  },

  GOLD: {
    title: "Gold Loan",
    subtitle: "Get Cash\nAgainst Gold",
    image: GoldLoanImage,
  },

  EDUCATION: {
    title: "Education Loan",
    subtitle: "Invest In Your\nEducation",
    image: EducationLoanImage,
  },

  AGRICULTURE: {
    title: "Agriculture Loan",
    subtitle: "Support For Your\nFarming Needs",
    image: AgricultureLoanImage,
  },

  VEHICLE: {
    title: "Vehicle Loan",
    subtitle: "Finance Your\nDream Vehicle",
    image: VehicleLoanImage,
  },
};

// =====================================================
// COMPONENT
// =====================================================

const LoanCard = ({
  loan,
  loanType,
  onPress,
  horizontal = false,
}) => {

  // =====================================================
  // FORMAT AMOUNT
  // =====================================================

  const formatAmount = (value) => {
    if (!value) {
      return "0";
    }

    if (value >= 10000000) {
      return `${(
        value / 10000000
      ).toFixed(0)}Cr`;
    }

    if (value >= 100000) {
      return `${(
        value / 100000
      ).toFixed(0)}L`;
    }

    if (value >= 1000) {
      return `${(
        value / 1000
      ).toFixed(0)}K`;
    }

    return value;
  };

  // =====================================================
  // LOAN COUNT
  // =====================================================

  const loanCount =
    loan?.loanCount ??
    loan?.types?.reduce(
      (total, type) =>
        total +
        (type?.loanCount || 0),
      0
    ) ??
    0;

  // =====================================================
  // CATEGORY
  // =====================================================

  const category =
    String(
      loanType ??
      loan?.category ??
      loan?.loan?.category ??
      loan?.name ??
      ""
    )
      .trim()
      .toUpperCase();

  // =====================================================
  // CONFIG
  // =====================================================

  const loanConfig =
    LOAN_CARD_CONFIG[category];

  // =====================================================
  // DISPLAY TITLE
  // =====================================================

  const backendName =
    String(
      loan?.loan?.name ??
      loan?.name ??
      ""
    ).trim();

  const displayTitle =
    loanConfig?.title ||
    backendName;

  // =====================================================
  // DISPLAY SUBTITLE
  // =====================================================

  const displaySubtitle =
    loanConfig?.subtitle ||
    "Quick Funds,\nEasy Access";

  // =====================================================
  // DISPLAY IMAGE
  // =====================================================

  const displayImage =
    loanConfig?.image ||
    PersonalLoanImage;

  // =====================================================
  // WORD WRAPPING
  // =====================================================

  const loanNameParts =
    displayTitle.split(/\s+/);

  const firstLine =
    loanNameParts[0] || "";

  const secondLine =
    loanNameParts
      .slice(1)
      .join(" ");

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <TouchableOpacity
    
      activeOpacity={0.9}
      onPress={() =>
        onPress?.(loan)
      }
      style={{
    
        // =================================================
        // CARD
        // =================================================

        flex:
          horizontal
            ? 1
            : null,

        width:
          horizontal
            ? 180
            : "49%",

        minHeight:
          horizontal
            ? null
            : 128,

        backgroundColor:
          theme.colors.white,

        borderRadius:
          24,

        borderWidth:
          1,

        borderColor:
          "#FCEDD6",

        paddingHorizontal:
          16,

        paddingVertical:
          20,

        justifyContent:
          "space-between",

        ...theme.shadows.card,
      
      }}
    >

      {/* =================================================
          TOP
      ================================================= */}

      <View
        style={{
          flexDirection:
            "row",

          justifyContent:
            "space-between",

          alignItems:
            "flex-start",
        }}
      >

        {/* =================================================
            LOAN TITLE
        ================================================= */}

        <View
          style={{
            flex: 1,

            marginRight:
              theme.spacing.sm,

            minWidth: 0,
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              color:
                theme.colors.black,

              // Sora Bold
              fontSize:
                14,

              lineHeight:
                18,

              fontFamily:
                theme.fonts.headingBold,

              // -1%
              letterSpacing:
                -0.14,

              textTransform:
                "capitalize",

              includeFontPadding:
                false,
            }}
          >
            {firstLine}

            {secondLine
              ? "\n"
              : ""}

            {secondLine}
          </Text>
        </View>

        {/* =================================================
            OFFLINE IMAGE
        ================================================= */}

        <Image
          source={
            displayImage
          }
          resizeMode="contain"
          style={{
            width:
              40,

            height:
              40,

            flexShrink:
              0,
          }}
        />
      </View>

      {/* =================================================
          BOTTOM
      ================================================= */}

      <View
        style={{
          flexDirection:
            "row",

          justifyContent:
            "space-between",

          alignItems:
            "flex-end",
        }}
      >

        {/* =================================================
            SUBTITLE
        ================================================= */}

        <View
          style={{
            flex: 1,

            minWidth: 0,
          }}
        >
          <Text
            numberOfLines={2}
            style={{
              color:
                theme.colors.gray500,

              // Manrope SemiBold
              fontSize:
                12,

              lineHeight:
                18,

              fontFamily:
                theme.fonts.semiBold,

              // -1%
              letterSpacing:
                -0.12,

              textTransform:
                "capitalize",

              includeFontPadding:
                false,
            }}
          >
            {displaySubtitle}
          </Text>

          {/* =================================================
              AMOUNT
          ================================================= */}

          {/*
          <Text
            style={{
              color:
                theme.colors.black,

              fontSize:
                theme.typography.b1,

              fontFamily:
                theme.fonts.bold,
            }}
          >
            ₹
            {formatAmount(
              loan?.maxAmount ??
              loan?.loan?.maxAmount
            )}
          </Text>
          */}
        </View>

        {/* =================================================
            ARROW
        ================================================= */}

        <ChevronRight
          size={
            theme.iconSize.md
          }
          color={
            theme.colors.black
          }
        />

      </View>

    </TouchableOpacity>
  );
};

export default memo(
  LoanCard
);