import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import {
    ArrowLeft,
    Bell,
} from "lucide-react-native";
import { theme } from "../../../../../theme";

 


const Step1ApplyLoanPersonalDetailBasicDetailsHeader = ({
    onBack,
    onNotificationPress,
}) => {

    return (
        <View
            style={{
                height: 76,

                paddingHorizontal:
                    16,

                flexDirection:
                    "row",

                alignItems:
                    "center",

                justifyContent:
                    "space-between",

                backgroundColor:
                    "#FFFDF9",
            }}
        >

            {/* BACK */}

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onBack}

                style={{
                    width: 52,
                    height: 52,

                    borderRadius: 12,

                    backgroundColor:
                        "#F8F8F8",

                    alignItems:
                        "center",

                    justifyContent:
                        "center",
                }}
            >
                <ArrowLeft
                    size={26}
                    color="#111827"
                    strokeWidth={2}
                />
            </TouchableOpacity>


            {/* TITLE */}

            <Text
                style={{
                    position:
                        "absolute",

                    left: 70,
                    right: 70,

                    textAlign:
                        "center",

                    fontSize: 21,

                    lineHeight: 27,

                    fontFamily:
                        theme.fonts
                            .headingSemiBold,

                    color:
                        "#111827",

                    includeFontPadding:
                        false,
                }}
            >
                Basic Details
            </Text>


            {/* NOTIFICATION */}

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={
                    onNotificationPress
                }

                style={{
                    width: 44,
                    height: 44,

                    borderRadius: 12,

                    backgroundColor:
                        "#FFF1DE",

                    alignItems:
                        "center",

                    justifyContent:
                        "center",
                }}
            >
                <Bell
                    size={23}
                    color={
                        theme.colors
                            .primary500
                    }

                    fill={
                        theme.colors
                            .primary500
                    }

                    strokeWidth={1.8}
                />
            </TouchableOpacity>

        </View>
    );
};


export default Step1ApplyLoanPersonalDetailBasicDetailsHeader;



 