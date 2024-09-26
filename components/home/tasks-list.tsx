import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Text } from "../ui/text";
import Task from "./task";

const taskData = [
  {
    title: "Task 1",
    description: "Description 1",
    endTime: "12:00",
  },
  {
    title: "Task 2",
    description: "Description 2",
    endTime: "09:00",
  },
  {
    title: "Task 3",
    description: "Description 3",
    endTime: "10:00",
  },
  {
    title: "Task 4",
    description: "Description 4",
    endTime: "23:00",
  },
];

const TasksList = () => {
  return (
    <View className="mt-10">
      <View className="flex-row justify-between items-end">
        <Text className="text-muted ml-2 font-semibold text-2xl">
          Devam Eden
        </Text>
        <TouchableOpacity>
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
