import { ScrollView, View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "~/components/home/header";
import FilteredTasks from "~/components/home/filtered-tasks";
import TasksList from "~/components/home/tasks-list";

const taskData = [
  {
    title: "Task 1",
    description: "Description 1",
    endTime: "12:00",
    endDateTime: "2024-09-26T15:43:53.343Z",
  },
  {
    title: "Task 2",
    description: "Description 2",
    endTime: "09:00",
    endDateTime: "2024-09-29T15:43:53.343Z",
  },
  {
    title: "Task 3",
    description: "Description 3",
    endTime: "10:00",
    endDateTime: "2024-10-01T15:43:53.343Z",
  },
  {
    title: "Task 4",
    description: "Description 4",
    endTime: "23:00",
    endDateTime: "2024-10-15T15:43:53.343Z",
  },
];

const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="mt-5 px-5">
          <Header />
          <FilteredTasks taskData={taskData} />
          <TasksList taskData={taskData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
