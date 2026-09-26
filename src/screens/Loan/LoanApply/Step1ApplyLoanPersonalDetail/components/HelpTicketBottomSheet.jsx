// src/screens/.../components/HelpTicketBottomSheet.jsx

import React, {
  useEffect,
  useState,
} from 'react';

import {
  View,
  Text,
  Keyboard,
} from 'react-native';

import MaterialIcons from '@react-native-vector-icons/material-icons';

import NewCustomBottomSheet
  from '../../../../../components/common/Modal/NewCustomBottomSheet';

import CommonInput
  from '../../../../../components/common/Input/CommonInput';

import CommonButton
  from '../../../../../components/common/Button/CommonButton';

import { theme } from '../../../../../theme';


// =====================================================
// COMPONENT
// =====================================================

const HelpTicketBottomSheet = ({
  visible = false,
  onClose,
  onSubmit,
}) => {

  // =================================================
  // STATE
  // =================================================

  const [subject, setSubject] =
    useState('');

  const [description, setDescription] =
    useState('');

  const [errors, setErrors] =
    useState({});


  // =================================================
  // RESET ON OPEN
  // =================================================

  useEffect(() => {

    if (visible) {

      setSubject('');

      setDescription('');

      setErrors({});

    }

  }, [visible]);


  // =================================================
  // CLOSE
  // =================================================

  const handleClose = () => {

    Keyboard.dismiss();

    onClose?.();

  };


  // =================================================
  // SUBJECT
  // =================================================

  const handleSubjectChange = value => {

    setSubject(value);


    if (errors.subject) {

      setErrors(previous => {

        const updated = {
          ...previous,
        };

        delete updated.subject;

        return updated;

      });

    }

  };


  // =================================================
  // DESCRIPTION
  // =================================================

  const handleDescriptionChange = value => {

    if (value.length > 500) {
      return;
    }


    setDescription(value);


    if (errors.description) {

      setErrors(previous => {

        const updated = {
          ...previous,
        };

        delete updated.description;

        return updated;

      });

    }

  };


  // =================================================
  // SUBMIT
  // =================================================

  const handleSubmit = () => {

    const newErrors = {};


    if (!subject.trim()) {

      newErrors.subject =
        'Please enter a subject';

    }


    if (!description.trim()) {

      newErrors.description =
        'Please describe your issue';

    }


    setErrors(newErrors);


    if (
      Object.keys(newErrors).length > 0
    ) {
      return;
    }


    const payload = {

      subject:
        subject.trim(),

      description:
        description.trim(),

    };


    onSubmit?.(payload);


    setSubject('');

    setDescription('');

    setErrors({});


    handleClose();

  };


  // =================================================
  // RENDER
  // =================================================

  return (

    <NewCustomBottomSheet

      visible={visible}

      onClose={handleClose}

      sheetheading="Quick Help for You"

      heightPercent={0.7}

      showHeader

      showDragHandle={false}

      enableDrag

      closeOnBackdrop

      closeOnDragDown

      sheetStyle={{

        borderTopLeftRadius: 32,

        borderTopRightRadius: 32,

        overflow: 'visible',

      }}

      headerStyle={{

        paddingTop: 20,

        paddingBottom: 8,

      }}

      headingContainerStyle={{

        paddingHorizontal: 24,

        alignItems: 'center',

      }}

      headingStyle={{

        fontSize: 16,

        lineHeight: 22,

        fontFamily:
          theme.fonts.bold,

        color:
          theme.colors.navy900,

        textAlign: 'center',

      }}

      closeButtonStyle={{

        top: -58,

        left: '50%',

        marginLeft: -22,

        width: 44,

        height: 44,

        borderRadius: 22,

        backgroundColor: '#000000',

        borderWidth: 1,

        borderColor: '#FFFFFF',

        justifyContent: 'center',

        alignItems: 'center',

        zIndex: 100,

      }}

      closeIconColor="#FFFFFF"

      closeIconSize={20}

      contentStyle={{

        paddingHorizontal: 12,

        paddingBottom: 30,

      }}

    >

      <View
        style={{

          paddingHorizontal: 12,

          paddingTop: 4,

        }}
      >

        {/* =================================================
            SUBJECT
        ================================================= */}

        <CommonInput

          label="Subject"

          required

          placeholder="Brief summary of the issue"

          value={subject}

          onChangeText={
            handleSubjectChange
          }

          error={errors.subject}

          keyboardType="default"

          autoCapitalize="sentences"

          autoCorrect={false}

          returnKeyType="next"

          labelStyle={{

            fontSize: 14,

            lineHeight: 20,

            fontFamily:
              theme.fonts.semiBold,

            color:
              theme.colors.navy900,

            marginBottom: 8,

          }}

          inputContainerStyle={{

            height: 62,

            minHeight: 62,

            backgroundColor:
              theme.colors.white,

            borderRadius: 14,

            borderWidth: 1,

            borderColor:
              errors.subject
                ? theme.colors.error
                : '#D1DCE5',

            paddingHorizontal: 16,

          }}

          inputStyle={{

            minHeight: 60,

            fontSize: 16,

            lineHeight: 20,

            fontFamily:
              theme.fonts.regular,

            color:
              theme.colors.navy900,

            paddingVertical: 0,

          }}

          errorStyle={{

            marginTop: 6,

            fontSize: 12,

          }}

        />


        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <View
          style={{
            position: 'relative',
          }}
        >

          <CommonInput

            label="Description"

            required

            placeholder="Tell us more about what's happening..."

            value={description}

            onChangeText={
              handleDescriptionChange
            }

            error={errors.description}

            multiline

            numberOfLines={5}

            maxLength={500}

            keyboardType="default"

            autoCapitalize="sentences"

            autoCorrect={false}

            returnKeyType="done"

            labelStyle={{

              fontSize: 14,

              lineHeight: 20,

              fontFamily:
                theme.fonts.semiBold,

              color:
                theme.colors.navy900,

              marginBottom: 8,

            }}

            inputContainerStyle={{

              height: 144,

              minHeight: 144,

              alignItems: 'flex-start',

              backgroundColor:
                theme.colors.white,

              borderRadius: 14,

              borderWidth: 1,

              borderColor:
                errors.description
                  ? theme.colors.error
                  : '#D1DCE5',

              paddingHorizontal: 16,

              paddingVertical: 0,

            }}

            inputStyle={{

              height: 140,

              minHeight: 140,

              fontSize: 16,

              lineHeight: 22,

              fontFamily:
                theme.fonts.regular,

              color:
                theme.colors.navy900,

              paddingTop: 14,

              paddingBottom: 30,

              textAlignVertical: 'top',

            }}

            errorStyle={{

              marginTop: 6,

              fontSize: 12,

            }}

          />


          {/* CHARACTER COUNT */}

          <Text
            style={{

              position: 'absolute',

              right: 14,

              bottom:
                errors.description
                  ? 34
                  : 30,

              fontSize: 12,

              lineHeight: 16,

              fontFamily:
                theme.fonts.medium,

              color: '#8EA0B8',

              backgroundColor:
                theme.colors.white,

              paddingLeft: 4,

            }}
          >
            {description.length} / 500
          </Text>

        </View>


        {/* =================================================
            SUBMIT
        ================================================= */}

        <CommonButton

          title="Submit Ticket"

          onPress={handleSubmit}

          rightIcon={

            <MaterialIcons
              name="send"
              size={20}
              color={
                theme.colors.white
              }
            />

          }

          containerStyle={{

            marginTop: 8,

            height: 58,

            borderRadius: 999,

            backgroundColor:
              theme.colors.primary500,

          }}

          textStyle={{

            fontSize: 16,

            fontFamily:
              theme.fonts.semiBold,

            color:
              theme.colors.white,

          }}

        />

      </View>

    </NewCustomBottomSheet>

  );

};


export default HelpTicketBottomSheet;