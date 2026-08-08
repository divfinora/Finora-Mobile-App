import React from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

import {
  ChevronRight,
} from "lucide-react-native";

import { theme } from "../../../../theme";

const LoanCard = ({
  loan,
  onPress,
}) => {

  const formatAmount = (value) => {

    if (!value) return "0";

    if (value >= 10000000)
      return `${(value / 10000000).toFixed(0)}Cr`;

    if (value >= 100000)
      return `${(value / 100000).toFixed(0)}L`;

    if (value >= 1000)
      return `${(value / 1000).toFixed(0)}K`;

    return value;

  };

  return (

    <TouchableOpacity

      activeOpacity={0.9}

      onPress={() => onPress?.(loan)}

      style={{

        width: "48%",

        minHeight: 100,

        backgroundColor: theme.colors.white,

        borderRadius: theme.radius.xl,

     
borderWidth:0.5,
        borderColor: "#F4DFC5",

        padding: theme.spacing.lg,

        justifyContent: "space-between",

        ...theme.shadows.card,

      }}

    >

      {/* Top */}

      <View

        style={{
 
          flexDirection: "row",

          justifyContent: "space-between",

          alignItems: "flex-start",

        }}

      >

        <Text

          numberOfLines={2}

          style={{

            flex: 1,

            color: theme.colors.black,

            fontSize: theme.typography.h4,

            fontFamily: theme.fonts.headingBold,

            lineHeight: theme.lineHeight.h4,

            marginRight: theme.spacing.sm,

          }}

        >

          {loan?.name} 

        </Text>

        <Image

          source={{

            uri: "https://cdn-icons-png.flaticon.com/512/1170/1170576.png",

          }}

          resizeMode="contain"

          style={{

            width: 44,

            height: 44,

          }}

        />

      </View>

      {/* Bottom */}

      <View

        style={{
 
          flexDirection: "row",

          justifyContent: "space-between",

          alignItems: "flex-end",

        marginTop: theme.spacing.md,

        }}

      >

        <View>

          <Text

            style={{

              color: theme.colors.gray500,

              fontSize: theme.typography.b2,

              fontFamily: theme.fonts.medium,

            }}

          >

            Get Up To

          </Text>

          <Text

            style={{

              marginTop: 2,

              color: theme.colors.black,

              fontSize: theme.typography.b1,

              fontFamily: theme.fonts.bold,

            }}

          >

            ₹{formatAmount(loan?.maxAmount)}

          </Text>

        </View>

        <ChevronRight

          size={theme.iconSize.md}

          color={theme.colors.black}

        />

      </View>

    </TouchableOpacity>

  );

};

export default LoanCard;