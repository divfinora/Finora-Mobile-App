import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  MapPin,
  ChevronRight,
} from "lucide-react-native";
import { theme } from "../../../../theme";

 

const AddressCard = ({ onPress }) => {

  return (

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: "#F6F6F7",
        borderRadius: 22,
        padding: 18,
        marginBottom: 24,
      }}
    >

      {/* ============================= */}
      {/* HEADER */}
      {/* ============================= */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >

        <MapPin
          size={22}
          color={theme.colors.primary500}
        />

        <Text
          style={{
            flex: 1,
            marginLeft: 10,
            fontSize: 18,
            color: "#404A5A",
            fontFamily: theme.fonts.semiBold,
          }}
        >
          Residential Address
        </Text>

        <ChevronRight
          size={22}
          color="#64748B"
        />

      </View>

      {/* ============================= */}
      {/* ADDRESS */}
      {/* ============================= */}

      <Text
        style={{
          marginTop: 18,
          fontSize: 16,
          color: "#667085",
          lineHeight: 28,
          fontFamily: theme.fonts.regular,
        }}
      >
        1422 North Highland Ave,{"\n"}
        Suite 300, Hollywood, CA 90028
      </Text>

      {/* ============================= */}
      {/* MAP */}
      {/* ============================= */}

      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200",
        }}
        resizeMode="cover"
        style={{
          width: "100%",
          height: 125,
          borderRadius: 14,
          marginTop: 18,
        }}
      />

    </TouchableOpacity>

  );

};

export default AddressCard;