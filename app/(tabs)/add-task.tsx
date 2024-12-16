import { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useTaskStore } from "@/hooks/use-task-store";
import { Input } from "@/components/ui/input";
import AddTaskForm from "@/components/tasks/add-task-form";

export default function AddTask() {
  const router = useRouter();
  const addTask = useTaskStore((state) => state.addTask);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: new Date(),
    deadlineTime: "12:00",
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
      const timeString = selectedTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });
      setFormData((prev) => ({ ...prev, deadlineTime: timeString }));
    }
  };

  const handleAddTask = () => {
    if (!formData.title.trim()) return;

    addTask({
      id: Date.now().toString(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      deadline: formData.deadline,
      deadlineTime: formData.deadlineTime,
      isCompleted: false,
      updatedAt: new Date(),
      createdAt: new Date(),
    });

    setFormData({
      title: "",
      description: "",
      deadline: new Date(),
      deadlineTime: "12:00",
    });
  };

  return (
    <SafeAreaView className="flex bg-background">
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
      <Button
        title="Add Task"
        onPress={handleAddTask}
        disabled={!formData.title.trim()}
      />
    </SafeAreaView>
  );
}
