import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";
import { NAV_THEME } from "@/lib/constants";

export async function setAndroidNavigationBar(theme: "light" | "dark") {
  if (Platform.OS !== "android") return;

  try {
    await NavigationBar.setButtonStyleAsync(
      theme === "dark" ? "light" : "dark"
    );
    await NavigationBar.setBackgroundColorAsync(
      theme === "dark" ? NAV_THEME.dark.background : NAV_THEME.light.background
    );
  } catch (error) {
    console.error("Error setting navigation bar:", error);
  }
}
