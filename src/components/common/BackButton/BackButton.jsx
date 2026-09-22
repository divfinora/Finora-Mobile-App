import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  useNavigation,
} from "@react-navigation/native";

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

  const navigation = useNavigation();

  const handleBack = () => {
    if (onPress) {
      onPress();
      return;
    }

    navigation.goBack();
  };

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",

          paddingTop: theme.spacing.md,
          paddingBottom: theme.spacing.sm,
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
            onPress={handleBack}
            style={{
              width: 42,
              height: 42,
              justifyContent: "center",
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
          minWidth: 0,
          alignItems: "center",
        }}
      >
        {!!title && (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              {
                paddingBottom: 10,

                color: theme.colors.black,

                fontFamily: theme.fonts.semiBold,
                fontSize: theme.typography.h3,
                lineHeight: theme.typography.h3,
                letterSpacing: theme.letterSpacing.none,

                textAlign: "center",
                flexShrink: 1,
              },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        )}

        {!!subtitle && (
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[
              {
              

                color: theme.colors.textSecondary,

                fontSize: theme.typography.b3,
                lineHeight: theme.lineHeight.b3,
                fontFamily: theme.fonts.regular,

                flexShrink: 1,
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