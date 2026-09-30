// ============================================
// components/common/Modal/ImagePreviewModal.jsx
// COMMON IMAGE PREVIEW MODAL
// ============================================

import React from "react";

import {
    View,
    Modal,
    TouchableOpacity,
    Text,
    StatusBar,
} from "react-native";

import MaterialIcons
    from "@react-native-vector-icons/material-icons";

import ImageViewer
    from "react-native-image-zoom-viewer";

import { SafeAreaView }
    from "react-native-safe-area-context";

import { theme }
    from "../../../theme";

const ImagePreviewModal = ({
    visible = false,
    onClose,
    imageUri = null,
    title = "Image Preview",
}) => {

    // ============================================
    // NO IMAGE
    // ============================================

    if (!imageUri) {
        return null;
    }

    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            statusBarTranslucent
            onRequestClose={onClose}
        >

            <StatusBar
                barStyle="light-content"
                backgroundColor="#000000"
            />

            <SafeAreaView
                edges={[
                    "top",
                    "bottom",
                    "left",
                    "right",
                ]}
                style={{
                    flex: 1,
                    backgroundColor: "#000000",
                }}
            >

                {/* =====================================
                    HEADER
                ===================================== */}

                <View
                    style={{
                        height: 64,
                        paddingHorizontal: 16,

                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",

                        zIndex: 10,
                    }}
                >

                    <Text
                        numberOfLines={1}
                        style={{
                            flex: 1,
                            marginRight: 12,

                            fontSize: 16,

                            fontFamily:
                                theme.fonts.semiBold,

                            color: "#FFFFFF",
                        }}
                    >
                        {title}
                    </Text>


                    {/* CLOSE BUTTON */}

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={onClose}
                        style={{
                            width: 40,
                            height: 40,

                            borderRadius: 20,

                            backgroundColor:
                                "rgba(255,255,255,0.12)",

                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >

                        <MaterialIcons
                            name="close"
                            size={24}
                            color="#FFFFFF"
                        />

                    </TouchableOpacity>

                </View>


                {/* =====================================
                    IMAGE PREVIEW
                ===================================== */}

                <View
                    style={{
                        flex: 1,
                    }}
                >

                    <ImageViewer
                        imageUrls={[
                            {
                                url: imageUri,
                            },
                        ]}
                        enableSwipeDown
                        onSwipeDown={onClose}
                        backgroundColor="#000000"
                        renderIndicator={() => null}
                        saveToLocalByLongPress={false}
                        enablePreload
                        loadingRender={() => (
                            <MaterialIcons
                                name="image"
                                size={40}
                                color="#FFFFFF"
                            />
                        )}
                    />

                </View>

            </SafeAreaView>

        </Modal>
    );
};

export default ImagePreviewModal;