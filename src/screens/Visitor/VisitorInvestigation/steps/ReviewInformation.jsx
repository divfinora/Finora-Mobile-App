import React, { memo } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import {
  CheckCircle2,
  ClipboardCheck,
  Image as ImageIcon,
  UserRoundCheck,
  MessageSquare,
} from "lucide-react-native";

import { theme } from "../../../../theme";

import ShimmerPlaceholder from "../../../../components/common/Loader/ShimmerPlaceholder.jsx";


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
  const isCompleted = status?.completed === true;

  return (
    <View
      style={{
        backgroundColor: theme.colors.white,
        borderRadius: 18,
        padding: 18,
        marginBottom: theme.spacing.lg,
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
          justifyContent: "space-between",
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

          {/* ICON */}

          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              backgroundColor: "#FFE5C7",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 12,
            }}
          >
            {icon}
          </View>


          {/* TITLE + STATUS */}

          <View
            style={{
              flex: 1,
            }}
          >

            <Text
              style={{
                fontSize: 15,
                color: theme.colors.black,
                fontFamily: theme.fonts.medium,
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
                        backgroundColor: "#F59E0B",
                        marginLeft: 3,
                        marginRight: 3,
                      }}
                    />

                  )}


                  <Text
                    style={{
                      marginLeft: 5,
                      fontSize: 13,
                      color: isCompleted
                        ? "#287C34"
                        : "#D97706",
                      fontFamily: theme.fonts.medium,
                    }}
                  >
                    {status?.text ||
                      (isCompleted
                        ? "Completed"
                        : "Pending")}
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
                  fontFamily: theme.fonts.semiBold,
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
  verificationSummary,
  onEditStep,
  isLoading = false,
  isFetching = false,
}) => {

  // =====================================================
  // SUMMARY DATA
  // =====================================================

  const summaryData =
    verificationSummary?.data || {};


  // =====================================================
  // INVESTIGATION
  // =====================================================

  const investigation =
    summaryData?.investigationDetails || {};


  // =====================================================
  // SITE DETAILS
  // =====================================================

  const siteDetails =
    summaryData?.siteDetails || {};


  // =====================================================
  // WITNESS DETAILS
  // =====================================================

  const witnessDetails =
    summaryData?.witnessDetails || {};


  // =====================================================
  // LOADING
  // =====================================================

  const loading =
    isLoading || isFetching;


  // =====================================================
  // INVESTIGATION STATUS
  // =====================================================

  const investigationCompleted =
    investigation?.completed === true ||
    Boolean(
      investigation?.description ||
      investigation?.remarks ||
      investigation?.location?.address
    );


  // =====================================================
  // SITE PHOTOS
  // =====================================================

  const sitePhotos =
    Array.isArray(siteDetails?.photos)
      ? siteDetails.photos
      : [];


  const sitePhotoCount =
    sitePhotos.length;


  const sitePhotosCompleted =
    sitePhotoCount > 0;


  const sitePhotosStatusText =
    sitePhotosCompleted
      ? `${sitePhotoCount} Photos Uploaded`
      : "No Photos Uploaded";


  // =====================================================
  // WITNESS STATUS
  // =====================================================

  const witnessCompleted =
    witnessDetails?.completed === true ||
    witnessDetails?.agreed === true;


  const witnessStatusText =
    witnessCompleted
      ? "Witness Saved"
      : "Witness Not Confirmed";


  // =====================================================
  // REMARKS
  // =====================================================

  const remarks =
    investigation?.remarks || "";


  const remarksCompleted =
    Boolean(remarks);


  const remarksStatusText =
    remarks
      ? "Added"
      : "Pending";


  // =====================================================
  // IMAGE URL
  // =====================================================

  const getImageUri = (item) => {
    return (
      item?.url ||
      item?.secure_url ||
      item?.path ||
      item?.uri ||
      ""
    );
  };


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
          marginBottom: theme.spacing.lg,
        }}
      >

        <Text
          style={{
            fontSize: 24,
            lineHeight: 30,
            color: theme.colors.black,
            fontFamily: theme.fonts.semiBold,
          }}
        >
          Review Details
        </Text>

        <Text
          style={{
            marginTop: 5,
            fontSize: 14,
            lineHeight: 20,
            color: theme.colors.textSecondary,
            fontFamily: theme.fonts.regular,
          }}
        >
          Please confirm all information is accurate
          before final submission.
        </Text>

      </View>


      {/* =================================================
          INVESTIGATION
      ================================================= */}

      <ReviewCard
        title="Investigation"
        loading={loading}
        status={{
          completed: investigationCompleted,
          text: investigationCompleted
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
          completed: sitePhotosCompleted,
          text: sitePhotosStatusText,
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

        {loading ? (

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
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
                    marginRight: 7,
                  }}
                />
              )
            )}

          </ScrollView>

        ) : (

          sitePhotos.length > 0 && (

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingRight: 4,
              }}
            >

              {sitePhotos.map(
                (photo, index) => {

                  const uri =
                    getImageUri(photo);

                  if (!uri) {
                    return null;
                  }

                  return (
                    <Image
                      key={
                        photo?.publicId ||
                        photo?._id ||
                        `site-photo-${index}`
                      }
                      source={{
                        uri,
                      }}
                      resizeMode="cover"
                      style={{
                        width: 72,
                        height: 72,
                        borderRadius: 7,
                        marginRight: 7,
                      }}
                    />
                  );
                }
              )}

            </ScrollView>

          )

        )}

      </ReviewCard>


      {/* =================================================
          WITNESS
          SIMPLE CARD ONLY
      ================================================= */}

      <ReviewCard
        title="Witness"
        loading={loading}
        status={{
          completed: witnessCompleted,
          text: witnessStatusText,
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
      />


      {/* =================================================
          REMARKS
      ================================================= */}

      <ReviewCard
        title="Remarks"
        loading={loading}
        status={{
          completed: remarksCompleted,
          text: remarksStatusText,
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
              backgroundColor: "#F5F6F7",
              borderWidth: 1,
              borderColor: "#E0E2E5",
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
                color: remarks
                  ? "#42454A"
                  : "#8E9196",
                fontFamily: theme.fonts.regular,
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
// EXPORT
// =====================================================

export default memo(
  ReviewInformation
);