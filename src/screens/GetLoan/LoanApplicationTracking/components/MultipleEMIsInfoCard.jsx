import React, { memo } from "react";

import {
    View,
    Text,
} from "react-native";

import {
    UsersRound,
    Clock3,
} from "lucide-react-native";

import { theme } from "../../../../theme";

const MultipleEMIsInfoCard = () => {
    return (
        <View
            style={{
                minHeight: 88,
                borderWidth: 1,
                borderColor: "#746A58",
                borderRadius: 18,
                backgroundColor: "#FFFCF4",
                paddingHorizontal: 16,
                paddingVertical: 13,
                flexDirection: "row",
                alignItems: "center",
                gap: 14,
            }}
        >
          <View
    style={{
        width: 49,
        height: 49,
        borderRadius: 25,
        backgroundColor: "#FFF0C8",
        alignItems: "center",
        justifyContent: "center",
    }}
>
    <View
        style={{
            width: 25,
            height: 25,
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <UsersRound
            size={19}
            color="#A77A00"
            strokeWidth={1.7}
        />

        <View
            style={{
                position: "absolute",
                right: -2,
                top: -2,
                width: 12,
                height: 12,
                borderRadius: 6,
                backgroundColor: "#FFF0C8",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Clock3
                size={10}
                color="#A77A00"
                strokeWidth={1.8}
            />
        </View>
    </View>
</View>

            <View style={{ flex: 1 }}>
                <Text
                    style={{
                        fontFamily: theme.fonts.bold,
                        fontSize: 15,
                        color: "#222222",
                        marginBottom: 3,
                    }}
                >
                    Need to pay multiple EMIs?
                </Text>

                <Text
                    style={{
                        fontFamily: theme.fonts.medium,
                        fontSize: 13,
                        lineHeight: 19,
                        color: "#8DA1BE",
                    }}
                >
                    Pay your current EMI first. Once it's
                    completed, you can pay the next upcoming EMI.
                </Text>
            </View>
        </View>
    );
};

export default memo(MultipleEMIsInfoCard);