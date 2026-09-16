import React, { useState , useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { ChevronDown } from "lucide-react-native";

import CommonInput from "../../../../../components/common/Input/CommonInput";
import CustomBottomSheet from "../../../../../components/common/Modal/CustomBottomSheet";
import { validateAcademicField } from "../utils/educationLoanHelpers";
import { theme } from "../../../../../theme";
 
const AcademicInfo = ({
  formData,
  updateFormData,
  errors,
  setErrors,
  clearFieldError,
  registerFieldPosition,
  scrollContentRef,
}) => {
  const [selectionSheet, setSelectionSheet] = useState(null);
  const stateRef = useRef(null);
  const admissionStatusRef = useRef(null);
  const academicLabelStyle = {
    fontFamily: theme.fonts.medium,
    fontSize: 14,
    lineHeight: 14,
    color: theme.colors.gray700,
  };

  const academicInputContainerStyle = {
    ...theme.input?.inputBorder,
    height: 56,
    minHeight: 56,
    backgroundColor: "#F5F5F7",
    borderRadius: 12,
    paddingHorizontal: 16,
  };

  const academicInputStyle = {
    fontFamily: theme.fonts.semiBold,
    fontSize: 16,
    lineHeight: 16,
    color: theme.colors.black,
    minHeight: 56,
    paddingVertical: 0,
  };

  const academicErrorStyle = {
    fontFamily: theme.fonts.medium,
    fontSize: 12,
    lineHeight: 14,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  };

  const commonInputStyleProps = {
    labelStyle: academicLabelStyle,
    inputContainerStyle: academicInputContainerStyle,
    inputStyle: academicInputStyle,
    errorStyle: academicErrorStyle,
  };

  // All 28 Indian States
  const stateOptions = [
    {
      value: "Andhra Pradesh",
      label: "Andhra Pradesh",
    },
    {
      value: "Arunachal Pradesh",
      label: "Arunachal Pradesh",
    },
    {
      value: "Assam",
      label: "Assam",
    },
    {
      value: "Bihar",
      label: "Bihar",
    },
    {
      value: "Chhattisgarh",
      label: "Chhattisgarh",
    },
    {
      value: "Goa",
      label: "Goa",
    },
    {
      value: "Gujarat",
      label: "Gujarat",
    },
    {
      value: "Haryana",
      label: "Haryana",
    },
    {
      value: "Himachal Pradesh",
      label: "Himachal Pradesh",
    },
    {
      value: "Jharkhand",
      label: "Jharkhand",
    },
    {
      value: "Karnataka",
      label: "Karnataka",
    },
    {
      value: "Kerala",
      label: "Kerala",
    },
    {
      value: "Madhya Pradesh",
      label: "Madhya Pradesh",
    },
    {
      value: "Maharashtra",
      label: "Maharashtra",
    },
    {
      value: "Manipur",
      label: "Manipur",
    },
    {
      value: "Meghalaya",
      label: "Meghalaya",
    },
    {
      value: "Mizoram",
      label: "Mizoram",
    },
    {
      value: "Nagaland",
      label: "Nagaland",
    },
    {
      value: "Odisha",
      label: "Odisha",
    },
    {
      value: "Punjab",
      label: "Punjab",
    },
    {
      value: "Rajasthan",
      label: "Rajasthan",
    },
    {
      value: "Sikkim",
      label: "Sikkim",
    },
    {
      value: "Tamil Nadu",
      label: "Tamil Nadu",
    },
    {
      value: "Telangana",
      label: "Telangana",
    },
    {
      value: "Tripura",
      label: "Tripura",
    },
    {
      value: "Uttar Pradesh",
      label: "Uttar Pradesh",
    },
    {
      value: "Uttarakhand",
      label: "Uttarakhand",
    },
    {
      value: "West Bengal",
      label: "West Bengal",
    },
  ];

  const admissionStatusOptions = [
    {
      value: "ADMISSION_CONFIRMED",
      label: "Admission Confirmed",
    },
    {
      value: "ADMISSION_PENDING",
      label: "Admission Pending",
    },
  ];

  const handleFieldBlur = (field) => {
    const error = validateAcademicField(
      field,
      formData
    );

    setErrors?.((previous) => {
      const next = { ...previous };

      if (error) {
        next[field] = error;
      } else {
        delete next[field];
      }

      return next;
    });
  };

  const handleFieldChange = (field, value) => {
    updateFormData(field, value);
    clearFieldError?.(field);
  };

  const handleSelect = (field, value) => {
    if (value === undefined || value === null) return;

    updateFormData(field, value);
    clearFieldError?.(field);
  };

  const openSelectionSheet = (field) => {
    setSelectionSheet(field);
  };

  const closeSelectionSheet = () => {
    setSelectionSheet(null);
  };

  const getSelectionOptions = () => {
    if (selectionSheet === "state") {
      return stateOptions;
    }

    if (selectionSheet === "admissionStatus") {
      return admissionStatusOptions;
    }

    return [];
  };

  const getSelectionHeading = () => {
    if (selectionSheet === "state") {
      return "Select State";
    }

    if (selectionSheet === "admissionStatus") {
      return "Select Admission Status";
    }

    return "";
  };

  const renderSelect = ({
    field,
    label,
    placeholder,
  }) => {
    const value = formData?.[field];
    const error = errors?.[field];

    const selectedOption = getSelectionOptions().find(
      (item) => item.value === value
    );

    const displayValue = selectedOption?.label || value || placeholder;

    return (
      <View
        ref={
          field === "state"
            ? stateRef
            : field === "admissionStatus"
              ? admissionStatusRef
              : null
        }
        collapsable={false}
        onLayout={() => {
          const targetRef =
            field === "state"
              ? stateRef
              : field === "admissionStatus"
                ? admissionStatusRef
                : null;

          if (
            !targetRef?.current ||
            !scrollContentRef?.current
          ) {
            return;
          }

          requestAnimationFrame(() => {
            targetRef.current?.measureLayout(
              scrollContentRef.current,
              (_x, y) => {
                registerFieldPosition?.(field, y);

                console.log(
                  `REGISTERED ${field} Y:`,
                  y
                );
              },
              () => { }
            );
          });
        }}
        style={{ flex: 1 }}
      >
        <Text style={academicLabelStyle}>
          {label}
          <Text style={{ color: theme.colors.error }}> *</Text>
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => openSelectionSheet(field)}
          style={[
            academicInputContainerStyle,
            {
              marginTop: 8,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              borderColor: error
                ? theme.colors.error
                : "#48484a58",
            },
          ]}
        >
          <Text
            numberOfLines={1}
            style={[
              academicInputStyle,
              {
                flex: 1,
                textAlign: "left",
                paddingLeft: 0,
                height: 56,
                lineHeight: 20,
                includeFontPadding: false,
                textAlignVertical: "center",
                color: value
                  ? theme.colors.black
                  : "#737383",
              },
            ]}
          >
            {displayValue}
          </Text>

          <ChevronDown
            size={20}
            color={theme.colors.gray700}
            style={{
              marginLeft: 8,
            }}
          />
        </TouchableOpacity>

        {error ? (
          <Text style={academicErrorStyle}>
            {error}
          </Text>
        ) : null}
      </View>
    );
  };

  return (
    <>
      <View

      >
        {/* Course */}
        <CommonInput
          label="Course"
          placeholder="Enter course name"
          value={formData?.course || ""}
          onChangeText={(value) =>
            handleFieldChange("course", value)
          }
          onBlur={() => handleFieldBlur("course")}
          error={errors?.course}
          {...commonInputStyleProps}
          fieldName="course"
          registerFieldPosition={registerFieldPosition}
          scrollContentRef={scrollContentRef}
        />

        {/* Specialization */}
        <CommonInput
          label="Specialization"
          placeholder="Enter specialization"
          value={formData?.specialization || ""}
          onChangeText={(value) =>
            handleFieldChange("specialization", value)
          }
          onBlur={() =>
            handleFieldBlur("specialization")
          }
          error={errors?.specialization}
          {...commonInputStyleProps}
          fieldName="specialization"
          registerFieldPosition={registerFieldPosition}
          scrollContentRef={scrollContentRef}
        />

        {/* Duration */}
        <CommonInput
          label="Duration"
          placeholder="Enter course duration"
          value={formData?.durationYears || ""}
          onChangeText={(value) =>
            handleFieldChange("durationYears", value)
          }
          onBlur={() =>
            handleFieldBlur("durationYears")
          }
          error={errors?.durationYears}
          {...commonInputStyleProps}
          fieldName="durationYears"
          registerFieldPosition={registerFieldPosition}
          scrollContentRef={scrollContentRef}
        />

        {/* College / University */}
        <CommonInput
          label="College / University"
          placeholder="Enter college / university"
          value={formData?.collegeUniversity || ""}
          onChangeText={(value) =>
            handleFieldChange(
              "collegeUniversity",
              value
            )
          }
          onBlur={() =>
            handleFieldBlur("collegeUniversity")
          }
          error={errors?.collegeUniversity}
          {...commonInputStyleProps}
          fieldName="collegeUniversity"
          registerFieldPosition={registerFieldPosition}
          scrollContentRef={scrollContentRef}
        />

        {/* Country */}
        <CommonInput
          label="Country"
          placeholder="Enter country"
          value={formData?.country || ""}
          onChangeText={(value) =>
            handleFieldChange("country", value)
          }
          onBlur={() =>
            handleFieldBlur("country")
          }
          error={errors?.country}
          {...commonInputStyleProps}
          fieldName="country"
          registerFieldPosition={registerFieldPosition}
          scrollContentRef={scrollContentRef}
        />

        {/* State + City */}
        <View
          style={{
            flexDirection: "row",
            gap: 12,
          }}
        >
          {renderSelect({
            field: "state",
            label: "State",
            placeholder: "Select state",
          })}

          <View style={{ flex: 1 }}>
            <CommonInput
              label="City"
              placeholder="Enter city"
              value={formData?.city || ""}
              onChangeText={(value) =>
                handleFieldChange("city", value)
              }
              onBlur={() =>
                handleFieldBlur("city")
              }
              error={errors?.city}
              {...commonInputStyleProps}
              fieldName="city"
              registerFieldPosition={
                registerFieldPosition
              }
              scrollContentRef={scrollContentRef}
            />
          </View>
        </View>

        {/* Admission Status */}
        <View style={{ marginTop: 16 }}>
          {renderSelect({
            field: "admissionStatus",
            label: "Admission Status",
            placeholder: "Select admission status",
          })}
        </View>
      </View>

      {/* State / Admission Status Bottom Sheet */}
      <CustomBottomSheet
        visible={!!selectionSheet}
        onClose={closeSelectionSheet}
        sheetheading={getSelectionHeading()}
        showHeader
        heightPercent={0.65}
        data={getSelectionOptions()}
        renderItem={({ item }) => {
          const isSelected =
            formData?.[selectionSheet] === item.value;

          return (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                handleSelect(
                  selectionSheet,
                  item.value
                );
                closeSelectionSheet();
              }}
              style={{
                minHeight: 54,
                paddingHorizontal: 16,
                marginHorizontal: 4,
                marginVertical: 4,
                borderRadius: 12,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: isSelected
                  ? theme.colors.primary100
                  : theme.colors.white,
                borderWidth: isSelected ? 1 : 0.5,
                borderColor: isSelected
                  ? theme.colors.primary300
                  : theme.colors.gray200,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontFamily: theme.fonts.medium,
                  fontSize: 14,
                  lineHeight: 20,
                  color: isSelected
                    ? theme.colors.primary900
                    : theme.colors.gray900,
                }}
              >
                {item.label}
              </Text>

              {isSelected ? (
                <View
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    backgroundColor:
                      theme.colors.primary500,
                    marginLeft: 12,
                  }}
                />
              ) : null}
            </TouchableOpacity>
          );
        }}
      />
    </>
  );
};

export default AcademicInfo;