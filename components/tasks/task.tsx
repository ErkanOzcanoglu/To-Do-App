import {
  View,
  Text,
  Pressable,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useRef } from "react";
import { useTaskStore } from "@/hooks/use-task-store";
import {
  AlertTriangle,
  Calendar,
  Check,
  CheckIcon,
  Clock,
  X,
} from "lucide-react-native";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type TaskProps = {
  item: {
    id: string;
    title: string;
    createdAt: any;
    deadline: any;
    deadlineTime: string;
    description: string;
    isCompleted: boolean;
    updatedAt: any;
  };
};

const Task = ({ item }: TaskProps) => {
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [isConfirming, setIsConfirming] = React.useState(false);
  const { removeTask, toggleTask } = useTaskStore();

  const handleDeleteInit = () => {
    setIsConfirming(true);
    Animated.timing(slideAnim, {
      toValue: -100,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleDeleteConfirm = async (id: string) => {
    Animated.timing(slideAnim, {
      toValue: -400,
      duration: 300,
      useNativeDriver: true,
    }).start(async () => {
      await removeTask(id);
    });
  };

  const handleDeleteCancel = () => {
    setIsConfirming(false);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleToggle = async (id: string) => {
    await toggleTask(id);
  };

  return (
    <View>
      <Animated.View
        style={{
          transform: [{ translateX: slideAnim }],
        }}
        className={`p-4 mb-3 rounded-lg border border-slate-300 ${
          item.isCompleted ? "bg-green-100" : "bg-gray-100"
        }`}
      >
        <View className="flex-row justify-between items-center mb-2">
          <Text
            onPress={() => toggleTask(item.id)}
            className={`text-lg font-semibold ${
              item.isCompleted ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {item.title}
          </Text>
          <View className="flex-row space-x-2 gap-2">
            <TouchableOpacity
              onPress={() => toggleTask(item.id)}
              className={`p-2 rounded-full ${
                item.isCompleted ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <Check size={16} color={item.isCompleted ? "white" : "gray"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDeleteInit}
              className="p-2 rounded-full bg-red-500"
            >
              {isConfirming ? (
                <AlertTriangle size={16} color="white" />
              ) : (
                <X size={16} color="white" />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <Text className="text-gray-600 mb-2">{item.description}</Text>
        <View className="flex-row space-x-4 text-sm text-gray-500">
          <View className="flex-row items-center">
            <Calendar size={14} color={"gray"} />
            <Text className="ml-1">
              {new Date(item.deadline).toLocaleDateString()}
            </Text>
          </View>
          <View className="flex-row items-center ml-2">
            <Clock size={14} color={"gray"} />
            <Text className="ml-1">{item.deadlineTime}</Text>
          </View>
        </View>
      </Animated.View>
      {isConfirming && (
        <View className="absolute right-0 top-0 bottom-0 flex-col items-center justify-center pr-2 gap-2">
          <TouchableOpacity
            onPress={() => handleDeleteConfirm(item.id)}
            className="p-2 bg-red-500 rounded w-20 items-center"
          >
            <Text className="text-white">Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDeleteCancel}
            className="p-2 bg-gray-300 rounded w-20 items-center"
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Task;
