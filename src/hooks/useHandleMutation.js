  import {
  useCallback,
  useEffect,
  useRef,
} from "react";

import NetInfo from "@react-native-community/netinfo";

import {
  useDispatch,
} from "react-redux";

 

import {
  withTimeout,
} from "../utils/withTimeout.js";
import {
  showToast,
} from "../utils/toast";

/**
 * ==================================================
 * useHandleMutation
 * ==================================================
 *
 * ✅ RTK Query Mutation Helper
 * ✅ Offline Check
 * ✅ Timeout Support
 * ✅ Abort Previous Request
 * ✅ Success / Error Alerts
 * ✅ Common Error Handling
 * ✅ Auto Abort On Unmount
 *
 * NOTE:
 * 401 / 403 Logout is handled inside baseApi.
 */

const useHandleMutation = () => {

   
const dispatch = useDispatch();
  /* ===================================== */
  /* CURRENT REQUEST */
  /* ===================================== */

  const requestRef = useRef(null);

  /* ===================================== */
  /* SHOW ALERT */
  /* ===================================== */
const showAlert = useCallback(
  (type, message) => {

    showToast[type]?.(message);

  },
  []
);


// const showAlert = useCallback(
//   (type, title, message = "") => {

//     showToast[type]?.(
//       title,
//       message
//     );

//   },
//   []
// );

  /* ===================================== */
  /* ABORT CURRENT REQUEST */
  /* ===================================== */

  const abort = useCallback(() => {

    requestRef.current?.abort?.();

    requestRef.current = null;

  }, []);

  /* ===================================== */
  /* HANDLE MUTATION */
  /* ===================================== */

  const handleMutation = useCallback(

    async ({

      apiFunc,

      params,

      timeoutMs = 8000,

      showSuccess = false,

      showError = true,

      customSuccessMsg = null,

      customErrorMsg = null,

      dispatches = [],

      onSuccess = null,

      onError = null,

    }) => {

      try {

        /* ============================== */
        /* INTERNET CHECK */
        /* ============================== */

        const netState =
          await NetInfo.fetch();

        if (!netState.isConnected) {

          throw {
            name: "OfflineError",
          };

        }

        /* ============================== */
        /* ABORT PREVIOUS REQUEST */
        /* ============================== */

        requestRef.current?.abort?.();

        /* ============================== */
        /* CREATE REQUEST */
        /* ============================== */

        const request =
          apiFunc(params);

        requestRef.current =
          request;

        /* ============================== */
        /* API CALL WITH TIMEOUT */
        /* ============================== */

        const response =
          await withTimeout(

            () =>
              request.unwrap(),

            timeoutMs

          );

        /* ============================== */
        /* EXTRA REDUX DISPATCH */
        /* ============================== */

        dispatches.forEach(

          (action) => {

            dispatch(
              action(response)
            );

          }

        );  

        /* ============================== */
        /* SUCCESS ALERT */
        /* ============================== */

        if (showSuccess) {

          showAlert(

            "success",

            customSuccessMsg ||

            response?.message ||

            "Success"

          );

        }

        /* ============================== */
        /* SUCCESS CALLBACK */
        /* ============================== */

        onSuccess?.(
          response
        );

        return response;
                /* ============================== */
        /* ERROR HANDLING */
        /* ============================== */

      } catch (err) {
         console.log(err ,'error ======= = = = = == == = = == = = = = = = = ==')

        // console.log(
        //   "Mutation Error:",
        //   err
        // );

        let message =
          customErrorMsg ||
          "Something went wrong";

        /* ============================== */
        /* OFFLINE */
        /* ============================== */

        if (
          err?.name === "OfflineError"
        ) {

          message =
            "🚫 You are offline";

        }

        /* ============================== */
        /* REQUEST ABORTED */
        /* ============================== */

        else if (
          err?.name === "AbortError"
        ) {

          message =
            "Request cancelled";

        }

        /* ============================== */
        /* REQUEST TIMEOUT */
        /* ============================== */

        else if (
          err?.name === "TimeoutError"
        ) {

          message =
            "Request timed out";

        }

        /* ============================== */
        /* NETWORK ERROR */
        /* ============================== */

        else if (
          err?.status === "FETCH_ERROR"
        ) {

          message =
            "Unable to connect to server";

        }

        /* ============================== */
        /* UNAUTHORIZED */
        /* Handled by baseApi */
        /* ============================== */

        else if (
          err?.status === 401 ||
          err?.status === 403
        ) {

          message =
            "Session expired. Please login again";

        }

        /* ============================== */
        /* SERVER MESSAGE */
        /* ============================== */

        else if (
          err?.data?.error
        ) {

          message =
            err.data.error;

        }

        else if (
          err?.data?.message
        ) {

          message =
            err.data.message;

        }

        /* ============================== */
        /* SERVER ERROR */
        /* ============================== */

        else if (
          err?.status === 500
        ) {

          message =
            "Server error. Please try again later.";

        }

        /* ============================== */
        /* SHOW ERROR ALERT */
        /* ============================== */

        if (showError) {

          showAlert(
            "error",
            message
          );

        }

        /* ============================== */
        /* ERROR CALLBACK */
        /* ============================== */

        onError?.(
          err
        );

        return null;

      }

      /* ============================== */
      /* CLEANUP */
      /* ============================== */

      finally {

        requestRef.current =
          null;

      }

    },

    [
      dispatch,
      showAlert,
    ]

  );

  /* ===================================== */
  /* AUTO ABORT ON UNMOUNT */
  /* ===================================== */

  useEffect(() => {

    return () => {

      abort();

    };

  }, [abort]);

  /* ===================================== */
  /* RETURN */
  /* ===================================== */

  return {

    handleMutation,

    abort,

  };

};

export default useHandleMutation;