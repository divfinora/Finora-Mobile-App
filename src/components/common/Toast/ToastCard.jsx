import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from "lucide-react-native";

import { theme } from "../../../theme";

const ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const COLORS = {
  success: theme.colors.success,
  error: theme.colors.error,
  warning: theme.colors.warning,
  info: theme.colors.info,
};

const ToastCard = ({
  type = "success",
  text1,
  text2,
  hide,
}) => {

  const Icon =
    ICONS[type] || CheckCircle;

  const color =
    COLORS[type] || theme.colors.success;

  return (

    <View
      style={{

        width: "92%",

        alignSelf: "center",

        marginTop: theme.spacing.lg,

        backgroundColor:
          theme.colors.white,

        borderRadius:
          theme.toast.borderRadius,

        padding:
          theme.toast.padding,

        flexDirection: "row",

        alignItems: "flex-start",

        borderLeftWidth: 5,

        borderLeftColor: color,

        ...theme.shadows.md,

      }}
    >

      {/* Left Icon */}

      <View
        style={{
          marginTop: 2,
        }}
      >

        <Icon
          size={22}
          color={color}
        />

      </View>

      {/* Content */}

      <View
        style={{
          flex: 1,
          marginLeft: theme.spacing.md,
        }}
      >

        {!!text1 && (

          <Text
            style={{

              fontFamily:
                theme.fonts.headingSemiBold,

              fontSize:
                theme.typography.b1,

              lineHeight:
                theme.lineHeight.b1,

              color:
                theme.colors.navy900,

            }}
          >
            {text1}
          </Text>

        )}

        {!!text2 && (

          <Text
            style={{

              marginTop:
                theme.spacing.xs,

              fontFamily:
                theme.fonts.regular,

              fontSize:
                theme.typography.b2,

              lineHeight:
                theme.lineHeight.b2,

              color:
                theme.colors.textSecondary,

            }}
          >
            {text2}
          </Text>

        )}

      </View>

      {/* Close */}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={hide}
        hitSlop={theme.hitSlop.md}
      >

        <X
          size={20}
          color={theme.colors.gray500}
        />

      </TouchableOpacity>

    </View>

  );

};

export default ToastCard;