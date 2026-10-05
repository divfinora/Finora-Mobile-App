import React, {
    useRef,
    useState,
} from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from "react-native";

import MaterialIcons
    from "@react-native-vector-icons/material-icons";

import CommonInput
    from "../../../../../../components/common/Input/CommonInput";

import NewCustomBottomSheet
    from "../../../../../../components/common/Modal/NewCustomBottomSheet";

import {
    theme,
} from "../../../../../../theme";


// =====================================================
// COURSE CATEGORY OPTIONS
// =====================================================

const COURSE_CATEGORY_OPTIONS = [
    {
        label: "Undergraduate",
        value: "UNDERGRADUATE",
    },

    {
        label: "Postgraduate",
        value: "POSTGRADUATE",
    },

    {
        label: "Other",
        value: "OTHER",
    },
];


// =====================================================
// UNDERGRADUATE COURSE OPTIONS
// =====================================================

const UNDERGRADUATE_COURSE_OPTIONS = [
    {
        label: "B.Tech",
        value: "BTECH",
    },

    {
        label: "BCA",
        value: "BCA",
    },

    {
        label: "BBA",
        value: "BBA",
    },

    {
        label: "B.Sc",
        value: "BSC",
    },

    {
        label: "BA",
        value: "BA",
    },

    {
        label: "B.Com",
        value: "BCOM",
    },

    {
        label: "MBBS",
        value: "MBBS",
    },

    {
        label: "B.Arch",
        value: "BARCH",
    },

    {
        label: "B.Pharm",
        value: "BPHARM",
    },

    {
        label: "BDS",
        value: "BDS",
    },

    {
        label: "LLB",
        value: "LLB",
    },

    {
        label: "Other",
        value: "OTHER",
    },
];


// =====================================================
// POSTGRADUATE COURSE OPTIONS
// =====================================================

const POSTGRADUATE_COURSE_OPTIONS = [
    {
        label: "M.Tech",
        value: "MTECH",
    },

    {
        label: "MCA",
        value: "MCA",
    },

    {
        label: "MBA",
        value: "MBA",
    },

    {
        label: "M.Sc",
        value: "MSC",
    },

    {
        label: "MA",
        value: "MA",
    },

    {
        label: "M.Com",
        value: "MCOM",
    },

    {
        label: "M.Arch",
        value: "MARCH",
    },

    {
        label: "M.Pharm",
        value: "MPHARM",
    },

    {
        label: "LLM",
        value: "LLM",
    },

    {
        label: "MDS",
        value: "MDS",
    },

    {
        label: "Other",
        value: "OTHER",
    },
];


// =====================================================
// OTHER COURSE OPTIONS
// =====================================================

const OTHER_COURSE_OPTIONS = [
    {
        label: "Diploma",
        value: "DIPLOMA",
    },

    {
        label: "Certificate Course",
        value: "CERTIFICATE",
    },

    {
        label: "Vocational Course",
        value: "VOCATIONAL",
    },

    {
        label: "Professional Course",
        value: "PROFESSIONAL",
    },

    {
        label: "Other",
        value: "OTHER",
    },
];


// =====================================================
// COURSE DURATION OPTIONS
// =====================================================

const COURSE_DURATION_OPTIONS = [
    {
        label: "1 Year",
        value: "1",
    },

    {
        label: "2 Years",
        value: "2",
    },

    {
        label: "3 Years",
        value: "3",
    },

    {
        label: "4 Years",
        value: "4",
    },

    {
        label: "5 Years",
        value: "5",
    },

    {
        label: "6 Years",
        value: "6",
    },
];


// =====================================================
// FAMILY INCOME OPTIONS
// =====================================================

const FAMILY_INCOME_OPTIONS = [
    {
        label: "Below ₹2 Lakh",
        value: "BELOW_2_LAKH",
    },

    {
        label: "₹2 Lakh - ₹5 Lakh",
        value: "2_TO_5_LAKH",
    },

    {
        label: "₹5 Lakh - ₹10 Lakh",
        value: "5_TO_10_LAKH",
    },

    {
        label: "₹10 Lakh - ₹20 Lakh",
        value: "10_TO_20_LAKH",
    },

    {
        label: "Above ₹20 Lakh",
        value: "ABOVE_20_LAKH",
    },
];


// =====================================================
// PASSOUT YEAR OPTIONS
// =====================================================

const PASSOUT_YEAR_OPTIONS = Array.from(
    {
        length: 15,
    },
    (_, index) => {

        const year =
            new Date().getFullYear() -
            index;

        return {
            label: String(year),
            value: String(year),
        };
    }
);


// =====================================================
// COMPONENT
// =====================================================

const Step2EducationLoanInfoDetail = ({
    form = {},
    errors = {},

    onChange = () => { },

    onBlur = () => { },

    registerFieldPosition,

    scrollViewRef,
}) => {


    // =====================================================
    // BOTTOM SHEETS
    // =====================================================

    const [
        courseCategoryVisible,
        setCourseCategoryVisible,
    ] = useState(false);


    const [
        courseVisible,
        setCourseVisible,
    ] = useState(false);


    const [
        courseDurationVisible,
        setCourseDurationVisible,
    ] = useState(false);


    const [
        familyIncomeVisible,
        setFamilyIncomeVisible,
    ] = useState(false);


    const [
        passoutYearVisible,
        setPassoutYearVisible,
    ] = useState(false);


    // =====================================================
    // FIELD REFS
    // =====================================================

    const courseCategoryRef =
        useRef(null);

    const courseRef =
        useRef(null);

    const courseDurationRef =
        useRef(null);

    const familyIncomeRef =
        useRef(null);

    const passoutYearRef =
        useRef(null);


    // =====================================================
    // REGISTER SELECT FIELD POSITION
    // =====================================================

    const registerSelectFieldPosition = (
        field,
        targetRef
    ) => {

        if (
            !targetRef?.current ||
            !scrollViewRef?.current
        ) {
            return;
        }


        requestAnimationFrame(() => {

            targetRef.current?.measureLayout(

                scrollViewRef.current,

                (_x, y) => {

                    registerFieldPosition?.(
                        field,
                        y
                    );

                },

                () => { }

            );

        });

    };


    // =====================================================
    // INPUT STYLES
    // =====================================================

    const inputContainerStyle = {

        minHeight: 45,

        height: 45,

        borderRadius: 12,

        backgroundColor:
            "#FBFCFE",

        borderColor:
            "#D9E0EA",

        borderWidth: 1,

        paddingHorizontal: 13,

    };


    const inputStyle = {

        minHeight: 43,

        height: 43,

        fontSize: 12,

        lineHeight: 17,

        fontFamily:
            theme.fonts.regular,

        color:
            "#4B5563",

        paddingVertical: 0,

    };


    const labelStyle = {

        fontSize: 14,

        lineHeight: 20,

        fontFamily:
            theme.fonts.semiBold,

        color:
            theme.colors.navy900,

    };


    const descriptionStyle = {

        marginTop: 4,

        fontSize: 13,

        lineHeight: 18,

        fontFamily:
            theme.fonts.regular,

        color:
            "#8DA0B5",

    };


    const errorStyle = {

        marginTop: 5,

        marginLeft: 2,

        fontSize: 11,

        lineHeight: 15,

        fontFamily:
            theme.fonts.medium,

        color:
            theme.colors.error,

    };


    // =====================================================
    // CHANGE
    // =====================================================

    const handleFieldChange = (
        field,
        value
    ) => {

        onChange(
            field,
            value
        );

    };


    // =====================================================
    // BLUR
    // =====================================================

    const handleFieldBlur = (
        field
    ) => {

        onBlur?.(
            field
        );

    };


    // =====================================================
    // COURSE OPTIONS BASED ON CATEGORY
    // =====================================================

    const getCourseOptions = () => {

        if (
            form?.courseCategory ===
            "UNDERGRADUATE"
        ) {

            return UNDERGRADUATE_COURSE_OPTIONS;

        }


        if (
            form?.courseCategory ===
            "POSTGRADUATE"
        ) {

            return POSTGRADUATE_COURSE_OPTIONS;

        }


        if (
            form?.courseCategory ===
            "OTHER"
        ) {

            return OTHER_COURSE_OPTIONS;

        }


        return [];

    };


    // =====================================================
    // SELECTED COURSE CATEGORY
    // =====================================================

    const selectedCourseCategory =
        COURSE_CATEGORY_OPTIONS.find(
            item =>
                item.value ===
                form?.courseCategory
        )?.label || "";


    // =====================================================
    // SELECTED COURSE
    // =====================================================

    const selectedCourse =
        getCourseOptions().find(
            item =>
                item.value ===
                form?.courseName
        )?.label || "";


    // =====================================================
    // SELECTED DURATION
    // =====================================================

    const selectedCourseDuration =
        COURSE_DURATION_OPTIONS.find(
            item =>
                item.value ===
                form?.courseDuration
        )?.label || "";


    // =====================================================
    // SELECTED FAMILY INCOME
    // =====================================================

    const selectedFamilyIncome =
        FAMILY_INCOME_OPTIONS.find(
            item =>
                item.value ===
                form?.familyIncome
        )?.label || "";


    // =====================================================
    // SELECTED PASSOUT YEAR
    // =====================================================

    const selectedPassoutYear =
        PASSOUT_YEAR_OPTIONS.find(
            item =>
                item.value ===
                form?.passoutYear
        )?.label || "";


    // =====================================================
    // SELECT COURSE CATEGORY
    // =====================================================

   const handleCourseCategorySelect = (
    value
) => {

    // =================================================
    // CATEGORY CHANGE
    // =================================================

    onChange(
        "courseCategory",
        value
    );


    // =================================================
    // RESET COURSE
    // =================================================

    onChange(
        "courseName",
        ""
    );


    // =================================================
    // RESET CATEGORY SPECIFIC DOCUMENTS
    // =================================================

    const categorySpecificDocuments = [

        "tenthMarksheet",

        "twelfthMarksheet",

        "previousDegree",

    ];


    const updatedDocuments =
        (
            form?.documents ||
            []
        ).filter(
            document =>
                !categorySpecificDocuments.includes(
                    document?.type
                )
        );


    onChange(
        "documents",
        updatedDocuments
    );


    setCourseCategoryVisible(
        false
    );

};

    // =====================================================
    // SELECT COURSE
    // =====================================================

    const handleCourseSelect = (
        value
    ) => {

        onChange(
            "courseName",
            value
        );


        setCourseVisible(
            false
        );

    };


    // =====================================================
    // GENERIC SELECT
    // =====================================================

    const handleSelect = (
        field,
        value,
        closeSheet
    ) => {

        if (
            value ===
            undefined ||
            value ===
            null
        ) {

            return;

        }


        onChange(
            field,
            value
        );


        closeSheet();

    };


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <View
            style={{
                marginHorizontal:
                    theme.spacing.lg,

                marginTop:
                    theme.spacing.lg,

                paddingBottom:
                    theme.spacing.xl,
            }}
        >

            {/* =================================================
                BANNER
            ================================================= */}

            <View
                style={{
                    marginBottom:
                        theme.spacing.lg,

                    minHeight:
                        96,

                    borderWidth:
                        theme.borderWidth.thin,

                    borderColor:
                        "#94A3B8",

                    borderRadius:
                        theme.radius.lg,

                    backgroundColor:
                        theme.colors.white,

                    paddingHorizontal:
                        theme.spacing.lg,

                    flexDirection:
                        "row",

                    alignItems:
                        "center",
                }}
            >

                <View
                    style={{
                        width: 76,

                        height: 76,

                        alignItems:
                            "center",

                        justifyContent:
                            "center",
                    }}
                >

                    <Image
                        source={
                            require(
                                "../assets/educationLoan.png"
                            )
                        }

                        style={{
                            width: 76,

                            height: 76,

                            resizeMode:
                                "contain",
                        }}
                    />

                </View>


                <View
                    style={{
                        flex: 1,

                        paddingLeft:
                            theme.spacing.sm,
                    }}
                >

                    <Text
                        style={{
                            fontSize: 14,

                            lineHeight: 20,

                            fontFamily:
                                theme.fonts.semiBold,

                            color:
                                "#111F44",
                        }}
                    >
                        Turn Your Education Goals into Reality
                    </Text>


                    <Text
                        style={{
                            marginTop:
                                theme.spacing.xs,

                            fontSize: 13,

                            lineHeight: 18,

                            fontFamily:
                                theme.fonts.medium,

                            color:
                                "#8DA0B5",
                        }}
                    >
                        Apply for an education loan to{"\n"}
                        support your studies.
                    </Text>

                </View>

            </View>


            {/* =================================================
                DETAILS CARD
            ================================================= */}

            <View
                style={{
                    paddingHorizontal:
                        theme.spacing.lg,

                    paddingTop:
                        theme.spacing.lg,

                    paddingBottom:
                        theme.spacing.lg,

                    borderRadius:
                        16,

                    backgroundColor:
                        theme.colors.white,
                }}
            >


                {/* =================================================
                    1. COURSE CATEGORY
                ================================================= */}

                <View

                    ref={
                        courseCategoryRef
                    }

                    collapsable={
                        false
                    }

                    onLayout={() => {

                        registerSelectFieldPosition(
                            "courseCategory",
                            courseCategoryRef
                        );

                    }}

                    style={{
                        marginTop:
                            0,
                    }}
                >

                    <View
                        style={{
                            flexDirection:
                                "row",

                            alignItems:
                                "flex-start",
                        }}
                    >

                        <View
                            style={{
                                width: 28,

                                height: 28,

                                borderRadius: 50,

                                backgroundColor:
                                    theme.colors.primary50,

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",

                                marginRight:
                                    theme.spacing.md,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 13,

                                    fontFamily:
                                        theme.fonts.medium,

                                    color:
                                        theme.colors.primary500,
                                }}
                            >
                                1
                            </Text>

                        </View>


                        <View
                            style={{
                                flex: 1,
                            }}
                        >

                            <Text
                                style={
                                    labelStyle
                                }
                            >
                                Course Category
                                <Text
                                    style={{
                                        fontFamily:
                                            theme.fonts.medium,

                                        color:
                                            theme.colors.error,
                                    }}
                                >
                                    *
                                </Text>
                            </Text>


                            <Text
                                style={
                                    descriptionStyle
                                }
                            >
                                Select your current level of study.
                            </Text>

                        </View>

                    </View>


                    <TouchableOpacity

                        activeOpacity={
                            0.8
                        }

                        onPress={() =>
                            setCourseCategoryVisible(
                                true
                            )
                        }

                        style={{

                            ...inputContainerStyle,

                            marginTop:
                                theme.spacing.lg,

                            flexDirection:
                                "row",

                            alignItems:
                                "center",

                            borderColor:
                                errors?.courseCategory
                                    ? theme.colors.error
                                    : "#D9E0EA",

                        }}
                    >

                        <MaterialIcons
                            name="school"
                            size={19}
                            color="#A7B6C8"
                        />


                        <Text
                            numberOfLines={
                                1
                            }

                            style={{
                                flex: 1,

                                marginLeft:
                                    8,

                                fontSize:
                                    12,

                                lineHeight:
                                    17,

                                fontFamily:
                                    theme.fonts.regular,

                                color:
                                    selectedCourseCategory
                                        ? "#4B5563"
                                        : "#9AAABD",
                            }}
                        >
                            {
                                selectedCourseCategory ||
                                "Select course category"
                            }
                        </Text>


                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={21}
                            color="#6B7280"
                        />

                    </TouchableOpacity>


                    {!!errors?.courseCategory && (

                        <Text
                            style={
                                errorStyle
                            }
                        >
                            {
                                errors.courseCategory
                            }
                        </Text>

                    )}

                </View>


                {/* =================================================
                    2. COURSE NAME
                ================================================= */}

                <View

                    ref={
                        courseRef
                    }

                    collapsable={
                        false
                    }

                    onLayout={() => {

                        registerSelectFieldPosition(
                            "courseName",
                            courseRef
                        );

                    }}

                    style={{
                        marginTop:
                            theme.spacing.lg,
                    }}
                >

                    <View
                        style={{
                            flexDirection:
                                "row",

                            alignItems:
                                "flex-start",
                        }}
                    >

                        <View
                            style={{
                                width: 28,

                                height: 28,

                                borderRadius: 50,

                                backgroundColor:
                                    theme.colors.primary50,

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",

                                marginRight:
                                    theme.spacing.md,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 13,

                                    fontFamily:
                                        theme.fonts.medium,

                                    color:
                                        theme.colors.primary500,
                                }}
                            >
                                2
                            </Text>

                        </View>


                        <View
                            style={{
                                flex: 1,
                            }}
                        >

                            <Text
                                style={
                                    labelStyle
                                }
                            >
                                Course Name
                                <Text
                                    style={{
                                        fontFamily:
                                            theme.fonts.medium,

                                        color:
                                            theme.colors.error,
                                    }}
                                >
                                    *
                                </Text>
                            </Text>


                            <Text
                                style={
                                    descriptionStyle
                                }
                            >
                                Select the course you are currently pursuing.
                            </Text>

                        </View>

                    </View>


                    <TouchableOpacity

                        activeOpacity={
                            0.8
                        }

                        disabled={
                            !form?.courseCategory
                        }

                        onPress={() =>
                            setCourseVisible(
                                true
                            )
                        }

                        style={{

                            ...inputContainerStyle,

                            marginTop:
                                theme.spacing.lg,

                            flexDirection:
                                "row",

                            alignItems:
                                "center",

                            borderColor:
                                errors?.courseName
                                    ? theme.colors.error
                                    : "#D9E0EA",

                            opacity:
                                form?.courseCategory
                                    ? 1
                                    : 0.65,

                        }}
                    >

                        <MaterialIcons
                            name="menu-book"
                            size={19}
                            color="#A7B6C8"
                        />


                        <Text
                            numberOfLines={
                                1
                            }

                            style={{
                                flex: 1,

                                marginLeft:
                                    8,

                                fontSize:
                                    12,

                                lineHeight:
                                    17,

                                fontFamily:
                                    theme.fonts.regular,

                                color:
                                    selectedCourse
                                        ? "#4B5563"
                                        : "#9AAABD",
                            }}
                        >
                            {
                                selectedCourse ||
                                (
                                    form?.courseCategory
                                        ? "Select Course"
                                        : "Select course category first"
                                )
                            }
                        </Text>


                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={21}
                            color="#6B7280"
                        />

                    </TouchableOpacity>


                    {!!errors?.courseName && (

                        <Text
                            style={
                                errorStyle
                            }
                        >
                            {
                                errors.courseName
                            }
                        </Text>

                    )}

                </View>


                {/* =================================================
                    3. SPECIALIZATION
                ================================================= */}

                <View
                    style={{
                        marginTop:
                            theme.spacing.lg,
                    }}
                >

                    <View
                        style={{
                            flexDirection:
                                "row",

                            alignItems:
                                "flex-start",
                        }}
                    >

                        <View
                            style={{
                                width: 28,

                                height: 28,

                                borderRadius: 50,

                                backgroundColor:
                                    theme.colors.primary50,

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",

                                marginRight:
                                    theme.spacing.md,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 13,

                                    fontFamily:
                                        theme.fonts.medium,

                                    color:
                                        theme.colors.primary500,
                                }}
                            >
                                3
                            </Text>

                        </View>


                        <View
                            style={{
                                flex: 1,
                            }}
                        >

                            <Text
                                style={
                                    labelStyle
                                }
                            >
                                Specialization
                                <Text
                                    style={{
                                        fontFamily:
                                            theme.fonts.regular,

                                        color:
                                            "#111F44",
                                    }}
                                >
                                    {" "}
                                    (Optional)
                                </Text>
                            </Text>


                            <Text
                                style={
                                    descriptionStyle
                                }
                            >
                                Enter your specific field of study.
                            </Text>

                        </View>

                    </View>


                    <CommonInput

                        label=""

                        placeholder="Enter Select Specialization"

                        value={
                            form?.specialization ||
                            ""
                        }

                        onChangeText={
                            value =>
                                handleFieldChange(
                                    "specialization",
                                    value
                                )
                        }

                        onBlur={() =>
                            handleFieldBlur(
                                "specialization"
                            )
                        }

                        required={
                            false
                        }

                        editable={
                            true
                        }

                        keyboardType="default"

                        autoCapitalize="words"

                        leftIcon={

                            <MaterialIcons
                                name="menu-book"
                                size={19}
                                color="#A7B6C8"
                            />

                        }

                        leftIconContainerStyle={{
                            marginLeft:
                                0,

                            marginRight:
                                8,
                        }}

                        error={null}

                        fieldName="specialization"

                        registerFieldPosition={
                            registerFieldPosition
                        }

                        scrollContentRef={
                            scrollViewRef
                        }

                        containerStyle={{
                            marginBottom:
                                0,

                            marginTop:
                                theme.spacing.lg,
                        }}

                        labelStyle={{
                            marginBottom:
                                7,

                            fontSize:
                                14,

                            lineHeight:
                                18,

                            fontFamily:
                                theme.fonts.medium,

                            color:
                                "#1F2937",
                        }}

                        inputContainerStyle={{

                            ...inputContainerStyle,

                            borderColor:
                                errors?.specialization
                                    ? theme.colors.error
                                    : "#D9E0EA",
                        }}

                        inputStyle={
                            inputStyle
                        }

                    />

                </View>


                {/* =================================================
                    4. COLLEGE / UNIVERSITY
                ================================================= */}

                <View
                    style={{
                        marginTop:
                            theme.spacing.lg,
                    }}
                >

                    <View
                        style={{
                            flexDirection:
                                "row",

                            alignItems:
                                "flex-start",
                        }}
                    >

                        <View
                            style={{
                                width: 28,

                                height: 28,

                                borderRadius: 50,

                                backgroundColor:
                                    theme.colors.primary50,

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",

                                marginRight:
                                    theme.spacing.md,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 13,

                                    fontFamily:
                                        theme.fonts.medium,

                                    color:
                                        theme.colors.primary500,
                                }}
                            >
                                4
                            </Text>

                        </View>


                        <View
                            style={{
                                flex: 1,
                            }}
                        >

                            <Text
                                style={
                                    labelStyle
                                }
                            >
                                College / University Name
                                <Text
                                    style={{
                                        fontFamily:
                                            theme.fonts.medium,

                                        color:
                                            theme.colors.error,
                                    }}
                                >
                                    *
                                </Text>
                            </Text>


                            <Text
                                style={
                                    descriptionStyle
                                }
                            >
                                Choose the institution where you’re studying.
                            </Text>

                        </View>

                    </View>


                    <CommonInput

                        label=""

                        placeholder="Enter college or university name"

                        value={
                            form?.collegeUniversity ||
                            ""
                        }

                        onChangeText={
                            value =>
                                handleFieldChange(
                                    "collegeUniversity",
                                    value
                                )
                        }

                        onBlur={() =>
                            handleFieldBlur(
                                "collegeUniversity"
                            )
                        }

                        required={
                            true
                        }

                        editable={
                            true
                        }

                        keyboardType="default"

                        autoCapitalize="words"

                        leftIcon={

                            <MaterialIcons
                                name="account-balance"
                                size={19}
                                color="#A7B6C8"
                            />

                        }

                        leftIconContainerStyle={{
                            marginLeft:
                                0,

                            marginRight:
                                8,
                        }}

                        error={null}

                        fieldName="collegeUniversity"

                        registerFieldPosition={
                            registerFieldPosition
                        }

                        scrollContentRef={
                            scrollViewRef
                        }

                        containerStyle={{
                            marginBottom:
                                0,

                            marginTop:
                                theme.spacing.lg,
                        }}

                        labelStyle={{
                            marginBottom:
                                7,

                            fontSize:
                                14,

                            lineHeight:
                                18,

                            fontFamily:
                                theme.fonts.medium,

                            color:
                                "#1F2937",
                        }}

                        inputContainerStyle={{

                            ...inputContainerStyle,

                            borderColor:
                                errors?.collegeUniversity
                                    ? theme.colors.error
                                    : "#D9E0EA",
                        }}

                        inputStyle={
                            inputStyle
                        }

                    />

                </View>


                {/* =================================================
                    5. COURSE DURATION
                ================================================= */}

                <View

                    ref={
                        courseDurationRef
                    }

                    collapsable={
                        false
                    }

                    onLayout={() => {

                        registerSelectFieldPosition(
                            "courseDuration",
                            courseDurationRef
                        );

                    }}

                    style={{
                        marginTop:
                            theme.spacing.lg,
                    }}
                >

                    <View
                        style={{
                            flexDirection:
                                "row",

                            alignItems:
                                "flex-start",
                        }}
                    >

                        <View
                            style={{
                                width: 28,

                                height: 28,

                                borderRadius: 50,

                                backgroundColor:
                                    theme.colors.primary50,

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",

                                marginRight:
                                    theme.spacing.md,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 13,

                                    fontFamily:
                                        theme.fonts.medium,

                                    color:
                                        theme.colors.primary500,
                                }}
                            >
                                5
                            </Text>

                        </View>


                        <View
                            style={{
                                flex: 1,
                            }}
                        >

                            <Text
                                style={
                                    labelStyle
                                }
                            >
                                Course Duration
                                <Text
                                    style={{
                                        fontFamily:
                                            theme.fonts.medium,

                                        color:
                                            theme.colors.error,
                                    }}
                                >
                                    *
                                </Text>
                            </Text>


                            <Text
                                style={
                                    descriptionStyle
                                }
                            >
                                Enter the total duration of your course.
                            </Text>

                        </View>

                    </View>


                    <TouchableOpacity

                        activeOpacity={
                            0.8
                        }

                        onPress={() =>
                            setCourseDurationVisible(
                                true
                            )
                        }

                        style={{

                            ...inputContainerStyle,

                            marginTop:
                                theme.spacing.lg,

                            flexDirection:
                                "row",

                            alignItems:
                                "center",

                            borderColor:
                                errors?.courseDuration
                                    ? theme.colors.error
                                    : "#D9E0EA",

                        }}
                    >

                        <MaterialIcons
                            name="access-time"
                            size={19}
                            color="#A7B6C8"
                        />


                        <Text
                            numberOfLines={
                                1
                            }

                            style={{
                                flex: 1,

                                marginLeft:
                                    8,

                                fontSize:
                                    12,

                                lineHeight:
                                    17,

                                fontFamily:
                                    theme.fonts.regular,

                                color:
                                    selectedCourseDuration
                                        ? "#4B5563"
                                        : "#9AAABD",
                            }}
                        >
                            {
                                selectedCourseDuration ||
                                "Select duration"
                            }
                        </Text>


                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={21}
                            color="#6B7280"
                        />

                    </TouchableOpacity>


                    {!!errors?.courseDuration && (

                        <Text
                            style={
                                errorStyle
                            }
                        >
                            {
                                errors.courseDuration
                            }
                        </Text>

                    )}

                </View>


                {/* =================================================
                    6. FAMILY INCOME
                ================================================= */}

                <View

                    ref={
                        familyIncomeRef
                    }

                    collapsable={
                        false
                    }

                    onLayout={() => {

                        registerSelectFieldPosition(
                            "familyIncome",
                            familyIncomeRef
                        );

                    }}

                    style={{
                        marginTop:
                            theme.spacing.lg,
                    }}
                >

                    <View
                        style={{
                            flexDirection:
                                "row",

                            alignItems:
                                "flex-start",
                        }}
                    >

                        <View
                            style={{
                                width: 28,

                                height: 28,

                                borderRadius: 50,

                                backgroundColor:
                                    theme.colors.primary50,

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",

                                marginRight:
                                    theme.spacing.md,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 13,

                                    fontFamily:
                                        theme.fonts.medium,

                                    color:
                                        theme.colors.primary500,
                                }}
                            >
                                6
                            </Text>

                        </View>


                        <View
                            style={{
                                flex: 1,
                            }}
                        >

                            <Text
                                style={
                                    labelStyle
                                }
                            >
                                Family Income
                                <Text
                                    style={{
                                        fontFamily:
                                            theme.fonts.medium,

                                        color:
                                            theme.colors.error,
                                    }}
                                >
                                    *
                                </Text>
                            </Text>


                            <Text
                                style={
                                    descriptionStyle
                                }
                            >
                                Select your annual family income range
                            </Text>

                        </View>

                    </View>


                    <TouchableOpacity

                        activeOpacity={
                            0.8
                        }

                        onPress={() =>
                            setFamilyIncomeVisible(
                                true
                            )
                        }

                        style={{

                            ...inputContainerStyle,

                            marginTop:
                                theme.spacing.lg,

                            flexDirection:
                                "row",

                            alignItems:
                                "center",

                            borderColor:
                                errors?.familyIncome
                                    ? theme.colors.error
                                    : "#D9E0EA",

                        }}
                    >

                        <MaterialIcons
                            name="currency-rupee"
                            size={19}
                            color="#A7B6C8"
                        />


                        <Text
                            numberOfLines={
                                1
                            }

                            style={{
                                flex: 1,

                                marginLeft:
                                    8,

                                fontSize:
                                    12,

                                lineHeight:
                                    17,

                                fontFamily:
                                    theme.fonts.regular,

                                color:
                                    selectedFamilyIncome
                                        ? "#4B5563"
                                        : "#9AAABD",
                            }}
                        >
                            {
                                selectedFamilyIncome ||
                                "Select annual family income"
                            }
                        </Text>


                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={21}
                            color="#6B7280"
                        />

                    </TouchableOpacity>


                    {!!errors?.familyIncome && (

                        <Text
                            style={
                                errorStyle
                            }
                        >
                            {
                                errors.familyIncome
                            }
                        </Text>

                    )}

                </View>


                {/* =================================================
                    7. PASSOUT YEAR
                ================================================= */}

                <View

                    ref={
                        passoutYearRef
                    }

                    collapsable={
                        false
                    }

                    onLayout={() => {

                        registerSelectFieldPosition(
                            "passoutYear",
                            passoutYearRef
                        );

                    }}

                    style={{
                        marginTop:
                            theme.spacing.lg,
                    }}
                >

                    <View
                        style={{
                            flexDirection:
                                "row",

                            alignItems:
                                "flex-start",
                        }}
                    >

                        <View
                            style={{
                                width: 28,

                                height: 28,

                                borderRadius: 50,

                                backgroundColor:
                                    theme.colors.primary50,

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",

                                marginRight:
                                    theme.spacing.md,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 13,

                                    fontFamily:
                                        theme.fonts.medium,

                                    color:
                                        theme.colors.primary500,
                                }}
                            >
                                7
                            </Text>

                        </View>


                        <View
                            style={{
                                flex: 1,
                            }}
                        >

                            <Text
                                style={
                                    labelStyle
                                }
                            >
                                Student Years (Passout Year)
                                <Text
                                    style={{
                                        fontFamily:
                                            theme.fonts.medium,

                                        color:
                                            theme.colors.error,
                                    }}
                                >
                                    *
                                </Text>
                            </Text>


                            <Text
                                style={
                                    descriptionStyle
                                }
                            >
                                Enter your expected course completion year.
                            </Text>

                        </View>

                    </View>


                    <TouchableOpacity

                        activeOpacity={
                            0.8
                        }

                        onPress={() =>
                            setPassoutYearVisible(
                                true
                            )
                        }

                        style={{

                            ...inputContainerStyle,

                            marginTop:
                                theme.spacing.lg,

                            flexDirection:
                                "row",

                            alignItems:
                                "center",

                            borderColor:
                                errors?.passoutYear
                                    ? theme.colors.error
                                    : "#D9E0EA",

                        }}
                    >

                        <MaterialIcons
                            name="calendar-today"
                            size={19}
                            color="#A7B6C8"
                        />


                        <Text
                            numberOfLines={
                                1
                            }

                            style={{
                                flex: 1,

                                marginLeft:
                                    8,

                                fontSize:
                                    12,

                                lineHeight:
                                    17,

                                fontFamily:
                                    theme.fonts.regular,

                                color:
                                    selectedPassoutYear
                                        ? "#4B5563"
                                        : "#9AAABD",
                            }}
                        >
                            {
                                selectedPassoutYear ||
                                "Enter passout year (2019-2020)"
                            }
                        </Text>


                        <MaterialIcons
                            name="keyboard-arrow-down"
                            size={21}
                            color="#6B7280"
                        />

                    </TouchableOpacity>


                    {!!errors?.passoutYear && (

                        <Text
                            style={
                                errorStyle
                            }
                        >
                            {
                                errors.passoutYear
                            }
                        </Text>

                    )}

                </View>

            </View>


            {/* =====================================================
                COURSE CATEGORY BOTTOM SHEET
            ===================================================== */}

            <NewCustomBottomSheet

                dragOnlyAtContentBottom={
                    true
                }

                visible={
                    courseCategoryVisible
                }

                onClose={() =>
                    setCourseCategoryVisible(
                        false
                    )
                }

                sheetheading="Select Course Category"

                heightPercent={
                    0.50
                }

                showHeader={
                    true
                }

                showDragHandle={
                    true
                }

                enableDrag={
                    true
                }

                closeOnBackdrop={
                    true
                }

                closeOnDragDown={
                    true
                }

                sheetBg="#FFFFFF"

                contentStyle={{
                    paddingHorizontal:
                        4,

                    paddingTop:
                        8,
                }}
            >

                <Text
                    style={{
                        marginBottom:
                            theme.spacing.lg,

                        fontSize:
                            13,

                        fontFamily:
                            theme.fonts.regular,

                        color:
                            "#7D8EA3",
                    }}
                >
                    Select your current education level
                </Text>


                {COURSE_CATEGORY_OPTIONS.map(
                    option => {

                        const selected =
                            form?.courseCategory ===
                            option.value;


                        return (

                            <TouchableOpacity

                                key={
                                    option.value
                                }

                                activeOpacity={
                                    0.8
                                }

                                onPress={() =>
                                    handleCourseCategorySelect(
                                        option.value
                                    )
                                }

                                style={{
                                    minHeight:
                                        54,

                                    paddingHorizontal:
                                        16,

                                    marginHorizontal:
                                        4,

                                    marginVertical:
                                        4,

                                    borderRadius:
                                        12,

                                    flexDirection:
                                        "row",

                                    alignItems:
                                        "center",

                                    justifyContent:
                                        "space-between",

                                    backgroundColor:
                                        selected
                                            ? theme.colors.primary100
                                            : theme.colors.white,

                                    borderWidth:
                                        selected
                                            ? 1
                                            : 0.5,

                                    borderColor:
                                        selected
                                            ? theme.colors.primary300
                                            : theme.colors.gray200,
                                }}
                            >

                                <View
                                    style={{
                                        flexDirection:
                                            "row",

                                        alignItems:
                                            "center",

                                        flex: 1,
                                    }}
                                >

                                    <View
                                        style={{
                                            width: 38,

                                            height: 38,

                                            borderRadius:
                                                10,

                                            backgroundColor:
                                                selected
                                                    ? theme.colors.primary50
                                                    : "#F8FAFC",

                                            alignItems:
                                                "center",

                                            justifyContent:
                                                "center",

                                            marginRight:
                                                12,
                                        }}
                                    >

                                        <MaterialIcons
                                            name="school"
                                            size={20}
                                            color={
                                                selected
                                                    ? theme.colors.primary500
                                                    : "#8FA0B2"
                                            }
                                        />

                                    </View>


                                    <Text
                                        style={{
                                            flex: 1,

                                            fontSize:
                                                14,

                                            fontFamily:
                                                theme.fonts.semiBold,

                                            color:
                                                selected
                                                    ? theme.colors.primary900
                                                    : theme.colors.navy900,
                                        }}
                                    >
                                        {
                                            option.label
                                        }
                                    </Text>

                                </View>


                                {selected && (

                                    <MaterialIcons
                                        name="check-circle"
                                        size={22}
                                        color={
                                            theme.colors.primary500
                                        }
                                    />

                                )}

                            </TouchableOpacity>

                        );

                    }
                )}

            </NewCustomBottomSheet>


            {/* =====================================================
                COURSE BOTTOM SHEET
            ===================================================== */}

            <NewCustomBottomSheet

                dragOnlyAtContentBottom={
                    true
                }

                visible={
                    courseVisible
                }

                onClose={() =>
                    setCourseVisible(
                        false
                    )
                }

                sheetheading="Select Course"

                heightPercent={
                    0.65
                }

                showHeader={
                    true
                }

                showDragHandle={
                    true
                }

                enableDrag={
                    true
                }

                closeOnBackdrop={
                    true
                }

                closeOnDragDown={
                    true
                }

                sheetBg="#FFFFFF"

                contentStyle={{
                    paddingHorizontal:
                        4,

                    paddingTop:
                        8,
                }}
            >

                <Text
                    style={{
                        marginBottom:
                            theme.spacing.lg,

                        fontSize:
                            13,

                        fontFamily:
                            theme.fonts.regular,

                        color:
                            "#7D8EA3",
                    }}
                >
                    Select your course
                </Text>


                {getCourseOptions().map(
                    option => {

                        const selected =
                            form?.courseName ===
                            option.value;


                        return (

                            <TouchableOpacity

                                key={
                                    option.value
                                }

                                activeOpacity={
                                    0.8
                                }

                                onPress={() =>
                                    handleCourseSelect(
                                        option.value
                                    )
                                }

                                style={{
                                    minHeight:
                                        54,

                                    paddingHorizontal:
                                        16,

                                    marginHorizontal:
                                        4,

                                    marginVertical:
                                        4,

                                    borderRadius:
                                        12,

                                    flexDirection:
                                        "row",

                                    alignItems:
                                        "center",

                                    justifyContent:
                                        "space-between",

                                    backgroundColor:
                                        selected
                                            ? theme.colors.primary100
                                            : theme.colors.white,

                                    borderWidth:
                                        selected
                                            ? 1
                                            : 0.5,

                                    borderColor:
                                        selected
                                            ? theme.colors.primary300
                                            : theme.colors.gray200,
                                }}
                            >

                                <View
                                    style={{
                                        flexDirection:
                                            "row",

                                        alignItems:
                                            "center",

                                        flex: 1,
                                    }}
                                >

                                    <View
                                        style={{
                                            width: 38,

                                            height: 38,

                                            borderRadius:
                                                10,

                                            backgroundColor:
                                                selected
                                                    ? theme.colors.primary50
                                                    : "#F8FAFC",

                                            alignItems:
                                                "center",

                                            justifyContent:
                                                "center",

                                            marginRight:
                                                12,
                                        }}
                                    >

                                        <MaterialIcons
                                            name="menu-book"
                                            size={20}
                                            color={
                                                selected
                                                    ? theme.colors.primary500
                                                    : "#8FA0B2"
                                            }
                                        />

                                    </View>


                                    <Text
                                        style={{
                                            flex: 1,

                                            fontSize:
                                                14,

                                            fontFamily:
                                                theme.fonts.semiBold,

                                            color:
                                                selected
                                                    ? theme.colors.primary900
                                                    : theme.colors.navy900,
                                        }}
                                    >
                                        {
                                            option.label
                                        }
                                    </Text>

                                </View>


                                {selected && (

                                    <MaterialIcons
                                        name="check-circle"
                                        size={22}
                                        color={
                                            theme.colors.primary500
                                        }
                                    />

                                )}

                            </TouchableOpacity>

                        );

                    }
                )}

            </NewCustomBottomSheet>


            {/* =====================================================
                COURSE DURATION SHEET
            ===================================================== */}

            <NewCustomBottomSheet

                dragOnlyAtContentBottom={
                    true
                }

                visible={
                    courseDurationVisible
                }

                onClose={() =>
                    setCourseDurationVisible(
                        false
                    )
                }

                sheetheading="Select Course Duration"

                heightPercent={
                    0.60
                }

                showHeader={
                    true
                }

                showDragHandle={
                    true
                }

                enableDrag={
                    true
                }

                closeOnBackdrop={
                    true
                }

                closeOnDragDown={
                    true
                }

                sheetBg="#FFFFFF"

                contentStyle={{
                    paddingHorizontal:
                        4,

                    paddingTop:
                        8,
                }}
            >

                <Text
                    style={{
                        marginBottom:
                            theme.spacing.lg,

                        fontSize:
                            13,

                        fontFamily:
                            theme.fonts.regular,

                        color:
                            "#7D8EA3",
                    }}
                >
                    Choose the total duration of your course
                </Text>


                {COURSE_DURATION_OPTIONS.map(
                    option => {

                        const selected =
                            form?.courseDuration ===
                            option.value;


                        return (

                            <TouchableOpacity

                                key={
                                    option.value
                                }

                                activeOpacity={
                                    0.8
                                }

                                onPress={() =>
                                    handleSelect(
                                        "courseDuration",
                                        option.value,
                                        () =>
                                            setCourseDurationVisible(
                                                false
                                            )
                                    )
                                }

                                style={{
                                    minHeight:
                                        54,

                                    paddingHorizontal:
                                        16,

                                    marginHorizontal:
                                        4,

                                    marginVertical:
                                        4,

                                    borderRadius:
                                        12,

                                    flexDirection:
                                        "row",

                                    alignItems:
                                        "center",

                                    justifyContent:
                                        "space-between",

                                    backgroundColor:
                                        selected
                                            ? theme.colors.primary100
                                            : theme.colors.white,

                                    borderWidth:
                                        selected
                                            ? 1
                                            : 0.5,

                                    borderColor:
                                        selected
                                            ? theme.colors.primary300
                                            : theme.colors.gray200,
                                }}
                            >

                                <Text
                                    style={{
                                        flex: 1,

                                        fontSize:
                                            14,

                                        fontFamily:
                                            theme.fonts.semiBold,

                                        color:
                                            selected
                                                ? theme.colors.primary900
                                                : theme.colors.navy900,
                                    }}
                                >
                                    {
                                        option.label
                                    }
                                </Text>


                                {selected && (

                                    <MaterialIcons
                                        name="check-circle"
                                        size={22}
                                        color={
                                            theme.colors.primary500
                                        }
                                    />

                                )}

                            </TouchableOpacity>

                        );

                    }
                )}

            </NewCustomBottomSheet>


            {/* =====================================================
                FAMILY INCOME SHEET
            ===================================================== */}

            <NewCustomBottomSheet

                dragOnlyAtContentBottom={
                    true
                }

                visible={
                    familyIncomeVisible
                }

                onClose={() =>
                    setFamilyIncomeVisible(
                        false
                    )
                }

                sheetheading="Select Family Income"

                heightPercent={
                    0.60
                }

                showHeader={
                    true
                }

                showDragHandle={
                    true
                }

                enableDrag={
                    true
                }

                closeOnBackdrop={
                    true
                }

                closeOnDragDown={
                    true
                }

                sheetBg="#FFFFFF"

                contentStyle={{
                    paddingHorizontal:
                        4,

                    paddingTop:
                        8,
                }}
            >

                <Text
                    style={{
                        marginBottom:
                            theme.spacing.lg,

                        fontSize:
                            13,

                        fontFamily:
                            theme.fonts.regular,

                        color:
                            "#7D8EA3",
                    }}
                >
                    Choose your annual family income range
                </Text>


                {FAMILY_INCOME_OPTIONS.map(
                    option => {

                        const selected =
                            form?.familyIncome ===
                            option.value;


                        return (

                            <TouchableOpacity

                                key={
                                    option.value
                                }

                                activeOpacity={
                                    0.8
                                }

                                onPress={() =>
                                    handleSelect(
                                        "familyIncome",
                                        option.value,
                                        () =>
                                            setFamilyIncomeVisible(
                                                false
                                            )
                                    )
                                }

                                style={{
                                    minHeight:
                                        54,

                                    paddingHorizontal:
                                        16,

                                    marginHorizontal:
                                        4,

                                    marginVertical:
                                        4,

                                    borderRadius:
                                        12,

                                    flexDirection:
                                        "row",

                                    alignItems:
                                        "center",

                                    justifyContent:
                                        "space-between",

                                    backgroundColor:
                                        selected
                                            ? theme.colors.primary100
                                            : theme.colors.white,

                                    borderWidth:
                                        selected
                                            ? 1
                                            : 0.5,

                                    borderColor:
                                        selected
                                            ? theme.colors.primary300
                                            : theme.colors.gray200,
                                }}
                            >

                                <Text
                                    style={{
                                        flex: 1,

                                        fontSize:
                                            14,

                                        fontFamily:
                                            theme.fonts.semiBold,

                                        color:
                                            selected
                                                ? theme.colors.primary900
                                                : theme.colors.navy900,
                                    }}
                                >
                                    {
                                        option.label
                                    }
                                </Text>


                                {selected && (

                                    <MaterialIcons
                                        name="check-circle"
                                        size={22}
                                        color={
                                            theme.colors.primary500
                                        }
                                    />

                                )}

                            </TouchableOpacity>

                        );

                    }
                )}

            </NewCustomBottomSheet>


            {/* =====================================================
                PASSOUT YEAR SHEET
            ===================================================== */}

            <NewCustomBottomSheet

                dragOnlyAtContentBottom={
                    true
                }

                visible={
                    passoutYearVisible
                }

                onClose={() =>
                    setPassoutYearVisible(
                        false
                    )
                }

                sheetheading="Select Passout Year"

                heightPercent={
                    0.60
                }

                showHeader={
                    true
                }

                showDragHandle={
                    true
                }

                enableDrag={
                    true
                }

                closeOnBackdrop={
                    true
                }

                closeOnDragDown={
                    true
                }

                sheetBg="#FFFFFF"

                contentStyle={{
                    paddingHorizontal:
                        4,

                    paddingTop:
                        8,
                }}
            >

                <Text
                    style={{
                        marginBottom:
                            theme.spacing.lg,

                        fontSize:
                            13,

                        fontFamily:
                            theme.fonts.regular,

                        color:
                            "#7D8EA3",
                    }}
                >
                    Select your expected course completion year
                </Text>


                {PASSOUT_YEAR_OPTIONS.map(
                    option => {

                        const selected =
                            form?.passoutYear ===
                            option.value;


                        return (

                            <TouchableOpacity

                                key={
                                    option.value
                                }

                                activeOpacity={
                                    0.8
                                }

                                onPress={() =>
                                    handleSelect(
                                        "passoutYear",
                                        option.value,
                                        () =>
                                            setPassoutYearVisible(
                                                false
                                            )
                                    )
                                }

                                style={{
                                    minHeight:
                                        54,

                                    paddingHorizontal:
                                        16,

                                    marginHorizontal:
                                        4,

                                    marginVertical:
                                        4,

                                    borderRadius:
                                        12,

                                    flexDirection:
                                        "row",

                                    alignItems:
                                        "center",

                                    justifyContent:
                                        "space-between",

                                    backgroundColor:
                                        selected
                                            ? theme.colors.primary100
                                            : theme.colors.white,

                                    borderWidth:
                                        selected
                                            ? 1
                                            : 0.5,

                                    borderColor:
                                        selected
                                            ? theme.colors.primary300
                                            : theme.colors.gray200,
                                }}
                            >

                                <Text
                                    style={{
                                        flex: 1,

                                        fontSize:
                                            14,

                                        fontFamily:
                                            theme.fonts.semiBold,

                                        color:
                                            selected
                                                ? theme.colors.primary900
                                                : theme.colors.navy900,
                                    }}
                                >
                                    {
                                        option.label
                                    }
                                </Text>


                                {selected && (

                                    <MaterialIcons
                                        name="check-circle"
                                        size={22}
                                        color={
                                            theme.colors.primary500
                                        }
                                    />

                                )}

                            </TouchableOpacity>

                        );

                    }
                )}

            </NewCustomBottomSheet>

        </View>

    );
};


export default Step2EducationLoanInfoDetail;