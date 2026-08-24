import React, { memo } from "react";

import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from "react-native";

import {
    Check,
    ArrowRight,
} from "lucide-react-native";

import { theme } from "../../../theme";


const OFFERS = [
    {
        id: "creditboost",

        title: "CreditBoost Pro",

        description:
            "Build your credit score while you\nspend",

        points: [
            "Reports monthly to all 3 bureaus",
            "Works with your debit card",
            "No hard checks",
        ],

        buttonText: "Start Building Credit",

        image:
            "https://cdn-icons-png.flaticon.com/512/3004/3004458.png",
    },

    {
        id: "budgetbuddy",

        title: "BudgetBuddy App",

        description:
            "Track your spending and crush\nyour savings goals",

        points: [
            "Real-time budget insights",
            "Personalized saving tips",
            "Syncs with your bank",
        ],

        buttonText: "Try It Free",

        image:
            "https://cdn-icons-png.flaticon.com/512/2489/2489756.png",
    },
];


const OfferCard = ({
    offer,
    onPress,
}) => {

    return (

        <View
            style={{

                marginHorizontal:
                    theme.spacing.xl,

                marginBottom:
                    theme.spacing.xxl,

                minHeight: 242,

                backgroundColor:
                    theme.colors.white,

                borderRadius:
                    theme.radius.lg,

                borderWidth: 0.1,

                borderColor:
                    "##FFFEFB",

                overflow: "hidden",

                ...theme.shadows.card,
            }}
        >

            {/* ==========================================
          CONTENT
      ========================================== */}

            <View
                style={{
                    paddingTop:
                        theme.spacing.xxl,

                    paddingLeft:
                        theme.spacing.xxl,

                    paddingRight:
                        120,

                    paddingBottom:
                        theme.spacing.xxl,
                }}
            >

                {/* TITLE */}

                <Text
                    style={{
                        color:
                            theme.colors.navy900,

                        fontSize:
                            theme.typography.h4,

                        lineHeight:
                            theme.lineHeight.h4,

                        fontFamily:
                            theme.fonts.headingBold,
                    }}
                >
                    {offer.title}
                </Text>


                {/* DESCRIPTION */}

                <Text
                    style={{
                        marginTop:
                            theme.spacing.sm,

                        color:
                            theme.colors.gray700,

                        fontSize:
                            theme.typography.b2,

                        lineHeight:
                            20,

                        fontFamily:
                            theme.fonts.regular,
                    }}
                >
                    {offer.description}
                </Text>


                {/* POINTS */}

                {/* ==========================================
    POINTS
========================================== */}

                <View
                    style={{
                        marginTop: theme.spacing.lg,
                    }}
                >
                    {offer.points.map((point) => (

                        <View
                            key={point}
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                marginBottom: theme.spacing.sm,
                            }}
                        >

                            {/* BLUE CIRCLE */}

                            <View
                                style={{
                                    width: 16,
                                    height: 16,

                                    borderRadius: 8,

                                    backgroundColor: "#0759C9",

                                    alignItems: "center",
                                    justifyContent: "center",

                                    flexShrink: 0,
                                }}
                            >

                                <Check
                                    size={10}
                                    color="#FFFFFF"
                                    strokeWidth={3}
                                />

                            </View>


                            {/* TEXT */}

                            <Text
                                style={{
                                    marginLeft: 8,

                                    color: theme.colors.gray700,

                                    fontSize: theme.typography.caption,

                                    lineHeight: 16,

                                    fontFamily: theme.fonts.medium,

                                    flexShrink: 1,
                                }}
                            >
                                {point}
                            </Text>

                        </View>

                    ))}
                </View>


                {/* CTA */}

                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                        onPress?.(offer)
                    }
                    style={{
                        flexDirection:
                            "row",

                        alignItems:
                            "center",

                        alignSelf:
                            "flex-start",

                        marginTop:
                            theme.spacing.sm,
                    }}
                >

                    <Text
                        style={{
                            color:
                                "#0059D6",

                            fontSize:
                                theme.typography.b2,

                            fontFamily:
                                theme.fonts.bold,
                        }}
                    >
                        {offer.buttonText}
                    </Text>

                    <ArrowRight
                        size={18}
                        color="#0059D6"
                        strokeWidth={2}
                        style={{
                            marginLeft: 4,
                        }}
                    />

                </TouchableOpacity>

            </View>


            {/* ==========================================
          IMAGE
      ========================================== */}

            <View
                style={{
                    position: "absolute",

                    right: 0,

                    bottom: 0,

                    width: 115,

                    height: 117,

                    overflow: "hidden",

                    borderTopLeftRadius: 55,
                }}
            >

                <Image
                    source={{
                        uri: offer.image,
                    }}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                />

            </View>

        </View>

    );

};


const OffersJustForYou = ({
    onOfferPress,
}) => {

    return (

        <View
            style={{
                marginTop:
                    theme.spacing.lg,

                paddingTop:
                    theme.spacing.lg,

                paddingBottom:
                    theme.spacing.xxl,

                backgroundColor:
                    theme.colors.white,

            }}
        >

            {/* ==========================================
          SECTION TITLE
      ========================================== */}

            <Text
                style={{
                    marginHorizontal:
                        theme.spacing.xl,

                    marginBottom:
                        theme.spacing.xxl,

                    textAlign:
                        "center",

                    color:
                        theme.colors.navy900,

                    fontSize:
                        theme.typography.h3,

                    lineHeight:
                        theme.lineHeight.h3,

                    fontFamily:
                        theme.fonts.headingBold,
                }}
            >
                Offers Just for You
            </Text>


            {/* ==========================================
          OFFER CARDS
      ========================================== */}

            {OFFERS.map((offer) => (

                <OfferCard
                    key={offer.id}
                    offer={offer}
                    onPress={onOfferPress}
                />

            ))}

        </View>

    );

};


export default memo(OffersJustForYou);