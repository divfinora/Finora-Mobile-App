import React from "react";
import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Mail, Phone, BadgeCheck } from "lucide-react-native";
import { theme } from "../../../../theme";

const VisitorProfileInfoContactDetailsCard = ({ profile }) => {

   console.log("profile=======", profile);
  const email = profile?.email || "Not available";

  const mobile =
    profile?.mobile ||
    profile?.phone ||
    profile?.phoneNumber ||
    "Not available";

  return (
    <LinearGradient
      colors={[
        "rgba(255, 155, 99, 0.6)",
        "rgba(255, 98, 31, 0.6)",
      ]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={{
        width: "100%",
        height: 195,

        borderRadius: theme.radius.lg,

        borderWidth: theme.borderWidth.thin,
        borderColor: "rgba(255, 255, 255, 0.45)",

        padding: theme.spacing.lg,

        marginBottom: theme.spacing.lg,

        justifyContent: "space-between",
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: theme.radius.sm,

            alignItems: "center",
            justifyContent: "center",

            marginRight: theme.spacing.sm,
          }}
        >
          <Mail
            size={theme.iconSize.sm}
            color={theme.colors.primary900}
            strokeWidth={2}
          />
        </View>

        <Text
          style={{
            fontSize: theme.typography.h4,
            lineHeight: theme.lineHeight.h4,
            color: theme.colors.gray900,
            fontFamily: theme.fonts.semiBold,
          }}
        >
          Contact Details
        </Text>
      </View>

      {/* Email */}
      <View>
        <Text
          style={{
            fontSize: theme.typography.b3,
            lineHeight: theme.lineHeight.b3,
            color: theme.colors.gray900,
            fontFamily: theme.fonts.medium,

            marginBottom: theme.spacing.xs,
          }}
        >
          EMAIL ADDRESS
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              flex: 1,

              fontSize: theme.typography.b1,
              lineHeight: theme.lineHeight.b1,

              color: theme.colors.gray900,
              fontFamily: theme.fonts.medium,
            }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {email}
          </Text>

          {email !== "Not available" && (
            <BadgeCheck
              size={theme.iconSize.sm}
              color={theme.colors.gray900}
              strokeWidth={2.5}
              style={{
                marginLeft: theme.spacing.sm,
              }}
            />
          )}
        </View>
      </View>

      {/* Phone */}
      <View>
        <Text
          style={{
            fontSize: theme.typography.b3,
            lineHeight: theme.lineHeight.b3,
            color: theme.colors.gray900,
            fontFamily: theme.fonts.medium,

            marginBottom: theme.spacing.xs,
          }}
        >
          PHONE NUMBER
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Phone
            size={theme.iconSize.xs}
            color={theme.colors.gray900}
            strokeWidth={2}
            style={{
              marginRight: theme.spacing.xs,
            }}
          />

          <Text
            style={{
              fontSize: theme.typography.b1,
              lineHeight: theme.lineHeight.b1,

              color: theme.colors.gray900,
              fontFamily: theme.fonts.medium,
            }}
          >
            {mobile}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default VisitorProfileInfoContactDetailsCard;