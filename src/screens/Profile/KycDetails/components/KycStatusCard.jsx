import React, { memo } from "react";
import {
  View,
  Text,
} from "react-native";

import { CircleCheckBig } from "lucide-react-native";

import { theme } from "../../../../theme";
import ShimmerPlaceholder from "../../../../components/common/Loader/ShimmerPlaceholder";
 

const KycStatusCard = ({
  loading = false,
  status = "PENDING",
  lastUpdated = "Last updated: Oct 24, 2023",
}) => {

  const isVerified = status === "VERIFIED";

  return (

    <View
      style={{
        backgroundColor: loading
          ? theme.colors.gray100
          : isVerified
          ? theme.colors.gray100
          : "#FFF4F4",

        borderRadius: theme.radius.xl,

        alignItems: "center",

        paddingVertical: theme.spacing.xl,

        marginTop: theme.spacing.lg,

        marginBottom: theme.spacing.xxxl,
      }}
    >

      {/* ================= ICON ================= */}

      {
        loading ? (

          <ShimmerPlaceholder
            width={92}
            height={92}
            borderRadius={46}
          />

        ) : (

          <View
            style={{
              width: 92,
              height: 92,

              borderRadius: 46,

              backgroundColor: isVerified
                ? "#FFE7CF"
                : "#FEE2E2",

              justifyContent: "center",
              alignItems: "center",
            }}
          >

            <View
              style={{
                width: 76,
                height: 76,

                borderRadius: 38,

                backgroundColor: isVerified
                  ? "#E2570E"
                  : "#DC2626",

                justifyContent: "center",
                alignItems: "center",
              }}
            >

              <View
                style={{
                  width: 36,
                  height: 36,

                  borderRadius: 18,

                  backgroundColor: theme.colors.white,

                  justifyContent: "center",
                  alignItems: "center",
                }}
              >

                <CircleCheckBig
                  size={20}
                  color={isVerified ? "#F97316" : "#DC2626"}
                  strokeWidth={3}
                />

              </View>

            </View>

          </View>

        )
      }
            {/* ================= STATUS ================= */}

      {
        loading ? (

          <ShimmerPlaceholder
            width={180}
            height={22}
            borderRadius={8}
            style={{
              marginTop: theme.spacing.md,
            }}
          />

        ) : (

          <Text
            style={{
              marginTop: theme.spacing.md,

              color: isVerified
                ? theme.colors.gray900
                : "#B91C1C",

              fontSize: theme.typography.h2,

              fontFamily: theme.fonts.semiBold,
            }}
          >
            KYC Status : {isVerified ? "Verified" : "Not Verified"}
          </Text>

        )
      }

      {/* ================= LAST UPDATED ================= */}

      {
        loading ? (

          <ShimmerPlaceholder
            width={130}
            height={12}
            borderRadius={6}
            style={{
              marginTop: theme.spacing.sm,
            }}
          />

        ) : (

          <Text
            style={{
              marginTop: theme.spacing.sm,

              color: theme.colors.textLight,

              fontSize: theme.typography.b3,

              fontFamily: theme.fonts.regular,
            }}
          >
            {lastUpdated}
          </Text>

        )
      }

      {/* ================= BADGE ================= */}

      {
        loading ? (

          <ShimmerPlaceholder
            width={120}
            height={34}
            borderRadius={999}
            style={{
              marginTop: theme.spacing.lg,
            }}
          />

        ) : (

          <View
            style={{
              marginTop: theme.spacing.lg,

              backgroundColor: isVerified
                ? "#FFF1E5"
                : "#FEE2E2",

              borderWidth: 1,

              borderColor: isVerified
                ? "#FDBA74"
                : "#FCA5A5",

              borderRadius: 999,

              paddingHorizontal: theme.spacing.lg,
              paddingVertical: 7,
            }}
          >

            <Text
              style={{
                color: isVerified
                  ? "#EA580C"
                  : "#DC2626",

                fontSize: theme.typography.b3,

                fontFamily: theme.fonts.semiBold,
              }}
            >
              {isVerified
                ? "Active Profile"
                : "KYC Pending"}
            </Text>

          </View>

        )
      }

    </View>

  );

};

export default memo(KycStatusCard);