import React, { useCallback } from "react";

import {
    View,
    Text,
    FlatList,
    Alert,
} from "react-native";



import LoanCard from "./LoanSectionComponents/LoanCard";
import LoanCardSkeleton from "./LoanSectionComponents/LoanCardSkeleton";

import InlineRetry from "../../../components/common/RetryScreen/InlineRetry";

import {
    useGetAllLoanQuery,
} from "../../../redux/features/customer/customerApi";
import { useNavigation } from '@react-navigation/native'
import { theme } from "../../../theme";



const LoanSection = () => {
    const navigation = useNavigation()


    const {

        data,

        error,

        isLoading,

        isFetching,

        refetch,

    } = useGetAllLoanQuery();

    // Fallback to FAKE_LOANS if API data is empty
    const apiLoans = data?.data || [];
    //   const loans = apiLoans.length > 0 ? apiLoans : FAKE_LOANS;
    const loans = apiLoans;
    //   const loans = FAKE_LOANS;

    const loading =
        isLoading || isFetching;




    const renderItem =
        useCallback(

            ({ item }) => {

                if (loading) {

                    return (
                        <LoanCardSkeleton />
                    );

                }

                return (
                    <LoanCard
                        onPress={() => handleLoanPress(item)}

                        loan={item}
                    />
                );

            },

            [loading]

        );

    const keyExtractor =
        useCallback(

            (item, index) =>

                item?._id ||
                index.toString(),

            []

        );



    const handleLoanPress = (item) => {
        console.log("LOAN API ITEM:", item);

        // ==========================================
        // 1. MULTIPLE LOANS
        // ==========================================

        const loanCount =
            item?.loanCount ??
            item?.types?.reduce(
                (total, type) =>
                    total + (type?.loanCount || 0),
                0
            );

        if (loanCount > 1) {

            navigation.navigate(
                "loan-category-screen",
                {
                    category: item?.category,
                    categoryName: item?.name,
                }
            );

            return;
        }

        // ==========================================
        // 2. SINGLE LOAN
        // ==========================================

        const loan = item?.loan;

        if (!loan) {
            Alert.alert(
                "Loan Unavailable",
                "Loan details are not available."
            );
            return;
        }

        // ==========================================
        // DYNAMIC DOCUMENTS
        // ==========================================

        const documents = Array.isArray(loan?.documents)
            ? loan.documents
            : [];

        console.log("LOAN DOCUMENTS:", documents);

        // ==========================================
        // 3. PROCESSING TYPE
        // ==========================================

        if (loan.processingType === "INSTANT") {

            navigation.navigate(
                "apply-instant-loan",
                {
                    product: loan,
                    productId: loan?._id,
                    documents: documents,
                }
            );

            return;
        }

        // ==========================================
        // 4. MANUAL LOAN
        // ==========================================

        const category = loan?.category;

        switch (category) {

            case "GOLD":

                navigation.navigate(
                    "apply-gold-loan",
                    {
                        product: loan,
                        productId: loan?._id,
                        documents: documents,
                    }
                );

                break;


            case "PROPERTY":

                navigation.navigate(
                    "apply-property-loan",
                    {
                        product: loan,
                        productId: loan?._id,
                        documents: documents,
                    }
                );

                break;


            case "VEHICLE":

                navigation.navigate(
                    "apply-vechicle-loan",
                    {
                        product: loan,
                        productId: loan?._id,
                        documents: documents,
                    }
                );

                break;


            case "AGRICULTURE":

                navigation.navigate(
                    "apply-agriculture-loan",
                    {
                        product: loan,
                        productId: loan?._id,
                        documents: documents,
                    }
                );

                break;


            case "RENOVATION":

                navigation.navigate(
                    "apply-renovation-loan",
                    {
                        product: loan,
                        productId: loan?._id,
                        documents: documents,
                    }
                );

                break;


            case "COMMERCIAL":

                navigation.navigate(
                    "apply-commercial-loan",
                    {
                        product: loan,
                        productId: loan?._id,
                        documents: documents,
                    }
                );

                break;


            case "PERSONAL":

                navigation.navigate(
                    "apply-personal-loan",
                    {
                        product: loan,
                        productId: loan?._id,
                        documents: documents,
                    }
                );

                break;


            case "EDUCATION":

                navigation.navigate(
                    "apply-education-loan",
                    {
                        product: loan,
                        productId: loan?._id,
                        documents: documents,
                    }
                );

                break;


            case "HOME":

                navigation.navigate(
                    "apply-home-loan",
                    {
                        product: loan,
                        productId: loan?._id,
                        documents: documents,
                    }
                );

                break;


            default:

                Alert.alert(
                    "Loan Unavailable",
                    "This loan is currently not available."
                );

        }
    };

    return (

        <View
            style={{
                marginTop:
                    theme.spacing.xxxl,


            }}
        >

            {/* Explore */}

            {/* Explore More Loan */}

            <View
                style={{

                    flexDirection: "row",

                    alignItems: "center",

                    paddingHorizontal: theme.spacing.xl,

                    marginBottom: theme.spacing.xl,

                }}
            >

                {/* Left Line */}

                <View
                    style={{

                        flex: 1,

                        height: 1,

                        backgroundColor: "#F4DFC5",

                    }}
                />

                {/* Text */}

                <Text
                    style={{

                        marginHorizontal: theme.spacing.md,

                        color: theme.colors.primary500,

                        fontSize: theme.typography.b3,

                        fontFamily: theme.fonts.bold,

                        textTransform: "uppercase",

                    }}
                >
                    ◀ EXPLORE MORE LOAN ▶
                </Text>

                {/* Right Line */}

                <View
                    style={{

                        flex: 1,

                        height: 1,

                        backgroundColor: "#F4DFC5",

                    }}
                />

            </View>

            {/* Heading */}

            <View
                style={{
                    paddingHorizontal:
                        theme.spacing.xl,

                    marginBottom:
                        theme.spacing.lg,
                }}
            >

                <Text
                    style={{

                        color:
                            theme.colors.navy900,

                        fontSize:
                            theme.typography.h4,

                        fontFamily:
                            theme.fonts.headingBold,

                    }}
                >
                    LOANS
                </Text>

                <Text
                    style={{

                        marginTop: 2,

                        color:
                            '#64748B',

                        fontSize:
                            theme.typography.b2,

                        fontFamily:
                            theme.fonts.medium,

                    }}
                >
                    Quick Loans, Endless Possibilities
                </Text>

            </View>

            {/* Error */}

            {error && apiLoans.length === 0 ? (

                <InlineRetry

                    title="Unable to load loans"

                    description="Please try again."

                    loading={isFetching}

                    onRetry={refetch}

                    containerStyle={{
                        width: 'auto',
                        marginHorizontal:
                            theme.spacing.xl,
                        borderWidth: 0.1,

                        ...theme.shadows.card,

                    }}

                />

            ) : (

                <FlatList

                    scrollEnabled={false}

                    numColumns={2}

                    data={
                        loading
                            ? Array.from({
                                length: 8,
                            })
                            : loans
                    }

                    renderItem={
                        renderItem
                    }

                    keyExtractor={
                        keyExtractor
                    }

                    columnWrapperStyle={{

                        justifyContent:
                            "space-between",

                        paddingHorizontal:
                            theme.spacing.xl,

                    }}

                    ItemSeparatorComponent={() => (

                        <View
                            style={{
                                height:
                                    theme.spacing.lg,
                            }}
                        />

                    )}

                    contentContainerStyle={{

                        paddingBottom:
                            theme.spacing.massive,

                    }}

                    showsVerticalScrollIndicator={
                        false
                    }

                    ListEmptyComponent={

                        !loading && (

                            <Text
                                style={{

                                    textAlign:
                                        "center",

                                    color:
                                        theme.colors.gray500,

                                    fontFamily:
                                        theme.fonts.medium,

                                    marginTop:
                                        theme.spacing.massive,

                                }}
                            >
                                No Loan Products Found
                            </Text>

                        )

                    }

                />

            )}

        </View>

    );

};

export default LoanSection;