import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Text } from "../ui/text";
import Task from "./task";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

type TaskData = {
  taskData: any[];
};

const TasksList = ({ taskData }: TaskData) => {
  const router = useRouter();

  const navigateToTask = () => {
    router.navigate("./(tabs)/tasks");
  };

  return (
    <View className="mt-10">
      <View className="flex-row justify-between items-end">
        <Text className="text-muted ml-2 font-semibold text-2xl">
          Devam Eden
        </Text>
        <TouchableOpacity onPress={navigateToTask}>
          <Text className="underline">Hepsini Gör</Text>
        </TouchableOpacity>
      </View>
      <View>
        {taskData.map((task, index) => (
          <Task key={index} task={task} />
        ))}
      </View>
    </View>
  );
};

export default TasksList;
