import React, { memo } from "react";

import {
  View,
  Text,
} from "react-native";
import { theme } from "../../../../theme";

 

const SectionHeader = ({
  title,
  rightText,
}) => {

  return (

    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",

        marginBottom: theme.spacing.lg,
        marginTop: theme.spacing.sm,
      }}
    >

      {/* ================= TITLE ================= */}

      <Text
        style={{
          color: theme.colors.gray700,

          fontSize: theme.typography.b3,

          fontFamily: theme.fonts.semiBold,

          textTransform: "uppercase",

          letterSpacing: 0.5,
        }}
      >
        {title}
      </Text>

      {/* ================= RIGHT TEXT ================= */}

      {!!rightText && (

        <Text
          style={{
            color: theme.colors.gray900,

            fontSize: theme.typography.caption,

            fontFamily: theme.fonts.bold,

            textTransform: "uppercase",
          }}
        >
          {rightText}
        </Text>

      )}

    </View>

  );

};

export default memo(SectionHeader);