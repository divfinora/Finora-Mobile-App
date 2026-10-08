// ============================================================
// src/screens/GetLoan/MyLoan/MyLoanScreen.jsx
// ============================================================

import React, {
    memo,
    useCallback,
    useMemo,
    useState,
} from "react";

import {
    FlatList,
    RefreshControl,
    ScrollView,
    StatusBar,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import MaterialIcons from
    "@react-native-vector-icons/material-icons";

// ============================================================
// API
// ============================================================

import {
    useGetMyLoansQuery,
} from "../../../redux/features/customer/customerApi";

// ============================================================
// COMMON COMPONENTS
// ============================================================

import InlineRetry from
    "../../../components/common/RetryScreen/InlineRetry";

import NewFlowCommonHeader from
    "../../../components/common/BackButton/NewFlowCommonHeader";

// ============================================================
// SCREEN COMPONENTS
// ============================================================

import LoanHistoryCard from
    "./components/LoanHistoryCard";

import LoanHistoryFilterSheet from
    "./components/LoanHistoryFilterSheet";

import LoanHistorySkeleton from
    "./components/LoanHistorySkeleton";

import LoanHistoryEmptyState from
    "./components/LoanHistoryEmptyState";

// ============================================================
// THEME
// ============================================================

import {
    theme,
} from "../../../theme";

// ============================================================
// BOTTOM TAB HEIGHT
// ============================================================

import {
    useBottomTabHeight,
} from "../../../navigation/BottomTabHeightContext.jsx";

// ============================================================
// SCREEN
// ============================================================

const MyLoanScreen = ({
    navigation,
}) => {

    // ========================================================
    // BOTTOM TAB HEIGHT
    // ========================================================

    const {
        height: bottomTabHeight,
    } = useBottomTabHeight();

    // ========================================================
    // SEARCH
    // ========================================================

    const [
        searchText,
        setSearchText,
    ] = useState("");

    // ========================================================
    // FILTER SHEET
    // ========================================================

    const [
        filterVisible,
        setFilterVisible,
    ] = useState(false);

    // ========================================================
    // FILTER STATE
    // ========================================================

    const [
        filters,
        setFilters,
    ] = useState({
        loanTypes: [],
        statuses: [],
        dateRange: "LAST_30_DAYS",
        loanView: "ACTIVE",
    });

    // ========================================================
    // REFRESH STATE
    // ========================================================

    const [
        refreshing,
        setRefreshing,
    ] = useState(false);

    // ========================================================
    // API
    // ========================================================

    const {
        data,
        isLoading,
        isFetching,
        isError,
        refetch,
    } = useGetMyLoansQuery();



    // =========================Fake Loan  Data

    // ========================================================
// DESIGN / TEST DATA
// ========================================================

const FAKE_LOAN_HISTORY = [
    {
        _id: "6a9572d0163b072fffa699dd",
        loanId: "FS-PER-100001",
        referenceId: "REF-PER-100001",
        category: "PERSONAL",
        loanType: "PERSONAL",
        loanName: "Personal Loan",
        loanAmount: 250000,
        amount: 250000,
        status: "PENDING",
        applicationStatus: "PENDING",
        applyDate: "2026-09-28T10:30:00.000Z",
        createdAt: "2026-09-28T10:30:00.000Z",
    },

    {
        _id: "6a9572d0163b072fffa699dd",
        loanId: "FS-GOLD-100002",
        referenceId: "REF-GOLD-100002",
        category: "GOLD",
        loanType: "GOLD",
        loanName: "Gold Loan",
        loanAmount: 150000,
        amount: 150000,
        status: "VISITOR_IN_PROGRESS",
        applicationStatus: "VISITOR_IN_PROGRESS",
        applyDate: "2026-09-25T10:30:00.000Z",
        createdAt: "2026-09-25T10:30:00.000Z",
    },

    {
        _id: "6a9572d0163b072fffa699dd",
        loanId: "FS-HOME-100003",
        referenceId: "REF-HOME-100003",
        category: "HOME",
        loanType: "HOME",
        loanName: "Home Loan",
        loanAmount: 850000,
        amount: 850000,
        status: "APPROVED",
        applicationStatus: "APPROVED",
        applyDate: "2026-09-20T10:30:00.000Z",
        createdAt: "2026-09-20T10:30:00.000Z",
    },

    {
        _id: "6a9572d0163b072fffa699dd",
        loanId: "FS-BUS-100004",
        referenceId: "REF-BUS-100004",
        category: "BUSINESS",
        loanType: "BUSINESS",
        loanName: "Business Loan",
        loanAmount: 500000,
        amount: 500000,
        status: "REJECTED",
        applicationStatus: "REJECTED",
        applyDate: "2026-09-18T10:30:00.000Z",
        createdAt: "2026-09-18T10:30:00.000Z",
    },

    {
        _id: "6a9572d0163b072fffa699dd",
        loanId: "FS-EDU-100005",
        referenceId: "REF-EDU-100005",
        category: "EDUCATION",
        loanType: "EDUCATION",
        loanName: "Education Loan",
        loanAmount: 400000,
        amount: 400000,
        status: "DISBURSED",
        applicationStatus: "DISBURSED",
        applyDate: "2026-09-15T10:30:00.000Z",
        disbursedOn: "2026-09-17T10:30:00.000Z",
        disbursedAt: "2026-09-17T10:30:00.000Z",
        createdAt: "2026-09-15T10:30:00.000Z",
    },

    {
        _id: "6a9572d0163b072fffa699dd",
        loanId: "FS-VEH-100006",
        referenceId: "REF-VEH-100006",
        category: "VEHICLE",
        loanType: "VEHICLE",
        loanName: "Vehicle Loan",
        loanAmount: 600000,
        amount: 600000,
        status: "ACTIVE",
        applicationStatus: "ACTIVE",
        applyDate: "2026-06-01T10:30:00.000Z",
        createdAt: "2026-06-01T10:30:00.000Z",

        remainingBalance: 420000,
        outstandingBalance: 420000,
        totalBalance: 600000,

        emiPaid: 6,
        emisPaid: 6,

        totalEmi: 24,
        totalEmis: 24,

        monthlyEmi: 28500,
        emiAmount: 28500,

        nextEmiDate: "2026-10-10T10:30:00.000Z",
        nextEMIDate: "2026-10-10T10:30:00.000Z",
    },

    {
        _id: "fake-closed-007",
        loanId: "FS-AGRI-100007",
        referenceId: "REF-AGRI-100007",
        category: "AGRICULTURE",
        loanType: "AGRICULTURE",
        loanName: "Agriculture Loan",
        loanAmount: 300000,
        amount: 300000,
        status: "CLOSED",
        applicationStatus: "CLOSED",
        applyDate: "2025-05-10T10:30:00.000Z",
        createdAt: "2025-05-10T10:30:00.000Z",

        totalPaid: 325000,
        paidAmount: 325000,

        emiPaid: 24,
        emisPaid: 24,

        totalEmi: 24,
        totalEmis: 24,

        startDate: "2025-05-15T10:30:00.000Z",
        loanStartDate: "2025-05-15T10:30:00.000Z",

        closedDate: "2026-05-15T10:30:00.000Z",
        loanClosedDate: "2026-05-15T10:30:00.000Z",
    },
];
    // =========================Fake Loan Data

    // ========================================================
    // NORMALIZE API DATA
    // ========================================================

  // ========================================================
// LOAN DATA
// ========================================================

const loans = useMemo(
    () => {

        // -----------------------------------------------
        // 1. USE FAKE DATA IF AVAILABLE
        // -----------------------------------------------

        if (
            Array.isArray(FAKE_LOAN_HISTORY) &&
            FAKE_LOAN_HISTORY.length > 0
        ) {
            return FAKE_LOAN_HISTORY;
        }

        // -----------------------------------------------
        // 2. OTHERWISE USE API DATA
        // -----------------------------------------------

        if (
            Array.isArray(data?.data)
        ) {
            return data.data;
        }

        if (
            Array.isArray(data)
        ) {
            return data;
        }

        if (
            Array.isArray(data?.loans)
        ) {
            return data.loans;
        }

        // -----------------------------------------------
        // 3. NO DATA
        // -----------------------------------------------

        return [];
    },
    [
        data,
    ]
);
    // ========================================================
    // SEARCH + FILTER
    // ========================================================

    const filteredLoans =
        useMemo(
            () => {

                let result = [
                    ...loans,
                ];

                // =================================================
                // SEARCH
                // =================================================

                const search =
                    searchText
                        .trim()
                        .toLowerCase();

                if (search) {

                    result =
                        result.filter(
                            loan => {

                                const loanId =
                                    String(
                                        loan?.loanId ??
                                        loan?.loanID ??
                                        loan?.applicationId ??
                                        loan?._id ??
                                        ""
                                    )
                                        .toLowerCase();

                                const referenceId =
                                    String(
                                        loan?.referenceId ??
                                        loan?.referenceID ??
                                        ""
                                    )
                                        .toLowerCase();

                                const loanName =
                                    String(
                                        loan?.loanType ??
                                        loan?.loanName ??
                                        loan?.name ??
                                        loan?.category ??
                                        ""
                                    )
                                        .toLowerCase();

                                return (
                                    loanId.includes(
                                        search
                                    ) ||
                                    referenceId.includes(
                                        search
                                    ) ||
                                    loanName.includes(
                                        search
                                    )
                                );
                            }
                        );
                }

                // =================================================
                // LOAN TYPE
                // =================================================

                if (
                    filters.loanTypes.length >
                    0
                ) {

                    result =
                        result.filter(
                            loan => {

                                const category =
                                    String(
                                        loan?.category ??
                                        loan?.loanCategory ??
                                        loan?.loanType ??
                                        ""
                                    )
                                        .trim()
                                        .toUpperCase();

                                return filters.loanTypes.some(
                                    type =>
                                        category ===
                                        String(
                                            type
                                        )
                                            .trim()
                                            .toUpperCase()
                                );
                            }
                        );
                }

                // =================================================
                // STATUS
                // =================================================

                if (
                    filters.statuses.length >
                    0
                ) {

                    result =
                        result.filter(
                            loan => {

                                const status =
                                    String(
                                        loan?.status ??
                                        loan?.loanStatus ??
                                        ""
                                    )
                                        .trim()
                                        .toUpperCase();

                                return filters.statuses.some(
                                    item =>
                                        status ===
                                        String(
                                            item
                                        )
                                            .trim()
                                            .toUpperCase()
                                );
                            }
                        );
                }

                // =================================================
                // ACTIVE LOANS
                // =================================================

                if (
                    filters.loanView ===
                    "ACTIVE"
                ) {

                    result =
                        result.filter(
                            loan => {

                                const status =
                                    String(
                                        loan?.status ??
                                        loan?.loanStatus ??
                                        ""
                                    )
                                        .trim()
                                        .toUpperCase();

                                return ![
                                    "REJECTED",
                                    "CLOSED",
                                    "COMPLETED",
                                    "SETTLED",
                                ].includes(
                                    status
                                );
                            }
                        );
                }

                // =================================================
                // CLOSED LOANS
                // =================================================

                if (
                    filters.loanView ===
                    "CLOSED"
                ) {

                    result =
                        result.filter(
                            loan => {

                                const status =
                                    String(
                                        loan?.status ??
                                        loan?.loanStatus ??
                                        ""
                                    )
                                        .trim()
                                        .toUpperCase();

                                return [
                                    "CLOSED",
                                    "COMPLETED",
                                    "SETTLED",
                                ].includes(
                                    status
                                );
                            }
                        );
                }

                return result;
            },
            [
                loans,
                searchText,
                filters,
            ]
        );

    // ========================================================
    // UI STATE VARIABLES
    // ========================================================

    const loading =
        isLoading ||
        isFetching;

    const error =
        isError &&
        !loading &&
        loans.length === 0;

    const notFound = 
        !loading &&
        !error &&
        filteredLoans.length === 0;

    // ========================================================
    // PULL TO REFRESH
    // ========================================================

    const handleRefresh =
        useCallback(
            async () => {

                try {

                    setRefreshing(
                        true
                    );

                    await refetch();

                } catch (
                    refreshError
                ) {

                    console.log(
                        "Loan history refresh error:",
                        refreshError
                    );

                } finally {

                    setRefreshing(
                        false
                    );

                }
            },
            [
                refetch,
            ]
        );

    // ========================================================
    // APPLY FILTER
    // ========================================================

    const handleApplyFilters =
        useCallback(
            nextFilters => {

                setFilters(
                    nextFilters
                );

                setFilterVisible(
                    false
                );
            },
            []
        );

    // ========================================================
    // RESET FILTER
    // ========================================================

    const handleResetFilters =
        useCallback(
            () => {

                setFilters({

                    loanTypes: [],

                    statuses: [],

                    dateRange:
                        "LAST_30_DAYS",

                    loanView:
                        "ACTIVE",
                });

            },
            []
        );

    // ========================================================
    // LOAN PRESS
    // ========================================================

const handleLoanPress = useCallback(
    loan => {
        const loanId =
            loan?.loanId ??
            loan?.loanID ??
            loan?.applicationId ??
            loan?._id;

        const status =
            loan?.status ??
            loan?.loanStatus ??
            loan?.applicationStatus ??
            "PENDING";

        if (!loanId) {
            return;
        }

        const normalizedStatus =
            String(status)
                .trim()
                .toUpperCase()
                .replaceAll(" ", "_")
                .replaceAll("-", "_");

        navigation.navigate(
            "get-single-loan-detail",
            {
                loanId,
                status: normalizedStatus,
            }
        );
    },
    [navigation]
);

    // ========================================================
    // KEY EXTRACTOR
    // ========================================================

    const keyExtractor =
        useCallback(
            (
                item,
                index
            ) => {

                return String(
                    item?.loanId ??
                    item?.loanID ??
                    item?.applicationId ??
                    item?._id ??
                    index
                );
            },
            []
        );

    // ========================================================
    // RENDER ITEM
    // ========================================================

    const renderItem =
        useCallback(
            ({
                item,
            }) => {

                return (
                    <LoanHistoryCard
                        loan={item}
                        onPress={
                            handleLoanPress
                        }
                    />
                );
            },
            [
                handleLoanPress,
            ]
        );

    // ========================================================
    // EMPTY TITLE
    // ========================================================

    const emptyTitle =
        useMemo(
            () => {

                if (
                    searchText.trim()
                ) {
                    return "No loans found";
                }

                if (
                    filters.loanTypes.length > 0 ||
                    filters.statuses.length > 0
                ) {
                    return "No matching loans";
                }

                if (
                    filters.loanView ===
                    "CLOSED"
                ) {
                    return "No closed loans found";
                }

                return "No loans found";
            },
            [
                searchText,
                filters,
            ]
        );

    // ========================================================
    // EMPTY DESCRIPTION
    // ========================================================

    const emptyDescription =
        useMemo(
            () => {

                if (
                    searchText.trim()
                ) {
                    return "Try searching with another Loan ID or Reference ID.";
                }

                if (
                    filters.loanTypes.length > 0 ||
                    filters.statuses.length > 0
                ) {
                    return "Try changing your filters to see more loan applications.";
                }

                return "Your loan applications will appear here.";
            },
            [
                searchText,
                filters,
            ]
        );

    // ========================================================
    // REFRESH CONTROL
    // ========================================================

    const refreshControl = (
        <RefreshControl
            refreshing={
                refreshing
            }
            onRefresh={
                handleRefresh
            }
            tintColor={
                theme.colors.primary500
            }
        />
    );

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
                    "#F8EBD5",
            }}
        >

            {/* =================================================
                STATUS BAR
            ================================================= */}

            <StatusBar
                translucent={
                    false
                }
                backgroundColor={
                    "#FAF4E9"
                }
                barStyle="dark-content"
            />

            {/* =================================================
                HEADER
            ================================================= */}

            <NewFlowCommonHeader
                title="Loan History"
                onBack={() =>
                    navigation?.goBack?.()
                }
                onNotificationPress={() =>
                    navigation?.navigate?.(
                        "get-notification-screen"
                    )
                }
            />

            {/* =================================================
                SEARCH + FILTER
            ================================================= */}

            <View
                style={{

                    paddingHorizontal:
                        theme.spacing.lg,

                    paddingTop:
                        theme.spacing.md,

                    paddingBottom:
                        theme.spacing.sm,

                    flexDirection:
                        "row",

                    alignItems:
                        "center",

                    backgroundColor:
                        "#F8EBD5",
                }}
            >

                {/* SEARCH */}

                <View
                    style={{

                        flex: 1,

                        height: 52,

                        borderRadius:
                            theme.radius.lg,

                        backgroundColor:
                            theme.colors.white,

                        flexDirection:
                            "row",

                        alignItems:
                            "center",

                        paddingHorizontal:
                            theme.spacing.md,
                    }}
                >

                    <MaterialIcons
                        name="search"
                        size={22}
                        color="#94A3B8"
                    />

                    <TextInput

                        value={
                            searchText
                        }

                        onChangeText={
                            setSearchText
                        }

                        placeholder={
                            "Search Reference ID, Loan ID..."
                        }

                        placeholderTextColor={
                            "#8FA1B7"
                        }

                        style={{

                            flex: 1,

                            marginLeft:
                                theme.spacing.sm,

                            paddingVertical:
                                0,

                            fontSize:
                                theme.typography.b2,

                            fontFamily:
                                theme.fonts.regular,

                            color:
                                "#94A3B8",
                        }}
                    />

                </View>

                {/* FILTER */}

                <TouchableOpacity

                    activeOpacity={
                        0.8
                    }

                    onPress={() =>
                        setFilterVisible(
                            true
                        )
                    }

                    style={{

                        width: 52,

                        height: 52,

                        marginLeft:
                            theme.spacing.sm,

                        borderRadius:
                            theme.radius.lg,

                        backgroundColor:
                            theme.colors.white,

                        alignItems:
                            "center",

                        justifyContent:
                            "center",
                    }}
                >

                    <MaterialIcons
                        name="tune"
                        size={22}
                        color="#94A3B8"
                    />

                </TouchableOpacity>

            </View>

            {/* =================================================
                CONTENT
            ================================================= */}

            <View
                style={{

                    flex: 1,

                    backgroundColor:
                        "#F8EBD5",
                }}
            >

                {/* =================================================
                    LOADING
                ================================================= */}

                {loading ? (

                    <ScrollView
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingBottom:
                                bottomTabHeight +
                                theme.spacing.xxxl,
                        }}
                        refreshControl={
                            refreshControl
                        }
                        showsVerticalScrollIndicator={
                            false
                        }
                    >

                        <LoanHistorySkeleton />

                    </ScrollView>

                ) : error ? (

                    /* =================================================
                        ERROR
                    ================================================= */

                    <ScrollView

                        contentContainerStyle={{

                            flexGrow: 1,

                            justifyContent:
                                "center",

                            paddingHorizontal:
                                theme.spacing.lg,

                            paddingBottom:
                                bottomTabHeight +
                                theme.spacing.xxxl,
                        }}

                        refreshControl={
                            refreshControl
                        }

                        showsVerticalScrollIndicator={
                            false
                        }
                    >

                        <InlineRetry

                            title={
                                "Unable to load loan history"
                            }

                            description={
                                "We couldn't load your loan history right now. Please try again."
                            }

                            buttonText={
                                "Retry"
                            }

                            loading={
                                isFetching
                            }

                            onRetry={
                                refetch
                            }

                            containerStyle={{
                                backgroundColor:
                                    theme.colors.white,
                            }}
                        />

                    </ScrollView>

                ) : notFound ? (

                    /* =================================================
                        NOT FOUND
                    ================================================= */

                    <ScrollView

                        contentContainerStyle={{

                            flexGrow: 1,

                            justifyContent:
                                "center",

                            paddingHorizontal:
                                theme.spacing.lg,

                            paddingTop:
                                theme.spacing.sm,

                            paddingBottom:
                                bottomTabHeight +
                                theme.spacing.xxxl,
                        }}

                        refreshControl={
                            refreshControl
                        }

                        showsVerticalScrollIndicator={
                            false
                        }
                    >

                        <LoanHistoryEmptyState

                            title={
                                emptyTitle
                            }

                            description={
                                emptyDescription
                            }

                        />

                    </ScrollView>

                ) : (

                    /* =================================================
                        LOAN LIST
                    ================================================= */

                    <FlatList

                        data={
                            FAKE_LOAN_HISTORY
                        }

                        keyExtractor={
                            keyExtractor
                        }

                        renderItem={
                            renderItem
                        }

                        showsVerticalScrollIndicator={
                            false
                        }

                        keyboardShouldPersistTaps={
                            "handled"
                        }

                        contentContainerStyle={{

                            paddingHorizontal:
                                theme.spacing.lg,

                            paddingTop:
                                theme.spacing.sm,

                            paddingBottom:
                                bottomTabHeight +
                                theme.spacing.xxxl,
                        }}

                        refreshControl={
                            refreshControl
                        }

                    />

                )}

            </View>

            {/* =================================================
                FILTER SHEET
            ================================================= */}

            <LoanHistoryFilterSheet

                visible={
                    filterVisible
                }

                filters={
                    filters
                }

                onClose={() =>
                    setFilterVisible(
                        false
                    )
                }

                onApply={
                    handleApplyFilters
                }

                onReset={
                    handleResetFilters
                }

            />

        </SafeAreaView>

    );
};

// ============================================================
// EXPORT
// ============================================================

export default memo(
    MyLoanScreen
);