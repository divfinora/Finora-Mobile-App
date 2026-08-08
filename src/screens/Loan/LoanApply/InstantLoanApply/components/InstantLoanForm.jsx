import React,
{
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import {
    IndianRupee,
} from "lucide-react-native";

import CommonInput from "../../../../../components/common/Input/CommonInput";





import { theme } from "../../../../../theme";



const InstantLoanForm = ({
    errors,
    form,
    setForm,
    setErrors

}) => {


    const amountOptions = useMemo(
        () => [25000, 50000, 100000, 200000, 500000, 1000000],
        []
    );

    const tenureOptions = useMemo(
        () => [6, 12, 18, 24, 36, 48],
        []
    );
















 return (
  <View
    style={{
      marginTop: theme.spacing.xxxl,
    }}
  >
    {/* ================= Loan Amount ================= */}

    <Text
      style={{
        color: theme.colors.navy900,
        fontSize: theme.typography.b1,
        fontFamily: theme.fonts.bold,
        marginBottom: theme.spacing.lg,
      }}
    >
      Loan Amount Required
      <Text style={{ color: theme.colors.error }}> *</Text>
    </Text>

    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {amountOptions.map((item) => (
        <TouchableOpacity
          key={item}
          activeOpacity={0.9}
          onPress={() => {
            setForm((prev) => ({
              ...prev,
              amount: item,
            }));

            setErrors((prev) => ({
              ...prev,
              amount: "",
            }));
          }}
          style={{
            width: "31.5%",
            height: 54,
            marginBottom: theme.spacing.md,
            borderRadius: 12,
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            borderColor:
              Number(form?.amount) === item
                ? theme.colors.primary500
                : theme.colors.gray200,
            backgroundColor:
              Number(form?.amount) === item
                ? theme.colors.primary50
                : theme.colors.white,
          }}
        >
          <Text
            style={{
              color:
                Number(form?.amount) === item
                  ? theme.colors.primary500
                  : theme.colors.navy700,
              fontFamily: theme.fonts.medium,
              fontSize: theme.typography.b2,
            }}
          >
            ₹{item.toLocaleString()}
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    <CommonInput
      containerStyle={{
        marginTop: theme.spacing.sm,
      }}
         inputContainerStyle={{borderWidth:0.3, borderColor:"#48484a58" }}
      placeholder="Enter custom amount"
      keyboardType="numeric"
      value={String(form?.amount ?? "")}
      error={errors.amount}
      onChangeText={(text) => {
        setForm((prev) => ({
          ...prev,
          amount: text,
        }));

        setErrors((prev) => ({
          ...prev,
          amount: "",
        }));
      }}
      leftIcon={
        <IndianRupee
          size={18}
          color={theme.colors.gray500}
        />
      }
    />

    {/* ================= Loan Tenure ================= */}

    <Text
      style={{
        color: theme.colors.navy900,
        fontSize: theme.typography.b1,
        fontFamily: theme.fonts.bold,
        marginBottom: theme.spacing.lg,
      }}
    >
      Loan Tenure
      <Text style={{ color: theme.colors.error }}> *</Text>
    </Text>

    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {tenureOptions.map((item) => (
        <TouchableOpacity
          key={item}
          activeOpacity={0.9}
          onPress={() => {
            setForm((prev) => ({
              ...prev,
              tenure: item,
            }));

            setErrors((prev) => ({
              ...prev,
              tenure: "",
            }));
          }}
          style={{
            width: "31.5%",
            height: 54,
            marginBottom: theme.spacing.md,
            borderRadius: 12,
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            borderColor:
              Number(form?.tenure) === item
                ? theme.colors.primary500
                : theme.colors.gray200,
            backgroundColor:
              Number(form?.tenure) === item
                ? theme.colors.primary50
                : theme.colors.white,
          }}
        >
          <Text
            style={{
              color:
                Number(form?.tenure) === item
                  ? theme.colors.primary500
                  : theme.colors.navy700,
              fontFamily: theme.fonts.medium,
              fontSize: theme.typography.b2,
            }}
          >
            {item} months
          </Text>
        </TouchableOpacity>
      ))}
    </View>

    {!!errors.tenure && (
      <Text
        style={{
          marginTop: 4,
          marginBottom: theme.spacing.lg,
          color: theme.colors.error,
          fontSize: 12,
          fontFamily: theme.fonts.medium,
        }}
      >
        {errors.tenure}
      </Text>
    )}

    {/* ================= Loan Purpose ================= */}

  {/* ================= Loan Purpose ================= */}

<CommonInput
  label="Loan Purpose"
   
  placeholder="Briefly describe why you need this loan"

  value={form?.purpose}
   

  multiline
  numberOfLines={5}

  inputContainerStyle={{
   
 
 borderWidth:0.3, borderColor:"#48484a58"  ,
    minHeight: 120,
    alignItems: "flex-start",
    paddingTop: 14,
    
  }}

  inputStyle={{
    minHeight: 100,
    textAlignVertical: "top", // Android
    paddingVertical: 0,
  }}

  onChangeText={(text) => {
    setForm((prev) => ({
      ...prev,
      purpose: text,
    }));

    setErrors((prev) => ({
      ...prev,
      purpose: "",
    }));
  }}
/>

    {/* ================= Preferred EMI ================= */}

    
  </View>
);

};

export default InstantLoanForm;