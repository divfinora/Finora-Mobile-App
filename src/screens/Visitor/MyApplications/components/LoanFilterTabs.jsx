import React, {
  memo,
} from "react";

import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

import {
  theme,
} from "../../../../theme";


// =====================================================
// FILTERS
// =====================================================

export const LOAN_FILTERS = [
  {
    key: "ALL",
    label: "All",
  },

  {
    key: "ASSIGNED",
    label: "Assigned",
  },

  {
    key: "IN_PROGRESS",
    label: "In Progress",
  },

  {
    key: "COMPLETED",
    label: "Completed",
  },

  {
    key: "REJECTED",
    label: "Rejected",
  },
];


// =====================================================
// FILTER TABS
// =====================================================

const LoanFilterTabs = ({
  activeFilter = "ALL",
  onChange,
}) => {

  return (
    <ScrollView
      horizontal

      showsHorizontalScrollIndicator={false}

      contentContainerStyle={{
        paddingRight:
          theme.spacing.md,
      }}

      style={{
        width: "100%",
      }}
    >

      <View
        style={{
          flexDirection: "row",

          alignItems: "center",

          gap: 8,
        }}
      >

        {LOAN_FILTERS.map(
          (filter) => {

            const active =
              activeFilter ===
              filter.key;

            return (
              <TouchableOpacity
                key={
                  filter.key
                }

                activeOpacity={0.8}

                onPress={() =>
                  onChange?.(
                    filter.key
                  )
                }

                style={{
                  height: 40,

                  paddingHorizontal:
                    19,

                borderRadius: 20,

                  backgroundColor:
                    active
                      ? theme.colors.primary500
                      : "#E9EAEC",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",
                }}
              >

                <Text
                  style={{
                    fontSize: 14,

                    lineHeight: 24,

                    color:
                      active
                        ? theme.colors.white
                        : "#45464D",

                    fontFamily:
                      theme.fonts.regular,

                    fontWeight:
                      "400",

                    textAlign:
                      "center",

                    includeFontPadding:
                      false,
                  }}
                >
                  {filter.label}
                </Text>

              </TouchableOpacity>
            );

          }
        )}

      </View>

    </ScrollView>
  );
};


export default memo(
  LoanFilterTabs
);