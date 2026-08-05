import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  FileText,
  Bell,
  CircleHelp,
} from "lucide-react-native";

import { theme } from "../../../theme";

const QuickActions = () => {

  const DATA = [
    {
      id: 1,
      title: "Documents",
      subtitle: "Review",
      icon: FileText,
      onPress: () => {
        console.log("Documents");
      },
    },
    {
      id: 2,
      title: "Alerts",
      subtitle: "Notification",
      icon: Bell,
      onPress: () => {
        console.log("Alerts");
      },
    },
    {
      id: 3,
      title: "Help",
      subtitle: "Support",
      icon: CircleHelp,
      onPress: () => {
        console.log("Help");
      },
    },
  ];

  return (

    <View
      style={{
        // borderWidth: 1,
        flexDirection: "row",
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xxxl,
        marginHorizontal: -theme.spacing.sm / 2,
      }}
    >

      {DATA.map((item) => {

        const Icon = item.icon;

        return (

          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            onPress={item.onPress}
            style={{

              flex: 1,

             

              marginHorizontal: theme.spacing.sm / 2,

              backgroundColor: theme.colors.gray100,

              borderRadius: theme.radius.lg,

              padding: theme.spacing.md,

              justifyContent: "space-between",

            }}
          >

            {/* ========================== */}
            {/* ICON */}
            {/* ========================== */}

            <View
              style={{

                width: 40,

                height: 40,

                borderRadius: theme.radius.md,

                backgroundColor: theme.colors.black,

                justifyContent: "center",

                alignItems: "center",

              }}
            >

              <Icon
                size={theme.iconSize.sm}
                color={theme.colors.white}
              />

            </View>

            {/* ========================== */}
            {/* TEXT */}
            {/* ========================== */}

            <View>

              <Text
                numberOfLines={1}
                style={{
                     marginTop: theme.spacing.md,

                 color: theme.colors.gray700,

                  fontSize: theme.typography.b2,

                  fontFamily: theme.fonts.medium,

                }}
              >
                {item.title}
              </Text>

              <Text
                numberOfLines={2}
                style={{

                  marginTop: 2,

                  color: theme.colors.navy300,

                  fontSize: theme.typography.b3,

                  lineHeight: theme.lineHeight.b3,

                  fontFamily: theme.fonts.regular,

                }}
              >
                {item.subtitle}
              </Text>

            </View>

          </TouchableOpacity>

        );

      })}

    </View>

  );

};

export default QuickActions;