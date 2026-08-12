import React, {
    useCallback,
    useState,
} from "react";

import {
    FlatList,
    RefreshControl,
    StatusBar,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "../../theme";
import LoanHeader from './components/LoanHeader'
import LoanSection from './components/LoanSection.jsx'
import UpiCard from './components/UpiCard.jsx'
import { useGetAllLoanQuery } from "../../redux/features/customer/customerApi.js";

const LoanScreen = () => {
    const {
        refetch: refetchLoans,
    } = useGetAllLoanQuery();
    const [
        refreshing,
        setRefreshing,
    ] = useState(false);

    const onRefresh = useCallback(async () => {

        setRefreshing(true);

        try {

            await refetchLoans();

        } finally {

            setRefreshing(false);

        }

    }, [refetchLoans]);

    return (

        <SafeAreaView
            edges={["left", "bottom", 'right']}
            style={{

                flex: 1,
                backgroundColor:
                    '#FFFAF2'
            }}
        >

            <StatusBar
                translucent={false}
                backgroundColor={
                    theme.statusBar.backgroundColor
                }
                barStyle={
                    theme.statusBar.dark
                }
            />

            <FlatList

                data={[]}

                keyExtractor={(_, index) =>
                    index.toString()
                }

                renderItem={null}

                showsVerticalScrollIndicator={
                    false
                }

                contentContainerStyle={{
                    paddingBottom:
                        theme.spacing.massive,
                }}

                refreshControl={

                    <RefreshControl

                        refreshing={
                            refreshing
                        }

                        onRefresh={
                            onRefresh
                        }

                        colors={[
                            theme.colors.primary500,
                        ]}

                        tintColor={
                            theme.colors.primary500
                        }

                    />

                }

                ListHeaderComponent={

                    <>
                        <LoanHeader />
                        <LoanSection />
                        {/* LoanHeader */}

                        <UpiCard />
{/* <PropertyLoanApplyScreen /> */}
                        {/* BannerSlider */}



                        {/* ReferEarn */}

                        {/* How It Works */}

                        {/* Offers */}

                    </>

                }

            />

        </SafeAreaView>

    );

};

export default LoanScreen;