import {
  useCallback,
  useState,
} from "react";

import {
  Platform,
  Linking,
} from "react-native";

import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from "react-native-permissions";

import Geolocation from "react-native-geolocation-service";


// =====================================================
// PERMISSION
// =====================================================

const getLocationPermission =
  async () => {

    const permission =
      Platform.OS === "ios"
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;


    let result =
      await check(permission);


    if (
      result === RESULTS.DENIED
    ) {

      result =
        await request(permission);

    }


    return result;

  };


// =====================================================
// HOOK
// =====================================================

const useCurrentLocation = () => {

  const [
    loading,
    setLoading,
  ] = useState(false);


  const [
    location,
    setLocation,
  ] = useState(null);


  const [
    error,
    setError,
  ] = useState(null);


  // ===================================================
  // GET LOCATION
  // ===================================================

  const getCurrentLocation =
    useCallback(
      async () => {

        setLoading(true);

        setError(null);


        try {

          // ==========================================
          // PERMISSION
          // ==========================================

          const permission =
            await getLocationPermission();


          // ==========================================
          // GRANTED
          // ==========================================

          if (
            permission !==
            RESULTS.GRANTED
          ) {

            if (
              permission ===
              RESULTS.BLOCKED
            ) {

              setError(
                "Location permission is blocked. Please enable it from Settings."
              );

            } else {

              setError(
                "Location permission is required."
              );

            }

            return null;

          }


          // ==========================================
          // GPS
          // ==========================================

          const position =
            await new Promise(
              (
                resolve,
                reject
              ) => {

                Geolocation.getCurrentPosition(

                  resolve,

                  reject,

                  {
                    enableHighAccuracy:
                      true,

                    timeout:
                      15000,

                    maximumAge:
                      10000,

                    forceRequestLocation:
                      true,

                    showLocationDialog:
                      true,
                  }

                );

              }
            );


          // ==========================================
          // COORDINATES
          // ==========================================

          const latitude =
            position?.coords?.latitude;

          const longitude =
            position?.coords?.longitude;


          if (
            typeof latitude !==
              "number" ||
            typeof longitude !==
              "number"
          ) {

            throw new Error(
              "Unable to get valid location."
            );

          }


          const result = {

            latitude,

            longitude,

            accuracy:
              position?.coords
                ?.accuracy ?? null,

          };


          setLocation(result);


          return result;

        } catch (err) {

          console.log(
            "Location Error:",
            err
          );


          let message =
            "Unable to get your location.";


          if (
            err?.code === 1
          ) {

            message =
              "Location permission denied.";

          }


          if (
            err?.code === 2
          ) {

            message =
              "Location is unavailable. Please enable GPS.";

          }


          if (
            err?.code === 3
          ) {

            message =
              "Location request timed out.";

          }


          setError(message);


          return null;

        } finally {

          setLoading(false);

        }

      },
      []
    );


  // ===================================================
  // OPEN SETTINGS
  // ===================================================

  const openLocationSettings =
    useCallback(
      async () => {

        try {

          await openSettings();

        } catch {

          await Linking.openSettings();

        }

      },
      []
    );


  // ===================================================
  // RETURN
  // ===================================================

  return {

    location,

    loading,

    error,

    getCurrentLocation,

    openLocationSettings,

  };

};


export default useCurrentLocation;