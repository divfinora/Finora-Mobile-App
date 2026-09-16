import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  ChevronDown,
  Check,
  FileText,
} from "lucide-react-native";

import CommonInput
  from "../../../../../components/common/Input/CommonInput";

import {
  theme,
} from "../../../../../theme";


const InformationReview = ({
  formData,
  updateFormData,
  errors,
}) => {

  const renderSelect = ({
    label,
    value,
    placeholder,
    options,
    field,
    error,
  }) => {

    return (

      <View
        style={{
          marginBottom:
            theme.spacing.xl,
        }}
      >

        <Text
          style={{
            marginBottom:
              theme.spacing.sm,

            color:
              theme.colors.navy700,

            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.medium,
          }}
        >
          {label}
        </Text>


        <TouchableOpacity
          activeOpacity={0.8}

          onPress={() => {

            if (
              !options?.length
            ) {
              return;
            }

            updateFormData(
              field,
              options[0].value
            );

          }}

          style={{
            minHeight:
              50,

            backgroundColor:
              "#F5F5F7",

            borderRadius:
              14,

            paddingHorizontal:
              theme.spacing.lg,

            flexDirection:
              "row",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            ...theme.inputBorder,
          }}
        >

          <Text
            style={{
              color:
                value
                  ? theme.colors.navy500
                  : "#737383",

              fontSize:
                16,

              fontFamily:
                theme.fonts.medium,
            }}
          >
            {value || placeholder}
          </Text>


          <ChevronDown
            size={20}
            color={
              theme.colors.gray500
            }
          />

        </TouchableOpacity>


        {!!error && (

          <Text
            style={{
              color:
                theme.colors.error,

              fontSize:
                12,

              fontFamily:
                theme.fonts.medium,

              marginTop:
                6,
            }}
          >
            {error}
          </Text>

        )}

      </View>
    );
  };


  return (

    <View>

      {/* ==============================================
          LOAN PREFERENCE
      ============================================== */}

      <View
        style={{
          backgroundColor:
            "#F8FAFC",

          borderRadius:
            20,

          padding:
            theme.spacing.xl,

          marginBottom:
            theme.spacing.lg,
        }}
      >

        <Text
          style={{
            color:
              theme.colors.navy900,

            fontSize:
              theme.typography.h4,

            fontFamily:
              theme.fonts.semiBold,

            marginBottom:
              theme.spacing.xxl,
          }}
        >
          Loan Preference
        </Text>


        {renderSelect({
          label:
            "Preferred Bank",

          value:
            formData?.preferredBank,

          placeholder:
            "Select bank",

          options: [],

          field:
            "preferredBank",

          error:
            errors?.preferredBank,
        })}


        {renderSelect({
          label:
            "Loan Tenure (Years)",

          value:
            formData?.loanTenure,

          placeholder:
            "Select tenure",

          options: [
            {
              value: "12",
              label: "12 months",
            },
            {
              value: "24",
              label: "24 months",
            },
            {
              value: "36",
              label: "36 months",
            },
            {
              value: "48",
              label: "48 months",
            },
            {
              value: "60",
              label: "60 months",
            },
            {
              value: "84",
              label: "84 months",
            },
            {
              value: "120",
              label: "120 months",
            },
            {
              value: "180",
              label: "180 months",
            },
          ],

          field:
            "loanTenure",

          error:
            errors?.loanTenure,
        })}


        {renderSelect({
          label:
            "Moratorium Period",

          value:
            formData?.moratoriumPeriod,

          placeholder:
            "Select option",

          options: [
            {
              value:
                "NONE",

              label:
                "No Moratorium",
            },
            {
              value:
                "6_MONTHS",

              label:
                "6 Months",
            },
            {
              value:
                "12_MONTHS",

              label:
                "12 Months",
            },
            {
              value:
                "18_MONTHS",

              label:
                "18 Months",
            },
            {
              value:
                "24_MONTHS",

              label:
                "24 Months",
            },
          ],

          field:
            "moratoriumPeriod",

          error:
            errors?.moratoriumPeriod,
        })}

      </View>


      {/* ==============================================
          DECLARATION
      ============================================== */}

      <TouchableOpacity
        activeOpacity={0.8}

        onPress={() =>
          updateFormData(
            "declarationAccepted",
            !formData?.declarationAccepted
          )
        }

        style={{
          borderWidth:
            1,

          borderColor:
            theme.colors.gray200,

          borderRadius:
            16,

          backgroundColor:
            theme.colors.white,

          padding:
            theme.spacing.xl,

          flexDirection:
            "row",

          marginBottom:
            theme.spacing.lg,
        }}
      >

        <View
          style={{
            width: 22,

            height: 22,

            borderRadius: 4,

            borderWidth: 1,

            borderColor:
              formData?.declarationAccepted
                ? theme.colors.primary500
                : theme.colors.gray300,

            backgroundColor:
              formData?.declarationAccepted
                ? theme.colors.primary500
                : theme.colors.white,

            alignItems:
              "center",

            justifyContent:
              "center",
          }}
        >

          {formData?.declarationAccepted && (

            <Check
              size={16}
              color={
                theme.colors.white
              }
            />

          )}

        </View>


        <View
          style={{
            flex: 1,

            marginLeft:
              theme.spacing.lg,
          }}
        >

          <Text
            style={{
              color:
                theme.colors.navy900,

              fontSize:
                theme.typography.b2,

              fontFamily:
                theme.fonts.semiBold,

              marginBottom:
                theme.spacing.sm,
            }}
          >
            Declaration
          </Text>


          <Text
            style={{
              color:
                theme.colors.navy500,

              fontSize:
                theme.typography.b2,

              lineHeight:
                24,

              fontFamily:
                theme.fonts.regular,
            }}
          >
            I hereby declare that all the information
            provided above is true and correct to the
            best of my knowledge. I understand that
            any false information may lead to rejection
            of my loan application.
          </Text>

        </View>

      </TouchableOpacity>


      {/* ==============================================
          READY TO SUBMIT
      ============================================== */}

      <View
        style={{
          borderWidth:
            1,

          borderColor:
            theme.colors.primary500,

          borderRadius:
            16,

          backgroundColor:
            "#FFFBEB",

          padding:
            theme.spacing.lg,

          flexDirection:
            "row",

          marginBottom:
            theme.spacing.xl,
        }}
      >

        <FileText
          size={20}
          color={
            theme.colors.primary500
          }
        />

        <View
          style={{
            flex: 1,

            marginLeft:
              theme.spacing.md,
          }}
        >

          <Text
            style={{
              color:
                "#92400E",

              fontSize:
                theme.typography.b2,

              fontFamily:
                theme.fonts.semiBold,

              marginBottom:
                theme.spacing.xs,
            }}
          >
            Ready to Submit
          </Text>


          <Text
            style={{
              color:
                "#92400E",

              fontSize:
                theme.typography.b2,

              lineHeight:
                22,

              fontFamily:
                theme.fonts.regular,
            }}
          >
            Please review all information before
            submitting your application. You can save as
            draft to continue later.
          </Text>

        </View>

      </View>

    </View>
  );
};


export default InformationReview;