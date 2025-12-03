import React from "react";
import { View, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";

interface PlatformAwareCardProps {
  children: React.ReactNode;
}

export default function PlatformAwareCard({ children }: PlatformAwareCardProps) {
  const { colors } = useTheme();

  const platformShadow =
    Platform.OS === "web"
      ? "shadow-lg hover:shadow-xl transition-shadow"
      : Platform.OS === "ios"
      ? "shadow-sm"
      : "shadow-md elevation-4";

  return (
    <View
      style={{
        backgroundColor: colors.card,
        borderRadius: 16,
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 12,
      }}
      className={platformShadow}
    >
      {children}
    </View>
  );
}