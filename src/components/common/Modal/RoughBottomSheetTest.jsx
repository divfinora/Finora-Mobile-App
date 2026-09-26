import React, {
    useCallback,
    useMemo,
    useRef,
} from "react";

import {
    View,
    Text,
    Pressable,
    StyleSheet,
} from "react-native";

import {
    BottomSheetModal,
    BottomSheetModalProvider,
    BottomSheetScrollView,
} from "@gorhom/bottom-sheet";


// =====================================================
// FAKE DATA
// =====================================================

const FAKE_DATA = [
    {
        id: "1",
        title: "Personal Loan",
        amount: "₹50,000",
        status: "Available",
    },
    {
        id: "2",
        title: "Home Loan",
        amount: "₹2,00,000",
        status: "Available",
    },
    {
        id: "3",
        title: "Education Loan",
        amount: "₹1,50,000",
        status: "Available",
    },
    {
        id: "4",
        title: "Business Loan",
        amount: "₹3,00,000",
        status: "Available",
    },
    {
        id: "5",
        title: "Vehicle Loan",
        amount: "₹5,00,000",
        status: "Available",
    },
    {
        id: "6",
        title: "Gold Loan",
        amount: "₹1,00,000",
        status: "Available",
    },
    {
        id: "7",
        title: "Instant Loan",
        amount: "₹25,000",
        status: "Available",
    },
    {
        id: "8",
        title: "Salary Loan",
        amount: "₹75,000",
        status: "Available",
    },
    {
        id: "9",
        title: "Emergency Loan",
        amount: "₹40,000",
        status: "Available",
    },
    {
        id: "10",
        title: "Medical Loan",
        amount: "₹90,000",
        status: "Available",
    },
    {
        id: "11",
        title: "Travel Loan",
        amount: "₹60,000",
        status: "Available",
    },
    {
        id: "12",
        title: "Wedding Loan",
        amount: "₹1,20,000",
        status: "Available",
    },
    {
        id: "13",
        title: "Renovation Loan",
        amount: "₹2,50,000",
        status: "Available",
    },
    {
        id: "14",
        title: "Agriculture Loan",
        amount: "₹1,75,000",
        status: "Available",
    },
    {
        id: "15",
        title: "Commercial Loan",
        amount: "₹4,00,000",
        status: "Available",
    },
];


// =====================================================
// COMPONENT
// =====================================================

const RoughBottomSheetTest = () => {

    const bottomSheetRef =
        useRef(null);


    // =================================================
    // SNAP POINTS
    // =================================================

    const snapPoints =
        useMemo(
            () => ["1000%"],
            []
        );


    // =================================================
    // OPEN BOTTOM SHEET
    // =================================================

    const handleOpen = useCallback(() => {

        console.log(
            "OPEN BOTTOM SHEET"
        );

        bottomSheetRef.current?.present();

    }, []);


    // =================================================
    // CLOSE BOTTOM SHEET
    // =================================================

    const handleClose = useCallback(() => {

        console.log(
            "CLOSE BOTTOM SHEET"
        );

        bottomSheetRef.current?.dismiss();

    }, []);


    // =================================================
    // SHEET CHANGE
    // =================================================

    const handleSheetChange = useCallback(
        (index) => {

            console.log(
                "BOTTOM SHEET INDEX:",
                index
            );

        },
        []
    );


    // =================================================
    // CARD
    // =================================================

    const renderCard = (
        item
    ) => {

        return (

            <View
                key={item.id}
                style={styles.card}
            >

                <View
                    style={styles.cardLeft}
                >

                    <View
                        style={styles.icon}
                    >
                        <Text
                            style={
                                styles.iconText
                            }
                        >
                            ₹
                        </Text>
                    </View>


                    <View
                        style={{
                            flex: 1,
                        }}
                    >

                        <Text
                            style={
                                styles.cardTitle
                            }
                        >
                            {item.title}
                        </Text>


                        <Text
                            style={
                                styles.cardAmount
                            }
                        >
                            {item.amount}
                        </Text>

                    </View>

                </View>


                <View
                    style={styles.status}
                >

                    <Text
                        style={
                            styles.statusText
                        }
                    >
                        {item.status}
                    </Text>

                </View>

            </View>

        );

    };


    // =================================================
    // UI
    // =================================================

    return (

        <View
            style={styles.container}
        >

            {/* =========================================
                OPEN BUTTON
            ========================================= */}

            <Pressable
                onPress={
                    handleOpen
                }
                style={
                    styles.openButton
                }
            >

                <Text
                    style={
                        styles.openButtonText
                    }
                >
                    Open Bottom Sheet
                </Text>

            </Pressable>


            {/* =========================================
                BOTTOM SHEET
            ========================================= */}

            <BottomSheetModal

                ref={
                    bottomSheetRef
                }

                snapPoints={
                    snapPoints
                }

                index={0}

                enableDynamicSizing={
                    false
                }

                enablePanDownToClose={
                    true
                }

                onChange={
                    handleSheetChange
                }

                backgroundStyle={
                    styles.sheetBackground
                }

                handleIndicatorStyle={
                    styles.handleIndicator
                }

            >

                {/* =====================================
                    SHEET HEADER
                ===================================== */}

                <View
                    style={
                        styles.sheetHeader
                    }
                >

                    <View>

                        <Text
                            style={
                                styles.sheetTitle
                            }
                        >
                            Loan Options
                        </Text>


                        <Text
                            style={
                                styles.sheetSubtitle
                            }
                        >
                            Select from available options
                        </Text>

                    </View>


                    <Pressable
                        onPress={
                            handleClose
                        }
                        style={
                            styles.closeButton
                        }
                    >

                        <Text
                            style={
                                styles.closeText
                            }
                        >
                            ×
                        </Text>

                    </Pressable>

                </View>


                {/* =====================================
                    CARDS
                ===================================== */}

                <BottomSheetScrollView

                    showsVerticalScrollIndicator={
                        false
                    }

                    contentContainerStyle={
                        styles.scrollContent
                    }

                >

                    {FAKE_DATA.map(
                        renderCard
                    )}

                </BottomSheetScrollView>

            </BottomSheetModal>

        </View>

    );

};


// =====================================================
// STYLES
// =====================================================

const styles = StyleSheet.create({

    container: {
        flex: 1,

        backgroundColor:
            "#F5F5F5",

        alignItems:
            "center",

        justifyContent:
            "center",

        paddingHorizontal:
            20,
    },


    openButton: {
        width: "100%",

        height: 56,

        borderRadius: 14,

        backgroundColor:
            "#F37500",

        alignItems:
            "center",

        justifyContent:
            "center",
    },


    openButtonText: {
        color:
            "#FFFFFF",

        fontSize: 16,

        fontWeight:
            "700",
    },


    sheetBackground: {
        backgroundColor:
            "#FFFFFF",

        borderTopLeftRadius:
            24,

        borderTopRightRadius:
            24,
    },


    handleIndicator: {
        width: 45,

        height: 5,

        borderRadius: 10,

        backgroundColor:
            "#CCCCCC",
    },


    sheetHeader: {
        paddingHorizontal:
            20,

        paddingTop:
            8,

        paddingBottom:
            16,

        flexDirection:
            "row",

        alignItems:
            "center",

        justifyContent:
            "space-between",

        borderBottomWidth:
            1,

        borderBottomColor:
            "#EEEEEE",
    },


    sheetTitle: {
        fontSize:
            20,

        fontWeight:
            "700",

        color:
            "#111111",
    },


    sheetSubtitle: {
        marginTop:
            4,

        fontSize:
            13,

        color:
            "#777777",
    },


    closeButton: {
        width:
            38,

        height:
            38,

        borderRadius:
            19,

        backgroundColor:
            "#F3F3F3",

        alignItems:
            "center",

        justifyContent:
            "center",
    },


    closeText: {
        fontSize:
            26,

        lineHeight:
            28,

        color:
            "#222222",
    },


    scrollContent: {
        padding:
            16,

        paddingBottom:
            40,
    },


    card: {
        minHeight:
            82,

        backgroundColor:
            "#FFFFFF",

        borderRadius:
            16,

        marginBottom:
            12,

        padding:
            14,

        flexDirection:
            "row",

        alignItems:
            "center",

        justifyContent:
            "space-between",

        borderWidth:
            1,

        borderColor:
            "#EEEEEE",

        shadowColor:
            "#000000",

        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity:
            0.08,

        shadowRadius:
            5,

        elevation:
            2,
    },


    cardLeft: {
        flex: 1,

        flexDirection:
            "row",

        alignItems:
            "center",
    },


    icon: {
        width:
            46,

        height:
            46,

        borderRadius:
            23,

        backgroundColor:
            "#FFF1E5",

        alignItems:
            "center",

        justifyContent:
            "center",

        marginRight:
            12,
    },


    iconText: {
        fontSize:
            20,

        fontWeight:
            "700",

        color:
            "#F37500",
    },


    cardTitle: {
        fontSize:
            15,

        fontWeight:
            "700",

        color:
            "#222222",
    },


    cardAmount: {
        marginTop:
            4,

        fontSize:
            13,

        color:
            "#777777",
    },


    status: {
        paddingHorizontal:
            10,

        paddingVertical:
            6,

        borderRadius:
            20,

        backgroundColor:
            "#EAF8EF",
    },


    statusText: {
        fontSize:
            11,

        fontWeight:
            "600",

        color:
            "#159447",
    },

});


export default RoughBottomSheetTest;