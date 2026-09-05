import React, {
    useEffect,
    useState,
} from "react";

import {
    View,
    Keyboard,
    Platform,
} from "react-native";

import {
    useSafeAreaInsets,
} from "react-native-safe-area-context";


const KeyboardAvoidingBottomView = ({
    children,
    style,
    keyboardSpacing = 0,
}) => {

    const insets =
        useSafeAreaInsets();


    const [
        keyboardHeight,
        setKeyboardHeight,
    ] = useState(0);


    useEffect(() => {

        const showEvent =
            Platform.OS === "ios"
                ? "keyboardWillShow"
                : "keyboardDidShow";


        const hideEvent =
            Platform.OS === "ios"
                ? "keyboardWillHide"
                : "keyboardDidHide";


        const keyboardShowListener =
            Keyboard.addListener(
                showEvent,
                (event) => {

                    const height =
                        event?.endCoordinates?.height || 0;


                    setKeyboardHeight(
                        height
                    );

                }
            );


        const keyboardHideListener =
            Keyboard.addListener(
                hideEvent,
                () => {

                    setKeyboardHeight(
                        0
                    );

                }
            );


        return () => {

            keyboardShowListener.remove();

            keyboardHideListener.remove();

        };

    }, []);


    const isKeyboardVisible =
        keyboardHeight > 0;


    const bottomSpace =
        isKeyboardVisible
            ? keyboardHeight + keyboardSpacing
            : 10;


    return (

        <View
            style={[
                {
                    flex: 1,

                    paddingBottom:
                        bottomSpace,
                },

                style,
            ]}
        >

            {children}

        </View>

    );

};


export default KeyboardAvoidingBottomView;