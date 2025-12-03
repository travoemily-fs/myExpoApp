// app/_layout.tsx
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { router, Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeProvider } from "@react-navigation/native";
import "../styles/global.css";

import { MyLightTheme, MyDarkTheme } from "@/constants/theme";
import { ThemeToggleContext } from "@/hooks/useToggleTheme";

export default function RootLayout() {
  const [theme, setTheme] = useState(MyLightTheme);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("app-theme");
      setTheme(saved === "dark" ? MyDarkTheme : MyLightTheme);
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("app-theme", theme.dark ? "dark" : "light");
  }, [theme]);

  // Web shortcuts
  if (Platform.OS === "web") {
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "n") {
        e.preventDefault();
        router.push("/add-task");
      }
    });
  }

  return (
    <ThemeToggleContext.Provider value={setTheme}>
      <ThemeProvider value={theme}>
        <Stack>
          <Stack.Screen name="index" options={{ title: "Tasks" }} />
          <Stack.Screen name="add-task" options={{ title: "Add Task" }} />
          <Stack.Screen name="edit-task" options={{ title: "Edit Task" }} />
        </Stack>
      </ThemeProvider>
    </ThemeToggleContext.Provider>
  );
}