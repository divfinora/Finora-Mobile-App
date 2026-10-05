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

import NewUploadBottomSheet
    from "../../../../../../components/common/Modal/NewUploadBottomSheet";

import DocumentUploadCard
    from "../../../../../../components/common/Input/NewFlowDocumentUplodCard";

import {
    useUploadLoanDocumentsMutation,
} from "../../../../../../redux/features/customer/customerApi";

import {
    theme,
} from "../../../../../../theme";


// =====================================================
// COMMON DOCUMENTS
// =====================================================

const COMMON_DOCUMENT_TYPES = [

    {
        key:
            "panCard",

        title:
            "PAN Card",

        subtitle:
            "Upload clear image",

        required:
            true,

        requiredFiles:
            1,

        maxFiles:
            1,

        icon:
            "badge",
    },


    {
        key:
            "aadharCard",

        title:
            "Aadhaar Card",

        subtitle:
            "Upload clear image",

        required:
            true,

        requiredFiles:
            1,

        maxFiles:
            1,

        icon:
            "fingerprint",
    },


    {
        key:
            "admissionLetter",

        title:
            "Admission Letter",

        subtitle:
            "Upload your admission letter",

        required:
            true,

        requiredFiles:
            1,

        maxFiles:
            1,

        icon:
            "description",
    },


    {
        key:
            "feeStructure",

        title:
            "Fee Structure",

        subtitle:
            "Upload your official fee details",

        required:
            true,

        requiredFiles:
            1,

        maxFiles:
            1,

        icon:
            "confirmation-number",
    },

];


// =====================================================
// UNDERGRADUATE DOCUMENTS
// =====================================================

const UNDERGRADUATE_DOCUMENT_TYPES = [

    {
        key:
            "tenthMarksheet",

        title:
            "10th Marksheet",

        subtitle:
            "Upload your Class 10 documents",

        required:
            true,

        requiredFiles:
            1,

        maxFiles:
            1,

        icon:
            "description",
    },


    {
        key:
            "twelfthMarksheet",

        title:
            "12th Marksheet",

        subtitle:
            "Upload your Class 12 documents",

        required:
            true,

        requiredFiles:
            1,

        maxFiles:
            1,

        icon:
            "description",
    },


    {
        key:
            "previousDegree",

        title:
            "Previous Passout Document",

        subtitle:
            "Upload your previous passout document",

        required:
            false,

        requiredFiles:
            0,

        maxFiles:
            1,

        icon:
            "workspace-premium",
    },

];


// =====================================================
// POSTGRADUATE DOCUMENTS
// =====================================================

const POSTGRADUATE_DOCUMENT_TYPES = [

    {
        key:
            "tenthMarksheet",

        title:
            "10th Marksheet",

        subtitle:
            "Upload your Class 10 documents",

        required:
            true,

        requiredFiles:
            1,

        maxFiles:
            1,

        icon:
            "description",
    },


    {
        key:
            "twelfthMarksheet",

        title:
            "12th Marksheet",

        subtitle:
            "Upload your Class 12 documents",

        required:
            true,

        requiredFiles:
            1,

        maxFiles:
            1,

        icon:
            "description",
    },


    {
        key:
            "previousDegree",

        title:
            "Previous Passout Document",

        subtitle:
            "Upload your previous passout document",

        required:
            true,

        requiredFiles:
            1,

        maxFiles:
            1,

        icon:
            "workspace-premium",
    },

];


// =====================================================
// OTHER DOCUMENTS
// =====================================================

const OTHER_DOCUMENT_TYPES = [
    {
        key: "tenthMarksheet",
        title: "10th Marksheet",
        subtitle: "Upload your Class 10 documents",
        required: true,
        requiredFiles: 1,
        maxFiles: 1,
        icon: "description",
    },
    {
        key: "twelfthMarksheet",
        title: "12th Marksheet",
        subtitle: "Upload your Class 12 documents",
        required: false,
        requiredFiles: 0,
        maxFiles: 1,
        icon: "description",
    },
    {
        key: "previousDegree",
        title: "Previous Education Certificate",
        subtitle:
            "Upload any certificate related to your previous education",
        required: false,
        requiredFiles: 0,
        maxFiles: 1,
        icon: "workspace-premium",
    },
];


// =====================================================
// GET DOCUMENT TYPES
// =====================================================

const getDocumentTypes = (
    courseCategory
) => {

    if (
        courseCategory ===
        "UNDERGRADUATE"
    ) {

        return [
            ...COMMON_DOCUMENT_TYPES,
            ...UNDERGRADUATE_DOCUMENT_TYPES,
        ];

    }


    if (
        courseCategory ===
        "POSTGRADUATE"
    ) {

        return [
            ...COMMON_DOCUMENT_TYPES,
            ...POSTGRADUATE_DOCUMENT_TYPES,
        ];

    }


    if (
        courseCategory ===
        "OTHER"
    ) {

        return [
            ...COMMON_DOCUMENT_TYPES,
            ...OTHER_DOCUMENT_TYPES,
        ];

    }


    return [
        ...COMMON_DOCUMENT_TYPES,
    ];

};


// =====================================================
// MAX FILE SIZE
// =====================================================

const MAX_FILE_SIZE =
    5 * 1024 * 1024;


// =====================================================
// COMPONENT
// =====================================================

const Step2EducationLoanDocumentUpload = ({
    navigation,

    form = {},

    setForm,

    errors = {},

    setErrors,

    registerFieldPosition,
}) => {


    // =====================================================
    // DYNAMIC DOCUMENT TYPES
    // =====================================================

    const DOCUMENT_TYPES =
        useMemo(
            () =>
                getDocumentTypes(
                    form?.courseCategory
                ),

            [
                form?.courseCategory,
            ]
        );


    // =====================================================
    // BOTTOM SHEET
    // =====================================================

    const [
        sheetVisible,
        setSheetVisible,
    ] = useState(false);


    const [
        selectedDocument,
        setSelectedDocument,
    ] = useState(null);


    // =====================================================
    // PREVIEW
    // =====================================================

    const [
        previewImage,
        setPreviewImage,
    ] = useState(null);


    // =====================================================
    // UPLOADING
    // =====================================================

    const [
        uploadingDocument,
        setUploadingDocument,
    ] = useState(null);


    // =====================================================
    // API
    // =====================================================

    const [
        uploadLoanDocuments,
    ] =
        useUploadLoanDocumentsMutation();


    // =====================================================
    // GET DOCUMENT
    // =====================================================

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


    // =====================================================
    // GET FILES
    // =====================================================

    const getFiles = (
        documentKey
    ) => {

        return (
            getDocument(
                documentKey
            )?.files || []
        );

    };


    // =====================================================
    // OPEN UPLOAD
    // =====================================================

    const handleUpload = (
        documentKey
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

                "Maximum files already uploaded."
            );

            return;
        }


        setSelectedDocument(
            documentKey
        );


        setSheetVisible(
            true
        );

    };


    // =====================================================
    // SAVE UPLOADED FILE
    // =====================================================

    const saveUploadedFile = (
        documentKey,
        file
    ) => {

        setForm(
            previous => {

                const documents =
                    previous?.documents ||
                    [];


                const index =
                    documents.findIndex(
                        item =>
                            item?.type ===
                            documentKey
                    );


                // =============================================
                // DOCUMENT NOT FOUND
                // =============================================

                if (
                    index === -1
                ) {

                    return {

                        ...previous,

                        documents: [

                            ...documents,

                            {

                                type:
                                    documentKey,

                                files: [
                                    file,
                                ],

                            },

                        ],

                    };

                }


                // =============================================
                // UPDATE EXISTING DOCUMENT
                // =============================================

                const updated =
                    [
                        ...documents,
                    ];


                updated[index] = {

                    ...updated[index],

                    files: [

                        ...(updated[index]
                            ?.files || []),

                        file,

                    ],

                };


                return {

                    ...previous,

                    documents:
                        updated,

                };

            }
        );

    };


    // =====================================================
    // CLEAR DOCUMENT ERROR
    // =====================================================

    const clearError = (
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

                const next = {
                    ...previous,
                };


                delete next[
                    documentKey
                ];


                return next;

            }
        );

    };


    // =====================================================
    // UPLOAD FILE
    // =====================================================

    const uploadFile = async (
        file
    ) => {

        if (
            !file?.uri
        ) {

            return;

        }


        const fileSize =
            file?.fileSize ??
            file?.size ??
            0;


        if (
            fileSize >
            MAX_FILE_SIZE
        ) {

            Alert.alert(
                "File Too Large",

                "Maximum file size is 5 MB."
            );

            return;

        }


        try {

            setUploadingDocument(
                selectedDocument
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
                        `education_${Date.now()}.jpg`,

                    type:
                        file.type ||
                        "application/octet-stream",

                }

            );


            const response =
                await uploadLoanDocuments(
                    body
                ).unwrap();


            const uploaded =
                response?.data?.[0];


            const url =
                uploaded?.file;


            if (!url) {

                throw new Error(
                    "Document upload failed."
                );

            }


            const uploadedFile = {

                name:
                    uploaded?.name ||
                    file.fileName ||
                    file.name ||
                    "Document",

                url:
                    url,

                publicId:
                    uploaded?.publicId ||
                    null,

                type:
                    file.type ||
                    "application/octet-stream",

                uploaded:
                    true,

            };


            saveUploadedFile(
                selectedDocument,

                uploadedFile
            );


            clearError(
                selectedDocument
            );


            setSheetVisible(
                false
            );


        } catch (error) {

            console.log(
                "Education document upload error:",
                error
            );


            Alert.alert(
                "Upload Failed",

                error?.data?.message ||
                error?.message ||
                "Unable to upload document."
            );


        } finally {

            setUploadingDocument(
                null
            );

        }

    };


    // =====================================================
    // CAMERA
    // =====================================================

    const openCamera =
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


                if (
                    !asset?.uri
                ) {

                    return;

                }


                await uploadFile({

                    uri:
                        asset.uri,

                    fileName:
                        asset.fileName,

                    type:
                        asset.type,

                    fileSize:
                        asset.fileSize,

                });

            } catch (error) {

                console.log(
                    "Camera error:",
                    error
                );

            }

        };


    // =====================================================
    // GALLERY
    // =====================================================

    const openGallery =
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


                if (
                    !asset?.uri
                ) {

                    return;

                }


                await uploadFile({

                    uri:
                        asset.uri,

                    fileName:
                        asset.fileName,

                    type:
                        asset.type,

                    fileSize:
                        asset.fileSize,

                });

            } catch (error) {

                console.log(
                    "Gallery error:",
                    error
                );

            }

        };


    // =====================================================
    // DOCUMENT PICKER
    // =====================================================

    const openDocument =
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


                const selected =
                    result[0];


                await uploadFile({

                    uri:
                        selected.uri,

                    fileName:
                        selected.name,

                    type:
                        selected.type,

                    fileSize:
                        selected.size,

                });

            } catch (error) {

                if (
                    isCancel(error)
                ) {

                    return;

                }


                console.log(
                    "Document picker error:",
                    error
                );

            }

        };


    // =====================================================
    // IMAGE CHECK
    // =====================================================

    const isImage = (
        file
    ) => {

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


    // =====================================================
    // PREVIEW
    // =====================================================

    const handlePreview = (
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


    // =====================================================
    // REMOVE
    // =====================================================

    const handleRemove = (
        documentKey,
        fileIndex
    ) => {

        setForm(
            previous => {

                const documents =
                    previous?.documents ||
                    [];


                const updated =
                    documents
                        .map(
                            item => {

                                if (
                                    item?.type !==
                                    documentKey
                                ) {

                                    return item;

                                }


                                return {

                                    ...item,

                                    files:
                                        (
                                            item.files ||
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
                            item =>
                                item?.files
                                    ?.length > 0
                        );


                return {

                    ...previous,

                    documents:
                        updated,

                };

            }
        );

    };


    // =====================================================
    // REQUIRED FILE COUNT
    // =====================================================

    const totalRequiredFiles =
        useMemo(
            () => {

                return DOCUMENT_TYPES
                    .filter(
                        item =>
                            item.required
                    )
                    .reduce(
                        (
                            total,
                            item
                        ) => {

                            return (
                                total +
                                item.requiredFiles
                            );

                        },

                        0
                    );

            },

            [
                DOCUMENT_TYPES,
            ]
        );


    // =====================================================
    // UPLOADED REQUIRED FILE COUNT
    // =====================================================

    const totalUploadedFiles =
        useMemo(
            () => {

                return DOCUMENT_TYPES
                    .filter(
                        item =>
                            item.required
                    )
                    .reduce(
                        (
                            total,
                            item
                        ) => {

                            return (
                                total +
                                getFiles(
                                    item.key
                                ).length
                            );

                        },

                        0
                    );

            },

            [
                DOCUMENT_TYPES,

                form?.documents,
            ]
        );


    // =====================================================
    // RENDER DOCUMENT CARD
    // =====================================================

    const renderDocumentCard = (
        document
    ) => {

        const files =
            getFiles(
                document.key
            );


        const completed =
            document.required
                ? files.length >=
                    document.requiredFiles
                : files.length > 0;


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
                        files.length
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
                        handlePreview
                    }

                    onRemove={
                        handleRemove
                    }

                    isImage={
                        isImage
                    }

                />

            </View>

        );

    };


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <View
            style={{
                paddingTop:
                    theme.spacing.lg,

                paddingBottom:
                    theme.spacing.xl,
            }}
        >

            {/* =================================================
                PROGRESS CARD
            ================================================= */}

            <View
                style={{
                    marginHorizontal:
                        theme.spacing.lg,

                    paddingHorizontal:
                        theme.spacing.lg,

                    paddingVertical:
                        theme.spacing.lg,

                    borderRadius:
                        theme.radius.lg,

                    backgroundColor:
                        "#FFFDF9",

                    borderWidth:
                        1,

                    borderColor:
                        "#91A8BC",
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
                                marginLeft:
                                    8,

                                fontFamily:
                                    theme.fonts
                                        .semiBold,

                                fontSize:
                                    14,

                                lineHeight:
                                    18,

                                color:
                                    "#172B3A",
                            }}
                        >
                            Upload Documents
                        </Text>

                    </View>


                    <Text
                        style={{
                            fontFamily:
                                theme.fonts
                                    .regular,

                            fontSize:
                                12,

                            lineHeight:
                                16,

                            color:
                                "#64748B",
                        }}
                    >

                        {
                            totalUploadedFiles
                        }

                        {" / "}

                        {
                            totalRequiredFiles
                        }

                    </Text>

                </View>


                <View
                    style={{
                        height:
                            8,

                        marginTop:
                            12,

                        borderRadius:
                            999,

                        backgroundColor:
                            "#E8EEF3",

                        overflow:
                            "hidden",
                    }}
                >

                    <View
                        style={{
                            height:
                                "100%",

                            width:
                                `${
                                    totalRequiredFiles
                                        ? Math.min(
                                            (
                                                totalUploadedFiles /
                                                totalRequiredFiles
                                            ) * 100,

                                            100
                                        )
                                        : 0
                                }%`,

                            backgroundColor:
                                "#06966F",

                            borderRadius:
                                999,
                        }}
                    />

                </View>

            </View>


            {/* =================================================
                DOCUMENT LIST
            ================================================= */}

            <View
                style={{
                    marginTop:
                        theme.spacing.md,
                }}
            >

                {
                    DOCUMENT_TYPES.map(
                        renderDocumentCard
                    )
                }

            </View>


            {/* =================================================
                SECURITY CARD
            ================================================= */}

            <View
                style={{
                    marginHorizontal:
                        theme.spacing.lg,

                    marginTop:
                        theme.spacing.sm,

                    paddingHorizontal:
                        theme.spacing.lg,

                    paddingVertical:
                        theme.spacing.md,

                    borderRadius:
                        theme.radius.lg,

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
                        width:
                            44,

                        height:
                            44,

                        borderRadius:
                            22,

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

                        marginLeft:
                            14,
                    }}
                >

                    <Text
                        style={{
                            fontFamily:
                                theme.fonts.bold,

                            fontSize:
                                12,

                            lineHeight:
                                17,

                            color:
                                "#111827",
                        }}
                    >
                        Your documents are safe and encrypted.
                    </Text>


                    <Text
                        style={{
                            marginTop:
                                3,

                            fontFamily:
                                theme.fonts.regular,

                            fontSize:
                                11,

                            lineHeight:
                                16,

                            color:
                                "#9AAFC1",
                        }}
                    >
                        We use bank-grade security to protect your data.
                    </Text>

                </View>

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

                onClose={() =>
                    setPreviewImage(
                        null
                    )
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
                    openCamera
                }

                openGallery={
                    openGallery
                }

                openDocument={
                    openDocument
                }

                type="photo"

            />

        </View>

    );

};


export default Step2EducationLoanDocumentUpload;