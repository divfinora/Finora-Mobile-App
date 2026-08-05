import React, { memo } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import { Bell } from "lucide-react-native";
import { theme } from "../../../theme";

 

const HeaderCard = ({
  userName = "Parth Sarthi Singh",
  profileImage = "https://api.dicebear.com/9.x/adventurer/png?seed=Parth",
  onNotificationPress = () => {},
}) => {

  return (

    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",

        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.xxl,
      }}
    >

      {/* Left */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
        }}
      >

        <Image
          source={{
            uri: profileImage,
          }}
          style={{
            width: theme.avatar.lg,
            height: theme.avatar.lg,
            borderRadius: theme.avatar.lg / 2,

            backgroundColor: theme.colors.primary100,
          }}
        />

        <View
          style={{
            marginLeft: theme.spacing.md,
            flex: 1,
          }}
        >

          <Text
            style={{
              color: theme.colors.textLight,

              fontSize: theme.typography.b2,

              lineHeight: theme.lineHeight.b1,

              fontFamily: theme.fonts.regular,
            }}
          >
            Welcome back
          </Text>

          <Text
            numberOfLines={1}
            style={{
              marginTop: 2,

              color: theme.colors.text,

              fontSize: theme.typography.b1,

              lineHeight: theme.lineHeight.b1,

              fontFamily: theme.fonts.headingBold,
            }}
          >
            {userName}
          </Text>

        </View>

      </View>

      {/* Notification */}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onNotificationPress}
        style={{
          width: 42,
          height: 42,

          borderRadius: theme.radius.md,

          backgroundColor: theme.colors.primary100,

          justifyContent: "center",
          alignItems: "center",

          ...theme.shadows.card,
        }}
      >

        <Bell
          size={theme.iconSize.sm}
          color={theme.colors.primary500}
          fill={theme.colors.primary500}
        />

      </TouchableOpacity>

    </View>

  );

};

export default memo(HeaderCard);