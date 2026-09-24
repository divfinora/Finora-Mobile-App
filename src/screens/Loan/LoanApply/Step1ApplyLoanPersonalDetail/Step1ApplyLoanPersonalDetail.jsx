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

import { SafeAreaView } from "react-native-safe-area-context";


const Step1ApplyLoanPersonalDetail = ({
    route,
}) => {

    const navigation =
        useNavigation();


    const [lockedFields, setLockedFields] = useState({
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

    const loanId = route?.params?.loanId;

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

        fullName: "",

        panNumber: "",

        accountNumber: "",

        aadhaarNumber: "",

        addressLine1: "",

        city: "",

        state: "",

        pincode: "",

    });


    // =====================================================
    // ERRORS
    // =====================================================

    const [
        errors,
        setErrors,
    ] = useState({});


    // =====================================================
    // ONLY FOR ERROR SCROLL
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


    const scrollToFirstError = (
        newErrors
    ) => {

        const errorOrder = [
            "fullName",
            "panNumber",
            "accountNumber",
            "aadhaarNumber",
            "addressLine1",
            "city",
            "state",
            "pincode",
        ];


        const firstErrorField =
            errorOrder.find(
                field =>
                    newErrors[field]
            );


        if (!firstErrorField) {
            return;
        }


        requestAnimationFrame(() => {

            const y =
                fieldPositions
                    .current?.[
                firstErrorField
                ];


            if (
                typeof y !== "number" ||
                !scrollViewRef.current
            ) {
                return;
            }


            scrollViewRef.current.scrollTo({

                y: Math.max(
                    y - 30,
                    0
                ),

                animated: true,

            });

        });

    };


    // =====================================================
    // PULL TO REFRESS 
    // =====================================================

    const [refreshing, setRefreshing] = useState(false);

    const [refreshSuccess, setRefreshSuccess] = useState(false);
   const loading =
        verificationLoading ||
        verificationFetching ||
        prefillLoading ||
        prefillFetching;
 
const handleRefresh = async () => {

    // Already refresh chal raha hai
    if (refreshing ||loading) {
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


    console.log(
        kycCompleted,
        "KycComplete"
    );


    // =====================================================
    // PREFILL FORM
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


    }, [
        prefill,
        prefillError,
    ]);


    // =====================================================
    // CHANGE FIELD
    // =====================================================

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
        // while user is typing.

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
    // VALIDATION
    // =====================================================

    const validate = () => {

        const newErrors = {};


        // =================================================
        // FULL NAME
        // =================================================

        if (
            !form.fullName.trim()
        ) {

            newErrors.fullName =
                "Please enter your full name";

        }


        // =================================================
        // PAN
        // =================================================

        if (
            !lockedFields.panNumber
        ) {

            if (
                !form.panNumber.trim()
            ) {

                newErrors.panNumber =
                    "Please enter your PAN number";

            } else if (
                !/^[A-Z]{5}[0-9]{4}[A-Z]$/i.test(
                    form.panNumber.trim()
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
            !lockedFields.accountNumber
        ) {

            if (
                !form.accountNumber.trim()
            ) {

                newErrors.accountNumber =
                    "Please enter your bank account number";

            }

        }


        // =================================================
        // AADHAAR
        // =================================================

        if (
            !lockedFields.aadhaarNumber
        ) {

            if (
                !form.aadhaarNumber.trim()
            ) {

                newErrors.aadhaarNumber =
                    "Please enter your Aadhaar number";

            } else if (
                !/^[0-9]{12}$/.test(
                    form.aadhaarNumber.trim()
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
            !form.addressLine1.trim()
        ) {

            newErrors.addressLine1 =
                "Please enter your address";

        }


        // =================================================
        // CITY
        // =================================================

        if (
            !form.city.trim()
        ) {

            newErrors.city =
                "Please enter your city";

        }


        // =================================================
        // STATE
        // =================================================

        if (
            !form.state.trim()
        ) {

            newErrors.state =
                "Please enter your state";

        }


        // =================================================
        // PINCODE
        // =================================================

        if (
            !form.pincode.trim()
        ) {

            newErrors.pincode =
                "Please enter your pincode";

        } else if (
            !/^[0-9]{6}$/.test(
                form.pincode.trim()
            )
        ) {

            newErrors.pincode =
                "Please enter a valid 6 digit pincode";

        }


        // =================================================
        // SET ERRORS
        // =================================================

        setErrors(
            newErrors
        );


        // =================================================
        // ONLY ERROR SCROLL
        // =================================================

        if (
            Object.keys(
                newErrors
            ).length > 0
        ) {

            scrollToFirstError(
                newErrors
            );

        }


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
    // CONTINUE
    // =====================================================

    const handleContinue = () => {

        const isValid =
            validate();


        if (!isValid) {
            return;
        }


        navigation.navigate(
            "apply-personal-loan",
            {

                basicDetails:
                    form,

                kycCompleted:
                    kycCompleted,

            }
        );

    };


    // =====================================================
    // LOADING
    // =====================================================

 


    // =====================================================
    // BANNER
    // =====================================================

    const bannerSource =
        route?.params?.bannerSource ||
        null;


    // =====================================================
    // SCREEN
    // =====================================================

    return (

        <SafeAreaView
            edges={['left', 'right', 'bottom']}
            style={{ flex: 1 }}
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

                    title="Basic Details"

                    onBack={() => {
                        navigation.goBack();
                    }}

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


                {refreshSuccess && !refreshing && (

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


                <ScrollView

                    ref={
                        scrollViewRef
                    }

                    style={{
                        flex: 1,
                    }}

                    showsVerticalScrollIndicator={false}

                    keyboardShouldPersistTaps="handled"

                    contentContainerStyle={{
                        paddingBottom: 20,
                    }}

                    refreshControl={

                        <RefreshControl

                             refreshing={refreshing && !loading}

                            onRefresh={
                                handleRefresh
                            }

                            tintColor={
                                theme.colors.primary500
                            }

                            colors={[
                                theme.colors.primary500
                            ]}

                            progressBackgroundColor="#FFFFFF"

                        />

                    }

                >

                    {/* =============================================
                        BANNER
                    ============================================= */}

                    <Step1ApplyLoanPersonalDetailBasicDetailsBanner

                        bannerSource={
                            require(
                                "./components/assets/basicInfo.png"
                            )
                        }

                    />


                    {/* =============================================
                        BENEFITS
                    ============================================= */}

                    <Step1ApplyLoanPersonalDetailBasicDetailsBenefits />


                    {/* =============================================
                        PERSONAL DETAILS
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

                </ScrollView>


                {/* =================================================
                    BOTTOM BUTTON
                    NOT ABSOLUTE
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
                            handleContinue
                        }

                        // loading={
                        //     loading
                        // }

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
                    PREFILL API ERROR
                ================================================= */}

                {/* {prefillError && (

                <View
                    style={{
                        position:
                            "absolute",

                        top: 85,

                        left: 20,

                        right: 20,

                        padding: 10,

                        borderRadius: 8,

                        backgroundColor:
                            "#FEE2E2",
                    }}
                >

                    <Text
                        style={{
                            fontSize: 12,

                            color:
                                "#B91C1C",

                            textAlign:
                                "center",

                            fontFamily:
                                theme.fonts.medium,
                        }}
                    >
                        Unable to load your saved
                        details. You can enter them
                        manually.
                    </Text>

                </View>

            )} */}

            </KeyboardAvoidingBottomView>

        </SafeAreaView>

    );
};


export default Step1ApplyLoanPersonalDetail;