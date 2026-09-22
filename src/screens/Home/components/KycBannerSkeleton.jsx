import React, { memo } from "react";

import {
  View,
  StyleSheet,
} from "react-native";

import { theme } from "../../../theme";

import ShimmerPlaceholder from "../../../components/common/Loader/ShimmerPlaceholder.jsx";

const KycBannerSkeleton = () => {
  return (
    <View style={styles.container}>

      {/* ==========================================
          LEFT CONTENT
      ========================================== */}

      <View style={styles.content}>

        {/* Clock + Takes text */}
        <View style={styles.topRow}>

          <ShimmerPlaceholder
            width={24}
            height={24}
            borderRadius={12}
            style={styles.clock}
          />

          <ShimmerPlaceholder
            width={105}
            height={12}
            borderRadius={6}
          />

        </View>

        {/* Title */}
        <ShimmerPlaceholder
          width="85%"
          height={20}
          borderRadius={6}
          style={styles.title}
        />

        {/* Subtitle */}
        <ShimmerPlaceholder
          width="92%"
          height={11}
          borderRadius={6}
          style={styles.subtitle}
        />

        {/* Button */}
        <ShimmerPlaceholder
          width={126}
          height={36}
          borderRadius={8}
          style={styles.button}
        />

      </View>

      {/* ==========================================
          RIGHT ILLUSTRATION
      ========================================== */}

      <View style={styles.illustration}>

        {/* Person / main object */}
        <ShimmerPlaceholder
          width={52}
          height={70}
          borderRadius={12}
        />

        {/* Head */}
        <ShimmerPlaceholder
          width={16}
          height={16}
          borderRadius={8}
          style={styles.head}
        />

        {/* Document */}
        <ShimmerPlaceholder
          width={30}
          height={42}
          borderRadius={4}
          style={styles.document}
        />

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 145,

    borderRadius: theme.radius.lg,

    overflow: "hidden",

    backgroundColor: theme.colors.navy900,

    position: "relative",
  },

  content: {
    flex: 1,

    paddingLeft: theme.spacing.lg,
    paddingTop: 18,

    paddingRight: 95,
  },

  topRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,
  },

  clock: {
    backgroundColor: "#263D48",
  },

  title: {
    marginTop: 9,

    backgroundColor: "#263D48",
  },

  subtitle: {
    marginTop: 8,

    backgroundColor: "#263D48",
  },

  button: {
    marginTop: 12,

    backgroundColor: "#263D48",
  },

  illustration: {
    position: "absolute",

    right: 18,
    bottom: 10,

    width: 72,
    height: 90,

    justifyContent: "center",
    alignItems: "center",
  },

  head: {
    position: "absolute",

    top: 0,
    left: 28,

    backgroundColor: "#263D48",
  },

  document: {
    position: "absolute",

    right: 0,
    top: 18,

    backgroundColor: "#263D48",
  },
});

export default memo(KycBannerSkeleton);