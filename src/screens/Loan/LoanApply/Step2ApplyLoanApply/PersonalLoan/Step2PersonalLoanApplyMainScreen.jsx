import React, {
    useEffect,
    useRef,
    useState,
} from "react";

import {
    View,
    ScrollView,
    Text,
    RefreshControl,
    ActivityIndicator,
    BackHandler,
} from "react-native";

import {
    useNavigation,
} from "@react-navigation/native";

import {
    ArrowRight,
} from "lucide-react-native";



















import {
    SafeAreaView,
} from "react-native-safe-area-context";


import MaterialIcons from "@react-native-vector-icons/material-icons";



import NewFlowCommonHeader from "../../../../../components/common/BackButton/NewFlowCommonHeader";
import KeyboardAvoidingBottomView from "../../../../../components/common/KeyBoard/KeyboardAvoidingBottomView";
import CommonButton from "../../../../../components/common/Button/CommonButton";
import Step1ApplyLoanPersonalDetailBasicDetailsBenefits from "../../Step1ApplyLoanPersonalDetail/components/Step1ApplyLoanPersonalDetailBasicDetailsBenefits";
import Step1ApplyLoanPersonalDetailPersonalDetailsSection from "../../Step1ApplyLoanPersonalDetail/components/Step1ApplyLoanPersonalDetailPersonalDetailsSection";

import HelpTicketBottomSheet from "../../Step1ApplyLoanPersonalDetail/components/HelpTicketBottomSheet";
import LoanApplicationSuccessBottomSheet from "../../Step1ApplyLoanPersonalDetail/components/LoanApplicationSuccessBottomSheet";
import { useCustomerKYCVerificationDoneAndNotDoneQuery } from "../../../../../redux/features/customer/customerApi";
import { useLoanApplicationPrefill } from "../../../../../hooks/useLoanApplicationPrefill";
import { resetToTab } from "../../../../../navigation/navigationReset";
import { theme } from "../../../../../theme";
import Step2PersonalLoanEmploymentInfo from './components/Step2PersonalLoanEmploymentInfo.jsx'
import Step3PersonalLoanDocumentUpload from './components/Step3PersonalLoanDocumentUpload.jsx'



// =====================================================
// COMPONENT
// =====================================================

const Step2PersonalLoanApplyMainScreen = ({
    route,
}) => {

    const navigation =
        useNavigation();

    const [
        helpSheetVisible,
        setHelpSheetVisible,
    ] = useState(false);


    // =====================================================
    // SUCCESS SHEET
    // =====================================================

    const [
        successSheetVisible,
        setSuccessSheetVisible,
    ] = useState(false);


    // =====================================================
    // CURRENT STEP
    // =====================================================

    const [
        currentStep,
        setCurrentStep,
    ] = useState(1);


    // =====================================================
    // HEADER TITLE
    // =====================================================

    const headerTitle =
        currentStep === 1
            ? "Basic Details"
            : currentStep === 2
                ? "Employment Info"
                : "Document Upload";


    // =====================================================
    // LOCKED FIELDS
    // =====================================================

    const [
        lockedFields,
        setLockedFields,
    ] = useState({
        panNumber: false,
        accountNumber: false,
        aadhaarNumber: false,
    });


    // =====================================================
    // KYC VERIFICATION API
    // =====================================================

    const {
        data: verificationResponse,
        isLoading: verificationLoading,
        isFetching: verificationFetching,
        isError: verificationError,
        refetch: refetchVerification,
    } = useCustomerKYCVerificationDoneAndNotDoneQuery();


    // =====================================================
    // PREFILL API
    // =====================================================


    const {
        isLoading: prefillLoading,
        isFetching: prefillFetching,
        isError: prefillError,
        refetch: refetchPrefill,
    } = useLoanApplicationPrefill();


    // =====================================================
    // FORM
    // =====================================================

    const [
        form,
        setForm,
    ] = useState({

        // STEP 1
        fullName: "",
        panNumber: "",
        accountNumber: "",
        aadhaarNumber: "",
        addressLine1: "",
        city: "",
        state: "",
        pincode: "",

        // STEP 2
        employmentType: "",

        // Self Employed
        businessName: "",
        businessType: "",
        businessExperience: "",

        // Salaried Person
        companyName: "",
        designation: "",
        experience: "",

        // Common
        monthlyIncome: "",
        employmentPincode: "",

        // STEP 3
        documents: [],

        // OLD FIELD - keep for backward compatibility
        loanAmount: null,

    });

    // =====================================================
    // ERRORS
    // =====================================================

    const [
        errors,
        setErrors,
    ] = useState({});


    // =====================================================
    // ONLY FOR STEP 1 ERROR SCROLL
    // =====================================================

    const scrollViewRef =
        useRef(null);


    const fieldPositions =
        useRef({});


    const registerFieldPosition = (
        fieldName,
        y
    ) => {

        if (!fieldName) {
            return;
        }


        fieldPositions.current[
            fieldName
        ] = y;

    };


    const scrollToFirstError = (newErrors, errorOrder) => {
        const firstErrorField = errorOrder.find(field => newErrors[field]);
        if (!firstErrorField) return;

        requestAnimationFrame(() => {
            const y = fieldPositions.current?.[firstErrorField];
            if (typeof y !== "number" || !scrollViewRef.current) return;

            scrollViewRef.current.scrollTo({
                y: Math.max(y - 30, 0),
                animated: true,
            });
        });
    };

    const updateFieldError = (fieldName, newErrors) => {
        setErrors(previous => {
            const updated = { ...previous };
            if (newErrors[fieldName]) updated[fieldName] = newErrors[fieldName];
            else delete updated[fieldName];
            return updated;
        });
    };


    // =====================================================
    // PULL TO REFRESH
    // =====================================================

    const [
        refreshing,
        setRefreshing,
    ] = useState(false);


    const [
        refreshSuccess,
        setRefreshSuccess,
    ] = useState(false);


    const loading =
        verificationLoading ||
        verificationFetching ||
        prefillLoading ||
        prefillFetching;


    const handleRefresh =
        async () => {

            // Already refresh running
            if (
                refreshing ||
                loading
            ) {
                return;
            }


            try {

                setRefreshing(true);

                setRefreshSuccess(false);


                await Promise.all([
                    refetchVerification(),
                    refetchPrefill(),
                ]);


                setRefreshSuccess(true);


                setTimeout(() => {

                    setRefreshSuccess(false);

                }, 1800);


            } catch (error) {

                console.log(
                    "Refresh error:",
                    error
                );

            } finally {

                setRefreshing(false);

            }

        };


    useEffect(() => {

        if (loading) {

            setRefreshing(false);

        }

    }, [
        loading,
    ]);


    // =====================================================
    // KYC STATUS
    // =====================================================

    const verification =
        verificationResponse?.data;


    const kycCompleted =
        !verificationError &&
        !prefillError &&
        verification?.isVerification === true &&
        verification?.kycStatus === "VERIFIED";


    console.log(
        kycCompleted,
        "KycComplete"
    );



    useEffect(() => {

        // Fake prefilled data
        setForm({
            // STEP 1
            fullName: "Amit Kumar",
            panNumber: "ABCDE1234F",
            accountNumber: "123456789012",
            aadhaarNumber: "123456789012",
            addressLine1: "Sector 12, Dwarka",
            city: "New Delhi",
            state: "Delhi",
            pincode: "110075",

            // STEP 2
            employmentType: "",
            companyName: "",
            designation: "",
            monthlyIncome: "",
            experience: "",
            employmentPincode: "",

            // STEP 3
            documents: [],

            // OLD FIELD - keep for backward compatibility
            loanAmount: null,
        });

        // Fake saved KYC fields
        setLockedFields({
            panNumber: true,
            accountNumber: true,
            aadhaarNumber: true,
        });

    }, []);


    // =====================================================
    // CHANGE FIELD
    // =====================================================


    const handleChange = (field, value) => {
        setForm(previous => ({ ...previous, [field]: value }));

        setErrors(previous => {
            if (!previous[field]) return previous;
            const updated = { ...previous };
            delete updated[field];
            return updated;
        });
    };

    // =====================================================
    // FIELD BLUR
    // =====================================================

    const handleBlur = (
        fieldName
    ) => {

        if (
            currentStep === 1
        ) {

            validateStep1(
                fieldName
            );

        } else {

            validateEmploymentDetails(
                fieldName
            );

        }

    };


    // =====================================================
    // STEP 1 VALIDATION
    // =====================================================

    const validateStep1 = (fieldName = null) => {

        const fields =
            fieldName
                ? [fieldName]
                : [
                    "fullName",
                    "panNumber",
                    "accountNumber",
                    "aadhaarNumber",
                    "addressLine1",
                    "city",
                    "state",
                    "pincode",
                ];


        const newErrors = {};


        fields.forEach(
            field => {

                // Skip fields already filled/locked from KYC
                if (lockedFields[field]) {
                    return;
                }

                const value = form[field] || "";

                const trimmedValue =
                    typeof value === "string"
                        ? value.trim()
                        : value;


                // =================================================
                // FULL NAME
                // =================================================

                if (
                    field === "fullName" &&
                    !trimmedValue
                ) {
                    newErrors.fullName =
                        "Please enter your full name";
                }


                // =================================================
                // PAN
                // =================================================

                if (
                    field === "panNumber"
                ) {

                    if (!trimmedValue) {
                        newErrors.panNumber =
                            "Please enter your PAN number";
                    } else if (
                        !/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(
                            trimmedValue
                        )
                    ) {
                        newErrors.panNumber =
                            "Please enter a valid PAN number";
                    }

                }


                // =================================================
                // BANK ACCOUNT
                // =================================================

                if (
                    field === "accountNumber" &&
                    !trimmedValue
                ) {
                    newErrors.accountNumber =
                        "Please enter your bank account number";
                }


                // =================================================
                // AADHAAR
                // =================================================

                if (
                    field === "aadhaarNumber"
                ) {

                    if (!trimmedValue) {
                        newErrors.aadhaarNumber =
                            "Please enter your Aadhaar number";
                    } else if (
                        !/^[0-9]{12}$/.test(
                            trimmedValue
                        )
                    ) {
                        newErrors.aadhaarNumber =
                            "Please enter a valid 12 digit Aadhaar number";
                    }

                }


                // =================================================
                // ADDRESS
                // =================================================

                if (
                    field === "addressLine1" &&
                    !trimmedValue
                ) {
                    newErrors.addressLine1 =
                        "Please enter your address";
                }


                // =================================================
                // CITY
                // =================================================

                if (
                    field === "city" &&
                    !trimmedValue
                ) {
                    newErrors.city =
                        "Please enter your city";
                }


                // =================================================
                // STATE
                // =================================================

                if (
                    field === "state" &&
                    !trimmedValue
                ) {
                    newErrors.state =
                        "Please enter your state";
                }


                // =================================================
                // PINCODE
                // =================================================

                if (
                    field === "pincode"
                ) {

                    if (!trimmedValue) {
                        newErrors.pincode =
                            "Please enter your pincode";
                    } else if (
                        !/^[0-9]{6}$/.test(
                            trimmedValue
                        )
                    ) {
                        newErrors.pincode =
                            "Please enter a valid 6 digit pincode";
                    }

                }

            }
        );


        // =====================================================
        // FIELD BLUR
        // =====================================================

        if (fieldName) {

            updateFieldError(fieldName, newErrors);

            return (
                Object.keys(newErrors).length === 0
            );
        }


        // =====================================================
        // CONTINUE
        // =====================================================

        setErrors(
            newErrors
        );


        if (
            Object.keys(newErrors).length > 0
        ) {
            scrollToFirstError(newErrors, [
                "fullName", "panNumber", "accountNumber", "aadhaarNumber",
                "addressLine1", "city", "state", "pincode",
            ]);
        }


        return (
            Object.keys(newErrors).length === 0
        );

    };


    // =====================================================
    // STEP 2 VALIDATION
    // =====================================================

    const validateEmploymentDetails = (
        fieldName = null
    ) => {

        const isSelfEmployed =
            form?.employmentType === "Self Employed";

        // =====================================================
        // FIELDS TO VALIDATE
        // =====================================================

        const fields =
            fieldName
                ? [fieldName]
                : [
                    "employmentType",

                    ...(isSelfEmployed
                        ? [
                            "businessName",
                            "businessType",
                            "monthlyIncome",
                            "businessExperience",
                        ]
                        : [
                            "companyName",
                            "designation",
                            "monthlyIncome",
                            "experience",
                        ]),

                    "employmentPincode",
                ];

        const newErrors = {};

        // =====================================================
        // VALIDATE EACH FIELD
        // =====================================================

        fields.forEach(field => {

            const value =
                form?.[field] ?? "";

            const trimmedValue =
                typeof value === "string"
                    ? value.trim()
                    : value;


            // =================================================
            // EMPLOYMENT TYPE
            // =================================================

            if (
                field === "employmentType" &&
                !trimmedValue
            ) {
                newErrors.employmentType =
                    "Please select your employment type";
            }


            // =================================================
            // SELF EMPLOYED
            // =================================================

            // BUSINESS / ORGANIZATION NAME
            if (
                field === "businessName" &&
                !trimmedValue
            ) {
                newErrors.businessName =
                    "Please enter your business name";
            }


            // BUSINESS TYPE
            if (
                field === "businessType" &&
                !trimmedValue
            ) {
                newErrors.businessType =
                    "Please select your business type";
            }


            // NATURE OF BUSINESS



            // BUSINESS EXPERIENCE
            if (
                field === "businessExperience" &&
                !trimmedValue
            ) {
                newErrors.businessExperience =
                    "Please select your business experience";
            }


            // =================================================
            // SALARIED PERSON
            // =================================================

            // COMPANY NAME
            if (
                field === "companyName" &&
                !trimmedValue
            ) {
                newErrors.companyName =
                    "Please enter your company name";
            }


            // DESIGNATION
            if (
                field === "designation" &&
                !trimmedValue
            ) {
                newErrors.designation =
                    "Please enter your designation";
            }


            // EXPERIENCE
            if (
                field === "experience" &&
                !trimmedValue
            ) {
                newErrors.experience =
                    "Please select your experience";
            }


            // =================================================
            // MONTHLY INCOME
            // =================================================

            if (
                field === "monthlyIncome"
            ) {

                if (
                    !trimmedValue
                ) {

                    newErrors.monthlyIncome =
                        "Please enter your monthly income";

                } else if (
                    !/^[0-9]+$/.test(
                        String(trimmedValue)
                    ) ||
                    Number(trimmedValue) <= 0
                ) {

                    newErrors.monthlyIncome =
                        "Please enter a valid monthly income";
                }
            }


            // =================================================
            // EMPLOYMENT PIN CODE
            // =================================================

            if (
                field === "employmentPincode"
            ) {

                if (
                    !trimmedValue
                ) {

                    newErrors.employmentPincode =
                        "Please enter your pincode";

                } else if (
                    !/^[0-9]{6}$/.test(
                        String(trimmedValue)
                    )
                ) {

                    newErrors.employmentPincode =
                        "Please enter a valid 6 digit pincode";
                }
            }

        });


        // =====================================================
        // FIELD BLUR
        // =====================================================

        if (fieldName) {

            updateFieldError(fieldName, newErrors);

            return (
                Object.keys(newErrors).length === 0
            );
        }


        // =====================================================
        // CONTINUE
        // =====================================================

        setErrors(newErrors);


        if (Object.keys(newErrors).length > 0) {
            scrollToFirstError(newErrors, [
                "employmentType",
                ...(isSelfEmployed
                    ? ["businessName", "businessType", "monthlyIncome", "businessExperience"]
                    : ["companyName", "designation", "monthlyIncome", "experience"]),
                "employmentPincode",
            ]);
        }


        return (
            Object.keys(newErrors).length === 0
        );
    };

    // =====================================================
    // STEP 3 DOCUMENT VALIDATION
    // =====================================================

    const validateStep3 = () => {

        const newErrors = {};

        const requiredDocuments = [
            {
                key: "panCard",
                minFiles: 2,
                message: "Please upload PAN Card front and back image",
            },
            {
                key: "aadharCard",
                minFiles: 2,
                message: "Please upload Aadhaar Card front and back image",
            },
            {
                key: "salarySlips",
                minFiles: 3,
                message: "Please upload all 3 salary slips",
            },
            {
                key: "bankStatement",
                minFiles: 1,
                message: "Please upload your bank statement",
            },
            {
                key: "addressProof",
                minFiles: 1,
                message: "Please upload your address proof",
            },
        ];

        const documents =
            form?.documents || [];

        requiredDocuments.forEach(
            document => {

                const uploadedDocument =
                    documents.find(
                        item =>
                            item?.type ===
                            document.key
                    );

                const fileCount =
                    uploadedDocument?.files?.length || 0;

                if (
                    fileCount <
                    document.minFiles
                ) {

                    newErrors[
                        document.key
                    ] =
                        document.message;
                }
            }
        );

        setErrors(
            newErrors
        );

        return (
            Object.keys(
                newErrors
            ).length === 0
        );
    };


    // =====================================================
    // STEP 1 CONTINUE
    // =====================================================

    const handleStep1Continue = () => {

        const isValid =
            validateStep1();


        if (!isValid) {
            return;
        }


        // Clear old errors

        setErrors({});


        // Move to STEP 2

        setCurrentStep(2);


        // Scroll Step 2 to top

        requestAnimationFrame(() => {

            scrollViewRef.current?.scrollTo({
                y: 0,
                animated: false,
            });

        });

    };


    // =====================================================
    // STEP 2 CONTINUE
    // =====================================================

    const handleStep2Continue = () => {

        const isValid = validateEmploymentDetails();
        console.log("STEP 2 VALID:", isValid);

        if (!isValid) {
            return;
        }

        // Clear old errors
        setErrors({});

        // Move to STEP 3
        setCurrentStep(3);

        // Scroll STEP 3 to top
        requestAnimationFrame(() => {

            scrollViewRef.current?.scrollTo({
                y: 0,
                animated: false,
            });

        });

    };


    // =====================================================
    // STEP 3 CONTINUE
    // =====================================================

    const handleStep3Continue = () => {

        const isValid =
            validateStep3();

        if (!isValid) {
            return;
        }

        const finalForm = {
            ...form,
        };

        console.log(
            "Final Loan Application Data:",
            finalForm
        );

        setSuccessSheetVisible(
            true
        );
    };


    // =====================================================
    // SUCCESS SHEET CLOSE
    // =====================================================

    const handleSuccessSheetClose = () => {

        setSuccessSheetVisible(false);

        // resetToTab(
        //     navigation,
        //     "Home"
        // );

    };


    // =====================================================
    // SUCCESS SHEET - GO TO DASHBOARD
    // =====================================================

    const handleSuccessGoToDashboard = () => {

        setSuccessSheetVisible(false);

        resetToTab(
            navigation,
            "History"
        );

    };


    // =====================================================
    // HEADER BACK
    // =====================================================

    const handleBack = () => {

        // -----------------------------------------------
        // STEP 3 -> STEP 2
        // STEP 2 -> STEP 1
        // -----------------------------------------------

        if (
            currentStep > 1
        ) {

            setErrors({});

            setCurrentStep(
                previous => previous - 1
            );


            requestAnimationFrame(() => {

                scrollViewRef.current?.scrollTo({
                    y: 0,
                    animated: false,
                });

            });


            return;

        }


        // -----------------------------------------------
        // STEP 1 -> PREVIOUS SCREEN
        // -----------------------------------------------

        navigation.goBack();

    };

    // =====================================================
    // ANDROID HARDWARE BACK
    // =====================================================

    useEffect(() => {

        const onBackPress = () => {

            // Step 3 -> Step 2
            if (currentStep === 3) {

                setErrors({});

                setCurrentStep(2);

                requestAnimationFrame(() => {
                    scrollViewRef.current?.scrollTo({
                        y: 0,
                        animated: false,
                    });
                });

                return true;
            }


            // Step 2 -> Step 1
            if (currentStep === 2) {

                setErrors({});

                setCurrentStep(1);

                requestAnimationFrame(() => {
                    scrollViewRef.current?.scrollTo({
                        y: 0,
                        animated: false,
                    });
                });

                return true;
            }


            // Step 1 -> actual previous screen
            return false;
        };


        const subscription =
            BackHandler.addEventListener(
                "hardwareBackPress",
                onBackPress
            );


        return () => {
            subscription.remove();
        };

    }, [currentStep]);
    // =====================================================
    // SCREEN
    // =====================================================






    const BasicDetailItems = [
        {
            icon: (
                <MaterialIcons
                    name="bolt"
                    size={20}
                    color="#F97316"
                />
            ),
            title: "Quick Approval",

        },

        {
            icon: (
                <MaterialIcons
                    name="verified-user"
                    size={20}
                    color="#F97316"
                />
            ),
            title: "100% Secure",
            // subtitle: "Secure",
        },

        {
            icon: (
                <MaterialIcons
                    name="description"
                    size={20}
                    color="#F97316"
                />
            ),
            title: "Minimal Documents",
            // subtitle: "Documents",
        },
    ];
    const LoanAmoutItems = [
        {
            icon: (
                <MaterialIcons
                    name="bolt"
                    size={20}
                    color="#F97316"
                />
            ),
            title: "Quick Process",

        },

        {
            icon: (
                <MaterialIcons
                    name="verified-user"
                    size={20}
                    color="#F97316"
                />
            ),
            title: "100% Secure",

        },

        {
            icon: (
                <MaterialIcons
                    name="lock"
                    size={20}
                    color="#F97316"
                />
            ),
            title: "Your data is safe.",

        },
    ];
    return (

        <SafeAreaView
            edges={[
                "left",
                "right",
                "bottom",
            ]}
            style={{
                flex: 1,
            }}
        >

            <KeyboardAvoidingBottomView
                style={{
                    flex: 1,

                    backgroundColor:
                        "#F9EBD5",
                }}
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <NewFlowCommonHeader

                    title={
                        headerTitle
                    }

                    onBack={
                        handleBack
                    }

                    onNotificationPress={() => {

                        navigation.navigate(
                            "get-notification-screen"
                        );

                    }}

                />


                {/* =================================================
                    MAIN CONTENT
                ================================================= */}

                {currentStep === 1 && (refreshing || loading) && (

                    <View
                        style={{
                            marginHorizontal: 16,
                            marginTop: 8,
                            marginBottom: 4,

                            minHeight: 42,

                            paddingHorizontal: 14,

                            borderRadius: 12,

                            backgroundColor:
                                "#FFFFFF",

                            flexDirection:
                                "row",

                            alignItems:
                                "center",
                        }}
                    >

                        <ActivityIndicator
                            size="small"
                            color={
                                theme.colors.primary500
                            }
                        />


                        <Text
                            style={{
                                marginLeft: 10,

                                fontSize: 13,

                                fontFamily:
                                    theme.fonts.medium,

                                color:
                                    theme.colors.gray700,
                            }}
                        >
                            Syncing your KYC & saved details...
                        </Text>

                    </View>

                )}


                {currentStep === 1 && refreshSuccess && !refreshing && (

                    <View
                        style={{
                            marginHorizontal: 16,
                            marginTop: 8,
                            marginBottom: 4,

                            minHeight: 42,

                            paddingHorizontal: 14,

                            borderRadius: 12,

                            backgroundColor:
                                "#F0FDF4",

                            flexDirection:
                                "row",

                            alignItems:
                                "center",
                        }}
                    >

                        <View
                            style={{
                                width: 22,
                                height: 22,

                                borderRadius:
                                    999,

                                backgroundColor:
                                    "#DCFCE7",

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 13,

                                    color:
                                        "#16A34A",

                                    fontFamily:
                                        theme.fonts.bold,
                                }}
                            >
                                ✓
                            </Text>

                        </View>


                        <Text
                            style={{
                                marginLeft: 10,

                                fontSize: 13,

                                fontFamily:
                                    theme.fonts.medium,

                                color:
                                    "#166534",
                            }}
                        >
                            Your details are up to date
                        </Text>

                    </View>

                )}


                {/* =================================================
                    SCROLL CONTENT
                ================================================= */}

                <ScrollView

                    ref={
                        scrollViewRef
                    }

                    style={{
                        flex: 1,
                    }}

                    showsVerticalScrollIndicator={
                        false
                    }

                    keyboardShouldPersistTaps={
                        "handled"
                    }

                    contentContainerStyle={{
                        paddingBottom: 20,
                    }}

                    refreshControl={
                        currentStep === 1 ? (
                            <RefreshControl
                                refreshing={refreshing && !loading}
                                onRefresh={handleRefresh}
                                tintColor={theme.colors.primary500}
                                colors={[theme.colors.primary500]}
                                progressBackgroundColor="#FFFFFF"
                            />
                        ) : null
                    }

                >

                    {/* =================================================
                        STEP 1
                    ================================================= */}
                    {/* =============================================
                                STEP 1 BENEFITS
                            ============================================= */}

                    {currentStep === 1 && (
                        <Step1ApplyLoanPersonalDetailBasicDetailsBenefits items={BasicDetailItems} />
                    )}

                    {currentStep === 1 && (

                        <>

                            {/* =============================================
                                STEP 1 BANNER
                            ============================================= */}







                            {/* =============================================
                                STEP 1 PERSONAL DETAILS
                            ============================================= */}

                            <Step1ApplyLoanPersonalDetailPersonalDetailsSection

                                form={
                                    form
                                }

                                errors={
                                    errors
                                }

                                onChange={
                                    handleChange
                                }

                                onBlur={
                                    handleBlur
                                }

                                kycCompleted={
                                    kycCompleted
                                }

                                lockedFields={
                                    lockedFields
                                }

                                registerFieldPosition={
                                    registerFieldPosition
                                }

                                scrollViewRef={
                                    scrollViewRef
                                }

                            />

                        </>

                    )}


                    {/* =================================================
                        STEP 2
                    ================================================= */}

                    {currentStep === 2 && (

                        <Step2PersonalLoanEmploymentInfo

                            form={
                                form
                            }

                            errors={
                                errors
                            }

                            onChange={
                                handleChange
                            }

                            onBlur={
                                handleBlur
                            }

                            registerFieldPosition={
                                registerFieldPosition
                            }

                            scrollViewRef={
                                scrollViewRef
                            }

                        />

                    )}


                    {/* =================================================
                        STEP 3
                    ================================================= */}

                    {currentStep === 3 && (

                        <Step3PersonalLoanDocumentUpload

                            navigation={
                                navigation
                            }

                            form={
                                form
                            }

                            setForm={
                                setForm
                            }

                            errors={
                                errors
                            }
                            setErrors={setErrors}

                        />

                    )}

                </ScrollView>


                {/* =================================================
                    BOTTOM BUTTON
                ================================================= */}

                <View
                    style={{
                        width: "100%",

                        backgroundColor:
                            "#FFFDF9",

                        paddingHorizontal:
                            16,

                        paddingTop:
                            16,

                        paddingBottom:
                            16,
                    }}
                >

                    <CommonButton

                        title="Continue"

                        onPress={

                            currentStep === 1
                                ? handleStep1Continue
                                : currentStep === 2
                                    ? handleStep2Continue
                                    : handleStep3Continue

                        }

                        rightIcon={

                            <ArrowRight
                                size={22}
                                color="#FFFFFF"
                                strokeWidth={2}
                            />

                        }

                        containerStyle={{
                            height: 56,

                            borderRadius: 12,

                            backgroundColor:
                                theme.colors.primary400,
                        }}

                        textStyle={{
                            fontSize: 16,

                            fontFamily:
                                theme.fonts.semiBold,

                            color:
                                "#FFFFFF",
                        }}

                    />

                </View>


                {/* =================================================
                    HELP TICKET BOTTOM SHEET
                ================================================= */}

                <HelpTicketBottomSheet
                    visible={
                        helpSheetVisible
                    }

                    onClose={() =>
                        setHelpSheetVisible(false)
                    }

                    onSubmit={(payload) => {

                        console.log(
                            "Ticket Payload:",
                            payload
                        );

                        // API call here

                    }}
                />


                {/* =================================================
                    SUCCESS SHEET
                ================================================= */}

                <LoanApplicationSuccessBottomSheet
                    visible={
                        successSheetVisible
                    }

                    onClose={
                        handleSuccessSheetClose
                    }

                    onGoToDashboard={
                        handleSuccessGoToDashboard
                    }
                />

            </KeyboardAvoidingBottomView>

        </SafeAreaView>

    );

};


export default Step2PersonalLoanApplyMainScreen;

