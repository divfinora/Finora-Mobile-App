import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import {
  theme,
} from "../../../theme";


const CommonInput = forwardRef(
  (
    {
      label,
      placeholder,
      value,
      onChangeText,

      error,

      required = false,

      editable = true,

      keyboardType = "default",

      autoCapitalize = "none",

      autoCorrect = false,

      secureTextEntry = false,

      multiline = false,

      numberOfLines = 1,

      maxLength,

      returnKeyType = "done",

      onSubmitEditing,

      onFocus,

      onBlur,

      // =================================================
      // ICONS
      // =================================================

      leftIcon,

      rightIcon,

      onRightIconPress,

      // =================================================
      // ICON SPACING / STYLES
      //
      // Default values existing design ke same hain.
      // =================================================

      leftIconSpacing = 12,

      rightIconSpacing = 0,

      leftIconContainerStyle,

      rightIconContainerStyle,

      // =================================================
      // INPUT PADDING
      //
      // Existing design = 16
      // =================================================

      inputHorizontalPadding = 16,

      // =================================================
      // EXISTING STYLES
      // =================================================

      containerStyle,

      labelStyle,

      inputContainerStyle,

      inputStyle,

      errorStyle,

      // =================================================
      // OPTIONAL FORM SCROLL PROPS
      //
      // Existing screens ko koi effect nahi hoga.
      // =================================================

      fieldName,

      registerFieldPosition,

      scrollContentRef,

      ...rest
    },
    ref
  ) => {

    const [
      focused,
      setFocused,
    ] = useState(false);


    // =================================================
    // TEXT INPUT REF
    // =================================================

    const inputRef =
      useRef(null);


    // =================================================
    // CONTAINER REF
    // =================================================

    const containerRef =
      useRef(null);


    // =================================================
    // EXPOSE REF METHODS
    // =================================================

    useImperativeHandle(
      ref,
      () => ({
        focus: () => {
          inputRef.current?.focus();
        },

        blur: () => {
          inputRef.current?.blur();
        },

        measureLayout: (
          ...args
        ) => {
          containerRef.current?.measureLayout(
            ...args
          );
        },
      }),
      []
    );


    // =================================================
    // REGISTER FIELD POSITION
    // =================================================

    const handleLayout = () => {
      if (
        !fieldName ||
        !registerFieldPosition ||
        !scrollContentRef?.current ||
        !containerRef.current
      ) {
        return;
      }

      requestAnimationFrame(() => {
        containerRef.current?.measureLayout(
          scrollContentRef.current,
          (_x, y) => {
            registerFieldPosition(
              fieldName,
              y
            );
          },
          () => {}
        );
      });
    };


    // =================================================
    // FOCUS
    // =================================================

    const handleFocus = (
      event
    ) => {

      setFocused(true);

      onFocus?.(
        event
      );
    };


    // =================================================
    // BLUR
    // =================================================

    const handleBlur = (
      event
    ) => {

      setFocused(false);

      onBlur?.(
        event
      );
    };


    // =================================================
    // BORDER COLOR
    // =================================================

    const borderColor =
      error
        ? theme.colors.error
        : focused
          ? theme.colors.primary500
          : "transparent";


    return (
      <View
        ref={containerRef}

        collapsable={false}

        onLayout={
          handleLayout
        }

        style={[
          {
            marginBottom:
              theme.spacing.xl,
          },

          containerStyle,
        ]}
      >

        {/* =========================================
            LABEL
        ========================================= */}

        {!!label && (
          <Text
            style={[
              {
                marginBottom:
                  theme.spacing.sm,

                color:
                  theme.colors.gray700,

                fontSize:
                  theme.typography.b2,

                fontFamily:
                  theme.fonts.semiBold,
              },

              labelStyle,
            ]}
          >

            {label}

            {required && (
              <Text
                style={{
                  color:
                    theme.colors.error,
                }}
              >
                {" "}*
              </Text>
            )}

          </Text>
        )}


        {/* =========================================
            INPUT CONTAINER
        ========================================= */}

        <View
          style={[
            {
              minHeight: 56,

              flexDirection:
                "row",

              alignItems:
                "center",

              backgroundColor:
                "#F5F5F7",

              borderRadius:
                16,

              borderWidth:
                1,

              borderColor,

              paddingHorizontal:
                inputHorizontalPadding,
            },

            inputContainerStyle,
          ]}
        >

          {/* =======================================
              LEFT ICON
          ======================================= */}

          {!!leftIcon && (
            <View
              style={[
                {
                  marginRight:
                    leftIconSpacing,
                },

                leftIconContainerStyle,
              ]}
            >
              {leftIcon}
            </View>
          )}


          {/* =======================================
              TEXT INPUT
          ======================================= */}

          <TextInput
            ref={inputRef}

            value={
              value
            }

            placeholder={
              placeholder
            }

            placeholderTextColor={
              "#8E8E93"
            }

            onChangeText={
              onChangeText
            }

            keyboardType={
              keyboardType
            }

            autoCapitalize={
              autoCapitalize
            }

            autoCorrect={
              autoCorrect
            }

            secureTextEntry={
              secureTextEntry
            }

            editable={
              editable
            }

            multiline={
              multiline
            }

            numberOfLines={
              numberOfLines
            }

            maxLength={
              maxLength
            }

            returnKeyType={
              returnKeyType
            }

            onSubmitEditing={
              onSubmitEditing
            }

            onFocus={
              handleFocus
            }

            onBlur={
              handleBlur
            }

            style={[
              {
                flex: 1,

                minHeight:
                  56,

                color:
                  theme.colors.black,

                fontSize:
                  16,

                fontFamily:
                  theme.fonts.medium,

                paddingVertical:
                  0,
              },

              inputStyle,
            ]}

            {...rest}
          />


          {/* =======================================
              RIGHT ICON
          ======================================= */}

          {!!rightIcon && (
            <TouchableOpacity
              activeOpacity={
                0.8
              }

              onPress={
                onRightIconPress
              }

              style={[
                {
                  marginLeft:
                    rightIconSpacing,
                },

                rightIconContainerStyle,
              ]}
            >
              {rightIcon}
            </TouchableOpacity>
          )}

        </View>


        {/* =========================================
            ERROR
        ========================================= */}

        {!!error && (
          <Text
            style={[
              {
                marginTop:
                  theme.spacing.sm,

                color:
                  theme.colors.error,

                fontSize:
                  12,

                fontFamily:
                  theme.fonts.medium,
              },

              errorStyle,
            ]}
          >
            {error}
          </Text>
        )}

      </View>
    );
  }
);


export default CommonInput;