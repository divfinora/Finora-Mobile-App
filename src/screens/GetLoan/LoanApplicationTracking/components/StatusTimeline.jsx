// src/screens/GetLoan/LoanApplicationTracking/components/StatusTimeline.jsx

import React, {
    memo,
} from "react";

import {
    Text,
    View,
} from "react-native";

import {
    theme,
} from "../../../../theme";

import TimelineItem from "./TimelineItem";
import EligibleLoanCard from "./EligibleLoanCard";


const StatusTimeline = ({
    status,
    onContinue,
}) => {

      console.log(status ,"staus ===")

    return (
        <View
            style={{
                marginTop:
                    theme.spacing.lg,

                backgroundColor:
                    theme.colors.white,

                borderWidth: 1,

                borderColor:
                    "#9A928C",

                borderRadius: 16,

                padding:
                    theme.spacing.lg,
            }}
        >

            <Text
                style={{
                    fontSize: 12,

                    letterSpacing: 1,

                    fontFamily:
                        theme.fonts.medium,

                    color:
                        "#7890AE",

                    marginBottom:
                        theme.spacing.xl,
                }}
            >
                STATUS TIMELINE
            </Text>


            {/* ============================================
                UNDER REVIEW
            ============================================ */}

            {status === "PENDING" && (
                <>
                    <TimelineItem
                        title="Under Review"
                        description={
                            "Your uploaded documents are being reviewed."
                        }
                        rightText={
                            "TODAY, 12:15 PM"
                        }
                        state="current"
                    />


                    <TimelineItem
                        title="Loan Approved"
                        description={
                            "Final approval by the sanctions committee."
                        }
                        rightText={
                            "ESTIMATED: 24 HRS"
                        }
                        state="pending"
                        last
                    />


                    <EligibleLoanCard
                        onContinue={
                            onContinue
                        }
                    />
                </>
            )}


            {/* ============================================
                APPROVED
            ============================================ */}

            {status === "APPROVED" && (
                <>
                    <TimelineItem
                        title="Under Review"
                        description={
                            "Your uploaded documents have been reviewed."
                        }
                        rightText={
                            "TODAY, 12:15 PM"
                        }
                        state="completed"
                    />


                    <TimelineItem
                        title="Loan Approved"
                        description={
                            "Final approval by the sanctions committee."
                        }
                        rightText={
                            "TODAY, 02:20 PM"
                        }
                        state="completed"
                        last
                    />


                    <EligibleLoanCard
                        onContinue={
                            onContinue
                        }
                    />
                </>
            )}


            {/* ============================================
                IN PROGRESS
            ============================================ */}

            {status === "IN_PROGRESS" && (
                <>
                    <TimelineItem
                        title="Under Review"
                        description={
                            "Application received and assigned to review team."
                        }
                        rightText={
                            "TODAY, 11:42 AM"
                        }
                        state="completed"
                    />


                    <TimelineItem
                        title="Verification In-progress"
                        description={
                            "Verification in progress. Reviewing your details."
                        }
                        rightText={
                            "TODAY, 12:15 PM"
                        }
                        state="current"
                    />


                    <TimelineItem
                        title="Loan Approved"
                        description={
                            "Final approval by the sanctions committee."
                        }
                        rightText={
                            "ESTIMATED: 24 HRS"
                        }
                        state="pending"
                    />


                    <TimelineItem
                        title="Disbursal"
                        description={
                            "Loan amount disbursed to the dealer account."
                        }
                        rightText={
                            "ESTIMATED: 2-3 DAYS"
                        }
                        state="pending"
                        last
                    />
                </>
            )}


            {/* ============================================
                REJECTED
            ============================================ */}

            {status === "REJECTED" && (
                <>
                    <TimelineItem
                        title="Under Review"
                        description={
                            "Application received and assigned to review team."
                        }
                        rightText={
                            "TODAY, 11:42 AM"
                        }
                        state="completed"
                    />


                    <TimelineItem
                        title="Verification In-progress"
                        description={
                            "Verification in progress. Reviewing your details."
                        }
                        rightText={
                            "TODAY, 12:15 PM"
                        }
                        state="completed"
                    />


                    <TimelineItem
                        title="Not Approved"
                        description={
                            "Your Application Could not be Approved."
                        }
                        state="rejected"
                        last
                    />
                </>
            )}

        </View>
    );
};


export default memo(
    StatusTimeline
);