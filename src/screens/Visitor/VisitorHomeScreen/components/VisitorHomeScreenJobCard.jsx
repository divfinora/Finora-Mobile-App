import React, {
  memo,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  MapPin,
  CalendarDays,
  Phone,
  WalletCards,
  ArrowRight,
  IndianRupee,
  CircleAlert,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";


const VisitorHomeScreenJobCard = ({
  item,
  onPress,
}) => {

  // =====================================================
  // API OBJECTS
  // =====================================================

  const customer =
    item?.customer || {};

  const product =
    item?.product || {};


  // =====================================================
  // CUSTOMER NAME
  // =====================================================

  const customerName =
    customer?.name ||
    customer?.fullName ||
    "Customer";


  // =====================================================
  // CUSTOMER INITIALS
  // First + Last word
  // Rahul Sharma -> RS
  // Aman Verma -> AV
  // Neha Gupta -> NG
  // =====================================================

  const nameParts =
    customerName
      .trim()
      .split(/\s+/)
      .filter(Boolean);


  const customerInitials =
    nameParts.length >= 2
      ? `${nameParts[0]?.[0] || ""}${nameParts[nameParts.length - 1]?.[0] || ""}`
      : nameParts[0]?.slice(0, 2) || "CU";


  const initials =
    customerInitials
      .toUpperCase();


  // =====================================================
  // AVATAR COLOR
  // Different customer = different Figma-like color
  // =====================================================

  const avatarColors = [
    {
      background: "#DCE7FF",
      text: "#1558C4",
    },
    {
      background: "#E5DC00",
      text: "#5D5700",
    },
    {
      background: "#FFD9D9",
      text: "#A33333",
    },
    {
      background: "#DDF5E7",
      text: "#16703A",
    },
    {
      background: "#FFE5C7",
      text: "#A45B00",
    },
    {
      background: "#E7DFFF",
      text: "#6844B5",
    },
    {
      background: "#D9F0F4",
      text: "#147181",
    },
  ];


  // Deterministic color from customer name
  const avatarIndex =
    customerName
      .split("")
      .reduce(
        (
          total,
          character
        ) =>
          total +
          character.charCodeAt(0),
        0
      ) %
    avatarColors.length;


  const avatarColor =
    avatarColors[
      avatarIndex
    ];


  // =====================================================
  // PRODUCT
  // =====================================================

  const productName =
    product?.name ||
    product?.displayName ||
    "Loan";


  // =====================================================
  // STATUS
  // =====================================================

  const rawStatus =
    item?.verificationStatus ||
    item?.status ||
    "ASSIGNED";


  const status =
    String(rawStatus)
      .trim()
      .toUpperCase();


  // =====================================================
  // STATUS CONFIG
  // =====================================================

  const getStatusConfig = () => {

    switch (status) {

      // ===============================================
      // ASSIGNED
      // ===============================================

      case "ASSIGNED":

      case "VISITOR_ASSIGNED":

        return {
          text: "ASSIGNED",
          backgroundColor: "#DCE7FF",
          color: "#1654C7",
        };


      // ===============================================
      // IN PROGRESS
      // ===============================================

      case "IN_PROGRESS":

      case "VISITOR_IN_PROGRESS":

        return {
          text: "IN PROGRESS",
          backgroundColor: "#E6D900",
          color: "#5C5600",
        };


      // ===============================================
      // SUBMITTED
      // ===============================================

      case "SUBMITTED":

      case "VISITOR_SUBMITTED":

        return {
          text: "SUBMITTED",
          backgroundColor: "#D7F3DF",
          color: "#16703A",
        };


      // ===============================================
      // PENDING
      // ===============================================

      case "PENDING":

      case "VISITOR_PENDING":

        return {
          text: "PENDING",
          backgroundColor: "#FFD8D8",
          color: "#9D3333",
        };


      // ===============================================
      // COMPLETED
      // ===============================================

      case "COMPLETED":

      case "VISITOR_COMPLETED":

        return {
          text: "COMPLETED",
          backgroundColor: "#D7F3DF",
          color: "#16703A",
        };


      // ===============================================
      // REJECTED
      // ===============================================

      case "REJECTED":

      case "VISITOR_REJECTED":

        return {
          text: "REJECTED",
          backgroundColor: "#FFE1E1",
          color: "#B42318",
        };


      // ===============================================
      // CANCELLED
      // ===============================================

      case "CANCELLED":

      case "VISITOR_CANCELLED":

        return {
          text: "CANCELLED",
          backgroundColor: "#FFE1E1",
          color: "#B42318",
        };


      // ===============================================
      // FAILED
      // ===============================================

      case "FAILED":

      case "VISITOR_FAILED":

        return {
          text: "FAILED",
          backgroundColor: "#FFE1E1",
          color: "#B42318",
        };


      // ===============================================
      // DEFAULT
      // ===============================================

      default:

        return {
          text: String(rawStatus)
            .replaceAll("_", " ")
            .toUpperCase(),

          backgroundColor:
            theme.colors.gray200 ||
            "#E5E7EB",

          color:
            theme.colors.gray700 ||
            "#4B5563",
        };

    }

  };


  const statusConfig =
    getStatusConfig();


  // =====================================================
  // PRIORITY
  // =====================================================

  const priority =
    String(
      item?.priority || ""
    )
      .trim()
      .toUpperCase();


  const getPriorityConfig = () => {

    switch (priority) {

      case "HIGH":

        return {
          backgroundColor: "#FFE1E1",
          color: "#B42318",
          text: "HIGH",
        };


      case "MEDIUM":

        return {
          backgroundColor: "#FFF0C2",
          color: "#8A5A00",
          text: "MEDIUM",
        };


      case "LOW":

        return {
          backgroundColor: "#E8F1FF",
          color: "#2457A6",
          text: "LOW",
        };


      default:

        return null;

    }

  };


  const priorityConfig =
    getPriorityConfig();


  // =====================================================
  // DATE FORMATTER
  // =====================================================

  const formatDate = (
    dateValue
  ) => {

    if (!dateValue) {
      return "Today";
    }


    const date =
      new Date(dateValue);


    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "Today";
    }


    return date.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };


  const assignedDate =
    formatDate(
      item?.assignedAt ||
      item?.assignedDate ||
      item?.date
    );


  // =====================================================
  // AMOUNT
  // =====================================================

  const formatAmount = (
    amount
  ) => {

    if (
      amount === null ||
      amount === undefined ||
      amount === ""
    ) {
      return null;
    }


    const numericAmount =
      Number(amount);


    if (
      Number.isNaN(
        numericAmount
      )
    ) {
      return String(amount);
    }


    return numericAmount.toLocaleString(
      "en-IN"
    );

  };


  const amount =
    formatAmount(
      item?.amount
    );


  // =====================================================
  // APPLICATION ID
  // =====================================================

  const applicationId =
    item?.applicationId ||
    item?.loanId ||
    item?.verificationId ||
    "-";


  // =====================================================
  // LOCATION
  // =====================================================

  const location =
    item?.location ||
    item?.address ||
    customer?.location ||
    customer?.address ||
    null;


  // =====================================================
  // PHONE
  // =====================================================

  const phone =
    customer?.mobile ||
    null;


  // =====================================================
  // THEME + FIGMA COLORS
  // =====================================================

  const textColor =
    theme.colors.text ||
    "#202020";


  const secondaryTextColor =
    theme.colors.textSecondary ||
    "#77777D";


  const whiteColor =
    theme.colors.white ||
    "#FFFFFF";


  const borderColor =
    theme.colors.gray200 ||
    "#EEEEEE";


  const primaryColor =
    theme.colors.primary500 ||
    "#FF641F";


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <View
      style={{
        marginHorizontal:
          theme.spacing.xxl ||
          24,

        marginBottom:
          theme.spacing.lg ||
          16,

        backgroundColor:
          whiteColor,

        borderRadius:
          theme.radius.lg ||
          16,

        padding:
          theme.spacing.lg ||
          16,

        borderWidth: 0.4,

        borderColor:
          borderColor,

        ...  theme.shadows?.card     ,
      }}
    >

      {/* =================================================
          CUSTOMER HEADER
      ================================================= */}

      <View
        style={{
          flexDirection: "row",

          alignItems: "center",
        }}
      >

        {/* =================================================
            CUSTOMER AVATAR
        ================================================= */}

        <View
          style={{
            width: 44,

            height: 44,

            borderRadius: 22,

            backgroundColor:
              avatarColor.background,

            justifyContent: "center",

            alignItems: "center",

            flexShrink: 0,
          }}
        >

          <Text
            style={{
              fontSize:
                theme.typography.b1  ,
            

              color:
                avatarColor.text,

              fontFamily:
                theme.fonts.bold,

              lineHeight: 18,
            }}
          >
            {initials} 
          </Text>

        </View>


        {/* =================================================
            CUSTOMER INFO
        ================================================= */}

        <View
          style={{
            flex: 1,

            minWidth: 0,

            marginLeft:
              theme.spacing.md ||
              12,

            marginRight:
              theme.spacing.sm ||
              10,
          }}
        >

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: theme.typography.h3,

              color:
                textColor,

              fontFamily:
                theme.fonts.medium,
            }}
          >
            {customerName}
          </Text>


          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
             
               

              fontSize:
                theme.typography.b3  ,
              

              color:
                '#76777D',

              fontFamily:
                theme.fonts.bold,
            }}
          >
            ID: {applicationId}
          </Text>

        </View>


        {/* =================================================
            STATUS BADGE
        ================================================= */}

        <View
          style={{
            maxWidth: 108,

            paddingHorizontal:
              theme.spacing.sm ||
              10,

            paddingVertical:
              theme.spacing.xs ||
              6,

            borderRadius:
              theme.radius.full ||
              14,

            backgroundColor:
              statusConfig.backgroundColor,

            flexShrink: 0,
          }}
        >

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              fontSize: 10,

              color:
                statusConfig.color,

              fontFamily:
                theme.fonts.bold,

              textAlign: "center",

              letterSpacing: 0.2,
            }}
          >
            {statusConfig.text}
          </Text>

        </View>

      </View>


      {/* =================================================
          PRIORITY
      ================================================= */}

      {priorityConfig && (

        <View
          style={{
            flexDirection: "row",

            alignItems: "center",

            marginTop:
              theme.spacing.md ||
              12,
          }}
        >

          <View
            style={{
              flexDirection: "row",

              alignItems: "center",

              backgroundColor:
                priorityConfig.backgroundColor,

              paddingHorizontal:
                theme.spacing.sm ||
                8,

              paddingVertical:
                theme.spacing.xs ||
                4,

              borderRadius:
                theme.radius.md ||
                10,
            }}
          >

            <CircleAlert
              size={13}
              color={
                priorityConfig.color
              }
              strokeWidth={2}
            />


            <Text
              style={{
                marginLeft:
                  theme.spacing.xs ||
                  4,

                fontSize: 10,

                color:
                  priorityConfig.color,

                fontFamily:
                  theme.fonts.semiBold,
              }}
            >
              {priorityConfig.text}
            </Text>

          </View>

        </View>

      )}


      {/* =================================================
          DETAILS
      ================================================= */}

      <View
        style={{
          marginTop:
            theme.spacing.lg ||
            17,
        }}
      >

        {/* =================================================
            ROW 1
        ================================================= */}

        <View
          style={{
            flexDirection: "row",

            marginBottom:
              theme.spacing.md ||
              14,
          }}
        >

          {/* =================================================
              LOCATION
          ================================================= */}

          <View
            style={{
              width: "50%",

              flexDirection: "row",

              alignItems: "center",

              paddingRight:
                theme.spacing.sm ||
                8,

              minWidth: 0,
            }}
          >

            <MapPin
              size={17}
              color={
                secondaryTextColor
              }
            />


            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                marginLeft:
                  theme.spacing.sm ||
                  8,

                flex: 1,

                minWidth: 0,

                fontSize:
                  theme.typography.b2   ,
                  

                color:
                  secondaryTextColor,

                fontFamily:
                  theme.fonts.regular,
              }}
            >
              {location ||
                "Location unavailable"}
            </Text>

          </View>


          {/* =================================================
              PRODUCT
          ================================================= */}

          <View
            style={{
              width: "50%",

              flexDirection: "row",

              alignItems: "center",

              paddingLeft:
                theme.spacing.sm ||
                8,

              minWidth: 0,
            }}
          >

            <WalletCards
              size={17}
              color={
                secondaryTextColor
              }
            />


            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                marginLeft:
                  theme.spacing.sm ||
                  8,

                flex: 1,

                minWidth: 0,

                   fontSize:
                  theme.typography.b2   ,

                color:
                  secondaryTextColor,

                fontFamily:
                  theme.fonts.regular,
              }}
            >
              {productName}
            </Text>

          </View>

        </View>


        {/* =================================================
            ROW 2
        ================================================= */}

        <View
          style={{
            flexDirection: "row",
          }}
        >

          {/* =================================================
              DATE
          ================================================= */}

          <View
            style={{
              width: "50%",

              flexDirection: "row",

              alignItems: "center",

              paddingRight:
                theme.spacing.sm ||
                8,

              minWidth: 0,
            }}
          >

            <CalendarDays
              size={17}
              color={
                secondaryTextColor
              }
            />


            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                marginLeft:
                  theme.spacing.sm ||
                  8,

                flex: 1,

                minWidth: 0,

                  fontSize:
                  theme.typography.b2   ,

                color:
                  secondaryTextColor,

                fontFamily:
                  theme.fonts.regular,
              }}
            >
              {assignedDate}
            </Text>

          </View>


          {/* =================================================
              PHONE
          ================================================= */}

          <View
            style={{
              width: "50%",

              flexDirection: "row",

              alignItems: "center",

              paddingLeft:
                theme.spacing.sm ||
                8,

              minWidth: 0,
            }}
          >

            <Phone
              size={17}
              color={
                secondaryTextColor
              }
            />


            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                marginLeft:
                  theme.spacing.sm ||
                  8,

                flex: 1,

                minWidth: 0,

                   fontSize:
                  theme.typography.b2   ,
                color:
                  secondaryTextColor,

                fontFamily:
                  theme.fonts.regular,
              }}
            >
              {phone || "-"}
            </Text>

          </View>

        </View>


        {/* =================================================
            LOAN AMOUNT
        ================================================= */}

        {amount && (

          <View
            style={{
              flexDirection: "row",

              alignItems: "center",

              marginTop:
                theme.spacing.md ||
                14,
            }}
          >

            <IndianRupee
              size={16}
              color={
                secondaryTextColor
              }
            />


            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{
                marginLeft:
                  theme.spacing.xs ||
                  7,

                  fontSize:
                  theme.typography.b2     ,

                color:
                  secondaryTextColor,

                fontFamily:
                  theme.fonts.regular,
              }}
            >
              Loan Amount: ₹{amount}
            </Text>

          </View>

        )}

      </View>


      {/* =================================================
          VIEW MORE
      ================================================= */}

      <TouchableOpacity
        activeOpacity={0.8}

        onPress={() =>
          onPress?.(item)
        }

        style={{
          height:
            theme.button.height ||
            46,

          marginTop:
            theme.spacing.lg ||
            18,

          borderRadius:
            theme.button.borderRadius ||
            9,

          borderWidth: 1,

          borderColor:
           
            "#FFB895",

          alignItems: "center",

          justifyContent: "center",

          flexDirection: "row",
        }}
      >

        <Text
          style={{
            fontSize:
              theme.button.fontSize ||
              14,

            color:
              primaryColor,

            fontFamily:
              theme.fonts.semiBold,
          }}
        >
          View More
        </Text>


        <ArrowRight
          size={18}

          color={
            primaryColor
          }

          style={{
            marginLeft:
              theme.spacing.sm ||
              8,
          }}
        />

      </TouchableOpacity>

    </View>

  );
};


export default memo(
  VisitorHomeScreenJobCard
);