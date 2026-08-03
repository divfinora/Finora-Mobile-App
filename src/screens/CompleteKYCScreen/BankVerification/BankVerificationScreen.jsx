 

import {
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import { theme } from "../../../theme";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import BankVerificationForm from "./components/BankVerificationForm";
import Footer from "./components/Footer";
import { useAddBankAccountMutation } from "../../../redux/features/customer/customerApi";
import useHandleMutation from "../../../hooks/useHandleMutation";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
const BankVerificationScreen = ({
 

 
}) => {

/* ========================================================= */
/* NAVIGATION */
/* ========================================================= */

const navigation = useNavigation();

/* ========================================================= */
/* INITIAL FORM */
/* ========================================================= */

const INITIAL_FORM = {
  bankName: "",
  accountNumber: "",
  confirmAccountNumber: "",
  ifscCode: "",
};

/* ========================================================= */
/* FORM STATE */
/* ========================================================= */

const [form, setForm] = useState(INITIAL_FORM);

/* ========================================================= */
/* VALIDATION ERRORS */
/* ========================================================= */

const [errors, setErrors] = useState({});

/* ========================================================= */
/* RTK QUERY MUTATION */
/* ========================================================= */

const [
  addBankAccount,
  {
    isLoading,
  },
] = useAddBankAccountMutation();

/* ========================================================= */
/* COMMON MUTATION HANDLER */
/* ========================================================= */

const {
  handleMutation,
} = useHandleMutation();

/* ========================================================= */
/* HANDLE INPUT CHANGE */
/* ========================================================= */

const onChange = (key, value) => {

  setForm((prev) => ({

    ...prev,

    [key]: value,

  }));

  setErrors((prev) => ({

    ...prev,

    [key]: "",

  }));
};

/* ========================================================= */
/* FORM VALIDATION */
/* ========================================================= */

const validate = () => {

  const newErrors = {};

  /* ---------------------- */
  /* Bank Name */
  /* ---------------------- */

  if (!form.bankName.trim()) {
    newErrors.bankName = "Bank Name is required";
  }

  /* ---------------------- */
  /* Account Number */
  /* ---------------------- */

  if (!form.accountNumber.trim()) {
    newErrors.accountNumber = "Account Number is required";
  }

  /* ---------------------- */
  /* Confirm Account Number */
  /* ---------------------- */

  if (!form.confirmAccountNumber.trim()) {
    newErrors.confirmAccountNumber =
      "Confirm Account Number is required";
  }

  else if (
    form.accountNumber !== form.confirmAccountNumber
  ) {
    newErrors.confirmAccountNumber =
      "Account Number does not match";
  }

  /* ---------------------- */
  /* IFSC Code */
  /* ---------------------- */

  if (!form.ifscCode.trim()) {
    newErrors.ifscCode = "IFSC Code is required";
  }

  else if (
    !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifscCode)
  ) {
    newErrors.ifscCode = "Invalid IFSC Code";
  }

  return newErrors;
};

/* ========================================================= */
/* HANDLE SUBMIT */
/* ========================================================= */

const onSubmit = async () => {

  const validationErrors = validate();

  if (Object.keys(validationErrors).length) {

    setErrors(validationErrors);

    return;
  }

  setErrors({});

  await handleMutation({

    apiFunc: addBankAccount,

    params: {

      bankName: form.bankName,

      // TODO: Replace with logged-in user name
      accountHolderName: "Amit",

      accountNumber: form.accountNumber,

      ifscCode: form.ifscCode,

      branchName: "",

      accountType: "SAVINGS",

      isPrimary: true,

    },

    showSuccess: true,

    customSuccessMsg: "Bank Added Successfully",

    onSuccess: () => {

      /* Reset Form */

      setForm(INITIAL_FORM);

      /* Clear Errors */

      setErrors({});

      /* Navigate */

      navigation.navigate("kyc-success-screen");

    },

  });

};
 
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.white,
      }}
    >
      <StatusBar
        backgroundColor={theme.colors.white}
        barStyle={theme.statusBar.dark}
      />

      <KeyboardAvoidingView
        style={{
          flex: 1,
        }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: theme.spacing.xxl,
          }}
        >
          <Header
            title="Quick KYC"
            step="Step 4 of 4"
             onBack={() => navigation.goBack()}
          />

          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: theme.spacing.xxxl,
            }}
          >
            <HeroSection />

            <BankVerificationForm
              form={form}
              errors={errors}
              onChange={onChange}
            />

            <Footer
              title="Submit KYC"
         loading={isLoading}
              onPress={onSubmit}
            />
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default BankVerificationScreen;