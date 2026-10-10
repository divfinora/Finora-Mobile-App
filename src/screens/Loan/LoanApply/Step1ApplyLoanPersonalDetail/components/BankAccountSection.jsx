
import React, { useState } from "react";

import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import {
    Building2,
    ChevronDown,
    ChevronUp,
    Plus,
    Check,
} from "lucide-react-native";

import { theme } from "../../../../../theme";

import AddBankAccountBottomSheet from "./AddBankAccountBottomSheet";

const INITIAL_BANKS = [
    {
        id: "sbi-demo",
        bankName: "State Bank of India (SBI)",
        accountNumber: "000000000001",
        ifscCode: "SBIN0000001",
        shortName: "SBI",
        color: "#0878C9",
        backgroundColor: "#E7F4FF",
    },
    {
        id: "hdfc-demo",
        bankName: "HDFC Bank",
        accountNumber: "000000000002",
        ifscCode: "HDFC0000001",
        shortName: "H",
        color: "#0755A5",
        backgroundColor: "#EAF2FF",
    },
    {
        id: "icici-demo",
        bankName: "ICICI Bank",
        accountNumber: "000000000003",
        ifscCode: "ICIC0000001",
        shortName: "i",
        color: "#C7472D",
        backgroundColor: "#FCEBE8",
    },
    {
        id: "axis-demo",
        bankName: "Axis Bank",
        accountNumber: "000000000004",
        ifscCode: "UTIB0000001",
        shortName: "A",
        color: "#97144D",
        backgroundColor: "#F9E8F0",
    },
];
    
const BankAccountSection = ({
    value = "",
    onChange,
    error,
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [addBankVisible, setAddBankVisible] = useState(false);
    const [banks, setBanks] = useState(INITIAL_BANKS);
    const [selectedBankId, setSelectedBankId] = useState(null);

    const selectedBank =
        banks.find(bank => bank.id === selectedBankId) ||
        banks.find(bank => bank.accountNumber === value);

    const handleSelectBank = bank => {
        setSelectedBankId(bank.id);
        onChange?.("accountNumber", bank.accountNumber);
        setDropdownOpen(false);
    };

    const handleAddBank = bank => {
        const newBank = {
            ...bank,
            shortName: bank.bankName.trim().slice(0, 1).toUpperCase(),
            color: theme.colors.primary500,
            backgroundColor: theme.colors.primary100,
        };

        setBanks(previous => [
            newBank,
            ...previous,
        ]);

        setSelectedBankId(newBank.id);
        onChange?.("accountNumber", newBank.accountNumber);
        setDropdownOpen(true);
        setAddBankVisible(false);
    };

    const renderBank = bank => {
        const isSelected =
            selectedBank?.id === bank.id;

        return (
            <TouchableOpacity
                key={bank.id}
                activeOpacity={0.75}
                onPress={() => handleSelectBank(bank)}
                style={{
                    minHeight: 61,
                    paddingHorizontal: 14,
                    flexDirection: "row",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#EDF0F4",
                    backgroundColor: isSelected
                        ? "#FFF9F5"
                        : "#FFFFFF",
                }}
            >
                <View
                    style={{
                        width: 35,
                        height: 35,
                        borderRadius: 9,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: bank.backgroundColor,
                        borderWidth: 1,
                        borderColor: `${bank.color}30`,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            fontFamily: theme.fonts.bold,
                            color: bank.color,
                        }}
                    >
                        {bank.shortName}
                    </Text>
                </View>

                <View
                    style={{
                        flex: 1,
                        marginLeft: 13,
                    }}
                >
                    <Text
                        style={{
                            fontSize: 13,
                            fontFamily: theme.fonts.medium,
                            color: "#1F2937",
                        }}
                    >
                        {bank.bankName}
                    </Text>

                    <Text
                        style={{
                            marginTop: 3,
                            fontSize: 11,
                            fontFamily: theme.fonts.regular,
                            color: "#8A96A8",
                        }}
                    >
                        A/c ending {bank.accountNumber.slice(-4)}
                    </Text>
                </View>

                {isSelected && (
                    <Check
                        size={18}
                        color={theme.colors.primary500}
                    />
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={{ marginBottom: 16 }}>
            <Text
                style={{
                    marginBottom: 7,
                    fontSize: 14,
                    lineHeight: 18,
                    fontFamily: theme.fonts.medium,
                    color: "#1F2937",
                }}
            >
                Bank Account
                <Text style={{ color: "#EF4444" }}> *</Text>
            </Text>

            {/* DROPDOWN FIELD */}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setDropdownOpen(previous => !previous)}
                style={{
                    minHeight: 45,
                    paddingHorizontal: 13,
                    flexDirection: "row",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: error
                        ? theme.colors.error
                        : "#D9E0EA",
                    borderRadius: 12,
                    backgroundColor: "#FBFCFE",
                }}
            >
                <Building2
                    size={18}
                    color="#A7B6C8"
                />

                <Text
                    numberOfLines={1}
                    style={{
                        flex: 1,
                        marginLeft: 10,
                        fontSize: 12,
                        fontFamily: theme.fonts.regular,
                        color: selectedBank
                            ? "#1F2937"
                            : "#94A3B8",
                    }}
                >
                    {selectedBank
                        ? `${selectedBank.bankName} •••• ${selectedBank.accountNumber.slice(-4)}`
                        : "Choose your bank account number"}
                </Text>

                {dropdownOpen ? (
                    <ChevronUp
                        size={18}
                        color="#64748B"
                    />
                ) : (
                    <ChevronDown
                        size={18}
                        color="#64748B"
                    />
                )}
            </TouchableOpacity>

            {!!error && (
                <Text
                    style={{
                        marginTop: 5,
                        fontSize: 11,
                        fontFamily: theme.fonts.regular,
                        color: theme.colors.error,
                    }}
                >
                    {error}
                </Text>
            )}

            {/* BANK DROPDOWN */}
            {dropdownOpen && (
                <View
                    style={{
                        marginTop: 8,
                        overflow: "hidden",
                        borderWidth: 1,
                        borderColor: "#D9E0EA",
                        borderRadius: 12,
                        backgroundColor: "#FFFFFF",
                    }}
                >
                    {banks.map(renderBank)}

                    {/* ADD BANK BUTTON */}
                    <TouchableOpacity
                        activeOpacity={0.75}
                        onPress={() => {
                            setDropdownOpen(false);
                            setAddBankVisible(true);
                        }}
                        style={{
                            minHeight: 48,
                            marginHorizontal: 12,
                            marginVertical: 12,
                            borderWidth: 1,
                            borderStyle: "dashed",
                            borderColor: theme.colors.primary400,
                            borderRadius: 10,
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                        }}
                    >
                        <Plus
                            size={17}
                            color={theme.colors.primary500}
                        />

                        <Text
                            style={{
                                fontSize: 12,
                                fontFamily: theme.fonts.semiBold,
                                color: theme.colors.primary500,
                            }}
                        >
                            Add New Bank Account
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* ADD BANK BOTTOM SHEET */}
            <AddBankAccountBottomSheet
                visible={addBankVisible}
                onClose={() => setAddBankVisible(false)}
                onSubmit={handleAddBank}
            />
        </View>
    );
};

export default BankAccountSection;
