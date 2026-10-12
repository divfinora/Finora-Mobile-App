
import React from "react";

import {
  View,
  Text,
} from "react-native";

import {
  ContactRound,
  CalendarDays,
  VenusAndMars,
} from "lucide-react-native";

import { theme } from "../../../../theme";

const BasicInformationCard = () => {
  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderWidth: 1,
        borderColor: "#FFD0BE",
        marginBottom: 0,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        {/* HEADER ICON */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 13,
            backgroundColor: "#FFF5EB",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 13,
          }}
        >
          <ContactRound
            size={22}
            color="#FF5722"
            strokeWidth={1.8}
          />
        </View>

        {/* HEADER TEXT */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              color: "#111827",
              fontFamily: theme.fonts.semiBold,
            }}
          >
            Basic Information
          </Text>

          <Text
            style={{
              fontSize: 12,
              color: "#64748B",
              marginTop: 3,
              fontFamily: theme.fonts.medium,
            }}
          >
            Your personal details
          </Text>
        </View>
      </View>

      {/* DIVIDER */}
      <View
        style={{
          height: 1,
          backgroundColor: "#F1F2F4",
          marginBottom: 16,
        }}
      />

      {/* FULL NAME */}
      <View
        style={{
          paddingBottom: 16,
          borderBottomWidth: 1,
          borderBottomColor: "#F1F2F4",
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#64748B",
            fontFamily: theme.fonts.medium,
          }}
        >
          Full Name
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "#111111",
            
            fontFamily: theme.fonts.medium,
          }}
        >
          Parth Sarthi Singh
        </Text>
      </View>

      {/* DOB AND GENDER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 16,
        }}
      >
        {/* DATE OF BIRTH */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              backgroundColor: "#F8F9FA",
              borderWidth: 1,
              borderColor: "#F0F1F3",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 11,
            }}
          >
            <CalendarDays
              size={19}
              color="#64748B"
              strokeWidth={1.6}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 12,
                color: "#64748B",
                fontFamily: theme.fonts.medium,
              }}
            >
              Date of Birth
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "#111111",
              
                fontFamily: theme.fonts.medium,
              }}
            >
              May 14, 1992
            </Text>
          </View>
        </View>

        {/* VERTICAL DIVIDER */}
        <View
          style={{
            width: 1,
            height: 40,
            backgroundColor: "#E5E7EB",
            marginHorizontal: 12,
          }}
        />

        {/* GENDER */}
        <View
          style={{
            flex: 0.85,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              backgroundColor: "#F8F9FA",
              borderWidth: 1,
              borderColor: "#F0F1F3",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 11,
            }}
          >
            <VenusAndMars
              size={19}
              color="#64748B"
              strokeWidth={1.6}
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 12,
                color: "#64748B",
                fontFamily: theme.fonts.medium,
              }}
            >
              Gender
            </Text>

            <Text
              style={{
                fontSize: 16,
                color: "#111111",
                fontFamily: theme.fonts.medium,
              }}
            >
              Male
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BasicInformationCard;
 