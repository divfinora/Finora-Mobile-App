
import React, { memo } from "react";

import {
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import MaterialIcons from
    "@react-native-vector-icons/material-icons";

import { theme } from "../../../../theme";

// ============================================================
// FORMAT AMOUNT
// ============================================================

const formatAmount = value => {
    const amount = Number(value ?? 0);

    if (!Number.isFinite(amount)) {
        return "₹0";
    }

    return `₹${amount.toLocaleString("en-IN", {
        maximumFractionDigits: 2,
    })}`;
};

// ============================================================
// FORMAT DATE
// ============================================================

const formatDate = value => {
    if (!value) {
        return "-";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return String(value);
    }

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

// ============================================================
// DETAIL ROW
// ============================================================

const DetailRow = ({
    label,
    value,
    muted = false,
}) => (
    <View
        style={{
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 10,
        }}
    >
        <Text
            style={{
                flex: 1,
                marginRight: 10,
                fontSize: 14,
                lineHeight: 19,
                fontFamily: theme.fonts.medium,
                color: "#111827",
            }}
        >
            {label}
        </Text>

        <Text
            style={{
                flex: 1,
                fontSize: 14,
                lineHeight: 19,
                textAlign: "right",
                fontFamily: theme.fonts.semiBold,
                color: muted ? "#91A3BF" : "#111827",
            }}
        >
            {String(value ?? "-")}
        </Text>
    </View>
);

// ============================================================
// LOAN DISBURSED DETAILS
// ============================================================

const LoanDisbursedDetails = ({
    loan = {},
    loanId,
    onViewEmiDetails,
}) => {
    const bank = loan?.bankDetails ?? {};

    const appliedAmount =
        loan?.requestedAmount ??
        loan?.appliedAmount ??
        loan?.loanAmount ??
        loan?.amount ??
        0;

    const disbursedAmount =
        loan?.disbursedAmount ??
        loan?.amountDisbursed ??
        loan?.sanctionedAmount ??
        0;

    const interestRate =
        loan?.interestRate ??
        loan?.rateOfInterest ??
        loan?.roi ??
        0;

    const tenure =
        loan?.tenureMonths ??
        loan?.tenure ??
        loan?.loanTenure ??
        12;

    const monthlyEmi =
        loan?.monthlyEmi ??
        loan?.emiAmount ??
        loan?.emi ??
        0;

    const accountNumber =
        loan?.bankAccountNumber ??
        loan?.accountNumber ??
        bank?.accountNumber ??
        "-";

    const bankName =
        loan?.bankName ??
        bank?.bankName ??
        "-";

    const ifscCode =
        loan?.ifscCode ??
        bank?.ifscCode ??
        "-";

    const disbursedDate = formatDate(
        loan?.disbursedAt ??
        loan?.disbursedDate ??
        loan?.disbursementDate
    );

    const nextEmiDate = formatDate(
        loan?.nextEmiDate ??
        loan?.nextEMIDate ??
        loan?.nextPaymentDate
    );

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                padding: theme.spacing.lg,
                paddingBottom: theme.spacing.massive,
            }}
        >
            <View
                style={{
                    backgroundColor: theme.colors.white,
                    borderWidth: 1,
                    borderColor: "#FFD1B8",
                    borderRadius: 16,
                    overflow: "hidden",
                }}
            >
                {/* HEADER */}

                <View
                    style={{
                        minHeight: 48,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: theme.spacing.lg,
                        backgroundColor: "#FFFAF6",
                        borderBottomWidth: 1,
                        borderBottomColor: "#F3EAE4",
                    }}
                >
                    <MaterialIcons
                        name="receipt-long"
                        size={21}
                        color="#9299A3"
                    />

                    <Text
                        style={{
                            marginLeft: 9,
                            fontSize: 16,
                            fontFamily: theme.fonts.semiBold,
                            color: theme.colors.navy900,
                        }}
                    >
                        Loan Summary
                    </Text>
                </View>

                {/* DETAILS */}

                <View
                    style={{
                        padding: theme.spacing.lg,
                    }}
                >
                    <DetailRow
                        label="Loan ID"
                        value={
                            loanId ??
                            loan?.loanId ??
                            loan?._id ??
                            "-"
                        }
                        muted
                    />

                    <DetailRow
                        label="Applied Amount"
                        value={formatAmount(appliedAmount)}
                    />

                    <DetailRow
                        label="Disbursed Amount Date"
                        value={disbursedDate}
                    />

                    <DetailRow
                        label="Disbursed Amount"
                        value={formatAmount(disbursedAmount)}
                        muted
                    />

                    <View
                        style={{
                            borderBottomWidth: 1,
                            borderStyle: "dashed",
                            borderColor: "#E5E7EB",
                            marginVertical: 5,
                        }}
                    />

                    <DetailRow
                        label="To Receive - Bank account No."
                        value={accountNumber}
                        muted
                    />

                    <DetailRow
                        label="Bank Name"
                        value={bankName}
                    />

                    <DetailRow
                        label="IFSC Code"
                        value={ifscCode}
                        muted
                    />

                    <View
                        style={{
                            borderBottomWidth: 1,
                            borderStyle: "dashed",
                            borderColor: "#E5E7EB",
                            marginVertical: 5,
                        }}
                    />

                    <DetailRow
                        label="Interest Rate"
                        value={`${interestRate}% P.A`}
                    />

                    <DetailRow
                        label="Tenure"
                        value={`${tenure} Months`}
                        muted
                    />

                    <DetailRow
                        label="Monthly EMI"
                        value={formatAmount(monthlyEmi)}
                    />

                    {/* NEXT EMI DATE */}

                    <View
                        style={{
                            height: 34,
                            marginTop: 8,
                            marginBottom: 12,
                            paddingHorizontal: 9,
                            borderRadius: 8,
                            backgroundColor: "#FFF0E8",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: theme.fonts.bold,
                                color: theme.colors.primary700,
                            }}
                        >
                            Next EMI Date
                        </Text>

                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: theme.fonts.bold,
                                color: theme.colors.primary700,
                            }}
                        >
                            {nextEmiDate}
                        </Text>
                    </View>

                    {/* VIEW EMI DETAILS BUTTON */}

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onViewEmiDetails}
                        style={{
                            height: 38,
                            alignSelf: "flex-end",
                            paddingHorizontal: theme.spacing.lg,
                            borderRadius: 10,
                            backgroundColor: theme.colors.primary500,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <MaterialIcons
                            name="visibility"
                            size={16}
                            color={theme.colors.white}
                        />

                        <Text
                            style={{
                                marginLeft: 7,
                                fontSize: 13,
                                fontFamily: theme.fonts.semiBold,
                                color: theme.colors.white,
                            }}
                        >
                            View EMI Details
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

export default memo(LoanDisbursedDetails);
