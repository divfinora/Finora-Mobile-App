// ============================================
// components/CommonPreviewModal.jsx
// COMMON PREVIEW MODAL
// ============================================

import React from "react";

import {
  View,
  Modal,
  TouchableOpacity,
  Text,
  Linking,
} from "react-native";

import {
  X,
  FileText,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react-native";

import Video
  from "react-native-video";

import ImageViewer
  from "react-native-image-zoom-viewer";

import FileViewer
  from "react-native-file-viewer";

import { theme }
  from "../../../theme";


// =====================================================
// COMPONENT
// =====================================================

const CommonPreviewModal = ({
  visible,
  onClose,
  file,
  type,
}) => {


  // ===================================================
  // FILE URI
  // ===================================================

  const fileUri =
    file?.uri ||
    file?.url ||
    null;


  // ===================================================
  // FILE NAME
  // ===================================================

  const fileName =
    file?.name ||
    file?.fileName ||
    file?.originalName ||
    "Document";


  // ===================================================
  // PDF CHECK
  // ===================================================

  const isPdf =
    file?.type ===
      "application/pdf" ||

    file?.mimeType ===
      "application/pdf" ||

    fileName
      ?.toLowerCase()
      ?.endsWith(".pdf") ||

    fileUri
      ?.toLowerCase()
      ?.includes(".pdf");


  // ===================================================
  // OPEN PDF
  // ===================================================

  const openPdfExternally =
    async () => {

      if (!fileUri) {
        return;
      }


      try {

        // ---------------------------------------------
        // LOCAL FILE
        // ---------------------------------------------

        if (
          fileUri.startsWith(
            "file://"
          )
        ) {

          const path =
            fileUri.replace(
              "file://",
              ""
            );


          await FileViewer.open(
            path,
            {
              showOpenWithDialog:
                true,
            }
          );


          return;
        }


        // ---------------------------------------------
        // REMOTE URL
        // ---------------------------------------------

        await Linking.openURL(
          fileUri
        );

      } catch (error) {

        console.log(
          "PDF OPEN ERROR:",
          error
        );


        try {

          await Linking.openURL(
            fileUri
          );

        } catch (linkError) {

          console.log(
            "PDF LINK ERROR:",
            linkError
          );

        }

      }

    };


  // ===================================================
  // NO FILE
  // ===================================================

  if (!fileUri) {
    return null;
  }


  // ===================================================
  // UI
  // ===================================================

  return (

    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >

      <View
        style={{
          flex: 1,

          justifyContent:
            "center",

          alignItems:
            "center",

          backgroundColor:
            "rgba(0,0,0,0.75)",
        }}
      >


        {/* =================================================
            BACKGROUND
        ================================================= */}

        <TouchableOpacity
          activeOpacity={1}
          onPress={onClose}
          style={{
            position:
              "absolute",

            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />


        {/* =================================================
            CONTENT
        ================================================= */}

        <View
          style={{
            width: "100%",
            height: "80%",
            overflow: "hidden",
          }}
        >


          {/* =================================================
              PDF
          ================================================= */}

          {isPdf ? (

            <View
              style={{
                flex: 1,

                justifyContent:
                  "center",

                alignItems:
                  "center",

                padding:
                  theme.spacing.xxl,
              }}
            >

              {/* PDF ICON */}

              <View
                style={{
                  width: 90,
                  height: 90,

                  borderRadius:
                    theme.radius.xl,

                  backgroundColor:
                    "rgba(255,255,255,0.10)",

                  justifyContent:
                    "center",

                  alignItems:
                    "center",
                }}
              >

                <FileText
                  size={58}
                  color="#EF4444"
                  strokeWidth={1.8}
                />

              </View>


              {/* FILE NAME */}

              <Text
                numberOfLines={2}
                style={{
                  marginTop:
                    theme.spacing.lg,

                  color:
                    theme.colors.white,

                  fontFamily:
                    theme.fonts.medium,

                  fontSize:
                    theme.typography.b1,

                  textAlign:
                    "center",
                }}
              >
                {fileName}
              </Text>


              {/* DESCRIPTION */}

              <Text
                style={{
                  marginTop:
                    theme.spacing.xs,

                  color:
                    "rgba(255,255,255,0.65)",

                  fontFamily:
                    theme.fonts.regular,

                  fontSize:
                    theme.typography.b3,

                  textAlign:
                    "center",
                }}
              >
                PDF document ready to open
              </Text>


              {/* OPEN PDF */}

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={
                  openPdfExternally
                }
                style={{
                  flexDirection:
                    "row",

                  alignItems:
                    "center",

                  justifyContent:
                    "center",

                  marginTop:
                    theme.spacing.xl,

                  backgroundColor:
                    theme.colors.primary500,

                  paddingHorizontal:
                    theme.spacing.xxl,

                  paddingVertical:
                    theme.spacing.md,

                  borderRadius:
                    theme.radius.md,
                }}
              >

                <ExternalLink
                  size={20}
                  color={
                    theme.colors.white
                  }
                  strokeWidth={2.2}
                />

                <Text
                  style={{
                    color:
                      theme.colors.white,

                    fontFamily:
                      theme.fonts.semiBold,

                    fontSize:
                      theme.typography.b2,

                    marginLeft:
                      theme.spacing.sm,
                  }}
                >
                  Open PDF
                </Text>

              </TouchableOpacity>

            </View>

          ) : type === "video" ? (

            /* =================================================
                VIDEO
            ================================================= */

            <Video
              source={{
                uri:
                  fileUri,
              }}

              style={{
                width: "100%",
                height: "100%",
              }}

              resizeMode="contain"

              controls
            />

          ) : (

            /* =================================================
                IMAGE
            ================================================= */

            <ImageViewer
              imageUrls={[
                {
                  url:
                    fileUri,
                },
              ]}

              enableSwipeDown

              onSwipeDown={
                onClose
              }

              renderIndicator={() =>
                null
              }

              saveToLocalByLongPress={
                false
              }

              backgroundColor="transparent"

              enablePreload
            />

          )}

        </View>


        {/* =================================================
            CLOSE BUTTON
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.8}

          onPress={
            onClose
          }

          style={{
            position:
              "absolute",

            top: 55,

            right: 20,

            width: 44,

            height: 44,

            borderRadius:
              22,

            justifyContent:
              "center",

            alignItems:
              "center",

            backgroundColor:
              "rgba(255,255,255,0.12)",

            borderWidth: 1,

            borderColor:
              "rgba(255,255,255,0.15)",
          }}
        >

          <X
            size={26}
            color={
              theme.colors.white
            }
            strokeWidth={2.2}
          />

        </TouchableOpacity>


        {/* =================================================
            IMAGE BADGE
        ================================================= */}

        {!isPdf &&
          type !== "video" && (

            <View
              style={{
                position:
                  "absolute",

                top: 60,

                left: 20,

                flexDirection:
                  "row",

                alignItems:
                  "center",

                backgroundColor:
                  "rgba(0,0,0,0.45)",

                paddingHorizontal:
                  theme.spacing.md,

                paddingVertical:
                  theme.spacing.xs,

                borderRadius:
                  theme.radius.pill,
              }}
            >

              <ImageIcon
                size={16}
                color={
                  theme.colors.white
                }
              />

              <Text
                style={{
                  color:
                    theme.colors.white,

                  fontFamily:
                    theme.fonts.medium,

                  fontSize:
                    theme.typography.b3,

                  marginLeft:
                    theme.spacing.xs,
                }}
              >
                Image
              </Text>

            </View>

          )}

      </View>

    </Modal>

  );

};


export default CommonPreviewModal;