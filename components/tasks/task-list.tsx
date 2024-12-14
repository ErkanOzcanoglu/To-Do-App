import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Text } from "../ui/text";
import { CheckCheck, Sun } from "lucide-react-native";
import { useRouter } from "expo-router";

type TaskListProps = {
  task: {
    title: string;
    description: string;
    endTime: string;
  };
};

const TaskList = ({ task }: TaskListProps) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push("/(tabs)/task");
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          handleNavigate();
        }}
      >
        <View className="rounded-[10px] bg-muted mt-5 p-4 justify-between">
          <View>
            <View className="w-full flex-row justify-between">
              <Text>{task.title}</Text>
              <View className="flex-row gap-2">
                <Sun size={28} color={"yellow"} />
                <CheckCheck size={28} color={"black"} />
              </View>
            </View>
            <View className="py-3">
              <Text>{task.description}</Text>
            </View>
          </View>
          <View className=" flex w-full justify-end items-end">
            <Text>{task.endTime}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

export default TaskList;
