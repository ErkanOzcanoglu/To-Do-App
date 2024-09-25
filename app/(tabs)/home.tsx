import { View, Text } from "react-native";
import React from "react";
import FilteredTasks from "@/components/home/filtered-tasks";
import TasksList from "@/components/home/tasks-list";
import { SafeAreaView } from "react-native-safe-area-context";
import Intro from "@/components/home/intro";

const Home = () => {
  return (
    <SafeAreaView>
      <View className="bg-[#212121] h-full w-full">
        <Intro />
        <TasksList />
        <Text className="text-red-700">asd</Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;
