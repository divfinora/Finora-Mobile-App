import React, {
  memo,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from "react-native";

import {
  Camera,
  FileText,
  PenLine,
  ShieldCheck,
  Upload,
  X,
  Plus,
} from "lucide-react-native";

import {
  launchCamera,
  launchImageLibrary,
} from "react-native-image-picker";

import {
  theme,
} from "../../../../theme";

import CommonInput from
  "../../../../components/common/Input/CommonInput";

import UploadBottomSheet from
  "../../../../components/common/Modal/UploadBottomSheet";

import IDDetailsModal from
  "../components/IDDetailsModal";

import {
  useUploadWitnessDocumentsMutation,
} from "../../../../redux/features/visitor/visitorApi";


// =====================================================
// CONSTANTS
// =====================================================

const MAX_FILE_SIZE =
  5 * 1024 * 1024;

const MAX_PHOTOS = 1;

const MAX_SIGNATURES = 1;

const MAX_DOCUMENTS = 10;

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];


// =====================================================
// COMPONENT
// =====================================================

const WitnessDetails = ({
  data = {},
  onChange,
  uploading = false,
}) => {

  // =====================================================
  // API
  // =====================================================

  const [
    uploadWitnessDocuments,
    {
      isLoading:
        isUploadingFile,
    },
  ] =
    useUploadWitnessDocumentsMutation();


  // =====================================================
  // UPLOAD SHEET
  // =====================================================

  const [
    sheetVisible,
    setSheetVisible,
  ] = useState(false);


  // =====================================================
  // ID DETAILS MODAL
  // =====================================================

  const [
    idModalVisible,
    setIdModalVisible,
  ] = useState(false);


  // =====================================================
  // CURRENT UPLOAD TYPE
  // =====================================================

  const [
    uploadType,
    setUploadType,
  ] = useState("");


  // =====================================================
  // CURRENT UPLOAD LOADING TYPE
  // =====================================================

  const [
    uploadingType,
    setUploadingType,
  ] = useState(null);


  // =====================================================
  // VALUES
  // =====================================================

  const witnessName =
    data?.witnessName || "";

  const mobileNumber =
    data?.mobileNumber || "";

  const relation =
    data?.relation || "";

  const idType =
    data?.idType || "";

  const idNumber =
    data?.idNumber || "";

  const witnessConfirmed =
    data?.witnessConfirmed === true;


  // =====================================================
  // NORMALIZE ARRAYS
  // =====================================================

  const photos = useMemo(
    () =>
      Array.isArray(data?.photos)
        ? data.photos
        : data?.selfie
          ? [data.selfie]
          : [],
    [
      data?.photos,
      data?.selfie,
    ]
  );


  const signatures = useMemo(
    () =>
      Array.isArray(data?.signatures)
        ? data.signatures
        : data?.signature
          ? [data.signature]
          : [],
    [
      data?.signatures,
      data?.signature,
    ]
  );


  const documents = useMemo(
    () =>
      Array.isArray(data?.documents)
        ? data.documents
        : data?.idDocument
          ? [data.idDocument]
          : [],
    [
      data?.documents,
      data?.idDocument,
    ]
  );


  // =====================================================
  // UPDATE FIELD
  // =====================================================

  const updateField = (
    field,
    value
  ) => {

    onChange?.({
      ...data,

      [field]:
        value,
    });
  };


  // =====================================================
  // OPEN UPLOAD SHEET
  // =====================================================

  const openUploadSheet = (
    type
  ) => {

    // -----------------------------------------------
    // LIMIT CHECK
    // -----------------------------------------------

    if (
      type === "photo" &&
      photos.length >= MAX_PHOTOS
    ) {

      Alert.alert(
        "Limit Reached",
        "Maximum 1 witness photos are allowed."
      );

      return;
    }


    if (
      type === "signature" &&
      signatures.length >= MAX_SIGNATURES
    ) {

      Alert.alert(
        "Limit Reached",
        "Maximum 1 witness signatures are allowed."
      );

      return;
    }


    if (
      type === "document" &&
      documents.length >= MAX_DOCUMENTS
    ) {

      Alert.alert(
        "Limit Reached",
        "Maximum 10 witness documents are allowed."
      );

      return;
    }


    setUploadType(
      type
    );

    setSheetVisible(
      true
    );
  };


  // =====================================================
  // OPEN ID DETAILS
  // =====================================================

  const handleOpenIDDocument = () => {

    setIdModalVisible(
      true
    );
  };


  // =====================================================
  // ID DETAILS CONTINUE
  // =====================================================

  const handleIDDetailsContinue = (
    values
  ) => {

    const nextData = {

      ...data,

      idType:
        values?.idType || "",

      idNumber:
        values?.idNumber || "",

    };


    onChange?.(
      nextData
    );


    setIdModalVisible(
      false
    );


    // -----------------------------------------------
    // OPEN DOCUMENT UPLOAD
    // -----------------------------------------------

    setTimeout(() => {

      openUploadSheet(
        "document"
      );

    }, 200);
  };


  // =====================================================
  // VALIDATE FILE
  // =====================================================

  const validateFile = (
    file
  ) => {

    // -----------------------------------------------
    // URI
    // -----------------------------------------------

    if (!file?.uri) {

      Alert.alert(
        "File Missing",
        "Selected file is not available."
      );

      return false;
    }


    // -----------------------------------------------
    // SIZE
    // -----------------------------------------------

    const fileSize =
      file?.fileSize ||
      file?.size ||
      0;


    if (
      fileSize > MAX_FILE_SIZE
    ) {

      Alert.alert(
        "File Too Large",
        "Maximum file size is 5 MB."
      );

      return false;
    }


    // -----------------------------------------------
    // TYPE
    // -----------------------------------------------

    const mimeType =
      (
        file?.type ||
        "image/jpeg"
      ).toLowerCase();


    if (
      !ALLOWED_TYPES.includes(
        mimeType
      )
    ) {

      Alert.alert(
        "Invalid File",
        "Only JPG, JPEG, PNG and WEBP files are allowed."
      );

      return false;
    }


    return true;
  };


  // =====================================================
  // CREATE UPLOAD FORM DATA
  // =====================================================

  const createUploadFormData = (
    file
  ) => {

    const formData =
      new FormData();


    formData.append(
      "file",
      {
        uri:
          file?.uri,

        name:
          file?.fileName ||
          file?.name ||
          `witness_${Date.now()}.jpg`,

        type:
          file?.type ||
          "image/jpeg",
      }
    );


    formData.append(
      "folder",
      `visitor-verification/witness`
    );


    return formData;
  };


  // =====================================================
  // UPLOAD FILE TO BACKEND
  // =====================================================

  const uploadFileToServer = async ({
    file,
    type,
  }) => {

    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    if (
      !validateFile(file)
    ) {
      return null;
    }


    // -----------------------------------------------
    // LIMITS
    // -----------------------------------------------

    if (
      type === "photo" &&
      photos.length >= MAX_PHOTOS
    ) {

      Alert.alert(
        "Limit Reached",
        "Maximum 2 witness photos are allowed."
      );

      return null;
    }


    if (
      type === "signature" &&
      signatures.length >= MAX_SIGNATURES
    ) {

      Alert.alert(
        "Limit Reached",
        "Maximum 2 witness signatures are allowed."
      );

      return null;
    }


    if (
      type === "document" &&
      documents.length >= MAX_DOCUMENTS
    ) {

      Alert.alert(
        "Limit Reached",
        "Maximum 10 witness documents are allowed."
      );

      return null;
    }


    try {

      setUploadingType(
        type
      );


      // -----------------------------------------------
      // FORM DATA
      // -----------------------------------------------

      const formData =
        createUploadFormData(
          file
        );


      console.log(
        "================================================="
      );

      console.log(
        "WITNESS FILE UPLOAD"
      );

      console.log(
        "TYPE:",
        type
      );

      console.log(
        "FILE:",
        {
          name:
            file?.fileName ||
            file?.name,

          type:
            file?.type,

          size:
            file?.fileSize ||
            file?.size,

          uri:
            file?.uri,
        }
      );

      console.log(
        "================================================="
      );


      // -----------------------------------------------
      // API
      // -----------------------------------------------

      const response =
        await uploadWitnessDocuments({
          formData,
        }).unwrap();


      console.log(
        "WITNESS UPLOAD RESPONSE:",
        response
      );


      // -----------------------------------------------
      // SERVER DATA
      // -----------------------------------------------

      const serverData =
        response?.data ||
        response ||
        {};


      const serverUrl =
        serverData?.url ||
        serverData?.secure_url ||
        serverData?.imageUrl ||
        serverData?.photoUrl ||
        null;


      const publicId =
        serverData?.publicId ||
        serverData?.public_id ||
        null;


      // -----------------------------------------------
      // URL REQUIRED
      // -----------------------------------------------

      if (!serverUrl) {

        throw new Error(
          "Server did not return uploaded file URL."
        );
      }


      // -----------------------------------------------
      // NORMALIZED FILE
      // -----------------------------------------------

      const uploadedFile = {

        id:
          publicId ||
          `${Date.now()}`,

        name:
          serverData?.name ||
          file?.fileName ||
          file?.name ||
          "Uploaded File",

        fileName:
          file?.fileName ||
          file?.name ||
          "uploaded-file",

        uri:
          serverUrl,

        url:
          serverUrl,

        imageUrl:
          serverUrl,

        publicId:
          publicId,

        type:
          file?.type ||
          "image/jpeg",

        size:
          file?.fileSize ||
          file?.size ||
          0,

        uploaded:
          true,

        uploadedAt:
          serverData?.uploadedAt ||
          new Date().toISOString(),

        fileType:
          type,

      };


      // =================================================
      // SAVE PHOTO
      // =================================================

      if (
        type === "photo"
      ) {

        const updatedPhotos = [

          ...photos,

          uploadedFile,

        ].slice(
          0,
          MAX_PHOTOS
        );


        updateField(
          "photos",
          updatedPhotos
        );


        console.log(
          "UPDATED WITNESS PHOTOS:",
          updatedPhotos
        );
      }


      // =================================================
      // SAVE SIGNATURE
      // =================================================

      if (
        type === "signature"
      ) {

        const updatedSignatures = [

          ...signatures,

          uploadedFile,

        ].slice(
          0,
          MAX_SIGNATURES
        );


        updateField(
          "signatures",
          updatedSignatures
        );


        console.log(
          "UPDATED WITNESS SIGNATURES:",
          updatedSignatures
        );
      }


      // =================================================
      // SAVE DOCUMENT
      // =================================================

      if (
        type === "document"
      ) {

        const documentObject = {

          id:
            publicId ||
            `${Date.now()}`,

          name:
            serverData?.name ||
            file?.fileName ||
            file?.name ||
            "Witness Document",

          fileName:
            file?.fileName ||
            file?.name ||
            "witness-document",

          uri:
            serverUrl,

          url:
            serverUrl,

          imageUrl:
            serverUrl,

          publicId:
            publicId,

          type:
            file?.type ||
            "image/jpeg",

          size:
            file?.fileSize ||
            file?.size ||
            0,

          uploaded:
            true,

          uploadedAt:
            serverData?.uploadedAt ||
            new Date().toISOString(),

          fileType:
            "document",

          docTypeName:
            idType ||
            "Identity Document",

          docTypeId:
            idType ||
            "OTHER",

          docNumber:
            idNumber ||
            "",

          docUrl:
            serverUrl,

        };


        const updatedDocuments = [

          ...documents,

          documentObject,

        ].slice(
          0,
          MAX_DOCUMENTS
        );


        updateField(
          "documents",
          updatedDocuments
        );


        console.log(
          "UPDATED WITNESS DOCUMENTS:",
          updatedDocuments
        );
      }


      // -----------------------------------------------
      // CLOSE SHEET
      // -----------------------------------------------

      setSheetVisible(
        false
      );

      setUploadType(
        ""
      );


      return uploadedFile;

    } catch (error) {

      console.log(
        "WITNESS FILE UPLOAD ERROR:",
        error
      );


      Alert.alert(
        "Upload Failed",
        error?.data?.message ||
        error?.message ||
        "Unable to upload file. Please try again."
      );


      return null;

    } finally {

      setUploadingType(
        null
      );
    }
  };


  // =====================================================
  // CAMERA
  // =====================================================

  const openCamera = async () => {

    try {

      setSheetVisible(
        false
      );


      // -----------------------------------------------
      // LIMIT CHECK
      // -----------------------------------------------

      if (
        uploadType === "photo" &&
        photos.length >= MAX_PHOTOS
      ) {

        Alert.alert(
          "Limit Reached",
          "Maximum 2 witness photos are allowed."
        );

        return;
      }


      if (
        uploadType === "signature" &&
        signatures.length >= MAX_SIGNATURES
      ) {

        Alert.alert(
          "Limit Reached",
          "Maximum 2 witness signatures are allowed."
        );

        return;
      }


      // -----------------------------------------------
      // CAMERA
      // -----------------------------------------------

      const result =
        await launchCamera({

          mediaType:
            "photo",

          cameraType:
            uploadType === "photo"
              ? "front"
              : "back",

          quality:
            0.85,

          saveToPhotos:
            false,

        });


      // -----------------------------------------------
      // CANCEL
      // -----------------------------------------------

      if (
        result?.didCancel
      ) {
        return;
      }


      // -----------------------------------------------
      // ERROR
      // -----------------------------------------------

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


      // -----------------------------------------------
      // FILE
      // -----------------------------------------------

      const asset =
        result?.assets?.[0];


      if (!asset?.uri) {
        return;
      }


      const file = {

        uri:
          asset?.uri,

        name:
          asset?.fileName ||
          `witness_${Date.now()}.jpg`,

        fileName:
          asset?.fileName ||
          `witness_${Date.now()}.jpg`,

        type:
          asset?.type ||
          "image/jpeg",

        fileSize:
          asset?.fileSize ||
          0,

      };


      await uploadFileToServer({

        file,

        type:
          uploadType,

      });

    } catch (error) {

      console.log(
        "Witness Camera Error:",
        error
      );

    }
  };


  // =====================================================
  // GALLERY
  // =====================================================

  const openGallery = async () => {

    try {

      setSheetVisible(
        false
      );


      // -----------------------------------------------
      // LIMIT CHECK
      // -----------------------------------------------

      if (
        uploadType === "photo" &&
        photos.length >= MAX_PHOTOS
      ) {

        Alert.alert(
          "Limit Reached",
          "Maximum 2 witness photos are allowed."
        );

        return;
      }


      if (
        uploadType === "signature" &&
        signatures.length >= MAX_SIGNATURES
      ) {

        Alert.alert(
          "Limit Reached",
          "Maximum 2 witness signatures are allowed."
        );

        return;
      }


      if (
        uploadType === "document" &&
        documents.length >= MAX_DOCUMENTS
      ) {

        Alert.alert(
          "Limit Reached",
          "Maximum 10 witness documents are allowed."
        );

        return;
      }


      // -----------------------------------------------
      // GALLERY
      // -----------------------------------------------

      const result =
        await launchImageLibrary({

          mediaType:
            "photo",

          selectionLimit:
            1,

          quality:
            0.85,

        });


      // -----------------------------------------------
      // CANCEL
      // -----------------------------------------------

      if (
        result?.didCancel
      ) {
        return;
      }


      // -----------------------------------------------
      // ERROR
      // -----------------------------------------------

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


      // -----------------------------------------------
      // FILE
      // -----------------------------------------------

      const asset =
        result?.assets?.[0];


      if (!asset?.uri) {
        return;
      }


      const file = {

        uri:
          asset?.uri,

        name:
          asset?.fileName ||
          `witness_${Date.now()}.jpg`,

        fileName:
          asset?.fileName ||
          `witness_${Date.now()}.jpg`,

        type:
          asset?.type ||
          "image/jpeg",

        fileSize:
          asset?.fileSize ||
          0,

      };


      await uploadFileToServer({

        file,

        type:
          uploadType,

      });

    } catch (error) {

      console.log(
        "Witness Gallery Error:",
        error
      );

    }
  };


  // =====================================================
  // DOCUMENT PICKER
  // =====================================================
  //
  // Backend currently accepts:
  // JPG / JPEG / PNG / WEBP
  //
  // So document upload is handled through
  // image gallery/camera as an identity-document image.
  //
  // =====================================================

  const openDocument = async () => {

    setSheetVisible(
      false
    );


    // -----------------------------------------------
    // DOCUMENT LIMIT
    // -----------------------------------------------

    if (
      documents.length >= MAX_DOCUMENTS
    ) {

      Alert.alert(
        "Limit Reached",
        "Maximum 10 witness documents are allowed."
      );

      return;
    }


    // -----------------------------------------------
    // USE GALLERY
    // -----------------------------------------------

    const result =
      await launchImageLibrary({

        mediaType:
          "photo",

        selectionLimit:
          1,

        quality:
          0.85,

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
        "Document Error",
        result?.errorMessage ||
        "Unable to select document."
      );

      return;
    }


    const asset =
      result?.assets?.[0];


    if (!asset?.uri) {
      return;
    }


    const file = {

      uri:
        asset?.uri,

      name:
        asset?.fileName ||
        `witness-document-${Date.now()}.jpg`,

      fileName:
        asset?.fileName ||
        `witness-document-${Date.now()}.jpg`,

      type:
        asset?.type ||
        "image/jpeg",

      fileSize:
        asset?.fileSize ||
        0,

    };


    await uploadFileToServer({

      file,

      type:
        "document",

    });
  };


  // =====================================================
  // REMOVE PHOTO
  // =====================================================

  const removePhoto = (
    index
  ) => {

    const updatedPhotos =
      photos.filter(
        (_, itemIndex) =>
          itemIndex !== index
      );


    updateField(
      "photos",
      updatedPhotos
    );
  };


  // =====================================================
  // REMOVE SIGNATURE
  // =====================================================

  const removeSignature = (
    index
  ) => {

    const updatedSignatures =
      signatures.filter(
        (_, itemIndex) =>
          itemIndex !== index
      );


    updateField(
      "signatures",
      updatedSignatures
    );
  };


  // =====================================================
  // REMOVE DOCUMENT
  // =====================================================

  const removeDocument = (
    index
  ) => {

    const updatedDocuments =
      documents.filter(
        (_, itemIndex) =>
          itemIndex !== index
      );


    updateField(
      "documents",
      updatedDocuments
    );
  };


  // =====================================================
  // PREVIEW ITEM
  // =====================================================

  const renderPreviewItem = ({
    item,
    index,
    onRemove,
    label,
  }) => {

    const imageUri =
      item?.url ||
      item?.imageUrl ||
      item?.uri;


    return (

      <View
        key={
          item?.publicId ||
          item?.id ||
          `${label}-${index}`
        }
        style={{
          width: 82,
          marginRight: 10,
          marginBottom: 10,
        }}
      >

        {/* ==========================================
            IMAGE
        ========================================== */}

        <View
          style={{
            width: 82,
            height: 82,
            borderRadius: 14,
            overflow: "hidden",
            backgroundColor:
              "#F7F3EF",
            borderWidth: 1,
            borderColor:
              "#E9DDD5",
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

            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >

              <FileText
                size={25}
                color={
                  theme.colors.primary500
                }
              />

            </View>

          )}


          {/* ========================================
              REMOVE
          ======================================== */}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              onRemove(index)
            }
            style={{
              position: "absolute",
              top: 5,
              right: 5,
              width: 24,
              height: 24,
              borderRadius: 12,
              backgroundColor:
                "rgba(0,0,0,0.65)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >

            <X
              size={14}
              color="#FFFFFF"
              strokeWidth={2.5}
            />

          </TouchableOpacity>

        </View>


        {/* ==========================================
            NAME
        ========================================== */}

        <Text
          numberOfLines={1}
          style={{
            marginTop: 5,
            fontSize: 10.5,
            color:
              theme.colors.gray700,
            fontFamily:
              theme.fonts.regular,
          }}
        >
          {item?.name ||
            item?.fileName ||
            `${label} ${index + 1}`}
        </Text>

      </View>
    );
  };


  // =====================================================
  // PREVIEW LIST
  // =====================================================

  const renderPreviewList = ({
    items,
    onRemove,
    label,
  }) => {

    if (
      !items?.length
    ) {
      return null;
    }


    return (

      <View
        style={{
          flexDirection:
            "row",
          flexWrap:
            "wrap",
          marginBottom:
            theme.spacing.sm,
        }}
      >

        {items.map(
          (
            item,
            index
          ) =>
            renderPreviewItem({

              item,

              index,

              onRemove,

              label,

            })
        )}

      </View>
    );
  };


  // =====================================================
  // UPLOAD CARD
  // =====================================================

  const renderUploadCard = ({
    title,
    subtitle,
    icon,
    files = [],
    type,
    required = true,
    onPress,
  }) => {

    const hasFiles =
      files?.length > 0;

    const isCurrentUploading =
      uploadingType === type;


    return (

      <View
        style={{
          marginBottom:
            theme.spacing.md,
        }}
      >

        {/* ==========================================
            CARD
        ========================================== */}

        <TouchableOpacity
          activeOpacity={0.86}

          onPress={
            onPress ||
            (() =>
              openUploadSheet(
                type
              ))
          }

          disabled={
            uploading ||
            isUploadingFile
          }

          style={{
            minHeight: 88,

            borderRadius: 16,

            borderWidth: 1,

            borderColor:
              hasFiles
                ? "#CBE7D2"
                : "#E9DDD5",

            backgroundColor:
              hasFiles
                ? "#F8FCF9"
                : "#FFFCFA",

            padding:
              theme.spacing.md,

            flexDirection:
              "row",

            alignItems:
              "center",

            opacity:
              uploading ||
              isUploadingFile
                ? 0.65
                : 1,
          }}
        >

          {/* ========================================
              ICON
          ======================================== */}

          <View
            style={{
              width: 46,

              height: 46,

              borderRadius: 14,

              backgroundColor:
                hasFiles
                  ? "#E8F7EC"
                  : "#FFF3E8",

              alignItems:
                "center",

              justifyContent:
                "center",

              overflow:
                "hidden",
            }}
          >

            {hasFiles &&
            files?.[0]?.url ? (

              <Image
                source={{
                  uri:
                    files[0].url,
                }}
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                }}
                resizeMode="cover"
              />

            ) : hasFiles ? (

              <ShieldCheck
                size={21}
                color="#2E8B57"
                strokeWidth={2.1}
              />

            ) : (

              icon

            )}

          </View>


          {/* ========================================
              CONTENT
          ======================================== */}

          <View
            style={{
              flex: 1,

              marginLeft:
                theme.spacing.md,
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

              <Text
                style={{
                  color:
                    theme.colors.black,

                  fontSize:
                    theme.typography.b2,

                  fontFamily:
                    theme.fonts.semiBold,
                }}
              >
                {title}
              </Text>


              {required && (

                <Text
                  style={{
                    color:
                      theme.colors.primary500,

                    fontSize: 14,

                    marginLeft: 3,
                  }}
                >
                  *
                </Text>

              )}

            </View>


            <Text
              numberOfLines={1}
              style={{
                marginTop: 4,

                color:
                  hasFiles
                    ? "#2E8B57"
                    : theme.colors.gray500,

                fontSize: 11.5,

                fontFamily:
                  theme.fonts.regular,
              }}
            >

              {hasFiles

                ? `${files.length} file${
                    files.length > 1
                      ? "s"
                      : ""
                  } uploaded`

                : subtitle}

            </Text>

          </View>


          {/* ========================================
              ACTION
          ======================================== */}

          {isCurrentUploading ? (

            <ActivityIndicator
              size="small"
              color={
                theme.colors.primary500
              }
            />

          ) : (

            <Upload
              size={18}
              color={
                hasFiles
                  ? "#2E8B57"
                  : theme.colors.primary500
              }
              strokeWidth={2.2}
            />

          )}

        </TouchableOpacity>

      </View>
    );
  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <View>

      {/* =================================================
          WITNESS DETAILS
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.white,

          borderRadius: 20,

          padding:
            theme.spacing.lg,

          marginBottom:
            theme.spacing.lg,

          borderWidth: 1,

          borderColor:
            "#F0E5DD",

          ...theme.shadows.card,
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

            marginBottom:
              theme.spacing.lg,
          }}
        >
          Witness Details
        </Text>


        {/* =================================================
            FULL NAME
        ================================================= */}

        <CommonInput

          label="Full Name"

          required

          placeholder="Enter witness full name"

          value={
            witnessName
          }

          onChangeText={
            value =>
              updateField(
                "witnessName",
                value
              )
          }

          editable={
            !uploading &&
            !isUploadingFile
          }

          containerStyle={{
            marginBottom:
              theme.spacing.md,
          }}

          inputContainerStyle={{
            ...theme.input.inputBorder
          }}

        />


        {/* =================================================
            MOBILE
        ================================================= */}

        <CommonInput

          label="Mobile Number"

          required

          placeholder="Enter 10-digit mobile number"

          value={
            mobileNumber
          }

          onChangeText={
            value =>
              updateField(
                "mobileNumber",
                value.replace(
                  /\D/g,
                  ""
                )
              )
          }

          keyboardType="phone-pad"

          maxLength={10}

          editable={
            !uploading &&
            !isUploadingFile
          }

          containerStyle={{
            marginBottom:
              theme.spacing.md,
          }}

          inputContainerStyle={{
            ...theme.input.inputBorder
          }}

        />


        {/* =================================================
            RELATION
        ================================================= */}

        <CommonInput

          label="Relation to Applicant"

          required

          placeholder="Enter relation"

          value={
            relation
          }

          onChangeText={
            value =>
              updateField(
                "relation",
                value
              )
          }

          editable={
            !uploading &&
            !isUploadingFile
          }

          containerStyle={{
            marginBottom:
              theme.spacing.lg,
          }}

          inputContainerStyle={{
            ...theme.input.inputBorder
          }}

        />

      </View>


      {/* =================================================
          VERIFICATION DOCUMENTS
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.white,

          borderRadius: 20,

          padding:
            theme.spacing.lg,

          marginBottom:
            theme.spacing.lg,

          borderWidth: 1,

          borderColor:
            "#F0E5DD",

          ...theme.shadows.card,
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

            marginBottom: 4,
          }}
        >
          Witness Verification
        </Text>


        <Text
          style={{
            color:
              theme.colors.gray500,

            fontSize: 12,

            fontFamily:
              theme.fonts.regular,

            lineHeight: 18,

            marginBottom:
              theme.spacing.lg,
          }}
        >
          Upload witness selfie, signatures and identity documents.
        </Text>


        {/* =================================================
            WITNESS PHOTOS
        ================================================= */}

        {renderUploadCard({

          title:
            "Witness Selfie",

          subtitle:
            `${photos.length}/${MAX_PHOTOS} photos uploaded`,

          icon: (
            <Camera
              size={21}
              color={
                theme.colors.primary500
              }
              strokeWidth={2}
            />
          ),

          files:
            photos,

          type:
            "photo",

          required:
            true,

        })}


        {/* =================================================
            PHOTO PREVIEW
        ================================================= */}

        {renderPreviewList({

          items:
            photos,

          onRemove:
            removePhoto,

          label:
            "Witness Photo",

        })}


        {/* =================================================
            ADD PHOTO
        ================================================= */}

        {photos.length <
          MAX_PHOTOS && (

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              openUploadSheet(
                "photo"
              )
            }
            disabled={
              uploading ||
              isUploadingFile
            }
            style={{
              flexDirection:
                "row",

              alignItems:
                "center",

              alignSelf:
                "flex-start",

              marginBottom:
                theme.spacing.md,
            }}
          >

            <Plus
              size={17}
              color={
                theme.colors.primary500
              }
            />

            <Text
              style={{
                marginLeft: 5,

                color:
                  theme.colors.primary500,

                fontSize: 12,

                fontFamily:
                  theme.fonts.semiBold,
              }}
            >
              Add Witness Photo
            </Text>

          </TouchableOpacity>

        )}


        {/* =================================================
            SIGNATURE
        ================================================= */}

        {renderUploadCard({

          title:
            "Witness Signature",

          subtitle:
            `${signatures.length}/${MAX_SIGNATURES} signatures uploaded`,

          icon: (
            <PenLine
              size={21}
              color={
                theme.colors.primary500
              }
              strokeWidth={2}
            />
          ),

          files:
            signatures,

          type:
            "signature",

          required:
            true,

        })}


        {/* =================================================
            SIGNATURE PREVIEW
        ================================================= */}

        {renderPreviewList({

          items:
            signatures,

          onRemove:
            removeSignature,

          label:
            "Signature",

        })}


        {/* =================================================
            ADD SIGNATURE
        ================================================= */}

        {signatures.length <
          MAX_SIGNATURES && (

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              openUploadSheet(
                "signature"
              )
            }
            disabled={
              uploading ||
              isUploadingFile
            }
            style={{
              flexDirection:
                "row",

              alignItems:
                "center",

              alignSelf:
                "flex-start",

              marginBottom:
                theme.spacing.md,
            }}
          >

            <Plus
              size={17}
              color={
                theme.colors.primary500
              }
            />

            <Text
              style={{
                marginLeft: 5,

                color:
                  theme.colors.primary500,

                fontSize: 12,

                fontFamily:
                  theme.fonts.semiBold,
              }}
            >
              Add Signature
            </Text>

          </TouchableOpacity>

        )}


        {/* =================================================
            ID DOCUMENT
        ================================================= */}

        {renderUploadCard({

          title:
            "Identity Document",

          subtitle:
            idType
              ? `${documents.length}/${MAX_DOCUMENTS} uploaded`
              : "Select ID type and upload document",

          icon: (
            <FileText
              size={21}
              color={
                theme.colors.primary500
              }
              strokeWidth={2}
            />
          ),

          // files:
          //   documents,

          type:
            "document",

          required:
            true,

          onPress:
            handleOpenIDDocument,

        })}


        {/* =================================================
            DOCUMENT PREVIEW
        ================================================= */}

        {renderPreviewList({

          items:
            documents,

          onRemove:
            removeDocument,

          label:
            "Document",

        })}


        {/* =================================================
            ADD DOCUMENT
        ================================================= */}

        {documents.length <
          MAX_DOCUMENTS && (

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={
              handleOpenIDDocument
            }
            disabled={
              uploading ||
              isUploadingFile
            }
            style={{
              flexDirection:
                "row",

              alignItems:
                "center",

              alignSelf:
                "flex-start",

              marginTop: 2,
            }}
          >

            <Plus
              size={17}
              color={
                theme.colors.primary500
              }
            />

            <Text
              style={{
                marginLeft: 5,

                color:
                  theme.colors.primary500,

                fontSize: 12,

                fontFamily:
                  theme.fonts.semiBold,
              }}
            >
              Add Identity Document
            </Text>

          </TouchableOpacity>

        )}

      </View>


      {/* =================================================
          CONFIRMATION
      ================================================= */}

      <TouchableOpacity
        activeOpacity={0.85}

        onPress={() =>
          updateField(
            "witnessConfirmed",
            !witnessConfirmed
          )
        }

        disabled={
          uploading ||
          isUploadingFile
        }

        style={{
          flexDirection:
            "row",

          alignItems:
            "flex-start",

          marginBottom:
            theme.spacing.lg,
        }}
      >

        <View
          style={{
            width: 22,

            height: 22,

            borderRadius: 6,

            borderWidth: 1.5,

            borderColor:
              witnessConfirmed
                ? theme.colors.primary500
                : theme.colors.gray300,

            backgroundColor:
              witnessConfirmed
                ? theme.colors.primary500
                : theme.colors.white,

            alignItems:
              "center",

            justifyContent:
              "center",

            marginRight:
              theme.spacing.sm,
          }}
        >

          {witnessConfirmed && (

            <Text
              style={{
                color:
                  theme.colors.white,

                fontSize: 14,

                fontFamily:
                  theme.fonts.semiBold,
              }}
            >
              ✓
            </Text>

          )}

        </View>


        <Text
          style={{
            flex: 1,

            color:
              theme.colors.gray700,

            fontSize: 12,

            lineHeight: 18,

            fontFamily:
              theme.fonts.regular,
          }}
        >
          I confirm that the witness details and
          documents provided above are correct.
        </Text>

      </TouchableOpacity>


      {/* =================================================
          ID DETAILS MODAL
      ================================================= */}

      <IDDetailsModal

        visible={
          idModalVisible
        }

        initialValues={{

          idType:"",

          idNumber:"",

        }}

        onClose={() =>
          setIdModalVisible(
            false
          )
        }

        onContinue={
          handleIDDetailsContinue
        }

      />


      {/* =================================================
          UPLOAD BOTTOM SHEET
      ================================================= */}

      <UploadBottomSheet

        sheetVisible={
          sheetVisible
        }

        setSheetVisible={
          setSheetVisible
        }

        openCamera={
          openCamera
        }

        openGallery={
          openGallery
        }

        openDocument={
          openDocument
        }

        type={
          uploadType === "document"
            ? "document"
            : "photo"
        }

      />

    </View>
  );
};


// =====================================================
// EXPORT
// =====================================================

export default memo(
  WitnessDetails
);