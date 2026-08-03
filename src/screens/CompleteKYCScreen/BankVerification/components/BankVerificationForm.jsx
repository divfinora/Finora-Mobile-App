import React from "react";

import {
  View,
} from "react-native";

import CommonInput from "../../../../components/common/Input/CommonInput";
import MessageBox from "../../../../components/common/Alert/MessageBox";

const BankVerificationForm = ({
  form,
  errors = {},
  onChange,
}) => {
  return (
    <View>

      {/* ========================= */}
      {/* Bank Name */}
      {/* ========================= */}

      <CommonInput
        label="Bank Name"
        required
        placeholder="E.g., State Bank of India"
        value={form?.bankName}
        onChangeText={(text) =>
          onChange("bankName", text)
        }
        error={errors?.bankName}
      />

      {/* ========================= */}
      {/* Account Number */}
      {/* ========================= */}

      <CommonInput
        label="Account Number"
        required
        placeholder="Enter your account number"
        value={form?.accountNumber}
        onChangeText={(text) =>
          onChange("accountNumber", text)
        }
        keyboardType="number-pad"
        error={errors?.accountNumber}
      />

      {/* ========================= */}
      {/* Confirm Account Number */}
      {/* ========================= */}

      <CommonInput
        label="Confirm Account Number"
        required
        placeholder="Re-enter your account number"
        value={form?.confirmAccountNumber}
        onChangeText={(text) =>
          onChange("confirmAccountNumber", text)
        }
        keyboardType="number-pad"
        error={errors?.confirmAccountNumber}
      />

      {/* ========================= */}
      {/* IFSC Code */}
      {/* ========================= */}

      <CommonInput
        label="IFSC Code"
        required
        placeholder="E.g., SBIN0001234"
        value={form?.ifscCode}
        onChangeText={(text) =>
          onChange("ifscCode", text.toUpperCase())
        }
        autoCapitalize="characters"
        autoCorrect={false}
        error={errors?.ifscCode}
      />

      {/* ========================= */}
      {/* Information */}
      {/* ========================= */}

      <MessageBox
        icon="lock"
        message="Mandatory under PMLA for opening financial accounts and processing loans."
      />

    </View>
  );
};

export default BankVerificationForm;