import React, {
  memo,
  useEffect,
  useRef,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import {
  UserRoundCheck,
  Phone,
  Home,
  CalendarDays,
  FileText,
  RefreshCw,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";

import {
  useGetVisitorApplicationDetailsQuery,
} from "../../../../redux/features/visitor/visitorApi";


// =======================================================
// SHIMMER BLOCK
// =======================================================

const ShimmerBlock = ({
  width = "100%",
  height = 16,
  borderRadius = 6,
}) => {

  const translateX =
    useRef(
      new Animated.Value(-1)
    ).current;


  useEffect(() => {

    const animation =
      Animated.loop(

        Animated.timing(
          translateX,
          {
            toValue: 1,

            duration: 1100,

            easing:
              Easing.linear,

            useNativeDriver: true,
          }
        )

      );

    animation.start();

    return () => {
      animation.stop();
    };

  }, [translateX]);


  const translate =
    translateX.interpolate({
      inputRange: [-1, 1],
      outputRange: [-180, 180],
    });


  return (

    <View
      style={{
        width,
        height,
        borderRadius,
        overflow: "hidden",
        backgroundColor: "#ECEEEF",
      }}
    >

      <Animated.View
        style={{
          position: "absolute",

          top: 0,
          bottom: 0,

          width: 120,

          transform: [
            {
              translateX,
            },
          ],
        }}
      >

        <LinearGradient
          colors={[
            "#ECEEEF",
            "#FFFFFF",
            "#ECEEEF",
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
            flex: 1,
          }}
        />

      </Animated.View>

    </View>

  );
};


// =======================================================
// LOADING SKELETON
// =======================================================

const VerificationDetailsSkeleton = ({ }) => {



  return (

    <View
      style={{
        width: "100%",
      }}
    >

      {/* =================================================
          STATUS SKELETON
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.white,

          borderRadius: 18,

          paddingHorizontal:
            theme.spacing.lg,

          paddingVertical:
            theme.spacing.lg,

          marginBottom:
            theme.spacing.lg,

          ...theme.shadows.card,
        }}
      >

        <View
          style={{
            flexDirection: "row",

            alignItems: "center",

            justifyContent:
              "space-between",
          }}
        >

          <View
            style={{
              flex: 1,
            }}
          >

            <ShimmerBlock
              width={135}
              height={12}
            />

            <View
              style={{
                marginTop: 10,
              }}
            >

              <ShimmerBlock
                width={115}
                height={36}
                borderRadius={9}
              />

            </View>

          </View>


          <ShimmerBlock
            width={48}
            height={48}
            borderRadius={14}
          />

        </View>

      </View>


      {/* =================================================
          LOAN DETAILS SKELETON
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.white,

          borderRadius: 18,

          overflow: "hidden",

          ...theme.shadows.card,
        }}
      >

        {/* Header */}

        <View
          style={{
            minHeight: 56,

            flexDirection: "row",

            alignItems: "center",

            justifyContent:
              "space-between",

            paddingHorizontal:
              theme.spacing.lg,

            backgroundColor:
              "#FFF1E8",
          }}
        >

          <ShimmerBlock
            width={120}
            height={18}
          />

          <ShimmerBlock
            width={105}
            height={26}
            borderRadius={14}
          />

        </View>


        {/* Content */}

        <View
          style={{
            paddingHorizontal:
              theme.spacing.lg,

            paddingVertical:
              theme.spacing.xl,
          }}
        >

          {/* Customer */}

          <View
            style={{
              marginBottom:
                theme.spacing.lg,
            }}
          >

            <ShimmerBlock
              width={105}
              height={11}
            />

            <View
              style={{
                marginTop: 9,
              }}
            >

              <ShimmerBlock
                width="68%"
                height={27}
              />

            </View>

          </View>


          {/* Mobile */}

          <View
            style={{
              marginBottom:
                theme.spacing.lg,
            }}
          >

            <ShimmerBlock
              width={105}
              height={11}
            />

            <View
              style={{
                marginTop: 9,
                flexDirection: "row",
                alignItems: "center",
              }}
            >

              <ShimmerBlock
                width={20}
                height={20}
                borderRadius={10}
              />

              <View
                style={{
                  marginLeft: 10,
                }}
              >

                <ShimmerBlock
                  width={145}
                  height={18}
                />

              </View>

            </View>

          </View>


          {/* Product */}

          <View
            style={{
              marginBottom:
                theme.spacing.lg,
            }}
          >

            <ShimmerBlock
              width={85}
              height={11}
            />

            <View
              style={{
                marginTop: 9,
                flexDirection: "row",
                alignItems: "center",
              }}
            >

              <ShimmerBlock
                width={20}
                height={20}
                borderRadius={5}
              />

              <View
                style={{
                  marginLeft: 10,
                }}
              >

                <ShimmerBlock
                  width={110}
                  height={18}
                />

              </View>

            </View>

          </View>


          {/* Date */}

          <ShimmerBlock
            width={90}
            height={11}
          />

          <View
            style={{
              marginTop: 9,
              flexDirection: "row",
              alignItems: "center",
            }}
          >

            <ShimmerBlock
              width={20}
              height={20}
              borderRadius={5}
            />

            <View
              style={{
                marginLeft: 10,
              }}
            >

              <ShimmerBlock
                width={110}
                height={18}
              />

            </View>

          </View>

        </View>

      </View>

    </View>

  );
};


// =======================================================
// RETRY CARD
// =======================================================

const VerificationDetailsRetry = ({
  onRetry,
  isFetching,

}) => {

  return (

    <View
      style={{
        width: "100%",

        backgroundColor:
          theme.colors.white,

        borderRadius: 18,

        paddingHorizontal:
          theme.spacing.xl,

        paddingVertical:
          30,

        alignItems: "center",

        ...theme.shadows.card,
      }}
    >

      <View
        style={{
          width: 48,

          height: 48,

          borderRadius: 14,

          backgroundColor:
            "#FFF1E8",

          alignItems: "center",

          justifyContent: "center",

          marginBottom: 14,
        }}
      >

        <RefreshCw
          size={23}
          color="#FF641F"
          strokeWidth={2.2}
        />

      </View>


      <Text
        style={{
          fontSize:
            theme.typography.b2,

          color:
            theme.colors.black,

          fontFamily:
            theme.fonts.semiBold,

          textAlign: "center",
        }}
      >
        Unable to load customer details
      </Text>


      <Text
        style={{
          marginTop: 6,

          fontSize:
            theme.typography.b3,

          color:
            theme.colors.textSecondary,

          fontFamily:
            theme.fonts.regular,

          textAlign: "center",

          lineHeight: 20,
        }}
      >
        Please check your connection and try again.
      </Text>


      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onRetry}
        disabled={isFetching}
        style={{
          marginTop: 18,

          minWidth: 120,

          height: 42,

          paddingHorizontal: 18,

          borderRadius: 9,

          backgroundColor:
            "#FF641F",

          alignItems: "center",

          justifyContent: "center",

          flexDirection: "row",

          opacity:
            isFetching ? 0.6 : 1,
        }}
      >

        <RefreshCw
          size={17}
          color="#FFFFFF"
          strokeWidth={2.2}
        />

        <Text
          style={{
            marginLeft: 7,

            color: "#FFFFFF",

            fontSize:
              theme.typography.b3,

            fontFamily:
              theme.fonts.semiBold,
          }}
        >
          {isFetching
            ? "Retrying..."
            : "Retry"}
        </Text>

      </TouchableOpacity>

    </View>

  );
};


// =======================================================
// MAIN COMPONENT
// =======================================================

const VerificationDetails = ({
  job,
  data,
  onChange,
  onRefetchReady,
}) => {

  // =====================================================
  // LOAN ID
  // =====================================================

  const loanId =
    job?.loanId || null;


  // =====================================================
  // APPLICATION DETAILS API
  // =====================================================

  const {
    data: applicationResponse,

    isLoading,

    isFetching,

    isError,

    refetch,

  } =
    useGetVisitorApplicationDetailsQuery(
      loanId,
      {
        skip: !loanId,
      }
    );


  // =====================================================
  // API DATA
  // =====================================================

  const applicationData =
    applicationResponse?.data ||
    applicationResponse?.result ||
    applicationResponse ||
    {};


  // =====================================================
  // CUSTOMER
  // =====================================================

  const customer =
    applicationData?.customer ||
    job?.customer ||
    {};


  // =====================================================
  // LOAN
  // =====================================================

  const loan =
    applicationData?.loan ||
    {};


  // =====================================================
  // PRODUCT
  // =====================================================

  const product =
    applicationData?.product ||
    loan?.product ||
    job?.product ||
    {};


  // =====================================================
  // STATUS
  // =====================================================

  const verificationStatus =
    applicationData?.verificationStatus ||
    applicationData?.status ||
    job?.verificationStatus ||
    job?.status ||
    "ASSIGNED";


  // =====================================================
  // STATUS TEXT
  // =====================================================

  const getStatusText = () => {

    switch (verificationStatus) {

      case "IN_PROGRESS":
        return "In Progress";

      case "SUBMITTED":
        return "Submitted";

      case "COMPLETED":
        return "Completed";

      case "REJECTED":
        return "Rejected";

      case "PENDING":
        return "Pending";

      case "ASSIGNED":
      default:
        return "Assigned";

    }

  };


  // =====================================================
  // STATUS COLORS
  // =====================================================

  const getStatusColors = () => {

    switch (verificationStatus) {

      case "IN_PROGRESS":

        return {
          background: "#FFF4D6",
          border: "#F5D58A",
          text: "#806500",
          dot: "#D9A400",
        };


      case "SUBMITTED":
      case "COMPLETED":

        return {
          background: "#E8F7ED",
          border: "#B9E5C7",
          text: "#24763D",
          dot: "#28A745",
        };


      case "REJECTED":

        return {
          background: "#FFE8E8",
          border: "#F5BABA",
          text: "#A12D2D",
          dot: "#D32323",
        };


      case "PENDING":

        return {
          background: "#FFF1E8",
          border: "#FFD1B5",
          text: "#A64A22",
          dot: "#FF641F",
        };


      case "ASSIGNED":
      default:

        return {
          background: "#FFF1E8",
          border: "#FFCFB5",
          text: "#292929",
          dot: "#FF641F",
        };

    }

  };


  const statusColors =
    getStatusColors();


  // =====================================================
  // DATE FORMATTER
  // =====================================================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    const parsedDate =
      new Date(date);

    if (
      Number.isNaN(
        parsedDate.getTime()
      )
    ) {
      return "-";
    }

    return parsedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };



useEffect(() => {
  onRefetchReady?.(() => refetch);

  return () => {
    onRefetchReady?.(null);
  };
}, [refetch, onRefetchReady]);
  // =====================================================
  // DISPLAY DATA
  // =====================================================

  const displayLoanId =
    loan?.loanId ||
    applicationData?.loanId ||
    loanId ||
    "-";


  const customerName =
    customer?.name ||
    customer?.fullName ||
    "-";


  const customerMobile =
    customer?.mobile ||
    customer?.phone ||
    "-";


  const loanProduct =
    product?.name ||
    product?.displayName ||
    loan?.productName ||
    "Loan";


  const assignedDate =
    formatDate(
      applicationData?.assignedAt ||
      job?.assignedAt
    );


  // =====================================================
  // LOADING
  // =====================================================

  if (
    isLoading ||
    isFetching
  ) {

    return (
      <VerificationDetailsSkeleton />
    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (isError) {

    return (

      <VerificationDetailsRetry
        onRetry={refetch}
        isFetching={isFetching}
      />

    );

  }


  // =====================================================
  // NO LOAN ID
  // =====================================================

  if (!loanId) {

    return (

      <VerificationDetailsRetry
        onRetry={() => { }}
        isFetching={false}
      />

    );

  }


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
          VERIFICATION STATUS
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.white,

          borderRadius: 18,

          paddingHorizontal:
            theme.spacing.lg,

          paddingVertical:
            theme.spacing.lg,

          marginBottom:
            theme.spacing.lg,

          ...theme.shadows.card,
        }}
      >

        <View
          style={{
            flexDirection: "row",

            alignItems: "center",

            justifyContent:
              "space-between",
          }}
        >

          <View
            style={{
              flex: 1,
            }}
          >

            <Text
              style={{
                fontSize:
                  theme.typography.b3,

                color:
                  theme.colors.textSecondary,

                fontFamily:
                  theme.fonts.medium,

                marginBottom: 6,
              }}
            >
              VERIFICATION STATUS
            </Text>


            <View
              style={{
                alignSelf:
                  "flex-start",

                flexDirection: "row",

                alignItems: "center",

                paddingHorizontal: 12,

                paddingVertical: 8,

                borderRadius: 9,

                backgroundColor:
                  statusColors.background,

                borderWidth: 1,

                borderColor:
                  statusColors.border,
              }}
            >

              <View
                style={{
                  width: 8,

                  height: 8,

                  borderRadius: 4,

                  backgroundColor:
                    statusColors.dot,

                  marginRight: 10,
                }}
              />

              <Text
                style={{
                  fontSize:
                    theme.typography.b2,

                  color:
                    statusColors.text,

                  fontFamily:
                    theme.fonts.semiBold,
                }}
              >
                {getStatusText()}
              </Text>

            </View>

          </View>


          <View
            style={{
              width: 48,

              height: 48,

              borderRadius: 14,

              backgroundColor:
                "#FFF8EF",

              alignItems: "center",

              justifyContent: "center",
            }}
          >

            <UserRoundCheck
              size={24}
              color="#FF641F"
              strokeWidth={2}
            />

          </View>

        </View>

      </View>


      {/* =================================================
          LOAN DETAILS
      ================================================= */}

      <View
        style={{
          backgroundColor:
            theme.colors.white,

          borderRadius: 18,

          overflow: "hidden",

          marginBottom:
            theme.spacing.lg,

          ...theme.shadows.card,
        }}
      >

        {/* Header */}

        <View
          style={{
            minHeight: 56,

            flexDirection: "row",

            alignItems: "center",

            justifyContent:
              "space-between",

            paddingHorizontal:
              theme.spacing.lg,

            backgroundColor:
              "#FFF1E8",
          }}
        >

          <View
            style={{
              flexDirection: "row",

              alignItems: "center",
            }}
          >

            <FileText
              size={21}
              color="#FF641F"
              strokeWidth={2}
            />

            <Text
              style={{
                marginLeft: 10,

                fontSize:
                  theme.typography.b2,

                color:
                  theme.colors.black,

                fontFamily:
                  theme.fonts.headingSemiBold,

                letterSpacing: 0.4,
              }}
            >
              LOAN DETAILS
            </Text>

          </View>


          <View
            style={{
              maxWidth: "45%",

              paddingHorizontal: 10,

              paddingVertical: 6,

              borderRadius: 14,

              backgroundColor:
                "#FFF8F3",
            }}
          >

            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize: 11,

                color: "#FF8752",

                fontFamily:
                  theme.fonts.medium,
              }}
            >
              {displayLoanId}
            </Text>

          </View>

        </View>


        {/* Details */}

        <View
          style={{
            paddingHorizontal:
              theme.spacing.lg,

            paddingVertical:
              theme.spacing.xl,
          }}
        >

          {/* Customer Name */}

          <View
            style={{
              marginBottom:
                theme.spacing.lg,
            }}
          >

            <Text
              style={{
                fontSize: 12,

                color:
                  theme.colors.textSecondary,

                fontFamily:
                  theme.fonts.medium,

                marginBottom: 7,
              }}
            >
              CUSTOMER NAME
            </Text>

            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                fontSize:
                  theme.typography.h3,

                color:
                  theme.colors.black,

                fontFamily:
                  theme.fonts.headingSemiBold,
              }}
            >
              {customerName}
            </Text>

          </View>


          {/* Mobile */}

          <View
            style={{
              marginBottom:
                theme.spacing.lg,
            }}
          >

            <Text
              style={{
                fontSize: 12,

                color:
                  theme.colors.textSecondary,

                fontFamily:
                  theme.fonts.medium,

                marginBottom: 7,
              }}
            >
              MOBILE NUMBER
            </Text>

            <View
              style={{
                flexDirection: "row",

                alignItems: "center",
              }}
            >

              <Phone
                size={19}
                color="#0066D6"
                strokeWidth={2}
              />

              <Text
                numberOfLines={1}
                style={{
                  flex: 1,

                  marginLeft: 10,

                  fontSize:
                    theme.typography.b1,

                  color:
                    theme.colors.black,

                  fontFamily:
                    theme.fonts.medium,
                }}
              >
                {customerMobile}
              </Text>

            </View>

          </View>


          {/* Loan Product */}

          <View
            style={{
              marginBottom:
                theme.spacing.lg,
            }}
          >

            <Text
              style={{
                fontSize: 12,

                color:
                  theme.colors.textSecondary,

                fontFamily:
                  theme.fonts.medium,

                marginBottom: 7,
              }}
            >
              LOAN PRODUCT
            </Text>

            <View
              style={{
                flexDirection: "row",

                alignItems: "center",
              }}
            >

              <Home
                size={20}
                color="#0066D6"
                strokeWidth={2}
              />

              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  flex: 1,

                  marginLeft: 10,

                  fontSize:
                    theme.typography.b1,

                  color:
                    theme.colors.black,

                  fontFamily:
                    theme.fonts.medium,
                }}
              >
                {loanProduct}
              </Text>

            </View>

          </View>


          {/* Assigned Date */}

          <View>

            <Text
              style={{
                fontSize: 12,

                color:
                  theme.colors.textSecondary,

                fontFamily:
                  theme.fonts.medium,

                marginBottom: 7,
              }}
            >
              ASSIGNED DATE
            </Text>

            <View
              style={{
                flexDirection: "row",

                alignItems: "center",
              }}
            >

              <CalendarDays
                size={19}
                color="#555A61"
                strokeWidth={2}
              />

              <Text
                style={{
                  marginLeft: 10,

                  fontSize:
                    theme.typography.b2,

                  color:
                    theme.colors.black,

                  fontFamily:
                    theme.fonts.medium,
                }}
              >
                {assignedDate}
              </Text>

            </View>

          </View>

        </View>

      </View>

    </View>

  );

};


export default memo(
  VerificationDetails
);