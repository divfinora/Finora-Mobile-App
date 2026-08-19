import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { theme } from "../../../../theme";


const LoanEmptyState = ({
  categoryName,
  onRetry,
}) => {

  return (

    <View
      style={{
        flex: 1,

        alignItems: "center",

        justifyContent: "center",

        paddingHorizontal:
          theme.spacing.xxl,
      }}
    >

      <Text
        style={{
          color:
            theme.colors.navy900,

          fontSize:
            theme.typography.h3,

          fontFamily:
            theme.fonts.headingBold,

          textAlign: "center",
        }}
      >
        No {categoryName} Loans Available
      </Text>


      <Text
        style={{
          marginTop: 8,

          color:
            theme.colors.gray500,

          fontSize:
            theme.typography.b2,

          fontFamily:
            theme.fonts.medium,

          textAlign: "center",
        }}
      >
        There are currently no{" "}
        {categoryName.toLowerCase()}{" "}
        loan products available.
      </Text>


      <TouchableOpacity
        activeOpacity={0.85}

        onPress={onRetry}

        style={{
          marginTop:
            theme.spacing.xl,

          paddingHorizontal:
            theme.spacing.xxl,

          paddingVertical:
            theme.spacing.md,

          borderRadius:
            theme.radius.lg,

          backgroundColor:
            theme.colors.primary500,
        }}
      >

        <Text
          style={{
            color:
              theme.colors.white,

            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.bold,
          }}
        >
          Try Again
        </Text>

      </TouchableOpacity>

    </View>
  );
};


export default LoanEmptyState;