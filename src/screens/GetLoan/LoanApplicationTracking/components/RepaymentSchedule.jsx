import React, { memo } from "react";

import {
    View,
    Text,
    FlatList,
} from "react-native";

import { theme } from "../../../../theme";

import RepaymentScheduleItem from "./RepaymentScheduleItem";

const RepaymentSchedule = ({
    schedule = [],
    onPayNow,
}) => {
    const renderItem = ({ item }) => (
        <RepaymentScheduleItem
            item={item}
            onPayNow={onPayNow}
        />
    );

    return (
        <View
            style={{
                minHeight: 730,
                backgroundColor: "#F8F8F8",
                borderWidth: 1,
                borderColor: "#FFD0C0",
                borderRadius: 19,
                padding: 15,
            }}
        >
            <Text
                style={{
                    fontFamily: theme.fonts.semiBold,
                    fontSize: 16,
                    color: "#172033",
                    marginBottom: 14,
                }}
            >
                Repayment Schedule
            </Text>

            <FlatList
                data={schedule}
                renderItem={renderItem}
                keyExtractor={item => String(item.id)}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 10,
                }}
            />
        </View>
    );
};

export default memo(RepaymentSchedule);