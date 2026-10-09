// ============================================================

// src/screens/GetLoan/MyLoan/components/LoanHistoryCard.jsx

// ============================================================
import formatAmount from '../../../../utils/formatAmount'
import {
    useNavigation,
} from "@react-navigation/native";

import React, {

    memo,

    useMemo,

} from "react";



import {

    StyleSheet,

    Text,

    TouchableOpacity,

    useWindowDimensions,

    View,

} from "react-native";



import MaterialIcons from

    "@react-native-vector-icons/material-icons";



import {

    theme,

} from "../../../../theme";



// ============================================================

// COLORS

// ============================================================



const COLORS = {

    card:

        "#FAF7F6",



    border:

        "#D6CCC6",



    white:

        "#FFFFFF",



    navy:

        theme.colors.navy900,



    primary:

        theme.colors.primary500,



    iconBackground:

        "#FFF0E8",



    messageBackground:

        "#F2F3FFB2",



    rejectedBackground:

        "#FFE1E5",



    rejectedText:

        "#E11D48",



    warning:

        "#D97706",



    warningBackground:

        "#FFF2D9",



    approved:

        "#079669",



    approvedBackground:

        "#E7F8F1",



    disbursed:

        "#092B00",



    disbursedBackground:

        "#EAFFE4",



    active:

        "#008F68",



    activeBackground:

        "#E5F8F1",



    closed:

        "#008F68",



    closedBackground:

        "#E5F8F1",



    muted:

        "#94A3B8",



    progressTrack:

        "#DDE3E9",



    progress:

        "#10B981",



    buttonBlue:

        "#2864E8",



    divider:

        "#8D8D96",



    lightPurple:

        "#F4F4FC",



    closedOrange:

        "#F26B21",

};



// ============================================================

// TYPOGRAPHY

// ============================================================



const TYPOGRAPHY = {

    loanName: {

        fontFamily:

            theme.fonts.semiBold,



        fontSize: 16,



        lineHeight: 24.89,



        letterSpacing: -0.18,



        color:

            COLORS.navy,

    },



    loanAmount: {

        fontFamily:

            theme.fonts.semiBold,



        fontSize: 18,



        lineHeight: 38.47,



        letterSpacing: -0.59,



        color:

            COLORS.navy,

    },



    status: {

        fontFamily:

            theme.fonts.semiBold,



        fontSize: 12,



        lineHeight: 15.84,



        letterSpacing: 0.25,

    },



    message: {

        fontFamily:

            theme.fonts.medium,



        fontSize: 14,



        lineHeight: 18.39,



        color:

            COLORS.navy,

    },



    messageBold: {

        fontFamily:

            theme.fonts.bold,



        fontSize: 14,



        lineHeight: 18.39,

    },



    infoLabel: {

        fontFamily:

            theme.fonts.semiBold,



        fontSize: 14,



        lineHeight: 16,



        letterSpacing: -0.41,



        color:

            COLORS.muted,

    },



    infoValue: {

        fontFamily:

            theme.fonts.semiBold,



        fontSize: 14,



        lineHeight: 16,



        letterSpacing: -0.41,



        color:

            COLORS.navy,

    },



    balanceLabel: {

        fontFamily:

            theme.fonts.regular,



        fontSize: 13,



        lineHeight: 17,



        color:

            COLORS.muted,

    },



    balanceValue: {

        fontFamily:

            theme.fonts.semiBold,



        fontSize: 18,



        lineHeight: 24,



        color:

            COLORS.navy,

    },



    progressLabel: {

        fontFamily:

            theme.fonts.regular,



        fontSize: 11,



        lineHeight: 15,



        color:

            "#64748B",

    },



    emiLabel: {

        fontFamily:

            theme.fonts.medium,



        fontSize: 14,



        lineHeight: 20,



        color:

            "#111827",

    },



    emiValue: {

        fontFamily:

            theme.fonts.semiBold,



        fontSize: 14,



        lineHeight: 20,



        color:

            "#111827",

    },



    nextEmi: {

        fontFamily:

            theme.fonts.semiBold,



        fontSize: 12,



        lineHeight: 16,



        color:

            COLORS.primary,

    },



    button: {

        fontFamily:

            theme.fonts.semiBold,



        fontSize: 13,



        lineHeight: 18,

    },



    closedLabel: {

        fontFamily:

            theme.fonts.regular,



        fontSize: 12,



        lineHeight: 16,



        color:

            COLORS.muted,

    },



    closedValue: {

        fontFamily:

            theme.fonts.semiBold,



        fontSize: 14,



        lineHeight: 18,



        color:

            COLORS.navy,

    },

};



// ============================================================

// CARD STYLES

// ============================================================



const CARD = StyleSheet.create({

    container: {

        marginBottom:

            theme.spacing.md,



        padding:

            theme.spacing.lg,



        borderRadius: 16,



        backgroundColor:

            COLORS.card,



        borderWidth: 1,



        borderColor:

            COLORS.border,

    },



    header: {

        flexDirection:

            "row",



        alignItems:

            "flex-start",

    },



    loanIcon: {

        width: 52,



        height: 52,



        borderRadius: 12,



        backgroundColor:

            COLORS.iconBackground,



        alignItems:

            "center",



        justifyContent:

            "center",



        flexShrink: 0,

    },



    loanInfo: {

        flex: 1,



        minWidth: 0,



        marginLeft:

            theme.spacing.md,

    },



    statusBadge: {

        flexDirection:

            "row",



        alignItems:

            "center",



        paddingHorizontal: 9,



        paddingVertical: 6,



        borderRadius: 7,



        maxWidth: 130,



        flexShrink: 1,

    },



    statusText: {

        marginLeft: 4,



        ...TYPOGRAPHY.status,



        flexShrink: 1,

    },



    messageBox: {

        marginTop:

            theme.spacing.lg,



        minHeight: 66,



        paddingHorizontal:

            theme.spacing.md,



        paddingVertical:

            theme.spacing.md,



        borderRadius: 14,



        flexDirection:

            "row",



        alignItems:

            "center",

    },



    messageText: {

        flex: 1,



        minWidth: 0,



        ...TYPOGRAPHY.message,

    },



    messageArrow: {

        marginLeft:

            theme.spacing.sm,



        flexShrink: 0,

    },



    infoRow: {

        flexDirection:

            "row",



        width: "100%",



        marginTop:

            theme.spacing.lg,

    },



    infoCard: {

        flex: 1,



        minWidth: 0,



        minHeight: 70,



        borderRadius: 13,



        backgroundColor:

            COLORS.white,



        flexDirection:

            "row",



        alignItems:

            "center",

    },



    infoIcon: {

        backgroundColor:

            COLORS.iconBackground,



        alignItems:

            "center",



        justifyContent:

            "center",



        flexShrink: 0,

    },



    infoContent: {

        flex: 1,



        minWidth: 0,

    },



    balanceBox: {

        marginTop:

            theme.spacing.lg,



        paddingHorizontal:

            theme.spacing.md,



        paddingVertical:

            theme.spacing.md,



        borderRadius: 14,



        backgroundColor:

            COLORS.lightPurple,



        flexDirection:

            "row",

    },



    balanceColumn: {

        flex: 1,



        minWidth: 0,

    },



    balanceDivider: {

        width: 1,



        marginHorizontal:

            theme.spacing.lg,



        backgroundColor:

            COLORS.divider,

    },



    progressTrack: {

        height: 5,



        marginTop: 7,



        borderRadius: 10,



        overflow:

            "hidden",



        backgroundColor:

            COLORS.progressTrack,

    },



    progressFill: {

        height: "100%",



        borderRadius: 10,



        backgroundColor:

            COLORS.progress,

    },



    actionRow: {

        marginTop:

            theme.spacing.md,



        flexDirection:

            "row",



        gap:

            theme.spacing.sm,

    },



    actionButton: {

        flex: 1,



        height: 40,



        borderRadius: 8,



        alignItems:

            "center",



        justifyContent:

            "center",

    },



    nextEmiBox: {

        marginTop:

            theme.spacing.sm,



        height: 34,



        paddingHorizontal:

            theme.spacing.sm,



        borderRadius: 8,



        backgroundColor:

            "#FFF0E8",



        flexDirection:

            "row",



        alignItems:

            "center",



        justifyContent:

            "space-between",

    },



    closedBalanceBox: {

        marginTop:

            theme.spacing.lg,



        paddingHorizontal:

            theme.spacing.md,



        paddingVertical:

            theme.spacing.md,



        borderRadius: 14,



        backgroundColor:

            COLORS.lightPurple,



        flexDirection:

            "row",

    },



    closedDateRow: {

        flexDirection:

            "row",



        marginTop:

            theme.spacing.md,

    },



    closedProgressTrack: {

        height: 5,



        marginTop: 7,



        borderRadius: 10,



        overflow:

            "hidden",



        backgroundColor:

            COLORS.progressTrack,

    },



    closedProgressFill: {

        height: "100%",



        width: "100%",



        borderRadius: 10,



        backgroundColor:

            COLORS.progress,

    },

});



// ============================================================

// HELPERS

// ============================================================







// ============================================================



const formatDate = (

    value

) => {

    if (!value) {

        return "-";

    }



    const date =

        new Date(value);



    if (

        Number.isNaN(

            date.getTime()

        )

    ) {

        return String(value);

    }



    return date.toLocaleDateString(

        "en-IN",

        {

            day: "2-digit",

            month: "short",

            year: "numeric",

        }

    );

};



// ============================================================

// LOAN ID FORMATTER

// ============================================================



const formatLoanId = (

    loanId,

    isSmallPhone

) => {

    const value = String(

        loanId ?? "-"

    );



    if (

        !isSmallPhone ||

        value === "-"

    ) {

        return value;

    }



    // Keep the complete Loan ID readable

    // on smaller phones instead of shrinking the font.

    if (value.length <= 14) {

        return value;

    }



    const breakAt = Math.ceil(

        value.length / 2

    );



    return (

        value.slice(0, breakAt) +

        "\n" +

        value.slice(breakAt)

    );

};



// ============================================================



const normalizeStatus = (

    value

) => {

    return String(

        value ??

        "PENDING"

    )

        .trim()

        .toUpperCase()

        .replaceAll(

            " ",

            "_"

        );

};



// ============================================================



const getLoanName = (

    loan

) => {

    const value =

        loan?.category ??

        loan?.loanCategory ??

        loan?.loanType ??

        loan?.name ??

        "Loan";



    const normalized =

        String(value)

            .trim()

            .toUpperCase();



    const names = {

        PERSONAL:

            "Personal Loan",



        GOLD:

            "Gold Loan",



        VEHICLE:

            "Vehicle Loan",



        EDUCATION:

            "Education Loan",



        HOME:

            "Home Loan",



        BUSINESS:

            "Business Loan",



        AGRICULTURE:

            "Agriculture Loan",



        INSTANT:

            "Instant Loan",

    };



    return (

        names[normalized] ??

        String(value)

    );

};



// ============================================================

// STATUS CONFIG

// ============================================================



const getStatusConfig = (

    status

) => {

    switch (

    status

    ) {

        case "APPROVED":

            return {

                label:

                    "Approved",



                icon:

                    "playlist-add-check",



                color:

                    COLORS.approved,



                background:

                    COLORS.approvedBackground,

            };



        case "REJECTED":

            return {

                label:

                    "Rejected",



                icon:

                    "description",



                color:

                    COLORS.rejectedText,



                background:

                    "#FFE0E5",

            };



        case "DISBURSED":

            return {

                label:

                    "Disbursed",



                icon:

                    "payments",



                color:

                    COLORS.disbursed,



                background:

                    COLORS.disbursedBackground,

            };



        case "ACTIVE":

            return {

                label:

                    "Active",



                icon:

                    "account-balance-wallet",



                color:

                    COLORS.active,



                background:

                    COLORS.activeBackground,

            };



        case "CLOSED":

            return {

                label:

                    "Closed",



                icon:

                    "person-outline",



                color:

                    COLORS.closed,



                background:

                    COLORS.closedBackground,

            };



        case "VISITOR_IN_PROGRESS":

        case "PROCESSING":

        case "IN_PROGRESS":

        case "IN-PROGRESS":

            return {

                label:

                    "In-progress",



                icon:

                    "link",



                color:

                    COLORS.warning,



                background:

                    COLORS.warningBackground,

            };



        default:

            return {

                label:

                    "Under Review",



                icon:

                    "schedule",



                color:

                    COLORS.warning,



                background:

                    COLORS.warningBackground,

            };

    }

};



// ============================================================

// STATUS BADGE

// ============================================================



const StatusBadge = memo(({

    config,

}) => {

    return (

        <View

            style={[

                CARD.statusBadge,

                {

                    backgroundColor:

                        config.background,

                },

            ]}

        >

            <MaterialIcons

                name={

                    config.icon

                }

                size={14}

                color={

                    config.color

                }

            />



            <Text

                numberOfLines={1}

                adjustsFontSizeToFit

                minimumFontScale={0.85}

                style={[

                    CARD.statusText,

                    {

                        color:

                            config.color,

                    },

                ]}

            >

                {

                    config.label

                }

            </Text>

        </View>

    );

});



// ============================================================

// LOAN HEADER

// ============================================================



const LoanHeader = memo(({

    loanName,

    amount,

    statusConfig,

    isSmallPhone,

}) => {

    return (

        <View

            style={

                CARD.header

            }

        >

            {/* LOAN ICON */}



            <View

                style={[

                    CARD.loanIcon,

                    isSmallPhone && {

                        width: 44,

                        height: 44,

                        borderRadius: 10,

                    },

                ]}

            >

                <MaterialIcons

                    name="account-balance-wallet"

                    size={

                        isSmallPhone

                            ? 23

                            : 27

                    }

                    color={

                        COLORS.primary

                    }

                />

            </View>



            {/* LOAN DETAILS */}



            <View

                style={

                    CARD.loanInfo

                }

            >

                <Text

                    numberOfLines={1}

                    adjustsFontSizeToFit

                    minimumFontScale={0.85}

                    style={[

                        TYPOGRAPHY.loanName,

                        isSmallPhone && {

                            fontSize: 15,

                            lineHeight: 22,

                        },

                    ]}

                >

                    {

                        loanName

                    }

                </Text>



                <Text

                    numberOfLines={1}

                    adjustsFontSizeToFit

                    minimumFontScale={0.85}

                    style={[

                        TYPOGRAPHY.loanAmount,

                        isSmallPhone && {

                            fontSize: 17,

                            lineHeight: 28,

                        },

                    ]}

                >

                    {

                        formatAmount(amount)

                    }

                </Text>

            </View>



            {/* STATUS */}



            <StatusBadge

                config={

                    statusConfig

                }

            />

        </View>

    );

});



// ============================================================

// INFO ITEM

// ============================================================



const InfoItem = memo(({

    icon,

    label,

    value,

    side,

    isSmallPhone,

    isLoanId = false,

}) => {

    const horizontalPadding =

        isSmallPhone

            ? 8

            : theme.spacing.md;



    const iconSize =

        isSmallPhone

            ? 36

            : 40;



    const iconRadius =

        isSmallPhone

            ? 8

            : 9;



    const iconGlyphSize =

        isSmallPhone

            ? 19

            : 21;



    const contentMargin =

        isSmallPhone

            ? 6

            : theme.spacing.sm;



    const textSize =

        isSmallPhone

            ? 12

            : 14;



    const textLineHeight =

        isSmallPhone

            ? 15

            : 16;



    return (

        <View

            style={[

                CARD.infoCard,

                {

                    paddingHorizontal:

                        horizontalPadding,



                    paddingVertical:

                        isSmallPhone

                            ? 8

                            : theme.spacing.md,



                    marginRight:

                        side === "left"

                            ? isSmallPhone

                                ? 4

                                : theme.spacing.sm

                            : 0,



                    marginLeft:

                        side === "right"

                            ? isSmallPhone

                                ? 4

                                : theme.spacing.sm

                            : 0,

                },

            ]}

        >

            {/* ICON */}



            <View

                style={[

                    CARD.infoIcon,

                    {

                        width:

                            iconSize,



                        height:

                            iconSize,



                        borderRadius:

                            iconRadius,

                    },

                ]}

            >

                <MaterialIcons

                    name={

                        icon

                    }

                    size={

                        iconGlyphSize

                    }

                    color={

                        COLORS.primary

                    }

                />

            </View>



            {/* CONTENT */}



            <View

                style={[

                    CARD.infoContent,

                    {

                        marginLeft:

                            contentMargin,

                    },

                ]}

            >

                <Text

                    numberOfLines={1}

                    adjustsFontSizeToFit

                    minimumFontScale={0.80}

                    style={[

                        TYPOGRAPHY.infoLabel,

                        {

                            fontSize:

                                textSize,



                            lineHeight:

                                textLineHeight,



                            flexShrink: 1,

                        },

                    ]}

                >

                    {

                        label

                    }

                </Text>



                <Text

                    numberOfLines={

                        isLoanId &&

                            isSmallPhone

                            ? 2

                            : 1

                    }

                    adjustsFontSizeToFit={

                        !isLoanId

                    }

                    minimumFontScale={

                        isLoanId

                            ? 1

                            : 0.80

                    }

                    style={[

                        TYPOGRAPHY.infoValue,

                        {

                            fontSize:

                                isLoanId

                                    ? 12

                                    : textSize,



                            lineHeight:

                                isLoanId

                                    ? 16

                                    : textLineHeight,



                            flexShrink: 1,



                            includeFontPadding:

                                false,

                        },

                    ]}

                >

                    {

                        isLoanId

                            ? formatLoanId(

                                value,

                                isSmallPhone

                            )

                            : value

                    }

                </Text>

            </View>

        </View>

    );

});



// ============================================================

// STATUS MESSAGE

// ============================================================



const StatusMessage = memo(({

    status,

    loanName,

}) => {

    const isRejected =

        status ===

        "REJECTED";



    const isApproved =

        status ===

        "APPROVED";



    const isDisbursed =

        status ===

        "DISBURSED";



    const isProgress =

        status ===

        "VISITOR_IN_PROGRESS" ||

        status ===

        "PROCESSING" ||

        status ===

        "IN_PROGRESS" ||

        status ===

        "IN-PROGRESS";



    return (

        <View

            style={[

                CARD.messageBox,

                {

                    backgroundColor:

                        isRejected

                            ? COLORS.rejectedBackground





                            : COLORS.messageBackground,

                },

            ]}

        >

            <Text

                style={[

                    CARD.messageText,

                    {

                        color:

                            isRejected

                                ? COLORS.rejectedText





                                : COLORS.navy,

                    },

                ]}

            >

                {isRejected ? (

                    <>

                        Unfortunately, your{" "}

                        {

                            loanName

                        }{" "}

                        application could not

                        be approved.

                    </>

                ) : isApproved ? (

                    <>

                        Your{" "}

                        {

                            loanName

                        }{" "}

                        application has been{" "}

                        <Text

                            style={[

                                TYPOGRAPHY.messageBold,

                                {

                                    color:

                                        COLORS.approved,

                                },

                            ]}

                        >

                            approved

                        </Text>

                        {" "}successfully.

                    </>

                ) : isDisbursed ? (

                    <>

                        Your Loan Amount has

                        been disbursed to your

                        bank account

                    </>

                ) : isProgress ? (

                    <>

                        Your Verification is an

                        under Progress and

                        Reviewing your{" "}

                        <Text

                            style={[

                                TYPOGRAPHY.messageBold,

                                {

                                    color:

                                        COLORS.primary,

                                },

                            ]}

                        >

                            details & Documents

                        </Text>

                    </>

                ) : (

                    <>

                        Your{" "}

                        {

                            loanName

                        }{" "}

                        Application Has Been

                        Submitted and is an{" "}

                        <Text

                            style={[

                                TYPOGRAPHY.messageBold,

                                {

                                    color:

                                        COLORS.primary,

                                },

                            ]}

                        >

                            under review.

                        </Text>

                    </>

                )}

            </Text>



            <MaterialIcons

                name="chevron-right"

                size={28}

                color={

                    isRejected

                        ? COLORS.rejectedText





                        : COLORS.navy

                }

                style={

                    CARD.messageArrow

                }

            />

        </View>

    );

});



// ============================================================

// NORMAL APPLICATION CARD

// ============================================================



const ApplicationLoanCard = memo(({

    loan,

    loanName,

    status,

    statusConfig,

    onPress,

    isSmallPhone,

}) => {

    const amount =

        loan?.loanAmount ??

        loan?.amount ??

        loan?.requestedAmount ??

        loan?.sanctionedAmount ??

        0;



    const loanId =

        loan?.loanId ??

        loan?.loanID ??

        loan?.applicationId ??

        loan?._id ??

        "-";



    const applyDate =

        loan?.applyDate ??

        loan?.appliedAt ??

        loan?.createdAt ??

        loan?.applicationDate;



    const isDisbursed =

        status ===

        "DISBURSED";



    return (

        <TouchableOpacity

            activeOpacity={0.9}

            onPress={() =>

                onPress?.(

                    loan

                )

            }

            style={[

                CARD.container,

                isSmallPhone && {

                    padding:

                        theme.spacing.md,

                },

            ]}

        >

            <LoanHeader

                loanName={

                    loanName

                }

                amount={

                    amount

                }

                statusConfig={

                    statusConfig

                }

                isSmallPhone={

                    isSmallPhone

                }

            />



            {/* STATUS MESSAGE */}



            <StatusMessage

                status={

                    status

                }

                loanName={

                    loanName

                }

            />



            {/* INFO */}



            <View

                style={

                    CARD.infoRow

                }

            >

                <InfoItem

                    icon={

                        isDisbursed

                            ? "payments"

                            : "event"

                    }

                    label={

                        isDisbursed

                            ? "Disbursed On"

                            : "Apply Date"

                    }

                    value={

                        formatDate(

                            isDisbursed

                                ? (

                                    loan?.disbursedOn ??

                                    loan?.disbursedAt ??

                                    loan?.disbursementDate ??

                                    applyDate

                                )

                                : applyDate

                        )

                    }

                    side="left"

                    isSmallPhone={

                        isSmallPhone

                    }

                />



                <InfoItem

                    icon="assignment"

                    label="Loan ID"

                    value={

                        String(

                            loanId

                        )

                    }

                    side="right"

                    isSmallPhone={

                        isSmallPhone

                    }

                    isLoanId

                />

            </View>

        </TouchableOpacity>

    );

});



// ============================================================

// ACTIVE LOAN CARD

// ============================================================



const ActiveLoanCard = memo(({

    loan,

    loanName,

    statusConfig,

    onPress,

    isSmallPhone,

}) => {
    const navigation = useNavigation()
    const amount =

        loan?.loanAmount ??

        loan?.amount ??

        loan?.sanctionedAmount ??

        0;



    const remainingBalance =

        loan?.remainingBalance ??

        loan?.remainingAmount ??

        loan?.outstandingAmount ??

        loan?.outstandingBalance ??

        0;



    const totalBalance =

        loan?.totalBalance ??

        loan?.totalAmount ??

        loan?.sanctionedAmount ??

        loan?.loanAmount ??

        0;



    const emiPaid =

        loan?.emisPaid ??

        loan?.paidEmis ??

        loan?.emiPaid ??

        0;



    const totalEmi =

        loan?.totalEmis ??

        loan?.tenure ??

        loan?.tenureMonths ??

        0;



    const monthlyEmi =

        loan?.monthlyEmi ??

        loan?.emiAmount ??

        loan?.emi ??

        0;



    const nextEmiDate =

        loan?.nextEmiDate ??

        loan?.nextEMIDate ??

        loan?.nextPaymentDate;



    const progress =

        totalEmi > 0

            ? Math.min(

                Math.max(

                    Number(emiPaid) /

                    Number(totalEmi),

                    0

                ),

                1

            )

            : 0;



    const percentage =

        Math.round(

            progress * 100

        );



    return (

        <TouchableOpacity

            activeOpacity={0.9}

            onPress={() =>

                onPress?.(

                    loan

                )

            }

            style={[

                CARD.container,

                isSmallPhone && {

                    padding:

                        theme.spacing.md,

                },

            ]}

        >

            <LoanHeader

                loanName={

                    loanName

                }

                amount={

                    amount

                }

                statusConfig={

                    statusConfig

                }

                isSmallPhone={

                    isSmallPhone

                }

            />



            {/* BALANCE */}



            <View

                style={

                    CARD.balanceBox

                }

            >

                <View

                    style={

                        CARD.balanceColumn

                    }

                >

                    <Text

                        style={

                            TYPOGRAPHY.balanceLabel

                        }

                    >

                        Remaining Balance

                    </Text>



                    <Text

                        style={

                            TYPOGRAPHY.balanceValue

                        }

                    >

                        {

                            formatAmount(

                                remainingBalance

                            )

                        }

                    </Text>

                </View>



                <View

                    style={

                        CARD.balanceDivider

                    }

                />



                <View

                    style={

                        CARD.balanceColumn

                    }

                >

                    <Text

                        style={

                            TYPOGRAPHY.balanceLabel

                        }

                    >

                        Total Balance

                    </Text>



                    <Text

                        style={

                            TYPOGRAPHY.balanceValue

                        }

                    >

                        {

                            formatAmount(

                                totalBalance

                            )

                        }

                    </Text>

                </View>

            </View>



            {/* PROGRESS */}



            <View

                style={{

                    marginTop:

                        theme.spacing.sm,

                }}

            >

                <View

                    style={{

                        flexDirection:

                            "row",



                        justifyContent:

                            "space-between",

                    }}

                >

                    <Text

                        style={

                            TYPOGRAPHY.progressLabel

                        }

                    >

                        {

                            `${emiPaid} of ${totalEmi} EMIs paid`

                        }

                    </Text>



                    <Text

                        style={

                            TYPOGRAPHY.progressLabel

                        }

                    >

                        {

                            `${percentage}%`

                        }

                    </Text>

                </View>



                <View

                    style={

                        CARD.progressTrack

                    }

                >

                    <View

                        style={[

                            CARD.progressFill,

                            {

                                width:

                                    `${percentage}%`,

                            },

                        ]}

                    />

                </View>

            </View>



            {/* EMI */}



            <View

                style={{

                    marginTop:

                        theme.spacing.sm,



                    flexDirection:

                        "row",



                    justifyContent:

                        "space-between",



                    alignItems:

                        "center",

                }}

            >

                <Text

                    style={

                        TYPOGRAPHY.emiLabel

                    }

                >

                    Monthly EMI

                </Text>



                <Text

                    style={

                        TYPOGRAPHY.emiValue

                    }

                >

                    {

                        formatAmount(

                            monthlyEmi

                        )

                    }

                </Text>

            </View>



            {/* NEXT EMI */}



            <View

                style={

                    CARD.nextEmiBox

                }

            >

                <Text

                    style={

                        TYPOGRAPHY.nextEmi

                    }

                >

                    Next EMI Date

                </Text>



                <Text

                    style={

                        TYPOGRAPHY.nextEmi

                    }

                >

                    {

                        formatDate(

                            nextEmiDate

                        )

                    }

                </Text>

            </View>



            {/* ACTIONS */}



            <View

                style={

                    CARD.actionRow

                }

            >

                <TouchableOpacity

                    activeOpacity={0.85}

                    style={[

                        CARD.actionButton,

                        {

                            backgroundColor:

                                COLORS.buttonBlue,

                        },

                    ]}

                    onPress={() =>

                        onPress?.(

                            loan,

                            "PAY_EMI"

                        )

                    }

                >

                    <Text

                        style={[

                            TYPOGRAPHY.button,

                            {

                                color:

                                    COLORS.white,

                            },

                        ]}

                    >

                        Pay EMI

                    </Text>

                </TouchableOpacity>



                <TouchableOpacity

                    activeOpacity={0.85}

                    style={[

                        CARD.actionButton,

                        {

                            borderWidth: 1,

                            borderColor:

                                "#D8E0E8",

                            backgroundColor:

                                COLORS.card,

                        },

                    ]}

                    onPress={() =>

                        onPress?.(

                            loan,

                            "VIEW_DETAILS"

                        )

                    }

                >

                    <Text

                        style={[

                            TYPOGRAPHY.button,

                            {

                                color:

                                    COLORS.navy,

                            },

                        ]}

                    >

                        View Details

                    </Text>

                </TouchableOpacity>

            </View>

        </TouchableOpacity>

    );

});



// ============================================================

// CLOSED LOAN CARD

// ============================================================



const ClosedLoanCard = memo(({

    loan,

    loanName,

    statusConfig,

    onPress,

    isSmallPhone,

}) => {

    const navigation = useNavigation()
    const amount =

        loan?.loanAmount ??

        loan?.amount ??

        loan?.sanctionedAmount ??

        0;



    const totalPaid =

        loan?.totalPaid ??

        loan?.paidAmount ??

        loan?.totalAmountPaid ??

        amount;



    const emiPaid =

        loan?.emisPaid ??

        loan?.paidEmis ??

        loan?.emiPaid ??

        0;



    const totalEmi =

        loan?.totalEmis ??

        loan?.tenure ??

        loan?.tenureMonths ??

        0;



    const startDate =

        loan?.startDate ??

        loan?.loanStartDate ??

        loan?.disbursementDate ??

        loan?.disbursedAt;



    const closedDate =

        loan?.closedDate ??

        loan?.loanClosedDate ??

        loan?.closureDate ??

        loan?.updatedAt;



    const progress =

        totalEmi > 0

            ? Math.min(

                Math.max(

                    Number(emiPaid) /

                    Number(totalEmi),

                    0

                ),

                1

            )

            : 1;



    const percentage =

        Math.round(

            progress * 100

        );



    return (

        <TouchableOpacity

            activeOpacity={0.9}

            onPress={() =>

                onPress?.(

                    loan

                )

            }

            style={[

                CARD.container,

                isSmallPhone && {

                    padding:

                        theme.spacing.md,

                },

            ]}

        >

            <LoanHeader

                loanName={

                    loanName

                }

                amount={

                    amount

                }

                statusConfig={

                    statusConfig

                }

                isSmallPhone={

                    isSmallPhone

                }

            />



            {/* BALANCE */}



            <View

                style={

                    CARD.closedBalanceBox

                }

            >

                <View

                    style={

                        CARD.balanceColumn

                    }

                >

                    <Text

                        style={

                            TYPOGRAPHY.closedLabel

                        }

                    >

                        Loan Amount

                    </Text>



                    <Text

                        style={

                            TYPOGRAPHY.closedValue

                        }

                    >

                        {

                            formatAmount(

                                amount

                            )

                        }

                    </Text>

                </View>



                <View

                    style={

                        CARD.balanceDivider

                    }

                />



                <View

                    style={

                        CARD.balanceColumn

                    }

                >

                    <Text

                        style={

                            TYPOGRAPHY.closedLabel

                        }

                    >

                        Total Paid

                    </Text>



                    <Text

                        style={

                            TYPOGRAPHY.closedValue

                        }

                    >

                        {

                            formatAmount(

                                totalPaid

                            )

                        }

                    </Text>

                </View>

            </View>



            {/* DATES */}



            <View

                style={

                    CARD.closedDateRow

                }

            >

                <InfoItem

                    icon="event"

                    label="Start Date"

                    value={

                        formatDate(

                            startDate

                        )

                    }

                    side="left"

                    isSmallPhone={

                        isSmallPhone

                    }

                />



                <InfoItem

                    icon="person-outline"

                    label="Closed Date"

                    value={

                        formatDate(

                            closedDate

                        )

                    }

                    side="right"

                    isSmallPhone={

                        isSmallPhone

                    }

                />

            </View>



            {/* PROGRESS */}



            <View

                style={{

                    marginTop:

                        theme.spacing.sm,

                }}

            >

                <View

                    style={{

                        flexDirection:

                            "row",



                        justifyContent:

                            "space-between",

                    }}

                >

                    <Text

                        style={

                            TYPOGRAPHY.progressLabel

                        }

                    >

                        {

                            `${emiPaid} of ${totalEmi} EMIs paid`

                        }

                    </Text>



                    <Text

                        style={[

                            TYPOGRAPHY.progressLabel,

                            {

                                color:

                                    COLORS.closed,

                            },

                        ]}

                    >

                        {

                            `${percentage}%`

                        }

                    </Text>

                </View>



                <View

                    style={

                        CARD.closedProgressTrack

                    }

                >

                    <View

                        style={

                            CARD.closedProgressFill

                        }

                    />

                </View>

            </View>



            {/* ACTIONS */}



            <View

                style={

                    CARD.actionRow

                }

            >

                <TouchableOpacity

                    activeOpacity={0.85}

                    style={[

                        CARD.actionButton,

                        {

                            backgroundColor:

                                COLORS.closedOrange,

                        },

                    ]}

                    onPress={() => {
                        navigation.navigate('loan-disbursed-get-single-loan-detail')
                    }

                        // onPress?.(

                        //     loan,

                        //     "LOAN_DETAILS"

                        // )

                    }

                >

                    <Text

                        style={[

                            TYPOGRAPHY.button,

                            {

                                color:

                                    COLORS.white,

                            },

                        ]}

                    >

                        Loan Details

                    </Text>

                </TouchableOpacity>



                <TouchableOpacity

                    activeOpacity={0.85}

                    style={[

                        CARD.actionButton,

                        {

                            borderWidth: 1,

                            borderColor:

                                "#F6C8B2",

                            backgroundColor:

                                COLORS.card,

                        },

                    ]}

                    onPress={() =>

                        onPress?.(

                            loan,

                            "EMI_DETAILS"

                        )

                    }

                >

                    <Text

                        style={[

                            TYPOGRAPHY.button,

                            {

                                color:

                                    COLORS.closedOrange,

                            },

                        ]}

                    >

                        EMI Details

                    </Text>

                </TouchableOpacity>

            </View>

        </TouchableOpacity>

    );

});



// ============================================================

// MAIN COMPONENT

// ============================================================



const LoanHistoryCard = ({

    loan,

    onPress,

}) => {

    console.log(loan, "loan")

    const {

        width,

    } = useWindowDimensions();


    // const navigation = useNavigation()
    const isSmallPhone =

        width < 360;



    const status =

        useMemo(

            () =>

                normalizeStatus(

                    loan?.status ??

                    loan?.loanStatus ??

                    loan?.applicationStatus ??

                    loan?.kycStatus

                ),

            [

                loan?.status,

                loan?.loanStatus,

                loan?.applicationStatus,

                loan?.kycStatus,

            ]

        );



    const loanName =

        useMemo(

            () =>

                getLoanName(

                    loan

                ),

            [

                loan,

            ]

        );



    const statusConfig =

        useMemo(

            () =>

                getStatusConfig(

                    status

                ),

            [

                status,

            ]

        );



    // ========================================================

    // ACTIVE

    // ========================================================



    if (

        status ===

        "ACTIVE"

    ) {

        return (

            <ActiveLoanCard

                loan={

                    loan

                }

                loanName={

                    loanName

                }

                statusConfig={

                    statusConfig

                }

                onPress={

                    onPress

                }

                isSmallPhone={

                    isSmallPhone

                }

            />

        );

    }



    // ========================================================

    // CLOSED

    // ========================================================



    if (

        status ===

        "CLOSED"

    ) {

        return (

            <ClosedLoanCard

                loan={

                    loan

                }

                loanName={

                    loanName

                }

                statusConfig={

                    statusConfig

                }

                onPress={

                    onPress

                }

                isSmallPhone={

                    isSmallPhone

                }

            />

        );

    }



    // ========================================================

    // NORMAL APPLICATION

    // ========================================================



    return (

        <ApplicationLoanCard

            loan={

                loan

            }

            loanName={

                loanName

            }

            status={

                status

            }

            statusConfig={

                statusConfig

            }

            onPress={

                onPress

            }

            isSmallPhone={

                isSmallPhone

            }

        />

    );

};



// ============================================================

// EXPORT

// ============================================================



export default memo(

    LoanHistoryCard

);