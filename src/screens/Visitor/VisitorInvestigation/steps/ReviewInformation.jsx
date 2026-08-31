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

import InlineRetry from "../../../../components/common/Loader/ShimmerPlaceholder.jsx";


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
            LEFT CONTENT
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


            {/* =================================================
                STATUS
            ================================================= */}

            <View
              style={{
                flexDirection: "row",

                alignItems: "center",

                marginTop: 5,
              }}
            >

              {loading ? (

                <ShimmerPlaceholder
                  width={115}
                  height={14}
                  borderRadius={7}
                />

              ) : (

                <>
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

                  color:
                    "#FF641F",

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
          CARD CONTENT
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


  // =====================================================
  // REVIEW API
  // =====================================================

  const loanId =
    job?.loanId;


  const {
    data: reviewResponse,
    isLoading,
    isFetching,
    isError,
    refetch,
  } =
    useGetVisitorReviewQuery(
      loanId,
      {
        skip: !loanId,
      }
    );


  // =====================================================
  // LOADING
  // =====================================================

  const loading =
    isLoading || isFetching;


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
  // API DATA
  // =====================================================

  const reviewData =
    reviewResponse?.data ||
    null;


  // =====================================================
  // CARDS
  // =====================================================

  const verificationCard =
    reviewData?.cards?.verification ||
    null;


  const investigationCard =
    reviewData?.cards?.investigation ||
    null;


  const photosCard =
    reviewData?.cards?.photos ||
    null;


  const witnessCard =
    reviewData?.cards?.witness ||
    null;


  const remarksCard =
    reviewData?.cards?.remarks ||
    null;


  // =====================================================
  // FALLBACK DATA
  // =====================================================

  const verification =
    data?.verification || {};


  const investigation =
    data?.investigation || {};


  const site =
    data?.site || {};


  const witness =
    data?.witness || {};


  // =====================================================
  // VERIFICATION STATUS
  // =====================================================

  const verificationCompleted =
    reviewCardCompleted(
      verificationCard,
      verification
    );


  // =====================================================
  // INVESTIGATION STATUS
  // =====================================================

  const investigationCompleted =
    reviewCardCompleted(
      investigationCard,
      investigation
    );


  // =====================================================
  // PHOTOS
  // =====================================================

  const verificationPhotos =
    reviewData?.photoSummary?.verification?.photos ||
    photosCard?.verification ||
    site?.photos ||
    site?.uploadedPhotos ||
    [];


  const totalPhotos =
    reviewData?.photoSummary?.total ??
    photosCard?.count ??
    verificationPhotos.length;


  const photosCompleted =
    reviewData?.summary?.photosCompleted ??
    photosCard?.completed ??
    verificationPhotos.length > 0;


  // =====================================================
  // WITNESS
  // =====================================================

  const witnessData =
    witnessCard?.data ||
    reviewData?.editableData?.witness ||
    witness ||
    {};


  const witnessCompleted =
    reviewData?.summary?.witnessCompleted ??
    witnessCard?.completed ??
    Boolean(
      witnessData?.agreed ||
      witnessData?.witnessConfirmed
    );


  // =====================================================
  // WITNESS COUNTS
  // =====================================================

  const witnessPhotos =
    witnessData?.photos ||
    [];


  const witnessSignatures =
    witnessData?.signatures ||
    [];


  const witnessDocuments =
    witnessData?.documents ||
    [];


  // =====================================================
  // REMARKS
  // =====================================================

  const remarks =
    remarksCard?.value ||
    reviewData?.editableData?.remarks ||
    investigation?.remarks ||
    investigation?.description ||
    site?.remarks ||
    "";


  const remarksCompleted =
    remarksCard?.completed ??
    Boolean(remarks);


  // =====================================================
  // STATUS TEXT
  // =====================================================

  const verificationStatusText =
    verificationCard?.completed
      ? "Completed"
      : "Pending";


  const investigationStatusText =
    investigationCard?.completed
      ? "Completed"
      : "Pending";


  const photosStatusText =
    photosCompleted
      ? `${totalPhotos} Photos Uploaded`
      : "No Photos Uploaded";


  const witnessStatusText =
    witnessCompleted
      ? "Witness Saved"
      : "Witness Not Confirmed";


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
            verificationStatusText,
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
            investigationStatusText,
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
          PHOTOS
      ================================================= */}

      <ReviewCard
        title="Photos ( Site info. )"

        loading={loading}

        status={{
          completed:
            photosCompleted,

          text:
            photosStatusText,
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

          photosCompleted && (

            <View
              style={{
                flexDirection:
                  "row",
              }}
            >

              {verificationPhotos
                .slice(0, 4)
                .map(
                  (
                    photo,
                    index
                  ) => {

                    const uri =
                      typeof photo ===
                      "string"
                        ? photo
                        : photo?.url ||
                          photo?.uri;


                    if (!uri) {
                      return null;
                    }


                    return (

                      <Image
                        key={
                          photo?.id ||
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

        {/* =================================================
            WITNESS SUMMARY
        ================================================= */}

        {!loading &&
          witnessCompleted && (

            <View>

              {/* WITNESS NAME */}

              {!!witnessData?.fullName && (

                <Text
                  style={{
                    fontSize: 13,

                    color:
                      theme.colors.textSecondary,

                    fontFamily:
                      theme.fonts.regular,

                    marginBottom: 5,
                  }}
                >
                  {witnessData.fullName}
                </Text>

              )}


              {/* FILE COUNTS */}

              <View
                style={{
                  flexDirection:
                    "row",

                  alignItems:
                    "center",

                  marginTop: 2,
                }}
              >

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

        {/* =================================================
            REMARK BOX
        ================================================= */}

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


// =====================================================
// CARD COMPLETION HELPER
// =====================================================

const reviewCardCompleted = (
  apiCard,
  fallbackData
) => {

  if (
    typeof apiCard?.completed ===
    "boolean"
  ) {

    return apiCard.completed;

  }


  return Boolean(
    fallbackData?.status ===
      "COMPLETED" ||

    fallbackData?.status ===
      "completed" ||

    Object.keys(
      fallbackData || {}
    ).length > 0
  );

};


export default memo(
  ReviewInformation
);