import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Animated,
} from "react-native";

import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import Onboarding1 from "./component/Onboarding1";
import Onboarding2 from "./component/Onboarding2";
import Onboarding3 from "./component/Onboarding3";

const { width, height } = Dimensions.get("window");

const isTablet = width >= 768;
const isSmallDevice = height < 700;

const TOTAL_PAGES = 3;

const OnboardingScreen = ({ navigation }) => {
  const scrollRef = useRef(null);

  const buttonOpacity = useRef(
    new Animated.Value(0)
  ).current;

  const buttonTranslateY = useRef(
    new Animated.Value(12)
  ).current;

  const [page, setPage] = useState(0);

  // ==========================================
  // SCROLL COMPLETE
  // ==========================================

  const handleMomentumScrollEnd = (event) => {
    const offsetX =
      event.nativeEvent.contentOffset.x;

    const currentPage = Math.round(
      offsetX / width
    );

    setPage(currentPage);
  };

  // ==========================================
  // GO TO PAGE
  // ==========================================

  const goToPage = (index) => {
    scrollRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });

    // IMPORTANT:
    // Yaha setPage(index) mat lagana.
    // Scroll complete hone ke baad page update hoga.
  };

  // ==========================================
  // NEXT
  // ==========================================

  const handleNext = () => {
    if (page < TOTAL_PAGES - 1) {
      goToPage(page + 1);
    }
  };

  // ==========================================
  // SKIP
  // ==========================================

  const handleSkip = () => {
    // navigation.replace("Login");
  };

  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = () => {
    navigation.navigate("enter-mpin-login-user");
    
  };

  // ==========================================
  // CREATE ACCOUNT
  // ==========================================

  const handleCreateAccount = () => {
      navigation.navigate("enter-phone-register-user");

    // navigation.navigate("Register");
  };

  // ==========================================
  // LAST PAGE BUTTON ANIMATION
  // ==========================================

  useEffect(() => {
    if (page === TOTAL_PAGES - 1) {
      buttonOpacity.setValue(0);
      buttonTranslateY.setValue(12);

      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),

        Animated.timing(buttonTranslateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [
    page,
    buttonOpacity,
    buttonTranslateY,
  ]);

  return (
    <SafeAreaProvider>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
      />

      <SafeAreaView
        
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
      >

        {/* ================================= */}
        {/* HEADER / SKIP */}
        {/* ================================= */}

        <View
          style={{
            height: isTablet ? 70 : 55,
            justifyContent: "center",
            alignItems: "flex-end",
            paddingHorizontal: isTablet
              ? 40
              : 24,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSkip}
            style={{
              backgroundColor: "#F8F8F8",

              paddingHorizontal: isTablet
                ? 20
                : 16,

              paddingVertical: isTablet
                ? 12
                : 10,

              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontSize: isTablet
                  ? 16
                  : 14,

                fontWeight: "600",
                color: "#181818",
              }}
            >
              Skip
            </Text>
          </TouchableOpacity>
        </View>

        {/* ================================= */}
        {/* ONBOARDING SLIDER */}
        {/* ================================= */}

        <View
          style={{
            flex: 1,
            minHeight: 0,
          }}
        >
          <ScrollView
            ref={scrollRef}
            horizontal
            pagingEnabled
            bounces={false}
            showsHorizontalScrollIndicator={false}

            // Page sirf scrolling complete
            // hone ke baad change hoga
            onMomentumScrollEnd={
              handleMomentumScrollEnd
            }
          >
            {/* PAGE 1 */}

            <View
              style={{
                width,
                flex: 1,
              }}
            >
              <Onboarding1 />
            </View>

            {/* PAGE 2 */}

            <View
              style={{
                width,
                flex: 1,
              }}
            >
              <Onboarding2 />
            </View>

            {/* PAGE 3 */}

            <View
              style={{
                width,
                flex: 1,
              }}
            >
              <Onboarding3 />
            </View>
          </ScrollView>
        </View>

        {/* ================================= */}
        {/* PAGINATION */}
        {/* ================================= */}

        <View
          style={{
            height: isTablet
              ? 70
              : isSmallDevice
              ? 42
              : 55,

            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {[0, 1, 2].map((index) => {
            const isActive =
              page === index;

            return (
              <View
                key={index}
                style={{
                  width: isTablet ? 10 : 8,
                  height: isTablet ? 10 : 8,

                  borderRadius: isTablet
                    ? 5
                    : 4,

                  marginHorizontal:
                    isTablet ? 7 : 5,

                  backgroundColor:
                    isActive
                      ? "#FF9500"
                      : "#D1D1D1",
                }}
              />
            );
          })}
        </View>

        {/* ================================= */}
        {/* BOTTOM ORANGE SECTION */}
        {/* ================================= */}

        <View
          style={{
            width: "100%",

            minHeight: isTablet
              ? Math.min(
                  height * 0.27,
                  280
                )
              : isSmallDevice
              ? 180
              : Math.min(
                  height * 0.25,
                  235
                ),

            backgroundColor: "#FF824A",

            paddingHorizontal:
              isTablet ? 60 : 36,

            paddingTop: isTablet
              ? 55
              : isSmallDevice
              ? 32
              : 45,

            paddingBottom:
              isTablet ? 45 : 30,

            alignItems: "center",
            justifyContent: "center",
          }}
        >

          {/* Bottom content width */}

          <View
            style={{
              width: "100%",

              maxWidth: isTablet
                ? 560
                : 500,

              alignItems: "center",
            }}
          >

            {/* ================================= */}
            {/* LAST PAGE */}
            {/* LOGIN + CREATE ACCOUNT */}
            {/* ================================= */}

            {page === TOTAL_PAGES - 1 ? (
              <Animated.View
                style={{
                  width: "100%",
                  alignItems: "center",

                  opacity:
                    buttonOpacity,

                  transform: [
                    {
                      translateY:
                        buttonTranslateY,
                    },
                  ],
                }}
              >

                {/* LOGIN */}

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={handleLogin}
                  style={{
                    width: "100%",

                    height: isTablet
                      ? 64
                      : 58,

                    borderRadius: 16,

                    backgroundColor:
                      "#FFFFFF",

                    justifyContent:
                      "center",

                    alignItems:
                      "center",

                    marginBottom:
                      isTablet
                        ? 24
                        : 18,
                  }}
                >
                  <Text
                    style={{
                      fontSize:
                        isTablet
                          ? 17
                          : 15,

                      fontWeight:
                        "700",

                      color:
                        "#111111",
                    }}
                  >
                    Login
                  </Text>
                </TouchableOpacity>

                {/* CREATE ACCOUNT */}

                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={
                    handleCreateAccount
                  }
                  style={{
                    width: "100%",

                    height: isTablet
                      ? 64
                      : 58,

                    borderRadius: 16,

                    backgroundColor:
                      "#111111",

                    justifyContent:
                      "center",

                    alignItems:
                      "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize:
                        isTablet
                          ? 17
                          : 15,

                      fontWeight:
                        "700",

                      color:
                        "#FFFFFF",
                    }}
                  >
                    Create an account
                  </Text>
                </TouchableOpacity>

              </Animated.View>
            ) : (

              /* ================================= */
              /* NEXT BUTTON */
              /* ================================= */

              <TouchableOpacity
                activeOpacity={0.85}
                onPress={handleNext}
                style={{
                  width: isTablet
                    ? 90
                    : isSmallDevice
                    ? 68
                    : 78,

                  height: isTablet
                    ? 90
                    : isSmallDevice
                    ? 68
                    : 78,

                  borderRadius:
                    isTablet
                      ? 22
                      : 18,

                  backgroundColor:
                    "#000000",

                  borderWidth: 4,
                  borderColor:
                    "#FFFFFF",

                  justifyContent:
                    "center",

                  alignItems:
                    "center",
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",

                    fontSize: isTablet
                      ? 44
                      : isSmallDevice
                      ? 32
                      : 38,

                    fontWeight: "400",

                    marginTop: -5,
                  }}
                >
                  →
                </Text>
              </TouchableOpacity>
            )}

          </View>
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default OnboardingScreen;