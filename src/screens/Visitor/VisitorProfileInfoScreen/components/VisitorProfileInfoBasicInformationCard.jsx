import React from "react";

import {
  View,
  Text,
} from "react-native";

import {
  User,
  CalendarDays,
  Users,
} from "lucide-react-native";

import { theme } from "../../../../theme";

const formatDate = (value) => {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const VisitorProfileInfoBasicInformationCard = ({
  profile,
}) => {

  // =====================================================
  // PROFILE DATA
  // =====================================================

  const fullName =
    profile?.fullName ||
    profile?.name ||
    "Not available";

  const dateOfBirth =
    profile?.dateOfBirth ||
    profile?.dob ||
    null;

  const gender =
    profile?.gender ||
    "Not available";

  return (
    <View
      style={{
        backgroundColor:
          theme.colors.gray100,

        borderRadius:
          theme.radius.xl,

        padding:
          theme.spacing.lg,

        marginBottom:
          theme.spacing.lg,
      }}
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <View
        style={{
          flexDirection: "row",

          alignItems: "center",

          marginBottom:
            theme.spacing.sm,
        }}
      >

        {/* Icon */}

        <View
          style={{
            width: 30,

            height: 30,

            borderRadius:
              theme.radius.sm,

            alignItems: "center",

            justifyContent: "center",

            marginRight:
              theme.spacing.sm,
          }}
        >
          <User
            size={
              theme.iconSize.sm
            }

            color={
              theme.colors.primary500
            }

            strokeWidth={2}
          />
        </View>

        <Text
          style={{
            fontSize:
              theme.typography.h4,

            lineHeight:
              theme.lineHeight.h4,

            color:
              theme.colors.gray900,

            fontFamily:
              theme.fonts.semiBold,
          }}
        >
          Basic Information
        </Text>

      </View>

      {/* ================================================= */}
      {/* FULL NAME */}
      {/* ================================================= */}

      <View
        style={{
          paddingVertical:
            theme.spacing.md,

          borderBottomWidth:
            theme.borderWidth.hairline,

          borderBottomColor:
            theme.colors.divider,
        }}
      >

        <Text
          style={{
            fontSize:
              theme.typography.b3,

            lineHeight:
              theme.lineHeight.b3,

            color:
              theme.colors.textSecondary,

            fontFamily:
              theme.fonts.medium,
          }}
        >
          FULL NAME
        </Text>

        <Text
          style={{
            marginTop:
              theme.spacing.xs,

            fontSize:
              theme.typography.b1,

            lineHeight:
              theme.lineHeight.b1,

            color:
              theme.colors.text,

            fontFamily:
              theme.fonts.medium,
          }}
        >
          {fullName}
        </Text>

      </View>

      {/* ================================================= */}
      {/* DOB + GENDER */}
      {/* ================================================= */}

      <View
        style={{
          flexDirection: "row",

          paddingTop:
            theme.spacing.md,
        }}
      >

        {/* ================================================= */}
        {/* DATE OF BIRTH */}
        {/* ================================================= */}

        <View
          style={{
            flex: 1,

            paddingRight:
              theme.spacing.sm,
          }}
        >

          <View
            style={{
              flexDirection: "row",

              alignItems: "center",

              marginBottom:
                theme.spacing.xs,
            }}
          >

            <CalendarDays
              size={
                theme.iconSize.xs
              }

              color={
                theme.colors.gray500
              }

              strokeWidth={2}
            />

            <Text
              style={{
                marginLeft:
                  theme.spacing.xs,

                fontSize:
                  theme.typography.b3,

                lineHeight:
                  theme.lineHeight.b3,

                color:
                  theme.colors.text,

                fontFamily:
                  theme.fonts.medium,
              }}
            >
              DATE OF BIRTH
            </Text>

          </View>

          <Text
            style={{
              marginTop:
                theme.spacing.xs,

              fontSize:
                theme.typography.b1,

              lineHeight:
                theme.lineHeight.b1,

              color:
                theme.colors.gray500,

              fontFamily:
                theme.fonts.medium,
            }}
          >
            {formatDate(dateOfBirth)}
          </Text>

        </View>

        {/* ================================================= */}
        {/* GENDER */}
        {/* ================================================= */}

        <View
          style={{
            flex: 1,

            paddingLeft:
              theme.spacing.sm,
          }}
        >

          <View
            style={{
              flexDirection: "row",

              alignItems: "center",

              marginBottom:
                theme.spacing.xs,
            }}
          >

            <Users
              size={
                theme.iconSize.xs
              }

              color={
                theme.colors.text
              }

              strokeWidth={2}
            />

            <Text
              style={{
                marginLeft:
                  theme.spacing.xs,

                fontSize:
                  theme.typography.b3,

                lineHeight:
                  theme.lineHeight.b3,

                color:
                  theme.colors.gray500,

                fontFamily:
                  theme.fonts.medium,
              }}
            >
              GENDER
            </Text>

          </View>

          <Text
            style={{
              marginTop:
                theme.spacing.xs,

              fontSize:
                theme.typography.b1,

              lineHeight:
                theme.lineHeight.b1,

              color:
                theme.colors.gray500,

              fontFamily:
                theme.fonts.medium,

              textTransform:
                "capitalize",
            }}
          >
            {gender?.toLowerCase?.() ||
              "Not available"}
          </Text>

        </View>

      </View>

    </View>
  );
};

export default VisitorProfileInfoBasicInformationCard;