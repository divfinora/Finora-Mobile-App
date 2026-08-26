import React from "react";

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

import { theme } from "../../../../theme";


// =====================================================
// REVIEW CARD
// =====================================================

const ReviewCard = ({
  icon,
  title,
  status,
  children,
  onEdit,
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

                marginTop: 3,
              }}
            >

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

            </View>

          </View>

        </View>


        {/* =================================================
            EDIT
        ================================================= */}

        {!!onEdit && (

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
  // DATA
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
  // PHOTOS
  // =====================================================

  const photos =
    site?.photos ||
    site?.uploadedPhotos ||
    [];


  // =====================================================
  // REMARKS
  // =====================================================

  const remarks =
    investigation?.remarks ||
    investigation?.description ||
    site?.remarks ||
    "";


  // =====================================================
  // STATUS
  // =====================================================

  const verificationCompleted =
    Boolean(
      verification?.status ===
        "COMPLETED" ||

      verification?.status ===
        "completed" ||

      Object.keys(
        verification
      ).length > 0
    );


  const investigationCompleted =
    Boolean(
      investigation?.status ===
        "COMPLETED" ||

      investigation?.status ===
        "completed" ||

      investigation?.description ||

      investigation?.remarks
    );


  const photosCompleted =
    Array.isArray(photos) &&
    photos.length > 0;


  const witnessCompleted =
    Boolean(
      witness?.status ===
        "COMPLETED" ||

      witness?.status ===
        "completed" ||

      witness?.witnessConfirmed
    );


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
          PHOTOS
      ================================================= */}

      <ReviewCard
        title="Photos ( Site info. )"

        status={{
          completed:
            photosCompleted,

          text:
            photosCompleted
              ? `${photos.length} Photos Uploaded`
              : "No Photos Uploaded",
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

        {photosCompleted && (

          <View
            style={{
              flexDirection:
                "row",
            }}
          >

            {photos
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

        )}

      </ReviewCard>


      {/* =================================================
          WITNESS
      ================================================= */}

      <ReviewCard
        title="Witness"

        status={{
          completed:
            witnessCompleted,

          text:
            witnessCompleted
              ? "Witness Saved"
              : "Witness Not Confirmed",
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

        status={{
          completed:
            Boolean(remarks),

          text:
            remarks
              ? "Added"
              : "Pending",
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

      </ReviewCard>

    </View>

  );

};


export default ReviewInformation;