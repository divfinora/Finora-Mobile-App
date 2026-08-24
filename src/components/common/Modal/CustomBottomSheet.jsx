// src/components/common/Modal/CustomBottomSheet.jsx

import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
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

import {
  X,
} from 'lucide-react-native';

import {
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import {
  theme,
} from '../../../theme';


// ==================================================
// SCREEN HEIGHT
// ==================================================

const SCREEN_HEIGHT =
  Dimensions.get('window').height;


// ==================================================
// STATUS BAR HEIGHT
// ==================================================

const STATUS_BAR_HEIGHT =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : 0;


// ==================================================
// SAFE TOP OFFSET
// ==================================================

const SAFE_TOP_OFFSET =
  Platform.OS === 'android'
    ? STATUS_BAR_HEIGHT * 2
    : 0;


// ==================================================
// CUSTOM BOTTOM SHEET
// ==================================================

const CustomBottomSheet = forwardRef(
  (
    {
      // ==========================================
      // CONTENT
      // ==========================================

      children,

      data = null,

      renderItem = null,


      // ==========================================
      // VISIBILITY
      // ==========================================

      visible = false,

      onClose,


      // ==========================================
      // HEADER
      // ==========================================

      sheetheading = '',

      showHeader = true,


      // ==========================================
      // SHEET
      // ==========================================

      heightPercent = 0.75,

      sheetBg = '#FFFFFF',
    },

    ref
  ) => {

    // ==================================================
    // SAFE AREA
    // ==================================================

    const insets =
      useSafeAreaInsets();


    // ==================================================
    // KEYBOARD STATE
    // ==================================================

    const [
      keyboardVisible,
      setKeyboardVisible,
    ] = useState(false);


    // ==================================================
    // SHEET HEIGHT
    // ==================================================

    const SAFE_HEIGHT =
      SCREEN_HEIGHT -
      SAFE_TOP_OFFSET;


    const SHEET_HEIGHT =
      SAFE_HEIGHT *
      heightPercent;


    // ==================================================
    // ANIMATION VALUES
    // ==================================================

    const translateY =
      useRef(
        new Animated.Value(
          SHEET_HEIGHT
        )
      ).current;


    const backdropOpacity =
      useRef(
        new Animated.Value(0)
      ).current;


    // ==================================================
    // KEYBOARD LISTENERS
    // ==================================================

    useEffect(() => {

      const showSub =
        Keyboard.addListener(
          'keyboardDidShow',
          () => {
            setKeyboardVisible(true);
          }
        );


      const hideSub =
        Keyboard.addListener(
          'keyboardDidHide',
          () => {
            setKeyboardVisible(false);
          }
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

      if (!visible) {
        return;
      }


      // Reset position before opening

      translateY.setValue(
        SHEET_HEIGHT
      );

      backdropOpacity.setValue(0);


      // Open animation

      Animated.parallel([

        Animated.timing(
          translateY,
          {
            toValue:
              SAFE_TOP_OFFSET,

            duration:
              260,

            easing:
              Easing.out(
                Easing.ease
              ),

            useNativeDriver:
              true,
          }
        ),


        Animated.timing(
          backdropOpacity,
          {
            toValue:
              1,

            duration:
              220,

            useNativeDriver:
              true,
          }
        ),

      ]).start();

    }, [
      visible,
      SHEET_HEIGHT,
      SAFE_TOP_OFFSET,
      translateY,
      backdropOpacity,
    ]);


    // ==================================================
    // CLOSE SHEET
    // ==================================================

    const closeSheet = () => {

      // ================================================
      // IF KEYBOARD IS OPEN
      // ================================================

      if (keyboardVisible) {

        Keyboard.dismiss();

        return;
      }


      // ================================================
      // CLOSE ANIMATION
      // ================================================

      Animated.parallel([

        Animated.timing(
          translateY,
          {
            toValue:
              SHEET_HEIGHT,

            duration:
              200,

            useNativeDriver:
              true,
          }
        ),


        Animated.timing(
          backdropOpacity,
          {
            toValue:
              0,

            duration:
              180,

            useNativeDriver:
              true,
          }
        ),

      ]).start(() => {

        onClose?.();

      });

    };


    // ==================================================
    // IMPERATIVE HANDLE
    // ==================================================

    useImperativeHandle(
      ref,
      () => ({
        close: closeSheet,
      }),
      [
        keyboardVisible,
        SHEET_HEIGHT,
      ]
    );


    // ==================================================
    // PAN RESPONDER
    // ==================================================

    const panResponder =
      useRef(

        PanResponder.create({

          // ============================================
          // START
          // ============================================

          onStartShouldSetPanResponder:
            () => true,


          // ============================================
          // MOVE
          // ============================================

          onMoveShouldSetPanResponder:
            (_, gesture) => {

              return (
                gesture.dy > 10
              );

            },


          // ============================================
          // DRAG
          // ============================================

          onPanResponderMove:
            (_, gesture) => {

              if (
                gesture.dy > 0
              ) {

                translateY.setValue(
                  gesture.dy +
                    SAFE_TOP_OFFSET
                );

              }

            },


          // ============================================
          // RELEASE
          // ============================================

          onPanResponderRelease:
            (_, gesture) => {

              if (
                gesture.dy > 100
              ) {

                closeSheet();

                return;
              }


              Animated.spring(
                translateY,
                {
                  toValue:
                    SAFE_TOP_OFFSET,

                  tension:
                    80,

                  friction:
                    10,

                  useNativeDriver:
                    true,
                }
              ).start();

            },

        })

      ).current;


    // ==================================================
    // RENDER
    // ==================================================

    return (

      <Modal
        transparent
        visible={visible}
        animationType="none"
        onRequestClose={
          closeSheet
        }
      >

        <View
          style={{
            flex: 1,
          }}
        >

          {/* ==========================================
              BACKDROP
          ========================================== */}

          <TouchableWithoutFeedback
            onPress={closeSheet}
          >

            <Animated.View
              style={{
                position:
                  'absolute',

                top: 0,

                left: 0,

                right: 0,

                bottom: 0,

                backgroundColor:
                  '#000000',

                opacity:
                  backdropOpacity.interpolate({
                    inputRange: [
                      0,
                      1,
                    ],

                    outputRange: [
                      0,
                      0.30,
                    ],
                  }),
              }}
            />

          </TouchableWithoutFeedback>


          {/* ==========================================
              BOTTOM SHEET
          ========================================== */}

          <Animated.View
            style={{
              height:
                SHEET_HEIGHT,

              transform: [
                {
                  translateY:
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
            }}
          >

            {/* ========================================
                HEADER
            ======================================== */}

            {showHeader && (

              <View
                {...panResponder.panHandlers}
                style={{
                  position:
                    'relative',

                  paddingTop:
                    4,

                  paddingBottom:
                    sheetheading
                      ? 12
                      : 6,
                }}
              >

                {/* ==================================
                    DRAG HANDLE
                ================================== */}

                <View
                  style={{
                    alignItems:
                      'center',

                    paddingVertical:
                      10,
                  }}
                >

                  <View
                    style={{
                      width:
                        40,

                      height:
                        4,

                      borderRadius:
                        2,

                      backgroundColor:
                        '#D1D5DB',
                    }}
                  />

                </View>


                {/* ==================================
                    HEADING
                ================================== */}

                {sheetheading ? (

                  <View
                    style={{
                     

                        
                      paddingHorizontal:
                        30,

                      paddingRight:
                        60,
                    }}
                  >

                    <Text
                      numberOfLines={1}
                      style={{
                        fontSize:
                          18,

                        lineHeight:
                          24,

                        fontFamily:
                          theme?.fonts
                            ?.bold ||
                          'Manrope-Bold',

                        color:
                          theme?.colors
                            ?.navy900 ||
                          '#172B3A',
                      }}
                    >
                      {sheetheading}
                    </Text>

                  </View>

                ) : null}

              </View>

            )}


            {/* ========================================
                CLOSE BUTTON
            ======================================== */}

            {showHeader && (

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={closeSheet}
                hitSlop={{
                  top: 10,
                  bottom: 10,
                  left: 10,
                  right: 10,
                }}
                style={{
                  position:
                    'absolute',

                  top:
                    12,

                  right:
                    16,

                  width:
                    36,

                  height:
                    36,

                  borderRadius:
                    18,

                  backgroundColor:
                    '#F8FAFC',

                  justifyContent:
                    'center',

                  alignItems:
                    'center',

                  zIndex:
                    50,
                }}
              >

                <X
                  size={20}
                  color="#374151"
                  strokeWidth={2}
                />

              </TouchableOpacity>

            )}


            {/* ========================================
                CONTENT
            ======================================== */}

            {data &&
            renderItem ? (

              <FlatList
                data={
                  data
                }

                renderItem={
                  renderItem
                }

                keyExtractor={(
                  item,
                  index
                ) => {

                  return (
                    item?.item_id
                      ?.toString() ||

                    item?.id
                      ?.toString() ||

                    item?._id
                      ?.toString() ||

                    index.toString()
                  );

                }}

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

                onStartShouldSetResponder={() =>
                  false
                }

                contentContainerStyle={{
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
                }}
              />

            ) : (

              <ScrollView
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

                contentContainerStyle={{
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
                }}
              >

                {children}

              </ScrollView>

            )}

          </Animated.View>

        </View>

      </Modal>

    );

  }
);


// ==================================================
// EXPORT
// ==================================================

export default CustomBottomSheet;