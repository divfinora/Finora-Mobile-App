import React, {
  memo,
  useMemo,
} from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { theme } from "../../../theme";

import LoanCard from "./LoanCard";

const LoanSection = ({ onViewAll }) => {

  const loanData = useMemo(
    () => [
      {
        id: "1",
        title: "Personal Loan",
        subtitle: "Get instant approval with minimum documentation.",
        backgroundColor: "#5B6CFF",
        image: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
      },
      {
        id: "2",
        title: "Business Loan",
        subtitle: "Expand your business with flexible EMI options.",
        backgroundColor: "#FF8C42",
        image: "https://cdn-icons-png.flaticon.com/512/1995/1995574.png",
      },
      {
        id: "3",
        title: "Home Loan",
        subtitle: "Own your dream home with attractive interest rates.",
        backgroundColor: "#16A34A",
        image: "https://cdn-icons-png.flaticon.com/512/609/609803.png",
      },
    ],
    []
  );

  const renderItem = ({ item }) => (
    <LoanCard
      title={item.title}
      subtitle={item.subtitle}
      image={item.image}
      backgroundColor={item.backgroundColor}
      onPress={() => { }}
    />
  );

  return (
    <View
      style={{
        marginBottom: theme.spacing.xxxl,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: theme.spacing.lg,
        }}
      >
        <Text
          style={{
            color: theme.colors.navy900,
            fontSize: theme.typography.h3,
            fontFamily: theme.fonts.headingBold,
          }}
        >
          Popular Loans
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onViewAll}
        >
          <Text
            style={{
              color: theme.colors.primary500,
              fontSize: theme.typography.b2,
              fontFamily: theme.fonts.semiBold,
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        horizontal
        data={loanData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingRight: theme.spacing.md,
        }}
      />
    </View>
  );
};

export default memo(LoanSection);