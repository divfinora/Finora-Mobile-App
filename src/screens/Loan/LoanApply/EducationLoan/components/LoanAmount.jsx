import React from "react";

import {
  View,
} from "react-native";

import CommonInput
  from "../../../../../components/common/Input/CommonInput";

import {
  validateLoanAmountField,
} from "../utils/educationLoanHelpers";

import {
  theme,
} from "../../../../../theme";


const LoanAmount = ({
  formData,
  updateFormData,
  errors,
  setErrors,
  clearFieldError,
  registerFieldPosition,
  scrollContentRef,
}) => {

  // =====================================================
  // SAME STYLE AS ACADEMIC INFO
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
      validateLoanAmountField(
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
          LOAN AMOUNT
      ================================================= */}

      <CommonInput
        label="Loan amount Required"

        required

        placeholder="Enter Loan Amount"

        keyboardType="numeric"

        value={
          formData?.loanAmount || ""
        }

        onChangeText={(value) =>
          handleFieldChange(
            "loanAmount",
            value
          )
        }

        onBlur={() =>
          handleFieldBlur(
            "loanAmount"
          )
        }

        error={
          errors?.loanAmount
        }

        {...commonInputStyleProps}

        fieldName="loanAmount"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          TOTAL COURSE COST
      ================================================= */}

      <CommonInput
        label="Total Course Cost"

        required

        placeholder="Enter Total Course Cost"

        keyboardType="numeric"

        value={
          formData?.totalCourseCost || ""
        }

        onChangeText={(value) =>
          handleFieldChange(
            "totalCourseCost",
            value
          )
        }

        onBlur={() =>
          handleFieldBlur(
            "totalCourseCost"
          )
        }

        error={
          errors?.totalCourseCost
        }

        {...commonInputStyleProps}

        fieldName="totalCourseCost"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          HOSTEL EXPENSES
      ================================================= */}

      <CommonInput
        label="Hostel Expenses (Optional)"

        placeholder="Enter Hostel Expenses"

        keyboardType="numeric"

        value={
          formData?.hostelExpenses || ""
        }

        onChangeText={(value) =>
          handleFieldChange(
            "hostelExpenses",
            value
          )
        }

        onBlur={() =>
          handleFieldBlur(
            "hostelExpenses"
          )
        }

        {...commonInputStyleProps}

        fieldName="hostelExpenses"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          OTHER EXPENSES
      ================================================= */}

      <CommonInput
        label="Other Expenses"

        required

        placeholder="Enter Other Expenses"

        keyboardType="numeric"

        value={
          formData?.otherExpenses || ""
        }

        onChangeText={(value) =>
          handleFieldChange(
            "otherExpenses",
            value
          )
        }

        onBlur={() =>
          handleFieldBlur(
            "otherExpenses"
          )
        }

        error={
          errors?.otherExpenses
        }

        {...commonInputStyleProps}

        fieldName="otherExpenses"

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


export default LoanAmount;