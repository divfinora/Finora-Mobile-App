// src/components/common/Modal/CustomBottomSheet.jsx

import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
  useCallback,
} from 'react';

import {
  View,
  Text,
  Modal,
  Animated,
  PanResponder,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  Platform,
  Easing,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import { X } from 'lucide-react-native';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '../../../theme';


// ==================================================
// CONSTANTS
// ==================================================

const SCREEN_HEIGHT =
  Dimensions.get('window').height;

const STATUS_BAR_HEIGHT =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : 0;

const SAFE_TOP_OFFSET =
  Platform.OS === 'android'
    ? STATUS_BAR_HEIGHT * 2
    : 0;


// ==================================================
// DRAG CONSTANTS
// ==================================================

const CLOSE_THRESHOLD = 120;

const VELOCITY_THRESHOLD = 1.2;

const RUBBER_BAND_FACTOR = 0.25;


// ==================================================
// CUSTOM BOTTOM SHEET
// ==================================================

const NewCustomBottomSheet = forwardRef(
  (
    {
      // ==================================================
      // CONTENT
      // ==================================================

      children,

      data = null,

      renderItem = null,


      // ==================================================
      // VISIBILITY
      // ==================================================

      visible = false,

      onClose,


      // ==================================================
      // HEADER
      // ==================================================

      sheetheading = '',

      showHeader = true,


      // ==================================================
      // SHEET
      // ==================================================

      heightPercent = 0.75,

      sheetBg = '#FFFFFF',


      // ==================================================
      // OPTIONS
      // ==================================================

      enableDrag = true,

      showDragHandle = true,

      closeOnBackdrop = true,

      closeOnDragDown = true,


      // ==================================================
      // DESIGN PROPS
      // ==================================================

      /**
       * Main bottom sheet style
       *
       * Example:
       * sheetStyle={{
       *   borderTopLeftRadius: 32,
       *   borderTopRightRadius: 32,
       *   overflow: 'visible',
       * }}
       */
      sheetStyle,


      /**
       * Header wrapper style
       */
      headerStyle,


      /**
       * Heading container style
       */
      headingContainerStyle,


      /**
       * Heading text style
       */
      headingStyle,


      /**
       * Close button style
       */
      closeButtonStyle,


      /**
       * Close icon
       */
      closeIconColor = '#374151',

      closeIconSize = 20,


      /**
       * Content ScrollView / FlatList style
       */
      contentStyle,


      /**
       * Drag handle wrapper style
       */
      dragHandleContainerStyle,


      /**
       * Drag handle itself
       */
      dragHandleStyle,
    },

    ref,
  ) => {

    // ==================================================
    // SAFE AREA
    // ==================================================

    const insets =
      useSafeAreaInsets();


    // ==================================================
    // STATE
    // ==================================================

    const [
      keyboardVisible,
      setKeyboardVisible,
    ] = useState(false);

    const [
      keyboardHeight,
      setKeyboardHeight,
    ] = useState(0);


    // ==================================================
    // HEIGHT CALCULATIONS
    // ==================================================

    const SAFE_HEIGHT =
      SCREEN_HEIGHT -
      SAFE_TOP_OFFSET -
      insets.bottom;

    const KEYBOARD_SAFE_HEIGHT =
      keyboardVisible
        ? Math.max(
            0,
            SAFE_HEIGHT - keyboardHeight
          )
        : SAFE_HEIGHT;

    const SHEET_HEIGHT =
      Math.min(
        KEYBOARD_SAFE_HEIGHT * heightPercent,
        KEYBOARD_SAFE_HEIGHT
      );


    // ==================================================
    // ANIMATION VALUES
    // ==================================================

    const translateY =
      useRef(
        new Animated.Value(
          SHEET_HEIGHT,
        ),
      ).current;

    const backdropOpacity =
      useRef(
        new Animated.Value(0),
      ).current;

    const isDragging =
      useRef(false);

    const isAnimating =
      useRef(false);


    // ==================================================
    // KEYBOARD LISTENERS
    // ==================================================

    useEffect(() => {

      const showSub =
        Keyboard.addListener(
          Platform.OS === 'ios'
            ? 'keyboardWillShow'
            : 'keyboardDidShow',

          (e) => {

            setKeyboardVisible(true);

            setKeyboardHeight(
              e.endCoordinates.height,
            );
          },
        );


      const hideSub =
        Keyboard.addListener(
          Platform.OS === 'ios'
            ? 'keyboardWillHide'
            : 'keyboardDidHide',

          () => {

            setKeyboardVisible(false);

            setKeyboardHeight(0);
          },
        );


      return () => {

        showSub.remove();

        hideSub.remove();
      };

    }, []);


    // ==================================================
    // OPEN SHEET
    // ==================================================

    useEffect(() => {

      if (!visible) return;


      // Reset animation

      translateY.setValue(
        SHEET_HEIGHT,
      );

      backdropOpacity.setValue(0);


      isAnimating.current = true;


      Animated.parallel([

        // Sheet animation
        Animated.spring(
          translateY,
          {
            toValue: 0,

            tension: 65,

            friction: 11,

            useNativeDriver: true,
          },
        ),


        // Backdrop animation
        Animated.timing(
          backdropOpacity,
          {
            toValue: 1,

            duration: 250,

            easing:
              Easing.out(
                Easing.ease,
              ),

            useNativeDriver: true,
          },
        ),

      ]).start(() => {

        isAnimating.current =
          false;
      });


    }, [
      visible,
      SHEET_HEIGHT,
      translateY,
      backdropOpacity,
    ]);


    // ==================================================
    // CLOSE SHEET
    // ==================================================

    const closeSheet =
      useCallback(() => {

        if (
          isAnimating.current
        ) {
          return;
        }


        // Keyboard open hai
        // toh pehle keyboard dismiss karo

        if (keyboardVisible) {

          Keyboard.dismiss();

          return;
        }


        isAnimating.current =
          true;


        Animated.parallel([

          // Sheet close
          Animated.timing(
            translateY,
            {
              toValue:
                SHEET_HEIGHT,

              duration: 250,

              easing:
                Easing.in(
                  Easing.ease,
                ),

              useNativeDriver: true,
            },
          ),


          // Backdrop close
          Animated.timing(
            backdropOpacity,
            {
              toValue: 0,

              duration: 200,

              easing:
                Easing.in(
                  Easing.ease,
                ),

              useNativeDriver: true,
            },
          ),

        ]).start(() => {

          isAnimating.current =
            false;

          onClose?.();
        });

      }, [

        keyboardVisible,

        SHEET_HEIGHT,

        translateY,

        backdropOpacity,

        onClose,

      ]);


    // ==================================================
    // IMPERATIVE HANDLE
    // ==================================================

    useImperativeHandle(
      ref,

      () => ({
        close: closeSheet,
      }),

      [closeSheet],
    );


    // ==================================================
    // PAN RESPONDER
    // ==================================================

    const panResponder =
      useRef(

        PanResponder.create({

          // ------------------------------------------------
          // START
          // ------------------------------------------------

          onStartShouldSetPanResponder:
            () => enableDrag,


          // ------------------------------------------------
          // MOVE
          // ------------------------------------------------

          onMoveShouldSetPanResponder:
            (_, gesture) => {

              if (!enableDrag) {
                return false;
              }


              // Only vertical drag

              return (

                Math.abs(
                  gesture.dy,
                ) >

                Math.abs(
                  gesture.dx,
                )

                &&

                Math.abs(
                  gesture.dy,
                ) > 5

              );
            },


          // ------------------------------------------------
          // GRANT
          // ------------------------------------------------

          onPanResponderGrant:
            () => {

              isDragging.current =
                true;
            },


          // ------------------------------------------------
          // MOVE
          // ------------------------------------------------

          onPanResponderMove:
            (_, gesture) => {

              if (
                gesture.dy > 0
              ) {

                // Down drag

                translateY.setValue(
                  gesture.dy,
                );

              } else {

                // Up drag
                // Rubber band effect

                translateY.setValue(
                  gesture.dy *
                    RUBBER_BAND_FACTOR,
                );
              }
            },


          // ------------------------------------------------
          // RELEASE
          // ------------------------------------------------

          onPanResponderRelease:
            (_, gesture) => {

              isDragging.current =
                false;


              const shouldClose =

                closeOnDragDown &&

                (

                  gesture.dy >
                    CLOSE_THRESHOLD

                  ||

                  gesture.vy >
                    VELOCITY_THRESHOLD

                );


              if (shouldClose) {

                closeSheet();

                return;
              }


              // Snap back

              Animated.spring(
                translateY,
                {
                  toValue: 0,

                  tension: 65,

                  friction: 11,

                  useNativeDriver: true,
                },
              ).start();
            },


          // ------------------------------------------------
          // TERMINATE
          // ------------------------------------------------

          onPanResponderTerminate:
            () => {

              isDragging.current =
                false;


              Animated.spring(
                translateY,
                {
                  toValue: 0,

                  tension: 65,

                  friction: 11,

                  useNativeDriver: true,
                },
              ).start();
            },

        }),

      ).current;


    // ==================================================
    // BACKDROP
    // ==================================================

    const backdropStyle = {

      opacity:
        backdropOpacity.interpolate({

          inputRange: [
            0,
            1,
          ],

          outputRange: [
            0,
            0.5,
          ],

        }),

    };


    // ==================================================
    // RENDER
    // ==================================================

    return (

      <Modal
        transparent
        visible={visible}
        animationType="none"
        onRequestClose={closeSheet}
        statusBarTranslucent
      >

        <View
          style={{
            flex: 1,
          }}
        >


          {/* ==================================================
              BACKDROP
          ================================================== */}

          <TouchableWithoutFeedback
            onPress={
              closeOnBackdrop
                ? closeSheet
                : undefined
            }
          >

            <Animated.View
              style={[
                {
                  position: 'absolute',

                  top: 0,

                  left: 0,

                  right: 0,

                  bottom: 0,

                  backgroundColor:
                    '#000000',
                },

                backdropStyle,
              ]}
            />

          </TouchableWithoutFeedback>


          {/* ==================================================
              BOTTOM SHEET
          ================================================== */}

          <Animated.View
            {...(
              enableDrag
                ? panResponder.panHandlers
                : {}
            )}

            style={[
              {
                height:
                  SHEET_HEIGHT,

                transform: [
                  {
                    translateY,
                  },
                ],

                backgroundColor:
                  sheetBg,

                borderTopLeftRadius:
                  24,

                borderTopRightRadius:
                  24,

                position:
                  'absolute',

                bottom: 0,

                left: 0,

                right: 0,

                overflow:
                  'hidden',


                // Shadow

                shadowColor:
                  '#000000',

                shadowOffset: {
                  width: 0,
                  height: -4,
                },

                shadowOpacity:
                  0.1,

                shadowRadius:
                  12,

                elevation:
                  16,
              },

              // Custom style
              sheetStyle,
            ]}
          >


            {/* ==================================================
                HEADER
            ================================================== */}

            {showHeader && (

              <View
                style={[
                  {
                    paddingTop: 4,

                    paddingBottom:
                      sheetheading
                        ? 12
                        : 6,
                  },

                  headerStyle,
                ]}
              >


                {/* ==============================================
                    DRAG HANDLE
                ============================================== */}

                {showDragHandle && (

                  <View
                    style={[
                      {
                        alignItems:
                          'center',

                        paddingVertical:
                          10,
                      },

                      dragHandleContainerStyle,
                    ]}
                  >

                    <View
                      style={[
                        {
                          width: 44,

                          height: 4,

                          borderRadius: 2,

                          backgroundColor:
                            '#D1D5DB',
                        },

                        dragHandleStyle,
                      ]}
                    />

                  </View>

                )}


                {/* ==============================================
                    HEADING
                ============================================== */}

                {sheetheading ? (

                  <View
                    style={[
                      {
                        paddingHorizontal:
                          30,

                        paddingRight:
                          60,
                      },

                      headingContainerStyle,
                    ]}
                  >

                    <Text
                      numberOfLines={1}
                      style={[
                        {
                          fontSize: 18,

                          lineHeight: 24,

                          fontFamily:
                            theme?.fonts?.bold ||
                            'Manrope-Bold',

                          color:
                            theme?.colors?.navy900 ||
                            '#172B3A',
                        },

                        headingStyle,
                      ]}
                    >
                      {sheetheading}
                    </Text>

                  </View>

                ) : null}

              </View>

            )}


            {/* ==================================================
                CLOSE BUTTON
            ================================================== */}

            {showHeader && (

              <TouchableOpacity
                activeOpacity={0.7}

                onPress={
                  closeSheet
                }

                hitSlop={{
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10,
                }}

                style={[
                  {
                    position:
                      'absolute',

                    top: 12,

                    right: 16,

                    width: 36,

                    height: 36,

                    borderRadius: 18,

                    backgroundColor:
                      '#F8FAFC',

                    justifyContent:
                      'center',

                    alignItems:
                      'center',

                    zIndex: 50,
                  },

                  closeButtonStyle,
                ]}
              >

                <X
                  size={
                    closeIconSize
                  }

                  color={
                    closeIconColor
                  }

                  strokeWidth={2}
                />

              </TouchableOpacity>

            )}


            {/* ==================================================
                CONTENT
            ================================================== */}

            {data &&
            renderItem ? (

              // ==================================================
              // FLAT LIST
              // ==================================================

              <FlatList

                style={{
                  flex: 1,
                }}

                data={data}

                renderItem={
                  renderItem
                }

                keyExtractor={(
                  item,
                  index,
                ) => (

                  item?.item_id
                    ?.toString()

                  ||

                  item?.id
                    ?.toString()

                  ||

                  item?._id
                    ?.toString()

                  ||

                  index.toString()

                )}

                nestedScrollEnabled

                showsVerticalScrollIndicator={
                  false
                }

                keyboardShouldPersistTaps={
                  'handled'
                }

                scrollEventThrottle={
                  16
                }

                contentContainerStyle={[
                  {
                    paddingBottom:
                      (
                        Platform.OS ===
                        'android'
                          ? 60
                          : 20
                      ) +
                      insets.bottom,

                    paddingHorizontal:
                      12,
                  },

                  contentStyle,
                ]}
              />

            ) : (

              // ==================================================
              // SCROLL VIEW
              // ==================================================

              <ScrollView

                style={{
                  flex: 1,
                }}

                keyboardShouldPersistTaps={
                  'handled'
                }

                showsVerticalScrollIndicator={
                  false
                }

                nestedScrollEnabled

                scrollEventThrottle={
                  16
                }

                contentContainerStyle={[
                  {
                    paddingBottom:
                      (
                        Platform.OS ===
                        'android'
                          ? 60
                          : 20
                      ) +
                      insets.bottom,

                    paddingHorizontal:
                      12,
                  },

                  contentStyle,
                ]}
              >

                {children}

              </ScrollView>

            )}

          </Animated.View>

        </View>

      </Modal>

    );
  },
);


// ==================================================
// EXPORT
// ==================================================

export default NewCustomBottomSheet;