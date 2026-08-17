import React from "react";
import { View } from "react-native";
import { theme } from "../../../../theme/index.js";

const NotificationSkeleton = () => {
  return (
    <View style={{ paddingTop: theme.spacing.sm, gap: theme.spacing.lg }}>
      {[1, 2, 3, 4, 5].map((item) => (
        <View
          key={item}
          style={{
            backgroundColor: theme.colors.gray100,
            borderRadius: theme.radius.xl,
            padding: theme.spacing.lg,
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: theme.radius.circle,
              backgroundColor: theme.colors.gray200,
              marginRight: theme.spacing.md,
            }}
          />
          <View style={{ flex: 1 }}>
            <View
              style={{
                width: "50%",
                height: 16,
                borderRadius: theme.radius.sm,
                backgroundColor: theme.colors.gray200,
                marginBottom: theme.spacing.sm,
              }}
            />
            <View
              style={{
                width: "85%",
                height: 14,
                borderRadius: theme.radius.sm,
                backgroundColor: theme.colors.gray200,
                marginBottom: theme.spacing.md,
              }}
            />
            <View
              style={{
                width: "30%",
                height: 12,
                borderRadius: theme.radius.sm,
                backgroundColor: theme.colors.gray200,
                alignSelf: "flex-end",
              }}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

export default NotificationSkeleton;