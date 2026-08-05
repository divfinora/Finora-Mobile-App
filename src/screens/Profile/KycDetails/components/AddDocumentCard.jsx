import React, { memo } from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  Plus,
} from "lucide-react-native";
import { theme } from "../../../../theme";

 

const AddDocumentCard = ({
  title,
  subtitle,
  icon,
  onPress,
}) => {

  const Icon = icon;

  return (

    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{

        flexDirection: "row",
        alignItems: "center",

        backgroundColor: theme.colors.white,

        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: theme.colors.border,

        borderRadius: theme.radius.lg,

        padding: theme.spacing.lg,

        marginBottom: theme.spacing.lg,

      }}
    >

      {/* ================= ICON ================= */}

      <View
        style={{

          width: 40,
          height: 40,

          borderRadius: theme.radius.md,

          backgroundColor: theme.colors.navy900,

          justifyContent: "center",
          alignItems: "center",

        }}
      >

        <Icon
          size={theme.iconSize.md}
          color={theme.colors.white}
        />

      </View>

      {/* ================= TEXT ================= */}

      <View
        style={{

          flex: 1,

          marginLeft: theme.spacing.lg,

        }}
      >

        <Text
          numberOfLines={1}
          style={{

            color: theme.colors.gray700,

            fontSize: theme.typography.b2,

            fontFamily: theme.fonts.medium,

          }}
        >
          {title}
        </Text>

        <Text
          numberOfLines={1}
          style={{

            marginTop: 2,

            color: theme.colors.textLight,

            fontSize: theme.typography.b3,

            fontFamily: theme.fonts.regular,

          }}
        >
          {subtitle}
        </Text>

      </View>

      {/* ================= ADD BUTTON ================= */}

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={{

          width: 36,
          height: 36,

          borderRadius: 18,

          backgroundColor: "#FFF3E8",

          justifyContent: "center",
          alignItems: "center",

          shadowColor: "#F97316",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.12,
          shadowRadius: 8,

          elevation: 4,

        }}
      >

        <Plus
          size={20}
          color="#F97316"
          strokeWidth={2.5}
        />

      </TouchableOpacity>

    </TouchableOpacity>

  );

};

export default memo(AddDocumentCard);