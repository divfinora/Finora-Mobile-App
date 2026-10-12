 
import React from "react";

import {
  View,
  Text,
} from "react-native";

import {
  ContactRound,
  BadgeCheck,
} from "lucide-react-native";

import { theme } from "../../../../theme";

const ContactDetailsCard = () => {
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
              fontFamily: theme.fonts.bold,
            }}
          >
            Contact details
          </Text>

          <Text
            style={{
              fontSize: 12,
              color: "#64748B",
              
              fontFamily: theme.fonts.medium,
            }}
          >
            How we can reach you
          </Text>
        </View>
      </View>

      {/* DIVIDER */}
      <View
        style={{
          height: 1,
          backgroundColor: "#F1F2F4",
          marginBottom: 18,
        }}
      />

      {/* EMAIL ADDRESS */}
      <View>
        <Text
          style={{
            fontSize: 14,
            color: "#64748B",
            fontFamily: theme.fonts.medium,
          }}
        >
          Email Address
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontSize: 16  ,
              color: "#111111",
              fontFamily: theme.fonts.semiBold,
              marginRight: 8,
            }}
          >
            Singh1997singh@gmail.com
          </Text>

          {/* VERIFIED BADGE */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#ECFDF5",
              borderWidth: 1,
              borderColor: "#A7F3D0",
              borderRadius: 20,
              paddingHorizontal: 9,
              paddingVertical: 3,
            }}
          >
            <BadgeCheck
              size={12}
              color="#059669"
              strokeWidth={2}
            />

            <Text
              style={{
                marginLeft: 4,
                fontSize: 11,
                color: "#059669",
                fontFamily: theme.fonts.semiBold,
              }}
            >
              Verified
            </Text>
          </View>
        </View>
      </View>

      {/* PHONE NUMBER */}
      <View
        style={{
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "#64748B",
            fontFamily: theme.fonts.medium,
          }}
        >
          Phone Number
        </Text>

        <Text
          style={{
         
            fontSize: 15,
            color: "#111111",
            fontFamily: theme.fonts.semiBold,
          }}
        >
          +91 9580158156
        </Text>
      </View>
    </View>
  );
};

export default ContactDetailsCard;
 