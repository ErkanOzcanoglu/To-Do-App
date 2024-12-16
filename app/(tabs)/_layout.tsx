import { Tabs } from "expo-router";
import { Check, Home } from "lucide-react-native";
import React from "react";
import { useColorScheme } from "@/lib/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="add-task"
        options={{
          title: "Add Task",
          headerShown: false,
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="task-list"
        options={{
          title: "Taks List",
          headerShown: false,
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
