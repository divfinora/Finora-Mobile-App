import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  Camera,
} from "lucide-react-native";
import { theme } from "../../../../theme";
 

 

const ProfileImageCard = () => {

  return (

    <View
      style={{
        alignItems: "center",
        marginBottom: 30,
      }}
    >

      {/* ============================= */}
      {/* PROFILE IMAGE */}
      {/* ============================= */}

      <View
        style={{
          position: "relative",
        }}
      >

        <Image
          source={{
            uri: "https://i.pravatar.cc/300",
          }}
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            borderWidth: 4,
            borderColor: theme.colors.primary500,
          }}
        />

        {/* ============================= */}
        {/* CAMERA BUTTON */}
        {/* ============================= */}

        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            position: "absolute",
            right: 0,
            bottom: 2,

            width: 38,
            height: 38,
            borderRadius: 19,

            backgroundColor: theme.colors.primary500,

            justifyContent: "center",
            alignItems: "center",

            borderWidth: 3,
            borderColor: "#FFFFFF",
          }}
        >

          <Camera
            size={18}
            color="#FFFFFF"
          />

        </TouchableOpacity>

      </View>

      {/* ============================= */}
      {/* NAME */}
      {/* ============================= */}

      <Text
        style={{
          marginTop: 18,
          fontSize: 22,
          color: "#1F2937",
          fontFamily: theme.fonts.bold,
        }}
      >
        Amit Kumar
      </Text>

      {/* ============================= */}
      {/* USER ID */}
      {/* ============================= */}

      <Text
        style={{
          marginTop: 4,
          fontSize: 14,
          color: "#8B95A7",
          fontFamily: theme.fonts.regular,
        }}
      >
        Citizen ID : GP-8829-X01
      </Text>

    </View>

  );

};

export default ProfileImageCard;