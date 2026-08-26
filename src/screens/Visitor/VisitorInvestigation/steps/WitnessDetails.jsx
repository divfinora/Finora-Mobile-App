import React, {
  useState,
} from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  UserRound,
  Phone,
  UsersRound,
  BadgeCheck,
  CreditCard,
  ChevronDown,
  Check,
} from "lucide-react-native";

import { theme } from "../../../../theme";

import CommonInput from "../../../../components/common/Input/CommonInput";


// =====================================================
// OPTIONS
// =====================================================

const RELATION_OPTIONS = [
  "Father",
  "Mother",
  "Brother",
  "Sister",
  "Spouse",
  "Friend",
  "Neighbour",
  "Other",
];

const ID_TYPE_OPTIONS = [
  "Aadhaar Card",
  "PAN Card",
  "Driving License",
  "Voter ID",
  "Passport",
];


// =====================================================
// COMPONENT
// =====================================================

const WitnessDetails = ({
  job,
  data = {},
  onChange,
}) => {

  const [
    relationOpen,
    setRelationOpen,
  ] = useState(false);

  const [
    idTypeOpen,
    setIdTypeOpen,
  ] = useState(false);


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
  // RELATION
  // =====================================================

  const handleRelationSelect = (
    value
  ) => {

    updateField(
      "relation",
      value
    );

    setRelationOpen(false);

  };


  // =====================================================
  // ID TYPE
  // =====================================================

  const handleIdTypeSelect = (
    value
  ) => {

    updateField(
      "idType",
      value
    );

    setIdTypeOpen(false);

  };


  // =====================================================
  // CONFIRMATION
  // =====================================================

  const handleConfirmation = () => {

    updateField(
      "witnessConfirmed",
      !data?.witnessConfirmed
    );

  };


  return (

    <View
      style={{
        width: "100%",
      }}
    >

      {/* =================================================
          WITNESS BANNER
      ================================================= */}

      <View
        style={{
          height: 215,

          borderRadius: 14,

          overflow: "hidden",

          marginBottom:
            theme.spacing.lg,

          backgroundColor:
            "#D9D9D9",
        }}
      >

        <Image
          source={{
            uri:
              "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80",
          }}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
          }}
        />

        {/* Overlay */}

        <View
          style={{
            position: "absolute",

            left: 0,
            right: 0,
            bottom: 0,

            paddingHorizontal: 16,
            paddingVertical: 14,

            backgroundColor:
              "rgba(0,0,0,0.25)",
          }}
        >

          <Text
            style={{
              color:
                theme.colors.white,

              fontSize:
                theme.typography.b2,

              fontFamily:
                theme.fonts.medium,
            }}
          >
            Verify witness identity carefully
          </Text>

        </View>

      </View>


      {/* =================================================
          WITNESS NAME
      ================================================= */}

      <CommonInput
        label="Witness Name"
        placeholder="Enter full legal name"
        value={
          data?.witnessName || ""
        }
        onChangeText={(value) =>
          updateField(
            "witnessName",
            value
          )
        }
        autoCapitalize="words"
        leftIcon={
          <UserRound
            size={19}
            color="#555A61"
          />
        }
        inputContainerStyle={{
          backgroundColor:
            theme.colors.white,

          borderWidth: 1,

          borderColor:
            "#C8CBD1",

          borderRadius: 14,
        }}
      />


      {/* =================================================
          MOBILE NUMBER
      ================================================= */}

      <CommonInput
        label="Mobile Number"
        placeholder="10-digit phone number"
        value={
          data?.mobileNumber || ""
        }
        onChangeText={(value) =>
          updateField(
            "mobileNumber",
            value
          )
        }
        keyboardType="phone-pad"
        maxLength={10}
        leftIcon={
          <Phone
            size={19}
            color="#555A61"
          />
        }
        inputContainerStyle={{
          backgroundColor:
            theme.colors.white,

          borderWidth: 1,

          borderColor:
            "#C8CBD1",

          borderRadius: 14,
        }}
      />


      {/* =================================================
          RELATION TO APPLICANT
      ================================================= */}

      <View
        style={{
          marginBottom:
            theme.spacing.xl,
        }}
      >

        <Text
          style={{
            marginBottom:
              theme.spacing.sm,

            color:
              "#607796",

            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.medium,
          }}
        >
          Relation to Applicant
        </Text>


        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {

            setRelationOpen(
              (previous) =>
                !previous
            );

            setIdTypeOpen(false);

          }}
          style={{
            height: 62,

            borderRadius: 14,

            borderWidth: 1,

            borderColor:
              "#C8CBD1",

            backgroundColor:
              theme.colors.white,

            paddingHorizontal: 16,

            flexDirection: "row",

            alignItems: "center",

            justifyContent:
              "space-between",
          }}
        >

          <View
            style={{
              flexDirection: "row",

              alignItems: "center",

              flex: 1,
            }}
          >

            <UsersRound
              size={19}
              color="#555A61"
            />

            <Text
              style={{
                marginLeft: 12,

                color:
                  data?.relation
                    ? theme.colors.black
                    : "#9A9CA2",

                fontSize: 16,

                fontFamily:
                  theme.fonts.regular,
              }}
            >
              {data?.relation ||
                "Select relation"}
            </Text>

          </View>


          <ChevronDown
            size={20}
            color="#62666D"
          />

        </TouchableOpacity>


        {/* Dropdown */}

        {relationOpen && (

          <View
            style={{
              marginTop: 6,

              backgroundColor:
                theme.colors.white,

              borderRadius: 12,

              borderWidth: 1,

              borderColor:
                "#E1E2E5",

              overflow: "hidden",

              elevation: 3,
            }}
          >

            {RELATION_OPTIONS.map(
              (option) => (

                <TouchableOpacity
                  key={option}
                  activeOpacity={0.8}
                  onPress={() =>
                    handleRelationSelect(
                      option
                    )
                  }
                  style={{
                    minHeight: 48,

                    paddingHorizontal: 16,

                    flexDirection: "row",

                    alignItems: "center",

                    justifyContent:
                      "space-between",
                  }}
                >

                  <Text
                    style={{
                      color:
                        theme.colors.black,

                      fontSize: 15,

                      fontFamily:
                        theme.fonts.regular,
                    }}
                  >
                    {option}
                  </Text>


                  {data?.relation ===
                    option && (

                    <Check
                      size={18}
                      color={
                        theme.colors.primary500
                      }
                    />

                  )}

                </TouchableOpacity>

              )
            )}

          </View>

        )}

      </View>


      {/* =================================================
          ID TYPE
      ================================================= */}

      <View
        style={{
          marginBottom:
            theme.spacing.xl,
        }}
      >

        <Text
          style={{
            marginBottom:
              theme.spacing.sm,

            color:
              "#607796",

            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.medium,
          }}
        >
          ID Type
        </Text>


        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {

            setIdTypeOpen(
              (previous) =>
                !previous
            );

            setRelationOpen(false);

          }}
          style={{
            height: 62,

            borderRadius: 14,

            borderWidth: 1,

            borderColor:
              "#C8CBD1",

            backgroundColor:
              theme.colors.white,

            paddingHorizontal: 16,

            flexDirection: "row",

            alignItems: "center",

            justifyContent:
              "space-between",
          }}
        >

          <View
            style={{
              flexDirection: "row",

              alignItems: "center",

              flex: 1,
            }}
          >

            <BadgeCheck
              size={19}
              color="#555A61"
            />

            <Text
              style={{
                marginLeft: 12,

                color:
                  data?.idType
                    ? theme.colors.black
                    : "#9A9CA2",

                fontSize: 16,

                fontFamily:
                  theme.fonts.regular,
              }}
            >
              {data?.idType ||
                "Select ID"}
            </Text>

          </View>


          <ChevronDown
            size={20}
            color="#62666D"
          />

        </TouchableOpacity>


        {/* Dropdown */}

        {idTypeOpen && (

          <View
            style={{
              marginTop: 6,

              backgroundColor:
                theme.colors.white,

              borderRadius: 12,

              borderWidth: 1,

              borderColor:
                "#E1E2E5",

              overflow: "hidden",

              elevation: 3,
            }}
          >

            {ID_TYPE_OPTIONS.map(
              (option) => (

                <TouchableOpacity
                  key={option}
                  activeOpacity={0.8}
                  onPress={() =>
                    handleIdTypeSelect(
                      option
                    )
                  }
                  style={{
                    minHeight: 48,

                    paddingHorizontal: 16,

                    flexDirection: "row",

                    alignItems: "center",

                    justifyContent:
                      "space-between",
                  }}
                >

                  <Text
                    style={{
                      color:
                        theme.colors.black,

                      fontSize: 15,

                      fontFamily:
                        theme.fonts.regular,
                    }}
                  >
                    {option}
                  </Text>


                  {data?.idType ===
                    option && (

                    <Check
                      size={18}
                      color={
                        theme.colors.primary500
                      }
                    />

                  )}

                </TouchableOpacity>

              )
            )}

          </View>

        )}

      </View>


      {/* =================================================
          ID NUMBER
      ================================================= */}

      <CommonInput
        label="ID Number"
        placeholder="Enter ID details"
        value={
          data?.idNumber || ""
        }
        onChangeText={(value) =>
          updateField(
            "idNumber",
            value
          )
        }
        autoCapitalize="characters"
        leftIcon={
          <CreditCard
            size={19}
            color="#555A61"
          />
        }
        inputContainerStyle={{
          backgroundColor:
            theme.colors.white,

          borderWidth: 1,

          borderColor:
            "#C8CBD1",

          borderRadius: 14,
        }}
      />


      {/* =================================================
          WITNESS CONFIRMATION
      ================================================= */}

      <TouchableOpacity
        activeOpacity={0.85}
        onPress={
          handleConfirmation
        }
        style={{
          backgroundColor:
            "#F0F1F2",

          borderRadius: 14,

          padding: 16,

          flexDirection: "row",

          alignItems: "flex-start",

          marginBottom:
            theme.spacing.lg,
        }}
      >

        {/* Checkbox */}

        <View
          style={{
            width: 26,

            height: 26,

            borderRadius: 4,

            borderWidth: 1,

            borderColor:
              data?.witnessConfirmed
                ? theme.colors.primary500
                : "#C8CBD1",

            backgroundColor:
              data?.witnessConfirmed
                ? theme.colors.primary500
                : theme.colors.white,

            alignItems: "center",

            justifyContent: "center",

            marginRight: 14,
          }}
        >

          {data?.witnessConfirmed && (

            <Check
              size={17}
              color={
                theme.colors.white
              }
              strokeWidth={3}
            />

          )}

        </View>


        {/* Confirmation Text */}

        <Text
          style={{
            flex: 1,

            color:
              theme.colors.black,

            fontSize: 16,

            lineHeight: 23,

            fontFamily:
              theme.fonts.regular,
          }}
        >
          Witness confirms above information is
          true and correct and agrees to be
          contacted for verification purposes.
        </Text>

      </TouchableOpacity>

    </View>

  );

};


export default WitnessDetails;