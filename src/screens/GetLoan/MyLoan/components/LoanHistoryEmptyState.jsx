import React, {
    memo,
} from "react";

import {
    View,
    Text,
} from "react-native";

import MaterialIcons from "@react-native-vector-icons/material-icons";

import {
    theme,
} from "../../../../theme";


const LoanHistoryEmptyState = ({
    title = "No loans found",

    description =
        "Your loan applications will appear here.",

}) => {

    return (

        <View
            style={{
                flex: 1,
  
                
                alignItems: "center",

                justifyContent: "center",

                paddingHorizontal:
                    theme.spacing.xl,
            }}
        >

            {/* =================================================
                ICON
            ================================================= */}

            <View
                style={{
                    width: 72,

                    height: 72,

                    borderRadius: 36,

                    alignItems: "center",

                    justifyContent: "center",

                    backgroundColor:
                        theme.colors.primary100,
                }}
            >

                <MaterialIcons
                    name="account-balance-wallet"
                    size={34}
                    color={
                        theme.colors.primary500
                    }
                />

            </View>


            {/* =================================================
                TITLE
            ================================================= */}

            <Text
                style={{
                    marginTop:
                        theme.spacing.lg,

                    fontSize:
                        theme.typography.h4,

                    fontFamily:
                        theme.fonts.headingSemiBold,

                    color:
                        theme.colors.navy900,

                    textAlign: "center",
                }}
            >
                {title}
            </Text>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <Text
                style={{
                    marginTop:
                        theme.spacing.sm,

                    fontSize:
                        theme.typography.b3,

                    fontFamily:
                        theme.fonts.regular,

                    color:
                        theme.colors.gray500,

                    textAlign: "center",

                    lineHeight: 19,

                    maxWidth: 300,
                }}
            >
                {description}
            </Text>

        </View>

    );
};


export default memo(
    LoanHistoryEmptyState
);