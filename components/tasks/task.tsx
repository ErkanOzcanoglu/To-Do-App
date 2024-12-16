import { View, Text, Pressable } from "react-native";
import React from "react";
import { useTaskStore } from "@/hooks/use-task-store";
import { CheckIcon } from "lucide-react-native";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

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
  const { removeTask, toggleTask } = useTaskStore();

  const handleDelete = async (id: string) => {
    await removeTask(id);
  };

  const handleToggle = async (id: string) => {
    await toggleTask(id);
  };

  return (
    <View className="mt-2 p-4 bg-card rounded-lg border border-border flex-row items-center justify-between">
      <View className="flex-row items-center space-x-3 flex-1">
        <Pressable
          onPress={() => handleToggle(task.id)}
          className={cn(
            "w-5 h-5 mr-2 rounded border border-primary items-center justify-center",
            task.isCompleted && "bg-primary"
          )}
        >
          {task.isCompleted && (
            <CheckIcon className="w-4 h-4 text-primary-foreground" />
          )}
        </Pressable>

        <View className="flex-1">
          <Text
            className={cn(
              "text-base font-medium text-foreground",
              task.isCompleted && "line-through text-muted-foreground"
            )}
          >
            {task.title}
          </Text>
          <Text className="text-sm text-muted-foreground">
            {task.description}
          </Text>
          <Text className="text-xs text-muted-foreground">
            {task.deadline.toDateString()}
          </Text>
        </View>
      </View>

      <Button
        variant="destructive"
        size="sm"
        onPress={() => handleDelete(task.id)}
      >
        <Text className="text-destructive-foreground">Delete</Text>
      </Button>
    </View>
  );
};

export default Task;
