import React, {
  memo,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import {
  Camera,
  FileText,
  PenLine,
  ShieldCheck,
  Upload,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";

import CommonInput from "../../../../components/common/Input/CommonInput";

import UploadBottomSheet from
  "../../../../components/common/Modal/UploadBottomSheet";

import IDDetailsModal from
  "../components/IDDetailsModal";


const WitnessDetails = ({
  data = {},
  onChange,
  uploading = false,
}) => {

  // =====================================================
  // UPLOAD SHEET
  // =====================================================

  const [
    sheetVisible,
    setSheetVisible,
  ] = useState(false);


  // =====================================================
  // ID DETAILS MODAL
  // =====================================================

  const [
    idModalVisible,
    setIdModalVisible,
  ] = useState(false);


  // =====================================================
  // CURRENT UPLOAD TYPE
  // =====================================================

  const [
    uploadType,
    setUploadType,
  ] = useState("");


  // =====================================================
  // VALUES
  // =====================================================

  const witnessName =
    data?.witnessName || "";

  const mobileNumber =
    data?.mobileNumber || "";

  const relation =
    data?.relation || "";

  const idType =
    data?.idType || "";

  const idNumber =
    data?.idNumber || "";

  const selfie =
    data?.selfie || null;

  const signature =
    data?.signature || null;

  const idDocument =
    data?.idDocument || null;

  const witnessConfirmed =
    data?.witnessConfirmed === true;


  // =====================================================
  // UPDATE FIELD
  // =====================================================

  const updateField = (
    field,
    value
  ) => {

    onChange?.({

      ...data,

      [field]:
        value,

    });

  };


  // =====================================================
  // OPEN UPLOAD SHEET
  // =====================================================

  const openUploadSheet = (
    type
  ) => {

    setUploadType(
      type
    );

    setSheetVisible(
      true
    );

  };


  // =====================================================
  // OPEN ID DETAILS
  // =====================================================

  const handleOpenIDDocument = () => {

    setIdModalVisible(
      true
    );

  };


  // =====================================================
  // ID DETAILS CONTINUE
  // =====================================================

  const handleIDDetailsContinue = (
    values
  ) => {

    const nextData = {

      ...data,

      idType:
        values?.idType || "",

      idNumber:
        values?.idNumber || "",

    };


    onChange?.(
      nextData
    );


    setIdModalVisible(
      false
    );


    // Open common upload sheet
    setTimeout(() => {

      setUploadType(
        "idDocument"
      );

      setSheetVisible(
        true
      );

    }, 200);

  };


  // =====================================================
  // CAMERA
  // =====================================================

  const openCamera = () => {

    setSheetVisible(
      false
    );

    console.log(
      "Open camera for:",
      uploadType
    );

    // ---------------------------------------------------
    // IMPORTANT:
    // Parent component se actual camera picker
    // callback pass kar sakte ho.
    // ---------------------------------------------------

  };


  // =====================================================
  // GALLERY
  // =====================================================

  const openGallery = () => {

    setSheetVisible(
      false
    );

    console.log(
      "Open gallery for:",
      uploadType
    );

  };


  // =====================================================
  // DOCUMENT
  // =====================================================

  const openDocument = () => {

    setSheetVisible(
      false
    );

    console.log(
      "Open document picker for:",
      uploadType
    );

  };


  // =====================================================
  // FILE SELECTED FROM PICKER
  // =====================================================

  /*
   * IMPORTANT:
   *
   * Tumhare common UploadBottomSheet ke andar
   * openCamera/openGallery/openDocument callback
   * picker open karte hain.
   *
   * Actual picker ke result ke baad parent se
   * ye function call karna:
   *
   * handleSelectedFile(file)
   *
   */

  const handleSelectedFile = (
    file
  ) => {

    if (!file) {
      return;
    }


    if (
      uploadType === "selfie"
    ) {

      updateField(
        "selfie",
        file
      );

    }


    if (
      uploadType === "signature"
    ) {

      updateField(
        "signature",
        file
      );

    }


    if (
      uploadType === "idDocument"
    ) {

      updateField(
        "idDocument",
        file
      );

    }


    setSheetVisible(
      false
    );

  };


  // =====================================================
  // UPLOAD CARD
  // =====================================================

  const renderUploadCard = ({
    title,
    subtitle,
    icon,
    file,
    type,
    required = true,
    onPress,
  }) => {

    return (

      <TouchableOpacity
        activeOpacity={0.86}

        onPress={
          onPress ||
          (() =>
            openUploadSheet(
              type
            ))
        }

        disabled={
          uploading
        }

        style={{
          minHeight: 88,

          borderRadius: 16,

          borderWidth: 1,

          borderColor:
            file
              ? "#CBE7D2"
              : "#E9DDD5",

          backgroundColor:
            file
              ? "#F8FCF9"
              : "#FFFCFA",

          padding:
            theme.spacing.md,

          flexDirection:
            "row",

          alignItems:
            "center",

          marginBottom:
            theme.spacing.md,

          opacity:
            uploading
              ? 0.6
              : 1,
        }}
      >

        {/* =================================================
            ICON
        ================================================= */}

        <View
          style={{
            width: 46,

            height: 46,

            borderRadius: 14,

            backgroundColor:
              file
                ? "#E8F7EC"
                : "#FFF3E8",

            alignItems:
              "center",

            justifyContent:
              "center",
          }}
        >

          {file ? (

            <ShieldCheck
              size={21}
              color="#2E8B57"
              strokeWidth={2.1}
            />

          ) : (

            icon

          )}

        </View>


        {/* =================================================
            CONTENT
        ================================================= */}

        <View
          style={{
            flex: 1,

            marginLeft:
              theme.spacing.md,
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

            <Text
              style={{
                color:
                  theme.colors.black,

                fontSize:
                  theme.typography.b2,

                fontFamily:
                  theme.fonts.semiBold,
              }}
            >
              {title}
            </Text>


            {required && (

              <Text
                style={{
                  color:
                    theme.colors.primary500,

                  fontSize: 14,

                  marginLeft: 3,
                }}
              >
                *
              </Text>

            )}

          </View>


          <Text
            numberOfLines={1}
            style={{
              marginTop: 4,

              color:
                file
                  ? "#2E8B57"
                  : theme.colors.gray500,

              fontSize: 11.5,

              fontFamily:
                theme.fonts.regular,
            }}
          >
            {file
              ? file?.name ||
              "Document selected"
              : subtitle}
          </Text>

        </View>


        {/* =================================================
            ACTION
        ================================================= */}

        {uploading ? (

          <ActivityIndicator
            size="small"
            color={
              theme.colors.primary500
            }
          />

        ) : (

          <Upload
            size={18}
            color={
              file
                ? "#2E8B57"
                : theme.colors.primary500
            }

            strokeWidth={2.2}
          />

        )}

      </TouchableOpacity>

    );

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <View>

      {/* =================================================
          WITNESS DETAILS
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.white,

          borderRadius: 20,

          padding:
            theme.spacing.lg,

          marginBottom:
            theme.spacing.lg,

          borderWidth: 1,

          borderColor:
            "#F0E5DD",

          ...theme.shadows.card,
        }}
      >

        <Text
          style={{
            color:
              theme.colors.black,

            fontSize:
              theme.typography.b1,

            fontFamily:
              theme.fonts.headingBold,

            marginBottom:
              theme.spacing.lg,
          }}
        >
          Witness Details
        </Text>


        {/* =================================================
            FULL NAME
        ================================================= */}

        <CommonInput

          label="Full Name"
          required
          placeholder="Enter witness full name"

          value={
            witnessName
          }

          onChangeText={
            value =>
              updateField(
                "witnessName",
                value
              )
          }

          editable={
            !uploading
          }

          containerStyle={{
            marginBottom:
              theme.spacing.md,
          }}
          inputContainerStyle={{
            ...theme.input.inputBorder
          }}
        />


        {/* =================================================
            MOBILE
        ================================================= */}

        <CommonInput
          label="Mobile Number"
          required
          placeholder="Enter 10-digit mobile number"

          value={
            mobileNumber
          }

          onChangeText={
            value =>
              updateField(
                "mobileNumber",
                value.replace(
                  /\D/g,
                  ""
                )
              )
          }

          keyboardType="phone-pad"

          maxLength={10}

          editable={
            !uploading
          }

          containerStyle={{
            marginBottom:
              theme.spacing.md,
          }}
            inputContainerStyle={{
            ...theme.input.inputBorder
          }}
        />


        {/* =================================================
            RELATION
        ================================================= */}

        <CommonInput
          label="Relation to Applicant"
          required
          placeholder="Enter relation"

          value={
            relation
          }

          onChangeText={
            value =>
              updateField(
                "relation",
                value
              )
          }

          editable={
            !uploading
          }

          containerStyle={{
            marginBottom:
              theme.spacing.lg,
          }}
            inputContainerStyle={{
            ...theme.input.inputBorder
          }}
        />

      </View>


      {/* =================================================
          VERIFICATION DOCUMENTS
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.white,

          borderRadius: 20,

          padding:
            theme.spacing.lg,

          marginBottom:
            theme.spacing.lg,

          borderWidth: 1,

          borderColor:
            "#F0E5DD",

          ...theme.shadows.card,
        }}
      >

        <Text
          style={{
            color:
              theme.colors.black,

            fontSize:
              theme.typography.b1,

            fontFamily:
              theme.fonts.headingBold,

            marginBottom: 4,
          }}
        >
          Witness Verification
        </Text>


        <Text
          style={{
            color:
              theme.colors.gray500,

            fontSize: 12,

            fontFamily:
              theme.fonts.regular,

            lineHeight: 18,

            marginBottom:
              theme.spacing.lg,
          }}
        >
          Upload witness selfie, signature and one
          identity document.
        </Text>


        {/* =================================================
            SELFIE
        ================================================= */}

        {renderUploadCard({

          title:
            "Witness Selfie",

          subtitle:
            "Capture witness selfie",

          icon: (
            <Camera
              size={21}
              color={
                theme.colors.primary500
              }
              strokeWidth={2}
            />
          ),

          file:
            selfie,

          type:
            "selfie",

          required:
            true,

        })}


        {/* =================================================
            SIGNATURE
        ================================================= */}

        {renderUploadCard({

          title:
            "Witness Signature",

          subtitle:
            "Upload witness signature",

          icon: (
            <PenLine
              size={21}
              color={
                theme.colors.primary500
              }
              strokeWidth={2}
            />
          ),

          file:
            signature,

          type:
            "signature",

          required:
            true,

        })}


        {/* =================================================
            ID DOCUMENT
        ================================================= */}

        {renderUploadCard({

          title:
            "Identity Document",

          subtitle:
            idType
              ? `${idType} • Tap to upload`
              : "Select ID type and upload document",

          icon: (
            <FileText
              size={21}
              color={
                theme.colors.primary500
              }
              strokeWidth={2}
            />
          ),

          file:
            idDocument,

          type:
            "idDocument",

          required:
            true,

          onPress:
            handleOpenIDDocument,

        })}

      </View>


      {/* =================================================
          CONFIRMATION
      ================================================= */}

      <TouchableOpacity
        activeOpacity={0.85}

        onPress={() =>
          updateField(
            "witnessConfirmed",
            !witnessConfirmed
          )
        }

        disabled={
          uploading
        }

        style={{
          flexDirection:
            "row",

          alignItems:
            "flex-start",

          marginBottom:
            theme.spacing.lg,
        }}
      >

        <View
          style={{
            width: 22,

            height: 22,

            borderRadius: 6,

            borderWidth: 1.5,

            borderColor:
              witnessConfirmed
                ? theme.colors.primary500
                : theme.colors.gray300,

            backgroundColor:
              witnessConfirmed
                ? theme.colors.primary500
                : theme.colors.white,

            alignItems:
              "center",

            justifyContent:
              "center",

            marginRight:
              theme.spacing.sm,
          }}
        >

          {witnessConfirmed && (

            <Text
              style={{
                color:
                  theme.colors.white,

                fontSize: 14,

                fontFamily:
                  theme.fonts.semiBold,
              }}
            >
              ✓
            </Text>

          )}

        </View>


        <Text
          style={{
            flex: 1,

            color:
              theme.colors.gray700,

            fontSize: 12,

            lineHeight: 18,

            fontFamily:
              theme.fonts.regular,
          }}
        >
          I confirm that the witness details and
          documents provided above are correct.
        </Text>

      </TouchableOpacity>


      {/* =================================================
          ID DETAILS MODAL
      ================================================= */}

      <IDDetailsModal
        visible={
          idModalVisible
        }

        initialValues={{
          idType,
          idNumber,
        }}

        onClose={() =>
          setIdModalVisible(
            false
          )
        }

        onContinue={
          handleIDDetailsContinue
        }
      />


      {/* =================================================
          COMMON UPLOAD BOTTOM SHEET
      ================================================= */}

      <UploadBottomSheet

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

        type={
          uploadType === "idDocument"
            ? "document"
            : "photo"
        }

      />

    </View>

  );

};


export default memo(
  WitnessDetails
);