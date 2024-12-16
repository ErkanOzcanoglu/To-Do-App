import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme as useNativeColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const nativeColorScheme = useNativeColorScheme();
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    nativeColorScheme || "light"
  );
  const [systemColorScheme, setSystemColorScheme] = useState<"light" | "dark">(
    nativeColorScheme || "light"
  );

  useEffect(() => {
    const loadStoredTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme) {
        setColorScheme(storedTheme as ColorScheme);
      }
    };
    loadStoredTheme();
  }, []);

  useEffect(() => {
    setSystemColorScheme(nativeColorScheme || "light");
  }, [nativeColorScheme]);

  const setTheme = (theme: ColorScheme) => {
    setColorScheme(theme);
    AsyncStorage.setItem("theme", theme);
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
