import React, {
    useMemo,
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

import MaterialIcons
    from "@react-native-vector-icons/material-icons";

import ImagePreviewModal
    from "../../../../../../components/common/Modal/ImagePreviewModal";

import {
    useUploadLoanDocumentsMutation,
} from "../../../../../../redux/features/customer/customerApi";

import NewUploadBottomSheet
    from "../../../../../../components/common/Modal/NewUploadBottomSheet";

import { theme } from "../../../../../../theme";

import DocumentUploadCard
    from "../../../../../../components/common/Input/NewFlowDocumentUplodCard";


// =====================================================
// DOCUMENT CONFIG
// =====================================================

const DOCUMENT_TYPES = [

    // =================================================
    // REQUIRED DOCUMENTS
    // =================================================

    {
        key: "panCard",

        title: "PAN Card",

        subtitle: "Upload clear image",

        maxFiles: 1,

        requiredFiles: 1,

        required: true,

        icon: "badge",
    },

    {
        key: "aadharCard",

        title: "Aadhaar Card",

        subtitle: "Upload clear image",

        maxFiles: 1,

        requiredFiles: 1,

        required: true,

        icon: "fingerprint",
    },

    {
        key: "salarySlips",

        title: "Salary Slips",

        subtitle: "Last 3 months",

        maxFiles: 1,

        requiredFiles: 1,

        required: true,

        icon: "description",
    },

    {
        key: "bankStatement",

        title: "Bank Statement",

        subtitle: "Last 6 months",

        maxFiles: 1,

        requiredFiles: 1,

        required: true,

        icon: "account-balance",
    },


    // =================================================
    // OPTIONAL DOCUMENTS
    // =================================================

    {
        key: "addressProof",

        title: "Address Proof",

        subtitle: "Utility bill / Rent agreement",

        maxFiles: 1,

        requiredFiles: 0,

        required: false,

        icon: "home",
    },

     

     
];


// =====================================================
// CONSTANTS
// =====================================================

const MAX_FILE_SIZE =
    10 * 1024 * 1024;


// =====================================================
// DOCUMENT UPLOAD SUMMARY
// =====================================================

const DocumentUploadSummary = ({
    totalUploadedFiles,
    totalRequiredFiles,
}) => {

    const progress =
        totalRequiredFiles > 0
            ? Math.min(
                (
                    totalUploadedFiles /
                    totalRequiredFiles
                ) * 100,

                100
            )
            : 0;


    return (

        <View
            style={{
                marginHorizontal: 16,

                paddingHorizontal: 20,

                paddingVertical: 16,

                borderRadius: 16,

                backgroundColor:
                    "#FFFDF9",

                borderWidth: 1,

                borderColor:
                    "#91A8BC",
            }}
        >

            {/* HEADER */}

            <View
                style={{
                    flexDirection:
                        "row",

                    alignItems:
                        "center",

                    justifyContent:
                        "space-between",
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

                    <MaterialIcons
                        name="cloud-upload"

                        size={20}

                        color="#94A3B8"
                    />


                    <Text
                        style={{
                            marginLeft: 8,

                            fontSize: 14,

                            fontFamily:
                                theme.fonts
                                    .semiBold,

                            color:
                                "#172B3A",
                        }}
                    >
                        Upload Documents
                    </Text>

                </View>


                <Text
                    style={{
                        fontSize: 12,

                        fontFamily:
                            theme.fonts
                                .regular,

                        color:
                            "#64748B",
                    }}
                >

                    {totalUploadedFiles}

                    {" / "}

                    {totalRequiredFiles}

                </Text>

            </View>


            {/* PROGRESS */}

            <View
                style={{
                    height: 8,

                    marginTop: 12,

                    borderRadius: 999,

                    overflow: "hidden",

                    backgroundColor:
                        "#E8EEF3",
                }}
            >

                <View
                    style={{
                        height: "100%",

                        width:
                            `${progress}%`,

                        backgroundColor:
                            "#06966F",

                        borderRadius:
                            999,
                    }}
                />

            </View>

        </View>
    );
};


// =====================================================
// SECURITY CARD
// =====================================================

const DocumentSecurityCard = () => {

    return (

        <View
            style={{
                marginHorizontal: 16,

                marginBottom: 16,

                paddingHorizontal: 16,

                paddingVertical: 14,

                borderRadius: 18,

                backgroundColor:
                    "#EFFBF8",

                flexDirection:
                    "row",

                alignItems:
                    "center",
            }}
        >

            <View
                style={{
                    width: 44,

                    height: 44,

                    borderRadius: 22,

                    backgroundColor:
                        "#D5F7EC",

                    alignItems:
                        "center",

                    justifyContent:
                        "center",
                }}
            >

                <MaterialIcons
                    name="verified-user"

                    size={22}

                    color="#0A9F78"
                />

            </View>


            <View
                style={{
                    flex: 1,

                    marginLeft: 14,
                }}
            >

                <Text
                    style={{
                        fontSize: 12,

                        fontFamily:
                            theme.fonts.bold,

                        color:
                            "#111827",
                    }}
                >
                    Your documents are safe and encrypted.
                </Text>


                <Text
                    style={{
                        marginTop: 3,

                        fontSize: 11,

                        fontFamily:
                            theme.fonts.regular,

                        color:
                            "#9AAFC1",
                    }}
                >
                    We use bank-grade security to protect your data.
                </Text>

            </View>

        </View>
    );
};


// =====================================================
// MAIN COMPONENT
// =====================================================

const Step2VechleLoanDocumentUpload = ({
    navigation,

    form,

    setForm,

    errors = {},

    setErrors,

    registerFieldPosition,
}) => {


    // =================================================
    // BOTTOM SHEET
    // =================================================

    const [
        sheetVisible,
        setSheetVisible,
    ] = useState(false);


    const [
        selectedDocument,
        setSelectedDocument,
    ] = useState(null);


    const [
        selectedSlot,
        setSelectedSlot,
    ] = useState(null);


    // =================================================
    // IMAGE PREVIEW
    // =================================================

    const [
        previewImage,
        setPreviewImage,
    ] = useState(null);


    // =================================================
    // UPLOADING
    // =================================================

    const [
        uploadingDocument,
        setUploadingDocument,
    ] = useState(null);


    // =================================================
    // API
    // =================================================

    const [
        uploadLoanDocuments,
    ] = useUploadLoanDocumentsMutation();


    // =================================================
    // GET DOCUMENT
    // =================================================

    const getDocument = (
        documentKey
    ) => {

        return (
            form?.documents?.find(
                item =>
                    item?.type ===
                    documentKey
            ) || null
        );
    };


    // =================================================
    // GET FILES
    // =================================================

    const getFiles = (
        documentKey
    ) => {

        return (
            getDocument(
                documentKey
            )?.files || []
        );
    };


    // =================================================
    // REQUIRED FILES
    // =================================================

    const totalRequiredFiles =
        useMemo(() => {

            return DOCUMENT_TYPES.reduce(
                (
                    total,
                    document
                ) => {

                    return (
                        total +
                        document.requiredFiles
                    );

                },

                0
            );

        }, []);


    // =================================================
    // UPLOADED FILES
    // =================================================

    const totalUploadedFiles =
        useMemo(() => {

            return DOCUMENT_TYPES.reduce(
                (
                    total,
                    document
                ) => {

                    return (
                        total +
                        getFiles(
                            document.key
                        ).length
                    );

                },

                0
            );

        }, [
            form?.documents,
        ]);


    // =================================================
    // OPEN UPLOAD
    // =================================================

    const handleUpload = (
        documentKey,
        slotIndex = null
    ) => {

        const config =
            DOCUMENT_TYPES.find(
                item =>
                    item.key ===
                    documentKey
            );


        if (!config) {
            return;
        }


        const files =
            getFiles(
                documentKey
            );


        if (
            files.length >=
            config.maxFiles
        ) {

            Alert.alert(
                "Maximum Files",

                `Maximum ${config.maxFiles} files allowed.`
            );

            return;
        }


        setSelectedDocument(
            documentKey
        );


        setSelectedSlot(
            slotIndex
        );


        setSheetVisible(
            true
        );
    };


    // =================================================
    // SAVE UPLOADED FILE
    // =================================================

    const saveUploadedFile = (
        documentKey,
        serverFile,
        slotIndex
    ) => {

        setForm(
            previous => {

                const documents =
                    previous?.documents ||
                    [];


                const documentIndex =
                    documents.findIndex(
                        item =>
                            item?.type ===
                            documentKey
                    );


                // =====================================
                // CREATE DOCUMENT
                // =====================================

                if (
                    documentIndex ===
                    -1
                ) {

                    return {

                        ...previous,

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


                // =====================================
                // UPDATE DOCUMENT
                // =====================================

                const updatedDocuments =
                    [
                        ...documents,
                    ];


                const existingFiles =
                    updatedDocuments[
                        documentIndex
                    ]?.files || [];


                const updatedFiles =
                    [
                        ...existingFiles,
                    ];


                if (
                    typeof slotIndex ===
                    "number"
                ) {

                    updatedFiles[
                        slotIndex
                    ] = serverFile;

                } else {

                    updatedFiles.push(
                        serverFile
                    );

                }


                updatedDocuments[
                    documentIndex
                ] = {

                    ...updatedDocuments[
                        documentIndex
                    ],

                    files:
                        updatedFiles,
                };


                return {

                    ...previous,

                    documents:
                        updatedDocuments,
                };

            }
        );
    };


    // =================================================
    // CLEAR DOCUMENT ERROR
    // =================================================

    const clearDocumentError = (
        documentKey
    ) => {

        if (
            !setErrors ||
            !errors?.[
                documentKey
            ]
        ) {
            return;
        }


        setErrors(
            previous => {

                const updated = {
                    ...previous,
                };


                delete updated[
                    documentKey
                ];


                return updated;

            }
        );
    };


    // =================================================
    // UPLOAD FILE TO SERVER
    // =================================================

    const uploadFileToServer =
        async (
            documentKey,
            file,
            slotIndex
        ) => {

            clearDocumentError(
                documentKey
            );


            if (!file?.uri) {

                Alert.alert(
                    "File Missing",

                    "Selected file is not available."
                );

                return false;
            }


            if (
                file?.fileSize >
                MAX_FILE_SIZE
            ) {

                Alert.alert(
                    "File Too Large",

                    "Maximum file size is 10 MB."
                );

                return false;
            }


            try {

                setUploadingDocument(
                    documentKey
                );


                const body =
                    new FormData();


                body.append(
                    "files",

                    {

                        uri:
                            file.uri,

                        name:
                            file.fileName ||
                            file.name ||
                            `document_${Date.now()}.jpg`,

                        type:
                            file.type ||
                            "application/octet-stream",

                    }
                );


                const response =
                    await uploadLoanDocuments(
                        body
                    ).unwrap();


                const uploadedFile =
                    response?.data?.[0];


                const cloudinaryUrl =
                    uploadedFile?.file;


                if (!cloudinaryUrl) {

                    throw new Error(
                        "Cloudinary URL was not returned."
                    );
                }


                const serverFile = {

                    name:
                        uploadedFile?.name ||
                        file.fileName ||
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


                // =====================================
                // SAVE
                // =====================================

                saveUploadedFile(
                    documentKey,

                    serverFile,

                    slotIndex
                );


                // =====================================
                // CLEAR ERROR
                // =====================================

                clearDocumentError(
                    documentKey
                );


                return true;

            } catch (error) {

                console.log(
                    "DOCUMENT UPLOAD ERROR",
                    error
                );


                Alert.alert(
                    "Upload Failed",

                    error?.data?.message ||
                    error?.message ||
                    "Unable to upload document."
                );


                return false;

            } finally {

                setUploadingDocument(
                    null
                );

            }

        };


    // =================================================
    // CAMERA
    // =================================================

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

                    file,

                    selectedSlot
                );

            } catch (error) {

                console.log(
                    "CAMERA ERROR",
                    error
                );

            }

        };


    // =================================================
    // GALLERY
    // =================================================

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

                    file,

                    selectedSlot
                );

            } catch (error) {

                console.log(
                    "GALLERY ERROR",
                    error
                );

            }

        };


    // =================================================
    // DOCUMENT PICKER
    // =================================================

    const handleDocument =
        async () => {

            try {

                const result =
                    await pick({

                        type: [
                            types.images,

                            types.pdf,

                            types.doc,

                            types.docx,
                        ],

                        allowMultiSelection:
                            false,
                    });


                if (
                    !result?.length
                ) {
                    return;
                }


                const selectedFile =
                    result[0];


                const file = {

                    uri:
                        selectedFile.uri,

                    name:
                        selectedFile.name ||
                        `${selectedDocument}_${Date.now()}`,

                    type:
                        selectedFile.type ||
                        "application/octet-stream",

                    size:
                        selectedFile.size ||
                        0,
                };


                setSheetVisible(
                    false
                );


                await uploadFileToServer(
                    selectedDocument,

                    file,

                    selectedSlot
                );

            } catch (error) {

                if (
                    isCancel(error)
                ) {
                    return;
                }


                console.log(
                    "DOCUMENT PICK ERROR",
                    error
                );

            }

        };


    // =================================================
    // IMAGE CHECK
    // =================================================

    const isImage = (
        file
    ) => {

        if (!file) {
            return false;
        }


        const type =
            file?.type
                ?.toLowerCase() ||
            "";


        const name =
            file?.name
                ?.toLowerCase() ||
            "";


        return (

            type.startsWith(
                "image/"
            ) ||

            /\.(jpg|jpeg|png|webp|heic)$/i.test(
                name
            )

        );
    };


    // =================================================
    // IMAGE PREVIEW
    // =================================================

    const handlePreviewImage = (
        file
    ) => {

        if (
            !isImage(file) ||
            !file?.url
        ) {
            return;
        }


        setPreviewImage(
            file.url
        );

    };


    const closePreview = () => {

        setPreviewImage(
            null
        );

    };


    // =================================================
    // REMOVE FILE
    // =================================================

    const removeFile = (
        documentKey,
        fileIndex
    ) => {

        setForm(
            previous => {

                const documents =
                    previous?.documents ||
                    [];


                const updatedDocuments =
                    documents
                        .map(
                            document => {

                                if (
                                    document?.type !==
                                    documentKey
                                ) {

                                    return document;
                                }


                                return {

                                    ...document,

                                    files:
                                        (
                                            document.files ||
                                            []
                                        ).filter(
                                            (
                                                _,
                                                index
                                            ) =>
                                                index !==
                                                fileIndex
                                        ),

                                };

                            }
                        )
                        .filter(
                            document =>
                                document
                                    ?.files
                                    ?.length > 0
                        );


                return {

                    ...previous,

                    documents:
                        updatedDocuments,
                };

            }
        );

    };


    // =================================================
    // RENDER DOCUMENT CARD
    // =================================================

    const renderDocumentCard = (
        document
    ) => {

        const files =
            getFiles(
                document.key
            );


        const uploadedCount =
            files.length;


        const completed =
            document.requiredFiles === 0
                ? uploadedCount > 0
                : uploadedCount >=
                    document.requiredFiles;


        return (

            <View

                key={
                    document.key
                }

                onLayout={
                    event => {

                        registerFieldPosition?.(
                            document.key,

                            event.nativeEvent
                                .layout
                                .y
                        );

                    }
                }
            >

                <DocumentUploadCard

                    document={
                        document
                    }

                    files={
                        files
                    }

                    uploadedCount={
                        uploadedCount
                    }

                    completed={
                        completed
                    }

                    uploadingDocument={
                        uploadingDocument
                    }

                    error={
                        errors?.[
                            document.key
                        ]
                    }

                    onUpload={
                        handleUpload
                    }

                    onPreview={
                        handlePreviewImage
                    }

                    onRemove={
                        removeFile
                    }

                    isImage={
                        isImage
                    }

                />

            </View>
        );

    };


    // =================================================
    // RETURN
    // =================================================

    return (

        <View
            style={{
                paddingTop: 16,

                paddingBottom: 20,
            }}
        >

            {/* =========================================
                UPLOAD SUMMARY
            ========================================= */}

            <DocumentUploadSummary

                totalUploadedFiles={
                    totalUploadedFiles
                }

                totalRequiredFiles={
                    totalRequiredFiles
                }

            />


            {/* =========================================
                DOCUMENT LIST
            ========================================= */}

            <View
                style={{
                    paddingTop: 14,
                }}
            >

                {DOCUMENT_TYPES.map(
                    renderDocumentCard
                )}


                {/* SECURITY */}

                <DocumentSecurityCard />

            </View>


            {/* =========================================
                IMAGE PREVIEW
            ========================================= */}

            <ImagePreviewModal

                visible={
                    Boolean(
                        previewImage
                    )
                }

                imageUri={
                    previewImage
                }

                onClose={
                    closePreview
                }

                title="Document Preview"

            />


            {/* =========================================
                UPLOAD BOTTOM SHEET
            ========================================= */}

            <NewUploadBottomSheet

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


export default Step2VechleLoanDocumentUpload;