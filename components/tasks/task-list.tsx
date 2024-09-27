import { View } from "react-native";
import React from "react";
import { Text } from "../ui/text";
import { CheckCheck, Sun } from "lucide-react-native";

type TaskListProps = {
  task: {
    title: string;
    description: string;
    endTime: string;
  };
};

const TaskList = ({ task }: TaskListProps) => {
  return (
    <View className="rounded-[10px] bg-muted mt-5 h-40 p-4 justify-between">
      <View>
        <View className="w-full flex-row justify-between">
          <Text>asd</Text>
          <View className="flex-row gap-2">
            <Sun size={28} color={"yellow"} />
            <CheckCheck size={28} color={"black"} />
          </View>
        </View>
        <View className="">
          <Text>{task.description}</Text>
        </View>
      </View>
      <View className=" flex w-full justify-end items-end">
        <Text>{task.endTime}</Text>
      </View>
    </View>
  );
};

export default TaskList;
