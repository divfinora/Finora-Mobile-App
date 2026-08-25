import React, {
  memo,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  MapPin,
  CalendarDays,
  Phone,
  WalletCards,
  ArrowRight,
} from "lucide-react-native";


const VisitorHomeScreenJobCard = ({
  item,
  onPress,
}) => {

  const customer =
    item?.customer || {};

  const product =
    item?.product || {};


  const status =
    item?.verificationStatus ||
    item?.status ||
    "ASSIGNED";


  const statusText =
    status === "IN_PROGRESS"
      ? "IN PROGRESS"
      : status === "SUBMITTED"
        ? "SUBMITTED"
        : status === "PENDING"
          ? "PENDING"
          : "ASSIGNED";


  const statusBackground =
    status === "IN_PROGRESS"
      ? "#AAA000"
      : status === "PENDING"
        ? "#FFD8D8"
        : status === "SUBMITTED"
          ? "#D7F3DF"
          : "#D9E3FF";


  const statusColor =
    status === "IN_PROGRESS"
      ? "#5E5700"
      : status === "PENDING"
        ? "#9D3333"
        : status === "SUBMITTED"
          ? "#16703A"
          : "#1654C7";


  return (

    <View
      style={{
        marginHorizontal: 24,

        marginBottom: 16,

        backgroundColor:
          "#FFFFFF",

        borderRadius: 16,

        padding: 16,

        borderWidth: 1,

        borderColor:
          "#EEEEEE",

        ...{
          shadowColor: "#000000",

          shadowOffset: {
            width: 0,
            height: 2,
          },

          shadowOpacity: 0.05,

          shadowRadius: 5,

          elevation: 2,
        },
      }}
    >

      {/* ==========================================
          CUSTOMER HEADER
      ========================================== */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >

        <View
          style={{
            width: 44,
            height: 44,

            borderRadius: 22,

            backgroundColor:
              "#D8E4FF",

            justifyContent: "center",
            alignItems: "center",
          }}
        >

          <Text
            style={{
              fontSize: 14,

              color: "#1558C4",

              fontFamily:
                "Inter-SemiBold",
            }}
          >
            {customer?.fullName
              ?.split(" ")
              ?.map(
                (word) =>
                  word?.[0]
              )
              ?.join("")
              ?.slice(0, 2)
              ?.toUpperCase() ||
              "CU"}
          </Text>

        </View>


        <View
          style={{
            flex: 1,
            marginLeft: 12,
          }}
        >

          <Text
            numberOfLines={1}
            style={{
              fontSize: 18,

              color: "#202020",

              fontFamily:
                "Inter-Medium",
            }}
          >
            {customer?.fullName ||
              "Customer"}
          </Text>


          <Text
            style={{
              marginTop: 2,

              fontSize: 12,

              color: "#77777D",

              fontFamily:
                "Inter-Regular",
            }}
          >
            ID:{" "}
            {customer?._id ||
              item?.applicationId ||
              item?.loanId ||
              "-"}
          </Text>

        </View>


        {/* STATUS */}

        <View
          style={{
            paddingHorizontal: 12,

            paddingVertical: 6,

            borderRadius: 14,

            backgroundColor:
              statusBackground,
          }}
        >

          <Text
            style={{
              fontSize: 10,

              color:
                statusColor,

              fontFamily:
                "Inter-SemiBold",
            }}
          >
            {statusText}
          </Text>

        </View>

      </View>


      {/* ==========================================
          DETAILS
      ========================================== */}

      <View
        style={{
          marginTop: 17,
        }}
      >

        <View
          style={{
            flexDirection: "row",
            marginBottom: 14,
          }}
        >

          <View
            style={{
              width: "50%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >

            <MapPin
              size={17}
              color="#555A61"
            />

            <Text
              numberOfLines={1}
              style={{
                marginLeft: 8,

                flex: 1,

                fontSize: 13,

                color: "#555A61",

                fontFamily:
                  "Inter-Regular",
              }}
            >
              {item?.location ||
                item?.address ||
                "Location unavailable"}
            </Text>

          </View>


          <View
            style={{
              width: "50%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >

            <WalletCards
              size={17}
              color="#555A61"
            />

            <Text
              numberOfLines={1}
              style={{
                marginLeft: 8,

                flex: 1,

                fontSize: 13,

                color: "#555A61",

                fontFamily:
                  "Inter-Regular",
              }}
            >
              {product?.displayName ||
                "Loan"}
            </Text>

          </View>

        </View>


        <View
          style={{
            flexDirection: "row",
          }}
        >

          <View
            style={{
              width: "50%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >

            <CalendarDays
              size={17}
              color="#555A61"
            />

            <Text
              style={{
                marginLeft: 8,

                fontSize: 13,

                color: "#555A61",

                fontFamily:
                  "Inter-Regular",
              }}
            >
              {item?.date ||
                item?.assignedDate ||
                "Today"}
            </Text>

          </View>


          <View
            style={{
              width: "50%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >

            <Phone
              size={17}
              color="#555A61"
            />

            <Text
              style={{
                marginLeft: 8,

                fontSize: 13,

                color: "#555A61",

                fontFamily:
                  "Inter-Regular",
              }}
            >
              {customer?.mobile ||
                "-"}
            </Text>

          </View>

        </View>

      </View>


      {/* ==========================================
          VIEW MORE
      ========================================== */}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          onPress?.(item)
        }
        style={{
          height: 46,

          marginTop: 18,

          borderRadius: 9,

          borderWidth: 1,

          borderColor:
            "#FFB895",

          alignItems: "center",

          justifyContent: "center",

          flexDirection: "row",
        }}
      >

        <Text
          style={{
            fontSize: 14,

            color: "#FF641F",

            fontFamily:
              "Inter-Medium",
          }}
        >
          View More
        </Text>


        <ArrowRight
          size={18}
          color="#FF641F"
          style={{
            marginLeft: 8,
          }}
        />

      </TouchableOpacity>

    </View>

  );
};

export default memo(
  VisitorHomeScreenJobCard
);

 