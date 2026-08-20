import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import {
  MapPin,
} from 'lucide-react-native';

import CommonInput
  from '../../../../../components/common/Input/CommonInput';

import CommonSwitch
  from '../../../../../components/common/Button/CommonSwitch';

import CommonArrayDropdown
  from '../../../../../components/common/Modal/CommonArrayDropdown';

import { theme }
  from '../../../../../theme';


// ======================================================
// CONSTANTS
// ======================================================

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Puducherry',
  'Chandigarh',
];


// ======================================================
// COMMON BORDER
// ======================================================

const commonBorderStyle = {
  borderWidth: 0.3,
  borderColor: '#48484a58',
};


// ======================================================
// COMPONENT
// ======================================================

const AddressForm = ({
  formData = {},
  setFormData,
  errors = {},
  setErrors,
}) => {

  // ====================================================
  // CURRENT ADDRESS
  // ====================================================

  const currentAddress =
    formData?.currentAddress || {};


  // ====================================================
  // PERMANENT ADDRESS
  // ====================================================

  const permanentAddress =
    formData?.permanentAddress || {};


  // ====================================================
  // SAME AS CURRENT
  // ====================================================

  const sameAsCurrent =
    formData?.sameAsCurrent || false;


  // ====================================================
  // UPDATE CURRENT ADDRESS
  // ====================================================

  const updateCurrentAddress = (
    field,
    value
  ) => {

    setFormData?.((prev) => ({

      ...prev,

      currentAddress: {

        ...(prev?.currentAddress || {}),

        [field]: value,

      },

    }));


    // Clear error

    if (
      errors?.[`currentAddress${capitalize(field)}`]
    ) {

      setErrors?.((prev) => ({

        ...prev,

        [`currentAddress${capitalize(field)}`]:
          '',

      }));

    }
  };


  // ====================================================
  // UPDATE PERMANENT ADDRESS
  // ====================================================

  const updatePermanentAddress = (
    field,
    value
  ) => {

    setFormData?.((prev) => ({

      ...prev,

      permanentAddress: {

        ...(prev?.permanentAddress || {}),

        [field]: value,

      },

    }));


    // Clear error

    if (
      errors?.[`permanentAddress${capitalize(field)}`]
    ) {

      setErrors?.((prev) => ({

        ...prev,

        [`permanentAddress${capitalize(field)}`]:
          '',

      }));

    }
  };


  // ====================================================
  // SAME AS CURRENT TOGGLE
  // ====================================================

  const handleSameAsCurrent = (
    value
  ) => {

    if (value) {

      // Copy current address

      setFormData?.((prev) => ({

        ...prev,

        sameAsCurrent: true,

        permanentAddress: {

          ...(prev?.currentAddress || {}),

        },

      }));


      // Clear permanent address errors

      setErrors?.((prev) => ({

        ...prev,

        permanentAddressLine1: '',
        permanentAddressCity: '',
        permanentAddressPincode: '',
        permanentAddressState: '',

      }));

    } else {

      setFormData?.((prev) => ({

        ...prev,

        sameAsCurrent: false,

      }));

    }
  };


  // ====================================================
  // RENDER ADDRESS CARD
  // ====================================================

  const renderAddressCard = ({
    title,
    address,
    isPermanent = false,
  }) => {

    const prefix =
      isPermanent
        ? 'permanentAddress'
        : 'currentAddress';


    return (

      <View
        style={{
          backgroundColor:
            theme.colors.white,

          borderRadius:
            theme.radius.lg,

          padding:
            theme.spacing.lg,

          marginBottom:
            theme.spacing.lg,

          ...theme.shadows?.card,
        }}
      >

        {/* ============================================
            CARD TITLE
        ============================================ */}

        <View
          style={{
            flexDirection:
              'row',

            alignItems:
              'center',

            marginBottom:
              theme.spacing.xl,
          }}
        >

          {/* Orange Line */}

          <View
            style={{
              width: 4,

              height: 28,

              backgroundColor:
                '#FF7445',

              borderRadius:
                4,

              marginRight:
                theme.spacing.md,
            }}
          />

          <Text
            style={{
              fontSize:
                theme.typography.b1,

              fontFamily:
                theme.fonts.bold,

              color:
                theme.colors.text,
            }}
          >
            {title}
          </Text>

        </View>


        {/* ============================================
            ADDRESS LINE 1
        ============================================ */}

        <CommonInput

          label="Address Line 1"

          placeholder="House/Flat No., Building Name"

          value={
            address?.line1 || ''
          }

          onChangeText={(text) =>
            isPermanent
              ? updatePermanentAddress(
                  'line1',
                  text
                )
              : updateCurrentAddress(
                  'line1',
                  text
                )
          }

          error={
            isPermanent
              ? errors?.permanentAddressLine1
              : errors?.currentAddressLine1
          }

          containerStyle={{
            marginBottom:
              theme.spacing.lg,
          }}

          inputContainerStyle={{
            ...commonBorderStyle,

            backgroundColor:
              theme.colors.gray100,

            borderRadius:
              theme.radius.md,
          }}

        />


        {/* ============================================
            ADDRESS LINE 2
        ============================================ */}

        <CommonInput

          label="Address Line 2"

          placeholder="Street, Area, Locality"

          value={
            address?.line2 || ''
          }

          onChangeText={(text) =>
            isPermanent
              ? updatePermanentAddress(
                  'line2',
                  text
                )
              : updateCurrentAddress(
                  'line2',
                  text
                )
          }

          containerStyle={{
            marginBottom:
              theme.spacing.lg,
          }}

          inputContainerStyle={{
            ...commonBorderStyle,

            backgroundColor:
              theme.colors.gray100,

            borderRadius:
              theme.radius.md,
          }}

        />


        {/* ============================================
            CITY
        ============================================ */}

        <CommonInput

          label="City"

          placeholder="Enter City"

          value={
            address?.city || ''
          }

          onChangeText={(text) =>
            isPermanent
              ? updatePermanentAddress(
                  'city',
                  text
                )
              : updateCurrentAddress(
                  'city',
                  text
                )
          }

          error={
            isPermanent
              ? errors?.permanentAddressCity
              : errors?.currentAddressCity
          }

          containerStyle={{
            marginBottom:
              theme.spacing.lg,
          }}

          inputContainerStyle={{
            ...commonBorderStyle,

            backgroundColor:
              theme.colors.gray100,

            borderRadius:
              theme.radius.md,
          }}

        />


        {/* ============================================
            PIN CODE
        ============================================ */}

        <CommonInput

          label="PIN Code"

          placeholder="6-digit code"

          value={
            address?.pincode || ''
          }

          onChangeText={(text) => {

            const numericValue =
              text
                .replace(/\D/g, '')
                .slice(0, 6);

            if (isPermanent) {

              updatePermanentAddress(
                'pincode',
                numericValue
              );

            } else {

              updateCurrentAddress(
                'pincode',
                numericValue
              );

            }

          }}

          keyboardType="numeric"

          maxLength={6}

          error={
            isPermanent
              ? errors?.permanentAddressPincode
              : errors?.currentAddressPincode
          }

          containerStyle={{
            marginBottom:
              theme.spacing.lg,
          }}

          inputContainerStyle={{
            ...commonBorderStyle,

            backgroundColor:
              theme.colors.gray100,

            borderRadius:
              theme.radius.md,
          }}

        />


        {/* ============================================
            STATE
        ============================================ */}

        <View>

          <Text
            style={{
              fontSize:
                theme.typography.b3,

              fontFamily:
                theme.fonts.medium,

              color:
                theme.colors.gray700,

              marginBottom:
                theme.spacing.xs,
            }}
          >
            State
          </Text>


          <CommonArrayDropdown

            data={
              INDIAN_STATES
            }

            value={
              address?.state || ''
            }

            placeholder="Select State"

            onChange={(value) => {

              if (isPermanent) {

                updatePermanentAddress(
                  'state',
                  value
                );

              } else {

                updateCurrentAddress(
                  'state',
                  value
                );

              }

            }}

            width="100%"

            height={52}

            borderRadius={
              theme.radius.md
            }

            borderWidth={0.3}

            borderColor="#48484a58"

            backgroundColor={
              theme.colors.gray100
            }

            textStyle={{
              fontSize:
                theme.typography.b2,

              fontFamily:
                theme.fonts.medium,
            }}

          />


          {!!(
            isPermanent
              ? errors?.permanentAddressState
              : errors?.currentAddressState
          ) && (

            <Text
              style={{
                color:
                  theme.colors.error,

                fontSize:
                  theme.typography.b3,

                fontFamily:
                  theme.fonts.medium,

                marginTop:
                  theme.spacing.xs,
              }}
            >
              {
                isPermanent
                  ? errors.permanentAddressState
                  : errors.currentAddressState
              }
            </Text>

          )}

        </View>

      </View>
    );
  };


  return (

    <View
      style={{
        paddingVertical:
          theme.spacing.sm,
      }}
      
    >
{/* ===== Current Address ===== */}
      <Text style={{
        fontSize: theme.typography.b1,
        fontFamily: theme.fonts.headingBold,
        color: theme.colors.text,
        marginBottom: theme.spacing.md,
      }}>Current Address</Text>
      {/* =================================================
          CURRENT ADDRESS
      ================================================= */}

      {renderAddressCard({
        title:
          'Current Address',

        address:
          currentAddress,

        isPermanent:
          false,
      })}


      {/* =================================================
          PERMANENT ADDRESS
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.white,

          borderRadius:
            theme.radius.lg,

          padding:
            theme.spacing.lg,

          marginBottom:
            theme.spacing.xl,
        }}
      >

        {/* ============================================
            TITLE
        ============================================ */}

        <View
          style={{
            flexDirection:
              'row',

            alignItems:
              'center',

            marginBottom:
              theme.spacing.lg,
          }}
        >

          <View
            style={{
              width: 4,

              height: 28,

              backgroundColor:
                '#FF7445',

              borderRadius: 4,

              marginRight:
                theme.spacing.md,
            }}
          />

          <Text
            style={{
              fontSize:
                theme.typography.b1,

              fontFamily:
                theme.fonts.bold,

              color:
                theme.colors.text,
            }}
          >
            Permanent Address
          </Text>

        </View>


        {/* ============================================
            SAME AS CURRENT
        ============================================ */}

        <View
          style={{
            flexDirection:
              'row',

            alignItems:
              'center',

            justifyContent:
              'space-between',

            backgroundColor:
              theme.colors.primary50,

            borderRadius:
              theme.radius.md,

            paddingHorizontal:
              theme.spacing.md,

            paddingVertical:
              theme.spacing.sm,

            marginBottom:
              theme.spacing.xl,

            borderWidth:
              0.5,

            borderColor:
              '#BFDBFE',
          }}
        >

          <View
            style={{
              flexDirection:
                'row',

              alignItems:
                'center',

              flex: 1,
            }}
          >

            <MapPin
              size={18}
              color={
                theme.colors.primary500
              }
            />

            <Text
              style={{
                marginLeft:
                  theme.spacing.sm,

                fontSize:
                  theme.typography.b2,

                fontFamily:
                  theme.fonts.medium,

                color:
                  theme.colors.primary600,
              }}
            >
              Same as Current Address
            </Text>

          </View>


          <CommonSwitch

            value={
              sameAsCurrent
            }

            onValueChange={
              handleSameAsCurrent
            }

          />

        </View>


        {/* ============================================
            PERMANENT FIELDS
        ============================================ */}

        {!sameAsCurrent && (

          <View>

            {renderAddressCard({
              title: '',
              address:
                permanentAddress,
              isPermanent:
                true,
            })}

          </View>

        )}

      </View>


      {/* =================================================
          BOTTOM INFORMATION
      ================================================= */}

      <View
        style={{
          alignItems:
            'center',

          paddingVertical:
            theme.spacing.lg,
        }}
      >

        <View
          style={{
            width: 90,

            height: 90,

            borderRadius: 45,

            backgroundColor:
              '#FFF8ED',

            justifyContent:
              'center',

            alignItems:
              'center',

            marginBottom:
              theme.spacing.md,
          }}
        >

          <MapPin
            size={48}
            color="#F2CDB9"
            strokeWidth={1.8}
          />

        </View>


        <Text
          style={{
            fontSize:
              theme.typography.b3,

            fontFamily:
              theme.fonts.medium,

            color:
              theme.colors.gray400,

            textAlign:
              'center',

            lineHeight:
              22,

            paddingHorizontal:
              theme.spacing.xl,
          }}
        >
          Ensure your address matches your official
          {'\n'}
          identity documents.
        </Text>

      </View>

    </View>
  );
};


// ======================================================
// HELPER
// ======================================================

const capitalize = (value = '') => {

  return (
    value.charAt(0).toUpperCase() +
    value.slice(1)
  );

};


export default React.memo(AddressForm);