import { useState, useEffect } from "react";
import { SafeAreaView, View, ActivityIndicator, Button } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Task from "@/components/tasks/task";
import { useTaskStore } from "@/hooks/use-task-store";

const TaskList = () => {
  const { tasks, setTasks } = useTaskStore();

  const clearStorage = async () => {
    await AsyncStorage.removeItem("@tasks");
    setTasks([]);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="p-4">
        <FlatList
          data={tasks}
          renderItem={({ item }) => <Task task={item} />}
          keyExtractor={(item) => item.id}
          className="space-y-2"
        />
        <Button title="Clear Storage" onPress={clearStorage} />
      </View>
    </SafeAreaView>
  );
};

export default TaskList;
