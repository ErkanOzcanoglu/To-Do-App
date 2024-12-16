import { View } from "react-native";
import React from "react";
import { Text } from "../ui/text";
import { Sun } from "lucide-react-native";

type TaskProps = {
  task: {
    title: string;
    description: string;
    endTime: string;
  };
};

const Task = ({ task }: TaskProps) => {
  return (
    <View className="flex-row rounded-[10px] bg-muted mt-5 h-12 items-center px-3 gap-10">
      <View>
        <Text>{task.endTime}</Text>
      </View>
      <View className="flex-row gap-5">
        <Sun size={24} color={"yellow"} />
        <Text>{task.title}</Text>
      </View>
    </View>
  );
};

export default Task;
