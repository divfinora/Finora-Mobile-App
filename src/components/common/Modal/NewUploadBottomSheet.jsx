import React from "react";

import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import {
    Camera,
    FileText,
    Image as ImageIcon,
} from "lucide-react-native";

import NewCustomBottomSheet from "./NewCustomBottomSheet";

import { theme } from "../../../theme";

// =====================================================
// NEW UPLOAD BOTTOM SHEET
// =====================================================

const NewUploadBottomSheet = ({
    sheetVisible,
    setSheetVisible,

    openCamera,
    openGallery,
    openDocument,

    documentTitle = "PAN Card",

    type = "photo",
}) => {

    // =================================================
    // CLOSE
    // =================================================

    const closeSheet = () => {
        setSheetVisible(false);
    };

    // =================================================
    // CAMERA
    // =================================================

    const handleCamera = () => {
        closeSheet();

        setTimeout(() => {
            openCamera?.();
        }, 150);
    };

    // =================================================
    // DOCUMENT
    // =================================================

    const handleDocument = () => {
        closeSheet();

        setTimeout(() => {
            openDocument?.();
        }, 150);
    };

    // =================================================
    // GALLERY
    // =================================================

    const handleGallery = () => {
        closeSheet();

        setTimeout(() => {
            openGallery?.();
        }, 150);
    };

    // =================================================
    // COMMON CARD STYLE
    // =================================================

    const cardStyle = {
        backgroundColor: theme.colors.white,

        borderRadius: 16,

        minHeight: 70,

        paddingHorizontal: 10,

        paddingVertical: theme.spacing.sm + 1,

        flexDirection: "row",

        alignItems: "center",

        flex: 1,

        minWidth: 0,

        overflow: "hidden",
    };

    // =================================================
    // ICON BOX
    // =================================================

    const iconBoxStyle = {
        width: 40,

        height: 40,

        minWidth: 40,

        minHeight: 40,

        borderRadius: 13,

        backgroundColor:  '#FFF7ED',

        alignItems: "center",

        justifyContent: "center",

        flexShrink: 0,
    };

    // =================================================
    // TEXT CONTAINER
    // =================================================

    const textContainerStyle = {
        flex: 1,

        minWidth: 0,

        flexShrink: 1,

        marginLeft: theme.spacing.sm,

        paddingVertical: 1,
    };

    // =================================================
    // OPTION TITLE
    // =================================================

    const optionTitleStyle = {
        fontFamily: theme.fonts.semiBold,

        fontSize: 14,

        lineHeight: 16,

    

        color: '#1E293B',

        flexShrink: 1,
    };

    // =================================================
    // OPTION SUBTITLE
    // =================================================

    const optionSubtitleStyle = {
        fontFamily: theme.fonts.regular,

        marginTop: 2,

        fontSize: 12,

        lineHeight: 13,

        fontWeight: "400",

        color: '#94A3B8',

        flexShrink: 1,
    };

    // =================================================
    // RETURN
    // =================================================

    return (
        <NewCustomBottomSheet
            visible={sheetVisible}

            onClose={closeSheet}

            // =========================================
            // HEADER
            // =========================================

            sheetheading={`Upload ${documentTitle}`}

            showHeader={true}

            showDragHandle={false}

            // =========================================
            // SHEET
            // =========================================

            heightPercent={0.48}

            sheetBg="#FFF8EA"

            // =========================================
            // DRAG
            // =========================================

            enableDrag={true}

            closeOnBackdrop={true}

            closeOnDragDown={true}

            dragOnlyAtContentBottom={true}

            // =========================================
            // SHEET DESIGN
            // =========================================

            sheetStyle={{
                borderTopLeftRadius: 44,

                borderTopRightRadius: 44,

                backgroundColor: "#FFF8EA",

                overflow: "visible",
            }}

            // =========================================
            // HEADER DESIGN
            // =========================================

            headerStyle={{
                paddingTop: 26,

                paddingBottom: 8,

                backgroundColor: "#FFF8EA",

                borderTopLeftRadius: 44,

                borderTopRightRadius: 44,
            }}

            headingContainerStyle={{
                paddingHorizontal: 24,

                alignItems: "center",

                justifyContent: "center",
            }}

            headingStyle={{
                fontFamily: theme.fonts.bold,

                fontSize: 16,

                lineHeight: 16,

         

                textAlign: "center",

                color: "#111827",
            }}

            // =========================================
            // CLOSE BUTTON
            // =========================================

            closeButtonStyle={{
                position: "absolute",

                top: -60,

                left: "50%",

                right: "auto",

                marginLeft: -21,

                width: 42,

                height: 42,

                borderRadius: 21,

                backgroundColor: "#000000",

                alignItems: "center",

                justifyContent: "center",

                zIndex: 100,

                elevation: 12,

                shadowColor: "#000000",

                shadowOffset: {
                    width: 0,
                    height: 3,
                },

                shadowOpacity: 0.22,

                shadowRadius: 6,
            }}

            closeIconColor="#FFFFFF"

            closeIconSize={22}

            // =========================================
            // CONTENT
            // =========================================

            contentStyle={{
        
                paddingHorizontal: 12,

                paddingBottom: 30,

                backgroundColor: "#FFF8EA",

                borderTopLeftRadius: 44,

                borderTopRightRadius: 44,

                overflow: "hidden",
            }}
        >
            <View
                style={{
                    width: "100%",
                }}
            >
                {/* =====================================
                    SUBTITLE
                ====================================== */}

                <Text
                    style={{
                        fontFamily: theme.fonts.regular,

                        textAlign: "center",

                        fontSize: 13,

                        lineHeight: 13,

                        fontWeight: "400",

                        color: "#94A3B8",

                        marginBottom: 20,
                    }}
                >
                    Choose how you want to upload
                </Text>

                {/* =====================================
                    FIRST ROW
                ====================================== */}

                <View
                    style={{
                        flexDirection: "row",

                        width: "100%",

                        gap: 14,

                        marginBottom: 14,
                    }}
                >
                    {/* =================================
                        TAKE PHOTO
                    ================================= */}

                    {openCamera && (
                        <TouchableOpacity
                            activeOpacity={0.85}

                            onPress={handleCamera}

                            style={cardStyle}
                        >
                            <View style={iconBoxStyle}>
                                <Camera
                                    size={18}

                                    color="#FF5C1A"

                                    strokeWidth={2}
                                />
                            </View>

                            <View
                                style={textContainerStyle}
                            >
                                <Text
                                    numberOfLines={2}

                                    ellipsizeMode="tail"

                                    style={optionTitleStyle}
                                >
                                    Take Photo
                                </Text>

                                <Text
                                    numberOfLines={2}

                                    ellipsizeMode="tail"

                                    style={
                                        optionSubtitleStyle
                                    }
                                >
                                    Use your camera
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}

                    {/* =================================
                        CHOOSE FILES
                    ================================= */}

                    {openDocument && (
                        <TouchableOpacity
                            activeOpacity={0.85}

                            onPress={handleDocument}

                            style={cardStyle}
                        >
                            <View style={iconBoxStyle}>
                                <FileText
                                    size={20}

                                    color="#FF5C1A"

                                    strokeWidth={2}
                                />
                            </View>

                            <View
                                style={textContainerStyle}
                            >
                                <Text
                                    numberOfLines={2}

                                    ellipsizeMode="tail"

                                    style={optionTitleStyle}
                                >
                                    Choose Files
                                </Text>

                                <Text
                                    numberOfLines={2}

                                    ellipsizeMode="tail"

                                    style={
                                        optionSubtitleStyle
                                    }
                                >
                                    Browse from device
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                </View>

                {/* =====================================
                    GALLERY
                ====================================== */}

                {openGallery && (
                    <TouchableOpacity
                        activeOpacity={0.85}

                        onPress={handleGallery}

                        style={{
                            ...cardStyle,

                            width: "100%",

                            flex: undefined,
                        }}
                    >
                        <View style={iconBoxStyle}>
                            <ImageIcon
                                size={20}

                                color="#FF5C1A"

                                strokeWidth={2}
                            />
                        </View>

                        <View
                            style={textContainerStyle}
                        >
                            <Text
                                numberOfLines={2}

                                ellipsizeMode="tail"

                                style={optionTitleStyle}
                            >
                                Choose from Gallery
                            </Text>

                            <Text
                                numberOfLines={2}

                                ellipsizeMode="tail"

                                style={optionSubtitleStyle}
                            >
                                Select from photos
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </NewCustomBottomSheet>
    );
};

export default NewUploadBottomSheet;