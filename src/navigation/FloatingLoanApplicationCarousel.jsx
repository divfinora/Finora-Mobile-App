import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { theme } from "../theme";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const AUTO_SLIDE_TIME = 3000;
const HORIZONTAL_GAP = 16;
const CARD_WIDTH = SCREEN_WIDTH - HORIZONTAL_GAP * 2;

const formatAmount = value => {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "₹0";

  return `₹${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  })}`;
};

const formatSubmittedAt = value => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  const day = String(date.getDate()).padStart(2, "0");
  const month = date.toLocaleString("en-IN", { month: "short" });
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const suffix = hours >= 12 ? "pm" : "am";
  const displayHour = hours % 12 || 12;

  return `${day} ${month} ${year}, ${displayHour}:${minutes}${suffix}`;
};

const normalizeItem = item => ({
  id: item?.id ?? item?.loanId ?? item?.applicationId,
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
  status: item?.status ?? "Application Submitted",
});

export default function FloatingLoanApplicationCarousel({
  items = [],
  onContinue,
  autoSlideTime = AUTO_SLIDE_TIME,
}) {
  const listRef = useRef(null);
  const indexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const normalizedItems = useMemo(
    () => items.map(normalizeItem).filter(item => item.id != null),
    [items]
  );

  const scrollToIndex = useCallback(index => {
    if (!normalizedItems.length) return;

    const safeIndex =
      ((index % normalizedItems.length) + normalizedItems.length) %
      normalizedItems.length;

    indexRef.current = safeIndex;
    setCurrentIndex(safeIndex);

    listRef.current?.scrollToOffset({
      offset: safeIndex * CARD_WIDTH,
      animated: true,
    });
  }, [normalizedItems.length]);

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

  useEffect(() => {
    if (normalizedItems.length <= 1) return undefined;

    const timer = setInterval(() => {
      scrollToIndex(indexRef.current + 1);
    }, autoSlideTime);

    return () => clearInterval(timer);
  }, [autoSlideTime, normalizedItems.length, scrollToIndex]);

  if (!normalizedItems.length) {
    return null;
  }

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.carouselRoot,
        {
          bottom: 40 + 80 + 26,
        },
      ]}
    >
      <FlatList
        ref={listRef}
        data={normalizedItems}
        horizontal
        scrollEnabled={normalizedItems.length > 1}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        keyExtractor={item => String(item.id)}
        snapToInterval={CARD_WIDTH}
        decelerationRate="fast"
        disableIntervalMomentum
        getItemLayout={(_, index) => ({
          length: CARD_WIDTH,
          offset: CARD_WIDTH * index,
          index,
        })}
        onMomentumScrollEnd={event => {
          const offset = event?.nativeEvent?.contentOffset?.x ?? 0;
          const nextIndex = Math.round(offset / CARD_WIDTH);
          indexRef.current = nextIndex;
          setCurrentIndex(nextIndex);
        }}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <LoanApplicationCard
              item={item}
              onContinue={onContinue}
            />
          </View>
        )}
      />

      {normalizedItems.length > 1 ? (
        <View style={styles.dots} pointerEvents="none">
          {normalizedItems.map((item, index) => (
            <View
              key={String(item.id)}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

function LoanApplicationCard({ item, onContinue }) {
  const handleContinue = () => {
    if (onContinue) {
      onContinue(item);
      return;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View style={styles.loanIconBox}>
          <MaterialIcons
            name="account-balance-wallet"
            size={22}
            color={theme.colors.primary500}
          />
        </View>

        <View style={styles.textSection}>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>

          <Text style={styles.status} numberOfLines={1}>
            {item.status} for {formatAmount(item.amount)}
          </Text>

          {!!item.submittedAt && (
            <Text style={styles.date} numberOfLines={1}>
              {formatSubmittedAt(item.submittedAt)}
            </Text>
          )}
        </View>
      </View>

      <Pressable
        onPress={handleContinue}
        disabled={!onContinue}
        android_ripple={{
          color: "rgba(255,255,255,0.18)",
          borderless: false,
        }}
        style={({ pressed }) => [
          styles.continueButton,
          pressed && styles.continueButtonPressed,
        ]}
      >
        <Text style={styles.continueText}>Continue</Text>
        <MaterialIcons
          name="arrow-forward"
          size={18}
          color={theme.colors.white}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  carouselRoot: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 80,
    zIndex: theme.zIndex.bottomSheet,
    elevation: theme.zIndex.bottomSheet,
  },

  listContent: {
    paddingHorizontal: HORIZONTAL_GAP,
  },

  slide: {
    width: CARD_WIDTH,
    justifyContent: "center",
  },

  card: {
    minHeight: 74,
    width: "100%",
    borderRadius: 15,
    borderWidth: 1.4,
    borderColor: theme.colors.primary500,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 10,
    paddingVertical: 9,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...theme.shadows.md,
  },

  leftSection: {
    flex: 1,
    minWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 8,
  },

  loanIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: theme.colors.primary50,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  textSection: {
    flex: 1,
    minWidth: 0,
    marginLeft: 11,
  },

  title: {
    color: theme.colors.navy900,
    fontSize: 13,
    lineHeight: 17,
    fontFamily: theme.fonts.semiBold,
  },

  status: {
    color: theme.colors.navy900,
    fontSize: 10.5,
    lineHeight: 14,
    marginTop: 1,
    fontFamily: theme.fonts.medium,
  },

  date: {
    color: theme.colors.gray500,
    fontSize: 9.5,
    lineHeight: 13,
    marginTop: 1,
    fontFamily: theme.fonts.regular,
  },

  continueButton: {
    minWidth: 88,
    height: 42,
    borderRadius: 999,
    backgroundColor: theme.colors.success,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    flexShrink: 0,
  },

  continueButtonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },

  continueText: {
    color: theme.colors.white,
    fontSize: 11.5,
    fontFamily: theme.fonts.bold,
  },

  dots: {
    position: "absolute",
    top: 2,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 999,
    backgroundColor: theme.colors.gray300,
  },

  activeDot: {
    width: 14,
    backgroundColor: theme.colors.primary500,
  },
});
