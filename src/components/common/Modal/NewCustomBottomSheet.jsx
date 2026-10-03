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

import { X } from 'lucide-react-native';

import {
  PanGestureHandler,
  NativeViewGestureHandler,
  GestureHandlerRootView,
  State,
} from 'react-native-gesture-handler';

import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { theme } from '../../../theme';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const STATUS_BAR_HEIGHT =
  Platform.OS === 'android'
    ? StatusBar.currentHeight || 0
    : 0;

const SAFE_TOP_OFFSET =
  Platform.OS === 'android'
    ? STATUS_BAR_HEIGHT * 2
    : 0;

const CLOSE_THRESHOLD = 170;
const FAST_CLOSE_DISTANCE = 95;
const VELOCITY_THRESHOLD = 1.8;

const RUBBER_BAND_FACTOR = 0.25;

const NewCustomBottomSheet = forwardRef(
  (
    {
      children,
      data = null,
      renderItem = null,

      visible = false,
      onClose,

      sheetheading = '',
      showHeader = true,

      heightPercent = 0.75,
      sheetBg = '#FFFFFF',

      enableDrag = true,
      showDragHandle = true,
      closeOnBackdrop = true,
      closeOnDragDown = true,

      dragOnlyAtContentBottom = false,

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
    const insets = useSafeAreaInsets();

    const [keyboardVisible, setKeyboardVisible] =
      useState(false);

    const [keyboardHeight, setKeyboardHeight] =
      useState(0);

    // IMPORTANT:
    // Modal ko parent visible false hote hi remove nahi karna.
    // Pehle close animation complete hogi.
    const [modalVisible, setModalVisible] =
      useState(visible);

    const SAFE_TOP_BOUNDARY =
      SAFE_TOP_OFFSET + insets.top;

    const NORMAL_SAFE_HEIGHT = Math.max(
      0,
      SCREEN_HEIGHT -
      SAFE_TOP_BOUNDARY -
      insets.bottom,
    );

    const SHEET_HEIGHT = Math.min(
      NORMAL_SAFE_HEIGHT * heightPercent,
      NORMAL_SAFE_HEIGHT,
    );

    const MAX_UPWARD_TRANSLATE = Math.max(
      0,
      SHEET_HEIGHT - SAFE_TOP_BOUNDARY,
    );

    const translateY = useRef(
      new Animated.Value(SHEET_HEIGHT),
    ).current;

    const animatedSheetHeight = useRef(
      new Animated.Value(SHEET_HEIGHT),
    ).current;

    const keyboardOffset = useRef(
      new Animated.Value(0),
    ).current;

    const currentSheetHeightRef = useRef(
      SHEET_HEIGHT,
    );

    const sheetHeightListenerRef = useRef(null);

    const backdropOpacity = useRef(
      new Animated.Value(0),
    ).current;

    const isDragging = useRef(false);
    const isAnimating = useRef(false);

    const wasVisible = useRef(false);

    const isClosing = useRef(false);

    const keyboardVisibleRef = useRef(false);

    const closeSheetRef = useRef(null);

    const enableDragRef = useRef(enableDrag);

    const closeOnDragDownRef =
      useRef(closeOnDragDown);

    const contentGestureRef = useRef(null);

    const contentOffsetYRef = useRef(0);

    const sheetHandoffActiveRef =
      useRef(false);

    const sheetHandoffStartTranslationYRef =
      useRef(0);

    const contentScrollInProgressRef =
      useRef(false);

    useEffect(() => {
      keyboardVisibleRef.current =
        keyboardVisible;
    }, [keyboardVisible]);

    enableDragRef.current = enableDrag;
    closeOnDragDownRef.current =
      closeOnDragDown;

    useEffect(() => {
      if (sheetHeightListenerRef.current) {
        animatedSheetHeight.removeListener(
          sheetHeightListenerRef.current,
        );
      }

      const listenerId =
        animatedSheetHeight.addListener(
          ({ value }) => {
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

    useEffect(() => {
      const showEvent =
        Platform.OS === 'ios'
          ? 'keyboardWillShow'
          : 'keyboardDidShow';

      const hideEvent =
        Platform.OS === 'ios'
          ? 'keyboardWillHide'
          : 'keyboardDidHide';

      const showSub = Keyboard.addListener(
        showEvent,
        event => {
          const height =
            event?.endCoordinates?.height || 0;

          setKeyboardHeight(height);
          setKeyboardVisible(true);

          const keyboardSafeHeight =
            Math.max(
              0,
              SCREEN_HEIGHT -
              SAFE_TOP_BOUNDARY -
              height -
              insets.bottom,
            );

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
            animatedSheetHeight.stopAnimation();

            Animated.timing(
              animatedSheetHeight,
              {
                toValue: targetHeight,
                duration: 220,
                easing: Easing.out(
                  Easing.ease,
                ),
                useNativeDriver: false,
              },
            ).start();
          } else {
            animatedSheetHeight.stopAnimation();

            animatedSheetHeight.setValue(
              currentSheetHeight,
            );
          }

          keyboardOffset.stopAnimation();
          keyboardOffset.setValue(0);
        },
      );

      const hideSub = Keyboard.addListener(
        hideEvent,
        () => {
          setKeyboardVisible(false);
          setKeyboardHeight(0);

          keyboardOffset.stopAnimation();
          keyboardOffset.setValue(0);

          if (
            isClosing.current ||
            isDragging.current
          ) {
            return;
          }

          animatedSheetHeight.stopAnimation();

          Animated.timing(
            animatedSheetHeight,
            {
              toValue: SHEET_HEIGHT,
              duration: 220,
              easing: Easing.out(
                Easing.ease,
              ),
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

    useEffect(() => {
      if (!visible) {
        // IMPORTANT:
        // Parent false karega to closeSheet() wala
        // animation effect handle karega.
        return;
      }

      if (wasVisible.current) {
        return;
      }

      wasVisible.current = true;

      isClosing.current = false;

      // Modal ko visible karo.
      setModalVisible(true);

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

      isAnimating.current = true;

      Animated.parallel([
        Animated.spring(
          translateY,
          {
            toValue: 0,
            tension: 65,
            friction: 11,
            useNativeDriver: false,
          },
        ),

        Animated.timing(
          backdropOpacity,
          {
            toValue: 1,
            duration: 250,
            easing: Easing.out(
              Easing.ease,
            ),
            useNativeDriver: false,
          },
        ),
      ]).start(() => {
        isAnimating.current = false;
      });
    }, [
      visible,
      translateY,
      backdropOpacity,
      dragOnlyAtContentBottom,
      SHEET_HEIGHT,
      animatedSheetHeight,
      keyboardOffset,
    ]);

    // ==================================================
    // CLOSE SHEET
    // ==================================================

    const closeSheet = useCallback(() => {
      if (isClosing.current) {
        return;
      }

      if (isAnimating.current) {
        translateY.stopAnimation();
        backdropOpacity.stopAnimation();
        animatedSheetHeight.stopAnimation();

        isAnimating.current = false;
      }

      isClosing.current = true;

      sheetHandoffActiveRef.current = false;
      sheetHandoffStartTranslationYRef.current = 0;

      if (keyboardVisibleRef.current) {
        Keyboard.dismiss();
      }

      isAnimating.current = true;

      animatedSheetHeight.stopAnimation();
      keyboardOffset.stopAnimation();
      keyboardOffset.setValue(0);

      Animated.parallel([
        Animated.timing(
          translateY,
          {
            toValue: SHEET_HEIGHT,
            duration: 250,
            easing: Easing.in(
              Easing.ease,
            ),
            useNativeDriver: false,
          },
        ),

        Animated.timing(
          backdropOpacity,
          {
            toValue: 0,
            duration: 200,
            easing: Easing.in(
              Easing.ease,
            ),
            useNativeDriver: false,
          },
        ),
      ]).start(() => {
        isAnimating.current = false;

        isClosing.current = false;

        wasVisible.current = false;

        // IMPORTANT:
        // Animation complete hone ke baad hi Modal remove hoga.
        setModalVisible(false);

        onClose?.();
      });
    }, [
      SHEET_HEIGHT,
      translateY,
      animatedSheetHeight,
      backdropOpacity,
      keyboardOffset,
      onClose,
    ]);

    useEffect(() => {
      closeSheetRef.current =
        closeSheet;
    }, [closeSheet]);

    // IMPORTANT:
    // Parent sirf visible=false karega.
    // Internal close animation automatically chalegi.
    useEffect(() => {
      if (
        !visible &&
        wasVisible.current &&
        !isClosing.current
      ) {
        closeSheet();
      }
    }, [visible, closeSheet]);

    useImperativeHandle(
      ref,
      () => ({
        close: closeSheet,
      }),
      [closeSheet],
    );

    // ==================================================
    // CONTENT SCROLL
    // ==================================================

    const TOP_HANDOFF_TOLERANCE = 2;

    const handleContentScroll =
      useCallback(
        event => {
          const nativeEvent =
            event?.nativeEvent || {};

          const offsetY = Math.max(
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

        sheetHandoffActiveRef.current =
          false;

        sheetHandoffStartTranslationYRef.current =
          0;

        contentScrollInProgressRef.current =
          true;
      }, [dragOnlyAtContentBottom]);

    const handleContentScrollEndDrag =
      useCallback(() => {
        if (!dragOnlyAtContentBottom) {
          return;
        }

        contentScrollInProgressRef.current =
          false;
      }, [dragOnlyAtContentBottom]);

    const handleContentMomentumBegin =
      useCallback(() => {
        if (!dragOnlyAtContentBottom) {
          return;
        }

        sheetHandoffActiveRef.current =
          false;

        contentScrollInProgressRef.current =
          true;
      }, [dragOnlyAtContentBottom]);

    const handleContentMomentumEnd =
      useCallback(() => {
        if (!dragOnlyAtContentBottom) {
          return;
        }

        contentScrollInProgressRef.current =
          false;
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
            event?.nativeEvent
              ?.translationY || 0;

          if (translationY <= 0) {
            return;
          }

          if (dragOnlyAtContentBottom) {
            const contentOffset =
              contentOffsetYRef.current;

            if (
              !sheetHandoffActiveRef.current &&
              contentOffset >
              TOP_HANDOFF_TOLERANCE
            ) {
              return;
            }

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
            event?.nativeEvent
              ?.translationY || 0;

          const velocityY =
            event?.nativeEvent
              ?.velocityY || 0;

          if (state === State.BEGAN) {
            if (
              !enableDragRef.current ||
              isClosing.current
            ) {
              isDragging.current = false;

              sheetHandoffActiveRef.current =
                false;

              return;
            }

            sheetHandoffActiveRef.current =
              false;

            sheetHandoffStartTranslationYRef.current =
              0;

            isDragging.current = true;

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

          if (!isDragging.current) {
            sheetHandoffActiveRef.current =
              false;

            return;
          }

          isDragging.current = false;

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

          if (shouldClose) {
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
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
    };

    // ==================================================
    // RENDER
    // ==================================================

    return (
      <Modal
        transparent
        visible={modalVisible}
        animationType="none"
        onRequestClose={closeSheet}
        statusBarTranslucent
      >
        <GestureHandlerRootView
          style={{
            flex: 1,
          }}
        >
          {/* BACKDROP */}

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
                  backgroundColor: '#000000',
                },
                backdropStyle,
              ]}
            />
          </TouchableWithoutFeedback>

          {/* BOTTOM SHEET */}

          <PanGestureHandler
            enabled={
              enableDrag &&
              modalVisible
            }
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
                      translateY,
                    },
                  ],

                  backgroundColor:
                    sheetBg,

                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,

                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,

                  overflow: 'hidden',

                  shadowColor: '#000000',

                  shadowOffset: {
                    width: 0,
                    height: -4,
                  },

                  shadowOpacity: 0.1,
                  shadowRadius: 12,

                  elevation: 16,
                },
                sheetStyle,
              ]}
            >
              {/* HEADER */}

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
                  {/* DRAG HANDLE */}

                  {showDragHandle && (
                    <View
                      style={[
                        {
                          alignItems: 'center',
                          paddingVertical: 10,
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

                  {/* HEADING */}

                  {sheetheading ? (
                    <View
                      style={[
                        {
                          paddingHorizontal: 30,
                          paddingRight: 60,
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

              {/* CLOSE BUTTON */}

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
                  style={[
                    {
                      position: 'absolute',
                      top: 12,
                      right: 16,
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      backgroundColor: '#F8FAFC',
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 50,
                    },
                    closeButtonStyle,
                  ]}
                >
                  <X
                    size={closeIconSize}
                    color={closeIconColor}
                    strokeWidth={2}
                  />
                </TouchableOpacity>
              )}

              {/* CONTENT */}

              {data && renderItem ? (
                <NativeViewGestureHandler
                  ref={contentGestureRef}
                >
                  <FlatList
                    style={{
                      flex: 1,
                    }}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(
                      item,
                      index,
                    ) =>
                      item?.item_id
                        ?.toString() ||
                      item?.id?.toString() ||
                      item?._id?.toString() ||
                      index.toString()
                    }
                    nestedScrollEnabled
                    showsVerticalScrollIndicator={
                      false
                    }
                    keyboardShouldPersistTaps="handled"
                    scrollEventThrottle={16}
                    onScroll={
                      handleContentScroll
                    }
                    onScrollBeginDrag={
                      handleContentScrollBeginDrag
                    }
                    onScrollEndDrag={
                      handleContentScrollEndDrag
                    }
                    onMomentumScrollBegin={
                      handleContentMomentumBegin
                    }
                    onMomentumScrollEnd={
                      handleContentMomentumEnd
                    }
                    bounces={
                      !dragOnlyAtContentBottom
                    }
                    overScrollMode={
                      dragOnlyAtContentBottom
                        ? 'never'
                        : 'auto'
                    }
                    contentContainerStyle={[
                      {
                        paddingBottom:
                          (Platform.OS ===
                            'android'
                            ? 60
                            : 20) +
                          insets.bottom,

                        paddingHorizontal: 12,
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
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={
                      false
                    }
                    nestedScrollEnabled
                    scrollEventThrottle={16}
                    onScroll={
                      handleContentScroll
                    }
                    onScrollBeginDrag={
                      handleContentScrollBeginDrag
                    }
                    onScrollEndDrag={
                      handleContentScrollEndDrag
                    }
                    onMomentumScrollBegin={
                      handleContentMomentumBegin
                    }
                    onMomentumScrollEnd={
                      handleContentMomentumEnd
                    }
                    bounces={
                      !dragOnlyAtContentBottom
                    }
                    overScrollMode={
                      dragOnlyAtContentBottom
                        ? 'never'
                        : 'auto'
                    }
                    contentContainerStyle={[
                      {
                        paddingBottom:
                          (Platform.OS ===
                            'android'
                            ? 60
                            : 20) +
                          insets.bottom,

                        paddingHorizontal: 12,
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