import Toast from "react-native-toast-message";

const DEFAULT_OPTIONS = {
  position: "top",
  visibilityTime: 2500,
  autoHide: true,
  topOffset: 60,
};

const show = ({
  type = "success",
  text1 = "",
  text2 = "",
  ...rest
}) => {

  Toast.show({
    ...DEFAULT_OPTIONS,
    type,
    text1,
    text2,
    ...rest,
  });

};

const hide = () => {
  Toast.hide();
};

export const showToast = Object.assign(show, {

  success: (
    text1,
    text2 = "",
    options = {}
  ) => {

    show({
      type: "success",
      text1,
      text2,
      ...options,
    });

  },

  error: (
    text1,
    text2 = "",
    options = {}
  ) => {

    show({
      type: "error",
      text1,
      text2,
      ...options,
    });

  },

  warning: (
    text1,
    text2 = "",
    options = {}
  ) => {

    show({
      type: "warning",
      text1,
      text2,
      ...options,
    });

  },

  info: (
    text1,
    text2 = "",
    options = {}
  ) => {

    show({
      type: "info",
      text1,
      text2,
      ...options,
    });

  },

  hide,

});

export default showToast;