import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  RefreshCw,
} from "lucide-react-native";

import { theme } from "../../../../theme";

const VisitorProfileInfoProfileError = ({
  onRetry,
}) => {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 30,
      }}
    >

      <View
        style={{
          width: 70,
          height: 70,
          borderRadius: 35,
          backgroundColor: "#FFF0EB",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <RefreshCw
          size={30}
          color={theme.colors.primary500}
        />

      </View>

      <Text
        style={{
          marginTop: 20,
          fontSize: 20,
          color: "#1F2937",
          fontFamily: theme.fonts.semiBold,
          textAlign: "center",
        }}
      >
        Unable to load profile
      </Text>

      <Text
        style={{
          marginTop: 8,
          fontSize: 14,
          color: "#7A8494",
          fontFamily: theme.fonts.regular,
          textAlign: "center",
          lineHeight: 22,
        }}
      >
        Something went wrong while loading your profile.
        Please try again.
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onRetry}
        style={{
          marginTop: 22,
          paddingHorizontal: 25,
          paddingVertical: 12,
          borderRadius: 25,
          backgroundColor: theme.colors.primary500,
        }}
      >

        <Text
          style={{
            color: "#FFFFFF",
            fontSize: 14,
            fontFamily: theme.fonts.semiBold,
          }}
        >
          Try Again
        </Text>

      </TouchableOpacity>

    </View>
  );

};

export default VisitorProfileInfoProfileError;

 