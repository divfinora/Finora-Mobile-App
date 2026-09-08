import React from "react";

import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  PanResponder,
  Pressable,
} from "react-native";

import {
  Camera,
  Images,
  FileText,
  X,
} from "lucide-react-native";

import { theme } from "../../../theme";
import {
  useSafeAreaInsets,
} from "react-native-safe-area-context";

// ======================================================
// UPLOAD BOTTOM SHEET
// ======================================================

const UploadBottomSheet = ({
  sheetVisible,
  setSheetVisible,

  openCamera,
  openGallery,
  openDocument,

  type = "photo",
}) => {
const insets = useSafeAreaInsets();
  // ====================================================
  // CLOSE SHEET
  // ====================================================

  const closeSheet = () => {
    setSheetVisible(false);
  };


  // ====================================================
  // PAN RESPONDER
  // Swipe Down → Close
  // ====================================================

  const panResponder = PanResponder.create({

    onMoveShouldSetPanResponder: (_, gesture) => {
      return gesture.dy > 10;
    },

    onPanResponderRelease: (_, gesture) => {

      if (gesture.dy > 100) {
        closeSheet();
      }

    },

  });


  // ====================================================
  // CAMERA CLICK
  // ====================================================

  const handleCamera = () => {

    closeSheet();

    // Small delay so modal closes smoothly
    setTimeout(() => {

      if (openCamera) {
        openCamera();
      }

    }, 150);
  };


  // ====================================================
  // GALLERY CLICK
  // ====================================================

  const handleGallery = () => {

    closeSheet();

    setTimeout(() => {

      if (openGallery) {
        openGallery();
      }

    }, 150);
  };


  // ====================================================
  // DOCUMENT CLICK
  // ====================================================

  const handleDocument = () => {

    closeSheet();

    setTimeout(() => {

      if (openDocument) {
        openDocument();
      }

    }, 150);
  };


  return (
    <Modal
      transparent
      visible={sheetVisible}
      animationType="slide"
      statusBarTranslucent
      onRequestClose={closeSheet}
    >

      {/* ==================================================
          BACKDROP
      ================================================== */}

      <Pressable
        onPress={closeSheet}
        style={{
          flex: 1,
          backgroundColor:
            "rgba(0, 0, 0, 0.45)",
          justifyContent: "flex-end",
        }}
      >

        {/* ==================================================
            BOTTOM SHEET
        ================================================== */}

        <View
          {...panResponder.panHandlers}
          style={{
            backgroundColor:
              theme.colors.white || "#FFFFFF",

            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,

            paddingHorizontal:
              theme.spacing.lg || 20,

            paddingTop:
              theme.spacing.md || 16,

          paddingBottom:
  (theme.spacing.xl || 28) + insets.bottom,
          }}
        >

          {/* ==================================================
              DRAG HANDLE
          ================================================== */}

          <View
            style={{
              alignSelf: "center",

              width: 42,
              height: 4,

              borderRadius: 10,

              backgroundColor:
                theme.colors.border ||
                "#D1D5DB",

              marginBottom:
                theme.spacing.lg || 20,
            }}
          />


          {/* ==================================================
              HEADER
          ================================================== */}

          <View
            style={{
              flexDirection: "row",

              alignItems: "center",

              justifyContent:
                "space-between",

              marginBottom:
                theme.spacing.md || 16,
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
                    theme.typography.h3 ||
                    18,

                  fontFamily:
                    theme.fonts.semibold ||
                    theme.fonts.bold,

                  color:
                    theme.colors.text ||
                    "#111827",
                }}
              >
                Upload File
              </Text>


              <Text
                style={{
                  marginTop: 4,

                  fontSize:
                    theme.typography.b3 ||
                    12,

                  fontFamily:
                    theme.fonts.regular,

                  color:
                    theme.colors.textSecondary ||
                    "#6B7280",
                }}
              >
                Choose how you want to upload
              </Text>

            </View>


            {/* CLOSE BUTTON */}

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={closeSheet}

              style={{
                width: 36,
                height: 36,

                borderRadius: 18,

                alignItems: "center",
                justifyContent: "center",

                backgroundColor:
                  theme.colors.background ||
                  "#F3F4F6",
              }}
            >

              <X
                size={20}
                color={
                  theme.colors.text ||
                  "#111827"
                }

                strokeWidth={2}
              />

            </TouchableOpacity>

          </View>


          {/* ==================================================
              CAMERA OPTION
          ================================================== */}

          {openCamera && (

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleCamera}

              style={{
                flexDirection: "row",

                alignItems: "center",

                paddingVertical:
                  theme.spacing.md || 14,

                paddingHorizontal:
                  theme.spacing.sm || 8,

                borderRadius: 12,
              }}
            >

              {/* ICON */}

              <View
                style={{
                  width: 44,
                  height: 44,

                  borderRadius: 12,

                  alignItems: "center",
                  justifyContent: "center",

                  backgroundColor:
                    "#EFF6FF",
                }}
              >

                <Camera
                  size={22}
                  color="#2563EB"
                  strokeWidth={2}
                />

              </View>


              {/* TEXT */}

              <View
                style={{
                  flex: 1,
                  marginLeft: 14,
                }}
              >

                <Text
                  style={{
                    fontSize:
                      theme.typography.b2 ||
                      14,

                    fontFamily:
                      theme.fonts.semibold ||
                      theme.fonts.medium,

                    color:
                      theme.colors.text ||
                      "#111827",
                  }}
                >
                  {type === "video"
                    ? "Capture Video"
                    : "Capture Image"}
                </Text>


                <Text
                  style={{
                    marginTop: 3,

                    fontSize:
                      theme.typography.b3 ||
                      12,

                    fontFamily:
                      theme.fonts.regular,

                    color:
                      theme.colors.textSecondary ||
                      "#6B7280",
                  }}
                >
                  Take a photo using camera
                </Text>

              </View>

            </TouchableOpacity>

          )}


          {/* ==================================================
              GALLERY OPTION
          ================================================== */}

          {openGallery && (

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleGallery}

              style={{
                flexDirection: "row",

                alignItems: "center",

                paddingVertical:
                  theme.spacing.md || 14,

                paddingHorizontal:
                  theme.spacing.sm || 8,

                borderRadius: 12,
              }}
            >

              {/* ICON */}

              <View
                style={{
                  width: 44,
                  height: 44,

                  borderRadius: 12,

                  alignItems: "center",
                  justifyContent: "center",

                  backgroundColor:
                    "#F0FDF4",
                }}
              >

                <Images
                  size={22}
                  color="#16A34A"
                  strokeWidth={2}
                />

              </View>


              {/* TEXT */}

              <View
                style={{
                  flex: 1,
                  marginLeft: 14,
                }}
              >

                <Text
                  style={{
                    fontSize:
                      theme.typography.b2 ||
                      14,

                    fontFamily:
                      theme.fonts.semibold ||
                      theme.fonts.medium,

                    color:
                      theme.colors.text ||
                      "#111827",
                  }}
                >
                  Upload from Gallery
                </Text>


                <Text
                  style={{
                    marginTop: 3,

                    fontSize:
                      theme.typography.b3 ||
                      12,

                    fontFamily:
                      theme.fonts.regular,

                    color:
                      theme.colors.textSecondary ||
                      "#6B7280",
                  }}
                >
                  Choose an existing photo
                </Text>

              </View>

            </TouchableOpacity>

          )}


          {/* ==================================================
              DOCUMENT OPTION
          ================================================== */}

          {openDocument && (

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleDocument}

              style={{
                flexDirection: "row",

                alignItems: "center",

                paddingVertical:
                  theme.spacing.md || 14,

                paddingHorizontal:
                  theme.spacing.sm || 8,

                borderRadius: 12,
              }}
            >

              {/* ICON */}

              <View
                style={{
                  width: 44,
                  height: 44,

                  borderRadius: 12,

                  alignItems: "center",
                  justifyContent: "center",

                  backgroundColor:
                    "#FFF7ED",
                }}
              >

                <FileText
                  size={22}
                  color="#EA580C"
                  strokeWidth={2}
                />

              </View>


              {/* TEXT */}

              <View
                style={{
                  flex: 1,
                  marginLeft: 14,
                }}
              >

                <Text
                  style={{
                    fontSize:
                      theme.typography.b2 ||
                      14,

                    fontFamily:
                      theme.fonts.semibold ||
                      theme.fonts.medium,

                    color:
                      theme.colors.text ||
                      "#111827",
                  }}
                >
                  Upload Document
                </Text>


                <Text
                  style={{
                    marginTop: 3,

                    fontSize:
                      theme.typography.b3 ||
                      12,

                    fontFamily:
                      theme.fonts.regular,

                    color:
                      theme.colors.textSecondary ||
                      "#6B7280",
                  }}
                >
                  PDF, JPG or PNG
                </Text>

              </View>

            </TouchableOpacity>

          )}

        </View>

      </Pressable>

    </Modal>
  );
};


export default UploadBottomSheet;