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

import LinearGradient from "react-native-linear-gradient";

import { theme } from "../../../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const NewFlowCommonHeader = ({
    title = "Basic Details",

    onBack,

    onNotificationPress,

    showNotification = true,

    containerStyle,

    titleStyle,

    backButtonStyle,

    notificationButtonStyle,
}) => {
    const insets = useSafeAreaInsets();

    return (
        <LinearGradient
            colors={[
                '#FAF5EB' ,
                "#FDF6EB",
               '#FAF5EB' ,
              
            ]}
            locations={[0, 0.5, 1]}
            start={{
                x: 0,
                y: 0,
            }}
            end={{
                x: 0,
                y: 1,
            }}
            style={[
                {
                    height: 76 + insets.top,
                    width: "100%",
                },
                containerStyle,
            ]}
        >

            {/* HEADER CONTENT */}
            <View
                style={{
                    height: 76,
                    marginTop: insets.top,

                    paddingHorizontal: 16,

                    flexDirection: "row",

                    alignItems: "center",

                    justifyContent: "space-between",
                }}
            >

                {/* ================================
                    BACK BUTTON
                ================================= */}

                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={onBack}
                    style={[
                        {
                            width: 52,
                            height: 52,

                            borderRadius: 12,

                            backgroundColor: "#F8F8F8",

                            alignItems: "center",
                            justifyContent: "center",
                        },

                        backButtonStyle,
                    ]}
                >
                    <ArrowLeft
                        size={26}
                        color="#111827"
                        strokeWidth={2}
                    />
                </TouchableOpacity>


                {/* ================================
                    TITLE
                ================================= */}

                <Text
                    numberOfLines={1}
                    style={[
                        {
                            position: "absolute",

                            left: 70,
                            right: 70,

                            textAlign: "center",

                            fontSize: 21,
                            lineHeight: 27,

                            fontFamily:
                                theme.fonts.headingSemiBold,

                            color: "#111827",

                            includeFontPadding: false,
                        },

                        titleStyle,
                    ]}
                >
                    {title}
                </Text>


                {/* ================================
                    NOTIFICATION
                ================================= */}

                {showNotification && (
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onNotificationPress}
                        style={[
                            {
                                width: 44,
                                height: 44,

                                borderRadius: 12,

                                backgroundColor:
                                    "#ffffff",

                                alignItems: "center",
                                justifyContent: "center",
                            },

                            notificationButtonStyle,
                        ]}
                    >
                        <Bell
                            size={23}

                            color={
                                theme.colors.primary500
                            }

                            fill={
                                theme.colors.primary500
                            }

                            strokeWidth={1.8}
                        />
                    </TouchableOpacity>
                )}

            </View>

        </LinearGradient>
    );
};

export default NewFlowCommonHeader;