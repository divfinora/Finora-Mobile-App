import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  Home,
  Store,
  Building2,
  UserRound,
  FileText,
  MoreHorizontal,
  Trash2,
  MoreVertical,
} from "lucide-react-native";

import LinearGradient from "react-native-linear-gradient";

import { theme } from "../../../../theme";


// =====================================================
// UPLOAD CATEGORIES
// =====================================================

const UPLOAD_CATEGORIES = [
  {
    key: "house",
    title: "House",
    icon: Home,
  },
  {
    key: "shop",
    title: "Shop",
    icon: Store,
  },
  {
    key: "office",
    title: "Office",
    icon: Building2,
  },
  {
    key: "customer",
    title: "Customer",
    icon: UserRound,
  },
  {
    key: "document",
    title: "Document",
    icon: FileText,
  },
  {
    key: "other",
    title: "Other",
    icon: MoreHorizontal,
  },
];


// =====================================================
// CONSTANTS
// =====================================================

const MAX_UPLOADS = 10;


// =====================================================
// COMPONENT
// =====================================================

const SiteDetails = ({
  job,
  data = {},
  onChange,
}) => {

  // ===================================================
  // UPLOADED PHOTOS
  // ===================================================

  const uploadedPhotos =
    Array.isArray(data?.uploadedPhotos)
      ? data.uploadedPhotos
      : [];


  const uploadedCount =
    uploadedPhotos.length;


  // ===================================================
  // UPLOAD PERCENTAGE
  // ===================================================

  const uploadPercentage =
    Math.min(
      Math.round(
        (uploadedCount / MAX_UPLOADS) * 100
      ),
      100
    );


  // ===================================================
  // CATEGORY PRESS
  // ===================================================

  const handleCategoryPress = (
    category
  ) => {

    onChange?.({
      selectedCategory:
        category.key,
    });

    // TODO:
    // Open upload bottom sheet here.
  };


  // ===================================================
  // DELETE PHOTO
  // ===================================================

  const handleDeletePhoto = (
    photoId
  ) => {

    const updatedPhotos =
      uploadedPhotos.filter(
        (item, index) =>
          item?.id !== photoId &&
          index !== photoId
      );

    onChange?.({
      uploadedPhotos:
        updatedPhotos,
    });
  };


  // ===================================================
  // UPLOADED PHOTO ITEM
  // ===================================================

  const renderUploadedItem = (
    item,
    index
  ) => {

    const isFirst =
      index === 0;


    const imageUri =
      item?.uri ||
      item?.url ||
      item?.thumbnail;


    return (

      <View
        key={
          item?.id ||
          item?.publicId ||
          index
        }
        style={{
          minHeight:
            isFirst
              ? 118
              : 82,

          backgroundColor:
            theme.colors.white,

          borderRadius:
            theme.radius.lg,

          padding:
            theme.spacing.md,

          marginBottom:
            theme.spacing.md,

          flexDirection:
            "row",

          alignItems:
            "center",
        }}
      >

        {/* =================================================
            IMAGE
        ================================================= */}

        <View
          style={{
            width:
              isFirst
                ? 84
                : 52,

            height:
              isFirst
                ? 84
                : 52,

            borderRadius:
              theme.radius.md,

            overflow:
              "hidden",

            backgroundColor:
              theme.colors.gray100,
          }}
        >

          {imageUri ? (

            <Image
              source={{
                uri: imageUri,
              }}
              style={{
                width: "100%",
                height: "100%",
              }}
              resizeMode="cover"
            />

          ) : (

            <View
              style={{
                flex: 1,

                alignItems:
                  "center",

                justifyContent:
                  "center",
              }}
            >

              <FileText
                size={22}
                color={
                  theme.colors.gray500
                }
              />

            </View>

          )}

        </View>


        {/* =================================================
            DETAILS
        ================================================= */}

        <View
          style={{
            flex: 1,

            marginLeft:
              theme.spacing.md,
          }}
        >

          <Text
            numberOfLines={1}
            style={{
              color:
                theme.colors.black,

              fontSize:
                theme.typography.b1,

              fontFamily:
                theme.fonts.medium,
            }}
          >
            {
              item?.title ||
              item?.name ||
              "Uploaded Document"
            }
          </Text>


          {isFirst && (

            <>

              <Text
                style={{
                  marginTop: 4,

                  color:
                    theme.colors.gray500,

                  fontSize:
                    theme.typography.b3,

                  fontFamily:
                    theme.fonts.regular,
                }}
              >
                {
                  item?.subtitle ||
                  "Uploaded today, 10:42 AM"
                }
              </Text>


              <View
                style={{
                  flexDirection:
                    "row",

                  alignItems:
                    "center",

                  marginTop: 5,
                }}
              >

                <View
                  style={{
                    width: 14,

                    height: 14,

                    borderRadius: 7,

                    backgroundColor:
                      theme.colors.success,

                    alignItems:
                      "center",

                    justifyContent:
                      "center",
                  }}
                >

                  <Text
                    style={{
                      color:
                        theme.colors.white,

                      fontSize: 9,

                      fontFamily:
                        theme.fonts.bold,
                    }}
                  >
                    ✓
                  </Text>

                </View>


                <Text
                  style={{
                    marginLeft: 4,

                    color:
                      theme.colors.success,

                    fontSize:
                      theme.typography.b3,

                    fontFamily:
                      theme.fonts.medium,
                  }}
                >
                  Verified Location
                </Text>

              </View>

            </>

          )}

        </View>


        {/* =================================================
            ACTION
        ================================================= */}

        {isFirst ? (

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              handleDeletePhoto(
                item?.id ?? index
              )
            }
            style={{
              width: 40,

              height: 40,

              alignItems:
                "center",

              justifyContent:
                "center",
            }}
          >

            <Trash2
              size={20}
              color={
                theme.colors.error
              }
            />

          </TouchableOpacity>

        ) : (

          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              width: 36,

              height: 36,

              alignItems:
                "center",

              justifyContent:
                "center",
            }}
          >

            <MoreVertical
              size={20}
              color={
                theme.colors.gray700
              }
            />

          </TouchableOpacity>

        )}

      </View>

    );

  };


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <View
      style={{
        width: "100%",
      }}
    >

      {/* =================================================
          UPLOAD PROGRESS CARD
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.white,

          borderRadius:
            theme.radius.xl,

          padding:
            theme.spacing.xl,

          marginBottom:
            theme.spacing.lg,

          ...theme.shadows.card,
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

          {/* =================================================
              PROGRESS
          ================================================= */}

          <View
            style={{
              flex: 1,
            }}
          >

            <Text
              style={{
                color:
                  theme.colors.black,

                fontSize:
                  theme.typography.b1,

                fontFamily:
                  theme.fonts.medium,
              }}
            >
              Upload
            </Text>


            <Text
              style={{
                color:
                  theme.colors.black,

                fontSize:
                  theme.typography.b1,

                fontFamily:
                  theme.fonts.medium,
              }}
            >
              Progress
            </Text>


            <View
              style={{
                height: 8,

                borderRadius: 999,

                backgroundColor:
                  theme.colors.gray200,

                overflow:
                  "hidden",

                marginTop:
                  theme.spacing.sm,
              }}
            >

              <LinearGradient
                colors={[
                  theme.colors.primary300,
                  theme.colors.primary500,
                ]}
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 1,
                  y: 0,
                }}
                style={{
                  width:
                    `${uploadPercentage}%`,

                  height: "100%",
                }}
              />

            </View>

          </View>


          {/* =================================================
              COUNT
          ================================================= */}

          <View
            style={{
              alignItems:
                "center",

              marginHorizontal:
                theme.spacing.lg,
            }}
          >

            <Text
              style={{
                color:
                  theme.colors.black,

                fontSize: 26,

                lineHeight: 32,

                fontFamily:
                  theme.fonts.headingBold,
              }}
            >
              {uploadedCount} / {MAX_UPLOADS}
            </Text>


            <Text
              style={{
                color:
                  theme.colors.gray500,

                fontSize:
                  theme.typography.b2,

                fontFamily:
                  theme.fonts.regular,
              }}
            >
              Uploaded
            </Text>

          </View>


          {/* =================================================
              CIRCLE %
          ================================================= */}

          <View
            style={{
              width: 60,

              height: 60,

              borderRadius: 30,

              borderWidth: 4,

              borderColor:
                theme.colors.primary400,

              alignItems:
                "center",

              justifyContent:
                "center",
            }}
          >

            <Text
              style={{
                color:
                  theme.colors.black,

                fontSize:
                  theme.typography.b3,

                fontFamily:
                  theme.fonts.bold,
              }}
            >
              {uploadPercentage}%
            </Text>

          </View>

        </View>

      </View>


      {/* =================================================
          SELECT CATEGORY
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.gray100,

          borderRadius:
            theme.radius.xl,

          padding:
            theme.spacing.lg,

          marginBottom:
            theme.spacing.lg,
        }}
      >

        <Text
          style={{
            marginBottom:
              theme.spacing.lg,

            color:
              theme.colors.black,

            fontSize:
              theme.typography.b2,

            fontFamily:
              theme.fonts.headingBold,

            letterSpacing: 0.4,
          }}
        >
          SELECT CATEGORY TO UPLOAD
        </Text>


        <View
          style={{
            flexDirection:
              "row",

            flexWrap:
              "wrap",

            justifyContent:
              "space-between",
          }}
        >

          {UPLOAD_CATEGORIES.map(
            (category) => {

              const Icon =
                category.icon;


              const selected =
                data?.selectedCategory ===
                category.key;


              return (

                <TouchableOpacity
                  key={
                    category.key
                  }
                  activeOpacity={0.8}
                  onPress={() =>
                    handleCategoryPress(
                      category
                    )
                  }
                  style={{
                    width: "31.5%",

                    height: 100,

                    backgroundColor:
                      theme.colors.white,

                    borderRadius:
                      theme.radius.lg,

                    alignItems:
                      "center",

                    justifyContent:
                      "center",

                    marginBottom:
                      theme.spacing.md,
                  }}
                >

                  <View
                    style={{
                      width: 50,

                      height: 50,

                      borderRadius: 25,

                      backgroundColor:
                        selected
                          ? theme.colors.primary300
                          : theme.colors.primary100,

                      alignItems:
                        "center",

                      justifyContent:
                        "center",

                      marginBottom:
                        theme.spacing.sm,
                    }}
                  >

                    <Icon
                      size={22}
                      color={
                        theme.colors.primary500
                      }
                    />

                  </View>


                  <Text
                    style={{
                      color:
                        theme.colors.navy500,

                      fontSize:
                        theme.typography.b2,

                      fontFamily:
                        theme.fonts.medium,
                    }}
                  >
                    {category.title}
                  </Text>

                </TouchableOpacity>

              );

            }
          )}

        </View>

      </View>


      {/* =================================================
          RECENTLY UPLOADED
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.gray100,

          borderRadius:
            theme.radius.xl,

          padding:
            theme.spacing.lg,

          marginBottom:
            theme.spacing.xl,
        }}
      >

        {/* =================================================
            HEADER
        ================================================= */}

        <View
          style={{
            flexDirection:
              "row",

            alignItems:
              "center",

            justifyContent:
              "space-between",

            marginBottom:
              theme.spacing.lg,
          }}
        >

          <Text
            style={{
              color:
                theme.colors.black,

              fontSize:
                theme.typography.b2,

              fontFamily:
                theme.fonts.headingBold,

              letterSpacing: 0.4,
            }}
          >
            RECENTLY UPLOADED
          </Text>


          <TouchableOpacity
            activeOpacity={0.8}
          >

            <Text
              style={{
                color:
                  theme.colors.gray700,

                fontSize:
                  theme.typography.b3,

                fontFamily:
                  theme.fonts.medium,
              }}
            >
              View All
            </Text>

          </TouchableOpacity>

        </View>


        {/* =================================================
            ITEMS
        ================================================= */}

        {uploadedPhotos.length > 0 ? (

          uploadedPhotos.map(
            renderUploadedItem
          )

        ) : (

          <View
            style={{
              backgroundColor:
                theme.colors.white,

              borderRadius:
                theme.radius.lg,

              padding:
                theme.spacing.xl,

              alignItems:
                "center",
            }}
          >

            <FileText
              size={30}
              color={
                theme.colors.gray500
              }
            />


            <Text
              style={{
                marginTop:
                  theme.spacing.sm,

                color:
                  theme.colors.gray500,

                fontSize:
                  theme.typography.b3,

                fontFamily:
                  theme.fonts.medium,
              }}
            >
              No files uploaded yet
            </Text>

          </View>

        )}

      </View>

    </View>

  );

};


export default SiteDetails;