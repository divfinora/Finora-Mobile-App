import React, { memo, useCallback } from "react";
import {
    StatusBar,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import NewFlowCommonHeader from
    "../../../components/common/BackButton/NewFlowCommonHeader";

import { theme } from "../../../theme";

import LoanDisbursedDetails from
    "./components/LoanDisbursedDetails";

const DissbursadlaonDetail = ({
    navigation,
    route,
}) => {
    const loanId = route?.params?.loanId;

    const loan = route?.params?.loan ?? {};

    const handleBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const handleNotification = useCallback(() => {
        navigation.navigate("get-notification-screen");
    }, [navigation]);

    const handleViewEmiDetails = useCallback(() => {
        navigation.navigate('loan-emi-details-get-single-loan-detail')
        // Yahan apne existing EMI Details screen ka route connect karna.
    }, [navigation, loanId]);

    return (
        <SafeAreaView
            edges={["left", "right", "bottom"]}
            style={{
                flex: 1,
                backgroundColor: "#F9EBD5",
            }}
        >
            <StatusBar
                translucent={
                    false
                }
                backgroundColor={
                    "#FAF4E9"
                }
                barStyle="dark-content"
            />

            <NewFlowCommonHeader
                title="Disbursed Details"
                onBack={handleBack}
                onNotificationPress={handleNotification}
            />

            <LoanDisbursedDetails
                loan={loan}
                loanId={loanId}
                onViewEmiDetails={handleViewEmiDetails}
            />
        </SafeAreaView>
    );
};

export default memo(DissbursadlaonDetail);