import React, {
  memo,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import {
  CheckCircle2,
  ClipboardCheck,
  Image as ImageIcon,
  UserRoundCheck,
  MessageSquare,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";

import {
  useGetVisitorReviewQuery,
} from "../../../../redux/features/visitor/visitorApi.js";

import ShimmerPlaceholder from "../../../../components/common/Loader/ShimmerPlaceholder.jsx";

import InlineRetry from "../../../../components/common/RetryScreen/InlineRetry.jsx";


// =====================================================
// REVIEW CARD
// =====================================================

const ReviewCard = ({
  icon,
  title,
  status,
  children,
  onEdit,
  loading = false,
}) => {

  const isCompleted =
    status?.completed === true;

  return (
    <View
      style={{
        backgroundColor:
          theme.colors.white,

        borderRadius: 18,

        padding: 18,

        marginBottom:
          theme.spacing.lg,

        ...theme.shadows.card,
      }}
    >

      {/* =================================================
          HEADER
      ================================================= */}

      <View
        style={{
          flexDirection: "row",

          alignItems: "center",

          justifyContent:
            "space-between",
        }}
      >

        {/* =================================================
            LEFT
        ================================================= */}

        <View
          style={{
            flexDirection: "row",

            alignItems: "center",

            flex: 1,
          }}
        >

          {/* =================================================
              ICON
          ================================================= */}

          <View
            style={{
              width: 42,

              height: 42,

              borderRadius: 10,

              backgroundColor:
                "#FFE5C7",

              alignItems: "center",

              justifyContent: "center",

              marginRight: 12,
            }}
          >
            {icon}
          </View>


          {/* =================================================
              TITLE + STATUS
          ================================================= */}

          <View
            style={{
              flex: 1,
            }}
          >

            <Text
              style={{
                fontSize: 15,

                color:
                  theme.colors.black,

                fontFamily:
                  theme.fonts.medium,
              }}
            >
              {title}
            </Text>


            <View
              style={{
                flexDirection: "row",

                alignItems: "center",

                marginTop: 5,
              }}
            >

              {loading ? (

                <ShimmerPlaceholder
                  width={120}
                  height={14}
                  borderRadius={7}
                />

              ) : (

                <>
                  {/* STATUS ICON */}

                  {isCompleted ? (

                    <CheckCircle2
                      size={14}
                      color="#2E8B3C"
                      fill="#2E8B3C"
                    />

                  ) : (

                    <View
                      style={{
                        width: 8,

                        height: 8,

                        borderRadius: 4,

                        backgroundColor:
                          "#F59E0B",

                        marginLeft: 3,

                        marginRight: 3,
                      }}
                    />

                  )}


                  {/* STATUS TEXT */}

                  <Text
                    style={{
                      marginLeft: 5,

                      fontSize: 13,

                      color:
                        isCompleted
                          ? "#287C34"
                          : "#D97706",

                      fontFamily:
                        theme.fonts.medium,
                    }}
                  >
                    {status?.text ||
                      (
                        isCompleted
                          ? "Completed"
                          : "Pending"
                      )}
                  </Text>

                </>

              )}

            </View>

          </View>

        </View>


        {/* =================================================
            EDIT
        ================================================= */}

        {loading ? (

          <ShimmerPlaceholder
            width={35}
            height={15}
            borderRadius={7}
          />

        ) : (

          !!onEdit && (

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onEdit}
            >

              <Text
                style={{
                  fontSize: 14,

                  color: "#FF641F",

                  fontFamily:
                    theme.fonts.semiBold,
                }}
              >
                Edit
              </Text>

            </TouchableOpacity>

          )

        )}

      </View>


      {/* =================================================
          CONTENT
      ================================================= */}

      {!!children && (

        <View
          style={{
            marginTop: 14,
          }}
        >
          {children}
        </View>

      )}

    </View>
  );
};


// =====================================================
// REVIEW INFORMATION
// =====================================================

const ReviewInformation = ({
  job,
  data = {},
  onEditStep,
}) => {

  const loanId =
    job?.loanId;


  // =====================================================
  // REVIEW API
  // =====================================================

  const {
    data: reviewResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetVisitorReviewQuery(
    loanId,
    {
      skip: !loanId,
    }
  );


  const loading =
    isLoading ||
    isFetching;


  // =====================================================
  // ERROR
  // =====================================================

  if (
    isError &&
    !reviewResponse
  ) {

    return (

      <View
        style={{
          width: "100%",

          marginTop:
            theme.spacing.md,
        }}
      >

        <InlineRetry
          title="Unable to load review"
          description="Something went wrong while loading review information. Please try again."
          buttonText="Retry"
          loading={loading}
          onRetry={refetch}
        />

      </View>

    );
  }


  // =====================================================
  // REVIEW DATA
  // =====================================================

  const reviewData =
    reviewResponse?.data || {};


  // =====================================================
  // CARDS
  // =====================================================

  const verificationCard =
    reviewData?.cards?.verification ||
    {};

  const investigationCard =
    reviewData?.cards?.investigation ||
    {};

  const photosCard =
    reviewData?.cards?.photos ||
    {};

  const witnessCard =
    reviewData?.cards?.witness ||
    {};

  const remarksCard =
    reviewData?.cards?.remarks ||
    {};


  // =====================================================
  // FALLBACK LOCAL DATA
  // =====================================================

  const verification =
    data?.verification ||
    {};

  const investigation =
    data?.investigation ||
    {};

  const site =
    data?.site ||
    {};

  const witness =
    data?.witness ||
    {};


  // =====================================================
  // VERIFICATION
  // =====================================================

  const verificationCompleted =
    typeof verificationCard?.completed ===
      "boolean"
      ? verificationCard.completed
      : Boolean(
          verification?.status ===
            "COMPLETED"
        );


  // =====================================================
  // INVESTIGATION
  // =====================================================

  const investigationCompleted =
    typeof investigationCard?.completed ===
      "boolean"
      ? investigationCard.completed
      : Boolean(
          Object.keys(
            investigation || {}
          ).length
        );


  // =====================================================
  // SITE PHOTOS
  //
  // IMPORTANT:
  // ONLY cards.photos.verification
  //
  // This is Site Info photos.
  //
  // Do NOT use:
  // cards.photos.other
  // cards.photos.witness
  // witness.data.photos
  // =====================================================

  const sitePhotos =
    Array.isArray(
      photosCard?.verification
    )
      ? photosCard.verification
      : [];


  // =====================================================
  // SITE PHOTO COUNT
  // =====================================================

  const sitePhotoCount =
    sitePhotos.length;


  // =====================================================
  // SITE PHOTO STATUS
  // =====================================================

  const sitePhotosCompleted =
    photosCard?.completed === true &&
    sitePhotoCount > 0;


  const sitePhotosStatusText =
    sitePhotosCompleted
      ? `${sitePhotoCount} Photos Uploaded`
      : "No Photos Uploaded";


  // =====================================================
  // WITNESS DATA
  // =====================================================

  const witnessData =
    witnessCard?.data ||
    witness;


  // =====================================================
  // WITNESS STATUS
  // =====================================================

  const witnessCompleted =
    witnessCard?.completed === true ||
    Boolean(
      witnessData?.agreed === true
    );


  // =====================================================
  // WITNESS PHOTOS
  // =====================================================

  const witnessPhotos =
    Array.isArray(
      witnessData?.photos
    )
      ? witnessData.photos
      : [];


  // =====================================================
  // WITNESS SIGNATURES
  // =====================================================

  const witnessSignatures =
    Array.isArray(
      witnessData?.signatures
    )
      ? witnessData.signatures
      : [];


  // =====================================================
  // WITNESS DOCUMENTS
  // =====================================================

  const witnessDocuments =
    Array.isArray(
      witnessData?.documents
    )
      ? witnessData.documents
      : [];


  // =====================================================
  // WITNESS STATUS TEXT
  // =====================================================

  const witnessStatusText =
    witnessCompleted
      ? "Witness Saved"
      : "Witness Not Confirmed";


  // =====================================================
  // REMARKS
  // =====================================================

  const remarks =
    remarksCard?.value ||
    reviewData?.editableData?.remarks ||
    investigation?.remarks ||
    site?.remarks ||
    "";


  const remarksCompleted =
    remarksCard?.completed === true ||
    Boolean(remarks);


  const remarksStatusText =
    remarks
      ? "Added"
      : "Pending";


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <View
      style={{
        width: "100%",
      }}
    >

      {/* =================================================
          REVIEW TITLE
      ================================================= */}

      <View
        style={{
          marginBottom:
            theme.spacing.lg,
        }}
      >

        <Text
          style={{
            fontSize: 24,

            lineHeight: 30,

            color:
              theme.colors.black,

            fontFamily:
              theme.fonts.headingBold,
          }}
        >
          Review Details
        </Text>


        <Text
          style={{
            marginTop: 5,

            fontSize: 14,

            lineHeight: 20,

            color:
              theme.colors.textSecondary,

            fontFamily:
              theme.fonts.regular,
          }}
        >
          Please confirm all information is accurate
          before final submission.
        </Text>

      </View>


      {/* =================================================
          VERIFICATION
      ================================================= */}

      <ReviewCard
        title="Verification"

        loading={loading}

        status={{
          completed:
            verificationCompleted,

          text:
            verificationCompleted
              ? "Completed"
              : "Pending",
        }}

        icon={
          <ClipboardCheck
            size={21}
            color="#FF641F"
          />
        }

        onEdit={() =>
          onEditStep?.(1)
        }
      />


      {/* =================================================
          INVESTIGATION
      ================================================= */}

      <ReviewCard
        title="Investigation"

        loading={loading}

        status={{
          completed:
            investigationCompleted,

          text:
            investigationCompleted
              ? "Completed"
              : "Pending",
        }}

        icon={
          <ClipboardCheck
            size={21}
            color="#FF641F"
          />
        }

        onEdit={() =>
          onEditStep?.(2)
        }
      />


      {/* =================================================
          SITE INFO PHOTOS
      ================================================= */}

      <ReviewCard
        title="Photos ( Site info. )"

        loading={loading}

        status={{
          completed:
            sitePhotosCompleted,

          text:
            sitePhotosStatusText,
        }}

        icon={
          <ImageIcon
            size={21}
            color="#FF641F"
          />
        }

        onEdit={() =>
          onEditStep?.(3)
        }
      >

        {/* =================================================
            PHOTO PREVIEW
        ================================================= */}

        {loading ? (

          <View
            style={{
              flexDirection: "row",
            }}
          >

            {[1, 2, 3, 4].map(
              (item) => (

                <ShimmerPlaceholder
                  key={item}
                  width={72}
                  height={72}
                  borderRadius={7}
                  style={{
                    marginRight:
                      item < 4
                        ? 7
                        : 0,
                  }}
                />

              )
            )}

          </View>

        ) : (

          sitePhotos.length > 0 && (

            <View
              style={{
                flexDirection: "row",
              }}
            >

              {sitePhotos
                .slice(0, 4)
                .map(
                  (
                    photo,
                    index
                  ) => {

                    const uri =
                      photo?.url;

                    if (!uri) {
                      return null;
                    }

                    return (

                      <Image
                        key={
                          photo?.publicId ||
                          index
                        }

                        source={{
                          uri,
                        }}

                        resizeMode="cover"

                        style={{
                          width: 72,

                          height: 72,

                          borderRadius: 7,

                          marginRight:
                            index < 3
                              ? 7
                              : 0,
                        }}
                      />

                    );

                  }
                )}

            </View>

          )

        )}

      </ReviewCard>


      {/* =================================================
          WITNESS
      ================================================= */}

      <ReviewCard
        title="Witness"

        loading={loading}

        status={{
          completed:
            witnessCompleted,

          text:
            witnessStatusText,
        }}

        icon={
          <UserRoundCheck
            size={21}
            color="#FF641F"
          />
        }

        onEdit={() =>
          onEditStep?.(4)
        }
      >

        {!loading &&
          witnessCompleted && (

            <View>

              {/* =================================================
                  WITNESS NAME
              ================================================= */}

              {!!witnessData?.fullName && (

                <Text
                  style={{
                    fontSize: 13,

                    color:
                      theme.colors.textSecondary,

                    fontFamily:
                      theme.fonts.regular,

                    marginBottom: 6,
                  }}
                >
                  {witnessData.fullName}
                </Text>

              )}


              {/* =================================================
                  WITNESS FILE COUNTS
              ================================================= */}

              <View
                style={{
                  flexDirection: "row",

                  alignItems: "center",
                }}
              >

                {/* WITNESS PHOTOS */}

                {witnessPhotos.length > 0 && (

                  <Text
                    style={{
                      fontSize: 12,

                      color:
                        theme.colors.textSecondary,

                      fontFamily:
                        theme.fonts.medium,

                      marginRight: 12,
                    }}
                  >
                    {witnessPhotos.length} Photo
                    {witnessPhotos.length > 1
                      ? "s"
                      : ""}
                  </Text>

                )}


                {/* SIGNATURES */}

                {witnessSignatures.length > 0 && (

                  <Text
                    style={{
                      fontSize: 12,

                      color:
                        theme.colors.textSecondary,

                      fontFamily:
                        theme.fonts.medium,

                      marginRight: 12,
                    }}
                  >
                    {witnessSignatures.length} Signature
                    {witnessSignatures.length > 1
                      ? "s"
                      : ""}
                  </Text>

                )}


                {/* DOCUMENTS */}

                {witnessDocuments.length > 0 && (

                  <Text
                    style={{
                      fontSize: 12,

                      color:
                        theme.colors.textSecondary,

                      fontFamily:
                        theme.fonts.medium,
                    }}
                  >
                    {witnessDocuments.length} Document
                    {witnessDocuments.length > 1
                      ? "s"
                      : ""}
                  </Text>

                )}

              </View>

            </View>

          )}

      </ReviewCard>


      {/* =================================================
          REMARKS
      ================================================= */}

      <ReviewCard
        title="Remarks"

        loading={loading}

        status={{
          completed:
            remarksCompleted,

          text:
            remarksStatusText,
        }}

        icon={
          <MessageSquare
            size={21}
            color="#FF641F"
          />
        }

        onEdit={() =>
          onEditStep?.(2)
        }
      >

        {loading ? (

          <ShimmerPlaceholder
            width="100%"
            height={48}
            borderRadius={9}
          />

        ) : (

          <View
            style={{
              backgroundColor:
                "#F5F6F7",

              borderWidth: 1,

              borderColor:
                "#E0E2E5",

              borderRadius: 9,

              paddingHorizontal: 12,

              paddingVertical: 11,

              minHeight: 48,
            }}
          >

            <Text
              style={{
                fontSize: 14,

                lineHeight: 20,

                color:
                  remarks
                    ? "#42454A"
                    : "#8E9196",

                fontFamily:
                  theme.fonts.regular,
              }}
            >
              {remarks
                ? `"${remarks}"`
                : "No remarks added."}
            </Text>

          </View>

        )}

      </ReviewCard>

    </View>
  );
};


export default memo(
  ReviewInformation
);