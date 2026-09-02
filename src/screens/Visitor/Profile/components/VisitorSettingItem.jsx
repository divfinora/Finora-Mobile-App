import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  ChevronRight,
} from "lucide-react-native";

import {
  theme,
} from "../../../../theme/index.js";


const VisitorSettingItem = ({
  title,

  icon: Icon,

  onPress,

  isLast = false,
}) => {

  return (

    <TouchableOpacity
      activeOpacity={0.8}

      onPress={
        onPress
      }

      style={{
        flexDirection:
          "row",

        alignItems:
          "center",

        paddingHorizontal:
          theme.spacing.lg,

        paddingVertical:
          theme.spacing.lg,

        position:
          "relative",
      }}
    >

      {/* =================================================
          ICON
      ================================================= */}

      <View
        style={{
          width: 40,

          height: 40,

          borderRadius:
            theme.radius.md,

          backgroundColor:
            theme.colors.navy900,

          justifyContent:
            "center",

          alignItems:
            "center",
        }}
      >

        <Icon
          size={
            theme.iconSize.md
          }

          color={
            theme.colors.white
          }
        />

      </View>


      {/* =================================================
          TITLE
      ================================================= */}

      <Text
        numberOfLines={1}

        style={{
          flex: 1,

          marginLeft:
            theme.spacing.lg,

          color:
            theme.colors.gray700,

          fontSize:
            theme.typography.b1,

          fontFamily:
            theme.fonts.regular,
        }}
      >
        {title}
      </Text>


      {/* =================================================
          ARROW
      ================================================= */}

      <ChevronRight
        size={
          theme.iconSize.md
        }

        color={
          theme.colors.textLight
        }
      />


      {/* =================================================
          DIVIDER
      ================================================= */}

      {!isLast && (

        <View
          style={{
            position:
              "absolute",

            left: 0,

            right: 0,

            bottom: 0,

            borderBottomWidth:
              1,

            borderBottomColor:
              theme.colors.border,

            borderStyle:
              "dashed",
          }}
        />

      )}

    </TouchableOpacity>

  );

};


export default VisitorSettingItem;