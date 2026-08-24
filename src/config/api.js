// ============================================
// API Configuration
// ============================================

// Development URL
  const DEV_BASE_URL = "https://finora-app-i8ge.onrender.com";
 

// Production URL
  const PROD_BASE_URL = "https://finora-app-i8ge.onrender.com";
 

// Automatically choose URL
const BASE_URL = __DEV__
    ? DEV_BASE_URL
    : PROD_BASE_URL;

export {
    BASE_URL,
    DEV_BASE_URL,
    PROD_BASE_URL,
};

export default {
    BASE_URL,
    DEV_BASE_URL,
    PROD_BASE_URL,
};