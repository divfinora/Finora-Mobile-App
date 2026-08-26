import React, {
  memo,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { theme } from "../../../../theme";


const VisitorHomeScreenJobTabs = ({
  activeTab,
  onChange,
}) => {

  return (

    <View
      style={{
        marginHorizontal: 24,
 marginBottom:theme.spacing.xl,

        height: 55,

        borderRadius: 11,

        backgroundColor:
          "#E9EAEC",

        padding: 7,

        flexDirection: "row",
      }}
    >

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          onChange("today")
        }
        style={{
          flex: 1,

          borderRadius: 9,

          alignItems: "center",
          justifyContent: "center",

          backgroundColor:
            activeTab === "today"
              ? "#FFFFFF"
              : "transparent",
        }}
      >

        <Text
          style={{
            fontSize: 16,

            color:
              activeTab === "today"
                ? "#FF641F"
                : "#77777D",

            fontFamily:
              activeTab === "today"
                ? "Inter-Medium"
                : "Inter-Regular",
          }}
        >
          Current Jobs
        </Text>

      </TouchableOpacity>


      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          onChange("upcoming")
        }
        style={{
          flex: 1,

          borderRadius: 9,

          alignItems: "center",
          justifyContent: "center",

          backgroundColor:
            activeTab === "upcoming"
              ? "#FFFFFF"
              : "transparent",
        }}
      >

        <Text
          style={{
            fontSize: 16,

            color:
              activeTab === "upcoming"
                ? "#FF641F"
                : "#77777D",

            fontFamily:
              activeTab === "upcoming"
                ? "Inter-Medium"
                : "Inter-Regular",
          }}
        >
          Upcoming Tasks
        </Text>

      </TouchableOpacity>

    </View>

  );
};

export default memo(
  VisitorHomeScreenJobTabs
);

 