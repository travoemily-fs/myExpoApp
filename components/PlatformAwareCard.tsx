import React from "react";
import { View, Platform } from "react-native";

interface PlatformAwareCardProps {
  children: React.ReactNode;
}

export default function PlatformAwareCard({ children }: PlatformAwareCardProps) {
  const getClassNames = () => {
    const base = "bg-white rounded-lg p-4 mb-3";

    if (Platform.OS === "web") {
      return `${base} shadow-lg hover:shadow-xl transition-shadow cursor-pointer`;
    }

    if (Platform.OS === "ios") {
      return `${base} shadow-sm`;
    }

    return `${base} shadow-md elevation-3`;
  };

  return <View className={getClassNames()}>{children}</View>;
}
