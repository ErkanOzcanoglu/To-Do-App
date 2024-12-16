import { View, Text, Button } from "react-native";
import React from "react";
import { useTaskStore } from "@/hooks/use-task-store";

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
  const { removeTask } = useTaskStore();

  const handleDelete = async (id: string) => {
    await removeTask(id);
  };

  return (
    <View className="mt-2">
      <Text>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text>{task.deadline.toDateString()}</Text>
      <Text>{task.isCompleted ? "Completed" : "Not Completed"}</Text>
      <Button
        title="Delete"
        onPress={() => {
          handleDelete(task.id);
        }}
      />
    </View>
  );
};

export default Task;
