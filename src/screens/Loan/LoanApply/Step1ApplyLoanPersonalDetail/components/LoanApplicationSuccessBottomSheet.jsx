import React from "react";

import {
    View,
    Text,
    Pressable,
} from "react-native";

import MaterialIcons from "@react-native-vector-icons/material-icons";

import NewCustomBottomSheet
    from "../../../../../components/common/Modal/NewCustomBottomSheet";

import {
    theme,
} from "../../../../../theme";
import CommonButton from "../../../../../components/common/Button/CommonButton";


// =====================================================
// CONFETTI
// =====================================================

const CONFETTI = [
    {
        top: 16,
        left: 8,
        width: 13,
        height: 7,
        radius: 5,
        color: "#FF6B35",
        rotate: "-45deg",
    },

    {
        top: 5,
        left: 96,
        width: 13,
        height: 7,
        radius: 5,
        color: "#FFB900",
        rotate: "-45deg",
    },

    {
        top: 26,
        left: 118,
        width: 8,
        height: 18,
        radius: 5,
        color: "#00A66B",
        rotate: "-12deg",
    },

    {
        top: 56,
        left: 140,
        width: 11,
        height: 11,
        radius: 5,
        color: "#FFB900",
        rotate: "0deg",
    },

    {
        top: 92,
        left: 129,
        width: 10,
        height: 17,
        radius: 5,
        color: "#FF6B35",
        rotate: "0deg",
    },

    {
        top: 111,
        left: 84,
        width: 11,
        height: 7,
        radius: 5,
        color: "#FF6B35",
        rotate: "45deg",
    },

    {
        top: 92,
        left: 4,
        width: 16,
        height: 8,
        radius: 5,
        color: "#FFB900",
        rotate: "-5deg",
    },

    {
        top: 56,
        left: 12,
        width: 16,
        height: 7,
        radius: 5,
        color: "#00A66B",
        rotate: "10deg",
    },

    {
        top: 36,
        left: 58,
        width: 7,
        height: 14,
        radius: 5,
        color: "#FF6B35",
        rotate: "-45deg",
    },

    {
        top: 112,
        left: 126,
        width: 8,
        height: 8,
        radius: 5,
        color: "#FFB900",
        rotate: "45deg",
    },
];


// =====================================================
// COMPONENT
// =====================================================

const LoanApplicationSuccessBottomSheet = ({
    visible = false,
    onClose,
    referenceId = "VL2026012636",
    onCopyReference,
    onGoToDashboard,
    onViewApplicationDetails,
}) => {

    return (

        <NewCustomBottomSheet

            visible={visible}

            onClose={onClose}

            showHeader

            showDragHandle={false}

            sheetheading=""

            heightPercent={0.99}

            sheetBg="#F7FCF9"

            enableDrag={true}

            dragOnlyAtContentBottom={true}

            closeOnBackdrop={true}

            closeOnDragDown={true}

            sheetStyle={{
                borderTopLeftRadius: 48,
                borderTopRightRadius: 48,
                overflow: "visible",
            }}

            headerStyle={{
                height: 0,
                paddingTop: 0,
                paddingBottom: 0,
            }}

            closeButtonStyle={{
                top: -56,
                left: "50%",
                marginLeft: -20,
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: "#FFFFFF",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 100,
                elevation: 10,
                shadowColor: "#000000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.12,
                shadowRadius: 8,
            }}

            closeIconColor="#111111"

            closeIconSize={22}

            contentStyle={{
                paddingHorizontal: 0,
                paddingBottom: 20,
            }}
        >

            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <View
                style={{
                    alignItems: "center",
                    paddingTop: 14,
                    paddingHorizontal: 26,
                }}
            >

                {/* =================================================
                    SUCCESS VISUAL
                ================================================= */}

                <View
                    style={{
                        width: 156,
                        height: 156,
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                    }}
                >

                    <View
                        pointerEvents="none"
                        style={{
                            position: "absolute",
                            width: 156,
                            height: 156,
                            left: 0,
                            top: 0,
                        }}
                    >

                        {CONFETTI.map((item, index) => (

                            <View
                                key={index}
                                style={[
                                    {
                                        position: "absolute",
                                        top: item.top,
                                        left: item.left,
                                        width: item.width,
                                        height: item.height,
                                        borderRadius: item.radius,
                                        backgroundColor: item.color,
                                        transform: [
                                            {
                                                rotate: item.rotate,
                                            },
                                        ],
                                    },
                                ]}
                            />

                        ))}

                        <Text
                            style={{
                                position: "absolute",
                                top: 107,
                                left: 108,
                                fontSize: 22,
                                lineHeight: 22,
                                color: "#FFB000",
                                fontFamily:
                                    theme.fonts?.bold ||
                                    theme.fonts?.semiBold,
                            }}
                        >
                            ✦
                        </Text>

                    </View>


                    <View
                        style={{
                            width: 94,
                            height: 94,
                            borderRadius: 47,
                            backgroundColor: "#12B76A",
                            alignItems: "center",
                            justifyContent: "center",
                            elevation: 3,
                            shadowColor: "#000000",
                            shadowOffset: {
                                width: 0,
                                height: 2,
                            },
                            shadowOpacity: 0.10,
                            shadowRadius: 5,
                        }}
                    >

                        <MaterialIcons
                            name="check"
                            size={58}
                            color="#FFFFFF"
                        />

                    </View>

                </View>


                {/* =================================================
                    TITLE
                ================================================= */}

                <Text
                    style={{
                     
                        textAlign: "center",
                        fontSize: 29,
                       
                        fontFamily:
                            theme.fonts?.bold,
                    }}
                >

                    <Text
                        style={{
                            color: theme.colors.navy900,
                        }}
                    >
                        Application{" "}
                    </Text>

                    <Text
                        style={{
                            color: "#049B69",
                        }}
                    >
                        Submitted!
                    </Text>

                </Text>


                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <Text
                    style={{
                        marginTop: 8,
                        textAlign: "center",
                        fontSize: 14,
                        lineHeight: 20,
                        fontFamily: theme.fonts?.medium,
                        color: theme.colors.gray500,
                    }}
                >
                    Your loan application has been
                    received and is
                    {"\n"}
                    being processed by our team.
                </Text>


                {/* =================================================
                    CARDS
                ================================================= */}

                <View
                    style={{
                        width: "100%",
                        marginTop: 48,
                        gap: 16,
                    }}
                >

                    {/* =================================================
                        REFERENCE CARD
                    ================================================= */}

                    <View
                        style={{
                            width: "100%",
                            minHeight: 80,
                            borderRadius: 16,
                            borderWidth: 1,
                            borderColor: "#E9EEF2",
                            backgroundColor: "#FBFCFD",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 18,
                        }}
                    >

                        <View
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 12,
                                backgroundColor: "#FFF2EB",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >

                            <MaterialIcons
                                name="description"
                                size={25}
                                color="#FF5B2A"
                            />

                        </View>


                        <View
                            style={{
                                flex: 1,
                                marginLeft: 16,
                                minWidth: 0,
                                justifyContent: "center",
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 12,
                                    lineHeight: 15,
                                    fontFamily:
                                        theme.fonts?.bold ||
                                        theme.fonts?.semiBold,
                                    color: "#9AA8B7",
                                    letterSpacing: 0.35,
                                }}
                            >
                                REFERENCE ID
                            </Text>


                            <Text
                                style={{
                                    marginTop: 3,
                                    fontSize: 17,
                                    lineHeight: 22,
                                    fontFamily:
                                        theme.fonts?.bold ||
                                        theme.fonts?.semiBold,
                                    color: theme.colors.navy900,
                                }}

                                numberOfLines={1}

                                adjustsFontSizeToFit

                                minimumFontScale={0.75}
                            >
                                {referenceId}
                            </Text>

                        </View>


                        <View
                            style={{
                                height: 32,
                                width: 1,
                                borderLeftWidth: 1,
                                borderStyle: "dashed",
                                borderColor: "#BCC6D0",
                                marginHorizontal: 14,
                            }}
                        />


                        <Pressable
                            onPress={() =>
                                onCopyReference?.(
                                    referenceId
                                )
                            }

                            hitSlop={8}

                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                minWidth: 58,
                                paddingVertical: 10,
                            }}
                        >

                            <MaterialIcons
                                name="content-copy"
                                size={18}
                                color="#FF5B2A"
                            />

                            <Text
                                style={{
                                    marginLeft: 5,
                                    fontSize: 13,
                                    lineHeight: 17,
                                    fontFamily:
                                        theme.fonts?.semiBold ||
                                        theme.fonts?.regular,
                                    color: "#FF5B2A",
                                }}
                            >
                                Copy
                            </Text>

                        </Pressable>

                    </View>


                    {/* =================================================
                        WHAT'S NEXT CARD
                    ================================================= */}

                    <View
                        style={{
                            width: "100%",
                            minHeight: 91,
                            borderRadius: 16,
                            borderWidth: 1,
                            borderColor: "#E9EEF2",
                            backgroundColor: "#FBFCFD",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingHorizontal: 18,
                        }}
                    >

                        <View
                            style={{
                                width: 48,
                                height: 48,
                                borderRadius: 12,
                                backgroundColor: "#FFF2EB",
                                alignItems: "center",
                                justifyContent: "center",
                                flexShrink: 0,
                            }}
                        >

                            <MaterialIcons
                                name="schedule"
                                size={25}
                                color="#FF5B2A"
                            />

                        </View>


                        <View
                            style={{
                                flex: 1,
                                marginLeft: 16,
                                minWidth: 0,
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 12,
                                    lineHeight: 15,
                                    fontFamily:
                                        theme.fonts?.bold ,
                                        
                                    color: theme.colors.navy900,
                                    letterSpacing: 0.4,
                                    marginBottom: 4,
                                }}
                            >
                                WHAT'S NEXT?
                            </Text>


                            <Text
                                style={{
                                    fontSize: 12,
                                    lineHeight: 18,
                                    fontFamily: theme.fonts?.regular,
                                    color: "#52616B",
                                }}
                            >
                                Our team will review your application and
                               
                                get back to you shortly.
                            </Text>

                        </View>

                    </View>

                </View>


                {/* =================================================
                    DASHBOARD BUTTON
                ================================================= */}

          {/* =================================================
    DASHBOARD BUTTON
================================================= */}

<CommonButton

    title="Go to Dashboard"

    onPress={onGoToDashboard}

    rightIcon={

        <MaterialIcons
            name="arrow-forward"
            size={24}
            color="#FFFFFF"
        />

    }

    containerStyle={{

        width: "100%",

        height: 61,

        minHeight: 61,

        marginTop: 56,

        borderRadius: 15,

        backgroundColor: "#FF9966",

    }}

    textStyle={{

        fontSize: 16,

        lineHeight: 21,

        fontFamily:
            theme.fonts?.bold ||
            theme.fonts?.semiBold,

        color: "#FFFFFF",

    }}

/>

                {/* =================================================
                    VIEW DETAILS
                ================================================= */}

            <Pressable
    onPress={onViewApplicationDetails}
    hitSlop={8}
    style={{
        marginTop: 5,
        paddingVertical: 4,
        alignItems: "center",
        justifyContent: "center",
    }}
>
    <Text
        style={{
            fontSize: 14,
            lineHeight: 19,
            fontFamily:
                theme.fonts?.semiBold ||
                theme.fonts?.regular,
            color: "#E8611B",
            textDecorationLine: "underline",
        }}
    >
        View Application Details
    </Text>
</Pressable>


                {/* =================================================
                    SECURITY
                ================================================= */}

                <View
                    style={{
                        marginTop: 30,
                        minHeight: 31,
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 8,
                        paddingBottom: 8,
                    }}
                >

                    <MaterialIcons
                        name="verified-user"
                        size={16}
                        color="#00B878"
                    />


                    <Text
                        style={{
                            marginLeft: 6,
                            fontSize: 14,
                            lineHeight: 18,
                            fontFamily: theme.fonts?.regular,
                            color: "#687583",
                            textAlign: "center",
                        }}
                    >
                        Your information is 100% secure with us.
                    </Text>

                </View>

            </View>

        </NewCustomBottomSheet>
    );
};


export default LoanApplicationSuccessBottomSheet;