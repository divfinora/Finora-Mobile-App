import React, { memo, useRef, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    useWindowDimensions,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { MaterialIcons } from "@react-native-vector-icons/material-icons";
import Svg, { Circle, Path, Defs, RadialGradient, Stop } from "react-native-svg";
import { theme } from "../../../theme";

const CreditScoreCard = ({
    score       = 742,
    maxScore    = 900,
    updatedDate = "19 Sep 2026",
    onViewReport = () => {},
}) => {
    const { width: screenWidth } = useWindowDimensions();

    // ══════════════════════════════════════
    // RESPONSIVE DIMENSIONS
    // ══════════════════════════════════════

    const CARD_H   = Math.min(Math.max(screenWidth * 0.40, 148), 170);
    const GAUGE_D  = Math.round(CARD_H * 0.90);
    const GAUGE_R  = GAUGE_D / 2;
    const SVG_SIZE = GAUGE_D;
    const INNER_R  = GAUGE_R * 0.595;
    const TRACK_R  = GAUGE_R * 0.775;
    const STROKE_W = GAUGE_R * 0.118;

    const safeScore = Math.min(Math.max(Number(score) || 0, 0), Number(maxScore) || 900);

    // ══════════════════════════════════════
    // GAUGE MATH
    // ══════════════════════════════════════

    const C        = 2 * Math.PI * TRACK_R;
    const totalArc = C * (220 / 360);   // 220° sweep

    // Segment proportions: red 0-300, yellow 300-550, green 550-900
    const gap    = 2.5;
    const red    = totalArc * (300 / 900);
    const yellow = totalArc * (250 / 900);
    const green  = totalArc * (350 / 900);

    // Pointer dot position
    const scoreRatio      = safeScore / maxScore;
    const pointerAngleDeg = -110 + scoreRatio * 220;
    const pointerAngleRad = (pointerAngleDeg * Math.PI) / 180;
    const pX = GAUGE_R + TRACK_R * Math.sin(pointerAngleRad);
    const pY = GAUGE_R - TRACK_R * Math.cos(pointerAngleRad);
    const POINTER_R = STROKE_W * 0.72;

    // ══════════════════════════════════════
    // ANIMATIONS
    // ══════════════════════════════════════

    const pulse      = useRef(new Animated.Value(1)).current;
    const cardOpacity = useRef(new Animated.Value(0)).current;
    const cardTransY  = useRef(new Animated.Value(18)).current;

    useEffect(() => {
        // Entry animation
        Animated.parallel([
            Animated.timing(cardOpacity, {
                toValue: 1, duration: 550,
                useNativeDriver: true,
            }),
            Animated.spring(cardTransY, {
                toValue: 0, tension: 60, friction: 9,
                useNativeDriver: true,
            }),
        ]).start();

        // Gauge pulse — continuous
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulse, {
                    toValue: 1.045, duration: 1600,
                    useNativeDriver: true,
                }),
                Animated.timing(pulse, {
                    toValue: 1, duration: 1600,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    // ══════════════════════════════════════
    // SCORE LABEL
    // ══════════════════════════════════════

    const scoreLabel =
        safeScore >= 750 ? "Excellent" :
        safeScore >= 650 ? "Good"      :
        safeScore >= 550 ? "Average"   : "Poor";

    const labelColor =
        safeScore >= 750 ? "#0A6B2E" :
        safeScore >= 650 ? "#168548" :
        safeScore >= 550 ? "#8A5A00" : "#B91C1C";

    const labelBg =
        safeScore >= 750 ? "#DCFCE7" :
        safeScore >= 650 ? "#C9F3D9" :
        safeScore >= 550 ? "#FEF3C7" : "#FEE2E2";

    // ══════════════════════════════════════
    // RENDER
    // ══════════════════════════════════════

    return (
        <Animated.View
            style={{
                paddingHorizontal: theme.spacing.lg,
                opacity:   cardOpacity,
                transform: [{ translateY: cardTransY }],
            }}
        >
            <LinearGradient
                colors={["#F47C2C", "#F58535", "#FFA055", "#FFBE85"]}
                start={{ x: 0,   y: 0   }}
                end={{   x: 0.9, y: 1   }}
                style={{
                    width:        "100%",
                    height:       CARD_H,
                    borderRadius: 20,
                    overflow:     "hidden",
                }}
            >

                {/* ══════════════════════════════════════
                    WAVE LINES
                ══════════════════════════════════════ */}

                <Svg
                    pointerEvents="none"
                    width="100%"
                    height="100%"
                    viewBox={`0 0 ${screenWidth - theme.spacing.lg * 2} ${CARD_H}`}
                    style={{ position: "absolute", left: 0, top: 0 }}
                >
                    {[0, 8, 16, 24, 32, 40, 48, 56].map((offset, i) => {
                        const W  = screenWidth - theme.spacing.lg * 2;
                        const y0 = CARD_H * 0.58 + offset;
                        return (
                            <Path
                                key={i}
                                d={`M0 ${y0} C${W * 0.20} ${CARD_H * 0.28 + offset}, ${W * 0.38} ${CARD_H * 1.12 + offset}, ${W * 0.56} ${CARD_H * 0.52 + offset} S${W * 0.82} ${CARD_H * 0.18 + offset}, ${W} ${CARD_H * 0.08 + offset}`}
                                stroke={`rgba(255,255,255,${(0.14 - i * 0.014).toFixed(3)})`}
                                strokeWidth="1"
                                fill="none"
                            />
                        );
                    })}
                </Svg>

                {/* ══════════════════════════════════════
                    CONCENTRIC CIRCLES BEHIND GAUGE
                ══════════════════════════════════════ */}

                <View pointerEvents="none" style={{
                    position: "absolute",
                    right: -(GAUGE_R * 0.22), top: -(GAUGE_R * 0.22),
                    width: GAUGE_D * 1.20, height: GAUGE_D * 1.20,
                    borderRadius: GAUGE_D,
                    backgroundColor: "rgba(255,255,255,0.09)",
                }} />
                <View pointerEvents="none" style={{
                    position: "absolute",
                    right: -(GAUGE_R * 0.08), top: -(GAUGE_R * 0.07),
                    width: GAUGE_D * 1.05, height: GAUGE_D * 1.05,
                    borderRadius: GAUGE_D,
                    borderWidth: 1, borderColor: "rgba(255,255,255,0.16)",
                }} />
                <View pointerEvents="none" style={{
                    position: "absolute",
                    right: GAUGE_R * 0.07, top: GAUGE_R * 0.06,
                    width: GAUGE_D * 0.87, height: GAUGE_D * 0.87,
                    borderRadius: GAUGE_D,
                    borderWidth: 1, borderColor: "rgba(255,255,255,0.13)",
                }} />

                {/* ══════════════════════════════════════
                    DOT GRID
                ══════════════════════════════════════ */}

                <View pointerEvents="none" style={{
                    position: "absolute",
                    left: screenWidth * 0.155, top: CARD_H * 0.13,
                    opacity: 0.28,
                }}>
                    {[[0,0],[14,0],[28,0],[0,12],[14,12],[28,12],[0,24],[14,24],[28,24]].map(([l, t], i) => (
                        <View key={i} style={{
                            position:        "absolute",
                            left:            l, top: t,
                            width:           4, height: 4,
                            borderRadius:    2,
                            backgroundColor: "#FFFFFF",
                        }} />
                    ))}
                </View>

                {/* ══════════════════════════════════════
                    MAIN ROW
                ══════════════════════════════════════ */}

                <View style={{
                    flex:             1,
                    flexDirection:    "row",
                    alignItems:       "center",
                    paddingHorizontal: theme.spacing.lg,
                    paddingVertical:  theme.spacing.xs,
                }}>

                    {/* ── LEFT CONTENT ── */}
                    <View style={{ flex: 1, justifyContent: "center", paddingRight: 6 }}>

                        {/* Title — Figma: Manrope ExtraBold 14/16 */}
                        <Text style={{
                            color:          "#FFFFFF",
                            fontSize:       14,
                            lineHeight:     16,
                            fontFamily:     theme.fonts.extraBold,
                            letterSpacing:  0,
                        }}>
                            Your Credit Score
                        </Text>

                        {/* Score row */}
                        <View style={{
                            flexDirection: "row",
                            alignItems:    "center",
                            marginTop:     2,
                        }}>
                            {/* Score — Figma: Manrope ExtraBold 36/40, letterSpacing -0.9 */}
                            <Text style={{
                                color:               "#FFFFFF",
                                fontSize:            36,
                                lineHeight:          40,
                                fontFamily:          theme.fonts.extraBold,
                                letterSpacing:       -0.9,
                                includeFontPadding:  false,
                            }}>
                                {safeScore}
                            </Text>

                            {/* Badge — Figma: Manrope ExtraBold 12/16.5 */}
                            <View style={{
                                marginLeft:        7,
                                paddingHorizontal: 9,
                                paddingVertical:   3,
                                borderRadius:      999,
                                backgroundColor:   labelBg,
                                alignItems:        "center",
                                justifyContent:    "center",
                            }}>
                                <Text style={{
                                    color:      labelColor,
                                    fontSize:   12,
                                    lineHeight: 16.5,
                                    fontFamily: theme.fonts.extraBold,
                                }}>
                                    {scoreLabel}
                                </Text>
                            </View>
                        </View>

                        {/* Updated date */}
                        <Text style={{
                            color:      "rgba(255,255,255,0.90)",
                            fontSize:   theme.typography.caption,
                            lineHeight: 14,
                            fontFamily: theme.fonts.medium,
                            marginTop:  1,
                        }}>
                            Last updated {updatedDate}
                        </Text>

                        {/* View Credit Report — Figma: Manrope Bold 12/16 */}
                        <TouchableOpacity
                            activeOpacity={0.80}
                            onPress={onViewReport}
                            style={{
                                marginTop:        theme.spacing.xs,
                                alignSelf:        "flex-start",
                                height:           29,
                                paddingHorizontal: 9,
                                borderRadius:     999,
                                borderWidth:      1,
                                borderColor:      "rgba(255,255,255,0.68)",
                                backgroundColor:  "rgba(255,255,255,0.10)",
                                flexDirection:    "row",
                                alignItems:       "center",
                            }}
                        >
                            <View style={{
                                width:           17, height: 17,
                                borderRadius:    9,
                                backgroundColor: "#FFFFFF",
                                alignItems:      "center",
                                justifyContent:  "center",
                                marginRight:     5,
                            }}>
                                <MaterialIcons name="arrow-forward" size={10} color="#F47C2C" />
                            </View>
                            <Text style={{
                                color:         "#FFFFFF",
                                fontSize:      12,
                                lineHeight:    16,
                                fontFamily:    theme.fonts.bold,
                                letterSpacing: 0,
                                textAlign:     "center",
                            }}>
                                View Credit Report
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {/* ── RIGHT GAUGE ── */}
                    <Animated.View style={{
                        width:          GAUGE_D + 10,
                        height:         GAUGE_D + 10,
                        alignItems:     "center",
                        justifyContent: "center",
                        marginRight:    -14,
                        transform:      [{ scale: pulse }],
                    }}>

                        {/* Outer glass ring */}
                        <View style={{
                            position:        "absolute",
                            width:           GAUGE_D + 6,
                            height:          GAUGE_D + 6,
                            borderRadius:    (GAUGE_D + 6) / 2,
                            backgroundColor: "rgba(255,255,255,0.09)",
                            borderWidth:     1,
                            borderColor:     "rgba(255,255,255,0.13)",
                        }} />

                        {/* Gauge SVG */}
                        <Svg
                            width={SVG_SIZE}
                            height={SVG_SIZE}
                            viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
                        >
                            <Defs>
                                <RadialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
                                    <Stop offset="0%"   stopColor="#FFFFFF"  stopOpacity="1" />
                                    <Stop offset="65%"  stopColor="#FFF9F5"  stopOpacity="1" />
                                    <Stop offset="100%" stopColor="#FFECD9"  stopOpacity="1" />
                                </RadialGradient>
                            </Defs>

                            {/* TRACK — faint bg */}
                            <Circle
                                cx={GAUGE_R} cy={GAUGE_R} r={TRACK_R}
                                stroke="rgba(255,255,255,0.20)"
                                strokeWidth={STROKE_W}
                                fill="none"
                                strokeDasharray={`${totalArc} ${C}`}
                                strokeDashoffset={0}
                                transform={`rotate(-110 ${GAUGE_R} ${GAUGE_R})`}
                                strokeLinecap="round"
                            />

                            {/* RED */}
                            <Circle
                                cx={GAUGE_R} cy={GAUGE_R} r={TRACK_R}
                                stroke="#F04D32"
                                strokeWidth={STROKE_W}
                                fill="none"
                                strokeDasharray={`${red - gap} ${C - red + gap}`}
                                strokeDashoffset={0}
                                transform={`rotate(-110 ${GAUGE_R} ${GAUGE_R})`}
                                strokeLinecap="round"
                            />

                            {/* YELLOW */}
                            <Circle
                                cx={GAUGE_R} cy={GAUGE_R} r={TRACK_R}
                                stroke="#FFD21A"
                                strokeWidth={STROKE_W}
                                fill="none"
                                strokeDasharray={`${yellow - gap} ${C - yellow + gap}`}
                                strokeDashoffset={-(red + gap)}
                                transform={`rotate(-110 ${GAUGE_R} ${GAUGE_R})`}
                                strokeLinecap="round"
                            />

                            {/* GREEN */}
                            <Circle
                                cx={GAUGE_R} cy={GAUGE_R} r={TRACK_R}
                                stroke="#22C55E"
                                strokeWidth={STROKE_W}
                                fill="none"
                                strokeDasharray={`${green - gap} ${C - green + gap}`}
                                strokeDashoffset={-(red + yellow + gap * 2)}
                                transform={`rotate(-110 ${GAUGE_R} ${GAUGE_R})`}
                                strokeLinecap="round"
                            />

                            {/* WHITE CENTER */}
                            <Circle
                                cx={GAUGE_R} cy={GAUGE_R} r={INNER_R}
                                fill="url(#centerGrad)"
                            />

                            {/* POINTER DOT */}
                            <Circle cx={pX} cy={pY} r={POINTER_R + 2}
                                fill="none"
                                stroke="rgba(255,255,255,0.35)"
                                strokeWidth={2}
                            />
                            <Circle cx={pX} cy={pY} r={POINTER_R}
                                fill="#FFFFFF"
                            />
                        </Svg>

                        {/* Center text */}
                        <View style={{
                            position:       "absolute",
                            alignItems:     "center",
                            justifyContent: "center",
                        }}>
                            <Text style={{
                                color:               theme.colors.navy900,
                                fontSize:            GAUGE_D * 0.205,
                                lineHeight:          GAUGE_D * 0.228,
                                fontFamily:          theme.fonts.extraBold,
                                letterSpacing:       -0.5,
                                includeFontPadding:  false,
                            }}>
                                {safeScore}
                            </Text>
                            <Text style={{
                                color:      theme.colors.gray500,
                                fontSize:   GAUGE_D * 0.068,
                                lineHeight: GAUGE_D * 0.090,
                                fontFamily: theme.fonts.medium,
                                marginTop:  1,
                            }}>
                                out of {maxScore}
                            </Text>
                        </View>

                    </Animated.View>
                </View>

                {/* ══════════════════════════════════════
                    TOP RIGHT — TREND ICON
                ══════════════════════════════════════ */}

                <View style={{
                    position:        "absolute",
                    top: 9, right: 9,
                    width: 27, height: 27,
                    borderRadius:    14,
                    backgroundColor: "rgba(255,255,255,0.18)",
                    borderWidth:     1,
                    borderColor:     "rgba(255,255,255,0.25)",
                    alignItems:      "center",
                    justifyContent:  "center",
                }}>
                    <MaterialIcons name="trending-up" size={14} color="#FFFFFF" />
                </View>

                {/* ══════════════════════════════════════
                    BOTTOM RIGHT — CHART ICON
                ══════════════════════════════════════ */}

                <View style={{
                    position:        "absolute",
                    right: 10, bottom: 9,
                    width: 30, height: 30,
                    borderRadius:    15,
                    backgroundColor: "#FFFFFF",
                    alignItems:      "center",
                    justifyContent:  "center",
                    elevation:       3,
                    shadowColor:     "#F47C2C",
                    shadowOffset:    { width: 0, height: 2 },
                    shadowOpacity:   0.20,
                    shadowRadius:    4,
                }}>
                    <MaterialIcons name="bar-chart" size={16} color="#F47C2C" />
                </View>

                {/* ══════════════════════════════════════
                    SPARKLE STARS
                ══════════════════════════════════════ */}

                <Text pointerEvents="none" style={{
                    position:  "absolute",
                    right:     14,
                    top:       CARD_H * 0.28,
                    color:     "#FFFFFF",
                    fontSize:  20,
                    opacity:   0.88,
                }}>✦</Text>

                <Text pointerEvents="none" style={{
                    position:  "absolute",
                    right:     36,
                    top:       CARD_H * 0.47,
                    color:     "#FFFFFF",
                    fontSize:  13,
                    opacity:   0.72,
                }}>✦</Text>

            </LinearGradient>
        </Animated.View>
    );
};

export default memo(CreditScoreCard);