import React, {
    useState,
} from "react";

import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import {
    CalendarDays,
} from "lucide-react-native";

import DateTimePicker
    from "@react-native-community/datetimepicker";

import CommonInput
    from "../../../../components/common/Input/CommonInput";

import { theme }
    from "../../../../theme/index.js";

import SquareChip
    from "../../../../components/common/Input/SquareChip.jsx";

import RoundedChip
    from "../../../../components/common/Input/RoundedChip.jsx";

import { convertNumberToWords }
    from "../../../../utils/convertNumberToWords.js";


const PersonalDetailsForm = ({
    form,

    errors = {},

    onChange,

    onSelectGender,

    onSelectOccupation,

    onSelectIncome,

    registerField,

    validatePersonalField,

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


    // =========================================================
    // DATE FORMAT
    // =========================================================

    const formatDate = (date) => {

        if (!date) {
            return "";
        }

        const day =
            String(
                date.getDate()
            ).padStart(
                2,
                "0"
            );

        const month =
            String(
                date.getMonth() + 1
            ).padStart(
                2,
                "0"
            );

        const year =
            date.getFullYear();

        return `${day}/${month}/${year}`;
    };


    // =========================================================
    // INITIAL DATE
    // =========================================================

    const getInitialDate = () => {

        if (!form?.dob) {
            return new Date(
                2000,
                0,
                1
            );
        }

        const parts =
            String(
                form.dob
            ).split("/");


        if (
            parts.length === 3
        ) {

            const day =
                Number(
                    parts[0]
                );

            const month =
                Number(
                    parts[1]
                ) - 1;

            const year =
                Number(
                    parts[2]
                );


            const date =
                new Date(
                    year,
                    month,
                    day
                );


            if (
                !isNaN(
                    date.getTime()
                )
            ) {
                return date;
            }
        }


        return new Date(
            2000,
            0,
            1
        );
    };


    // =========================================================
    // DATE PICKER STATE
    // =========================================================

    const [
        showDatePicker,
        setShowDatePicker,
    ] = useState(false);


    const [
        selectedDate,
        setSelectedDate,
    ] = useState(
        getInitialDate()
    );


    // =========================================================
    // DATE CHANGE
    // =========================================================

    const handleDateChange = (
        event,
        date
    ) => {

        setShowDatePicker(false);


        if (!date) {
            return;
        }


        setSelectedDate(
            date
        );


        const formattedDate =
            formatDate(date);


        onChange(
            "dob",
            formattedDate
        );


        validatePersonalField?.(
            "dob",
            formattedDate
        );
    };


    return (
        <>


            {/* ========================================================= */}
            {/* Full Name */}
            {/* ========================================================= */}

            <View
                onLayout={
                    registerField
                        ? registerField("fullName")
                        : undefined
                }
            >

                <CommonInput
                    label="Full Name"

                    required

                    placeholder="As per PAN card"

                    value={
                        form?.fullName
                    }

                    onChangeText={(text) =>
                        onChange(
                            "fullName",
                            text
                        )
                    }

                    onBlur={() =>
                        validatePersonalField(
                            "fullName",
                            form?.fullName
                        )
                    }

                    error={
                        errors?.fullName
                    }

                    inputContainerStyle={{
                        borderWidth: 0,
                        borderColor: "transparent",
                    }}
                />

            </View>


            {/* ========================================================= */}
            {/* Date Of Birth */}
            {/* ========================================================= */}

            <View
                onLayout={
                    registerField
                        ? registerField("dob")
                        : undefined
                }
            >

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() =>
                        setShowDatePicker(true)
                    }
                >

                    <View
                        pointerEvents="none"
                    >

                        <CommonInput
                            label="Date of Birth"

                            required

                            placeholder="DD/MM/YYYY"

                            value={
                                form?.dob
                            }

                            error={
                                errors?.dob
                            }

                            rightIcon={
                                <CalendarDays
                                    size={20}
                                    color={
                                        theme.colors.gray500
                                    }
                                />
                            }

                            inputContainerStyle={{
                                borderWidth: 0,
                                borderColor: "transparent",
                            }}
                        />

                    </View>

                </TouchableOpacity>


                {/* ===================================================== */}
                {/* DATE PICKER */}
                {/* ===================================================== */}

                {showDatePicker && (

                    <DateTimePicker
                        value={
                            selectedDate
                        }

                        mode="date"

                        display="default"

                        maximumDate={
                            new Date()
                        }

                        onChange={
                            handleDateChange
                        }
                    />

                )}

            </View>


            {/* ========================================================= */}
            {/* Email */}
            {/* ========================================================= */}

            <View
                onLayout={
                    registerField
                        ? registerField("email")
                        : undefined
                }
            >

                <CommonInput
                    label="Email ID"

                    required

                    placeholder="you@gmail.com"

                    value={
                        form?.email
                    }

                    onChangeText={(text) =>
                        onChange(
                            "email",
                            text
                        )
                    }

                    keyboardType="email-address"

                    onBlur={() =>
                        validatePersonalField(
                            "email",
                            form?.email
                        )
                    }

                    error={
                        errors?.email
                    }

                    inputContainerStyle={{
                        borderWidth: 0,
                        borderColor: "transparent",
                    }}
                />

            </View>


            {/* ========================================================= */}
            {/* Father's Name */}
            {/* ========================================================= */}

            <View
                onLayout={
                    registerField
                        ? registerField("fatherName")
                        : undefined
                }
            >

                <CommonInput
                    label="Father's Name"

                    required

                    placeholder="Optional"

                    value={
                        form?.fatherName
                    }

                    onChangeText={(text) =>
                        onChange(
                            "fatherName",
                            text
                        )
                    }

                    onBlur={() =>
                        validatePersonalField(
                            "fatherName",
                            form?.fatherName
                        )
                    }

                    error={
                        errors?.fatherName
                    }

                    inputContainerStyle={{
                        borderWidth: 0,
                        borderColor: "transparent",
                    }}
                />

            </View>


            {/* ========================================================= */}
            {/* Mother's Name */}
            {/* ========================================================= */}

            <View
                onLayout={
                    registerField
                        ? registerField("motherName")
                        : undefined
                }
            >

                <CommonInput
                    label="Mother's Name"

                    required

                    placeholder="Optional"

                    value={
                        form?.motherName
                    }

                    onChangeText={(text) =>
                        onChange(
                            "motherName",
                            text
                        )
                    }

                    onBlur={() =>
                        validatePersonalField(
                            "motherName",
                            form?.motherName
                        )
                    }

                    error={
                        errors?.motherName
                    }

                    inputContainerStyle={{
                        borderWidth: 0,
                        borderColor: "transparent",
                    }}
                />

            </View>


            {/* ========================================================= */}
            {/* Gender */}
            {/* ========================================================= */}

            <View
                onLayout={
                    registerField
                        ? registerField("gender")
                        : undefined
                }

                style={{
                    marginBottom:
                        theme.spacing.xl,
                }}
            >

                <Text
                    style={{
                        marginBottom:
                            theme.spacing.md,

                        color:
                            theme.colors.gray700,

                        fontSize:
                            15,

                        fontFamily:
                            theme.fonts.medium,
                    }}
                >

                    Gender

                    <Text
                        style={{
                            color:
                                theme.colors.error,
                        }}
                    >
                        {" "}*
                    </Text>

                </Text>


                <View
                    style={{
                        flexDirection:
                            "row",

                        justifyContent:
                            "space-between",
                    }}
                >

                    {GENDERS.map(
                        (item, index) => (

                            <SquareChip
                                key={item}

                                title={item}

                                selected={
                                    form?.gender === item
                                }

                                onPress={() =>
                                    onSelectGender(item)
                                }

                                style={{
                                    marginRight:
                                        index !==
                                            GENDERS.length - 1
                                            ? 12
                                            : 0,
                                }}
                            />

                        )
                    )}

                </View>


                {!!errors?.gender && (

                    <Text
                        style={{
                            marginTop:
                                theme.spacing.sm,

                            color:
                                theme.colors.error,

                            fontSize:
                                12,

                            fontFamily:
                                theme.fonts.medium,
                        }}
                    >
                        {errors.gender}
                    </Text>

                )}

            </View>


            {/* ========================================================= */}
            {/* Occupation */}
            {/* ========================================================= */}

            <View
                onLayout={
                    registerField
                        ? registerField("occupation")
                        : undefined
                }

                style={{
                    marginBottom:
                        theme.spacing.xl,
                }}
            >

                <Text
                    style={{
                        marginBottom:
                            theme.spacing.md,

                        color:
                            theme.colors.gray700,

                        fontSize:
                            15,

                        fontFamily:
                            theme.fonts.medium,
                    }}
                >

                    Occupation

                    <Text
                        style={{
                            color:
                                theme.colors.error,
                        }}
                    >
                        {" "}*
                    </Text>

                </Text>


                <View
                    style={{
                        flexDirection:
                            "row",

                        flexWrap:
                            "wrap",

                        marginTop:
                            4,
                    }}
                >

                    {OCCUPATIONS.map(
                        (item) => (

                            <RoundedChip
                                key={item}

                                title={item}

                                selected={
                                    form?.occupation === item
                                }

                                onPress={() =>
                                    onSelectOccupation(item)
                                }
                            />

                        )
                    )}

                </View>


                {!!errors?.occupation && (

                    <Text
                        style={{
                            marginTop:
                                theme.spacing.sm,

                            color:
                                theme.colors.error,

                            fontSize:
                                12,

                            fontFamily:
                                theme.fonts.medium,
                        }}
                    >
                        {errors.occupation}
                    </Text>

                )}

            </View>


            {/* ========================================================= */}
            {/* Annual & Monthly Income */}
            {/* ========================================================= */}

            <View
                onLayout={
                    registerField
                        ? registerField("annualIncome")
                        : undefined
                }

                style={{
                    marginBottom:
                        theme.spacing.xl,
                }}
            >


                {/* ===================================================== */}
                {/* Annual Income */}
                {/* ===================================================== */}

                <CommonInput
                    label="Annual Income"

                    required

                    placeholder="Enter Annual Income"

                    value={
                        form?.annualIncome
                    }

                    onChangeText={(text) =>
                        onChange(
                            "annualIncome",
                            text
                        )
                    }

                    keyboardType="number-pad"

                    onBlur={() =>
                        validatePersonalField(
                            "annualIncome",
                            form?.annualIncome
                        )
                    }

                    error={
                        errors?.annualIncome
                    }

                    inputContainerStyle={{
                        borderWidth: 0,
                        borderColor: "transparent",
                    }}
                />


                {/* ===================================================== */}
                {/* Amount In Words */}
                {/* ===================================================== */}

                {form?.annualIncome?.trim() ? (

                    <Text
                        style={{
                            marginTop:
                                -8,

                            marginBottom:
                                theme.spacing.lg,

                            color:
                                theme.colors.primary500,

                            fontSize:
                                theme.typography.b3,

                            fontFamily:
                                theme.fonts.medium,
                        }}
                    >

                        {
                            convertNumberToWords(
                                form.annualIncome
                            )
                        }

                    </Text>

                ) : null}


                {/* ===================================================== */}
                {/* Monthly Income */}
                {/* ===================================================== */}

                <CommonInput
                    label="Monthly Income"

                    required

                    placeholder="Auto Calculated"

                    value={
                        form?.monthlyIncome
                    }

                    editable={false}

                    error={
                        errors?.monthlyIncome
                    }

                    inputContainerStyle={{
                        borderWidth: 0,
                        borderColor: "transparent",
                    }}
                />

            </View>


            {/* ========================================================= */}
            {/* Address */}
            {/* ========================================================= */}

            <View
                onLayout={
                    registerField
                        ? registerField("address")
                        : undefined
                }
            >

                <CommonInput
                    label="Address"

                    required

                    placeholder="Enter your address"

                    value={
                        form?.address
                    }

                    onChangeText={(text) =>
                        onChange(
                            "address",
                            text
                        )
                    }

                    multiline

                    numberOfLines={3}

                    inputStyle={{
                        minHeight: 90,

                        textAlignVertical:
                            "top",

                        paddingTop: 16,
                    }}

                    onBlur={() =>
                        validatePersonalField(
                            "address",
                            form?.address
                        )
                    }

                    error={
                        errors?.address
                    }

                    inputContainerStyle={{
                        borderWidth: 0,
                        borderColor: "transparent",
                    }}
                />

            </View>


            {/* ========================================================= */}
            {/* City & State */}
            {/* ========================================================= */}

            <View
                style={{
                    flexDirection:
                        "row",

                    gap:
                        theme.spacing.md,
                }}
            >


                {/* ===================================================== */}
                {/* City */}
                {/* ===================================================== */}

                <View
                    style={{
                        flex: 1,
                    }}

                    onLayout={
                        registerField
                            ? registerField("city")
                            : undefined
                    }
                >

                    <CommonInput
                        label="City"

                        required

                        placeholder="Enter city"

                        value={
                            form?.city
                        }

                        onChangeText={(text) =>
                            onChange(
                                "city",
                                text
                            )
                        }

                        onBlur={() =>
                            validatePersonalField(
                                "city",
                                form?.city
                            )
                        }

                        error={
                            errors?.city
                        }

                        inputContainerStyle={{
                            borderWidth: 0,
                            borderColor: "transparent",
                        }}
                    />

                </View>


                {/* ===================================================== */}
                {/* State */}
                {/* ===================================================== */}

                <View
                    style={{
                        flex: 1,
                    }}

                    onLayout={
                        registerField
                            ? registerField("state")
                            : undefined
                    }
                >

                    <CommonInput
                        label="State"

                        required

                        placeholder="Enter state"

                        value={
                            form?.state
                        }

                        onChangeText={(text) =>
                            onChange(
                                "state",
                                text
                            )
                        }

                        onBlur={() =>
                            validatePersonalField(
                                "state",
                                form?.state
                            )
                        }

                        error={
                            errors?.state
                        }

                        inputContainerStyle={{
                            borderWidth: 0,
                            borderColor: "transparent",
                        }}
                    />

                </View>

            </View>


            {/* ========================================================= */}
            {/* Pin Code */}
            {/* ========================================================= */}

            <View
                onLayout={
                    registerField
                        ? registerField("pinCode")
                        : undefined
                }
            >

                <CommonInput
                    label="Pin Code"

                    required

                    placeholder="Enter pin code"

                    value={
                        form?.pinCode
                    }

                    onChangeText={(text) =>
                        onChange(
                            "pinCode",
                            text
                        )
                    }

                    keyboardType="number-pad"

                    maxLength={6}

                    onBlur={() =>
                        validatePersonalField(
                            "pinCode",
                            form?.pinCode
                        )
                    }

                    error={
                        errors?.pinCode
                    }

                    inputContainerStyle={{
                        borderWidth: 0,
                        borderColor: "transparent",
                    }}
                />

            </View>


        </>
    );
};


export default PersonalDetailsForm;