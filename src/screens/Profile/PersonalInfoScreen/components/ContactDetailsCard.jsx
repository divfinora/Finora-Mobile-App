import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  BadgeCheck,
  ContactRound,
} from "lucide-react-native";
import { theme } from "../../../../theme";

 

const ContactDetailsCard = () => {

  return (

    <View
      style={{
        backgroundColor: "#FFB38E",
        borderRadius: 22,
        padding: 18,
        marginBottom: 22,
      }}
    >

      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 24,
        }}
      >

        <ContactRound
          size={24}
          color="#FF5A1F"
        />

        <Text
          style={{
            marginLeft: 12,
            flex: 1,
            fontSize: 18,
            color: "#FFFFFF",
            fontFamily: theme.fonts.semiBold,
          }}
        >
          Contact Details
        </Text>

      </View>

      {/* ================================= */}
      {/* EMAIL */}
      {/* ================================= */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >

        <View
          style={{
            flex: 1,
            paddingRight: 12,
          }}
        >

          <Text
            style={{
              fontSize: 12,
              color: "#1E1E1E",
              letterSpacing: 0.5,
              fontFamily: theme.fonts.bold,
            }}
          >
            EMAIL ADDRESS
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 6,
            }}
          >

            <Text
              numberOfLines={1}
              style={{
                fontSize: 16,
                color: "#3F4654",
                fontFamily: theme.fonts.medium,
              }}
            >
              alex.morgan@example.com
            </Text>

            <BadgeCheck
              size={18}
              color="#1E1E1E"
              style={{
                marginLeft: 8,
              }}
            />

          </View>

        </View>

        <TouchableOpacity activeOpacity={0.8}>

          <Text
            style={{
              fontSize: 15,
              color: "#000",
              fontFamily: theme.fonts.medium,
            }}
          >
            Update
          </Text>

        </TouchableOpacity>

      </View>

      {/* ================================= */}
      {/* PHONE */}
      {/* ================================= */}

      <View
        style={{
          marginTop: 24,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >

        <View
          style={{
            flex: 1,
          }}
        >

          <Text
            style={{
              fontSize: 12,
              color: "#1E1E1E",
              letterSpacing: 0.5,
              fontFamily: theme.fonts.bold,
            }}
          >
            PHONE NUMBER
          </Text>

          <Text
            style={{
              marginTop: 6,
              fontSize: 16,
              color: "#3F4654",
              fontFamily: theme.fonts.medium,
            }}
          >
            +1 (555) 902-4421
          </Text>

        </View>

        <TouchableOpacity activeOpacity={0.8}>

          <Text
            style={{
              fontSize: 15,
              color: "#000",
              fontFamily: theme.fonts.medium,
            }}
          >
            Change
          </Text>

        </TouchableOpacity>

      </View>

    </View>

  );

};

export default ContactDetailsCard;