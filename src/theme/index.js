// =======================================================
// Finsaarthi Design System
// theme/index.js
// Part - 1
// =======================================================

/* =======================================================
 * COLORS
 * ======================================================= */

const colors = {
  /* ---------------------------------- */
  /* PRIMARY */
  /* ---------------------------------- */

primary900: "#C85A14",
primary700: "#E56A1F",
primary500: "#F47C2C", // Brand
primary400: "#FF8B43",
primary300: "#FFB27D",
primary100: "#FFF4EC",
primary50: "#FFF9F5",
  /* ---------------------------------- */
  /* SECONDARY (NAVY) */
  /* ---------------------------------- */

  navy900: "#172B3A",
  navy700: "#25384D",
  navy500: "#3A5268",
  navy300: "#6D8295",

  /* ---------------------------------- */
  /* NEUTRAL */
  /* ---------------------------------- */

  black: "#111827",

  gray900: "#1F2937",
  gray700: "#4B5563",
  gray500: "#6B7280",
  gray300: "#D1D5DB",
  gray200: "#E5E7EB",
  gray100: "#F3F4F6",

  white: "#FFFFFF",

  /* ---------------------------------- */
  /* SEMANTIC */
  /* ---------------------------------- */

  success: "#22C55E",
  warning: "#F59E0B",
  error: "#EF4444",
  info: "#3B82F6",

  /* ---------------------------------- */
  /* COMMON */
  /* ---------------------------------- */

  card: "#FFF9F5",
   background: "#F6F8F7",

  text: "#111827",
  textSecondary: "#4B5563",
  textLight: "#6B7280",

  placeholder: "#6B7280",

  border: "#D1D5DB",
  divider: "#E5E7EB",

  overlay: "rgba(17,24,39,0.45)",

  transparent: "transparent",
};

/* =======================================================
 * LINEAR GRADIENTS
 * ======================================================= */

const gradients = {
  primary: [
    "#FF8B43",
    "#F47C2C",
  ],

  secondary: [
    "#25384D",
    "#172B3A",
  ],

  success: [
    "#4ADE80",
    "#22C55E",
  ],

  warning: [
    "#FBBF24",
    "#F59E0B",
  ],

  error: [
    "#F87171",
    "#EF4444",
  ],

  info: [
    "#60A5FA",
    "#3B82F6",
  ],
};

/* =======================================================
 * TYPOGRAPHY
 * ======================================================= */

const typography = {

  /* ---------------------------- */
  /* DISPLAY */
  /* ---------------------------- */

  displayXL: 48,

  displayLG: 40,

  displayMD: 30,

  /* ---------------------------- */
  /* HEADINGS */
  /* ---------------------------- */

  h1: 28,

  h2: 24,

  h3: 20,

  h4: 18,

  /* ---------------------------- */
  /* BODY */
  /* ---------------------------- */

  b1: 16,

  b2: 14,

  b3: 12,

  caption: 10,

  button: 16,

  nav: 12,
};

/* =======================================================
 * FONT FAMILY
 * ======================================================= */

const fonts = {
  /* ===================================== */
  /* SORA (HEADINGS) */
  /* ===================================== */

  headingThin: "Sora-Thin",
  headingExtraLight: "Sora-ExtraLight",
  headingLight: "Sora-Light",
  headingRegular: "Sora-Regular",
  headingMedium: "Sora-Medium",
  headingSemiBold: "Sora-SemiBold",
  headingBold: "Sora-Bold",
  headingExtraBold: "Sora-ExtraBold",

  /* ===================================== */
  /* MANROPE (BODY / UI) */
  /* ===================================== */

  thin: "Manrope-Thin",
  extraLight: "Manrope-ExtraLight",
  light: "Manrope-Light",
  regular: "Manrope-Regular",
  medium: "Manrope-Medium",
  semiBold: "Manrope-SemiBold",
  bold: "Manrope-Bold",
  extraBold: "Manrope-ExtraBold",
};

/* =======================================================
 * LINE HEIGHT
 * ======================================================= */

const lineHeight = {

  displayXL: 58,

  displayLG: 48,

  displayMD: 38,

  h1: 34,

  h2: 30,

  h3: 26,

  h4: 24,

  b1: 20,

  b2: 18,

  b3: 16,

  caption: 14,
};

/* =======================================================
 * LETTER SPACING
 * ======================================================= */

const letterSpacing = {

  none: 0,

  xs: 0.1,

  sm: 0.25,

  md: 0.5,

  lg: 1,
};

/* =======================================================
 * SPACING SYSTEM
 * ======================================================= */

const spacing = {

  xs: 4,

  sm: 8,

  md: 12,

  lg: 16,

  xl: 20,

  xxl: 24,

  xxxl: 32,

  huge: 40,

  massive: 48,

  screen: 64,
};

/* =======================================================
 * BORDER RADIUS
 * ======================================================= */

const radius = {

  sm: 8,

  md: 12,

  lg: 16,

  xl: 20,

  pill: 999,

  circle: 9999,
};
/* =======================================================
 * SHADOWS
 * ======================================================= */

const shadows = {

  sm: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  md: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.10,
    shadowRadius: 18,
    elevation: 4,
  },

  lg: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.12,
    shadowRadius: 30,
    elevation: 8,
  },

//   card: {
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.08,
//     shadowRadius: 8,
//     elevation: 2,
//   },
  card: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.03,
      shadowRadius: 3,
      elevation: .8,
      },
};


/* =======================================================
 * ELEVATION
 * ======================================================= */

const elevation = {
  level1: 1,
  level2: 2,
  level3: 3,
  level4: 4,
};

/* =======================================================
 * OPACITY
 * ======================================================= */

const opacity = {
  10: 0.1,
  20: 0.2,
  40: 0.4,
  60: 0.6,
  80: 0.8,
  100: 1,
};

/* =======================================================
 * ICON SIZES
 * ======================================================= */

const iconSize = {

  xs: 16,

  sm: 20,

  md: 24,

  lg: 28,

  xl: 32,

  xxl: 40,
};

/* =======================================================
 * BUTTON
 * ======================================================= */

const button = {

  height: 56,

  borderRadius: 16,

  paddingHorizontal: 20,

  fontSize: 16,

  iconSize: 22,

  loaderSize: "small",

  primary: {
    backgroundColor: colors.primary500,
    textColor: colors.white,
    borderColor: colors.primary500,
  },

  secondary: {
    backgroundColor: colors.white,
    textColor: colors.primary500,
    borderColor: colors.primary500,
  },

  text: {
    backgroundColor: "transparent",
    textColor: colors.primary500,
    borderColor: "transparent",
  },

disabled: {
  backgroundColor: colors.primary300,
  textColor: colors.white,
  borderColor: colors.primary300,
  opacity: 0.7,
}
};

/* =======================================================
 * INPUT
 * ======================================================= */

const input = {

  height: 56,

  borderRadius: 16,

  borderWidth: 1,

  paddingHorizontal: 16,

  fontSize: 16,

  iconSize: 22,

  default: {
    borderColor: colors.gray300,
    backgroundColor: colors.white,
  },

  focused: {
    borderColor: colors.primary500,
    backgroundColor: colors.white,
  },

  filled: {
    borderColor: colors.gray300,
    backgroundColor: colors.white,
  },

  disabled: {
    borderColor: colors.gray200,
    backgroundColor: colors.gray100,
  },

  error: {
    borderColor: colors.error,
    backgroundColor: colors.white,
  },

  inputBorder: {
    borderWidth: 0.3,
    borderColor: "#48484a58",
  },

};

/* =======================================================
 * SEARCH
 * ======================================================= */

const search = {

  height: 56,

  borderRadius: 16,

  iconSize: 22,

  backgroundColor: colors.white,

  borderColor: colors.gray300,

  placeholderColor: colors.gray500,
};

/* =======================================================
 * OTP
 * ======================================================= */

const otp = {

  size: 56,

  radius: 16,

  borderWidth: 1,

  fontSize: 20,

  borderColor: colors.gray300,

  focusedBorder: colors.primary500,

  errorBorder: colors.error,
};

/* =======================================================
 * CHECKBOX
 * ======================================================= */

const checkbox = {

  size: 24,

  radius: 8,

  borderWidth: 2,

  checkedColor: colors.primary500,

  uncheckedColor: colors.gray300,

  disabledColor: colors.gray200,
};

/* =======================================================
 * RADIO BUTTON
 * ======================================================= */

const radio = {

  size: 24,

  innerSize: 12,

  borderWidth: 2,

  activeColor: colors.primary500,

  inactiveColor: colors.gray300,
};

/* =======================================================
 * SWITCH / TOGGLE
 * ======================================================= */

const toggle = {

  width: 52,

  height: 32,

  thumb: 28,

  activeTrack: colors.primary500,

  inactiveTrack: colors.gray300,

  thumbColor: colors.white,
};

/* =======================================================
 * PROGRESS BAR
 * ======================================================= */

const progress = {

  height: 8,

  radius: 999,

  backgroundColor: colors.gray200,

  progressColor: colors.primary500,
};

/* =======================================================
 * SLIDER
 * ======================================================= */

const slider = {

  height: 6,

  thumb: 22,

  activeTrack: colors.primary500,

  inactiveTrack: colors.gray300,
};
/* =======================================================
 * CARD
 * ======================================================= */

const card = {

  default: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    ...shadows.card,
  },

  loan: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    ...shadows.card,
  },

  dashboard: {
    backgroundColor: colors.white,
    borderRadius: radius.xl,
    padding: spacing.xxl,
    ...shadows.md,
  },

  emi: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    ...shadows.card,
  },

  profile: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    ...shadows.card,
  },

  reward: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    ...shadows.card,
  },

  offer: {
    backgroundColor: colors.primary50,
    borderRadius: radius.lg,
    padding: spacing.xl,
    ...shadows.card,
  },

  graph: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    ...shadows.card,
  },

  upload: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.gray300,
  },

  document: {
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
};

/* =======================================================
 * CHIP
 * ======================================================= */

const chip = {

  height: 36,

  borderRadius: radius.pill,

  paddingHorizontal: spacing.lg,

  active: {
    backgroundColor: colors.primary500,
    textColor: colors.white,
  },

  inactive: {
    backgroundColor: colors.gray100,
    textColor: colors.gray700,
  },
};

/* =======================================================
 * BADGE
 * ======================================================= */

const badge = {

  sm: 20,

  md: 24,

  lg: 28,

  success: colors.success,

  warning: colors.warning,

  error: colors.error,

  info: colors.info,
};

/* =======================================================
 * AVATAR
 * ======================================================= */

const avatar = {

  xs: 28,

  sm: 36,

  md: 48,

  lg: 64,

  xl: 80,
};

/* =======================================================
 * IMAGE
 * ======================================================= */

const image = {

  thumbnail: 48,

  small: 80,

  medium: 120,

  large: 180,

  bannerHeight: 220,
};

/* =======================================================
 * NOTIFICATION TILE
 * ======================================================= */

const notification = {

  height: 72,

  radius: radius.lg,

  padding: spacing.lg,
};

/* =======================================================
 * TRANSACTION TILE
 * ======================================================= */

const transaction = {

  height: 72,

  radius: radius.lg,

  padding: spacing.lg,
};

/* =======================================================
 * TOP APP BAR
 * ======================================================= */

const header = {

  height: 64,

  titleSize: typography.h3,

  iconSize: iconSize.md,

  paddingHorizontal: spacing.xl,
};

/* =======================================================
 * BOTTOM NAVIGATION
 * ======================================================= */

const navigation = {

  height: 80,

  iconSize: iconSize.md,

  labelSize: typography.nav,

  activeColor: colors.primary500,

  inactiveColor: colors.gray500,
};

/* =======================================================
 * BOTTOM SHEET
 * ======================================================= */

const bottomSheet = {

  borderRadius: 24,

  padding: spacing.xxl,

  backdropColor: colors.overlay,
};

/* =======================================================
 * MODAL
 * ======================================================= */

const modal = {

  borderRadius: radius.xl,

  padding: spacing.xxl,

  backdropColor: colors.overlay,
};

/* =======================================================
 * TOAST
 * ======================================================= */

const toast = {

  borderRadius: radius.md,

  padding: spacing.lg,

  success: colors.success,

  warning: colors.warning,

  error: colors.error,

  info: colors.info,
};

/* =======================================================
 * SNACKBAR
 * ======================================================= */

const snackbar = {

  height: 56,

  borderRadius: radius.md,

  paddingHorizontal: spacing.xl,

  backgroundColor: colors.navy900,
};

/* =======================================================
 * BANNER
 * ======================================================= */

const banner = {

  height: 140,

  borderRadius: radius.lg,

  padding: spacing.xl,
};

/* =======================================================
 * ACCORDION
 * ======================================================= */

const accordion = {

  radius: radius.lg,

  padding: spacing.xl,
};

/* =======================================================
 * DROPDOWN
 * ======================================================= */

const dropdown = {

  height: 56,

  borderRadius: radius.lg,

  borderColor: colors.gray300,
};

/* =======================================================
 * DATE PICKER
 * ======================================================= */

const datePicker = {

  height: 56,

  borderRadius: radius.lg,
};

/* =======================================================
 * PAGINATION
 * ======================================================= */

const pagination = {

  size: 40,

  radius: radius.circle,
};

/* =======================================================
 * TABS
 * ======================================================= */

const tabs = {

  height: 48,

  indicatorHeight: 3,

  activeColor: colors.primary500,

  inactiveColor: colors.gray500,
};

/* =======================================================
 * STEPPER
 * ======================================================= */

const stepper = {

  circle: 32,

  line: 2,

  activeColor: colors.primary500,

  inactiveColor: colors.gray300,
};

/* =======================================================
 * TIMELINE
 * ======================================================= */

const timeline = {

  dot: 14,

  line: 2,

  activeColor: colors.primary500,

  inactiveColor: colors.gray300,
};

/* =======================================================
 * SCREEN
 * ======================================================= */

const screen = {

  background: colors.background,

  cardBackground: colors.card,

  horizontalPadding: spacing.xl,

  verticalPadding: spacing.xl,

  safeAreaBackground: colors.background,
};

/* =======================================================
 * ANIMATION
 * ======================================================= */

const animation = {

  fast: 150,

  normal: 250,

  slow: 400,
};


/* =======================================================
 * BORDER WIDTH
 * ======================================================= */

const borderWidth = {
  hairline: 0.5,
  thin: 1,
  medium: 2,
  thick: 3,
};

/* =======================================================
 * Z INDEX
 * ======================================================= */

const zIndex = {
  base: 1,
  dropdown: 100,
  sticky: 200,
  floatingButton: 300,
  bottomSheet: 400,
  modal: 500,
  snackbar: 600,
  toast: 700,
  tooltip: 800,
  loader: 900,
};

/* =======================================================
 * SAFE AREA
 * ======================================================= */

const safeArea = {
  backgroundColor: colors.background,
};

/* =======================================================
 * STATUS BAR
 * ======================================================= */

const statusBar = {
  light: "light-content",
  dark: "dark-content",
  backgroundColor: colors.background,
};

/* =======================================================
 * HIT SLOP
 * ======================================================= */

const hitSlop = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
};

/* =======================================================
 * LAYOUT
 * ======================================================= */

const layout = {
  mobileWidth: 390,
  columns: 4,
  margin: 20,
  gutter: 16,
  maxContentWidth: 350,
};

/* =======================================================
 * LOADER
 * ======================================================= */

const loader = {
  small: 20,
  medium: 28,
  large: 40,
  color: colors.primary500,
};

/* =======================================================
 * SKELETON
 * ======================================================= */

const skeleton = {
  background: colors.gray200,
  highlight: colors.gray100,
  borderRadius: radius.md,
};

/* =======================================================
 * FAB (Floating Action Button)
 * ======================================================= */

const fab = {
  size: 60,
  borderRadius: radius.circle,
  backgroundColor: colors.primary500,
  iconSize: 28,
  ...shadows.lg,
};

/* =======================================================
 * LIST ITEM
 * ======================================================= */

const listItem = {
  minHeight: 72,
  paddingHorizontal: spacing.xl,
  paddingVertical: spacing.lg,
  borderBottomWidth: 1,
  borderBottomColor: colors.gray200,
};

/* =======================================================
 * EMPTY STATE
 * ======================================================= */

const emptyState = {
  imageSize: 180,
  titleSize: typography.h3,
  descriptionSize: typography.b2,
  buttonWidth: 180,
};

/* =======================================================
 * SUCCESS STATE
 * ======================================================= */

const successState = {
  icon: 72,
  color: colors.success,
};

/* =======================================================
 * ERROR STATE
 * ======================================================= */

const errorState = {
  icon: 72,
  color: colors.error,
};

/* =======================================================
 * CHART
 * ======================================================= */

const chart = {
  primary: colors.primary500,
  secondary: colors.navy500,
  success: colors.success,
  warning: colors.warning,
  danger: colors.error,
  grid: colors.gray200,
};

/* =======================================================
 * CALENDAR
 * ======================================================= */

const calendar = {
  selected: colors.primary500,
  today: colors.navy900,
  disabled: colors.gray300,
};

/* =======================================================
 * TABLE
 * ======================================================= */

const table = {
  rowHeight: 52,
  headerHeight: 56,
  borderColor: colors.gray200,
};

/* =======================================================
 * LOAN STATUS COLORS
 * ======================================================= */

const loanStatus = {
  pending: colors.warning,
  approved: colors.success,
  rejected: colors.error,
  disbursed: colors.info,
  closed: colors.navy900,
};

/* =======================================================
 * EMI STATUS
 * ======================================================= */

const emiStatus = {
  paid: colors.success,
  upcoming: colors.warning,
  overdue: colors.error,
};

/* =======================================================
 * DOCUMENT STATUS
 * ======================================================= */

const documentStatus = {
  uploaded: colors.success,
  pending: colors.warning,
  rejected: colors.error,
};

/* =======================================================
 * KYC STATUS
 * ======================================================= */

const kycStatus = {
  verified: colors.success,
  pending: colors.warning,
  rejected: colors.error,
};

/* =======================================================
 * EXPORT UPDATE
 * ======================================================= */

export const theme = {
  // Existing Theme
  colors,
  gradients,

  typography,
  fonts,
  lineHeight,
  letterSpacing,

  spacing,
  radius,

  shadows,
  elevation,
  opacity,

  iconSize,

  button,
  input,
  search,
  otp,

  checkbox,
  radio,
  toggle,

  progress,
  slider,

  card,
  chip,
  badge,

  avatar,
  image,

  notification,
  transaction,

  header,
  navigation,

  bottomSheet,
  modal,

  toast,
  snackbar,

  banner,
  accordion,
  dropdown,
  datePicker,

  pagination,
  tabs,

  stepper,
  timeline,

  screen,
  animation,

  // Enterprise Tokens
  borderWidth,
  zIndex,
  safeArea,
  statusBar,
  hitSlop,
  layout,
  loader,
  skeleton,
  fab,
  listItem,
  emptyState,
  successState,
  errorState,
  chart,
  calendar,
  table,
  loanStatus,
  emiStatus,
  documentStatus,
  kycStatus,
};


/* =======================================================
 * EXPORT THEME
 * ======================================================= */

// export const theme = {
//   colors,
//   gradients,

//   typography,
//   fonts,
//   lineHeight,
//   letterSpacing,

//   spacing,
//   radius,

//   shadows,
//   elevation,
//   opacity,

//   iconSize,

//   button,
//   input,
//   search,
//   otp,

//   checkbox,
//   radio,
//   toggle,

//   progress,
//   slider,

//   card,
//   chip,
//   badge,

//   avatar,
//   image,

//   notification,
//   transaction,

//   header,
//   navigation,

//   bottomSheet,
//   modal,

//   toast,
//   snackbar,

//   banner,
//   accordion,
//   dropdown,
//   datePicker,

//   pagination,
//   tabs,

//   stepper,
//   timeline,

//   screen,
//   animation,
// };