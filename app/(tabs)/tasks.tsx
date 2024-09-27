import { FlatList, ScrollView, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TaskList from "~/components/tasks/task-list";
import { taskData } from "~/assets/datas/mockData";
import FilterOptions from "~/components/tasks/filter-options";
import { Text } from "~/components/ui/text";
import Header from "~/components/home/header";

const Tasks = () => {
  return (
    <SafeAreaView>
      <View className="p-5">
        <View className="mb-2">
          <Header />
        </View>
        <ScrollView>
          <View className="mb-28">
            <FlatList
              scrollEnabled={false}
              data={taskData}
              renderItem={({ item }) => <TaskList task={item} />}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Tasks;
