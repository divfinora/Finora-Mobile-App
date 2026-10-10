
import React from "react";
import {
    ActivityIndicator,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { CheckCircle, ShieldCheck } from "lucide-react-native";
import { theme } from "../../../../../theme";

// Keep your existing theme import here.

const KycFieldStatus = ({
    status = "pending",
    onVerify,
    isEnabled = false,
}) => {
    if (status === "syncing") {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                }}
            >
                <ActivityIndicator
                    size="small"
                    color={theme.colors.primary500}
                />

                <Text
                    style={{
                        fontSize: 11,
                        fontFamily: theme.fonts.medium,
                        color: "#8A96A8",
                    }}
                >
                    Checking...
                </Text>
            </View>
        );
    }

    if (status === "verified") {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                }}
            >
                <CheckCircle size={17} color="#16845B" />

                <Text
                    style={{
                        fontSize: 11,
                        fontFamily: theme.fonts.semiBold,
                        color: "#16845B",
                    }}
                >
                    Verified
                </Text>
            </View>
        );
    }

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            disabled={!isEnabled}
            onPress={onVerify}
            style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                paddingVertical: 6,
                paddingLeft: 5,
                opacity: isEnabled ? 1 : 0.35,
            }}
        >
            <ShieldCheck
                size={16}
                color={theme.colors.primary500}
            />

            <Text
                style={{
                    fontSize: 12,
                    fontFamily: theme.fonts.semiBold,
                    color: theme.colors.primary500,
                }}
            >
                Verify
            </Text>
        </TouchableOpacity>
    );
};

export default KycFieldStatus;
