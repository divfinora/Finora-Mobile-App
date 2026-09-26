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

import {X} from 'lucide-react-native';

import {
  PanGestureHandler,
  NativeViewGestureHandler,
  GestureHandlerRootView,
  State,
} from 'react-native-gesture-handler';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {theme} from '../../../theme';


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

// A deliberate pull is required before the sheet can close.
// Small finger movement / normal scroll bounce must never close it.
const CLOSE_THRESHOLD = 170;
const FAST_CLOSE_DISTANCE = 95;
const VELOCITY_THRESHOLD = 1.8;

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


      
      // Restrict sheet dragging to a downward pull that starts at content bottom.
      dragOnlyAtContentBottom = false,
// ==================================================
      // DESIGN PROPS
      // ==================================================

      sheetStyle,

      headerStyle,

      headingContainerStyle,

      headingStyle,

      closeButtonStyle,

      closeIconColor = '#374151',

      closeIconSize = 20,

      contentStyle,

      dragHandleContainerStyle,

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
    // KEYBOARD STATE
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
    // HEIGHT CALCULATION
    // ==================================================

    // ==================================================
    // SHEET HEIGHT / SAFE AREA
    // ==================================================

    const SAFE_TOP_BOUNDARY =
      SAFE_TOP_OFFSET + insets.top;

    // Sheet ki base height stable rahegi.
    // Keyboard open/close par React layout height directly
    // change nahi hogi, isliye screen blink nahi karegi.
    const NORMAL_SAFE_HEIGHT =
      Math.max(
        0,
        SCREEN_HEIGHT -
          SAFE_TOP_BOUNDARY -
          insets.bottom,
      );

    const SHEET_HEIGHT =
      Math.min(
        NORMAL_SAFE_HEIGHT * heightPercent,
        NORMAL_SAFE_HEIGHT,
      );

    // Upward drag ko safe top boundary ke bahar nahi jane dena.
    const MAX_UPWARD_TRANSLATE =
      Math.max(
        0,
        SHEET_HEIGHT -
          SAFE_TOP_BOUNDARY,
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

    // Keyboard open/close ke waqt height smoothly animate hogi.
    // Isse direct React layout resize/blink nahi hoga.
    const animatedSheetHeight =
      useRef(
        new Animated.Value(
          SHEET_HEIGHT,
        ),
      ).current;

    const keyboardOffset =
      useRef(
        new Animated.Value(0),
      ).current;

    // Keep track of the current sheet height so that keyboard open
    // only changes the height when the sheet would otherwise cross
    // the safe-area boundary.
    const currentSheetHeightRef =
      useRef(SHEET_HEIGHT);

    const sheetHeightListenerRef =
      useRef(null);

    const backdropOpacity =
      useRef(
        new Animated.Value(0),
      ).current;


    // ==================================================
    // REFS
    // ==================================================

    const isDragging =
      useRef(false);

    const isAnimating =
      useRef(false);

    const wasVisible =
      useRef(false);

    // Keyboard open ho tab bhi close button/backdrop
    // se sheet ko properly close karne ke liye.
    const isClosing =
      useRef(false);

    // Stable refs for gesture callbacks.
    const keyboardVisibleRef =
      useRef(false);

    const closeSheetRef =
      useRef(null);

    const enableDragRef =
      useRef(enableDrag);

    const closeOnDragDownRef =
      useRef(closeOnDragDown);

    const contentGestureRef =
      useRef(null);

    // ==================================================
    // NESTED SCROLL / SHEET HANDOFF REFS
    // ==================================================
    //
    // `dragOnlyAtContentBottom` is kept as the public prop name for
    // backward compatibility, but for a dismissible sheet it means:
    //
    //   1. DOWN gesture first scrolls inner content toward offset 0.
    //   2. While offset > 0, the sheet stays completely still.
    //   3. When offset reaches 0, the SAME continuous gesture can hand off
    //      to the sheet.
    //   4. Only the movement AFTER the handoff counts toward closing.
    //
    // This is the important part of a professional nested bottom-sheet
    // interaction.
    const contentOffsetYRef = useRef(0);

    const sheetHandoffActiveRef = useRef(false);

    const sheetHandoffStartTranslationYRef = useRef(0);

    const contentScrollInProgressRef = useRef(false);


    useEffect(() => {
      keyboardVisibleRef.current =
        keyboardVisible;
    }, [keyboardVisible]);

    enableDragRef.current =
      enableDrag;

    closeOnDragDownRef.current =
      closeOnDragDown;


    // ==================================================
    // SHEET HEIGHT TRACKER
    // ==================================================

    useEffect(() => {
      if (sheetHeightListenerRef.current) {
        animatedSheetHeight.removeListener(
          sheetHeightListenerRef.current,
        );
      }

      const listenerId =
        animatedSheetHeight.addListener(
          ({value}) => {
            currentSheetHeightRef.current =
              value;
          },
        );

      sheetHeightListenerRef.current =
        listenerId;

      currentSheetHeightRef.current =
        SHEET_HEIGHT;

      return () => {
        animatedSheetHeight.removeListener(
          listenerId,
        );
        sheetHeightListenerRef.current =
          null;
      };
    }, [
      animatedSheetHeight,
      SHEET_HEIGHT,
    ]);


    // ==================================================
    // KEYBOARD LISTENERS
    // ==================================================

    useEffect(() => {

      const showEvent =
        Platform.OS === 'ios'
          ? 'keyboardWillShow'
          : 'keyboardDidShow';

      const hideEvent =
        Platform.OS === 'ios'
          ? 'keyboardWillHide'
          : 'keyboardDidHide';


      const showSub =
        Keyboard.addListener(
          showEvent,
          event => {

            const height =
              event?.endCoordinates?.height || 0;

            setKeyboardHeight(height);
            setKeyboardVisible(true);

            // Keyboard ke upar available safe area.
            const keyboardSafeHeight =
              Math.max(
                0,
                SCREEN_HEIGHT -
                  SAFE_TOP_BOUNDARY -
                  height -
                  insets.bottom,
              );

            // IMPORTANT:
            // Keyboard aate hi sheet ko blindly chhota nahi karna.
            // Agar current sheet already available safe height ke
            // andar fit ho rahi hai, height bilkul same rahegi.
            //
            // Sirf tab shrink karo jab current sheet keyboard ke
            // baad available safe area se badi ho rahi ho.
            const currentSheetHeight =
              currentSheetHeightRef.current;

            const shouldResizeForKeyboard =
              currentSheetHeight >
              keyboardSafeHeight;

            const targetHeight =
              shouldResizeForKeyboard
                ? keyboardSafeHeight
                : currentSheetHeight;

            if (shouldResizeForKeyboard) {

              // Direct height change nahi karna.
              // Sirf required amount tak smoothly reduce karo.
              animatedSheetHeight.stopAnimation();

              Animated.timing(
                animatedSheetHeight,
                {
                  toValue: targetHeight,
                  duration: 220,
                  easing:
                    Easing.out(
                      Easing.ease,
                    ),
                  useNativeDriver: false,
                },
              ).start();

            } else {

              // Sheet already safe area ke andar hai.
              // Koi height animation/change nahi.
              animatedSheetHeight.stopAnimation();
              animatedSheetHeight.setValue(
                currentSheetHeight,
              );

            }

            keyboardOffset.stopAnimation();
            keyboardOffset.setValue(0);
          },
        );


      const hideSub =
        Keyboard.addListener(
          hideEvent,
          () => {

            setKeyboardVisible(false);
            setKeyboardHeight(0);

            keyboardOffset.stopAnimation();
            keyboardOffset.setValue(0);

            // Sheet close/drag ke waqt keyboard hide animation ko
            // sheet gesture ke saath fight mat karne do.
            if (
              isClosing.current ||
              isDragging.current
            ) {
              return;
            }

            // Normal keyboard close:
            // sheet smoothly normal height par aayegi.
            animatedSheetHeight.stopAnimation();

            Animated.timing(
              animatedSheetHeight,
              {
                toValue: SHEET_HEIGHT,
                duration: 220,
                easing: Easing.out(Easing.ease),
                useNativeDriver: false,
              },
            ).start();

            currentSheetHeightRef.current =
              SHEET_HEIGHT;
          },
        );


      return () => {

        showSub.remove();
        hideSub.remove();

      };

    }, [
      keyboardOffset,
      animatedSheetHeight,
      heightPercent,
      SAFE_TOP_BOUNDARY,
      SHEET_HEIGHT,
      insets.bottom,
    ]);


    // ==================================================
    // OPEN SHEET
    // ==================================================
    //
    // IMPORTANT:
    // SHEET_HEIGHT ko dependency mein nahi rakha.
    //
    // Keyboard open/close hone par sheet ki height
    // change hogi, lekin open animation dobara
    // trigger nahi hogi.
    // ==================================================

    useEffect(() => {

      if (!visible) {

        wasVisible.current =
          false;
        contentOffsetYRef.current = 0;
        contentScrollInProgressRef.current = false;
        sheetHandoffActiveRef.current = false;
        sheetHandoffStartTranslationYRef.current = 0;

        return;

      }


      // Already open hai.
      // Keyboard ki wajah se effect dobara
      // open animation nahi karega.

      if (wasVisible.current) {
        return;
      }


      wasVisible.current =
        true;

      isClosing.current =
        false;


      translateY.setValue(
        SHEET_HEIGHT,
      );

      animatedSheetHeight.setValue(
        SHEET_HEIGHT,
      );

      currentSheetHeightRef.current =
        SHEET_HEIGHT;

      keyboardOffset.setValue(0);
      backdropOpacity.setValue(0);

      isAnimating.current =
        true;


      Animated.parallel([

        // SHEET

        Animated.spring(
          translateY,
          {
            toValue: 0,

            tension: 65,

            friction: 11,

            useNativeDriver: false,
          },
        ),

        // BACKDROP

        Animated.timing(
          backdropOpacity,
          {
            toValue: 1,

            duration: 250,

            easing:
              Easing.out(
                Easing.ease,
              ),

            useNativeDriver: false,
          },
        ),

      ]).start(() => {

        isAnimating.current =
          false;

      });

    }, [
      visible,
      translateY,
      backdropOpacity,
      dragOnlyAtContentBottom,
    ]);


    // ==================================================
    // CLOSE SHEET
    // ==================================================

    const closeSheet =
      useCallback(() => {

        // ----------------------------------------------
        // Keyboard open ho to keyboard dismiss karo,
        // aur isi action mein sheet bhi close karo.
        // ----------------------------------------------

        // An active animation ko interrupt karke user ke close
        // gesture ko immediately control do.
        if (isAnimating.current) {
          translateY.stopAnimation();
          backdropOpacity.stopAnimation();
          animatedSheetHeight.stopAnimation();

          isAnimating.current = false;
        }

        isClosing.current = true;

        sheetHandoffActiveRef.current = false;
        sheetHandoffStartTranslationYRef.current = 0;

        // Keyboard open ho to dismiss karo, but sheet ki close animation
        // current keyboard-adjusted height se hi run hogi.
        if (keyboardVisibleRef.current) {
          Keyboard.dismiss();
        }

        isAnimating.current =
          true;

        // Current keyboard-height animation ko stop karo.
        // IMPORTANT: close ke waqt height ko normal height par
        // expand mat karo. Sirf sheet ko neeche slide karo.
        animatedSheetHeight.stopAnimation();
        keyboardOffset.stopAnimation();
        keyboardOffset.setValue(0);

        Animated.parallel([

          // SHEET CLOSE

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

              useNativeDriver: false,
            },
          ),

          // BACKDROP CLOSE

          Animated.timing(
            backdropOpacity,
            {
              toValue: 0,

              duration: 200,

              easing:
                Easing.in(
                  Easing.ease,
                ),

              useNativeDriver: false,
            },
          ),

        ]).start(() => {

          isAnimating.current =
            false;

          isClosing.current =
            false;

          wasVisible.current =
            false;

          onClose?.();

        });

      }, [
        SHEET_HEIGHT,
        translateY,
        animatedSheetHeight,
        backdropOpacity,
        onClose,
      ]);


    useEffect(() => {
      closeSheetRef.current =
        closeSheet;
    }, [closeSheet]);


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
    // CONTENT SCROLL / SHEET HANDOFF
    // ==================================================
    //
    // The inner content owns the gesture first.
    //
    // Example:
    //   content offset = 200
    //   user swipes DOWN by 120  -> content becomes ~80
    //   user continues DOWN by 100 -> content becomes 0, remaining ~20
    //                              moves the sheet
    //
    // Therefore a single continuous pull naturally hands off from
    // ScrollView -> BottomSheet without making the sheet fight the scroll.
    // ==================================================

    const TOP_HANDOFF_TOLERANCE = 2;


    const handleContentScroll = useCallback(
      event => {
        const nativeEvent =
          event?.nativeEvent || {};

        const offsetY =
          Math.max(
            0,
            nativeEvent.contentOffset?.y || 0,
          );

        contentOffsetYRef.current =
          offsetY;
      },
      [],
    );


    const handleContentScrollBeginDrag =
      useCallback(() => {
        if (!dragOnlyAtContentBottom) {
          return;
        }

        // Every new content touch starts with the sheet handoff OFF.
        // It can turn ON later in the same gesture when content reaches 0.
        sheetHandoffActiveRef.current = false;
        sheetHandoffStartTranslationYRef.current = 0;
        contentScrollInProgressRef.current = true;

      }, [dragOnlyAtContentBottom]);


    const handleContentScrollEndDrag =
      useCallback(() => {
        if (!dragOnlyAtContentBottom) {
          return;
        }

        contentScrollInProgressRef.current = false;

      }, [dragOnlyAtContentBottom]);


    const handleContentMomentumBegin =
      useCallback(() => {
        if (!dragOnlyAtContentBottom) {
          return;
        }

        // Momentum is still content-owned.
        sheetHandoffActiveRef.current = false;
        contentScrollInProgressRef.current = true;

      }, [dragOnlyAtContentBottom]);


    const handleContentMomentumEnd =
      useCallback(() => {
        if (!dragOnlyAtContentBottom) {
          return;
        }

        contentScrollInProgressRef.current = false;

      }, [dragOnlyAtContentBottom]);


    // ==================================================
    // SHEET GESTURE
    // ==================================================

    const handleSheetGestureEvent =
      useCallback(
        event => {
          if (
            !enableDragRef.current ||
            isClosing.current
          ) {
            return;
          }


          const translationY =
            event?.nativeEvent?.translationY || 0;


          // Upward movement always belongs to the content.
          if (translationY <= 0) {
            return;
          }


          // --------------------------------------------------
          // PROFESSIONAL NESTED-SCROLL HANDOFF
          // --------------------------------------------------
          if (dragOnlyAtContentBottom) {

            const contentOffset =
              contentOffsetYRef.current;


            // Content is still above the top.
            // DO NOT move the sheet.
            //
            // The ScrollView consumes this downward movement and brings
            // its offset from e.g. 200 -> 100 -> 0.
            if (
              !sheetHandoffActiveRef.current &&
              contentOffset >
                TOP_HANDOFF_TOLERANCE
            ) {
              return;
            }


            // We just reached the top during THIS SAME gesture.
            // Remember where the finger is now. Only movement after this
            // point belongs to the sheet.
            if (
              !sheetHandoffActiveRef.current
            ) {

              sheetHandoffActiveRef.current =
                true;

              sheetHandoffStartTranslationYRef.current =
                translationY;

              translateY.stopAnimation();

            }


            const sheetTranslation =
              Math.max(
                0,
                translationY -
                  sheetHandoffStartTranslationYRef.current,
              );


            translateY.setValue(
              sheetTranslation,
            );

            return;
          }


          // Legacy/default behavior for sheets that do not use nested
          // scroll handoff.
          translateY.setValue(
            translationY,
          );

        },
        [
          translateY,
          dragOnlyAtContentBottom,
        ],
      );


    const handleSheetGestureStateChange =
      useCallback(
        event => {

          const state =
            event?.nativeEvent?.state;

          const translationY =
            event?.nativeEvent?.translationY || 0;

          const velocityY =
            event?.nativeEvent?.velocityY || 0;


          if (
            state === State.BEGAN
          ) {

            if (
              !enableDragRef.current ||
              isClosing.current
            ) {

              isDragging.current =
                false;

              sheetHandoffActiveRef.current =
                false;

              return;
            }


            // Every new gesture starts with no sheet handoff.
            // If content is already at offset 0, the gesture can hand off
            // immediately after the downward activation threshold.
            sheetHandoffActiveRef.current =
              false;

            sheetHandoffStartTranslationYRef.current =
              0;

            isDragging.current =
              true;


            translateY.stopAnimation();
            animatedSheetHeight.stopAnimation();
            keyboardOffset.stopAnimation();

            return;
          }


          if (
            state !== State.END &&
            state !== State.CANCELLED &&
            state !== State.FAILED
          ) {
            return;
          }


          if (
            !isDragging.current
          ) {
            sheetHandoffActiveRef.current =
              false;

            return;
          }


          isDragging.current =
            false;


          // In nested mode, ONLY the portion of the gesture after
          // content reached offset 0 counts as sheet movement.
          const dragDistance =
            dragOnlyAtContentBottom
              ? sheetHandoffActiveRef.current
                ? Math.max(
                    0,
                    translationY -
                      sheetHandoffStartTranslationYRef.current,
                  )
                : 0
              : Math.max(
                  0,
                  translationY,
                );


          const downwardVelocity =
            Math.max(
              0,
              velocityY,
            );


          const closeThreshold =
            keyboardVisibleRef.current
              ? 120
              : CLOSE_THRESHOLD;


          const fastCloseDistance =
            keyboardVisibleRef.current
              ? 70
              : FAST_CLOSE_DISTANCE;


          const velocityThreshold =
            keyboardVisibleRef.current
              ? 1.7
              : VELOCITY_THRESHOLD;


          const shouldClose =
            closeOnDragDownRef.current &&
            dragDistance >=
              fastCloseDistance &&
            (
              dragDistance >=
                closeThreshold ||
              downwardVelocity >=
                velocityThreshold * 1000
            );


          if (
            shouldClose
          ) {

            sheetHandoffActiveRef.current =
              false;

            sheetHandoffStartTranslationYRef.current =
              0;

            closeSheetRef.current?.();

            return;
          }


          sheetHandoffActiveRef.current =
            false;

          sheetHandoffStartTranslationYRef.current =
            0;


          Animated.spring(
            translateY,
            {
              toValue: 0,
              tension: 85,
              friction: 14,
              useNativeDriver: false,
            },
          ).start();

        },
        [
          translateY,
          animatedSheetHeight,
          keyboardOffset,
          dragOnlyAtContentBottom,
        ],
      );


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
        onRequestClose={
          closeSheet
        }
        statusBarTranslucent
      >

        <GestureHandlerRootView
          style={{
            flex: 1,
          }}
        >

          {/* ==========================================
              BACKDROP
          =========================================== */}

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


          {/* ==========================================
              BOTTOM SHEET
          =========================================== */}

          <PanGestureHandler
            enabled={
              enableDrag &&
              visible
            }
            // Valid RNGH range. The handler recognizes vertical movement,
            // while the gesture logic below decides whether the sheet should
            // actually move.
            activeOffsetY={[-10, 10]}
            failOffsetX={[-20, 20]}
            minPointers={1}
            maxPointers={1}
            shouldCancelWhenOutside={false}
            simultaneousHandlers={
              contentGestureRef
            }
            onGestureEvent={
              handleSheetGestureEvent
            }
            onHandlerStateChange={
              handleSheetGestureStateChange
            }
          >

            <Animated.View
            style={[
              {
                height:
                  animatedSheetHeight,

                transform: [
                  {
                    translateY: translateY,
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

              sheetStyle,
            ]}
          >

            {/* ========================================
                HEADER
            ========================================= */}

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

                {/* ====================================
                    DRAG HANDLE
                ===================================== */}

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


                {/* ====================================
                    HEADING
                ===================================== */}

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


            {/* ========================================
                CLOSE BUTTON
            ========================================= */}

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


            {/* ========================================
                CONTENT
            ========================================= */}

            {data &&
            renderItem ? (

              <NativeViewGestureHandler
                ref={contentGestureRef}
              >

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
                onScroll={handleContentScroll}
                onScrollBeginDrag={handleContentScrollBeginDrag}
                onScrollEndDrag={handleContentScrollEndDrag}
                onMomentumScrollBegin={handleContentMomentumBegin}
                onMomentumScrollEnd={handleContentMomentumEnd}
                bounces={!dragOnlyAtContentBottom}
                overScrollMode={
                  dragOnlyAtContentBottom
                    ? 'never'
                    : 'auto'
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

              </NativeViewGestureHandler>

            ) : (

              <NativeViewGestureHandler
                ref={contentGestureRef}
              >

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
                onScroll={handleContentScroll}
                onScrollBeginDrag={handleContentScrollBeginDrag}
                onScrollEndDrag={handleContentScrollEndDrag}
                onMomentumScrollBegin={handleContentMomentumBegin}
                onMomentumScrollEnd={handleContentMomentumEnd}
                bounces={!dragOnlyAtContentBottom}
                overScrollMode={
                  dragOnlyAtContentBottom
                    ? 'never'
                    : 'auto'
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

              </NativeViewGestureHandler>

            )}

            </Animated.View>

          </PanGestureHandler>

        </GestureHandlerRootView>

      </Modal>

    );
  },
);

export default NewCustomBottomSheet;