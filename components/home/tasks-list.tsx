import { FlatList, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "../ui/text";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import Task from "../tasks/task";

type TaskData = {
  taskData: any[];
};

const TasksList = ({ taskData }: TaskData) => {
  const router = useRouter();
  const [isFinishedData, setIsFinishedData] = useState<any[]>([]);

  const navigateToTask = () => {
    router.navigate("/task-list");
    console.log("Navigating to tasks");
  };

  useEffect(() => {
    setIsFinishedData(taskData.filter((task) => task.isCompleted === false));
  }, [taskData]);

  return (
    <View className="pt-10">
      <View className="flex-row justify-between items-end">
        <Text className="ml-2 font-semibold text-2xl">Devam Eden</Text>
        <TouchableOpacity onPress={navigateToTask}>
          <Text className="underline">Hepsini Gör</Text>
        </TouchableOpacity>
      </View>
      <View className="mt-2">
        <FlatList
          scrollEnabled={false}
          data={isFinishedData}
          renderItem={({ item }) => <Task item={item} />}
        />
      </View>
    </View>
  );
};

export default TasksList;
