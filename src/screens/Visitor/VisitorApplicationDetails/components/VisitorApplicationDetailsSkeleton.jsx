import React from "react";

import {
  View,
} from "react-native";

 

import { theme } from "../../../../theme";
import ShimmerPlaceholder from "../../../../components/common/Loader/ShimmerPlaceholder";


// =====================================================
// VISITOR APPLICATION DETAILS SKELETON
// =====================================================

const VisitorApplicationDetailsSkeleton = () => {

  // =====================================================
  // COMMON CARD STYLE
  // =====================================================

  const cardStyle = {
    backgroundColor:
      theme.colors.white,

    borderRadius:
      theme.radius.xl,

    padding:
      theme.spacing.xl,

    marginBottom:
      theme.spacing.lg,
  };


  // =====================================================
  // CHECKLIST SKELETON ROW
  // =====================================================

  const checklistRows = [1, 2, 3, 4];


  return (
    <View>

      {/* =================================================
          LOAN OVERVIEW CARD
      ================================================= */}

      <View style={cardStyle}>

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

          <ShimmerPlaceholder
            width={150}
            height={22}
            borderRadius={6}
          />

          <ShimmerPlaceholder
            width={75}
            height={24}
            borderRadius={12}
          />

        </View>


        <ShimmerPlaceholder
          width="70%"
          height={16}
          borderRadius={5}
          style={{
            marginBottom:
              theme.spacing.md,
          }}
        />

        <ShimmerPlaceholder
          width="90%"
          height={16}
          borderRadius={5}
        />

      </View>


      {/* =================================================
          CUSTOMER DETAILS CARD
      ================================================= */}

      <View style={cardStyle}>

        <ShimmerPlaceholder
          width={145}
          height={22}
          borderRadius={6}
          style={{
            marginBottom:
              theme.spacing.lg,
          }}
        />

        <ShimmerPlaceholder
          width="65%"
          height={18}
          borderRadius={5}
          style={{
            marginBottom:
              theme.spacing.md,
          }}
        />

        <ShimmerPlaceholder
          width="50%"
          height={16}
          borderRadius={5}
          style={{
            marginBottom:
              theme.spacing.md,
          }}
        />

        <ShimmerPlaceholder
          width="90%"
          height={16}
          borderRadius={5}
          style={{
            marginBottom:
              theme.spacing.sm,
          }}
        />

        <ShimmerPlaceholder
          width="75%"
          height={16}
          borderRadius={5}
        />

      </View>


      {/* =================================================
          LOAN & PROPERTY CARD
      ================================================= */}

      <View style={cardStyle}>

        <ShimmerPlaceholder
          width={160}
          height={22}
          borderRadius={6}
          style={{
            marginBottom:
              theme.spacing.lg,
          }}
        />


        {/* ROW 1 */}

        <View
          style={{
            flexDirection: "row",

            justifyContent:
              "space-between",

            marginBottom:
              theme.spacing.md,
          }}
        >

          <ShimmerPlaceholder
            width="42%"
            height={16}
            borderRadius={5}
          />

          <ShimmerPlaceholder
            width="30%"
            height={16}
            borderRadius={5}
          />

        </View>


        {/* ROW 2 */}

        <View
          style={{
            flexDirection: "row",

            justifyContent:
              "space-between",

            marginBottom:
              theme.spacing.md,
          }}
        >

          <ShimmerPlaceholder
            width="48%"
            height={16}
            borderRadius={5}
          />

          <ShimmerPlaceholder
            width="32%"
            height={16}
            borderRadius={5}
          />

        </View>


        {/* PROPERTY */}

        <ShimmerPlaceholder
          width="85%"
          height={16}
          borderRadius={5}
        />

      </View>


      {/* =================================================
          VERIFICATION PROGRESS CARD
      ================================================= */}

      <View style={cardStyle}>

        {/* HEADER */}

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

          <ShimmerPlaceholder
            width={175}
            height={22}
            borderRadius={6}
          />

          <ShimmerPlaceholder
            width={80}
            height={16}
            borderRadius={5}
          />

        </View>


        {/* CHECKLIST */}

        {checklistRows.map(
          (item, index) => (

            <View
              key={item}
              style={{
                minHeight: 53,

                backgroundColor:
                  theme.colors.gray100,

                borderRadius:
                  theme.radius.md,

                paddingHorizontal:
                  theme.spacing.md,

                flexDirection: "row",

                alignItems: "center",

                marginBottom:
                  index ===
                  checklistRows.length - 1
                    ? 0
                    : theme.spacing.sm,
              }}
            >

              {/* CIRCLE */}

              <ShimmerPlaceholder
                width={22}
                height={22}
                borderRadius={11}
              />


              {/* TITLE */}

              <ShimmerPlaceholder
                width="45%"
                height={16}
                borderRadius={5}
                style={{
                  marginLeft:
                    theme.spacing.md,
                }}
              />


              {/* STATUS */}

              <ShimmerPlaceholder
                width={60}
                height={15}
                borderRadius={5}
                style={{
                  marginLeft: "auto",
                }}
              />

            </View>

          )
        )}

      </View>


      {/* =================================================
          INVESTIGATION CARD
      ================================================= */}

      <View style={cardStyle}>

        <ShimmerPlaceholder
          width={135}
          height={22}
          borderRadius={6}
          style={{
            marginBottom:
              theme.spacing.lg,
          }}
        />

        <ShimmerPlaceholder
          width="90%"
          height={16}
          borderRadius={5}
          style={{
            marginBottom:
              theme.spacing.md,
          }}
        />

        <ShimmerPlaceholder
          width="65%"
          height={16}
          borderRadius={5}
          style={{
            marginBottom:
              theme.spacing.md,
          }}
        />

        <ShimmerPlaceholder
          width="45%"
          height={16}
          borderRadius={5}
        />

      </View>


      {/* =================================================
          LOCATION CARD
      ================================================= */}

      <View style={cardStyle}>

        <ShimmerPlaceholder
          width={110}
          height={22}
          borderRadius={6}
          style={{
            marginBottom:
              theme.spacing.lg,
          }}
        />

        <ShimmerPlaceholder
          width="90%"
          height={16}
          borderRadius={5}
          style={{
            marginBottom:
              theme.spacing.md,
          }}
        />

        <ShimmerPlaceholder
          width="70%"
          height={16}
          borderRadius={5}
        />

      </View>


      {/* =================================================
          VERIFICATION PHOTOS CARD
      ================================================= */}

      <View style={cardStyle}>

        <ShimmerPlaceholder
          width={170}
          height={22}
          borderRadius={6}
          style={{
            marginBottom:
              theme.spacing.lg,
          }}
        />


        <View
          style={{
            flexDirection: "row",

            justifyContent:
              "space-between",
          }}
        >

          <ShimmerPlaceholder
            width="31%"
            height={90}
            borderRadius={
              theme.radius.md
            }
          />

          <ShimmerPlaceholder
            width="31%"
            height={90}
            borderRadius={
              theme.radius.md
            }
          />

          <ShimmerPlaceholder
            width="31%"
            height={90}
            borderRadius={
              theme.radius.md
            }
          />

        </View>

      </View>


      {/* =================================================
          WITNESS DETAILS CARD
      ================================================= */}

      <View style={cardStyle}>

        <ShimmerPlaceholder
          width={145}
          height={22}
          borderRadius={6}
          style={{
            marginBottom:
              theme.spacing.lg,
          }}
        />

        <ShimmerPlaceholder
          width="70%"
          height={16}
          borderRadius={5}
          style={{
            marginBottom:
              theme.spacing.md,
          }}
        />

        <ShimmerPlaceholder
          width="50%"
          height={16}
          borderRadius={5}
        />

      </View>


      {/* =================================================
          CUSTOMER CONSENT CARD
      ================================================= */}

      <View style={cardStyle}>

        <ShimmerPlaceholder
          width={155}
          height={22}
          borderRadius={6}
          style={{
            marginBottom:
              theme.spacing.lg,
          }}
        />

        <ShimmerPlaceholder
          width="80%"
          height={16}
          borderRadius={5}
          style={{
            marginBottom:
              theme.spacing.md,
          }}
        />

        <ShimmerPlaceholder
          width="55%"
          height={16}
          borderRadius={5}
        />

      </View>


      {/* =================================================
          VISITOR DECLARATION CARD
      ================================================= */}

      <View style={cardStyle}>

        <ShimmerPlaceholder
          width={175}
          height={22}
          borderRadius={6}
          style={{
            marginBottom:
              theme.spacing.lg,
          }}
        />

        <ShimmerPlaceholder
          width="90%"
          height={16}
          borderRadius={5}
          style={{
            marginBottom:
              theme.spacing.md,
          }}
        />

        <ShimmerPlaceholder
          width="75%"
          height={16}
          borderRadius={5}
        />

      </View>


      {/* =================================================
          REMARKS CARD
      ================================================= */}

      <View style={cardStyle}>

        <ShimmerPlaceholder
          width={95}
          height={22}
          borderRadius={6}
          style={{
            marginBottom:
              theme.spacing.lg,
          }}
        />

        <ShimmerPlaceholder
          width="100%"
          height={70}
          borderRadius={
            theme.radius.md
          }
        />

      </View>

    </View>
  );
};


export default VisitorApplicationDetailsSkeleton;