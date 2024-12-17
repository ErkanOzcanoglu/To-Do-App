import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import { useTaskStore } from "@/hooks/use-task-store";
import { AlertTriangle, Calendar, Check, Clock, X } from "lucide-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

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
  const router = useRouter();
  const isOverdue = useMemo(() => {
    try {
      const deadline = item.deadline + "T" + item.deadlineTime;
      const now = new Date().toISOString();

      return deadline < now && !item.isCompleted;
    } catch (error) {
      console.error("Error calculating overdue status:", error);
      return false;
    }
  }, [item.deadline, item.deadlineTime, item.isCompleted]);

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
      setIsConfirming(false);
      try {
        const tasks = await AsyncStorage.getItem("@tasks");
        if (tasks) {
          const updatedTasks = JSON.parse(tasks).filter(
            (task: any) => task.id !== id
          );
          await AsyncStorage.setItem("@tasks", JSON.stringify(updatedTasks));
        }
      } catch (error) {
        console.error("Error deleting task:", error);
      }
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

  const completeTask = async (id: string) => {
    await toggleTask(id);
    try {
      const tasks = await AsyncStorage.getItem("@tasks");
      if (tasks) {
        const updatedTasks = JSON.parse(tasks).map((task: any) =>
          task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        );
        await AsyncStorage.setItem("@tasks", JSON.stringify(updatedTasks));
      }
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          router.navigate(`/(task)/task-detail?id=${item.id}`);
        }}
      >
        <Animated.View
          style={{
            transform: [{ translateX: slideAnim }],
          }}
          className={`p-4 mb-3 rounded-lg border border-slate-300 
            ${isOverdue ? "bg-red-100 dark:bg-red-900/30" : "bg-card"}
            ${item.isCompleted ? "bg-green-100" : "bg-gray-100"}`}
        >
          <View className="flex-row justify-between items-center mb-2">
            <Text
              onPress={() => completeTask(item.id)}
              className={`text-lg font-semibold ${
                item.isCompleted
                  ? "line-through text-gray-500"
                  : "text-gray-800"
              }`}
            >
              {item.title}
            </Text>
            <View className="flex-row space-x-2 gap-2">
              <TouchableOpacity
                onPress={() => completeTask(item.id)}
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
      </TouchableOpacity>
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
