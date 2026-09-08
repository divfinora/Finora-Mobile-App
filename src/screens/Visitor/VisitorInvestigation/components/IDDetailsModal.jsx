import React, {
    memo,
    useEffect,
    useState,
} from "react";

import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Pressable,
} from "react-native";

import {
    X,
    CreditCard,
    ChevronRight,
} from "lucide-react-native";

import {
    theme,
} from "../../../../theme";

import CommonInput from "../../../../components/common/Input/CommonInput";
import CustomDropdown from "../../../../components/common/Modal/CustomDropdown";


const ID_TYPES = [
    "AADHAAR",
    "PAN",
    "DRIVING_LICENCE",
    "VOTER_ID",
    "PASSPORT",
];


const IDDetailsModal = ({
    visible = false,

    initialValues = {},

    onClose,

    onContinue,
}) => {

    const [
        idType,
        setIdType,
    ] = useState("");

    const [
        idNumber,
        setIdNumber,
    ] = useState("");

    const [
        dropdownVisible,
        setDropdownVisible,
    ] = useState(false);


    // =====================================================
    // RESET / PREFILL
    // =====================================================

    useEffect(() => {

        if (visible) {

            setIdType(
                initialValues?.idType || ""
            );

            setIdNumber(
                initialValues?.idNumber || ""
            );

        }

    }, [
        visible,
        initialValues,
    ]);


    // =====================================================
    // CONTINUE
    // =====================================================

    const handleContinue = () => {

        const type =
            idType?.trim();

        const number =
            idNumber?.trim();


        if (!type) {
            return;
        }


        if (!number) {
            return;
        }


        onContinue?.({

            idType:
                type,

            idNumber:
                number,

        });

    };


    const disabled =
        !idType?.trim() ||
        !idNumber?.trim();


    // =====================================================
    // RENDER
    // =====================================================

    return (

        <Modal
            visible={visible}

            transparent

            animationType="fade"

            onRequestClose={
                onClose
            }
        >

            <KeyboardAvoidingView
                style={{
                    flex: 1,

                    justifyContent:
                        "center",

                    paddingHorizontal:
                        theme.spacing.lg,
                }}

                behavior={
                    Platform.OS === "ios"
                        ? "padding"
                        : "height"
                }
            >

                {/* =================================================
            BACKDROP
        ================================================= */}

                <Pressable
                    onPress={
                        onClose
                    }

                    style={{
                        position:
                            "absolute",

                        top: 0,

                        left: 0,

                        right: 0,

                        bottom: 0,

                        backgroundColor:
                            "rgba(0,0,0,0.45)",
                    }}
                />


                {/* =================================================
            MODAL
        ================================================= */}

                <View
                    style={{
                        backgroundColor:
                            theme.colors.white,

                        borderRadius:
                            24,

                        padding:
                            theme.spacing.xl,

                        ...theme.shadows.card,
                    }}
                >

                    {/* =================================================
              HEADER
          ================================================= */}

                    <View
                        style={{
                            flexDirection:
                                "row",

                            alignItems:
                                "center",

                            justifyContent:
                                "space-between",

                            marginBottom:
                                theme.spacing.lg,
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
                                    width: 46,

                                    height: 46,

                                    borderRadius: 14,

                                    backgroundColor:
                                        "#FFF3E8",

                                    alignItems:
                                        "center",

                                    justifyContent:
                                        "center",

                                    borderWidth: 1,

                                    borderColor:
                                        "#FFE1C8",
                                }}
                            >

                                <CreditCard
                                    size={22}

                                    color={
                                        theme.colors.primary500
                                    }

                                    strokeWidth={2}
                                />

                            </View>


                            <View
                                style={{
                                    flex: 1,

                                    marginLeft:
                                        theme.spacing.md,
                                }}
                            >

                                <Text
                                    style={{
                                        color:
                                            theme.colors.black,

                                        fontSize:
                                            19,

                                        fontFamily:
                                            theme.fonts.headingBold,
                                    }}
                                >
                                    Identity Document
                                </Text>

                                <Text
                                    style={{
                                        marginTop: 3,

                                        color:
                                            theme.colors.gray500,

                                        fontSize:
                                            12,

                                        fontFamily:
                                            theme.fonts.regular,
                                    }}
                                >
                                    Enter ID details
                                </Text>

                            </View>

                        </View>


                        <TouchableOpacity
                            activeOpacity={0.8}

                            onPress={
                                onClose
                            }

                            style={{
                                width: 36,

                                height: 36,

                                borderRadius: 18,

                                backgroundColor:
                                    theme.colors.gray100,

                                alignItems:
                                    "center",

                                justifyContent:
                                    "center",
                            }}
                        >

                            <X
                                size={19}

                                color={
                                    theme.colors.gray700
                                }
                            />

                        </TouchableOpacity>

                    </View>


                    {/* =================================================
              ID TYPE
          ================================================= */}


                    <CommonInput
                        label="ID Type"
                        required
                        placeholder="Enter ID type"
                        value={idType}
                        onChangeText={setIdType}
                        editable={true}
                        autoCapitalize="characters"
                        inputContainerStyle={{
                            ...theme.input.inputBorder
                        }}
                        containerStyle={{
                            marginBottom:
                                theme.spacing.md,
                        }}
                    />



                    {/* =================================================
              ID NUMBER
          ================================================= */}

                    <CommonInput
                        label="ID Number"

                        required

                        placeholder="Enter ID number"

                        value={
                            idNumber
                        }

                        onChangeText={
                            setIdNumber
                        }

                        editable={
                            true
                        }
inputContainerStyle={{
                            ...theme.input.inputBorder
                        }}
                        containerStyle={{
                            marginBottom:
                                theme.spacing.xl,
                        }}
                    />


                    {/* =================================================
              CONTINUE
          ================================================= */}

                    <TouchableOpacity
                        activeOpacity={0.85}

                        onPress={
                            handleContinue
                        }

                        disabled={
                            disabled
                        }

                        style={{
                            height: 52,

                            borderRadius: 14,

                            backgroundColor:
                                disabled
                                    ? theme.colors.gray300
                                    : theme.colors.primary500,

                            flexDirection:
                                "row",

                            alignItems:
                                "center",

                            justifyContent:
                                "center",
                        }}
                    >

                        <Text
                            style={{
                                color:
                                    theme.colors.white,

                                fontSize:
                                    theme.typography.button,

                                fontFamily:
                                    theme.fonts.semiBold,
                            }}
                        >
                            Continue
                        </Text>


                        <ChevronRight
                            size={18}

                            color={
                                theme.colors.white
                            }

                            style={{
                                marginLeft: 6,
                            }}
                        />

                    </TouchableOpacity>

                </View>

            </KeyboardAvoidingView>


            {/* =====================================================
          DROPDOWN
      ===================================================== */}

             

        </Modal>

    );

};


export default memo(
    IDDetailsModal
);