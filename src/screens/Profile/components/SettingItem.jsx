import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Switch,
} from "react-native";

import { ChevronRight } from "lucide-react-native";

import { theme } from "../../../theme";

const SettingItem = ({
  title,
  icon,
  type = "arrow",
  value = false,
  onToggle,
  onPress,
  onButtonPress,
  isLast = false,
}) => {

  const Icon = icon;

  return (

    <TouchableOpacity
      activeOpacity={0.8}
      disabled={type === "toggle"}
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.lg,

        position: "relative",
      }}
    >

      {/* ICON */}

      <View
        style={{
          width: 40,
          height: 40,

          borderRadius: theme.radius.md,

          backgroundColor: theme.colors.navy900,

          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon
          size={theme.iconSize.md}
          color={theme.colors.white}
        />
      </View>

      {/* TITLE */}

      <Text
        numberOfLines={1}
        style={{
          flex: 1,

          marginLeft: theme.spacing.lg,

          color: theme.colors.gray700,

          fontSize: theme.typography.b1,

          fontFamily: theme.fonts.regular,
        }}
      >
        {title}
      </Text>

      {/* RIGHT ACTION */}

      {type === "arrow" && (

        <ChevronRight
          size={theme.iconSize.md}
          color={theme.colors.textLight}
        />

      )}

      {type === "toggle" && (

        <Switch
          value={value}
          onValueChange={onToggle}
          trackColor={{
            false: theme.colors.gray300,
            true: theme.colors.success,
          }}
          thumbColor={theme.colors.white}
        />

      )}

      {type === "button" && (

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onButtonPress}
          style={{
            backgroundColor: theme.colors.white,

            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,

            borderRadius: theme.radius.md,
          }}
        >

          <Text
            style={{
              color: theme.colors.gray900,

              fontSize: theme.typography.b3,

              fontFamily: theme.fonts.medium,
            }}
          >
            Change
          </Text>

        </TouchableOpacity>

      )}

      {/* Divider */}

      {!isLast && (

        <View
          style={{
            position: "absolute",

            left: 0,
            right: 0,
            bottom: 0,

            borderBottomWidth: 1,
            borderBottomColor: theme.colors.border,
            borderStyle: "dashed",
          }}
        />

      )}

    </TouchableOpacity>

  );

};

export default SettingItem;