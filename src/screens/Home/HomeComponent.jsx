import React, {
  memo,
  useMemo,
} from "react";

import {
  FlatList,
} from "react-native";

import HeaderCard from "./components/HeaderCard";
import KycBannerCard from "./components/KycBannerCard";
import LoanSection from "./components/LoanSection";
import NoticeCard from "./components/NoticeCard";
import CategoryCard from "./components/CategoryCard";
import CategorySection from "./components/CategorySection";
import LoanBannerCard from "./components/LoanBannerCard";
import FinanceCard from "./components/FinanceCard";
import OfferCard from "./components/OfferCard";
import LoanPickerCard from "./components/LoanPickerCard";
import ReferBannerCard from "./components/ReferBannerCard";
import BottomBanner from "./components/BottomBanner";
import FinanceSection from "./components/FinanceSection";
import OfferSection from "./components/FinanceSection";
import { theme } from "../../theme";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
const HomeComponent = () => { 
  const sections = useMemo(() => ([
    { id: "loan-banner" },
    { id: "finance" },
    { id: "offers" },
    { id: "loan-picker" },
    { id: "refer-banner" },
    { id: "bottom-banner" },
  ]), []);
   
   const navigation = useNavigation()
     const user = useSelector((state) => state.auth.user);


      console.log(user ,"user")
  const renderItem = ({ item }) => {

    switch (item.id) {

      case "loan-banner":
        return <LoanBannerCard />;

      case "finance":
        return <FinanceSection />;

      case "offers":
        return <OfferSection />;

      case "loan-picker":
        return <LoanPickerCard />;

      case "refer-banner":
        return <ReferBannerCard />;

      case "bottom-banner":
        return <BottomBanner />;

      default:
        return null;

    }

  };

  return (

    <FlatList
      data={sections}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: theme.screen.horizontalPadding,
        paddingBottom: theme.spacing.massive,
      }}
      ListHeaderComponent={
        <>
          <HeaderCard 
            userName ={user?.fullName} 
            // profileImage ={""} 
             onNotificationPress={""} 
           />



 

          <KycBannerCard onPress={()=>{
            navigation.navigate('complete-kyc-screen')
          }} />

          {/* <LoanSection /> */}

          <NoticeCard />

          <CategorySection />
        </>
      }
    />

  );

};

export default memo(HomeComponent);