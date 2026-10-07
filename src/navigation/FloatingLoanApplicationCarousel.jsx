import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Dimensions,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";

import MaterialIcons from "@react-native-vector-icons/material-icons";

import { theme } from "../theme";

const { width: SCREEN_WIDTH } =
  Dimensions.get("window");

const AUTO_SLIDE_TIME = 3000;

const HORIZONTAL_GAP = 16;

const CARD_WIDTH =
  SCREEN_WIDTH - HORIZONTAL_GAP * 2;

// =========================================================
// FORMAT AMOUNT
// =========================================================

const formatAmount = value => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "₹0";
  }

  return `₹${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
};

// =========================================================
// FORMAT DATE
// =========================================================

const formatSubmittedAt = value => {
  if (!value) {
    return "";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  const month = date.toLocaleString(
    "en-IN",
    {
      month: "short",
    }
  );

  const year = date.getFullYear();

  const hours = date.getHours();

  const minutes = String(
    date.getMinutes()
  ).padStart(2, "0");

  const suffix =
    hours >= 12 ? "pm" : "am";

  const displayHour =
    hours % 12 || 12;

  return `${day} ${month} ${year}, ${displayHour}:${minutes}${suffix}`;
};

// =========================================================
// NORMALIZE ITEM
// =========================================================

const normalizeItem = (
  item,
  index
) => ({
  id:
    item?.id ??
    item?.loanId ??
    item?.applicationId ??
    `loan-${index}`,

  title:
    item?.title ??
    item?.loanType ??
    item?.category ??
    "Personal Loan",

  amount:
    item?.amount ??
    item?.loanAmount ??
    item?.requestedAmount ??
    0,

  submittedAt:
    item?.submittedAt ??
    item?.createdAt ??
    item?.applicationDate ??
    null,

  status:
    item?.status ??
    "Loan Application Submitted",
});

// =========================================================
// COMPONENT
// =========================================================

export default function FloatingLoanApplicationCarousel({
  items = [],
  onContinue,
  autoSlideTime = AUTO_SLIDE_TIME,
}) {
  const listRef = useRef(null);

  const indexRef = useRef(0);

  // =======================================================
  // AUTO SLIDE TIMER
  // =======================================================

  const timerRef = useRef(null);

  // =======================================================
  // USER INTERACTION
  // =======================================================

  const isDraggingRef =
    useRef(false);

  const isMomentumRef =
    useRef(false);

  const isTouchingRef =
    useRef(false);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  // =======================================================
  // SOURCE DATA
  // =======================================================

  const sourceItems =
    items?.length > 0
      ? items
      : [];

  // =======================================================
  // NORMALIZE
  // =======================================================

  const normalizedItems =
    useMemo(
      () =>
        sourceItems
          .map(
            (
              item,
              index
            ) =>
              normalizeItem(
                item,
                index
              )
          )
          .filter(
            item =>
              item.id != null
          ),
      [sourceItems]
    );

  // =======================================================
  // STOP AUTO SLIDE
  // =======================================================

  const stopAutoSlide =
    useCallback(() => {
      if (timerRef.current) {
        clearTimeout(
          timerRef.current
        );

        timerRef.current = null;
      }
    }, []);

  // =======================================================
  // START AUTO SLIDE
  // =======================================================

  const startAutoSlide =
    useCallback(() => {
      stopAutoSlide();

      if (
        normalizedItems.length <=
        1
      ) {
        return;
      }

      // -----------------------------------------------
      // User abhi bhi interact kar raha hai
      // -----------------------------------------------

      if (
        isTouchingRef.current ||
        isDraggingRef.current ||
        isMomentumRef.current
      ) {
        return;
      }

      timerRef.current =
        setTimeout(() => {
          // ---------------------------------------------
          // Safety check
          // ---------------------------------------------

          if (
            isTouchingRef.current ||
            isDraggingRef.current ||
            isMomentumRef.current
          ) {
            return;
          }

          const nextIndex =
            (indexRef.current + 1) %
            normalizedItems.length;

          indexRef.current =
            nextIndex;

          setCurrentIndex(
            nextIndex
          );

          listRef.current?.scrollToOffset(
            {
              offset:
                nextIndex *
                SCREEN_WIDTH,

              animated: true,
            }
          );
        }, autoSlideTime);
    }, [
      normalizedItems.length,
      autoSlideTime,
      stopAutoSlide,
    ]);

  // =======================================================
  // DATA CHANGE / INITIAL START
  // =======================================================

  useEffect(() => {
    indexRef.current = 0;

    setCurrentIndex(0);

    stopAutoSlide();

    isTouchingRef.current =
      false;

    isDraggingRef.current =
      false;

    isMomentumRef.current =
      false;

    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset(
        {
          offset: 0,
          animated: false,
        }
      );

      startAutoSlide();
    });

    return () => {
      stopAutoSlide();
    };
  }, [
    normalizedItems.length,
    startAutoSlide,
    stopAutoSlide,
  ]);

  // =======================================================
  // FINAL CLEANUP
  // =======================================================

  useEffect(() => {
    return () => {
      stopAutoSlide();
    };
  }, [stopAutoSlide]);

  // =======================================================
  // USER TOUCH START
  // =======================================================

  const handleTouchStart =
    useCallback(() => {
      isTouchingRef.current =
        true;

      stopAutoSlide();
    }, [stopAutoSlide]);

  // =======================================================
  // USER STARTS DRAGGING
  // =======================================================

  const handleScrollBeginDrag =
    useCallback(() => {
      isDraggingRef.current =
        true;

      isTouchingRef.current =
        true;

      stopAutoSlide();
    }, [stopAutoSlide]);

  // =======================================================
  // MOMENTUM START
  // =======================================================

  const handleMomentumScrollBegin =
    useCallback(() => {
      isMomentumRef.current =
        true;

      stopAutoSlide();
    }, [stopAutoSlide]);

  // =======================================================
  // TOUCH END
  // =======================================================

  const handleTouchEnd =
    useCallback(() => {
      isTouchingRef.current =
        false;

      // -----------------------------------------------
      // Agar drag/momentum nahi hai,
      // to normal tap tha.
      // Timer restart karo.
      // -----------------------------------------------

      if (
        !isDraggingRef.current &&
        !isMomentumRef.current
      ) {
        startAutoSlide();
      }
    }, [startAutoSlide]);

  // =======================================================
  // SCROLL END
  // =======================================================

  const handleScrollEnd =
    useCallback(
      event => {
        const offset =
          event?.nativeEvent
            ?.contentOffset
            ?.x ?? 0;

        const nextIndex = Math.max(
          0,
          Math.min(
            normalizedItems.length -
            1,
            Math.round(
              offset /
              SCREEN_WIDTH
            )
          )
        );

        indexRef.current =
          nextIndex;

        setCurrentIndex(
          nextIndex
        );

        isDraggingRef.current =
          false;

        isMomentumRef.current =
          false;

        isTouchingRef.current =
          false;

        // -----------------------------------------------
        // User complete kar chuka hai.
        // Ab fresh 3 sec timer.
        // -----------------------------------------------

        startAutoSlide();
      },
      [
        normalizedItems.length,
        startAutoSlide,
      ]
    );

  // =======================================================
  // SCROLL END WITHOUT MOMENTUM
  // =======================================================

  const handleScrollEndDrag =
    useCallback(
      event => {
        const willDecelerate =
          event?.nativeEvent
            ?.willDecelerate;

        isDraggingRef.current =
          false;

        // -----------------------------------------------
        // Agar momentum nahi aana hai,
        // to yahi scrolling finish hai.
        // -----------------------------------------------

        if (!willDecelerate) {
          isMomentumRef.current =
            false;

          isTouchingRef.current =
            false;

          startAutoSlide();
        }
      },
      [startAutoSlide]
    );

  // =======================================================
  // EMPTY
  // =======================================================

  if (
    normalizedItems.length ===
    0
  ) {
    return null;
  }

  // =======================================================
  // UI
  // =======================================================

  return (
    <View
      style={{
        width: "100%",

        backgroundColor:
          "transparent",

        paddingTop: 4,

        paddingBottom: 4,

        overflow: "visible",
      }}
    >
      {/* ===================================================
          DOT INDICATOR
      =================================================== */}

      {normalizedItems.length >
        1 && (
          <View
            pointerEvents="none"
            style={{
              width: "100%",

              height: 6,

              flexDirection: "row",

              alignItems: "center",

              justifyContent: "center",

              gap: 5,

              marginBottom: 5,
            }}
          >
            {normalizedItems.map(
              (item, index) => (
                <View
                  key={`${item.id}-${index}`}
                  style={{
                    width:
                      index ===
                        currentIndex
                        ? 20
                        : 5,

                    height: 4,

                    borderRadius: 999,

                    backgroundColor:
                      index ===
                        currentIndex
                        ? theme.colors
                          .primary500
                        : theme.colors
                          .gray300,
                  }}
                />
              )
            )}
          </View>
        )}

      {/* ===================================================
          HORIZONTAL CAROUSEL
      =================================================== */}

      <FlatList
        ref={listRef}
        data={normalizedItems}
        horizontal

        scrollEnabled={
          normalizedItems.length >
          1
        }

        showsHorizontalScrollIndicator={
          false
        }

        bounces={false}

        overScrollMode="never"

        style={{
          width: "100%",

          backgroundColor:
            "transparent",
        }}

        contentContainerStyle={{
          paddingHorizontal: 0,
        }}

        keyExtractor={(
          item,
          index
        ) =>
          `${item.id}-${index}`
        }

        snapToInterval={
          SCREEN_WIDTH
        }

        snapToAlignment="start"

        decelerationRate="fast"

        disableIntervalMomentum

        getItemLayout={(
          _,
          index
        ) => ({
          length:
            SCREEN_WIDTH,

          offset:
            SCREEN_WIDTH * index,

          index,
        })}

        // ==================================================
        // USER TOUCH
        // ==================================================

        onTouchStart={
          handleTouchStart
        }

        onTouchEnd={
          handleTouchEnd
        }

        // ==================================================
        // USER DRAG
        // ==================================================

        onScrollBeginDrag={
          handleScrollBeginDrag
        }

        onScrollEndDrag={
          handleScrollEndDrag
        }

        // ==================================================
        // MOMENTUM
        // ==================================================

        onMomentumScrollBegin={
          handleMomentumScrollBegin
        }

        onMomentumScrollEnd={
          handleScrollEnd
        }

        // ==================================================
        // RENDER
        // ==================================================

        renderItem={({ item }) => (
          <View
            style={{
              width:
                SCREEN_WIDTH,

              backgroundColor:
                "transparent",
            }}
          >
            <LoanApplicationCard
              item={item}
              onContinue={
                onContinue
              }
            />
          </View>
        )}
      />
    </View>
  );
}

// =========================================================
// APPLICATION CARD
// =========================================================

function LoanApplicationCard({
  item,
  onContinue,
}) {
  const handleContinue =
    () => {
      if (
        typeof onContinue ===
        "function"
      ) {
        onContinue(item);
      }
    };

  return (
    <View
      style={{
        width: CARD_WIDTH,

        marginLeft:
          HORIZONTAL_GAP,

        marginRight:
          HORIZONTAL_GAP,

        minHeight: 74,

        borderRadius: 15,

        borderWidth: 1.4,

        borderColor:
          theme.colors.primary500,

        backgroundColor:
          theme.colors.white,

        paddingHorizontal: 10,

        paddingVertical: 9,

        flexDirection: "row",

        alignItems: "center",

        justifyContent:
          "space-between",

        shadowColor:
          "#000000",

        shadowOffset: {
          width: 0,

          height: 4,
        },

        shadowOpacity: 0.12,

        shadowRadius: 8,

        elevation: 5,
      }}
    >
      {/* =================================================
          LEFT SECTION
      ================================================= */}

      <View
        style={{
          flex: 1,

          minWidth: 0,

          flexDirection: "row",

          alignItems: "center",

          paddingRight: 8,
        }}
      >
        {/* =================================================
            ICON
        ================================================= */}

        <View
          style={{
            width: 48,

            height: 48,

            borderRadius: 12,

            backgroundColor:
              theme.colors.primary50,

            alignItems: "center",

            justifyContent: "center",

            flexShrink: 0,
          }}
        >
          <MaterialIcons
            name="account-balance-wallet"
            size={22}
            color={
              theme.colors
                .primary500
            }
          />
        </View>

        {/* =================================================
            TEXT
        ================================================= */}

        <View
          style={{
            flex: 1,

            minWidth: 0,

            marginLeft: 11,
          }}
        >
          <Text
            numberOfLines={1}
            style={{
              color:
                theme.colors.navy900,

              fontSize: 12,

              lineHeight: 17,

              fontFamily:
                theme.fonts
                  .extraBold,
            }}
          >
            {item.title}
          </Text>

          <Text
            numberOfLines={1}
            style={{
              color:
                theme.colors.navy900,

              fontSize: 10.5,

              lineHeight: 14,

              marginTop: 1,

              fontFamily:
                theme.fonts
                  .semiBold,
            }}
          >
            {item.status} for{" "}
            {formatAmount(
              item.amount
            )}
          </Text>

          {!!item.submittedAt && (
            <Text
              numberOfLines={1}
              style={{
                color:
                  theme.colors
                    .gray500,

                fontSize: 9.5,

                lineHeight: 13,

                marginTop: 1,

                fontFamily:
                  theme.fonts
                    .semiBold,
              }}
            >
              {formatSubmittedAt(
                item.submittedAt
              )}
            </Text>
          )}
        </View>
      </View>

      {/* =================================================
          CONTINUE
      ================================================= */}

      <Pressable
        onPress={
          handleContinue
        }
        disabled={
          typeof onContinue !==
          "function"
        }
        android_ripple={{
          color:
            "rgba(255,255,255,0.16)",
        }}
        style={({ pressed }) => ({
          borderRadius: 999,

          backgroundColor:
            theme.colors.success,

          flexDirection: "row",

          alignItems: "center",

          justifyContent: "center",

          flexShrink: 0,

          padding: 8,

          opacity: pressed
            ? 0.82
            : 1,
        })}
      >
        <Text
          style={{
            includeFontPadding:
              false,

            color:
              theme.colors.white,

            fontSize: 10,

            fontFamily:
              theme.fonts.bold,
          }}
        >
          Continue
        </Text>

        <MaterialIcons
          name="arrow-forward"
          size={12}
          color={
            theme.colors.white
          }
          style={{
            marginLeft: 5,
          }}
        />
      </Pressable>
    </View>
  );
}