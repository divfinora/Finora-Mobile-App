import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

import {
  Upload,
  CheckSquare,
  Square,
  X,
  FileText,
} from "lucide-react-native";

import { theme } from "../../../theme";


// ======================================================
// REUSABLE DOCUMENT UPLOAD CARD
// ======================================================

const DocumentUploadCard = ({
  title,
  subtitle,

  uploadedFile = [],

  onUpload,

  onRemove,

  error,

  uploading = false,
}) => {

  // ====================================================
  // NORMALIZE FILES
  // ====================================================

  const files =
    Array.isArray(uploadedFile)
      ? uploadedFile
      : uploadedFile
        ? [uploadedFile]
        : [];


  // ====================================================
  // UPLOADED
  // ====================================================

  const isUploaded =
    files.length > 0;


  // ====================================================
  // MAX 2
  // ====================================================

  const maxFilesReached =
    files.length >= 2;


  // ====================================================
  // IMAGE CHECK
  // ====================================================

  const isImage = (file) => {

    const type =
      file?.type?.toLowerCase() ||
      "";

    const name =
      file?.name?.toLowerCase() ||
      "";


    return (
      type.startsWith("image/") ||
      /\.(jpg|jpeg|png|webp|heic)$/i.test(
        name
      )
    );

  };


  // ====================================================
  // FILE NAME
  // ====================================================

  const getFileName = (file) => {

    return (
      file?.name ||
      file?.fileName ||
      "Document"
    );

  };


  // ====================================================
  // FILE URL
  // ====================================================

  const getFileUrl = (file) => {

    // Server / Cloudinary URL
    if (file?.url) {

      return file.url;
    }

    // Fallback local URI
    if (file?.uri) {

      return file.uri;
    }

    return null;
  };


  // ====================================================
  // RENDER
  // ====================================================

  return (

    <View
      style={{
        marginBottom:
          theme.spacing.xl,
      }}
    >

      {/* ==================================================
          HEADER
      ================================================== */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",

          marginBottom:
            theme.spacing.sm,
        }}
      >

        {/* CHECKBOX */}

        {isUploaded ? (

          <View
            style={{
              backgroundColor:
                theme.colors.success,

              borderRadius: 4,

              padding: 2,

              marginRight:
                theme.spacing.sm,

              marginTop: 2,
            }}
          >

            <CheckSquare
              size={16}
              color={
                theme.colors.white
              }
            />

          </View>

        ) : (

          <Square
            size={20}
            color={
              theme.colors.gray300
            }

            style={{
              marginRight:
                theme.spacing.sm,

              marginTop: 2,
            }}
          />

        )}


        {/* TITLE */}

        <View
          style={{
            flex: 1,
          }}
        >

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


          {!!subtitle && (

            <Text
              style={{
                fontSize:
                  theme.typography.b2,

                fontFamily:
                  theme.fonts.regular,

                color:
                  theme.colors.gray500,

                marginTop: 2,
              }}
            >
              {subtitle}
            </Text>

          )}

        </View>

      </View>


      {/* ==================================================
          UPLOADED FILE PREVIEWS
      ================================================== */}

      {files.length > 0 && (

        <View
          style={{
            flexDirection: "row",

            gap:
              theme.spacing.sm,

            marginBottom:
              theme.spacing.md,
          }}
        >

          {files.map(
            (file, index) => {

              const image =
                isImage(file);

              const fileUrl =
                getFileUrl(file);


              return (

                <View
                  key={
                    `${getFileName(file)}-${index}`
                  }

                  style={{
                    width: 110,

                    height: 110,

                    borderRadius:
                      theme.radius.lg,

                    overflow:
                      "hidden",

                    backgroundColor:
                      theme.colors.gray100,

                    borderWidth: 1,

                    borderColor:
                      theme.colors.gray200,

                    position:
                      "relative",
                  }}
                >

                  {/* ==================================================
                      IMAGE PREVIEW
                  ================================================== */}

                  {image && fileUrl ? (

                    <Image
                      source={{
                        uri: fileUrl,
                      }}

                      style={{
                        width:
                          "100%",

                        height:
                          "100%",
                      }}

                      resizeMode="cover"
                    />

                  ) : (

                    /* ==================================================
                       PDF / DOCUMENT
                    ================================================== */

                    <View
                      style={{
                        flex: 1,

                        alignItems:
                          "center",

                        justifyContent:
                          "center",

                        padding:
                          theme.spacing.sm,
                      }}
                    >

                      <FileText
                        size={36}
                        color={
                          theme.colors.navy500
                        }
                      />


                      <Text
                        numberOfLines={2}

                        style={{
                          fontSize: 11,

                          fontFamily:
                            theme.fonts.medium,

                          color:
                            theme.colors.gray600,

                          textAlign:
                            "center",

                          marginTop:
                            theme.spacing.xs,
                        }}
                      >
                        {getFileName(file)}
                      </Text>

                    </View>

                  )}


                  {/* ==================================================
                      REMOVE
                  ================================================== */}

                  <TouchableOpacity
                    activeOpacity={0.8}

                    onPress={() => {

                      if (onRemove) {

                        onRemove(index);
                      }

                    }}

                    style={{
                      position:
                        "absolute",

                      top: 6,

                      right: 6,

                      width: 26,

                      height: 26,

                      borderRadius: 13,

                      backgroundColor:
                        "rgba(0,0,0,0.65)",

                      alignItems:
                        "center",

                      justifyContent:
                        "center",
                    }}
                  >

                    <X
                      size={16}
                      color={
                        theme.colors.white
                      }
                    />

                  </TouchableOpacity>


                  {/* ==================================================
                      FILE NUMBER
                  ================================================== */}

                  <View
                    style={{
                      position:
                        "absolute",

                      bottom: 6,

                      left: 6,

                      backgroundColor:
                        "rgba(0,0,0,0.65)",

                      borderRadius: 10,

                      paddingHorizontal: 7,

                      paddingVertical: 3,
                    }}
                  >

                    <Text
                      style={{
                        color:
                          theme.colors.white,

                        fontSize: 10,

                        fontFamily:
                          theme.fonts.bold,
                      }}
                    >
                      {index + 1}
                    </Text>

                  </View>

                </View>

              );

            }
          )}


          {/* ==================================================
              UPLOADING SKELETON
          ================================================== */}

          {uploading && (

            <View
              style={{
                width: 110,

                height: 110,

                borderRadius:
                  theme.radius.lg,

                backgroundColor:
                  theme.colors.gray100,

                borderWidth: 1,

                borderColor:
                  theme.colors.gray200,

                alignItems:
                  "center",

                justifyContent:
                  "center",
              }}
            >

              <ActivityIndicator
                size="large"
                color={
                  theme.colors.primary500
                }
              />

              <Text
                style={{
                  marginTop:
                    theme.spacing.sm,

                  fontSize: 11,

                  fontFamily:
                    theme.fonts.medium,

                  color:
                    theme.colors.gray500,
                }}
              >
                Uploading...
              </Text>

            </View>

          )}

        </View>

      )}


      {/* ==================================================
          UPLOADING SKELETON WHEN NO FILE EXISTS
      ================================================== */}

      {uploading &&
        files.length === 0 && (

          <View
            style={{
              width: "100%",

              height: 150,

              borderRadius:
                theme.radius.xl,

              backgroundColor:
                theme.colors.gray100,

              borderWidth: 1,

              borderColor:
                theme.colors.gray200,

              alignItems:
                "center",

              justifyContent:
                "center",

              marginBottom:
                theme.spacing.md,
            }}
          >

            <ActivityIndicator
              size="large"
              color={
                theme.colors.primary500
              }
            />

            <Text
              style={{
                marginTop:
                  theme.spacing.sm,

                fontSize:
                  theme.typography.b2,

                fontFamily:
                  theme.fonts.medium,

                color:
                  theme.colors.gray500,
              }}
            >
              Uploading document...
            </Text>

          </View>

        )}


      {/* ==================================================
          UPLOAD AREA
      ================================================== */}

      {!maxFilesReached &&
        !uploading && (

          <TouchableOpacity
            activeOpacity={0.8}

            onPress={onUpload}

            style={{
              borderWidth: 1,

              borderStyle:
                "dashed",

              borderColor:
                isUploaded
                  ? theme.colors.primary500
                  : theme.colors.gray300,

              borderRadius:
                theme.radius.xl,

              backgroundColor:
                isUploaded
                  ? theme.colors.primary50
                  : "#F8FAFC",

              paddingVertical:
                theme.spacing.xl,

              paddingHorizontal:
                theme.spacing.lg,

              alignItems:
                "center",

              justifyContent:
                "center",
            }}
          >

            {/* ICON */}

            <View
              style={{
                width: 48,

                height: 48,

                borderRadius:
                  theme.radius.circle,

                backgroundColor:
                  theme.colors.gray100,

                justifyContent:
                  "center",

                alignItems:
                  "center",

                marginBottom:
                  theme.spacing.sm,
              }}
            >

              <Upload
                size={22}
                color={
                  theme.colors.navy500
                }
              />

            </View>


            {/* TITLE */}

            <Text
              style={{
                fontSize:
                  theme.typography.b1,

                fontFamily:
                  theme.fonts.bold,

                color:
                  theme.colors.text,

                marginBottom: 2,
              }}
            >
              {files.length === 0
                ? title
                : "Add Another File"}
            </Text>


            {/* SUBTITLE */}

            <Text
              style={{
                fontSize:
                  theme.typography.b3,

                fontFamily:
                  theme.fonts.regular,

                color:
                  theme.colors.gray500,

                marginBottom:
                  theme.spacing.md,

                textAlign:
                  "center",
              }}
            >
              {files.length === 0
                ? subtitle
                : `${files.length}/2 files uploaded`}
            </Text>


            {/* BUTTON */}

            <View
              style={{
                backgroundColor:
                  theme.colors.white,

                paddingVertical:
                  theme.spacing.sm,

                paddingHorizontal:
                  theme.spacing.xxl,

                borderRadius:
                  theme.radius.md,

                borderWidth: 1,

                borderColor:
                  theme.colors.gray200,

                ...theme.shadows.card,
              }}
            >

              <Text
                style={{
                  fontSize:
                    theme.typography.b2,

                  fontFamily:
                    theme.fonts.bold,

                  color:
                    theme.colors.text,
                }}
              >
                {files.length === 0
                  ? "Upload File"
                  : "Add File"}
              </Text>

            </View>

          </TouchableOpacity>

        )}


      {/* ==================================================
          MAX FILE MESSAGE
      ================================================== */}

      {maxFilesReached && (

        <View
          style={{
            paddingVertical:
              theme.spacing.md,

            paddingHorizontal:
              theme.spacing.lg,

            borderRadius:
              theme.radius.lg,

            backgroundColor:
              theme.colors.primary50,

            borderWidth: 1,

            borderColor:
              theme.colors.primary100,
          }}
        >

          <Text
            style={{
              fontSize:
                theme.typography.b3,

              fontFamily:
                theme.fonts.medium,

              color:
                theme.colors.gray600,

              textAlign:
                "center",
            }}
          >
            Maximum 2 files uploaded.
            Remove a file to add another.
          </Text>

        </View>

      )}


      {/* ==================================================
          ERROR
      ================================================== */}

      {!!error && (

        <Text
          style={{
            color:
              theme.colors.error,

            fontSize:
              theme.typography.b3,

            marginTop: 6,

            fontFamily:
              theme.fonts.medium,
          }}
        >
          {error}
        </Text>

      )}

    </View>

  );

};


export default DocumentUploadCard;