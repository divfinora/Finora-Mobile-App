import React, {
  memo,
} from "react";

import {
  View,
  Text,
} from "react-native";

import {
  ClipboardList,
} from "lucide-react-native";


const VisitorHomeScreenEmpty = ({
  title = "No jobs found",
  description =
    "There are no jobs available right now.",
}) => {

  return (

    <View
      style={{
        marginHorizontal: 24,

        marginTop: 18,

        paddingVertical: 45,

        paddingHorizontal: 25,

        borderRadius: 16,

        backgroundColor:
          "#FFFFFF",

        alignItems: "center",

        borderWidth: 1,

        borderColor:
          "#EEEEEE",
      }}
    >

      <View
        style={{
          width: 56,
          height: 56,

          borderRadius: 28,

          backgroundColor:
            "#FFF0E9",

          alignItems: "center",
          justifyContent: "center",
        }}
      >

        <ClipboardList
          size={27}
          color="#FF641F"
        />

      </View>


      <Text
        style={{
          marginTop: 16,

          fontSize: 17,

          color: "#202020",

          fontFamily:
            "Inter-SemiBold",
        }}
      >
        {title}
      </Text>


      <Text
        style={{
          marginTop: 7,

          fontSize: 13,

          lineHeight: 19,

          color: "#77777D",

          textAlign: "center",

          fontFamily:
            "Inter-Regular",
        }}
      >
        {description}
      </Text>

    </View>

  );
};

export default memo(
  VisitorHomeScreenEmpty
);

 
 