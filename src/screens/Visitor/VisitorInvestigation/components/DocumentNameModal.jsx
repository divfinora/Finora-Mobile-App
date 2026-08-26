import React, {
  memo,
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";

import {
  X,
  FileText,
  ArrowRight,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";


// =====================================================
// COMPONENT
// =====================================================

const DocumentNameModal = ({
  visible = false,

  onClose,

  onContinue,
}) => {

  // ===================================================
  // STATE
  // ===================================================

  const [
    documentName,
    setDocumentName,
  ] = useState("");


  // ===================================================
  // RESET
  // ===================================================

  useEffect(() => {

    if (!visible) {

      setDocumentName("");

    }

  }, [visible]);


  // ===================================================
  // CONTINUE
  // ===================================================

  const handleContinue = () => {

    const name =
      documentName?.trim();


    if (!name) {

      return;

    }


    onContinue?.(
      name
    );

  };


  // ===================================================
  // DISABLED
  // ===================================================

  const isDisabled =
    !documentName?.trim();


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <Modal
      visible={visible}

      transparent

      animationType="fade"

      statusBarTranslucent

      onRequestClose={
        onClose
      }
    >

      <KeyboardAvoidingView
        style={{
          flex: 1,

          alignItems:
            "center",

          justifyContent:
            "center",

          paddingHorizontal:
            theme.spacing.lg,
        }}

        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >

        {/* =================================================
            BACKDROP
        ================================================= */}

        <Pressable
          onPress={
            onClose
          }

          style={{
            position:
              "absolute",

            top: 0,

            left: 0,

            right: 0,

            bottom: 0,

            backgroundColor:
              "rgba(15, 23, 42, 0.48)",
          }}
        />


        {/* =================================================
            MODAL CARD
        ================================================= */}

        <View
          style={{
            width:
              "100%",

            maxWidth:
              430,

            backgroundColor:
              theme.colors.white,

            borderRadius:
              24,

            padding:
              theme.spacing.lg,

            ...theme.shadows.card,
          }}
        >

          {/* =================================================
              HEADER
          ================================================= */}

          <View
            style={{
              flexDirection:
                "row",

              alignItems:
                "center",

              justifyContent:
                "space-between",

              marginBottom:
                theme.spacing.lg,
            }}
          >

            <View
              style={{
                flexDirection:
                  "row",

                alignItems:
                  "center",

                flex: 1,
              }}
            >

              {/* DOCUMENT ICON */}

              <View
                style={{
                  width: 48,

                  height: 48,

                  borderRadius:
                    15,

                  backgroundColor:
                    "#FFF4EA",

                  borderWidth:
                    1,

                  borderColor:
                    "#FFE1CC",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",
                }}
              >

                <FileText
                  size={23}

                  color={
                    theme.colors.primary500
                  }

                  strokeWidth={2}
                />

              </View>


              {/* TITLE */}

              <View
                style={{
                  flex: 1,

                  marginLeft:
                    theme.spacing.md,
                }}
              >

                <Text
                  style={{
                    color:
                      theme.colors.black,

                    fontSize:
                      theme.typography.b1,

                    fontFamily:
                      theme.fonts.headingBold,
                  }}
                >
                  Add Document
                </Text>


                <Text
                  style={{
                    marginTop: 3,

                    color:
                      theme.colors.gray500,

                    fontSize:
                      theme.typography.b3,

                    fontFamily:
                      theme.fonts.regular,
                  }}
                >
                  Enter document details
                </Text>

              </View>

            </View>


            {/* CLOSE */}

            <TouchableOpacity
              activeOpacity={0.8}

              onPress={
                onClose
              }

              style={{
                width: 36,

                height: 36,

                borderRadius:
                  12,

                backgroundColor:
                  "#F7F7F7",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                marginLeft:
                  theme.spacing.sm,
              }}
            >

              <X
                size={19}

                color={
                  theme.colors.gray700
                }

                strokeWidth={2}
              />

            </TouchableOpacity>

          </View>


          {/* =================================================
              DIVIDER
          ================================================= */}

          <View
            style={{
              height: 1,

              backgroundColor:
                "#F0F0F0",

              marginBottom:
                theme.spacing.lg,
            }}
          />


          {/* =================================================
              LABEL
          ================================================= */}

          <Text
            style={{
              color:
                theme.colors.black,

              fontSize:
                theme.typography.b2,

              fontFamily:
                theme.fonts.semiBold,

              marginBottom:
                theme.spacing.sm,
            }}
          >
            Document Name
          </Text>


          {/* =================================================
              INPUT
          ================================================= */}

          <View
            style={{
              height: 54,

              borderRadius:
                14,

              borderWidth:
                1,

              borderColor:
                documentName?.trim()
                  ? theme.colors.primary400
                  : "#E5E7EB",

              backgroundColor:
                "#FAFAFA",

              justifyContent:
                "center",

              paddingHorizontal:
                theme.spacing.md,
            }}
          >

            <TextInput
              value={
                documentName
              }

              onChangeText={
                setDocumentName
              }

              placeholder=
                "e.g. Aadhaar Card"

              placeholderTextColor={
                theme.colors.gray400
              }

              autoFocus

              autoCapitalize=
                "sentences"

              returnKeyType=
                "done"

              onSubmitEditing={
                handleContinue
              }

              style={{
                flex: 1,

                padding: 0,

                color:
                  theme.colors.black,

                fontSize:
                  theme.typography.b2,

                fontFamily:
                  theme.fonts.regular,
              }}
            />

          </View>


          {/* =================================================
              HELPER TEXT
          ================================================= */}

          <Text
            style={{
              marginTop:
                theme.spacing.sm,

              color:
                theme.colors.gray400,

              fontSize:
                11,

              fontFamily:
                theme.fonts.regular,

              lineHeight:
                16,
            }}
          >
            Give this document a clear name so it
            can be easily identified later.
          </Text>


          {/* =================================================
              ACTIONS
          ================================================= */}

          <View
            style={{
              flexDirection:
                "row",

              alignItems:
                "center",

              gap:
                theme.spacing.sm,

              marginTop:
                theme.spacing.xl,
            }}
          >

            {/* CANCEL */}

            <TouchableOpacity
              activeOpacity={0.8}

              onPress={
                onClose
              }

              style={{
                flex: 1,

                height: 50,

                borderRadius:
                  14,

                backgroundColor:
                  "#F7F7F7",

                borderWidth:
                  1,

                borderColor:
                  "#EAEAEA",

                alignItems:
                  "center",

                justifyContent:
                  "center",
              }}
            >

              <Text
                style={{
                  color:
                    theme.colors.gray700,

                  fontSize:
                    theme.typography.button,

                  fontFamily:
                    theme.fonts.semiBold,
                }}
              >
                Cancel
              </Text>

            </TouchableOpacity>


            {/* CONTINUE */}

            <TouchableOpacity
              activeOpacity={0.85}

              onPress={
                handleContinue
              }

              disabled={
                isDisabled
              }

              style={{
                flex: 1.35,

                height: 50,

                borderRadius:
                  14,

                backgroundColor:
                  isDisabled
                    ? theme.colors.gray300
                    : theme.colors.primary500,

                flexDirection:
                  "row",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                opacity:
                  isDisabled
                    ? 0.7
                    : 1,
              }}
            >

              <Text
                style={{
                  color:
                    theme.colors.white,

                  fontSize:
                    theme.typography.button,

                  fontFamily:
                    theme.fonts.semiBold,
                }}
              >
                Continue
              </Text>


              {!isDisabled && (

                <ArrowRight
                  size={17}

                  color={
                    theme.colors.white
                  }

                  strokeWidth={2.2}

                  style={{
                    marginLeft: 7,
                  }}
                />

              )}

            </TouchableOpacity>

          </View>

        </View>

      </KeyboardAvoidingView>

    </Modal>
  );
};


export default memo(
  DocumentNameModal
);