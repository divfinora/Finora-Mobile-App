// src/screens/GetLoan/LoanApplicationTracking/components/LoanSupportCard.jsx

import React, {
    memo,
} from "react";

import {
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import MaterialIcons from
    "@react-native-vector-icons/material-icons";

import {
    theme,
} from "../../../../theme";


const LoanSupportCard = ({
    onPress,
}) => {

    return (
        <View
            style={{
                marginTop:
                    theme.spacing.lg,

                paddingHorizontal:
                    theme.spacing.lg,

                paddingVertical:
                    theme.spacing.md,

                borderRadius: 16,

                borderWidth: 1,

                borderColor:
                    "#F2C98F",

                backgroundColor:
                    theme.colors.white,

                flexDirection:
                    "row",

                alignItems:
                    "center",
            }}
        >

            {/* =================================================
                SUPPORT ICON
            ================================================= */}

            <View
                style={{
                    width: 32,

                    alignItems:
                        "center",

                    justifyContent:
                        "center",
                }}
            >

                <MaterialIcons
                    name="headset-mic"
                    size={24}
                    color={
                        theme.colors.primary500
                    }
                />

            </View>


            {/* =================================================
                CONTENT
            ================================================= */}

            <View
                style={{
                    flex: 1,
                  

                    marginLeft:
                        theme.spacing.sm,

                    marginRight:
                        theme.spacing.sm,
                      
                }}
            >

                <Text
                    style={{
                        fontSize: 14,

                        lineHeight: 18,

                        fontFamily:
                            theme.fonts.bold,

                        color:
                            theme.colors.navy900,
                    }}
                >
                    Need Help?
                </Text>


                <Text
                    style={{
                        marginTop: 1,

                        fontSize: 12,

                        lineHeight: 16,

                        fontFamily:
                            theme.fonts.regular,

                        color:
                            theme.colors.gray500,
                    }}
                >
                    Explore other loan options or contact
                    support.
                </Text>

            </View>


            {/* =================================================
                GET SUPPORT BUTTON
            ================================================= */}

            <TouchableOpacity
                activeOpacity={0.8}

                onPress={
                    onPress
                }

                style={{
                    height: 38,

                    paddingHorizontal:
                        theme.spacing.md,

                    borderRadius: 20,

                    backgroundColor:
                        theme.colors.primary500,

                    flexDirection:
                        "row",

                    alignItems:
                        "center",

                    justifyContent:
                        "center",
                }}
            >

                <MaterialIcons
                    name="phone-in-talk"
                    size={14}
                    color={
                        theme.colors.white
                    }
                />


                <Text
                    style={{
                        marginLeft: 5,

                        fontSize: 12,

                        lineHeight: 16,

                        fontFamily:
                            theme.fonts.bold,

                        color:
                            theme.colors.white,
                    }}
                >
                    Get Support
                </Text>

            </TouchableOpacity>

        </View>
    );
};


export default memo(
    LoanSupportCard
);
