import React from "react";

import {
  View,
} from "react-native";

import CommonInput
  from "../../../../../components/common/Input/CommonInput";

import {
  validateFinancialField,
} from "../utils/educationLoanHelpers";

import {
  theme,
} from "../../../../../theme";


const FinancialInfo = ({
  formData,
  updateFormData,
  errors,
  setErrors,
  clearFieldError,
  registerFieldPosition,
  scrollContentRef,
}) => {

  // =====================================================
  // SAME STYLE AS OTHER EDUCATION LOAN COMPONENTS
  // =====================================================

  const academicLabelStyle = {
    fontFamily:
      theme.fonts.medium,

    fontSize:
      14,

    lineHeight:
      14,

    color:
      theme.colors.gray700,
  };


  const academicInputContainerStyle = {
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


  const academicInputStyle = {
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


  const academicErrorStyle = {
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


  const commonInputStyleProps = {
    labelStyle:
      academicLabelStyle,

    inputContainerStyle:
      academicInputContainerStyle,

    inputStyle:
      academicInputStyle,

    errorStyle:
      academicErrorStyle,
  };


  // =====================================================
  // FIELD BLUR VALIDATION
  // =====================================================

  const handleFieldBlur = (
    field
  ) => {

    const error =
      validateFinancialField(
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

    clearFieldError?.(
      field
    );
  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <View>

      {/* =================================================
          EXISTING LOAN
      ================================================= */}

      <CommonInput
        label="Existing Loan ( If any )"

        placeholder="Enter Existing loan details"

        value={
          formData?.existingLoanDetails ||
          ""
        }

        onChangeText={
          value =>
            handleFieldChange(
              "existingLoanDetails",
              value
            )
        }

        {...commonInputStyleProps}

        fieldName="existingLoanDetails"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          CURRENT EMI
      ================================================= */}

      <CommonInput
        label="Current EMI ( if applicable )"

        placeholder="Enter EMI amount"

        keyboardType="numeric"

        value={
          formData?.currentEmi ||
          ""
        }

        onChangeText={
          value =>
            handleFieldChange(
              "currentEmi",
              value
            )
        }

        {...commonInputStyleProps}

        fieldName="currentEmi"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          BANK NAME
      ================================================= */}

      <CommonInput
        label="Bank Name"

        required

        placeholder="Enter Bank name"

        value={
          formData?.bankName ||
          ""
        }

        onChangeText={
          value =>
            handleFieldChange(
              "bankName",
              value
            )
        }

        onBlur={() =>
          handleFieldBlur(
            "bankName"
          )
        }

        error={
          errors?.bankName
        }

        {...commonInputStyleProps}

        fieldName="bankName"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          ACCOUNT NUMBER
      ================================================= */}

      <CommonInput
        label="Account Number"

        required

        placeholder="Enter Account Number"

        keyboardType="number-pad"

        value={
          formData?.accountNumber ||
          ""
        }

        onChangeText={
          value =>
            handleFieldChange(
              "accountNumber",
              value
            )
        }

        onBlur={() =>
          handleFieldBlur(
            "accountNumber"
          )
        }

        error={
          errors?.accountNumber
        }

        {...commonInputStyleProps}

        fieldName="accountNumber"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          IFSC CODE
      ================================================= */}

      <CommonInput
        label="IFSC Code"

        required

        placeholder="Enter IFSC code"

        autoCapitalize="characters"

        value={
          formData?.ifscCode ||
          ""
        }

        onChangeText={
          value =>
            handleFieldChange(
              "ifscCode",
              value
            )
        }

        onBlur={() =>
          handleFieldBlur(
            "ifscCode"
          )
        }

        error={
          errors?.ifscCode
        }

        {...commonInputStyleProps}

        fieldName="ifscCode"

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


export default FinancialInfo;