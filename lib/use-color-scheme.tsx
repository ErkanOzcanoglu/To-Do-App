import React, { createContext, useContext, useEffect, useState } from "react";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setAndroidNavigationBar } from "./android-navigation-bar";

type ColorScheme = "light" | "dark" | "system";

interface ColorSchemeContextType {
  colorScheme: ColorScheme;
  setColorScheme: (theme: ColorScheme) => void;
  systemColorScheme: "light" | "dark";
  isDarkColorScheme: boolean;
}

const ColorSchemeContext = createContext<ColorSchemeContextType | undefined>(
  undefined
);

export const ColorSchemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("system");
  const [systemColorScheme, setSystemColorScheme] = useState<"light" | "dark">(
    Appearance.getColorScheme() || "light"
  );

  useEffect(() => {
    const listener = Appearance.addChangeListener(({ colorScheme }) => {
      const newSystemColorScheme = colorScheme || "light";
      setSystemColorScheme(newSystemColorScheme);

      if (colorScheme === "system") {
        const newTheme = newSystemColorScheme;
        setColorScheme(newTheme);
        setAndroidNavigationBar(newTheme);
      }
    });

    return () => listener.remove();
  }, []);

  useEffect(() => {
    const updateTheme = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (!savedTheme || savedTheme === "system") {
        const newTheme = systemColorScheme === "dark" ? "dark" : "light";
        setColorScheme(newTheme);
        setAndroidNavigationBar(newTheme);
      }
    };

    updateTheme();
  }, [systemColorScheme]);

  const setTheme = (theme: ColorScheme) => {
    setColorScheme(theme);
    AsyncStorage.setItem("theme", theme);

    if (theme !== "system") {
      setAndroidNavigationBar(theme);
    } else {
      setAndroidNavigationBar(systemColorScheme);
    }
  };

  const isDarkColorScheme =
    colorScheme === "dark" ||
    (colorScheme === "system" && systemColorScheme === "dark");

  const value = {
    colorScheme,
    setColorScheme: setTheme,
    systemColorScheme,
    isDarkColorScheme,
  };

  return (
    <ColorSchemeContext.Provider value={value}>
      {children}
    </ColorSchemeContext.Provider>
  );
};

export const useColorScheme = (): ColorSchemeContextType => {
  const context = useContext(ColorSchemeContext);
  if (context === undefined) {
    throw new Error("useColorScheme must be used within a ColorSchemeProvider");
  }
  return context;
};
