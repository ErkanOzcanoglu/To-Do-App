import { View } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { Home, List, Plus } from "lucide-react-native";
import { useTheme } from "@react-navigation/native";
const _layout = () => {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: [
            { display: "flex" },
            null,
            { backgroundColor: colors.background },
          ],
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color }) => (
              <Home size={30} strokeWidth={2.5} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="add-task"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color }) => (
              <Plus size={30} strokeWidth={2.5} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="task-list"
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ color }) => (
              <List size={30} strokeWidth={2.5} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default _layout;
