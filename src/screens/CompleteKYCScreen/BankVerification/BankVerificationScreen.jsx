import React, {
  useRef,
  useState,
} from "react";

import {
  ScrollView,
  StatusBar,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  useNavigation,
} from "@react-navigation/native";

import { theme } from "../../../theme";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import BankVerificationForm from "./components/BankVerificationForm";
import Footer from "./components/Footer";

import {
  useAddBankAccountMutation,
} from "../../../redux/features/customer/customerApi";

import useHandleMutation from "../../../hooks/useHandleMutation";

import KeyboardAvoidingBottomView
  from "../../../components/common/KeyBoard/KeyboardAvoidingBottomView";


const BankVerificationScreen = () => {

  /* ========================================================= */
  /* NAVIGATION */
  /* ========================================================= */

  const navigation = useNavigation();


  /* ========================================================= */
  /* AUTO SCROLL */
  /* ========================================================= */

  const scrollViewRef = useRef(null);

  const fieldPositions = useRef({});


  const registerField = (key) => (event) => {

    fieldPositions.current[key] =
      event.nativeEvent.layout.y;

  };


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

  const [
    form,
    setForm,
  ] = useState(INITIAL_FORM);


  /* ========================================================= */
  /* VALIDATION ERRORS */
  /* ========================================================= */

  const [
    errors,
    setErrors,
  ] = useState({});


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

  const onChange = (
    key,
    value
  ) => {

    const updatedValue =
      key === "ifscCode"
        ? value.toUpperCase()
        : value;


    /* ========================= */
    /* UPDATE FORM */
    /* ========================= */

    setForm((prev) => ({

      ...prev,

      [key]: updatedValue,

    }));


    /* ========================= */
    /* CLEAR CURRENT ERROR */
    /* ========================= */

    setErrors((prev) => ({

      ...prev,

      [key]: "",

    }));


    /* ======================================================= */
    /* ACCOUNT NUMBER CHANGE */
    /* ======================================================= */

    if (key === "accountNumber") {

      let confirmError = "";

      if (
        form.confirmAccountNumber &&
        updatedValue !==
        form.confirmAccountNumber
      ) {

        confirmError =
          "Account Number does not match";

      }

      setErrors((prev) => ({

        ...prev,

        accountNumber: "",

        confirmAccountNumber:
          confirmError,

      }));

    }


    /* ======================================================= */
    /* CONFIRM ACCOUNT NUMBER */
    /* ======================================================= */

    if (
      key === "confirmAccountNumber"
    ) {

      if (
        updatedValue &&
        updatedValue !==
        form.accountNumber
      ) {

        setErrors((prev) => ({

          ...prev,

          confirmAccountNumber:
            "Account Number does not match",

        }));

      }

    }

  };


  /* ========================================================= */
  /* VALIDATE SINGLE FIELD ON BLUR */
  /* ========================================================= */

  const validateBankField = (
    field,
    value
  ) => {

    let error = "";


    switch (field) {

      /* ========================= */
      /* Bank Name */
      /* ========================= */

      case "bankName":

        if (!value?.trim()) {

          error =
            "Bank Name is required";

        }

        break;


      /* ========================= */
      /* Account Number */
      /* ========================= */

      case "accountNumber":

        if (!value?.trim()) {

          error =
            "Account Number is required";

        }

        break;


      /* ========================= */
      /* Confirm Account Number */
      /* ========================= */

      case "confirmAccountNumber":

        if (!value?.trim()) {

          error =
            "Confirm Account Number is required";

        }

        else if (
          value !==
          form.accountNumber
        ) {

          error =
            "Account Number does not match";

        }

        break;


      /* ========================= */
      /* IFSC */
      /* ========================= */

      case "ifscCode":

        if (!value?.trim()) {

          error =
            "IFSC Code is required";

        }

        else if (
          !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(
            value.toUpperCase()
          )
        ) {

          error =
            "Invalid IFSC Code";

        }

        break;


      default:
        break;

    }


    setErrors((prev) => ({

      ...prev,

      [field]: error,

    }));

  };


  /* ========================================================= */
  /* FORM VALIDATION */
  /* ========================================================= */

  const validate = () => {

    const newErrors = {};


    /* ========================= */
    /* Bank Name */
    /* ========================= */

    if (!form.bankName.trim()) {

      newErrors.bankName =
        "Bank Name is required";

    }


    /* ========================= */
    /* Account Number */
    /* ========================= */

    if (!form.accountNumber.trim()) {

      newErrors.accountNumber =
        "Account Number is required";

    }


    /* ========================= */
    /* Confirm Account Number */
    /* ========================= */

    if (
      !form.confirmAccountNumber.trim()
    ) {

      newErrors.confirmAccountNumber =
        "Confirm Account Number is required";

    }

    else if (
      form.accountNumber !==
      form.confirmAccountNumber
    ) {

      newErrors.confirmAccountNumber =
        "Account Number does not match";

    }


    /* ========================= */
    /* IFSC */
    /* ========================= */

    if (!form.ifscCode.trim()) {

      newErrors.ifscCode =
        "IFSC Code is required";

    }

    else if (
      !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(
        form.ifscCode
      )
    ) {

      newErrors.ifscCode =
        "Invalid IFSC Code";

    }


    return newErrors;

  };


  /* ========================================================= */
  /* SUBMIT */
  /* ========================================================= */

  const onSubmit = async () => {

    const validationErrors =
      validate();


    /* ========================================================= */
    /* VALIDATION ERROR */
    /* ========================================================= */

    if (
      Object.keys(validationErrors).length
    ) {

      setErrors(
        validationErrors
      );


      /* ======================================================= */
      /* AUTO SCROLL TO FIRST ERROR */
      /* ======================================================= */

      const firstErrorField =
        Object.keys(
          validationErrors
        )[0];


      setTimeout(() => {

        const y =
          fieldPositions.current[
            firstErrorField
          ];


        if (y !== undefined) {

          scrollViewRef.current?.scrollTo({

            y: Math.max(
              0,
              y - theme.spacing.lg
            ),

            animated: true,

          });

        }

      }, 100);


      return;

    }


    /* ========================================================= */
    /* CLEAR ERRORS */
    /* ========================================================= */

    setErrors({});


    /* ========================================================= */
    /* API CALL */
    /* ========================================================= */

    await handleMutation({

      apiFunc:
        addBankAccount,

      params: {

        bankName:
          form.bankName,

        // TODO: Replace with logged-in user name
        accountHolderName:
          "Amit",

        accountNumber:
          form.accountNumber,

        ifscCode:
          form.ifscCode,

        branchName:
          "",

        accountType:
          "SAVINGS",

        isPrimary:
          true,

      },

      showSuccess:
        true,

      customSuccessMsg:
        "Bank Added Successfully",

      onSuccess: () => {

        /* ========================= */
        /* RESET FORM */
        /* ========================= */

        setForm(
          INITIAL_FORM
        );


        /* ========================= */
        /* CLEAR ERRORS */
        /* ========================= */

        setErrors({});


        /* ========================= */
        /* NAVIGATE */
        /* ========================= */

        navigation.goBack();

      },

    });

  };


  /* ========================================================= */
  /* UI */
  /* ========================================================= */

  return (

    <SafeAreaView
      style={{
        flex: 1,

        backgroundColor:
          theme.colors.white,
      }}
    >

      <StatusBar
        backgroundColor={
          theme.colors.white
        }

        barStyle={
          theme.statusBar.dark
        }
      />


      <KeyboardAvoidingBottomView
        style={{
          flex: 1,
        }}
      >

        <View
          style={{
            flex: 1,

            paddingHorizontal:
              theme.spacing.xxl,
          }}
        >

          {/* ========================= */}
          {/* HEADER */}
          {/* ========================= */}

          <Header
            title="Quick KYC"
            step="Step 4 of 4"
            onBack={() =>
              navigation.goBack()
            }
          />


          {/* ========================= */}
          {/* FORM */}
          {/* ========================= */}

          <ScrollView
            ref={scrollViewRef}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom:
                theme.spacing.xxxl,
            }}
          >

            <HeroSection />


            <BankVerificationForm
              form={form}
              errors={errors}
              onChange={onChange}
              registerField={registerField}
              validateBankField={
                validateBankField
              }
            />

          </ScrollView>


          {/* ========================= */}
          {/* FOOTER */}
          {/* ========================= */}

          <Footer
            title="Submit KYC"
            loading={isLoading}
            onPress={onSubmit}
          />

        </View>

      </KeyboardAvoidingBottomView>

    </SafeAreaView>
  );
};


export default BankVerificationScreen;