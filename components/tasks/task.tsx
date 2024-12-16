import { View, Text } from "react-native";
import React from "react";

type TaskProps = {
  task: {
    id: string;
    title: string;
    createdAt: Date;
    deadline: Date;
    deadlineTime: string;
    description: string;
    isCompleted: boolean;
    updatedAt: Date;
  };
};

const Task = ({ task }: TaskProps) => {
  return (
    <View className="mt-2">
      <Text>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text>{task.deadline.toDateString()}</Text>
      <Text>{task.isCompleted ? "Completed" : "Not Completed"}</Text>
    </View>
  );
};

export default Task;
