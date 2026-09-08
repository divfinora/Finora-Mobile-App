import React from "react";
import {
  View,
  Text,
} from "react-native";

import { theme } from "../../../../theme";

const formatStatus = (value) => {
  if (!value) {
    return "—";
  }

  return String(value)
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getStatusStyle = (value) => {
  const status = String(value || "")
    .toUpperCase()
    .trim();

  switch (status) {
    case "IN_PROGRESS":
    case "VISITOR_IN_PROGRESS":
      return {
        background: "#DCEAFF",
        text: "#2F65B9",
        dot: "#3980FF",
      };

    case "VISITOR_ASSIGNED":
    case "ASSIGNED":
      return {
        background: "#FFF4B8",
        text: "#966B00",
        dot: "#F2B600",
      };

    case "PENDING":
      return {
        background: "#FFF4B8",
        text: "#966B00",
        dot: "#F2B600",
      };

    case "APPROVED":
    case "COMPLETED":
    case "SUBMITTED":
      return {
        background: "#DCF7E6",
        text: "#287C45",
        dot: "#27C46D",
      };

    case "REJECTED":
      return {
        background: "#FFE1E1",
        text: "#C93B3B",
        dot: "#EF4444",
      };

    default:
      return {
        background: theme.colors.gray100,
        text: theme.colors.gray700,
        dot: theme.colors.gray500,
      };
  }
};

const StatusRow = ({
  label,
  value,
}) => {
  const statusStyle = getStatusStyle(value);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
      }}
    >
      <Text
        style={{
          flex: 1,
          fontSize: 14,
          color: theme.colors.gray700,
          fontFamily: theme.fonts.medium,
        }}
      >
        {label}
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: statusStyle.background,
          paddingHorizontal: 10,
          paddingVertical: 7,
          borderRadius: 7,
          maxWidth: 180,
        }}
      >
        <View
          style={{
            width: 7,
            height: 7,
            borderRadius: 4,
            backgroundColor: statusStyle.dot,
            marginRight: 6,
          }}
        />

        <Text
          numberOfLines={1}
          style={{
            fontSize: 11,
            color: statusStyle.text,
            fontFamily: theme.fonts.semiBold,
          }}
        >
          {formatStatus(value)}
        </Text>
      </View>
    </View>
  );
};

const StatusOverviewCard = ({
  verificationStatus,
  loanStatus,
  loanStage,
  approvalStatus,
  disbursementStatus,
}) => {
  return (
    <View
      style={{
        backgroundColor: theme.colors.white,
        borderRadius: 15,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
        borderWidth: 1,
        borderColor: "#E8EAED",
        ...theme.shadows.card,
      }}
    >
      <Text
        style={{
          fontSize: 18,
          color: theme.colors.navy900,
          fontFamily: theme.fonts.bold,
          marginBottom: 8,
        }}
      >
        Status Overview
      </Text>

      <View
        style={{
          height: 1,
          backgroundColor: "#E8EAED",
          marginBottom: 4,
        }}
      />

      <StatusRow
        label="Verification Status"
        value={verificationStatus}
      />

      <StatusRow
        label="Loan / Job Status"
        value={loanStatus}
      />

      <StatusRow
        label="Loan Stage"
        value={loanStage}
      />

      <StatusRow
        label="Approval Status"
        value={approvalStatus}
      />

      <StatusRow
        label="Disbursement Status"
        value={disbursementStatus}
      />
    </View>
  );
};

export default StatusOverviewCard;