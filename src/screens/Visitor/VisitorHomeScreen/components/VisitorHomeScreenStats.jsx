import React, {
  memo,
} from "react";

import {
  View,
  Text,
} from "react-native";

import {
  Activity,
  CheckCircle2,
  ClipboardX,
  UserRoundCheck,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";


const StatCard = ({
  icon,
  iconColor,
  title,
  value,
  suffix,
  growth,
  growthColor,
}) => {

  return (

    <View
      style={{
        width: "48%",

        minHeight: 140,

        backgroundColor:
          "#FFFFFF",

        borderRadius: 16,

        padding: 20,

        marginBottom: 14,

        borderWidth: 1,

        borderColor:
          "#EEEEEE",

        ...theme.shadows.card,
      }}
    >

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >

        <View
          style={{
            width: 24,
            height: 24,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </View>


        {!!growth && (

          <Text
            style={{
              fontSize: 14,

              fontFamily:
                theme.fonts.semiBold,

              color:
                growthColor ||
                "#1261C9",
            }}
          >
            {growth}
          </Text>

        )}

      </View>


      <Text
        style={{
          marginTop: 16,

          fontSize: 14,

          color: "#77777D",

          fontFamily:
            theme.fonts.regular,
        }}
      >
        {title}
      </Text>


      <View
        style={{
          flexDirection: "row",
          alignItems: "baseline",
          marginTop: 3,
        }}
      >

        <Text
          style={{
            fontSize: 25,

            color: "#202020",

            fontFamily:
              theme.fonts.headingBold,
          }}
        >
          {value ?? 0}
        </Text>

        {!!suffix && (

          <Text
            style={{
              marginLeft: 5,

              fontSize: 12,

              color: "#202020",

              fontFamily:
                theme.fonts.semiBold,
            }}
          >
            {suffix}
          </Text>

        )}

      </View>

    </View>

  );
};


const VisitorHomeScreenStats = ({
  summary,
}) => {

  const completionRate =
    summary?.completionRate ?? 0;

  const visitGrowth =
    summary?.visitGrowth ?? 0;


  return (

    <View
      style={{
        paddingHorizontal: 24,
      }}
    >

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >

        {/* Visits */}

        <StatCard

          title="Visits"

          value={
            summary?.totalAssigned ?? 0
          }

          growth={
            `${visitGrowth >= 0 ? "+" : ""}${visitGrowth}%`
          }

          icon={
            <Activity
              size={20}
              color="#1261C9"
            />
          }

        />


        {/* Completed */}

        <StatCard

          title="Completed"

          value={
            summary?.submitted ?? 0
          }

          suffix="/ Months"

          growth={
            `${completionRate}%`
          }

          growthColor="#00A64F"

          icon={
            <CheckCircle2
              size={20}
              color="#00A64F"
            />
          }

        />


        {/* High Priority */}

        <StatCard

          title="High Priority"

          value={
            summary?.highPriority ?? 0
          }

          growth="High"

          growthColor="#D32323"

          icon={
            <ClipboardX
              size={20}
              color="#D32323"
            />
          }

        />


        {/* Assigned */}

        <StatCard

          title="Assigned"

          value={
            summary?.assigned ?? 0
          }

          growth={
            summary?.newAssignments
              ? "New"
              : ""
          }

          growthColor="#555555"

          icon={
            <UserRoundCheck
              size={20}
              color="#463A1C"
            />
          }

        />

      </View>

    </View>

  );
};

export default memo(
  VisitorHomeScreenStats
);

 