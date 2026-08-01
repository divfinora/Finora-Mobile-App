    import React, { useState } from "react";

    import {
        IdCard,
    } from "lucide-react-native";

    // import VerificationLayout from "../../components/common/verification/VerificationLayout";
    import VerificationLayout from "../../../components/common/verification/VerificationLayout";

    import { theme } from "../../../theme/index";

    const AadhaarVerificationScreen = ({
        navigation,
    }) => {

        const [aadhaar, setAadhaar] = useState("");

        const handleSendOTP = () => {

            if (aadhaar.length !== 12) {

                return;
            }

            navigation.navigate("aadhaar-verification-enter-otp-screen", {
                aadhaar,
            });

        };

        return (

            <VerificationLayout

                screenTitle="Quick KYC"

                step="Step 1 of 4"

                onBack={() => navigation.goBack()}

                icon={
                    <IdCard
                        size={42}
                        color={theme.colors.primary500}
                    />
                }

                title="Aadhaar Verification"

                subtitle="Enter your 12-digit Aadhaar number"

                inputLabel="Aadhaar Number"

                placeholder="XXXX XXXX XXXX"

                value={aadhaar}

                onChangeText={(text) => {

                    const numbers = text.replace(/[^0-9]/g, "");

                    setAadhaar(numbers);

                }}

                keyboardType="number-pad"

                maxLength={12}

                infoText="Please ensure your Aadhaar is linked with your mobile number for OTP verification."

                buttonText="Send Aadhaar OTP"

                disabled={aadhaar.length !== 12}

                onSubmit={handleSendOTP}

            />

        );

    };

    export default AadhaarVerificationScreen;