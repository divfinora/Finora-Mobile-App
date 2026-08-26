import React, {
  memo,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";

import {
  FileText,
  Trash2,
  Upload,
} from "lucide-react-native";

import LinearGradient from "react-native-linear-gradient";

import {
  theme,
} from "../../../../theme";

import UploadBottomSheet from
  "../../../../components/common/Modal/UploadBottomSheet";

import DocumentNameModal from
  "../components/DocumentNameModal";

import {
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";

import {
  pick,
  types,
  isCancel,
} from "@react-native-documents/picker";

import {
  useUploadVisitorPhotoMutation,
} from "../../../../redux/features/visitor/visitorApi";

import useHandleMutation from
  "../../../../hooks/useHandleMutation";


// =====================================================
// CONSTANTS
// =====================================================

const MAX_UPLOADS = 10;

const MAX_FILE_SIZE =
  10 * 1024 * 1024;


// =====================================================
// COMPONENT
// =====================================================

const SiteDetails = ({
  job,
  data = {},
  onChange,
}) => {

  // ===================================================
  // DOCUMENT NAME MODAL
  // ===================================================

  const [
    documentNameVisible,
    setDocumentNameVisible,
  ] = useState(false);


  // ===================================================
  // UPLOAD SHEET
  // ===================================================

  const [
    uploadSheetVisible,
    setUploadSheetVisible,
  ] = useState(false);


  // ===================================================
  // DOCUMENT NAME
  // ===================================================

  const [
    documentName,
    setDocumentName,
  ] = useState("");


  // ===================================================
  // LOCAL UPLOAD LOADING
  // ===================================================

  const [
    uploading,
    setUploading,
  ] = useState(false);


  // ===================================================
  // HANDLE MUTATION
  // ===================================================

  const {
    handleMutation,
  } = useHandleMutation();


  // ===================================================
  // UPLOAD PHOTO API
  // ===================================================

  const [
    uploadVisitorPhoto,
  ] = useUploadVisitorPhotoMutation();


  // ===================================================
  // FINAL UPLOAD LOADING
  // ===================================================

  const isDocumentUploading =
    uploading;


  // ===================================================
  // DOCUMENTS
  // ===================================================

  const uploadedDocuments =
    Array.isArray(
      data?.uploadedDocuments
    )
      ? data.uploadedDocuments
      : [];


  const uploadedCount =
    uploadedDocuments.length;


  // ===================================================
  // PROGRESS
  // ===================================================

  const uploadPercentage =
    Math.min(
      Math.round(
        (
          uploadedCount /
          MAX_UPLOADS
        ) * 100
      ),
      100
    );


  // ===================================================
  // OPEN DOCUMENT NAME MODAL
  // ===================================================

  const handleOpenDocumentModal =
    () => {

      if (isDocumentUploading) {
        return;
      }


      if (
        uploadedCount >=
        MAX_UPLOADS
      ) {

        Alert.alert(
          "Maximum Documents",
          "Maximum 10 documents can be uploaded."
        );

        return;
      }


      setDocumentName("");

      setDocumentNameVisible(true);
    };


  // ===================================================
  // DOCUMENT NAME SUBMIT
  // ===================================================

  const handleDocumentNameContinue =
    (name) => {

      const trimmedName =
        name?.trim();


      if (!trimmedName) {
        return;
      }


      // -----------------------------------------------
      // SAVE DOCUMENT NAME
      // -----------------------------------------------

      setDocumentName(
        trimmedName
      );


      // -----------------------------------------------
      // CLOSE NAME MODAL
      // -----------------------------------------------

      setDocumentNameVisible(
        false
      );


      // -----------------------------------------------
      // OPEN FILE PICKER SHEET
      // -----------------------------------------------

      setTimeout(() => {

        setUploadSheetVisible(
          true
        );

      }, 250);

    };


  // ===================================================
  // SAVE DOCUMENT LOCALLY
  // ===================================================

  const saveDocument =
    (document) => {

      const updatedDocuments = [

        document,

        ...uploadedDocuments,

      ].slice(
        0,
        MAX_UPLOADS
      );


      onChange?.({

        uploadedDocuments:
          updatedDocuments,

      });

    };


  // ===================================================
  // VALIDATE FILE
  // ===================================================

  const validateFile =
    (file) => {

      if (!file?.uri) {

        Alert.alert(
          "File Missing",
          "Selected file is not available."
        );

        return false;
      }


      if (
        file?.size &&
        file.size >
        MAX_FILE_SIZE
      ) {

        Alert.alert(
          "File Too Large",
          "Maximum file size is 10 MB."
        );

        return false;
      }


      return true;
    };


  // ===================================================
  // HANDLE SELECTED FILE
  // ===================================================

  const handleSelectedFile =
    async (file) => {

      // -----------------------------------------------
      // VALIDATE FILE
      // -----------------------------------------------

      if (
        !validateFile(file)
      ) {
        return;
      }


      // -----------------------------------------------
      // LOAN ID
      // -----------------------------------------------

      if (!job?.loanId) {

        Alert.alert(
          "Error",
          "Loan ID is missing."
        );

        return;
      }


      // -----------------------------------------------
      // DOCUMENT NAME
      // -----------------------------------------------

      const trimmedDocumentName =
        documentName?.trim();


      if (!trimmedDocumentName) {

        Alert.alert(
          "Document Name Required",
          "Please enter document name first."
        );

        return;
      }


      try {

        setUploading(true);


        // =============================================
        // FORM DATA
        // =============================================

        const formData =
          new FormData();


        // =============================================
        // PHOTO FILE
        // =============================================

        formData.append(
          "photo",
          {
            uri:
              file?.uri,

            name:
              file?.name ||
              `document_${Date.now()}`,

            type:
              file?.type ||
              "application/octet-stream",
          }
        );


        // =============================================
        // CATEGORY
        //
        // BACKEND REQUIREMENT:
        //
        // category = CUSTOMER
        // category = CUSTOMER_SELFIE
        // category = HOUSE_FRONT
        // category = HOUSE_INSIDE
        // category = SHOP
        // category = OFFICE
        // category = DOCUMENT
        // category = WITNESS
        // category = OTHER
        //
        // FOR USER DOCUMENT:
        //
        // category = DOCUMENT NAME
        // =============================================

        formData.append(
          "category",
          trimmedDocumentName
        );


        // =============================================
        // CONSOLE PAYLOAD
        // =============================================

        console.log(
          "DOCUMENT UPLOAD PAYLOAD",
          {
            endpoint:
              `/applyloan/${job?.loanId}/upload-photo`,

            loanId:
              job?.loanId,

            photo: {
              name:
                file?.name,

              type:
                file?.type,

              size:
                file?.size,

              uri:
                file?.uri,
            },

            category:
              trimmedDocumentName,
          }
        );


        // =============================================
        // API CALL
        // =============================================

        const response =
          await handleMutation({

            apiFunc:
              uploadVisitorPhoto,

            params: {

              loanId:
                job?.loanId,

              formData,

            },

            showSuccess:
              true,

            customSuccessMsg:
              "Document uploaded successfully",

            onSuccess:
              (apiResponse) => {

                console.log(
                  "DOCUMENT UPLOAD RESPONSE:",
                  apiResponse
                );

              },

          });


        // =============================================
        // FAILED
        // =============================================

        if (!response) {
          return;
        }


        // =============================================
        // SERVER RESPONSE
        //
        // Expected:
        //
        // {
        //   success: true,
        //   message: "...",
        //   data: {
        //     category,
        //     url,
        //     publicId,
        //     uploadedBy,
        //     uploadedAt
        //   }
        // }
        // =============================================

        const serverData =
          response?.data ||
          response;


        // =============================================
        // MAP RECENT DOCUMENT
        // =============================================

        const uploadedDocument = {

          id:
            serverData?.publicId ||
            `${Date.now()}`,

          name:
            trimmedDocumentName,

          title:
            trimmedDocumentName,

          category:
            serverData?.category ||
            trimmedDocumentName,

          fileName:
            file?.name ||
            "document",

          uri:
            file?.uri,

          url:
            serverData?.url ||
            file?.uri,

          publicId:
            serverData?.publicId ||
            null,

          uploadedBy:
            serverData?.uploadedBy ||
            null,

          type:
            file?.type ||
            "application/octet-stream",

          size:
            file?.size ||
            0,

          uploaded:
            true,

          uploadedAt:
            serverData?.uploadedAt ||
            new Date().toISOString(),

        };


        // =============================================
        // ADD TO RECENTLY UPLOADED
        // =============================================

        saveDocument(
          uploadedDocument
        );


        // =============================================
        // CLOSE FILE SHEET
        // =============================================

        setUploadSheetVisible(
          false
        );


        // =============================================
        // RESET
        // =============================================

        setDocumentName("");


      } catch (error) {

        console.log(
          "DOCUMENT UPLOAD ERROR:",
          error
        );

      } finally {

        setUploading(false);

      }

    };


  // ===================================================
  // CAMERA
  // ===================================================

  const handleCamera =
    async () => {

      try {

        const result =
          await launchCamera({

            mediaType:
              "photo",

            cameraType:
              "back",

            quality:
              0.85,

            includeBase64:
              false,

          });


        if (
          result?.didCancel
        ) {
          return;
        }


        if (
          result?.errorCode
        ) {

          Alert.alert(
            "Camera Error",
            result?.errorMessage ||
            "Unable to open camera."
          );

          return;
        }


        const asset =
          result?.assets?.[0];


        if (!asset?.uri) {
          return;
        }


        await handleSelectedFile({

          uri:
            asset.uri,

          name:
            asset.fileName ||
            `document_${Date.now()}.jpg`,

          type:
            asset.type ||
            "image/jpeg",

          size:
            asset.fileSize ||
            0,

        });

      } catch (error) {

        console.log(
          "CAMERA ERROR:",
          error
        );


        Alert.alert(
          "Error",
          "Unable to capture image."
        );

      }

    };


  // ===================================================
  // GALLERY
  // ===================================================

  const handleGallery =
    async () => {

      try {

        const result =
          await launchImageLibrary({

            mediaType:
              "photo",

            selectionLimit:
              1,

            quality:
              0.85,

            includeBase64:
              false,

          });


        if (
          result?.didCancel
        ) {
          return;
        }


        if (
          result?.errorCode
        ) {

          Alert.alert(
            "Gallery Error",
            result?.errorMessage ||
            "Unable to open gallery."
          );

          return;
        }


        const asset =
          result?.assets?.[0];


        if (!asset?.uri) {
          return;
        }


        await handleSelectedFile({

          uri:
            asset.uri,

          name:
            asset.fileName ||
            `document_${Date.now()}.jpg`,

          type:
            asset.type ||
            "image/jpeg",

          size:
            asset.fileSize ||
            0,

        });

      } catch (error) {

        console.log(
          "GALLERY ERROR:",
          error
        );


        Alert.alert(
          "Error",
          "Unable to select image."
        );

      }

    };


  // ===================================================
  // DOCUMENT / PDF
  // ===================================================

  const handleDocument =
    async () => {

      try {

        const [
          result,
        ] =
          await pick({

            type: [

              types.images,

              types.pdf,

            ],

            allowMultiSelection:
              false,

          });


        if (!result) {
          return;
        }


        await handleSelectedFile({

          uri:
            result.uri,

          name:
            result.name ||
            `document_${Date.now()}`,

          type:
            result.type ||
            "application/octet-stream",

          size:
            result.size ||
            0,

        });

      } catch (error) {

        if (
          isCancel(error)
        ) {
          return;
        }


        console.log(
          "DOCUMENT PICK ERROR:",
          error
        );


        Alert.alert(
          "Error",
          "Unable to select document."
        );

      }

    };


  // ===================================================
  // DELETE DOCUMENT
  // ===================================================

  const handleDeleteDocument =
    (
      documentId,
      index
    ) => {

      const updatedDocuments =
        uploadedDocuments.filter(

          (
            item,
            itemIndex
          ) => {

            if (documentId) {

              return (
                item?.id !==
                documentId
              );

            }


            return (
              itemIndex !==
              index
            );

          }

        );


      onChange?.({

        uploadedDocuments:
          updatedDocuments,

      });

    };


  // ===================================================
  // RECENT DOCUMENT
  // ===================================================

  const renderUploadedItem =
    (
      item,
      index
    ) => {

      const isImage =
        item?.type
          ?.toLowerCase()
          ?.startsWith(
            "image/"
          );


      const imageUri =
        item?.url ||
        item?.uri;


      return (

        <View
          key={
            item?.id ||
            index
          }

          style={{

            minHeight:
              88,

            backgroundColor:
              theme.colors.white,

            borderRadius:
              16,

            padding:
              theme.spacing.md,

            marginBottom:
              theme.spacing.sm,

            flexDirection:
              "row",

            alignItems:
              "center",

            borderWidth:
              1,

            borderColor:
              "#EEEEEE",

          }}
        >

          {/* =========================================
              PREVIEW
          ========================================= */}

          <View
            style={{

              width: 54,

              height: 54,

              borderRadius: 13,

              overflow:
                "hidden",

              backgroundColor:
                "#FFF4EA",

              alignItems:
                "center",

              justifyContent:
                "center",

            }}
          >

            {isImage &&
            imageUri ? (

              <Image
                source={{
                  uri:
                    imageUri,
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

              <FileText
                size={25}
                color={
                  theme.colors.primary500
                }
              />

            )}

          </View>


          {/* =========================================
              DETAILS
          ========================================= */}

          <View
            style={{

              flex: 1,

              marginLeft:
                theme.spacing.md,

            }}
          >

            <Text
              numberOfLines={1}

              style={{

                color:
                  theme.colors.black,

                fontSize:
                  theme.typography.b1,

                fontFamily:
                  theme.fonts.semiBold,

              }}
            >
              {
                item?.category ||
                item?.title ||
                item?.name ||
                "Uploaded Document"
              }
            </Text>


            <Text
              style={{

                color:
                  theme.colors.gray500,

                fontSize:
                  12,

                fontFamily:
                  theme.fonts.semiBold,

                 

              }}
            >
              Uploaded just now
            </Text>


            <Text
              style={{

                color:
                  theme.colors.success,

                fontSize:
                  11,

                fontFamily:
                  theme.fonts.medium,

                marginTop: 2,

              }}
            >
              ✓ Uploaded
            </Text>

          </View>


          {/* =========================================
              DELETE
          ========================================= */}

          <TouchableOpacity
            activeOpacity={0.8}

            disabled={
              isDocumentUploading
            }

            onPress={() =>
              handleDeleteDocument(
                item?.id,
                index
              )
            }

            style={{

              width: 38,

              height: 38,

              borderRadius: 12,

              backgroundColor:
                "#FFF5F5",

              alignItems:
                "center",

              justifyContent:
                "center",

            }}
          >

            <Trash2
              size={18}

              color={
                theme.colors.error
              }
            />

          </TouchableOpacity>

        </View>

      );

    };


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <View
      style={{
        width: "100%",
      }}
    >

      {/* =================================================
          UPLOAD PROGRESS
      ================================================= */}

      <View
        style={{

          backgroundColor:
            theme.colors.white,

          borderRadius:
            theme.radius.xl,

          padding:
            theme.spacing.xl,

          marginBottom:
            theme.spacing.lg,

          ...theme.shadows.card,

        }}
      >

        <View
          style={{

            flexDirection:
              "row",

            alignItems:
              "center",

          }}
        >

          <View
            style={{
              flex: 1,
            }}
          >

            <Text
              style={{

                color:
                  theme.colors.black,

                fontSize:
                  theme.typography.b2,

                fontFamily:
                  theme.fonts.medium,

              }}
            >
              Upload Progress
            </Text>


            <View
              style={{

                height: 8,

                borderRadius: 999,

                backgroundColor:
                  theme.colors.gray200,

                overflow:
                  "hidden",

                marginTop:
                  theme.spacing.sm,

              }}
            >

              <LinearGradient
                colors={[

                  theme.colors.primary300,

                  theme.colors.primary500,

                ]}

                start={{
                  x: 0,
                  y: 0,
                }}

                end={{
                  x: 1,
                  y: 0,
                }}

                style={{

                  width:
                    `${uploadPercentage}%`,

                  height:
                    "100%",

                }}
              />

            </View>

          </View>


          {/* COUNT */}

          <View
            style={{

              alignItems:
                "center",

              marginHorizontal:
                theme.spacing.lg,

            }}
          >

            <Text
              style={{

                color:
                  theme.colors.black,

                fontSize: 24,

                fontFamily:
                  theme.fonts.headingBold,

              }}
            >
              {uploadedCount}/{MAX_UPLOADS}
            </Text>


            <Text
              style={{

                color:
                  theme.colors.gray500,

                fontSize: 11,

                fontFamily:
                  theme.fonts.regular,

              }}
            >
              Uploaded
            </Text>

          </View>


          {/* PERCENT */}

          <View
            style={{

              width: 58,

              height: 58,

              borderRadius: 29,

              borderWidth: 4,

              borderColor:
                theme.colors.primary400,

              alignItems:
                "center",

              justifyContent:
                "center",

            }}
          >

            <Text
              style={{

                color:
                  theme.colors.black,

                fontSize: 11,

                fontFamily:
                  theme.fonts.bold,

              }}
            >
              {uploadPercentage}%
            </Text>

          </View>

        </View>

      </View>


      {/* =================================================
          DOCUMENT UPLOAD CARD
      ================================================= */}

      <TouchableOpacity
        activeOpacity={0.92}

        onPress={
          handleOpenDocumentModal
        }

        disabled={
          isDocumentUploading ||
          uploadedCount >=
            MAX_UPLOADS
        }

        style={{

          backgroundColor:
            theme.colors.white,

          borderRadius:
            20,

          marginBottom:
            theme.spacing.lg,

          borderWidth:
            1,

          borderColor:
            isDocumentUploading ||
            uploadedCount >=
              MAX_UPLOADS
              ? theme.colors.gray300
              : "#EAD9CC",

          overflow:
            "hidden",

          opacity:
            isDocumentUploading ||
            uploadedCount >=
              MAX_UPLOADS
              ? 0.65
              : 1,

          ...theme.shadows.card,

        }}
      >

        {/* HEADER */}

        <View
          style={{

            paddingHorizontal:
              theme.spacing.lg,

            paddingTop:
              theme.spacing.lg,

            paddingBottom:
              theme.spacing.md,

            flexDirection:
              "row",

            alignItems:
              "center",

          }}
        >

          <View
            style={{

              width: 46,

              height: 46,

              borderRadius: 14,

              backgroundColor:
                "#FFF5EC",

              alignItems:
                "center",

              justifyContent:
                "center",

              borderWidth:
                1,

              borderColor:
                "#FCE2CF",

            }}
          >

            {isDocumentUploading ? (

              <ActivityIndicator
                size="small"
                color={
                  theme.colors.primary500
                }
              />

            ) : (

              <FileText
                size={22}

                color={
                  theme.colors.primary500
                }

                strokeWidth={2}
              />

            )}

          </View>


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
              {isDocumentUploading
                ? "Uploading Document"
                : "Upload Document"}
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
              {isDocumentUploading
                ? "Please wait while your document is being uploaded"
                : "Add a document for this loan"}
            </Text>

          </View>

        </View>


        {/* UPLOAD AREA */}

        <View
          style={{

            marginHorizontal:
              theme.spacing.lg,

            marginBottom:
              theme.spacing.lg,

            minHeight:
              150,

            borderRadius:
              16,

            borderWidth:
              1.2,

            borderColor:
              isDocumentUploading
                ? "#F3D6BE"
                : "#E9CDB8",

            borderStyle:
              "dashed",

            backgroundColor:
              isDocumentUploading
                ? "#FFF8F2"
                : "#FFFCF9",

            alignItems:
              "center",

            justifyContent:
              "center",

            padding:
              theme.spacing.lg,

          }}
        >

          {/* ICON */}

          <View
            style={{

              width: 52,

              height: 52,

              borderRadius: 18,

              backgroundColor:
                "#FFF1E5",

              alignItems:
                "center",

              justifyContent:
                "center",

              marginBottom:
                theme.spacing.sm,

            }}
          >

            {isDocumentUploading ? (

              <ActivityIndicator
                size="small"
                color={
                  theme.colors.primary500
                }
              />

            ) : (

              <Upload
                size={24}

                color={
                  theme.colors.primary500
                }

                strokeWidth={2}
              />

            )}

          </View>


          {/* MAIN TEXT */}

          {isDocumentUploading ? (

            <View
              style={{

                flexDirection:
                  "row",

                alignItems:
                  "center",

                justifyContent:
                  "center",

              }}
            >

              <ActivityIndicator
                size="small"
                color={
                  theme.colors.primary500
                }
              />

              <Text
                style={{

                  marginLeft:
                    theme.spacing.sm,

                  color:
                    theme.colors.primary500,

                  fontSize:
                    theme.typography.b2,

                  fontFamily:
                    theme.fonts.semiBold,

                  textAlign:
                    "center",

                }}
              >
                Uploading document...
              </Text>

            </View>

          ) : (

            <Text
              style={{

                color:
                  theme.colors.black,

                fontSize:
                  theme.typography.b2,

                fontFamily:
                  theme.fonts.semiBold,

                textAlign:
                  "center",

              }}
            >
              Tap to upload document
            </Text>

          )}


          <Text
            style={{

              marginTop: 5,

              color:
                theme.colors.gray500,

              fontSize:
                12,

              fontFamily:
                theme.fonts.regular,

              textAlign:
                "center",

            }}
          >
            {isDocumentUploading
              ? "Uploading securely to server"
              : "Camera, Gallery or PDF"}
          </Text>


          {!isDocumentUploading && (

            <Text
              style={{

                marginTop:
                  theme.spacing.sm,

                color:
                  theme.colors.gray400,

                fontSize:
                  10.5,

                fontFamily:
                  theme.fonts.regular,

                textAlign:
                  "center",

              }}
            >
              Maximum file size 10 MB
            </Text>

          )}

        </View>


        {/* FOOTER */}

        <View
          style={{

            backgroundColor:
              "#FAF7F4",

            paddingHorizontal:
              theme.spacing.lg,

            paddingVertical:
              theme.spacing.sm,

            flexDirection:
              "row",

            alignItems:
              "center",

            justifyContent:
              "space-between",

          }}
        >

          <Text
            style={{

              color:
                theme.colors.gray500,

              fontSize:
                11,

              fontFamily:
                theme.fonts.regular,

            }}
          >
            {isDocumentUploading
              ? "Uploading..."
              : "Documents uploaded"}
          </Text>


          <Text
            style={{

              color:
                theme.colors.primary500,

              fontSize:
                11,

              fontFamily:
                theme.fonts.semiBold,

            }}
          >
            {uploadedCount} / {MAX_UPLOADS}
          </Text>

        </View>

      </TouchableOpacity>


      {/* =================================================
          RECENTLY UPLOADED
      ================================================= */}

      <View
        style={{

          backgroundColor:
            "#F1F2F1",

          borderRadius:
            theme.radius.xl,

          padding:
            theme.spacing.lg,

          marginBottom:
            theme.spacing.xl,
borderWidth:
            0.1,
             borderColor:
            "#0E0E0E",
        }}
      >

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

          <Text
            style={{

              color:
                theme.colors.black,

              fontSize:
                theme.typography.b2,

              fontFamily:
                theme.fonts.extraBold,

            }}
          >
            RECENTLY UPLOADED
          </Text>


          {uploadedCount > 0 && (

            <Text
              style={{

                color:
                  theme.colors.gray700,

                fontSize:
                  theme.typography.b3,

                fontFamily:
                  theme.fonts.medium,

              }}
            >
              {uploadedCount} Uploaded
            </Text>

          )}

        </View>


        {uploadedCount > 0 ? (

          uploadedDocuments.map(
            renderUploadedItem
          )

        ) : (

          <View
            style={{

              backgroundColor:
                theme.colors.white,

              borderRadius:
                theme.radius.lg,

              padding:
                theme.spacing.xl,

              alignItems:
                "center",

            }}
          >

            <FileText
              size={30}

              color={
                theme.colors.gray500
              }
            />


            <Text
              style={{

                marginTop:
                  theme.spacing.sm,

                color:
                  theme.colors.gray500,

                fontSize:
                  theme.typography.b2,

                fontFamily:
                  theme.fonts.medium,

              }}
            >
              No documents uploaded yet
            </Text>

          </View>

        )}

      </View>


      {/* =================================================
          DOCUMENT NAME MODAL
      ================================================= */}

      <DocumentNameModal

        visible={
          documentNameVisible
        }

        onClose={() => {

          setDocumentNameVisible(
            false
          );

          setDocumentName("");

        }}

        onContinue={
          handleDocumentNameContinue
        }

      />


      {/* =================================================
          COMMON UPLOAD SHEET
      ================================================= */}

      <UploadBottomSheet

        sheetVisible={
          uploadSheetVisible
        }

        setSheetVisible={
          setUploadSheetVisible
        }

        openCamera={
          handleCamera
        }

        openGallery={
          handleGallery
        }

        openDocument={
          handleDocument
        }

        type="photo"

      />

    </View>

  );

};


export default memo(
  SiteDetails
);