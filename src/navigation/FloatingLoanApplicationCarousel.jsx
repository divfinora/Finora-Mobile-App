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


/* =========================================================
   CONSTANTS
========================================================= */

const { width: SCREEN_WIDTH } =
  Dimensions.get("window");

const AUTO_SLIDE_TIME = 3000;

const HORIZONTAL_GAP = 16;

const CARD_WIDTH =
  SCREEN_WIDTH - HORIZONTAL_GAP * 2;


/* =========================================================
   TEMPORARY FAKE DATA
   API connect hone tak use hoga
========================================================= */

const FAKE_LOAN_APPLICATIONS = [
  {
    id: "loan-001",
    title: "Personal Loan",
    amount: 50000,
    status: "Loan Application Submitted",
    submittedAt: "2026-09-18T23:30:00",
  },
  {
    id: "loan-002",
    title: "Gold Loan",
    amount: 75000,
    status: "Loan Application Submitted",
    submittedAt: "2026-09-19T18:45:00",
  },
  {
    id: "loan-003",
    title: "Home Loan",
    amount: 250000,
    status: "Loan Application Submitted",
    submittedAt: "2026-09-20T12:15:00",
  },
];


/* =========================================================
   FORMAT AMOUNT
========================================================= */

const formatAmount = value => {
  const amount = Number(value);

  if (!Number.isFinite(amount)) {
    return "₹0";
  }

  return `₹${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
};


/* =========================================================
   FORMAT DATE
========================================================= */

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


/* =========================================================
   NORMALIZE ITEM
========================================================= */

const normalizeItem = item => ({
  id:
    item?.id ??
    item?.loanId ??
    item?.applicationId,

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


/* =========================================================
   COMPONENT
========================================================= */

export default function FloatingLoanApplicationCarousel({
  items = [],
  onContinue,
  autoSlideTime = AUTO_SLIDE_TIME,
}) {
  const listRef = useRef(null);

  const indexRef = useRef(0);

  const [currentIndex, setCurrentIndex] =
    useState(0);


  /* =======================================================
     USE API DATA WHEN AVAILABLE,
     OTHERWISE TEMPORARY FAKE DATA
  ======================================================= */

  const sourceItems =
    items?.length > 0
      ? items
      : FAKE_LOAN_APPLICATIONS;


  /* =======================================================
     NORMALIZE
  ======================================================= */

  const normalizedItems =
    useMemo(
      () =>
        sourceItems
          .map(normalizeItem)
          .filter(
            item =>
              item.id != null
          ),
      [sourceItems]
    );


  /* =======================================================
     AUTO SCROLL
  ======================================================= */

  const scrollToIndex =
    useCallback(
      index => {
        if (
          normalizedItems.length <= 1
        ) {
          return;
        }

        const safeIndex =
          (
            (
              index %
              normalizedItems.length
            ) +
            normalizedItems.length
          ) %
          normalizedItems.length;

        indexRef.current =
          safeIndex;

        setCurrentIndex(
          safeIndex
        );

        listRef.current?.scrollToOffset({
          /*
           * One slide = full screen width.
           * Card itself has 16px left/right margin.
           */
          offset:
            safeIndex *
            SCREEN_WIDTH,

          animated: true,
        });
      },
      [normalizedItems.length]
    );


  /* =======================================================
     RESET
  ======================================================= */

  useEffect(() => {
    indexRef.current = 0;

    setCurrentIndex(0);

    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({
        offset: 0,
        animated: false,
      });
    });
  }, [normalizedItems.length]);


  /* =======================================================
     AUTO SLIDE
  ======================================================= */

  useEffect(() => {
    if (
      normalizedItems.length <= 1
    ) {
      return undefined;
    }

    const timer =
      setInterval(() => {
        scrollToIndex(
          indexRef.current + 1
        );
      }, autoSlideTime);

    return () => {
      clearInterval(timer);
    };
  }, [
    autoSlideTime,
    normalizedItems.length,
    scrollToIndex,
  ]);


  /* =======================================================
     EMPTY
  ======================================================= */

  if (
    normalizedItems.length === 0
  ) {
    return null;
  }


  /* =======================================================
     UI

     IMPORTANT:
     Entire carousel area is transparent.
     No white/gray background behind the card.
  ======================================================= */

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: "transparent",
        paddingTop: 4,
        paddingBottom: 4,
        overflow: "visible",
      }}
    >

      {/* ===================================================
          DOT INDICATOR
      =================================================== */}

      {normalizedItems.length > 1 && (
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
                key={String(item.id)}
                style={{
                  width:
                    index === currentIndex
                      ? 20
                      : 5,
                  height: 4,
                  borderRadius: 999,
                  backgroundColor:
                    index === currentIndex
                      ? theme.colors.primary500
                      : theme.colors.gray300,
                }}
              />
            )
          )}
        </View>
      )}


      {/* ===================================================
          HORIZONTAL CAROUSEL

          Each slide = full screen width.
          Card = screen width - 32px.
          Therefore exact 16px left/right margin.
      =================================================== */}

      <FlatList
        ref={listRef}
        data={normalizedItems}
        horizontal

        scrollEnabled={
          normalizedItems.length > 1
        }

        showsHorizontalScrollIndicator={false}

        bounces={false}

        overScrollMode="never"

        style={{
          width: "100%",
          backgroundColor: "transparent",
        }}

        contentContainerStyle={{
          paddingHorizontal: 0,
        }}

        keyExtractor={item =>
          String(item.id)
        }

        snapToInterval={SCREEN_WIDTH}

        snapToAlignment="start"

        decelerationRate="fast"

        disableIntervalMomentum

        getItemLayout={(_, index) => ({
          length: SCREEN_WIDTH,
          offset:
            SCREEN_WIDTH * index,
          index,
        })}

        onMomentumScrollEnd={event => {
          const offset =
            event?.nativeEvent
              ?.contentOffset
              ?.x ?? 0;

          const nextIndex =
            Math.round(
              offset /
              SCREEN_WIDTH
            );

          indexRef.current =
            nextIndex;

          setCurrentIndex(
            nextIndex
          );
        }}

        renderItem={({ item }) => (
          <View
            style={{
              width: SCREEN_WIDTH,
              backgroundColor:
                "transparent",
            }}
          >
            <LoanApplicationCard
              item={item}
              onContinue={onContinue}
            />
          </View>
        )}
      />
    </View>
  );
}


/* =========================================================
   APPLICATION CARD
========================================================= */

function LoanApplicationCard({
  item,
  onContinue,
}) {
  const handleContinue = () => {
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
        width:
          CARD_WIDTH,

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
              theme.colors.primary500
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
                theme.fonts.extraBold,
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
                theme.fonts.semiBold,
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
                  theme.colors.gray500,

                fontSize: 9.5,

                lineHeight: 13,

                marginTop: 1,

                fontFamily:
                  theme.fonts.semiBold,
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
          // minWidth: 88,


          // height: 42,

          borderRadius: 999,

          backgroundColor:
            theme.colors.success,

          // paddingHorizontal: 12,
      //  paddingTop:10,
      //  paddingBottom:12,

          flexDirection: "row",

          alignItems: "center",

          justifyContent: "center",

          flexShrink: 0,
padding:8,
          opacity:
            pressed
              ? 0.82
              : 1,
        })}
      >
        <Text
        
          style={{
    includeFontPadding: false,
            color:
              theme.colors.white,

            fontSize:
               10 ,
               

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
