import React from "react";
import { View, Text } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Shield } from "lucide-react-native";

import { theme } from "../../../theme";

const KYCSecurityCard = () => {
  return (
    <LinearGradient
      colors={[
        "#152331",
        "#0C131B",
        "#030A0B",
      ]}
      locations={[0, 0.55, 1]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{
       
        borderRadius: theme.radius.xl,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.lg,
        marginBottom: theme.spacing.xl,
        overflow: "hidden",
        marginTop: theme.spacing.md,
      }}
    >
      {/* Green Glow */}

      <View
        style={{
          position: "absolute",
          right: -55,
          bottom: -45,
          width: 140,
          height: 140,
          borderRadius: 70,
          backgroundColor: "rgba(0, 170, 119, 0.06)",
        }}
      />

      {/* Content */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <Shield
          size={18}
          strokeWidth={2}
          color={theme.colors.primary400}
          style={{
            marginTop: 1,
          }}
        />

        <Text
          style={{
            flex: 1,
            marginLeft: theme.spacing.sm,
            fontSize: theme.typography.b3,
            lineHeight: 18,
            color: "rgba(255,255,255,.70)",
            fontFamily: theme.fonts.regular,
          }}
        >
          <Text
            style={{
              color: theme.colors.primary400,
              fontFamily: theme.fonts.semiBold,
            }}
          >
            Bank-grade security.
          </Text>

          {" "}Your data is encrypted end to end
          {"\n"}
          and stored as per RBI guidelines.
        </Text>
      </View>
    </LinearGradient>
  );
};

export default KYCSecurityCard;