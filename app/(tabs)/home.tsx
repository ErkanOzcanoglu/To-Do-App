import React, { useEffect } from "react";
import { Text } from "@/components/ui/text";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTaskStore } from "@/hooks/use-task-store";
import { Button, View } from "react-native";

const Home = () => {
  const { addTask, removeTask, tasks } = useTaskStore();

  const handleAddTask = () => {
    addTask({
      id: (tasks.length + 1).toString(),
      title: "Task 1",
      createdAt: new Date(),
      deadline: new Date(),
      deadlineTime: "12:00",
      description: "Description",
      isCompleted: false,
      updatedAt: new Date(),
    });
  };

  const handleRemoveTask = () => {
    removeTask("2");
  };

  return (
    <SafeAreaView>
      <View className="bg-black w-full h-full">
        <View>
          <Text>Home</Text>
          <Button title="Add Task" onPress={handleAddTask} />
          <Button title="Remove Task" onPress={handleRemoveTask} />
        </View>
        <View className="text-white">
          {tasks.map((task) => (
            <View key={task.id}>
              <Text className="text-white">{task.title}</Text>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
