import React, {
    useCallback,
    useState,
} from "react";

import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,

    StatusBar,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import {
    SafeAreaView,
} from "react-native-safe-area-context";

import { theme } from "../../../../theme";

// Components
import Headers from "./components/Header.jsx";
import InfoCard from "./components/InfoCard";
import InstantLoanForm from './components/InstantLoanForm'
import CommonButton from "../../../../components/common/Button/CommonButton.jsx";
import useHandleMutation from "../../../../hooks/useHandleMutation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
    useApplyLoanMutation,
} from "../../../../redux/features/customer/customerApi";
import SuccessApplicationModal from "../../../../components/common/Modal/SuccessApplicationModal.jsx";
const InstantLoanApplyScreen = ({ route }) => {

    const [successModal, setSuccessModal] = useState(false);
    const { product } = route.params;
    const [
        refreshing,
        setRefreshing,
    ] = useState(false);

    const onRefresh =
        useCallback(async () => {

            setRefreshing(true);

            try {

                // TODO
                // Get Loan Details
                // Get Eligibility
                // Get Customer Data

            } finally {

                setRefreshing(false);

            }

        }, []);

    // Apply Form   start
    const [form, setForm] = useState({
        amount: "",
        tenure: "",
        purpose: "",

    });
    const [errors, setErrors] = useState({

        amount: "",

        tenure: "",

        purpose: "",

    });

    const validate = () => {

        const newErrors = {

            amount: "",

            tenure: "",

            purpose: "",

        };

        let valid = true;

        if (!form.amount) {

            newErrors.amount = "Please select loan amount";

            valid = false;

        }

        if (!form.tenure) {

            newErrors.tenure = "Please select loan tenure";

            valid = false;

        }



        setErrors(newErrors);

        return valid;

    };
    const response = ""
    const onContinue = async () => {

        if (!validate()) {
            return;
        }

        const response = await handleMutation({

            apiFunc: applyLoan,

            params: {

                productId: product?._id,

                amount: Number(form.amount),

                tenure: Number(form.tenure),

                purpose: form?.purpose
            },

            showSuccess: true,

            customSuccessMsg: "Loan applied successfully",

            onSuccess: (res) => {

                console.log("Apply Loan Success", res);

                // navigation.navigate("LoanStatus", {
                //   applicationId: res?.data?.applicationId,
                // });

            },

            onError: (err) => {

                console.log("Apply Loan Error", err);

            },

        });

        if (!response) return;

    };

    // Aply form end

    const {
        handleMutation,
    } = useHandleMutation();

    const [
        applyLoan,
        {
            isLoading,
        },
    ] = useApplyLoanMutation();
    return (

        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor:
                    '#F6F8F7',
            }}
        >



            <StatusBar
                translucent={false}
                backgroundColor={
                    theme.statusBar.backgroundColor
                }
                barStyle={
                    theme.statusBar.dark
                }
            />
            <Headers />

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >


                <TouchableWithoutFeedback

                    onPress={Keyboard.dismiss}
                >

                    <View style={{ flex: 1 }}>


                        <FlatList

                            data={[]}

                            renderItem={null}

                            keyExtractor={(_, index) =>
                                index.toString()
                            }

                            showsVerticalScrollIndicator={
                                false
                            }

                            keyboardShouldPersistTaps="handled"

                            contentContainerStyle={{

                                paddingBottom:
                                    theme.spacing.screen

                            }}



                            ListHeaderComponent={

                                <>

                                    <View
                                        style={{
                                            paddingHorizontal: theme.spacing.xl,
                                        }}
                                    >

                                        <InfoCard />
                                        <InstantLoanForm
                                            form={form}
                                            setForm={setForm}
                                            errors={errors}
                                            setErrors={setErrors}
                                        />

                                    </View>
                                </>

                            }

                        />
                        <View
                            style={{
                                paddingHorizontal: theme.spacing.xl,
                                paddingVertical: theme.spacing.md,

                                backgroundColor: theme.colors.white,

                                borderTopWidth: 1,
                                borderTopColor: theme.colors.gray100,
                            }}
                        >
                            <CommonButton
                                title="Continue"
                                loading={isLoading}
                                onPress={onContinue}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </KeyboardAvoidingView>


            {/* <SuccessApplicationModal
                visible={successModal}
                onClose={() => setSuccessModal(false)}
                referenceId={
                    response?.data?.applicationId || "APP-7249"
                }
                onCopy={() => {
                    Clipboard.setString(
                        response?.data?.applicationId || "APP-7249"
                    );
                }}
                onViewStatus={() => {
                    setSuccessModal(false);

                    navigation.navigate("LoanStatus", {
                        applicationId:
                            response?.data?.applicationId,
                    });
                }}
            /> */}
        </SafeAreaView>

    );

};

export default InstantLoanApplyScreen;