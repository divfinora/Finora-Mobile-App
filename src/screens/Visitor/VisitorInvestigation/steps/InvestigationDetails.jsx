import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import {
  FileText,
  MapPin,
  Home,
  ChevronDown,
  Check,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";

import CommonInput from "../../../../components/common/Input/CommonInput";

import CustomBottomSheet from "../../../../components/common/Modal/CustomBottomSheet";

import useCurrentLocation
  from "../../../../hooks/useCurrentLocation";


// =====================================================
// OUTCOME OPTIONS
// =====================================================

const OUTCOME_OPTIONS = [
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
  {
    label: "Submitted",
    value: "SUBMITTED",
  },
];


// =====================================================
// COMPONENT
// =====================================================

const InvestigationDetails = ({
  job,
  data = {},
  onChange,
}) => {

  // =====================================================
  // LOCATION HOOK
  // =====================================================

  const {
    location,
    loading: locationLoading,
    error: locationError,
    permissionBlocked,
    getCurrentLocation,
    openLocationSettings,
  } = useCurrentLocation();


  // =====================================================
  // LOCATION STATUS
  // =====================================================

  const hasValidLocation =
    typeof location?.latitude === "number" &&
    typeof location?.longitude === "number";


  /*
   * Address field disabled when:
   *
   * 1. Location is loading
   * 2. Valid latitude + longitude received
   *
   * If location fails:
   * location = null
   * locationLoading = false
   *
   * Therefore address becomes editable.
   */

  const isAddressDisabled =
    locationLoading ||
    hasValidLocation;


  // =====================================================
  // OUTCOME SHEET
  // =====================================================

  const [
    outcomeVisible,
    setOutcomeVisible,
  ] = useState(false);


  // =====================================================
  // INPUT BORDER
  // =====================================================

  const inputBorder = {
    borderWidth: 0.6,
    borderColor: "#C6C6CD",
  };


  // =====================================================
  // UPDATE FIELD
  // =====================================================

  const updateField = (
    field,
    value
  ) => {

    onChange?.({
      [field]: value,
    });

  };


  // =====================================================
  // AUTO DETECT LOCATION
  // =====================================================

  const handleAutoDetectLocation = async () => {

    const result =
      await getCurrentLocation();


    if (!result) {
      return;
    }


    console.log(
      "📍 AUTO DETECT LATITUDE:",
      result.latitude
    );


    console.log(
      "📍 AUTO DETECT LONGITUDE:",
      result.longitude
    );


    console.log(
      "📍 AUTO DETECT LOCATION:",
      result
    );


    onChange?.({

      latitude:
        result.latitude,

      longitude:
        result.longitude,

      locationAccuracy:
        result.accuracy,

    });

  };


  // =====================================================
  // SELECT OUTCOME
  // =====================================================

  const handleSelectOutcome = (
    option
  ) => {

    updateField(
      "verificationStatus",
      option.value
    );


    updateField(
      "verificationStatusLabel",
      option.label
    );


    setOutcomeVisible(false);

  };


  // =====================================================
  // SELECTED OUTCOME
  // =====================================================

  const selectedOutcome =
    OUTCOME_OPTIONS.find(
      (option) =>
        option.value ===
        data?.verificationStatus
    );


  // =====================================================
  // AUTO FETCH LOCATION
  // WHEN SCREEN LOADS
  // =====================================================

  useEffect(() => {

    let mounted = true;


    const fetchLocation = async () => {

      const result =
        await getCurrentLocation();


      if (
        !mounted ||
        !result
      ) {
        return;
      }


      console.log(
        "📍 CURRENT LOCATION:",
        {
          latitude:
            result.latitude,

          longitude:
            result.longitude,

          accuracy:
            result.accuracy,
        }
      );


      console.log(
        "📍 LATITUDE:",
        result.latitude
      );


      console.log(
        "📍 LONGITUDE:",
        result.longitude
      );


      onChange?.({

        latitude:
          result.latitude,

        longitude:
          result.longitude,

        locationAccuracy:
          result.accuracy,

      });

    };


    fetchLocation();


    return () => {

      mounted = false;

    };

  }, []);


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <View>

      {/* =================================================
          INVESTIGATION DETAILS
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.white,

          borderRadius:
            theme.radius.xl,

          padding:
            theme.spacing.lg,

          marginBottom:
            theme.spacing.lg,

          ...theme.shadows.card,
        }}
      >

        {/* SECTION HEADER */}

        <View
          style={{
            flexDirection:
              "row",

            alignItems:
              "center",

            marginBottom:
              theme.spacing.lg,
          }}
        >

          <FileText
            size={20}
            color={
              theme.colors.primary500
            }
          />

          <Text
            style={{
              marginLeft:
                theme.spacing.sm,

              color:
                theme.colors.black,

              fontSize:
                theme.typography.b2,

              fontFamily:
                theme.fonts.bold,
            }}
          >
            INVESTIGATION DETAILS
          </Text>

        </View>


        {/* =================================================
            DESCRIBE INVESTIGATION
        ================================================= */}

        <CommonInput
          label="Describe Investigation"

          placeholder="Detail the observations made during the field visit..."

          value={
            data?.description ||
            ""
          }

          onChangeText={(value) =>
            updateField(
              "description",
              value
            )
          }

          multiline

          numberOfLines={5}

          containerStyle={{
            marginBottom: 0,
          }}

          inputContainerStyle={{
            minHeight: 126,

            alignItems:
              "flex-start",

            paddingTop: 16,

            ...inputBorder,
          }}

          inputStyle={{
            minHeight: 100,

            textAlignVertical:
              "top",

            fontFamily:
              theme.fonts.regular,
          }}
        />

      </View>


      {/* =================================================
          PROPERTY LOCATION
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.white,

          borderRadius:
            theme.radius.xl,

          padding:
            theme.spacing.lg,

          marginBottom:
            theme.spacing.lg,

          ...theme.shadows.card,
        }}
      >

        {/* SECTION HEADER */}

        <Text
          style={{
            marginBottom:
              theme.spacing.lg,

            color:
              theme.colors.black,

            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.extraBold,
          }}
        >
          PROPERTY LOCATION
        </Text>


        {/* =================================================
            AUTO DETECT LOCATION
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.85}

          onPress={
            handleAutoDetectLocation
          }

          disabled={
            locationLoading
          }

          style={{
            height: 52,

            borderRadius: 14,

            backgroundColor:
              locationLoading
                ? "#BDBDBD"
                : theme.colors.primary500,

            flexDirection:
              "row",

            alignItems:
              "center",

            justifyContent:
              "center",

            marginBottom:
              theme.spacing.lg,
          }}
        >

          {locationLoading ? (

            <ActivityIndicator
              size="small"
              color={
                theme.colors.white
              }
            />

          ) : (

            <>

              <MapPin
                size={20}
                color={
                  theme.colors.white
                }
              />

              <Text
                style={{
                  marginLeft:
                    theme.spacing.sm,

                  color:
                    theme.colors.white,

                  fontSize:
                    theme.typography.b2,

                  fontFamily:
                    theme.fonts.semiBold,
                }}
              >
                Auto Detect Location
              </Text>

            </>

          )}

        </TouchableOpacity>


        {/* =================================================
            LOCATION ERROR
        ================================================= */}

        {!!locationError && !locationLoading && (

          <View
            style={{
              marginTop: -10,

              marginBottom:
                theme.spacing.md,
            }}
          >

            <Text
              style={{
                color:
                  theme.colors.error,

                fontSize: 12,

                fontFamily:
                  theme.fonts.medium,

                lineHeight: 18,
              }}
            >
              {locationError}
            </Text>


            {permissionBlocked && (

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={
                  openLocationSettings
                }
                style={{
                  marginTop: 5,
                }}
              >

                <Text
                  style={{
                    color:
                      theme.colors.primary500,

                    fontSize: 12,

                    fontFamily:
                      theme.fonts.semiBold,
                  }}
                >
                  Open Settings
                </Text>

              </TouchableOpacity>

            )}

          </View>

        )}


        {/* =================================================
            OR
        ================================================= */}

        <View
          style={{
            flexDirection:
              "row",

            alignItems:
              "center",

            marginBottom:
              theme.spacing.lg,
          }}
        >

          <View
            style={{
              flex: 1,

              height: 1,

              backgroundColor:
                theme.colors.gray300,
            }}
          />

          <Text
            style={{
              marginHorizontal:
                theme.spacing.md,

              color:
                theme.colors.gray500,

              fontSize:
                theme.typography.b3,

              fontFamily:
                theme.fonts.medium,
            }}
          >
            OR
          </Text>

          <View
            style={{
              flex: 1,

              height: 1,

              backgroundColor:
                theme.colors.gray300,
            }}
          />

        </View>


        {/* =================================================
            ADDRESS
        ================================================= */}

       
<CommonInput
  label={
    locationLoading
      ? "Fetching Location"
      : hasValidLocation
        ? "Address"
        : "Enter Address"
  }

  placeholder={
    locationLoading
      ? "Fetching current location..."
      : hasValidLocation
        ? "Location will be detected"
        : "123 Business Avenue, Suite 400"
  }

  value={data?.address || ""}

  onChangeText={(value) =>
    updateField("address", value)
  }

  editable={!isAddressDisabled}

  leftIcon={
    <Home
      size={20}
      color={
        isAddressDisabled
          ? theme.colors.gray400
          : theme.colors.gray500
      }
    />
  }

  inputContainerStyle={{
    ...inputBorder,

    backgroundColor:
      isAddressDisabled
        ? "#EEEEF0"
        : theme.colors.gray100,

    opacity:
      isAddressDisabled
        ? 0.7
        : 1,
  }}

  containerStyle={{
    marginBottom: 0,
  }}
/>

        {/* =================================================
            LOCATION PREVIEW
        ================================================= */}

        <View
          style={{
            height: 135,

            marginTop:
              theme.spacing.md,

            borderRadius: 14,

            overflow: "hidden",

            backgroundColor:
              theme.colors.gray100,

            alignItems:
              "center",

            justifyContent:
              "center",

            ...inputBorder,
          }}
        >

          <MapPin
            size={32}
            color={
              theme.colors.primary500
            }
          />


          {/* =================================================
              LOADING
          ================================================= */}

          {locationLoading ? (

            <Text
              style={{
                marginTop:
                  theme.spacing.sm,

                color:
                  theme.colors.gray500,

                fontSize:
                  theme.typography.b3,

                fontFamily:
                  theme.fonts.medium,
              }}
            >
              Fetching current location...
            </Text>

          ) : hasValidLocation ? (

            /* =================================================
               LOCATION FOUND
            ================================================= */

            <>

              <Text
                style={{
                  marginTop:
                    theme.spacing.sm,

                  color:
                    theme.colors.black,

                  fontSize:
                    theme.typography.b3,

                  fontFamily:
                    theme.fonts.semiBold,
                }}
              >
                Location detected
              </Text>


              <Text
                style={{
                  marginTop: 4,

                  color:
                    theme.colors.gray500,

                  fontSize: 11,

                  fontFamily:
                    theme.fonts.regular,
                }}
              >
                {location.latitude?.toFixed(6)}
                {", "}
                {location.longitude?.toFixed(6)}
              </Text>

            </>

          ) : (

            /* =================================================
               NO LOCATION
            ================================================= */

            <>

              <Text
                style={{
                  marginTop:
                    theme.spacing.sm,

                  color:
                    theme.colors.gray500,

                  fontSize:
                    theme.typography.b3,

                  fontFamily:
                    theme.fonts.medium,
                }}
              >
                Location Preview
              </Text>


              <Text
                style={{
                  marginTop: 2,

                  color:
                    theme.colors.gray500,

                  fontSize: 11,

                  fontFamily:
                    theme.fonts.regular,
                }}
              >
                Live GPS will appear here
              </Text>

            </>

          )}

        </View>

      </View>


      {/* =================================================
          REMARKS
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.white,

          borderRadius:
            theme.radius.xl,

          padding:
            theme.spacing.lg,

          marginBottom:
            theme.spacing.lg,

          ...theme.shadows.card,
        }}
      >

        <Text
          style={{
            marginBottom:
              theme.spacing.md,

            color:
              theme.colors.black,

            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.extraBold,
          }}
        >
          REMARKS
        </Text>


        <CommonInput
          placeholder="Add any additional context or internal notes..."

          value={
            data?.remarks ||
            ""
          }

          onChangeText={(value) =>
            updateField(
              "remarks",
              value
            )
          }

          multiline

          numberOfLines={3}

          containerStyle={{
            marginBottom: 0,
          }}

          inputContainerStyle={{
            minHeight: 86,

            alignItems:
              "flex-start",

            paddingTop: 14,

            ...inputBorder,
          }}

          inputStyle={{
            minHeight: 70,

            textAlignVertical:
              "top",

            fontFamily:
              theme.fonts.regular,
          }}
        />

      </View>


      {/* =================================================
          RECOMMENDATION
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.white,

          borderRadius:
            theme.radius.xl,

          padding:
            theme.spacing.lg,

          marginBottom:
            theme.spacing.xl,

          ...theme.shadows.card,
        }}
      >

        <Text
          style={{
            marginBottom:
              theme.spacing.lg,

            color:
              theme.colors.black,

            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.extraBold,
          }}
        >
          RECOMMENDATION
        </Text>


        <Text
          style={{
            marginBottom:
              theme.spacing.sm,

            color:
              theme.colors.gray700,

            fontSize:
              theme.typography.b4,

            fontFamily:
              theme.fonts.medium,
          }}
        >
          Verification Status
        </Text>


        {/* =================================================
            DROPDOWN
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.8}

          onPress={() =>
            setOutcomeVisible(true)
          }

          style={{
            height: 56,

            borderRadius: 16,

            backgroundColor:
              theme.colors.gray100,

            paddingHorizontal:
              theme.spacing.lg,

            flexDirection:
              "row",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            ...inputBorder,
          }}
        >

          <Text
            style={{
              color:
                selectedOutcome
                  ? theme.colors.black
                  : theme.colors.gray500,

              fontSize:
                theme.typography.b1,

              fontFamily:
                theme.fonts.regular,
            }}
          >
            {
              selectedOutcome?.label ||
              "Select Outcome"
            }
          </Text>


          <ChevronDown
            size={20}
            color={
              theme.colors.gray500
            }
          />

        </TouchableOpacity>

      </View>


      {/* =================================================
          COMMON BOTTOM SHEET
      ================================================= */}

      <CustomBottomSheet

        visible={
          outcomeVisible
        }

        onClose={() =>
          setOutcomeVisible(false)
        }

        sheetheading="Select Outcome"

        heightPercent={0.45}
      >

        {OUTCOME_OPTIONS.map(
          (option) => {

            const isSelected =
              data?.verificationStatus ===
              option.value;


            return (

              <TouchableOpacity
                key={
                  option.value
                }

                activeOpacity={0.8}

                onPress={() =>
                  handleSelectOutcome(
                    option
                  )
                }

                style={{
                  minHeight: 56,

                  borderRadius: 14,

                  backgroundColor:
                    isSelected
                      ? "#FFF3EA"
                      : theme.colors.gray100,

                  borderWidth:
                    isSelected
                      ? 1
                      : 0,

                  borderColor:
                    isSelected
                      ? theme.colors.primary500
                      : "transparent",

                  paddingHorizontal:
                    theme.spacing.lg,

                  flexDirection:
                    "row",

                  alignItems:
                    "center",

                  justifyContent:
                    "space-between",

                  marginBottom:
                    theme.spacing.sm,
                }}
              >

                <Text
                  style={{
                    color:
                      isSelected
                        ? theme.colors.primary500
                        : theme.colors.black,

                    fontSize:
                      theme.typography.b1,

                    fontFamily:
                      isSelected
                        ? theme.fonts.semiBold
                        : theme.fonts.regular,
                  }}
                >
                  {option.label}
                </Text>


                {isSelected && (

                  <Check
                    size={20}

                    color={
                      theme.colors.primary500
                    }

                    strokeWidth={2.5}
                  />

                )}

              </TouchableOpacity>

            );

          }
        )}

      </CustomBottomSheet>

    </View>

  );

};


export default InvestigationDetails;