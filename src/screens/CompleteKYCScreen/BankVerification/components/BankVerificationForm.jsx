import React from "react";

import {
  View,
} from "react-native";

import CommonInput
  from "../../../../components/common/Input/CommonInput";

import MessageBox
  from "../../../../components/common/Alert/MessageBox";


const BankVerificationForm = ({
  form,
  errors = {},
  onChange,
  registerField,
  validateBankField,
}) => {

  return (
    <View>

      {/* ========================================================= */}
      {/* Bank Name */}
      {/* ========================================================= */}

      <View
        onLayout={
          registerField
            ? registerField("bankName")
            : undefined
        }
      >

        <CommonInput
          label="Bank Name"
          required
          placeholder="E.g., State Bank of India"

          value={
            form?.bankName
          }

          onChangeText={(text) =>
            onChange(
              "bankName",
              text
            )
          }

          onBlur={() =>
            validateBankField?.(
              "bankName",
              form?.bankName
            )
          }

          error={
            errors?.bankName
          }

          inputContainerStyle={{
            borderWidth: 0,
            borderColor: "transparent",
          }}
        />

      </View>


      {/* ========================================================= */}
      {/* Account Number */}
      {/* ========================================================= */}

      <View
        onLayout={
          registerField
            ? registerField("accountNumber")
            : undefined
        }
      >

        <CommonInput
          label="Account Number"
          required
          placeholder="Enter your account number"

          value={
            form?.accountNumber
          }

          onChangeText={(text) =>
            onChange(
              "accountNumber",
              text
            )
          }

          keyboardType="number-pad"

          onBlur={() =>
            validateBankField?.(
              "accountNumber",
              form?.accountNumber
            )
          }

          error={
            errors?.accountNumber
          }

          inputContainerStyle={{
            borderWidth: 0,
            borderColor: "transparent",
          }}
        />

      </View>


      {/* ========================================================= */}
      {/* Confirm Account Number */}
      {/* ========================================================= */}

      <View
        onLayout={
          registerField
            ? registerField(
                "confirmAccountNumber"
              )
            : undefined
        }
      >

        <CommonInput
          label="Confirm Account Number"
          required
          placeholder="Re-enter your account number"

          value={
            form?.confirmAccountNumber
          }

          onChangeText={(text) =>
            onChange(
              "confirmAccountNumber",
              text
            )
          }

          keyboardType="number-pad"

          onBlur={() =>
            validateBankField?.(
              "confirmAccountNumber",
              form?.confirmAccountNumber
            )
          }

          error={
            errors?.confirmAccountNumber
          }

          inputContainerStyle={{
            borderWidth: 0,
            borderColor: "transparent",
          }}
        />

      </View>


      {/* ========================================================= */}
      {/* IFSC Code */}
      {/* ========================================================= */}

      <View
        onLayout={
          registerField
            ? registerField("ifscCode")
            : undefined
        }
      >

        <CommonInput
          label="IFSC Code"
          required
          placeholder="E.g., SBIN0001234"

          value={
            form?.ifscCode
          }

          onChangeText={(text) =>
            onChange(
              "ifscCode",
              text.toUpperCase()
            )
          }

          autoCapitalize="characters"
          autoCorrect={false}

          onBlur={() =>
            validateBankField?.(
              "ifscCode",
              form?.ifscCode
            )
          }

          error={
            errors?.ifscCode
          }

          inputContainerStyle={{
            borderWidth: 0,
            borderColor: "transparent",
          }}
        />

      </View>


      {/* ========================================================= */}
      {/* Information */}
      {/* ========================================================= */}

      <MessageBox
        icon="lock"
        message="Mandatory under PMLA for opening financial accounts and processing loans."
      />

    </View>
  );
};


export default BankVerificationForm;