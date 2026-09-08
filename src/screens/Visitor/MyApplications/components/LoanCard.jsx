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
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme";


// =====================================================
// FORMAT AMOUNT
// =====================================================

const formatAmount = (
  amount
) => {

  if (
    amount === null ||
    amount === undefined ||
    amount === ""
  ) {

    return "—";

  }


  const number =
    Number(amount);


  if (
    Number.isNaN(number)
  ) {

    return String(
      amount
    );

  }


  return `₹${number.toLocaleString(
    "en-IN"
  )}`;

};


// =====================================================
// FORMAT DATE
// =====================================================

const formatDate = (
  value
) => {

  if (
    !value
  ) {

    return "—";

  }


  const date =
    new Date(value);


  if (
    Number.isNaN(
      date.getTime()
    )
  ) {

    return String(
      value
    );

  }


  return date.toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );

};


// =====================================================
// STATUS CONFIG
// =====================================================

const getStatusConfig = (
  status
) => {

  const normalized =
    String(
      status || ""
    )
      .toUpperCase()
      .trim();


  switch (
  normalized
  ) {

    // =================================================
    // ASSIGNED
    // =================================================

    case "ASSIGNED":

    case "VISITOR_ASSIGNED":

      return {

        label:
          "Assigned",

        textColor:
          "#966B00",

        background:
          "#FFF4B8",

        dot:
          "#F2B600",

      };


    // =================================================
    // IN PROGRESS
    // =================================================

    case "IN_PROGRESS":

    case "VISITOR_IN_PROGRESS":

      return {

        label:
          "In Progress",

        textColor:
          "#2F65B9",

        background:
          "#DCEAFF",

        dot:
          "#3980FF",

      };


    // =================================================
    // COMPLETED
    // =================================================

    case "COMPLETED":

    case "VISITOR_COMPLETED":

    case "SUBMITTED":

    case "VISITOR_SUBMITTED":

      return {

        label:
          "Completed",

        textColor:
          "#287C45",

        background:
          "#DCF7E6",

        dot:
          "#27C46D",

      };

    case "APPROVED":

      return {
        label: "Approved",
        textColor: "#287C45",
        background: "#DCF7E6",
        dot: "#27C46D",
      };

    // =================================================
    // REJECTED
    // =================================================

    case "REJECTED":

    case "VISITOR_REJECTED":

      return {

        label:
          "Rejected",

        textColor:
          "#C93B3B",

        background:
          "#FFE1E1",

        dot:
          "#EF4444",

      };


    // =================================================
    // DEFAULT
    // =================================================

    default:

      return {

        label:
          status ||
          "Pending",

        textColor:
          theme.colors.gray700,

        background:
          theme.colors.gray100,

        dot:
          theme.colors.gray500,

      };

  }

};


// =====================================================
// LOAN CARD
// =====================================================

const LoanCard = ({
  item,

  onPress,

  onReport,

  loading = false,

}) => {

  console.log(item, "item==")

  // ===================================================
  // STATUS
  // ===================================================

  // ===================================================
  // JOB STATUS
  // ===================================================

  const jobStatus = getStatusConfig(
    item?.status
  );


  // ===================================================
  // VERIFICATION STATUS
  // ===================================================

  const verificationStatus = getStatusConfig(
    item?.verificationStatus
  );


  // ===================================================
  // VERIFICATION COMPLETED
  // ===================================================

  const normalizedVerificationStatus =
    String(
      item?.verificationStatus || ""
    )
      .trim()
      .toUpperCase();

  const isVerificationCompleted =
    normalizedVerificationStatus === "SUBMITTED" ||
    normalizedVerificationStatus === "APPROVED";


  // ===================================================
  // LOAN ID
  // ===================================================

  const applicationId =
    item?.applicationId ||
    "—";


  // ===================================================
  // CUSTOMER
  // ===================================================

  const customerName =
    item?.customer?.fullName ||
    "—";


  // ===================================================
  // LOAN TYPE
  //
  // Backend should send:
  // item.loanType
  //
  // OR:
  // item.product.name
  // OR:
  // item.product.displayName
  // ===================================================

  const loanType =
    item?.loanType ||
    "—";


  // ===================================================
  // AMOUNT
  // ===================================================

  const amount =
    item?.amount ??
    item?.loanAmount ??
    null;


  // ===================================================
  // ASSIGNED DATE
  //
  // Backend should send:
  // assignedDate
  //
  // Fallbacks kept only for compatibility.
  // ===================================================

  const assignedDate =
    item?.assignedDate ||
    null;


  // ===================================================
  // ADDRESS
  //
  // Backend should send:
  // address
  //
  // Other possible existing structures are supported.
  // ===================================================

  const address =
    item?.address ||

    "—";


  // ===================================================
  // RENDER
  // ===================================================

  return (

    <View
      style={{

        width: "100%",

        backgroundColor:
          theme.colors.white,

        borderRadius: 15,

        borderWidth: 0.3,

        borderColor:
          "#E2E5E8",

        paddingHorizontal: 27,

        paddingTop: 29,

        paddingBottom: 26,

        marginBottom:
          theme.spacing.lg,

        ...theme.shadows.card,

      }}
    >

      {/* =================================================
          TOP ROW
      ================================================= */}

      <View
        style={{

          flexDirection:
            "row",

          justifyContent:
            "space-between",

          alignItems:
            "flex-start",

        }}
      >

        {/* =================================================
            LOAN ID
        ================================================= */}

        <View
          style={{
            flex: 1,
          }}
        >

          <Text
            style={{

              fontSize: 16,

              lineHeight: 18,

              color:
                "#777A80",

              fontFamily:
                theme.fonts.semiBold,

              textTransform:
                "uppercase",

              letterSpacing: 0.2,

            }}
          >
            Loan ID
          </Text>


          <Text
            numberOfLines={1}

            style={{

              marginTop: 4,

              fontSize: 16,

              lineHeight: 21,

              color:
                "#27292D",

              fontFamily:
                theme.fonts.medium,

            }}
          >
            {applicationId}
          </Text>

        </View>


        {/* =================================================
            STATUS BADGE
        ================================================= */}

        {/* =================================================
    JOB + VERIFICATION STATUS
================================================= */}

        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 6,
            flexShrink: 0,
          }}
        >
          {/* JOB STATUS */}

          <View
            style={{
              minHeight: 31,
              paddingHorizontal: 12,
              borderRadius: 7,
              backgroundColor: jobStatus.background,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: jobStatus.dot,
                marginRight: 6,
              }}
            />

            <Text
              numberOfLines={1}
              style={{
                fontSize: 11,
                lineHeight: 15,
                color: jobStatus.textColor,
                fontFamily: theme.fonts.semiBold,
              }}
            >
              {jobStatus.label}
            </Text>
          </View>

          {/* VERIFICATION STATUS */}

          <View
            style={{
              minHeight: 31,
              paddingHorizontal: 10,
              borderRadius: 7,
              backgroundColor: verificationStatus.background,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: 155,
            }}
          >
            <View
              style={{
                width: 7,
                height: 7,
                borderRadius: 4,
                backgroundColor: verificationStatus.dot,
                marginRight: 6,
              }}
            />

            <Text
              numberOfLines={1}
              style={{
                fontSize: 10,
                lineHeight: 14,
                color: verificationStatus.textColor,
                fontFamily: theme.fonts.semiBold,
              }}
            >
              Verification: {verificationStatus.label}
            </Text>
          </View>
        </View>

      </View>


      {/* =================================================
          DASHED DIVIDER
      ================================================= */}

      <View
        style={{

          width: "100%",

          borderTopWidth: 1,

          borderStyle:
            "dashed",

          borderColor:
            "#E8EAED",

          marginTop: 21,

          marginBottom: 20,

        }}
      />


      {/* =================================================
          CUSTOMER / TYPE
      ================================================= */}

      <View
        style={{

          flexDirection:
            "row",

          marginBottom: 20,

        }}
      >

        {/* =================================================
            CUSTOMER
        ================================================= */}

        <View
          style={{

            flex: 1,

            paddingRight: 10,

          }}
        >

          <Text
            style={{

              fontSize: 16,

              lineHeight: 20,

              color:
                "#85888E",

              fontFamily:
                theme.fonts.regular,

            }}
          >
            Customer
          </Text>


          <Text
            numberOfLines={1}

            style={{

              marginTop: 3,

              fontSize: 16,

              lineHeight: 22,

              color:
                "#27292D",

              fontFamily:
                theme.fonts.semiBold,

            }}
          >
            {customerName}
          </Text>

        </View>


        {/* =================================================
            TYPE
        ================================================= */}

        <View
          style={{

            flex: 1,

            paddingLeft: 10,

          }}
        >

          <Text
            style={{

              fontSize: 16,

              lineHeight: 20,

              color:
                "#85888E",

              fontFamily:
                theme.fonts.regular,

            }}
          >
            Type
          </Text>


          <Text
            numberOfLines={1}

            style={{

              marginTop: 3,

              fontSize: 16,

              lineHeight: 22,

              color:
                "#27292D",

              fontFamily:
                theme.fonts.semiBold,

            }}
          >
            {loanType}
          </Text>

        </View>

      </View>


      {/* =================================================
          AMOUNT / ASSIGNED DATE
      ================================================= */}

      <View
        style={{

          flexDirection:
            "row",

          marginBottom: 18,

        }}
      >

        {/* =================================================
            AMOUNT
        ================================================= */}

        <View
          style={{

            flex: 1,

            paddingRight: 10,

          }}
        >

          <Text
            style={{

              fontSize: 16,

              lineHeight: 20,

              color:
                "#85888E",

              fontFamily:
                theme.fonts.regular,

            }}
          >
            Amount
          </Text>


          <Text
            style={{

              marginTop: 3,

              fontSize: 18,

              lineHeight: 23,

              color:
                theme.colors.primary500,

              fontFamily:
                theme.fonts.bold,

            }}
          >
            {formatAmount(
              amount
            )}
          </Text>

        </View>


        {/* =================================================
            ASSIGNED DATE
        ================================================= */}

        <View
          style={{

            flex: 1,

            paddingLeft: 10,

          }}
        >

          <Text
            style={{

              fontSize: 16,

              lineHeight: 20,

              color:
                "#85888E",

              fontFamily:
                theme.fonts.regular,

            }}
          >
            Assigned Date
          </Text>


          <Text
            style={{

              marginTop: 3,

              fontSize: 16,

              lineHeight: 22,

              color:
                "#27292D",

              fontFamily:
                theme.fonts.semiBold,

            }}
          >
            {formatDate(
              assignedDate
            )}
          </Text>

        </View>

      </View>


      {/* =================================================
          ADDRESS
      ================================================= */}

      <View
        style={{

          flexDirection:
            "row",

          alignItems:
            "center",

          marginBottom: 18,

        }}
      >

        <MapPin
          size={18}

          color="#74777D"

          strokeWidth={2}
        />


        <Text
          numberOfLines={1}

          style={{

            flex: 1,

            marginLeft: 7,

            fontSize: 14,

            lineHeight: 20,

            color:
              "#6F7278",

            fontFamily:
              theme.fonts.regular,

          }}
        >
          {address}
        </Text>

      </View>


      {/* =================================================
          SECOND DASHED DIVIDER
      ================================================= */}

      <View
        style={{

          width: "100%",

          borderTopWidth: 1,

          borderStyle:
            "dashed",

          borderColor:
            "#E8EAED",

          marginBottom: 16,

        }}
      />


      {/* =================================================
          BUTTONS
      ================================================= */}

      <View
        style={{

          flexDirection:
            "row",

          gap: 13,

        }}
      >

        {/* =================================================
            VIEW DETAILS
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.85}

          disabled={
            loading ||
            isVerificationCompleted
          }

          onPress={() => {
            if (isVerificationCompleted) {
              return;
            }

            onPress?.(item);
          }}

          style={{
            flex: 1,
            height: 46,
            borderRadius: 9,

            backgroundColor:
              isVerificationCompleted
                ? theme.colors.gray300
                : theme.colors.primary500,

            alignItems: "center",
            justifyContent: "center",

            opacity:
              isVerificationCompleted
                ? 0.55
                : 1,
          }}
        >

          <Text
            style={{

              fontSize: 14,

              lineHeight: 20,

             color:
  isVerificationCompleted
    ? theme.colors.gray500
    : theme.colors.white,

              fontFamily:
                theme.fonts.medium,

            }}
          >
            View Details
          </Text>

        </TouchableOpacity>


        {/* =================================================
            REPORT / EDIT / REASON
        ================================================= */}

        <TouchableOpacity
          activeOpacity={0.85}

          disabled={
            loading
          }

          onPress={() =>
            onReport?.(
              item
            )
          }

          style={{

            flex: 1,

            height: 46,

            borderRadius: 9,

            backgroundColor:
              theme.colors.white,

            borderWidth: 1,

            borderColor:
              theme.colors.primary500,

            alignItems:
              "center",

            justifyContent:
              "center",

          }}
        >

          <Text
            style={{

              fontSize: 14,

              lineHeight: 20,

              color:
                theme.colors.primary500,

              fontFamily:
                theme.fonts.regular,

            }}
          >
            {
              jobStatus.label ===
                "In Progress"

                ? "Edit Info"

                : jobStatus.label ===
                  "Rejected"

                  ? "View Reason"

                  : "Report"
            }
          </Text>

        </TouchableOpacity>

      </View>

    </View>

  );

};


export default memo(
  LoanCard
);