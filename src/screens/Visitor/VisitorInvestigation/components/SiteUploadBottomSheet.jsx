import React, {
  memo,
  useEffect,
  useState,
} from "react";

import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
} from "react-native";

import {
  X,
  FileText,
  Upload,
} from "lucide-react-native";

import DocumentPicker, {
  types,
} from "react-native-document-picker";

import {
  theme,
} from "../../../../theme";

import CommonInput from
  "../../../../components/common/Input/CommonInput";


// =====================================================
// COMPONENT
// =====================================================

const SiteUploadBottomSheet = ({
  visible = false,

  category = "",

  categoryTitle = "",

  onClose,

  onUpload,

  loading = false,
}) => {

  const [
    documentName,
    setDocumentName,
  ] = useState("");


  const [
    selectedFile,
    setSelectedFile,
  ] = useState(null);


  // =====================================================
  // RESET
  // =====================================================

  useEffect(() => {

    if (!visible) {

      setDocumentName("");

      setSelectedFile(null);

    }

  }, [visible]);


  // =====================================================
  // PICK FILE
  // =====================================================

  const handlePickFile = async () => {

    try {

      const result =
        await DocumentPicker.pickSingle({

          type: [
            types.images,
            types.pdf,
          ],

          copyTo:
            "cachesDirectory",

        });


      setSelectedFile(
        result
      );


      // ================================================
      // AUTO DOCUMENT NAME
      // ================================================

      if (
        !documentName?.trim()
      ) {

        const fileName =
          result?.name
            ?.replace(
              /\.[^/.]+$/,
              ""
            );


        if (fileName) {

          setDocumentName(
            fileName
          );

        }

      }

    } catch (error) {

      if (
        DocumentPicker.isCancel(
          error
        )
      ) {

        return;

      }


      console.log(
        "Document Picker Error:",
        error
      );

    }

  };


  // =====================================================
  // UPLOAD
  // =====================================================

  const handleUpload = () => {

    if (
      !documentName?.trim() ||
      !selectedFile
    ) {

      return;

    }


    onUpload?.({

      category,

      categoryTitle,

      name:
        documentName.trim(),

      file:
        selectedFile,

    });

  };


  // =====================================================
  // DISABLED
  // =====================================================

  const isUploadDisabled =
    loading ||
    !documentName?.trim() ||
    !selectedFile;


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <Modal
      visible={visible}

      transparent

      animationType="slide"

      statusBarTranslucent

      onRequestClose={
        onClose
      }
    >

      {/* =================================================
          KEYBOARD AVOIDING VIEW
      ================================================= */}

      <KeyboardAvoidingView
        style={{
          flex: 1,

          justifyContent:
            "flex-end",
        }}

        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }

        keyboardVerticalOffset={
          Platform.OS === "ios"
            ? 0
            : 20
        }
      >

        {/* =================================================
            BACKDROP
        ================================================= */}

        <Pressable
          onPress={
            loading
              ? undefined
              : onClose
          }

          style={{
            position:
              "absolute",

            top: 0,

            left: 0,

            right: 0,

            bottom: 0,

            backgroundColor:
              "rgba(0,0,0,0.45)",
          }}
        />


        {/* =================================================
            SHEET
        ================================================= */}

        <View
          style={{
            backgroundColor:
              theme.colors.white,

            borderTopLeftRadius:
              24,

            borderTopRightRadius:
              24,

            paddingHorizontal:
              theme.spacing.lg,

            paddingTop:
              theme.spacing.lg,

            paddingBottom:
              Platform.OS === "ios"
                ? theme.spacing.xl
                : theme.spacing.lg,

            maxHeight:
              "90%",
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
                flex: 1,
              }}
            >

              <Text
                style={{
                  fontSize:
                    19,

                  color:
                    theme.colors.black,

                  fontFamily:
                    theme.fonts.headingBold,
                }}
              >
                Upload {categoryTitle}
              </Text>


              <Text
                style={{
                  marginTop:
                    4,

                  fontSize:
                    13,

                  color:
                    theme.colors.gray500,

                  fontFamily:
                    theme.fonts.regular,
                }}
              >
                Add document name and file
              </Text>

            </View>


            {/* =================================================
                CLOSE
            ================================================= */}

            <TouchableOpacity
              activeOpacity={0.8}

              onPress={
                onClose
              }

              disabled={
                loading
              }

              style={{
                width: 38,

                height: 38,

                borderRadius: 19,

                backgroundColor:
                  "#F5F5F5",

                alignItems:
                  "center",

                justifyContent:
                  "center",

                marginLeft:
                  theme.spacing.sm,
              }}
            >

              <X
                size={20}

                color={
                  theme.colors.gray700
                }

                strokeWidth={2}
              />

            </TouchableOpacity>

          </View>


          {/* =================================================
              DOCUMENT NAME
          ================================================= */}

          <CommonInput
            label="Document Name"

            placeholder=
              "Enter document name"

            value={
              documentName
            }

            onChangeText={
              setDocumentName
            }

            editable={
              !loading
            }

            required

            containerStyle={{
              marginBottom:
                theme.spacing.lg,
            }}
          />


          {/* =================================================
              FILE LABEL
          ================================================= */}

          <Text
            style={{
              marginBottom:
                theme.spacing.sm,

              color:
                theme.colors.gray700,

              fontSize:
                theme.typography.b2,

              fontFamily:
                theme.fonts.semiBold,
            }}
          >
            Select File
          </Text>


          {/* =================================================
              FILE PICKER
          ================================================= */}

          <TouchableOpacity
            activeOpacity={0.8}

            onPress={
              handlePickFile
            }

            disabled={
              loading
            }

            style={{
              minHeight:
                90,

              borderWidth:
                1,

              borderStyle:
                "dashed",

              borderColor:
                selectedFile
                  ? theme.colors.primary500
                  : "#D0D3D8",

              borderRadius:
                14,

              backgroundColor:
                selectedFile
                  ? "#FFF8F3"
                  : "#F7F7F8",

              alignItems:
                "center",

              justifyContent:
                "center",

              paddingHorizontal:
                theme.spacing.md,

              opacity:
                loading
                  ? 0.6
                  : 1,
            }}
          >

            {loading ? (

              <ActivityIndicator
                size="small"

                color={
                  theme.colors.primary500
                }
              />

            ) : (

              <Upload
                size={26}

                color={
                  theme.colors.primary500
                }

                strokeWidth={2}
              />

            )}


            <Text
              numberOfLines={1}

              style={{
                marginTop: 8,

                maxWidth:
                  "90%",

                fontSize:
                  14,

                color:
                  selectedFile
                    ? theme.colors.black
                    : theme.colors.gray500,

                fontFamily:
                  theme.fonts.medium,
              }}
            >
              {selectedFile?.name ||
                "Tap to select file"}
            </Text>


            {!selectedFile && (

              <Text
                style={{
                  marginTop: 3,

                  fontSize: 11,

                  color:
                    theme.colors.gray500,

                  fontFamily:
                    theme.fonts.regular,
                }}
              >
                Images or PDF
              </Text>

            )}

          </TouchableOpacity>


          {/* =================================================
              UPLOAD BUTTON
          ================================================= */}

          <TouchableOpacity
            activeOpacity={0.85}

            onPress={
              handleUpload
            }

            disabled={
              isUploadDisabled
            }

            style={{
              height: 52,

              borderRadius: 14,

              marginTop:
                theme.spacing.xl,

              backgroundColor:
                isUploadDisabled
                  ? "#FFB08A"
                  : theme.colors.primary500,

              alignItems:
                "center",

              justifyContent:
                "center",

              flexDirection:
                "row",

              opacity:
                isUploadDisabled
                  ? 0.75
                  : 1,
            }}
          >

            {loading ? (

              <>
                <ActivityIndicator
                  size="small"

                  color={
                    theme.colors.white
                  }
                />

                <Text
                  style={{
                    marginLeft: 8,

                    color:
                      theme.colors.white,

                    fontSize: 15,

                    fontFamily:
                      theme.fonts.semiBold,
                  }}
                >
                  Uploading...
                </Text>
              </>

            ) : (

              <>
                <FileText
                  size={18}

                  color={
                    theme.colors.white
                  }

                  strokeWidth={2}
                />

                <Text
                  style={{
                    marginLeft: 8,

                    color:
                      theme.colors.white,

                    fontSize: 15,

                    fontFamily:
                      theme.fonts.semiBold,
                  }}
                >
                  Upload File
                </Text>
              </>

            )}

          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>

    </Modal>

  );

};


export default memo(
  SiteUploadBottomSheet
);