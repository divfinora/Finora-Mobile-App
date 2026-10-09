import React, { memo } from "react";

import {
    View,
    Text,
} from "react-native";

import { theme } from "../../../../theme";

const formatAmount = value => {
    const amount = Number(value ?? 0);

    return `₹${Number.isFinite(amount)
        ? amount.toLocaleString("en-IN")
        : "0"}`;
};

const formatDate = value => {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return String(value);
    }

    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const EMILoanSummaryCard = ({
    loanName = "Personal Loan",
    status = "Active",
    remainingBalance = 3833333400,
    totalBalance = 5033000,
    emisPaid = 3,
    totalEmis = 12,
    monthlyEmi = 435330,
    nextEmiDate = "05 Jul 2026",
}) => {
    const progress = Number(totalEmis) > 0
        ? Math.min(
            (Number(emisPaid) / Number(totalEmis)) * 100,
            100
        )
        : 0;

    return (
        <View
            style={{
                backgroundColor: "#FFFFFF",
                borderRadius: 18,
                padding: 16,
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontFamily: theme.fonts.semiBold,
                        fontSize: 16,
                        color: "#172033",
                    }}
                >
                    {loanName}
                </Text>

                <View
                    style={{
                        backgroundColor: "#ECFDF5",
                        borderRadius: 7,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                    }}
                >
                    <Text
                        style={{
                            fontFamily: theme.fonts.bold,
                            fontSize: 11,
                            color: "#009B69",
                        }}
                    >
                        {status}
                    </Text>
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    marginTop: 4,
                    marginBottom: 15,
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontFamily: theme.fonts.regular,
                            fontSize: 12,
                            color: "#93A3BB",
                            marginBottom: 4,
                        }}
                    >
                        Outstanding Balance
                    </Text>

                    <Text
                        style={{
                            fontFamily: theme.fonts.semiBold,
                            fontSize: 18,
                            color: "#111111",
                        }}
                    >
                        {formatAmount(remainingBalance)}
                    </Text>
                </View>

                <View
                    style={{
                        width: 1,
                        backgroundColor: "#E9EDF2",
                        marginHorizontal: 18,
                    }}
                />

                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontFamily: theme.fonts.regular,
                            fontSize: 12,
                            color: "#93A3BB",
                            marginBottom: 4,
                        }}
                    >
                        Total Balance
                    </Text>

                    <Text
                        style={{
                              fontFamily: theme.fonts.semiBold,
                            fontSize: 18,
                            color: "#111111",
                        }}
                    >
                        {formatAmount(totalBalance)}
                    </Text>
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 8,
                }}
            >
                <Text
                    style={{
                        fontFamily: theme.fonts.medium,
                        fontSize: 11,
                        color: "#536987",
                    }}
                >
                    {emisPaid} of {totalEmis} EMIs paid
                </Text>

                <Text
                    style={{
                        fontFamily: theme.fonts.medium,
                        fontSize: 11,
                        color: "#536987",
                    }}
                >
                    {Math.round(progress)}%
                </Text>
            </View>

            <View
                style={{
                    height: 6,
                    borderRadius: 10,
                    backgroundColor: "#E2E8F0",
                    overflow: "hidden",
                }}
            >
                <View
                    style={{
                        height: "100%",
                        width: `${progress}%`,
                        borderRadius: 10,
                        backgroundColor: "#10B981",
                    }}
                />
            </View>

            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 16,
                    marginBottom: 9,
                }}
            >
                <Text
                    style={{
                        fontFamily: theme.fonts.semiBold,
                        fontSize: 14,
                        color: "#171717",
                    }}
                >
                    Monthly EMI
                </Text>

                <Text
                    style={{
                        fontFamily: theme.fonts.semiBold,
                        fontSize: 14,
                        color: "#171717",
                    }}
                >
                    {formatAmount(monthlyEmi)}
                </Text>
            </View>

            <View
                style={{
                    backgroundColor: "#FFF0E9",
                    borderRadius: 9,
                    minHeight: 35,
                    paddingHorizontal: 9,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontFamily: theme.fonts.bold,
                        fontSize: 12,
                        color: theme.colors.primary700,
                    }}
                >
                    Next EMI Date
                </Text>

                <Text
                    style={{
                        fontFamily: theme.fonts.bold,
                        fontSize: 12,
                        color: theme.colors.primary700,
                    }}
                >
                    {formatDate(nextEmiDate)}
                </Text>
            </View>
        </View>
    );
};

export default memo(EMILoanSummaryCard);