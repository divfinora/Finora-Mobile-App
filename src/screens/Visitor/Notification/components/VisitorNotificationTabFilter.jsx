import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import {
  theme,
} from "../../../../theme";


const VisitorNotificationTabFilter = ({
  activeFilter,
  onSelectFilter,
}) => {

  const filters = [
    {
      id: "ALL",
      label: "All",
    },
    {
      id: "ASSIGNMENT",
      label: "Assignment",
    },
    {
      id: "REMINDER",
      label: "Reminder",
    },
  ];


  return (
    <View
      style={{
        backgroundColor:
          theme.colors.white,

        paddingTop:
          theme.spacing.md,

     
      }}
    >

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal:
            theme.spacing.xxl,

          gap:
            theme.spacing.md,
        }}
      >

        {filters.map(
          (filter) => {

            const isActive =
              activeFilter ===
              filter.id;

            return (
              <TouchableOpacity
                key={filter.id}
                activeOpacity={0.8}
                onPress={() =>
                  onSelectFilter(
                    filter.id
                  )
                }
                style={{
                  height: 48,

                  paddingHorizontal:
                    filter.id === "ALL"
                      ? 25
                      : 24,

                  borderRadius:
                    999,

                  backgroundColor:
                    isActive
                      ? theme.colors.primary500
                      : theme.colors.gray200,

                  alignItems:
                    "center",

                  justifyContent:
                    "center",
                }}
              >

                <Text
                  style={{
                    fontSize:
                      theme.typography.b2,

                    lineHeight:
                      20,

                    fontFamily:
                      theme.fonts.regular,

                    color:
                      isActive
                        ? theme.colors.white
                        : theme.colors.gray700,
                  }}
                >
                  {filter.label}
                </Text>

              </TouchableOpacity>
            );
          }
        )}

      </ScrollView>

    </View>
  );
};


export default VisitorNotificationTabFilter;