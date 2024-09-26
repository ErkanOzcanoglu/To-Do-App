import { ScrollView, View } from "react-native";
import React from "react";
import { Text } from "~/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "~/components/home/header";
import FilteredTasks from "~/components/home/filtered-tasks";
import TasksList from "~/components/home/tasks-list";

const Home = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="mt-5 px-5">
          <Header />
          <FilteredTasks />
          <TasksList />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
