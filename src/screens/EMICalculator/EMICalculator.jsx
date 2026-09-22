import React, {
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import {
    View,
    Text,
    StatusBar,
    PanResponder,
    ScrollView,
    Animated,
} from "react-native";

import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
    theme,
} from "../../theme";

import LinearGradientCommonHeader from "../../components/common/BackButton/LinearGradientCommonHeader";
import LinearGradient from "react-native-linear-gradient";


// =====================================================
// CUSTOM SLIDER
// =====================================================

const CustomSlider = ({
    value,
    minimumValue,
    maximumValue,
    step,
    onValueChange,
}) => {

    const [width, setWidth] =
        useState(0);


    // Animated thumb position
    const animatedPosition =
        useRef(
            new Animated.Value(0)
        ).current;


    // Latest values
    const latestRef =
        useRef({
            value,
            minimumValue,
            maximumValue,
            step,
            width: 0,
            onValueChange,
        });


    latestRef.current = {
        value,
        minimumValue,
        maximumValue,
        step,
        width,
        onValueChange,
    };


    // Drag starting position
    const startPosition =
        useRef(0);

    const startTouch =
        useRef(0);

    const dragging =
        useRef(false);


    // =================================================
    // VALUE -> POSITION
    // =================================================

    const getPosition =
        (currentValue) => {

            const {
                minimumValue: min,
                maximumValue: max,
                width: sliderWidth,
            } = latestRef.current;


            if (
                sliderWidth <= 0 ||
                max === min
            ) {
                return 0;
            }


            const percentage =
                (
                    currentValue - min
                ) /
                (
                    max - min
                );


            return Math.max(
                0,
                Math.min(
                    sliderWidth,
                    percentage *
                    sliderWidth
                )
            );
        };


    // =================================================
    // POSITION -> VALUE
    // =================================================

    const getValue =
        (currentPosition) => {

            const {
                minimumValue: min,
                maximumValue: max,
                step: stepValue,
                width: sliderWidth,
            } = latestRef.current;


            if (
                sliderWidth <= 0 ||
                max === min
            ) {
                return min;
            }


            const position =
                Math.max(
                    0,
                    Math.min(
                        sliderWidth,
                        currentPosition
                    )
                );


            const percentage =
                position /
                sliderWidth;


            const rawValue =
                min +
                percentage *
                (
                    max - min
                );


            const stepped =
                Math.round(
                    (
                        rawValue -
                        min
                    ) /
                    stepValue
                ) *
                stepValue +
                min;


            return Math.max(
                min,
                Math.min(
                    max,
                    stepped
                )
            );
        };


    // =================================================
    // SYNC THUMB
    // =================================================

    useEffect(() => {

        if (
            width <= 0 ||
            dragging.current
        ) {
            return;
        }


        animatedPosition.setValue(
            getPosition(value)
        );

    }, [
        value,
        width,
    ]);


    // =================================================
    // LAYOUT
    // =================================================

    const handleLayout =
        (event) => {

            const sliderWidth =
                event.nativeEvent
                    .layout.width;


            setWidth(
                sliderWidth
            );


            latestRef.current.width =
                sliderWidth;


            animatedPosition.setValue(
                getPosition(value)
            );
        };


    // =================================================
    // PAN RESPONDER
    // =================================================

    const panResponder =
        useRef(
            PanResponder.create({

                onStartShouldSetPanResponder:
                    () => true,

                onMoveShouldSetPanResponder:
                    () => true,

                onStartShouldSetPanResponderCapture:
                    () => true,

                onMoveShouldSetPanResponderCapture:
                    () => true,

                onPanResponderTerminationRequest:
                    () => false,


                // -------------------------------------
                // START
                // -------------------------------------

                onPanResponderGrant: (
                    _event,
                    gestureState
                ) => {

                    dragging.current =
                        true;


                    startTouch.current =
                        gestureState.x0;


                    startPosition.current =
                        getPosition(
                            latestRef.current
                                .value
                        );
                },


                // -------------------------------------
                // MOVE
                // -------------------------------------

                onPanResponderMove: (
                    _event,
                    gestureState
                ) => {

                    const sliderWidth =
                        latestRef.current
                            .width;


                    if (
                        sliderWidth <= 0
                    ) {
                        return;
                    }


                    const movement =
                        gestureState.moveX -
                        startTouch.current;


                    const newPosition =
                        Math.max(
                            0,
                            Math.min(
                                sliderWidth,
                                startPosition.current +
                                movement
                            )
                        );


                    // Move thumb immediately
                    animatedPosition.setValue(
                        newPosition
                    );


                    // Calculate value
                    const newValue =
                        getValue(
                            newPosition
                        );


                    // Update screen
                    latestRef.current
                        .onValueChange(
                            newValue
                        );
                },


                // -------------------------------------
                // RELEASE
                // -------------------------------------

                onPanResponderRelease: (
                    _event,
                    gestureState
                ) => {

                    const sliderWidth =
                        latestRef.current
                            .width;


                    if (
                        sliderWidth <= 0
                    ) {
                        dragging.current =
                            false;

                        return;
                    }


                    const movement =
                        gestureState.moveX -
                        startTouch.current;


                    const finalPosition =
                        Math.max(
                            0,
                            Math.min(
                                sliderWidth,
                                startPosition.current +
                                movement
                            )
                        );


                    const finalValue =
                        getValue(
                            finalPosition
                        );


                    const snappedPosition =
                        getPosition(
                            finalValue
                        );


                    // Smooth snap
                    Animated.timing(
                        animatedPosition,
                        {
                            toValue:
                                snappedPosition,

                            duration: 80,

                            useNativeDriver:
                                false,
                        }
                    ).start();


                    latestRef.current
                        .onValueChange(
                            finalValue
                        );


                    dragging.current =
                        false;
                },


                onPanResponderTerminate:
                    () => {
                        dragging.current =
                            false;
                    },

                onShouldBlockNativeResponder:
                    () => true,
            })
        ).current;


    // =================================================
    // UI
    // =================================================

    return (
        <View
       
            onLayout={
                handleLayout
            }

            {...panResponder.panHandlers}

            style={{
                width: "100%",
                height: 38,

                justifyContent:
                    "center",

                 
            }}
        >

            {/* GREY TRACK */}

            <View
                pointerEvents="none"

                style={{
                    position:
                        "absolute",

                    left: 0,
                    right: 0,

                    height: 18,

                    borderRadius:
                        999,

                    backgroundColor:
                        "#E9E9EB",

                    overflow:
                        "hidden",
                }}
            >

                {/* ORANGE TRACK */}

                <Animated.View
                    pointerEvents="none"

                    style={{
                        position:
                            "absolute",

                        left: 0,
                        top: 0,
                        bottom: 0,
                         

                        width:
                            animatedPosition,

                        backgroundColor:
                            theme.colors
                                .primary500,

                        borderRadius:
                            999,
                    }}
                />

            </View>


            {/* THUMB */}

<Animated.View
    pointerEvents="none"
    style={{
        position: "absolute",

        left: animatedPosition,

        marginLeft: -9,

        width: 18,
        height: 18,

        borderRadius: 999,

        backgroundColor:
            "#FFD2AD",

        borderWidth: 2,

        borderColor:
            "#FFD2AD",

        elevation: 2,

        shadowColor: "#000",

        shadowOpacity: 0.08,

        shadowRadius: 2,

        shadowOffset: {
            width: 0,
            height: 1,
        },

        alignItems: "center",

        justifyContent: "center",

        overflow: "hidden",
    }}
>
    <LinearGradient
        pointerEvents="none"

        colors={[
            "#FFFFFF",
            "#F37500",
        ]}

        start={{
            x: 0.5,
            y: 0,
        }}

        end={{
            x: 0.5,
            y: 1,
        }}

        style={{
            width: 14,
            height: 14,

            borderRadius: 999,
        }}
    />
</Animated.View>

        </View>
    );
};


// =====================================================
// EMI CALCULATOR
// =====================================================

const EMICalculator = ({
    onBack,
}) => {
    const insets = useSafeAreaInsets();
    // =================================================
    // DEFAULT VALUES
    // =================================================

    const [
        loanAmount,
        setLoanAmount,
    ] = useState(0);


    const [
        tenure,
        setTenure,
    ] = useState(1);


    const [
        interestRate,
        setInterestRate,
    ] = useState(0);


    // =================================================
    // EMI
    // =================================================

    const emiData =
        useMemo(() => {

            const principal =
                Number(
                    loanAmount
                ) || 0;


            const months =
                Number(
                    tenure
                ) || 1;


            const rate =
                Number(
                    interestRate
                ) || 0;


            // No loan
            if (
                principal <= 0
            ) {
                return {
                    emi: 0,
                    interest: 0,
                    total: 0,
                };
            }


            const monthlyRate =
                rate /
                12 /
                100;


            let emi;


            // 0% interest
            if (
                monthlyRate === 0
            ) {

                emi =
                    principal /
                    months;

            } else {

                emi =
                    (
                        principal *
                        monthlyRate *
                        Math.pow(
                            1 +
                            monthlyRate,
                            months
                        )
                    ) /
                    (
                        Math.pow(
                            1 +
                            monthlyRate,
                            months
                        ) - 1
                    );
            }


            const total =
                emi * months;


            const interest =
                total -
                principal;


            return {
                emi:
                    Math.round(
                        emi
                    ),

                interest:
                    Math.max(
                        0,
                        Math.round(
                            interest
                        )
                    ),

                total:
                    Math.round(
                        total
                    ),
            };

        }, [
            loanAmount,
            tenure,
            interestRate,
        ]);


    // =================================================
    // CURRENCY
    // =================================================

    const formatCurrency =
        (amount) => {

            return `₹${Number(
                amount || 0
            ).toLocaleString(
                "en-IN"
            )}`;
        };


    // =================================================
    // SCREEN
    // =================================================

    return (
        <SafeAreaView
            edges={['left', 'bottom', 'right']}
            style={{
                flex: 1,

                backgroundColor:
                    "#FFF9F1",
            }}
        >
            <StatusBar
                translucent={true}
                backgroundColor="transparent"
                barStyle="dark-content"
            />



            <View
                style={{
                    flex: 1,

                    backgroundColor:
                        "#FFF9F1",
                }}
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <LinearGradientCommonHeader
                    title="EMI Calculator"
                    onBackPress={onBack}

                    containerStyle={{
                       
                        height: 'auto' ,

                        paddingHorizontal: 20,

                        paddingTop:  insets.top,
                    }}

                    backButtonStyle={{
                        width: 40,
                        height: 40,
                    }}

                    titleStyle={{
                        fontSize: 21,

                        lineHeight: 27,

                        fontFamily:
                            theme.fonts.headingSemiBold,

                        color:
                            theme.colors.black,

                        includeFontPadding: false,
                    }}

                    leftContainerStyle={{
                        flex: 1,
                    }}

                    centerContainerStyle={{
                        flex: 2,
                    }}

                    rightContainerStyle={{
                        flex: 1,
                    }}
                />


                {/* =================================================
                    CONTENT
                ================================================= */}

                <ScrollView
                    showsVerticalScrollIndicator={
                        false
                    }

                    keyboardShouldPersistTaps="handled"

                    contentContainerStyle={{
                        paddingBottom: 30,
                    }}
                >

                    {/* =================================================
                        RESULT CARD
                    ================================================= */}

                    <View
                        style={{
                            marginHorizontal: 24,

                            marginTop: 18,

                            paddingHorizontal: 16,

                            paddingVertical: 18,

                            borderRadius: 16,

                            backgroundColor:
                                "#FFFFFF",

                            borderWidth: .9,

                            borderColor:
                                "#F7B16B",
                        }}
                    >

                        <Text
                            style={{
                                textAlign:
                                    "center",

                                fontSize: 14,

                              

                                fontFamily:
                                    theme.fonts
                                        .medium,

                                color:
                                    theme.colors
                                        .primary700,

                                marginBottom: 4,

                                includeFontPadding:
                                    false,
                            }}
                        >
                            Monthly EMI
                        </Text>


                        <Text
                            style={{
                                textAlign:
                                    "center",

                               fontSize: 54,

                               

                                fontFamily:
                                    theme.fonts
                                        .bold,

                                color:
                                    theme.colors
                                        .primary900,

                                includeFontPadding:
                                    false,
                            }}
                        >
                            {formatCurrency(
                                emiData.emi
                            )}
                        </Text>


                        {/* DETAILS */}

                        <View
                            style={{
                                flexDirection:
                                    "row",

                                alignItems:
                                    "center",

                                marginTop: 15,
                            }}
                        >

                            {/* PRINCIPAL */}

                            <View
                                style={{
                                    flex: 1,

                                    alignItems:
                                        "center",
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: 12,

                                   
                                        fontFamily:
                                            theme.fonts
                                                .medium,

                                        color:
                                            theme.colors
                                                .gray500,

                                        marginBottom: 4,
                                    }}
                                >
                                    Principal
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 14,

                                  

                                        fontFamily:
                                            theme.fonts
                                                .semiBold,

                                        color:
                                            theme.colors
                                                .gray700,
                                    }}
                                >
                                    {formatCurrency(
                                        loanAmount
                                    )}
                                </Text>

                            </View>


                            <View
                                style={{
                                    width: 3,
                                    height: 34,

                                    borderRadius:
                                        999,

                                    backgroundColor:
                                        "#A7A7AA",
                                }}
                            />


                            {/* INTEREST */}

                            <View
                                style={{
                                    flex: 1,

                                    alignItems:
                                        "center",
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: 12,

                                     

                                        fontFamily:
                                            theme.fonts
                                                .medium,

                                        color:
                                            theme.colors
                                                .gray500,

                                        marginBottom: 4,
                                    }}
                                >
                                    Interest
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 14,

                                     

                                        fontFamily:
                                            theme.fonts
                                                .semiBold,

                                        color:
                                            theme.colors
                                                .gray700,
                                    }}
                                >
                                    {formatCurrency(
                                        emiData.interest
                                    )}
                                </Text>

                            </View>


                            <View
                                style={{
                                    width: 3,
                                    height: 34,

                                    borderRadius:
                                        999,

                                    backgroundColor:
                                        "#A7A7AA",
                                }}
                            />


                            {/* TOTAL */}

                            <View
                                style={{
                                    flex: 1,

                                    alignItems:
                                        "center",
                                }}
                            >

                                <Text
                                    style={{
                                        fontSize: 12,

                                        lineHeight: 16,

                                        fontFamily:
                                            theme.fonts
                                                .medium,

                                        color:
                                            theme.colors
                                                .gray500,

                                        marginBottom: 4,
                                    }}
                                >
                                    Total
                                </Text>

                                <Text
                                    style={{
                                        fontSize: 14,

                                      

                                        fontFamily:
                                            theme.fonts
                                                .semiBold,

                                        color:
                                            theme.colors
                                                .gray700,
                                    }}
                                >
                                    {formatCurrency(
                                        emiData.total
                                    )}
                                </Text>

                            </View>

                        </View>

                    </View>


                    {/* =================================================
                        CALCULATOR
                    ================================================= */}

                    <View
                        style={{
                            marginHorizontal: 24,

                            marginTop: 16,

                            paddingHorizontal: 17,

                            paddingTop: 18,

                            paddingBottom: 18,

                            borderRadius: 16,

                            backgroundColor:
                                "#FFFFFF",

                            ...theme.shadows.card,
                        }}
                    >

                        {/* =================================================
                            LOAN AMOUNT
                        ================================================= */}

                        <View
                            style={{
                                flexDirection:
                                    "row",

                                justifyContent:
                                    "space-between",

                                alignItems:
                                    "center",
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 16,

                                 

                                    fontFamily:
                                        theme.fonts
                                            .semiBold,

                                    color:
                                       '#191C1E',
                                }}
                            >
                                Loan Amount
                            </Text>


                            <Text
                                style={{
                                    fontSize: 16,

                                    lineHeight: 21,

                                    fontFamily:
                                        theme.fonts
                                            .bold,

                                    color:
                                        theme.colors
                                            .black,
                                }}
                            >
                                {formatCurrency(
                                    loanAmount
                                )}
                            </Text>

                        </View>


                        <CustomSlider
                            value={
                                loanAmount
                            }

                            minimumValue={
                                0
                            }

                            maximumValue={
                                1000000
                            }

                            step={
                                1000
                            }

                            onValueChange={
                                setLoanAmount
                            }
                        />


                        <View
                            style={{
                                flexDirection:
                                    "row",

                                justifyContent:
                                    "space-between",
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 14,

                                    color:
                                        '#4A5565'
                                }}
                            >
                                ₹0
                            </Text>

                            <Text
                                style={{
                                    fontSize: 14,

                                    color:
                                        '#4A5565'
                                }}
                            >
                                ₹10L
                            </Text>

                        </View>


                        {/* GAP */}

                        <View
                            style={{
                                height: 26,
                            }}
                        />


                        {/* =================================================
                            TENURE
                        ================================================= */}

                        <View
                            style={{
                                flexDirection:
                                    "row",

                                justifyContent:
                                    "space-between",

                                alignItems:
                                    "center",
                            }}
                        >

                            <Text
                                style={{
                                       fontSize: 16,

                                 

                                    fontFamily:
                                        theme.fonts
                                            .semiBold,

                                    color:
                                       '#191C1E',
                                }}
                            >
                                Tenure (Months)
                            </Text>


                            <Text
                                style={{
                                    fontSize: 16,

                                    lineHeight: 21,

                                    fontFamily:
                                        theme.fonts
                                            .bold,

                                    color:
                                        theme.colors
                                            .black,
                                }}
                            >
                                {tenure} Month
                                {tenure !== 1
                                    ? "s"
                                    : ""}
                            </Text>

                        </View>


                        <CustomSlider
                            value={
                                tenure
                            }

                            minimumValue={
                                1
                            }

                            maximumValue={
                                60
                            }

                            step={
                                1
                            }

                            onValueChange={(
                                newValue
                            ) => {
                                setTenure(
                                    Math.round(
                                        newValue
                                    )
                                );
                            }}
                        />


                        <View
                            style={{
                                flexDirection:
                                    "row",

                                justifyContent:
                                    "space-between",
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 14,

                                color:
                                        '#4A5565'
                                }}
                            >
                                1 month
                            </Text>

                            <Text
                                style={{
                                    fontSize: 14,

                                 color:
                                        '#4A5565'
                                }}
                            >
                                60 months
                            </Text>

                        </View>


                        {/* GAP */}

                        <View
                            style={{
                                height: 26,
                            }}
                        />


                        {/* =================================================
                            INTEREST
                        ================================================= */}

                        <View
                            style={{
                                flexDirection:
                                    "row",

                                justifyContent:
                                    "space-between",

                                alignItems:
                                    "center",
                            }}
                        >

                            <Text
                                style={{
                                         fontSize: 16,

                                 

                                    fontFamily:
                                        theme.fonts
                                            .semiBold,

                                    color:
                                       '#191C1E',
                                }}
                            >
                                Interest Rate (p.a.)
                            </Text>


                            <Text
                                style={{
                                    fontSize: 16,

                                    lineHeight: 21,

                                    fontFamily:
                                        theme.fonts
                                            .bold,

                                    color:
                                        theme.colors
                                            .black,
                                }}
                            >
                                {interestRate.toFixed(
                                    1
                                )}
                                %
                            </Text>

                        </View>


                        <CustomSlider
                            value={
                                interestRate
                            }

                            minimumValue={
                                0
                            }

                            maximumValue={
                                20
                            }

                            step={
                                0.1
                            }

                            onValueChange={(
                                newValue
                            ) => {
                                setInterestRate(
                                    Number(
                                        newValue.toFixed(
                                            1
                                        )
                                    )
                                );
                            }}
                        />


                        <View
                            style={{
                                flexDirection:
                                    "row",

                                justifyContent:
                                    "space-between",
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 14,

                                    color:
                                        '#4A5565'
                                }}
                            >
                                0%
                            </Text>

                            <Text
                                style={{
                                    fontSize: 14,

                                    color:
                                        '#4A5565'
                                }}
                            >
                                20%
                            </Text>

                        </View>


                        {/* =================================================
                            INFO
                        ================================================= */}

                        <View
                            style={{
                                flexDirection:
                                    "row",

                                alignItems:
                                    "flex-start",

                                marginTop: 21,

                                paddingHorizontal: 13,

                                paddingVertical: 12,

                                borderRadius: 12,

                                backgroundColor:
                                    "#EFF6FF",

                                borderWidth: 1,

                                borderColor:
                                    "#B7D8FF",
                            }}
                        >

                            <Text
                                style={{
                                    fontSize: 14,

                                    marginRight: 6,
                                }}
                            >
                                💡
                            </Text>


                            <Text
                                style={{
                                    flex: 1,

                                    fontSize: 13,

                                    lineHeight: 19,

                                    fontFamily:
                                        theme.fonts
                                            .regular,

                                    color:
                                        "#17449A",
                                }}
                            >
                                This is an indicative
                                calculation. Actual
                                EMI may vary based
                                on processing fees
                                and other charges.
                            </Text>

                        </View>

                    </View>

                </ScrollView>

            </View>

        </SafeAreaView>
    );
};


export default EMICalculator;