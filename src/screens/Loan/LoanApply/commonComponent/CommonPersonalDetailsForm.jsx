// CommonPersonalDetailsForm.jsx

import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import DateTimePicker
  from '@react-native-community/datetimepicker';

import {
  CalendarDays,
  Info,
} from 'lucide-react-native';

import CommonInput
  from '../../../../components/common/Input/CommonInput';

import SquareChip
  from '../../../../components/common/Input/SquareChip';

import RoundedChip
  from '../../../../components/common/Input/RoundedChip';

import { theme }
  from '../../../../theme';


// ======================================================
// COMMON BORDER
// ======================================================

const commonBorderStyle = {
  borderWidth: 0.3,
  borderColor: '#48484a58',
};


// ======================================================
// OPTIONS
// ======================================================

const GENDER_OPTIONS = [
  'Male',
  'Female',
  'Other',
];


const EMPLOYMENT_TYPES = [
  'Private',
  'Government',
  'Self Employed',
  'Business',
  'Public Sector',
  'Other',
];


const MARITAL_STATUS = [
  'Single',
  'Married',
  'Divorced',
  'Widowed',
];


// ======================================================
// DATE FORMAT
// ======================================================

const formatDate = (date) => {

  if (!date) {
    return '';
  }

  const day = String(
    date.getDate()
  ).padStart(2, '0');

  const month = String(
    date.getMonth() + 1
  ).padStart(2, '0');

  const year =
    date.getFullYear();

  return `${day}/${month}/${year}`;
};


// ======================================================
// COMPONENT
// ======================================================

const CommonPersonalDetailsForm = ({
  formData = {},
  setFormData,
  errors = {},
  setErrors,
}) => {

  // ====================================================
  // DATE PICKER STATE
  // ====================================================

  const [
    showDatePicker,
    setShowDatePicker,
  ] = useState(false);


  // ====================================================
  // INITIAL DATE
  // ====================================================

  const getInitialDate = () => {

    if (!formData?.dob) {

      return new Date(
        2000,
        0,
        1
      );
    }

    const parts =
      formData.dob.split('/');

    if (parts.length === 3) {

      const day =
        Number(parts[0]);

      const month =
        Number(parts[1]) - 1;

      const year =
        Number(parts[2]);

      const date =
        new Date(
          year,
          month,
          day
        );

      if (!isNaN(date.getTime())) {
        return date;
      }
    }

    return new Date(
      2000,
      0,
      1
    );
  };


  const [
    selectedDate,
    setSelectedDate,
  ] = useState(
    getInitialDate()
  );


  // ====================================================
  // UPDATE FIELD
  // ====================================================

  const updateField = (
    field,
    value
  ) => {

    setFormData?.(
      (prev) => ({
        ...prev,
        [field]: value,
      })
    );


    // Clear field error
    if (
      errors?.[field] &&
      setErrors
    ) {

      setErrors(
        (prev) => ({
          ...prev,
          [field]: '',
        })
      );
    }
  };


  // ====================================================
  // GENDER
  // ====================================================

  const handleGender = (
    gender
  ) => {

    updateField(
      'gender',
      gender
    );
  };


  // ====================================================
  // EMPLOYMENT TYPE
  // ====================================================

  const handleEmploymentType = (
    type
  ) => {

    updateField(
      'employmentType',
      type
    );
  };


  // ====================================================
  // MARITAL STATUS
  // ====================================================

  const handleMaritalStatus = (
    status
  ) => {

    updateField(
      'maritalStatus',
      status
    );
  };


  // ====================================================
  // DATE CHANGE
  // ====================================================

  const handleDateChange = (
    event,
    date
  ) => {

    setShowDatePicker(false);

    if (!date) {
      return;
    }

    setSelectedDate(date);

    const formattedDate =
      formatDate(date);

    updateField(
      'dob',
      formattedDate
    );
  };


  // ====================================================
  // INPUT BORDER HELPER
  // ====================================================

  const getInputBorderStyle = (
    field
  ) => {

    return {
      backgroundColor:
        theme.colors.gray100,

      borderRadius:
        theme.radius.lg,

      ...commonBorderStyle,

      ...(errors?.[field] && {
        borderColor:
          theme.colors.error,

        borderWidth:
          0.8,
      }),
    };
  };


  // ====================================================
  // UI
  // ====================================================

  return (

    <View
      style={{
        paddingTop:
          theme.spacing.sm,

        paddingBottom:
          theme.spacing.xl,
      }}
    >

      {/* ==================================================
          SECTION TITLE
      ================================================== */}

      <Text
     style={{
          fontSize: theme.typography?.h3 || 18,
          fontFamily: theme.fonts?.bold,
          color: theme.colors?.text || '#1E293B',
          marginBottom: theme.spacing?.lg || 16,
        }}
      >
        Personal Details
      </Text>


      {/* ==================================================
          FULL NAME
      ================================================== */}

      <CommonInput
        label="Full Name ( as per PAN )"
        placeholder="As per PAN card"

        value={
          formData?.fullName || ''
        }

        onChangeText={(text) =>
          updateField(
            'fullName',
            text
          )
        }

        error={
          errors?.fullName
        }

        required

        containerStyle={{
          marginBottom:
            theme.spacing.lg,
        }}

        inputContainerStyle={
          getInputBorderStyle(
            'fullName'
          )
        }
      />


      {/* ==================================================
          EMAIL
      ================================================== */}

      <CommonInput
        label="Email ID"
        placeholder="Enter Your Email Address"

        value={
          formData?.email || ''
        }

        onChangeText={(text) =>
          updateField(
            'email',
            text
          )
        }

        keyboardType="email-address"

        autoCapitalize="none"

        error={
          errors?.email
        }

        required

        containerStyle={{
          marginBottom:
            theme.spacing.lg,
        }}

        inputContainerStyle={
          getInputBorderStyle(
            'email'
          )
        }
      />


      {/* ==================================================
          MOBILE
      ================================================== */}

      <CommonInput
        label="Mob. No."
        placeholder="Enter Your Phone No."

        value={
          formData?.mobile || ''
        }

        onChangeText={(text) => {

          const cleaned =
            text.replace(
              /[^0-9]/g,
              ''
            );

          updateField(
            'mobile',
            cleaned
          );
        }}

        keyboardType="phone-pad"

        maxLength={10}

        error={
          errors?.mobile
        }

        required

        containerStyle={{
          marginBottom:
            theme.spacing.lg,
        }}

        inputContainerStyle={
          getInputBorderStyle(
            'mobile'
          )
        }
      />


      {/* ==================================================
          DATE OF BIRTH
      ================================================== */}

      <View
        style={{
          marginBottom:
            theme.spacing.lg,
        }}
      >

        <Text
          style={{
            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.medium,

            color:
              theme.colors.gray700,

            marginBottom:
              theme.spacing.sm,
          }}
        >
          Date of Birth

          <Text
            style={{
              color:
                theme.colors.error,
            }}
          >
            {' '}*
          </Text>
        </Text>


        <TouchableOpacity
          activeOpacity={0.8}

          onPress={() =>
            setShowDatePicker(true)
          }

          style={{
            height: 56,

            backgroundColor:
              theme.colors.gray100,

            borderRadius:
              theme.radius.lg,

            ...commonBorderStyle,

            ...(errors?.dob && {
              borderColor:
                theme.colors.error,

              borderWidth:
                0.8,
            }),

            paddingHorizontal:
              theme.spacing.lg,

            flexDirection:
              'row',

            alignItems:
              'center',

            justifyContent:
              'space-between',
          }}
        >

          <Text
            style={{
              flex: 1,

              fontSize:
                theme.typography.b1,

              fontFamily:
                theme.fonts.medium,

              color:
                formData?.dob
                  ? theme.colors.text
                  : theme.colors.textLight,
            }}
          >
            {
              formData?.dob ||
              'DD/MM/YYYY'
            }
          </Text>


          <CalendarDays
            size={20}

            color={
              theme.colors.gray500
            }

            strokeWidth={2}
          />

        </TouchableOpacity>


        {!!errors?.dob && (

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
            {errors.dob}
          </Text>

        )}

      </View>


      {/* ==================================================
          DATE PICKER
      ================================================== */}

      {showDatePicker && (

        <DateTimePicker

          value={
            selectedDate
          }

          mode="date"

          display="default"

          maximumDate={
            new Date()
          }

          onChange={
            handleDateChange
          }

        />

      )}


      {/* ==================================================
          GENDER
      ================================================== */}

      <View
        style={{
          marginBottom:
            theme.spacing.lg,
        }}
      >

        <Text
          style={{
            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.medium,

            color:
              theme.colors.gray700,

            marginBottom:
              theme.spacing.sm,
          }}
        >
          Gender

          <Text
            style={{
              color:
                theme.colors.error,
            }}
          >
            {' '}*
          </Text>
        </Text>


        <View
          style={{
            flexDirection:
              'row',

            gap:
              theme.spacing.sm,
          }}
        >

          {GENDER_OPTIONS.map(
            (gender) => (

              <SquareChip

                key={gender}

                title={gender}

                selected={
                  formData?.gender ===
                  gender
                }

                onPress={() =>
                  handleGender(
                    gender
                  )
                }

                height={48}

                borderRadius={14}

                selectedBackgroundColor={
                  "#FDE2E0"
                }

                selectedBorderColor={
                  "#F4A39D"
                }

                selectedTextColor={
                  "#111827"
                }

                unselectedBackgroundColor={
                  "#F4F5F8"
                }

                unselectedBorderColor={
                  "transparent"
                }

                unselectedTextColor={
                  "#6B7280"
                }

              />

            )
          )}

        </View>


        {!!errors?.gender && (

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
            {errors.gender}
          </Text>

        )}

      </View>


      {/* ==================================================
          FATHER / SPOUSE NAME
      ================================================== */}

      <CommonInput
        label="Father's/Spouse's Name"
        placeholder="Enter Father's / Spouse's name"

        value={
          formData?.fatherName || ''
        }

        onChangeText={(text) =>
          updateField(
            'fatherName',
            text
          )
        }

        error={
          errors?.fatherName
        }

        required

        containerStyle={{
          marginBottom:
            theme.spacing.lg,
        }}

        inputContainerStyle={
          getInputBorderStyle(
            'fatherName'
          )
        }
      />


      {/* ==================================================
          PAN
      ================================================== */}

      <CommonInput
        label="PAN Number"
        placeholder="Enter PAN Number"

        value={
          formData?.panNumber || ''
        }

        onChangeText={(text) => {

          const cleaned =
            text
              .toUpperCase()
              .replace(
                /[^A-Z0-9]/g,
                ''
              );

          updateField(
            'panNumber',
            cleaned
          );
        }}

        autoCapitalize="characters"

        maxLength={10}

        error={
          errors?.panNumber
        }

        required

        containerStyle={{
          marginBottom:
            theme.spacing.lg,
        }}

        inputContainerStyle={
          getInputBorderStyle(
            'panNumber'
          )
        }
      />


      {/* ==================================================
          AADHAAR
      ================================================== */}

      <CommonInput
        label="Aadhaar Number"
        placeholder="Enter Aadhaar Number"

        value={
          formData?.aadhaarNumber || ''
        }

        onChangeText={(text) => {

          const cleaned =
            text.replace(
              /[^0-9]/g,
              ''
            );

          updateField(
            'aadhaarNumber',
            cleaned
          );
        }}

        keyboardType="numeric"

        maxLength={12}

        error={
          errors?.aadhaarNumber
        }

        required

        containerStyle={{
          marginBottom:
            theme.spacing.lg,
        }}

        inputContainerStyle={
          getInputBorderStyle(
            'aadhaarNumber'
          )
        }
      />


      {/* ==================================================
          ANNUAL INCOME
      ================================================== */}

      <CommonInput
        label="Annual Income (₹)"
        placeholder="e.g. 65,889"

        value={
          formData?.annualIncome || ''
        }

        onChangeText={(text) => {

          const cleaned =
            text.replace(
              /[^0-9]/g,
              ''
            );

          updateField(
            'annualIncome',
            cleaned
          );
        }}

        keyboardType="numeric"

        error={
          errors?.annualIncome
        }

        required

        containerStyle={{
          marginBottom:
            theme.spacing.lg,
        }}

        inputContainerStyle={
          getInputBorderStyle(
            'annualIncome'
          )
        }
      />


      {/* ==================================================
          OCCUPATION
      ================================================== */}

      <CommonInput
        label="Occupation"
        placeholder="Enter your Occupation"

        value={
          formData?.occupation || ''
        }

        onChangeText={(text) =>
          updateField(
            'occupation',
            text
          )
        }

        error={
          errors?.occupation
        }

        required

        containerStyle={{
          marginBottom:
            theme.spacing.lg,
        }}

        inputContainerStyle={
          getInputBorderStyle(
            'occupation'
          )
        }
      />


      {/* ==================================================
          EMPLOYMENT TYPE
      ================================================== */}

      <View
        style={{
          marginBottom:
            theme.spacing.lg,
        }}
      >

        <Text
          style={{
            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.medium,

            color:
              theme.colors.gray700,

            marginBottom:
              theme.spacing.sm,
          }}
        >
          Employment Type

          <Text
            style={{
              color:
                theme.colors.error,
            }}
          >
            {' '}*
          </Text>
        </Text>


        <View
          style={{
            flexDirection:
              'row',

            flexWrap:
              'wrap',
          }}
        >

          {EMPLOYMENT_TYPES.map(
            (type) => (

              <RoundedChip

                key={type}

                title={type}

                selected={
                  formData?.employmentType ===
                  type
                }

                onPress={() =>
                  handleEmploymentType(
                    type
                  )
                }

                // Selected colors
                selectedBackgroundColor={
                  "#FDE2E0"
                }

                selectedBorderColor={
                  "#F4A39D"
                }

                selectedTextColor={
                  "#111827"
                }

                // Unselected colors
                unselectedBackgroundColor={
                  "#F4F5F8"
                }

                unselectedBorderColor={
                  "transparent"
                }

                unselectedTextColor={
                  "#6B7280"
                }

                height={42}

                minWidth={90}

                paddingHorizontal={14}

                marginRight={8}

                marginBottom={8}

              />

            )
          )}

        </View>


        {!!errors?.employmentType && (

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
            {errors.employmentType}
          </Text>

        )}

      </View>


      {/* ==================================================
          MARITAL STATUS
      ================================================== */}

      <View
        style={{
          marginBottom:
            theme.spacing.xl,
        }}
      >

        <Text
          style={{
            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.medium,

            color:
              theme.colors.gray700,

            marginBottom:
              theme.spacing.sm,
          }}
        >
          Marital Status

          <Text
            style={{
              color:
                theme.colors.gray500,
            }}
          >
            {' '} (Optional)
          </Text>
        </Text>


        <View
          style={{
            flexDirection:
              'row',

            flexWrap:
              'wrap',
          }}
        >

          {MARITAL_STATUS.map(
            (status) => (

              <RoundedChip

                key={status}

                title={status}

                selected={
                  formData?.maritalStatus ===
                  status
                }

                onPress={() =>
                  handleMaritalStatus(
                    status
                  )
                }

                selectedBackgroundColor={
                  "#FDE2E0"
                }

                selectedBorderColor={
                  "#F4A39D"
                }

                selectedTextColor={
                  "#111827"
                }

                unselectedBackgroundColor={
                  "#F4F5F8"
                }

                unselectedBorderColor={
                  "transparent"
                }

                unselectedTextColor={
                  "#6B7280"
                }

                height={42}

                minWidth={82}

                paddingHorizontal={14}

                marginRight={8}

                marginBottom={8}

              />

            )
          )}

        </View>

      </View>


      {/* ==================================================
          SECURITY INFO
      ================================================== */}

      <View
        style={{
          backgroundColor:
            '#EFF6FF',

          borderRadius:
            theme.radius.lg,

          borderWidth:
            1,

          borderColor:
            '#BFDBFE',

          padding:
            theme.spacing.lg,

          flexDirection:
            'row',

          alignItems:
            'flex-start',
        }}
      >

        <Info
          size={22}

          color="#2563EB"

          strokeWidth={2}

          style={{
            marginTop: 2,

            marginRight:
              theme.spacing.md,
          }}
        />


        <Text
          style={{
            flex: 1,

            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.regular,

            color:
              '#0759B8',

            lineHeight:
              theme.lineHeight.b2,
          }}
        >
          We use secure encryption to protect your
          personal details. Providing accurate
          information as per your official documents
          ensures a higher chance of loan approval.
        </Text>

      </View>

    </View>
  );
};


export default CommonPersonalDetailsForm;