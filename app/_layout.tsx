import React from "react";
import { Platform } from "react-native";
import { router, Stack } from "expo-router";
import config from "../constants/config";
import "../styles/global.css";

export default function RootLayout() {
  // Web-only features
  if (Platform.OS === "web") {
    // Add keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "n") {
        e.preventDefault();
        router.push("/add-task");
      }
    });

    // Add web analytics
    if (config.webAnalyticsId) {
      // Initialize analytics
    }
  }
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Tasks" }} />
      <Stack.Screen name="add-task" options={{ title: "Add Task" }} />
      <Stack.Screen name="edit-task" options={{ title: "Edit Task" }} />
    </Stack>
  );
}
