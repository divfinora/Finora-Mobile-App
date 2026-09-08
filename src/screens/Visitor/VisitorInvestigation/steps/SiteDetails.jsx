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
  useSaveVisitorSiteDetailsMutation,
  useUploadSitePhotoMutation,
  useDeleteLoanFileMutation,
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
  // DELETE FILE API
  // ===================================================

  const [
    deleteLoanFile,
  ] = useDeleteLoanFileMutation();

  // ===================================================
  // DELETE LOADING
  // Only the selected file shows loading
  // ===================================================

  const [deletingFileKey, setDeletingFileKey] =
    useState(null);

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
  // HANDLE MUTATION
  // ===================================================

  const {
    handleMutation,
  } = useHandleMutation();

  // ===================================================
  // UPLOAD PHOTO API
  // ===================================================

  const [
    uploadSitePhoto,
    { isLoading: isUploadLoading },
  ] = useUploadSitePhotoMutation();

  // ===================================================
  // SAVE SITE DETAILS API
  // ===================================================

  const [
    saveVisitorSiteDetails,
  ] = useSaveVisitorSiteDetailsMutation();

  // ===================================================
  // FINAL UPLOAD LOADING
  // ===================================================

  const isDocumentUploading =
    isUploadLoading;

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
  // PREVIOUSLY UPLOADED DOCUMENTS
  // ===================================================

  const uploadedOldDocuments =
    Array.isArray(
      data?.uploadedOldDocuments
    )
      ? data.uploadedOldDocuments
      : [];

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

      setDocumentNameVisible(
        true
      );
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

      setDocumentName(
        trimmedName
      );

      setDocumentNameVisible(
        false
      );

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

        // =============================================
        // FORM DATA
        // =============================================

        const formData =
          new FormData();

        // =============================================
        // PHOTO FILE
        // =============================================

        formData.append(
          "files",
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
              uploadSitePhoto,

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
        // =============================================

        const serverData =
          response?.data?.[0] || {}



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
        console.log(uploadedDocument, "uploadedDocument")
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
  // =====================================================
  // COMMON DELETE FILE FUNCTION
  // =====================================================

  const handleDeleteFile = ({
    item,
    index,
    list,
    stateKey,
  }) => {
    // ============================================
    // LOCAL FILE
    // ============================================

    if (!item?.publicId) {
      const updatedList = list.filter(
        (_, itemIndex) => itemIndex !== index
      );

      onChange?.({
        [stateKey]: updatedList,
      });

      return;
    }

    // ============================================
    // LOAN ID
    // ============================================

    if (!job?.loanId) {
      Alert.alert(
        "Delete Failed",
        "Loan ID is missing."
      );

      return;
    }

    // ============================================
    // UNIQUE FILE KEY
    // ============================================

    const fileKey =
      `${stateKey}:${item?.publicId || item?.id || index}`;

    // ============================================
    // CONFIRMATION
    // ============================================

    Alert.alert(
      "Delete File",
      "This file will be permanently deleted. Once deleted, it cannot be recovered.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",

          onPress: async () => {
            // ========================================
            // START LOADING FOR THIS FILE ONLY
            // ========================================

            setDeletingFileKey(fileKey);

            try {
              // ========================================
              // DELETE API
              // ========================================

              await handleMutation({
                apiFunc: deleteLoanFile,

                params: {
                  loanId: job.loanId,
                  publicId: item.publicId,
                },

                showSuccess: true,

                customSuccessMsg:
                  "File deleted successfully",

                // ======================================
                // ONLY AFTER API SUCCESS
                // REMOVE FROM UI
                // ======================================

                onSuccess: () => {
                  const updatedList =
                    list.filter(
                      (file) =>
                        file?.publicId !==
                        item.publicId
                    );

                  onChange?.({
                    [stateKey]: updatedList,
                  });
                },
              });
            } catch (error) {
              console.log(
                "DELETE FILE ERROR:",
                error
              );

              // ======================================
              // API FAILED
              // DO NOT REMOVE FROM UI
              // ======================================
            } finally {
              // ======================================
              // STOP LOADING FOR THIS FILE
              // ======================================

              setDeletingFileKey(null);
            }
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  // ===================================================
  // DELETE RECENT DOCUMENT
  // ===================================================

  const handleDeleteDocument = (
    documentId,
    index
  ) => {
    const selectedDocument =
      uploadedDocuments.find(
        (item) =>
          item?.id === documentId ||
          item?.publicId === documentId
      ) || uploadedDocuments?.[index];

    handleDeleteFile({
      item: selectedDocument,
      index,
      list: uploadedDocuments,
      stateKey: "uploadedDocuments",
    });
  };

  // ===================================================
  // DELETE PREVIOUSLY UPLOADED DOCUMENT
  // ===================================================

  const handleDeleteOldDocument = (
    documentId,
    index
  ) => {
    const selectedDocument =
      uploadedOldDocuments.find(
        (item) =>
          item?.id === documentId ||
          item?.publicId === documentId
      ) || uploadedOldDocuments?.[index];

    handleDeleteFile({
      item: selectedDocument,
      index,
      list: uploadedOldDocuments,
      stateKey: "uploadedOldDocuments",
    });
  };


  // ===================================================
  // RENDER PREVIOUSLY UPLOADED ITEM
  // ===================================================

  const renderOldUploadedItem =
    (
      item,
      index
    ) => {

      const imageUri =
        item?.url ||
        item?.uri;

      const fileKey =
        `uploadedOldDocuments:${item?.publicId || item?.id || index}`;

      const isDeleting =
        deletingFileKey === fileKey;

      return (
        <View
          key={
            item?.id ||
            item?.publicId ||
            `${imageUri}-${index}`
          }
          style={{
            minHeight: 88,
            backgroundColor:
              theme.colors.white,
            borderRadius: 16,
            padding:
              theme.spacing.md,
            marginBottom:
              theme.spacing.sm,
            flexDirection: "row",
            alignItems: "center",
            borderWidth: 1,
            borderColor:
              "#EEEEEE",
          }}
        >

          {/* PREVIEW */}

          <View
            style={{
              width: 54,
              height: 54,
              borderRadius: 13,
              overflow: "hidden",
              backgroundColor:
                "#FFF4EA",
              alignItems: "center",
              justifyContent:
                "center",
            }}
          >

            {imageUri ? (
              <Image
                source={{
                  uri:
                    imageUri,
                }}
                style={{
                  width: "100%",
                  height: "100%",
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

          {/* DETAILS */}

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
              {item?.name ||
                item?.title ||
                item?.fileName ||
                item?.category ||
                "Site Photo"}
            </Text>

            <Text
              style={{
                marginTop: 3,
                color:
                  theme.colors.gray500,
                fontSize: 12,
                fontFamily:
                  theme.fonts.regular,
              }}
            >
              Previously uploaded
            </Text>

            <Text
              style={{
                marginTop: 2,
                color:
                  theme.colors.success,
                fontSize: 11,
                fontFamily:
                  theme.fonts.medium,
              }}
            >
              ✓ Available
            </Text>

          </View>

          {/* DELETE */}

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={
              isDeleting
            }
            onPress={() =>
              handleDeleteOldDocument(
                item?.id ||
                item?.publicId,
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

            {isDeleting ? (
              <ActivityIndicator
                size="small"
                color={
                  theme.colors.error
                }
              />
            ) : (
              <Trash2
                size={18}
                color={
                  theme.colors.error
                }
              />
            )}

          </TouchableOpacity>

        </View>
      );
    };

  // ===================================================
  // RENDER RECENT DOCUMENT
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

      const fileKey =
        `uploadedDocuments:${item?.publicId || item?.id || index}`;

      const isDeleting =
        deletingFileKey === fileKey;

      return (
        <View
          key={
            item?.id ||
            index
          }
          style={{
            minHeight: 88,
            backgroundColor:
              theme.colors.white,
            borderRadius: 16,
            padding:
              theme.spacing.md,
            marginBottom:
              theme.spacing.sm,
            flexDirection:
              "row",
            alignItems:
              "center",
            borderWidth: 1,
            borderColor:
              "#EEEEEE",
          }}
        >

          {/* PREVIEW */}

          <View
            style={{
              width: 54,
              height: 54,
              borderRadius: 13,
              overflow: "hidden",
              backgroundColor:
                "#FFF4EA",
              alignItems: "center",
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
                  width: "100%",
                  height: "100%",
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

          {/* DETAILS */}

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
              {item?.category ||
                item?.title ||
                item?.name ||
                "Uploaded Document"}
            </Text>

            <Text
              style={{
                color:
                  theme.colors.gray500,
                fontSize: 12,
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
                fontSize: 11,
                fontFamily:
                  theme.fonts.medium,
                marginTop: 2,
              }}
            >
              ✓ Uploaded
            </Text>

          </View>

          {/* DELETE */}
          {/* LOCAL DELETE ONLY */}

          <TouchableOpacity
            activeOpacity={0.8}
            disabled={
              isDeleting
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

            {isDeleting ? (
              <ActivityIndicator
                size="small"
                color={theme.colors.error}
              />
            ) : (
              <Trash2
                size={18}
                color={theme.colors.error}
              />
            )}

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
              {uploadedCount}/
              {MAX_UPLOADS}
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
          borderWidth: 1,
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
              borderWidth: 1,
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
            minHeight: 150,
            borderRadius: 16,
            borderWidth: 1.2,
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
              fontSize: 12,
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
                fontSize: 10.5,
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
              fontSize: 11,
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
              fontSize: 11,
              fontFamily:
                theme.fonts.semiBold,
            }}
          >
            {uploadedCount} /{" "}
            {MAX_UPLOADS}
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
          borderWidth: 0.1,
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
          PREVIOUSLY UPLOADED
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
          borderWidth: 0.1,
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
            PREVIOUSLY UPLOADED
          </Text>

          {uploadedOldDocuments.length >
            0 && (

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
                {uploadedOldDocuments.length}{" "}
                Uploaded
              </Text>

            )}

        </View>

        {uploadedOldDocuments.length >
          0 ? (

          uploadedOldDocuments.map(
            renderOldUploadedItem
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
                textAlign:
                  "center",
              }}
            >
              No previously uploaded documents
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