import React from "react";

import {
  View,
  Text,
} from "react-native";

import CommonInput from "../../../../components/common/Input/CommonInput";
import SquareChip from "../../../../components/common/Input/SquareChip";
import { theme } from "../../../../theme";


const EMPLOYMENT_TYPES = [
  {
    value: "SALARIED",
    label: "Salaried",
    width: 98,
  },
  {
    value: "SELF_EMPLOYED",
    label: "Self Employed",
    width: 132,
  },
  {
    value: "BUSINESS",
    label: "Business",
    width: 100,
  },
  {
    value: "STUDENT",
    label: "Student",
    width: 100,
  },
];


const CommonEmploymentAndIncome = ({
  formData,
  setFormData,
  errors,
  setErrors,
}) => {

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (field, value) => {

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));


    // Clear field error immediately
    if (errors?.[field]) {

      setErrors?.((prev) => ({
        ...prev,
        [field]: "",
      }));

    }

  };


  // ==========================================
  // COMMON BORDER
  // ==========================================

  const borderStyle = {
    borderWidth: 0.3,
    borderColor: "#48484a58",
  };


  return (

    <View
      style={{
        paddingTop: theme.spacing.md,
      }}
    >

      {/* ==========================================
          TITLE
      ========================================== */}

      <Text
        style={{
          fontSize: theme.typography.h3,

          fontFamily:
            theme.fonts.headingBold ||
            theme.fonts.bold,

          color: theme.colors.text,

          marginBottom:
            theme.spacing.lg,
        }}
      >
        Employment & Income
      </Text>


      {/* ==========================================
          EMPLOYMENT TYPE
      ========================================== */}

      <Text
        style={{
          fontSize: theme.typography.b2,

          lineHeight: 21,

          color:
            theme.colors.textSecondary ||
            "#374151",

          fontFamily:
            theme.fonts.regular,

          marginBottom:
            theme.spacing.sm,
        }}
      >
        Employment Type
        <Text
          style={{
            color: "#FF6B35",
          }}
        >
          *
        </Text>
      </Text>


      {/* ==========================================
          EMPLOYMENT CHIPS
      ========================================== */}

      <View
        style={{
          flexDirection: "row",

          flexWrap: "wrap",

          gap: 12,

          marginBottom:
            errors?.employmentType
              ? 6
              : theme.spacing.lg,
        }}
      >

        {EMPLOYMENT_TYPES.map((item) => {

          const selected =
            formData?.employmentType ===
            item.value;


          return (

            <SquareChip
              key={item.value}

              title={item.label}

              selected={selected}

              onPress={() =>
                handleChange(
                  "employmentType",
                  item.value
                )
              }

              width={item.width}

              height={42}

              borderRadius={10}

              borderWidth={1}

              selectedBackgroundColor="#FFF4E5"

              selectedBorderColor="#FF7043"

              selectedTextColor="#202020"

              unselectedBackgroundColor="#F5F5F7"

              unselectedBorderColor="transparent"

              unselectedTextColor="#747784"

              textStyle={{
                fontSize: 14,

                lineHeight: 20,

                fontFamily:
                  theme.fonts.medium ||
                  "Manrope-Medium",

                textTransform:
                  "capitalize",

                textAlign: "center",

              }}

              style={{
                flex: 0,

                paddingHorizontal: 8,
              }}
            />

          );

        })}

      </View>


      {/* ==========================================
          EMPLOYMENT ERROR
      ========================================== */}

      {!!errors?.employmentType && (

        <Text
          style={{
            color:
              theme.colors.error ||
              "#DC2626",

            fontSize: 12,

            fontFamily:
              theme.fonts.regular,

            marginBottom:
              theme.spacing.md,
          }}
        >
          {errors.employmentType}
        </Text>

      )}


      {/* ==========================================
          COMPANY NAME
      ========================================== */}

      <CommonInput
        label="Company Name"
        required

        placeholder="Enter company name"

        value={
          formData?.companyName || ""
        }

        onChangeText={(value) =>
          handleChange(
            "companyName",
            value
          )
        }

        error={
          errors?.companyName
        }

        inputContainerStyle={
          borderStyle
        }
      />


      {/* ==========================================
          MONTHLY INCOME
      ========================================== */}

      <CommonInput
        label="Monthly Income (₹)"
        required

        placeholder="Enter monthly income"

        value={
          formData?.monthlyIncome || ""
        }

        onChangeText={(value) =>
          handleChange(
            "monthlyIncome",
            value
          )
        }

        keyboardType="numeric"

        error={
          errors?.monthlyIncome
        }

        inputContainerStyle={
          borderStyle
        }
      />


      {/* ==========================================
          EXISTING EMI
          OPTIONAL AS PER BACKEND
      ========================================== */}

      <CommonInput
        label="Existing EMI (If Any)"
        placeholder="Enter existing EMI amount"

        value={
          formData?.existingEmi || ""
        }

        onChangeText={(value) =>
          handleChange(
            "existingEmi",
            value
          )
        }

        keyboardType="numeric"

        error={
          errors?.existingEmi
        }

        inputContainerStyle={
          borderStyle
        }
      />

    </View>

  );

};


export default CommonEmploymentAndIncome;