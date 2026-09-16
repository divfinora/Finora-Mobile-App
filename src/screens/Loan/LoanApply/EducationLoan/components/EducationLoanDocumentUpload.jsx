import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  Alert,
} from "react-native";

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
  theme,
} from "../../../../../theme";

import DocumentUploadCard
  from "../../../../../components/common/Input/DocumentUploadCard";

import UploadBottomSheet
  from "../../../../../components/common/Modal/UploadBottomSheet";

import {
  useUploadLoanDocumentsMutation,
} from "../../../../../redux/features/customer/customerApi";


// ======================================================
// EDUCATION LOAN DOCUMENT CONFIG
// ======================================================

const DOCUMENTS = [
  {
    code:
      "AADHAAR",

    title:
      "Aadhaar Card",

    subtitle:
      "upload both front & back side",

    mandatory:
      true,
  },

  {
    code:
      "PAN",

    title:
      "Pan Card",

    subtitle:
      "Upload PAN card",

    mandatory:
      true,
  },

  {
    code:
      "ADMISSION_LETTER",

    title:
      "Admission letter",

    subtitle:
      "Utility bill, passport, or driving license",

    mandatory:
      true,
  },

  {
    code:
      "FEE_STRUCTURE",

    title:
      "Fee Structure",

    subtitle:
      "Bank statements, salary slip, or ITR",

    mandatory:
      true,
  },

  {
    code:
      "LATEST_MARKSHEET",

    title:
      "Latest Marksheet",

    subtitle:
      "Bank statement\nLast 6 Months",

    mandatory:
      true,
  },
];


// ======================================================
// CONSTANTS
// ======================================================

const MAX_FILES_PER_DOCUMENT =
  2;

const MAX_FILE_SIZE =
  5 * 1024 * 1024;


// ======================================================
// COMPONENT
// ======================================================

const EducationLoanDocumentUpload = ({
  formData = {},
  setFormData,
  errors = {},
  setErrors,
  registerFieldPosition,
  scrollContentRef,
}) => {

  // ====================================================
  // BOTTOM SHEET
  // ====================================================

  const [
    sheetVisible,
    setSheetVisible,
  ] = useState(false);


  const [
    selectedDocument,
    setSelectedDocument,
  ] = useState(null);


  // ====================================================
  // API
  // ====================================================

  const [
    uploadLoanDocuments,
  ] = useUploadLoanDocumentsMutation();


  // ====================================================
  // UPLOADING STATE
  // ====================================================

  const [
    uploadingCode,
    setUploadingCode,
  ] = useState(null);


  // ====================================================
  // DOCUMENT FIELD REFS
  // ====================================================

  const documentRefs =
    useRef({});


  // ====================================================
  // GET DOCUMENT FILES
  // ====================================================

  const getFiles = (
    code
  ) => {

    const files =
      formData?.documents?.[code];

    return Array.isArray(files)
      ? files
      : [];
  };


  // ====================================================
  // UPDATE DOCUMENT
  // ====================================================

  const updateDocument = (
    code,
    files
  ) => {

    setFormData(
      previous => ({
        ...previous,

        documents: {
          ...(previous?.documents || {}),

          [code]:
            files,
        },
      })
    );
  };


  // ====================================================
  // CLEAR DOCUMENT ERROR
  // ====================================================

  const clearDocumentError = (
    code
  ) => {

    if (
      !errors?.[code] ||
      !setErrors
    ) {
      return;
    }


    setErrors(
      previous => {

        const next = {
          ...previous,
        };

        delete next[code];

        return next;
      }
    );
  };


  // ====================================================
  // OPEN UPLOAD SHEET
  // ====================================================

  const handleUpload = (
    code
  ) => {

    const files =
      getFiles(code);


    if (
      files.length >=
      MAX_FILES_PER_DOCUMENT
    ) {

      Alert.alert(
        "Maximum Files",
        "You can upload maximum 2 files for this document."
      );

      return;
    }


    setSelectedDocument(
      code
    );

    setSheetVisible(
      true
    );
  };


  // ====================================================
  // UPLOAD FILE TO SERVER
  // ====================================================

  const uploadFileToServer = async (
    code,
    file
  ) => {

    if (!file?.uri) {

      Alert.alert(
        "File Missing",
        "Selected file is not available."
      );

      return false;
    }


    // ==================================================
    // FILE SIZE
    // ==================================================

    if (
      file?.size >
      MAX_FILE_SIZE
    ) {

      Alert.alert(
        "File Too Large",
        "Maximum file size is 5 MB."
      );

      return false;
    }


    try {

      setUploadingCode(
        code
      );


      // ==================================================
      // CREATE FORMDATA
      // ==================================================

      const body =
        new FormData();


      body.append(
        "files",
        {
          uri:
            file.uri,

          name:
            file.name ||
            `education_${code}_${Date.now()}.jpg`,

          type:
            file.type ||
            "application/octet-stream",
        }
      );


      console.log(
        "UPLOADING EDUCATION DOCUMENT:",
        {
          documentCode:
            code,

          name:
            file.name,

          type:
            file.type,

          size:
            file.size,
        }
      );


      // ==================================================
      // API CALL
      // ==================================================

      const response =
        await uploadLoanDocuments(
          body
        ).unwrap();


      console.log(
        "EDUCATION DOCUMENT UPLOAD RESPONSE:",
        response
      );


      // ==================================================
      // GET CLOUDINARY FILE
      // ==================================================

      const uploadedFile =
        response?.data?.[0];


      const cloudinaryUrl =
        uploadedFile?.file;


      if (!cloudinaryUrl) {

        throw new Error(
          "Cloudinary URL was not returned by server."
        );
      }


      // ==================================================
      // SERVER FILE OBJECT
      // ==================================================

      const serverFile = {

        name:
          uploadedFile?.name ||
          file.name ||
          "Document",

        url:
          cloudinaryUrl,

        publicId:
          uploadedFile?.publicId ||
          null,

        type:
          file.type ||
          "application/octet-stream",

        uploaded:
          true,
      };


      // ==================================================
      // GET CURRENT FILES
      // ==================================================

      const currentFiles =
        getFiles(code);


      if (
        currentFiles.length >=
        MAX_FILES_PER_DOCUMENT
      ) {

        return false;
      }


      // ==================================================
      // SAVE FILE
      // ==================================================

      updateDocument(
        code,
        [
          ...currentFiles,
          serverFile,
        ]
      );


      clearDocumentError(
        code
      );


      console.log(
        "EDUCATION DOCUMENT UPLOADED SUCCESSFULLY:",
        serverFile
      );


      return true;

    } catch (error) {

      console.log(
        "EDUCATION DOCUMENT UPLOAD ERROR:",
        error
      );


      Alert.alert(
        "Upload Failed",

        error?.data?.message ||
          error?.message ||
          "Unable to upload document. Please try again."
      );


      return false;

    } finally {

      setUploadingCode(
        null
      );
    }
  };


  // ======================================================
  // CAMERA
  // ======================================================

  const handleCamera = async () => {

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


      const file = {

        uri:
          asset.uri,

        name:
          asset.fileName ||
          `${selectedDocument}_${Date.now()}.jpg`,

        type:
          asset.type ||
          "image/jpeg",

        size:
          asset.fileSize ||
          0,
      };


      setSheetVisible(
        false
      );


      await uploadFileToServer(
        selectedDocument,
        file
      );

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


  // ======================================================
  // GALLERY
  // ======================================================

  const handleGallery = async () => {

    try {

      const currentFiles =
        getFiles(
          selectedDocument
        );


      const remainingSlots =
        MAX_FILES_PER_DOCUMENT -
        currentFiles.length;


      if (
        remainingSlots <=
        0
      ) {

        Alert.alert(
          "Maximum Files",
          "You can upload maximum 2 files."
        );

        return;
      }


      const result =
        await launchImageLibrary({

          mediaType:
            "photo",

          selectionLimit:
            remainingSlots,

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


      const assets =
        result?.assets || [];


      if (
        assets.length ===
        0
      ) {

        return;
      }


      setSheetVisible(
        false
      );


      // ==================================================
      // UPLOAD ONE BY ONE
      // ==================================================

      for (
        const asset of assets
      ) {

        if (!asset?.uri) {

          continue;
        }


        const file = {

          uri:
            asset.uri,

          name:
            asset.fileName ||
            `${selectedDocument}_${Date.now()}.jpg`,

          type:
            asset.type ||
            "image/jpeg",

          size:
            asset.fileSize ||
            0,
        };


        const success =
          await uploadFileToServer(
            selectedDocument,
            file
          );


        if (!success) {

          break;
        }
      }

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


  // ======================================================
  // DOCUMENT / PDF
  // ======================================================

  const handleDocument = async () => {

    try {

      const currentFiles =
        getFiles(
          selectedDocument
        );


      if (
        currentFiles.length >=
        MAX_FILES_PER_DOCUMENT
      ) {

        Alert.alert(
          "Maximum Files",
          "You can upload maximum 2 files."
        );

        return;
      }


      const [result] =
        await pick({

          type: [
            types.pdf,
            types.images,
          ],

          allowMultiSelection:
            false,
        });


      if (!result) {

        return;
      }


      const file = {

        uri:
          result.uri,

        name:
          result.name ||
          `${selectedDocument}_${Date.now()}`,

        type:
          result.type ||
          "application/octet-stream",

        size:
          result.size ||
          0,
      };


      // ==================================================
      // FILE SIZE
      // ==================================================

      if (
        file.size >
        MAX_FILE_SIZE
      ) {

        Alert.alert(
          "File Too Large",
          "Maximum file size is 5 MB."
        );

        return;
      }


      // ==================================================
      // EXTENSION
      // ==================================================

      const extension =
        file.name
          ?.split(".")
          ?.pop()
          ?.toLowerCase();


      const allowedExtensions = [
        "pdf",
        "jpg",
        "jpeg",
        "png",
      ];


      if (
        !allowedExtensions.includes(
          extension
        )
      ) {

        Alert.alert(
          "Invalid File",
          "Only PDF, JPG and PNG files are allowed."
        );

        return;
      }


      setSheetVisible(
        false
      );


      await uploadFileToServer(
        selectedDocument,
        file
      );

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


  // ======================================================
  // REMOVE FILE
  // ======================================================

  const removeDocument = (
    code,
    index
  ) => {

    const files =
      getFiles(code);


    const nextFiles =
      files.filter(
        (_, fileIndex) =>
          fileIndex !== index
      );


    updateDocument(
      code,
      nextFiles
    );
  };


  // ======================================================
  // REGISTER DOCUMENT FIELD POSITIONS
  // ======================================================

  useEffect(() => {

    requestAnimationFrame(() => {

      DOCUMENTS.forEach(
        document => {

          const fieldRef =
            documentRefs.current[
              document.code
            ];


          if (
            !fieldRef ||
            !scrollContentRef?.current ||
            !registerFieldPosition
          ) {
            return;
          }


          fieldRef.measureLayout(
            scrollContentRef.current,

            (_x, y) => {

              registerFieldPosition(
                document.code,
                y
              );
            },

            () => {}
          );
        }
      );

    });

  }, [
    errors,
    registerFieldPosition,
    scrollContentRef,
  ]);


  // ======================================================
  // RENDER
  // ======================================================

  return (

    <View
      style={{
        paddingTop:
          theme.spacing?.md ||
          16,
      }}
    >

      {/* ================================================
          DOCUMENT CARDS
      ================================================= */}

      {DOCUMENTS.map(
        document => {

          const files =
            getFiles(
              document.code
            );


          return (

            <View
              key={
                document.code
              }

              ref={ref => {
                documentRefs.current[
                  document.code
                ] = ref;
              }}

              collapsable={false}
            >

              <DocumentUploadCard

                title={
                  document.title
                }

                subtitle={
                  document.subtitle
                }

                uploadedFile={
                  files
                }

                uploading={
                  uploadingCode ===
                  document.code
                }

                onUpload={() =>
                  handleUpload(
                    document.code
                  )
                }

                onRemove={(
                  index
                ) =>
                  removeDocument(
                    document.code,
                    index
                  )
                }

                error={
                  errors?.[
                    document.code
                  ]
                }

              />

            </View>

          );
        }
      )}


      {/* ================================================
          DOCUMENT GUIDELINES
      ================================================= */}

      <View
        style={{
          borderWidth:
            .7,

          borderColor:
            '#D27511',

          borderRadius:
            theme.radius.lg,

          backgroundColor:
            "#FFFBEB",

          padding:
            theme.spacing.lg,

          marginBottom:
            theme.spacing.xl,
        }}
      >

        <Text
          style={{
            color:
              "#92400E",

            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.semiBold,

            marginBottom:
              theme.spacing.sm,
          }}
        >
          Document Guidelines
        </Text>


        <Text
          style={{
            color:
              "#92400E",

            fontSize:
              theme.typography.b3,

            lineHeight:
              18,

            fontFamily:
              theme.fonts.regular,
          }}
        >
          • Ensure documents are clear and readable{"\n"}
          • All documents should be valid and not expired{"\n"}
          • File size should not exceed 5MB per document{"\n"}
          • Accepted formats: PDF, JPG, PNG
        </Text>

      </View>


      {/* ================================================
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


export default EducationLoanDocumentUpload;