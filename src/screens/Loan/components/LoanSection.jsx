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
 else{
    // step1-apply-loan-personal-detail"
      navigation.navigate(
               "step1-apply-loan-personal-detail",
        {
               loan: loan,
                 loanId: loan?._id,
                    //    documents: documents,
                      }
              );
 }

        const category = loan?.category;

        
    };

    return (

        <View
            style={{
                marginTop:
                    theme.spacing.sm,
             


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

                            backgroundColor: "#fe804a3d",

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

                        backgroundColor: "#fe804a3d",

                    }}
                />

            </View>

            {/* Heading */}

           

            {/* Error */}

            {error && !loading ? (

                <InlineRetry

                    title="Unable to load loans"

                    description="Please try again."

                    loading={isFetching}

                    onRetry={refetch}

                    containerStyle={{
                        width: 'auto',
                      paddingHorizontal:
                            theme.spacing.lg,
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
                            theme.spacing.lg,
                          

                    }}

                    ItemSeparatorComponent={() => (

                        <View
                            style={{
                                height:
                                    theme.spacing.sm,
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