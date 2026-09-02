import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  ClipboardCheck,
  Check,
} from "lucide-react-native";

import { theme } from "../../../../theme";

import {
  useGetVisitorReviewQuery,
} from "../../../../redux/features/visitor/visitorApi.js";

import ShimmerPlaceholder from "../../../../components/common/Loader/ShimmerPlaceholder.jsx";

import InlineRetry from "../../../../components/common/RetryScreen/InlineRetry.jsx";


// =====================================================
// CHECKBOX
// =====================================================

const DeclarationCheckbox = ({
  checked,
  onPress,
  title,
  description,
}) => {

  return (

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        flexDirection: "row",

        alignItems: "flex-start",

        marginBottom:
          theme.spacing.xl,
      }}
    >

      {/* CHECKBOX */}

      <View
        style={{
          width: 20,

          height: 20,

          borderRadius: 4,

          borderWidth: 1,

          borderColor:
            checked
              ? "#FF641F"
              : "#8E9196",

          backgroundColor:
            checked
              ? "#FF641F"
              : theme.colors.white,

          alignItems: "center",

          justifyContent: "center",

          marginTop: 1,
        }}
      >

        {checked && (

          <Check
            size={14}
            color={
              theme.colors.white
            }
            strokeWidth={3}
          />

        )}

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

            lineHeight: 19,

            color:
              theme.colors.black,

            fontFamily:
              theme.fonts.semiBold,
          }}
        >
          {title}
        </Text>


        <Text
          style={{
            marginTop: 2,

            fontSize: 13,

            lineHeight: 18,

            color:
              theme.colors.textSecondary,

            fontFamily:
              theme.fonts.regular,
          }}
        >
          {description}
        </Text>

      </View>

    </TouchableOpacity>
  );
};


// =====================================================
// SUBMIT VERIFICATION
// =====================================================

const SubmitVerification = ({
  job,
  data = {},
  onChange,
}) => {

  // =====================================================
  // DECLARATION DATA
  // =====================================================

  const declaration =
    data?.declaration || {};


  const informationCorrect =
    Boolean(
      declaration?.informationCorrect
    );


  const photosGenuine =
    Boolean(
      declaration?.photosGenuine
    );


  const investigationCompleted =
    Boolean(
      declaration?.investigationCompleted
    );


  // =====================================================
  // REVIEW API
  // =====================================================

  const loanId =
    job?.loanId;


  const {
    data: reviewResponse,
    isLoading: reviewLoading,
    isFetching: reviewFetching,
    isError: reviewError,
    refetch: refetchReview,
  } = useGetVisitorReviewQuery(
    loanId,
    {
      skip: !loanId,
    }
  );


  const reviewLoadingState =
    reviewLoading ||
    reviewFetching;


  // =====================================================
  // FILE COUNT
  // =====================================================

  const reviewData =
    reviewResponse?.data || {};


  const totalFiles =
    (reviewData?.summary?.totalPhotos || 0) +
    (reviewData?.summary?.totalDocuments || 0) +
    (reviewData?.summary?.totalVideos || 0);


  // =====================================================
  // UPDATE DECLARATION
  // =====================================================

  const updateDeclaration = (
    field
  ) => {

    const updatedData = {

      ...declaration,

      [field]:
        !declaration?.[field],

    };

    onChange?.(
      updatedData
    );
  };


  // =====================================================
  // ALL DECLARATIONS COMPLETED
  // =====================================================

  const allConfirmed =
    informationCorrect &&
    photosGenuine &&
    investigationCompleted;


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
          SUBMIT TITLE
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
          Submit Verification
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
          DECLARATION CARD
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.white,

          borderRadius: 18,

          padding: 18,

          ...theme.shadows.card,
        }}
      >

        {/* CARD HEADER */}

        <View
          style={{
            flexDirection: "row",

            alignItems: "center",

            marginBottom:
              theme.spacing.lg,
          }}
        >

          <View
            style={{
              width: 42,

              height: 42,

              borderRadius: 10,

              backgroundColor:
                "#FFE5C7",

              alignItems: "center",

              justifyContent: "center",

              marginRight: 14,
            }}
          >

            <ClipboardCheck
              size={21}
              color="#FF641F"
            />

          </View>


          <Text
            style={{
              flex: 1,

              fontSize: 18,

              color:
                theme.colors.black,

              fontFamily:
                theme.fonts.medium,
            }}
          >
            Declaration of Accuracy
          </Text>

        </View>


        {/* DESCRIPTION */}

        <Text
          style={{
            fontSize: 15,

            lineHeight: 27,

            color:
              theme.colors.textSecondary,

            fontFamily:
              theme.fonts.regular,

            marginBottom:
              theme.spacing.xl,
          }}
        >
          By submitting this verification, you
          acknowledge that all investigation steps
          have been finalized. Please confirm the
          following statements to proceed with the
          final submission.
        </Text>


        {/* CHECKBOX 1 */}

        <DeclarationCheckbox
          checked={
            informationCorrect
          }

          onPress={() =>
            updateDeclaration(
              "informationCorrect"
            )
          }

          title="Information is correct"

          description="I certify that all textual data entered in the flow matches the official records provided."
        />


        {/* CHECKBOX 2 */}

        <DeclarationCheckbox
          checked={
            photosGenuine
          }

          onPress={() =>
            updateDeclaration(
              "photosGenuine"
            )
          }

          title="Photos are genuine"

          description="The photographic evidence uploaded was captured in real-time and has not been digitally altered."
        />


        {/* CHECKBOX 3 */}

        <DeclarationCheckbox
          checked={
            investigationCompleted
          }

          onPress={() =>
            updateDeclaration(
              "investigationCompleted"
            )
          }

          title="Investigation completed"

          description="I have reviewed all 6 steps and confirm that no further edits are required at this stage."
        />

      </View>


      {/* =================================================
          REVIEW API ERROR
      ================================================= */}

      {reviewError &&
        !reviewResponse ? (

        <View
          style={{
            marginTop:
              theme.spacing.lg,
          }}
        >

          <InlineRetry
            title="Unable to load submission summary"
            description="Something went wrong while loading the attached files."
            buttonText="Retry"
            loading={
              reviewLoadingState
            }
            onRetry={
              refetchReview
            }
          />

        </View>

      ) : (

        /* =================================================
            SUBMISSION SUMMARY
        ================================================= */

        <View
          style={{
            backgroundColor:
              "#F8F9FA",

            borderRadius: 18,

            padding: 18,

            marginTop:
              theme.spacing.lg,
          }}
        >

          {/* TITLE */}

          <Text
            style={{
              fontSize: 14,

              color:
                "#555A61",

              fontFamily:
                theme.fonts.semiBold,

              letterSpacing: 0.4,

              marginBottom:
                theme.spacing.md,
            }}
          >
            SUBMISSION SUMMARY
          </Text>


          {/* FILES */}

          <View
            style={{
              flexDirection: "row",

              justifyContent:
                "space-between",

              paddingVertical: 10,

              borderBottomWidth: 1,

              borderBottomColor:
                "#E5E7EB",
            }}
          >

            <Text
              style={{
                fontSize: 14,

                color:
                  theme.colors.gray700,

                fontFamily:
                  theme.fonts.regular,
              }}
            >
              Files Attached
            </Text>


            {reviewLoadingState ? (

              <ShimmerPlaceholder
                width={65}
                height={16}
                borderRadius={8}
              />

            ) : (

              <Text
                style={{
                  fontSize: 14,

                  color:
                    theme.colors.black,

                  fontFamily:
                    theme.fonts.semiBold,
                }}
              >
                {totalFiles} Items
              </Text>

            )}

          </View>


          {/* METADATA */}

          <View
            style={{
              flexDirection: "row",

              justifyContent:
                "space-between",

              paddingVertical: 10,

              borderBottomWidth: 1,

              borderBottomColor:
                "#E5E7EB",
            }}
          >

            <Text
              style={{
                fontSize: 14,

                color:
                  theme.colors.gray700,

                fontFamily:
                  theme.fonts.regular,
              }}
            >
              Metadata Status
            </Text>


            <Text
              style={{
                fontSize: 14,

                color:
                  allConfirmed
                    ? "#FF641F"
                    : "#D97706",

                fontFamily:
                  theme.fonts.medium,
              }}
            >
              {allConfirmed
                ? "Verified"
                : "Pending"}
            </Text>

          </View>


          {/* FINAL REVIEW */}

          <View
            style={{
              flexDirection: "row",

              justifyContent:
                "space-between",

              paddingTop: 10,
            }}
          >

            <Text
              style={{
                fontSize: 14,

                color:
                  theme.colors.gray700,

                fontFamily:
                  theme.fonts.regular,
              }}
            >
              Final Review
            </Text>


            <Text
              style={{
                fontSize: 14,

                color:
                  allConfirmed
                    ? "#FF641F"
                    : "#D97706",

                fontFamily:
                  theme.fonts.medium,
              }}
            >
              {allConfirmed
                ? "Ready"
                : "Pending"}
            </Text>

          </View>

        </View>

      )}

    </View>
  );
};


export default SubmitVerification;