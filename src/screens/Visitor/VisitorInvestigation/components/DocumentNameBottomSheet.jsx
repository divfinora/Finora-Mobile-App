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
  Upload,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";


const DocumentNameBottomSheet = ({
  visible = false,
  onClose,
  onContinue,
}) => {

  const [
    documentName,
    setDocumentName,
  ] = useState("");


  // =====================================================
  // RESET
  // =====================================================

  useEffect(() => {

    if (!visible) {
      setDocumentName("");
    }

  }, [visible]);


  // =====================================================
  // CONTINUE
  // =====================================================

  const handleContinue = () => {

    const name =
      documentName?.trim();

    if (!name) {
      return;
    }

    onContinue?.(name);

  };


  const isDisabled =
    !documentName?.trim();


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >

      <KeyboardAvoidingView
        style={{
          flex: 1,
          justifyContent: "flex-end",
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
          onPress={onClose}

          style={{
            position: "absolute",

            top: 0,
            left: 0,
            right: 0,
            bottom: 0,

            backgroundColor:
              "rgba(0,0,0,0.35)",
          }}
        />


        {/* =================================================
            SHEET
        ================================================= */}

        <View
          style={{
            backgroundColor:
              theme.colors.white,

            borderTopLeftRadius: 24,

            borderTopRightRadius: 24,

            paddingHorizontal:
              theme.spacing.lg,

            paddingTop:
              theme.spacing.lg,

            paddingBottom:
              theme.spacing.xl,
          }}
        >

          {/* =================================================
              HEADER
          ================================================= */}

          <View
            style={{
              flexDirection: "row",

              alignItems: "center",

              justifyContent:
                "space-between",

              marginBottom:
                theme.spacing.lg,
            }}
          >

            <Text
              style={{
                color:
                  theme.colors.black,

                fontSize:
                  theme.typography.h3,

                fontFamily:
                  theme.fonts.headingBold,
              }}
            >
              Upload Document
            </Text>


            <TouchableOpacity
              activeOpacity={0.8}

              onPress={onClose}

              style={{
                width: 36,
                height: 36,

                borderRadius: 18,

                backgroundColor:
                  theme.colors.gray100,

                alignItems: "center",

                justifyContent:
                  "center",
              }}
            >

              <X
                size={20}
                color={
                  theme.colors.gray700
                }
              />

            </TouchableOpacity>

          </View>


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
                theme.fonts.medium,

              marginBottom:
                theme.spacing.sm,
            }}
          >
            Document Name
          </Text>


          {/* =================================================
              INPUT
          ================================================= */}

          <TextInput
            value={
              documentName
            }

            onChangeText={
              setDocumentName
            }

            placeholder="Enter document name"

            placeholderTextColor={
              theme.colors.gray400
            }

            autoCapitalize="sentences"

            style={{
              height: 52,

              borderWidth: 1,

              borderColor:
                theme.colors.gray300,

              borderRadius:
                theme.radius.lg,

              paddingHorizontal:
                theme.spacing.md,

              color:
                theme.colors.black,

              fontSize:
                theme.typography.b2,

              fontFamily:
                theme.fonts.regular,

              backgroundColor:
                theme.colors.white,

              marginBottom:
                theme.spacing.lg,
            }}
          />


          {/* =================================================
              UPLOAD DOCUMENT BUTTON
          ================================================= */}

          <TouchableOpacity
            activeOpacity={0.85}

            onPress={
              handleContinue
            }

            disabled={
              isDisabled
            }

            style={{
              height: 52,

              borderRadius:
                theme.radius.lg,

              backgroundColor:

                isDisabled
                  ? theme.colors.gray300
                  : theme.colors.primary500,

              flexDirection: "row",

              alignItems: "center",

              justifyContent: "center",
            }}
          >

            <Upload
              size={19}

              color={
                theme.colors.white
              }

              strokeWidth={2.2}
            />


            <Text
              style={{
                marginLeft:
                  theme.spacing.sm,

                color:
                  theme.colors.white,

                fontSize:
                  theme.typography.button,

                fontFamily:
                  theme.fonts.semiBold,
              }}
            >
              Upload Document
            </Text>

          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>

    </Modal>
  );
};


export default memo(
  DocumentNameBottomSheet
);