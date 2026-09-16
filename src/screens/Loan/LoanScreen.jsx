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
import HowItWorks from './components/HowItWorks.jsx'
import OffersJustForYou from './components/OffersJustForYou.jsx'
import { useGetAllLoanQuery } from "../../redux/features/customer/customerApi.js";
import LoanBannerCard from "../Home/components/LoanBannerCard.jsx";

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
            edges={["left", 'right']}
            style={{

                flex: 1,
                backgroundColor:
                    '#FFFAF2'
            }}
        >

            <StatusBar
                translucent={true}
                backgroundColor="transparent"


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


                        <LoanBannerCard
                        MarginTop={theme.spacing.lg}
                        ContainerPaddingHorizontal={theme.spacing.xl}
                            ContainerPaddingVertical={theme.spacing.xl} />
                        <LoanSection />


                        <HowItWorks />


                        <OffersJustForYou />





                    </>

                }

            />

        </SafeAreaView>

    );

};

export default LoanScreen;