import React, {
  useCallback,
  useMemo,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
} from "react-native";

import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import {
  PlayCircle,
} from "lucide-react-native";

import { theme } from "../../../theme";

import {
  useGetVisitorApplicationDetailsQuery,
} from "../../../redux/features/visitor/visitorApi.js";

import BackButtonLinerGradint
  from "../../../components/common/BackButton/BackButtonLinerGradint.jsx";

import InlineRetry
  from "../../../components/common/RetryScreen/InlineRetry.jsx";

import LoanOverviewCard
  from "./components/LoanOverviewCard.jsx";

import CustomerDetailsCard
  from "./components/CustomerDetailsCard.jsx";

import LoanInformationCard
  from "./components/LoanInformationCard.jsx";

import VerificationProgressCard
  from "./components/VerificationProgressCard.jsx";

import VerificationChecklist
  from "./components/VerificationChecklist.jsx";

import InvestigationCard
  from "./components/InvestigationCard.jsx";

import LocationCard
  from "./components/LocationCard.jsx";

import VerificationPhotosCard
  from "./components/VerificationPhotosCard.jsx";

import WitnessDetailsCard
  from "./components/WitnessDetailsCard.jsx";

import CustomerConsentCard
  from "./components/CustomerConsentCard.jsx";

import VisitorDeclarationCard
  from "./components/VisitorDeclarationCard.jsx";

import RemarksCard
  from "./components/RemarksCard.jsx";

import VisitorApplicationDetailsSkeleton
  from "./components/VisitorApplicationDetailsSkeleton.jsx";

import StartInvestigationButton
  from "./components/StartInvestigationButton.jsx";

import StatusOverviewCard from './components/StatusOverviewCard.jsx'
// =====================================================
// SCREEN
// =====================================================

const VisitorApplicationDetailsScreen = () => {

  const navigation = useNavigation();

  const route = useRoute();

  const insets = useSafeAreaInsets();


  // =====================================================
  // LOAN ID
  // =====================================================

  const loanId =
    route?.params?.loanId ||
    route?.params?.id ||
    route?.params?.job?.loanId ||
    route?.params?.job?._id;


  // =====================================================
  // REFRESH
  // =====================================================

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);


  // =====================================================
  // API
  // =====================================================

  const {
    data: response,

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


  console.log(
    response,
    "response======"
  );


  // =====================================================
  // COMBINED LOADING
  // isLoading OR isFetching
  // =====================================================

  const isScreenLoading =
    isLoading || isFetching;


  // =====================================================
  // DATA
  // =====================================================

  const details =
    response?.data || null;


  const loan =
    details?.loan || {};


  const customer =
    details?.customer || {};


  const progress =
    details?.progress || {};


  const investigation =
    details?.investigation || {};


  const location =
    details?.location || {};


  const witness =
    details?.witness || {};


  const customerConsent =
    details?.customerConsent || {};


  const visitorDeclaration =
    details?.visitorDeclaration || {};


  const photos =
    Array.isArray(details?.photos)
      ? details.photos
      : [];


  const checklist =
    Array.isArray(details?.checklist)
      ? details.checklist
      : [];


  // =====================================================
  // PHOTO GROUPING
  // =====================================================

  const photoGroups = useMemo(() => {

    const groups = {};


    photos.forEach((photo) => {

      const category =
        photo?.category || "OTHER";


      if (!groups[category]) {

        groups[category] = [];

      }


      groups[category].push(photo);

    });


    return groups;

  }, [photos]);


  // =====================================================
  // PULL TO REFRESH
  // =====================================================

  const handleRefresh = useCallback(
    async () => {

      setRefreshing(true);


      try {

        await refetch();

      } catch (error) {

        console.log(
          "Visitor details refresh error:",
          error
        );

      } finally {

        setRefreshing(false);

      }

    },
    [refetch]
  );


  // =====================================================
  // START INVESTIGATION
  // =====================================================




  // =====================================================
  // HEADER
  // =====================================================

  const renderHeader = () => {

    return (
      <View
        style={{
          backgroundColor:
            theme.colors.background,
        }}
      >

        <BackButtonLinerGradint
          title="Loan View Details"

          onPress={() =>
            navigation.goBack()
          }

          containerStyle={{
            paddingTop:
              insets.top,

            paddingHorizontal:
              theme.spacing.xxl,
          }}
        />

      </View>
    );

  };


  // =====================================================
  // ERROR / INVALID ID
  // =====================================================

  const renderError = () => {

    // ===================================================
    // LOAN ID MISSING
    // ===================================================

    if (!loanId) {

      return (
        <InlineRetry
          title="Application not found"

          description={
            "Loan ID is missing. Please go back and " +
            "open the application again."
          }

          buttonText="Go Back"

          onRetry={() =>
            navigation.goBack()
          }
        />
      );

    }


    // ===================================================
    // API ERROR
    // ===================================================

    if (
      !isLoading &&
      isError &&
      !details
    ) {

      return (
        <InlineRetry
          title="Unable to load loan details"

          description={
            "Something went wrong while loading " +
            "this application."
          }

          buttonText="Retry"

          loading={isFetching}

          onRetry={refetch}
        />
      );

    }


    return null;

  };


  // =====================================================
  // MAIN
  // =====================================================

  return (
    <SafeAreaView
      edges={[
        "left",
        "right",
        "bottom",
      ]}

      style={{
        flex: 1,

        backgroundColor:
          theme.colors.background,
      }}
    >

      {/* =================================================
          STATUS BAR
      ================================================= */}

           <StatusBar
       translucent={true}
       backgroundColor="transparent"
       barStyle="dark-content"
     />

      {/* =================================================
          HEADER
      ================================================= */}

      {renderHeader()}


      {/* =================================================
          CONTENT
      ================================================= */}

      {!loanId ||
        (
          !isLoading &&
          isError &&
          !details
        ) ? (

        <View
          style={{
            flex: 1,

            paddingHorizontal:
              theme.spacing.xxl,

            justifyContent:
              "center",
          }}
        >

          {renderError()}

        </View>

      ) : (

        <ScrollView
          showsVerticalScrollIndicator={false}

          keyboardShouldPersistTaps="handled"

          refreshControl={
            <RefreshControl
              refreshing={
                refreshing
              }

              onRefresh={
                handleRefresh
              }

              colors={[
                theme.colors.primary500,
              ]}

              tintColor={
                theme.colors.primary500
              }
            />
          }

          contentContainerStyle={{
            paddingHorizontal:
              theme.spacing.xl,

            paddingTop:
              theme.spacing.md,

            paddingBottom:
              130,
          }}
        >

          {/* =================================================
              LOADING
              
              isLoading OR isFetching
              ================================================= */}

          {isScreenLoading ? (

            <VisitorApplicationDetailsSkeleton />

          ) : (

            <>




              {/* =================================================
                  LOAN OVERVIEW
              ================================================= */}

              <LoanOverviewCard
                loan={loan}

                status={
                  loan?.status || "-"
                }
              />
<StatusOverviewCard
  verificationStatus={details?.status}
  loanStatus={loan?.status}
  loanStage={loan?.stage}
  approvalStatus={loan?.approval?.status}
  disbursementStatus={loan?.disbursementStatus}
/>

              {/* =================================================
                  APPLICANT
              ================================================= */}

              <CustomerDetailsCard
                customer={customer}
              />


              {/* =================================================
                  LOAN & PROPERTY
              ================================================= */}

              <LoanInformationCard
                loan={loan}
              />


              {/* =================================================
                  VERIFICATION PROGRESS
              ================================================= */}

              <VerificationProgressCard
                progress={progress}

                checklist={checklist}

                isLoading={
                  isLoading
                }

                isFetching={
                  isFetching
                }
              />






            </>


          )}

        </ScrollView>

      )}


      <StartInvestigationButton
        loanId={loanId}
        loan={loan}
        customer={customer}
      />



    </SafeAreaView>
  );
};


export default VisitorApplicationDetailsScreen;