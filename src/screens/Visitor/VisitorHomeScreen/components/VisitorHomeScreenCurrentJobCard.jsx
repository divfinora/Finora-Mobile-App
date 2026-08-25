import React, {
  memo,
} from "react";

import {
  View,
  Text,
} from "react-native";

import {
  BriefcaseBusiness,
} from "lucide-react-native";


const VisitorHomeScreenCurrentJobCard = ({
  job,
}) => {

  if (!job) {
    return null;
  }


  const customer =
    job?.customer || {};


  return (

    <View
      style={{
        marginHorizontal: 24,

        marginBottom: 16,

        padding: 16,

        borderRadius: 16,

        backgroundColor:
          "#FFF5EF",

        borderWidth: 1,

        borderColor:
          "#FFD3BD",
      }}
    >

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >

        <View
          style={{
            width: 38,
            height: 38,

            borderRadius: 19,

            backgroundColor:
              "#FF6A2A",

            alignItems: "center",
            justifyContent: "center",
          }}
        >

          <BriefcaseBusiness
            size={19}
            color="#FFFFFF"
          />

        </View>


        <View
          style={{
            flex: 1,
            marginLeft: 11,
          }}
        >

          <Text
            style={{
              fontSize: 12,

              color: "#FF641F",

              fontFamily:
                "Inter-SemiBold",
            }}
          >
            CURRENT JOB
          </Text>


          <Text
            numberOfLines={1}
            style={{
              marginTop: 3,

              fontSize: 17,

              color: "#202020",

              fontFamily:
                "Inter-SemiBold",
            }}
          >
            {customer?.fullName ||
              "Current Verification"}
          </Text>

        </View>

      </View>


      <Text
        style={{
          marginTop: 12,

          fontSize: 13,

          color: "#666666",

          fontFamily:
            "Inter-Regular",
        }}
      >
        {job?.product?.displayName ||
          "Loan Verification"}
      </Text>

    </View>

  );
};

export default memo(
  VisitorHomeScreenCurrentJobCard
);


 
 