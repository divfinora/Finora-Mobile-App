import React, { useCallback } from "react";

import {
    View,
    Text,
    FlatList,
} from "react-native";

import { theme } from "../../../theme/index";

import LoanCard from "./LoanSectionComponents/LoanCard";
import LoanCardSkeleton from "./LoanSectionComponents/LoanCardSkeleton";

import InlineRetry from "../../../components/common/RetryScreen/InlineRetry";

import {
    useGetAllLoanQuery,
} from "../../../redux/features/customer/customerApi";
import { useNavigation } from '@react-navigation/native'
const LoanSection = () => {
    const navigation = useNavigation()


    const {

        data,

        error,

        isLoading,

        isFetching,

        refetch,

    } = useGetAllLoanQuery();

    const loans =
        data?.data || [];

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

                            if (item.processingType == "INSTANT") {
                                navigation.navigate("apply-instant-loan", {
                                    product: item,
                                });
                            } else if (item.processingType == "MANUAL") {
                                // navigation.navigate("apply-property-loan", {
                                //     product: item,
                                // });
                                navigation.navigate("apply-personal-loan", {
                                    product: item,
                                });
                            }



                        }}
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

            {error ? (

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