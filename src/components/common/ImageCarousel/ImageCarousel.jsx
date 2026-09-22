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
} from "react-native";

import { theme } from "../../../theme";

const ImageCarousel = ({
    data = [],
    height = theme.image.bannerHeight,
    autoScrollTime = 3000,
    resizeMode = "cover",
    onPressItem = () => { },
    showPagination = true,
}) => {
    const listRef = useRef(null);

    const timerRef = useRef(null);

    const activeIndexRef = useRef(0);

    const [activeIndex, setActiveIndex] =
        useState(0);

    const [carouselWidth, setCarouselWidth] =
        useState(0);

    // ==========================================
    // STOP AUTO SCROLL
    // ==========================================

    const stopAutoPlay = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);

            timerRef.current = null;
        }
    };

    // ==========================================
    // START AUTO SCROLL
    // ==========================================

    const startAutoPlay = () => {
        stopAutoPlay();

        if (
            data.length <= 1 ||
            carouselWidth <= 0
        ) {
            return;
        }

        timerRef.current = setInterval(() => {
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

    // ==========================================
    // START AUTO PLAY
    // ==========================================

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

    // ==========================================
    // HANDLE MANUAL SCROLL
    // ==========================================

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

        // Restart auto scroll
        startAutoPlay();
    };

    // ==========================================
    // RENDER ITEM
    // ==========================================

    const renderItem = ({
        item,
    }) => {
        return (
            <View
                style={{
                    width: carouselWidth,
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                        onPressItem(item)
                    }
                    style={{
                        width: "100%",

                        height,





                        overflow: "hidden",
                    }}
                >
                    <Image

                        source={item?.bannerImage}
                        resizeMode={resizeMode}
                        style={{
                            borderWidth:1,
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    // ==========================================
    // EMPTY STATE
    // ==========================================

    if (!data.length) {
        return null;
    }

    return (
        <View
            onLayout={(event) => {
                const width =
                    event.nativeEvent.layout.width;

                setCarouselWidth(width);
            }}
            style={{
                width: "100%",
                position: "relative",
              

            }}
        >
            {/* ======================================
          CAROUSEL
      ====================================== */}

            {carouselWidth > 0 && (
                <FlatList
                    ref={listRef}

                    data={data}

                    renderItem={renderItem}

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

                    onScrollBeginDrag={
                        stopAutoPlay
                    }

                    onMomentumScrollEnd={
                        handleScrollEnd
                    }

                    scrollEventThrottle={16}

                    decelerationRate="fast"

                    getItemLayout={(
                        _,
                        index
                    ) => ({
                        length: carouselWidth,

                        offset:
                            carouselWidth * index,

                        index,
                    })}
                />
            )}

            {/* ======================================
          PAGINATION
      ====================================== */}

            {/* ======================================
    PAGINATION
====================================== */}

            {showPagination &&
                data.length > 1 && (
                    <View
                        style={{
                            position: "absolute",

                            bottom: theme.spacing.md,

                            left: 0,
                            right: 0,

                            flexDirection: "row",

                            alignItems: "center",

                            justifyContent: "center",

                            gap: theme.spacing.xs,
                        }}
                    >
                        {data.map((item, index) => (
                            <View
                                key={
                                    item?.id?.toString() ||
                                    index.toString()
                                }
                                style={{
                                    width:
                                        index === activeIndex
                                            ? 20
                                            : 5,

                                    height: 5,

                                    borderRadius:
                                        theme.radius.circle,

                                    backgroundColor:
                                        index === activeIndex
                                            ? theme.colors.primary500
                                            : theme.colors.gray300,
                                }}
                            />
                        ))}
                    </View>
                )}
        </View>
    );
};

export default memo(
    ImageCarousel
);