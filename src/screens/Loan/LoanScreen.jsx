import React, {
    useCallback,
    useState,
} from "react";

import {
    FlatList,
    RefreshControl,
    StatusBar,
    View,
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
import { useBottomTabHeight } from '../../navigation/BottomTabHeightContext.jsx'
import HomeScreenHeaderCard from '../Home/components/HomeScreenHeaderCard.jsx'
import CreditScoreCard from "./components/CreditScoreCard.jsx";
import LoanEligibilityBanner from "../../components/common/LoanRegading/LoanEligibilityBanner.jsx";
import ReferEarnCoinCard from "./components/LoanSectionComponents/ReferEarnCoinCard.jsx";
const LoanScreen = () => {


    const { height: bottomTabHeight } = useBottomTabHeight()


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

            <HomeScreenHeaderCard />
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
                    backgroundColor:'#F9EBD5',
                    paddingBottom: bottomTabHeight + theme.spacing.massive,
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
                        {/* <LoanHeader /> */}
                        {/* <View style={{ flex: 1, backgroundColor: '#F9EBD5' }}> */}
                            <CreditScoreCard
                                score={742}
                                maxScore={900}
                                updatedDate="19 Sep 2026"
                                onViewReport={() => {
                                    console.log(
                                        "View Credit Report"
                                    );
                                }}
                            />

                            <View
                                style={{
                                    width: "100%",
                                    paddingTop: theme.spacing.lg,
                                    paddingHorizontal: theme.spacing.lg,

                                }}
                            >
                                <LoanEligibilityBanner
                                    onPress={() => {
                                        // navigation later
                                    }}
                                />
                            </View>

                            <LoanSection />

                            <ReferEarnCoinCard />






                        {/* </View>
                         */}


                    </>

                }

            />

        </SafeAreaView>

    );

};

export default LoanScreen;