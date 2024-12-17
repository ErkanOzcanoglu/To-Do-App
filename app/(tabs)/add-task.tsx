import React, { useState } from "react";
import { Alert, View } from "react-native";
import { useTaskStore } from "@/hooks/use-task-store";
import AddTaskForm from "@/components/tasks/add-task-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";

const AddTask = () => {
  const { addTask } = useTaskStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: new Date(),
    deadlineTime: new Date().toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Europe/Istanbul",
    }),
  });

  const onDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData((prev) => ({ ...prev, deadline: selectedDate }));
    }
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const timeString = selectedTime.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Europe/Istanbul",
      });
      setFormData((prev) => ({ ...prev, deadlineTime: timeString }));
    }
  };

  const handleAddTask = async () => {
    if (!formData.title.trim()) return;

    setIsLoading(true);
    try {
      const newTask = {
        id: Date.now().toString(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        deadline: formData.deadline.toISOString(),
        deadlineTime: formData.deadlineTime,
        isCompleted: false,
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };

      // Add to store first
      addTask(newTask);

      // Then save to AsyncStorage
      const existingTasks = await AsyncStorage.getItem("@tasks");
      const tasks = existingTasks ? JSON.parse(existingTasks) : [];
      tasks.push(newTask);
      await AsyncStorage.setItem("@tasks", JSON.stringify(tasks));

      // Reset form
      setFormData({
        title: "",
        description: "",
        deadline: new Date(),
        deadlineTime: new Date().toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
          timeZone: "Europe/Istanbul",
        }),
      });

      // Navigate with error handling
      try {
        await router.push("/task-list");
      } catch (navError) {
        console.error("Navigation error:", navError);
        Alert.alert("Error", "Could not navigate to task list");
      }
    } catch (error) {
      console.error("Error saving task:", error);
      Alert.alert("Error", "Could not save task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="">
      <View className="flex bg-background h-full">
        <AddTaskForm
          formData={formData}
          setFormData={setFormData}
          showDatePicker={showDatePicker}
          setShowDatePicker={setShowDatePicker}
          showTimePicker={showTimePicker}
          setShowTimePicker={setShowTimePicker}
          onDateChange={onDateChange}
          onTimeChange={onTimeChange}
          onSubmit={handleAddTask}
        />
        <View className="flex-row justify-center items-center p-4">
          <Button
            onPress={handleAddTask}
            className="w-1/2"
            disabled={!formData.title.trim()}
          >
            <Text>{isLoading ? "Adding..." : "Add Task"}</Text>
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AddTask;
