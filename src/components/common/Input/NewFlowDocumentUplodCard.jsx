import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Image,
} from "react-native";

import MaterialIcons from "@react-native-vector-icons/material-icons";


import { theme } from "../../../theme";

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

                // ERROR BORDER
                borderWidth: error ? 1.5 : 0,
                borderColor: error
                    ? theme.colors.error
                    : "transparent",
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
                                backgroundColor: '#fff7edc2',
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

export default DocumentUploadCard;

