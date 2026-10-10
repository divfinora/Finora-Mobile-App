
{/* =========================================
    PAN DETAILS
========================================= */}

<Step1ApplyLoanPersonalDetailBasicDetailsField
    label="PAN Details"
    placeholder="Enter your PAN number"
    value={form.panNumber}
    onChangeText={(value) =>
        onChange("panNumber", value.toUpperCase())
    }
    error={errors.panNumber}
    editable={!lockedFields.panNumber}
    verificationStatus={
        lockedFields.panNumber ? "verified" : "unverified"
    }
    autoCapitalize="characters"
    maxLength={10}
    leftIcon={
        <Lucide
            name="credit-card"
            size={19}
            color="#8A96A8"
        />
    }
    rightIcon={
        <TouchableOpacity
            activeOpacity={0.75}
            disabled={
                !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
                    form.panNumber || ""
                ) || !!lockedFields.panNumber
            }
            onPress={handlePanVerification}
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingHorizontal: 11,
                paddingVertical: 7,
                borderRadius: 8,
                backgroundColor:
                    /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
                        form.panNumber || ""
                    )
                        ? "#FFF4E5"
                        : "#F3F4F6",
                opacity:
                    /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
                        form.panNumber || ""
                    )
                        ? 1
                        : 0.6,
            }}
        >
            <Lucide
                name="shield-check"
                size={14}
                color={
                    /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
                        form.panNumber || ""
                    )
                        ? "#946200"
                        : "#9CA3AF"
                }
            />

            <Text
                style={{
                    fontSize: 11,
                    fontFamily: theme.fonts.semiBold,
                    color:
                        /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(
                            form.panNumber || ""
                        )
                            ? "#946200"
                            : "#9CA3AF",
                }}
            >
                Verify
            </Text>
        </TouchableOpacity>
    }
    fieldName="panNumber"
    onBlur={() => onBlur("panNumber")}
    registerFieldPosition={registerFieldPosition}
    scrollViewRef={scrollViewRef}
/>


{/* =========================================
    AADHAAR DETAILS
========================================= */}

<Step1ApplyLoanPersonalDetailBasicDetailsField
    label="Aadhaar Number"
    placeholder="Enter your 12 digit Aadhaar number"
    value={form.aadhaarNumber}
    onChangeText={(value) =>
        onChange(
            "aadhaarNumber",
            value.replace(/[^0-9]/g, "").slice(0, 12)
        )
    }
    error={errors.aadhaarNumber}
    editable={!lockedFields.aadhaarNumber}
    verificationStatus={
        lockedFields.aadhaarNumber
            ? "verified"
            : "unverified"
    }
    keyboardType="number-pad"
    autoCapitalize="none"
    maxLength={12}
    leftIcon={
        <Lucide
            name="fingerprint"
            size={19}
            color="#8A96A8"
        />
    }
    rightIcon={
        <TouchableOpacity
            activeOpacity={0.75}
            disabled={
                !/^[0-9]{12}$/.test(
                    form.aadhaarNumber || ""
                ) || !!lockedFields.aadhaarNumber
            }
            onPress={handleAadhaarVerification}
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingHorizontal: 11,
                paddingVertical: 7,
                borderRadius: 8,
                backgroundColor:
                    /^[0-9]{12}$/.test(
                        form.aadhaarNumber || ""
                    )
                        ? "#FFF4E5"
                        : "#F3F4F6",
                opacity:
                    /^[0-9]{12}$/.test(
                        form.aadhaarNumber || ""
                    )
                        ? 1
                        : 0.6,
            }}
        >
            <Lucide
                name="shield-check"
                size={14}
                color={
                    /^[0-9]{12}$/.test(
                        form.aadhaarNumber || ""
                    )
                        ? "#946200"
                        : "#9CA3AF"
                }
            />

            <Text
                style={{
                    fontSize: 11,
                    fontFamily: theme.fonts.semiBold,
                    color:
                        /^[0-9]{12}$/.test(
                            form.aadhaarNumber || ""
                        )
                            ? "#946200"
                            : "#9CA3AF",
                }}
            >
                Verify
            </Text>
        </TouchableOpacity>
    }
    fieldName="aadhaarNumber"
    onBlur={() => onBlur("aadhaarNumber")}
    registerFieldPosition={registerFieldPosition}
    scrollViewRef={scrollViewRef}
/>
 