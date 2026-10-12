 
import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  ChevronRight,
} from "lucide-react-native";

import { theme } from "../../../theme";
import CommonSwitch from "../../../components/common/Button/CommonSwitch.jsx";

const SettingItem = ({
  title,
  icon,
  type = "arrow",
  value = false,
  onToggle,
  onPress,
  onButtonPress,
  isLast = false,
  loading = false,
  disabled = false,
}) => {
  const Icon = icon;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={type === "toggle" || disabled}
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.lg,

        position: "relative",
        backgroundColor: "#FFFFFF",
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
        {Icon ? (
          <Icon
            size={22}
            color="#FFFFFF"
            strokeWidth={1.8}
          />
        ) : null}
      </View>

      {/* TITLE */}
      <Text
        numberOfLines={1}
        style={{
          flex: 1,
          marginLeft: theme.spacing.lg,

          color: "#64748B",
          fontSize: theme.typography.b1,
          fontFamily: theme.fonts.bold,
        }}
      >
        {title}
      </Text>

      {/* RIGHT ACTION */}
      {type === "arrow" && (
        <ChevronRight
          size={20}
          color="#607493"
          strokeWidth={2}
        />
      )}

      {type === "toggle" && (
        <CommonSwitch
          value={value}
          loading={loading}
          disabled={disabled}
          onValueChange={onToggle}
        />
      )}

      {type === "button" && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onButtonPress}
          disabled={loading}
          style={{
            backgroundColor: "#FFFFFF",
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            borderRadius: theme.radius.md,
            opacity: loading ? 0.6 : 1,
          }}
        >
          <Text
            style={{
              color: "#F26927",
              fontSize: theme.typography.b3,
              fontFamily: theme.fonts.medium,
            }}
          >
            Change
          </Text>
        </TouchableOpacity>
      )}

      {/* DIVIDER */}
      {!isLast && (
        <View
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,

            borderBottomWidth: 1,
            borderBottomColor: "#E5E7EB",
            borderStyle: "dashed",
          }}
        />
      )}
    </TouchableOpacity>
  );
};

export default SettingItem;
 