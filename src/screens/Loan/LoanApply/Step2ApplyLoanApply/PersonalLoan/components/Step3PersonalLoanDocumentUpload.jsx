import React, {
    useMemo,
    useState,
} from "react";

import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert,
    ActivityIndicator,
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

import UploadBottomSheet
    from "../../../../../../components/common/Modal/UploadBottomSheet";

import ImagePreviewModal
    from "../../../../../../components/common/Modal/ImagePreviewModal";

import {
    useUploadLoanDocumentsMutation,
} from "../../../../../../redux/features/customer/customerApi";

 
import NewUploadBottomSheet
    from "../../../../../../components/common/Modal/NewUploadBottomSheet";
import { theme } from "../../../../../../theme";

// =====================================================
// DOCUMENT CONFIG
// =====================================================

const DOCUMENT_TYPES = [
    {
        key: "panCard",
        title: "PAN Card",
        subtitle: "Upload Front & Back image",
        maxFiles: 2,
        requiredFiles: 2,
        icon: "badge",
    },
    {
        key: "aadharCard",
        title: "Aadhaar Card",
        subtitle: "Upload Front & Back image",
        maxFiles: 2,
        requiredFiles: 2,
        icon: "fingerprint",
    },
    {
        key: "salarySlips",
        title: "Salary Slips",
        subtitle: "Last 3 months",
        maxFiles: 3,
        requiredFiles: 3,
        icon: "description",
    },
    {
        key: "bankStatement",
        title: "Bank Statement",
        subtitle: "Last 6 months",
        maxFiles: 1,
        requiredFiles: 1,
        icon: "account-balance",
    },
    {
        key: "addressProof",
        title: "Address Proof",
        subtitle: "Utility bill / Rent agreement",
        maxFiles: 1,
        requiredFiles: 1,
        icon: "home",
    },
];

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
                backgroundColor: "#FFFDF9",
                borderWidth: 1,
                borderColor: "#91A8BC",
            }}
        >

            {/* HEADER */}

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
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
                                theme.fonts.semiBold,
                            color: "#172B3A",
                        }}
                    >
                        Upload Documents
                    </Text>

                </View>

                <Text
                    style={{
                        fontSize: 12,
                        fontFamily:
                            theme.fonts.regular,
                        color: "#64748B",
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
                    backgroundColor: "#E8EEF3",
                }}
            >

                <View
                    style={{
                        height: "100%",
                        width: `${progress}%`,
                        backgroundColor: "#06966F",
                        borderRadius: 999,
                    }}
                />

            </View>

        </View>
    );
};


// =====================================================
// IMAGE / FILE THUMBNAIL
// =====================================================

const DocumentFileThumbnail = ({
    file,
    index,
    documentKey,
    isImage,
    onPreview,
    onRemove,
}) => {

    return (
        <View
            style={{
                width: 58,
                height: 58,
                borderRadius: 10,
                overflow: "hidden",
                backgroundColor: "#F3F6F8",
                borderWidth: 1,
                borderColor: "#DDE5EC",
                position: "relative",
            }}
        >

            {/* FILE PREVIEW */}

            {isImage && file?.url ? (

                <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() =>
                        onPreview(file)
                    }
                    style={{
                        width: "100%",
                        height: "100%",
                    }}
                >

                    <Image
                        source={{
                            uri: file.url,
                        }}
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        resizeMode="cover"
                    />

                </TouchableOpacity>

            ) : (

                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >

                    <MaterialIcons
                        name="description"
                        size={24}
                        color="#64748B"
                    />

                </View>

            )}


            {/* NUMBER */}

            <View
                pointerEvents="none"
                style={{
                    position: "absolute",
                    left: 4,
                    bottom: 4,
                    minWidth: 17,
                    height: 17,
                    paddingHorizontal: 4,
                    borderRadius: 10,
                    backgroundColor:
                        "rgba(0,0,0,0.65)",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >

                <Text
                    style={{
                        fontSize: 9,
                        fontFamily:
                            theme.fonts.bold,
                        color: "#FFFFFF",
                    }}
                >
                    {index + 1}
                </Text>

            </View>


            {/* DELETE */}

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                    onRemove(
                        documentKey,
                        index
                    )
                }
                style={{
                    position: "absolute",
                    top: 3,
                    right: 3,
                    width: 18,
                    height: 18,
                    borderRadius: 9,
                    backgroundColor: "#FFF1F2",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >

                <MaterialIcons
                    name="close"
                    size={12}
                    color="#EF4444"
                />

            </TouchableOpacity>

        </View>
    );
};


// =====================================================
// DOCUMENT UPLOAD CARD
// =====================================================

const DocumentUploadCard = ({
    document,
    files,
    uploadedCount,
    completed,
    uploadingDocument,
    error,
    onUpload,
    onPreview,
    onRemove,
    isImage,
}) => {

    return (
        <View
            style={{
                marginHorizontal: 16,
                marginBottom: 10,
                paddingHorizontal: 16,
                paddingVertical: 15,
                borderRadius: 17,
                backgroundColor: "#FFFFFF",
                position: "relative",
                overflow: "hidden",
            }}
        >

            {/* =================================================
                MAIN ROW
            ================================================= */}

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >

                {/* ICON */}

                <View
                    style={{
                        width: 52,
                        height: 52,
                        borderRadius: 13,
                        backgroundColor: "#FFF8F0",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >

                    <MaterialIcons
                        name={document.icon}
                        size={24}
                        color={
                            theme.colors.primary500
                        }
                    />

                </View>


                {/* TEXT */}

                <View
                    style={{
                        flex: 1,
                        marginLeft: 16,
                    }}
                >

                    <Text
                        style={{
                            fontSize: 14,
                            fontFamily:
                                theme.fonts.medium,
                            color: "#111827",
                        }}
                    >
                        {document.title}
                    </Text>

                    <Text
                        style={{
                            marginTop: 5,
                            fontSize: 12,
                            fontFamily:
                                theme.fonts.regular,
                            color: "#94A3B8",
                        }}
                    >
                        {document.subtitle}
                    </Text>

                </View>


                {/* COUNT */}

                {uploadedCount > 0 && (

                    <View
                        style={{
                            marginRight: 8,
                            paddingHorizontal: 8,
                            paddingVertical: 5,
                            borderRadius: 999,
                            backgroundColor:
                                completed
                                    ? "#E7F8EF"
                                    : "#FFF7ED",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >

                        {completed && (

                            <MaterialIcons
                                name="check"
                                size={11}
                                color="#059669"
                            />

                        )}

                        <Text
                            style={{
                                marginLeft:
                                    completed
                                        ? 3
                                        : 0,
                                fontSize: 10,
                                fontFamily:
                                    theme.fonts.semiBold,
                                color:
                                    completed
                                        ? "#059669"
                                        : "#EA580C",
                            }}
                        >
                            {completed
                                ? "Uploaded"
                                : `${uploadedCount} / ${document.maxFiles}`}
                        </Text>

                    </View>

                )}


                {/* UPLOAD BUTTON */}

                {uploadedCount <
                    document.maxFiles && (

                    <TouchableOpacity
                        activeOpacity={0.8}
                        disabled={
                            uploadingDocument ===
                            document.key
                        }
                        onPress={() =>
                            onUpload(
                                document.key,
                                uploadedCount
                            )
                        }
                        style={{
                            height: 38,
                            minWidth: 94,
                            paddingHorizontal: 12,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor:
                                theme.colors.primary500,
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "row",
                            backgroundColor:'#fff7edc2',
                            opacity:
                                uploadingDocument ===
                                    document.key
                                    ? 0.7
                                    : 1,
                        }}
                    >

                        {uploadingDocument ===
                            document.key ? (

                            <>
                                <ActivityIndicator
                                    size="small"
                                    color={
                                        theme.colors
                                            .primary500
                                    }
                                />

                                <Text
                                    style={{
                                        marginLeft: 6,
                                        fontSize: 11,
                                        fontFamily:
                                            theme.fonts
                                                .semiBold,
                                        color:
                                            theme.colors
                                                .primary500,
                                    }}
                                >
                                    Uploading...
                                </Text>
                            </>

                        ) : (

                            <>
                                <MaterialIcons
                                    name="cloud-upload"
                                    size={17}
                                    color={
                                        theme.colors
                                            .primary500
                                    }
                                />

                                <Text
                                    style={{
                                        marginLeft: 6,
                                        fontSize: 11,
                                        fontFamily:
                                            theme.fonts
                                                .semiBold,
                                        color:
                                            theme.colors
                                                .primary500,
                                    }}
                                >
                                    {uploadedCount === 0
                                        ? "Upload"
                                        : "Add"}
                                </Text>
                            </>

                        )}

                    </TouchableOpacity>

                )}

            </View>


            {/* =================================================
                UPLOADED FILES
            ================================================= */}

            {files.length > 0 && (

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={
                        false
                    }
                    contentContainerStyle={{
                        flexDirection: "row",
                        gap: 8,
                        paddingRight: 4,
                    }}
                    style={{
                        marginTop: 12,
                    }}
                >

                    {files.map(
                        (file, index) => (

                            <DocumentFileThumbnail
                                key={`${document.key}-${index}`}
                                file={file}
                                index={index}
                                documentKey={
                                    document.key
                                }
                                isImage={isImage(file)}
                                onPreview={
                                    onPreview
                                }
                                onRemove={
                                    onRemove
                                }
                            />

                        )
                    )}

                </ScrollView>

            )}


            {/* =================================================
                ERROR
            ================================================= */}

            {!!error && (

                <Text
                    style={{
                        marginTop: 7,
                        fontSize: 11,
                        fontFamily:
                            theme.fonts.medium,
                        color:
                            theme.colors.error,
                    }}
                >
                    {error}
                </Text>

            )}


            {/* =================================================
                UPLOADING MESSAGE
            ================================================= */}

            {uploadingDocument ===
                document.key && (

                <View
                    style={{
                        marginTop: 10,
                        flexDirection: "row",
                        alignItems: "center",
                        paddingVertical: 7,
                        paddingHorizontal: 10,
                        borderRadius: 8,
                        backgroundColor: "#FFF7ED",
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
                            marginLeft: 8,
                            fontSize: 11,
                            fontFamily:
                                theme.fonts.medium,
                            color:
                                theme.colors.primary700,
                        }}
                    >
                        Uploading document securely...
                    </Text>

                </View>

            )}

        </View>
    );
};



const DocumentSecurityCard = () => {
    return (
        <View
            style={{
                marginHorizontal: 16,
                marginBottom: 16,
                paddingHorizontal: 16,
                paddingVertical: 14,
                borderRadius: 18,
                backgroundColor: "#EFFBF8",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <View
                style={{
                    width: 44,
                    height: 44,
                    borderRadius: 22,
                    backgroundColor: "#D5F7EC",
                    alignItems: "center",
                    justifyContent: "center",
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
                        fontFamily: theme.fonts.bold,
                        color: "#111827",
                    }}
                >
                    Your documents are safe and encrypted.
                </Text>

                <Text
                    style={{
                    
                        fontSize: 11,
                        fontFamily: theme.fonts.regular,
                        color: "#9AAFC1",
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

const Step3PersonalLoanDocumentUpload = ({
    form,
    setForm,
    errors = {},
    setErrors,
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
    // UPLOAD STATE
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
    ] =
        useUploadLoanDocumentsMutation();


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
    // TOTAL REQUIRED FILES
    // =================================================

    const totalRequiredFiles =
        useMemo(() => {

            return DOCUMENT_TYPES.reduce(
                (
                    total,
                    document
                ) => (
                    total +
                    document.requiredFiles
                ),
                0
            );

        }, []);


    // =================================================
    // TOTAL UPLOADED FILES
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
                    previous?.documents || [];


                const documentIndex =
                    documents.findIndex(
                        item =>
                            item?.type ===
                            documentKey
                    );


                // -----------------------------------------
                // CREATE DOCUMENT
                // -----------------------------------------

                if (
                    documentIndex === -1
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


                // -----------------------------------------
                // UPDATE DOCUMENT
                // -----------------------------------------

                const updatedDocuments = [
                    ...documents,
                ];


                const existingFiles =
                    updatedDocuments[
                        documentIndex
                    ]?.files || [];


                const updatedFiles = [
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


         console.log("documentKey"  ,documentKey)
         console.log(setErrors ,"setErrors")
         console.log(errors ,"errors")
        if (
            !setErrors ||
            !errors?.[documentKey]
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
  clearDocumentError(documentKey);
            if (!file?.uri) {

                Alert.alert(
                    "File Missing",
                    "Selected file is not available."
                );

                return false;
            }


            if (
                file?.size >
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


                // -----------------------------------------
                // SAVE FILE
                // -----------------------------------------

                saveUploadedFile(
                    documentKey,
                    serverFile,
                    slotIndex
                );


                // -----------------------------------------
                // IMPORTANT:
                // REMOVE VALIDATION ERROR
                // AFTER SUCCESSFUL UPLOAD
                // -----------------------------------------

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
    // DOCUMENT / PDF
    // =================================================

    const handleDocument =
        async () => {

            try {

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
        setPreviewImage(null);
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
                    previous?.documents || [];


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
            uploadedCount >=
            document.requiredFiles;


        return (
            <DocumentUploadCard
                key={document.key}
                document={document}
                files={files}
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

            {/* =================================================
                UPLOAD SUMMARY
            ================================================= */}

            <DocumentUploadSummary
                totalUploadedFiles={
                    totalUploadedFiles
                }
                totalRequiredFiles={
                    totalRequiredFiles
                }
            />


            {/* =================================================
                DOCUMENT LIST
            ================================================= */}

            <View
                style={{
                    paddingTop: 14,
                }}
            >

                {DOCUMENT_TYPES.map(
                    renderDocumentCard
                )}
<DocumentSecurityCard />
            </View>


            {/* =================================================
                IMAGE PREVIEW
            ================================================= */}

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


            {/* =================================================
                UPLOAD BOTTOM SHEET
            ================================================= */}

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


export default Step3PersonalLoanDocumentUpload;