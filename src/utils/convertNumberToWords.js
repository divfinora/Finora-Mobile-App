import { toWords } from "number-to-words";

export const convertNumberToWords = (value) => {
  try {
    if (!value) return "";

    // Remove commas, spaces, ₹ symbol etc.
    const cleaned = String(value).replace(/[^\d]/g, "");

    if (!cleaned) return "";

    const amount = Number(cleaned);

    if (!Number.isSafeInteger(amount)) {
      return "";
    }

    return `${toWords(amount)} Rupees Only`;
  } catch (error) {
    console.log("convertNumberToWords Error:", error);
    return "";
  }
};