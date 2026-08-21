// components/IncomeDocument.jsx

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
// CONSTANTS
// ======================================================

const MAX_FILES_PER_DOCUMENT = 2;

const MAX_FILE_SIZE =
  5 * 1024 * 1024;


// ======================================================
// COMPONENT
// ======================================================

const IncomeDocument = ({
  formData = {},
  setFormData,
  errors = {},
  setErrors,
}) => {

  // ====================================================
  // EMPLOYMENT TYPE
  // ====================================================

  const employmentType =
    formData?.incomeDetails?.employmentType;


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
  // UPLOAD API
  // ====================================================

  const [
    uploadLoanDocuments,
  ] = useUploadLoanDocumentsMutation();


  // ====================================================
  // DOCUMENT CONFIG
  // ====================================================

const SALARIED_DOCUMENTS = [
  {
    id: 'salarySlip',
    title: 'Salary Slip',
    subtitle: 'Upload last 3 months salary slips',
  },
  {
    id: 'bankStatement',
    title: 'Bank Statement',
    subtitle: 'Upload last 6 months bank statement',
  },
];


  const SELF_EMPLOYED_DOCUMENTS = [

    {
      id: 'form16',

      title: 'Form 16',

      subtitle:
        'Upload Form 16',
    },

    {
      id: 'companyId',

      title: 'Company ID',

      subtitle:
        'Upload Company ID',
    },

    {
      id: 'offerLetter',

      title: 'Offer Letter',

      subtitle:
        'Upload Offer Letter',
    },

    {
      id: 'bankStatement',

      title: 'Bank Statement',

      subtitle:
        'Upload last 6 months bank statement',
    },

  ];


  // ====================================================
  // SELECT DOCUMENTS
  // ====================================================

  const incomeDocsList =
    employmentType === 'self_employed'
      ? SELF_EMPLOYED_DOCUMENTS
      : SALARIED_DOCUMENTS;


  // ====================================================
  // GET DOCUMENT
  // ====================================================

  const getDocument = (
    documentKey
  ) => {

    const documents =
      formData?.incomeDocs || [];


    return documents.find(
      (item) =>
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
      getDocument(
        documentKey
      );


    return document?.files || [];

  };


  // ====================================================
  // OPEN UPLOAD SHEET
  // ====================================================

  const handleUpload = (
    documentKey
  ) => {

    const files =
      getFiles(
        documentKey
      );


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
  // UPLOADING STATE
  // ====================================================

  const setDocumentUploading = (
    documentKey,
    value
  ) => {

    setUploadingDocuments(
      (prev) => ({

        ...prev,

        [documentKey]:
          value,

      })
    );

  };


  // ====================================================
  // SAVE UPLOADED FILE
  // ====================================================

  const saveUploadedFile = (
    documentKey,
    serverFile
  ) => {

    setFormData(
      (prev) => {

        const incomeDocs =
          prev?.incomeDocs || [];


        const existingIndex =
          incomeDocs.findIndex(
            (item) =>
              item?.type ===
              documentKey
          );


        // ==========================================
        // DOCUMENT DOES NOT EXIST
        // ==========================================

        if (
          existingIndex === -1
        ) {

          return {

            ...prev,

            incomeDocs: [

              ...incomeDocs,

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


        // ==========================================
        // DOCUMENT EXISTS
        // ==========================================

        const updatedDocuments =
          [
            ...incomeDocs,
          ];


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

          incomeDocs:
            updatedDocuments,

        };

      }
    );


    // ==========================================
    // CLEAR ERROR
    // ==========================================

    if (
      errors?.[documentKey] &&
      setErrors
    ) {

      setErrors(
        (prev) => ({

          ...prev,

          [documentKey]:
            '',

        })
      );

    }

  };


  // ====================================================
  // UPLOAD FILE TO SERVER
  // ====================================================

  const uploadFileToServer = async (
    documentKey,
    file
  ) => {

    if (
      !file?.uri
    ) {

      Alert.alert(
        'File Missing',
        'Selected file is not available.'
      );

      return false;

    }


    // ==========================================
    // FILE SIZE
    // ==========================================

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


      // ==========================================
      // FORMDATA
      // ==========================================

      const body =
        new FormData();


      body.append(
        'files',
        {

          uri:
            file.uri,

          name:
            file.name ||
            `document_${Date.now()}.jpg`,

          type:
            file.type ||
            'application/octet-stream',

        }
      );


      console.log(
        'UPLOADING INCOME DOCUMENT:',
        {

          documentKey,

          name:
            file.name,

          type:
            file.type,

          size:
            file.size,

        }
      );


      // ==========================================
      // API
      // ==========================================

      const response =
        await uploadLoanDocuments(
          body
        ).unwrap();


      console.log(
        'INCOME DOCUMENT RESPONSE:',
        response
      );


      // ==========================================
      // CLOUDINARY FILE
      // ==========================================

      const uploadedFile =
        response?.data?.[0];


      const cloudinaryUrl =
        uploadedFile?.file;


      if (
        !cloudinaryUrl
      ) {

        throw new Error(
          'Cloudinary URL was not returned by server.'
        );

      }


      // ==========================================
      // SERVER FILE
      // ==========================================

      const serverFile = {

        name:
          uploadedFile?.name ||
          file.name ||
          'Document',

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


      // ==========================================
      // SAVE
      // ==========================================

      saveUploadedFile(
        documentKey,
        serverFile
      );


      console.log(
        'INCOME DOCUMENT UPLOADED:',
        serverFile
      );


      return true;

    } catch (error) {

      console.log(
        'INCOME DOCUMENT UPLOAD ERROR:',
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

  const handleCamera =
    async () => {

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
            `${selectedDocument}_${Date.now()}.jpg`,

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
          'INCOME CAMERA ERROR:',
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

  const handleGallery =
    async () => {

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


        // ==========================================
        // UPLOAD ONE BY ONE
        // ==========================================

        for (
          const asset of assets
        ) {

          if (
            !asset?.uri
          ) {

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


          if (
            !success
          ) {

            break;

          }

        }

      } catch (error) {

        console.log(
          'INCOME GALLERY ERROR:',
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

  const handleDocument =
    async () => {

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
          result,
        ] = await pick({

          type: [

            types.pdf,

            types.images,

          ],

          allowMultiSelection:
            false,

        });


        if (
          !result
        ) {

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
            'application/octet-stream',

          size:
            result.size ||
            0,

        };


        // ==========================================
        // SIZE
        // ==========================================

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


        // ==========================================
        // EXTENSION
        // ==========================================

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

        ];


        if (
          !allowedExtensions.includes(
            extension
          )
        ) {

          Alert.alert(
            'Invalid File',
            'Only PDF, JPG and PNG files are allowed.'
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
          'INCOME DOCUMENT PICK ERROR:',
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

    setFormData(
      (prev) => {

        const incomeDocs =
          prev?.incomeDocs || [];


        const updatedDocuments =
          incomeDocs

            .map(
              (document) => {

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
                        index !==
                        fileIndex
                    ),

                };

              }
            )

            .filter(
              (document) =>
                document.files
                  ?.length > 0
            );


        return {

          ...prev,

          incomeDocs:
            updatedDocuments,

        };

      }
    );

  };


  // ====================================================
  // NO EMPLOYMENT TYPE
  // ====================================================

  if (
    !employmentType
  ) {

    return (

      <View
        style={{
          paddingVertical:
            theme.spacing?.sm ||
            8,
        }}
      >

        <Text
          style={{
            fontSize:
              theme.typography?.h3 ||
              18,

            fontFamily:
              theme.fonts?.headingBold ||
              theme.fonts?.bold ||
              'System',

            color:
              theme.colors?.text ||
              '#0F172A',

            marginBottom:
              theme.spacing?.md ||
              12,
          }}
        >
          Upload Income Documents
        </Text>


        <Text
          style={{
            fontSize:
              theme.typography?.b2 ||
              14,

            fontFamily:
              theme.fonts?.regular ||
              'System',

            color:
              theme.colors?.gray500 ||
              '#64748B',

            lineHeight:
              20,
          }}
        >
          Please select your employment type first.
        </Text>

      </View>

    );

  }


  // ====================================================
  // RENDER
  // ====================================================

  return (

    <View
      style={{
        paddingVertical:
          theme.spacing?.sm ||
          8,
      }}
    >

      {/* ================================================
          TITLE
      ================================================= */}

      <Text
        style={{
          fontSize:
            theme.typography?.h3 ||
            18,

          fontFamily:
            theme.fonts?.headingBold ||
            theme.fonts?.bold ||
            'System',

          color:
            theme.colors?.text ||
            '#0F172A',

          marginBottom:
            theme.spacing?.lg ||
            20,
        }}
      >
        Upload Income Documents
      </Text>


      {/* ================================================
          EMPLOYMENT TYPE
      ================================================= */}

      <View
        style={{
          backgroundColor:
            '#F8FAFC',

          borderRadius:
            theme.radius?.lg ||
            14,

          padding:
            theme.spacing?.lg ||
            16,

          marginBottom:
            theme.spacing?.lg ||
            20,

          borderWidth:
            1,

          borderColor:
            '#E2E8F0',
        }}
      >

        <Text
          style={{
            fontSize:
              theme.typography?.b2 ||
              14,

            fontFamily:
              theme.fonts?.medium ||
              'System',

            color:
              theme.colors?.gray700 ||
              '#334155',
          }}
        >
          Employment Type
        </Text>


        <Text
          style={{
            fontSize:
              theme.typography?.b1 ||
              16,

            fontFamily:
              theme.fonts?.bold ||
              'System',

            color:
              theme.colors?.text ||
              '#0F172A',

            marginTop:
              4,
          }}
        >
          {
            employmentType ===
            'salaried'
              ? 'Salaried'
              : 'Self Employed'
          }
        </Text>

      </View>


      {/* ================================================
          DOCUMENT CARDS
      ================================================= */}

      {
        incomeDocsList.map(
          (doc) => {

            const files =
              getFiles(
                doc.id
              );


            return (

              <DocumentUploadCard

                key={
                  doc.id
                }

                title={
                  doc.title
                }

                subtitle={
                  doc.subtitle
                }

                uploadedFile={
                  files
                }

                uploading={
                  !!uploadingDocuments[
                    doc.id
                  ]
                }

                onUpload={() =>
                  handleUpload(
                    doc.id
                  )
                }

                onRemove={(index) =>
                  removeFile(
                    doc.id,
                    index
                  )
                }

                error={
                  errors?.[
                    doc.id
                  ]
                }

              />

            );

          }
        )
      }


      {/* ================================================
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
              'System',

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
              'System',

            color:
              '#92400E',

            lineHeight:
              20,
          }}
        >
          Ensure documents are clear and readable
          {'\n'}
          • All documents should be valid and not expired
          {'\n'}
          • File size should not exceed 5MB per document
          {'\n'}
          • Accepted formats: PDF, JPG, PNG
        </Text>

      </View>


      {/* ================================================
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


export default IncomeDocument;