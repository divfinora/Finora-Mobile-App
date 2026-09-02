import React from "react";

import {
  View,
  Text,
} from "react-native";

import {
  Circle,
  Check,
} from "lucide-react-native";

import { theme } from "../../../../theme";


// =====================================================
// VERIFICATION PROGRESS CARD
// =====================================================

const VerificationProgressCard = ({
  progress = {},
  checklist = [],
}) => {

  // =====================================================
  // CHECKLIST
  // =====================================================

  const steps =
    Array.isArray(progress?.checklist)
      ? progress.checklist
      : Array.isArray(checklist)
      ? checklist
      : [];


  // =====================================================
  // CHECK COMPLETED
  // =====================================================

  const isCompleted = (item) => {
    return item?.completed === true;
  };


  // =====================================================
  // COMPLETED COUNT
  // =====================================================

  const completedCount =
    steps.filter(
      (item) => isCompleted(item)
    ).length;


  // =====================================================
  // TOTAL COUNT
  // =====================================================

  const totalCount =
    steps.length;


  // =====================================================
  // COLORS
  // =====================================================

  const completedBackground =
    "#EAF7EF";

  const completedColor =
    theme.colors.success500;

  const completedText =
    "#247A45";


  // =====================================================
  // UI
  // =====================================================

  return (
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

          marginBottom:
            theme.spacing.lg,
        }}
      >

        {/* TITLE */}

        <Text
          style={{
            fontSize:
              theme.typography.h5,

            fontFamily:
              theme.fonts.headingBold,

            color:
              theme.colors.textPrimary,
          }}
        >
          Verification Progress
        </Text>


        {/* COMPLETED COUNT */}

        <Text
          style={{
            fontSize:
              theme.typography.b4,

            fontFamily:
              theme.fonts.semiBold,

            color:
              theme.colors.textSecondary,
          }}
        >
          {completedCount}/{totalCount} Completed
        </Text>

      </View>


      {/* =================================================
          CHECKLIST
      ================================================= */}

      {steps.map(
        (item, index) => {

          const completed =
            isCompleted(item);


          return (
            <View
              key={
                item?.key ||
                item?.id ||
                item?._id ||
                `${item?.title}-${index}`
              }
              style={{
                minHeight: 53,

                backgroundColor:
                  completed
                    ? completedBackground
                    : theme.colors.gray100,

                borderRadius:
                  theme.radius.md,

                paddingHorizontal:
                  theme.spacing.md,

                flexDirection: "row",

                alignItems: "center",

                marginBottom:
                  index === steps.length - 1
                    ? 0
                    : theme.spacing.sm,
              }}
            >

              {/* =================================================
                  STATUS ICON
              ================================================= */}

              <View
                style={{
                  width: 22,

                  height: 22,

                  borderRadius: 11,

                  borderWidth:
                    completed
                      ? 0
                      : 2,

                  borderColor:
                    completed
                      ? completedColor
                      : theme.colors.gray300,

                  backgroundColor:
                    completed
                      ? completedColor
                      : "transparent",

                  alignItems: "center",

                  justifyContent: "center",
                }}
              >

                {completed ? (

                  <Check
                    size={14}

                    color={
                      theme.colors.white
                    }

                    strokeWidth={3}
                  />

                ) : (

                  <Circle
                    size={16}

                    color={
                      theme.colors.gray300
                    }

                    strokeWidth={2}
                  />

                )}

              </View>


              {/* =================================================
                  TITLE
              ================================================= */}

              <Text
                style={{
                  flex: 1,

                  marginLeft:
                    theme.spacing.md,

                  fontSize:
                    theme.typography.b3,

                  fontFamily:
                    theme.fonts.medium,

                  color:
                    completed
                      ? completedText
                      : theme.colors.textSecondary,
                }}

                numberOfLines={1}
              >
                {item?.title ||
                  "Verification"}
              </Text>


              {/* =================================================
                  STATUS
              ================================================= */}

              <Text
                style={{
                  marginLeft:
                    theme.spacing.sm,

                  fontSize:
                    theme.typography.b4,

                  fontFamily:
                    theme.fonts.medium,

                  color:
                    completed
                      ? completedColor
                      : theme.colors.textSecondary,
                }}
              >
                {completed
                  ? "Completed"
                  : "Pending"}
              </Text>

            </View>
          );
        }
      )}

    </View>
  );
};


export default VerificationProgressCard;