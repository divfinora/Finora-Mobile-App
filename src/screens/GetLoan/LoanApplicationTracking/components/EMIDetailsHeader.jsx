import React, { memo } from "react";

import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import {
    ArrowLeft,
    Bell,
} from "lucide-react-native";

import { theme } from "../../../../theme";

const EMIDetailsHeader = ({
    onBack,
    onNotificationPress,
}) => {
    return (
        <View
            style={{
                backgroundColor: "#FFF9F1",
                paddingHorizontal: 16,
                paddingVertical: 12,
            }}
        >
            <View
                style={{
                    height: 56,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <TouchableOpacity
                    onPress={onBack}
                    activeOpacity={0.8}
                    style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        backgroundColor: "#FFFFFF",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ArrowLeft
                        size={25}
                        color={theme.colors.black}
                    />
                </TouchableOpacity>

                <Text
                    style={{
                        fontFamily: theme.fonts.headingBold,
                        fontSize: 21,
                        color: theme.colors.black,
                    }}
                >
                    EMI Details
                </Text>

                <TouchableOpacity
                    onPress={onNotificationPress}
                    activeOpacity={0.8}
                    style={{
                        width: 52,
                        height: 52,
                        borderRadius: 14,
                        backgroundColor: "#FFFFFF",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Bell
                        size={22}
                        color={theme.colors.primary700}
                        fill={theme.colors.primary700}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default memo(EMIDetailsHeader);