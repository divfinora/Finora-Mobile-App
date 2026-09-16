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


const LoanCard = ({
  loan,
  onPress,
  horizontal = false,
}) => {

  // ==========================================
  // FORMAT AMOUNT
  // ==========================================

  const formatAmount = (value) => {

    if (!value) {
      return "0";
    }

    if (value >= 10000000) {
      return `${(value / 10000000).toFixed(0)}Cr`;
    }

    if (value >= 100000) {
      return `${(value / 100000).toFixed(0)}L`;
    }

    if (value >= 1000) {
      return `${(value / 1000).toFixed(0)}K`;
    }

    return value;
  };


  // ==========================================
  // LOAN COUNT
  // ==========================================

  const loanCount =
    loan?.loanCount ??
    loan?.types?.reduce(
      (total, type) =>
        total + (type?.loanCount || 0),
      0
    ) ??
    0;


  // ==========================================
  // LOAN NAME
  // WORD BASED WRAPPING
  // ==========================================

  const loanName =
    String(`${loan?.name} ` || "").trim();

  const loanNameParts =
    loanName.split(/\s+/);

  const firstLine =
    loanNameParts[0] || "";

  const secondLine =
    loanNameParts
      .slice(1)
      .join(" ");


  return (

    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => onPress?.(loan)}

      style={{
        flex: horizontal ? 1 : null,

        width: horizontal ? 180 : "48%",
   


     minHeight: horizontal?null: 138 ,
        backgroundColor:
          theme.colors.white,

        borderRadius: 24,

        borderWidth: 1,

        borderColor:
          "#FCEDD6",
        paddingHorizontal: 16,
        paddingVertical: 20,

        // padding:
        //   theme.spacing.lg,

        justifyContent:
          "space-between",

        ...theme.shadows.card,
      }}
    >

      {/* ======================================
          TOP
      ====================================== */}

      <View
        style={{
          flexDirection: "row",

          justifyContent:
            "space-between",

          alignItems:
            "flex-start",

        }}
      >

        {/* ====================================
            LOAN NAME
        ==================================== */}

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

              fontSize: 17,

              lineHeight: 22,

              fontFamily:
                theme.fonts.headingBold,

              letterSpacing: -0.2,

              textTransform:
                "capitalize",
            }}
          >

            {firstLine}

            {secondLine ? "\n" : ""}

            {secondLine}

          </Text>


          {/* ==================================
              LOAN COUNT
          ================================== */}

          {/* <View
            style={{
              alignSelf:
                "flex-start",

              marginTop: 6,

              paddingHorizontal: 8,

              paddingVertical: 3,

              borderRadius: 10,

              backgroundColor:
                "#FFF4E5",
            }}
          >

            <Text
              style={{
                color:
                  theme.colors.primary500,

                fontSize: 10,

                fontFamily:
                  theme.fonts.bold,
              }}
            >
              {loanCount}{" "}
              {loanCount === 1
                ? "Loan"
                : "Loans"}
            </Text>

          </View> */}

        </View>


        {/* ====================================
            ICON
        ==================================== */}

        <Image
          source={{
            uri:
              "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",
          }}

          resizeMode="contain"

          style={{
            width: 32,

            height: 32,

            flexShrink: 0,
          }}
        />

      </View>


      {/* ======================================
          BOTTOM
      ====================================== */}

      <View
        style={{
          flexDirection: "row",

          justifyContent:
            "space-between",

          alignItems:
            "flex-end",


        }}
      >

        {/* ====================================
            AMOUNT
        ==================================== */}

        <View
          style={{
            flex: 1,

            marginTop: 8
          }}
        >

          <Text
            style={{
              color:
                theme.colors.gray500,

              fontSize: 14,

              lineHeight: 21,

              fontFamily:
                theme.fonts.regular,

              textTransform:
                "capitalize",
            }}
          >
            Get Up To
          </Text>


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

        </View>


        {/* ====================================
            ARROW
        ==================================== */}

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


export default memo(LoanCard);