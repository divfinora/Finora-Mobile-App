import React from "react";

import {
  View,
  Text,
} from "react-native";

import {
  Info,
} from "lucide-react-native";

import CommonInput
  from "../../../../../components/common/Input/CommonInput";

import {
  validateGuardianField,
} from "../utils/educationLoanHelpers";

import {
  theme,
} from "../../../../../theme";


const ParentGuardianInfo = ({
  formData,
  updateFormData,
  errors,
  setErrors,
  clearFieldError,
  registerFieldPosition,
  scrollContentRef,
}) => {

  // =====================================================
  // SAME STYLE AS ACADEMIC INFO / LOAN AMOUNT
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
      validateGuardianField(
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
          PARENT / GUARDIAN NAME
      ================================================= */}

      <CommonInput
        label="Parents / Guardian Names"

        required

        placeholder="Enter Parents / Guardian names"

        value={
          formData?.parentGuardianName ||
          ""
        }

        onChangeText={(value) =>
          handleFieldChange(
            "parentGuardianName",
            value
          )
        }

        onBlur={() =>
          handleFieldBlur(
            "parentGuardianName"
          )
        }

        error={
          errors?.parentGuardianName
        }

        {...commonInputStyleProps}

        fieldName="parentGuardianName"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          RELATIONSHIP
      ================================================= */}

      <CommonInput
        label="Relationship"

        required

        placeholder="Enter Relationship"

        value={
          formData?.guardianRelationship ||
          ""
        }

        onChangeText={(value) =>
          handleFieldChange(
            "guardianRelationship",
            value
          )
        }

        onBlur={() =>
          handleFieldBlur(
            "guardianRelationship"
          )
        }

        error={
          errors?.guardianRelationship
        }

        {...commonInputStyleProps}

        fieldName="guardianRelationship"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          MOBILE NUMBER
      ================================================= */}

      <CommonInput
        label="Mobile Number"

        required

        placeholder="Enter mobile number"

        keyboardType="phone-pad"

        maxLength={10}

        value={
          formData?.guardianMobileNumber ||
          ""
        }

        onChangeText={(value) =>
          handleFieldChange(
            "guardianMobileNumber",
            value
          )
        }

        onBlur={() =>
          handleFieldBlur(
            "guardianMobileNumber"
          )
        }

        error={
          errors?.guardianMobileNumber
        }

        {...commonInputStyleProps}

        fieldName="guardianMobileNumber"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          OCCUPATION
      ================================================= */}

      <CommonInput
        label="Occupation"

        required

        placeholder="Enter occupation"

        value={
          formData?.guardianOccupation ||
          ""
        }

        onChangeText={(value) =>
          handleFieldChange(
            "guardianOccupation",
            value
          )
        }

        onBlur={() =>
          handleFieldBlur(
            "guardianOccupation"
          )
        }

        error={
          errors?.guardianOccupation
        }

        {...commonInputStyleProps}

        fieldName="guardianOccupation"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          EMPLOYER NAME
      ================================================= */}

      <CommonInput
        label="Employer Name"

        required

        placeholder="Enter Employer Name"

        value={
          formData?.guardianEmployerName ||
          ""
        }

        onChangeText={(value) =>
          handleFieldChange(
            "guardianEmployerName",
            value
          )
        }

        onBlur={() =>
          handleFieldBlur(
            "guardianEmployerName"
          )
        }

        error={
          errors?.guardianEmployerName
        }

        {...commonInputStyleProps}

        fieldName="guardianEmployerName"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          MONTHLY INCOME
      ================================================= */}

      <CommonInput
        label="Monthly Income"

        required

        placeholder="Enter Monthly Income"

        keyboardType="numeric"

        value={
          formData?.guardianMonthlyIncome ||
          ""
        }

        onChangeText={(value) =>
          handleFieldChange(
            "guardianMonthlyIncome",
            value
          )
        }

        onBlur={() =>
          handleFieldBlur(
            "guardianMonthlyIncome"
          )
        }

        error={
          errors?.guardianMonthlyIncome
        }

        {...commonInputStyleProps}

        fieldName="guardianMonthlyIncome"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          ANNUAL INCOME
      ================================================= */}

      <CommonInput
        label="Annual Income"

        required

        placeholder="Enter Annual Income"

        keyboardType="numeric"

        value={
          formData?.guardianAnnualIncome ||
          ""
        }

        onChangeText={(value) =>
          handleFieldChange(
            "guardianAnnualIncome",
            value
          )
        }

        onBlur={() =>
          handleFieldBlur(
            "guardianAnnualIncome"
          )
        }

        error={
          errors?.guardianAnnualIncome
        }

        {...commonInputStyleProps}

        fieldName="guardianAnnualIncome"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          PAN NUMBER
      ================================================= */}

      <CommonInput
        label="PAN Number"

        required

        placeholder="Enter PAN Number"

        autoCapitalize="characters"

        value={
          formData?.guardianPanNumber ||
          ""
        }

        onChangeText={(value) =>
          handleFieldChange(
            "guardianPanNumber",
            value
          )
        }

        onBlur={() =>
          handleFieldBlur(
            "guardianPanNumber"
          )
        }

        error={
          errors?.guardianPanNumber
        }

        {...commonInputStyleProps}

        fieldName="guardianPanNumber"

        registerFieldPosition={
          registerFieldPosition
        }

        scrollContentRef={
          scrollContentRef
        }
      />


      {/* =================================================
          INFO CARD
      ================================================= */}

      <View
        style={{
          borderWidth:
            .7,

          borderColor:
            '#D27511',

          borderRadius:
            theme.radius.lg,

          backgroundColor:
            "#FFFBEB",

          padding:
            theme.spacing.lg,

          flexDirection:
            "row",

          marginBottom:
            theme.spacing.lg,
        }}
      >

        <Info
          size={
            20
          }

          color={
            '#D27511'
          }
        />


        <Text
          style={{
            flex: 1,

            marginLeft:
              theme.spacing.md,

            color:
              "#92400E",

            fontSize:
              theme.typography.b2,

            lineHeight:
              21,

            fontFamily:
              theme.fonts.regular,
          }}
        >
          Providing accurate parent details is crucial
          for credit assessment. Ensure the PAN
          number matches the official records to avoid
          delays in processing.
        </Text>

      </View>

    </View>
  );
};


export default ParentGuardianInfo;