 
import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  MapPin,
  House,
  PencilLine,
} from "lucide-react-native";

import { theme } from "../../../../theme";

const AddressCard = ({
  address = "Pyramid Urban Homes - Phase 1,\nSec - 70 A, Gurgaon, 122011",
  onPress,
  onEdit,
}) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#FFD0BE",
        padding: 16,
      }}
    >
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* LOCATION ICON */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            backgroundColor: "#FFF5EC",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MapPin
            size={22}
            color="#FF6338"
            strokeWidth={1.8}
          />
        </View>

        {/* TITLE */}
        <View
          style={{
            flex: 1,
            marginLeft: 12,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              lineHeight: 21,
              color: "#172033",
              fontFamily: theme.fonts.semiBold,
            }}
          >
            Current Address
          </Text>

          <Text
            style={{
              
              fontSize: 12,
              lineHeight: 16,
              color: "#98A2B3",
              fontFamily: theme.fonts.medium,
            }}
          >
            Your current address
          </Text>
        </View>

        {/* EDIT BUTTON */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onEdit || onPress}
          style={{
            minWidth: 84,
            height: 34,
            paddingHorizontal: 12,

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",

            borderRadius: 9,
            borderWidth: 1,
            borderColor: "#FFBF91",
            backgroundColor: "#FFFFFF",
          }}
        >
          <PencilLine
            size={15}
            color="#FF6338"
            strokeWidth={1.8}
          />

          <Text
            style={{
              marginLeft: 6,
              fontSize: 12,
              color: "#FF6338",
              fontFamily: theme.fonts.medium,
            }}
          >
            Edit
          </Text>
        </TouchableOpacity>
      </View>

      {/* DIVIDER */}
      <View
        style={{
          height: 1,
          backgroundColor: "#F0F0F0",
          marginTop: 16,
          marginBottom: 16,
        }}
      />

      {/* ADDRESS DETAILS */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{
          flexDirection: "row",
          alignItems: "center",
          minHeight: 54,
        }}
      >
        {/* HOME ICON */}
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 9,
            backgroundColor: "#F6F7F8",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <House
            size={18}
            color="#526174"
            strokeWidth={1.8}
          />
        </View>

        {/* ADDRESS TEXT */}
        <Text
          style={{
            flex: 1,
            marginLeft: 12,

            fontSize: 14,
            lineHeight: 20,
            color: "#607493",
            fontFamily: theme.fonts.medium,
          }}
        >
          {address}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddressCard;
 