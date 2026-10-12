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

import NewFlowCommonHeader from "../../../../../components/common/BackButton/NewFlowCommonHeader.jsx";

import KeyboardAvoidingBottomView from "../../../../../components/common/KeyBoard/KeyboardAvoidingBottomView.jsx";

import CommonButton from "../../../../../components/common/Button/CommonButton.jsx";

import Step1ApplyLoanPersonalDetailBasicDetailsBenefits from "../../Step1ApplyLoanPersonalDetail/components/Step1ApplyLoanPersonalDetailBasicDetailsBenefits.jsx";

import Step1ApplyLoanPersonalDetailPersonalDetailsSection from "../../Step1ApplyLoanPersonalDetail/components/Step1ApplyLoanPersonalDetailPersonalDetailsSection.jsx";

import LoanApplicationSuccessBottomSheet from "../../Step1ApplyLoanPersonalDetail/components/LoanApplicationSuccessBottomSheet.jsx";

import {

    useCustomerKYCVerificationDoneAndNotDoneQuery,

} from "../../../../../redux/features/customer/customerApi.js";

import {

    useLoanApplicationPrefill,

} from "../../../../../hooks/useLoanApplicationPrefill.js";

import {

    resetToTab,

} from "../../../../../navigation/navigationReset.js";

import {

    theme,

} from "../../../../../theme/index.js";

import Step2AgricultureLoanDocumentUpload from "./components/Step2AgricultureLoanDocumentUpload.jsx";

import Step2AgricultureLoanInfoDetail from "./components/Step2AgricultureLoanInfoDetail.jsx";

// =====================================================

// COMPONENT

// =====================================================

const Step2AgricultureLoanApplyMainScreen = ({

    route,

}) => {

    const navigation = useNavigation();

    // =====================================================

    // HELP SHEET

    // =====================================================

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

                ? "Farm/Land Details"

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

        // STEP 2 - AGRICULTURE / FARM DETAILS

        farmerType: "",

        ownershipType: "",

        landArea: "",

        currentCropType: "",

        farmingExperience: "",

        annualIncome: "",

        irrigationSource: "",

        hasExistingLoans: null,

        // STEP 3 - AGRICULTURE DOCUMENTS

        documents: [],

        // OLD FIELD

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

    // ERROR SCROLL

    // =====================================================

    const scrollViewRef = useRef(null);

    const fieldPositions = useRef({});

    const registerFieldPosition = (

        fieldName,

        y

    ) => {

        if (!fieldName) {

            return;

        }

        fieldPositions.current[fieldName] = y;

    };

   const scrollToFirstError = (errors, errorOrder) => {
  const firstErrorField = errorOrder.find(
    fieldName => errors[fieldName],
  );

  if (!firstErrorField) {
    return;
  }

  requestAnimationFrame(() => {
    const y = fieldPositions.current[firstErrorField];

    if (typeof y !== "number") {
      return;
    }

    scrollViewRef.current?.scrollTo({
      y: Math.max(y - 30, 0),
      animated: true,
    });
  });
};

    // =====================================================

    // UPDATE SINGLE FIELD ERROR

    // =====================================================

    const updateFieldError = (

        fieldName,

        newErrors

    ) => {

        setErrors(previous => {

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

    const handleRefresh = async () => {

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

    }, [loading]);

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

    // =====================================================

    // INITIAL / TEMP DATA

    // =====================================================

    useEffect(() => {

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

            // STEP 2 - AGRICULTURE / FARM DETAILS

            farmerType: "",

            ownershipType: "",

            landArea: "",

            currentCropType: "",

            farmingExperience: "",

            annualIncome: "",

            irrigationSource: "",

            hasExistingLoans: null,

            // STEP 3 - AGRICULTURE DOCUMENTS

            documents: [],

            // OLD FIELD

            loanAmount: null,

        });

        setLockedFields({

            panNumber: true,

            accountNumber: true,

            aadhaarNumber: true,

        });

    }, []);

    // =====================================================

    // CHANGE FIELD

    // =====================================================

    const handleChange = (

        field,

        value

    ) => {

        setForm(previous => ({

            ...previous,

            [field]: value,

        }));

        setErrors(previous => {

            if (!previous[field]) {

                return previous;

            }

            const updated = {

                ...previous,

            };

            delete updated[field];

            return updated;

        });

    };

    // =====================================================

    // STEP 1 VALIDATION

    // =====================================================

    const validateStep1 = (

        fieldName = null

    ) => {

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

        fields.forEach(field => {

            /*

             * LOCKED FIELD

             * KYC verified fields do not require

             * manual validation.

             */

            if (lockedFields[field]) {

                return;

            }

            const value =

                form?.[field] || "";

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

            // ACCOUNT NUMBER

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

        });

        // =================================================

        // FIELD BLUR

        // =================================================

        if (fieldName) {

            updateFieldError(

                fieldName,

                newErrors

            );

            return (

                Object.keys(newErrors).length === 0

            );

        }

        // =================================================

        // CONTINUE

        // =================================================

        setErrors(newErrors);

        if (

            Object.keys(newErrors).length > 0

        ) {

            scrollToFirstError(

                newErrors,

                [

                    "fullName",

                    "panNumber",

                    "accountNumber",

                    "aadhaarNumber",

                    "addressLine1",

                    "city",

                    "state",

                    "pincode",

                ]

            );

        }

        return (

            Object.keys(newErrors).length === 0

        );

    };

    // AGRICULTURE / FARM DETAILS VALIDATION

    // =====================================================

 const validateAgricultureDetails = (fieldName = null) => {
    console.log("\n========== AGRICULTURE VALIDATION START ==========");
    console.log("Field being validated:", fieldName || "ALL FIELDS");
    console.log("Current form data:", form);

    const fields = fieldName
        ? [fieldName]
        : ["landArea", "currentCropType", "annualIncome"];

    const newErrors = {};

    fields.forEach(field => {
        const textValue = String(form?.[field] ?? "").trim();

        console.log(`\nChecking field: ${field}`);
        console.log("Raw value:", form?.[field]);
        console.log("Trimmed value:", textValue);

        if (field === "landArea") {
            if (!textValue) {
                newErrors.landArea =
                    "Please enter agricultural land area";
            } else if (
                !/^\d+(\.\d+)?$/.test(textValue) ||
                Number(textValue) <= 0
            ) {
                newErrors.landArea =
                    "Please enter a valid land area";
            }
        }

        if (field === "currentCropType" && !textValue) {
            newErrors.currentCropType =
                "Please enter crop specialization";
        }

        if (field === "annualIncome") {
            if (!textValue) {
                newErrors.annualIncome =
                    "Please enter annual agriculture income";
            } else if (
                !/^\d+$/.test(textValue) ||
                Number(textValue) <= 0
            ) {
                newErrors.annualIncome =
                    "Please enter valid annual income";
            }
        }

        if (newErrors[field]) {
            console.log("❌ VALIDATION FAILED:", field);
            console.log("Error message:", newErrors[field]);
        } else {
            console.log("✅ VALIDATION PASSED:", field);
        }
    });

    console.log("\nAll validation errors:", newErrors);

    if (fieldName) {
        updateFieldError(fieldName, newErrors);

        const isValid = !newErrors[fieldName];

        console.log("Single-field validation result:", isValid);
        console.log("========== VALIDATION END ==========\n");

        return isValid;
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
        console.log(
            "❌ Invalid fields:",
            Object.keys(newErrors)
        );

        console.log(
            "Scrolling to first invalid field..."
        );

        scrollToFirstError(newErrors, [
            "landArea",
            "currentCropType",
            "annualIncome",
        ]);

        console.log("========== VALIDATION END: FAILED ==========\n");
        return false;
    }

    console.log("✅ All fields valid. Continue is allowed.");
    console.log("========== VALIDATION END: SUCCESS ==========\n");

    return true;
};

    // =====================================================

    // =====================================================

    // FIELD BLUR

    // =====================================================

    const handleBlur = (

        fieldName

    ) => {

        if (currentStep === 1) {

            validateStep1(

                fieldName

            );

        } else if (

            currentStep === 2

        ) {

            validateAgricultureDetails(

                fieldName

            );

        }

    };
    // STEP 3 DOCUMENT VALIDATION

    // =====================================================

    const validateStep3 = () => {

        const newErrors = {};

        const requiredDocuments = [

            { key: "panCard", message: "Please upload your PAN Card" },

            { key: "aadharCard", message: "Please upload your Aadhaar Card" },

            { key: "landOwnershipProof", message: "Please upload Land Ownership Proof" },

            { key: "khasraKhatauni", message: "Please upload Khasra / Khatauni" },

            { key: "landDetailsDocument", message: "Please upload Land Details Document" },

            { key: "kisanBahi", message: "Please upload Kisan Bahi" },

            { key: "agricultureIncomeProof", message: "Please upload Agriculture Income Proof" },

        ];

        const documents = form?.documents || [];

        requiredDocuments.forEach(document => {

            const uploadedDocument = documents.find(

                item => item?.type === document.key

            );

            const fileCount = uploadedDocument?.files?.length || 0;

            if (fileCount < 1) {

                newErrors[document.key] = document.message;

            }

        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {

            scrollToFirstError(

                newErrors,

                requiredDocuments.map(document => document.key)

            );

        }

        return Object.keys(newErrors).length === 0;

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

        setErrors({});

        setCurrentStep(2);

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

        const isValid =

            validateAgricultureDetails();



        console.log(

            "STEP 2 VEHICLE VALID:",

            isValid

        );

        if (!isValid) {

            return;

        }

        setErrors({});

        setCurrentStep(3);

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

    };

    // =====================================================

    // SUCCESS SHEET - GO TO HISTORY

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

        if (currentStep > 1) {

            setErrors({});

            setCurrentStep(

                previous =>

                    previous - 1

            );

            requestAnimationFrame(() => {

                scrollViewRef.current?.scrollTo({

                    y: 0,

                    animated: false,

                });

            });

            return;

        }

        navigation.goBack();

    };

    // =====================================================

    // ANDROID HARDWARE BACK

    // =====================================================

    useEffect(() => {

        const onBackPress = () => {

            // STEP 3 -> STEP 2

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

            // STEP 2 -> STEP 1

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

            // STEP 1 -> ACTUAL PREVIOUS SCREEN

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

    // BASIC DETAIL ITEMS

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

        },

    ];

    // =====================================================

    // LOAN AMOUNT ITEMS

    // =====================================================

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

    // =====================================================

    // SCREEN

    // =====================================================

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

                    backgroundColor: "#F9EBD5",

                }}

            >

                {/* =================================================

                    HEADER

                ================================================= */}

                <NewFlowCommonHeader

                    title={headerTitle}

                    onBack={handleBack}

                    onNotificationPress={() => {

                        navigation.navigate(

                            "get-notification-screen"

                        );

                    }}

                />

                {/* =================================================

                    SYNCING STATUS

                ================================================= */}

                {currentStep === 1 &&

                    (refreshing || loading) && (

                        <View

                            style={{

                                marginHorizontal: 16,

                                marginTop: 8,

                                marginBottom: 4,

                                minHeight: 42,

                                paddingHorizontal: 14,

                                borderRadius: 12,

                                backgroundColor: "#FFFFFF",

                                flexDirection: "row",

                                alignItems: "center",

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

                {/* =================================================

                    REFRESH SUCCESS

                ================================================= */}

                {currentStep === 1 &&

                    refreshSuccess &&

                    !refreshing && (

                        <View

                            style={{

                                marginHorizontal: 16,

                                marginTop: 8,

                                marginBottom: 4,

                                minHeight: 42,

                                paddingHorizontal: 14,

                                borderRadius: 12,

                                backgroundColor: "#F0FDF4",

                                flexDirection: "row",

                                alignItems: "center",

                            }}

                        >

                            <View

                                style={{

                                    width: 22,

                                    height: 22,

                                    borderRadius: 999,

                                    backgroundColor: "#DCFCE7",

                                    alignItems: "center",

                                    justifyContent: "center",

                                }}

                            >

                                <Text

                                    style={{

                                        fontSize: 13,

                                        color: "#16A34A",

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

                                    color: "#166534",

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

                    ref={scrollViewRef}

                    style={{

                        flex: 1,

                    }}

                    showsVerticalScrollIndicator={false}

                    keyboardShouldPersistTaps="handled"

                    contentContainerStyle={{

                        paddingBottom: 20,

                    }}

                    refreshControl={

                        currentStep === 1

                            ? (

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

                                    progressBackgroundColor="#FFFFFF"

                                />

                            )

                            : null

                    }

                >

                    {/* =================================================

                        STEP 1

                    ================================================= */}

                    {currentStep === 1 && (

                        <Step1ApplyLoanPersonalDetailBasicDetailsBenefits

                            items={

                                BasicDetailItems

                            }

                        />

                    )}

                    {currentStep === 1 && (

                        <Step1ApplyLoanPersonalDetailPersonalDetailsSection

                            form={form}

                            errors={errors}

                            onChange={handleChange}

                            onBlur={handleBlur}

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

                    )}

                    {/* =================================================

                        STEP 2

                    ================================================= */}

                    {currentStep === 2 && (

                        <Step2AgricultureLoanInfoDetail

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

                    )}

                    {/* =================================================

                        STEP 3

                    ================================================= */}

                    {currentStep === 3 && (

                        <Step2AgricultureLoanDocumentUpload

                            navigation={

                                navigation

                            }

                            form={form}

                            setForm={

                                setForm

                            }

                            errors={

                                errors

                            }

                            setErrors={

                                setErrors

                            }

                            registerFieldPosition={

                                registerFieldPosition

                            }

                            scrollViewRef={scrollViewRef}

                        />

                    )}

                </ScrollView>

                {/* =================================================

                    BOTTOM BUTTON

                ================================================= */}

                <View

                    style={{

                        width: "100%",

                        backgroundColor: "#FFFDF9",

                        paddingHorizontal: 16,

                        paddingTop: 16,

                        paddingBottom: 16,

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

                            color: "#FFFFFF",

                        }}

                    />

                </View>

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

export default Step2AgricultureLoanApplyMainScreen;
