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

import ShimmerPlaceholder from "../../../../components/common/Loader/ShimmerPlaceholder";


const StatCard = ({
  icon,
  iconColor,
  title,
  value,
  suffix,
  growth,
  growthColor,
  loading = false,
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

        borderWidth: 0.4,

        borderColor:
          "#EEEEEE",

        ...theme.shadows.card,
      }}
    >

      {/* =================================================
          TOP ROW
      ================================================= */}

      <View
        style={{
          flexDirection: "row",

          alignItems: "center",

          justifyContent:
            "space-between",
        }}
      >

        {/* ICON */}

        <View
          style={{
            width: 24,

            height: 24,

            justifyContent:
              "center",

            alignItems:
              "center",
          }}
        >
          {icon}
        </View>


        {/* GROWTH */}

        {!!growth && (

          loading ? (

            <ShimmerPlaceholder
              width={38}
              height={14}
              borderRadius={6}
            />

          ) : (

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

          )

        )}

      </View>


      {/* =================================================
          TITLE
      ================================================= */}

      <Text
        style={{
          marginTop: 16,

          fontSize: 14,

          color:
            "#77777D",

          fontFamily:
            theme.fonts.regular,
        }}
      >
        {title}
      </Text>


      {/* =================================================
          VALUE
      ================================================= */}

      <View
        style={{
          flexDirection: "row",

          alignItems:
            "baseline",

          marginTop: 6,

          minHeight: 30,
        }}
      >

        {loading ? (

          <ShimmerPlaceholder
            width={55}
            height={27}
            borderRadius={7}
          />

        ) : (

          <>

            <Text
              style={{
                fontSize: 24,

                color:
                  "#202020",

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

                  color:
                    "#202020",

                  fontFamily:
                    theme.fonts.bold,
                }}
              >
                {suffix}
              </Text>

            )}

          </>

        )}

      </View>

    </View>

  );
};


const VisitorHomeScreenStats = ({
  summary,
  loading = false,
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

          justifyContent:
            "space-between",
        }}
      >

        {/* =================================================
            VISITS
        ================================================= */}

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

          loading={
            loading
          }

        />


        {/* =================================================
            COMPLETED
        ================================================= */}

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

          loading={
            loading
          }

        />


        {/* =================================================
            HIGH PRIORITY
        ================================================= */}

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

          loading={
            loading
          }

        />


        {/* =================================================
            ASSIGNED
        ================================================= */}

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

          loading={
            loading
          }

        />

      </View>

    </View>

  );
};


export default memo(
  VisitorHomeScreenStats
);