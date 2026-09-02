import React, {
  memo,
} from "react";

import {
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import {
  Search,
  X,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";


// =====================================================
// LOAN SEARCH BAR
// =====================================================

const LoanSearchBar = ({
  value = "",
  onChangeText,
  onClear,

  placeholder =
    "Search by Loan ID, Name, or Mobile",
}) => {

  const hasValue =
    value?.length > 0;


  return (
    <View
      style={{
        height: 44,

        width: "100%",

        backgroundColor:
          theme.colors.white,

        borderRadius: 10,

        borderWidth: 1,

        borderColor:
          theme.colors.gray300,

        flexDirection: "row",

        alignItems: "center",

        paddingHorizontal: 14,
      }}
    >

      {/* =================================================
          SEARCH ICON
      ================================================= */}

      <Search
        size={19}
        color={
          theme.colors.gray500
        }
        strokeWidth={2}
      />


      {/* =================================================
          INPUT
      ================================================= */}

      <TextInput
        value={value}

        onChangeText={
          onChangeText
        }

        placeholder={
          placeholder
        }

        placeholderTextColor={
          theme.colors.gray500
        }

        autoCapitalize="none"

        autoCorrect={false}

        returnKeyType="search"

        style={{
          flex: 1,

          marginLeft: 9,

          marginRight:
            hasValue ? 6 : 0,

          color:
            theme.colors.black,

          fontSize: 13,

          fontFamily:
            theme.fonts.regular,

          paddingVertical: 0,

          includeFontPadding: false,
        }}
      />


      {/* =================================================
          CLEAR BUTTON
          SHOW ONLY WHEN USER TYPES
      ================================================= */}

      {hasValue && (

        <TouchableOpacity
          activeOpacity={0.7}

          onPress={
            onClear
          }

          hitSlop={{
            top: 8,
            bottom: 8,
            left: 8,
            right: 8,
          }}

          style={{
            width: 22,

            height: 22,

            alignItems:
              "center",

            justifyContent:
              "center",
          }}
        >

          <View
            style={{
              width: 18,

              height: 18,

              borderRadius: 9,

              backgroundColor:
                "#E5E5EA",

              alignItems:
                "center",

              justifyContent:
                "center",
            }}
          >

            <X
              size={11}

              color={
                theme.colors.gray700
              }

              strokeWidth={2.4}
            />

          </View>

        </TouchableOpacity>

      )}

    </View>
  );
};


export default memo(
  LoanSearchBar
);