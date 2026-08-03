import React from "react";

import {
  View,
  Text,
} from "react-native";

import {
  UserRound,
} from "lucide-react-native";
import { theme } from "../../../../theme";

 

const HeroSection = () => {
  return (
    <View
      style={{
        alignItems: "center",
      marginTop: theme.spacing.lg,
     
             marginBottom: theme.spacing.xxxl,
      }}
    >
      {/* Icon */}

      <View
        style={{
          width: 92,
          height: 92,
          borderRadius: 46,
          backgroundColor: theme.colors.primary100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserRound
          size={42}
          color={theme.colors.primary700}
          strokeWidth={2}
        />
      </View>

      {/* Title */}

      <Text
        style={{
          marginTop: theme.spacing.xxl,

          color: theme.colors.black,

               color: theme.colors.black,
        
                  fontSize: theme.typography.h2,
        
                  lineHeight: theme.lineHeight.h3,
        
                  fontFamily: theme.fonts.headingBold,

         

          textAlign: "center",
        }}
      >
        Personal Details
      </Text>

      {/* Subtitle */}

      <Text
         style={{
                  
                 marginTop: theme.spacing.sm,
       
                 color: theme.colors.textSecondary,
       
                 fontSize: theme.typography.b1,
       
                 lineHeight: 22,
       
                 fontFamily: theme.fonts.regular,
       
                 textAlign: "center",
       
                 paddingHorizontal: theme.spacing.md,
               }}
      >
        Please Provide your personal information
      </Text>
    </View>
  );
};

export default HeroSection;