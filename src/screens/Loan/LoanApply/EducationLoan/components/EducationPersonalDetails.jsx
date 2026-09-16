import React, {
  useState,
} from "react";

import {
  View,
  TouchableOpacity,
} from "react-native";

import {
  CalendarDays,
} from "lucide-react-native";

import DateTimePicker
  from "@react-native-community/datetimepicker";

import CommonInput
  from "../../../../../components/common/Input/CommonInput";

import {
  theme,
} from "../../../../../theme";

import {
  validatePersonalField,
} from "../utils/educationLoanHelpers";


const EducationPersonalDetails = ({
  formData,
  updateFormData,
  errors,
  setErrors,
  clearFieldError,
  registerFieldPosition,
  scrollContentRef,
}) => {

  // =====================================================
  // COMMON STYLES
  // =====================================================

  // LABEL STYLE
  const  personalLabelStyle = {
    fontFamily:
      theme.fonts.medium,

   

    fontSize:
      14,

    lineHeight:
      14,

    color:
      theme.colors.gray700,
  };


  // INPUT CONTAINER STYLE
  const personalInputContainerStyle = {
    ...theme.input?.inputBorder,

    height:
      56,

    minHeight:
      56,

    backgroundColor:
      "#F5F5F7",

    borderRadius:
      12,

    paddingHorizontal:
      16,
  };


  // INPUT TEXT STYLE
  const personalInputStyle = {
    fontFamily:
      theme.fonts.semiBold,

    

    fontSize:
      16,

    lineHeight:
      16,

    color:
      theme.colors.black,

    minHeight:
      56,

    paddingVertical:
      0,
  };


  // ERROR STYLE
  const personalErrorStyle = {
    fontFamily:
      theme.fonts.medium,

  

    fontSize:
      12,

    lineHeight:
      14,

    color:
      theme.colors.error,

    marginTop:
      theme.spacing.xs,
  };


  // =====================================================
  // COMMON STYLE PROPS
  // =====================================================

  const commonInputStyleProps = {
    labelStyle:
      personalLabelStyle,

    inputContainerStyle:
      personalInputContainerStyle,

    inputStyle:
      personalInputStyle,

    errorStyle:
      personalErrorStyle,
  };


  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDate = (
    date
  ) => {

    if (!date) {
      return "";
    }


    const day =
      String(
        date.getDate()
      ).padStart(
        2,
        "0"
      );


    const month =
      String(
        date.getMonth() + 1
      ).padStart(
        2,
        "0"
      );


    const year =
      date.getFullYear();


    return `${day}/${month}/${year}`;
  };


  // =====================================================
  // INITIAL DATE
  // =====================================================

  const getInitialDate = () => {

    if (
      !formData?.dateOfBirth
    ) {
      return new Date(
        2000,
        0,
        1
      );
    }


    const parts =
      String(
        formData.dateOfBirth
      ).split("/");


    if (
      parts.length === 3
    ) {

      const day =
        Number(
          parts[0]
        );

      const month =
        Number(
          parts[1]
        ) - 1;


      const year =
        Number(
          parts[2]
        );


      const date =
        new Date(
          year,
          month,
          day
        );


      if (
        !isNaN(
          date.getTime()
        )
      ) {
        return date;
      }
    }


    return new Date(
      2000,
      0,
      1
    );
  };


  // =====================================================
  // DATE PICKER STATE
  // =====================================================

  const [
    showDatePicker,
    setShowDatePicker,
  ] = useState(false);


  const [
    selectedDate,
    setSelectedDate,
  ] = useState(
    getInitialDate()
  );


  // =====================================================
  // DATE CHANGE
  // =====================================================

  const handleDateChange = (
    event,
    date
  ) => {

    setShowDatePicker(
      false
    );


    if (!date) {
      return;
    }


    setSelectedDate(
      date
    );


    updateFormData(
      "dateOfBirth",
      formatDate(date)
    );


    clearFieldError?.(
      "dateOfBirth"
    );
  };


  // =====================================================
  // FIELD CHANGE
  // =====================================================

  const handleFieldChange = (
    field,
    value
  ) => {

    updateFormData(
      field,
      value
    );


    if (
      errors?.[field]
    ) {
      clearFieldError?.(
        field
      );
    }
  };


  // =====================================================
  // FIELD BLUR VALIDATION
  //
  // Validation rules helper mein hain.
  // Yahan koi regex / validation rule nahi.
  // =====================================================

  const handleFieldBlur = (
    field
  ) => {

    const error =
      validatePersonalField(
        field,
        formData
      );


    setErrors?.(
      (previous) => {

        const next = {
          ...previous,
        };


        if (error) {

          next[field] =
            error;

        } else {

          delete next[field];
        }


        return next;
      }
    );
  };


  // =====================================================
  // FULL NAME
  // =====================================================

  const handleFullName = (
    value
  ) => {

    const cleaned =
      value.replace(
        /[^A-Za-z\s.'-]/g,
        ""
      );


    handleFieldChange(
      "fullName",
      cleaned
    );
  };


  // =====================================================
  // MOBILE
  // =====================================================

  const handleMobile = (
    value
  ) => {

    const cleaned =
      value
        .replace(
          /\D/g,
          ""
        )
        .slice(
          0,
          10
        );


    handleFieldChange(
      "mobileNumber",
      cleaned
    );
  };


  // =====================================================
  // EMAIL
  // =====================================================

  const handleEmail = (
    value
  ) => {

    handleFieldChange(
      "email",
      value
    );
  };


  // =====================================================
  // AADHAAR
  // =====================================================

  const handleAadhaar = (
    value
  ) => {

    const cleaned =
      value
        .replace(
          /\D/g,
          ""
        )
        .slice(
          0,
          12
        );


    handleFieldChange(
      "aadhaarNumber",
      cleaned
    );
  };


  // =====================================================
  // PAN
  // =====================================================

  const handlePan = (
    value
  ) => {

    const cleaned =
      value
        .replace(
          /[^a-zA-Z0-9]/g,
          ""
        )
        .toUpperCase()
        .slice(
          0,
          10
        );


    handleFieldChange(
      "panNumber",
      cleaned
    );
  };


  // =====================================================
  // PIN CODE
  // =====================================================

  const handlePincode = (
    value
  ) => {

    const cleaned =
      value
        .replace(
          /\D/g,
          ""
        )
        .slice(
          0,
          6
        );


    handleFieldChange(
      "pincode",
      cleaned
    );
  };


  // =====================================================
  // UI
  // =====================================================
  
  return (
    <View>

      {/* =================================================
          1. FULL NAME
      ================================================= */}

      <CommonInput
        label="Full Name"

        required

        placeholder="Enter full name"

        value={
          formData?.fullName ||
          ""
        }

        onChangeText={
          handleFullName
        }

        onBlur={() =>
          handleFieldBlur(
            "fullName"
          )
        }

        error={
          errors?.fullName
        }

        {...commonInputStyleProps}

        fieldName="fullName"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          2. DATE OF BIRTH
      ================================================= */}

      <TouchableOpacity
        activeOpacity={
          0.8
        }

        onPress={() =>
          setShowDatePicker(
            true
          )
        }
      >

        <View
          pointerEvents="none"
        >

          <CommonInput
            label="Date of Birth"

            required

            placeholder="DD/MM/YYYY"

            value={
              formData?.dateOfBirth ||
              ""
            }

            error={
              errors?.dateOfBirth
            }

            rightIcon={
              <CalendarDays
                size={20}
                color={
                  theme.colors.gray500
                }
              />
            }

            {...commonInputStyleProps}

            fieldName="dateOfBirth"

            registerFieldPosition={
              registerFieldPosition
            }

            scrollContentRef={
              scrollContentRef
            }
          />

        </View>

      </TouchableOpacity>


      {/* DATE PICKER */}

      {showDatePicker && (
        <DateTimePicker
          value={
            selectedDate
          }

          mode="date"

          display="default"

          maximumDate={
            new Date()
          }

          onChange={
            handleDateChange
          }
        />
      )}


      {/* =================================================
          3. MOBILE NUMBER
      ================================================= */}

      <CommonInput
        label="Mobile Number"

        required

        placeholder="Enter mobile number"

        keyboardType="number-pad"

        value={
          formData?.mobileNumber ||
          ""
        }

        onChangeText={
          handleMobile
        }

        onBlur={() =>
          handleFieldBlur(
            "mobileNumber"
          )
        }

        error={
          errors?.mobileNumber
        }

        maxLength={
          10
        }

        {...commonInputStyleProps}

        fieldName="mobileNumber"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          4. EMAIL
      ================================================= */}

      <CommonInput
        label="Email Address"

        required

        placeholder="Enter email address"

        keyboardType="email-address"

        value={
          formData?.email ||
          ""
        }

        onChangeText={
          handleEmail
        }

        onBlur={() =>
          handleFieldBlur(
            "email"
          )
        }

        error={
          errors?.email
        }

        autoCapitalize="none"

        {...commonInputStyleProps}

        fieldName="email"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          5. AADHAAR
      ================================================= */}

      <CommonInput
        label="Aadhaar No."

        required

        placeholder="Enter Aadhar Number"

        keyboardType="number-pad"

        value={
          formData?.aadhaarNumber ||
          ""
        }

        onChangeText={
          handleAadhaar
        }

        onBlur={() =>
          handleFieldBlur(
            "aadhaarNumber"
          )
        }

        error={
          errors?.aadhaarNumber
        }

        maxLength={
          12
        }

        {...commonInputStyleProps}

        fieldName="aadhaarNumber"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          6. PAN
      ================================================= */}

      <CommonInput
        label="Pan No."

        required

        placeholder="Enter PAN Number"

        autoCapitalize="characters"

        value={
          formData?.panNumber ||
          ""
        }

        onChangeText={
          handlePan
        }

        onBlur={() =>
          handleFieldBlur(
            "panNumber"
          )
        }

        error={
          errors?.panNumber
        }

        maxLength={
          10
        }

        {...commonInputStyleProps}

        fieldName="panNumber"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          7. PIN CODE
      ================================================= */}

      <CommonInput
        label="Pin Code"

        required

        placeholder="Enter PIN Code"

        keyboardType="number-pad"

        value={
          formData?.pincode ||
          ""
        }

        onChangeText={
          handlePincode
        }

        onBlur={() =>
          handleFieldBlur(
            "pincode"
          )
        }

        error={
          errors?.pincode
        }

        maxLength={
          6
        }

        {...commonInputStyleProps}

        fieldName="pincode"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />

    </View>
  );
};


export default EducationPersonalDetails;