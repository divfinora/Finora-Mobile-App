import React, { useState } from 'react';

import {
  View,
  Text,
  Alert,
} from 'react-native';

import {
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import {
  pick,
  types,
  isCancel,
} from '@react-native-documents/picker';

import { theme } from '../../../../../theme';

import DocumentUploadCard
  from '../../../../../components/common/Input/DocumentUploadCard';

import UploadBottomSheet
  from '../../../../../components/common/Modal/UploadBottomSheet';

import {
  useUploadLoanDocumentsMutation,
} from '../../../../../redux/features/customer/customerApi';


// ======================================================
// PROPERTY LOAN DOCUMENT CONFIG
// ======================================================

const DOCUMENT_TYPES = [

  // ====================================================
  // IDENTITY
  // ====================================================

  {
    key: 'aadharCard',
    title: 'Aadhar Card',
    subtitle: 'Upload front & back side',
    required: true,
  },

  {
    key: 'panCard',
    title: 'PAN Card',
    subtitle: 'Upload clear front side',
    required: true,
  },


  // ====================================================
  // ADDRESS
  // ====================================================

  {
    key: 'addressProof',
    title: 'Address Proof',
    subtitle: 'Electricity / Water / Gas bill or valid address proof',
    required: true,
  },


  // ====================================================
  // PROPERTY DOCUMENTS
  // ====================================================

  {
    key: 'propertyTaxReceipt',
    title: 'Property Tax Receipt',
    subtitle: 'Latest property tax receipt',
    required: false,
  },

  {
    key: 'saleDeed',
    title: 'Sale Deed',
    subtitle: 'Upload clear copy of sale deed',
    required: false,
  },

  {
    key: 'encumbranceCertificate',
    title: 'Encumbrance Certificate',
    subtitle: 'Latest encumbrance certificate',
    required: false,
  },

  {
    key: 'approvedPropertyPlan',
    title: 'Approved Property Plan',
    subtitle: 'Upload approved building/property plan',
    required: false,
  },


  // ====================================================
  // INCOME DOCUMENTS
  // ====================================================

  {
    key: 'incomeProof',
    title: 'Income Proof',
    subtitle: 'Upload valid income proof',
    required: true,
  },

  {
    key: 'salarySlips',
    title: 'Salary Slips',
    subtitle: 'Salary slips / income proof',
    required: true,
  },

  {
    key: 'itr',
    title: 'ITR / Form 16',
    subtitle: 'Last 2 years ITR / Form 16',
    required: false,
  },

  {
    key: 'bankStatement',
    title: 'Bank Statement',
    subtitle: 'Last 6 months bank statement',
    required: true,
  },


  // ====================================================
  // PROPERTY PHOTOS
  // ====================================================

  {
    key: 'propertyPhotos',
    title: 'Property Photos',
    subtitle: 'Upload clear photos of the property',
    required: false,
  },


  // ====================================================
  // BACKEND PROPERTY PAPER
  // ====================================================

  {
    key: 'propertyPaper',
    title: 'Property Document / Ownership Papers',
    subtitle: 'Upload property ownership document',
    required: true,
  },

];


// ======================================================
// CONSTANTS
// ======================================================

const MAX_FILES_PER_DOCUMENT = 2;

const MAX_FILE_SIZE =
  5 * 1024 * 1024;


// ======================================================
// COMPONENT
// ======================================================

const PropertyDocumentUploadForm = ({
  formData = {},
  setFormData,
  errors = {},
  setErrors,
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
  // UPLOADING STATE
  // ====================================================

  const [
    uploadingDocuments,
    setUploadingDocuments,
  ] = useState({});


  // ====================================================
  // API
  // ====================================================

  const [
    uploadLoanDocuments,
    {
      isLoading: isUploading,
    },
  ] = useUploadLoanDocumentsMutation();


  // ====================================================
  // GET DOCUMENT
  // ====================================================

  const getDocument = (
    documentKey
  ) => {

    const documents =
      formData?.documents || [];

    return documents.find(
      item =>
        item?.type === documentKey
    );
  };


  // ====================================================
  // GET FILES
  // ====================================================

  const getFiles = (
    documentKey
  ) => {

    const document =
      getDocument(documentKey);

    return document?.files || [];
  };


  // ====================================================
  // OPEN UPLOAD SHEET
  // ====================================================

  const handleUpload = (
    documentKey
  ) => {

    const files =
      getFiles(documentKey);


    if (
      files.length >=
      MAX_FILES_PER_DOCUMENT
    ) {

      Alert.alert(
        'Maximum Files',
        'You can upload maximum 2 files for this document.'
      );

      return;
    }


    setSelectedDocument(
      documentKey
    );

    setSheetVisible(true);
  };


  // ====================================================
  // SET UPLOADING
  // ====================================================

  const setDocumentUploading = (
    documentKey,
    value
  ) => {

    setUploadingDocuments(
      prev => ({
        ...prev,
        [documentKey]: value,
      })
    );
  };


  // ====================================================
  // SAVE SERVER FILE
  // ====================================================

  const saveUploadedFile = (
    documentKey,
    serverFile
  ) => {

    setFormData(prev => {

      const documents =
        prev?.documents || [];


      const existingIndex =
        documents.findIndex(
          item =>
            item?.type === documentKey
        );


      // ==============================================
      // FIRST FILE
      // ==============================================

      if (
        existingIndex === -1
      ) {

        return {

          ...prev,

          documents: [

            ...documents,

            {

              type:
                documentKey,

              files: [
                serverFile,
              ],

            },

          ],

        };
      }


      // ==============================================
      // EXISTING DOCUMENT
      // ==============================================

      const updatedDocuments =
        [...documents];


      const existingFiles =
        updatedDocuments[
          existingIndex
        ]?.files || [];


      if (
        existingFiles.length >=
        MAX_FILES_PER_DOCUMENT
      ) {

        return prev;
      }


      updatedDocuments[
        existingIndex
      ] = {

        ...updatedDocuments[
          existingIndex
        ],

        files: [

          ...existingFiles,

          serverFile,

        ],

      };


      return {

        ...prev,

        documents:
          updatedDocuments,

      };

    });


    // ==============================================
    // CLEAR VALIDATION ERROR
    // ==============================================

    if (
      errors?.[documentKey] &&
      setErrors
    ) {

      setErrors(prev => ({
        ...prev,
        [documentKey]: '',
      }));
    }
  };


  // ====================================================
  // DIRECT SERVER UPLOAD
  // ====================================================

  const uploadFileToServer = async (
    documentKey,
    file
  ) => {

    if (!file?.uri) {

      Alert.alert(
        'File Missing',
        'Selected file is not available.'
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
        'File Too Large',
        'Maximum file size is 5 MB.'
      );

      return false;
    }


    try {

      setDocumentUploading(
        documentKey,
        true
      );


      // ==================================================
      // FORMDATA
      // ==================================================

      const body =
        new FormData();


      body.append(
        'files',
        {

          uri:
            file.uri,

          name:
            file.name ||
            `property_${documentKey}_${Date.now()}.jpg`,

          type:
            file.type ||
            'application/octet-stream',

        }
      );


      // ==================================================
      // DEBUG
      // ==================================================

      console.log(
        '================================'
      );

      console.log(
        'PROPERTY DOCUMENT UPLOAD'
      );

      console.log(
        'Document:',
        documentKey
      );

      console.log(
        'File:',
        {
          name: file.name,
          type: file.type,
          size: file.size,
        }
      );


      // ==================================================
      // API
      // ==================================================

      const response =
        await uploadLoanDocuments(
          body
        ).unwrap();


      console.log(
        'PROPERTY DOCUMENT RESPONSE:',
        response
      );


      // ==================================================
      // GET UPLOADED FILE
      // ==================================================

      const uploadedFile =
        response?.data?.[0];


      const cloudinaryUrl =
        uploadedFile?.file;


      if (!cloudinaryUrl) {

        throw new Error(
          'Server did not return uploaded file URL.'
        );
      }


      // ==================================================
      // SERVER FILE OBJECT
      // ==================================================

      const serverFile = {

        name:
          uploadedFile?.name ||
          file.name ||
          'Property Document',

        url:
          cloudinaryUrl,

        publicId:
          uploadedFile?.publicId ||
          null,

        type:
          file.type ||
          'application/octet-stream',

        uploaded:
          true,

      };


      // ==================================================
      // SAVE
      // ==================================================

      saveUploadedFile(
        documentKey,
        serverFile
      );


      console.log(
        'PROPERTY DOCUMENT UPLOADED:',
        serverFile
      );


      return true;

    } catch (error) {

      console.log(
        'PROPERTY DOCUMENT UPLOAD ERROR:',
        error
      );


      Alert.alert(
        'Upload Failed',

        error?.data?.message ||
        error?.message ||
        'Unable to upload document. Please try again.'
      );


      return false;

    } finally {

      setDocumentUploading(
        documentKey,
        false
      );
    }
  };


  // ====================================================
  // CAMERA
  // ====================================================

  const handleCamera = async () => {

    try {

      const result =
        await launchCamera({

          mediaType:
            'photo',

          cameraType:
            'back',

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
          'Camera Error',

          result?.errorMessage ||
          'Unable to open camera.'
        );

        return;
      }


      const asset =
        result?.assets?.[0];


      if (
        !asset?.uri
      ) {

        return;
      }


      const file = {

        uri:
          asset.uri,

        name:
          asset.fileName ||
          `property_${selectedDocument}_${Date.now()}.jpg`,

        type:
          asset.type ||
          'image/jpeg',

        size:
          asset.fileSize ||
          0,

      };


      setSheetVisible(false);


      await uploadFileToServer(
        selectedDocument,
        file
      );

    } catch (error) {

      console.log(
        'PROPERTY CAMERA ERROR:',
        error
      );


      Alert.alert(
        'Error',
        'Unable to capture image.'
      );
    }
  };


  // ====================================================
  // GALLERY
  // ====================================================

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
        remainingSlots <= 0
      ) {

        Alert.alert(
          'Maximum Files',
          'You can upload maximum 2 files.'
        );

        return;
      }


      const result =
        await launchImageLibrary({

          mediaType:
            'photo',

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
          'Gallery Error',

          result?.errorMessage ||
          'Unable to open gallery.'
        );

        return;
      }


      const assets =
        result?.assets || [];


      if (
        assets.length === 0
      ) {

        return;
      }


      setSheetVisible(false);


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
            `property_${selectedDocument}_${Date.now()}.jpg`,

          type:
            asset.type ||
            'image/jpeg',

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
        'PROPERTY GALLERY ERROR:',
        error
      );


      Alert.alert(
        'Error',
        'Unable to select image.'
      );
    }
  };


  // ====================================================
  // PDF / DOCUMENT PICKER
  // ====================================================

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
          'Maximum Files',
          'You can upload maximum 2 files.'
        );

        return;
      }


      const [
        result
      ] = await pick({

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
          `property_${selectedDocument}_${Date.now()}`,

        type:
          result.type ||
          'application/octet-stream',

        size:
          result.size ||
          0,

      };


      // ==================================================
      // SIZE VALIDATION
      // ==================================================

      if (
        file.size >
        MAX_FILE_SIZE
      ) {

        Alert.alert(
          'File Too Large',
          'Maximum file size is 5 MB.'
        );

        return;
      }


      // ==================================================
      // EXTENSION VALIDATION
      // ==================================================

      const extension =
        file.name
          ?.split('.')
          ?.pop()
          ?.toLowerCase();


      const allowedExtensions = [

        'pdf',

        'jpg',

        'jpeg',

        'png',

        'webp',

      ];


      if (
        !allowedExtensions.includes(
          extension
        )
      ) {

        Alert.alert(
          'Invalid File',
          'Only PDF, JPG, JPEG, PNG and WEBP files are allowed.'
        );

        return;
      }


      setSheetVisible(false);


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
        'PROPERTY DOCUMENT PICK ERROR:',
        error
      );


      Alert.alert(
        'Error',
        'Unable to select document.'
      );
    }
  };


  // ====================================================
  // REMOVE FILE
  // ====================================================

  const removeFile = (
    documentKey,
    fileIndex
  ) => {

    setFormData(prev => {

      const documents =
        prev?.documents || [];


      const updatedDocuments =
        documents

          .map(document => {

            if (
              document?.type !==
              documentKey
            ) {

              return document;
            }


            return {

              ...document,

              files:
                document.files.filter(
                  (_, index) =>
                    index !== fileIndex
                ),

            };

          })

          .filter(
            document =>
              document.files?.length > 0
          );


      return {

        ...prev,

        documents:
          updatedDocuments,

      };

    });
  };


  // ====================================================
  // RENDER
  // ====================================================

  return (

    <View
      style={{
        paddingTop:
          theme.spacing?.md ||
          16,
      }}
    >

      {/* =================================================
          DOCUMENT CARDS
      ================================================= */}

      {DOCUMENT_TYPES.map(
        document => {

          const files =
            getFiles(
              document.key
            );


          return (

            <DocumentUploadCard

              key={
                document.key
              }

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
                !!uploadingDocuments[
                  document.key
                ]
              }

              onUpload={() =>
                handleUpload(
                  document.key
                )
              }

              onRemove={(index) =>
                removeFile(
                  document.key,
                  index
                )
              }

              error={
                errors?.[
                  document.key
                ]
              }

              required={
                document.required
              }

            />

          );

        }
      )}


      {/* =================================================
          DOCUMENT GUIDELINES
      ================================================= */}

      <View
        style={{
          backgroundColor:
            '#FFFBEB',

          borderWidth:
            1,

          borderColor:
            '#FCD34D',

          borderRadius:
            16,

          padding:
            theme.spacing?.lg ||
            20,

          marginTop:
            theme.spacing?.xs ||
            4,

          marginBottom:
            theme.spacing?.xl ||
            24,
        }}
      >

        <Text
          style={{
            fontSize:
              theme.typography?.b1 ||
              16,

            fontFamily:
              theme.fonts?.bold ||
              'Manrope-Bold',

            color:
              '#B45309',

            marginBottom:
              theme.spacing?.xs ||
              4,
          }}
        >
          📄 Document Guidelines
        </Text>


        <Text
          style={{
            fontSize:
              13,

            fontFamily:
              theme.fonts?.medium ||
              theme.fonts?.regular ||
              'Manrope-Medium',

            color:
              '#92400E',

            lineHeight:
              20,
          }}
        >
          Ensure all documents are clear and readable
          {'\n'}
          • All documents should be valid and not expired
          {'\n'}
          • Maximum file size: 5 MB per file
          {'\n'}
          • Accepted formats: PDF, JPG, JPEG, PNG, WEBP
          {'\n'}
          • Property documents should be clearly visible
        </Text>

      </View>


      {/* =================================================
          BOTTOM SHEET
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


export default PropertyDocumentUploadForm;