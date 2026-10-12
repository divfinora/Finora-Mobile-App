
import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  CircleHelp,
  ChevronRight,
} from "lucide-react-native";

import { theme } from "../../../theme";

const HelpAndSupportCard = ({ onPress }) => {
  return (

    <View>
      <Text
        style={{
          marginBottom: 8,
          marginTop: 16,
          fontSize: 14,
          color: "#000000",
          fontFamily: theme.fonts.bold
        }}
      >
        HELP & LEGAL
      </Text>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{


          backgroundColor: "#FFFFFF",
          borderRadius: 18,
          borderWidth: 1,
          borderColor: "#FFD0C2",

          paddingHorizontal: theme.spacing.lg,
          paddingVertical: theme.spacing.lg,

          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* ICON */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: 11,
            backgroundColor: "#F26927",

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircleHelp
            size={22}
            color="#FFFFFF"
            strokeWidth={1.8}
          />
        </View>

        {/* TITLE */}
        <View
          style={{
            flex: 1,
            marginLeft: theme.spacing.lg,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color: "#64748B",
              fontSize: theme.typography.b1,
              fontFamily: theme.fonts.semiBold,
            }}
          >
            Help & support
          </Text>
        </View>

        {/* RIGHT ARROW */}
        <ChevronRight
          size={22}
          color="#607493"
          strokeWidth={2}
        />
      </TouchableOpacity>
    </View>

  );
};

export default HelpAndSupportCard;

