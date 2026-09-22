import React, { useRef, useState } from "react";

import {
  ScrollView,
  StatusBar,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import { theme } from "../../../theme";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import PersonalDetailsForm from "./components/PersonalDetailsForm";
import Footer from "./components/Footer";

import useHandleMutation from "../../../hooks/useHandleMutation";

import { useNavigation } from "@react-navigation/native";

import {
  usePersonalDetailsVerificationMutation,
} from "../../../redux/features/customer/customerApi";

import KeyboardAvoidingBottomView from "../../../components/common/KeyBoard/KeyboardAvoidingBottomView";


const PersonalVerificationScreen = ({
}) => {

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
  /* FORM STATE */
  /* ========================================================= */

  const INITIAL_FORM = {

    fullName: "",

    dob: "",

    email: "",

    fatherName: "",

    motherName: "",

    gender: "",

    occupation: "",

    annualIncome: "",

    monthlyIncome: "",

    address: "",

    city: "",

    state: "",

    pinCode: "",

  };


  const [form, setForm] =
    useState(INITIAL_FORM);


  /* ========================================================= */
  /* VALIDATION ERRORS */
  /* ========================================================= */

  const [errors, setErrors] =
    useState({});


  /* ========================================================= */
  /* RTK QUERY MUTATION */
  /* ========================================================= */

  const [
    personalDetails,
    {
      isLoading,
    },
  ] =
    usePersonalDetailsVerificationMutation();


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

    setForm((prev) => {

      const updatedForm = {

        ...prev,

        [key]: value,

      };


      // Auto Calculate Monthly Income

      if (key === "annualIncome") {

        const annual =
          Number(value.replace(/,/g, "")) || 0;


        updatedForm.monthlyIncome =
          annual > 0

            ? Math.floor(
              annual / 12
            ).toString()

            : "";

      }


      return updatedForm;

    });


    setErrors((prev) => ({

      ...prev,

      [key]: "",

    }));

  };


  /* ========================================================= */
  /* HANDLE GENDER */
  /* ========================================================= */

  const onSelectGender = (gender) => {

    onChange(
      "gender",
      gender
    );

  };


  /* ========================================================= */
  /* HANDLE OCCUPATION */
  /* ========================================================= */

  const onSelectOccupation = (
    occupation
  ) => {

    console.log(
      "Selected Occupation:",
      occupation
    );

    onChange(
      "occupation",
      occupation
    );

  };


  /* ========================================================= */
  /* HANDLE ANNUAL INCOME */
  /* ========================================================= */

  const onSelectIncome = (
    income
  ) => {

    console.log(
      "Selected Income:",
      income
    );

    onChange(
      "annualIncome",
      income
    );

  };


  /* ========================================================= */
  /* FORM VALIDATION */
  /* ========================================================= */

  const validatePersonalDetails = () => {

    const newErrors = {};


    /* ---------------------- */
    /* Full Name */
    /* ---------------------- */

    if (!form.fullName.trim()) {

      newErrors.fullName =
        "Full Name is required";

    }


    /* ---------------------- */
    /* DOB */
    /* ---------------------- */

    else if (!form.dob.trim()) {

      newErrors.dob =
        "Date of Birth is required";

    }


    /* ---------------------- */
    /* Email */
    /* ---------------------- */

    if (!form.email.trim()) {

      newErrors.email =
        "Email is required";

    }

    else if (

      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email
      )

    ) {

      newErrors.email =
        "Enter a valid email";

    }


    /* ---------------------- */
    /* Father's Name */
    /* ---------------------- */

    if (!form.fatherName.trim()) {

      newErrors.fatherName =
        "Father Name is required";

    }


    /* ---------------------- */
    /* Mother's Name */
    /* ---------------------- */

    if (!form.motherName.trim()) {

      newErrors.motherName =
        "Mother Name is required";

    }


    /* ---------------------- */
    /* Gender */
    /* ---------------------- */

    if (!form.gender) {

      newErrors.gender =
        "Please select gender";

    }


    /* ---------------------- */
    /* Occupation */
    /* ---------------------- */

    if (!form.occupation) {

      newErrors.occupation =
        "Please select occupation";

    }


    /* ---------------------- */
    /* Annual Income */
    /* ---------------------- */

    if (!form.annualIncome) {

      newErrors.annualIncome =
        "Please select annual income";

    }


    if (!form.monthlyIncome) {

      newErrors.monthlyIncome =
        "Monthly income is required";

    }


    /* ---------------------- */
    /* Address */
    /* ---------------------- */

    if (!form.address.trim()) {

      newErrors.address =
        "Address is required";

    }


    /* ---------------------- */
    /* City */
    /* ---------------------- */

    if (!form.city.trim()) {

      newErrors.city =
        "City is required";

    }


    /* ---------------------- */
    /* State */
    /* ---------------------- */

    if (!form.state.trim()) {

      newErrors.state =
        "State is required";

    }


    /* ---------------------- */
    /* Pin Code */
    /* ---------------------- */

    if (!form.pinCode.trim()) {

      newErrors.pinCode =
        "Pin Code is required";

    }

    else if (
      !/^[0-9]{6}$/.test(
        form.pinCode
      )
    ) {

      newErrors.pinCode =
        "Enter valid Pin Code";

    }


    return newErrors;

  };


  /* ========================================================= */
  /* VALIDATE SINGLE FIELD ON BLUR */
  /* ========================================================= */

  const validatePersonalField = (
    field,
    value
  ) => {

    let error = "";


    switch (field) {

      case "fullName":

        if (!value?.trim()) {

          error =
            "Full Name is required";

        }

        break;


      case "dob":

        if (!value?.trim()) {

          error =
            "Date of Birth is required";

        }

        break;


      case "email":

        if (!value?.trim()) {

          error =
            "Email is required";

        }

        else if (
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            value
          )
        ) {

          error =
            "Enter a valid email";

        }

        break;


      case "fatherName":

        if (!value?.trim()) {

          error =
            "Father Name is required";

        }

        break;


      case "motherName":

        if (!value?.trim()) {

          error =
            "Mother Name is required";

        }

        break;


      case "address":

        if (!value?.trim()) {

          error =
            "Address is required";

        }

        break;


      case "city":

        if (!value?.trim()) {

          error =
            "City is required";

        }

        break;


      case "state":

        if (!value?.trim()) {

          error =
            "State is required";

        }

        break;


      case "pinCode":

        if (!value?.trim()) {

          error =
            "Pin Code is required";

        }

        else if (
          !/^[0-9]{6}$/.test(value)
        ) {

          error =
            "Enter valid Pin Code";

        }

        break;


      case "annualIncome":

        if (!value?.trim()) {

          error =
            "Please select annual income";

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
  /* SUBMIT */
  /* ========================================================= */

  const onSubmit = async () => {

    console.log(
      "========= FORM DATA ========="
    );

    console.log(form);


    /* ========================================================= */
    /* VALIDATION */
    /* ========================================================= */

    const validationErrors =
      validatePersonalDetails();


    if (
      Object.keys(validationErrors).length
    ) {

      setErrors(validationErrors);


      /* ========================================================= */
      /* AUTO SCROLL TO FIRST ERROR */
      /* ========================================================= */

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

      apiFunc: personalDetails,

      params: {

        "aadhaarNumber":
          "123456789012",

        "aadhaarVerified":
          true,


        "panNumber":
          "ABCDE1234F",

        "panVerified":
          true,


        fullName:
          form.fullName,

        dob:
          form.dob,

        email:
          form.email,

        fatherName:
          form.fatherName,

        motherName:
          form.motherName,

        gender:
          form.gender,

        occupation:
          form.occupation,


        annualIncome:
          Number(
            form.annualIncome
          ),

        monthlyIncome:
          Number(
            form.monthlyIncome
          ),


        addressLine:
          form.address,

        city:
          form.city,

        state:
          form.state,

        pinCode:
          form.pinCode,


        method:
          "MANUAL",

      },


      showSuccess: true,


      /* ========================================================= */
      /* SUCCESS */
      /* ========================================================= */

      onSuccess: () => {

        setForm(
          INITIAL_FORM
        );

        setErrors({});

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


          {/* ========================================================= */}
          {/* HEADER */}
          {/* ========================================================= */}

          <Header
            title="Quick KYC"
            step="Step 3 of 4"
            onBack={() =>
              navigation.goBack()
            }
          />


          {/* ========================================================= */}
          {/* FORM SCROLL */}
          {/* ========================================================= */}

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


            <PersonalDetailsForm

              form={form}

              errors={errors}

              onChange={onChange}

              onSelectGender={
                onSelectGender
              }

              onSelectOccupation={
                onSelectOccupation
              }

              onSelectIncome={
                onSelectIncome
              }

              registerField={
                registerField
              }

              validatePersonalField={
                validatePersonalField
              }

            />

          </ScrollView>


          {/* ========================================================= */}
          {/* FOOTER */}
          {/* ========================================================= */}

          <Footer
            loading={isLoading}
            onPress={onSubmit}
          />


        </View>

      </KeyboardAvoidingBottomView>

    </SafeAreaView>

  );

};


export default PersonalVerificationScreen;