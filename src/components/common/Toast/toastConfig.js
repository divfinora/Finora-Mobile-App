import React from "react";
import ToastCard from "./ToastCard";

const toastConfig = {
  success: ({ text1, text2, hide }) => (
    <ToastCard
      type="success"
      text1={text1}
      text2={text2}
      hide={hide}
    />
  ),

  error: ({ text1, text2, hide }) => (
    <ToastCard
      type="error"
      text1={text1}
      text2={text2}
      hide={hide}
    />
  ),

  warning: ({ text1, text2, hide }) => (
    <ToastCard
      type="warning"
      text1={text1}
      text2={text2}
      hide={hide}
    />
  ),

  info: ({ text1, text2, hide }) => (
    <ToastCard
      type="info"
      text1={text1}
      text2={text2}
      hide={hide}
    />
  ),
};

export default toastConfig;