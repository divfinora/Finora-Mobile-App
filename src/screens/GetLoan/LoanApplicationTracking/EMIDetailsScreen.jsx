
// src/screens/GetLoan/LoanApplicationTracking/EMIDetailsScreen.jsx

import React, {
    memo,
    useMemo,
    useCallback,
} from "react";

import {
    ScrollView,
    StatusBar,
    View,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import EMILoanSummaryCard from "./components/EMILoanSummaryCard.jsx";
import MultipleEMIsInfoCard from "./components/MultipleEMIsInfoCard.jsx";
import RepaymentSchedule from "./components/RepaymentSchedule.jsx";

import NewFlowCommonHeader from
    "../../../components/common/BackButton/NewFlowCommonHeader.jsx";

// Temporary fake data for UI development
const FAKE_LOAN = {
    loanId: "VL18Sep2026001",
    loanName: "Personal Loan",
    status: "Active",
    remainingBalance: 3840038400,
    totalBalance: 5000050000,
    emisPaid: 3,
    totalEmis: 12,
    monthlyEmi: 43543500,
    nextEmiDate: "05 Jul 2026",
};

const FAKE_REPAYMENT_SCHEDULE = [
    {
        id: "1",
        number: 1,
        date: "12 Aug 2026",
        amount: 4350 ,
        status: "Paid",
    },
    {
        id: "2",
        number: 2,
        date: "12 Sep 2026",
        amount: 4350,
        status: "Paid",
    },
    {
        id: "3",
        number: 3,
        date: "12 Nov 2026",
        amount: 4350,
        status: "Pay Now",
    },
    {
        id: "4",
        number: 4,
        date: "12 Oct 2026",
        amount: 4350,
        status: "Upcoming",
    },
    {
        id: "5",
        number: 5,
        date: "12 Dec 2026",
        amount: 4350,
        status: "Pending",
    },
    {
        id: "6",
        number: 6,
        date: "12 Jan 2027",
        amount: 4350,
        status: "Pending",
    },
    {
        id: "7",
        number: 7,
        date: "12 Feb 2027",
        amount: 4350,
        status: "Pending",
    },
    {
        id: "8",
        number: 8,
        date: "12 Mar 2027",
        amount: 4350,
        status: "Pending",
    },
    {
        id: "9",
        number: 9,
        date: "12 Apr 2027",
        amount: 4350,
        status: "Pending",
    },
];

const USE_FAKE_DATA = true;

const EMIDetailsScreen = ({
    navigation,
    route,
}) => {
    const routeLoan = route?.params?.loan ?? {};

    const loanId =
        route?.params?.loanId ??
        routeLoan?.loanId ??
        routeLoan?._id ??
        FAKE_LOAN.loanId;

    // Fake data is used until the real API is ready.
    const loan = useMemo(() => {
        if (!USE_FAKE_DATA) {
            return routeLoan;
        }

        return {
            ...FAKE_LOAN,
            ...routeLoan,
            loanId,
        };
    }, [routeLoan, loanId]);

    const repaymentSchedule = useMemo(() => {
        if (!USE_FAKE_DATA) {
            const apiSchedule =
                loan?.repaymentSchedule ??
                loan?.emiSchedule ??
                [];

            return Array.isArray(apiSchedule)
                ? apiSchedule.map((item, index) => ({
                    id: String(
                        item?._id ??
                        item?.id ??
                        index + 1
                    ),
                    number:
                        item?.emiNumber ??
                        item?.number ??
                        index + 1,
                    date:
                        item?.dueDate ??
                        item?.date ??
                        "-",
                    amount:
                        item?.amount ??
                        item?.emiAmount ??
                        0,
                    status:
                        item?.status ??
                        "Pending",
                }))
                : [];
        }

        // Use fake schedule for now.
        return FAKE_REPAYMENT_SCHEDULE;
    }, [loan]);

    const handleBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const handleNotification = useCallback(() => {
        navigation.navigate("get-notification-screen");
    }, [navigation]);

    const handlePayNow = useCallback(
        emi => {
            // UI testing only. Payment flow is not connected yet.
            console.log("Selected fake EMI:", {
                loanId,
                emi,
            });
        },
        [loanId]
    );

    return (
        <SafeAreaView
            edges={["left", "right", "bottom"]}
            style={{
                flex: 1,
                backgroundColor: "#FAECD6",
            }}
        >
            <StatusBar
                translucent={
                    false
                }
                backgroundColor={
                    "#FAF4E9"
                }
                barStyle="dark-content"
            />

            <NewFlowCommonHeader
                title="EMI Details"
                onBack={handleBack}
                onNotificationPress={handleNotification}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: 16,
                    paddingBottom: 28,
                }}
            >
                <EMILoanSummaryCard
                    loanName={
                        loan?.loanName ??
                        "Personal Loan"
                    }
                    status={
                        loan?.status ??
                        "Active"
                    }
                    remainingBalance={
                        loan?.remainingBalance ??
                        38400
                    }
                    totalBalance={
                        loan?.totalBalance ??
                        50000
                    }
                    emisPaid={
                        loan?.emisPaid ??
                        3
                    }
                    totalEmis={
                        loan?.totalEmis ??
                        12
                    }
                    monthlyEmi={
                        loan?.monthlyEmi ??
                        4350
                    }
                    nextEmiDate={
                        loan?.nextEmiDate ??
                        "05 Jul 2026"
                    }
                />

                <View
                    style={{
                        marginTop: 16,
                    }}
                >
                    <MultipleEMIsInfoCard />
                </View>

                <View
                    style={{
                        marginTop: 16,
                    }}
                >
                    <RepaymentSchedule
                        schedule={repaymentSchedule}
                        onPayNow={handlePayNow}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default memo(EMIDetailsScreen);
