import {
  CommonActions,
} from "@react-navigation/native";


// ============================================
// GO BACK TO SINGLE LOAN DETAIL
// KEEP PREVIOUS STACK
// REMOVE PAYMENT FLOW SCREENS
// ============================================

export const goBackToSingleLoanDetail = (
  navigation
) => {

  const state =
    navigation.getState();

  const routes =
    state?.routes || [];

  const currentIndex =
    state?.index ?? -1;

  const currentRoute =
    routes[currentIndex];


  // ==========================================
  // CURRENT SCREEN CHECK
  // ==========================================

  if (
    currentRoute?.name !==
    "single-loan-detail-complete-emi-screen"
  ) {

    console.warn(
      "Current route is not Complete EMI"
    );

    return;

  }


  // ==========================================
  // FIND SINGLE LOAN DETAIL
  // ==========================================

  const singleDetailIndex =
    routes.findIndex(
      route =>
        route?.name ===
        "get-single-loan-detail"
    );


  // ==========================================
  // NOT FOUND
  // ==========================================

  if (
    singleDetailIndex === -1
  ) {

    console.warn(
      "Single Loan Detail route not found"
    );

    return;

  }


  // ==========================================
  // KEEP EVERYTHING BEFORE + SINGLE DETAIL
  // ==========================================

  const newRoutes =
    routes.slice(
      0,
      singleDetailIndex + 1
    );


  // ==========================================
  // RESET STACK
  // ==========================================

  navigation.dispatch(
    CommonActions.reset({

      index:
        newRoutes.length - 1,

      routes:
        newRoutes,

    })
  );

};