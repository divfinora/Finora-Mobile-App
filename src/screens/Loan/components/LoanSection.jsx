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

// Fake/Dummy Loan Data
const FAKE_LOANS = [
    { _id: "1", name: "Personal Loan", maxAmount: 1000000, processingType: "MANUAL" },
    { _id: "2", name: "Gold Loan", maxAmount: 1000000, processingType: "MANUAL" },
    { _id: "3", name: "Instant Loan", maxAmount: 500000, processingType: "INSTANT" },
    { _id: "4", name: "Vehicle Loan", maxAmount: 1500000, processingType: "MANUAL" },
    { _id: "5", name: "Property Loan", maxAmount: 5000000, processingType: "MANUAL" },
    { _id: "6", name: "Education Loan", maxAmount: 2000000, processingType: "MANUAL" },
    { _id: "7", name: "Agricultural Loan", maxAmount: 1000000, processingType: "MANUAL" },
    { _id: "8", name: "Constructional Loan", maxAmount: 3000000, processingType: "MANUAL" },
    { _id: "9", name: "Renovation Loan", maxAmount: 800000, processingType: "MANUAL" },
    { _id: "10", name: "Commercial Loan", maxAmount: 5000000, processingType: "MANUAL" },
];

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
    // const loans = apiLoans.length > 0 ? apiLoans : FAKE_LOANS;
    const loans = FAKE_LOANS;

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
                        onPress={() => {
                            // 1. Check if explicit route exists in item
                            if (item.route) {
                                navigation.navigate(item.route, { product: item });
                                return;
                            }

                            // 2. Dynamic navigation based on loan name or processing type
                            const loanName = item?.name?.toLowerCase() || '';

                            console.log(loanName, "name")

                            if (loanName.includes('gold')) {
                                navigation.navigate('apply-gold-loan', { product: item });
                            } else if (loanName.includes('instant') || item.processingType === 'INSTANT') {
                                navigation.navigate('apply-instant-loan', { product: item });
                            } else if (loanName.includes('property')) {
                                navigation.navigate('apply-property-loan', { product: item });
                            } else if (loanName.includes('commercial')) {
                                navigation.navigate('apply-commercial-loan', { product: item });
                            }
                            else if (loanName.includes('education')) {
                                navigation.navigate('apply-education-loan', { product: item });
                            }
                            else if (loanName.includes('vehicle')) {
                                navigation.navigate('apply-vechicle-loan', { product: item });
                            }
                            else if (loanName.includes('personal')) {
                                navigation.navigate('apply-personal-loan', { product: item });
                            }
                            else if (loanName.includes('agricultural')) {
                                navigation.navigate('apply-agriculture-loan', { product: item });
                            }
                            else if (loanName.includes('renovation')) {
                                navigation.navigate('apply-renovation-loan', { product: item });
                            }
                            else {
                                Alert.alert("not avalable navigation")
                                // Default fallback   navigation.navigate('apply-personal-loan', { product: item });
                            }
                        }}
                        // onPress={() => {

                        //     if (item.processingType == "INSTANT") {
                        //         navigation.navigate("apply-instant-loan", {
                        //             product: item,
                        //         });
                        //     } else if (item.processingType == "MANUAL") {
                        //         // navigation.navigate("apply-property-loan", {
                        //         //     product: item,
                        //         // });
                        //         navigation.navigate("apply-personal-loan", {
                        //             product: item,
                        //         });
                        //     }



                        // }}
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
                            theme.typography.h3,

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
                            theme.colors.gray500,

                        fontSize:
                            theme.typography.b1,

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

                        marginBottom:
                            theme.spacing.massive,

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