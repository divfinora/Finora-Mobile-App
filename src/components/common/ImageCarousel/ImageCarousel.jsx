import React, {
  memo,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  FlatList,
  Image,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import { theme } from "../../../theme";

const ImageCarousel = ({
  data = [],
  height = theme.image.bannerHeight,
  autoScrollTime = 3000,
  resizeMode = "cover",
  onPressItem = () => {},
  showPagination = true,
}) => {
  const listRef = useRef(null);

  // =====================================================
  // TIMER
  // =====================================================

  const timerRef = useRef(null);

  // =====================================================
  // ACTIVE INDEX
  // =====================================================

  const activeIndexRef = useRef(0);

  // =====================================================
  // USER INTERACTION
  // =====================================================

  const isPressedRef = useRef(false);

  const isDraggingRef = useRef(false);

  const {
    width: screenWidth,
  } = useWindowDimensions();

  const [activeIndex, setActiveIndex] =
    useState(0);

  // =====================================================
  // INITIAL WIDTH
  // =====================================================

  const [carouselWidth, setCarouselWidth] =
    useState(screenWidth);

  // =====================================================
  // STOP AUTO SCROLL
  // =====================================================

  const stopAutoPlay = () => {
    if (timerRef.current) {
      clearInterval(
        timerRef.current
      );

      timerRef.current = null;
    }
  };

  // =====================================================
  // START AUTO SCROLL
  // =====================================================

  const startAutoPlay = () => {
    stopAutoPlay();

    if (
      data.length <= 1 ||
      carouselWidth <= 0
    ) {
      return;
    }

    // User interacting hai to timer mat start karo
    if (
      isPressedRef.current ||
      isDraggingRef.current
    ) {
      return;
    }

    timerRef.current = setInterval(() => {
      // -----------------------------------------------
      // Safety check
      // -----------------------------------------------

      if (
        isPressedRef.current ||
        isDraggingRef.current
      ) {
        return;
      }

      const next =
        (activeIndexRef.current + 1) %
        data.length;

      activeIndexRef.current = next;

      setActiveIndex(next);

      listRef.current?.scrollToIndex({
        index: next,
        animated: true,
      });
    }, autoScrollTime);
  };

  // =====================================================
  // AUTO PLAY
  // =====================================================

  useEffect(() => {
    startAutoPlay();

    return () => {
      stopAutoPlay();
    };
  }, [
    carouselWidth,
    data.length,
    autoScrollTime,
  ]);

  // =====================================================
  // SCREEN WIDTH CHANGE
  // =====================================================

  useEffect(() => {
    if (screenWidth > 0) {
      setCarouselWidth(screenWidth);
    }
  }, [screenWidth]);

  // =====================================================
  // PRESS START
  // =====================================================

  const handlePressIn = () => {
    isPressedRef.current = true;

    stopAutoPlay();
  };

  // =====================================================
  // PRESS END
  // =====================================================

  const handlePressOut = () => {
    isPressedRef.current = false;

    // Agar user swipe nahi kar raha hai
    // tabhi timer yahin restart karo
    if (!isDraggingRef.current) {
      startAutoPlay();
    }
  };

  // =====================================================
  // SCROLL START
  // =====================================================

  const handleScrollBeginDrag = () => {
    isDraggingRef.current = true;

    stopAutoPlay();
  };

  // =====================================================
  // MANUAL SCROLL END
  // =====================================================

  const handleScrollEnd = (event) => {
    if (!carouselWidth) {
      return;
    }

    const offsetX =
      event.nativeEvent.contentOffset.x;

    const index = Math.round(
      offsetX / carouselWidth
    );

    if (
      index >= 0 &&
      index < data.length
    ) {
      activeIndexRef.current = index;

      setActiveIndex(index);
    }

    // -----------------------------------------------
    // User swipe complete
    // -----------------------------------------------

    isDraggingRef.current = false;

    // Fresh timer start
    startAutoPlay();
  };

  // =====================================================
  // RENDER ITEM
  // =====================================================

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          width: carouselWidth,

          padding:
            theme.spacing.md,

          paddingBottom: 0,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.9}

          // ==========================================
          // PRESS START
          // ==========================================

          onPressIn={
            handlePressIn
          }

          // ==========================================
          // PRESS END
          // ==========================================

          onPressOut={
            handlePressOut
          }

          onPress={() =>
            onPressItem(item)
          }

          style={{
            width: "100%",

            height: height,

            overflow: "hidden",

            borderRadius: 16,
          }}
        >
          <Image
            source={item?.bannerImage}
            resizeMode={resizeMode}
            fadeDuration={0}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // =====================================================
  // EMPTY STATE
  // =====================================================

  if (!data.length) {
    return null;
  }

  return (
    <LinearGradient
      colors={[
        "#184735",
        "#297A5B",
        "#184735",
      ]}
      locations={[
        0,
        0.5,
        1,
      ]}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 0,
        y: 1,
      }}
      style={{
        width: "100%",
      }}
    >
      {/* =================================================
          CAROUSEL
      ================================================= */}

      <View
        onLayout={(event) => {
          const width =
            event.nativeEvent.layout.width;

          if (
            width > 0 &&
            width !== carouselWidth
          ) {
            setCarouselWidth(width);
          }
        }}
        style={{
          width: "100%",
        }}
      >
        <FlatList
          ref={listRef}

          data={data}

          renderItem={
            renderItem
          }

          keyExtractor={(
            item,
            index
          ) =>
            item?.id?.toString() ||
            index.toString()
          }

          horizontal

          pagingEnabled

          showsHorizontalScrollIndicator={
            false
          }

          // ==========================================
          // USER STARTS SWIPING
          // ==========================================

          onScrollBeginDrag={
            handleScrollBeginDrag
          }

          // ==========================================
          // USER FINISHES SWIPING
          // ==========================================

          onMomentumScrollEnd={
            handleScrollEnd
          }

          scrollEventThrottle={16}

          decelerationRate="fast"

          // =================================================
          // INITIAL RENDER
          // =================================================

          initialNumToRender={3}

          maxToRenderPerBatch={3}

          windowSize={5}

          getItemLayout={(
            _,
            index
          ) => ({
            length:
              carouselWidth,

            offset:
              carouselWidth * index,

            index,
          })}
        />
      </View>

      {/* =================================================
          PAGINATION
      ================================================= */}

      {showPagination &&
        data.length > 1 && (
          <View
            style={{
              height: 32,

              flexDirection: "row",

              alignItems: "center",

              justifyContent: "center",

              gap:
                theme.spacing.xs,

              paddingBottom: 2,
            }}
          >
            {data.map(
              (item, index) => (
                <View
                  key={
                    item?.id?.toString() ||
                    index.toString()
                  }
                  style={{
                    width:
                      index ===
                      activeIndex
                        ? 20
                        : 5,

                    height: 5,

                    borderRadius:
                      theme.radius
                        .circle,

                    backgroundColor:
                      index ===
                      activeIndex
                        ? "#A6D7C1"
                        : "#D5E7DE",
                  }}
                />
              )
            )}
          </View>
        )}
    </LinearGradient>
  );
};

export default memo(
  ImageCarousel
);