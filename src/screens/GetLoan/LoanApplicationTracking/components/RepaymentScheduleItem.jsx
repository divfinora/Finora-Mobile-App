import React, { memo } from "react";

import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import { BadgeIndianRupee } from "lucide-react-native";

import { theme } from "../../../../theme";

const formatAmount = value =>
    `₹${Number(value ?? 0).toLocaleString("en-IN")}`;

const RepaymentScheduleItem = ({
    item,
    onPayNow,
}) => {
    const status = String(item?.status ?? "Pending")
        .trim()
        .toUpperCase();

    const isPaid = status === "PAID";
    const isOverdue =
        status === "OVERDUE" ||
        status === "EMI OVERDUE";

    const isPayNow = status === "PAY NOW";
    const isUpcoming = status === "UPCOMING";

    const rowBackground = isOverdue
        ? "#FFF9F6"
        : isPayNow
            ? "#F1F5FF"
            : "#FFFFFF";

    const borderColor = isOverdue
        ? "#FF8B67"
        : isPayNow
            ? "#6485FF"
            : "transparent";

    const displayStatus = isOverdue
        ? "EMI Overdue"
        : isPaid
            ? "Paid"
            : isUpcoming
                ? "Upcoming"
                : "Pending";

    const badgeBackground = isPaid
        ? "#EAFBF4"
        : isOverdue
            ? "#FFE9E0"
            : isUpcoming
                ? "#FFF5E9"
                : "#F0F3F7";

    const badgeColor = isPaid
        ? "#009B69"
        : isOverdue || isUpcoming
            ? "#EA580C"
            : "#64748B";

    const displayDate = (() => {
        if (!item?.date) return "-";

        const date = new Date(item.date);

        if (Number.isNaN(date.getTime())) {
            return String(item.date);
        }

        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    })();

    return (
        <View
            style={{
                minHeight: 53,
                borderRadius: 9,
                backgroundColor: rowBackground,
                paddingHorizontal: 12,
                paddingVertical: 9,
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
                borderWidth: 1,
                borderColor,
            }}
        >
            <View
                style={{
                    width: 23,
                    height: 23,
                    borderRadius: 12,
                    backgroundColor: isPaid
                        ? "#D1FAE5"
                        : isOverdue
                            ? "#FFE9E0"
                            : "#F0F4F8",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 11,
                }}
            >
                <Text
                    style={{
                        fontFamily: theme.fonts.semiBold,
                        fontSize: 10,
                        color: isPaid
                            ? "#059669"
                            : isOverdue
                                ? "#EA580C"
                                : "#64748B",
                    }}
                >
                    {item?.number}
                </Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        fontFamily: theme.fonts.bold,
                        fontSize: 12,
                        color: "#344256",
                    }}
                >
                    {displayDate}
                </Text>

                <Text
                    style={{
                        fontFamily: theme.fonts.regular,
                        fontSize: 11,
                        color: "#91A3BE",
                        marginTop: 1,
                    }}
                >
                    {formatAmount(item?.amount)}
                </Text>
            </View>

            {isPayNow ? (
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => onPayNow?.(item)}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                        backgroundColor: "#DCE8FF",
                        borderRadius: 6,
                        paddingHorizontal: 10,
                        paddingVertical: 7,
                    }}
                >
                    <BadgeIndianRupee
                        size={14}
                        color="#2563EB"
                    />

                    <Text
                        style={{
                            fontFamily: theme.fonts.bold,
                            fontSize: 11,
                            color: "#2563EB",
                        }}
                    >
                        Pay Now
                    </Text>
                </TouchableOpacity>
            ) : (
                <View
                    style={{
                        borderRadius: 6,
                        paddingHorizontal: 9,
                        paddingVertical: 5,
                        backgroundColor: badgeBackground,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: theme.fonts.semiBold,
                            fontSize: 10,
                            color: badgeColor,
                        }}
                    >
                        {displayStatus}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default memo(RepaymentScheduleItem);