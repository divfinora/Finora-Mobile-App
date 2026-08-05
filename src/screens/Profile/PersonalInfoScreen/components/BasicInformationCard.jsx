import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  User,
  CalendarDays,
  Users,
} from "lucide-react-native";
import { theme } from "../../../../theme";

 

const BasicInformationCard = () => {

  return (

    <View
      style={{
        backgroundColor: "#F6F6F7",
        borderRadius: 22,
        padding: 18,
        marginBottom: 22,
      }}
    >

      {/* ========================== */}
      {/* HEADER */}
      {/* ========================== */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >

        <Text
          style={{
            fontSize: 18,
            color: "#1F2937",
            fontFamily: theme.fonts.semiBold,
          }}
        >
          Basic Information
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: "#FFE3DE",
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 50,
          }}
        >
          <Text
            style={{
              color: theme.colors.primary500,
              fontSize: 13,
              fontFamily: theme.fonts.medium,
            }}
          >
            Update
          </Text>
        </TouchableOpacity>

      </View>

      {/* ========================== */}
      {/* FULL NAME */}
      {/* ========================== */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: "#E8E8E8",
        }}
      >

        <User
          size={20}
          color="#64748B"
        />

        <View
          style={{
            marginLeft: 14,
            flex: 1,
          }}
        >

          <Text
            style={{
              fontSize: 13,
              color: "#94A3B8",
            }}
          >
            Full Name
          </Text>

          <Text
            style={{
              marginTop: 3,
              fontSize: 16,
              color: "#1F2937",
              fontFamily: theme.fonts.medium,
            }}
          >
            Amit Kumar
          </Text>

        </View>

      </View>

      {/* ========================== */}
      {/* DATE OF BIRTH */}
      {/* ========================== */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 14,
          borderBottomWidth: 1,
          borderBottomColor: "#E8E8E8",
        }}
      >

        <CalendarDays
          size={20}
          color="#64748B"
        />

        <View
          style={{
            marginLeft: 14,
            flex: 1,
          }}
        >

          <Text
            style={{
              fontSize: 13,
              color: "#94A3B8",
            }}
          >
            Date of Birth
          </Text>

          <Text
            style={{
              marginTop: 3,
              fontSize: 16,
              color: "#1F2937",
              fontFamily: theme.fonts.medium,
            }}
          >
            28 December 2001
          </Text>

        </View>

      </View>

      {/* ========================== */}
      {/* GENDER */}
      {/* ========================== */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 14,
        }}
      >

        <Users
          size={20}
          color="#64748B"
        />

        <View
          style={{
            marginLeft: 14,
            flex: 1,
          }}
        >

          <Text
            style={{
              fontSize: 13,
              color: "#94A3B8",
            }}
          >
            Gender
          </Text>

          <Text
            style={{
              marginTop: 3,
              fontSize: 16,
              color: "#1F2937",
              fontFamily: theme.fonts.medium,
            }}
          >
            Male
          </Text>

        </View>

      </View>

    </View>

  );

};

export default BasicInformationCard;