import React from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";

interface ThemedViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function ThemedView({ children, className = "" }: ThemedViewProps) {
  const { colors } = useTheme();
  return <View style={{ backgroundColor: colors.background, flex: 1 }} className={className}>{children}</View>;
}