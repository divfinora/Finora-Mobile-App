
import React from "react"; import {
    View,
    Text,
} from "react-native";
import CommonInput from "../../../../components/common/Input/CommonInput";
import { theme } from "../../../../theme/index.js";
import SquareChip from "../../../../components/common/Input/SquareChip.jsx";

import RoundedChip from "../../../../components/common/Input/RoundedChip.jsx";
 import { convertNumberToWords } from "../../../../utils/convertNumberToWords.js";
const PersonalDetailsForm = ({
    form,
    errors = {},
    onChange,
    onSelectGender,
    onSelectOccupation,
    onSelectIncome,
}) => {

    const GENDERS = [
        "Female",
        "Male",
        "Others",
    ];

    const OCCUPATIONS = [
        "Salaried",
        "Self-employed",
        "Student",
        "Homemaker",
        "Retired",
        "Other",
    ];

    const INCOME_OPTIONS = [
        "<₹3L",
        "₹3-6L",
        "₹6-10L",
        "₹10L+",
    ];

   
    return (
        <>

            {/* ========================= */}
            {/* Full Name */}
            {/* ========================= */}

            <CommonInput
                label="Full Name"
                required
                placeholder="As per PAN card"
                value={form?.fullName}
                onChangeText={(text) => onChange("fullName", text)}
                error={errors?.fullName}
            />

            {/* ========================= */}
            {/* Date Of Birth */}
            {/* ========================= */}

            <CommonInput
                label="Date of Birth"
                required
                placeholder="DD/MM/YYYY"
                value={form?.dob}
                onChangeText={(text) => onChange("dob", text)}
                keyboardType="number-pad"
                maxLength={10}
                error={errors?.dob}
            />

            {/* ========================= */}
            {/* Email */}
            {/* ========================= */}

            <CommonInput
                label="Email ID"
                required
                placeholder="you@gmail.com"
                value={form?.email}
                onChangeText={(text) => onChange("email", text)}
                keyboardType="email-address"
                error={errors?.email}
            />

            {/* ========================= */}
            {/* Father's Name */}
            {/* ========================= */}

            <CommonInput
                label="Father's Name"
                required
                placeholder="Optional"
                value={form?.fatherName}
                onChangeText={(text) => onChange("fatherName", text)}
                error={errors?.fatherName}
            />

            {/* ========================= */}
            {/* Mother's Name */}
            {/* ========================= */}

            <CommonInput
                label="Mother's Name"
                required
                placeholder="Optional"
                value={form?.motherName}
                onChangeText={(text) => onChange("motherName", text)}
                error={errors?.motherName}
            />

            {/* ========================= */}
            {/* Gender */}
            {/* ========================= */}

            <View
                style={{
                    marginBottom: theme.spacing.xl,
                }}
            >
                <Text
                    style={{
                        marginBottom: theme.spacing.md,
                        color: theme.colors.gray700,
                        fontSize: 15,
                        fontFamily: theme.fonts.medium,
                    }}
                >
                    Gender
                    <Text
                        style={{
                            color: theme.colors.error,
                        }}
                    >
                        {" "}*
                    </Text>
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    {GENDERS.map((item, index) => (
                        <SquareChip
                            key={item}
                            title={item}
                            selected={form?.gender === item}
                            onPress={() => onSelectGender(item)}
                            style={{
                                marginRight: index !== GENDERS.length - 1 ? 12 : 0,
                            }}
                        />
                    ))}
                </View>

                {!!errors?.gender && (
                    <Text
                        style={{
                            marginTop: theme.spacing.sm,
                            color: theme.colors.error,
                            fontSize: 12,
                            fontFamily: theme.fonts.medium,
                        }}
                    >
                        {errors.gender}
                    </Text>
                )}
            </View>

            {/* ========================= */}
            {/* Occupation */}
            {/* ========================= */}

            <View
                style={{
                    marginBottom: theme.spacing.xl,
                }}
            >
                <Text
                    style={{
                        marginBottom: theme.spacing.md,
                        color: theme.colors.gray700,
                        fontSize: 15,
                        fontFamily: theme.fonts.medium,
                    }}
                >
                    Occupation
                    <Text
                        style={{
                            color: theme.colors.error,
                        }}
                    >
                        {" "}*
                    </Text>
                </Text>

                <View
                    style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: 4,
                    }}
                >
                    {OCCUPATIONS.map((item) => (
                        <RoundedChip
                            key={item}
                            title={item}
                            selected={form?.occupation === item}
                            onPress={() => onSelectOccupation(item)}
                        />
                    ))}
                </View>

                {!!errors?.occupation && (
                    <Text
                        style={{
                            marginTop: theme.spacing.sm,
                            color: theme.colors.error,
                            fontSize: 12,
                            fontFamily: theme.fonts.medium,
                        }}
                    >
                        {errors.occupation}
                    </Text>
                )}
            </View>

            {/* ========================= */}
            {/* Annual Income */}
            {/* ========================= */}

            {/* ========================= */}
            {/* Annual & Monthly Income */}
            {/* ========================= */}

            <View
                style={{
                    marginBottom: theme.spacing.xl,
                }}
            >
                {/* Annual Income */}

                <CommonInput
                    label="Annual Income"
                    required
                    placeholder="Enter Annual Income"
                    value={form?.annualIncome}
                    onChangeText={(text) => onChange("annualIncome", text)}
                    keyboardType="number-pad"
                    error={errors?.annualIncome}
                />

                {/* Amount In Words */}

                {form?.annualIncome?.trim() ? (
                    <Text
                        style={{
                            marginTop: -8,
                            marginBottom: theme.spacing.lg,
                            color: theme.colors.primary500,
                            fontSize: theme.typography.b3,
                            fontFamily: theme.fonts.medium,
                        }}
                    >
                        {convertNumberToWords(form.annualIncome)}
                    </Text>
                ) : null}

                {/* Monthly Income */}

                <CommonInput
                    label="Monthly Income"
                    required
                    placeholder="Auto Calculated"
                    value={form?.monthlyIncome}
                    editable={false}
                />
            </View>

            {/* ========================= */}
            {/* Address */}
            {/* ========================= */}

            <CommonInput
                label="Address"
                required
                placeholder="Enter your address"
                value={form?.address}
                onChangeText={(text) => onChange("address", text)}
                multiline
                numberOfLines={3}
                inputStyle={{
                    minHeight: 90,
                    textAlignVertical: "top",
                    paddingTop: 16,
                }}
                error={errors?.address}
            />

            {/* ========================= */}
            {/* City & State */}
            {/* ========================= */}

            <View
                style={{
                    flexDirection: "row",
                    gap: theme.spacing.md,
                }}
            >
                <View style={{ flex: 1 }}>
                    <CommonInput
                        label="City"
                        required
                        placeholder="Enter city"
                        value={form?.city}
                        onChangeText={(text) => onChange("city", text)}
                        error={errors?.city}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <CommonInput
                        label="State"
                        required
                        placeholder="Enter state"
                        value={form?.state}
                        onChangeText={(text) => onChange("state", text)}
                        error={errors?.state}
                    />
                </View>
            </View>

            {/* ========================= */}
            {/* Pin Code */}
            {/* ========================= */}

            <CommonInput
                label="Pin Code"
                required
                placeholder="Enter pin code"
                value={form?.pinCode}
                onChangeText={(text) => onChange("pinCode", text)}
                keyboardType="number-pad"
                maxLength={6}
                error={errors?.pinCode}
            />

        </>
    );
};

export default PersonalDetailsForm;