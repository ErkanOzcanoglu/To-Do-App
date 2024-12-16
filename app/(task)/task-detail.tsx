import { View } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTaskStore } from "@/hooks/use-task-store";
import AddTaskForm from "@/components/tasks/add-task-form";
import { useRoute } from "@react-navigation/native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { ArrowLeft } from "lucide-react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "@/types/task";

const TaskDetail = () => {
  const { id } = useRoute().params as any;
  const tasks = useTaskStore((state) => state.tasks);
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalTask, setOriginalTask] = useState<Task | null>(null);
  const { updateTask } = useTaskStore();
  const router = useRouter();

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
  useEffect(() => {
    if (id) {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        setOriginalTask(task);
        setFormData({
          title: task.title,
          description: task.description,
          deadline: new Date(task.deadline),
          deadlineTime: task.deadlineTime,
        });
      }
    }
    setLoading(false);
  }, [id, tasks]);

  useEffect(() => {
    if (originalTask) {
      const isChanged =
        originalTask.title !== formData.title ||
        originalTask.description !== formData.description ||
        new Date(originalTask.deadline).getTime() !==
          formData.deadline.getTime() ||
        originalTask.deadlineTime !== formData.deadlineTime;
      setHasChanges(isChanged);
    }
  }, [formData, originalTask]);

  useEffect(() => {
    if (id) {
      const task = tasks.find((t) => t.id === id);
      if (task) {
        setFormData({
          title: task.title,
          description: task.description,
          deadline: new Date(task.deadline),
          deadlineTime: task.deadlineTime,
        });
      }
    }
    setLoading(false);
  }, [id, tasks]);

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
      });
      setFormData((prev) => ({ ...prev, deadlineTime: timeString }));
    }
  };

  const handleReset = () => {
    if (originalTask) {
      setFormData({
        title: originalTask.title,
        description: originalTask.description,
        deadline: new Date(originalTask.deadline),
        deadlineTime: originalTask.deadlineTime,
      });
      setShowDatePicker(false);
      setShowTimePicker(false);
    }
  };

  const handleUpdateTask = async () => {
    console.log("asdasd");
    if (!formData.title.trim() || !id) return;

    const updatedTask = {
      id: id as string,
      title: formData.title.trim(),
      description: formData.description.trim(),
      deadline: formData.deadline.toISOString(),
      deadlineTime: formData.deadlineTime,
      isCompleted: false,
      updatedAt: new Date().toISOString(),
      createdAt:
        tasks.find((t) => t.id === id)?.createdAt || new Date().toISOString(),
    };

    updateTask(updatedTask);

    try {
      const existingTasks = await AsyncStorage.getItem("@tasks");
      const tasksData = existingTasks ? JSON.parse(existingTasks) : [];
      const updatedTasks = tasksData.map((task: any) =>
        task.id === id ? updatedTask : task
      );
      await AsyncStorage.setItem("@tasks", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (loading) {
    return <View className="flex-1 items-center justify-center" />;
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 mt-4">
        <TouchableOpacity
          onPress={() => {
            router.back();
          }}
        >
          <ArrowLeft size={24} color="black" />
        </TouchableOpacity>
      </View>
      <AddTaskForm
        formData={formData}
        setFormData={setFormData}
        showDatePicker={showDatePicker}
        setShowDatePicker={setShowDatePicker}
        showTimePicker={showTimePicker}
        setShowTimePicker={setShowTimePicker}
        onDateChange={onDateChange}
        onTimeChange={onTimeChange}
        onSubmit={() => {}}
      />
      <View className="flex-row justify-center items-center p-4 gap-5">
        {hasChanges && (
          <Button
            onPress={handleReset}
            className="w-1/3"
            disabled={!formData.title.trim()}
          >
            <Text className="text-white">Reset</Text>
          </Button>
        )}
        <Button
          onPress={hasChanges ? handleUpdateTask : () => {}}
          className="w-1/3"
          disabled={!formData.title.trim()}
        >
          <Text className="text-white">
            {hasChanges ? "Save Changes" : "No Changes"}
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default TaskDetail;
