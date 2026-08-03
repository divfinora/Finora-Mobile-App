import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { ArrowLeft } from "lucide-react-native";

import { theme } from "../../../theme";

const BackButton = ({
  onPress,

  showBack = true,

  title,

  subtitle,

  rightComponent,

  containerStyle,

  titleStyle,

  subtitleStyle,
}) => {

  return (

    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",

          paddingTop: theme.spacing.md,
          paddingBottom: theme.spacing.md,
        },
        containerStyle,
      ]}
    >

      {/* Left */}

      <View
        style={{
          width: 42,
          alignItems: "flex-start",
        }}
      >
        {showBack && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPress}
            style={{
              width: 42,
              height: 42,
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <ArrowLeft
              size={24}
              strokeWidth={2.2}
              color={theme.colors.black}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Center */}

      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        {!!title && (
          <Text
            style={[
              {
                color: theme.colors.black,
                fontSize: theme.typography.b1,
                lineHeight: theme.lineHeight.h3,
                fontFamily: theme.fonts.headingBold,
              },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        )}

        {!!subtitle && (
          <Text
            style={[
              {
                marginTop: 2,
                color: theme.colors.textSecondary,
                fontSize: theme.typography.b3,
                lineHeight: theme.lineHeight.b3,
                fontFamily: theme.fonts.regular,
              },
              subtitleStyle,
            ]}
          >
            {subtitle}
          </Text>
        )}
      </View>

      {/* Right */}

      <View
        style={{
          width: 42,
          alignItems: "flex-end",
        }}
      >
        {rightComponent}
      </View>

    </View>

  );

};

export default BackButton;