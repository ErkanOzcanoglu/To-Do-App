import { FlatList, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text } from "../ui/text";
import Task from "./task";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";

type TaskData = {
  taskData: any[];
};

const TasksList = ({ taskData }: TaskData) => {
  const router = useRouter();
  const [isFinishedData, setIsFinishedData] = useState<any[]>([]);

  const navigateToTask = () => {
    router.navigate("/tasks");
  };

  useEffect(() => {
    setIsFinishedData(taskData.filter((task) => task.isFinished === false));
  }, [taskData]);

  return (
    <View className="pt-10">
      <View className="flex-row justify-between items-end">
        <Text className="text-muted ml-2 font-semibold text-2xl">
          Devam Eden
        </Text>
        <TouchableOpacity onPress={navigateToTask}>
          <Text className="underline">Hepsini Gör</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          scrollEnabled={false}
          data={isFinishedData}
          renderItem={({ item }) => <Task task={item} />}
        />
      </View>
    </View>
  );
};

export default TasksList;
