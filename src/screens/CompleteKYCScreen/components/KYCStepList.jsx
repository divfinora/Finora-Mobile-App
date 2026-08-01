import React from "react";

import {
  View,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";

import {
  Wallet,
  ScanLine,
  BadgeCheck,
  Landmark,
} from "lucide-react-native";

import { theme } from "../../../theme";

import KYCStepCard from "./KYCStepCard";

const KYCStepList = ({
  data,
  onPress,
}) => {
  const getIcon = (type) => {
    switch (type) {
      case "aadhaar":
        return (
          <Wallet
            size={24}
            strokeWidth={2}
            color="#000"
          />
        );

      case "pan":
        return (
          <ScanLine
            size={24}
            strokeWidth={2}
            color="#000"
          />
        );

      case "address":
        return (
          <BadgeCheck
            size={24}
            strokeWidth={2}
            color="#000"
          />
        );

      case "bank":
        return (
          <Landmark
            size={24}
            strokeWidth={2}
            color="#000"
          />
        );

      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={[
        
        "#FFE2D4",
         "#ffe2d4b5",
        "#FFFFFF",
      ]}
      locations={[0, 0.45, 1]}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 0,
        y: 1,
      }}
      style={{
        borderRadius: 20,
    

        padding: 18,
      }}
    >
      {data.map((item) => (
        <KYCStepCard
          key={item.id}
          icon={getIcon(item.type)}
          title={item.title}
          subtitle={item.subtitle}
          onPress={() => onPress(item)}
        />
      ))}
    </LinearGradient>
  );
};

export default KYCStepList;