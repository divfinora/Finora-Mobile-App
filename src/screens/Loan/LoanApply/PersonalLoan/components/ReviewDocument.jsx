// components/ReviewDocument.jsx

import React, {
  useMemo,
  useState,
} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  Check,
  FileText,
  AlertCircle,
} from 'lucide-react-native';

import {
  theme,
} from '../../../../../theme';

// =====================================================
// COMMON PREVIEW MODAL
// =====================================================

import CommonPreviewModal
  from '../../../../../components/common/Modal/CommonPreviewModal.jsx';


// =====================================================
// COMPONENT
// =====================================================

const ReviewDocument = ({
  formData = {},
}) => {

  // ===================================================
  // PREVIEW STATE
  // ===================================================

  const [
    previewVisible,
    setPreviewVisible,
  ] = useState(false);


  const [
    selectedFile,
    setSelectedFile,
  ] = useState(null);


  const [
    selectedFileType,
    setSelectedFileType,
  ] = useState('image');


  // ===================================================
  // EMPLOYMENT TYPE
  // ===================================================

  const employmentType =
    formData
      ?.incomeDetails
      ?.employmentType;


  // ===================================================
  // REQUIRED DOCUMENTS
  // ===================================================

  const requiredDocuments =
    Array.isArray(
      formData?.requiredDocs
    )
      ? formData.requiredDocs
      : [];


  // ===================================================
  // INCOME DOCUMENTS
  // ===================================================

  const incomeDocuments =
    Array.isArray(
      formData?.incomeDocs
    )
      ? formData.incomeDocs
      : [];


  // ===================================================
  // GET DOCUMENT
  // ===================================================

  const getDocument = (
    documents,
    type
  ) => {

    return documents.find(
      (document) =>
        document?.type === type
    );

  };


  // ===================================================
  // GET FIRST FILE
  // ===================================================

  const getFirstFile = (
    document
  ) => {

    if (
      !document
    ) {

      return null;

    }


    const files =
      Array.isArray(
        document?.files
      )
        ? document.files
        : [];


    if (
      files.length === 0
    ) {

      return null;

    }


    return files[0];

  };


  // ===================================================
  // GET FILE URL
  // ===================================================

  const getFileUri = (
    file
  ) => {

    if (
      !file
    ) {

      return null;

    }


    return (
      file?.uri ||
      file?.url ||
      file?.file ||
      null
    );

  };


  // ===================================================
  // GET FILE NAME
  // ===================================================

  const getFileName = (
    file
  ) => {

    if (
      !file
    ) {

      return null;

    }


    return (
      file?.name ||
      file?.fileName ||
      file?.originalName ||
      file?.filename ||
      null
    );

  };


  // ===================================================
  // GET FILE TYPE
  // ===================================================

  const getFileType = (
    file
  ) => {

    if (
      !file
    ) {

      return null;

    }


    const mimeType =
      file?.type ||
      file?.mimeType;


    if (
      mimeType
    ) {

      return mimeType;

    }


    const uri =
      getFileUri(
        file
      );


    if (
      uri
        ?.toLowerCase()
        ?.endsWith('.pdf')
    ) {

      return 'application/pdf';

    }


    return 'image';

  };


  // ===================================================
  // DOCUMENT CONFIGURATION
  // ===================================================

  const documents =
    useMemo(
      () => {

        // =============================================
        // BASIC REQUIRED DOCUMENTS
        // =============================================

        const list = [

          {
            id:
              'identityProof',

            title:
              'Identity Proof',

            subtitle:
              'Aadhaar / PAN / Passport / Voter ID',

            source:
              requiredDocuments,

          },

          {
            id:
              'addressProof',

            title:
              'Address Proof',

            subtitle:
              'Aadhaar / Utility Bill / Rental Agreement',

            source:
              requiredDocuments,

          },

          {
            id:
              'panCard',

            title:
              'PAN Card',

            subtitle:
              'Required for Tax Verification',

            source:
              requiredDocuments,

          },

        ];


        // =============================================
        // SALARIED
        // =============================================

        if (
          employmentType ===
          'salaried'
        ) {

          list.push({

            id:
              'salarySlip',

            title:
              'Salary Slip',

            subtitle:
              'Last 3 Months',

            source:
              incomeDocuments,

          });

        }


        // =============================================
        // SELF EMPLOYED
        // =============================================

        if (
          employmentType ===
          'self_employed'
        ) {

          list.push({

            id:
              'form16',

            title:
              'Form 16',

            subtitle:
              'Upload Form 16',

            source:
              incomeDocuments,

          });


          list.push({

            id:
              'companyId',

            title:
              'Company ID',

            subtitle:
              'Upload Company ID',

            source:
              incomeDocuments,

          });


          list.push({

            id:
              'offerLetter',

            title:
              'Offer Letter',

            subtitle:
              'Upload Offer Letter',

            source:
              incomeDocuments,

          });


          list.push({

            id:
              'bankStatement',

            title:
              'Bank Statement',

            subtitle:
              'Last 6 Months',

            source:
              incomeDocuments,

          });

        }


        // =============================================
        // RESOLVE FILES
        // =============================================

        return list.map(
          (document) => {

            const uploadedDocument =
              getDocument(
                document.source,
                document.id
              );


            const file =
              getFirstFile(
                uploadedDocument
              );


            return {

              ...document,

              uploadedDocument,

              file,

              fileName:
                getFileName(
                  file
                ),

              fileUri:
                getFileUri(
                  file
                ),

              fileType:
                getFileType(
                  file
                ),

              isUploaded:
                Boolean(
                  getFileUri(
                    file
                  )
                ),

            };

          }
        );

      },
      [
        employmentType,
        requiredDocuments,
        incomeDocuments,
      ]
    );


  // ===================================================
  // UPLOADED COUNT
  // ===================================================

  const uploadedCount =
    documents.filter(
      (document) =>
        document.isUploaded
    ).length;


  // ===================================================
  // TOTAL DOCUMENT COUNT
  // ===================================================

  const totalDocumentCount =
    documents.length;


  // ===================================================
  // ALL REQUIRED DOCUMENTS READY
  // ===================================================

  const allDocumentsReady =
    totalDocumentCount > 0 &&
    uploadedCount ===
      totalDocumentCount;


  // ===================================================
  // OPEN PREVIEW
  // ===================================================

  const handlePreview = (
    document
  ) => {

    if (
      !document?.fileUri
    ) {

      return;

    }


    const file =
      document.file;


    const fileType =
      getFileType(
        file
      );


    setSelectedFile({

      ...file,

      uri:
        document.fileUri,

      name:
        document.fileName,

      type:
        fileType,

    });


    // ================================================
    // PREVIEW TYPE
    // ================================================

    if (
      fileType
        ?.toLowerCase()
        ?.includes('pdf')
    ) {

      setSelectedFileType(
        'pdf'
      );

    } else {

      setSelectedFileType(
        'image'
      );

    }


    setPreviewVisible(
      true
    );

  };


  // ===================================================
  // CLOSE PREVIEW
  // ===================================================

  const handleClosePreview = () => {

    setPreviewVisible(
      false
    );

    setSelectedFile(
      null
    );

  };


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <View
      style={{
        paddingTop:
          theme.spacing.md,

        paddingBottom:
          theme.spacing.lg,
      }}
    >

      {/* =================================================
          TITLE
      ================================================= */}

      <Text
        style={{
          fontSize:
            theme.typography.h3,

          fontFamily:
            theme.fonts.headingBold ||
            theme.fonts.bold,

          color:
            theme.colors.text,

          marginBottom:
            theme.spacing.lg,
        }}
      >
        Review Documents
      </Text>


      {/* =================================================
          DOCUMENT LIST
      ================================================= */}

      {documents.map(
        (document) => {

          return (

            <TouchableOpacity
              key={
                document.id
              }

              activeOpacity={
                document.isUploaded
                  ? 0.75
                  : 1
              }

              onPress={() =>
                handlePreview(
                  document
                )
              }

              style={{
                flexDirection:
                  'row',

                alignItems:
                  'center',

                backgroundColor:
                  theme.colors.white,

                borderRadius:
                  theme.radius.xl,

                padding:
                  theme.spacing.lg,

                marginBottom:
                  theme.spacing.md,

                borderWidth:
                  1,

                borderColor:
                  document.isUploaded
                    ? '#DCFCE7'
                    : '#F1F5F9',

                ...theme.shadows.card,
              }}
            >

              {/* =======================================
                  STATUS ICON
              ======================================= */}

              <View
                style={{
                  width: 32,

                  height: 32,

                  borderRadius:
                    theme.radius.circle,

                  backgroundColor:
                    document.isUploaded
                      ? '#DCFCE7'
                      : '#F1F5F9',

                  justifyContent:
                    'center',

                  alignItems:
                    'center',

                  marginRight:
                    theme.spacing.md,
                }}
              >

                {document.isUploaded ? (

                  <Check
                    size={18}
                    color="#16A34A"
                    strokeWidth={3}
                  />

                ) : (

                  <AlertCircle
                    size={18}
                    color="#94A3B8"
                  />

                )}

              </View>


              {/* =======================================
                  DOCUMENT INFO
              ======================================= */}

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
                  {document.title}
                </Text>


                <Text
                  numberOfLines={
                    1
                  }

                  style={{
                    fontSize:
                      theme.typography.b2,

                    fontFamily:
                      theme.fonts.regular,

                    color:
                      document.isUploaded
                        ? '#64748B'
                        : '#94A3B8',

                    marginTop:
                      2,
                  }}
                >

                  {document.isUploaded

                    ? (
                        document.fileName ||
                        'Uploaded document'
                      )

                    : 'Not uploaded'}

                </Text>

              </View>


              {/* =======================================
                  RIGHT ICON
              ======================================= */}

              <FileText
                size={20}

                color={
                  document.isUploaded
                    ? '#16A34A'
                    : '#CBD5E1'
                }
              />

            </TouchableOpacity>

          );

        }
      )}


      {/* =================================================
          READY STATUS
      ================================================= */}

      <View
        style={{
          flexDirection:
            'row',

          alignItems:
            'center',

          backgroundColor:
            allDocumentsReady
              ? '#F0FDF4'
              : '#F8FAFC',

          borderWidth:
            1,

          borderColor:
            allDocumentsReady
              ? '#BBF7D0'
              : '#E2E8F0',

          borderRadius:
            theme.radius.xl,

          padding:
            theme.spacing.lg,

          marginTop:
            theme.spacing.sm,

          marginBottom:
            theme.spacing.lg,
        }}
      >

        {/* =============================================
            STATUS CIRCLE
        ============================================= */}

        <View
          style={{
            width: 40,

            height: 40,

            borderRadius:
              theme.radius.circle,

            backgroundColor:
              theme.colors.white,

            justifyContent:
              'center',

            alignItems:
              'center',

            marginRight:
              theme.spacing.md,

            elevation: 1,
          }}
        >

          {allDocumentsReady ? (

            <Check
              size={22}
              color="#16A34A"
              strokeWidth={3}
            />

          ) : (

            <AlertCircle
              size={22}
              color="#94A3B8"
            />

          )}

        </View>


        {/* =============================================
            STATUS TEXT
        ============================================= */}

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
                allDocumentsReady
                  ? '#15803D'
                  : '#475569',
            }}
          >

            {allDocumentsReady

              ? 'All documents ready'

              : 'Documents pending'}

          </Text>


          <Text
            style={{
              fontSize:
                theme.typography.b2,

              fontFamily:
                theme.fonts.regular,

              color:
                allDocumentsReady
                  ? '#16A34A'
                  : '#64748B',

              marginTop:
                2,
            }}
          >

            {uploadedCount}
            {' '}
            of
            {' '}
            {totalDocumentCount}
            {' '}
            documents uploaded

          </Text>

        </View>

      </View>


      {/* =================================================
          FINAL STATUS
      ================================================= */}

      {allDocumentsReady && (

        <View
          style={{
            flexDirection:
              'row',

            alignItems:
              'center',

            justifyContent:
              'center',

            gap:
              6,

            marginTop:
              theme.spacing.xs,
          }}
        >

          <Check
            size={16}
            color="#16A34A"
            strokeWidth={3}
          />

          <Text
            style={{
              fontSize:
                12,

              fontFamily:
                theme.fonts.bold,

              color:
                '#16A34A',

              letterSpacing:
                0.6,
            }}
          >
            ALL REQUIRED DOCUMENTS UPLOADED
          </Text>

        </View>

      )}


      {/* =================================================
          PREVIEW MODAL
      ================================================= */}

      <CommonPreviewModal

        visible={
          previewVisible
        }

        onClose={
          handleClosePreview
        }

        file={
          selectedFile
        }

        type={
          selectedFileType
        }

      />

    </View>

  );

};


export default ReviewDocument;