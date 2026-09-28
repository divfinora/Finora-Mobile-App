import React, { useMemo } from "react";
import {
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import LinearGradient from "react-native-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { theme } from "../theme";
import FloatingLoanApplicationCarousel from "./FloatingLoanApplicationCarousel.jsx";

const ICON_BY_ROUTE = {
  Home: "home",
  Loan: "donut-large",
  History: "credit-card",
  Profile: "person-outline",
  "G.scheme": "account-balance-wallet",
  "Government Scheme": "account-balance-wallet",
  "Government Schemes": "account-balance-wallet",
};

const getIconName = routeName => {
  if (ICON_BY_ROUTE[routeName]) {
    return ICON_BY_ROUTE[routeName];
  }

  const normalized = String(routeName || "").toLowerCase();

  if (normalized.includes("home")) return "home";
  if (normalized.includes("loan")) return "donut-large";
  if (normalized.includes("history")) return "credit-card";
  if (normalized.includes("scheme")) return "account-balance-wallet";
  if (normalized.includes("profile")) return "person-outline";

  return "circle";
};

export default function FinsaarthiCustomTabBar({
  state,
  navigation,
  loanApplications = [],
  onLoanApplicationPress,
}) {
  const insets = useSafeAreaInsets();
  const routes = state?.routes ?? [];

  const tabWidth = useMemo(() => {
    const count = Math.max(routes.length, 1);
    return `${100 / count}%`;
  }, [routes.length]);

  const handleTabPress = route => {
    const index = routes.findIndex(item => item.key === route.key);

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented && state.index !== index) {
      navigation.navigate(route.name);
    }
  };

  return (
    <View
      pointerEvents="box-none"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: theme.zIndex.floatingButton,
        elevation: theme.zIndex.floatingButton,
      }}
    >
      {/* Floating application carousel stays above the tab bar */}
      <FloatingLoanApplicationCarousel
        items={loanApplications}
        onContinue={onLoanApplicationPress}
      />

      {/* White bottom area behind the floating black tab */}
      <View
        style={{
          width: "100%",
          backgroundColor: theme.colors.white,
          paddingTop: 10,
          paddingHorizontal: 16,
          paddingBottom: Math.max(insets.bottom, 8),
        }}
      >
 

         
        {/* BLACK FLOATING TAB */}
 <LinearGradient
  colors={[
    "#101010cf",
    "#171717c9",
    "#1f1f1fcd",
    "#242424c5"
  ]}
  locations={[
    0,
    0.35,
    0.70,
    1,
  ]}
  start={{
    x: 0.5,
    y: 0,
  }}
  end={{
    x: 0.5,
    y: 1,
  }}
  style={{
    width: "100%",
    height: 80,
    borderRadius: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
       paddingHorizontal: 6,
    overflow: "hidden",
    position: "relative",
  }}
>



  <Image
    source={require("./assets/bottom-tab-noise.png")}
    resizeMode="cover" 
 
    pointerEvents="none"
    style={{
      borderWidth:1,
      zIndex:-1,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "160%",
      height: "100%",
       borderRadius: 24,
    }}
  />
  {/* ================================================
      SECOND FIGMA GRADIENT
      rgba(208,208,208,0.2) -> transparent
  ================================================= */}

  <LinearGradient
    pointerEvents="none"
    colors={[
      "rgba(208,208,208,0.20)",
      "rgba(208,208,208,0.10)",
      "rgba(255,255,255,0)",
    ]}
    locations={[
      0,
      0.45,
      1,
    ]}
    start={{
      x: 1,
      y: 1,
    }}
    end={{
      x: 0,
      y: 0,
    }}
    style={{
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      borderRadius: 24,
    }}
  />

  {/* ================================================
      SUBTLE TOP INSET HIGHLIGHT
  ================================================= */}

  <View
    pointerEvents="none"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: 1,
      backgroundColor: "rgba(255,255,255,0.60)",
    }}
  />

  {/* ================================================
      SECOND INSET HIGHLIGHT
  ================================================= */}

  <View
    pointerEvents="none"
    style={{
      position: "absolute",
      top: 1,
      left: 0,
      right: 0,
      height: 1,
      backgroundColor: "rgba(255,255,255,0.30)",
    }}
  />


  {/* ================================================
      TABS
  ================================================= */}

  {routes.map((route, index) => {
    const isFocused =
      state.index === index;

    const iconName =
      getIconName(route.name);

    return (
      <Pressable
        key={route.key}
        onPress={() =>
          handleTabPress(route)
        }
        accessibilityRole="tab"
        accessibilityState={{
          selected: isFocused,
        }}
        style={{
          width: tabWidth,
          height: 68,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          paddingTop: 3,
          paddingBottom: 3,
        }}
      >

        {/* ==========================================
            SELECTED TAB ORANGE GLOW
        =========================================== */}

        {isFocused && (
          <LinearGradient
            pointerEvents="none"
            colors={[
              "rgba(255,128,8,0.30)",
              "rgba(255,128,8,0.16)",
              "rgba(255,128,8,0)",
            ]}
            locations={[
              0,
              0.48,
              1,
            ]}
            start={{
              x: 0.5,
              y: 0,
            }}
            end={{
              x: 0.5,
              y: 1,
            }}
            style={{
              position: "absolute",
              left: 4,
              right: 4,
              top: 4,
              bottom: 2,
              borderRadius: 20,
            }}
          />
        )}

        {/* ==========================================
            ICON
        =========================================== */}

        <MaterialIcons
          name={iconName}
          size={24}
          color={
            isFocused
              ? theme.colors.white
              : "#7D8794"
          }
        />

        {/* ==========================================
            LABEL
        =========================================== */}

        <Text
          numberOfLines={1}
          style={{
            marginTop: 5,
            fontSize:
              theme.typography.nav,
            lineHeight: 16,
            textAlign: "center",
            color:
              isFocused
                ? theme.colors.white
                : "#7D8794",
            fontFamily:
              isFocused
                ? theme.fonts.semiBold
                : theme.fonts.medium,
          }}
        >
          {route.name === "Government Scheme"
            ? "G.scheme"
            : route.name === "Government Schemes"
              ? "G.scheme"
              : route.name}
        </Text>

      </Pressable>
    );
  })}

</LinearGradient>
      </View>
    </View>
  );
}
