import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskLists from "@/components/home/task-lists";

const Home = () => {
  return (
    <SafeAreaView>
      <Text className="text-white">Home</Text>
      <TaskLists />
    </SafeAreaView>
  );
};

export default Home;
