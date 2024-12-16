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
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.header}>Add New Task</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Title</Text>
          <Input
            placeholder="Enter task title"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Description</Text>
          <Input
            placeholder="Enter task description"
            value={formData.description}
            onChangeText={(text) =>
              setFormData({ ...formData, description: text })
            }
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Deadline Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{formData.deadline.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.deadline}
              mode="date"
              onChange={onDateChange}
            />
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Deadline Time</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowTimePicker(true)}
          >
            <Text>{formData.deadlineTime}</Text>
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={new Date(`2024-01-01T${formData.deadlineTime}`)}
              mode="time"
              onChange={onTimeChange}
            />
          )}
        </View>

        <Button
          title="Add Task"
          onPress={handleAddTask}
          disabled={!formData.title.trim()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  form: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },
  button: {
    marginTop: 20,
  },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
});
