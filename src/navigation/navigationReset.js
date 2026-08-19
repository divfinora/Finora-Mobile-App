// ============================================
// utils/navigationReset.js
// COMMON NAVIGATION RESET HELPERS
// ============================================

import {
  CommonActions,
} from "@react-navigation/native";


// ============================================
// MAIN BOTTOM TAB ROUTE
// ============================================

const MAIN_TABS = "MainTabs";


// ============================================
// BOTTOM TAB NAMES
// ============================================

const BOTTOM_TABS = [
  "Home",
  "Loan",
  "History",
  "Profile",
];


// ============================================
// RESET TO ANY BOTTOM TAB
// ============================================
//
// Example:
//
// resetToTab(navigation, "Home");
// resetToTab(navigation, "Loan");
// resetToTab(navigation, "History");
// resetToTab(navigation, "Profile");
//
// ============================================

export const resetToTab = (
  navigation,
  tabName = "Home"
) => {

  // ==========================================
  // FIND TAB INDEX
  // ==========================================

  const tabIndex =
    BOTTOM_TABS.indexOf(
      tabName
    );


  // ==========================================
  // INVALID TAB
  // ==========================================

  if (tabIndex === -1) {

    console.warn(
      `Invalid bottom tab: ${tabName}`
    );

    return;

  }


  // ==========================================
  // RESET APP STACK
  // ==========================================

  navigation.dispatch(
    CommonActions.reset({

      index: 0,

      routes: [

        {
          // IMPORTANT:
          // AppStack mein route ka naam
          // "MainTabs" hai

          name: MAIN_TABS,

          // ==================================
          // OPEN SPECIFIC BOTTOM TAB
          // ==================================

          state: {

            // History = 2
            // Home    = 0
            // Loan    = 1
            // Profile = 3

            index: tabIndex,

            routes: [

              {
                name: "Home",
              },

              {
                name: "Loan",
              },

              {
                name: "History",
              },

              {
                name: "Profile",
              },

            ],

          },

        },

      ],

    })
  );

};


// ============================================
// RESET TO TAB + OPEN NESTED SCREEN
// ============================================
//
// Example:
//
// resetAndNavigate(
//   navigation,
//   "History",
//   "get-single-loan-detail",
//   {
//     loanId: 123,
//   }
// );
//
// ============================================

export const resetAndNavigate = (
  navigation,
  tabName,
  screenName,
  params = {}
) => {

  // ==========================================
  // FIND TAB INDEX
  // ==========================================

  const tabIndex =
    BOTTOM_TABS.indexOf(
      tabName
    );


  // ==========================================
  // INVALID TAB
  // ==========================================

  if (tabIndex === -1) {

    console.warn(
      `Invalid bottom tab: ${tabName}`
    );

    return;

  }


  // ==========================================
  // RESET TO MAIN TABS
  // ==========================================

  navigation.dispatch(
    CommonActions.reset({

      index: 0,

      routes: [

        {
          name: MAIN_TABS,

          state: {

            index: tabIndex,

            routes: [

              {
                name: "Home",
              },

              {
                name: "Loan",
              },

              {
                name: "History",
              },

              {
                name: "Profile",
              },

            ],

          },

        },

      ],

    })
  );


  // ==========================================
  // OPEN SCREEN AFTER RESET
  // ==========================================

  if (screenName) {

    setTimeout(() => {

      navigation.navigate(
        screenName,
        params
      );

    }, 100);

  }

};