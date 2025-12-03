// hooks/useToggleTheme.ts
import { MyDarkTheme, MyLightTheme } from "@/constants/theme";
import React, { createContext, useContext } from "react";

type ThemeType = typeof MyLightTheme;

const ThemeToggleContext = createContext<React.Dispatch<
  React.SetStateAction<ThemeType>
> | null>(null);

export const useThemeToggleContext = () => {
  const setTheme = useContext(ThemeToggleContext);
  if (!setTheme) {
    throw new Error("useToggleTheme must be used within RootLayout");
  }
  return setTheme;
};

export const useToggleTheme = () => {
  const setTheme = useThemeToggleContext();
  return () => setTheme((prev) => (prev.dark ? MyLightTheme : MyDarkTheme));
};

export { ThemeToggleContext };
