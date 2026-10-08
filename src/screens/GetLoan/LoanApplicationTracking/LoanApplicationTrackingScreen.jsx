// src/screens/GetLoan/LoanApplicationTracking/LoanApplicationTrackingScreen.jsx

import React, {
    memo,
    useCallback,
    useMemo,
} from "react";

import {
    RefreshControl,
    ScrollView,
    StatusBar,
    Text,
    View,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

 import {
    normalizeStatus,
} from "./utils/loanTrackingHelpers";

import NewFlowCommonHeader from
    "../../../components/common/BackButton/NewFlowCommonHeader";

import {
    theme,
} from "../../../theme";

import OverallProgressCard from
    "./components/OverallProgressCard";

import StatusTimeline from
    "./components/StatusTimeline";

import RejectedLoanCard from
    "./components/RejectedLoanCard";

import LoanSupportCard from
    "./components/LoanSupportCard";

import TrackingSkeleton from
    "./components/TrackingSkeleton";

import {
    getScreenStatus,
} from "./utils/loanTrackingHelpers";

import {
    FAKE_LOAN_TRACKING_DATA,
} from "./utils/fakeLoanTrackingData";
import { useGetSingleLoanDetailsQuery } from "../../../redux/features/customer/customerApi";


// ============================================================
// API + FAKE DATA
// ============================================================

const USE_FAKE_DATA = true;


const LoanApplicationTrackingScreen = ({
    navigation,
    route,
}) => {

    // ========================================================
    // LOAN ID
    // ========================================================

const loanId =
    route?.params?.loanId;

 
// ========================================================
// STATUS FROM PARAMS
// ========================================================

const status =
    normalizeStatus(
        route?.params?.status ?? "PENDING"
    );

    // ========================================================
    // SINGLE LOAN API
    // ========================================================

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetSingleLoanDetailsQuery(
        loanId,
        {
            skip: !loanId,
        }
    );


    // ========================================================
    // API RESPONSE
    // ========================================================

    const apiLoan =
        useMemo(() => {

            if (
                data?.data?.loan
            ) {
                return data.data.loan;
            }


            if (
                data?.data
            ) {
                return data.data;
            }


            if (
                data?.loan
            ) {
                return data.loan;
            }


            return data ?? null;

        }, [data]);


    // ========================================================
    // FINAL LOAN
    // ========================================================

    const loan =
        USE_FAKE_DATA
            ? {
                ...FAKE_LOAN_TRACKING_DATA,

                loanId:
                    loanId ??
                    FAKE_LOAN_TRACKING_DATA.loanId,

                ...(apiLoan || {}),
            }
            : apiLoan;


    // ========================================================
    // STATUS
    // ========================================================
 


    // ========================================================
    // PROGRESS
    // ========================================================

    const progress =
        Number(
            loan?.progress ??
            loan?.overallProgress ??
            (
                status === "APPROVED"
                    ? 70
                    : status === "REJECTED"
                        ? 40
                        : 40
            )
        );


    // ========================================================
    // BACK
    // ========================================================

    const handleBack =
        useCallback(() => {

            navigation.goBack();

        }, [navigation]);


    // ========================================================
    // NOTIFICATION
    // ========================================================

    const handleNotification =
        useCallback(() => {

            navigation.navigate(
                "get-notification-screen"
            );

        }, [navigation]);


    // ========================================================
    // REFRESH
    // ========================================================

    const handleRefresh =
        useCallback(
            async () => {

                await refetch();

            },
            [refetch]
        );


    // ========================================================
    // CONTINUE
    // ========================================================

    const handleContinue =
        useCallback(() => {

            // Yaha later actual
            // application continuation
            // navigation laga dena.

        }, []);


    // ========================================================
    // SUPPORT
    // ========================================================

    const handleSupport =
        useCallback(() => {

            // Later HelpTicketBottomSheet
            // open kar sakte ho.

        }, []);


    // ========================================================
    // LOADING
    // ========================================================

    const loading =
        isLoading ||
        isFetching;


    // ========================================================
    // ERROR
    // ========================================================

    if (
        isError &&
        !USE_FAKE_DATA &&
        !loading
    ) {

        return (
            <SafeAreaView
                edges={[
                    "left",
                    "right",
                    "bottom",
                ]}
                style={{
                    flex: 1,

                    backgroundColor:
                        "#F9EBD5",
                }}
            >

                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#FFF9F0"
                />


                <NewFlowCommonHeader
                    title="Track Application"

                    onBack={
                        handleBack
                    }

                    onNotificationPress={
                        handleNotification
                    }
                />


                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={
                                isFetching
                            }

                            onRefresh={
                                handleRefresh
                            }

                            tintColor={
                                theme.colors.primary500
                            }
                        />
                    }

                    contentContainerStyle={{
                        flexGrow: 1,

                        alignItems:
                            "center",

                        justifyContent:
                            "center",

                        padding:
                            theme.spacing.xl,
                    }}
                >

                    <Text
                        style={{
                            fontSize: 18,

                            fontFamily:
                                theme.fonts.bold,

                            color:
                                theme.colors.navy900,
                        }}
                    >
                        Unable to load application
                    </Text>


                    <Text
                        style={{
                            marginTop:
                                theme.spacing.sm,

                            fontSize: 13,

                            textAlign:
                                "center",

                            fontFamily:
                                theme.fonts.regular,

                            color:
                                theme.colors.gray500,
                        }}
                    >
                        Pull down to try again.
                    </Text>

                </ScrollView>

            </SafeAreaView>
        );
    }


    // ========================================================
    // SCREEN
    // ========================================================

    return (
        <SafeAreaView
            edges={[
                "left",
                "right",
                "bottom",
            ]}
            style={{
                flex: 1,

                backgroundColor:
                    "#F9EBD5",
            }}
        >

            <StatusBar
                barStyle="dark-content"
                backgroundColor="#FFF9F0"
            />


            {/* =================================================
                HEADER
            ================================================= */}

            <NewFlowCommonHeader
                title="Track Application"

                onBack={
                    handleBack
                }

                onNotificationPress={
                    handleNotification
                }
            />


            {/* =================================================
                SKELETON
            ================================================= */}

            {loading ? (

                <TrackingSkeleton />

            ) : (

                <ScrollView
                    showsVerticalScrollIndicator={
                        false
                    }

                    refreshControl={
                        <RefreshControl
                            refreshing={
                                isFetching &&
                                !isLoading
                            }

                            onRefresh={
                                handleRefresh
                            }

                            tintColor={
                                theme.colors.primary500
                            }
                        />
                    }

                    contentContainerStyle={{
                        paddingHorizontal:
                            theme.spacing.lg,

                        paddingTop:
                            theme.spacing.lg,

                        paddingBottom:
                            theme.spacing.massive,
                    }}
                >

                    {/* =================================================
                        REJECTED TOP CARD
                    ================================================= */}

                    {status ===
                        "REJECTED" && (

                        <RejectedLoanCard
                            loan={
                                loan
                            }
                        />

                    )}


                    {/* =================================================
                        PROGRESS
                    ================================================= */}

                    <OverallProgressCard
                        progress={
                            progress
                        }

                        rejected={
                            status ===
                            "REJECTED"
                        }
                    />


                    {/* =================================================
                        TIMELINE
                    ================================================= */}

                    <StatusTimeline
                        status={
                            status
                        }

                        onContinue={
                            handleContinue
                        }
                    />


                    {/* =================================================
                        SUPPORT
                    ================================================= */}

                    {status ===
                        "REJECTED" && (

                        <LoanSupportCard
                            onPress={
                                handleSupport
                            }
                        />

                    )}

                </ScrollView>

            )}

        </SafeAreaView>
    );
};


export default memo(
    LoanApplicationTrackingScreen
);