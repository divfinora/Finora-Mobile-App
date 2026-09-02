import React, {
  memo,
} from "react";

import {
  View,
  Text,
} from "react-native";

import {
  SearchX,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";


// =====================================================
// NOT FOUND
// =====================================================

const LoanNotFound = ({
  searchQuery = "",
  filter = "ALL",
}) => {

  const hasSearch =
    !!searchQuery?.trim();


  return (
    <View
      style={{
        alignItems: "center",

        justifyContent: "center",

        paddingVertical: 70,

        paddingHorizontal: 30,
      }}
    >

      <View
        style={{
          width: 68,

          height: 68,

          borderRadius: 34,

          backgroundColor:
            theme.colors.primary100,

          alignItems: "center",

          justifyContent: "center",

          marginBottom: 16,
        }}
      >

        <SearchX
          size={30}
          color={
            theme.colors.primary500
          }
          strokeWidth={2}
        />

      </View>


      <Text
        style={{
          fontSize: 18,

          color:
            theme.colors.black,

          fontFamily:
            theme.fonts.headingSemiBold,

          textAlign: "center",
        }}
      >
        No loans found
      </Text>


      <Text
        style={{
          marginTop: 7,

          fontSize: 13,

          lineHeight: 19,

          color:
            theme.colors.gray500,

          fontFamily:
            theme.fonts.regular,

          textAlign: "center",
        }}
      >
        {hasSearch
          ? `No loan matches "${searchQuery}".`
          : filter !== "ALL"
            ? "No loans are available in this status."
            : "There are no verification applications available right now."
        }
      </Text>

    </View>
  );
};


export default memo(
  LoanNotFound
);