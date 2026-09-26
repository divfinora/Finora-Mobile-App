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
} from "react-native";

import {
    useNavigation,
} from "@react-navigation/native";

import {
    ArrowRight,
} from "lucide-react-native";

import NewFlowCommonHeader from "../../../../components/common/BackButton/NewFlowCommonHeader";

import KeyboardAvoidingBottomView from "../../../../components/common/KeyBoard/KeyboardAvoidingBottomView";

import CommonButton from "../../../../components/common/Button/CommonButton";

import {
    useCustomerKYCVerificationDoneAndNotDoneQuery,
} from "../../../../redux/features/customer/customerApi";

import {
    useLoanApplicationPrefill,
} from "../../../../hooks/useLoanApplicationPrefill";

import {
    theme,
} from "../../../../theme";


import Step1ApplyLoanPersonalDetailBasicDetailsBanner
    from "./components/Step1ApplyLoanPersonalDetailBasicDetailsBanner";

import Step1ApplyLoanPersonalDetailBasicDetailsBenefits
    from "./components/Step1ApplyLoanPersonalDetailBasicDetailsBenefits";

import Step1ApplyLoanPersonalDetailPersonalDetailsSection
    from "./components/Step1ApplyLoanPersonalDetailPersonalDetailsSection";

import Step1ApplyLoanAmountSelection
    from "./components/Step1ApplyLoanAmountSelection";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import HelpTicketBottomSheet
    from "./components/HelpTicketBottomSheet";
import MaterialIcons from "@react-native-vector-icons/material-icons";

import LoanApplicationSuccessBottomSheet
    from "./components/LoanApplicationSuccessBottomSheet";
import { resetToTab } from "../../../../navigation/navigationReset";


import Step1ApplyLoanPersonalDetailBasicPersonalDetailsSectionWithoutKycAndLogin
    from "./components/Step1ApplyLoanPersonalDetailBasicPersonalDetailsSectionWithoutKycAndLogin";

// =====================================================
// COMPONENT
// =====================================================

const Step1ApplyLoanPersonalDetail = ({
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
            : "Loan Amt. Req.";


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

    const loanId =
        route?.params?.loanId;


    const {
        prefill,
        personalDetails,
        kycDetails,
        addressDetails,
        employmentDetails,
        bankDetails,
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
        contactNumber: "",

        // STEP 2
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


   const scrollToFirstError = (newErrors) => {
    const errorOrder = !kycCompleted
        ? [
            "contactNumber",
        ]
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

    const firstErrorField = errorOrder.find(
        field => newErrors[field]
    );

    if (!firstErrorField) {
        return;
    }

    requestAnimationFrame(() => {
        const y =
            fieldPositions.current?.[firstErrorField];

        if (
            typeof y !== "number" ||
            !scrollViewRef.current
        ) {
            return;
        }

        scrollViewRef.current.scrollTo({
            y: Math.max(y - 30, 0),
            animated: true,
        });
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





    // useEffect(() => {

    //     // Fake prefilled data
    //     setForm({
    //         // STEP 1
    //         fullName: "Amit Kumar",
    //         panNumber: "ABCDE1234F",
    //         accountNumber: "123456789012",
    //         aadhaarNumber: "123456789012",
    //         addressLine1: "Sector 12, Dwarka",
    //         city: "New Delhi",
    //         state: "Delhi",
    //         pincode: "110075",

    //         // STEP 2
    //         loanAmount: null,
    //     });

    //     // Fake saved KYC fields
    //     setLockedFields({
    //         panNumber: true,
    //         accountNumber: true,
    //         aadhaarNumber: true,
    //     });

    // }, []);


    // =====================================================
    // CHANGE FIELD
    // =====================================================


        useEffect(() => {

        if (
            prefillLoading ||
            prefillFetching ||
            prefillError
        ) {

            return;

        }


        if (!prefill) {

            return;

        }


        const panNumber =
            kycDetails?.panNumber || "";


        const accountNumber =
            bankDetails?.accountNumber || "";


        const aadhaarNumber =
            kycDetails?.aadhaarNumber || "";


        setForm({

            fullName:
                personalDetails?.fullName || "",

            panNumber,

            accountNumber,

            aadhaarNumber,

            addressLine1:
                addressDetails?.addressLine1 || "",

            city:
                addressDetails?.city || "",

            state:
                addressDetails?.state || "",

            pincode:
                addressDetails?.pincode || "",

        });


        // Lock only those fields
        // which already have saved values

        setLockedFields({

            panNumber:
                Boolean(
                    panNumber?.trim()
                ),


            accountNumber:
                Boolean(
                    accountNumber?.trim()
                ),


            aadhaarNumber:
                Boolean(
                    aadhaarNumber?.trim()
                ),

        });


        setErrors(
            previous => {

                const updated = {
                    ...previous,
                };

                if (personalDetails?.fullName?.trim()) {
                    delete updated.fullName;
                }

                if (panNumber?.trim()) {
                    delete updated.panNumber;
                }

                if (accountNumber?.trim()) {
                    delete updated.accountNumber;
                }

                if (aadhaarNumber?.trim()) {
                    delete updated.aadhaarNumber;
                }

                if (addressDetails?.addressLine1?.trim()) {
                    delete updated.addressLine1;
                }

                if (addressDetails?.city?.trim()) {
                    delete updated.city;
                }

                if (addressDetails?.state?.trim()) {
                    delete updated.state;
                }

                if (addressDetails?.pincode?.trim()) {
                    delete updated.pincode;
                }

                return updated;
            }
        );


    }, [
        prefill,
        prefillError,
    ]);

    const handleChange = (
        field,
        value,
    ) => {

        setForm(
            previous => ({
                ...previous,

                [field]:
                    value,
            })
        );


        // Remove field error
        // while user is typing

        if (
            errors[field]
        ) {

            setErrors(
                previous => {

                    const updated = {
                        ...previous,
                    };


                    delete updated[
                        field
                    ];


                    return updated;

                }
            );

        }

    };


    // =====================================================
    // FIELD BLUR
    // =====================================================

const handleBlur = (
    fieldName
) => {

    if (
        !kycCompleted
    ) {

        validateBasicDetailsWithoutKycAndLogin(
            fieldName
        );

        return;

    }


    validateStep1(
        fieldName
    );

};

    // =====================================================
    // BASIC DETAILS WITHOUT KYC / LOGIN VALIDATION
    // ONLY CONTACT NUMBER IS REQUIRED
    // =====================================================

    const validateBasicDetailsWithoutKycAndLogin = (
        fieldName = null
    ) => {

        const newErrors = {};

        // =================================================
        // FIELD VALIDATION
        // =================================================

        if (
            !fieldName ||
            fieldName === "contactNumber"
        ) {

            const contactNumber =
                form.contactNumber || "";

            const trimmedContactNumber =
                contactNumber.trim();


            // ---------------------------------------------
            // CONTACT NUMBER REQUIRED
            // ---------------------------------------------

            if (!trimmedContactNumber) {

                newErrors.contactNumber =
                    "Please enter your contact number";

            }

            // ---------------------------------------------
            // CONTACT NUMBER FORMAT
            // ---------------------------------------------

            else if (
                !/^[0-9]{10}$/.test(
                    trimmedContactNumber
                )
            ) {

                newErrors.contactNumber =
                    "Please enter a valid 10 digit contact number";

            }

        }


        // =================================================
        // BLUR VALIDATION
        // =================================================

        if (
            fieldName
        ) {

            setErrors(
                previous => {

                    const updated = {
                        ...previous,
                    };


                    if (
                        newErrors[fieldName]
                    ) {

                        updated[fieldName] =
                            newErrors[fieldName];

                    } else {

                        delete updated[fieldName];

                    }


                    return updated;

                }
            );


            return (
                Object.keys(
                    newErrors
                ).length === 0
            );

        }


        // =================================================
        // CONTINUE VALIDATION
        // =================================================

        setErrors(
            newErrors
        );


        if (
            Object.keys(
                newErrors
            ).length > 0
        ) {

            scrollToFirstError(
                newErrors
            );

        }


        return (
            Object.keys(
                newErrors
            ).length === 0
        );

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

            setErrors(
                previous => {

                    const updated = {
                        ...previous,
                    };

                    if (newErrors[fieldName]) {
                        updated[fieldName] =
                            newErrors[fieldName];
                    } else {
                        delete updated[fieldName];
                    }

                    return updated;
                }
            );

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
            scrollToFirstError(
                newErrors
            );
        }


        return (
            Object.keys(newErrors).length === 0
        );

    };


    // =====================================================
    // STEP 2 VALIDATION
    // =====================================================

    const validateStep2 = () => {

        const newErrors = {};


        // =================================================
        // LOAN AMOUNT
        // =================================================

        if (
            !form.loanAmount
        ) {

            newErrors.loanAmount =
                "Please select a loan amount";

        }


        // =================================================
        // SET ERRORS
        // =================================================

        setErrors(
            newErrors
        );


        // =================================================
        // VALIDATION RESULT
        // =================================================

        return (
            Object.keys(
                newErrors
            ).length === 0
        );

    };


    // =====================================================
    // STEP 1 CONTINUE
    // =====================================================

    // =====================================================
// STEP 1 CONTINUE
// =====================================================

const handleStep1Continue = () => {

    let isValid;


    // =================================================
    // WITHOUT KYC
    // ONLY CONTACT NUMBER REQUIRED
    // =================================================

    if (
        !kycCompleted
    ) {

        isValid =
            validateBasicDetailsWithoutKycAndLogin();

    }

    // =================================================
    // WITH KYC
    // FULL VALIDATION
    // =================================================

    else {

        isValid =
            validateStep1();

    }


    if (
        !isValid
    ) {

        return;

    }


    // =================================================
    // CLEAR ERRORS
    // =================================================

    setErrors({});


    // =================================================
    // MOVE TO STEP 2
    // =================================================

    setCurrentStep(
        2
    );


    requestAnimationFrame(
        () => {

            scrollViewRef.current?.scrollTo({

                y: 0,

                animated: false,

            });

        }
    );

};


    // =====================================================
    // STEP 2 CONTINUE
    // =====================================================

    const handleStep2Continue = () => {

        const isValid =
            validateStep2();


        if (!isValid) {
            return;
        }


        // =================================================
        // FINAL PAYLOAD
        // =================================================

        const finalForm = {
            ...form,
        };


        console.log(
            "Final Loan Application Data:",
            finalForm
        );


        // =================================================
        // SUCCESS SHEET
        // =================================================

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
        // STEP 2 -> STEP 1
        // -----------------------------------------------

        if (
            currentStep === 2
        ) {

            setErrors({});

            setCurrentStep(1);


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

                {(refreshing || loading) && (

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


                {refreshSuccess &&
                    !refreshing && (

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

                        <RefreshControl

                            refreshing={
                                refreshing &&
                                !loading
                            }

                            onRefresh={
                                handleRefresh
                            }

                            tintColor={
                                theme.colors.primary500
                            }

                            colors={[
                                theme.colors.primary500,
                            ]}

                            progressBackgroundColor={
                                "#FFFFFF"
                            }

                        />

                    }

                >

                    {/* =================================================
                        STEP 1
                    ================================================= */}

                    {currentStep === 1 && (

                        <>

                            {/* =============================================
                                STEP 1 BANNER
                            ============================================= */}

                            <Step1ApplyLoanPersonalDetailBasicDetailsBanner

                                bannerSource={
                                    require(
                                        "./components/assets/basicInfo.png"
                                    )
                                }

                            />


                            {/* =============================================
                                STEP 1 BENEFITS
                            ============================================= */}

                            <Step1ApplyLoanPersonalDetailBasicDetailsBenefits items={BasicDetailItems} />


                            {/* =============================================
                                STEP 1 PERSONAL DETAILS
                            ============================================= */}
                            {
                                kycCompleted ? <Step1ApplyLoanPersonalDetailPersonalDetailsSection

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

                                /> : <Step1ApplyLoanPersonalDetailBasicPersonalDetailsSectionWithoutKycAndLogin

                                    form={form}

                                    errors={errors}

                                    onChange={handleChange}

                                    onBlur={handleBlur}

                                    registerFieldPosition={
                                        registerFieldPosition
                                    }

                                    scrollViewRef={
                                        scrollViewRef
                                    }

                                />
                            }





                        </>

                    )}


                    {/* =================================================
                        STEP 2
                    ================================================= */}

                    {currentStep === 2 && (

                        <>

                            {/* =============================================
                                STEP 2 BANNER
                            ============================================= */}

                            <Step1ApplyLoanPersonalDetailBasicDetailsBanner

                                bannerSource={
                                    require(
                                        "./components/assets/basicInfo.png"
                                    )
                                }

                            />


                            {/* =============================================
                                STEP 2 BENEFITS
                            ============================================= */}

                            <Step1ApplyLoanPersonalDetailBasicDetailsBenefits items={LoanAmoutItems} />


                            {/* =============================================
                                STEP 2 LOAN AMOUNT
                            ============================================= */}

                            <Step1ApplyLoanAmountSelection

                                selectedAmount={
                                    form.loanAmount
                                }

                                error={
                                    errors.loanAmount
                                }

                                onSelectAmount={
                                    (amount) => {

                                        setForm(
                                            previous => ({
                                                ...previous,

                                                loanAmount:
                                                    amount,
                                            })
                                        );


                                        // Remove loan amount error
                                        // after selection

                                        if (
                                            errors.loanAmount
                                        ) {

                                            setErrors(
                                                previous => {

                                                    const updated = {
                                                        ...previous,
                                                    };


                                                    delete updated.loanAmount;


                                                    return updated;

                                                }
                                            );

                                        }

                                    }
                                }

                                onGetHelp={() => {

                                    console.log(
                                        "helloe--------"
                                    );

                                    setHelpSheetVisible(
                                        true
                                    );

                                }}

                            />

                        </>

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
                                : handleStep2Continue

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


export default Step1ApplyLoanPersonalDetail;